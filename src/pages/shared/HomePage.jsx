import React, { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const [reports, setReports] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [volunteers, setVolunteers] = useState(0);
  const [rate, setRate] = useState(0);

  const statsRef = useRef(null);

  const animateValue = (setter, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue(setReports, 10000, 2000);
          animateValue(setResolved, 8500, 2000);
          animateValue(setVolunteers, 250, 2000);
          animateValue(setRate, 95, 2000);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the AI detection work?",
      answer: "Our system uses advanced machine learning models trained on thousands of waste images to automatically classify the type and volume of garbage in your photo."
    },
    {
      question: "Do I need to register to report an issue?",
      answer: "You can report anonymously, but registering allows you to track your complaint, receive notifications, and earn community reward points."
    },
    {
      question: "How long does it usually take to resolve an issue?",
      answer: "Resolution times depend on your local municipality, but our data shows an average resolution time of 48-72 hours for standard reports."
    }
  ];

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden smooth-scroll">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-white/30 transition-all h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-5 w-full flex justify-between items-center">
          <a href="#" className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <i className="fa-solid fa-leaf text-green-500"></i> WTF
          </a>
          
          <ul className={`lg:flex gap-5 items-center absolute lg:static top-20 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 ${isNavOpen ? 'flex flex-col py-5' : 'hidden'}`}>
            <li><a href="#home" className="font-medium text-sm hover:text-green-500 transition-colors">Home</a></li>
            <li><a href="#features" className="font-medium text-sm hover:text-green-500 transition-colors">Report Issue</a></li>
            <li><a href="#timeline" className="font-medium text-sm hover:text-green-500 transition-colors">Track Complaint</a></li>
            <li><a href="#stats" className="font-medium text-sm hover:text-green-500 transition-colors">Dashboard</a></li>
            <li><a href="#about" className="font-medium text-sm hover:text-green-500 transition-colors">About</a></li>
            <li><a href="#faq" className="font-medium text-sm hover:text-green-500 transition-colors">FAQ</a></li>
            <li><a href="#contact" className="font-medium text-sm hover:text-green-500 transition-colors">Contact</a></li>
            <li>
              <a href="#" className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all rounded-full px-5 py-2 font-semibold inline-block mt-2 lg:mt-0">
                Login
              </a>
            </li>
          </ul>

          <button className="lg:hidden text-2xl text-gray-900" onClick={() => setIsNavOpen(!isNavOpen)}>
            <i className={`fa-solid ${isNavOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      <section id="home" className="h-screen flex items-center relative bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="max-w-4xl mx-auto px-5 relative z-10 text-white text-center mt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">Report Garbage. Build a Cleaner Tomorrow.</h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200">Help your municipality identify and resolve waste issues faster using AI-powered reporting.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#features" className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all rounded-full px-8 py-3 font-semibold text-lg">Report Now</a>
            <a href="#about" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-all rounded-full px-8 py-3 font-semibold text-lg">Learn More</a>
          </div>
        </div>
      </section>

      <section id="stats" className="py-24 bg-gray-100" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-extrabold text-green-500">{reports.toLocaleString()}+</h3>
            <p className="text-lg text-gray-500 font-medium mt-2">Reports Submitted</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-green-500">{resolved.toLocaleString()}+</h3>
            <p className="text-lg text-gray-500 font-medium mt-2">Issues Resolved</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-green-500">{volunteers.toLocaleString()}+</h3>
            <p className="text-lg text-gray-500 font-medium mt-2">Volunteers</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-green-500">{rate}%</h3>
            <p className="text-lg text-gray-500 font-medium mt-2">Resolution Rate</p>
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Advanced Features</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">Everything you need to keep your city clean, right at your fingertips.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-camera"></i></div>
              <h3 className="text-xl font-semibold mb-3">AI Image Detection</h3>
              <p className="text-gray-500">Upload a photo and automatically detect garbage and waste types.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-location-dot"></i></div>
              <h3 className="text-xl font-semibold mb-3">Live Location</h3>
              <p className="text-gray-500">Automatically capture GPS location for accurate reporting.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-map-location-dot"></i></div>
              <h3 className="text-xl font-semibold mb-3">Interactive Map</h3>
              <p className="text-gray-500">View reported garbage locations and safe zones near you.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-chart-line"></i></div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Dashboard</h3>
              <p className="text-gray-500">Monitor complaint status and municipal analytics live.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-bell"></i></div>
              <h3 className="text-xl font-semibold mb-3">Instant Notifications</h3>
              <p className="text-gray-500">Receive updates when your complaint status changes.</p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-5"><i className="fa-solid fa-medal"></i></div>
              <h3 className="text-xl font-semibold mb-3">Community Rewards</h3>
              <p className="text-gray-500">Earn eco points for helping keep the city clean.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">Reporting waste has never been simpler.</p>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-green-500 z-0"></div>
            
            <div className="flex-1 text-center relative z-10 w-full">
              <div className="w-20 h-20 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl text-green-500 mx-auto mb-5 shadow-lg"><i className="fa-solid fa-mobile-screen"></i></div>
              <h3 className="text-xl font-semibold mb-2">1. Take Photo</h3>
              <p className="text-gray-500">Snap a picture of the issue.</p>
            </div>
            <div className="flex-1 text-center relative z-10 w-full">
              <div className="w-20 h-20 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl text-green-500 mx-auto mb-5 shadow-lg"><i className="fa-solid fa-robot"></i></div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-500">Our system analyzes the data.</p>
            </div>
            <div className="flex-1 text-center relative z-10 w-full">
              <div className="w-20 h-20 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl text-green-500 mx-auto mb-5 shadow-lg"><i className="fa-solid fa-paper-plane"></i></div>
              <h3 className="text-xl font-semibold mb-2">3. Submit Report</h3>
              <p className="text-gray-500">Send it directly to authorities.</p>
            </div>
            <div className="flex-1 text-center relative z-10 w-full">
              <div className="w-20 h-20 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-3xl text-green-500 mx-auto mb-5 shadow-lg"><i className="fa-solid fa-broom"></i></div>
              <h3 className="text-xl font-semibold mb-2">4. Municipality Cleans</h3>
              <p className="text-gray-500">Track resolution in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80" alt="Clean City" className="rounded-xl shadow-xl w-full" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-lg text-gray-600 mb-8">Our platform bridges the gap between citizens and municipal bodies, ensuring a transparent and efficient waste management process.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <span className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></span> AI Powered Processing
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <span className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></span> Fast Reporting & Action
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <span className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></span> Transparent Tracking
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <span className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></span> Secure Data Handling
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <span className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center"><i className="fa-solid fa-check"></i></span> Easy to Use Interface
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Testimonials</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">Hear from our community members.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/85 p-8 rounded-xl shadow-sm relative">
              <i className="fa-solid fa-quote-right absolute top-6 right-6 text-4xl text-green-500/10"></i>
              <p className="italic text-gray-600 mb-6">"This app has completely changed how our neighborhood deals with illegal dumping. Issues get fixed in days!"</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Jenkins</h4>
                  <span className="text-sm text-gray-500">Community Leader</span>
                </div>
              </div>
            </div>
            <div className="bg-white/85 p-8 rounded-xl shadow-sm relative">
              <i className="fa-solid fa-quote-right absolute top-6 right-6 text-4xl text-green-500/10"></i>
              <p className="italic text-gray-600 mb-6">"The AI detection is incredibly accurate. It makes reporting so fast. I've earned so many eco points already."</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900">David Chen</h4>
                  <span className="text-sm text-gray-500">Active Volunteer</span>
                </div>
              </div>
            </div>
            <div className="bg-white/85 p-8 rounded-xl shadow-sm relative">
              <i className="fa-solid fa-quote-right absolute top-6 right-6 text-4xl text-green-500/10"></i>
              <p className="italic text-gray-600 mb-6">"As a municipality worker, the WTF dashboard helps us prioritize and route our trucks efficiently."</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Roberts</h4>
                  <span className="text-sm text-gray-500">City Official</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Latest Community Impact</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">Recent areas cleaned up by our incredible teams.</p>
          <div className="relative max-w-4xl mx-auto before:content-[''] before:absolute before:w-1 before:bg-green-500 before:top-0 before:bottom-0 before:left-8 md:before:left-1/2 before:-ml-0.5">
            
            <div className="relative w-full md:w-1/2 pl-16 md:pl-0 md:pr-10 mb-8 md:text-right">
              <div className="absolute w-5 h-5 bg-white border-4 border-green-500 rounded-full left-5 md:left-auto md:-right-2.5 top-5 z-10"></div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 inline-block w-full text-left md:text-right">
                <h3 className="text-xl font-bold text-gray-900">Downtown Park Cleanup</h3>
                <p className="text-sm text-gray-500 mb-2">Completed on July 24, 2026</p>
                <p className="text-gray-600">Over 500 lbs of plastic removed from the central fountain area.</p>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 pl-16 md:pl-10 mb-8 md:ml-auto text-left">
              <div className="absolute w-5 h-5 bg-white border-4 border-green-500 rounded-full left-5 md:-left-2.5 top-5 z-10"></div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 inline-block w-full">
                <h3 className="text-xl font-bold text-gray-900">Riverbank Restoration</h3>
                <p className="text-sm text-gray-500 mb-2">Completed on July 22, 2026</p>
                <p className="text-gray-600">Reported by 15 citizens, resolved by local municipality.</p>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 pl-16 md:pl-0 md:pr-10 mb-8 md:text-right">
              <div className="absolute w-5 h-5 bg-white border-4 border-green-500 rounded-full left-5 md:left-auto md:-right-2.5 top-5 z-10"></div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 inline-block w-full text-left md:text-right">
                <h3 className="text-xl font-bold text-gray-900">Highway Illegal Dumping</h3>
                <p className="text-sm text-gray-500 mb-2">Completed on July 20, 2026</p>
                <p className="text-gray-600">Hazardous waste identified via AI and safely removed.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 mb-12">Got questions? We have answers.</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)} 
                  className="w-full px-6 py-5 flex justify-between items-center font-semibold text-gray-900 focus:outline-none"
                >
                  {faq.question}
                  <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`px-6 text-gray-600 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-green-500 to-green-600 text-center text-white">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10">Together We Can Make Our City Cleaner.</h2>
          <a href="#features" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 transition-all rounded-full px-10 py-4 font-bold text-xl inline-block">Report Garbage Now</a>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <a href="#" className="text-2xl font-extrabold text-white flex items-center gap-2 mb-5">
                <i className="fa-solid fa-leaf text-green-500"></i> WTF
              </a>
              <p className="text-gray-400">Waste Tracking Framework. Empowering citizens and governments to build cleaner environments.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-500 mb-5">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Report</a></li>
                <li><a href="#timeline" className="text-gray-400 hover:text-white transition-colors">Track</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-500 mb-5">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Analysis</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Municipality Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Rewards</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-500 mb-5">Contact</h3>
              <ul className="space-y-3 text-gray-400 mb-6">
                <li><i className="fa-solid fa-envelope mr-3"></i> support@wtf.gov</li>
                <li><i className="fa-solid fa-phone mr-3"></i> +1 (555) 123-4567</li>
              </ul>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-white hover:bg-green-500 transition-colors"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-white hover:bg-green-500 transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-white hover:bg-green-500 transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full text-white hover:bg-green-500 transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-white/10 text-gray-400">
            <p>&copy; 2026 Waste Tracking Framework. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}