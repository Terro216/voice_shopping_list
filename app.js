import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import List from "./components/list.js"
import Modal from "./components/modal.js"
import Header from "./components/header.js"
import Controls from "./components/controls.js"
import db from "./components/firebase.js"
import { collection, addDoc, getDoc, doc } from "firebase/firestore"
import "./app.scss"

function App() {
  const [state, setState] = useState({
    0: "editor", //editor or viewer...maybe SPLIT to ANOTHER STATE
    1: "молоко",
    2: "хлеб",
    3: "киви",
    4: "крендели",
  })
  const [count, setCount] = useState({
    1: 1,
    2: 2,
    3: 3,
    4: 4, //finish here
  })
  const [modal, setModal] = useState({
    state: "off",
    content: "voice",
  })
  const [url, setUrl] = useState("")
  const [addOneState, addOne] = useState(false)

  useEffect(async () => {
    //let params = window.location.pathname.substring(22); git
    let params = window.location.search.substring(1)
    if (params !== url) {
      setUrl(params)
      let docRef = doc(db, "lists", params)
      let docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        //console.log("Document data:", data);
        handleChange(docSnap.data().state, docSnap.data().count)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
      }
    }
  })

  function handleChange(newState, newCounter = {}) {
    if (newCounter && Object.keys(newCounter).length !== 0) {
      //if not default
      setCount(newCounter)
    }
    setState(newState)
    console.log("main state ", state)
    console.log("main count ", count)
  }

  async function sharing() {
    modalToggle({ state: "on", content: "copy" }) //check if working or back it setModal({ state: "on", content: "copy" })
    //форма копирования открывается в модалке
    const docRef = await addDoc(collection(db, "lists"), { state, count })
    console.log("Document written with ID: ", docRef.id)
    window.location.search = "?" + docRef.id
    navigator.clipboard.writeText(window.location.href)
  }

  function modalToggle(e) {
    console.log(e)
    setModal({ ...e })
  }

  function addOneToggle(e) {
    if (addOneState == false) {
      addOne(true)
    } else {
      addOne(false)
    }
  }

  return (
    <div className="app">
      <Modal modal={modal} closeModal={modalToggle} />
      <Header state={state} />
      <List
        state={state}
        count={count}
        showModal={modalToggle}
        addOneState={addOneState}
        addOneToggle={addOneToggle}
      />
      <Controls
        state={state}
        count={count}
        onChange={handleChange}
        onShare={sharing}
        addOneToggle={addOneToggle}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
