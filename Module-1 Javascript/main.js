/* ============================================= */
/* LOCAL COMMUNITY EVENT PORTAL - COMPLETE JS    */
/* All 14 JavaScript Exercises Implemented       */
/* ============================================= */

// ==============================================
// TASK 1: JavaScript Basics & Setup
// ==============================================

// Task 1: Log welcome message
console.log("Welcome to the Community Portal");

// Task 1: Alert when page loads
window.addEventListener('DOMContentLoaded', function() {
    alert("Community Portal Loaded Successfully!");
    console.log("DOM fully loaded and parsed");
    
    // Initialize the portal
    initializePortal();
});

// ==============================================
// TASK 2: Syntax, Data Types, and Operators
// ==============================================

// Task 2: Use const for event name and date
const COMMUNITY_EVENT_NAME = "Summer Music Festival 2026";
const EVENT_DATE = "2026-06-15";

// Task 2: Use let for seats (can be modified)
let availableSeats = 50;

// Task 2: Template literals for concatenation
const eventInfo = `Event: ${COMMUNITY_EVENT_NAME} | Date: ${EVENT_DATE} | Seats: ${availableSeats}`;
console.log(eventInfo);

// Task 2: Use ++ and -- to manage seat count
function updateSeatCount(action) {
    if (action === 'register' && availableSeats > 0) {
        availableSeats--;
        console.log(`Registration successful! Seats remaining: ${availableSeats}`);
        return true;
    } else if (action === 'cancel') {
        availableSeats++;
        console.log(`Registration cancelled! Seats remaining: ${availableSeats}`);
        return true;
    }
    console.log(`Cannot register. Only ${availableSeats} seats available.`);
    return false;
}

// ==============================================
// TASK 3: Conditionals, Loops, and Error Handling
// ==============================================

// Task 3: Sample events data array
const communityEvents = [
    { id: 1, name: "Music Festival", date: "2026-06-15", seats: 50, passed: false, category: "Music" },
    { id: 2, name: "Sports Tournament", date: "2026-07-20", seats: 0, passed: false, category: "Sports" },
    { id: 3, name: "Art Exhibition", date: "2025-05-10", seats: 30, passed: true, category: "Art" },
    { id: 4, name: "Dance Workshop", date: "2026-08-01", seats: 25, passed: false, category: "Music" },
    { id: 5, name: "Food Carnival", date: "2026-09-10", seats: 100, passed: false, category: "Food" },
    { id: 6, name: "Tech Conference", date: "2026-10-05", seats: 15, passed: false, category: "Technology" }
];

// Task 3: Use if-else to hide past or full events
function displayValidEvents() {
    const validEvents = [];
    
    // Task 3: Loop using forEach
    communityEvents.forEach(event => {
        // Task 3: If-else conditions
        if (!event.passed && event.seats > 0) {
            validEvents.push(event);
            console.log(`Valid event: ${event.name} - ${event.seats} seats available`);
        } else if (event.passed) {
            console.log(`Past event hidden: ${event.name}`);
        } else if (event.seats <= 0) {
            console.log(`Sold out event hidden: ${event.name}`);
        }
    });
    
    console.log(`Total valid events: ${validEvents.length}`);
    return validEvents;
}

// Task 3: Try-catch for error handling
function registerUserWithValidation(userName, eventId, email = null) {
    try {
        // Validate user name
        if (!userName || userName.trim() === "") {
            throw new Error("User name cannot be empty");
        }
        
        if (userName.length < 2) {
            throw new Error("User name must be at least 2 characters");
        }
        
        // Find event in masterEventList (not communityEvents)
        const event = masterEventList.find(e => e.id === eventId);
        if (!event) {
            throw new Error(`Event with ID ${eventId} not found`);
        }
        
        // Check if event is past
        if (event.passed) {
            throw new Error(`Event "${event.name}" has already passed`);
        }
        
        // Check seat availability
        if (event.seats <= 0) {
            throw new Error(`Event "${event.name}" is fully booked`);
        }
        
        // Successful registration
        event.seats--;
        const message = `${userName} successfully registered for ${event.name}! ${event.seats} seats remaining.`;
        console.log(message);
        
        // Update UI if function exists
        if (typeof renderEventCards === 'function') {
            renderEventCards();
        }
        
        return { success: true, message: message, event: event };
        
    } catch (error) {
        console.error("Registration Error:", error.message);
        return { success: false, message: error.message };
    }
}

// ==============================================
// TASK 4: Functions, Scope, Closures, Higher-Order Functions
// ==============================================

// Task 4: Create reusable functions
function addEvent(name, date, seats, category) {
    const newEvent = {
        id: communityEvents.length + 1,
        name: name,
        date: date,
        seats: seats,
        passed: false,
        category: category
    };
    communityEvents.push(newEvent);
    console.log(`New event added: ${name}`);
    return newEvent;
}

function registerUser(userName, eventId) {
    const event = communityEvents.find(e => e.id === eventId);
    if (event && event.seats > 0 && !event.passed) {
        event.seats--;
        console.log(`${userName} registered for ${event.name}`);
        return true;
    }
    console.log(`Registration failed for ${userName}`);
    return false;
}

function filterEventsByCategory(category, callback) {
    const filtered = communityEvents.filter(e => 
        e.category.toLowerCase().includes(category.toLowerCase())
    );
    if (callback && typeof callback === 'function') {
        callback(filtered);
    }
    return filtered;
}

// Task 4: Closure to track total registrations per category
function createRegistrationTracker() {
    const registrations = {};
    const registrationHistory = [];
    
    return {
        addRegistration: function(category, eventName, userName) {
            registrations[category] = (registrations[category] || 0) + 1;
            registrationHistory.push({
                category: category,
                eventName: eventName,
                userName: userName,
                timestamp: new Date().toLocaleString()
            });
            console.log(`Registration tracked for ${category}: Total ${registrations[category]}`);
        },
        getCount: function(category) {
            return registrations[category] || 0;
        },
        getAll: function() {
            return { ...registrations };
        },
        getHistory: function() {
            return [...registrationHistory];
        },
        getTotalRegistrations: function() {
            return Object.values(registrations).reduce((sum, count) => sum + count, 0);
        }
    };
}

const registrationTracker = createRegistrationTracker();

// Task 4: Higher-order function for filtering
function createEventFilter(criteria) {
    return function(events) {
        return events.filter(criteria);
    };
}

// Example filter criteria
const filterUpcomingEvents = createEventFilter(event => !event.passed);
const filterAvailableEvents = createEventFilter(event => event.seats > 0);
const filterMusicEvents = createEventFilter(event => event.category === "Music");

// ==============================================
// TASK 5: Objects and Prototypes
// ==============================================

// Task 5: Event constructor function
function Event(id, name, date, seats, category, location = "Community Center") {
    this.id = id;
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.category = category;
    this.location = location;
    this.passed = new Date(date) < new Date();
}

// Task 5: Add method to prototype
Event.prototype.checkAvailability = function() {
    if (this.passed) return "⏰ Event has passed";
    return this.seats > 0 ? `✅ ${this.seats} seats available` : "❌ Event Full";
};

Event.prototype.getFormattedDate = function() {
    const date = new Date(this.date);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};

Event.prototype.register = function(userName) {
    if (!this.passed && this.seats > 0) {
        this.seats--;
        return `${userName} registered for ${this.name}`;
    }
    return `Cannot register for ${this.name}`;
};

// Task 5: Create events using constructor
const constructedEvents = [
    new Event(1, "Summer Concert", "2026-07-15", 100, "Music", "Central Park"),
    new Event(2, "Basketball Tournament", "2026-08-20", 50, "Sports", "Sports Complex"),
    new Event(3, "Art Workshop", "2026-09-05", 30, "Art", "Art Gallery")
];

// Task 5: Object.entries() to list keys and values
function getEventDetails(event) {
    console.log("Event Details:");
    Object.entries(event).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
    });
}

function displayEventProperties(event) {
    const entries = Object.entries(event);
    const output = entries.map(([key, value]) => `${key}: ${value}`).join('\n');
    console.log(output);
    return output;
}

// ==============================================
// TASK 6: Arrays and Methods
// ==============================================

// Task 6: Main event array
let masterEventList = [
    new Event(1, "Music Festival", "2026-06-15", 50, "Music"),
    new Event(2, "Dance Workshop", "2026-07-10", 30, "Music"),
    new Event(3, "Sports Tournament", "2026-08-05", 100, "Sports"),
    new Event(4, "Art Exhibition", "2026-09-01", 45, "Art"),
    new Event(5, "Food Festival", "2026-10-10", 200, "Food"),
    new Event(6, "Tech Summit", "2026-11-15", 75, "Technology")
];

// Task 6: Add new events using .push()
function addNewEvent(name, date, seats, category) {
    const newEvent = new Event(masterEventList.length + 1, name, date, seats, category);
    masterEventList.push(newEvent);
    console.log(`Event added: ${name}`);
    return newEvent;
}

// Task 6: Use .filter() to show only music events
function getMusicEvents() {
    const musicEvents = masterEventList.filter(event => event.category === "Music");
    console.log(`Music Events (${musicEvents.length}):`, musicEvents);
    return musicEvents;
}

function filterEventsByType(category) {
    return masterEventList.filter(event => event.category === category);
}

// Task 6: Use .map() to format display cards
function formatEventCards() {
    const cards = masterEventList.map(event => ({
        id: event.id,
        title: `${event.category} - ${event.name}`,
        displayText: `${event.name} on ${event.getFormattedDate()}`,
        availability: event.checkAvailability(),
        htmlCard: `
            <div class="event-card">
                <h3>${event.category}: ${event.name}</h3>
                <p>Date: ${event.getFormattedDate()}</p>
                <p>Location: ${event.location}</p>
                <p>Seats: ${event.checkAvailability()}</p>
                <button onclick="handleEventRegistration(${event.id})">Register Now</button>
            </div>
        `
    }));
    console.log("Formatted Event Cards:", cards);
    return cards;
}

// Task 6: Array reduction - get total seats
function getTotalAvailableSeats() {
    return masterEventList.reduce((total, event) => total + event.seats, 0);
}

// ==============================================
// TASK 7: DOM Manipulation
// ==============================================

// Task 7: Global variables for DOM elements
let eventsContainer = null;
let categoryFilter = null;
let searchInput = null;

// Task 7: Access DOM elements using querySelector
function initializeDOM() {
    eventsContainer = document.querySelector("#events-container");
    categoryFilter = document.querySelector("#categoryFilter");
    searchInput = document.querySelector("#eventSearch");
    
    console.log("DOM Elements initialized:", {
        eventsContainer: !!eventsContainer,
        categoryFilter: !!categoryFilter,
        searchInput: !!searchInput
    });
}

// Task 7: Create and append event cards dynamically
function renderEventCards(eventsToRender = null) {
    const events = eventsToRender || masterEventList;
    
    if (!eventsContainer) {
        console.error("Events container not found!");
        return;
    }
    
    // Clear container
    eventsContainer.innerHTML = "";
    
    if (events.length === 0) {
        eventsContainer.innerHTML = '<p style="text-align: center;">No events found matching your criteria.</p>';
        return;
    }
    
    // Task 7: Create and append cards using createElement
    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.setAttribute("data-event-id", event.id);
        card.setAttribute("data-category", event.category);
        
        // Check if event is available
        const isAvailable = !event.passed && event.seats > 0;
        
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Date:</strong> ${event.getFormattedDate()}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Seats:</strong> ${event.seats}</p>
            <p><strong>Status:</strong> ${event.checkAvailability()}</p>
            ${isAvailable ? 
                `<button class="register-btn" onclick="handleCardRegistration(${event.id})">Register</button>` :
                `<button class="register-btn" disabled style="opacity:0.5; cursor:not-allowed;">Unavailable</button>`
            }
        `;
        
        eventsContainer.appendChild(card);
    });
    
    console.log(`Rendered ${events.length} event cards`);
}

// Task 7: Update UI when user registers
function handleCardRegistration(eventId) {
    const event = masterEventList.find(e => e.id === eventId);
    
    if (event && !event.passed && event.seats > 0) {
        // Prompt for user name
        const userName = prompt("Enter your name for registration:", "Community Member");
        
        if (userName && userName.trim()) {
            const result = registerUserWithValidation(userName, eventId);
            
            if (result.success) {
                // Track registration with closure
                registrationTracker.addRegistration(event.category, event.name, userName);
                
                // Show success message
                showTemporaryMessage(result.message, "success");
                
                // Re-render cards
                renderEventCards();
                
                // Update filter if needed
                updateFilterDisplay();
            } else {
                showTemporaryMessage(result.message, "error");
            }
        } else {
            showTemporaryMessage("Please enter a valid name to register.", "error");
        }
    } else {
        showTemporaryMessage(`Sorry, "${event?.name}" is no longer available for registration.`, "error");
    }
}

// Helper function for temporary messages
function showTemporaryMessage(message, type) {
    const messageDiv = document.querySelector("#feedbackMessage");
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.style.display = "block";
        messageDiv.style.padding = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.marginTop = "15px";
        
        if (type === "success") {
            messageDiv.style.background = "#d4edda";
            messageDiv.style.color = "#155724";
            messageDiv.style.border = "1px solid #c3e6cb";
        } else if (type === "error") {
            messageDiv.style.background = "#f8d7da";
            messageDiv.style.color = "#721c24";
            messageDiv.style.border = "1px solid #f5c6cb";
        }
        
        setTimeout(() => {
            messageDiv.style.display = "none";
        }, 3000);
    }
    console.log(`${type.toUpperCase()}: ${message}`);
}

// ==============================================
// TASK 8: Event Handling
// ==============================================

// Task 8: Setup all event handlers
function setupEventHandlers() {
    // Task 8: Category filter onChange
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function(e) {
            const selectedCategory = e.target.value;
            console.log(`Filtering by category: ${selectedCategory || "All"}`);
            
            if (selectedCategory) {
                const filteredEvents = masterEventList.filter(event => 
                    event.category === selectedCategory
                );
                renderEventCards(filteredEvents);
            } else {
                renderEventCards();
            }
        });
    }
    
    // Task 8: Search input with keydown for quick search
    if (searchInput) {
        searchInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                const searchTerm = e.target.value.toLowerCase();
                console.log(`Searching for: ${searchTerm}`);
                
                const searchResults = masterEventList.filter(event => 
                    event.name.toLowerCase().includes(searchTerm) ||
                    event.category.toLowerCase().includes(searchTerm)
                );
                
                renderEventCards(searchResults);
                
                if (searchResults.length === 0) {
                    showTemporaryMessage(`No events found matching "${searchTerm}"`, "error");
                }
            }
        });
    }
    
    // Add clear filter button
    addClearFilterButton();
}

// Task 8: Clear filters functionality
function addClearFilterButton() {
    const filterSection = document.querySelector("#filter-section");
    if (filterSection && !document.querySelector("#clearFiltersBtn")) {
        const clearBtn = document.createElement("button");
        clearBtn.id = "clearFiltersBtn";
        clearBtn.textContent = "Clear Filters";
        clearBtn.style.marginLeft = "10px";
        clearBtn.onclick = function() {
            if (categoryFilter) categoryFilter.value = "";
            if (searchInput) searchInput.value = "";
            renderEventCards();
            showTemporaryMessage("All filters cleared! Showing all events.", "success");
        };
        filterSection.appendChild(clearBtn);
    }
}

function updateFilterDisplay() {
    const currentCategory = categoryFilter ? categoryFilter.value : "";
    const currentSearch = searchInput ? searchInput.value : "";
    
    if (currentCategory) {
        const filtered = masterEventList.filter(e => e.category === currentCategory);
        renderEventCards(filtered);
    } else if (currentSearch) {
        const filtered = masterEventList.filter(e => 
            e.name.toLowerCase().includes(currentSearch.toLowerCase())
        );
        renderEventCards(filtered);
    } else {
        renderEventCards();
    }
}

// ==============================================
// TASK 9: Async JS, Promises, Async/Await
// ==============================================

// Task 9: Fetch events from mock API (simulated)
function fetchEventsWithPromise() {
    return new Promise((resolve, reject) => {
        console.log("Fetching events from API...");
        
        setTimeout(() => {
            const mockApiEvents = [
                { id: 101, name: "Jazz Night", category: "Music", seats: 45, date: "2026-07-20" },
                { id: 102, name: "Marathon Run", category: "Sports", seats: 200, date: "2026-08-15" },
                { id: 103, name: "Painting Workshop", category: "Art", seats: 25, date: "2026-09-01" },
                { id: 104, name: "Chef's Table", category: "Food", seats: 30, date: "2026-10-10" }
            ];
            
            // Simulate random success/failure
            const success = true; // Change to false to test error handling
            if (success) {
                resolve(mockApiEvents);
            } else {
                reject(new Error("Failed to fetch events from API"));
            }
        }, 1500);
    });
}

// Task 9: Using .then() and .catch()
function loadEventsWithThen() {
    showLoadingSpinner(true);
    
    fetchEventsWithPromise()
        .then(apiEvents => {
            console.log("Events loaded via Promise.then():", apiEvents);
            
            // Convert API events to Event objects
            apiEvents.forEach(apiEvent => {
                const exists = masterEventList.some(e => e.name === apiEvent.name);
                if (!exists) {
                    const newEvent = new Event(
                        masterEventList.length + 1,
                        apiEvent.name,
                        apiEvent.date,
                        apiEvent.seats,
                        apiEvent.category
                    );
                    masterEventList.push(newEvent);
                }
            });
            
            renderEventCards();
            showTemporaryMessage(`Loaded ${apiEvents.length} new events from API!`, "success");
            showLoadingSpinner(false);
        })
        .catch(error => {
            console.error("Promise error:", error);
            showTemporaryMessage("Failed to load events from server", "error");
            showLoadingSpinner(false);
        });
}

// Task 9: Using async/await
async function loadEventsWithAsync() {
    try {
        showLoadingSpinner(true);
        console.log("Loading events with async/await...");
        
        const apiEvents = await fetchEventsWithPromise();
        console.log("Events loaded via async/await:", apiEvents);
        
        // Add new events to master list
        let newCount = 0;
        for (const apiEvent of apiEvents) {
            const exists = masterEventList.some(e => e.name === apiEvent.name);
            if (!exists) {
                const newEvent = new Event(
                    masterEventList.length + 1,
                    apiEvent.name,
                    apiEvent.date,
                    apiEvent.seats,
                    apiEvent.category
                );
                masterEventList.push(newEvent);
                newCount++;
            }
        }
        
        renderEventCards();
        showTemporaryMessage(`Successfully added ${newCount} new events!`, "success");
        showLoadingSpinner(false);
        
        return apiEvents;
        
    } catch (error) {
        console.error("Async/Await error:", error);
        showTemporaryMessage("Failed to load events. Please try again.", "error");
        showLoadingSpinner(false);
        return [];
    }
}

// Task 9: Loading spinner control
function showLoadingSpinner(show) {
    const spinner = document.querySelector("#loading-spinner");
    if (spinner) {
        spinner.style.display = show ? "block" : "none";
    }
}

// ==============================================
// TASK 10: Modern JavaScript Features
// ==============================================

// Task 10: Default parameters in functions
function createEventWithDefaults(name = "Untitled Event", date = "2026-12-31", seats = 50, category = "General") {
    const event = {
        name: name,
        date: date,
        seats: seats,
        category: category,
        timestamp: new Date().toISOString(),
        getStatus: () => seats > 0 ? "Available" : "Sold Out"
    };
    console.log(`Created event: ${name}`);
    return event;
}

// Task 10: Destructuring to extract event details
function displayEventDetailsDestructured(event) {
    const { name, date, seats, category, location = "TBD" } = event;
    console.log(`Event: ${name}`);
    console.log(`   Date: ${date}`);
    console.log(`   Seats: ${seats}`);
    console.log(`   Category: ${category}`);
    console.log(`   Location: ${location}`);
    
    return { name, date, seats, category, location };
}

// Task 10: Spread operator to clone event list
function cloneEventList() {
    const clonedList = [...masterEventList];
    console.log(`Cloned ${clonedList.length} events`);
    return clonedList;
}

function filterEventsWithoutMutation(category) {
    // Use spread operator to create a copy before filtering
    const eventsCopy = [...masterEventList];
    const filtered = eventsCopy.filter(event => event.category === category);
    console.log(`Filtered ${filtered.length} ${category} events (original list unchanged)`);
    return filtered;
}

// Task 10: Enhanced object literals
function createEventObject(name, date, seats) {
    return {
        name,
        date,
        seats,
        isAvailable() {
            return this.seats > 0;
        },
        [Symbol.toStringTag]: "Event"
    };
}

// ==============================================
// TASK 11: Working with Forms
// ==============================================

// Task 11: Global form handler
function handleFormSubmit(event) {
    if (event) event.preventDefault();
    
    console.log("Form submission started...");
    
    try {
        // Task 11: Capture form inputs using form.elements
        const form = document.querySelector("#registrationForm");
        if (!form) {
            console.error("Form not found!");
            alert("Error: Registration form not found!");
            return false;
        }
        
        console.log("Form found:", form);
        
        const nameInput = form.elements["name"];
        const emailInput = form.elements["email"];
        const eventTypeSelect = form.elements["eventType"];
        
        const name = nameInput ? nameInput.value : "";
        const email = emailInput ? emailInput.value : "";
        const eventType = eventTypeSelect ? eventTypeSelect.value : "";
        
        console.log("Form data captured:", { name, email, eventType });
        
        // Task 11: Validate inputs
        const validation = validateFormInputsAdvanced(name, email, eventType);
        
        if (!validation.isValid) {
            console.log("Validation failed:", validation);
            showFormErrors(validation.errors);
            showTemporaryMessage("Please fill in all required fields correctly!", "error");
            return false;
        }
        
        // Clear previous errors
        clearFormErrors();
        
        // Find matching event in master list
        const selectedEvent = masterEventList.find(e => e.category === eventType);
        
        if (selectedEvent && selectedEvent.seats > 0 && !selectedEvent.passed) {
            // Register the user
            const result = registerUserWithValidation(name, selectedEvent.id, email);
            
            if (result.success) {
                // Track registration
                registrationTracker.addRegistration(eventType, selectedEvent.name, name);
                
                // Show success message
                const outputMessage = document.querySelector("#outputMessage");
                if (outputMessage) {
                    outputMessage.innerHTML = `
                        <strong>Registration Successful!</strong><br>
                        Name: ${name}<br>
                        Email: ${email}<br>
                        Event: ${eventType}<br>
                        Confirmation sent to your email.
                    `;
                    outputMessage.style.background = "#d4edda";
                    outputMessage.style.color = "#155724";
                    outputMessage.style.padding = "15px";
                    outputMessage.style.borderRadius = "8px";
                }
                
                // Show feedback message
                showTemporaryMessage(`Welcome ${name}! You're registered for ${eventType}!`, "success");
                
                // Reset form
                form.reset();
                
                // Re-render event cards
                renderEventCards();
                
                // Show success alert
                alert(`Welcome ${name}! You're registered for ${eventType}!`);
                
                return true;
            } else {
                showTemporaryMessage(result.message, "error");
                return false;
            }
        } else {
            showTemporaryMessage(`Sorry, ${eventType} events are not available for registration.`, "error");
            return false;
        }
        
    } catch (error) {
        console.error("Form submission error:", error);
        showTemporaryMessage("An error occurred during registration: " + error.message, "error");
        return false;
    }
}

// Advanced form validation
function validateFormInputsAdvanced(name, email, eventType) {
    const errors = {};
    let isValid = true;
    
    // Validate name
    if (!name || name.trim() === "") {
        errors.name = "Name is required";
        isValid = false;
    } else if (name.length < 2) {
        errors.name = "Name must be at least 2 characters";
        isValid = false;
    } else if (name.length > 50) {
        errors.name = "Name must be less than 50 characters";
        isValid = false;
    }
    
    // Validate email
    if (!email || email.trim() === "") {
        errors.email = "Email is required";
        isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        errors.email = "Please enter a valid email address";
        isValid = false;
    } else if (email.length > 100) {
        errors.email = "Email is too long";
        isValid = false;
    }
    
    // Validate event type
    if (!eventType) {
        errors.eventType = "Please select an event type";
        isValid = false;
    }
    
    return { isValid, errors };
}

function showFormErrors(errors) {
    const nameErrorSpan = document.querySelector("#nameError");
    const emailErrorSpan = document.querySelector("#emailError");
    const eventErrorSpan = document.querySelector("#eventError");
    
    if (nameErrorSpan) nameErrorSpan.textContent = errors.name || "";
    if (emailErrorSpan) emailErrorSpan.textContent = errors.email || "";
    if (eventErrorSpan) eventErrorSpan.textContent = errors.eventType || "";
}

function clearFormErrors() {
    const nameErrorSpan = document.querySelector("#nameError");
    const emailErrorSpan = document.querySelector("#emailError");
    const eventErrorSpan = document.querySelector("#eventError");
    
    if (nameErrorSpan) nameErrorSpan.textContent = "";
    if (emailErrorSpan) emailErrorSpan.textContent = "";
    if (eventErrorSpan) eventErrorSpan.textContent = "";
}

// ==============================================
// TASK 12: AJAX & Fetch API
// ==============================================

// Task 12: Fetch API to POST user data
async function submitRegistrationToServer(userData) {
    const payload = {
        userId: Date.now(),
        name: userData.name,
        email: userData.email,
        eventType: userData.eventType,
        eventName: userData.eventName,
        registrationDate: new Date().toISOString(),
        status: "pending"
    };
    
    console.log("Sending data to server:", payload);
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Server response:", data);
        
        showTemporaryMessage(`Registration submitted to server! ID: ${data.id}`, "success");
        return { success: true, data: data };
        
    } catch (error) {
        console.error("Fetch error:", error);
        showTemporaryMessage(`Server error: ${error.message}`, "error");
        return { success: false, error: error.message };
    }
}

// Task 12: Simulated delayed response
function simulateServerDelay(callback, delay = 2000) {
    console.log(`Simulating server delay of ${delay}ms...`);
    showLoadingSpinner(true);
    
    setTimeout(() => {
        showLoadingSpinner(false);
        if (callback && typeof callback === 'function') {
            callback();
        }
        console.log("Server delay simulation complete");
    }, delay);
}

// Enhanced registration with server submission
async function handleFullRegistration(event) {
    event.preventDefault();
    
    const form = document.querySelector("#registrationForm");
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const eventType = form.elements["eventType"].value;
    
    // Find event name
    const selectedEvent = masterEventList.find(e => e.category === eventType);
    const eventName = selectedEvent ? selectedEvent.name : eventType;
    
    // Validate
    const validation = validateFormInputsAdvanced(name, email, eventType);
    if (!validation.isValid) {
        showFormErrors(validation.errors);
        return;
    }
    
    // Submit to server
    const serverResult = await submitRegistrationToServer({
        name, email, eventType, eventName
    });
    
    if (serverResult.success) {
        // Complete local registration
        if (selectedEvent && selectedEvent.seats > 0) {
            selectedEvent.seats--;
            registrationTracker.addRegistration(eventType, eventName, name);
            renderEventCards();
            
            const outputMessage = document.querySelector("#outputMessage");
            if (outputMessage) {
                outputMessage.innerHTML = `
                    Registration Complete!<br>
                    Server ID: ${serverResult.data.id}<br>
                    Thank you ${name}! Check your email (${email}) for confirmation.
                `;
            }
            
            form.reset();
        }
    }
}

// ==============================================
// TASK 13: Debugging and Testing
// ==============================================

// Task 13: Enhanced debugging function
function debugRegistrationProcess(userData) {
    console.group("DEBUGGING REGISTRATION PROCESS");
    console.log("Step 1: Received user data:", JSON.stringify(userData, null, 2));
    
    // Validate each field
    console.log("Step 2: Validating inputs...");
    const validation = {
        name: { value: userData.name, isValid: userData.name && userData.name.length >= 2 },
        email: { value: userData.email, isValid: userData.email && userData.email.includes('@') },
        eventType: { value: userData.eventType, isValid: !!userData.eventType }
    };
    console.table(validation);
    
    const isValid = Object.values(validation).every(v => v.isValid);
    console.log(`Step 3: Overall validation: ${isValid ? "PASSED" : "FAILED"}`);
    
    // Find event
    console.log("Step 4: Finding selected event...");
    const selectedEvent = masterEventList.find(e => e.category === userData.eventType);
    if (selectedEvent) {
        console.log(`   Event found: ${selectedEvent.name}`);
        console.log(`   Available seats: ${selectedEvent.seats}`);
        console.log(`   Event passed: ${selectedEvent.passed}`);
    } else {
        console.warn("   Event not found!");
    }
    
    // Prepare payload
    const payload = {
        name: userData.name,
        email: userData.email,
        eventType: userData.eventType,
        timestamp: new Date().toISOString()
    };
    console.log("Step 5: Payload created:", payload);
    
    console.log("Step 6: Sending to server...");
    console.log("   URL: https://jsonplaceholder.typicode.com/posts");
    console.log("   Method: POST");
    console.log("   Headers: Content-Type: application/json");
    console.log("   Body:", JSON.stringify(payload, null, 2));
    
    console.groupEnd();
    return { validation, isValid, payload, selectedEvent };
}

// Task 13: Comprehensive debugging function for events
function debugEventFiltering() {
    console.group("EVENT FILTERING DEBUG");
    console.log("Total events in master list:", masterEventList.length);
    
    console.log("\nEvent Details:");
    console.table(masterEventList.map(event => ({
        ID: event.id,
        Name: event.name,
        Category: event.category,
        Seats: event.seats,
        Date: event.date,
        Status: event.passed ? "Past" : "Upcoming",
        Available: event.seats > 0 ? "Yes" : "No"
    })));
    
    // Check for console breakpoints
    console.log("\nSet breakpoint below by clicking line number in Sources tab");
    
    // Category breakdown
    const categories = {};
    masterEventList.forEach(event => {
        categories[event.category] = (categories[event.category] || 0) + 1;
    });
    console.log("\nEvents by category:", categories);
    
    // Available seats total
    const totalSeats = masterEventList.reduce((sum, e) => sum + e.seats, 0);
    console.log(`\nTotal available seats: ${totalSeats}`);
    
    console.groupEnd();
}

// Task 13: Network debugging helper
function debugNetworkRequest(url, options) {
    console.group("NETWORK REQUEST DEBUG");
    console.log("Request URL:", url);
    console.log("Request Method:", options.method || "GET");
    console.log("Request Headers:", options.headers || {});
    console.log("Request Body:", options.body || "N/A");
    console.log("Timestamp:", new Date().toISOString());
    console.groupEnd();
}

// ==============================================
// TASK 14: jQuery and JS Frameworks
// ==============================================

// Task 14: jQuery integration (if jQuery is available)
function setupJQueryHandlers() {
    // Check if jQuery is loaded
    if (typeof jQuery !== 'undefined' || typeof $ !== 'undefined') {
        const $ = window.jQuery || window.$;
        
        console.log("jQuery detected! Setting up enhanced handlers...");
        
        // Task 14: jQuery click handler (visual feedback without preventing form submission)
        $('#registerBtn').on('click', function() {
            console.log("jQuery click handler triggered");
            $(this).css('transform', 'scale(0.98)');
            setTimeout(() => {
                $(this).css('transform', 'scale(1)');
            }, 200);
            // Don't prevent default - let the form submit!
        });
        
        // Task 14: fadeIn and fadeOut effects
        window.jQueryFadeEffects = {
            fadeOutCards: function() {
                $('.event-card').fadeOut(400, function() {
                    console.log("Event cards faded out");
                });
            },
            fadeInCards: function() {
                $('.event-card').fadeIn(400, function() {
                    console.log("Event cards faded in");
                });
            },
            fadeToggleCards: function() {
                $('.event-card').fadeToggle(300);
            }
        };
        
        // Add jQuery effects buttons to UI
        addJQueryControlButtons();
        
    } else {
        console.log("ℹ️ jQuery not loaded - using vanilla JavaScript");
        console.log("To load jQuery, add: <script src='https://code.jquery.com/jquery-3.6.0.min.js'></script>");
    }
}

// Add jQuery control buttons to the page
function addJQueryControlButtons() {
    const filterSection = document.querySelector("#filter-section");
    if (filterSection && !document.querySelector("#jquery-controls")) {
        const controlsDiv = document.createElement("div");
        controlsDiv.id = "jquery-controls";
        controlsDiv.style.marginTop = "15px";
        controlsDiv.style.padding = "10px";
        controlsDiv.style.background = "rgba(214, 48, 49, 0.1)";
        controlsDiv.style.borderRadius = "8px";
        controlsDiv.innerHTML = `
            <p><strong>jQuery Demo Controls:</strong></p>
            <button id="fadeOutBtn" style="margin: 5px;">Fade Out Cards</button>
            <button id="fadeInBtn" style="margin: 5px;">Fade In Cards</button>
            <button id="fadeToggleBtn" style="margin: 5px;">Fade Toggle</button>
            <p style="font-size: 12px; margin-top: 8px;">jQuery effects using .fadeIn(), .fadeOut(), .fadeToggle()</p>
        `;
        
        filterSection.parentNode.insertBefore(controlsDiv, filterSection.nextSibling);
        
        // Attach jQuery handlers if available
        if (typeof $ !== 'undefined') {
            $('#fadeOutBtn').on('click', () => $('.event-card').fadeOut(400));
            $('#fadeInBtn').on('click', () => $('.event-card').fadeIn(400));
            $('#fadeToggleBtn').on('click', () => $('.event-card').fadeToggle(300));
        }
    }
}

/*
Task 14: Benefits of moving to frameworks like React or Vue:

FRAMEWORK BENEFITS (React/Vue/Angular):

1. COMPONENT REUSABILITY
   - Create reusable, self-contained components
   - Props system for data flow
   - Example: <EventCard event={eventData} />

2. STATE MANAGEMENT
   - Centralized state stores (Redux, Vuex, Pinia)
   - Predictable state updates
   - Time-travel debugging

3. VIRTUAL DOM
   - Efficient DOM updates
   - Better performance for dynamic content
   - Batch updates for optimization

4. DECLARATIVE SYNTAX
   - Describe what UI should look like, not how to update it
   - Less DOM manipulation code
   - Easier to reason about

5. REACTIVE DATA BINDING
   - Automatic UI updates when data changes
   - Two-way binding (Vue)
   - Unidirectional data flow (React)

6. ROUTING
   - Built-in or official routing solutions
   - Single Page Application (SPA) support
   - Lazy loading for better performance

7. DEVELOPMENT TOOLS
   - React DevTools, Vue DevTools
   - Better debugging experience
   - Performance profiling

8. ECOSYSTEM
   - Large collection of libraries and tools
   - Active community support
   - Extensive documentation

9. TESTING
   - Component testing frameworks
   - Snapshot testing
   - Easier unit tests

10. SCALABILITY
    - Better code organization
    - Separation of concerns
    - Maintainable large applications

11. MOBILE DEVELOPMENT
    - React Native for mobile apps
    - NativeScript-Vue
    - Code reuse across platforms

12. TYPESCRIPT SUPPORT
    - Type safety
    - Better IDE support
    - Catch errors at compile time
*/

// ==============================================
// PORTAL INITIALIZATION
// ==============================================

function initializePortal() {
    console.log("Initializing Community Portal...");
    
    // Initialize DOM elements
    initializeDOM();
    
    // Display valid events
    displayValidEvents();
    
    // Render event cards
    renderEventCards();
    
    // Setup event handlers
    setupEventHandlers();
    
    // Setup form handler
    const registrationForm = document.querySelector("#registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", handleFormSubmit);
    }
    
    // Setup jQuery handlers if available
    setupJQueryHandlers();
    
    // Log all events for debugging
    debugEventFiltering();
    
    // Display total stats
    const totalSeats = getTotalAvailableSeats();
    console.log(`Portal Stats: ${masterEventList.length} events, ${totalSeats} total seats`);
    
    console.log("Portal initialization complete!");
}

// Global registration handler for card buttons
function handleEventRegistration(eventId) {
    handleCardRegistration(eventId);
}

// ==============================================
// EXPORTS FOR GLOBAL ACCESS
// ==============================================

// Make functions available globally for console testing
window.CommunityPortal = {
    // Task 1
    version: "1.0",
    
    // Task 2
    eventInfo: eventInfo,
    updateSeatCount: updateSeatCount,
    
    // Task 3
    displayValidEvents: displayValidEvents,
    registerUserWithValidation: registerUserWithValidation,
    
    // Task 4
    addEvent: addEvent,
    registerUser: registerUser,
    filterEventsByCategory: filterEventsByCategory,
    registrationTracker: registrationTracker,
    
    // Task 5
    Event: Event,
    getEventDetails: getEventDetails,
    constructedEvents: constructedEvents,
    
    // Task 6
    masterEventList: masterEventList,
    addNewEvent: addNewEvent,
    getMusicEvents: getMusicEvents,
    formatEventCards: formatEventCards,
    
    // Task 7
    renderEventCards: renderEventCards,
    
    // Task 8
    setupEventHandlers: setupEventHandlers,
    
    // Task 9
    loadEventsWithThen: loadEventsWithThen,
    loadEventsWithAsync: loadEventsWithAsync,
    
    // Task 10
    createEventWithDefaults: createEventWithDefaults,
    displayEventDetailsDestructured: displayEventDetailsDestructured,
    cloneEventList: cloneEventList,
    
    // Task 11
    handleFormSubmit: handleFormSubmit,
    
    // Task 12
    submitRegistrationToServer: submitRegistrationToServer,
    simulateServerDelay: simulateServerDelay,
    
    // Task 13
    debugRegistrationProcess: debugRegistrationProcess,
    debugEventFiltering: debugEventFiltering,
    
    // Task 14
    setupJQueryHandlers: setupJQueryHandlers,
    
    // Utilities
    getTotalAvailableSeats: getTotalAvailableSeats,
    showTemporaryMessage: showTemporaryMessage
};

console.log("🎯 Community Portal API available at window.CommunityPortal");