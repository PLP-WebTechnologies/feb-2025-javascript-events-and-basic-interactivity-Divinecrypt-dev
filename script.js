document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const clickMeButton = document.getElementById('clickMeButton');
    const hoverArea = document.getElementById('hoverArea');
    const keypressInput = document.getElementById('keypressInput');
    const secretActionArea = document.getElementById('secretActionArea');
    const eventOutput = document.getElementById('eventOutput');

    const interactiveButton = document.getElementById('interactiveButton');
    
    const galleryImage = document.getElementById('galleryImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const myForm = document.getElementById('myForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');

    // --- 1. Event Handling ---

    // Button Click
    clickMeButton.addEventListener('click', () => {
        eventOutput.textContent = 'Button was clicked!';
        console.log('Click Me Button: Clicked');
    });

    // Hover Effects
    hoverArea.addEventListener('mouseenter', () => {
        hoverArea.style.backgroundColor = '#cce5ff'; // Light blue
        eventOutput.textContent = 'Mouse entered hover area!';
        console.log('Hover Area: Mouse Enter');
    });
    hoverArea.addEventListener('mouseleave', () => {
        hoverArea.style.backgroundColor = '#e9ecef'; // Original light gray
        eventOutput.textContent = 'Mouse left hover area.';
        console.log('Hover Area: Mouse Leave');
    });

    // Keypress Detection
    keypressInput.addEventListener('keyup', (event) => {
        eventOutput.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
        console.log(`Keypress Input: Key "${event.key}", Code "${event.code}"`);
    });

    // Bonus: Double-click or Long Press
    let longPressTimer;
    let isLongPress = false;

    secretActionArea.addEventListener('dblclick', () => {
        clearTimeout(longPressTimer); // Prevent long press if double click occurs quickly
        isLongPress = false;
        eventOutput.textContent = 'Secret Action: Double Click!';
        document.body.classList.toggle('secret-activated'); // Toggle a "hacker" theme
        console.log('Secret Area: Double Click');
    });

    secretActionArea.addEventListener('mousedown', () => {
        isLongPress = false; // Reset on new mousedown
        longPressTimer = setTimeout(() => {
            isLongPress = true;
            eventOutput.textContent = 'Secret Action: Long Press!';
            // Example: Change background color of the area
            secretActionArea.style.backgroundColor = 'gold';
            console.log('Secret Area: Long Press Detected');
        }, 1000); // 1 second for long press
    });

    secretActionArea.addEventListener('mouseup', () => {
        clearTimeout(longPressTimer);
        if (isLongPress) {
            // Optionally reset style after long press action is acknowledged
            setTimeout(() => {
                 if (secretActionArea.style.backgroundColor === 'gold') { // only reset if it was changed by long press
                    secretActionArea.style.backgroundColor = '#e9ecef';
                 }
            }, 500);
        }
    });
    secretActionArea.addEventListener('mouseleave', () => { // Also clear if mouse leaves
        clearTimeout(longPressTimer);
    });


    // --- 2. Interactive Elements ---

    // Button that changes text or color
    interactiveButton.addEventListener('click', () => {
        if (interactiveButton.textContent === "I'm Blue!") {
            interactiveButton.textContent = "Now I'm Red!";
            interactiveButton.classList.add('red');
        } else {
            interactiveButton.textContent = "I'm Blue!";
            interactiveButton.classList.remove('red');
        }
        console.log('Interactive Button: Toggled color/text');
    });

    // Image Gallery
    const images = [
        'https://via.placeholder.com/300x200/007bff/ffffff?text=Image+1',
        'https://via.placeholder.com/300x200/28a745/ffffff?text=Image+2',
        'https://via.placeholder.com/300x200/dc3545/ffffff?text=Image+3',
        'https://via.placeholder.com/300x200/ffc107/000000?text=Image+4'
    ];
    let currentImageIndex = 0;

    function showImage(index) {
        galleryImage.classList.remove('slide-animation'); // Reset animation class
        void galleryImage.offsetWidth; // Trigger reflow to restart animation

        galleryImage.src = images[index];
        galleryImage.alt = `Image ${index + 1}`;
        galleryImage.classList.add('slide-animation'); // Add animation class
        
        // Remove animation class after it finishes to allow re-triggering
        setTimeout(() => {
            galleryImage.classList.remove('slide-animation');
        }, 500); // Match CSS transition duration
        console.log(`Gallery: Displaying image ${index + 1}`);
    }

    prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });
    showImage(currentImageIndex); // Show initial image


    // Tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate clicked tab and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
            console.log(`Tabs: Switched to ${tabId}`);
        });
    });

    // --- 3. Form Validation ---
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.classList.add('input-error');
    }

    function clearError(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('input-error');
    }

    // Real-time feedback (Bonus)
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Name is required.');
        } else {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required.');
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Invalid email format.');
        } else {
            clearError(emailInput, emailError);
        }
    });
    
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required.');
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
        } else {
            clearError(passwordInput, passwordError);
        }
    });


    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission
        console.log('Form: Submit attempt');

        let isValid = true;
        formMessage.textContent = ''; // Clear previous messages
        formMessage.className = '';   // Clear previous classes

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Name is required.');
            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Email is required.');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Invalid email format.');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Password validation
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, passwordError, 'Password is required.');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        if (isValid) {
            formMessage.textContent = 'Form submitted successfully!';
            formMessage.classList.add('success');
            console.log('Form: Validated successfully.', { 
                name: nameInput.value, 
                email: emailInput.value 
                // Don't log password
            });
            myForm.reset(); // Clear the form fields
            // Clear any lingering real-time error messages after successful submit + reset
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(passwordInput, passwordError);
        } else {
            formMessage.textContent = 'Please correct the errors above.';
            formMessage.classList.add('error');
            console.log('Form: Validation failed.');
        }
    });

    console.log('JS Event Playground Initialized!');
});