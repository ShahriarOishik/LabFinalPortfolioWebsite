import { useEffect, useState } from "react";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    alert(data.message || data.error);

    if (response.ok) {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2>Shahriar Oishik</h2>
        <div>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Hello, I am Shahriar</h1>
        <p>CS Student @ East West University | AI & ML Enthusiast</p>
        <div className="social-links">
          <a href="https://github.com/ShahriarOishik" target="_blank" rel="noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://bd.linkedin.com/in/shahriar-oishik" target="_blank" rel="noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I am a Computer Science Student at East West University, immersing myself
          in the fascinating world of AI and Machine Learning. Currently discovering
          the twists and turns of AI courses, where algorithms become my puzzle pieces.
          As a student, I'm not just chasing grades; I'm on a journey of self-discovery
          and growth. I love collaborating on projects and exploring new technologies.
        </p>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul className="skills-list">
          <li>Python</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Java</li>
          <li>C</li>
          <li>C++</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>AI & ML</li>
          <li>Git</li>
        </ul>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
              <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
              {project.demo && (
                <>
                  {" | "}
                  <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Contact Me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default App;
