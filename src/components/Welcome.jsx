import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Chart } from "chart.js/auto";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h3 className="subtitle text-center">Custom Culture Motorcycle, Let's Ride to be Fun!</h3>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Welcome;
