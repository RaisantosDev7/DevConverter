const form = document.getElementById('form');
const resultElement = document.getElementById('result');

form.addEventListener('submit', async function(event){
    event.preventDefault();

    try{
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            throw new Error('Erro ao obter cotações.');
        }

        const valueReal = parseFloat(document.getElementById('value-real').value);
        const selectedCurrency = document.getElementById('currency').value;

        if (isNaN(valueReal) || valueReal <= 0 || selectedCurrency === '') {
            alert('Por favor, insira um valor válido e escolha uma moeda.');
            return;
        }
        
        const rate = data[`USDBRL`].bid;
        const rate2 = data[`EURBRL`].bid; 
            let result;

            switch (selectedCurrency) {
                case 'euro':
                    result = valueReal / rate2;
                    break;
                case 'dolar':
                    result = valueReal / rate;
                    break;
                default:
                    result = 'Erro na conversão';
            }
        {
            resultElement.textContent = `Resultado: ${result.toFixed(2)} ${selectedCurrency.toUpperCase()}`;}
          }  catch (error) {
            console.error('Erro ao obter cotações:', error.message);
        }
    }
);