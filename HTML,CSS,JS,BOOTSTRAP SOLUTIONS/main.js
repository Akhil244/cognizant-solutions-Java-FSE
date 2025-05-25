/* main.js - JavaScript for Community Portal */

// 1. JavaScript Basics & Setup [cite: 49, 50]
console.log("Welcome to the Community Portal"); // Log to console

window.onload = function() {
    // alert("Page fully loaded!"); // Notify on load
    console.log("Page fully loaded and scripts are running.");

    // Retrieve and set preferences on load (Exercise 8) [cite: 12]
    const savedEvent = localStorage.getItem('preferredEvent');
    if (savedEvent && eventTypeSelect) {
        eventTypeSelect.value = savedEvent;
        displayFee(); // Update fee display
    }
};

// 2. Syntax, Data Types, and Operators [cite: 51]
const eventName = "Community Summer Fest";
const eventDate = new Date("2025-07-15");
let availableSeats = 100;

console.log(`Event: ${eventName} on ${eventDate.toDateString()}. Seats: ${availableSeats}`);

// 6. Arrays and Methods [cite: 57]
let events = [
    { id: 1, name: "Music Fest", category: "music", date: "2025-07-15", seats: 50, price: 50 },
    { id: 2, name: "Food Fair", category: "food", date: "2025-08-01", seats: 100, price: 25 },
    { id: 3, name: "Art Workshop", category: "art", date: "2025-08-20", seats: 0, price: 75 }, // Full event
    { id: 4, name: "Tech Talk", category: "workshop", date: "2025-06-30", seats: 30, price: 10 } // Past event (Adjust date if needed)
];

// 5. Objects and Prototypes [cite: 55, 56]
class Event {
    constructor(id, name, category, date, seats, price) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.date = new Date(date);
        this.seats = seats;
        this.price = price;
    }

    checkAvailability() {
        return this.seats > 0 && this.date > new Date();
    }

    displayInfo() {
        return `${this.name} (${this.category}) - ${this.date.toLocaleDateString()}`;
    }
}

// Convert raw data to Event objects
let eventObjects = events.map(e => new Event(e.id, e.name, e.category, e.date, e.seats, e.price));
console.log("Event Object Keys/Values:", Object.entries(eventObjects[0]));


// 7. DOM Manipulation [cite: 58]
const eventListElement = document.getElementById('events'); // Assuming an element exists to display events
const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const eventTypeSelect = document.getElementById('event_type');
const messageTextarea = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const confirmationOutput = document.querySelector('output[name="confirmation"]');
const eventFeeSpan = document.getElementById('eventFee');
const charCountSpan = document.getElementById('charCount');
const promoVideo = document.getElementById('promoVideo');
const videoStatus = document.getElementById('videoStatus');
const findNearbyBtn = document.getElementById('findNearbyBtn');
const locationInfo = document.getElementById('locationInfo');
const clearPrefsBtn = document.getElementById('clearPrefsBtn');

// 4. Functions, Scope, Closures, Higher-Order Functions [cite: 54]
function createRegistrationTracker() {
    let totalRegistrations = 0;
    return function() {
        totalRegistrations++;
        console.log(`Total registrations: ${totalRegistrations}`);
        return totalRegistrations;
    };
}
const trackRegistrations = createRegistrationTracker();

function filterEvents(events, filterCallback) {
    return events.filter(filterCallback);
}

// 3. Conditionals, Loops, and Error Handling [cite: 52, 53]
function displayEvents(eventArray) {
    // Clear existing event list (if needed)
    // eventListElement.innerHTML = '<h2>Upcoming Events</h2>'; // Be careful not to wipe out existing content

    // Use map to format display cards [cite: 57]
    const eventCards = eventArray.map(event => {
        // Use if-else to hide past or full events [cite: 53]
        if (event.checkAvailability()) {
            const card = document.createElement('div');
            card.className = 'eventCard'; // Style with CSS
            // Use destructuring [cite: 61]
            const { name, category, date, seats } = event;
            card.innerHTML = `
                <h3>${name}</h3>
                <p>Category: ${category}</p>
                <p>Date: ${date.toLocaleDateString()}</p>
                <p>Seats Left: ${seats}</p>
                <button class="register-btn" data-event-id="${event.id}">Register Now</button>
            `;
            return card;
        }
        return null; // Return null for invalid events
    }).filter(card => card !== null); // Filter out nulls

    // Use forEach to display [cite: 53]
    eventCards.forEach(card => {
       // eventListElement.appendChild(card); // Append to the DOM (Careful with placement)
       console.log("Displaying event:", card.innerText.split('\n')[0]);
    });
}

displayEvents(eventObjects); // Initial display

// 8. Event Handling [cite: 59] & 11. Working with Forms [cite: 63]
if (registrationForm) {
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form behavior [cite: 63]

        // 13. Debugging - Check form elements [cite: 63, 66]
        console.log("Form submitted. Elements:", this.elements);
        
        // 10. Modern JS - Use let/const [cite: 61]
        const name = nameInput.value;
        const email = emailInput.value;
        const eventType = eventTypeSelect.value;

        // Simple Validation [cite: 63]
        if (!name || !email || !eventType) {
            confirmationOutput.textContent = "Please fill all required fields.";
            confirmationOutput.style.color = "red";
            return;
        }

        // 3. Error Handling [cite: 53]
        try {
            availableSeats--; // Decrement seats (simple example) [cite: 51]
            trackRegistrations(); // Use closure
            
            const formData = {
                name: name,
                email: email,
                event: eventType,
                message: messageTextarea.value
            };

            // 12. AJAX & Fetch API [cite: 64]
            sendRegistration(formData);

        } catch (error) {
            console.error("Registration Error:", error);
            confirmationOutput.textContent = "Registration failed. Please try again.";
            confirmationOutput.style.color = "red";
        }
    });
}

// 6. Event Feedback with Events Handling [cite: 9]
if (phoneInput) {
    phoneInput.onblur = function() { // onblur
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (this.value && !phonePattern.test(this.value)) {
            alert("Please enter phone as 123-456-7890.");
            this.focus();
        }
    };
}

function displayFee() {
    const selectedOption = eventTypeSelect.options[eventTypeSelect.selectedIndex];
    const match = selectedOption.text.match(/\(\$(\d+)\)/);
    eventFeeSpan.textContent = match ? `Fee: $${match[1]}` : "";
}

if (eventTypeSelect) {
    eventTypeSelect.onchange = function() { // onchange
        displayFee();
        // 8. Saving User Preferences [cite: 12]
        localStorage.setItem('preferredEvent', this.value);
        console.log("Preference saved to localStorage:", this.value);
    };
}

if (submitBtn) {
    submitBtn.onclick = function() { // onclick
        console.log("Submit button clicked.");
        // Confirmation logic is now inside the form submit handler
    };
}

// Example for ondblclick (add an image with id 'eventPoster')
// document.getElementById('eventPoster')?.addEventListener('dblclick', function() {
//     this.style.transform = this.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
// });

if (messageTextarea) {
    messageTextarea.onkeydown = function() { // keydown
        charCountSpan.textContent = `${this.value.length + 1} characters`;
    };
}

// 7. Video Invite with Media Events [cite: 10, 11]
if (promoVideo) {
    promoVideo.oncanplay = function() { // oncanplay
        videoStatus.textContent = "Video ready to play";
    };
}

// Warn before leaving if form is dirty (simple check)
let formHasChanges = false;
registrationForm?.addEventListener('input', () => { formHasChanges = true; });

window.onbeforeunload = function(event) { // onbeforeunload
    if (formHasChanges) {
        const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = confirmationMessage; // Standard for most browsers
        return confirmationMessage; // For some older browsers
    }
};

// 8. Clear Preferences Button [cite: 12]
if (clearPrefsBtn) {
    clearPrefsBtn.onclick = function() {
        localStorage.clear();
        sessionStorage.clear();
        alert("Preferences Cleared!");
        eventTypeSelect.value = ""; // Reset dropdown
        displayFee();
    };
}

// 9. Geolocation [cite: 13]
if (findNearbyBtn) {
    findNearbyBtn.onclick = function() {
        if ("geolocation" in navigator) {
            locationInfo.textContent = "Getting location...";
            const options = {
                enableHighAccuracy: true, // Use high accuracy
                timeout: 5000, // Timeout after 5s
                maximumAge: 0 // Don't use cached position
            };
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    locationInfo.textContent = `Your coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                    // Here you would typically send this to a server to find events
                },
                (error) => { // Handle errors
                    let message;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = "User denied the request for Geolocation.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            message = "The request to get user location timed out.";
                            break;
                        default:
                            message = "An unknown error occurred.";
                            break;
                    }
                    locationInfo.textContent = `Error: ${message}`;
                },
                options
            );
        } else {
            locationInfo.textContent = "Geolocation is not supported by this browser.";
        }
    };
}


// 9. Async JS, Promises, Async/Await [cite: 60]
const mockApiUrl = 'https://jsonplaceholder.typicode.com/posts/1'; // Using a public mock API

// Using .then()
function fetchWithThen() {
    console.log("Fetching with .then()...");
    fetch(mockApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log("Fetched (then):", data))
        .catch(error => console.error("Fetch Error (then):", error));
}
// fetchWithThen();

// Using async/await
async function fetchWithAsyncAwait() {
    console.log("Fetching with async/await...");
    try {
        const response = await fetch(mockApiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched (await):", data);
    } catch (error) {
        console.error("Fetch Error (await):", error);
    }
}
// fetchWithAsyncAwait();

// 12. AJAX & Fetch API (POST) [cite: 64]
async function sendRegistration(formData) {
    console.log("Sending registration data:", formData);
    confirmationOutput.textContent = "Sending registration...";
    confirmationOutput.style.color = "orange";

    try {
        // Use setTimeout to simulate delay [cite: 64]
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // Mock POST API
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server Response:", result);
        confirmationOutput.textContent = `Registration successful! ID: ${result.id}.`;
        confirmationOutput.style.color = "green";
        registrationForm.reset(); // Reset form on success
        formHasChanges = false; // Reset changes flag
        
    } catch (error) {
        console.error('Fetch POST Error:', error);
        confirmationOutput.textContent = "Registration failed. Please try again.";
        confirmationOutput.style.color = "red";
    }
}

// 14. jQuery and JS Frameworks [cite: 67]
// If you were using jQuery (you'd need to include it first):
/*
$(document).ready(function() {
    console.log("jQuery is ready!");

    // Use $('#registerBtn').click(...) to handle click events
    $('#submitBtn').click(function(e) {
        // e.preventDefault(); // If it's a submit button
        console.log("jQuery detected submit click!");
    });

    // Use .fadeIn() and .fadeOut() for event cards
    $('.eventCard').hide().fadeIn(1000);

    // Mention one benefit of moving to frameworks like React or Vue
    console.log("Benefit of React/Vue: Component-based architecture and efficient state management.");
});
*/