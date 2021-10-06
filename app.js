import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import List from "./components/list.js"
import db from "./components/firebase.js"
import { collection, addDoc, getDoc, doc } from "firebase/firestore"
import "./app.scss"

function App() {
  const [state, setState] = useState({
    0: "editor", //editor or viewer...maybe SPLIT to ANOTHER STATE
    1: "яблоко",
    2: "бананы",
    3: "лимон",
    4: "молоко",
  })
  const [count, setCount] = useState({
    1: 1,
    2: 8,
    3: 1,
    4: 2, //finish here
  })
  const [url, setUrl] = useState("")

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
    const docRef = await addDoc(collection(db, "lists"), { state, count })
    console.log("Document written with ID: ", docRef.id)
    window.location.search = "?" + docRef.id
  }

  return (
    <div className="app">
      <List
        state={state}
        count={count}
        onChange={handleChange}
        onShare={sharing}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
