import React, { useState, useEffect } from "react";

function App() {

  const vibes = ["😀", "😎", "🥳", "😴", "😢", "🤩"];

  const [selectedVibe, setSelectedVibe] = useState(null);
  const [date, setDate] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vibeData"));

    if (saved) {
      const today = new Date().toDateString();

      if (saved.date === today) {
        setSelectedVibe(saved.vibe);
        setDate(saved.date);
      }
    }
  }, []);

  const handleVibeClick = (vibe) => {
    const today = new Date().toDateString();

    const data = {
      vibe: vibe,
      date: today
    };

    localStorage.setItem("vibeData", JSON.stringify(data));

    setSelectedVibe(vibe);
    setDate(today);
  };

  const resetVibe = () => {
    localStorage.removeItem("vibeData");
    setSelectedVibe(null);
    setDate(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const styles = {

    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkMode ? "#121212" : "#f2f2f2",
      color: darkMode ? "white" : "black",
      fontFamily: "Arial"
    },

    container: {
      width: "420px",
      padding: "30px",
      borderRadius: "12px",
      textAlign: "center",
      backgroundColor: darkMode ? "#1e1e1e" : "white",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.15)"
    },

    title: {
      marginBottom: "20px"
    },

    emojiGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "12px",
      marginBottom: "20px"
    },

    emojiBox: (vibe) => ({
      fontSize: "35px",
      padding: "18px",
      borderRadius: "10px",
      cursor: "pointer",
      border: selectedVibe === vibe ? "3px solid #4CAF50" : "2px solid #ccc",
      backgroundColor: selectedVibe === vibe ? "#d4ffd4" : (darkMode ? "#2c2c2c" : "#fafafa"),
      transition: "0.2s"
    }),

    selectedText: {
      fontWeight: "bold",
      fontSize: "18px"
    },

    noMood: {
      fontWeight: "bold",
      fontSize: "16px",
      color: darkMode ? "#ccc" : "#777"
    },

    resetBtn: {
      marginTop: "15px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#ff4d4d",
      color: "white",
      cursor: "pointer"
    },

    themeBtn: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "8px 14px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      backgroundColor: darkMode ? "#444" : "#ddd"
    }

  };

  return (

    <div style={styles.page}>

      <button style={styles.themeBtn} onClick={toggleTheme}>
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <div style={styles.container}>

        <h2 style={styles.title}>Select Your Vibe Today</h2>

        <div style={styles.emojiGrid}>
          {vibes.map((vibe, index) => (
            <div
              key={index}
              style={styles.emojiBox(vibe)}
              onClick={() => handleVibeClick(vibe)}
            >
              {vibe}
            </div>
          ))}
        </div>

        {selectedVibe ? (
          <p style={styles.selectedText}>
            Selected Mood: {selectedVibe} on {date}
          </p>
        ) : (
          <p style={styles.noMood}>
            No vibe selected yet for today.
          </p>
        )}

        <button style={styles.resetBtn} onClick={resetVibe}>
          Reset Vibe
        </button>

      </div>

    </div>
  );
}

export default App;