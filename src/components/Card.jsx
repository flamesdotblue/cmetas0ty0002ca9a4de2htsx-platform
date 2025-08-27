import ShapeIcon from './ShapeIcon';

export default function Card({ card, onClick, disabled }) {
  const { isFlipped, isMatched, shape, color } = card;

  return (
    <button
      onClick={onClick}
      disabled={disabled || isMatched || isFlipped}
      aria-label={isMatched ? `${shape} matched` : `flip ${shape}`}
      className={`relative aspect-square rounded-3xl transition transform focus:outline-none focus:ring-4 focus:ring-rose-300 
        ${isMatched ? 'cursor-default' : 'active:scale-95'}
      `}
    >
      <div className="absolute inset-0 [perspective:800px]">
        <div
          className={`absolute inset-0 rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped || isMatched ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl bg-white shadow-lg border-4 border-rose-300 flex items-center justify-center">
            <div className="w-10/12 h-10/12 rounded-2xl bg-gradient-to-br from-rose-100 via-yellow-100 to-blue-100 flex items-center justify-center">
              <div className="text-5xl">🧩</div>
            </div>
          </div>

          {/* Back (revealed) */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl bg-white shadow-xl border-4 border-emerald-300 flex items-center justify-center">
            <ShapeIcon type={shape} color={color} className="w-3/4 h-3/4" />
          </div>
        </div>
      </div>

      {isMatched && (
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-extrabold px-2 py-1 rounded-full shadow">
          ✓
        </div>
      )}
    </button>
  );
}
