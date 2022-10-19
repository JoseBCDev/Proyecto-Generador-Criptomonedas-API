
//Variables 
const criptomonedasSelect = document.querySelector('#criptomonedas');

const moneda = document.querySelector('#moneda');

const formulario = document.querySelector('#formulario');

const resultadoDiv = document.querySelector('#resultado');

//Creamos una Promise para peticion de Tipos de Criptomonedas en USD al servidor, mientras lo demas se sigue ejecutando

const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
});


//Cargar el documento JS 
document.addEventListener('DOMContentLoaded',()=>{

    consultarCriptomonedas();

    formulario.addEventListener('submit',validarFormulario);

    criptomonedasSelect.addEventListener('change',leerValor);
    moneda.addEventListener('change',leerValor);

});

//Objeto Busqueda
const objBusqueda = {
    criptomoneda: '',
    moneda: ''
}
//Llenamos el objeto cada vez que seleccionamos un select
function leerValor(e)
{
   objBusqueda[e.target.name] = e.target.value;

    console.log(objBusqueda);
}

function validarFormulario(e)
{
    e.preventDefault();

    const {criptomoneda,moneda} = objBusqueda;
    //Validando que los campos esten llenos
    if(criptomoneda==='' || moneda ==='')
    {
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }


}
//Extraendo informacion de la API para los tipos de Criptomonedas
function consultarCriptomonedas(){

    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
}
//Mostramos los tipos de criptomonedas
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
//Alerta cada vez que salga un fallo
function mostrarAlerta(mensaje)
{
    const existeAlerta = document.querySelector('.error');

    if(!existeAlerta)
    {
    const alerta = document.createElement('div');

    alerta.classList.add('error');
    alerta.textContent = mensaje;

    resultadoDiv.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
    }

    
}