export default function FreelancerListHeader({ count }) {
  return (
    <div className="flex items-center justify-between min-h-[31px]">
      <p className="font-medium text-[11px] sm:text-[12px] text-[#99a1af] uppercase tracking-[1.2px]">
        <span className="text-[#6a7282] text-md">
          <span className="text-[#101828] font-semibold">{count}</span>{' '}
          {count === 1 ? 'encontrado' : 'encontrados'}
        </span>
      </p>
    </div>
  )
}
