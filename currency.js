// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency="

const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector('button')
const fromCur = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected"
    } else if (select.name == 'to' && currCode == 'INR') {
      newOption.selected = 'selected'
    }
    select.append(newOption);
  }
  select.addEventListener('change', (evt) => {
    updateFlag(evt.target)
  })
}

const updateExchangeRate = async () => {
  let amout = document.getElementById('myInput');
  let amtVal = amout.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amout.value = "1"
  }
  // const url = `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  const url = `${BASE_URL}${fromCur.value}&currencies=${toCurr.value}`

  let response = await fetch(url);
  let data = await response.json();
  let rate = [data][0].data[toCurr.value]
  let finalAmount = amout.value * rate
  msg.innerText = `${amout.value} ${fromCur.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector('img');
  img.src = newSrc;
}

btn.addEventListener('click', (evt) => {
  evt.preventDefault()
  updateExchangeRate()
})

window.addEventListener('load', ()=>{
  updateExchangeRate()
})
