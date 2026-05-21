import { Code } from "lucide-react"

export default function PortfolioItem({ title, tech, status }) {
    return (
        <li>
            <article className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition group cursor-pointer">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition"
                            aria-hidden="true"
                        >
                            <Code size={20} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition">
                                {title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">{tech}</p>
                        </div>
                    </div>
                    <span className={getPortfolioStatusStyle(status)}>{status}</span>
                </div>
            </article>
        </li>
    );
}

function getPortfolioStatusStyle(status) {
    return status === 'Concluído'
        ? 'bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full'
        : 'bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full';
}