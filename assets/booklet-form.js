/* Contractor booklet lead-capture form — sends to Formspree, then redirects to the PDF */
async function sendBooklet(){
 const name = document.getElementById('bk_name').value.trim();
 const email = document.getElementById('bk_email').value.trim();

 if(!name || !email){
   alert('Please add your name and email to get the guide.');
   return;
 }

 const btn = document.querySelector('#boomlet-formArea button');
 const originalText = btn.textContent;
 btn.textContent = 'One moment...';
 btn.disabled = true;

 try {
   const response = await fetch('https://formspree.io/f/xrewbrry', {
     method: 'POST',
     headers: { 'Accept': 'application/json' },
     body: new FormData(document.getElementById('boomletForm'))
   });

   if(response.ok){
     window.location.href = 'assets/contractor-booklet.pdf';
   } else {
     throw new Error('Submission failed');
   }
 } catch (err) {
   alert('Something went wrong. Please try again, or email me directly.');
   btn.textContent = originalText;
   btn.disabled = false;
 }
}
