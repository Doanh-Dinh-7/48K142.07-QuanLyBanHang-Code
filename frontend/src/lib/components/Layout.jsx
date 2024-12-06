import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div>
      <Header /> {/* Header chỉ hiển thị trên các route con */}
      <main>
        <Outlet /> {/* Các route con sẽ render tại đây */}
      </main>
    </div>
  );
};

export default Layout;
