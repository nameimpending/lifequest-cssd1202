//-DOM MANIPULATION - Select elements
const form = document.querySelector("form");
const achievementInput = document.getElementById("NAch");
const achievementsList = document.querySelector("section:first-of-type ul");
const submitBtn = document.querySelector(".btn-submit");

//Create and append an error message element
const errorMsg = document.createElement("p");
errorMsg.id = "error-msg";
errorMsg.style.color = "red";
errorMsg.style.fontSize = "0.85rem";
errorMsg.style.marginTop = "0.25rem";
form.insertBefore(errorMsg, submitBtn);

//Create and append a success message element
const successMsg = document.createElement("p");
successMsg.id = "success-msg";
successMsg.style.color = "#2e7d4f";
successMsg.style.fontWeight = "600";
successMsg.style.marginTop = "0.5rem";
form.appendChild(successMsg);

//Create and append a live character counter
const charCounter = document.createElement("small");
charCounter.textContent = "0 / 60 characters";
charCounter.style.color = "#666";
charCounter.style.fontSize = "0.8rem";
achievementInput.insertAdjacentElement("afterend", charCounter);

//-FORM VALIDATION
//Regex: letters, numbers, spaces, basic punctuation, 3-60 chars
const validFormat = /^[a-zA-Z0-9 .,!?'-]{3,60}$/;

function validateInput() {
    const value = achievementInput.value.trim();

    if (value === "" || value === "New Achievement") {
        showError("Please enter an achievement before submitting.");
        return false;
    }
    if (value.length < 3) {
        showError("Achievement must be at least 3 characters.");
        return false;
    }
    if (!validFormat.test(value)) {
        showError("Only letters, numbers, and basic punctuation allowed.");
        return false;
    }

    clearError();
    return true;
}

function showError(message) {
    errorMsg.textContent = message;
    achievementInput.style.borderColor = "red";
}

function clearError() {
    errorMsg.textContent = "";
    achievementInput.style.borderColor = "";
}

//-EVENT HANDLING
//Submit event - prevent default, validate, add new list item
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!validateInput()) return;

    //Create and append new achievement list item
    const newItem = document.createElement("li");
    newItem.textContent = achievementInput.value.trim();
    newItem.style.animation = "fadeIn 0.4s ease";
    achievementsList.appendChild(newItem);

    //Show success message then hide after 3 seconds
    successMsg.textContent = "Achievement added!";
    setTimeout(function() {
        successMsg.textContent = "";
    }, 3000);

    //Reset form
    achievementInput.value = "";
    charCounter.textContent = "0 / 60 characters";
    clearError();
});

//Keyup event - live character counter + clear error while typing
achievementInput.addEventListener("keyup", function(e) {
    const length = achievementInput.value.length;
    charCounter.textContent = length + " / 60 characters";
    charCounter.style.color = length > 50 ? "red" : "#666";

    //Keyboard event object: detect Enter key
    if (e.key === "Enter") {
        form.dispatchEvent(new Event("submit"));
    }

    if (length > 0) clearError();
});

//Focus event - clear default placeholder value
achievementInput.addEventListener("focus", function() {
    if (achievementInput.value === "New Achievement") {
        achievementInput.value = "";
    }
    achievementInput.style.borderColor = "#2e7d4f";
});

//Click event on list items - toggle strikethrough to mark as done
achievementsList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const done = e.target.style.textDecoration === "line-through";
        e.target.style.textDecoration = done ? "none" : "line-through";
        e.target.style.opacity = done ? "1" : "0.5";
    }
});

//-INTERACTIVE FUNCTIONALITY
//Welcome banner that fades in on load then disappears after 4 seconds
const welcomeBanner = document.createElement("p");
welcomeBanner.textContent = "Welcome back! Keep earning those achievements!";
welcomeBanner.style.cssText = `
    background: #d4f3e1;
    color: #2e7d4f;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    font-weight: 600;
    margin-bottom: 1rem;
    opacity: 0;
    transition: opacity 0.5s ease;
`;

const mainEl = document.querySelector("main");
mainEl.insertBefore(welcomeBanner, mainEl.firstChild);

//Fade in after 500ms
setTimeout(function() {
    welcomeBanner.style.opacity = "1";
}, 500);

//Fade out after 4 seconds, then remove
setTimeout(function() {
    welcomeBanner.style.opacity = "0";
    setTimeout(function() { welcomeBanner.remove(); }, 500);
}, 4000);

//Inject CSS animation for new list items
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-10px); }
        to   { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);