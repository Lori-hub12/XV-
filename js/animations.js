document.addEventListener('DOMContentLoaded', () => {
    
    // --- Falling Rose Petals Animation (Global) ---
    const petalsContainer = document.getElementById('globalPetals');
    const numberOfPetals = 30; // Amount of simultaneous petals
    
    function createPetal() {
        if (!petalsContainer) return;
        
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize petal properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 7 + 8; // 8s to 15s (slower for background)
        const animationDelay = Math.random() * 5; // 0s to 5s
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}%`;
        petal.style.animationDuration = `${animationDuration}s`;
        petal.style.animationDelay = `${animationDelay}s`;
        
        petalsContainer.appendChild(petal);
        
        // Remove and recreate petal after it falls to keep DOM clean
        setTimeout(() => {
            petal.remove();
            createPetal(); // Recreate infinitely
        }, (animationDuration + animationDelay) * 1000);
    }
    
    // Initial creation of petals
    for (let i = 0; i < numberOfPetals; i++) {
        createPetal();
    }
    
    // --- Scroll Fade-in Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Element becomes visible when 15% is in view
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
});
