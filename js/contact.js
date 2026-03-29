const contactForm = document.getElementById('contact-form');
//form grab

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

    //le patterns
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
    }
});
