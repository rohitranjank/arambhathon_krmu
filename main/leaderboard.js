(function(){
  function getAllUsers(){
    const s = localStorage.getItem("gympush_users");
    return s ? JSON.parse(s) : [];
  }

  function sortedLeaderboard(){
    return getAllUsers().slice().sort((a,b) => (b.points||0) - (a.points||0));
  }

  window.GymLeaderboard = {
    topN: function(n = 5){
      return sortedLeaderboard().slice(0,n);
    },
    renderMini: function(containerId){
      const el = document.getElementById(containerId);
      if(!el) return;
      el.innerHTML = "";
      this.topN(5).forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.name || u.email || "Anon"} — ${u.points||0} pts`;
        el.appendChild(li);
      });
    },
    renderFull: function(containerId){
      const el = document.getElementById(containerId);
      if(!el) return;
      el.innerHTML = "";
      sortedLeaderboard().forEach((u, idx) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>#${idx+1} ${u.name || u.email || 'Anon'}</strong><span>${u.points||0} pts</span>`;
        el.appendChild(li);
      });
    }
  };

  document.addEventListener("DOMContentLoaded", function(){
    if(document.getElementById("leaderboardList")){
      GymLeaderboard.renderFull("leaderboardList");
    }
    if(document.getElementById("miniLeaderboard")){
      GymLeaderboard.renderMini("miniLeaderboard");
    }
  });
})();
