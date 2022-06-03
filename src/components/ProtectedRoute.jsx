import Layout from "./Layout";

const ProtectedRoute = ({ user, component }) => {
  return <Layout>{component}</Layout>;
};

export default ProtectedRoute;
