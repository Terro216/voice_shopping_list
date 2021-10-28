import React, { useEffect } from "react"

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
			<h1 id="head" className="w-max font-medium font-mono text-3xl m-5 text-center">
				Редактор листа покупок
			</h1>
		</header>
	)
}
