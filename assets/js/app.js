const btnEncrypt = document.getElementById('btnEncrypt')
const btnDesencrypt = document.getElementById('btnDesencrypt')
const btnCopy = document.getElementById('btnCopy')
const textUser = document.getElementById('textUser')
const cardContent = document.querySelector('.card')
const result = document.getElementById('result')
const notFound = document.getElementById('notFound')

btnEncrypt.addEventListener('click', () => {
    const text = textUser.value;

    if (text) {
        cardContent.classList.remove("center")
        cardContent.children[0].classList.add("hidden")
        cardContent.children[1].classList.remove("hidden")
        cardContent.children[1].classList.add("flex")
        result.textContent = encrypt(text)

        showToast("Text encrypt successfully")
    } else {
        showToast("Enter your text in the input", "warn")
    }
})


btnDesencrypt.addEventListener('click', () => {
    const text = textUser.value;

    if (text) {
        cardContent.classList.remove("center")
        cardContent.children[0].classList.add("hidden")
        cardContent.children[1].classList.remove("hidden")
        cardContent.children[1].classList.add("flex")
        result.textContent = desencrypt(text)

        showToast("Text decrypt successfully")
    } else {
        showToast("Enter your text in the input", "warn")
    }
})

btnCopy.addEventListener('click', () => {
    copyToClipboard()
})

textUser.addEventListener('input', () => {
    textUser.value = textUser.value.toLowerCase();
})

function copyToClipboard() {
    let range, selection;

    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(result);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(result);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    try {
        document.execCommand('copy');
        showToast("Text copied successfully to clipboard")
    } catch (error) {
        showToast("There was an error copying", "warning")
    }
}

function showToast(msg, type = "success") {
    const toastMsg = document.getElementById("toast-message");
    toastMsg.innerHTML = msg;

    var toast = document.getElementById("toast");
    if (type === "success") {
        toast.classList.add("toast-success");
    } else {
        toast.classList.add("toast-warning");
    }

    toast.classList.add("show");


    setTimeout(function () {
        toast.classList.remove("show");
    }, 5000);
}

const encrypt = (text) => {
    let newText = ""

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "a") {
            newText += "ai";
        } else if (text[i] === "e") {
            newText += "enter";
        } else if (text[i] === "i") {
            newText += "imes";
        } else if (text[i] === "o") {
            newText += "ober";
        } else if (text[i] === "u") {
            newText += "ufat";
        } else {
            newText += text[i]
        }
    }

    return newText
}

const desencrypt = (text) => {
    let newText = ""

    let i = 0;
    while (i < text.length) {
        if (text[i] === "a" && text.slice(i, i + 2) === "ai") {
            newText += "a"
            i += 1
        } else if (text[i] === "e" && text.slice(i, i + 5) === "enter") {
            newText += "e";
            i += 4
        } else if (text[i] === "i" && text.slice(i, i + 4) === "imes") {
            newText += "i";
            i += 3
        } else if (text[i] === "o" && text.slice(i, i + 4) === "ober") {
            newText += "o";
            i += 3
        } else if (text[i] === "u" && text.slice(i, i + 4) === "ufat") {
            newText += "u";
            i += 3
        } else {
            newText += text[i]
        }

        i++;
    }


    return newText
}