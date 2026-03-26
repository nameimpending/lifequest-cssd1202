const pForm=document.getElementById('productivity-form');

function createErrorSpan(id){
    const span = document.createElement('span');
    span.id=id;
    span.className='error-msg';
    span.style.color='red';
    span.style.fontSize='0.82rem';
    span.style.display = 'block';
    span.style.marginTop = '0.2rem';
    return span;
}
const tInput =document.getElementById('task');
const dInput =document.getElementById('duration');
const nInput =document.getElementById("notes");

//put error spans following inputs
tInput.insertAdjacentElement('afterend', createErrorSpan('task-error'));
dInput.insertAdjacentElement('afterend', createErrorSpan('duration-error'));
nInput.insertAdjacentElement('afterend', createErrorSpan('notes-error'));

//success msg for submit
const sButton = pForm.querySelector('button[type="submit"]');
const sSpan = document.createElement('span');
sSpan.id='productivity-success';
sSpan.className = 'success-msg';
sSpan.style.color = '#2e7d4f';
sSpan.style.fontSize='0.95rem';
sSpan.style.marginTop='0.75rem';
sSpan.style.display='block';
sButton.insertAdjacentElement('afterend',sSpan);

//valid hints

tInput.addEventListener('keyup',function(event){
    const val  = event.target.value.trim();
    const hint = document.getElementById('task-error');
    if (val === '') { hint.textContent = ''; return; }
    if (val.length < 2) {
        hint.textContent = 'Task name must be at least 2 characters.';
        hint.style.color = 'red';
    } else {
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});
 
dInput.addEventListener('keyup', function(event) {
    const val  = parseFloat(event.target.value);
    const hint = document.getElementById('duration-error');
    if (event.target.value === '') { hint.textContent = ''; return; }
    if (isNaN(val) || val <= 0) {
        hint.textContent = 'Enter a duration greater than 0.';
        hint.style.color = 'red';
    } else if (val > 1440) {
        hint.textContent = 'Duration cannot exceed 1440 minutes (24 hrs).';
        hint.style.color = 'red';
    } else {
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

//char counter for notes textarea

const maxNotes = 300;
const cCounter=document.createElement('p');
cCounter.style.fontSize='0.8rem';
cCounter.style.color = '#999';
cCounter.style.marginTop='0.2rem';
cCounter.textContent = '0 / '+maxNotes+' characters';
nInput.insertAdjacentElement('afterend',cCounter);

nInput.addEventListener('keydown',function(event){
    setTimeout(function(){
        const len = nInput.value.length;
        cCounter.textContent = len + ' / '+maxNotes + ' characters';
        if(len>=maxNotes)cCounter.style.color='red';
        else if(len>=maxNotes*0.8) cCounter.style.color = '#e07b00';
        else cCounter.style.color = '#999';
    },0);
});

//mouseover 

const tListItems = document.querySelectorAll('#tools-list li');

tListItems.forEach(function(item){
    item.addEventListener('mouseover',function(event){
        event.target.style.background = '#d4f3e1';
        event.target.style.paddingLeft = '1.1rem';
        event.target.style.transition = 'all 0.15s ease';
        event.target.style.cursor = 'default';
    });
    item.addEventListener('mouseout',function(event){
        event.target.style.background ='';
        event.target.style.paddingLeft = '';
    });
});

//form validation
pForm.addEventListener('submit',function(event){
    event.preventDefault();

    document.getElementById('task-error').textContent='';
    document.getElementById('duration-error').textContent='';
    document.getElementById('notes-error').textContent='';
    document.getElementById('productivity-success').textContent='';

    ['task-error','duration-error','notes-error'].forEach(function(id){
        document.getElementById(id).style.color = 'red';
    });

    const tVal = tInput.value.trim();
    const dVal = parseFloat(dInput.value);
    const nVal = nInput.value.trim();

    const tRegex = /^[\w\s\-.,!?]{2,}$/;

    let isValid = true;

    if(tVal === ''){
        document.getElementById('task-error').textContent='Task name is required.';
        isValid=false;
    }else if(!tRegex.test(tVal)){
        document.getElementById('task-error').textContent='Task name contains invalid characters.';
        isValid = false;
    }

    if(isNaN(dVal)||dVal<=0){
        document.getElementById('duration-error').textContent='Please enter a duration greater than 0.';
        isValid=false;
    }else if(dVal>1440){
        document.getElementById('duration-error').textContent='Duration cannot exceed 1440 minutes.';
        isValid = false;
    }

    if(nVal.length>maxNotes){
        document.getElementById('notes-error').textContent='Notes must be '+maxNotes+' characters or fewer.';
        isValid=false;
    }
    if(!isValid)return;

    ///toooo muuuuuch sheeeeeeet f*******************
// staggered confirmation message

    sButton.disabled = true;
    sButton.textContent = 'Logging ...';
    sButton.style.background = '#999';

    setTimeout(function(){
        sButton.textContent = 'Logged ✓';
        sButton.style.background = '#2e7d4f';
    },600);

    setTimeout(function(){
        sSpan.textContent = 'Task "'+tVal+'" logged for '+dVal + ' min!';
        pForm.reset();
        cCounter.textContent = '0 / '+maxNotes+' characters';
        cCounter.style.color = '#999';

        setTimeout(function(){
            sButton.disabled = false;
            sButton.textContent = 'Log Productivity';
            sButton.style.background = '';
        },1500);
    },1000);
});