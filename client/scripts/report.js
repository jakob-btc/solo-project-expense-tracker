/* eslint-disable no-undef */
const incomeAmountBoxDiv = document.querySelector('.income-amount-box');
const expenseAmountBoxDiv = document.querySelector('.expense-amount-box');
const paydayAmountBoxDiv = document.querySelector('.payday-amount-box');

let payday = 0;
let paydayPercent = 0;
let expenseTotal = 0;
let expensePercent = 0;
let incomeTotal = 0;

fetch('/report/income')
  .then((res) => res.json())
  .then((data) => {
    const incomeData = data.income;
    // console.log('incomeData', incomeData);
    const incomeDataObj = {}
    
    incomeData.forEach((income) => {
      incomeTotal += income.amount
      if (incomeDataObj[income.description]) incomeDataObj[income.description] += income.amount;
      else incomeDataObj[income.description] = income.amount;
    });

    // Create and append element for income-total-amount
    const incomeTotalAmountDiv = document.createElement('div')
    incomeTotalAmountDiv.className = 'income-total-amount';
    incomeTotalAmountDiv.innerText = `$ ${incomeTotal.toLocaleString()}`;
    incomeAmountBoxDiv.appendChild(incomeTotalAmountDiv);
  
    for (const [key, value] of Object.entries(incomeDataObj)) {
      const incomeTotalText = document.querySelector('.income-total-text');
      const incomeSubtotalTextP = document.createElement('p')
      incomeSubtotalTextP.className = 'income-subtotal-text';
      incomeSubtotalTextP.innerText = `${key}`;
      incomeTotalText.appendChild(incomeSubtotalTextP)

      const incomeSubtotalAmountP = document.createElement('p')
      incomeSubtotalAmountP.className = 'income-subtotal-amount';
      incomeSubtotalAmountP.innerText = `$ ${value.toLocaleString()}`;
      incomeTotalAmountDiv.appendChild(incomeSubtotalAmountP)
    }
  })
  
fetch('/report/expenses')
  .then((res) => res.json())
  .then((data) => {
    const expenseData = data.expenses;
    console.log(expenseData);
    const expenseDataObj = {};
    // calculates totals and percentage
    expenseData.forEach((expense) => {
      expenseTotal += expense.amount;
      if (expenseDataObj[expense.category]) expenseDataObj[expense.category] += expense.amount;
      else expenseDataObj[expense.category] = expense.amount;
    });
    console.log(expenseDataObj);
    expensePercent = ((expenseTotal / incomeTotal) * 100).toFixed(1);

    // Create and append element for income-total-amount
    const expenseTotalAmountDiv = document.createElement('div');
    expenseTotalAmountDiv.className = 'income-total-amount';
    expenseTotalAmountDiv.innerText = `$ ${expenseTotal.toLocaleString()} | ${expensePercent}%`;
    expenseAmountBoxDiv.appendChild(expenseTotalAmountDiv);
    
    for (const [key, value] of Object.entries(expenseDataObj)) {
      const expenseTotalText = document.querySelector('.expense-total-text');
      const expenseSubtotalTextP = document.createElement('p');
      expenseSubtotalTextP.className = 'expense-subtotal-text';
      expenseSubtotalTextP.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
      expenseTotalText.appendChild(expenseSubtotalTextP);

      const expenseSubtotalAmountP = document.createElement('p')
      expenseSubtotalAmountP.className = 'expense-subtotal-amount';
      expenseSubtotalAmountP.innerText = `$ ${Number(value).toLocaleString()} | ${((((value / expenseTotal) * 100).toFixed(1)).toString()).padStart(4, '0')}%`;
      expenseTotalAmountDiv.appendChild(expenseSubtotalAmountP)
    }

    payday = (incomeTotal - expenseTotal);
    paydayPercent = ((((payday / incomeTotal) * 100).toFixed(1)).toString()).padStart(4, '0');

    const paydayTotalAmountDiv = document.createElement('div');
    paydayTotalAmountDiv.className = 'income-total-amount';
    paydayTotalAmountDiv.innerText = `$ ${payday.toLocaleString()} | ${paydayPercent}%`;
    paydayAmountBoxDiv.appendChild(paydayTotalAmountDiv);
  })

/* Parent: expense-total-text
  <p class="expense-subtotal-text">Food</p>
  <p class="expense-subtotal-text">Home</p>
  <p class="expense-subtotal-text">Car</p>
*/

/* Parent: expense-amount-box
<div class="expense-total-amount">$ 7,000</div>
<p class="expense-subtotal-amount">$ 2,000</p>
<p class="expense-subtotal-amount">$ 3,000</p>
<p class="expense-subtotal-amount">$ 1,000</p>
*/