import React from "react"

export default function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <select value={value} onChange={event => onChange(event.target.value)}>
      <option disabled={true} value="">
        {defaultValue}
      </option>
      {options.map((option) => {
        return <option value={option.value} key={JSON.stringify(option)}>{option.name}</option>
      })}
    </select>
  )
}
