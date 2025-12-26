document.addEventListener('DOMContentLoaded', () => {
    // Query the elements using the IDs/classes present in the HTML
    const menuIcon = document.querySelector('#main-icon') || document.querySelector('#menu-icon') || document.querySelector('.bx-menu');
    const navBar = document.querySelector('.navbar') || document.querySelector('.navBar');

    if (!menuIcon || !navBar) return; // nothing to do if structure is different

    // Toggle menu open/close on click
    menuIcon.addEventListener('click', () => {
        // toggle icon visual state (some icons use bx-x when active)
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('active');
    });

    // Close the nav when any link inside it is clicked (useful for mobile)
    navBar.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (!target) return;
        // if the link points to an anchor on the page, close the menu
        if (navBar.classList.contains('active')) {
            navBar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Ensure responsive behavior: when resizing to larger viewports, remove mobile classes
    const resetNavOnResize = () => {
        // If the viewport is larger than a typical mobile breakpoint, ensure nav is shown and icon reset
        if (window.innerWidth > 900) {
            navBar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    };

    window.addEventListener('resize', () => {
        // Debounce-like small delay to avoid flooding
        clearTimeout(window._navResizeTimeout);
        window._navResizeTimeout = setTimeout(resetNavOnResize, 100);
    });

    // Run once to ensure initial state is correct
    resetNavOnResize();
});