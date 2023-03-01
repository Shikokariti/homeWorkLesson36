let bitcoinRateInUSD;
let bitcoinRateInILS;
let USDRateInILS;

async function getBitcoinRateInUSD() {
    let bitcoinRatesAPI = await fetch('https://data.binance.com/api/v3/ticker/24hr').then((response)=>response.json());
    bitcoinRateInUSD = bitcoinRatesAPI.find(item => item.symbol == 'BTCUSDT');
    bitcoinRateInUSD = bitcoinRateInUSD.lastPrice;
    return bitcoinRateInUSD;
}
async function getUSDToILS() {
    let dollarToShekelAPI = await fetch('https://api.exchangerate.host/latest?base=USD').then((response)=>response.json());
    USDRateInILS = dollarToShekelAPI.rates;
    USDRateInILS = USDRateInILS.ILS;
    return USDRateInILS;
}
async function checkBitcoinInILS() {
    let bitcoinToUSD = await getBitcoinRateInUSD();
    let USDToShekel = await  getUSDToILS();
    bitcoinRateInILS = bitcoinToUSD * USDToShekel;
    renderHTML(bitcoinRateInILS);
}
function renderHTML(data) {
    document.getElementById('displayRate').innerText = data;
    setTimeout(checkBitcoinInILS,10000);
}
checkBitcoinInILS();
