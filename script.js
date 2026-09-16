const display = document.getElementById("inputbox");
const historySlider = document.getElementById("historySlider");
const historyList = document.getElementById("historyList");
const toggleHistoryBtn = document.getElementById("toggleHistory");
const clearAllBtn = document.getElementById("clearAllHistory");

let calcHistory = JSON.parse(localStorage.getItem("calcHistory"));


toggleHistoryBtn.addEventListener("click", () => {
    historySlider.classList.toggle("open");
    toggleHistoryBtn.innerText = historySlider.classList.contains("open") ? "History" : "History";
});


clearAllBtn.addEventListener("click", () => {
    calcHistory = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
});

function renderHistory() {
    historyList.innerHTML = ""; 
    
    calcHistory.forEach((calc, index) => {
        let item = document.createElement("div");
        item.className = "history-item";
        
    
        let textSpan = document.createElement("span");
        textSpan.className = "history-text";
        textSpan.innerText = calc;
        textSpan.addEventListener("click", () => {
            display.innerText = calc.split(" = ")[1]; 
        });

    
        let deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-single";
        deleteBtn.innerText = "*";
        deleteBtn.addEventListener("click", () => {
            calcHistory.splice(index, 1); 
            localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
            renderHistory();
        });

        item.appendChild(textSpan);
        item.appendChild(deleteBtn);
        historyList.appendChild(item);
    });
    
    historyList.scrollTop = historyList.scrollHeight;
}

renderHistory();

let buttons = Array.from(document.getElementsByTagName("button"));

buttons.map( button => {
    button.addEventListener('click', (e) => {
       
       if (e.target.id === "toggleHistory" || e.target.id === "clearAllHistory") return;

       switch(e.target.innerText){
        case 'DEL':
            if(display.innerText){
                display.innerText = display.innerText.slice(0, -1);
            }
            break;
        case 'AC':
            display.innerText = ''; 
            break;
        case '=':
             try{
                let currentExpression = display.innerText;
                const result = eval(currentExpression);
                
                display.innerText = result;
                calcHistory.push(currentExpression + " = " + result);
                localStorage.setItem("calcHistory", JSON.stringify(calcHistory));
                
                renderHistory();
             } catch {
                display.innerText = 'Error!';
             }
             break;
        default:
            display.innerText += e.target.innerText;
       }
    });
});