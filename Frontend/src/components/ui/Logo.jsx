export default function Logo({ variant = 'header' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-[10px] bg-[#0D63C1] text-white font-extrabold text-2xl flex items-center justify-center">
        T
      </div>
      <span className={`font-black text-[1.4rem] ${variant === 'auth' ? 'text-white' : 'text-[#1f2937]'}`}>
        TechLaço
      </span>
    </div>
  )
}
