// --- Money Rain Effect ---
const moneyEmojis = ['u1F4B5', 'u1F4B6', 'u1F4B7', 'u1F4B4', 'u1F4B8', 'u1F911', 'u1F4B0', 'u1F4B3'];

function triggerMoneyRain() {
    const symbols = [String.fromCodePoint(0x1F4B5), String.fromCodePoint(0x1F4B8), String.fromCodePoint(0x1F911), String.fromCodePoint(0x1F4B0), String.fromCodePoint(0x1F4B3)];
    const total = 60;
    for (let i = 0; i < total; i++) {
        setTimeout(function() {
            var el = document.createElement('div');
            el.classList.add('money-symbol');
            el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            var left = Math.random() * 100;
            var duration = Math.random() * 1.5 + 0.8;
            var size = Math.random() * 1.5 + 1;
            el.style.left = left + 'vw';
            el.style.top = '-3rem';
            el.style.fontSize = size + 'rem';
            el.style.animationDuration = duration + 's';
            document.body.appendChild(el);
            setTimeout(function() { el.remove(); }, duration * 1000 + 50);
        }, i * 30);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Personalized Greeting via URL params ---
    // Example: index.html?guest=Lori+Papu&passes=2
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const passes = urlParams.get('passes');
    
    if (guestName) {
        const greetingDiv = document.getElementById('personalizedGreeting');
        let passesText = passes ? `<p class="mt-2 text-ivory"><strong>Pases:</strong> ${passes}</p>` : '';
        greetingDiv.innerHTML = `
            <h4>Invitaci?n especial para:</h4>
            <div class="guest-name">${guestName}</div>
            ${passesText}
        `;
        greetingDiv.classList.remove('hidden');
        
        // Pre-fill the form
        const formName = document.getElementById('fullName');
        if (formName) formName.value = guestName;
        
        const formCompanions = document.getElementById('companions');
        if (formCompanions && passes) {
            // Number of companions is passes - 1
            let compCount = parseInt(passes) - 1;
            if(compCount >= 0 && compCount <= 4) {
                formCompanions.value = compCount.toString();
            }
        }
    }

    // --- Music & Entrance ---
    const btnEnter = document.getElementById('btnEnter');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    btnEnter.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => {
            welcomeScreen.style.visibility = 'hidden';
            mainContent.classList.remove('hidden');
            // Try to play music
            playMusic();
            // Trigger initial scroll animations check
            window.dispatchEvent(new Event('scroll'));
        }, 1000);
    });

    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            updateMusicIcon();
        }).catch(err => {
            console.log("Audio autoplay failed:", err);
        });
    }

    function updateMusicIcon() {
        musicToggle.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
        } else {
            bgMusic.play();
        }
        isPlaying = !isPlaying;
        updateMusicIcon();
    });

    // --- Floating Menu ---
    const hamburger = document.getElementById('hamburgerMenu');
    const menuLinks = document.getElementById('menuLinks');
    
    hamburger.addEventListener('click', () => {
        menuLinks.classList.toggle('show');
    });

    // Close menu when clicking a link
    menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('show');
        });
    });

    // --- Countdown ---
    // Set date to September 24, 2026 at 18:00 (6:00 PM)
    const eventDate = new Date('2026-10-18T18:00:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown');
    const countdownMsg = document.getElementById('countdown-message');

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownContainer.classList.add('hidden');
            countdownMsg.classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);

    // --- Form Logic ---
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const companionsSection = document.getElementById('companionsSection');
    const companionsSelect = document.getElementById('companions');
    const companionNamesGroup = document.getElementById('companionNamesGroup');
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');
    const successMessage = document.getElementById('successMessage');

    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'yes') {
                companionsSection.classList.remove('hidden');
            } else {
                companionsSection.classList.add('hidden');
            }
        });
    });

    companionsSelect.addEventListener('change', (e) => {
        if (e.target.value !== '0') {
            companionNamesGroup.style.display = 'block';
        } else {
            companionNamesGroup.style.display = 'none';
        }
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const companions = attendance === 'yes' ? document.getElementById('companions').value : '0';
        const companionNames = attendance === 'yes' ? document.getElementById('companionNames').value : '';
        const restrictions = document.getElementById('restrictions').value;
        
        // Create RSVP object
        const rsvpData = {
            id: Date.now().toString(),
            fullName,
            phone,
            attendance,
            companions,
            companionNames,
            restrictions,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage (Simulation of backend API / Firebase)
        let existingData = localStorage.getItem('mariaClaraRSVP');
        existingData = existingData ? JSON.parse(existingData) : [];
        existingData.push(rsvpData);
        localStorage.setItem('mariaClaraRSVP', JSON.stringify(existingData));
        
        // Show success message
        rsvpForm.style.display = 'none';
        
        if (attendance === 'yes') {
            successMessage.textContent = `?Gracias, ${fullName.split(' ')[0]}! Mar?a Clara espera compartir esta noche contigo. ??`;
        } else {
            successMessage.textContent = `Gracias por avisarnos, ${fullName.split(' ')[0]}. Te extra?aremos en esta noche especial.`;
        }
        
        rsvpSuccess.classList.remove('hidden');
    });

    // --- Lightbox for Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
