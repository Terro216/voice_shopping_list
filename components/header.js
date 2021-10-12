import React, { useEffect } from "react"
import "./header.scss"

export default function Header({ state }) {
  useEffect(() => {
    if (state[0] === "editor") {
      //set up editor
      document.getElementById("head").innerHTML = "Редактор листа покупок"
    } else {
      document.getElementById("head").innerHTML = "Ваш лист покупок"
    }
  })

  return (
    <header>
      <h2 id="head" className="header">
        Редактор листа покупок
      </h2>
    </header>
  )
}
