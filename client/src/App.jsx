import { useEffect, useState, useRef, useCallback } from "react";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeSkill, setActiveSkill] = useState(null);
  const [particles, setParticles] = useState([]);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [visited, setVisited] = useState(() => {
    return parseInt(localStorage.getItem("portfolio-visits") || "0");
  });
  const canvasRef = useRef(null);
  const particleIdRef = useRef(0);

  const fullText = "CS @ EWU · UTA · Competitive Programmer";

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        setTimeout(() => {
          setIsTyping(true);
          setTypedText("");
        }, 3000);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [isTyping]);

  // Visit counter
  useEffect(() => {
    const newCount = visited + 1;
    setVisited(newCount);
    localStorage.setItem("portfolio-visits", newCount.toString());
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch projects
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  // Mouse particle trail
  const handleMouseMove = useCallback((e) => {
    const id = particleIdRef.current++;
    const newParticle = {
      id,
      x: e.clientX,
      y: e.clientY,
      color: `hsl(${Math.random() * 60 + 240}, 80%, 65%)`,
      size: Math.random() * 6 + 3
    };
    setParticles((prev) => [...prev.slice(-20), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 600);
  }, []);

  // Click counter & combo
  const handleBodyClick = useCallback((e) => {
    if (e.target.closest("a, button, input, textarea, .project-card, .skill-tag")) return;
    setClickCount((prev) => prev + 1);
    setComboCount((prev) => prev + 1);
    setShowCombo(true);
    setTimeout(() => setShowCombo(false), 800);
    setTimeout(() => setComboCount(0), 2000);
  }, []);

  // Easter egg at 10 clicks
  useEffect(() => {
    if (clickCount >= 10) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
      setClickCount(0);
    }
  }, [clickCount]);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    alert(data.message || data.error);
    if (response.ok) {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const skillLevels = {
    Python: 85,
    Java: 75,
    C: 80,
    "C++": 70,
    JavaScript: 72,
    React: 65,
    "Node.js": 60,
    Express: 62,
    HTML: 90,
    CSS: 78,
    "Git & GitHub": 80,
    "AI & ML": 55,
    "Data Structures": 78,
    Algorithms: 75,
    OOP: 82
  };

  const skillColors = {
    Python: "#3776ab",
    Java: "#f89820",
    C: "#03599c",
    "C++": "#00599c",
    JavaScript: "#f7df1e",
    React: "#61dafb",
    "Node.js": "#339933",
    Express: "#ffffff",
    HTML: "#e34f26",
    CSS: "#1572b6",
    "Git & GitHub": "#f05032",
    "AI & ML": "#ff6f61",
    "Data Structures": "#a78bfa",
    Algorithms: "#60a5fa",
    OOP: "#34d399"
  };

  return (
    <div className="container" onMouseMove={handleMouseMove} onClick={handleBodyClick}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Particle Trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color
          }}
        />
      ))}

      {/* Combo Indicator */}
      {showCombo && comboCount > 1 && (
        <div className="combo-indicator">{comboCount}x Combo!</div>
      )}

      {/* Easter Egg */}
      {showEasterEgg && (
        <div className="easter-egg">
          You found the secret! +10 XP
        </div>
      )}

      <nav className="navbar">
        <h2>Shahriar Oishik</h2>
        <div>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#competitive">CP</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Hello, I am Shahriar</h1>
        <p className="typing-text">
          {typedText}<span className="cursor">|</span>
        </p>
        <div className="xp-badge">
          <span className="xp-icon">⭐</span>
          <span>Visitor #{visited}</span>
        </div>
        <div className="social-links">
          <a href="https://github.com/ShahriarOishik" target="_blank" rel="noreferrer" className="social-icon github-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://bd.linkedin.com/in/shahriar-oishik" target="_blank" rel="noreferrer" className="social-icon linkedin-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <p>
          I am a Computer Science Student at East West University with a passion
          for AI, Machine Learning, and problem-solving. As an Undergraduate
          Teaching Assistant for 7 months, I help fellow students master programming concepts
          and algorithms. Outside the classroom, I compete in programming
          contests and love turning complex problems into elegant solutions.
        </p>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        <div className="experience-list">
          <div className="experience-card">
            <div className="experience-header">
              <h3>Undergraduate Teaching Assistant</h3>
              <span className="experience-date">Jan 2026 - Present · 7 mos.</span>
            </div>
            <p className="experience-company">East West University — Dept. of CSE</p>
            <ul className="experience-details">
              <li>Assist professors in course delivery and academic support for undergraduate students</li>
              <li>Provide technical mentorship on programming concepts, data structures, and algorithms</li>
              <li>Grade assignments and manage digital resources for faculty-student communication</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="achievements">
        <h2>Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-number">3.94</div>
            <p>CGPA on a 4.0 scale</p>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">7mo</div>
            <p>Teaching Assistant</p>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">5+</div>
            <p>GitHub Projects</p>
          </div>
          <div className="achievement-card">
            <div className="achievement-number">EWU</div>
            <p>Computer Science, B.Sc</p>
          </div>
        </div>
      </section>

      <section id="certifications">
        <h2>Certifications</h2>
        <div className="certifications-grid">
          <div className="certification-card">
            <div className="certification-icon">🧠</div>
            <div className="certification-info">
              <h3>Artificial Intelligence Foundations: Thinking Machines</h3>
              <p>LinkedIn · Aug 2024</p>
            </div>
          </div>
          <div className="certification-card">
            <div className="certification-icon">☕</div>
            <div className="certification-info">
              <h3>Learning Java 17</h3>
              <p>LinkedIn · Feb 2024</p>
            </div>
          </div>
          <div className="certification-card">
            <div className="certification-icon">📐</div>
            <div className="certification-info">
              <h3>Linear Algebra for Machine Learning and Data Science</h3>
              <p>DeepLearning.AI · Dec 2023</p>
            </div>
          </div>
        </div>
      </section>

      <section id="competitive">
        <h2>Competitive Programming</h2>
        <div className="cp-highlights">
          <div className="cp-card cp-highlight">
            <div className="cp-rank">#1</div>
            <div className="cp-detail">
              <h3>Intra University Programming Contest</h3>
              <p>Summer 2026 · East West University</p>
            </div>
          </div>
          <div className="cp-card">
            <div className="cp-detail">
              <h3>NSU-CEC Inter-University Programming Contest</h3>
              <p>Participant · North South University</p>
            </div>
          </div>
        </div>
        <div className="cp-platforms">
          <a href="https://codeforces.com/profile/SouLXeR" target="_blank" rel="noreferrer" className="cp-platform-card">
            <div className="cp-platform-header">
              <span className="cp-platform-name">Codeforces</span>
              <span className="cp-platform-handle">@SouLXeR</span>
            </div>
            <div className="cp-platform-stats">
              <span className="cp-stat"><strong>1082</strong> Rating</span>
              <span className="cp-stat"><strong>1142</strong> Max</span>
              <span className="cp-stat"><strong>34</strong> Contests</span>
              <span className="cp-stat"><strong>312</strong> Solved</span>
            </div>
          </a>
          <a href="https://www.codechef.com/users/soulxer" target="_blank" rel="noreferrer" className="cp-platform-card">
            <div className="cp-platform-header">
              <span className="cp-platform-name">CodeChef</span>
              <span className="cp-platform-handle">@soulxer</span>
            </div>
            <div className="cp-platform-stats">
              <span className="cp-stat"><strong>2★</strong> Coder</span>
            </div>
          </a>
          <a href="https://atcoder.jp/users/soulxer" target="_blank" rel="noreferrer" className="cp-platform-card">
            <div className="cp-platform-header">
              <span className="cp-platform-name">AtCoder</span>
              <span className="cp-platform-handle">@soulxer</span>
            </div>
            <div className="cp-platform-stats">
              <span className="cp-stat"><strong>169</strong> Rating</span>
              <span className="cp-stat"><strong>174</strong> Max</span>
              <span className="cp-stat"><strong>4</strong> Rated</span>
            </div>
          </a>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-categories">
          <div className="skill-group">
            <h3>Languages</h3>
            <ul className="skills-list">
              {["Python", "Java", "C", "C++", "JavaScript"].map((skill) => (
                <li
                  key={skill}
                  className={`skill-tag ${activeSkill === skill ? "active" : ""}`}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {skill}
                  {activeSkill === skill && (
                    <span className="skill-level" style={{ background: skillColors[skill] }}>
                      {skillLevels[skill]}%
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="skill-group">
            <h3>Web Development</h3>
            <ul className="skills-list">
              {["React", "Node.js", "Express", "HTML", "CSS"].map((skill) => (
                <li
                  key={skill}
                  className={`skill-tag ${activeSkill === skill ? "active" : ""}`}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {skill}
                  {activeSkill === skill && (
                    <span className="skill-level" style={{ background: skillColors[skill] }}>
                      {skillLevels[skill]}%
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="skill-group">
            <h3>Tools & Concepts</h3>
            <ul className="skills-list">
              {["Git & GitHub", "AI & ML", "Data Structures", "Algorithms", "OOP"].map((skill) => (
                <li
                  key={skill}
                  className={`skill-tag ${activeSkill === skill ? "active" : ""}`}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  {skill}
                  {activeSkill === skill && (
                    <span className="skill-level" style={{ background: skillColors[skill] }}>
                      {skillLevels[skill]}%
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="languages">
        <h2>Languages</h2>
        <div className="languages-grid">
          <div className="language-card">
            <span className="language-name">Bangla</span>
            <span className="language-level">Native</span>
          </div>
          <div className="language-card">
            <span className="language-name">English</span>
            <span className="language-level">Professional</span>
          </div>
          <div className="language-card">
            <span className="language-name">Hindi</span>
            <span className="language-level">Conversational</span>
          </div>
          <div className="language-card">
            <span className="language-name">Japanese</span>
            <span className="language-level">Basic</span>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              className="project-card"
              key={project.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-badge">#{index + 1}</div>
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
        <div className="contact-content">
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
            <button type="submit">
              Send Message
              <span className="btn-sparkle">✨</span>
            </button>
          </form>
          <div className="contact-info">
            <p>Or reach me directly:</p>
            <div className="contact-links">
              <a href="https://github.com/ShahriarOishik" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://bd.linkedin.com/in/shahriar-oishik" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="visitor-stats">
              <p>You are visitor #{visited}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Shahriar Mahabub Oishik. All Rights Reserved.</p>
        <p>Student ID: 2023-3-60-073 · East West University</p>
      </footer>
    </div>
  );
}

export default App;
