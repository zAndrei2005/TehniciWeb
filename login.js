document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // cerere ajax pt autentif
    fetch("utilizatori.json")
        .then((response) => {
            if (!response.ok) throw new Error("Eroare la încărcarea utilizatorilor.");
            return response.json();
        })
        .then((users) => {
            const user = users.find((u) => u.username === username && u.password === password);

            if (user) {
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                showDashboard(user);
            } else {
                alert("Nume utilizator sau parolă incorecte.");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Eroare la autentificare.");
        });
});

document.getElementById("logout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
});

// afis dash dupa autentif
function showDashboard(user) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("welcome-user").textContent = user.username;

    // cerere ajax pt abonam 
    fetch("abonamente.json")
        .then((response) => {
            if (!response.ok) throw new Error("Eroare la încărcarea abonamentelor.");
            return response.json();
        })
        .then((abonamente) => {
            const offersContainer = document.getElementById("offers");
            offersContainer.innerHTML = "";

            abonamente.forEach((abonament) => {
                const offerDiv = document.createElement("div");
                offerDiv.className = "offer";
                offerDiv.innerHTML = `
                    <h4>${abonament.tip}</h4>
                    <p>Durată: ${abonament.durata} luni</p>
                    <p>Preț: ${abonament.pret} RON</p>
                `;
                offersContainer.appendChild(offerDiv);
            });
        })
        .catch((error) => {
            console.error(error);
            alert("Eroare la încărcarea abonamentelor.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
        showDashboard(currentUser);
    }
});
