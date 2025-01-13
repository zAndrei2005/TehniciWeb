document.getElementById("gymForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const dob = document.getElementById("dob").value;
    const experience = document.getElementById("experience").value;
    const objectives = Array.from(document.querySelectorAll("input[name='objective']:checked")).map(o => o.value);
    const membership = document.querySelector("input[name='membership']:checked").value;
    const difficulty = document.getElementById("slider").value;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;
    let errors = "";

    if (!nameRegex.test(name)) {
        isValid = false;
        errors += "Numele trebuie să conțină doar litere și spații.\n";
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        errors += "Adresa de email este invalidă.\n";
    }

    if (!dob || new Date(dob) >= new Date()) {
        isValid = false;
        errors += "Data nașterii trebuie să fie validă și în trecut.\n";
    }

    if (!isValid) {
        alert(errors);
        return;
    }

    const formData = { name, email, dob, experience, objectives, membership, difficulty };
    localStorage.setItem("gymFormData", JSON.stringify(formData));
    alert("Te-ai înscris cu succes la sală!"); //salv datele
});

document.getElementById("slider").addEventListener("input", function (event) {
    document.getElementById("sliderValue").textContent = event.target.value;
});

document.getElementById("toggleColor").addEventListener("click", function () {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
});

console.log("Număr aleatoriu pentru dificultate sugerată:", Math.ceil(Math.random() * 10));
