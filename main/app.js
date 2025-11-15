document.addEventListener("DOMContentLoaded", function(){
  const user = window.GymAuth.ensureSessionOrGuest();
  const welcome = document.getElementById("welcomeSpan");
  if(welcome) welcome.textContent = `Hi, ${user.name || "User"}`;

  const profileInfo = document.getElementById("profileInfo");
  function refreshProfile(){
    const fresh = window.GymAuth.getSession();
    if(!fresh) return;
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${fresh.name || "—"}</p>
      <p><strong>Email:</strong> ${fresh.email || "—"}</p>
      <p><strong>Points:</strong> ${fresh.points || 0}</p>
    `;
  }
  refreshProfile();

  const recentList = document.getElementById("recentList");
  function renderRecent(){
    const fresh = window.GymAuth.getSession();
    recentList.innerHTML = "";
    (fresh.workouts || []).slice().reverse().slice(0,6).forEach(w => {
      const li = document.createElement("li");
      li.textContent = `${w.name} — ${w.duration} min — ${w.points} pts`;
      recentList.appendChild(li);
    });
  }
  renderRecent();

  function refreshLeaderboardMini(){
    if(window.GymLeaderboard) window.GymLeaderboard.renderMini("miniLeaderboard");
  }
  refreshLeaderboardMini();

  const form = document.getElementById("workoutForm");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("workoutName").value.trim();
    const duration = parseInt(document.getElementById("workoutDuration").value, 10) || 0;
    const points = parseInt(document.getElementById("workoutPoints").value, 10) || 0;

    const session = window.GymAuth.getSession();
    session.workouts = session.workouts || [];
    session.workouts.push({ name, duration, points, date: new Date().toISOString() });
    session.points = (session.points || 0) + points;

    window.GymAuth.saveUser(session);
    refreshProfile();
    renderRecent();
    refreshLeaderboardMini();
    alert("Workout added — points credited!");
    form.reset();
  });

  const addRandom = document.getElementById("addRandom");
  addRandom.addEventListener("click", function(){
    const presets = [
      ["Morning run", 30, 15],
      ["HIIT", 20, 20],
      ["Cycling", 45, 25],
      ["Yoga", 40, 10],
      ["Push/pull", 50, 30]
    ];
    const p = presets[Math.floor(Math.random()*presets.length)];
    document.getElementById("workoutName").value = p[0];
    document.getElementById("workoutDuration").value = p[1];
    document.getElementById("workoutPoints").value = p[2];
  });

  const resetPoints = document.getElementById("resetPoints");
  resetPoints.addEventListener("click", function(){
    const s = window.GymAuth.getSession();
    if(!s) return alert("No session");
    s.points = 0;
    s.workouts = [];
    window.GymAuth.saveUser(s);
    refreshProfile();
    renderRecent();
    refreshLeaderboardMini();
    alert("Points and workouts reset for your account.");
  });

  const deleteAccount = document.getElementById("deleteAccount");
  deleteAccount.addEventListener("click", function(){
    const s = window.GymAuth.getSession();
    if(!s) return;
    if(confirm("Delete your account permanently? This cannot be undone.")){
      window.GymAuth.deleteAccount(s.id);
    }
  });
});
