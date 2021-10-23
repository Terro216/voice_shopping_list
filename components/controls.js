import React, { useEffect } from "react"
import "./controls.scss"

export default function Controls({ state, onChange, onShare, addOneToggle }) {
	useEffect(() => {
		if (state[0] === "editor") {
			//set up editor
			document.getElementById("addOrEdit").innerHTML = "Добавить продукты"
			document.getElementById("doneOrShare").innerHTML = "Готово"
		} else {
			//set up viewer
			document.getElementById("addOrEdit").innerHTML = "Редактировать"
			document.getElementById("doneOrShare").innerHTML = "Поделиться"
		}
	}, [state])

	function addOrEdit() {
		if (state[0] === "viewer") {
			//редактировать
			let temp = state
			temp[0] = "editor"
			onChange({ ...temp })
		} else {
			//добавить продукты
			addOneToggle({ item: "", colv: 1 })
		}
	}

	function doneOrShare() {
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
			<button onClick={addOrEdit} id="addOrEdit">
				Добавить продукты
			</button>
			{/*change list*/}
			<button onClick={doneOrShare} id="doneOrShare">
				Сохранить
			</button>
			{/*share*/}
		</div>
	)
}
