import React from "react";
import { Spring } from "react-spring/renderprops";

const LandingPage = () => {
  return (
    <Spring
      from={{ opacity: 1 }}
      to={{ opacity: 0 }}
      config={{ delay: 3000, duration: 1000 }}
    >
      {(props) => (
        <div style={props}>
          <div className="landing-screen">
            <h3 className="mt-4 mb-0">Welcome To</h3>
            <h1 className="mt-1">Discoverhood</h1>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default LandingPage;
