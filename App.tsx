import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <Layout currentPage="dashboard">
      <Dashboard />
    </Layout>
  );
}