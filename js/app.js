
const criptomonedasSelect = document.querySelector('#criptomonedas');

const moneda = document.querySelector('#moneda');

//Creamos una Promise para peticion de Tipos de Criptomonedas en USD al servidor, mientras lo demas se sigue ejecutando

const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
});



document.addEventListener('DOMContentLoaded',()=>{

    consultarCriptomonedas();
});

function consultarCriptomonedas(){

    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas)
{

    criptomonedas.forEach(cripto => {
        const {Name,FullName} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;

        criptomonedasSelect.appendChild(option);
    });
}