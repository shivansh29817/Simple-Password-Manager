const populateSavedPasswordDetails = () => {
    let table = document.querySelector(".table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    if (passwordDetails == null) {
        table.innerHTML = "No Details Available";
    } else {
        table.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th type="password">Password</th>
            <th>Action</th>
        </tr>`;

        let passwordData = JSON.parse(passwordDetails);
        for (let i = 0; i < passwordData.length; i++) {
            let row = passwordData[i];
            table.innerHTML += `
                <tr>
                    <td>${row.website}</td>
                    <td>${row.username}</td>
                    <td>${row.password}</td>
                    <td><button onclick="deletePassword(${i})">Delete</button></td>
                </tr>
            `;
        }
    }
};

const deletePassword = (index) => {
    let passwordDetails = JSON.parse(localStorage.getItem("passwordDetails"));
    passwordDetails.splice(index, 1);
    localStorage.setItem("passwordDetails", JSON.stringify(passwordDetails));
    populateSavedPasswordDetails();
};

populateSavedPasswordDetails();

document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault();

    let website = document.getElementById('website').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let passwordDetails = localStorage.getItem("passwordDetails");
    if (passwordDetails == null) {
        let passwordJSON = [];
        passwordJSON.push({
            website: website,
            username: username,
            password: password
        });
        alert("Password Details Saved.");
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
    } else {
        let passwordJSON = JSON.parse(passwordDetails);
        passwordJSON.push({
            website: website,
            username: username,
            password: password
        });
        alert("Password Details Saved.");
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
    }

    populateSavedPasswordDetails();
});
