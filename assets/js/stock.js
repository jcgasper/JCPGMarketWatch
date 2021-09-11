let submitElement = document.querySelector(".input");
let formElement = document.querySelector(".form");
let stockTitleEl = document.querySelector(".stockTitle");
let stockInfoEl = document.querySelector(".stockInfoEl");
let apiKey = "75c3119c360260691b306d8841a20c7d";



//  75c3119c360260691b306d8841a20c7d  -marketstack api

//https://https://api.finage.co.uk/last/stock/AAPL?apikey=API_KEY35E1M21URYLC8TXVHSMPMENWJR5D1LCJ

//needs https:/ to work 

// http://api.marketstack.com/v1/eod?access_key='+apiKey+'&symbols='+stockTicker+''    can add date ranges for charts

// get ticker info 'http://api.marketstack.com/v1/ticker?access_key='+apiKey+'&symbols='+input+''

    function formSubmit(event) {
      event.preventDefault();
      let input = submitElement.value;
      console.log(input);
      

      fetch('http://api.marketstack.com/v1/tickers?access_key='+apiKey+'&symbols='+input+'', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })

  .then(function (response) {
    if (response.ok) {
        //console.log(response);
        response.json().then(function (data) {
            console.log(data);
            console.log(data.data[0].name);
            
            stockTitleEl.textContent = data.data[0].name;
        
          
          });
    
    
      } else {
        console.log('response', response);
        alert('Error: ' + response.statusText);

    }
})
.catch(function (error) {
    alert(error + ' Unable to connect');
});

    
  //fetch API again to get stock price.




}


    
    
    
    //event listener to get stock ticker symbol from page, then fetch API

    formElement.addEventListener('submit', formSubmit);

    //add event listeners for one day/week/month/year buttons


