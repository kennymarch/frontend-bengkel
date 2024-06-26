import React, { useEffect } from "react";
import Layout from "../Layout";
import FormUpdateKustomSelesai from "../../components/KustomSelesai/FormUpdateKustomSelesai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditKustomSelesai = () => {
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
      <FormUpdateKustomSelesai />
    </Layout>
  );
};

export default EditKustomSelesai;
