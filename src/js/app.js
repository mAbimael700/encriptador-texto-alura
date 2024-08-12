//
let userInput = document.querySelector("#user___input");
let encryptBtn = document.querySelector("#encrypt___btn");
let decryptBtn = document.querySelector("#decrypt___btn");
let panelResult = document.querySelector("#result___panel");
let copyBtn = document.querySelector("#copy___btn");

let desplazamiento = 3;

const emptyInputMessage = `
        <img src="/src/img/Muñeco.png" alt="Muñeco observando un diamante con una lupa"/>

        <div class="empty_message"> 
            <strong>Ningún mensaje fue encontrado</strong>
            <p>Ingresa el texto que desees encriptar o desencriptar.</p>
        </div>
        
`;

const errorInputMessage = (error) => {
  return `
        <img src="/src/img/Muñeco.png" alt="Muñeco observando un diamante con una lupa"/>

        <div class="empty_message"> 
            <strong>¡Oops! Ocurrió un error</strong>
            <p>${error}</p>
        </div>
        
`;
};

panelResult.innerHTML = emptyInputMessage;

//Función para ejecutar la función de encriptar y validar
function encryptAction(event) {
  handleAction(event, encryptText);
}

function decryptAction(event) {
  handleAction(event, decryptText);
}

function handleAction(event, action) {
  try {
    textValidation(userInput.value);
    let result = action(userInput.value);
    panelResult.innerHTML = result;
    panelResult.classList.add("result_text");
    panelResult.parentElement.classList.remove("empty");
    copyBtn.classList.remove("hidden");
  } catch (error) {
    userInput.classList.add("error");
    showErrorMessage(error.message);
  }
}

function encryptText(text) {
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  text = text.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (text.includes(matrizCodigo[i][0])) {
      text = text.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }
  }

  return text;
}

function decryptText(encryptedText) {
  let matrizCodigo = [
    ["enter", "e"],
    ["imes", "i"],
    ["ai", "a"],
    ["ober", "o"],
    ["ufat", "u"],
  ];

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (encryptedText.includes(matrizCodigo[i][0])) {
      encryptedText = encryptedText.replaceAll(
        matrizCodigo[i][0],
        matrizCodigo[i][1]
      );
    }
  }

  return encryptedText;
}

function copyResult() {
  navigator.clipboard.writeText(panelResult.textContent);
}

function textValidation(text) {
  userInput.classList.remove("error");
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if ((char < "a" || char > "z") && char !== " ") {
      throw new Error("El texto debe contener solo letras minúsculas");
    }
  }
  
  return true;
}

function showErrorMessage(message) {
  panelResult.innerHTML = errorInputMessage(message);
}

userInput.addEventListener("change", function () {
  try {
    textValidation(userInput.value);
    
    
    if (userInput.value === "") {
      panelResult.classList.remove("result_text");
      panelResult.parentElement.classList.add("empty");
      copyBtn.classList.add("hidden");
      panelResult.innerHTML = emptyInputMessage;
    }
  } catch (error) {
    userInput.classList.add("error");

    showErrorMessage(error.message);
  }
});
encryptBtn.addEventListener("click", encryptAction);
decryptBtn.addEventListener("click", decryptAction);
