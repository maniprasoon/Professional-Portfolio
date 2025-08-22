import { useEffect } from 'react'

declare global {
  interface Window {
    Typed: any;
    $: any;
  }
}

export default function Home() {
  useEffect(() => {
    // Load scripts in proper dependency order
    const loadScriptsSequentially = async () => {
      // Load jQuery first
      await new Promise<void>((resolve) => {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.slim.min.js';
        jqueryScript.integrity = 'sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n';
        jqueryScript.crossOrigin = 'anonymous';
        jqueryScript.onload = () => resolve();
        document.head.appendChild(jqueryScript);
      });

      // Load Popper.js after jQuery
      await new Promise<void>((resolve) => {
        const popperScript = document.createElement('script');
        popperScript.src = 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js';
        popperScript.integrity = 'sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo';
        popperScript.crossOrigin = 'anonymous';
        popperScript.onload = () => resolve();
        document.head.appendChild(popperScript);
      });

      // Load Bootstrap after jQuery and Popper
      await new Promise<void>((resolve) => {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js';
        bootstrapScript.integrity = 'sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6';
        bootstrapScript.crossOrigin = 'anonymous';
        bootstrapScript.onload = () => resolve();
        document.head.appendChild(bootstrapScript);
      });

      // Load Font Awesome
      const faScript = document.createElement('script');
      faScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js';
      faScript.integrity = 'sha256-MAgcygDRahs+F/Nk5Vz387whB4kSK9NXlDN3w58LLq0=';
      faScript.crossOrigin = 'anonymous';
      document.head.appendChild(faScript);

      // Load Typed.js
      const typedScript = document.createElement('script');
      typedScript.src = '/typed.min.js';
      document.head.appendChild(typedScript);

      // Initialize functionality after all scripts are loaded
      if (window.$) {
        window.$(document).ready(function () {
          const $win = window.$(window);
          const $navbar = window.$('#header');
          const $toggle = window.$('.toggle-button');
          const width = $navbar.width();
          
          function toggle_onclick($win: any, $navbar: any, width: number) {
            if ($win.width() <= 768) {
              $navbar.css({ left: `-${width}px` });
            } else {
              $navbar.css({ left: '0px' });
            }
          }
          
          toggle_onclick($win, $navbar, width);

          // resize event
          $win.resize(function () {
            toggle_onclick($win, $navbar, width);
          });

          $toggle.click(function () {
            $navbar.toggleClass("toggle-left");
            // Close mobile menu when clicking navigation items
            window.$('.nav-link').click(function() {
              if (window.$(window).width() <= 768) {
                $navbar.removeClass("toggle-left");
              }
            });
          });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = (anchor as HTMLAnchorElement).getAttribute('href');
            if (href) {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({
                  behavior: 'smooth'
                });
              }
            }
          });
        });

        // Initialize custom text revealing animations
        setTimeout(() => {
          const homeTypewriter = document.getElementById('typed');
          const aboutTypewriter = document.getElementById('typed_2');
          
          if (homeTypewriter) {
            const texts = ["AI & ML Enthusiast", "Tech Innovator"];
            let currentIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let currentText = '';
            
            const typeTerminal = () => {
              const fullText = texts[currentIndex];
              
              if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
              } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
              }
              
              homeTypewriter.textContent = currentText;
              
              let typeSpeed = 100;
              
              if (isDeleting) {
                typeSpeed /= 2;
              }
              
              if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
              } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
              }
              
              setTimeout(typeTerminal, typeSpeed);
            };
            
            typeTerminal();
          }
          
          if (aboutTypewriter) {
            const texts = ["AI & ML Enthusiast", "Computer Science Student with 9.05 CGPA", "Technology Innovation Enthusiast"];
            let currentIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let currentText = '';
            
            const typeAboutTerminal = () => {
              const fullText = texts[currentIndex];
              
              if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
              } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
              }
              
              aboutTypewriter.textContent = currentText;
              
              let typeSpeed = 100;
              
              if (isDeleting) {
                typeSpeed /= 2;
              }
              
              if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
              } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next word
              }
              
              setTimeout(typeAboutTerminal, typeSpeed);
            };
            
            typeAboutTerminal();
          }
        }, 1000);

        // Update counter
        const updateCounter = async () => {
          try {
            const counterElements = document.querySelectorAll('.counter-number');
            counterElements.forEach(counter => {
              counter.innerHTML = "👀 Views: Loading...";
            });
            
            const response = await fetch(
              "https://wwjcx7tyxrbjmbkf3vc3teo3mu0qrvhq.lambda-url.ca-central-1.on.aws/"
            );
            const data = await response.json();
            
            counterElements.forEach(counter => {
              counter.innerHTML = `👀 Views: ${data}`;
            });
          } catch (error) {
            const counterElements = document.querySelectorAll('.counter-number');
            counterElements.forEach(counter => {
              counter.innerHTML = "👀 Views: Error loading";
            });
          }
        };
        updateCounter();
      }
    };

    loadScriptsSequentially();

    return () => {
      // Cleanup
      const jqueryScript = document.querySelector('script[src="https://code.jquery.com/jquery-3.4.1.slim.min.js"]');
      const bootstrapScript = document.querySelector('script[src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"]');
      const popperScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"]');
      const faScript = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js"]');
      const typedScript = document.querySelector('script[src="/typed.min.js"]');
      
      if (jqueryScript && document.head.contains(jqueryScript)) {
        document.head.removeChild(jqueryScript);
      }
      if (bootstrapScript && document.head.contains(bootstrapScript)) {
        document.head.removeChild(bootstrapScript);
      }
      if (popperScript && document.head.contains(popperScript)) {
        document.head.removeChild(popperScript);
      }
      if (faScript && document.head.contains(faScript)) {
        document.head.removeChild(faScript);
      }
      if (typedScript && document.head.contains(typedScript)) {
        document.head.removeChild(typedScript);
      }
    };
  }, []);

  const downloadCV = () => {
    window.open('https://drive.google.com/file/d/1PO3Vu5fOC8Hi3_If_Imz-Z_28UCsOKfE/view?usp=sharing');
  };

  return (
    <>
      {/* header area */}
      <header id="header">
        <div className="row m-0">
          <div className="col-3 bgcolor-black">
            <nav className="primary-nav navbar-expand-md">
              <div className="site-title text-center text-light py-5">
                <a href="#home" className="navbar-brand font-staat font-size-40">MP</a>
              </div>
              <div className="d-flex flex-column">
                <a href="#home" className="nav-item nav-link text-white-50 font-os font-size-16 active">Home</a>
                <a href="#about_me" className="nav-item nav-link text-white-50 font-os font-size-16 active">About</a>
                <a href="#certifications" className="nav-item nav-link text-white-50 font-os font-size-16 active">Certifications</a>
                <a href="#portfolio" className="nav-item nav-link text-white-50 font-os font-size-16 active">Projects</a>
                <a href="#contact_us" className="nav-item nav-link text-white-50 font-os font-size-16 active">Contact</a>
                <div className="counter-number nav-item nav-link text-white-50 font-os font-size-16 active" style={{cursor: 'pointer'}} onClick={() => document.querySelector('#contact_us')?.scrollIntoView({behavior: 'smooth'})}>Couldn't read the counter</div>
              </div>
            </nav>
          </div>
        </div>
        <button className="toggle-button"><span className="fas fa-bars fa-2x"></span></button>
      </header>

      <main id="site-main">
        <div className="row m-0">
          <div className="col-md-9 offset-md-3 px-0">

            {/* site-banner area */}
            <section className="site-banner bg-light" id="home">
              <div className="banner-area">
                <div className="author text-center">
                  <div className="author-img" style={{background: `url(https://mocha-cdn.com/0198b2d2-7528-79f9-88d6-f2a6b0e5bf4a/me-suit.png) no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <h1 className="text-black font-staat font-size-40 text-uppercase py-3">Miryala Mani Prasoon</h1>
                  <h5 className="text-black font-ram font-size-27">I'm a <span id="typed" className="terminal-text">AI & ML Enthusiast</span></h5>
                  <div className="contact-info text-center pt-3">
                    <p className="font-ram font-size-16">📞 +91-8523035354 | 📧 maniprasoonm@gmail.com</p>
                  </div>
                </div>
              </div>
            </section>

            {/* about me area */}
            <section className="about px-4 py-5" id="about_me">
              <div className="me py-5">
                <h5 className="text-uppercase font-os font-size-16 text-muted">information</h5>
                <h1 className="text-uppercase font-staat font-size-34">About Me</h1>
              </div>
              <div className="row m-0">
                <div className="col-sm-5 pl-0">
                  <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755088574/banner_zeavqh.png" alt="profile image" className="img-fluid" style={{borderRadius: '8px', objectFit: 'cover', width: '100%', height: '350px'}} />
                </div>
                <div className="col-sm-6">
                  <h6 className="text-uppercase font-os font-size-16 text-muted">About Me</h6>
                  <h5 className="font-ram font-size-20 py-2">I'm Miryala Mani Prasoon & a <span id="typed_2" className="terminal-text-about">AI & ML Enthusiast</span></h5>
                  <p className="font-ram text-black-50 py-2">
                    I am a final-year Computer Science student with a 9.05 CGPA, passionate about Artificial Intelligence, Machine Learning, and technology-driven innovation. I aim to apply my skills, learn from industry leaders, and contribute meaningfully as an intern or full-time team member.
                  </p>
                  <div className="d-flex flex-row flex-wrap justify-content-between py-4">
                    <div className="d-flex flex-column">
                      <p className="font-ram"><b>Email: </b><span className="text-black-50">maniprasoonm@gmail.com</span></p>
                      <p className="font-ram"><b>Phone: </b><span className="text-black-50">+91-8523035354</span></p>
                      <p className="font-ram"><b>CGPA: </b><span className="text-black-50">9.05</span></p>
                    </div>
                  </div>
                  <button type="submit" onClick={downloadCV} className="btn btn-dark text-uppercase mr-3">Download CV</button>
                </div>
              </div>
            </section>

            {/* skills */}
            <section className="skill px-4 py-5 bg-light" id="services">
              <div className="ability py-3">
                <h5 className="text-uppercase font-os font-size-16 text-muted">Technical Skills</h5>
                <h1 className="text-uppercase font-staat font-size-34">My Expertise</h1>
              </div>
              <div className="row">
                <div className="col-sm-12 pl-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-uppercase font-os font-size-16 text-muted">Programming Languages</h6>
                      <p className="font-ram font-size-16 text-black-50 pb-3">
                        Python, C, HTML, CSS, JavaScript, SQL
                      </p>
                      
                      <h6 className="text-uppercase font-os font-size-16 text-muted">Frameworks & Libraries</h6>
                      <p className="font-ram font-size-16 text-black-50 pb-3">
                        TensorFlow, Keras, NumPy, Pandas
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-uppercase font-os font-size-16 text-muted">Cloud & Databases</h6>
                      <p className="font-ram font-size-16 text-black-50 pb-3">
                        MySQL, AWS
                      </p>
                      
                      <h6 className="text-uppercase font-os font-size-16 text-muted">Soft Skills</h6>
                      <p className="font-ram font-size-16 text-black-50 pb-3">
                        Problem Solving, Self-learning, Presentation, Adaptability
                      </p>
                    </div>
                  </div>
                  <ul className="list-inline dev-icons">
                    <li className="list-inline-item">
                      <i className="fab fa-python"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-html5"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-css3-alt"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-js-square"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-aws"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-database"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-git-alt"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fab fa-github"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-brain"></i>
                    </li>
                    <li className="list-inline-item">
                      <i className="fas fa-robot"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* certifications */}
            <section className="awards px-4 py-5" id="certifications">
              <div className="do py-5">
                <h5 className="text-uppercase font-os font-size-16 text-muted">Professional Development</h5>
                <h1 className="text-uppercase font-staat font-size-34"><i className="fas fa-certificate"></i> Certifications & Achievements</h1>
              </div>
              <div className="w-100">
                <h6 className="text-uppercase font-os font-size-16 text-muted mb-3">Certifications</h6>
                <ul className="fa-ul mb-4 font-ram font-size-16 text-black-50">
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    LinguaSkill B2 – Cambridge English
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    AWS Cloud Foundations
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Front End Web Developer – Infosys Springboard
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Artificial Intelligence Primer – Infosys Springboard
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    TCS iON Career Edge – Young Professional
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Prompt Engineering
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Generative AI for Developers
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Python for Data Science
                  </li>
                  <li>
                    <i className="fa-li fa fa-certificate text-warning"></i>
                    Agile Scrum in Practice
                  </li>
                </ul>
                
                <h6 className="text-uppercase font-os font-size-16 text-muted mb-3">Achievements</h6>
                <ul className="fa-ul mb-0 font-ram font-size-16 text-black-50">
                  <li>
                    <i className="fa-li fa fa-trophy text-warning"></i>
                    Published research paper: A Bio-Cryptographic Approach to AES Key Generation — IJERT, May 2025
                  </li>
                  <li>
                    <i className="fa-li fa fa-trophy text-warning"></i>
                    Presented DeepSightDR at ICAISC 2025
                  </li>
                  <li>
                    <i className="fa-li fa fa-trophy text-warning"></i>
                    Maintained 9.05 CGPA throughout Computer Science program
                  </li>
                </ul>
              </div>
            </section>

            {/* projects */}
            <section className="work py-5 px-4 bg-light" id="portfolio">
              <div className="py-3">
                <h5 className="text-uppercase font-os font-size-16 text-muted">Portfolio</h5>
                <h1 className="text-uppercase font-staat font-size-34">Featured Projects</h1>
              </div>
              <div className="row">
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/DeepSightDR" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755015173/deepsightDR_sshyvy.png" title="DeepSightDR" alt="DeepSightDR" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>DeepSightDR</h2>
                    <p>Deep learning powered diabetic retinopathy detection with 93-95% accuracy</p>
                    <p><a href="https://github.com/maniprasoon/DeepSightDR" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/Hosting-Website-using-Amazon-S3-and-accelerate-content-delivery-using-Cloudfont-in-AWS" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755015171/hosting_static_website_uhfdro.png" title="AWS S3 Static Website" alt="AWS S3 Website" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>AWS S3 Static Website</h2>
                    <p>End-to-end static site deployment & CDN optimization on AWS</p>
                    <p><a href="https://github.com/maniprasoon/Hosting-Website-using-Amazon-S3-and-accelerate-content-delivery-using-Cloudfont-in-AWS" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/A-BIO-CRYPTOGRAPHIC-APPROACH-TO-AES-KEY-GENERATION-USING-RANDOMIZED-DNA-GENES-AND-BINARY-ENCODING" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755015175/bio_crypographic_approach_iohjad.png" alt="Bio-Cryptographic AES" title="Bio-Cryptographic AES" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>Bio-Cryptographic AES</h2>
                    <p>AES key generation using randomized DNA motifs and binary encoding</p>
                    <p><a href="https://github.com/maniprasoon/A-BIO-CRYPTOGRAPHIC-APPROACH-TO-AES-KEY-GENERATION-USING-RANDOMIZED-DNA-GENES-AND-BINARY-ENCODING" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/HandsMen-Threads-Elevating-the-Art-of-Sophistication-in-Men-s-Fashion" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755015166/salesforce_project_ndddej.png" alt="Salesforce CRM" title="Salesforce CRM HandsMen Threads" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>Salesforce CRM – HandsMen Threads</h2>
                    <p>Custom Salesforce CRM with automation and AI-ready architecture</p>
                    <p><a href="https://github.com/maniprasoon/HandsMen-Threads-Elevating-the-Art-of-Sophistication-in-Men-s-Fashion" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/AI-POWERED-LATEX-DIAGRAM-GENERATOR-FOR-ACADEMIC-RESEARCH" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755090652/latex_generator_ybs1wn.png" alt="AI-Powered LaTeX Diagram Generator" title="AI-Powered LaTeX Diagram Generator" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>AI-Powered LaTeX Diagram Generator</h2>
                    <p>AI-driven tool for generating LaTeX diagrams for academic research papers</p>
                    <p><a href="https://github.com/maniprasoon/AI-POWERED-LATEX-DIAGRAM-GENERATOR-FOR-ACADEMIC-RESEARCH" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
                <div className="frame col-sm-6 pb-4">
                  <a href="https://github.com/maniprasoon/TO-DO-List" target="_blank">
                    <img src="https://res.cloudinary.com/ds8fnrk7s/image/upload/v1755090652/todo_list_ldnkgs.png" alt="To-do List" title="To-do List Application" className="img-fluid" style={{objectFit: 'cover', width: '100%', height: '200px'}} />
                  </a>
                  <div className="details">
                    <h2>To-do List</h2>
                    <p>Interactive task management application with modern web technologies</p>
                    <p><a href="https://github.com/maniprasoon/TO-DO-List" target="_blank" title="Source Code"><i className="fab fa-github-square giti"></i></a></p>
                  </div>
                </div>
              </div>
            </section>

            {/* footer */}
            <footer id="footer" className="pt-5 px-3">
              <div id="contact_us">
                <div className="row bg-light py-5">
                  <div className="col-sm-4 my-5 text-center">
                    <h6 className="font-ram font-size-16 text-black-50">&copy;2025 Miryala Mani Prasoon. All rights reserved</h6>
                  </div>
                  <div className="col-sm-4 my-4 text-center">
                    <div className="footer-title">
                      <p className="description font-os font-size-16 text-black-50 text-uppercase">Made with ❤</p>
                    </div>
                    <div className="counter-number" style={{cursor: 'pointer'}} onClick={() => document.querySelector('#home')?.scrollIntoView({behavior: 'smooth'})}>Couldn't read the counter</div>
                  </div>
                  <div className="social-icons col-sm-4 my-4 text-center">
                    <a href="https://www.linkedin.com/in/mani-prasoon-miryala/" target="_blank">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/maniprasoon" target="_blank">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=maniprasoonm@gmail.com" target="_blank">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
            </footer>

          </div>
        </div>
      </main>
    </>
  );
}
