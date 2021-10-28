import React, { useEffect, useState } from "react"
import * as removeICON from "./remove.png"

export default function List({ state, count, showModal, addOneState }) {
	let localElementCounter = document.querySelectorAll("[id=editor-wrapper]").length //|| Object.keys(count).length
	let [addOnePrevious, setPrev] = useState({ item: undefined, colv: undefined })
	useEffect(() => {
		addOnePrevious = addOneState
		if (state[0] === "editor") {
			//set up editor
			document.getElementById("list").innerHTML = ""
			document.getElementById("voice-button-wrapper").hidden = false
			renderAreas()
			setTimeout(() => {
				window.scrollTo(0, 0) //-document.getElementById("head").scrollHeight)
			}, 3) //что бы после появления последнего элемента при первой отрисовке возвращал наверх
		} else {
			//set up viewer
			document.getElementById("list").innerHTML = ""
			document.getElementById("voice-button-wrapper").hidden = true
			renderItems()
		}
	}, [state])

	useEffect(() => {
		if (addOneState.item !== addOnePrevious.item || addOneState.item === "") {
			localElementCounter += 1
			renderAreas("one", addOneState)
			setPrev(addOneState) //addOnePrevious.item = addOneState.item
		}
	}, [addOneState])

	/*
		editorElem result:
		<label>
			<div><img onClick={(e)=>deleteElem(e)}></img>
			<span>1</span></div>
			<div><input>apple</input>
			<input>2</input></div>
		</label>
  */
	function editorElem(val) {
		//1 элемент редактора

		let wrapper = document.createElement("div")
		wrapper.id = "editor-wrapper"
		wrapper.className =
			"editor-elem flex flex-col justify-center items-center w-full mt-4 p-2 transform scale-0 new"

		let crossId = document.createElement("div")
		crossId.className = "w-2/3 h-full flex flex-row justify-around items-center p-2"
		let cross = document.createElement("img")
		cross.src = removeICON
		cross.className = "w-9 rounded-full h-max border-2 border-blue-300"
		cross.onclick = (e) => {
			deleteElem(e)
		}
		let id = document.createElement("span")
		id.className = "w-max h-max flex justify-center items-center text-lg border border-dashed rounded p-2"
		id.innerText =
			"№ " + (localElementCounter == undefined ? Object.keys(count).length + 1 : localElementCounter)
		crossId.append(cross)
		crossId.append(id)

		let labelItem = document.createElement("label")
		labelItem.innerText = "Название: "
		labelItem.className = "w-max" ////////////////////////////////////////////////////////////////////////////////
		let item = document.createElement("input")
		item.className = "list-field w-max h-auto border"
		item.value = val.item
		labelItem.append(item)

		let labelCounter = document.createElement("label")
		labelCounter.innerText = "Количество: "
		let counter = document.createElement("input")
		counter.className = "list-count w-max border"
		counter.value = val.colv
		labelCounter.append(counter)

		wrapper.append(crossId)
		wrapper.append(labelItem)
		wrapper.append(labelCounter)
		setTimeout(() => {
			let wrapper = document.getElementsByClassName("new")[0]
			wrapper.classList.remove("new")
			wrapper.classList.add("transition", "duration-300", "ease-out", "scale-100", "new1")
			window.scrollTo(0, document.body.scrollHeight + document.getElementById("addOrEdit").scrollHeight)
			setTimeout(() => {
				let wrapper = document.getElementsByClassName("new1")[0]
				wrapper.classList.remove(
					"transition",
					"duration-300",
					"ease-out",
					"scale-100",
					"transform",
					"scale-0",
					"new1"
				)
			}, 300)
		}, 1)
		localElementCounter += 1

		return wrapper
	}

	function deleteElem(e) {
		//при нажатии на крест в редакторе
		let elem = e.path[2]
		for (let i = 0; i < document.querySelectorAll("[id=editor-wrapper]").length; i++) {
			if (document.querySelectorAll("[id=editor-wrapper]")[i] == elem) {
				document
					.querySelectorAll("[id=editor-wrapper]")
					[i].classList.add("transition", "duration-300", "ease-out", "transform", "scale-0")

				setTimeout(() => {
					document.querySelectorAll("[id=editor-wrapper]")[i].remove()

					localElementCounter = document.querySelectorAll("[id=editor-wrapper]").length
					for (let j = 1; j <= localElementCounter; j++) {
						//убрать разрыв в числах при удалении элемента
						let el = document.querySelectorAll("[id=editor-wrapper]")[j - 1].childNodes[0].childNodes[1]
						el.innerHTML = "№ " + j //el.textContent - 1
					}
				}, 300)

				break
			}
		}
	}

	function renderItems() {
		let list = document.getElementById("list")
		let size = Object.keys(state).length
		for (let i = 1; i < size; i++) {
			let item = document.createElement("div")
			item.innerHTML = state[i] + " " + count[i] + " шт."
			list.append(item)
		}
	}

	function renderAreas(prop, data) {
		let list = document.getElementById("list")
		if (prop == "one") {
			//one = add one area
			let wrapper = editorElem(data)
			list.append(wrapper)
			return 0
		}

		localElementCounter = 1 //Object.keys(count)[Object.keys(count).length - 1]
		while (localElementCounter < Object.keys(state).length) {
			let label = editorElem({ item: state[localElementCounter], colv: count[localElementCounter] })
			list.append(label)
		}
		localElementCounter -= 1 //что бы реальное колво показывал
	}

	return (
		<div className="w-11/12 md:w-3/6 h-auto md:h-3/6 flex flex-col justify-center items-center m-2 p-2 border">
			<div id="voice-button-wrapper" className="border">
				<button onClick={() => showModal({ state: "on", content: "voice" })}>
					Добавить элементы голосом
				</button>
			</div>
			<div className="w-max h-max flex flex-col justify-center" id="list">
				{/* all content render here */}
			</div>
		</div>
	)
}
