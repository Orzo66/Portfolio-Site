// Grab the contact form
const contactForm = document.querySelector('#contact form');

if (contactForm) {
	contactForm.addEventListener('submit', function (e) {
		// Prevent the default page reload
		e.preventDefault();

		// Target the submit button to update its state
		const submitBtn = this.querySelector('input[type="submit"]');
		const originalText = submitBtn.value;

		// Provide immediate visual feedback
		submitBtn.value = 'Sending...';
		submitBtn.style.opacity = '0.8';
		submitBtn.style.cursor = 'wait';

		// --- Backend Integration Point ---
		// This is where you would normally hook into your backend logic
		// (e.g., using fetch() to send the data to a Python script, Cloud Function, or PHP handler).

		// For demonstration, we simulate a successful network request with a timeout
		setTimeout(() => {
			// Success state
			submitBtn.value = 'Message Sent!';
			submitBtn.style.backgroundColor = '#3e9e82'; // Darker success color
			submitBtn.style.opacity = '1';
			submitBtn.style.cursor = 'pointer';

			// Clear the form fields
			this.reset();

			// Reset the button back to its original state after 3 seconds
			setTimeout(() => {
				submitBtn.value = originalText;
				submitBtn.style.backgroundColor = ''; // Reverts to the CSS stylesheet color
			}, 3000);
		}, 1500); // Simulated 1.5 second network delay
	});
}
