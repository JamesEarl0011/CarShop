import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateStyles = () => {
    const opacity = Math.max(0, 1 - scrollPosition / 300);

    return {
      landingCar: {
        opacity,
        transform: `translateY(${scrollPosition * 0.8}px)`,
      },
      grass: {
        opacity,
        transform: `translateY(${scrollPosition * 0.6}px)`,
      },
      luxuriousText: {
        opacity,
        transform: `translateY(${-scrollPosition * 0.5}px)`,
      },
      glass: {
        opacity,
        transform: `translateX(${-scrollPosition * 0.8}px)`,
      },
    };
  };

  const handleExplore = () => {
    navigate("/store");
  };

  const styles = calculateStyles();

  return (
    <>
      <div className="landing-container">
        <img className="logo" src="/logo.png" />
        <img className="bg" src="/bg.jpg" />
        <img className="grass" src="/grass.png" style={styles.grass} />
        <img
          className="LandingCar"
          src="/landing-car.png"
          style={styles.landingCar}
        />
        <h1 className="luxurious-text" style={styles.luxuriousText}>
          Masterpieces in Motion
        </h1>
        <div className="glass" style={styles.glass}>
          <h3 className="pinyon-text">
            Velozium brings iconic cars to life with 3D models and next-gen
            browsing. Own the car. Experience the legend.
          </h3>
        </div>
      </div>
      <div className="CTA">
        <h1 className="headline">“Start Your Legacy Today”</h1>
        <h3 className="subheadline">
          “Dive into the world of collectible cars — now in 3D.”
        </h3>
        <button className="explore" onClick={handleExplore}>
          Explore Now!
        </button>
      </div>
    </>
  );
};

export default LandingPage;
