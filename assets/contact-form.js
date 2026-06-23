/* Contact form — sends to Formspree, then shows confirmation */
async function sendForm(){
 const name = document.getElementById('c_name').value.trim();
 const email = document.getElementById('c_email').value.trim();

 if(!name || !email){
   alert('Please add your name and email so I can get back to you.');
   return;
 }

 const btn = document.querySelector('#formArea button');
 const originalText = btn.textContent;
 btn.textContent = 'Sending...';
 btn.disabled = true;

 try {
   const response = await fetch('https://formspree.io/f/xrewbrry', {
     method: 'POST',
     headers: { 'Accept': 'application/json' },
     body: new FormData(document.getElementById('contactForm'))
   });

   if(response.ok){
     document.getElementById('formArea').innerHTML =
       '<h3 style="font-size:1rem;margin-bottom:.6rem">Message sent.</h3>' +
       '<p style="font-size:.95rem">Thanks, ' + name.split(' ')[0] + ' I\'ll get back to you within one business day.</p>' +
       '<p style="font-size:.85rem;color:var(--muted);margin-top:.8rem">— Christian</p>';
   } else {
     throw new Error('Form submission failed');
   }
 } catch (err) {
   alert('Something went wrong sending your message. Please try again, or email me directly.');
   btn.textContent = originalText;
   btn.disabled = false;
 }
}
