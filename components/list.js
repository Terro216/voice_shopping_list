import React, { useEffect } from "react"
import "./list.scss"

export default function List({state, onChange, onShare}) {

  useEffect(() => {
    if (state[0] === "editor") {
      //set up editor
      document.getElementById("head").innerHTML = "Shopping list editor"
      document.getElementById("button1").innerHTML = "Add more"
      document.getElementById("button2").innerHTML = "Done"
      document.getElementById('list').innerHTML=''
      renderAreas()
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

  function renderAreas(prop) {
    if (prop=='one'){
      let list = document.getElementById("list")
      let label = document.createElement("label")
      let span = document.createElement("span")
      let txt = document.createElement("textarea")
      span.classList.add("list-id")
      txt.classList.add("list-field")
      span.value=''
      txt.value = ''
      label.append(span)
      label.append(txt)
      list.append(label)
      return 0;
    }
    let list = document.getElementById("list")
    let i = 1
    while (i<Object.keys(state).length) {
    let label = document.createElement("label")
    let span = document.createElement("span")
    let txt = document.createElement("textarea")
    span.classList.add("list-id")
    span.value=i
    txt.value = state[i]===undefined?'':state[i] //num/id
    txt.classList.add("list-field")
    label.append(span)
    label.append(txt)
    list.append(label)
    i+=1;
    }
  }

  function button1() {
    if (state[0] === "viewer") {
      let temp = state
      temp[0] = "editor"
      onChange({...temp})
    } else {
      renderAreas('one');
//what else
    }
  }

  function button2() {
    if (state[0] === "editor") {
      let temp = state
      temp[0] = "viewer"
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
      onChange({...temp})
    } else {
      //share
      onShare();
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
