// Import built-in Node.js modules
const path = require('path');
const fs = require('fs');
// Import third-party module (from 'npm i express')
const express = require('express');
const app = express();

const Port = process.env.PORT || 3000;

const DATA = path.join(__dirname, 'leads.json');



// --- 3. Middleware Configuration ---
// 'app.use()' adds middleware. Middleware runs on *every* request before our routes.
// This middleware parses incoming request bodies with URL-encoded payloads (like HTML forms).
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



// --- 4. Data Helper Functions ---
// This function safely reads the leads from 'leads.json'.
function readLeads() {
    if (!fs.existsSync(DATA)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(DATA, 'utf-8'));
}
function writeLeads(leads) {
    fs.writeFileSync(DATA, JSON.stringify(leads, null, 2));
}

/* --- 5. API Routes (The server's brain) --- */

// [R]ead: Handle GET requests to '/api/leads' to read and filter all leads.
app.get("/api/leads", (req, res)=>{
  const q = (req.query.q || "").toLowerCase();
  const status = (req.query.status || "").toLowerCase();
  let list = readLeads();
  if (q) list = list.filter(l => (l.name + l.company).toLowerCase().includes(q));
  
  if (status) list = list.filter(l => l.status.toLowerCase() === status);
  res.json(list);
});
// [C]reate: Handle POST requests to '/api/leads' to create a new lead.
app.post("/api/leads", (req, res)=>{
  const {name, email, company, source, notes} = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });
  const leads = readLeads();
  const lead = {id: Date.now().toString(), name, email, company: company || "", source: source || "", notes: notes || "", status: "New", createdAt: new Date().toISOString()};
  leads.push(lead); 
  writeLeads(leads); 
  res.status(201).json(lead); 
});


// [U]pdate: Handle PATCH requests to '/api/leads/:id' to update a lead.
app.patch("/api/leads/:id", (req, res)=>{
    const leads = readLeads();
     const idx = leads.findIndex(l => l.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Lead not found" });
    
    const allowed = ['status', 'notes'];
    for (const k of allowed) {
        if (req.body[k] !== undefined) {
            leads[idx][k] = req.body[k];
        }
    }
    writeLeads(leads);
    res.json(leads[idx]);
});
// --- 6. Root Route ---
// Handle GET requests to the root URL (e.g., http://localhost:3000/)
app.get("/", (req, res)=> res.sendFile(path.join(__dirname, 'public', 'index.html')));
// --- 7. Server Start ---
// Start the server and listen for connections on the defined PORT.
app.listen(Port, () => console.log(`Server running on http://localhost:${Port}`));
