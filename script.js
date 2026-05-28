// Phone Validation
function validatePhone() {

    let phone = document.getElementById("phone").value;

    if (phone.length != 10) {
        alert("Phone number must contain 10 digits");
    }
}

// Display Event Fee
function displayFee() {

    let event = document.getElementById("eventType").value;

    let fee = "";

    if (event == "Music") {
        fee = "Fee: ₹100";
    }

    else if (event == "Sports") {
        fee = "Fee: ₹200";
    }

    else if (event == "Art") {
        fee = "Fee: ₹150";
    }

    document.getElementById("feeDisplay").innerHTML = fee;

    // Save selected event
    localStorage.setItem("preferredEvent", event);
}

// Submit Alert
function submitAlert() {
    alert("Registration Submitted Successfully");
}

// Form Confirmation
function showConfirmation(event) {

    event.preventDefault();

    document.getElementById("outputMessage").innerHTML =
        "Registration Successful!";
    
    // Disable warning after successful submission
    formModified = false;
}

// Enlarge Image
function enlargeImage(img) {

    img.style.width = "300px";
    img.style.height = "250px";
}

// Character Counter
function countCharacters() {

    let text =
        document.getElementById("message").value;

    document.getElementById("charCount").innerHTML =
        text.length;
}

// Video Ready
function videoReady() {

    document.getElementById("videoMessage").innerHTML =
        "Video ready to play";
}

// Track form completion status
let formModified = false;

// Set form as modified when user types
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea, select");
    
    inputs.forEach(input => {
        input.addEventListener("change", function() {
            formModified = true;
        });
        input.addEventListener("keyup", function() {
            formModified = true;
        });
    });
});

// Before Unload Warning - Show when form has unsaved changes
window.onbeforeunload = function () {
    if (formModified) {
        return "Your form is not completed!";
    }
};

// Load Saved Event Preference
window.onload = function () {

    let savedEvent =
        localStorage.getItem("preferredEvent");

    if (savedEvent) {

        document.getElementById("eventType").value =
            savedEvent;
    }
};

// Clear Storage
function clearPreferences() {

    localStorage.clear();
    sessionStorage.clear();

    alert("Preferences Cleared");
}

// Geolocation for Event Mapping
function findLocation() {

    if (navigator.geolocation) {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                document.getElementById("location").innerHTML =
                    "Latitude: " + latitude.toFixed(4) +
                    ", Longitude: " + longitude.toFixed(4) +
                    "<br>Searching for nearby events...";
            },
            function (error) {
                if (error.code === 1) {
                    document.getElementById("location").innerHTML =
                        "Location permission denied. Please enable it in browser settings.";
                } else if (error.code === 3) {
                    document.getElementById("location").innerHTML =
                        "Location request timeout.";
                } else if (error.code === 2) {
                    document.getElementById("location").innerHTML =
                        "Position unavailable.";
                } else {
                    document.getElementById("location").innerHTML =
                        "Error: " + error.message;
                }
            },
            options
        );
    } else {
        document.getElementById("location").innerHTML =
            "Geolocation is not supported by this browser.";
    }
}

