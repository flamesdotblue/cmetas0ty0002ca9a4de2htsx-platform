import Card from './Card';

export default function GameBoard({ cards, onCardClick, disabled, pairCount }) {
  const gridCols = pairCount === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-4 sm:gap-5 md:gap-6 select-none`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
