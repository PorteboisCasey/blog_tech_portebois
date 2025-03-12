import { useCallback, useEffect, useMemo } from "react";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../context/ThemeContext";

const ParticlesBackground = () => {
  const { isDarkMode } = useTheme?.() || { isDarkMode: false };

  // Initialize the tsParticles instance
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Configure particles based on current theme
  const options = useMemo(() => {
    return {
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: isDarkMode ? "#ffffff" : "#333333",
        },
        links: {
          color: isDarkMode ? "#ffffff" : "#333333",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          random: true,
          speed: 1,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: true,
            mode: "connect",
          },
          resize: true,
        },
        modes: {
          connect: {
            distance: 150,
            links: {
              opacity: 0.2,
            },
            radius: 120,
          },
        },
      },
      detectRetina: true,
    };
  }, [isDarkMode]);

  return <Particles id="tsparticles" options={options} init={particlesInit} />;
};

export default ParticlesBackground;
