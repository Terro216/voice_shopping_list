import React, { useEffect } from "react"
import * as microPNG from "../files/micro.png"

//* команда отмена = удалить последнее

export default function Modal({ modal, closeModal, addOneToggle }) {
	useEffect(() => {
		//console.log(document.getElementById("modal"))
		if (modal.state === "on") {
			document.getElementById("modal").classList.remove("hidden")
			document.getElementById("modal-main").innerHTML = ""
			if (modal.content == "voice") {
				renderVoice()
			} else if (modal.content == "copy") {
				renderCopy(modal.val)
			}
		} else {
			document.getElementById("modal").classList.add("hidden")
		}
	})

	/* voice
	<div id="modal-main">
  		<div class="voice-info">Нажмите на кнопку и начните говорить
			<br>Команды:<br>
			<ul class="list-disc w-2/3 m-3">
			<li>"Название продукта" - добавить один продукт</li>
			<li>"Название продукта" и "цифра количества" - добавить несколько.<br> Пример: "Банан три"</li>
			<li>"Конец", "Всё" (или закрытие окна) - закончить ввод</li>
			</ul></div>
  		<div class="voice-micro">
	<img class="w-19" src="${microPNG}"/
  		</div>

		  {button}
  	</div>
*/
	function renderVoice() {
		let main = document.getElementById("modal-main")

		let info = document.createElement("div")
		info.className =
			"w-full md:w-2/3 h-auto mx-auto mt-10 text-center shadow-md flex flex-col justify-center items-center"
		info.innerHTML = `Нажмите на кнопку и начните говорить
			<p>Команды:<br>
			<ul class="list-disc w-10/12 md:w-2/3 m-3">
			<li>"Название продукта" - добавить один продукт</li>
			<li>"Название продукта" + "цифра количества" - добавить несколько<br> Пример: "Банан три"</li>
			<li>"Отмена" - убрать последний элемент</li>
			<li>"Конец" или "Всё" - закончить ввод</li>
			</ul>`

		let micro = document.createElement("div")
		micro.className = "w-max h-max mx-auto my-8 px-4 py-4 border rounded-full hover:shadow-lg"
		micro.innerHTML = `<img class="w-19" src="${microPNG}"/>`
		micro.onclick = (e) => {
			voice()
		}

		let button = createButton()

		main.append(info)
		main.append(micro)
		main.append(button)
	}

	function renderCopy(val) {
		let newUrl = window.location.origin + window.location.pathname + "?" + val
		//console.log(newUrl)

		navigator.clipboard.writeText(newUrl)

		let main = document.getElementById("modal-main")

		let wrapper = document.createElement("div")
		wrapper.className = "flex flex-col items-center w-full h-full"

		let header = document.createElement("div")
		header.className = "flex flex-col justify-center items-center w-full m-10"
		header.innerHTML = `
		<div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100">
			<svg
			class="h-9 w-9 text-green-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 13l4 4L19 7"
				></path>
			</svg>
		</div>
		<h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Ссылка скопирована!</h3>`

		let copyLine = document.createElement("input")
		copyLine.type = "text"
		copyLine.disabled = true
		copyLine.className =
			"w-11/12 md:w-1/2 h-max mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
		copyLine.value = newUrl

		let button = createButton()
		button.classList.add("mt-5")

		wrapper.append(header)
		wrapper.append(copyLine)
		wrapper.append(button)
		main.append(wrapper)

		document.getElementById("modal-background").addEventListener("click", function () {
			window.location.href = newUrl
		})
		document.getElementById("close-modal-button").addEventListener("click", function () {
			window.location.href = newUrl
			//window.onload = () => close()
		})
	}

	function close() {
		closeModal({ state: "off", content: "closed" })
	}

	function createButton() {
		let button = document.createElement("button")
		button.className =
			"px-6 py-4 bg-green-500 text-white text-base font-medium rounded-md mx-auto mb-10 w-max h-max shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
		button.id = "close-modal-button"
		button.innerText = "Закрыть окно"
		button.addEventListener("click", close)
		return button
	}

	function voice() {
		let recognition
		const numsAlp = [
			"Один",
			"Два",
			"Три",
			"Четыре",
			"Пять",
			"Шесть",
			"Семь",
			"Восемь",
			"Девять",
			"Десять",
			"Одиннадцать",
			"Двенадцать",
			"Тринадцать",
			"Четырнадцать",
			"Пятнадцать",
			"Cемнадцать",
			"Восемнадцать",
			"Девятнадцать",
			"Двадцать",
		]
		try {
			recognition = new webkitSpeechRecognition()
		} catch (e) {
			recognition = new SpeechRecognition()
		}
		//const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
		//const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
		recognition.lang = "ru-RU"
		recognition.interimResults = false //промежуточные
		recognition.continuous = true
		recognition.maxAlternatives = 1

		recognition.start()

		document.getElementById("modal-background").addEventListener("click", () => {
			recognition.stop()
		})
		document.getElementById("close-modal-button").addEventListener("click", () => {
			//button in modal
			recognition.stop()
		})

		console.log("Ready to receive a command.")

		recognition.onaudiostart = function () {
			//hidden show something
		}

		recognition.onspeechend = function () {
			closeModal({ state: "off", content: "closed" })
			//конец по причине тишины
			//recognition.start()
			//microphoneWrapper.style.visibility = 'visible'; hidden show again
			//audioRecordAnimation.style.visibility = 'hidden';
		}

		recognition.onresult = function (event) {
			const last = event.results.length - 1
			let res = event.results[last][0].transcript
				.trim()
				.split(" ")
				.map((el) => el.charAt(0).toUpperCase() + el.slice(1))

			console.log("res: ", res)

			for (let i = 0; i < res.length; i++) {
				console.log(res[i])
				if (res[i] == "Конец" || res[i] == "Стоп" || res[i] == "Всё") {
					recognition.stop()
					console.log("recognition stopped")
					closeModal({ state: "off", content: "closed" })
				} else if (numsAlp.includes(res[i + 1]) || Number.isInteger(+res[i + 1])) {
					//если следующее - колво
					if (Number.isInteger(+res[i + 1])) {
						addOneToggle({ item: res[i], colv: +res[i + 1] })
					} else {
						addOneToggle({ item: res[i], colv: numsAlp.indexOf(res[i + 1]) + 1 })
					}
					i++
				} else {
					addOneToggle({ item: res[i], colv: 1 })
				}
			}

			//closeModal({ state: "off", content: "closed" })
			//точность надо? console.log('Confidence: ' + event.results[0][0].confidence);
		}
	}

	return (
		<div className="absolute flex justify-center hidden inset-0 h-full w-full z-20 " id="modal">
			<div
				className="fixed bg-gray-600 bg-opacity-50 h-full w-full"
				id="modal-background"
				onClick={close}></div>
			<div className="fixed flex flex-col bg-white w-10/12 md:w-6/12 h-max my-16 md:my-2" id="modal-main">
				hello from modal!
			</div>
		</div>
	)
}
