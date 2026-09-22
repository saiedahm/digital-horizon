document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close-btn");
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    // سنقوم بربط زر "اتصل بنا" في الهيدر لفتح النافذة
    // (ابحث عن رابط اتصل بنا في الهيدر واجعل رابطه #contact)
    const contactLinks = document.querySelectorAll('a[href="#"], a[href="#contact"]');
    
    contactLinks.forEach(link => {
        if (link.textContent.includes("اتصل بنا")) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                modal.style.display = "flex";
                successMessage.style.display = "none";
                contactForm.style.display = "block";
            });
        }
    });

    // إغلاق النافذة عند الضغط على علامة (X)
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // إغلاق النافذة عند الضغط خارجها
    window.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // عند الضغط على زر إرسال الرسالة
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        
        // إخفاء نموذج الإدخال وإظهار رسالة النجاح الجيلة
        contactForm.style.display = "none";
        successMessage.style.display = "block";

        // إغلاق النافذة تلقائياً بعد 3 ثوانٍ
        setTimeout(function() {
            modal.style.display = "none";
        }, 3000);
    });
});
