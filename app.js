document.addEventListener("DOMContentLoaded", function() {
    const contactBtn = document.getElementById("contact-btn");
    if (contactBtn) {
        contactBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const footer = document.getElementById("contact");
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
