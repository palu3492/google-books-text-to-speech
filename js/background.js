
chrome.runtime.onMessage.addListener(function(request) {
    chrome.tts.speak(request.msg);
});

function speak(utterance) {
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
    chrome.tts.speak(utterance);

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
}