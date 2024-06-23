import React, { useEffect } from "react";
import Layout from "../Layout";
import KustomSelesaiList from "../../components/KustomSelesai/KustomSelesaiList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const KustomSelesai = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <KustomSelesaiList />
    </Layout>
  );
};

export default KustomSelesai;
