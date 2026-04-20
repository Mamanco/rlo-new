/**
 * Initialize the webform handler.
 * @param {string} selector - The CSS selector for the form (e.g., "#contact-form")
 * @param {string} endpoint - Your DigitalOcean Function URL
 * @param {string} secret - The shared secret (must match FRONTEND_SECRET in DO)
 */
function webform(selector, endpoint="https://faas-sgp1-18bc02ac.doserverless.co/api/v1/web/fn-6821b166-0fd0-41fb-89e1-ceeca289ffc0/default/rommel", secret="YWxpdmVzd2luZ2R1cmluZ3BsYW5uaW5nYXNpZGVnZXR0aW5nYmVsb3dnaXZlcmFpc2U") {
    const form = document.querySelector(selector);
    if (!form) {
        console.error(`Webform: Could not find form with selector "${selector}"`);
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitBtn) {
        console.error('Webform: Could not find a submit button inside the form.');
        return;
    }

    // Helper: Generate SHA-256 hash using native browser crypto API
    async function generateHash(timestamp, url, secret) {
        const msgUint8 = new TextEncoder().encode(timestamp + url + secret);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Create a container for error messages below the submit button
    const errorMsgContainer = document.createElement('div');
    errorMsgContainer.style.color = 'red';
    errorMsgContainer.style.marginTop = '10px';
    errorMsgContainer.style.display = 'none';
    submitBtn.parentNode.insertBefore(errorMsgContainer, submitBtn.nextSibling);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Native HTML5 Validation
        if (!form.checkValidity()) {
            // Let the browser show its default tooltips (e.g., "Please fill out this field")
            return; 
        }

        // Prevent the default form submission (page reload)
        e.preventDefault();

        // 2. Block the button
        const originalBtnText = submitBtn.innerText || submitBtn.value;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        submitBtn.value = 'Sending...';
        errorMsgContainer.style.display = 'none';

        try {
            // 3. Generate Security Tokens
            const timestamp = Math.floor(Date.now() / 1000).toString(); // Unix timestamp in seconds
            const url = window.location.href;
            const hash = await generateHash(timestamp, url, secret);

            // 4. Build the Payload
            // FormData automatically handles file uploads and standard inputs perfectly
            const formData = new FormData(form);
            formData.append('timestamp', timestamp);
            formData.append('url', url);
            formData.append('hash', hash);

            form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                // If it's not checked, manually append it to the payload with a default value
                if (!cb.checked) {
                    formData.append(cb.name, 'No'); // or 'Unchecked', 'False', etc.
                }
            });

            // 5. Send the Request
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData, // Fetch sets the multipart boundary automatically
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with ${response.status}`);
            }

            // 6. Success: Replace form contents
            form.innerHTML = `
                <div style="padding: 20px; text-align: center; border: 1px solid #4CAF50; border-radius: 5px; color: #4CAF50;">
                    <h3>Thank you!</h3>
                    <p>Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
            `;

        } catch (error) {
            // 7. Error: Display below button and restore button state
            console.error('Webform submission failed:', error);
            errorMsgContainer.innerText = `Error: ${error.message}. Please try again.`;
            errorMsgContainer.style.display = 'block';
            
            submitBtn.disabled = false;
            if (submitBtn.tagName.toLowerCase() === 'input') {
                submitBtn.value = originalBtnText;
            } else {
                submitBtn.innerText = originalBtnText;
            }
        }
    });
}