const userInput1 = document.querySelector("#text");
const userInput2 = document.querySelector("#char");
const userInput3 = document.querySelector("#word");

userInput1.addEventListener('keyup', function(e){
    userInput1.textContent = e.target.value;
    let newInput1 = e.target.value;

    let char = newInput1.length;

    // word count (handle empty case)
    let wordsArray = newInput1.match(/\S+/g);
    let word = wordsArray ? wordsArray.length : 0;

    // update values
    userInput2.textContent = char;
    userInput3.textContent = word;

})
