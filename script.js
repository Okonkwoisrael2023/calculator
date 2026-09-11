const display = document.getElementById("inputbox");

// Restore last calculated answer on refresh
const savedValue = localStorage.getItem("lastAnswer");
if (savedValue) {
    display.innerText = savedValue;
}

let buttons = Array.from(document.getElementsByTagName("button"));

buttons.map( button => {
    button.addEventListener('click', (e) => {
       switch(e.target.innerText){
        case 'DEL':
            if(display.innerText){
                display.innerText = display.innerText.slice(0, -1);
            }
            break;
        case 'AC':
            display.innerText = '';
            localStorage.removeItem("lastAnswer");
            break;
        case '=':
             try{
                const result = eval(display.innerText);
                display.innerText = result;
                localStorage.setItem("lastAnswer", result);
             } catch {
                display.innerText = 'Error!';
             }
             break;
        default:
            display.innerText += e.target.innerText;
       }
    });
});