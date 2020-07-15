document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const select = document.getElementById('cars'),
    output = document.getElementById('output');

  select.addEventListener('change', () => {
    getData()
      .then((data) => {
        data.cars.forEach(item => {
          if (item.brand === select.value) {
            const {brand, model, year, price} = item;
            output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$ <br>
						Год выпуска ${year}`;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      })
  });

  const getData = () => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
			return;
			}
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          resolve(data);
        } else {
          reject(request.status)
        }
      });

      request.open('GET', './cars.json');
      request.setRequestHeader('Content-type', 'application/json');
      request.send();
    });
  };

});