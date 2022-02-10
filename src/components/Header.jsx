import React from "react";

const Header = (props) => {
  return (
    <div className="hero ">
      <h1 className="text-5xl md:text-6xl subpixel-antialiased font-black text-center pt-12 text-slate-900">
        {props.message}
      </h1>
    </div>
  );
};

export default Header;
