import React, { Suspense, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Stars, Sparkles, Environment, ContactShadows, Ring } from '@react-three/drei';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Mail, Menu, X, Cpu, ShieldCheck,
  BrainCircuit, Layers3, Code2, Database, Cloud, Terminal, Sparkles as SparkleIcon,
  BriefcaseBusiness, GraduationCap, ExternalLink, Award, Workflow, Sun, Moon
} from 'lucide-react';
import './styles.css';
import './experience.css';

const profile = {
  name: 'Balaji V N',
  email: 'balajinarayan1964@gmail.com',
  github: 'https://github.com/Balaji-vnls',
  linkedin: 'https://www.linkedin.com/in/balaji-v-n-2538292b1/',
  leetcode: 'https://leetcode.com/u/Balaji_013/'
};

const projects = [
  {
    n: '01', type: 'GENERATIVE AI · RAG', title: 'AI Knowledge Assistant',
    desc: 'A document intelligence workflow that chunks, embeds, indexes, and retrieves organizational knowledge, then evaluates grounded answers across retrieval configurations.',
    stack: ['Python', 'Gemini API', 'RAG', 'Vector Search'], icon: BrainCircuit, tone: 'violet',
    link: profile.github, linkLabel: 'Explore project'
  },
  {
    n: '02', type: 'AI AUTOMATION · ADS', title: 'Google Ads Campaign Automation',
    desc: 'An API-driven AI workflow using GPT-4o to generate ad copy, keywords, and campaign strategies, connecting campaign operations with database-backed automation.',
    stack: ['GPT-4o', 'REST APIs', 'MongoDB', 'Python'], icon: SparkleIcon, tone: 'blue',
    link: 'https://ai-powered-google-ads-campaign-auto.vercel.app/', linkLabel: 'Live demo'
  },
  {
    n: '03', type: 'CYBERSECURITY · DISTRIBUTED SYSTEMS', title: 'Network Intrusion Detection',
    desc: 'A distributed security platform connecting React, Go services, Python ML inference, databases, and containerized deployments for network attack and anomaly detection.',
    stack: ['React', 'Go', 'Python', 'Docker', 'Kubernetes'], icon: ShieldCheck, tone: 'mint',
    link: 'https://github.com/Balaji-vnls/NIDPS', linkLabel: 'View repository'
  },
  {
    n: '04', type: 'FULL STACK · PLATFORM', title: 'PrintXChange',
    desc: 'A role-based college resource platform for print orders and resource exchange, with authentication, authorization, PDF uploads, order tracking, and database workflows.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'], icon: Layers3, tone: 'orange',
    link: 'https://github.com/Balaji-vnls/PrintXChange', linkLabel: 'View repository'
  },
  {
    n: '05', type: 'NLP · RECOMMENDATION', title: 'AI News Recommender',
    desc: 'A personalized recommendation system using BERT embeddings and Multi-Task Learning on the MIND dataset, with filtering by region, category, and language.',
    stack: ['BERT', 'NLP', 'Multi-Task Learning'], icon: Workflow, tone: 'pink',
    link: profile.github, linkLabel: 'Explore GitHub'
  },
  {
    n: '06', type: 'WEB · DEPLOYMENT', title: 'Hotel Management / Airbnb Clone',
    desc: 'A responsive full-stack web application built with modern React tooling, Next.js, and TypeScript, with user-facing workflows and deployment on Vercel.',
    stack: ['Next.js', 'React', 'TypeScript', 'Vercel'], icon: Code2, tone: 'gold',
    link: profile.github, linkLabel: 'Explore GitHub'
  }
];

const skills = [
  { title: 'AI & GENAI', icon: BrainCircuit, items: 'LLM applications · GPT-4o · Gemini · RAG · Embeddings · Vector search · Prompt engineering · NLP · BERT' },
  { title: 'LANGUAGES', icon: Terminal, items: 'Python · Java · JavaScript · TypeScript · Go · C++ · C' },
  { title: 'BACKEND & APIs', icon: Code2, items: 'FastAPI · Node.js · Express.js · Spring Boot · REST APIs · Microservices · API integration' },
  { title: 'FRONTEND', icon: Layers3, items: 'React · Next.js · Angular · HTML · CSS · Responsive UI' },
  { title: 'DATA & STORAGE', icon: Database, items: 'PostgreSQL · MySQL · MongoDB · Oracle · NoSQL · Supabase · SQL' },
  { title: 'CLOUD & DEVOPS', icon: Cloud, items: 'AWS · Docker · Kubernetes · Jenkins · Argo CD · CI/CD · Git · Linux' }
];

function Orb() {
  const group = useRef(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.22} floatIntensity={0.45}>
        <mesh>
          <icosahedronGeometry args={[1.42, 32]} />
          <MeshDistortMaterial color="#8165ff" roughness={0.17} metalness={0.72} distort={0.34} speed={1.65} />
        </mesh>
        <mesh scale={1.7}>
          <icosahedronGeometry args={[1.42, 2]} />
          <meshBasicMaterial color="#b7a7ff" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[0.8, 0.3, 0.4]} scale={2.0}>
          <torusGeometry args={[1.35, 0.009, 8, 180]} />
          <meshBasicMaterial color="#60ead5" />
        </mesh>
        <mesh rotation={[1.4, 0.8, 0.1]} scale={2.22}>
          <torusGeometry args={[1.35, 0.006, 8, 180]} />
          <meshBasicMaterial color="#a694ff" transparent opacity={0.82} />
        </mesh>
        <mesh position={[1.5, 0.4, 0.2]}>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial color="#5ff4d9" emissive="#38d9c2" emissiveIntensity={2.5} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ compact = false }) {
  return (
    <Canvas camera={{ position: [0, 0, compact ? 7.8 : 7], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.75} />
      <pointLight position={[3, 4, 5]} intensity={2.4} color="#b3a5ff" />
      <pointLight position={[-4, -2, 2]} intensity={1.8} color="#4de7d3" />
      <Suspense fallback={null}>
        <Orb />
        <Stars radius={65} depth={35} count={1100} factor={2} saturation={0.15} fade speed={0.35} />
        <Sparkles count={compact ? 24 : 42} scale={5.4} size={1.8} speed={0.22} color="#a99aff" />
        <Environment preset="city" />
      </Suspense>
      {!compact && <ContactShadows position={[0, -2.3, 0]} opacity={0.2} scale={8} blur={2.5} far={4} />}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.28} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(() => document.documentElement.dataset.theme === 'light');
  const links = [['About', '#about'], ['Experience', '#experience'], ['Work', '#work'], ['Skills', '#skills'], ['Contact', '#contact']];
  useEffect(() => {
    document.documentElement.dataset.theme = lightTheme ? 'light' : 'dark';
  }, [lightTheme]);

  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="Balaji home">
        <span className="brand-mark">B<span>.</span></span>
        <span>BVN<span className="brand-muted"> / DIGITAL PORTFOLIO</span></span>
      </a>
      <nav className={open ? 'nav nav-open' : 'nav'}>
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's connect <ArrowUpRight size={14} /></a>
      </nav>
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setLightTheme((current) => !current)}
        aria-label={`Switch to ${lightTheme ? 'dark' : 'light'} theme`}
        aria-pressed={lightTheme}
        title={`Switch to ${lightTheme ? 'dark' : 'light'} theme`}
      >
        {lightTheme ? <Moon size={15} /> : <Sun size={15} />}
        <span>{lightTheme ? 'DARK' : 'LIGHT'}</span>
      </button>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    </header>
  );
}

function SectionTitle({ kicker, title, accent, copy }) {
  return (
    <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      <div><Eyebrow>{kicker}</Eyebrow><h2>{title} <em>{accent}</em></h2></div>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function AmbientExperience() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollDirection, setScrollDirection] = useState('down');
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorInteractive, setCursorInteractive] = useState(false);
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const atmosphereRef = useRef(null);
  const smoothX = useSpring(cursorX, { stiffness: 90, damping: 24, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 90, damping: 24, mass: 0.5 });

  useEffect(() => {
    const sections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      const mostVisible = visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (mostVisible) {
        setActiveSection(mostVisible.target.id || 'hero');
      }
    }, { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: '-15% 0px -15% 0px' });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const updateDirection = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - previousY) > 3) {
        setScrollDirection(currentY > previousY ? 'down' : 'up');
        previousY = currentY;
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDirection);
    };
    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const target = event.target;
      setCursorInteractive(target instanceof Element && Boolean(target.closest('a, button, .project-card')));
      atmosphereRef.current?.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`);
      atmosphereRef.current?.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`);
      setCursorVisible(true);
    };
    const onPointerLeave = () => {
      setCursorVisible(false);
      setCursorInteractive(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <div ref={atmosphereRef} className="scroll-atmosphere" data-section={activeSection} data-direction={scrollDirection} aria-hidden="true">
        <span className="atmosphere-orb atmosphere-orb-violet" />
        <span className="atmosphere-orb atmosphere-orb-teal" />
        <span className="atmosphere-orb atmosphere-orb-amber" />
      </div>
      <motion.div className={`cursor-aura${cursorVisible ? ' is-visible' : ''}${cursorInteractive ? ' is-interactive' : ''}`} style={{ x: smoothX, y: smoothY }} aria-hidden="true">
        <span className="cursor-aura-core" />
        <span className="cursor-aura-ring" />
      </motion.div>
    </>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroVisualX = useSpring(useTransform(heroPointerX, [-1, 1], [-9, 9]), { stiffness: 90, damping: 22 });
  const heroVisualY = useSpring(useTransform(heroPointerY, [-1, 1], [8, -8]), { stiffness: 90, damping: 22 });
  const handleHeroPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    heroPointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    heroPointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };
  const resetHeroPointer = () => {
    heroPointerX.set(0);
    heroPointerY.set(0);
  };

  return (
    <>
      <AmbientExperience />
      <motion.div className="scroll-progress" style={{ width: progress }} />
      <Header />
      <main id="home">
        <section className="hero section-wrap" onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer}>
          <div className="hero-copy">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <Eyebrow>SOFTWARE ENGINEER <span className="eyebrow-sep">/</span> AI BUILDER <span className="live-pill"><i /> OPEN TO OPPORTUNITIES</span></Eyebrow>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Engineering<br />the <span className="gradient-text">next</span><br /><span className="outline-text">possibility.</span>
            </motion.h1>
            <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}>
              I’m Balaji — a software engineer building AI-powered applications, full-stack products, and resilient systems. I like connecting ambitious ideas to clean engineering and useful experiences.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#contact"><span className="play-dot" /> Get in touch</a>
            </motion.div>
            <div className="hero-meta"><span><span className="tiny-dot" /> Bengaluru, India</span><span className="meta-divider" /><span>BE · Information Science · 2026</span></div>
          </div>

          <motion.div className="hero-visual" style={{ x: heroVisualX, y: heroVisualY }}>
            <div className="visual-glow" />
            <div className="orb-frame"><Scene /></div>
            <div className="float-tag tag-top"><span className="tag-icon"><Cpu size={16} /></span><span><b>AI / SYSTEMS</b><small>Intelligence in motion</small></span></div>
            <div className="float-tag tag-bottom"><span className="status-bars"><i /><i /><i /><i /></span><span><b>Build · Test · Improve</b><small>Curiosity into craft</small></span></div>
            <div className="orbit-label">FIG. 01 — SYSTEMS IN MOTION</div>
          </motion.div>
          <a href="#about" className="scroll-cue"><span className="scroll-line" /><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
          <div className="hero-index">01 <span>/</span> 05</div>
        </section>

        <section className="about section-wrap" id="about">
          <SectionTitle kicker="PROFILE / 001" title="Curiosity meets" accent="craft." copy="A hands-on engineer who enjoys building across the stack — from AI workflows and APIs to deployment, debugging, and user-facing products." />
          <div className="about-grid">
            <div className="about-lead"><span className="quote-mark">“</span><p>I like working on the hard part: turning a promising idea into a system that actually works.</p></div>
            <div className="about-body">
              <p>I’m a 2026 Information Science and Engineering graduate from R V Institute of Technology and Management. My experience spans full-stack development, AI-powered automation, application testing, and distributed security systems.</p>
              <p>I value practical experimentation, maintainable architecture, clear communication, and learning by shipping. I’m comfortable moving between frontend details, backend APIs, data workflows, and deployment troubleshooting.</p>
              <div className="about-stats">
                <div><strong>372<span>+</span></strong><small>LeetCode problems solved</small></div>
                <div><strong>8.31<span>/10</span></strong><small>Graduation CGPA</small></div>
                <div><strong>06</strong><small>Featured projects</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience section-wrap" id="experience">
          <SectionTitle kicker="EXPERIENCE / 002" title="Learning by" accent="shipping." copy="Practical experience testing workflows, finding defects, and validating fixes through structured engineering processes." />
          <div className="experience-card">
            <div className="experience-symbol"><BriefcaseBusiness size={23} /></div>
            <div className="experience-main">
              <div className="experience-top"><div><h3>KodNest</h3><p>Automation Testing Intern · Bengaluru, India</p></div><span className="date-pill">FEB — MAY 2026</span></div>
              <ul>
                <li>Validated application workflows, identified defects, investigated failures, and verified expected behavior across features.</li>
                <li>Troubleshot functional issues, verified fixes, and documented reproducible problems and test results.</li>
              </ul>
              <div className="tag-row"><span>Functional Testing</span><span>Debugging</span><span>Defect Verification</span><span>Test Workflows</span></div>
            </div>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <SectionTitle kicker="SELECTED WORK / 003" title="Built with" accent="purpose." copy="A cross-section of projects spanning generative AI, automation, cybersecurity, NLP, and full-stack product engineering." />
          <div className="project-list">
            {projects.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.a href={p.link} target="_blank" rel="noreferrer" className={`project-card ${p.tone}`} key={p.n}
                  onPointerMove={(event) => {
                    if (event.pointerType !== 'mouse') return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
                    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
                  }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}>
                  <div className="project-number">{p.n}</div>
                  <div className="project-art"><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-core"><Icon size={30} strokeWidth={1.4} /></div><div className="art-cross cross-one" /><div className="art-cross cross-two" /></div>
                  <div className="project-info"><div className="project-type">{p.type}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="tag-row">{p.stack.map(s => <span key={s}>{s}</span>)}</div></div>
                  <div className="project-open" aria-hidden="true"><ArrowUpRight size={19} /></div>
                </motion.a>
              );
            })}
          </div>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Explore repositories <ArrowRight size={16} /></a>
        </section>

        <section className="skills section-wrap" id="skills">
          <SectionTitle kicker="CAPABILITIES / 004" title="A versatile" accent="toolkit." copy="A practical stack for building, integrating, testing, and deploying software — with a special interest in useful AI systems." />
          <div className="skills-grid">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return <motion.div className="skill-item" key={skill.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="skill-icon"><Icon size={19} /></div><div><h3>{skill.title}</h3><p>{skill.items}</p></div><span className="skill-index">0{i + 1}</span>
              </motion.div>;
            })}
          </div>
          <div className="education-strip">
            <div className="edu-icon"><GraduationCap size={23} /></div>
            <div><span className="mini-label">EDUCATION</span><h3>R V Institute of Technology and Management</h3><p>B.E. Information Science & Engineering · 2022—2026 · Bengaluru, India</p></div>
            <span className="edu-score">8.31 <small>/ 10 CGPA</small></span>
          </div>
          <div className="cert-row"><span><Award size={16} /> CERTIFICATIONS</span><p>Cloud Computing — Infosys <i /> API Security Fundamentals — APISEC ’25 <i /> Java Swing GUI Toolkit — Infosys</p></div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-orb"><Scene compact /></div>
            <div className="contact-content"><Eyebrow>HAVE A GOOD CHALLENGE?</Eyebrow><h2>Let’s make<br /><em>something matter.</em></h2><p>Have an interesting engineering problem, an opportunity, or an idea worth exploring? Let’s talk.</p>
              <a className="button button-primary" href={`mailto:${profile.email}?subject=${encodeURIComponent('Let’s connect')}`}>Start a conversation <ArrowUpRight size={17} /></a>
              <div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={13} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={13} /></a><a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode <ExternalLink size={13} /></a></div>
            </div>
            <div className="contact-index">LET'S BUILD / 2026</div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">B<span>.</span></span><span>BVN<span className="brand-muted"> / DIGITAL PORTFOLIO</span></span></a>
        <span className="footer-copy">Designed with curiosity. Built with intent.</span>
        <div className="socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><ExternalLink size={17} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a></div>
        <span className="copyright">© 2026 BVN</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
