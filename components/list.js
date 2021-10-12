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
    if (addOneState == true) {
      renderAreas("one")
      addOneToggle()
      return 0
    }
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
  })
  function editorElem(val = "") {
    let i = localElementCounter
    let label = document.createElement("label")
    label.classList.add("editor-list")
    let cross = document.createElement("span") //from div
    let id = document.createElement("span")
    let txt = document.createElement("textarea")
    let counter = document.createElement("textarea") //change from div
    counter.classList.add("list-count")
    counter.innerHTML =
      count[i] === undefined || !Number.isInteger(+count[i]) ? 1 : +count[i]
    cross.innerHTML = "X"
    cross.classList.add("list-cross")
    cross.onclick = (e) => {
      deleteElem(e)
    }
    id.classList.add("list-id")
    id.innerHTML = i // == undefined ? localElementCounter : i
    //localElementCounter += 1
    txt.value = state[i] === undefined ? val : state[i]
    txt.classList.add("list-field")
    label.append(cross)
    label.append(id)
    label.append(txt)
    label.append(counter)
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
        // i += 1 //+ editor setting
        // console.log(i)
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
  /*
  function editorElem(i, val = "") {
    let label = document.createElement("label")
    label.classList.add("editor-list")
    let cross = document.createElement("span") //from div
    let id = document.createElement("span")
    let txt = document.createElement("textarea")
    let counter = document.createElement("textarea") //change from div
    counter.classList.add("list-count")
    counter.innerHTML =
      count[i] === undefined || !Number.isInteger(+count[i]) ? 1 : +count[i]
    cross.innerHTML = "X"
    cross.classList.add("list-cross")
    cross.onclick = (e) => {
      deleteElem(e)
    }
    id.classList.add("list-id")
    id.innerHTML = i == undefined ? localElementCounter : i
    localElementCounter += 1
    txt.value = state[i] === undefined ? val : state[i]
    txt.classList.add("list-field")
    label.append(cross)
    label.append(id)
    label.append(txt)
    label.append(counter)
    return label
  }*/

  function renderItems() {
    let list = document.getElementById("list")
    let size = Object.keys(state).length
    for (let i = 1; i < size; i++) {
      let item = document.createElement("div")
      item.innerHTML = state[i] + " " + count[i] + " шт."
      list.append(item)
    }
  }

  function renderAreas(prop) {
    if (prop == "one") {
      //one = add one area
      let list = document.getElementById("list")

      let label = editorElem()
      localElementCounter += 1

      list.append(label)
      return 0
    }
    let list = document.getElementById("list")
    localElementCounter = 1 //Object.keys(count)[Object.keys(count).length - 1]
    while (localElementCounter < Object.keys(state).length) {
      let label = editorElem()
      list.append(label)
      localElementCounter += 1
    }
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
