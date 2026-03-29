import { useState } from 'react'

export function useFormValidation(campos) {
  const [errors, setErrors] = useState(
    Object.fromEntries(campos.map(c => [c, false]))
  )

  function setFieldError(campo, value) {
    setErrors(prev => ({ ...prev, [campo]: value }))
  }

  function clearFieldError(campo) {
    setFieldError(campo, false)
  }

  function validateAll(formValues) {
    let valido = true
    const novosErros = { ...errors }

    for (const campo of campos) {
      if (!formValues[campo] || formValues[campo].trim() === '') {
        novosErros[campo] = true
        valido = false
      }
    }

    setErrors(novosErros)
    return valido
  }

  return { errors, clearFieldError, validateAll }
}
