// let cryptoRankEl = document.getElementById("cryptoRank").textContent;
// let cryptoNameEl = document.getElementById("cryptoName").textContent;
// let cryptoSymbolEl = document.getElementById("cryptoSymbol").textContent;
// let cryptoPriceEl = document.getElementById("cryptoPrice").textContent;


function searchCrypto(key) {

    if (key.keyCode == 13) {

        let cryptoSearchText = document.getElementById("cryptoSearch").value;

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.coinstats.app/public/v1/coins/" + cryptoSearchText + "?currency=USD", requestOptions)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);

                        document.getElementById("cryptoTitle").textContent = "Rank #" + data.coin.rank + " " + data.coin.name + " " + data.coin.symbol + " " + data.coin.price;
                        // document.getElementById("cryptoName").textContent = data.coin.name;
                        // document.getElementById("cryptoSymbol").textContent = data.coin.symbol;
                        // document.getElementById("cryptoPrice").textContent = data.coin.price;

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

// searchCrypto();



