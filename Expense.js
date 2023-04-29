// select form and expense list elements

let form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");

// Add event listener to form submit button

form.addEventListener("submit", addItem);

// Add event listener to delete button
expenseList.addEventListener("click", removeItem);

// Add event listener to edit button
expenseList.addEventListener("click", editExpense);

function addItem(e) {
  e.preventDefault();

  // Get form values
  let expenseAmt = document.getElementById("expense_Amt").value;

  let expenseDesc = document.getElementById("expense_desc").value;
  let expenseCategory = document.getElementById("expense_category").value;

  // create expense object
  let expense = {
    id: Math.random(),
    amount: expenseAmt,
    description: expenseDesc,
    category: expenseCategory,
  };

  // Get existing expenses from local storage
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Add new expense to expenses array
  expenses.push(expense);

  // Store expenses in local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Display expenses on page
  displayExpenses();
}

// function to display expenses on page

function displayExpenses() {
  // clear expense list element
  expenseList.innerHTML = "";

  // Get expenses from local storage

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // create HTML elements for each expense and append to expense list

  for (let i = 0; i < expenses.length; i++) {
    // let expense = expenses[i];
    let expenseItem = document.createElement("li");

    const { id, amount, description: desc, category: catg } = expenses[i];

    expenseItem.setAttribute("id", id);
    expenseItem.innerHTML = `<p>Amount: ${amount}   Description: ${desc}    Category: ${catg} </p>`;
    // expenseItem.innerHTML = "<p>Amount: " +expense.amount +
    //                         " Description: " +expense.description +
    //                         " Category: " +expense.category + " </p>" ;

    // create del button element
    var deleteBtn = document.createElement("button");

    // Add classes to del button
    deleteBtn.className = "btn btn-danger btn-sm float-right delete ";

    // Append text node
    deleteBtn.appendChild(document.createTextNode("Delete Expense"));

    // create edit button element
    var editBtn = document.createElement("button");

    // Add classe to edit button
    editBtn.className = "btn btn-danger btn-sm float-right edit";

    // Append text node
    editBtn.appendChild(document.createTextNode("Edit Expense"));

    expenseItem.appendChild(deleteBtn);
    expenseItem.appendChild(editBtn);

    expenseList.appendChild(expenseItem);
  }
}

function removeItem(e, isEdit = false) {
  //   const isEdit = e.target.classList.contains("edit");
  const isDel = e.target.classList.contains("delete");
  if (isDel || isEdit) {
    // if(isDel)

    if (isEdit || confirm("Are you sure?")) {
      // var ul = e.target.parentElement.parentNode;

      var li = e.target.parentElement;
      const listInd = li.getAttribute("id");

      // filtering out based on ID from localStorage
      const allExpenses = localStorage.getItem("expenses") || [];

      let updatedExp = JSON.parse(allExpenses).filter(
        (exp) => listInd != exp.id
      );

      localStorage.setItem("expenses", JSON.stringify(updatedExp));

      //   remove list from UI <ul>
      expenseList.removeChild(li);
    }
  }
}

function editExpense(e) {
  if (e.target.classList.contains("edit")) {
    // get the expense details from the expense item

    const expenseItem = e.target.parentElement;
    const listId = expenseItem.getAttribute("id");

    // filter out from localStrg.
    const expList = JSON.parse(localStorage.getItem("expenses")) || [];

    console.log("exopnse");
    console.log(expList);

    const expenseDetails = expList.filter((exp) => exp.id == listId);

    console.log("list ind");
    console.log(listId);
    console.log("expenseDetails");
    console.log(expenseDetails);

    const expenseAmt = expenseDetails[0].amount; // extract the amount value
    const expenseDesc = expenseDetails[0].description; // extract the description value
    const expenseCategory = expenseDetails[0].category; // extract the category value

    // const expenseDetails = expenseItem.innerHTML.split(" "); // split the HTML string by spaces
    // const expenseAmt = expenseDetails[1]; // extract the amount value
    // const expenseDesc = expenseDetails[3]; // extract the description value
    // const expenseCategory = expenseDetails[5]; // extract the category value

    // set the form values to the expense details
    document.getElementById("expense_Amt").value = expenseAmt;
    document.getElementById("expense_desc").value = expenseDesc;
    document.getElementById("expense_category").value = expenseCategory;

    // remove the expense item from the list
    console.log("removing the item .......");
    removeItem(e, true);
    console.log("item rmeoved");

    // add event listener to the form submit button
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // get the updated expense details from the form
      const updatedExpenseAmt = document.getElementById("expense_Amt").value;
      const updatedExpenseDescription =
        document.getElementById("expense_desc").value;
      const updatedExpenseCategory =
        document.getElementById("expense_category").value;

      // create the updated expense object

      const updatedExpense = {
        amount: updatedExpenseAmt,
        description: updatedExpenseDescription,
        category: updatedExpenseCategory,
      };

      // get the exisiting expenses from local storage

      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

      // find the index of the expense to be updated
      const index = expenses.findIndex(
        (expense) =>
          expense.amount === expenseAmt &&
          expense.description === expenseDesc &&
          expense.category === expenseCategory
      );

      // update the expense at a specified index
      expenses[index] = updatedExpense;

      // store the updated expense in local storage

      localStorage.setItem("expenses", JSON.stringify(expenses));

      // display the updated expenses on the page
      displayExpenses();

      // remove the event listener from the form submit button
      form.removeEventListener("submit", arguments.callee);
    });
  }
}
