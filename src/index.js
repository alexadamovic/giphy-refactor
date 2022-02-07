import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#gifSearch").click(function(){
    const searchTerm = $('#gif-search').val();
    $('#gif-search').val("");
    $(".showGifs").html("");
    let request = new XMLHttpRequest();
    const url =  `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response){
      for(let i = 0; i < response.data.length; i ++){
        $(".showGifs").append(`<img src="${response.data[i].images.fixed_height_small.url}">`);
      }
    }
  });
  $("#gifTrending").click(function() {
    $(".showGifs").html("");
    let request = new XMLHttpRequest();
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;

    request.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response){
      for(let i = 0; i < response.data.length; i ++){
        $(".showGifs").append(`<img src="${response.data[i].images.fixed_height_small.url}">`);
      }
    }
  });

  $("#gifRandom").click(function() {
    $(".showGifs").html("");
    console.log("click");
    let request = new XMLHttpRequest();
    let url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;

    request.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response){
      $(".showGifs").append(`<img src="${response.data.images.fixed_height_small.url}">`);
    }
  });
});

