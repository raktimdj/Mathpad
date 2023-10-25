document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button[data-value]");
    const resetButton = document.getElementById("reset");
    const clearButton = document.getElementById("clear");
    const calculateButton = document.getElementById("calculate");
    const backspaceButton = document.getElementById("backspace");
    const historyList = document.getElementById("history-list");

    const noteTextArea = document.querySelector("textarea");
    const copyButton = document.getElementById("copyButton"); 

    let expression = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            expression += button.dataset.value;
            display.value = expression;
        });
    });

    clearButton.addEventListener("click", () => {
        expression = "";
        display.value = "";
    });

    calculateButton.addEventListener("click", () => {
        try {
            const result = eval(expression).toString();

            addToHistory(expression, result);

            expression = result;
            display.value = expression;
        } catch (error) {
            display.value = "Error";
        }
    });

    resetButton.addEventListener("click", () => {
        expression = "";
        display.value = "";
        noteTextArea.value = ""; // Clear the notepad textarea as well
    });

    backspaceButton.addEventListener("click", () => {
        if (expression.length > 0) {
            expression = expression.slice(0, -1);
            display.value = expression;
        }
    });

    copyButton.addEventListener("click", () => {
        const noteContent = noteTextArea.value;

        if (noteContent) {
            copyToClipboard(noteContent);
            alert("Sentences copied to clipboard!");
        } else {
            alert("Please enter some content in the notepad.");
        }
    });

    function addToHistory(expression, result) {
        const historyItem = document.createElement("li");
        historyItem.textContent = `${expression} = ${result}`;
        historyList.appendChild(historyItem);
    }

    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    /* print button */

    const printButton = document.getElementById("printButton");

printButton.addEventListener("click", () => {
    const noteContent = noteTextArea.value;
    
    if (noteContent) {
        printNotepadContent(noteContent);
    } else {
        alert("Please enter some content in the notepad.");
    }
});

function printNotepadContent(content) {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(`<html><body>${content.replace(/\n/g, '<br>')}</body></html>`);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

});
