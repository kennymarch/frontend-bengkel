import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Chart } from "chart.js/auto";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h3 className="subtitle">
        Selamat Datang Kembali <p className="fs-4 fw-bold">{user && user.name}</p>
      </h3>

      <canvas id="myChart"></canvas>
    </div>
  );
};

export default Welcome;
