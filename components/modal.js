import React, { useEffect } from "react"
import "./modal.scss"

export default function Modal({ modal, closeModal, addOneToggle }) {
  useEffect(() => {
    //console.log(document.getElementById("modal"))
    if (modal.state === "on") {
      document.getElementById("modal").style.display = ""
      document.getElementById("modal-main").innerHTML = ""
      if (modal.content == "voice") {
        renderVoice()
      } else if (modal.content == "copy") {
        renderCopy()
      }
    } else {
      document.getElementById("modal").style.display = "none"
    }
  })

  /* voice
  <div class="voice-micro">
  
  </div>
  <div class="voice-info"></div>
  */
  function renderVoice() {
    let main = document.getElementById("modal-main")
    let micro = document.createElement("div")
    micro.classList.add("voice-micro")
    micro.innerHTML = "voice icon"
    micro.onclick = (e) => {
      voice()
    }
    let info = document.createElement("div")
    info.classList.add("voice-info")
    info.innerHTML =
      "Нажмите на кнопку и перечислите продукты для добавления в список"

    main.append(micro)
    main.append(info)
  }

  function renderCopy() {
    let main = document.getElementById("modal-main")
    let wrapper = document.createElement("div")
    wrapper.classList.add("copy-wrapper")
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
        addOneToggle(res[i])
      }

      closeModal({ state: "off", content: "closed" })
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
    <div className="modal-wrapper" id="modal">
      <div
        className="modal-background"
        onClick={() => closeModal({ state: "off", content: "closed" })}></div>
      <div className="modal-main" id="modal-main">
        hello from modal!
      </div>
    </div>
  )
}
