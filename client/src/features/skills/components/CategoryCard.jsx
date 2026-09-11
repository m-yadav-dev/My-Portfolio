import TechBadge from "./TechBadge";

import { categoryLabels, categoryIcons } from "../data/techStackData.jsx";

const CategoryCard = ({ categoryKey, skills, index }) => {
    const label = categoryLabels[categoryKey] || categoryKey;
    const icon = categoryIcons[categoryKey];

    return (
        <article
            className="glass-surface rounded-xl p-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            aria-label={`${label} skills`}
        >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {icon}
                </div>
                <h3 className="text-white text-base font-semibold tracking-tight">
                    {label}
                </h3>
            </div>

            {/* Skills — flex-wrap badges */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <TechBadge key={skill.name} name={skill.name} url={skill.url} />
                ))}
            </div>
        </article>
    );
}


export default CategoryCard