

function searchCrypto() {

    let cryptoSearchText = prompt("Enter cryptocurrency:")
    let cryptoSearchTime = prompt("Enter timeframe: \n24h, 1w, 1m, 3m, 6m, 1y, all")

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://api.coinstats.app/public/v1/charts?period=" + cryptoSearchTime + "&coinId=" + cryptoSearchText, requestOptions)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
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


searchCrypto();

