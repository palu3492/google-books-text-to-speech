
let html = '<div><button type="button">Play</button></div>';

// let rv = responsiveVoice;
let go = true;
function play(){
    responsiveVoice.setDefaultVoice("UK English Male");

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

    // responsiveVoice.speak(bookText);
    // speechSynthesis.getVoices();
    //voice = SpeechSynthesisVoice

    var synthesis = window.speechSynthesis;

    cleanSentences.forEach(sentence => {
        let b = new SpeechSynthesisUtterance(sentence);
        b.voice = synthesis.getVoices()[5]; //  UK English Male
        synthesis.speak(b);
    });


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

function testEvent(){
    chrome.extension.sendMessage({msg: 'test one two three'});
}