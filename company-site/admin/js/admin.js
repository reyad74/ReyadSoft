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
    caseStudies: [
      {id:1,title:'E-commerce Platform: 10M+ Users',client:'TechRetail Inc',outcome:'4x user growth, 99.99% uptime'},
      {id:2,title:'Healthcare App: 500K+ DAU',client:'MediCare Solutions',outcome:'HIPAA compliant, 98% satisfaction'},
      {id:3,title:'AI Analytics Dashboard',client:'FinTech Global',outcome:'95% fraud detection, $5M savings'}
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
  const messagesTableBody = document.querySelector('#messagesTable tbody');
  const statProjects = document.getElementById('statProjects');
  const statMessages = document.getElementById('statMessages');
  const analyticsViews = document.getElementById('analyticsViews');
  const analyticsLeads = document.getElementById('analyticsLeads');
  const analyticsConversion = document.getElementById('analyticsConversion');

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
      tr.innerHTML = `<td>${escapeHtml(cs.title)}</td><td>${escapeHtml(cs.client)}</td><td><small>${escapeHtml(cs.outcome)}</small></td><td><button class="btn btn-sm btn-danger cs-delete" data-id="${cs.id}">Delete</button></td>`;
      caseStudiesTableBody.appendChild(tr);
    });

    messagesTableBody.innerHTML = '';
    store.messages.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(m.name)}</td><td>${escapeHtml(m.email)}</td><td>${escapeHtml(m.message)}</td><td><button class="btn btn-sm btn-danger msg-delete" data-id="${m.id}">Delete</button></td>`;
      messagesTableBody.appendChild(tr);
    });

    statProjects.textContent = store.projects.length;
    statMessages.textContent = store.messages.length;
    analyticsViews.textContent = store.analytics.pageViews.toLocaleString();
    analyticsLeads.textContent = store.analytics.leads;
    analyticsConversion.textContent = store.analytics.conversionRate;
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[ch]; }); }

  // events
  document.getElementById('refreshBtn').addEventListener('click', function(){ render(); });

  document.getElementById('addProjectBtn').addEventListener('click', function(){
    const title = prompt('Project title');
    if(!title) return;
    const category = prompt('Category (Web, Mobile, SaaS)') || 'General';
    const status = prompt('Status (Completed, In Progress)') || 'In Progress';
    const id = Date.now();
    store.projects.push({id,title,category,status});
    saveStore(store);
    render();
  });

  document.getElementById('addCaseBtn').addEventListener('click', function(){
    const title = prompt('Case study title');
    if(!title) return;
    const client = prompt('Client name') || 'Anonymous';
    const outcome = prompt('Key outcome') || 'Great results';
    const id = Date.now();
    store.caseStudies.push({id,title,client,outcome});
    saveStore(store);
    render();
  });

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

  // initial render
  render();
})();