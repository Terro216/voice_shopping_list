import React, { useEffect } from "react"
import "./controls.scss"

export default function Controls({
  state,
  count,
  onChange,
  onShare,
  addOneToggle,
}) {
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
      addOneToggle("one")
    }
  }

  function button2() {
    if (state[0] === "editor") {
      //готово
      let temp = state
      let tempC = count
      temp[0] = "viewer"
      let areas = document.getElementsByClassName("list-field")
      let areasC = document.getElementsByClassName("list-count")
      let i = 1
      for (let area of areas) {
        let val = area.value
        if (val != "") {
          temp[i] = val
          i += 1
        }
      }
      i = 1
      for (let area of areasC) {
        let val = area.value
        if (!Number.isInteger(+val) || Number.isNaN(+val)) {
          //+val == "") {
          val = 1
        }
        tempC[i] = +val
        i += 1
      }

      //что за clean empty after...
      let size = Object.keys(temp).length
      let iC = i
      for (i; i < size; i++) {
        delete temp[i] //clean empty after
      }

      let sizeC = Object.keys(tempC).length
      for (iC; iC < sizeC; iC++) {
        delete tempC[iC] //clean empty after
      }
      onChange({ ...temp }, { ...tempC })
    } else {
      //поделиться + show modal with link and func of COPY TO CLIPBOARD
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
