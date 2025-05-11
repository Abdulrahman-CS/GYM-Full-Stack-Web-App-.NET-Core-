// Form validation script for the gym feedback form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gymFeedbackForm');
    
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting by default
        event.preventDefault();
        
        // Reset all previous error messages
        clearErrors();
        
        // Initialize a flag to track validation status
        let isValid = true;
        
        // Validate all required fields
        isValid = validateRequiredField('firstName', 'Please enter your first name') && isValid;
        isValid = validateRequiredField('lastName', 'Please enter your last name') && isValid;
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            displayError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            displayError('phone', 'Please enter your phone number');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            displayError('phone', 'Please enter a valid phone number (10 digits)');
            isValid = false;
        }
        
        // Age validation - optional but must be a number if entered
        const age = document.getElementById('age').value.trim();
        if (age !== '' && !isValidAge(age)) {
            displayError('age', 'Please enter a valid age (between 16 and 99)');
            isValid = false;
        }
        
        // Gender validation - at least one option must be selected
        const genderOptions = document.querySelectorAll('input[name="gender"]');
        let genderSelected = false;
        genderOptions.forEach(option => {
            if (option.checked) {
                genderSelected = true;
            }
        });
        
        if (!genderSelected) {
            displayError('gender', 'Please select your gender');
            isValid = false;
        }
        
        // Fitness goals validation - at least one option should be selected
        const goalsOptions = document.querySelectorAll('input[name="goals"]');
        let goalsSelected = false;
        goalsOptions.forEach(option => {
            if (option.checked) {
                goalsSelected = true;
            }
        });
        
        if (!goalsSelected) {
            displayError('goals', 'Please select at least one fitness goal');
            isValid = false;
        }
        
        // Services validation - at least one option should be selected
        const servicesOptions = document.querySelectorAll('input[name="services"]');
        let servicesSelected = false;
        servicesOptions.forEach(option => {
            if (option.checked) {
                servicesSelected = true;
            }
        });
        
        if (!servicesSelected) {
            displayError('services', 'Please select at least one service you have used');
            isValid = false;
        }
        
        // Facilities validation - at least one option should be selected
        const facilitiesOptions = document.querySelectorAll('input[name="facilities"]');
        let facilitiesSelected = false;
        facilitiesOptions.forEach(option => {
            if (option.checked) {
                facilitiesSelected = true;
            }
        });
        
        if (!facilitiesSelected) {
            displayError('facilities', 'Please select at least one facility you use');
            isValid = false;
        }
        
        // Visit days validation - at least one option should be selected
        const visitDaysOptions = document.querySelectorAll('input[name="visitDays"]');
        let visitDaysSelected = false;
        visitDaysOptions.forEach(option => {
            if (option.checked) {
                visitDaysSelected = true;
            }
        });
        
        if (!visitDaysSelected) {
            displayError('visitDays', 'Please select at least one day you visit the gym');
            isValid = false;
        }
        
        // Feedback validation - required field
        isValid = validateRequiredField('feedback', 'Please provide your feedback') && isValid;
        
        // If all validations pass, submit the form via AJAX
        if (isValid) {
            const formData = new FormData(form);
            
            // Display loading indicator
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            fetch('process_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log(response.status)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                if (data.success) {
                    // Show success message
                    showMessage('success', data.message);
                    form.reset();
                } else {
                    // Show error message
                    showMessage('error', 'Error: ' + data.message);
                }
            })
            .catch(error => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                console.log(error);
                showMessage('error', 'An error occurred while submitting the form. Please try again later.');
            });
        } else {
            // Focus on the first field with an error
            focusFirstError();
        }
    });
    
    // Helper function to validate required fields
    function validateRequiredField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        if (field.value.trim() === '') {
            displayError(fieldId, errorMessage);
            return false;
        }
        return true;
    }
    
    // Helper function to display error messages
    function displayError(fieldId, message) {
        const errorSpan = document.getElementById(fieldId + 'Error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
    
    // Helper function to clear all error messages
    function clearErrors() {
        const errorSpans = document.querySelectorAll('.error');
        errorSpans.forEach(span => {
            span.textContent = '';
        });
    }
    
    // Helper function to focus on the first field with an error
    function focusFirstError() {
        const firstErrorField = document.querySelector('.error:not(:empty)');
        if (firstErrorField) {
            const fieldId = firstErrorField.id.replace('Error', '');
            const field = document.getElementById(fieldId);
            if (field) {
                field.focus();
            }
        }
    }
    
    // Helper function to show success/error messages
    function showMessage(type, message) {
        // Check if message container already exists
        let messageContainer = document.getElementById('message-container');
        
        // If not, create one
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            messageContainer.style.padding = '15px';
            messageContainer.style.marginBottom = '20px';
            messageContainer.style.borderRadius = '4px';
            messageContainer.style.textAlign = 'center';
            messageContainer.style.fontWeight = 'bold';
            
            // Insert at the top of the form
            form.parentNode.insertBefore(messageContainer, form);
        }
        
        // Set message style based on type
        if (type === 'success') {
            messageContainer.style.backgroundColor = '#d4edda';
            messageContainer.style.color = '#155724';
            messageContainer.style.border = '1px solid #c3e6cb';
        } else {
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
            messageContainer.style.border = '1px solid #f5c6cb';
        }
        
        // Set message content
        messageContainer.textContent = message;
        
        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Auto-hide message after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Phone validation helper function
    function isValidPhone(phone) {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone.replace(/\D/g, '')); // Remove non-digits before testing
    }
    
    // Age validation helper function
    function isValidAge(age) {
        const ageNum = parseInt(age);
        return !isNaN(ageNum) && ageNum >= 16 && ageNum <= 99;
    }
});