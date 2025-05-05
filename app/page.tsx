'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Menu, 
  X, 
  ChevronDown,
  Award,
  Code,
  Briefcase,
  User,
  GraduationCap,
  Phone,
  InstagramIcon,
  LucideInstagram,
  Target,
  Download
} from 'lucide-react';
import * as THREE from 'three';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const connectRef = useRef(null);
  const heroThreeCanvasRef = useRef<HTMLDivElement>(null);

  // Navbar scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js setup - confined to hero section only
  useEffect(() => {
    if (!heroThreeCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    heroThreeCanvasRef.current.appendChild(renderer.domElement);
    
    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const material = new THREE.MeshNormalMaterial();
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    camera.position.z = 10;
    
    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (heroThreeCanvasRef.current?.contains(renderer.domElement)) {
        heroThreeCanvasRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (ref:any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-950 to-purple-800 text-white min-h-screen">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-purple-900/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300"
            >
              Portfolio
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {[
                { name: 'About', ref: aboutRef },
                { name: 'Projects', ref: projectsRef },
                { name: 'Skills', ref: skillsRef },
                { name: 'Education', ref: educationRef },
                { name: 'Experience', ref: experienceRef },
                { name: 'Connect', ref: connectRef }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className="relative px-2 py-1 group overflow-hidden"
                >
                  <span className="relative z-10 text-purple-100 group-hover:text-white transition-colors">{item.name}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-purple-200 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-purple-900/90 backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-2">
              {[
                { name: 'About', ref: aboutRef, icon: <User size={18} /> },
                { name: 'Projects', ref: projectsRef, icon: <Code size={18} /> },
                { name: 'Skills', ref: skillsRef, icon: <Award size={18} /> },
                { name: 'Education', ref: educationRef, icon: <GraduationCap size={18} /> },
                { name: 'Experience', ref: experienceRef, icon: <Briefcase size={18} /> },
                { name: 'Connect', ref: connectRef, icon: <Phone size={18} /> }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-purple-800 transition-colors"
                >
                  <span className="mr-2 text-purple-300">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
      
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background Element - Now confined to hero section */}
        <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" ref={heroThreeCanvasRef}></div>
        
        <div className="absolute inset-0 bg-purple-900/30 z-10"></div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-200"
          >
            Muhammad Talhah
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-purple-100"
          >
          Full Stack Developer | Embedded Systems Engineer | App Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              View My Work
            </button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown size={40} className="text-purple-300/80" />
        </motion.div>
      </header>
        
        {/* About Section */}
        <section ref={aboutRef} className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <h2 className="text-4xl font-bold mb-6 text-purple-200">About Me</h2>
                <p className="text-lg mb-6 text-purple-100">
                  Hey there !! I'm a software dev that enjoys using code to bring my ideas to life, 
                  I’ve worked on everything from connected devices and IoT projects to desktop applmachine learning models and generative AI.
                </p>
                <p className="text-lg mb-6 text-purple-100">
                  I'm currently studying Electronics and Computer Engineering,
                  and I’m always up for learning something new, especially if it means I get to code, tinker, or debug at 2 a.m. 😅
                </p>
                <p className="text-lg mb-6 text-purple-100">
                I’m also really into startups and love the fast-paced, get-things-done vibe. If I’m not building something, 
                I’m probably talking about Formula 1 or thinking of my next project.
                </p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-purple-800/50 rounded-full text-sm">Builder</span>
                  <span className="px-4 py-2 bg-purple-800/50 rounded-full text-sm">Creative Thinker</span>
                  <span className="px-4 py-2 bg-purple-800/50 rounded-full text-sm">Tech Explorer</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="relative">
                  <div className="w-full h-96 md:h-96 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg shadow-xl overflow-hidden">
                    <img
                      src="./portrait_animated.png"
                      alt="Profile"
                      className="w-full h-full object-cover "
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section ref={projectsRef} className="py-20 bg-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-200">Personal Projects</h2>
              <div className="w-24 h-1 bg-purple-400 mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-purple-100">
                Explore a selection of my recent work showcasing my skills and creative approach.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                
                {
                  title: "ASK GPT",
                  desc: "A desktop app whose sole purpose is to visualize the results of users prompts using knowledge graphs and statistics like relevance and sentiment , giving the user deep insights into their query.",
                  imgsrc:"./askgpt.jpg",
                  tech: ["Flutter", "Google Maps API", "Bluetooth", "ESP32"]
                },
                {
                  title: "Smart Motorcycle HUD",
                  desc: "A heads-up display for motorcycle helmets that shows turn-by-turn directions using an ESP32 and mobile app integration.",
                  imgsrc:"./HUD.jpg",
                  tech: ["Flutter", "ESP32", "Bluetooth", "Google Maps API"]
                },
                {
                  title: "Driver Behavior Analysis",
                  desc: "Analyzes OBD data from a car and uses ML models to classify driving style, check car health and provide improvement tips.",
                  imgsrc:"./DRIVER4.png",
                  tech: ["Python", "Machine Learning", "OBD-II", "Pandas"]
                },
                
                {
                  title: "Air Quality Monitoring System",
                  desc: "Built an IoT-based air quality system using MQ sensors to monitor pollution levels and alert users in real-time.",
                  imgsrc:"./AQMS.jpg",
                  tech: ["Arduino", "MQ-135", "ESP8266", "OLED Display"]
                },
                {
                  title: "Portfolio Website",
                  desc: "My personal portfolio website to showcase projects, skills, and resume with a clean, responsive UI.",
                  imgsrc:"./portfolio.png",
                  tech: ["React", "Tailwind CSS", "JavaScript","three.js"]
                },
                {
                  title: "MDL - Music Downloader",
                  desc: "A desktop app made entirely out of python that acts as a music downloader.",
                  imgsrc:"./MDL2.png",
                  tech: ["Python", "PySimpleGUI", "pytube", "spotipy"]
                }
                
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-purple-800/30 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-purple-600/20 transition-all duration-300"
                >
                  <div className="h-60 bg-gradient-to-br from-purple-700 to-fuchsia-600 relative overflow-hidden">
                    <img 
                      src={project.imgsrc}
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-900/70">
                      <button className="px-4 py-2 bg-purple-600 rounded-full text-sm">View Project</button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-purple-200">{project.title}</h3>
                    <p className="text-purple-100 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-700/50 rounded-full text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section ref={skillsRef} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-200">Skills</h2>
              <div className="w-24 h-1 bg-purple-400 mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-purple-100">
                My technical toolkit and areas of expertise.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  category: "Full Stack & App Development",
                  skills: [
                    { name: "Python", level: 90 },
                    { name: "Java", level: 75 },
                    { name: "Flutter", level: 55 },
                    { name: "JavaScript", level: 60 },
                    { name: "React", level: 60 },
                    { name: "HTML/CSS", level: 85 },
                    { name: "SQL", level: 90 }
                  ]
                },
                {
                  category: "Embedded Systems & IoT",
                  skills: [
                    { name: "Arduino", level: 75 },
                    { name: "FPGA", level: 70 },
                    { name: "RTOS", level: 65 },
                    { name: "VLSI", level: 50 },
                    { name: "Sensor Integration (MQ, OBD)", level: 80 },
                    { name: "C/C++", level: 80 },
                    { name: "Microcontroller Debugging", level: 90 }
                  ]
                },
                {
                  category: "Tools & Design",
                  skills: [
                    {name: "AWS", level: 45 },
                    { name: "Solidity", level: 65 },
                    { name: "Blender", level: 75 },
                    { name: "Unreal Engine", level: 60 },
                    { name: "Figma", level: 75 },
                    { name: "UI/UX Design", level: 85 },
                    { name: "Git & GitHub", level: 70 },
                  ]
                }
                
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-purple-800/20 backdrop-blur-sm p-8 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-6 text-center text-purple-300">{category.category}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-purple-100">{skill.name}</span>
                          
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <section ref={educationRef} className="py-20 bg-purple-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-200">Education</h2>
              <div className="w-24 h-1 bg-purple-400 mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-purple-100">
                My academic background and continuous learning journey.
              </p>
            </motion.div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-700/30"></div>
              
              {[
                {
                  degree: "Bachelor of Technology in Electronics and Computer Engineering",
                  school: "vellore Institute of Technology",
                  year: "2021 - 2025",
                  description: "Focused on embedded systems and machine-learning. graduated with honors."
                },
                {
                  degree: "Competitive Problem Solving",
                  school: "HackerRank",
                  year: "Ongoing",
                  description: "Consistently participating in coding challenges and competitions on HackerRank to improve problem-solving skills in algorithms, data structures, and system design."
                }
                ,
                {
                  degree: "AWS Cloud Certification",
                  school: "AWS Training & Certification",
                  year: "Ongoing",
                  description: "Currently pursuing AWS Cloud Certification to deepen knowledge in cloud computing, architecture, and services such as EC2, S3, Lambda, and AWS management tools."
                }
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-12 md:ml-1/2'} md:w-1/2 px-6`}
                >
                  <div className={`p-6 bg-purple-800/20 backdrop-blur-sm rounded-xl shadow-lg ${index % 2 === 0 ? 'md:rounded-r-none' : 'md:rounded-l-none'}`}>
                    <div className="absolute top-6 bg-purple-600 rounded-full w-6 h-6 transform -translate-y-1/2 hidden md:block"
                      style={{ [index % 2 === 0 ? 'right' : 'left']: '-15px' }}
                    ></div>
                    <span className="inline-block px-4 py-1 bg-purple-700 rounded-full text-sm mb-4">{edu.year}</span>
                    <h3 className="text-xl font-bold mb-2 text-purple-200">{edu.degree}</h3>
                    <h4 className="text-lg font-medium mb-3 text-purple-300">{edu.school}</h4>
                    <p className="text-purple-100">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Experience Section */}
        <section ref={experienceRef} className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-200">Work Experience</h2>
              <div className="w-24 h-1 bg-purple-400 mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-purple-100">
                My professional journey and roles that have shaped my career.
              </p>
            </motion.div>
            
            <div className="space-y-12">
              {[
                {
                  position: "Software Developer Intern",
                  company: "Coginnova Asia",
                  period: "September 2023 - November 2023",
                  description: "Interned at Coginnova Asia for a duration of 2 months as part of academic requirement.",
                  achievements: [
                    "Created desktop app using python that uses OpenAI API to visualize GPT responses to user queries.",
                    "Created a C# based Smart Contract library that consisted of rudimentary function that help users execute and check smart contracts"
                  ]
                },
                {
                  position: "Software Developer Intern",
                  company: "T3C Technologies",
                  period: "2025 - Present",
                  description: "Built responsive and interactives 3D websites using React and Three.js",
                  achievements: [
                    "Developed a personal portfolio for client using React",
                    "Developed a personal portfolio for myself"
                  ]
                },
                {
                  position: "Systems Engineer",
                  company: "TCS",
                  period: "yet to start",
                  description: "Offer accepted, yet to join. Preparing for role responsibilities in systems engineering, focusing on improving technical processes and contributing to software development.",
                  achievements: [
                  ]
                }
                ,
                
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-3 gap-8 items-start"
                >
                  <div className="md:text-right">
                    <h3 className="text-xl font-bold text-purple-200">{exp.position}</h3>
                    <h4 className="text-lg text-purple-300 mb-2">{exp.company}</h4>
                    <span className="inline-block px-4 py-1 bg-purple-800/50 rounded-full text-sm">{exp.period}</span>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-purple-100 mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-purple-400">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Connect Section */}
        <section ref={connectRef} className="py-20 bg-purple-900/40">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-purple-200">Connect With Me</h2>
              <div className="w-24 h-1 bg-purple-400 mx-auto mt-4 mb-6"></div>
              <p className="max-w-2xl mx-auto text-lg text-purple-100">
                Let's create something amazing together. Reach out through any of these channels.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-purple-800/20 backdrop-blur-sm p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-200">Get In Touch</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-purple-300">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-purple-900/50 border border-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-purple-300">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 bg-purple-900/50 border border-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" 
                      placeholder="YourEmail@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-purple-300">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 bg-purple-900/50 border border-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white h-32" 
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-md text-white font-medium shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-purple-800/20 backdrop-blur-sm p-8 rounded-xl mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-purple-200">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="text-purple-400 mr-4" size={24} />
                        <div>
                          <p className="text-sm text-purple-300">Email</p>
                          <p className="text-purple-100">mtalhah@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="text-purple-400 mr-4" size={24} />
                        <div>
                          <p className="text-sm text-purple-300">Phone</p>
                          <p className="text-purple-100">+91 9597095957</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="text-purple-400 mr-4" size={24} />
                        <div>
                          <p className="text-sm text-purple-300">Available for</p>
                          <p className="text-purple-100">Freelance, Full-time opportunities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-800/20 backdrop-blur-sm p-8 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6 text-purple-200">Find Me Online</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "GitHub", icon: <Github size={24} />, color: "hover:bg-purple-700" ,link:"https://github.com/mtalhah"},
                        { name: "LinkedIn", icon: <Linkedin size={24} />, color: "hover:bg-purple-700",link:"https://www.linkedin.com/in/muhammad-talhah-45b31b27b/" },
                        { name: "Instagram", icon: <InstagramIcon size={24} />, color: "hover:bg-purple-700",link:"https://www.instagram.com/mtalhahh?igsh=MW1ubDI0N3Qyeml2cA=="},
                        { name: "Download CV", icon: <Award size={24} />, color: "hover:bg-purple-700",link:"/RESUME.pdf",download:true}
                      ].map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={item.download ? item.link : undefined}
                          className={`flex items-center justify-center p-4 border border-purple-700 rounded-lg ${item.color} transition-colors duration-300 group`}
                        >
                          <span className="mr-2 text-purple-400 group-hover:text-white transition-colors">{item.icon}</span>
                          <span className="group-hover:text-white transition-colors">{item.name}</span>
                        </a>
            

                        
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="py-10 bg-purple-950">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300">
                  Muhammad Talhah
                </h2>
                <p className="text-purple-300 mt-2">Full Stack Developer | Embedded Systems Engineer | App Developer</p>
              </div>
              
              <div className="flex justify-center space-x-6 mb-8">
                <a href="https://github.com/mtalhah" target="_blank" className="text-purple-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/muhammad-talhah-45b31b27b/" target="_blank" className="text-purple-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.instagram.com/mtalhahh?igsh=MW1ubDI0N3Qyeml2cA==" target="_blank" className="text-purple-400 hover:text-white transition-colors">
                  <InstagramIcon size={20} />
                </a>
                <a href="mailto:mtalhah@gmail.com" target="_blank" className="text-purple-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
              
              <div className="border-t border-purple-800 pt-8">
                <p className="text-purple-400">
                  &copy; {new Date().getFullYear()} Muhammad Talhah. All rights reserved.
                </p>
                <p className="text-purple-500 text-sm mt-2">
                  Designed and built with React & Three.js
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
    };
    
    export default App;
