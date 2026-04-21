const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML

// Load users
const loadUsers = () => {
    try {
        const data = fs.readFileSync("users.json");
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    let users = loadUsers();

    // Store new user (no validation)
    users.push({ username, password });

    saveUsers(users);

    res.json({ success: true, message: "Data stored successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});