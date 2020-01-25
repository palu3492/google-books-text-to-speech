
let tts = chrome.tts;

let settings = {
    volume: 0.2,
    voice: ''
};

chrome.runtime.onConnect.addListener(function(port) {
    // port.name
    port.onMessage.addListener(function(msg) {
        if(msg.type === 'play'){
            console.log('start tts');
            speak(msg.text, port);
        }else if(msg.type === 'pause'){
            console.log('pause tts');
            tts.pause();
        }else if(msg.type === 'stop'){
            console.log('stop tts');
            tts.stop();
        }else if(msg.type === 'volume'){
            console.log('volume change tts');
            settings.volume = msg.level;
        }else if(msg.type === 'update'){
            console.log('update settings tts');
        }
    });
});

function speak(text, port){
    tts.speak(text, {
        onEvent: (e) => {
            if(e.type === 'word') {
                port.postMessage('word');
            }
        },
        volume: settings.volume,
        // Google US English
        // Google UK English Female
        // Google UK English Male
        // voiceName: 'Google UK English Male'
    });
}


// function speak(utterance) {
    // if (speaking && utterance == lastUtterance) {
    //     chrome.tts.stop();
    //     return;
    // }
    //
    // speaking = true;
    // lastUtterance = utterance;
    // globalUtteranceIndex++;
    // var utteranceIndex = globalUtteranceIndex;
    //
    // chrome.browserAction.setIcon({path: 'SpeakSel19-active.png'});

    // var rate = localStorage['rate'] || 1.0;
    // var pitch = localStorage['pitch'] || 1.0;
    // var volume = localStorage['volume'] || 1.0;
    // var voice = localStorage['voice'];
    // chrome.tts.speak(utterance);

    // chrome.tts.speak(
    //     utterance,
    //     {voiceName: voice,
    //         rate: parseFloat(rate),
    //         pitch: parseFloat(pitch),
    //         volume: parseFloat(volume),
    //         onEvent: function(evt) {
    //             if (evt.type == 'end' ||
    //                 evt.type == 'interrupted' ||
    //                 evt.type == 'cancelled' ||
    //                 evt.type == 'error') {
    //                 if (utteranceIndex == globalUtteranceIndex) {
    //                     speaking = false;
    //                     chrome.browserAction.setIcon({path: 'SpeakSel19.png'});
    //                 }
    //             }
    //         }
    //     });
// }