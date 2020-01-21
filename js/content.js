
let html = '<div id="container"><button type="button" id="play">Play</button><button type="button" id="stop">Stop</button></div>';

$(document).ready(setup);

function setup(){
    $('body').append( $(html) );
    $('#play').click(()=>{
        textToSpeech();
    });
    $('#stop').click(()=>{
        stop();
    });
}

let bookWords = [];
function textToSpeech(){
    let words = $.find('gbt');
    words.forEach(word => {
        if($(word).text().trim()){
            bookWords.push(word);
        }
    });
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
    index = 0;
    port.postMessage({type: 'stop'});
}

function highlightText(){
    if(index > 0){
        $(bookWords[index-1]).removeClass('highlight');
        // $(bookWords[index-1]).addClass('oldHighlight');
    }
    $(bookWords[index]).addClass('highlight');
}

// let go = true;
// function play(){
//
//     let allWords = $.find('gbt');
//     // console.log(allWords);
//
//     // allWords.forEach(word => {
//     //     //console.log(word.textContent);
//     //     responsiveVoice.speak(word.textContent);
//     // });
//
//     // All book text for visible pages
//     let bookText = $('.gb-text-reader').first().text();
//     //console.log(bookText);
//     // Remove newlines and other white space
//     bookText = bookText.replace(/\s+/g, ' ');
//     // Remove all punctuation
//     bookText = bookText.replace(/[^\w\s.]/gi, '');
//     // console.log(bookText);
//     // Split on periods to create an array of sentences
//     let sentences = bookText.split('.');
