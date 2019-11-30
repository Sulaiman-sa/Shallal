import {useState} from 'react'

export const useInputChange = () => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return [input, handleChange]
}