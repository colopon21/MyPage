const express = require("express");
const path = require("path");

const app = express();

const root = {
    "viewer": "src/views/",
    "static": "src/static/",  // この設定は静的ファイルのパスを指定。
    "/": "viewer:index.html",
    "/about": "viewer:about.html"
};

app.use("/static", express.static(path.join(__dirname, root.static)));

for (let route in root) {
    if (route !== "static" && route !== "viewer") {
        let filePath = root[route].split(":");
        let viewFolder = root.viewer;
        let fileName = filePath[1];
        
        app.get(route, (req, res) => {
            res.sendFile(path.join(__dirname, viewFolder, fileName));
        });
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
