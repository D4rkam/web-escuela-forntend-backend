const express = require("express");
const admin = require("firebase-admin");
const path = require("path");

// Inicializar Firebase Admin
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "src"))); // Sirve los archivos JavaScript de `src`

// Ruta para servir el login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para servir el dashboard
app.get("/dashboard", (req, res) => {
  const sessionCookie = req.cookies.__session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      res.sendFile(path.join(__dirname, "/public/dashboard.html"));
    })
    .catch(() => {
      res.redirect("/login");
    });
});

// Ruta para servir el login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "register.html"));
});

app.get("/mesas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "mesas_examen.html"));
});

app.get("/informatica", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "informatica.html"));
});

app.get("/energias_renovables", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "pages", "energias_renovables.html")
  );
});

app.get("/electromecanica", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "electromecanica.html"));
});

app.get("/anuncios", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "anuncios.html"));
});

// Cualquier otra ruta que no exista
app.use((req, res) => {
  res.status(404).send(`La página solicitada no existe`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
