import React from "react";
import "./app-loader.css";
 
export const Apploader = () => {
  return (
    <section className='app-loader'>
      <div className='bouncing-loader'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};