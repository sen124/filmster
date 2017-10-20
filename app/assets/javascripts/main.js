/* global $*/

$(function(){
  let form = $('#movie-search');
  form.submit(function(e){
    e.preventDefault();

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie?api_key=1527c2e276f4fdfe458f89ff6921d36e',
      data: form.serialize()
    })
    .done(function(data){
      displayMovies(data);
    });
  });

  function displayMovies(data){
  let container = $("#movies");
  let htmlString = "";

  container.empty();

  let imageUrl = getBaseImageUrl();

  if (data["results"].length == 0) {
    htmlString = `<div class="alert alert-danger text-center" role="alert">No Data Found!</div>`;
  }
  else{
    data["results"].forEach(function(movie){
      htmlString += `<img src=${movie["poster_path"] == null ? "/assets/your_default_image.png" : imageUrl + "/" + movie["poster_path"]} />
                     <p>${movie["title"]}</p>
                     <p>${movie["overview"]}</p>`;
    });
  }

  container.append(htmlString);
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
    }

    $.ajax(settings).done(function (response) {
      url = response["images"]["base_url"] + response["images"]["poster_sizes"][3];
    });
    return url;
  }
});
