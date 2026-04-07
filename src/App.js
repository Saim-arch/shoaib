import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

const Balloons = () => {
  const balloonColors = ['pink', 'blue', 'yellow', 'green'];
  return (
    <div className="balloons-container">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div 
          key={index}
          className={`balloon ${balloonColors[index % 4]}`}
          initial={{ x: `${index * 12 + 5}vw`, y: '105vh' }} 
          animate={{ y: '-110vh' }}
          transition={{ delay: index * 1.2, duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

const Ribbons = () => (
  <div className="ribbon-container">
    {[...Array(15)].map((_, i) => (
      <div key={i} className="ribbon-flag"></div>
    ))}
  </div>
);

function App() {
  const [step, setStep] = useState(1); 
  const [wishIndex, setWishIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Aapke public folder ke mutabiq sahi names:
const HaniPhotos = [
  "picture1.JPG",  // Yahan JPG capital mein hai
  "picture 2.jpeg", // Yahan space hai aur jpeg small mein hai
  "picture3.jpeg", 
  "picture4.jpg"  // Yahan JPG small mein hai
];

  const wishes = [
    "Allah ap ko lambi zindagi de! 🎂",
    "Hani apna ami abu ki farma bardar bana ✨",
    "App, hamesha hasti muskurati raho! ❤️",
    "Happy Birthday! 🎉"
  ];

  const handleCelebration = () => {
    confetti({
      particleCount: 1000,
      spread: 200,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#4db8ff', '#ffd700', '#228b22']
    });
  };

  // --- LOGIC: Automatic Wishes (Step 2) ---
  useEffect(() => {
    let wishInterval;
    if (step === 2) {
      const openTimer = setTimeout(() => setWishIndex(1), 500);
      wishInterval = setInterval(() => {
        setWishIndex((prev) => {
          if (prev < wishes.length) return prev + 1;
          setStep(1); 
          return 0;
        });
      }, 2500);
      return () => { clearTimeout(openTimer); clearInterval(wishInterval); };
    }
  }, [step, wishes.length]);

  // --- LOGIC: Automatic Photo Slideshow (Step 3) ---
  useEffect(() => {
    let photoInterval;
    if (step === 3 && photoIndex < HaniPhotos.length) {
      photoInterval = setInterval(() => {
        setPhotoIndex((prev) => prev + 1);
      }, 2000); // 2 second bad photo change
    }
    // Jab slideshow khatam ho, confetti chalao
    if (step === 3 && photoIndex === HaniPhotos.length) {
      handleCelebration();
    }
    return () => clearInterval(photoInterval);
  }, [step, photoIndex, HaniPhotos.length]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: Main Screen */}
        {step === 1 && (
          <motion.div key="main-ui" className="full-screen pink-bg" exit={{ opacity: 0 }}>
            <Ribbons />
            <Balloons />
            <div className="left-content-area">
              <motion.div className="birthday-rect-box" initial={{ x: -200 }} animate={{ x: 0 }} style={{ position: 'relative' }}>
                <div className="birthday-cap"></div> 
                <h1>HAPPY BIRTHDAY Hani</h1>
              </motion.div>
              <motion.div className="date-box" initial={{ x: -200 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
                <span>10 April 2026</span>
              </motion.div>
              <div className="icon-group">
                <div className="icon-btn" onClick={() => setStep(2)}>
                  <span>📩</span>
                  <p>Wishes</p>
                </div>
                <div className="icon-btn" onClick={() => { setStep(3); setPhotoIndex(0); }}>
                  <span>🎉</span>
                  <p>Celebrate</p>
                </div>
              </div>
            </div>
            <div className="right-photo-sidebar">
              <div className="sidebar-circle">
                <img src="Hani.jpg" alt="Hani" className="sidebar-img" />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Automatic Wishes Card */}
        {step === 2 && (
          <motion.div key="wishes" className="full-screen pink-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Balloons />
            <div className={`card-3d-container ${wishIndex > 0 ? 'is-open' : ''}`}>
              <div className={`book-card ${wishIndex > 0 ? 'is-flipped' : ''}`}>
                <div className="book-front">
                  <div className="cover-design"><h2>To Hani ❤️</h2></div>
                </div>
                <div className="book-inside">
                  <div className="wish-content">
                    <span className="page-number">{wishIndex}/{wishes.length}</span>
                    <motion.p key={wishIndex} className="wish-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {wishes[wishIndex - 1]}
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Slideshow then Cake */}
        {step === 3 && (
          <motion.div key="step3" className="full-screen green-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Ribbons />
            <Balloons />

            <AnimatePresence mode="wait">
              {photoIndex < HaniPhotos.length ? (
                // Part A: Slideshow
                <motion.div key={photoIndex} className="slideshow-container" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <img src={HaniPhotos[photoIndex]} alt="Memories" className="slideshow-img" />
                  <h1 className="slideshow-text">Beautiful Moments...</h1>
                </motion.div>
              ) : (
                // Part B: Final Cake
                <motion.div className="cake-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                  <h1 className="cake-title">Happy Birthday Hani</h1>
                  <div className="cake-container">
                    <motion.div className="candle" onClick={handleCelebration} initial={{ y: -800 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring" }}>🕯️</motion.div>
                    <motion.div className="base-white">
                      <div className="cake-top"></div> 
                      <div className="drip pink-drip"></div>
                      <div className="drip white-drip"></div>
                      <div className="drip purple-drip"></div>
                      <div className="drip red-drip"></div>
                      <div className="toppings-container">
                        <span className="topping">🧁</span>
                        <span className="topping">🧁</span>
                      </div>
                    </motion.div>
                    <div className="cake-plate"><div className="floor-stand"></div></div>
                  </div>
                  <button className="back-btn" onClick={() => setStep(1)}>← Wapis</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;