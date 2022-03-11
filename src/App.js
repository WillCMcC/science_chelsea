import React from "react";

import "./App.css";

function App() {
  return (
    <div className="main-container">
      <button className="cv" download="public/tree.jpg">
        Download CV{" "}
      </button>

      <span className="title">Science. Adventure. Commuity</span>
      <div className="text">
        <span className="left">
          Fostering cross-team communication to ensure smooth operation.{" "}
        </span>
        <span className="right">
          With a diverse scientific background, I have had the privilege of
          being present for the start up of diverse laboratories across the
          disciplines of biology, ecology, chemistry, and, currently,
          biochemistry, from government to private, start-up to corporate. I
          have grown to be a detail oriented, skilled technician acquiring
          competency on a gambit of instrumentation, developing methods and
          protocols, training staff on safety and operation, and conducting
          regular maintenance and repair. My success has afforded me increasing
          responsibility. I continue to raise to leadership positions in every
          organization where I am hired for my technical skill and am seeking my
          next opportunity for growth as a scientist and leader.
        </span>
      </div>
    </div>
  );
}

export default App;
