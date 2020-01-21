
let html = '<div id="container"><button type="button" id="play">Play</button><button type="button" id="stop">Stop</button></div>';

$(document).ready(ready);

function ready(){
    $('body').append( $(html) );
    $('#play').click(()=>{
        textToSpeech()
    });
    $('#stop').click(()=>{
        stop();
    });
    // textToSpeech();
}

let allWords;
function textToSpeech(){
    allWords = $.find('gbt');
    console.log(allWords);
    // // All book text for visible pages
    let bookText = $('.gb-text-reader').first().text();
    speak(bookText);
}

let index = 0;

let port;
function speak(text){
    highlightText();
    port = chrome.runtime.connect({name: "texttospeech"});
    port.postMessage({type: 'speak', text: text});
    port.onMessage.addListener(function(e) {
        index++;
        highlightText();
    });
}
function stop(){
    port.postMessage({type: 'stop'});
}

function highlightText(){
    if(index > 0){
        $(allWords[index-1]).removeClass('highlight');
    }
    $(allWords[index]).addClass('highlight');
}

// let rv = responsiveVoice;
let go = true;
function play(){

    let allWords = $.find('gbt');
    // console.log(allWords);

    // allWords.forEach(word => {
    //     //console.log(word.textContent);
    //     responsiveVoice.speak(word.textContent);
    // });

    // All book text for visible pages
    let bookText = $('.gb-text-reader').first().text();
    //console.log(bookText);
    // Remove newlines and other white space
    bookText = bookText.replace(/\s+/g, ' ');
    // Remove all punctuation
    bookText = bookText.replace(/[^\w\s.]/gi, '');
    // console.log(bookText);
    // Split on periods to create an array of sentences
    let sentences = bookText.split('.');
    // Clean up sentences
    let cleanSentences = [];
    sentences.forEach(sentence => {
        sentence = sentence.trim();
        if(sentence){
            cleanSentences.push(sentence);
        }
    });

    console.log(cleanSentences);

    let s = cleanSentences[0];

    say(s);


    // let i = 0;
    // // sentences.length
    // speak();
    // function speak() {
    //     responsiveVoice.speak(cleanSentences[i].trim(), "UK English Male", {onend: () => {
    //         i++;
    //         if(i < sentences.length) {
    //             speak();
    //         }
    //     }});
    // }

    // while(i<1) {
    //     responsiveVoice.speak(sentences[i].trim(), {onend:done});
    //     // while(go){
    //     //
    //     // }
    //     console.log(responsiveVoice.isPlaying());
    //     // while (responsiveVoice.isPlaying()) {
    //     //
    //     // }
    //     i++;
    //     // break;
    // }

    //responsiveVoice.speak(bookText);


}

function done(){
    console.log('done');
}

function say(text){
    chrome.extension.sendMessage({text: text}, reply);
}

function reply(text){
    console.log(text);
}

// chrome.runtime.onMessage.addListener(function(request) {
//     if(request.word) {
//         console.log(request.word);
//     }
// });



