const userDB = [
  { username: "barista", password: "coffee4life" },
  { username: "admin", password: "admin123" }
];

function attemptLogin() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const result = document.getElementById("result");

  const query = `SELECT * FROM users WHERE username = '${u}' AND password = '${p}'`;
  console.log("Simulated query:", query);

  if (
    (u === "barista" && p === "coffee4life") || 
    (u.includes("'") || p.includes("'")) && (p.includes("1=1") || u.includes("1=1"))
  ) {
    result.textContent = "Access granted!";
    localStorage.setItem('solved-24', true);
    window.parent.postMessage({type: 'challengeSolved', id: 24}, '*');
  } else {
    result.textContent = "Invalid login.";
  }
}
