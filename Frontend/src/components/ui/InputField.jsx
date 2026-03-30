import { forwardRef } from 'react'

const InputField = forwardRef(function InputField(
  { id, label, type = 'text', placeholder, hint, hasError, errorMessage, onChange, onBlur, name },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold text-[0.9rem] text-[#101828]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full px-3 py-3 border rounded-[10px] outline-none transition-colors
          focus:border-[#0066CC]
          ${hasError
            ? 'border-[#EF4444] bg-[#FEF2F2] placeholder-[#F87171] animate-shake'
            : 'border-[#D1D5DC]'
          }
        `}
      />
      {errorMessage && (
        <span className="text-[#EF4444] text-[0.75rem] mt-[2px]">{errorMessage}</span>
      )}
      {hint && !errorMessage && (
        <span className="text-[#6A7282] text-[0.75rem] mt-[2px] cursor-pointer hover:underline">{hint}</span>
      )}
    </div>
  )
})

export default InputField
