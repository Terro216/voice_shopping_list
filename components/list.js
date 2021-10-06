import React, { useEffect } from "react"
import "./list.scss"

export default function List({ state, count, onChange, onShare }) {
  let localElementCounter
  useEffect(() => {
    localElementCounter = Object.keys(count).length
    if (state[0] === "editor") {
      //set up editor
      document.getElementById("head").innerHTML = "Редактор листа покупок"
      document.getElementById("button1").innerHTML = "Добавить продукты"
      document.getElementById("button2").innerHTML = "Готово"
      document.getElementById("list").innerHTML = ""
      document.getElementsByClassName("voice-button-wrapper")[0].hidden = false
      renderAreas()
    } else {
      //set up viewer
      document.getElementById("head").innerHTML = "Ваш лист покупок"
      document.getElementById("button1").innerHTML = "Редактировать"
      document.getElementById("button2").innerHTML = "Поделиться"
      document.getElementById("list").innerHTML = ""
      document.getElementsByClassName("voice-button-wrapper")[0].hidden = true
      renderItems()
      /*let areas = document.getElementsByClassName("list-field")
      for (let area of areas) {
        area.disabled = true
      }*/
    }
  })

  function editorElem(i, val = "") {
    let label = document.createElement("label")
    let cross = document.createElement("div")
    let span = document.createElement("span")
    let txt = document.createElement("textarea")
    let counter = document.createElement("div")
    counter.innerHTML = `
      <textarea class="list-count">${
        count[i] === undefined || !Number.isInteger(+count[i]) ? 1 : +count[i]
      }</textarea>
      `
    cross.innerHTML = "XXX DELETE XXX"
    cross.classList.add("list-cross")
    cross.onclick = (e) => {
      deleteElem(e)
    }
    span.classList.add("list-id")
    span.innerHTML = i == undefined ? localElementCounter : i
    localElementCounter += 1
    txt.value = state[i] === undefined ? val : state[i] //num/id
    txt.classList.add("list-field")
    label.append(cross)
    label.append(span)
    label.append(txt)
    label.append(counter)
    return label
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

  function renderAreas(prop) {
    if (prop == "one") {
      //one = add one area
      let list = document.getElementById("list")

      let label = editorElem(localElementCounter)
      list.append(label)
      return 0
    }
    let list = document.getElementById("list")
    let i = 1
    localElementCounter = 1 //Object.keys(count)[Object.keys(count).length - 1]
    while (i < Object.keys(state).length) {
      let label = editorElem(i)
      list.append(label)
      i += 1
    }
  }

  function deleteElem(e) {
    //wrong working - delete all elems

    let elem = e.path[1]
    for (
      let i = 0;
      i < document.getElementById("list").childNodes.length;
      i++
    ) {
      if (document.getElementById("list").childNodes[i] == elem) {
        document.getElementById("list").childNodes[i].remove()
        i += 1 //+ editor setting
        // console.log(i)
        break
      }
    }
    /*deleting by removing from state.. unnecessary or not

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

  function button1() {
    if (state[0] === "viewer") {
      //редактировать
      let temp = state
      temp[0] = "editor"
      onChange({ ...temp })
    } else {
      //добавить продукты
      renderAreas("one")
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

  function voice() {
    let recognition
    try {
      recognition = new webkitSpeechRecognition()
    } catch (e) {
      recognition = new SpeechRecognition()
    }
    //const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    //const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    recognition.lang = "ru-RU"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()
    console.log("Ready to receive a command.")

    recognition.onaudiostart = function () {
      //hidden show something
    }

    recognition.onspeechend = function () {
      recognition.stop()
      // microphoneWrapper.style.visibility = 'visible'; hidden show again
      // audioRecordAnimation.style.visibility = 'hidden';
    }

    recognition.onnomatch = function (event) {
      //alert("Error. Please, try again")
    }

    recognition.onresult = function (event) {
      const last = event.results.length - 1
      let res = event.results[last][0].transcript.split(" ")
      let list = document.getElementById("list")

      console.log("res: ", res)

      for (let i = 0; i < res.length; i++) {
        let label = editorElem(localElementCounter, res[i])
        list.append(label)
      }

      /*adding to list (update state)
      let temp = state
      let size = Object.keys(temp).length
      for (let i = 0; i < res.length; i++) {
        /*if (Number.isInteger(+res[i])) {
          tempC[sizeC] = +res[i] //3->count but three isnt working
          sizeC += 1
        } else {...
        temp[size] = res[i]
        size += 1
      }
      onChange({ ...temp })
      */
      //точность надо? console.log('Confidence: ' + event.results[0][0].confidence);
    }
  }

  return (
    <div className="list-wrapper">
      <h2 id="head" className="list-header">
        Редактор листа покупок
      </h2>
      <div className="voice-button-wrapper">
        <button onClick={voice}>
          <h1>Добавить элементы голосом</h1>
        </button>
        <p></p>
      </div>
      <div className="list" id="list">
        {/* all content render here */}
      </div>
      <div className="list-buttons">
        <button onClick={button1} id="button1">
          Добавить продукты
        </button>
        {/*change list*/}
        <button onClick={button2} id="button2">
          Сохранить
        </button>
        {/*share*/}
      </div>
    </div>
  )
}
