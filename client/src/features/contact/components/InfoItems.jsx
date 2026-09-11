import { motion } from "framer-motion";

const InfoItems = ({ icon, itemVariants, label, href, value }) => {
    return (
        <motion.div
            key={label}
            variants={itemVariants}
            className="flex items-start gap-4"
        >
            {/* Icon circle */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                {icon}
            </div>

            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                    {label}
                </p>
                {href ? (
                    <a
                        href={href}
                        className="text-sm text-white hover:text-cyan-400 transition-colors duration-200"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-sm text-white">{value}</p>
                )}
            </div>
        </motion.div>
    )
}

export default InfoItems; 