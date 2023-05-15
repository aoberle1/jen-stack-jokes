console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJokes )
    getJokes();
}

function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes'
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
    $('#inventory-table-body').empty();
    for (let joke of jokes){
        $('#outputDiv').append(`
        <div>
            <p>${joke.jokeQuestion}<p>
            <p>${joke.punchLine}</p>
            <p>Direct your groans to: ${joke.whoseJoke}</p>
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
