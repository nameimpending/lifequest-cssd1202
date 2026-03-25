const habitsForm = document.getElementById('habits-form');

habitsForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // clear prior errors
    document.getElementById('water-error').textContent = '';
    document.getElementById('sleep-error').textContent = '';
    document.getElementById('exercise-error').textContent = '';
    document.getElementById('habits-success').textContent = '';

    // obtain values as numbers
    const water = parseInt(document.getElementById('water').value);
    const sleep = parseFloat(document.getElementById('sleep').value);
    const exercise = parseInt(document.getElementById('exercise').value);

    // validate
    let isValid = true;

    if (isNaN(water) || water < 0 || water > 20) {
        document.getElementById('water-error').textContent = 'Please enter a value between 0 and 20.';
        isValid = false;
    }

    if (isNaN(sleep) || sleep < 0 || sleep > 24) {
        document.getElementById('sleep-error').textContent = 'Please enter a value between 0 and 24.';
        isValid = false;
    }

    if (isNaN(exercise) || exercise < 0 || exercise > 300) {
        document.getElementById('exercise-error').textContent = 'Please enter a value between 0 and 300.';
        isValid = false;
    }

    // case all valid
    if (isValid) {
        document.getElementById('habits-success').textContent = 'Habits logged successfully!';
        habitsForm.reset();
    }
});