const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);

$('#year').textContent = new Date().getFullYear();

const menuToggle = $('.menu-toggle');
const links = $('#site-links');
if (menuToggle && links) {
  menuToggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('#site-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const form = $('#estimateForm');
const result = $('#estimateResult');
if (form && result) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const type = String(fd.get('project') || 'garage');
    const sqft = Math.max(0, Number(fd.get('sqft') || 0));
    const condition = String(fd.get('condition') || 'good');
    if (!sqft) {
      result.textContent = 'Enter an approximate square footage to calculate a preliminary estimate.';
      return;
    }

    let low = 0, high = 0, pricingNote = '';
    if (type === 'garage') {
      const base = Math.max(1800, sqft * 6.5);
      let repairLow = 0, repairHigh = 0;
      if (condition === 'minor') { repairLow = sqft * .75; repairHigh = sqft * 1.25; }
      if (condition === 'heavy') { repairLow = sqft * 1.25; repairHigh = sqft * 2; }
      low = base + repairLow;
      high = base + repairHigh;
      if (!repairHigh) high = base;
      pricingNote = 'Garage pricing starts at $6.50/sq ft with a $1,800 minimum. Existing coating removal is quoted separately.';
    } else {
      low = sqft * 7;
      high = sqft * 8.5;
      pricingNote = 'Driveway pricing is a preliminary range. Final exterior pricing requires inspection of the concrete and project conditions.';
    }

    const range = low === high ? money(low) : `${money(low)} – ${money(high)}`;
    const projectName = type === 'garage' ? 'Garage Floor' : 'Driveway';
    result.classList.add('ready');
    result.innerHTML = `<strong>Preliminary ${projectName.toLowerCase()} estimate:</strong><br><span style="font-size:1.5rem;font-weight:900;color:#73bcff">${range}</span><br><span class="fine">${pricingNote}</span><br><br><button type="button" class="btn" id="emailRequest">Email This Request</button>`;

    const emailButton = $('#emailRequest');
    emailButton?.addEventListener('click', () => {
      const name = String(fd.get('name') || '');
      const phone = String(fd.get('phone') || '');
      const email = String(fd.get('email') || '');
      const zip = String(fd.get('zip') || '');
      const timing = String(fd.get('timing') || '');
      const conditionLabel = form.elements.condition.options[form.elements.condition.selectedIndex].text;
      const subject = `Estimate Request - ${projectName} - ${name || 'Website Lead'}`;
      const body = [
        'Alpha Galaxy Coatings estimate request',
        '',
        `Name: ${name}`,
        `Phone: ${phone || 'Not provided'}`,
        `Email: ${email || 'Not provided'}`,
        `Project: ${projectName}`,
        `Approx. square footage: ${sqft}`,
        `Concrete condition: ${conditionLabel}`,
        `ZIP code: ${zip || 'Not provided'}`,
        `Desired timing: ${timing}`,
        `Website preliminary range: ${range}`,
        '',
        'I understand this is a preliminary estimate and final pricing requires project review/inspection.'
      ].join('\n');
      window.location.href = `mailto:alphagalaxycoatings@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, {once:true});
  });
}

const lightbox = $('#lightbox');
const lightboxImage = $('#lightboxImage');
if (lightbox && lightboxImage) {
  $$('[data-lightbox]').forEach(item => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.lightbox;
    lightbox.showModal();
  }));
  $('.lightbox-close')?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}
