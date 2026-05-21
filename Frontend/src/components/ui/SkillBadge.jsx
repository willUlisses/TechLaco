export default function SkillBadge({ label }) {
    return (
        <li>
            <span className="px-4 py-1.5 border border-slate-200 rounded-full text-sm text-slate-600 bg-white">
                {label}
            </span>
        </li>
    );
}