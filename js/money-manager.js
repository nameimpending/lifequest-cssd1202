const budgetForm = document.getElementById('budget-form');

// summary elements
const sumIncome  = document.getElementById('sum-income');
const sumExpense = document.getElementById('sum-Expense');
const sumFunding = document.getElementById('sum-funding');

// Form Submission & Validation +=+=+=+=+=+=+=+=+

budgetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // clear prior message
    document.getElementById('income').textContent      = '';
    document.getElementById('Rent-Mort').textContent   = '';
    document.getElementById('food').textContent        = '';
    document.getElementById('bills').textContent       = '';
    document.getElementById('submission').textContent  = '';
    sumIncome.textContent  = '';
    sumExpense.textContent = '';
    sumFunding.textContent = '';
    sumFunding.style.color = '';

    // values
    const income = parseFloat(document.getElementById('monthly-income').value);
    const rent = parseFloat(document.getElementById('ReMo').value);
    const food = parseFloat(document.getElementById('FoodE').value);
    const bills = parseFloat(document.getElementById('Bills').value);

    let isValid = true;

    // validate income
    if (isNaN(income) || income < 0) {
        document.getElementById('income').textContent = 'Please enter a valid income (0 or more).';
        isValid = false;
    } else if (income === 0) {
        document.getElementById('income').textContent = 'Income cannot be $0.';
        isValid = false;
    }

    // validate rent/mortgage
    if (isNaN(rent) || rent < 0) {
        document.getElementById('Rent-Mort').textContent = 'Please enter a valid rent/mortgage amount.';
        isValid = false;
    }

    // validate food
    if (isNaN(food) || food < 0) {
        document.getElementById('food').textContent = 'Please enter a valid food expense.';
        isValid = false;
    }

    // validate bills
    if (isNaN(bills) || bills < 0) {
        document.getElementById('bills').textContent = 'Please enter a valid bills amount.';
        isValid = false;
    }

    if (!isValid) return;

    //  Animated Summary Reveal +=+=+=+=+=+=+=+=+

    const totalExpenses = rent + food + bills;
    const funds = income - totalExpenses;

    document.getElementById('submission').textContent = 'Budget submitted! See summary below.';

    // reveal each summary line with a staggered setTimeout
    setTimeout(function() {
        sumIncome.textContent = '  $' + income.toFixed(2);
    }, 300);

    setTimeout(function() {
        sumExpense.textContent = '  $' + totalExpenses.toFixed(2);
    }, 700);

    setTimeout(function() {
        sumFunding.textContent = '  $' + funds.toFixed(2);
        sumFunding.style.color  = funds >= 0 ? '#2e7d4f' : 'red';
    }, 1100);
});

// Mouse Event: hover hint on the Funds line +=+=+=+=+=+=+=+=+

const fundingItem = sumFunding.closest('li');  // the <li> wrapping sum-funding

if (fundingItem) {
    const hintSpan = document.createElement('span');
    hintSpan.textContent = ' ← remaining after expenses';
    hintSpan.style.fontSize = '0.8rem';
    hintSpan.style.color = '#999';
    hintSpan.style.fontStyle = 'italic';
    hintSpan.style.display  = 'none';
    hintSpan.id = 'funds-hint';
    fundingItem.appendChild(hintSpan);

    fundingItem.addEventListener('mouseover', function() {
        document.getElementById('funds-hint').style.display = 'inline';
    });

    fundingItem.addEventListener('mouseout', function() {
        document.getElementById('funds-hint').style.display = 'none';
    });
}

// Key Event: warn on negative input while typing +=+=+=+=+=+=+=+=+
const numberInputs = budgetForm.querySelectorAll('input[type="number"]');

numberInputs.forEach(function(input) {
    input.addEventListener('keyup', function(event) {
        // KeyboardEvent usage: reading event.target.value on each keyup
        const val = parseFloat(event.target.value);
        if (!isNaN(val) && val < 0) {
            event.target.style.borderColor = 'red';
        } else {
            event.target.style.borderColor = '';
        }
    });
});