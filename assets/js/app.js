//Variables
const listaTweets= document.getElementById('lista-tweets');


//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //cargar contenido similar a un DOCUMENTReady
    document.addEventListener('DOMContentLoaded',localStorageListo);
}


//Funciones


//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();

    //leer valor de textArea id tweet
    const tweet = document.getElementById('tweet').value;

    //Crear boton de elminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList='borrar-tweet';
    botonBorrar.innerText='X';

    //Crear elemento y añadirle el contenido a la lista
    const li= document.createElement('li');
    li.innerText = tweet;
    //Añade boton borrar al TWEET
    li.appendChild(botonBorrar);
    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}


//Borrar tweet
function borrarTweet(e){
    e.preventDefault();
    //Delegation para detectar en que parte se dio Click
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos de LocalStorage en la lista
function localStorageListo(){
    let tweets;

    tweets=obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
         //Crear boton de elminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList='borrar-tweet';
        botonBorrar.innerText='X';

        //Crear elemento y añadirle el contenido a la lista
        const li= document.createElement('li');
        li.innerText = tweet;
        //Añade boton borrar al TWEET
        li.appendChild(botonBorrar);
        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
    
}

//agregar a localStorage

function agregarTweetLocalStorage(tweet){

    let tweets;
    tweets=obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

    //Agregar a local storage
   // localStorage.setItem('tweets',tweet);
}

//Comprueba que existan elementos en local, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    //revisamos los valores de localStorage
    if(localStorage.getItem('tweets')===null){
        tweets=[];
    }else{
        //Se convierten los Tweets existentes en JSON
        tweets=JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet de localStorage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //Con substring eliminamos la porción de un string
    //Por ejemplo se va a eliminar la X que traé cada TWEET
    tweetBorrar=tweet.substring(0,tweet.length-1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index,1);
        }
    });

    localStorage.setItem('tweets',JSON.stringify(tweets));
}