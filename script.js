// Create cursor follower and trail
const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
const cursorTrail = document.createElement('div');
cursorTrail.classList.add('cursor-trail');
document.body.appendChild(cursorFollower);
document.body.appendChild(cursorTrail);

// Update cursor follower position
document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Function to get the interactive parent element
function getInteractiveParent(element) {
    // Only check for parent containers
    const interactiveClasses = ['project-grid', 'skill-cards', 'contact-form', 'contact-info'];
    while (element && element !== document.body) {
        if (interactiveClasses.some(className => element.classList.contains(className))) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}

// Handle hover effects
document.addEventListener('mousemove', (e) => {
    const interactiveElement = getInteractiveParent(e.target);

    if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();

        // Check if cursor is inside the element
        if (e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom) {

            // Show the glow effect
            cursorTrail.classList.add('active');

            // Position the glow at cursor position
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';

            // Create clipping path to contain glow within element
            const clipPath = `inset(
                ${Math.max(0, rect.top - e.clientY + 50)}px 
                ${Math.max(0, e.clientX - rect.right + 50)}px 
                ${Math.max(0, e.clientY - rect.bottom + 50)}px 
                ${Math.max(0, rect.left - e.clientX + 50)}px
            )`;

            cursorTrail.style.clipPath = clipPath;
            cursorTrail.style.background = `radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`;

        } else {
            // Hide the glow when cursor is outside the element
            cursorTrail.classList.remove('active');
        }
    } else {
        // Reset when not over interactive elements
        cursorTrail.classList.remove('active');
        cursorTrail.style.clipPath = 'none';
    }
});

// Add hover animation for logo brackets
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'none';
    logo.offsetHeight;
    logo.style.animation = null;
    const before = logo.querySelector('::before');
    const after = logo.querySelector('::after');
    if (before) before.style.animation = 'none';
    if (after) after.style.animation = 'none';
    void logo.offsetWidth;
    if (before) before.style.animation = null;
    if (after) after.style.animation = null;
});

// Navbar toggle functionality
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close menu when scrolling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    lastScroll = currentScroll;
});

// Code Copy functionality
document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();

        // Find the closest snippet card and get its code
        const snippetCard = button.closest('.snippet-card');
        const codeElement = snippetCard.querySelector('code');
        const textToCopy = codeElement.textContent;

        try {
            await navigator.clipboard.writeText(textToCopy);

            // Change button text temporarily
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = 'rgba(46, 160, 67, 0.2)'; // Green background

            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text:', err);

            // Show error state
            button.textContent = 'Failed to copy';
            button.style.background = 'rgba(248, 81, 73, 0.2)'; // Red background

            // Reset button after 2 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        }
    });
});

// Optional: Add tooltip to show "Copy to clipboard"
document.querySelectorAll('.btn-copy').forEach(button => {
    button.setAttribute('title', 'Copy to clipboard');
});


function copyCode() {
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied the text: " + copyText.value);
}