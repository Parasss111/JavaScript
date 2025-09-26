const userInput1 =document.querySelector("#celsius");
const userInput2 =document.querySelector("#fahrenheit");
userInput1.addEventListener('keyup', function(e){
    userInput1.textContent = e.target.value;
    let newInput1 = e.target.value;
    let f = (newInput1 * 9/5) + 32;
    // console.log(f);

    // userInput2.value = f;

    if (newInput1 === "") {
        userInput1.value = "";
        userInput2.value = "";
    } else {
        let f = (newInput1 * 9 / 5) + 32;
        userInput2.value = f;
    }
})  

userInput2.addEventListener('keyup', function(e){
    userInput2.textContent = e.target.value;
    let newInput2 = e.target.value;
    let c = ((newInput2) - 32) * 5/9;
    console.log(c);
    // userInput1.value = c;

    if (newInput2 === "") {
        userInput1.value = "";
        userInput2.value = "";
    } else {
        let c = (newInput2 - 32) * 5 / 9;
        userInput1.value = c;
    }
})