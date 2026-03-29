export default function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  hasError = false,
  hint,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id} className="font-bold text-[0.9rem] text-[#101828]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`
          w-full px-3 py-3 border rounded-[10px] outline-none transition-colors
          focus:border-[#0066CC]
          ${hasError
            ? 'border-[#EF4444] bg-[#FEF2F2] placeholder-[#F87171] animate-shake'
            : 'border-[#D1D5DC]'
          }
        `}
      />
      {hint && (
        <span className="text-[#6A7282] text-[0.75rem] mt-[2px] cursor-pointer hover:underline">{hint}</span>
      )}
    </div>
  )
}
