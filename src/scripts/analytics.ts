// GA4 Conversion Tracking for Iceberg Media Themes
// Tracks: form submissions, WhatsApp clicks, phone clicks, theme selections

document.addEventListener('DOMContentLoaded', () => {
	// Track contact form submissions
	const contactForm = document.getElementById('theme-contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', () => {
			gtag('event', 'generate_lead', {
				event_category: 'engagement',
				event_label: 'theme_contact_form',
				value: 1,
			});
		});
	}

	// Track WhatsApp clicks
	document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
		link.addEventListener('click', () => {
			gtag('event', 'contact', {
				event_category: 'engagement',
				event_label: 'whatsapp_click',
				method: 'whatsapp',
			});
		});
	});

	// Track phone clicks
	document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
		link.addEventListener('click', () => {
			gtag('event', 'contact', {
				event_category: 'engagement',
				event_label: 'phone_click',
				method: 'phone',
			});
		});
	});

	// Track "Get Started" button clicks (theme selection)
	document.querySelectorAll('a[href*="#contact-form"]').forEach((link) => {
		link.addEventListener('click', () => {
			gtag('event', 'select_item', {
				event_category: 'engagement',
				event_label: 'theme_get_started',
			});
		});
	});

	// Track "Get a Quote" header button
	document.querySelectorAll('.button-primary[href="#contact-form"]').forEach((link) => {
		link.addEventListener('click', () => {
			gtag('event', 'begin_checkout', {
				event_category: 'engagement',
				event_label: 'get_a_quote',
			});
		});
	});

	// Track external theme links (View Source, Live Demo)
	document.querySelectorAll('a[rel*="nofollow"]').forEach((link) => {
		link.addEventListener('click', () => {
			gtag('event', 'click', {
				event_category: 'outbound',
				event_label: link.href,
			});
		});
	});
});
