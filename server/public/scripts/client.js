console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    // when submit button is clicked, run function addJokes
    $('#addJokeButton').on('click', addJokes )
    // upon page load, runs the function getJokes
    getJokes();
}

// function using ajax GET
function getJokes(){
    $.ajax({
        method: 'GET',
        // matches server side get path
        url: '/jokes'
        // after GET request, then once we have a response, run the renderToDom function
    }).then(function(response){
        console.log( 'Success!', response );
        // calling function renderToDom and using our response as the argument
        renderToDom(response);
    }).catch( function ( error ){
        alert( 'Request Failed' )
        console.log( 'Request Failed:', error )
    })
}

function renderToDom(jokes){
    $('#outputDiv').empty();
    // for loop that loops through jokes array which is received as response from ajax GET
    for (let joke of jokes){
        $('#outputDiv').append(`
        <div>
            <p>${joke.jokeQuestion}<p>
            <p>${joke.punchLine}</p>
            <p>Direct your groans to: <b>${joke.whoseJoke}</b></p>
            <br>
        </div>
        `);
    }
}

function addJokes(event){
    event.preventDefault();
const whoseJoke = $('#whoseJokeIn').val();
const jokeQuestion = $('#questionIn').val()
const punchLine = $('#punchlineIn').val()


// emptying out input fields
$('#whoseJokeIn').val('');
$('#questionIn').val('');
$('#punchlineIn').val('');

$.ajax({
    method: 'POST',
    url: '/jokes',
    // data being posted will be an object with 3 inputs
    data: {
    whoseJoke,
    jokeQuestion,
    punchLine
    }
    }).then(function(response){
        console.log( 'Success!' )
        getJokes();
    }).catch(function(error) {
        alert('Error with inventory post!')
        console.log('Error with post:', error)
    })
}
