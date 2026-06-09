// Grab the contact form
const contactForm = document.querySelector('#contact form');

if (contactForm) {
	contactForm.addEventListener('submit', async function (e) {
		// Prevent the default form submission and redirect
		e.preventDefault();

		const submitBtn = this.querySelector('input[type="submit"]');
		const originalText = submitBtn.value;

		// Provide immediate visual feedback that it's sending
		submitBtn.value = 'Sending...';
		submitBtn.style.opacity = '0.8';
		submitBtn.style.cursor = 'wait';

		// Gather the data from the form
		const formData = new FormData(this);

		try {
			// Send the data to Formspree using Fetch API
			const response = await fetch(this.action, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json', // Crucial: tells Formspree we want JSON back, not an HTML page redirect
				},
			});

			if (response.ok) {
				// --- SUCCESS STATE ---
				submitBtn.value = 'Message Sent!';
				submitBtn.style.backgroundColor = '#3e9e82'; // Darker success green
				submitBtn.style.opacity = '1';
				submitBtn.style.cursor = 'default';

				// Clear the form fields
				this.reset();

				// Create and display a success message below the form
				const successMsg = document.createElement('p');
				successMsg.textContent =
					"Thanks for reaching out to Papa Orso Development! I'll get back to you soon.";
				successMsg.style.color = '#3e9e82';
				successMsg.style.fontWeight = '600';
				successMsg.style.marginTop = '1.5rem';
				successMsg.className = 'form-status-msg';

				// Remove any existing message if they submit twice
				const existingMsg =
					this.parentNode.querySelector('.form-status-msg');
				if (existingMsg) existingMsg.remove();

				// Append the message to the container
				this.parentNode.appendChild(successMsg);

				// Reset the button back to normal after 5 seconds
				setTimeout(() => {
					submitBtn.value = originalText;
					submitBtn.style.backgroundColor = '';
					submitBtn.style.cursor = 'pointer';
					// Optionally remove the success message after a while too
					// successMsg.remove();
				}, 5000);
			} else {
				// --- ERROR STATE (Formspree validation failed) ---
				const data = await response.json();
				if (Object.hasOwn(data, 'errors')) {
					submitBtn.value = data.errors
						.map((error) => error.message)
						.join(', ');
				} else {
					submitBtn.value =
						'Oops! There was a problem submitting your form';
				}
				submitBtn.style.backgroundColor = '#e74c3c'; // Error red

				setTimeout(() => {
					submitBtn.value = originalText;
					submitBtn.style.backgroundColor = '';
					submitBtn.style.opacity = '1';
					submitBtn.style.cursor = 'pointer';
				}, 4000);
			}
		} catch (error) {
			// --- NETWORK ERROR STATE ---
			submitBtn.value = 'Network Error. Please try again.';
			submitBtn.style.backgroundColor = '#e74c3c';

			setTimeout(() => {
				submitBtn.value = originalText;
				submitBtn.style.backgroundColor = '';
				submitBtn.style.opacity = '1';
				submitBtn.style.cursor = 'pointer';
			}, 4000);
		}
	});
}
