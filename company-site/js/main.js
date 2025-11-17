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
      // Save submission to localStorage so admin can view messages
      try{
        const raw = localStorage.getItem('ns_site_data');
        let store = raw?JSON.parse(raw):{};
        store.messages = store.messages || [];
        const id = Date.now();
        store.messages.push({id,name,email,message});
        localStorage.setItem('ns_site_data', JSON.stringify(store));
      }catch(err){
        console.error('Could not save message locally', err);
      }
      // friendly confirmation
      alert('Thanks, ' + name + '! Your message has been received.');
      form.reset();
    });
  }
});