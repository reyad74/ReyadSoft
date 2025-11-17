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
      {id:1,title:'E-commerce Platform: 10M+ Users',client:'TechRetail Inc',outcome:'4x user growth, 99.99% uptime',status:'Published'},
      {id:2,title:'Healthcare App: 500K+ DAU',client:'MediCare Solutions',outcome:'HIPAA compliant, 98% satisfaction',status:'Published'},
      {id:3,title:'AI Analytics Dashboard',client:'FinTech Global',outcome:'95% fraud detection, $5M savings',status:'Draft'}
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
      tr.innerHTML = `<td>${escapeHtml(p.title)}</td><td>${escapeHtml(p.category)}</td><td><span class="badge bg-${p.status==='Completed'?'success':'info'}">${escapeHtml(p.status)}</span></td><td><button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}">Delete</button></td>`;
      projectsTableBody.appendChild(tr);
    });

    caseStudiesTableBody.innerHTML = '';
    store.caseStudies.forEach(cs => {
      const tr = document.createElement('tr');
      const statusBg = cs.status==='Published'?'success':cs.status==='Draft'?'warning':'secondary';
      tr.innerHTML = `<td>${escapeHtml(cs.title)}</td><td>${escapeHtml(cs.client)}</td><td><small>${escapeHtml(cs.outcome)}</small></td><td><span class="badge bg-${statusBg}">${escapeHtml(cs.status)}</span></td><td><button class="btn btn-sm btn-danger cs-delete" data-id="${cs.id}">Delete</button></td>`;
      caseStudiesTableBody.appendChild(tr);
    });

    servicesTableBody.innerHTML = '';
    (store.services||[]).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(s.title)}</td><td>${escapeHtml(s.short||'')}</td><td><button class="btn btn-sm btn-danger svc-delete" data-id="${s.id}">Delete</button></td>`;
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
    const title = document.getElementById('serviceTitle').value.trim();
    const short = document.getElementById('serviceDesc').value.trim();
    if(!title){ alert('Service title is required'); return; }
    const id = Date.now();
    store.services = store.services || [];
    store.services.push({id,title,short});
    saveStore(store);
    render();
    serviceModal.hide();
    document.getElementById('serviceTitle').value = '';
    document.getElementById('serviceDesc').value = '';
  });

  document.getElementById('saveProjectBtn').addEventListener('click', function(){
    const title = document.getElementById('projectTitle').value.trim();
    const category = document.getElementById('projectCategory').value || 'General';
    const status = document.getElementById('projectStatus').value || 'In Progress';
    if(!title){ alert('Project title is required'); return; }
    const id = Date.now();
    store.projects.push({id,title,category,status});
    saveStore(store);
    render();
    projectModal.hide();
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectCategory').value = '';
    document.getElementById('projectStatus').value = '';
  });

  document.getElementById('saveCaseBtn').addEventListener('click', function(){
    const title = document.getElementById('caseTitle').value.trim();
    const client = document.getElementById('caseClient').value.trim() || 'Anonymous';
    const outcome = document.getElementById('caseOutcome').value.trim() || 'Great results';
    const status = document.getElementById('caseStatus').value || 'Draft';
    if(!title){ alert('Case study title is required'); return; }
    const id = Date.now();
    store.caseStudies.push({id,title,client,outcome,status});
    saveStore(store);
    render();
    caseModal.hide();
    document.getElementById('caseTitle').value = '';
    document.getElementById('caseClient').value = '';
    document.getElementById('caseOutcome').value = '';
    document.getElementById('caseStatus').value = '';
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
  });

  servicesTableBody.addEventListener('click', function(e){
    if(e.target.matches('.svc-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this service?')){
        const idx = (store.services||[]).findIndex(s=>s.id===id);
        if(idx>-1){ store.services.splice(idx,1); saveStore(store); render(); }
      }
    }
  });

  messagesTableBody.addEventListener('click', function(e){
    if(e.target.matches('.msg-delete')){
      const id = Number(e.target.dataset.id);
      if(confirm('Delete this message?')){
        const idx = store.messages.findIndex(m=>m.id===id);
        if(idx>-1){ store.messages.splice(idx,1); saveStore(store); render(); }
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