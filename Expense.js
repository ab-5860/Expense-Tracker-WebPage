// select form and expense list elements

let form  = document.getElementById("expense-form");
let expenseList = document.getElementById("expense-list");


// Add event listener to form submit button 

form.addEventListener("submit", addItem);

// Add event listener to delete button
expenseList.addEventListener('click', removeItem);


// Add event listener to edit button
expenseList.addEventListener('click',editExpense);

function addItem(e)
{
    e.preventDefault();

    // Get form values
    let expenseAmt = document.getElementById("expense_Amt").value;

    let expenseDesc = document.getElementById("expense_desc").value;
    let expenseCategory = document.getElementById("expense_category").value;

    // create expense object 
    let expense = {
        amount: expenseAmt,
        description: expenseDesc,
        category: expenseCategory
    };

    // Get existing expenses from local storage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Add new expense to expenses array
    expenses.push(expense);

    // Store expenses in local storage 
    localStorage.setItem("expenses",JSON.stringify(expenses));

    // Display expenses on page
    displayExpenses();

}


// function to display expenses on page

function displayExpenses()
{

    // clear expense list element
    expenseList.innerHTML = "";

    // Get expenses from local storage

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // create HTML elements for each expense and append to expense list

    for(let i=0; i< expenses.length;i++)
    {
        let expense = expenses[i];
        let expenseItem = document.createElement("li");

        expenseItem.innerHTML = "<p>Amount: " +expense.amount + 
                                " Description: " +expense.description + 
                                " Category: " +expense.category + "</p>" ;

        // create del button element
        var deleteBtn  = document.createElement('button');

        // Add classes to del button 
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete ';

        // Append text node
        deleteBtn.appendChild(document.createTextNode('Delete Expense'));

        // create edit button element
        var editBtn = document.createElement("button");

        // Add classe to edit button
        editBtn.className = 'btn btn-danger btn-sm float-right edit';

        // Append text node
        editBtn.appendChild(document.createTextNode('Edit Expense'));

        expenseItem.appendChild(deleteBtn);
        expenseItem.appendChild(editBtn);
        
        expenseList.appendChild(expenseItem);
    }

}

function removeItem(e)
{
    if(e.target.classList.contains('delete'))
    {
        if(confirm('Are you sure?'))
        {
            var li = e.target.parentElement;
            expenseList.removeChild(li);
        }
    }
}

function editExpense(e)
{
    if(e.target.classList.contains('edit'))
    {
        
        // get the expense details from the expense item

        const expenseItem = e.target.parentElement;
        console.log(expenseItem);
        const expenseDetails = expenseItem.textContent.split(": ");
        console.log(expenseDetails);
        const expenseAmt = expenseDetails[1];
        const expenseDesc = expenseDetails[2];
        const expenseCategory = expenseDetails[3];

        // set the form values to the expense details
        document.getElementById("expense_Amt").value = expenseAmt;
        document.getElementById("expense_desc").value = expenseDesc;
        document.getElementById("expense_category").value = expenseCategory;


        // remove the expense item from the list
        expenseList.removeChild(expenseItem);

        // add event listener to the form submit button
        form.addEventListener("submit", function(e){
            e.preventDefault();

            // get the updated expense details from the form
            const updatedExpenseAmt = document.getElementById("expense_Amt").value;
            const updatedExpenseDescription = document.getElementById("expense_desc").value;
            const updatedExpenseCategory = document.getElementById("expense_category").value;

            // create the updated expense object

            const updatedExpense = {
                amount: updatedExpenseAmt,
                description: updatedExpenseDescription,
                category: updatedExpenseCategory
            };

            // get the exisiting expenses from local storage

            const expenses  = JSON.parse(localStorage.getItem("expenses")) || [];

            // find the index of the expense to be updated
            const index = expenses.findIndex(expenses => expense.amount === expenseAmt 
                                    && expense.description === expenseDesc && expense.category === expenseCategory);

            
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