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
				renderCopy(modal.val)
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
		info.innerHTML = "Нажмите на кнопку и перечислите продукты для добавления в список"
		main.append(micro)
		main.append(info)
	}

	function renderCopy(val) {
		let newUrl = window.location.origin + "?" + val
		console.log(newUrl)

		navigator.clipboard.writeText(newUrl)

		let main = document.getElementById("modal-main")
		let wrapper = document.createElement("div")
		wrapper.classList.add("copy-wrapper")
		let header = document.createElement("copy-header")
		header.innerHTML = `<h2>Copyied!</h2>`
		let copyLine = document.createElement("textarea")
		copyLine.innerText = newUrl
		wrapper.append(header)
		wrapper.append(copyLine)
		main.append(wrapper)

		document.getElementsByClassName("modal-background")[0].onclick = function () {
			window.location = newUrl
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

			console.log("res: ", res)

			for (let i = 0; i < res.length; i++) {
				addOneToggle(res[i])
			}

			closeModal({ state: "off", content: "closed" })
			//точность надо? console.log('Confidence: ' + event.results[0][0].confidence);
		}
	}

	return (
		<div className="modal-wrapper" id="modal">
			<div className="modal-background" onClick={() => closeModal({ state: "off", content: "closed" })}></div>
			<div className="modal-main" id="modal-main">
				hello from modal!
			</div>
		</div>
	)
}
