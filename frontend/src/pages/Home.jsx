import { Flex, useToast } from "@chakra-ui/react";
import SideBar from "../lib/components/home/SideBar";
import MidBar from "../lib/components/home/Midbar";
import ViewInfoOder from "../lib/components/home/ViewInfoOrder";
import { useState } from "react";
const HomePage = () => {
  // Trạng thái để lưu danh sách các sản phẩm và số lượng
  const [order, setOrder] = useState({
    orderId: "",
    MaNV: "",
    NgayLap: new Date().toISOString().split("T")[0],
    TongTien: 0,
  });
  const [orderDetail, setOrderDetail] = useState([]);

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateOrderDetail = (MaSP, TenSP, SoLuong, DonGiaBan) => {
    setOrderDetail((prevOrder) => {
      const updatedOrder = [...prevOrder];
      const orderIndex = updatedOrder.findIndex(
        (order) => order.orderId === "" && order.MaSP === MaSP
      );
      if (orderIndex !== -1) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
        updatedOrder[orderIndex].SoLuong = SoLuong;
      } else {
        // Thêm sản phẩm mới vào giỏ
        updatedOrder.push({
          orderId: "",
          MaSP: MaSP,
          TenSP: TenSP,
          SoLuong: SoLuong,
          DonGiaBan: DonGiaBan,
          ThanhTien: SoLuong * DonGiaBan,
        });
      }
      return updatedOrder;
    });
  };

  return (
    <Flex maxWidth={"100vw"} maxHeight={"100vh"}>
      <SideBar />
      <MidBar updateOrderDetail={updateOrderDetail} />
      <ViewInfoOder
        order={order}
        setOrder={setOrder}
        orderDetail={orderDetail}
        setOrderDetail={setOrderDetail}
      />
    </Flex>
  );
};

export default HomePage;
