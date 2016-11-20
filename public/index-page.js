$(document).ready(function() {

  // filter dropdown show/hide
  var filter = false;

  $('.dropdown').on('click', function() {
    if(!filter) {
      $('#filter').slideDown(function() {
        filter = true;
        $('#droparrow').html('arrow_drop_up');
      });
    } else {
      $('#filter').slideUp(function() {
        filter = false;
        $('#droparrow').html('arrow_drop_down');
      });
    }
  })

  // favorite button color
  $('.heart').on('click', function() {
    var id = '#'+$(this).attr('id');
    console.log(id);
    $(id+'.heart').html('favorite');
  })

  // color hearts from local storage
  var pastFavorites = localStorage;
  for(var word in pastFavorites) {
    var id = '#'+word;
    $(id+'.heart').html('favorite').off('click').css('cursor', 'auto');
  }

  // navigation buttons
  $('#favorites').on('mouseenter', function() {
    $('#buttonInfo > p').html('view favorites');
    $('#buttonInfo').slideDown();
  })
  $('#favorites').on('mouseleave', function() {
    $('#buttonInfo').slideUp();
  })

  $('#add').on('mouseenter', function() {
    $('#buttonInfo > p').html('add a word');
    $('#buttonInfo').slideDown();
  })
  $('#add').on('mouseleave', function() {
    $('#buttonInfo').slideUp();
  })

  // sidebar animation
  $('#add').on('click', function() {
    sidebar('#addForm', '#favoriteWords');
  })

  $('#favorites').on('click', function() {
    sidebar('#favoriteWords', '#addForm');
    var favorites = [];
    for(var word in localStorage) {
      favorites.push(word);
    }
    console.log(favorites);
    var data = {
      'type': 'favorites',
      'favorites': favorites
    }
    console.log(data);

    $.post('/', data).then(function(result) {
      console.log(result);
      $('#favoriteCards').empty();
      result.forEach(function(word){
        var card = $('<div class="card"></div>');
        var cardContent = $('<div class="card-content"></div>');
        cardContent.append('<span class="card-title">'+word.word+'</span>');
        cardContent.append('<p class="type">'+word.type+'</p>');
        cardContent.append('<p class="definition">'+word.definition+'</p>');
        card.append(cardContent);
        $('#favoriteCards').append(card);
      })
    })
  })

  $(document).on('click', '#cards', function() {
    $('.sidebar').animate({right: '-50%'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '1');
    });
    $('.sidebar').fadeOut(750);
  })

  function sidebar(show, hide) {
    $(show).removeClass('disable');
    $(hide).addClass('disable');
    $('.sidebar').fadeIn(750);
    $('.sidebar').animate({right: '0px'}, 750, function() {
      $('.filter, .main, .nav').css('opacity', '0.5');
    });
  }

  // add word validation
  var isWord = false;
  var hasDef = false;
  var dne = false;
  var currentUrl = window.location.origin;

  $('#word').on('blur', function() {
    var word = $(this).val().trim();
    var data = {type: 'validate', word: word};

    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      if(!response) {
        $('#formError').html(word+' already exists!').removeClass('disable');
        $('#addButton').attr('disabled', 'disabled');
        return false;
      } else {
        dne = true;
        $('#formError').addClass('disable');
        if(isWord && hasDef && dne) {
          $('#addButton').removeAttr('disabled');
        } else {
          $('#addButton').attr('disabled', 'disabled');
        }
      }
    })

    $.ajax({
      url: 'https://wordsapiv1.p.mashape.com/words/'+word+'/definitions',
      method: 'GET',
      beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'gMOuYDtbPVmshXbyfdvdY5QxS77qp1zwbX1jsnLdvVsABNFARQ')},
      statusCode: {
        404: function() {
          $('#formError').html('Oops! '+word+' is not a valid word.').removeClass('disable');
          isWord = false;
          $('#addButton').attr('disabled', 'disabled');
        }
      }
    }).done(function(response) {
      if(typeof response == 'object') {
        isWord = true;
      }

      if(isWord && hasDef && dne) {
        $('#addButton').removeAttr('disabled');
      } else {
        $('#addButton').attr('disabled', 'disabled');
      }

      if(dne) {
        $('#formError').addClass('disable');
      }
    })
  })

  $('#definition').on('blur', function() {
    if($(this).val() != '') {
      hasDef = true;
    } else {
      hasDef = false;
    }
    if(isWord && hasDef && dne) {
      $('#addButton').removeAttr('disabled');
    } else {
      $('#addButton').attr('disabled', 'disabled');
    }
  })

  // add word submit button
  $('#addButton').on('click', function() {
    var data = {
      type: 'add',
      word: $('#word').val().trim(),
      definition: $('#definition').val().trim(),
      wordType: $('#wordType').val()
    }

    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      $('#addForm').addClass('disable');
      $('#wordReview').removeClass('disable');
      $('#wordReview .card-title').html(response.word);
      $('#wordReview .type').html(response.type);
      $('#wordReview .definition').html(response.definition);
      setTimeout(function() {
        $('.sidebar').animate({right: '-50%'}, 750, function() {
          $('.filter, .main, .nav').css('opacity', '1');
        });
        $('.sidebar').fadeOut(750, function() {
          $('#wordReview').addClass('disable');
          $('#addForm').removeClass('disable');
          $('#word').val('');
          $('#definition').val('');
        });
      }, 3000);
    })
  })

  // like button
  var favorites = {};

  $('.heart').on('click', function() {
    var id = $(this).attr('id');
    console.log(id);
    var counter = $(this).siblings('.counter');
    console.log(id);
    var data = {
      type: 'like',
      id: id
    }
    // local storage
    localStorage.setItem(id, id);

    console.log(localStorage);

    // server request
    $.post(currentUrl, data).then(function(response) {
      console.log(response);
      counter.html(response.likes);
    })
  })

  // edit button
  $('.edit').on('click', function() {
    var id = $(this).attr('id');
    var data = {id: id};

    $.post(currentUrl+'/edit', data).then(function(response) {
      console.log(response);
      window.location = currentUrl +'/edit';
    })
  })

  // action message redirect
  if(window.location == currentUrl+'/message') {
    setTimeout(function() {
      window.location = currentUrl;
    }, 3000);
  }

})
