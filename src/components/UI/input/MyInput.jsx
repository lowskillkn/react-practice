import React from "react"
import classes from './MyInput.module.css'

export default function MyInput({ children, ...props }) {
  return (
    <input {...props} className={classes.myInput} />
  )
}
