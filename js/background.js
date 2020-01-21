
chrome.runtime.onConnect.addListener(function(port) {
    // port.name
    port.onMessage.addListener(function(msg) {
        if(msg.type === 'stop'){
            console.log('stop speaking');
            chrome.tts.stop();
        }else if(msg.type === 'speak'){
            console.log('start speaking');
            speak(msg.text, port);
        }
    });
});

function speak(text, port){
    chrome.tts.speak(text, {
        onEvent: (e) => {
            if(e.type === 'word') {
                port.postMessage('word');
            }
        },
        volume: 0.5,
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