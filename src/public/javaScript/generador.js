function generateRandomNumber() {
    // Genera un número aleatorio entre 0 y 1000000000
    var randomNumber = Math.floor(Math.random()*10000000000);
    //var randomNumber = Math.random() * 1000000000;

    // Asigna el número aleatorio al input
    JsBarcode("#codigo", randomNumber);
    document.getElementById('randomNumberInput').value = randomNumber;
  }