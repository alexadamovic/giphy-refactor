import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function(){
  $("#gifSearch").click(function(){
    const searchTerm = $('#gif-search').val();
    $('#gif-search').val("");
    $(".showGifs").html("");
    console.log(searchTerm);
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
        //$("#gifResponse").attr('src', response.data[i].images.downsized_medium.url);
      }
    }
  });
});