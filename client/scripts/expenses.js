/* eslint-disable no-undef */
const expenses = document.querySelector('#expenses');
let expensesTotal = 0;

fetch('/report/expenses')
  .then((res) => res.json())
  .then((data) => {
    const expenseData = data.expenses;
    expenseData.forEach((expense) => {
      expensesTotal += expense.amount
    });
  })
  .then(() => {
    const expenseItem = document.createElement('li');
    expenseItem.appendChild(document.createTextNode(`TOTAL EXPENSES: $${expensesTotal}`));
    expenses.appendChild(expenseItem);
  })


