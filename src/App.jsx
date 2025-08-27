import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
const COLORS = ['#ff3b30', '#ffcc00', '#34c759', '#007aff', '#af52de', '#ff2d55'];

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPairs(pairCount) {
  const picks = SHAPES.slice(0, pairCount);
  const deck = [];
  picks.forEach((shape, idx) => {
    const color = COLORS[idx % COLORS.length];
    const pairId = `${shape}-${color}`;
    const a = { id: `${pairId}-a`, pairId, shape, color, isFlipped: false, isMatched: false };
    const b = { id: `${pairId}-b`, pairId, shape, color, isFlipped: false, isMatched: false };
    deck.push(a, b);
  });
  return shuffle(deck);
}

export default function App() {
  const [pairCount, setPairCount] = useState(4); // Easy by default (4 pairs, 8 cards)
  const [cards, setCards] = useState(() => buildPairs(4));
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameKey, setGameKey] = useState(0); // force re-seed animations if needed

  const matchedCount = useMemo(() => cards.filter(c => c.isMatched).length / 2, [cards]);
  const isComplete = matchedCount === pairCount && pairCount !== 0;

  useEffect(() => {
    // Reset when pairCount changes
    newGame(pairCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairCount]);

  function newGame(pairs) {
    setCards(buildPairs(pairs));
    setFirstPick(null);
    setSecondPick(null);
    setIsChecking(false);
    setMoves(0);
    setGameKey(k => k + 1);
  }

  function onCardClick(id) {
    if (isChecking) return;
    const clicked = cards.find(c => c.id === id);
    if (!clicked || clicked.isFlipped || clicked.isMatched) return;

    let updated = cards.map(c => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updated);

    if (!firstPick) {
      setFirstPick(clicked);
      return;
    }

    if (firstPick && !secondPick) {
      const second = clicked;
      setSecondPick(second);
      setIsChecking(true);
      setMoves(m => m + 1);

      setTimeout(() => {
        const isMatch = firstPick.pairId === second.pairId;
        updated = updated.map(c => {
          if (c.id === firstPick.id || c.id === second.id) {
            if (isMatch) return { ...c, isMatched: true };
            return { ...c, isFlipped: false };
          }
          return c;
        });
        setCards(updated);
        setFirstPick(null);
        setSecondPick(null);
        setIsChecking(false);
      }, 650);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 text-neutral-900 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 py-6">
        <Header
          key={`header-${gameKey}`}
          pairCount={pairCount}
          onChangePairs={setPairCount}
          onNewGame={() => newGame(pairCount)}
          moves={moves}
          matchedCount={matchedCount}
          totalPairs={pairCount}
          isComplete={isComplete}
        />

        <GameBoard
          key={`board-${gameKey}`}
          cards={cards}
          onCardClick={onCardClick}
          disabled={isChecking}
          pairCount={pairCount}
        />

        <Footer />
      </div>

      {isComplete && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="animate-bounce bg-white/80 rounded-3xl px-6 py-4 text-2xl font-extrabold text-rose-600 shadow-xl border-4 border-rose-400">
            Yay! All matched!
          </div>
        </div>
      )}
    </div>
  );
}
