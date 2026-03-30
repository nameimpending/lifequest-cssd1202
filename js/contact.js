const contactForm = document.getElementById('contact-form');
//form grab

// input refs
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// char counter for message
const maxMsg = 500;
const msgCounter = document.createElement('small');
msgCounter.textContent = '0 / ' + maxMsg + ' characters';
msgCounter.style.color = '#666';
msgCounter.style.fontSize = '0.8rem';
messageInput.insertAdjacentElement('afterend', msgCounter);

// keyup hints
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s'-]{2,}$/;

nameInput.addEventListener('keyup', function(event) {//name valid specific
    const val = event.target.value.trim();
    const hint = document.getElementById('name-error');
    if (val === '') { hint.textContent = ''; return; }
    if (!nameRegex.test(val)) {
        hint.textContent = 'Name can only contain letters.';
        hint.style.color = 'red';
    } else {
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

emailInput.addEventListener('keyup', function(event) {//email valid specific
    const val = event.target.value.trim();
    const hint = document.getElementById('email-error');
    if (val === '') { hint.textContent = ''; return; }
    if (!emailRegex.test(val)) {
        hint.textContent = 'Please enter a valid email address.';
        hint.style.color = 'red';
    } else {
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

messageInput.addEventListener('keyup', function(event) {//message error cause yes
    const val = event.target.value.trim();
    const hint = document.getElementById('message-error');
    const len = event.target.value.length;
    msgCounter.textContent = len + ' / ' + maxMsg + ' characters';
    msgCounter.style.color = len >= maxMsg ? 'red' : len >= maxMsg * 0.8 ? '#e07b00' : '#666';
    if (val === '') { hint.textContent = ''; return; }
    if (val.length < 10) {
        hint.textContent = 'Message must be at least 10 characters.';
        hint.style.color = 'red';
    } else {
        hint.textContent = '✓';
        hint.style.color = '#2e7d4f';
    }
});

// mouse events on contact info list items
const contactInfoItems = document.querySelectorAll('#contact-info-list li');
contactInfoItems.forEach(function(item) {
    item.addEventListener('mouseover', function(event) {
        event.target.style.background = '#d4f3e1';
        event.target.style.cursor = 'default';
    });
    item.addEventListener('mouseout', function(event) {
        event.target.style.background = '';
    });
});

contactForm.addEventListener('submit', function(event){
    event.preventDefault();//to hopefully prevent page from reloading/navigating

    //clear prior error
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';
    document.getElementById('contact-success').textContent = '';

    //obtain val
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    //regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;

    //val
    let isValid = true;

    if(name === ''){
        document.getElementById('name-error').textContent = 'Name is required.';
        isValid = false;
    }else if(!nameRegex.test(name)){
        document.getElementById('name-error').textContent = 'Name can only contain letters.';
        isValid = false;
    }

    if(email === ''){
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    }else if(!emailRegex.test(email)){
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if(message === ''){
        document.getElementById('message-error').textContent = 'Message cannot be empty.';
        isValid = false;
    }else if(message.length<10){
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters.';
        isValid = false;
    }

    //once all else valid
    if(isValid){
        document.getElementById('contact-success').textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
        msgCounter.textContent = '0 / ' + maxMsg + ' characters';
        msgCounter.style.color = '#666';
    }
});