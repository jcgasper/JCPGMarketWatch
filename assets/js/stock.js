let submitElement = document.querySelector(".input");
let formElement = document.querySelector(".form");
let stockTitleEl = document.querySelector(".stockTitle");
let stockInfoEl = document.querySelector(".stockInfoEl");
let apiKey = "75c3119c360260691b306d8841a20c7d";

let oneDayEl = document.getElementById("oneDay");
let oneWeekEl = document.getElementById("oneWeek");
let oneMonthEl = document.getElementById("oneMonth");
let threeMonthEl = document.getElementById("threeMonth");
let oneYearEl = document.getElementById("oneYear");

let chartPeriod;
let stockTicker = "";

let dateFrom;
let dateTo;

//  75c3119c360260691b306d8841a20c7d  -marketstack api

//https://https://api.finage.co.uk/last/stock/AAPL?apikey=API_KEY35E1M21URYLC8TXVHSMPMENWJR5D1LCJ

//needs https:/ to work 

// http://api.marketstack.com/v1/eod?access_key='+apiKey+'&symbols='+stockTicker+''    can add date ranges for charts

// get ticker info 'http://api.marketstack.com/v1/ticker?access_key='+apiKey+'&symbols='+input+''

    function formSubmit(event) {
      event.preventDefault();
      let input = submitElement.value;
      stockTicker = submitElement.value;
      
      localStorage.setItem("input",stockTicker)

      fetch('https://api.marketstack.com/v1/tickers?access_key='+apiKey+'&symbols='+input+'', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })

  .then(function (response) {
    if (response.ok) {
        //console.log(response);
        response.json().then(function (data) {
            console.log(data);
            
            console.log(data.data[0].stock_exchange.name);
            stockTitleEl.textContent = data.data[0].name + " - " + data.data[0].stock_exchange.name;
        
          
          });
    
    
      } else {
        console.log('response', response);
        alert('Error: ' + response.statusText);

    }
})
.catch(function (error) {
    alert(error + ' Unable to connect');
});

    
  


fetch('https://api.marketstack.com/v1/eod?access_key='+apiKey+'&symbols='+input+'', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })

  .then(function (response) {
    if (response.ok) {
        
        response.json().then(function (data) {
            console.log(data);
            console.log(data.data[0].adj_close);
            
            stockTitleEl.textContent = stockTitleEl.textContent  + " - Current/Closing Price: $" + data.data[0].adj_close;
        
          
          });
    
    
      } else {
        
        alert('Error: ' + response.statusText);

    }
})
.catch(function (error) {
    alert(error + ' Unable to connect');
});





}




// send array of price data to generate chart
function generateChart(chart){

  clearChart();

  let myChart = document.getElementById('myChart').getContext("2d");

 
 
  let stockChart = new Chart(myChart, {
      type: "line", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
          labels: chart,
          datasets: [{
              label: "Price",
              data: chart,
              backgroundColor: "green",
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1,
              borderColor: "#777",
              hoverBorderWidth: 3,
              hoverBorderColor: "#000"
          }],
      },
      options: {
          maintainAspectRatio: false,
      }
  });
  generateGains(chart, chartPeriod);

}

function generateGains(chart, chartPeriod) {
  if (chartPeriod === "24h"){
      document.getElementById("gainsTimeFrame").textContent = "One Day: ";
  } else if (chartPeriod === "1w") {
      document.getElementById("gainsTimeFrame").textContent = "One Week: ";
  } else if (chartPeriod === "1m") {
      document.getElementById("gainsTimeFrame").textContent = "One Month: ";
  } else if (chartPeriod === "3m") {
      document.getElementById("gainsTimeFrame").textContent = "Three Months: ";
  } else if (chartPeriod === "1y") {
      document.getElementById("gainsTimeFrame").textContent = "One Year: ";
  }

  let gains = chart[chart.length - 1] / chart[0];
  
  gains = (gains * 100) - 100;
  let shortenedGains = gains.toFixed(2);

  if (shortenedGains >= 0){
      document.getElementById("cryptoGains").textContent = "+" + shortenedGains + "%";
      document.getElementById("cryptoGains").classList.remove("increase")
      document.getElementById("cryptoGains").classList.remove("decrease")
      document.getElementById("cryptoGains").classList.add("increase")
  } else {
      document.getElementById("cryptoGains").textContent = shortenedGains + "%";
      document.getElementById("cryptoGains").classList.remove("increase")
      document.getElementById("cryptoGains").classList.remove("decrease")
      document.getElementById("cryptoGains").classList.add("decrease")
  }
  
}




function clearChart(){
  let containerEl = document.getElementById("chartContainer");
  let chartEl = document.getElementById("myChart");
  let createChart = document.createElement("canvas");
  chartEl.parentNode.removeChild(chartEl);
  containerEl.appendChild(createChart);
  createChart.id = "myChart";
}

function getDateRange(chartPeriod) {
  let date = new Date();

  let fullYear;
  let month;
  let day;
  
  if (chartPeriod == "1y") {
    fullYear = date.getFullYear();
    month = date.getMonth() + 1;
    if (month<10) {
      month = "0"+month;
    }
    day = date.getDate();

    if (day<10) {
      day = "0"+day;
    }

    dateFrom = fullYear-1 + "-" + month + "-" + day;
    dateTo = fullYear + "-" + month + "-" + day;

  }

    //may cause error if 3months ago is a shorter month ex. 30th of one month, but previous month only has 28 days
  else if (chartPeriod == "3m") {
    fullYear = date.getFullYear();
    month = date.getMonth() + 1;
    let preMonth = date.getMonth() + 1 -3;
    if (month<10) {
      month = "0"+month;
    }

    if (preMonth<10) {
      preMonth = "0"+preMonth;
    }
    day = date.getDate();

    if (day<10) {
      day = "0"+day;
    }

    dateFrom = fullYear + "-" + preMonth + "-" + day;
    dateTo = fullYear + "-" + month + "-" + day;

  }

  //can have same error as 3m where a longer month won't have the same day as a shorter month
  else if (chartPeriod == "1m") {
    fullYear = date.getFullYear();
    month = date.getMonth() + 1;
    let preMonth = date.getMonth() + 1 -1;
    if (month<10) {
      month = "0"+month;
    }

    if (preMonth<10) {
      preMonth = "0"+preMonth;
    }
    day = date.getDate();

    if (day<10) {
      day = "0"+day;
    }

    dateFrom = fullYear + "-" + preMonth + "-" + day;
    dateTo = fullYear + "-" + month + "-" + day;

  }

  else if (chartPeriod == "1w") {
    fullYear = date.getFullYear();
    
    month = date.getMonth() + 1;
    let preDay;
    if (month<10) {
      month = "0"+month;
    }
    day = date.getDate();
    

    if (day<10) {
      day = "0"+day;
    } 
    var currentDate = new Date();
    
    var weekAgoDate=new Date(currentDate.setDate(currentDate.getDate() - 7));
    
    let preMonth = weekAgoDate.getMonth() +1;
    preDay = weekAgoDate.getDate();

    
    if (preMonth < 10) {
      preMonth = "0"+preMonth;
    }
    
    
    if (preDay<10) {
      preDay = "0"+preDay;
    }
    
    dateFrom = fullYear + "-" + preMonth + "-" + preDay;
    dateTo = fullYear + "-" + month + "-" + day;
    
  
  }
  
  else if (chartPeriod == "24h") {
    fullYear = date.getFullYear();
    month = date.getMonth() + 1;
    let weekDay = date.getDay();
    
    let preDay;
    if (month<10) {
      month = "0"+month;
    }
    day = date.getDate();
    preDay = day-1;

    if (day<10) {
      day = "0"+day;
    }

    if (preDay<10) {
      preDay = "0"+preDay;
    }

    dateFrom = fullYear + "-" + month + "-" + preDay;
    dateTo = fullYear + "-" + month + "-" + day;

  }




}
    
    
 //adjust to works with stock API
function setTimeFrame() {
  
  
  getDateRange(chartPeriod);

  

  //get proper dates for time period
  
  
  
  fetch('https://api.marketstack.com/v1/eod?access_key='+apiKey+'&symbols='+stockTicker+'&date_from='+dateFrom+'&date_to='+dateTo+'&limit=1000',)
  .then(function (response) {
      if (response.ok) {
          
          response.json().then(function (data) {
              

              stockPricesArray = [];

              

              for (let i = 0; i <data.data.length; i++) {

                stockPricesArray.push(data.data[i].adj_close);

              }
             
             
              generateChart(stockPricesArray)

          });
      } else {
          
          alert('Error: ' + response.statusText);

      }
  })
  .catch (function(error) {
      alert('Unable to connect');
  });
}


function init() {
      if (localStorage.getItem("input") != null) {
        
      stockTicker = localStorage.getItem("input");
        input = stockTicker;
      fetch('https://api.marketstack.com/v1/tickers?access_key='+apiKey+'&symbols='+input+'', {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
      })
    
      .then(function (response) {
        if (response.ok) {
            //console.log(response);
            response.json().then(function (data) {
                console.log(data);
                
                
                stockTitleEl.textContent = data.data[0].name + " - " + data.data[0].stock_exchange.name;
            
              
              });
        
        
          } else {
            console.log('response', response);
            alert('Error: ' + response.statusText);
    
        }
    })
    .catch(function (error) {
        alert(error + ' Unable to connect');
    });
    
        
      
    
    
    fetch('https://api.marketstack.com/v1/eod?access_key='+apiKey+'&symbols='+input+'', {
        // The browser fetches the resource from the remote server without first looking in the cache.
        // The browser will then update the cache with the downloaded resource.
        cache: 'reload',
      })
    
      .then(function (response) {
        if (response.ok) {
            
            response.json().then(function (data) {
                console.log(data);
                console.log(data.data[0].adj_close);
                
                stockTitleEl.textContent = stockTitleEl.textContent  + " - Current/Closing Price: $" + data.data[0].adj_close;
            
              
              });
        
        
          } else {
            
            alert('Error: ' + response.statusText);
    
        }
    })
    .catch(function (error) {
        alert(error + ' Unable to connect');
    });


    }


}




    
    //event listener to get stock ticker symbol from page, then fetch API

    formElement.addEventListener('submit', formSubmit);

    //add event listeners for one day/week/month/year buttons


  oneDayEl.addEventListener("click", function (event){
      event.preventDefault()
      chartPeriod = "24h";
      setTimeFrame();
  })
  oneWeekEl.addEventListener("click", function (event){
      event.preventDefault()
      chartPeriod = "1w";
      setTimeFrame();
  })
  oneMonthEl.addEventListener("click", function (event){
      event.preventDefault()
      chartPeriod = "1m";
      setTimeFrame();
  })
  threeMonthEl.addEventListener("click", function (event){
      event.preventDefault()
      chartPeriod = "3m";
      setTimeFrame();
  })
  oneYearEl.addEventListener("click", function (event){
      event.preventDefault()
      chartPeriod = "1y";
      setTimeFrame();
})

init();