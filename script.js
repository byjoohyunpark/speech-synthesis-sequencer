const synth = window.speechSynthesis;
let phase = 0;
let state = false;
let play;


const voiceSelect = document.getElementById('voice');

const loadVoices = () => {
    let voices = speechSynthesis.getVoices();
    voices.forEach(function (voice, i) {
        let option = document.createElement('option');
        option.value = voice.name;
        option.innerHTML = voice.name;
        voiceSelect.appendChild(option);
    });
}

loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = (e) => {
    loadVoices();
};



const speak = (text, i) => {

    let utterThis = new SpeechSynthesisUtterance(text);
    let voices = window.speechSynthesis.getVoices();
    utterThis.pitch = 2 - (i / 16);
    utterThis.rate = 2;

    if (voiceSelect.value) {
        utterThis.voice = speechSynthesis.getVoices().filter((voice) => {
            return voice.name == voiceSelect.value;
        })[0];
    }
    synth.speak(utterThis);
};


const getTrack = () => {
    //    synth.cancel();

    for (let i = 1; i < 9; i++) {
        if (phase == i) {
            document.querySelector(`#value${i}`).style.backgroundColor = "#5200ff";
            console.log(document.querySelector(`#value${i}`).value);
            speak(document.querySelector(`#value${i}`).value, i);

        } else {
            document.querySelector(`#value${i}`).style.backgroundColor = "white";
        }

    }


}



const sound = () => {
    phase++;
    if (phase > 8) {
        phase = 1;
    }

    getTrack();
}


let button = document.querySelector('#button');

button.addEventListener("click", () => {
    if (state) {
        state = false;
        button.innerHTML = 'start';
        clearInterval(play);
        phase = 0;
        for (let i = 1; i < 9; i++) {
            document.querySelector(`#value${i}`).style.backgroundColor = "white";
        }
    } else {
        state = true;
        button.innerHTML = 'stop';
        play = setInterval(sound, 500);
    }

});
