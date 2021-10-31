import React, { useEffect, useState } from "react"
import * as removeICON from "../files/remove.png"
import * as plusICON from "../files/plus.png"
import * as minusICON from "../files/minus.png"
import * as checkICON from "../files/check.png"

export default function List({ state, count, showModal, addOneState }) {
	let localElementCounter = document.querySelectorAll("[id=editor-wrapper]").length //|| Object.keys(count).length
	let [addOnePrevious, setPrev] = useState({ item: undefined, colv: undefined })

	useEffect(() => {
		addOnePrevious = addOneState
		document.getElementById("list").innerHTML = ""
		if (state[0] === "editor") {
			//set up editor
			document.getElementById("voice-button-wrapper").classList.remove("hidden")
			renderAreas()
			setTimeout(() => {
				window.scrollTo(0, 0) //-document.getElementById("head").scrollHeight)
			}, 3) //что бы после появления последнего элемента при первой отрисовке возвращал наверх
		} else {
			//set up viewer
			document.getElementById("voice-button-wrapper").classList.add("hidden")
			renderItems()
		}
	}, [state])

	useEffect(() => {
		if (addOneState.item !== addOnePrevious.item || addOneState.item === "") {
			localElementCounter += 1
			renderAreas("one", addOneState)
			setPrev(addOneState)
		}
	}, [addOneState])

	/*
		editorElem result: //NOT TRUE FOR NOW || SPLIT COMP
		<div id="editor-wrapper">
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
			"editor-elem flex flex-col justify-center items-center w-full mt-4 p-2 border-t transform scale-0 new"

		let crossId = document.createElement("div")
		crossId.className = "w-2/3 h-full flex flex-row justify-around items-center p-2"
		let cross = document.createElement("img")
		cross.src = removeICON
		cross.className =
			"w-10 rounded-full h-max border-2 border-blue-300 transition-transform transform duration-300 ease-in-out hover:rotate-180 cursor-pointer"
		cross.onclick = (e) => {
			deleteElem(e, "editor")
		}
		let id = document.createElement("span")
		id.className = "w-max h-max flex justify-center items-center text-lg border border-dashed rounded p-2"
		id.innerText =
			"№ " + (localElementCounter == undefined ? Object.keys(count).length + 1 : localElementCounter)
		crossId.append(cross)
		crossId.append(id)

		let labelItem = document.createElement("label")
		labelItem.innerText = "Название: "
		labelItem.className = "w-max h-max mb-4 "
		let item = document.createElement("input")
		item.className =
			"list-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300"
		item.value = val.item
		labelItem.append(item)

		let counterWrapper = document.createElement("div")
		counterWrapper.className = "w-10/12 md:w-4/12 h-max flex flex-row justify-around items-center"

		let counterScht = document.createElement("div")
		counterScht.className = "w-2/6 flex flex-row justify-around"
		let counter = document.createElement("input")
		counter.className =
			"list-count shadow appearance-none border rounded w-11 h-max py-2 px-3 text-gray-800 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300"
		counter.value = val.colv
		let scht = document.createElement("span")
		scht.className = "flex justify-center items-center"
		scht.innerText = " шт."
		counterScht.append(counter)
		counterScht.append(scht)

		let increase = document.createElement("button")
		increase.innerHTML = `<img class="w-9 h-max" src="${plusICON}">`
		increase.addEventListener("click", (e) => {
			e.path[2].childNodes[1].childNodes[0].value++
			console.log(e)
			e.target.classList.add(
				"transition-transform",
				"transform",
				"duration-100",
				"scale-110",
				"animPlusMinus"
			)
			setTimeout(() => {
				document
					.getElementsByClassName("animPlusMinus")[0]
					.classList.remove("transition-transform", "transform", "duration-100", "scale-110", "animPlusMinus")
			}, 100)
		})
		let decrease = document.createElement("button")
		decrease.innerHTML = `<img class="w-8 h-max" src="${minusICON}">`
		decrease.addEventListener("click", (e) => {
			;+e.path[2].childNodes[1].childNodes[0].value <= 1
				? (e.path[2].childNodes[1].childNodes[0].value = 1)
				: e.path[2].childNodes[1].childNodes[0].value--
			e.target.classList.add(
				"transition-transform",
				"transform",
				"duration-100",
				"scale-110",
				"animPlusMinus"
			)
			setTimeout(() => {
				document
					.getElementsByClassName("animPlusMinus")[0]
					.classList.remove("transition-transform", "transform", "duration-100", "scale-110", "animPlusMinus")
			}, 100)
		})
		counterWrapper.append(decrease)
		counterWrapper.append(counterScht)
		counterWrapper.append(increase)

		wrapper.append(crossId)
		wrapper.append(labelItem)
		wrapper.append(counterWrapper)
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

	function deleteElem(e, now) {
		//при нажатии на крест в редакторе
		if (now === "editor") {
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
							el.innerHTML = "№ " + j
						}
					}, 300)

					break
				}
			}
		} else if (now === "viewer") {
			//console.log(e) //.path[1].childNodes[1])
			if (e.srcElement.src === window.location.href) {
				e.srcElement.src = checkICON
			} else {
				e.srcElement.src = " "
			}

			e.path[1].childNodes[1].classList.toggle("bg-gray-300")
			e.path[1].childNodes[1].childNodes.forEach((elem) => {
				elem.classList.toggle("line-through")
			})
		}
	}

	function renderItems() {
		let list = document.getElementById("list")
		list.className = "w-screen flex flex-col justify-center items-center"
		let size = Object.keys(state).length
		for (let i = 1; i < size; i++) {
			let elem = document.createElement("div")
			elem.className = "w-full md:w-1/2 h-max flex flex-row justify-around items-center p-3 mt-6 "
			let check = document.createElement("img")
			check.src = " "
			check.className = "w-8 h-8 rounded-full border-2 border-blue-300"
			check.onclick = (e) => {
				deleteElem(e, "viewer")
			}
			let item = document.createElement("div")
			item.className =
				"w-10/12 h-12 flex items-center justify-center divide-x border rounded shadow-sm text-lg"
			item.innerHTML = `<span class="w-5/6 pl-4">${state[i]}</span><span class="w-2/6 text-center">${count[i]} шт.</span>` // 5/6 and 2/6 > 6/6 => oops
			elem.append(check)
			elem.append(item)
			list.append(elem)
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
		<div className="w-11/12 md:w-3/6 h-auto md:h-3/6 flex flex-col justify-center items-center m-2 p-2">
			<div id="voice-button-wrapper" className="w-full h-max flex justify-center items-center p-2">
				<button
					className="w-max h-14 border flex justify-center items-center p-7 rounded text-xl transition-shadow shadow-md hover:shadow-xl transform transition-transform hover:scale-105 "
					onClick={() => showModal({ state: "on", content: "voice" })}>
					Голосовое управление
				</button>
			</div>
			<div className="w-full h-full flex flex-col justify-center" id="list">
				{/* all content render here */}
			</div>
		</div>
	)
}
