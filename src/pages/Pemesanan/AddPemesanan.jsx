import React, { useEffect } from "react";
import Layout from "../Layout";
import FormAddPemesanan from "../../components/Pemesanan/FormAddPemesanan";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddPemesanan = () => {
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
      <FormAddPemesanan />
    </Layout>
  );
};

export default AddPemesanan;
