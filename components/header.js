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
		<header className="flex justify-center items-center">
			<h1 id="head" className="w-11/12 md:w-max font-medium font-mono text-3xl text-center m-5">
				Редактор листа покупок
			</h1>
		</header>
	)
}
