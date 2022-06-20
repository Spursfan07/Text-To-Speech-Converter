const textArea = document.querySelector('textarea'),
	voiceList = document.querySelector('select'),
	speechBtn = document.querySelector('button');

let synth = speechSynthesis,
	isSpeaking = true;
console.log(synth);
// voices();

function voices() {
	for (let voice of synth.getVoices()) {
		let selected = voice.name === 'Google US English' ? 'selected' : '';
		let option = `<option value='${voice.name}' ${selected}>${voice.name} (${voice.lang})</option>`;
		voiceList.insertAdjacentHTML('beforeend', option);
	}
}

synth.addEventListener('voiceschanged', voices);

function textToSpeech(text) {
	let utternance = new SpeechSynthesisUtterance(text);

	for (let voice of synth.getVoices()) {
		if (voice.name === voiceList.value) {
			utternance.voice = voice;
		}
	}

	synth.speak(utternance);
}

speechBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (textArea.value !== '') {
		if (!synth.speaking) {
			textToSpeech(textArea.value);
		}
		if (textArea.value > 80) {
			if (isSpeaking) {
				//
				synth.resume();
				isSpeaking = false;
				speechBtn.innerText = 'Pause Speech';
			} else {
				synth.pause();
				isSpeaking = true;
				speechBtn.innerText = 'Resume Speech';
			}

			setInterval(() => {
				if (!synth.speaking && !isSpeaking) {
					isSpeaking = true;
					speechBtn.innerText = 'Convert To Speech';
				}
			});
		} else {
			speechBtn.innerText = 'Convet To Speech';
		}
	}
});
