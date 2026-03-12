// Toggle menu function

// Toggle hamburger menu
function toggleMenu() {
    const links = document.getElementById("navLinks");
    if (links) {
        links.classList.toggle("active");
    }
}

// Function to load the external header and footer files
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return; 

    try {
        // We use a relative path. 
        // If your HTML files are in the root, 'footer.html' is correct.
        const response = await fetch(file); 
        if (!response.ok) throw new Error(`Could not find ${file}`);
        
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.warn("Component load failed:", error);
    }
}

// Initialize on Load (tell browser to run these functions as soon as page opens)
window.addEventListener('DOMContentLoaded', () => {
    loadComponent('nav-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});

// Email functionality to fix potential bot issues
// This works even if the footer is loaded dynamically later
document.addEventListener('click', function (e) {
    // Check if the clicked element (or its parent) is our email link
    const link = e.target.closest('.email-link');

    if (link) {
        e.preventDefault();
        
        const user = link.getAttribute('data-user');
        const domain = link.getAttribute('data-domain');
        const email = `${user}@${domain}`;

        console.log("Stitching email for:", email);
        
        // Use window.location to trigger the mail app
        window.location.href = `mailto:${email}`;

        // Fallback for Mac/No-Mail-App users
        setTimeout(() => {
            if (!document.hidden) {
                alert(`Oops! Looks like you don't have a default mail app. My email is: ${email}`);
            }
        }, 500);
    }
});