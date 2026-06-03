export default function OwnerCard({ iconPath, title, subtitle, body }) {
  return (
    <div className="liquid-glass rounded-[2rem] p-8 min-h-[340px] flex flex-col group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] bg-black/10">
      <div className="flex items-start justify-between mb-8">
        <div className="liquid-glass rounded-full w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white/80"
            dangerouslySetInnerHTML={{ __html: iconPath }}
          />
        </div>
        {subtitle && (
          <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/50 bg-black/20 font-medium">
            {subtitle}
          </div>
        )}
      </div>
      <div className="flex-1" />
      <div>
        <h3 className="font-heading italic text-white text-3xl md:text-4xl group-hover:translate-x-2 transition-transform duration-500 leading-none mb-4">
          {title}
        </h3>
        <p className="text-sm text-white/60 font-body font-light leading-relaxed max-w-[28ch]">
          {body}
        </p>
      </div>
    </div>
  )
}
