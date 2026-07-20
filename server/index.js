const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: "Metro Rail Ticketing System",
    description: "A metro rail ticketing system built as a group project for EWU CSE103. Served as Team Lead & Backend Developer.",
    tech: ["C"],
    github: "https://github.com/ShahriarOishik/Metro-Rail-Ticketing-System",
    demo: ""
  },
  {
    id: 2,
    title: "Library Management System",
    description: "A library management system built for EWU CSE110 OOP course. Led the team as Team Lead & Full-Stack Developer.",
    tech: ["Java", "CSS"],
    github: "https://github.com/ShahriarOishik/Library-Management-System",
    demo: ""
  },
  {
    id: 3,
    title: "QR Code Maker",
    description: "A Python script that generates QR codes from any given data or URL.",
    tech: ["Python"],
    github: "https://github.com/ShahriarOishik/QR-code-maker",
    demo: ""
  },
  {
    id: 4,
    title: "Chained Hashtable",
    description: "Implementation of a Chained Hash Table data structure for efficient key-value storage and lookup.",
    tech: ["C++"],
    github: "https://github.com/ShahriarOishik/ChainedHastable",
    demo: ""
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A full-stack portfolio website built with React and Express, deployed on Vercel and Render.",
    tech: ["React", "Express", "Node.js"],
    github: "https://github.com/ShahriarOishik/LabFinalPortfolioWebsite",
    demo: ""
  }
];

app.get("/", (req, res) => {
  res.send("Portfolio API is running");
});

app.get("/projects", (req, res) => {
  res.json(projects);
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Contact form submitted:", { name, email, message });

  res.json({ message: "Message received successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
