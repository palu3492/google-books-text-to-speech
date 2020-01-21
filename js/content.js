
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

let wordElements = [];
let bookWords;
function textToSpeech(){
    let elements = $.find('gbt');
    elements.forEach(wordElement => {
        if($(wordElement).text().trim()){
            wordElements.push(wordElement);
        }
    });
    // All book text for visible pages
    let bookText = $('.gb-text-reader').first().text();
    bookText = bookText.replace(/\s+/g, ' ').trim();
    bookWords = bookText.split(' ');
    console.log(bookWords);
    console.log(wordElements);
    updateWordElements();
    speak(bookText);
}

let newWordElements = [];
function updateWordElements(){
    let w = 0;
    for(let i=0; i<bookWords.length; i++){
        console.log(bookWords[i]);
        let c = 0;
        newWordElements[w] = [];
        while(elementText(w) !== bookWords[i]){
            newWordElements[w].push(wordElements[w+c]);
            c++;
        }
        w += c;
        w++;
        console.log(elementText(w));
        console.log(w);
    }
}

function elementText(w){
    let text = "";
    newWordElements[w].forEach(element => {
        text += $(element).text().trim();
    });
    return text;
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
        // $(newWordElements[index-1]).removeClass('highlight');
        // $(bookWords[index-1]).addClass('oldHighlight');
        newWordElements[index-1].forEach(element => {
            $(element).removeClass('highlight');
        });
    }
    newWordElements[index].forEach(element => {
        $(element).addClass('highlight');
    });
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
