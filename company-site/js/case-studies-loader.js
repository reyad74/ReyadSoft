// Load case studies from localStorage and display them on the website
(function(){
  function loadCaseStudies(){
    const raw = localStorage.getItem('ns_site_data');
    if(!raw) return [];
    try {
      const data = JSON.parse(raw);
      // Only show published case studies on the public website
      return (data.caseStudies || []).filter(cs => cs.status === 'Published');
    } catch(e) {
      return [];
    }
  }

  function escapeHtml(s){
    return (s+'').replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'<','>':'>','"':'"',"'":"&#39;"}[ch];
    });
  }

  function renderCaseStudiesGrid(){
    const container = document.getElementById('caseStudiesContainer');
    if(!container) return; // Container not on this page

    const caseStudies = loadCaseStudies();

    // If no published case studies, show default ones
    if(caseStudies.length === 0) return;

    // Clear existing content but keep first 3 slots or add to them
    const cards = container.querySelectorAll('.col-lg-4');

    caseStudies.forEach((cs, idx) => {
      let card = cards[idx];

      // If we don't have enough cards, create new ones
      if(!card){
        const newCol = document.createElement('div');
        newCol.className = 'col-lg-4 col-md-6';
        container.appendChild(newCol);
        card = newCol;
      }

      const categoryBadges = cs.category ? cs.category.split(',').map(c => c.trim()) : [];
      const badges = categoryBadges.length > 0
        ? categoryBadges.map((cat, i) => `<span class="badge ${i === 0 ? 'bg-info text-dark' : 'bg-success text-dark'} me-2">${escapeHtml(cat)}</span>`).join('')
        : '<span class="badge bg-primary text-white me-2">Case Study</span>';

      card.innerHTML = `
        <div class="card project-card h-100 shadow-sm hover-lift">
          <img src="${escapeHtml(cs.image || '../images/project1.jpg')}" class="card-img-top" alt="${escapeHtml(cs.title)}" style="height:200px; object-fit:cover;">
          <div class="card-body">
            <h5 class="card-title fw-bold">${escapeHtml(cs.title)}</h5>
            <p class="card-text text-muted"><small>${escapeHtml(cs.outcome)}</small></p>
            <p class="card-text text-muted small mb-3"><strong>Client:</strong> ${escapeHtml(cs.client)}</p>
            <div class="mt-3 pt-3 border-top">
              ${badges}
            </div>
          </div>
        </div>
      `;
    });
  }

  function renderDetailedCaseStudies(){
    const mainContainer = document.querySelector('main');
    if(!mainContainer || !mainContainer.classList.contains('container')) return;

    const caseStudies = loadCaseStudies();

    // Find the main content area (after the h1 and p tags)
    const h1 = mainContainer.querySelector('h1');
    const hr = mainContainer.querySelector('hr');

    if(!h1 || !hr) return; // Not the case studies detail page

    // Insert new case studies after the intro and first HR
    let insertPoint = hr;

    caseStudies.forEach((cs, idx) => {
      const row = document.createElement('div');
      row.className = 'row g-4 mb-5 align-items-center' + (idx % 2 === 1 ? ' flex-lg-row-reverse' : '');

      row.innerHTML = `
        <div class="col-lg-6">
          <img src="${escapeHtml(cs.image || '../images/project1.jpg')}" class="card-img-top rounded" alt="${escapeHtml(cs.title)}" style="width:100%; height:300px; object-fit:cover;">
        </div>
        <div class="col-lg-6">
          <span class="badge bg-info text-dark mb-3">${escapeHtml(cs.client)}</span>
          <h3 class="fw-bold mb-3">${escapeHtml(cs.title)}</h3>
          <p class="text-muted">${escapeHtml(cs.outcome)}</p>

          <h6 class="fw-bold mt-4">Key Results</h6>
          <ul class="list-unstyled">
            <li class="mb-2">✅ ${escapeHtml(cs.outcome)}</li>
          </ul>

          <h6 class="fw-bold mt-4">Client</h6>
          <p class="text-muted small">${escapeHtml(cs.client)}</p>

          <a href="contact.html" class="btn btn-primary mt-4">Discuss Your Project</a>
        </div>
      `;

      insertPoint.parentNode.insertBefore(row, insertPoint.nextSibling);

      // Add HR after each case study
      const newHr = document.createElement('hr');
      newHr.className = 'my-5';
      insertPoint.parentNode.insertBefore(newHr, row.nextSibling);
      insertPoint = newHr;
    });
  }

  function init(){
    // Check which page we're on
    if(document.getElementById('caseStudiesContainer')){
      renderCaseStudiesGrid();
    } else {
      renderDetailedCaseStudies();
    }
  }

  // Run when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
