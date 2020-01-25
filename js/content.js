
let html = `
<div id="container1">
    <div id="container2">
        <div style="display: flex;justify-content: space-between;padding: 10px;padding-bottom: 4px">
            <span>Controls</span>
            <i class="fas fa-sliders-h" id="settings"></i>
        </div>
        <div>
            <button type="button" class="button" id="play">Play</button>
            <button type="button" class="button" id="play">Pause</button>
            <button type="button" class="button" id="stop">Stop</button>
        </div>
        <div>
            <span>Volume</span>
            <input type="range" min="1" max="5" value="3" id="volume-slider">
        </div>
    </div>
    <button type="button" id="visibility">🡅</button>
</div>
`;

$(document).ready(init);

let port;
function init(){
    uiSetup();
    port = chrome.runtime.connect({name: "texttospeech"});
}

function uiSetup(){
    $('body').append( $(html) );
    $('#play').click(()=>{
        // textToSpeech();
        t();
    });
    $('#stop').click(()=>{
        stop();
    });
    let v = $('#visibility');
    let c = $('#container2');
    v.click(()=>{
        if(v.text() === '🡅'){
            c.hide();
            v.text('🡇');
        }else{
            c.show();
            v.text('🡅');
        }
    });
    let volumeMap = {'1': 0.2,'2': 0.4,'3': 0.6,'4': 0.8,'5': 1.0};
    $('#volume-slider')[0].addEventListener("change", function() {
        let value = volumeMap[$('#volume-slider')[0].value];
        port.postMessage({type: 'volume', level: value});
    }, false);
    $('#settings')[0].click(()=>{
        console.log('settings');
    });
}

let words = [[]];
let bookText = "";
function t(){
    let elements = $('gbt');
    for(let i = 0; i<elements.length; i++){
        let element = elements[i];
        let text = element.textContent;
        bookText += text;
        if(text.trim() === ''){
            //words.push(element);
            words.push([]);
        } else {
            words[words.length-1].push(element);
        }
    }
    bookText = bookText.replace(/\s+/g, ' ');
    // console.log(bookText);
    // console.log(words);
    speak(bookText);
}


let index = 0;

function speak(text){
    highlightText();
    port.postMessage({type: 'play', text: text});
    port.onMessage.addListener(function(e) {
        highlightText();
        index++;
    });
}
function pause(){
    port.postMessage({type: 'pause'});
}
function stop(){
    index = 0;
    port.postMessage({type: 'stop'});
}

// Highlights the element the is being spoken
function highlightText(){
    // console.log(bookText.split(' ')[index]);
    // console.log(elementsText());
    if(index > 0){
        // $(newWordElements[index-1]).removeClass('highlight');
        // $(bookWords[index-1]).addClass('oldHighlight');
        words[index-1].forEach(element => {
            $(element).removeClass('highlight');
        });
    }
    words[index].forEach(element => {
        $(element).addClass('highlight');
    });
}

// Returns the text within an array of multiple elements
function elementsText(){
    let text = "";
    words[index].forEach(element => {
        text += element.textContent;
    });
    return text;
}

