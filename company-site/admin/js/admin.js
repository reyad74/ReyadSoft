// Admin UI: mock data + localStorage management with analytics and case studies
(function(){
  // require login
  if(!localStorage.getItem('ns_admin_logged_in')){
    window.location.href = 'login.html';
  }

  // mock seed data
  const seed = {
    projects: [
      {id:1,title:'E-commerce Platform',category:'Web',status:'Completed'},
      {id:2,title:'Mobile Health App',category:'Mobile',status:'Completed'},
      {id:3,title:'Analytics Dashboard',category:'SaaS',status:'In Progress'}
    ],
    services: [
      {id:101,title:'Product Strategy & Discovery',short:'Roadmaps, workshops, research'},
      {id:102,title:'UI/UX Design',short:'Design systems and prototypes'},
      {id:103,title:'Web & Mobile Engineering',short:'React, Node.js, APIs'}
    ],
    caseStudies: [
      {id:1,title:'E-commerce Platform: 10M+ Users',client:'TechRetail Inc',outcome:'4x user growth, 99.99% uptime',status:'Published',image:'../images/project1.jpg'},
      {id:2,title:'Healthcare App: 500K+ DAU',client:'MediCare Solutions',outcome:'HIPAA compliant, 98% satisfaction',status:'Published',image:'../images/project2.jpg'},
      {id:3,title:'AI Analytics Dashboard',client:'FinTech Global',outcome:'95% fraud detection, $5M savings',status:'Draft',image:'../images/project3.jpg'}
    ],
    messages: [
      {id:1,name:'Alice',email:'alice@example.com',message:'Interested in a quote for a mobile app.'},
      {id:2,name:'Bob',email:'bob@biz.com',message:'Looking for dev support.'}
    ],
    analytics: {
      pageViews: 12540,
      leads: 245,
      conversionRate: '3.2%'
    }
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
  const projectsTableBody = document.querySelector('#projectsTable tbody');
  const caseStudiesTableBody = document.querySelector('#caseStudiesTable tbody');
  const servicesTableBody = document.querySelector('#servicesTable tbody');
  const messagesTableBody = document.querySelector('#messagesTable tbody');
  const statProjects = document.getElementById('statProjects');
  const statMessages = document.getElementById('statMessages');
  const statServices = document.getElementById('statServices');
  const statCaseStudies = document.getElementById('statCaseStudies');
  const analyticsViews = document.getElementById('analyticsViews');
  const analyticsLeads = document.getElementById('analyticsLeads');
  const analyticsConversion = document.getElementById('analyticsConversion');

  // Bootstrap Modal instances
  const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));
  const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
  const caseModal = new bootstrap.Modal(document.getElementById('caseModal'));

  function render(){
    projectsTableBody.innerHTML = '';
    store.projects.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(p.title)}</td><td>${escapeHtml(p.category)}</td><td><span class="badge bg-${p.status==='Completed'?'success':'info'}">${escapeHtml(p.status)}</span></td><td><button class="btn btn-sm btn-warning proj-edit" data-id="${p.id}">Edit</button> <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}">Delete</button></td>`;
      projectsTableBody.appendChild(tr);
    });

    caseStudiesTableBody.innerHTML = '';
    store.caseStudies.forEach(cs => {
      const tr = document.createElement('tr');
      const statusBg = cs.status==='Published'?'success':cs.status==='Draft'?'warning':'secondary';
      const imgSrc = cs.image || '../images/project1.jpg';
      tr.innerHTML = `<td><img src="${imgSrc}" alt="${escapeHtml(cs.title)}" style="width:80px;height:60px;object-fit:cover;border-radius:4px;"></td><td>${escapeHtml(cs.title)}</td><td>${escapeHtml(cs.client)}</td><td><small>${escapeHtml(cs.outcome)}</small></td><td><span class="badge bg-${statusBg}">${escapeHtml(cs.status)}</span></td><td><button class="btn btn-sm btn-warning cs-edit" data-id="${cs.id}">Edit</button> <button class="btn btn-sm btn-danger cs-delete" data-id="${cs.id}">Delete</button></td>`;
      caseStudiesTableBody.appendChild(tr);
    });

    servicesTableBody.innerHTML = '';
    (store.services||[]).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(s.title)}</td><td>${escapeHtml(s.short||'')}</td><td><button class="btn btn-sm btn-warning svc-edit" data-id="${s.id}">Edit</button> <button class="btn btn-sm btn-danger svc-delete" data-id="${s.id}">Delete</button></td>`;
      servicesTableBody.appendChild(tr);
    });

    messagesTableBody.innerHTML = '';
    store.messages.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.email)}</td><td>${escapeHtml(m.message)}</td><td><button class="btn btn-sm btn-danger msg-delete" data-id="${m.id}">Delete</button></td>`;
      messagesTableBody.appendChild(tr);
    });

    statProjects.textContent = store.projects.length;
    statMessages.textContent = store.messages.length;
    statServices.textContent = (store.services||[]).length;
    statCaseStudies.textContent = store.caseStudies.length;
    analyticsViews.textContent = store.analytics.pageViews.toLocaleString();
    analyticsLeads.textContent = store.analytics.leads;
    analyticsConversion.textContent = store.analytics.conversionRate;
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[ch]; }); }

  // Modal form handlers
  document.getElementById('saveServiceBtn').addEventListener('click', function(){
    const editId = document.getElementById('serviceEditId').value;
    const title = document.getElementById('serviceTitle').value.trim();
    const short = document.getElementById('serviceDesc').value.trim();
    if(!title){ alert('Service title is required'); return; }
    
    if(editId){
      // Edit existing
      const idx = (store.services||[]).findIndex(s=>s.id===Number(editId));
      if(idx>-1){
        store.services[idx] = {id:Number(editId),title,short};
      }
    } else {
      // Add new
      const id = Date.now();
      store.services = store.services || [];
      store.services.push({id,title,short});
    }
    saveStore(store);
    render();
    serviceModal.hide();
    document.getElementById('serviceEditId').value = '';
    document.getElementById('serviceTitle').value = '';
    document.getElementById('serviceDesc').value = '';
    document.getElementById('serviceModalTitle').textContent = 'Add New Service';
  });

  document.getElementById('saveProjectBtn').addEventListener('click', function(){
    const editId = document.getElementById('projectEditId').value;
    const title = document.getElementById('projectTitle').value.trim();
    const category = document.getElementById('projectCategory').value || 'General';
    const status = document.getElementById('projectStatus').value || 'In Progress';
    if(!title){ alert('Project title is required'); return; }
    
    if(editId){
      // Edit existing
      const idx = store.projects.findIndex(p=>p.id===Number(editId));
      if(idx>-1){
        store.projects[idx] = {id:Number(editId),title,category,status};
      }
    } else {
      // Add new
      const id = Date.now();
      store.projects.push({id,title,category,status});
    }
    saveStore(store);
    render();
    projectModal.hide();
    document.getElementById('projectEditId').value = '';
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectCategory').value = '';
    document.getElementById('projectStatus').value = '';
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
  });

  document.getElementById('saveCaseBtn').addEventListener('click', function(){
    const editId = document.getElementById('caseEditId').value;
    const title = document.getElementById('caseTitle').value.trim();
    const client = document.getElementById('caseClient').value.trim() || 'Anonymous';
    const outcome = document.getElementById('caseOutcome').value.trim() || 'Great results';
    const status = document.getElementById('caseStatus').value || 'Draft';
    const imageFile = document.getElementById('caseImage').files[0];
    
    if(!title){ alert('Case study title is required'); return; }
    
    const saveCase = function(image){
      try {
        if(editId){
          // Edit existing
          const idx = store.caseStudies.findIndex(cs=>cs.id===Number(editId));
          if(idx>-1){
            store.caseStudies[idx] = {id:Number(editId),title,client,outcome,status,image};
          }
        } else {
          // Add new
          const id = Date.now();
          store.caseStudies.push({id,title,client,outcome,status,image});
        }
        saveStore(store);
        render();
        caseModal.hide();
        document.getElementById('caseEditId').value = '';
        document.getElementById('caseTitle').value = '';
        document.getElementById('caseClient').value = '';
        document.getElementById('caseOutcome').value = '';
        document.getElementById('caseStatus').value = '';
        document.getElementById('caseImage').value = '';
        document.getElementById('caseModalTitle').textContent = 'Add New Case Study';
        alert('Case study saved successfully!');
      } catch(err) {
        console.error('Error saving case study:', err);
        alert('Error: Storage quota exceeded. Please use smaller images or fewer case studies.');
      }
    };
    
    if(imageFile){
      // Compress image before converting to Base64
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const maxWidth = 400;
          const maxHeight = 300;
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
          saveCase(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.onerror = function(){
        alert('Error reading image file');
      };
      reader.readAsDataURL(imageFile);
    } else if(editId){
      // Keep existing image if editing without uploading new one
      const existing = store.caseStudies.find(cs=>cs.id===Number(editId));
      saveCase(existing ? existing.image : '../images/project1.jpg');
    } else {
      // Use default image for new case study
      saveCase('../images/project1.jpg');
    }
  });

  // Delete handlers
  projectsTableBody.addEventListener('click', function(e){
    if(e.target.matches('.btn-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this project?')){
        const idx = store.projects.findIndex(p=>p.id===id);
        if(idx>-1){ store.projects.splice(idx,1); saveStore(store); render(); }
      }
    }
  });

  caseStudiesTableBody.addEventListener('click', function(e){
    if(e.target.matches('.cs-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this case study?')){
        const idx = store.caseStudies.findIndex(cs=>cs.id===id);
        if(idx>-1){ store.caseStudies.splice(idx,1); saveStore(store); render(); }
      }
    }
    if(e.target.matches('.cs-edit')){
      const id = Number(e.target.dataset.id);
      const cs = store.caseStudies.find(c=>c.id===id);
      if(cs){
        document.getElementById('caseEditId').value = cs.id;
        document.getElementById('caseTitle').value = cs.title;
        document.getElementById('caseClient').value = cs.client;
        document.getElementById('caseOutcome').value = cs.outcome;
        document.getElementById('caseStatus').value = cs.status;
        // Note: file input cannot be pre-populated for security reasons
        document.getElementById('caseImage').value = '';
        document.getElementById('caseModalTitle').textContent = 'Edit Case Study';
        caseModal.show();
      }
    }
  });

  servicesTableBody.addEventListener('click', function(e){
    if(e.target.matches('.svc-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this service?')){
        const idx = (store.services||[]).findIndex(s=>s.id===id);
        if(idx>-1){ store.services.splice(idx,1); saveStore(store); render(); }
      }
    }
    if(e.target.matches('.svc-edit')){
      const id = Number(e.target.dataset.id);
      const svc = (store.services||[]).find(s=>s.id===id);
      if(svc){
        document.getElementById('serviceEditId').value = svc.id;
        document.getElementById('serviceTitle').value = svc.title;
        document.getElementById('serviceDesc').value = svc.short || '';
        document.getElementById('serviceModalTitle').textContent = 'Edit Service';
        serviceModal.show();
      }
    }
  });

  projectsTableBody.addEventListener('click', function(e){
    if(e.target.matches('.btn-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this project?')){
        const idx = store.projects.findIndex(p=>p.id===id);
        if(idx>-1){ store.projects.splice(idx,1); saveStore(store); render(); }
      }
    }
    if(e.target.matches('.proj-edit')){
      const id = Number(e.target.dataset.id);
      const proj = store.projects.find(p=>p.id===id);
      if(proj){
        document.getElementById('projectEditId').value = proj.id;
        document.getElementById('projectTitle').value = proj.title;
        document.getElementById('projectCategory').value = proj.category;
        document.getElementById('projectStatus').value = proj.status;
        document.getElementById('projectModalTitle').textContent = 'Edit Project';
        projectModal.show();
      }
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', function(e){
    e.preventDefault();
    localStorage.removeItem('ns_admin_logged_in');
    window.location.href = 'login.html';
  });

  document.getElementById('refreshBtn').addEventListener('click', function(){ render(); });

  // initial render
  render();
})();