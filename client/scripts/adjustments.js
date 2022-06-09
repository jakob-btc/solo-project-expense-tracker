/* eslint-disable no-undef */
const columnOneDiv = document.querySelector('.database-column-1');
const columnTwoDiv = document.querySelector('.database-column-2');
const columnThreeDiv = document.querySelector('.database-column-3');
const columnFourDiv = document.querySelector('.database-column-4');
const columnFiveDiv = document.querySelector('.database-column-5');
const columnSixDiv = document.querySelector('.database-column-6');
const columnSevenDiv = document.querySelector('.database-column-7');
const columnEigthDiv = document.querySelector('.database-column-8');

fetch('/report/all')
  .then((res) => res.json())
  .then((data) => {
    const allData = data.allEntries;

    allData.forEach(entry => {
      const {_id, type, category, description, amount, date}  = entry;
      const columns = [
        _id, 
        type.charAt(0).toUpperCase() + type.slice(1), 
        category.charAt(0).toUpperCase() + category.slice(1), 
        description.charAt(0).toUpperCase() + description.slice(1), 
        amount.toLocaleString('en-US', { 
          style: 'currency', 
          currency: 'USD'
        }), 
        date.slice(0, 10)
      ]
      let i = 1;
      for (columnEntry of columns) {
        console.log(columnEntry)
        const columnEntryP = document.createElement('p');
        columnEntryP.className = 'column-entry';
        columnEntryP.innerText = `${columnEntry}`;
        const columnDiv = document.querySelector(`.database-column-${i}`);
        columnDiv.appendChild(columnEntryP);
        i += 1;
      }

      const columnEntryForm = document.createElement('form');
      columnEntryForm.method = 'get';
      columnEntryForm.action = '/delete/entry';
      columnSevenDiv.appendChild(columnEntryForm);

      const formElementHidden = document.createElement('input');
      formElementHidden.type = 'hidden';
      formElementHidden.name = 'id';
      formElementHidden.value = `${_id}`;
      columnEntryForm.appendChild(formElementHidden);

      const formElementButton = document.createElement('input');
      formElementButton.className = 'delete-button';
      formElementButton.type = 'submit';
      formElementButton.value = 'Delete';
      columnEntryForm.appendChild(formElementButton);

      const columnEntryForm2 = document.createElement('form');
      columnEntryForm2.method = 'get';
      columnEntryForm2.action = '/update/entry';
      columnEigthDiv.appendChild(columnEntryForm2);

      const formElementHidden2 = document.createElement('input');
      formElementHidden2.type = 'hidden';
      formElementHidden2.name = 'id';
      formElementHidden2.value = `${_id}`;
      columnEntryForm2.appendChild(formElementHidden2);

      const formElementButton2 = document.createElement('input');
      formElementButton2.className = 'update-button';
      formElementButton2.type = 'submit';
      formElementButton2.value = 'Update';
      columnEntryForm2.appendChild(formElementButton2);

    })
  })