/* eslint-disable no-undef */
const income = document.querySelector('#income');
let incomeTotal = 0;

fetch('/report/income')
  .then((res) => res.json())
  .then((data) => {
    const incomeData = data.income;
    // console.log(incomeData)
    incomeData.forEach((income) => {
      // console.log(typeof income.amount)
      incomeTotal += income.amount
      console.log(incomeTotal)
    });
  })
  .then(() => {
    const incomeItem = document.createElement('li');
    incomeItem.appendChild(document.createTextNode(`TOTAL INCOME: $${incomeTotal}`));
    income.appendChild(incomeItem);
  })


