import { Button, Flex, Text } from "@chakra-ui/react";
import EmployeeManagement from "../lib/components/manager/EmployeeManagement";
import ProductManagement from "../lib/components/manager/ProductManagement ";
import MaterialManagement from "../lib/components/manager/MaterialManagement ";

import { RiFolderUserLine } from "react-icons/ri";
import { AiOutlineProduct, AiOutlineShoppingCart } from "react-icons/ai";

import { useEffect, useState } from "react";

const ManagerPage = () => {
  const [selectedTab, setSelectedTab] = useState(""); // Trạng thái đầu mục được chọn

  // Khôi phục trạng thái từ localStorage khi load trang
  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      setSelectedTab(savedTab);
    }
  }, []);

  // Cập nhật trạng thái vào localStorage khi selectedTab thay đổi
  useEffect(() => {
    if (selectedTab) {
      localStorage.setItem("selectedTab", selectedTab);
    }
  }, [selectedTab]);

  // Hàm render component dựa trên đầu mục được chọn
  const renderContent = () => {
    switch (selectedTab) {
      case "employee":
        return <EmployeeManagement />;
      case "product":
        return <ProductManagement />;
      case "material":
        return <MaterialManagement />;
      default:
        return null;
    }
  };

  return (
    <Flex direction={"column"} height={"100vh"}>
      {/* Thanh menu với các đầu mục */}
      <Flex bg="gray.200" padding={4} gap={"5"} borderBottom="1px solid #ccc">
        <Button
          colorScheme={selectedTab === "employee" ? "yellow" : "gray"}
          onClick={() => setSelectedTab("employee")}
          style={{ padding: "0 0.5rem" }}
        >
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ padding: "0 0.5rem" }}
            alignContent={"space-around"}
          >
            <RiFolderUserLine size={"1.5rem"} />
            <Text as={"span"} fontSize={"0.75rem"}>
              Quản lý nhân viên
            </Text>
          </Flex>
        </Button>
        <Button
          colorScheme={selectedTab === "product" ? "yellow" : "gray"}
          onClick={() => setSelectedTab("product")}
        >
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ padding: "0 0.5rem" }}
            alignContent={"space-around"}
          >
            <AiOutlineProduct size={"1.5rem"} />
            <Text as={"span"} fontSize={"0.75rem"}>
              Quản lý sản phẩm
            </Text>
          </Flex>
        </Button>
        <Button
          colorScheme={selectedTab === "material" ? "yellow" : "gray"}
          onClick={() => setSelectedTab("material")}
        >
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ padding: "0 0.5rem" }}
            alignContent={"space-around"}
          >
            <AiOutlineShoppingCart size={"1.5rem"} />
            <Text as={"span"} fontSize={"0.75rem"}>
              Quản lý nguyên liệu
            </Text>
          </Flex>
        </Button>
      </Flex>

      {/* Khu vực hiển thị nội dung chi tiết */}
      <Flex flex="1" bg="white">
        {renderContent()}
      </Flex>
    </Flex>
  );
};

export default ManagerPage;
