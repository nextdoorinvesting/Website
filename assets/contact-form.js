/* Contact form */
function sendForm(){
 const n=document.getElementById('c_name').value.trim();
 const e=document.getElementById('c_email').value.trim();
 if(!n||!e){alert('Please add your name and email so I can get back to you.');return;}
 document.getElementById('formArea').innerHTML=
  '<h3 style="font-size:1rem;margin-bottom:.6rem">Message sent.</h3><p style="font-size:.95rem">Thanks, '+n.split(' ')[0]+' — I\'ll get back to you within one business day.</p><p style="font-size:.85rem;color:var(--muted);margin-top:.8rem">— Christian</p>';
}
