const TechBadge = ({ name, url }) => {
    return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] hover:border-cyan-400/25 transition-all duration-150 cursor-default">
            <img
                src={url}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                className="w-[18px] h-[18px] object-contain flex-shrink-0"
            />
            <span className="text-xs text-slate-300 font-medium whitespace-nowrap">{name}</span>
        </span>
    );
}

export default TechBadge