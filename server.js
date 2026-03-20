const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('.')); // Servir archivos estáticos desde la raíz

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rutas para JSONs
app.get('/json/documentos', (req, res) => {
    res.sendFile(path.join(__dirname, 'json/documentos.json'));
});

app.get('/json/ubicaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'json/ubicaciones.json'));
});

// API Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        message: 'Neptuno JSON API está funcionando',
        timestamp: new Date()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'No encontrado',
        path: req.path 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✓ Neptuno JSON API escuchando en puerto ${PORT}`);
    console.log(`✓ Documentos: http://localhost:${PORT}/json/documentos`);
    console.log(`✓ Ubicaciones: http://localhost:${PORT}/json/ubicaciones`);
});
