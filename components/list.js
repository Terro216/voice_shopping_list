import React, { useEffect, useState, useRef } from "react"
import "./list.scss"

export default function List() {
  const [state, setState] = useState({
    0: "editor", //editor or viewer
    1: "valu1",
    2: "cucumber",
    3: "pig"
  })

  useEffect(() => {
    if (state[0] === "editor") {
      //set up editor
      document.getElementById("head").innerHTML = "Shopping list editor"
      document.getElementById("button1").innerHTML = "Add more"
      document.getElementById("button2").innerHTML = "done"
      renderAreas()
      /*let areas = document.getElementsByClassName("list-field")
      for (let area of areas) {
        area.disabled = false
      }*/
    } else {
      //set up viewer
      document.getElementById("head").innerHTML = "Your shopping list"
      document.getElementById("button1").innerHTML = "Edit list"
      document.getElementById("button2").innerHTML = "Share"
      document.getElementById('list').innerHTML=''
      renderItems()
      /*let areas = document.getElementsByClassName("list-field")
      for (let area of areas) {
        area.disabled = true
      }*/
    }
  })

  function renderItems() {
    let list = document.getElementById('list');
    let size = Object.keys(state).length; 
    for (let i=1;i<size;i++) {
      let item = document.createElement('div');
      item.innerHTML=state[i];
      list.append(item)
    }
  }

  function renderAreas() {
    let list = document.getElementById("list")
    let label = document.createElement("label")
    let span = document.createElement("span")
    let txt = document.createElement("textarea")
    let i = 1
    span.classList.add("list-id")
    span.innerHTML=i
    txt.innerHTML = state[i]===undefined?'':state[i] //num/id
    i+=1;
    txt.classList.add("list-field")
    label.append(span)
    label.append(txt)
    list.append(label)
  }

  function button1() {
    console.log(state[0])
    if (state[0] === "viewer") {
      let temp = state
      temp[0] = "editor"
      let areas = document.getElementsByClassName("list-field")
      let i = 1
      for (let area of areas) {
        let val = area.value
        if (val!=''){
          temp[i]=val
          i+=1
        }
      }
      let size = Object.keys(temp).length; 
      for (i;i<size;i++) {
        delete temp[i] //clean after
      }
      console.log(temp)
      setState({...temp})
    } else {
      renderAreas();
//what else
    }
  }

  function button2() {
    console.log(state[0])
    if (state[0] === "editor") {
      let temp = state
      temp[0] = "viewer"
      setState({...temp})
    } else {
      //share
    }
  }

  return (
    <div className="list-wrapper">
      <h2 id="head" className="list-header">
        Shopping list editor
      </h2>
      <div className="list" id="list">
        <label>
          <span className="list-id">1. </span>
          <textarea className="list-field"></textarea>
        </label>
        <label>
          <span className="list-id">2. </span>
          <textarea className="list-field"></textarea>
        </label>
        <label>
          <span className="list-id">3. </span>
          <textarea className="list-field"></textarea>
        </label>
      </div>
      <div className="list-buttons">
        <button onClick={button1} id="button1">
          Add more
        </button>
        {/*change list*/}
        <button onClick={button2} id="button2">
          Done
        </button>
        {/*share*/}
      </div>
    </div>
  )
}
