(function(){
  const LS_USERS = "gympush_users";
  const LS_SESSION = "gympush_session";

  function readUsers(){
    const s = localStorage.getItem(LS_USERS);
    return s ? JSON.parse(s) : [];
  }
  function writeUsers(arr){ localStorage.setItem(LS_USERS, JSON.stringify(arr)); }

  function findUserByEmail(email){
    const users = readUsers();
    return users.find(u => u.email.toLowerCase() === (email||"").toLowerCase());
  }

 
  const regForm = document.getElementById("registerForm");
  if(regForm){
    regForm.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const pass = document.getElementById("regPassword").value;
      if(findUserByEmail(email)){
        alert("An account with that email already exists.");
        return;
      }
      const users = readUsers();
      const user = { id: Date.now() + "_" + Math.floor(Math.random()*9999), name: name || email.split("@")[0], email, password: pass, points: 0, workouts: [] };
      users.push(user);
      writeUsers(users);
      localStorage.setItem(LS_SESSION, JSON.stringify({ id: user.id }));
      window.location.href = "dashboard.html";
    });
  }


  const loginForm = document.getElementById("loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", function(e){
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const pass = document.getElementById("loginPassword").value;
      const user = findUserByEmail(email);
      if(!user || user.password !== pass){
        alert("Email or password incorrect.");
        return;
      }
      localStorage.setItem(LS_SESSION, JSON.stringify({ id: user.id }));
      window.location.href = "dashboard.html";
    });
  }

  
  window.GymAuth = {
    getSession: function(){
      const s = localStorage.getItem(LS_SESSION);
      if(!s) return null;
      const sess = JSON.parse(s);
      const users = readUsers();
      return users.find(u => u.id === sess.id) || null;
    },
    logout: function(){
      localStorage.removeItem(LS_SESSION);
      window.location.href = "login.html";
    },
    ensureSessionOrGuest: function(){
      const session = this.getSession();
      if(!session){
        
        const users = readUsers();
        const guest = { id: "guest_"+Date.now(), name: "Guest", email: "", password: "", points:0, workouts: [] };
        users.push(guest);
        writeUsers(users);
        localStorage.setItem(LS_SESSION, JSON.stringify({ id: guest.id }));
        return guest;
      }
      return session;
    },
    deleteAccount: function(userId){
      const users = readUsers().filter(u => u.id !== userId);
      writeUsers(users);
      localStorage.removeItem(LS_SESSION);
      window.location.href = "register.html";
    },
    saveUser: function(user){
      const users = readUsers().map(u => u.id === user.id ? user : u);
      writeUsers(users);
    },
    getAllUsers: readUsers
  };

  
  const btnLogout = document.getElementById("logoutBtn");
  if(btnLogout){
    btnLogout.addEventListener("click", function(){ GymAuth.logout(); });
  }
})();
