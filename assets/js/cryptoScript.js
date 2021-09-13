let cryptoSearchText;
let chartPeriod;
let cryptoChart;

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
        cryptoSearchText = cryptoSearchText.toLowerCase();

        fetch("https://api.coinstats.app/public/v1/coins/" + cryptoSearchText + "?currency=USD", requestOptions)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);

                        clearChart();

                        let shortenedPrice = data.coin.price.toFixed(2);

                        document.getElementById("cryptoInfo").classList.add("show", "card")

                        let imgContEl = document.getElementById("iconContainer");
                        let imgEl = document.getElementById("icon");
                        let createImg = document.createElement("img");
                        imgEl.parentNode.removeChild(imgEl);
                        imgContEl.appendChild(createImg);
                        createImg.id = "icon"
                        createImg.src = data.coin.icon;

                        document.getElementById("cryptoTitle").textContent = data.coin.name + " [" + data.coin.symbol + "]";

                        document.getElementById("cryptoPrice").textContent ="$" + shortenedPrice;

                        let siteContEl = document.getElementById("siteContainer");
                        let siteEl = document.getElementById("site");
                        let createSite = document.createElement("a");
                        siteEl.parentNode.removeChild(siteEl);
                        siteContEl.appendChild(createSite);
                        createSite.id = "site"
                        createSite.href = data.coin.websiteUrl;
                        createSite.target = "_blank"
                        document.getElementById("site").textContent = data.coin.websiteUrl;

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
    console.log(chartPeriod, cryptoSearchText);
    fetch("https://api.coinstats.app/public/v1/charts?period="+ chartPeriod + "&coinId=" + cryptoSearchText, requestOptions)
    .then(function (response) {
        if (response.ok) {
            console.log("*********")
            console.log(response);
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
                    chart = crypto24hPrice;
                } else if (chartPeriod === "1w") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1wPrice.push(data.chart[i][1]);
                    }
                    chart = crypto1wPrice;
                } else if (chartPeriod === "1m") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1mPrice.push(data.chart[i][1]);
                    }
                    chart = crypto1mPrice;
                } else if (chartPeriod === "3m") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto3mPrice.push(data.chart[i][1]);
                    }
                    chart = crypto3mPrice;
                } else if (chartPeriod === "1y") {
                    for (i = 0; i < data.chart.length; i++) {
                        crypto1yPrice.push(data.chart[i][1]);
                    }
                    chart = crypto1yPrice;
                }
               
                generateChart(chart, chartPeriod)

            });
        } else {
            console.log('response', response);
            alert('Error: ' + response.statusText);

        }
    })
    .catch (function(error) {
        alert('Unable to connect');
    });
}

function generateChart(chart, chartPeriod){

    clearChart();

    document.getElementById("gainsContainer").classList.add("show");

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
    console.log(gains);
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

    document.getElementById("gainsContainer").classList.remove("show");
    document.getElementById("gainsTimeFrame").textContent = "";
    document.getElementById("cryptoGains").textContent = "";
    document.getElementById("cryptoGains").classList.remove("increase")
    document.getElementById("cryptoGains").classList.remove("decrease")
}

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