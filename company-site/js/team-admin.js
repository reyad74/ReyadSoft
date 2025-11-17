// Team Admin UI for team.html page - simplified version without login requirement
(function(){
  // mock seed data for team management
  const seed = {
    team: [
      {id:1,name:'Reyad Hossain',role:'CEO & Founder',bio:'Visionary leader with 15+ years in software development and AI innovation. Drives strategic direction and client partnerships.',status:'Active',image:'images/team-lead.jpg'},
      {id:2,name:'Sarah Chen',role:'Chief Technology Officer',bio:'AI/ML expert leading technical architecture and innovation. Previously at Google and Microsoft Research.',status:'Active',image:'images/team-cto.jpg'},
      {id:3,name:'Marcus Rodriguez',role:'Head of Design',bio:'Award-winning UX/UI designer crafting intuitive experiences. Former design lead at Airbnb and Spotify.',status:'Active',image:'images/team-design.jpg'}
    ]
  };

  function getStore(){
    const raw = localStorage.getItem('ns_site_data');
    if(raw){
      try { return JSON.parse(raw); } catch(e){ return seed; }
    }
    localStorage.setItem('ns_site_data', JSON.stringify(seed));
    return seed;
  }

  function saveStore(data){ localStorage.setItem('ns_site_data', JSON.stringify(data)); }

  const store = getStore();

  // DOM helpers
  const teamTableBody = document.querySelector('#teamTable tbody');

  // Bootstrap Modal instance
  const teamModal = new bootstrap.Modal(document.getElementById('teamModal'));

  function render(){
    teamTableBody.innerHTML = '';
    (store.team||[]).forEach(t => {
      const tr = document.createElement('tr');
      const statusBg = t.status==='Active'?'success':'secondary';
      const imgSrc = t.image || 'images/team1.jpg';
      tr.innerHTML = `<td><img src="${imgSrc}" alt="${escapeHtml(t.name)}" style="width:60px;height:60px;object-fit:cover;border-radius:50%;"></td><td>${escapeHtml(t.name)}</td><td>${escapeHtml(t.role)}</td><td><small>${escapeHtml(t.bio)}</small></td><td><span class="badge bg-${statusBg}">${escapeHtml(t.status)}</span></td><td><button class="btn btn-sm btn-warning team-edit" data-id="${t.id}">Edit</button> <button class="btn btn-sm btn-danger team-delete" data-id="${t.id}">Delete</button></td>`;
      teamTableBody.appendChild(tr);
    });
  }

  // Function to refresh team display on the main team page
  function refreshTeamDisplay(){
    // Trigger the team loader to update the display
    if(typeof renderTeamSection === 'function'){
      renderTeamSection();
    }
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'<','>':'>','"':'"',"'":"&#39;"}[ch]; }); }

  // Modal form handler
  document.getElementById('saveTeamBtn').addEventListener('click', function(){
    const editId = document.getElementById('teamEditId').value;
    const name = document.getElementById('teamName').value.trim();
    const role = document.getElementById('teamRole').value.trim();
    const bio = document.getElementById('teamBio').value.trim();
    const status = document.getElementById('teamStatus').value || 'Active';
    const imageFile = document.getElementById('teamImage').files[0];

    if(!name){ alert('Team member name is required'); return; }

    const saveTeam = function(image){
      try {
        if(editId){
          // Edit existing
          const idx = (store.team||[]).findIndex(t=>t.id===Number(editId));
          if(idx>-1){
            store.team[idx] = {id:Number(editId),name,role,bio,status,image};
          }
        } else {
          // Add new
          const id = Date.now();
          store.team = store.team || [];
          store.team.push({id,name,role,bio,status,image});
        }
        saveStore(store);
        render();
        refreshTeamDisplay();
        teamModal.hide();
        document.getElementById('teamEditId').value = '';
        document.getElementById('teamName').value = '';
        document.getElementById('teamRole').value = '';
        document.getElementById('teamBio').value = '';
        document.getElementById('teamStatus').value = '';
        document.getElementById('teamImage').value = '';
        document.getElementById('teamModalTitle').textContent = 'Add New Team Member';
        alert('Team member saved successfully!');
      } catch(err) {
        console.error('Error saving team member:', err);
        alert('Error: Storage quota exceeded. Please use smaller images or fewer team members.');
      }
    };

    if(imageFile){
      // Compress image before converting to Base64
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const maxWidth = 200;
          const maxHeight = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          saveTeam(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.onerror = function(){
        alert('Error reading image file');
      };
      reader.readAsDataURL(imageFile);
    } else if(editId){
      // Keep existing image if editing without uploading new one
      const existing = (store.team||[]).find(t=>t.id===Number(editId));
      saveTeam(existing ? existing.image : 'images/team1.jpg');
    } else {
      // Use default image for new team member
      saveTeam('images/team1.jpg');
    }
  });

  // Delete and edit handlers
  teamTableBody.addEventListener('click', function(e){
    if(e.target.matches('.team-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this team member?')){
        const idx = (store.team||[]).findIndex(t=>t.id===id);
        if(idx>-1){ store.team.splice(idx,1); saveStore(store); render(); refreshTeamDisplay(); }
      }
    }
    if(e.target.matches('.team-edit')){
      const id = Number(e.target.dataset.id);
      const tm = (store.team||[]).find(t=>t.id===id);
      if(tm){
        document.getElementById('teamEditId').value = tm.id;
        document.getElementById('teamName').value = tm.name;
        document.getElementById('teamRole').value = tm.role;
        document.getElementById('teamBio').value = tm.bio;
        document.getElementById('teamStatus').value = tm.status;
        // Note: file input cannot be pre-populated for security reasons
        document.getElementById('teamImage').value = '';
        document.getElementById('teamModalTitle').textContent = 'Edit Team Member';
        teamModal.show();
      }
    }
  });

  // initial render
  render();

  // Make render function globally available for external use
  window.renderTeamAdmin = render;
})();
