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

const chatbot = document.querySelector('[data-chatbot]');

if (chatbot instanceof HTMLElement) {
  const chatPanel = chatbot.querySelector('.chat-panel');
  const chatToggle = chatbot.querySelector('.chat-toggle');
  const chatClose = chatbot.querySelector('.chat-close');
  const chatMessages = chatbot.querySelector('.chat-messages');
  const chatForm = chatbot.querySelector('.chat-form');
  const chatInput = chatbot.querySelector('#chat-input');

  if (
    chatPanel instanceof HTMLElement &&
    chatToggle instanceof HTMLButtonElement &&
    chatClose instanceof HTMLButtonElement &&
    chatMessages instanceof HTMLElement &&
    chatForm instanceof HTMLFormElement &&
    chatInput instanceof HTMLInputElement
  ) {
    const setChatOpen = (isOpen) => {
      chatPanel.hidden = !isOpen;
      chatToggle.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        chatInput.focus();
      } else {
        chatToggle.focus();
      }
    };

    const addChatMessage = (message, className) => {
      const element = document.createElement('p');
      element.className = `chat-message ${className}`;
      element.textContent = message;
      chatMessages.append(element);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getChatReply = (message) => {
      const text = message.toLowerCase();

      if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(text)) {
        return 'Hello! What would you like to know about Kembo Empire?';
      }
      if (/\b(service|services|offer|do you do|provide)\b/.test(text)) {
        return 'We offer video editing, content creation, graphic and logo design, social media management, digital marketing, website and app development, and custom software.';
      }
      if (/\b(price|pricing|cost|budget|quote|charge|rates)\b/.test(text)) {
        return 'Pricing depends on the project scope and requirements. Share a few details through the project inquiry form or WhatsApp and we can prepare a quote.';
      }
      if (/\b(time|timeline|long|deliver|delivery|how soon)\b/.test(text)) {
        return 'Timelines depend on the service and project scope. Tell us what you have in mind through the project inquiry form and we’ll discuss a schedule.';
      }
      if (/\b(start|book|project|contact|reach|talk|whatsapp)\b/.test(text)) {
        return 'You can start by sharing your idea in our project inquiry form, or message us directly on WhatsApp using the links below.';
      }
      if (/\b(website|web|app|software|design|logo|video|editing|marketing|content)\b/.test(text)) {
        return 'That’s one of the areas we can help with. Tell us a little about what you need through the project inquiry form or WhatsApp.';
      }

      return 'I can help with our services, pricing, timelines, or starting a project. You can also reach us through the project inquiry form or WhatsApp below.';
    };

    const sendChatMessage = (message) => {
      const trimmedMessage = message.trim();

      if (!trimmedMessage) {
        return;
      }

      addChatMessage(trimmedMessage, 'user-message');
      addChatMessage(getChatReply(trimmedMessage), 'bot-message');
    };

    chatToggle.addEventListener('click', () => {
      setChatOpen(chatPanel.hidden);
    });

    chatClose.addEventListener('click', () => {
      setChatOpen(false);
    });

    chatForm.addEventListener('submit', event => {
      event.preventDefault();
      sendChatMessage(chatInput.value);
      chatInput.value = '';
      chatInput.focus();
    });

    chatbot.querySelectorAll('[data-chat-question]').forEach(button => {
      button.addEventListener('click', () => {
        if (button instanceof HTMLButtonElement) {
          sendChatMessage(button.dataset.chatQuestion || '');
        }
      });
    });
  }
}

console.log("👑 Kembo Empire — Where Creativity Meets Code.");