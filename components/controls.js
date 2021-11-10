import React, { useEffect } from "react"

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
			window.scrollTo(0, 0)
		}
	}, [state[0]])

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

	const buttonStyle =
		"border bg-blue-100 transition-colors hover:bg-blue-300 hover:text-white text-blue-900 text-center py-2 px-4 rounded transition-shadow shadow-md hover:shadow-xl transform transition-transform hover:scale-105"
	return (
		<div className="w-full md:w-3/6 h-max flex flex-row justify-around items-center m-5">
			<button className={buttonStyle} onClick={addOrEdit} id="addOrEdit">
				Добавить продукты
			</button>
			{/*change list*/}
			<button className={buttonStyle} onClick={doneOrShare} id="doneOrShare">
				Сохранить
			</button>
			{/*share*/}
		</div>
	)
}
