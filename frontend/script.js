function registerStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const marks = document.getElementById("marks").value;

  if (!name || !email || !marks) {
    alert("Please fill all fields!");
    return;
  }

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, marks })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      return res.json();
    })
    .then(data => {
      alert(data.message);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("marks").value = "";
      loadStudents(); // Refresh table
    })
    .catch(err => {
      console.error("❌ Registration failed:", err);
      alert("Registration failed. See console for details.");
    });
}

function loadStudents() {
  fetch("/students")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load students");
      }
      return res.json();
    })
    .then(data => {
      const tbody = document.getElementById("studentTableBody");
      tbody.innerHTML = "";
      data.forEach(s => {
        tbody.innerHTML += `
          <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.marks}</td>
          </tr>`;
      });
    })
    .catch(err => {
      console.error("❌ Failed to load students:", err);
      alert("Could not load student list.");
    });
}
