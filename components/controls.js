import React, { useEffect } from "react"
import "./controls.scss"

export default function Controls({ state, onChange, onShare, addOneToggle }) {
	useEffect(() => {
		if (state[0] === "editor") {
			//set up editor
			document.getElementById("button1").innerHTML = "Добавить продукты"
			document.getElementById("button2").innerHTML = "Готово"
		} else {
			//set up viewer
			document.getElementById("button1").innerHTML = "Редактировать"
			document.getElementById("button2").innerHTML = "Поделиться"
		}
	}, [state])

	function button1() {
		if (state[0] === "viewer") {
			//редактировать
			let temp = state
			temp[0] = "editor"
			onChange({ ...temp })
		} else {
			//добавить продукты
			addOneToggle()
		}
	}

	function button2() {
		if (state[0] === "editor") {
			//готово
			let temp = {} //state
			let tempC = {} //count
			temp[0] = "viewer"
			let areas = document.getElementsByClassName("list-field")
			let areasC = document.getElementsByClassName("list-count")
			let j = 1
			for (let i = 0; i < areas.length; i++) {
				let val = areas[i].value
				let valC = +areasC[i].value
				console.log(val.length)
				if (val != "" && val.length != 0) {
					temp[j] = val
					if (!Number.isInteger(valC) || Number.isNaN(valC)) {
						valC = 1
					}
					tempC[j] = valC
					j += 1
				}
			}
			onChange({ ...temp }, { ...tempC })
		} else {
			//share
			onShare()
		}
	}

	return (
		<div className="controls">
			<button onClick={button1} id="button1">
				Добавить продукты
			</button>
			{/*change list*/}
			<button onClick={button2} id="button2">
				Сохранить
			</button>
			{/*share*/}
		</div>
	)
}
