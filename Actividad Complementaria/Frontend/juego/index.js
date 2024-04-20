var randomMovie = {};

var randomFromArray = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};

$('.start-game').on('click', function() {
  $('#starting-overlay').fadeOut(200);
  pickARandomMovie();
});

$('.start-with-instructions-link').on('click', function(e) {
  e.preventDefault();
  $('#rules-overlay').show();
  $('#starting-overlay').fadeOut(200);
  pickARandomMovie();
});

$('.dismiss-rules-trigger').on('click', function(e) {
  e.preventDefault();
  $('#rules-overlay').fadeOut(200);
})

$('.display-rules-trigger').on('click', function(e) {
  e.preventDefault();
  $('#rules-overlay').fadeIn(200);
})

$('#rules-overlay').on('mousedown', function(e) {
	var clicked = $(e.target);
	if (clicked.is('.rules-inner') || clicked.parents().is('.rules-inner')) {
		return;
   } else {
     $('#rules-overlay').fadeOut(200);
   }
});

$('.more-details-link').on('click', function(e) {
  e.preventDefault();
  getMovieData(randomMovie.title,randomMovie.year);
});

$('.reset-game-link').on('click', function(e) {
  e.preventDefault();
  pickARandomMovie();
});

var pickARandomMovie = function() {
  randomMovie = randomFromArray(moviesList);
  $('.movie-title , .movie-year').removeClass('-winner').removeClass('-loser');
  $('.guess-input').val('')//.focus();
  $('.guess-word-count').html(0);
  $('.movie-title').html(randomMovie.title + ' <br/><span class="movie-year">(' + randomMovie.year + ')</span>')
};

var getMovieData = function( title , year ) {
  $.getJSON('http://www.omdbapi.com/?t=' + title.replace(' ', '+') + '&y=' + year + '&plot=short&r=json', function(data) {
    showMovieDetails(data);
  }).fail( function(d, textStatus, error) {
    console.error('oh fuck (omdbapi)');
    });
}

var showMovieDetails = function(movie) {
    movieDetails = data;
    //show stuff goes here; gotta go here because callbacks
};

$('.guess-input').on('keyup', function(e) {
  var guess = $('.guess-input').val();
  $('.helper-text.-lower .winner-helper, .helper-text.-lower .loser-helper ').hide();
  $('.helper-text.-lower .default-helper').show();
  //TODO revert the guess text to normal
  if (e.which === 13) {
    searchGoogle();  
  } else if ( guess === '') {
     $('.guess-word-count').html(0);
     $('.guess-word-word').html('words');
  } else {
    updateWords(guess);
  }
});

$('.guess-button').on('click', function () {
  searchGoogle();
});

var searchGoogle = function() {
  var query = $('.guess-input').val()
  $.getJSON('https://www.googleapis.com/customsearch/v1?key=AIzaSyA0uUM2FJFmVaVod00_AwFYabWmHp3O7Ys&cx=004814594758536366120:iq3f_h_8jdm&prettyPrint=true&q=' + encodeURIComponent(query), function(data) {
  if (data.items[0].displayLink === 'en.wikipedia.org' || data.items[0].displayLink === 'www.imdb.com') {
    setWinner(data);
  } else {
    setLoser(data)
  }
  }).fail( function(d, textStatus, error) {
    console.error('oh fuck (google)');
    });
};

var setWinner = function(results) {
   console.log('you win!');
    $('#win-overlay').show();
    setTimeout( function() {
      $('.movie-title , .movie-year').removeClass('-loser').addClass('-winner');
      $('.helper-text.-upper').html('you got it!')
      $('.helper-text.-lower .default-helper, .helper-text.-lower .loser-helper').hide();
      $('.helper-text.-lower .winner-helper').show();
      //TODO change the button
      $('#win-overlay').fadeOut(200);
    }, 100)
    displaySearchResults(results);
}

var setLoser = function(results) {
   console.log('you lose');
    $('#lose-overlay').show();
    setTimeout( function() {
      $('.movie-title , .movie-year').removeClass('-winner').addClass('-loser');
      $('.helper-text.-upper').html('try again.')
      $('.helper-text.-lower .default-helper, .helper-text.-lower .winner-helper').hide();
      $('.helper-text.-lower .loser-helper').show();
      updateWords($('.guess-input').val());
      //TODO change the button
      $('#lose-overlay').fadeOut(200);
    }, 100)
    displaySearchResults(results);
}

var displaySearchResults = function(results) {
  $('.search-results').html('');
  for (i = 0; i < 3; i++) { 
    $('.search-results').append(
    '<div class="search-result"> <h3 class="search-result-title"><a href="' + results.items[i].formattedUrl + '">' + results.items[i].htmlTitle + '</a></h3><p class="search-result-snippet">' + results.items[i].htmlSnippet.replace('<br>','') + '</p><p class="search-result-website">' + results.items[i].htmlFormattedUrl + '</p></div>'    
    )
  }    
}

function updateWords(s){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n"); 
    var wordCount = s.split(' ').length; 
    $('.guess-word-count').html(wordCount);
    if (wordCount === 1) {
     $('.guess-word-word').html('word');
    } else {
     $('.guess-word-word').html('words');
    }
}


// "show me more about the movie"
// you win/you lose conditionality
  // you win
    // flash screen DONE
    // color text
    // color input, guess again
    // update upper text
    // can you do better?
    // play again with a new movie
  // try again 
    // flash screen
    // color input, guess again
    // color text
    // update upper text
// Uh oh, you X has a Y in it!
    //banned word list
    //validate on submission? on keyup?`
// need to revisit the helper links' placement
// revisit design choices generally
// graceful failure of queries, nice ajaxing
// refactor everything basically
// edit the movies list
