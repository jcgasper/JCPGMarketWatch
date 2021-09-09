let cryptoSearchText;
let chartPeriod;

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let oneDayEl = document.getElementById("oneDay");
let oneWeekEl = document.getElementById("oneWeek");
let oneMonthEl = document.getElementById("oneMonth");
let threeMonthEl = document.getElementById("threeMonth");
let oneYearEl = document.getElementById("oneYear");

let cryptoChart;

function searchCrypto(key) {

    if (key.keyCode == 13) {

        cryptoSearchText = document.getElementById("cryptoSearch").value;

        fetch("https://api.coinstats.app/public/v1/coins/" + cryptoSearchText + "?currency=USD", requestOptions)
            .then(function (response) {
                if (response.ok) {
                    // console.log(response);
                    response.json().then(function (data) {
                        console.log(data);

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








    //     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });



function generateChart() {
    fetch("https://api.coinstats.app/public/v1/charts?period=" + chartPeriod + "&coinId=" + cryptoSearchText, requestOptions)
    .then(function (response) {
        if (response.ok) {
            // console.log(response);
            response.json().then(function (data) {
                console.log(data);

                let myChart = document.getElementById('myChart').getContext("2d");

                // Chart.defaults.global.defaultFontFamily = "Lato";
                // Chart.defaults.global.defaultFontSize = 18;
                // Chart.defaults.global.defaultFontColor = "#777";

                let cryptoChart = new Chart(myChart, {
                    type: "line", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
                    data: {
                        labels: data.chart,
                        datasets: [{
                            label: "Price",
                            data: data.chart,
                            // backgroundColor: "green"
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
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Crypto",
                            fontSize: 25
                        },
                        legend: {
                            position: "right"
                        }
                    }
                });
                console.log('cryptoChart', cryptoChart);
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

oneDayEl.addEventListener("click", function setOneDayChart() {
    chartPeriod = "24h";
    generateChart();
})
oneWeekEl.addEventListener("click", function setOneWeekChart() {
    chartPeriod = "1w";
    cryptoChart.destroy();
    generateChart();
})
oneMonthEl.addEventListener("click", function setOneMonthChart() {
    chartPeriod = "1m";
    generateChart();
})
threeMonthEl.addEventListener("click", function setThreeMonthChart() {
    chartPeriod = "3m";
    generateChart();
})
oneYearEl.addEventListener("click", function setOneYearChart() {
    chartPeriod = "1y";
    generateChart();
})