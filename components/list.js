import React, { useEffect, useState } from "react"
import "./list.scss"

export default function List({ state, count, showModal, addOneState }) {
	let localElementCounter = document.getElementsByClassName("editor-elem").length || Object.keys(count).length
	let [addOnePrevious, setPrev] = useState({ item: undefined, colv: undefined })
	useEffect(() => {
		addOnePrevious = addOneState
		if (state[0] === "editor") {
			//set up editor
			document.getElementById("list").innerHTML = ""
			document.getElementsByClassName("voice-button-wrapper")[0].hidden = false
			renderAreas()
		} else {
			//set up viewer
			document.getElementById("list").innerHTML = ""
			document.getElementsByClassName("voice-button-wrapper")[0].hidden = true
			renderItems()
			/*let areas = document.getElementsByClassName("list-field")
      for (let area of areas) {
        area.disabled = true
      }*/
		}
	}, [state])

	useEffect(() => {
		//console.log(addOneState, "  now and prev:   ", addOnePrevious)
		/*if (addOneState !== addOnePrevious) {
			localElementCounter += 1
			renderAreas("one", addOneState)
			addOnePrevious = addOneState.item
		}*/
		if (addOneState.item !== addOnePrevious.item || addOneState.item === "") {
			localElementCounter += 1
			renderAreas("one", addOneState)
			setPrev(addOneState) //addOnePrevious.item = addOneState.item
		}
	}, [addOneState])

	/*
  editorElem result:
  <label class='editor-list>
    <span class='list-cross' onClick={(e)=>deleteElem(e)}><svg cross></span>
    <span class='list-id'>1</span>
    <textarea class='list-field'>apple</textarea>
    <textarea class='list-count'>2</textarea>
  </label>
  */
	function editorElem(val) {
		//1 элемент редактора
		let label = document.createElement("label")
		label.classList.add("editor-elem")

		let cross = document.createElement("span")
		cross.innerHTML = "X"
		cross.classList.add("list-cross")
		cross.onclick = (e) => {
			deleteElem(e)
		}

		let id = document.createElement("span")
		id.classList.add("list-id")
		id.innerHTML = localElementCounter == undefined ? Object.keys(count).length + 1 : localElementCounter

		let item = document.createElement("textarea")
		item.value = val.item //state[localElementCounter] === undefined ? val.item : state[localElementCounter]
		item.classList.add("list-field")

		let counter = document.createElement("textarea")
		counter.classList.add("list-count")
		counter.innerHTML = val.colv /*
			count[localElementCounter] === undefined || !Number.isInteger(+count[localElementCounter])
				? val.colv
				: +count[localElementCounter]*/

		label.append(cross)
		label.append(id)
		label.append(item)
		label.append(counter)
		localElementCounter += 1
		return label
	}

	function deleteElem(e) {
		//при нажатии на крест в редакторе
		let elem = e.path[1]
		for (let i = 0; i < document.getElementById("list").childNodes.length; i++) {
			if (document.getElementById("list").childNodes[i] == elem) {
				document.getElementById("list").childNodes[i].remove()
				localElementCounter = document.getElementById("list").childNodes.length
				for (let j = 1; j <= localElementCounter; j++) {
					let el = document.getElementById("list").childNodes[j - 1].childNodes[1]
					el.innerHTML = j //el.textContent - 1
					//убрать разрыв в числах при удалении элемента
				}
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
			let label = editorElem(data)
			list.append(label)
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
		<div className="list-wrapper">
			<div className="voice-button-wrapper">
				<button onClick={() => showModal({ state: "on", content: "voice" })}>
					<h1>Добавить элементы голосом</h1>
				</button>
				<p></p>
			</div>
			<div className="list" id="list">
				{/* all content render here */}
			</div>
		</div>
	)
}

/*deleting by removing from state.. unnecessary
  
      let temp = {}
      let tempC = {}
      let x = 0
      for (let [key, val] of Object.entries(state)) {
        if (key != i) {
          //all excepting item to delete
          console.log(temp, tempC)
          temp[x] = val
          if (count[x] != undefined) {
            tempC[x] = count[x]
          }
          x += 1
          console.log(temp, tempC)
          //tempC[x] = count[x] why dont upgrade state...
        }
      }
      console.log("temp", temp, tempC)
      onChange({ ...temp }, { ...tempC })
      */
