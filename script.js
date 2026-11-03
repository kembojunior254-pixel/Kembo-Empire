// Gold fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .panel, .stat, .cta').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});

const bookingForm = document.querySelector('#booking-form');

if (bookingForm instanceof HTMLFormElement) {
  const bookingStatus = document.querySelector('#booking-status');
  const bookingFallback = document.querySelector('#booking-fallback');

  bookingForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const fields = [
      ['Name', formData.get('name')],
      ['Phone / WhatsApp', formData.get('phone')],
      ['Email', formData.get('email')],
      ['Service', formData.get('service')],
      ['Timeline', formData.get('timeline')],
      ['Estimated budget', formData.get('budget')],
      ['Project details', formData.get('details')]
    ];
    const message = [
      'Hello Kembo Empire! I would like to discuss a project.',
      '',
      ...fields
        .filter(([, value]) => typeof value === 'string' && value.trim())
        .map(([label, value]) => `${label}: ${value.trim()}`)
    ].join('\n');
    const whatsappUrl = `https://wa.me/254793901202?text=${encodeURIComponent(message)}`;

    if (bookingFallback instanceof HTMLAnchorElement) {
      bookingFallback.href = whatsappUrl;
      bookingFallback.hidden = false;
    }

    if (bookingStatus instanceof HTMLElement) {
      bookingStatus.textContent = 'Your message is ready. If WhatsApp did not open, use the link below.';
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

console.log("👑 Kembo Empire — Where Creativity Meets Code.");