import React, { useEffect } from "react"
import "./list.scss"

//доделать связь между list controls и modal - что бы все могли добавить элемент через render areas one!!!!!!!

export default function List({
  state,
  count,
  showModal,
  addOneToggle,
  addOneState,
}) {
  let localElementCounter
  useEffect(() => {
    localElementCounter = Object.keys(count).length

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
    if (addOneState.state == true) {
      console.log(addOneState)
      renderAreas("one", addOneState.data)
      addOneToggle()
    }
  }, [addOneState])

  /*
  editorElem result:
  <label class='editor-list>
    <span class='list-cross' onClick={(e)=>deleteElem(e)}><svg cross></span>
    <span class='list-id'>1.</span>
    <textarea class='list-field'>apple</textarea>
    <textarea class='list-count'></textarea>
  </label>
  */
  function editorElem(val = "") {
    let label = document.createElement("label")
    label.classList.add("editor-elem")
    let cross = document.createElement("span")
    let id = document.createElement("span")
    let txt = document.createElement("textarea")
    let counter = document.createElement("textarea")
    counter.classList.add("list-count")
    counter.innerHTML =
      count[localElementCounter] === undefined ||
      !Number.isInteger(+count[localElementCounter])
        ? 1
        : +count[localElementCounter]
    cross.innerHTML = "X"
    cross.classList.add("list-cross")
    cross.onclick = (e) => {
      deleteElem(e)
    }
    id.classList.add("list-id")
    id.innerHTML = localElementCounter // == undefined ? localElementCounter : i

    txt.value =
      state[localElementCounter] === undefined
        ? val
        : state[localElementCounter]
    txt.classList.add("list-field")
    label.append(cross)
    label.append(id)
    label.append(txt)
    label.append(counter)
    localElementCounter += 1
    return label
  }

  function deleteElem(e) {
    let elem = e.path[1]
    for (
      let i = 0;
      i < document.getElementById("list").childNodes.length;
      i++
    ) {
      if (document.getElementById("list").childNodes[i] == elem) {
        document.getElementById("list").childNodes[i].remove()
        localElementCounter -= 1
        for (let j = i; j < localElementCounter; j++) {
          let el = document.getElementById("list").childNodes[j].childNodes[1]
          el.innerHTML = el.textContent - 1
          //убрать разрыв в числах при удалении элемента
        }
        break
      }
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
      console.log("one")

      let label = editorElem(data)
      console.log(label)

      list.append(label)
      return 0
    }
    localElementCounter = 1 //Object.keys(count)[Object.keys(count).length - 1]
    while (localElementCounter < Object.keys(state).length) {
      let label = editorElem()
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
