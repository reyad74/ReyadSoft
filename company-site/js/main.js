// Main JS for small interactions
document.addEventListener('DOMContentLoaded', function(){
  // contact form basic handler
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        alert('Please complete the form.');
        return;
      }
      // For now we just simulate submission
      alert('Thanks, ' + name + '! Your message has been received.');
      form.reset();
    });
  }
});