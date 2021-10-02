import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import List from './components/list.js';
import db from './components/firebase.js'
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import './app.scss';

function App() {
    const [state, setState] = useState({
        0: "editor", //editor or viewer SPLIT to ANOTHER STATE
        1: "TOMATO",
        2: "potato",
        3: "cucumber",
        4: "moloko"
    })
    const [url,setUrl] = useState("")

    useEffect(async()=>{
        //let params = window.location.pathname.substring(22); git
        let params = window.location.search.substring(1);
        if (params!==url) {
            setUrl(params);
            let docRef = doc(db, "lists", params);
            let docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              //console.log("Document data:", data);
              handleChange({...docSnap.data()});
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }            
        }
    })

    function handleChange(newState) {
        setState(newState);
        console.log('main state ',state);
    }

    async function sharing() {
        const docRef = await addDoc(collection(db, "lists"), state);
        console.log("Document written with ID: ", docRef.id);
        window.location.search = "?"+docRef.id;
    }

    return (
        <div className="app">
            <List state={state} onChange={handleChange} onShare={sharing}/>
            
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
