// Send user message
function sendMessage() {

    const input = document.getElementById("userInput");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Display user message
    addMessage(message, "user");

    // Generate healthcare response
    const response = getHealthcareResponse(message);

    // Clear input
    input.value = "";

    // Display response after a short delay
    setTimeout(function () {

        addMessage(response, "bot");

        // Speak the response
        speak(response);

    }, 500);
}


// Add message to chat box
function addMessage(message, sender) {

    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");

    if (sender === "user") {

        messageDiv.className = "user-message";

    } else {

        messageDiv.className = "bot-message";

    }

    messageDiv.innerHTML = message;

    chatBox.appendChild(messageDiv);

    // Automatically scroll down
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Healthcare response system
function getHealthcareResponse(message) {

    message = message.toLowerCase();


    // Emergency symptoms
    if (
        message.includes("chest pain") ||
        message.includes("difficulty breathing") ||
        message.includes("can't breathe") ||
        message.includes("unconscious") ||
        message.includes("severe bleeding")
    ) {

        return `
        ⚠️ <b>Possible emergency.</b>
        <br><br>
        Please seek immediate medical attention or contact your local emergency service.
        Do not rely on this chatbot for emergency treatment.
        `;
    }


    // Headache
    if (
        message.includes("headache") ||
        message.includes("head pain")
    ) {

        return `
        🤕 <b>Headache:</b>
        <br><br>
        Headaches can have many causes, including dehydration,
        lack of sleep, stress, or other conditions.
        <br><br>
        Try resting and drinking enough water.
        If the headache is severe, sudden, persistent,
        or unusual for you, consult a healthcare professional.
        `;
    }


    // Fever
    if (
        message.includes("fever") ||
        message.includes("temperature")
    ) {

        return `
        🌡️ <b>Fever:</b>
        <br><br>
        Rest and drink enough fluids.
        Monitor your temperature.
        <br><br>
        If the fever is high, persistent, or accompanied by
        concerning symptoms, contact a healthcare professional.
        `;
    }


    // Cough
    if (
        message.includes("cough")
    ) {

        return `
        🤧 <b>Cough:</b>
        <br><br>
        A cough can occur with infections, allergies,
        irritation, or other conditions.
        <br><br>
        Drink fluids and rest.
        If the cough is severe, lasts a long time,
        or causes breathing difficulty, seek medical advice.
        `;
    }


    // Stomach pain
    if (
        message.includes("stomach pain") ||
        message.includes("abdominal pain")
    ) {

        return `
        🤢 <b>Stomach pain:</b>
        <br><br>
        Stomach pain can have many different causes.
        Avoid foods that seem to worsen your symptoms
        and stay hydrated.
        <br><br>
        Seek medical advice if the pain is severe,
        persistent, or associated with vomiting, bleeding,
        or other concerning symptoms.
        `;
    }


    // Cold
    if (
        message.includes("cold") ||
        message.includes("runny nose")
    ) {

        return `
        🤧 <b>Cold symptoms:</b>
        <br><br>
        Rest, drink fluids, and monitor your symptoms.
        <br><br>
        If symptoms become severe or do not improve,
        consult a healthcare professional.
        `;
    }


    // Greeting
    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        return `
        Hello! 👋
        <br><br>
        Please describe your symptoms and I will provide
        general health information.
        `;
    }


    // Thanks
    if (
        message.includes("thank")
    ) {

        return `
        You're welcome! 😊
        <br><br>
        Take care of yourself and stay healthy.
        `;
    }


    // Default response
    return `
        🩺 I understand that you are experiencing some symptoms.
        <br><br>
        I don't have enough information to provide
        useful guidance for this symptom.
        <br><br>
        Please describe your symptoms in more detail,
        or consult a qualified healthcare professional.
    `;
}


// Speech-to-text
function startListening() {

    if (!("webkitSpeechRecognition" in window)) {

        alert(
            "Speech recognition is not supported in this browser. " +
            "Please try Google Chrome."
        );

        return;
    }


    const recognition = new webkitSpeechRecognition();

    // Language
    recognition.lang = "en-US";

    // Stop after the user finishes speaking
    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.start();


    recognition.onstart = function () {

        document.querySelector(".mic-button").innerHTML = "🔴";

    };


    recognition.onresult = function(event) {

        const speechText =
            event.results[0][0].transcript;

        document.getElementById("userInput").value =
            speechText;

        // Automatically send message
        sendMessage();
    };


    recognition.onend = function() {

        document.querySelector(".mic-button").innerHTML = "🎤";

    };


    recognition.onerror = function() {

        document.querySelector(".mic-button").innerHTML = "🎤";

        alert("Sorry, I could not understand your voice.");
    };

}


// Text-to-speech
function speak(text) {

    if ("speechSynthesis" in window) {

        // Remove HTML tags before speaking
        const cleanText =
            text.replace(/<[^>]*>/g, "");

        const speech =
            new SpeechSynthesisUtterance(cleanText);

        speech.lang = "en-US";

        speech.rate = 0.9;

        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }

}


// Press Enter to send
document
    .getElementById("userInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    });