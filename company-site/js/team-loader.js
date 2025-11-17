// Load team members from localStorage and display them on the website
(function(){
  function loadTeamMembers(){
    const raw = localStorage.getItem('ns_site_data');
    if(!raw) return [];
    try {
      const data = JSON.parse(raw);
      // Only show active team members on the public website
      return (data.team || []).filter(tm => tm.status === 'Active');
    } catch(e) {
      return [];
    }
  }

  function loadTeamMembersForAdmin(){
    const raw = localStorage.getItem('ns_site_data');
    if(!raw) return [];
    try {
      const data = JSON.parse(raw);
      return data.team || [];
    } catch(e) {
      return [];
    }
  }

  function escapeHtml(s){
    return (s+'').replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'<','>':'>','"':'"',"'":"&#39;"}[ch];
    });
  }

  function renderTeamSection(){
    const container = document.getElementById('team');
    if(!container) return; // Team section not on this page

    const teamMembers = loadTeamMembers();

    // If no active team members, keep the default hardcoded ones
    if(teamMembers.length === 0) return;

    // Find the leadership team container
    const leadershipContainer = container.querySelector('.row.g-4.mb-5');
    if(!leadershipContainer) return;

    // Clear existing leadership team
    leadershipContainer.innerHTML = '';

    // Add team members from admin panel
    teamMembers.forEach((tm, idx) => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6';

      col.innerHTML = `
        <div class="card team-card h-100 shadow-sm hover-lift">
          <div class="card-body text-center">
            <div class="team-avatar mb-3">
              <img src="${escapeHtml(tm.image || 'images/team1.jpg')}" alt="${escapeHtml(tm.name)}" class="rounded-circle" width="120" height="120">
            </div>
            <h5 class="card-title fw-bold mb-1">${escapeHtml(tm.name)}</h5>
            <p class="text-primary fw-bold mb-2">${escapeHtml(tm.role)}</p>
            <p class="card-text text-muted small">${escapeHtml(tm.bio)}</p>
            <div class="d-flex justify-content-center gap-2 mt-3">
              <a href="#" class="text-muted" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="text-muted" title="Twitter"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      `;

      leadershipContainer.appendChild(col);
    });

    // Update team stats if we have team members
    const teamStats = container.querySelectorAll('.stat-item h3');
    if(teamStats.length >= 1){
      teamStats[0].textContent = teamMembers.length + '+';
    }
  }

  function init(){
    renderTeamSection();
  }

  // Run when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Make functions globally available for admin panel integration
  window.loadTeamMembers = loadTeamMembers;
  window.renderTeamSection = renderTeamSection;
})();
