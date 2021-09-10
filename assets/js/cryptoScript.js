let cryptoSearchText;

let chartPeriod;

let cryptoChart;

// let crypto24hPrice = [];
// let crypto1wPrice = [];
// let crypto1mPrice = [];
// let crypto3mPrice = [];
// let crypto1yPrice = [];


let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let oneDayEl = document.getElementById("oneDay");
let oneWeekEl = document.getElementById("oneWeek");
let oneMonthEl = document.getElementById("oneMonth");
let threeMonthEl = document.getElementById("threeMonth");
let oneYearEl = document.getElementById("oneYear");

function searchCrypto(key) {

    if (key.keyCode == 13) {

        cryptoSearchText = document.getElementById("cryptoSearch").value;

        fetch("https://api.coinstats.app/public/v1/coins/" + cryptoSearchText + "?currency=USD", requestOptions)
            .then(function (response) {
                if (response.ok) {
                    // console.log(response);
                    response.json().then(function (data) {
                        console.log(data);

                        clearChart();

                        let shortenedPrice = data.coin.price.toFixed(2);
                        document.getElementById("cryptoTitle").textContent = "Rank #" + data.coin.rank + " " + data.coin.name + " " + data.coin.symbol + " $" + shortenedPrice;

                    });
                } else {
                    console.log('response', response);
                    alert('Error: ' + response.statusText);

                }
            })
            .catch(function (error) {
                alert('Unable to connect');
            });
    }
}




function setTimeFrame() {
    fetch("https://api.coinstats.app/public/v1/charts?period="+ chartPeriod + "&coinId=" + cryptoSearchText, requestOptions)
    .then(function (response) {
        if (response.ok) {
            // console.log(response);
            response.json().then(function (data) {
                console.log(data);

                crypto24hPrice = [];
                crypto1wPrice = [];
                crypto1mPrice = [];
                crypto3mPrice = [];
                crypto1yPrice = [];

                if (chartPeriod === "24h") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto24hPrice.push(data.chart[i][1]);
                    }
                    cryptoTimeFrame = crypto24hPrice;
                } else if (chartPeriod === "1w") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1wPrice.push(data.chart[i][1]);
                    }
                    cryptoTimeFrame = crypto1wPrice;
                } else if (chartPeriod === "1m") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1mPrice.push(data.chart[i][1]);
                    }
                    cryptoTimeFrame = crypto1mPrice;
                } else if (chartPeriod === "3m") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto3mPrice.push(data.chart[i][1]);
                    }
                    cryptoTimeFrame = crypto3mPrice;
                } else if (chartPeriod === "1y") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1yPrice.push(data.chart[i][1]);
                    }
                    cryptoTimeFrame = crypto1yPrice;
                }
               
                generateChart(cryptoTimeFrame)

            });
        } else {
            console.log('response', response);
            alert('Error: ' + response.statusText);

        }
    })
    .catch(function (error) {
        alert('Unable to connect');
    });
}

function generateChart(chart){

    clearChart();

    let myChart = document.getElementById('myChart').getContext("2d");

    let cryptoChart = new Chart(myChart, {
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
    console.log('cryptoChart', cryptoChart);
}

function clearChart(){
    let containerEl = document.getElementById("chartContainer");
    let chartEl = document.getElementById("myChart");
    let createChart = document.createElement("canvas");
    chartEl.parentNode.removeChild(chartEl);
    containerEl.appendChild(createChart);
    createChart.id = "myChart";
}

oneDayEl.addEventListener("click", function setOneDayChart() {
    chartPeriod = "24h";
    setTimeFrame();
})
oneWeekEl.addEventListener("click", function setOneWeekChart() {
    chartPeriod = "1w";
    setTimeFrame();
})
oneMonthEl.addEventListener("click", function setOneMonthChart() {
    chartPeriod = "1m";
    setTimeFrame();
})
threeMonthEl.addEventListener("click", function setThreeMonthChart() {
    chartPeriod = "3m";
    setTimeFrame();
})
oneYearEl.addEventListener("click", function setOneYearChart() {
    chartPeriod = "1y";
    setTimeFrame();
})