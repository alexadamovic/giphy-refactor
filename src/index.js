import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchGiphy from './search-giphy';

$(document).ready(function(){


  $("#gifSearch").click(function(){
    const searchTerm = $('#gif-search').val();
    $('#gif-search').val("");
    $(".showGifs").html("");
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`;
    let promise = SearchGiphy.searchPics(url);
    promise.then(function(response) {
      const body = JSON.parse(response);
      if (body.data.length === 0) {
        $(".showGifs").text("No results for your search.");
      }
      for(let i = 0; i < body.data.length; i ++){
        $(".showGifs").append(`<img src="${body.data[i].images.fixed_height_small.url}">`);
      }
    }, function(error) {
      $(".showGifs").text(`Here's what the error came back as: ${error}`);
    });
  });

  $("#gifTrending").click(function() {
    $(".showGifs").html("");
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;
    let promise = SearchGiphy.searchPics(url);
    promise.then(function(response) {
      const body = JSON.parse(response);
      if (body.data.length === 0) {
        $(".showGifs").text("Nothing is trending for some reason.");
      }
      for(let i = 0; i < body.data.length; i ++){
        $(".showGifs").append(`<img src="${body.data[i].images.fixed_height_small.url}">`);
      }
    }, function(error) {
      $(".showGifs").text(`Here's what the error came back as: ${error}`);
    });
  });

  $("#gifRandom").click(function() {
    $(".showGifs").html("");
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;
    let promise = SearchGiphy.searchPics(url);
    promise.then(function(response) {
      const body = JSON.parse(response);
      if (body.data.length === 0) {
        $(".showGifs").text("Nothing is Random.");
      }
      $(".showGifs").append(`<img src="${body.data.images.fixed_height_small.url}">`);
    }, function(error) {
      $(".showGifs").text(`Here's what the error came back as: ${error}`);
    });
  });
});