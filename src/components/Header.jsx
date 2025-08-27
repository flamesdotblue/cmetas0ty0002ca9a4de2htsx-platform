export default function Header({ pairCount, onChangePairs, onNewGame, moves, matchedCount, totalPairs, isComplete }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-rose-600 drop-shadow-sm">
            Match the Shapes!
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-1">
            Flip two cards to find a pair. Bright colors and big shapes for little hands.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-2xl bg-white shadow border border-neutral-200 overflow-hidden">
            <button
              onClick={() => onChangePairs(4)}
              className={`px-4 py-2 font-bold text-sm ${pairCount === 4 ? 'bg-rose-500 text-white' : 'text-rose-600 hover:bg-rose-50'}`}
              aria-pressed={pairCount === 4}
            >
              Easy
            </button>
            <button
              onClick={() => onChangePairs(6)}
              className={`px-4 py-2 font-bold text-sm ${pairCount === 6 ? 'bg-rose-500 text-white' : 'text-rose-600 hover:bg-rose-50'}`}
              aria-pressed={pairCount === 6}
            >
              More
            </button>
          </div>
          <button
            onClick={onNewGame}
            className="px-4 py-2 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition font-extrabold text-neutral-900 shadow border-2 border-yellow-500"
          >
            New Game
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm md:text-base">
        <Badge color="bg-rose-500" label={`Pairs: ${matchedCount}/${totalPairs}`} />
        <Badge color="bg-sky-500" label={`Moves: ${moves}`} />
        {isComplete && <Badge color="bg-emerald-500" label="Great Job!" />}
      </div>
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white font-bold ${color} shadow-sm`}>
      <span>{label}</span>
    </div>
  );
}
