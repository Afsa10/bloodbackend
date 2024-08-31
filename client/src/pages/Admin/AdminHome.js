import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
          

Welcome to the Admin Dashboard of the Blood Bank Management System. As an administrator, you play a crucial role in ensuring the seamless operation and management of our blood bank. This system is designed to facilitate efficient tracking of blood inventory, manage donor and recipient information, schedule donation appointments, and monitor blood distribution. Your oversight and coordination help us maintain a reliable and safe blood supply, ensuring that every patient in need receives timely and appropriate care. Thank you for your dedication to this vital service.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
