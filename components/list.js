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

  const editorElem = (i) => {
      let label = document.createElement("label")
      let cross = document.createElement("div")
      let span = document.createElement("span")
      let txt = document.createElement("textarea")
      cross.innerHTML="XXX DELETE XXX"
      cross.classList.add('list-cross');
      cross.onclick = (e) => {
        deleteElem(e);
      }
      span.classList.add("list-id")
      span.innerHTML=i
      txt.value = state[i]===undefined?'':state[i] //num/id
      txt.classList.add("list-field")
      label.append(cross)
      label.append(span)
      label.append(txt)
      return label
  }

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
    if (prop=='one'){ //one = add one element
      let list = document.getElementById("list")
      /*
      let label = document.createElement("label")
      let span = document.createElement("span")
      let txt = document.createElement("textarea")
      span.classList.add("list-id")
      txt.classList.add("list-field")
      span.value=''
      txt.value = ''
      label.append(span)
      label.append(txt)*/

      let label = editorElem(Object.keys(state).length);
      list.append(label) 
      state[O]
      return 0;
    }
    let list = document.getElementById("list")
    let i = 1
    while (i<Object.keys(state).length) {
      let label = editorElem(i);
      list.append(label)
      i+=1;
    }
  }

  function deleteElem(e) {
    let elem = e.srcElement.parentNode;
    let i;
    for (i=0;i<document.getElementById("list").childNodes.length;i++) {
      //console.log(document.getElementById("list").childNodes[i],elem)
      if (document.getElementById("list").childNodes[i]==elem) {
        break
      }
    }
    i+=1; //+ editor setting
    //console.log('del',elem)
    //elem.parentNode.removeChild(elem);
    let temp = {};
    let x = 0;
    for (let [key,val] of Object.entries(state)) {
      if (key!=i) { //all excepting item to delete
        temp[x]=val;
        x+=1;
      }
    }
    onChange({...temp})
  }

  function button1() {
    if (state[0] === "viewer") {
      let temp = state
      temp[0] = "editor"
      onChange({...temp})
    } else {
      renderAreas('one'); //what is one
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
        delete temp[i] //clean empty after
      }
      onChange({...temp})
    } else {
      //share + COPY TO CLIPBOARD
      onShare();
    }
  }

  function voice() {
    let recognition;
  try {
    recognition = new webkitSpeechRecognition();
  } catch (e) {
    recognition = new SpeechRecognition();
  }
    //const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    //const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    recognition.lang="ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    
    recognition.start();
    console.log('Ready to receive a command.');

    recognition.onaudiostart = function() {
      //hidden show something
    }; 

    recognition.onspeechend = function() {
      recognition.stop();
     // microphoneWrapper.style.visibility = 'visible'; hidden show again
     // audioRecordAnimation.style.visibility = 'hidden';
    };

    recognition.onnomatch = function(event) {
      alert("Error. Please, try again");
    };

    recognition.onresult = function(event) {
      const last = event.results.length - 1;
      let res = event.results[last][0].transcript.split(' ');
      console.log('res: ',res)
      //точность console.log('Confidence: ' + event.results[0][0].confidence);
    };
    

  }

  return (
    <div className="list-wrapper">
      <h2 id="head" className="list-header">
        Shopping list editor
      </h2>
      <div className="voice-button-wrapper">
        <button onClick={voice}><h1>Add elements by voice</h1></button><p></p>
      </div>
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
