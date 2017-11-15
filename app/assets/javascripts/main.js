/* global $*/


$(function(){
  
  
  
  
  let form = $('#movie-search');
  form.submit(function(e){
    e.preventDefault();
    
  $('#movies').on('click','img.movie_poster',function(e){
    e.preventDefault();
  
  
  let id=(e.target).data('id');
  
  $.ajax({
      url: 'https://api.themoviedb.org/3/movie'+ id + '?',
      data: 'api_key : 1527c2e276f4fdfe458f89ff6921d36e'
    })
    .done(function(data){
      displayMovies(data);
    
  });
  });
  });

  function displayMovies(data){
    let container=$("#movies");
    let htmlString = "";
    
    container.empty();
    
    let imageUrl = getBaseImageUrl();
    if (data["results"].length==0){
      htmlString = `<div class = "alert alert-danger text-center">No Data Found! </div>`;
    }
    else
     data["results"].forEach(function(movie){
      htmlString += `<img src= ${movie["poster_path"]==null? "/assets/your_default_image.png" :imageUrl + "/" + movie["poster_path"]} data-id="${movie['id']}" class = "movie_poster"/>
                     <p>${movie["title"]}</p>
                     <form id="rating-form" action="/reviews" method="POST">
                       <input type="hidden" name="authenticity_token" value=${window._token} />
                       <input type="hidden" name="tmdb_id" value=${movie["id"]} />
                       <textarea name= "review[comment]" class="form-control" placeholder="Your review in 140 characters"/>
                     <br />
                       <input type="submit" class="btn btn-success pull-right" />
                     </form> 
                     <p>${movie["overview"]}</p>`;
    });

    $("#movies").append(htmlString);
  }

  function getBaseImageUrl(){
    var url = "";
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/configuration?api_key=1527c2e276f4fdfe458f89ff6921d36e",
      "method": "GET",
      "headers": {},
      "data": "{}"
    };

    $.ajax(settings).done(function (response) {
      url = response["images"]["base_url"] + response["images"]["poster_sizes"][3];
    });
    return url;
  }
  
});