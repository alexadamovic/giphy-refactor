export default class SearchGiphy {
  static searchPics(url){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      // const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open('GET', url, true);
      request.send();
    });
  }
}