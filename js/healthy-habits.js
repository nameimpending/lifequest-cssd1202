const habitsForm = document.getElementById('habits-form');

const dateDisplay = document.createElement('p');
dateDisplay.id = 'live-date';
dateDisplay.style.fontSize = '0.85rem';
dateDisplay.style.color = '#666';
dateDisplay.style.marginBottom = '0.5rem';

const formHeading = habitsForm.querySelector('h3');
formHeading.insertAdjacentElement('afterend',dateDisplay);

function updateDate(){
    const now = new Date();
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    dateDisplay.textContent = 'Logging for: '+now.toLocaleDateString('en-CA',options);
}
updateDate();
setInterval(updateDate,1000);


const waterInput = document.getElementById('water');
const sleepInput = document.getElementById('sleep');
const exerciseInput = document.getElementById('exercise');

waterInput.addEventListener('keyup',function(event){
    const val = parseFloat(event.target.value);
    const hint = document.getElementById('water-error');
    if(event.target.value === ''){hint.textContent = "";return;}
    if(isNaN(val)||val<0||val>20){
        hint.textContent = 'Enter a value between 0 and 20.';
        hint.style.color = 'red';
    }else{
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

sleepInput.addEventListener('keyup',function(event){
        const val = parseFloat(event.target.value);
    const hint = document.getElementById('sleep-error');
    if(event.target.value === ''){hint.textContent = "";return;}
    if(isNaN(val)||val<0||val>24){
        hint.textContent = 'Enter a value between 0 and 24.';
        hint.style.color = 'red';
    }else{
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});
exerciseInput.addEventListener('keyup',function(event){
    const val = parseFloat(event.target.value);
    const hint = document.getElementById('exercise-error');
    if(event.target.value === ''){hint.textContent = "";return;}
    if(isNaN(val)||val<0||val>300){
        hint.textContent = 'Enter a value between 0 and 300.';
        hint.style.color = 'red';
    }else{
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

/*mouse event for highlighting streak item under mouse */
const streakList=document.querySelector('ol');
const streakItems = streakList ? streakList.querySelectorAll('li'):[];
streakItems.forEach(function(item){
    item.addEventListener('mouseover', function(event){//set highlight
        event.target.style.background = '#d4f3e1';
        event.target.style.cursor = 'default';
    });
    item.addEventListener('mouseout',function(event){
        event.target.style.background='';
    });//remove highlight
});

/*make thing actually work*/

const GOALS = {water:6,sleep:8,exercise:45}

// streaks from storage
const streaks={
    water:parseInt(localStorage.getItem('streak-water'))|| 0,
    sleep:parseInt(localStorage.getItem('streak-sleep'))|| 0,
    exercise:parseInt(localStorage.getItem('streak-exercise'))||0
};
function renderStreaks(){
    document.getElementById('swc').textContent=streaks.water;
    document.getElementById('ssc').textContent=streaks.sleep;
    document.getElementById('scc').textContent=streaks.exercise;
}renderStreaks();


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
        //new

        streaks.water=water>=GOALS.water?streaks.water+1:0;
        streaks.sleep=sleep>=GOALS.sleep?streaks.sleep+1:0;
        streaks.exercise=exercise>=GOALS.exercise?streaks.exercise+1:0;

        localStorage.setItem('streak-water',streaks.water);
        localStorage.setItem('streak-sleep',streaks.sleep);
        localStorage.setItem('streak-exercise',streaks.exercise);

        renderStreaks();

        //already
        document.getElementById('habits-success').textContent = 'Habits logged successfully!';
        habitsForm.reset();
    }
});





