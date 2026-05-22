export default function MetricCard({ icon: Icon, label, value, colorClass }) {
    return (
        <div className="bg-white px-4 py-7 rounded-xl border border-slate-200 flex items-center gap-4">
            <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                aria-hidden="true"
            >
                <Icon size={20} />
            </div>
            <div>
                <p className="text-sm text-slate-400 font-medium mb-0.5">{label}</p>
                <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}