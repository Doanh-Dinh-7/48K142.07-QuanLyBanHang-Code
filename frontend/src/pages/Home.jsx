import { Flex } from "@chakra-ui/react";
import SideBar from "../lib/components/home/SideBar";
import MidBar from "../lib/components/home/Midbar";
import ViewInfoOder from "../lib/components/home/ViewInfoOrder";
import { useState } from "react";

const HomePage = () => {
  // Trạng thái để lưu danh sách các sản phẩm và số lượng
  const [order, setOrder] = useState([]);

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateOrder = (productName, quantity, price) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      const productIndex = updatedOrder.findIndex(
        (product) => product.name === productName
      );
      if (productIndex !== -1) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
        updatedOrder[productIndex].quantity = quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ
        updatedOrder.push({ name: productName, quantity, price });
      }
      return updatedOrder;
    });
  };

  return (
    <Flex maxWidth={"100vw"} maxHeight={"100vh"}>
      <SideBar />
      <MidBar updateOrder={updateOrder} />
      <ViewInfoOder order={order} />
    </Flex>
  );
};

export default HomePage;
