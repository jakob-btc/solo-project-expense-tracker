/* eslint-disable no-undef */
const report = document.querySelector('#report');
let payday = 0;
let paydayPercent = 0;
let expensesTotal = 0;
let expensesPercent = 0;
let incomeTotal = 0;

fetch('/report/income')
  .then((res) => res.json())
  .then((data) => {
    const incomeData = data.income;
    incomeData.forEach((income) => {
      incomeTotal += income.amount
    });
  })
  .then(() => {
    const incomeItem = document.createElement('li');
    incomeItem.appendChild(document.createTextNode(`TOTAL INCOME: $${incomeTotal}`));
    report.appendChild(incomeItem);
  })

fetch('/report/expenses')
  .then((res) => res.json())
  .then((data) => {
    const expenseData = data.expenses;
    console.log(expenseData)
    const existingCat = {}
    // calculates totals and percentage
    expenseData.forEach((expense) => {
      expensesTotal += expense.amount
      if (existingCat[expense.category]) existingCat[expense.category] += expense.amount;
      else existingCat[expense.category] = expense.amount;
    });
    console.log(existingCat)
    expensesPercent = ((expensesTotal / incomeTotal) * 100).toFixed(1)
    const expenseContainer = document.createElement('li');
    expenseContainer.appendChild(document.createTextNode(`TOTAL EXPENSES: -$${expensesTotal} | ${expensesPercent}%`));
    report.appendChild(expenseContainer);
    for (const [key, value] of Object.entries(existingCat)) {
      const expenseItemPerc = ((value / expensesTotal) * 100).toFixed(1)
      const expenseItem = document.createElement('li');
      expenseItem.appendChild(document.createTextNode(`${key.charAt(0).toUpperCase() + key.slice(1)}: $${value} | ${expenseItemPerc}%`));
      expenseContainer.appendChild(expenseItem)
    }
  })
  .then(() => {
    payday = incomeTotal - expensesTotal;
    paydayPercent = ((payday / incomeTotal) * 100).toFixed(1)
    const paydayItem = document.createElement('h2');
    paydayItem.appendChild(document.createTextNode(`PAYDAY: $${payday} | ${paydayPercent}%`));
    report.appendChild(paydayItem);
  })


