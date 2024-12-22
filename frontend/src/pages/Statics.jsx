import { Button, Flex, Text } from "@chakra-ui/react";
import InvoiceList from "../lib/components/static/InvoiceList";

import ReceiptList from "../lib/components/static/ReceiptList";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoReceiptOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const StaticsPage = () => {
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
      case "invoice":
        return <InvoiceList />;
      case "receipt":
        return <ReceiptList />;
      default:
        return null;
    }
  };

  return (
    <Flex direction={"column"} height={"100vh"}>
      {/* Thanh menu với các đầu mục */}
      <Flex bg="gray.200" padding={4} gap={"5"} borderBottom="1px solid #ccc">
        <Button
          colorScheme={selectedTab === "invoice" ? "yellow" : "gray"}
          onClick={() => setSelectedTab("invoice")}
          style={{ padding: "0 0.5rem" }}
        >
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ padding: "0 0.5rem" }}
            alignContent={"space-around"}
          >
            <LiaFileInvoiceDollarSolid size={"1.5rem"} />
            <Text as={"span"} fontSize={"0.75rem"}>
              Xem danh sách hóa đơn
            </Text>
          </Flex>
        </Button>
        <Button
          colorScheme={selectedTab === "receipt" ? "yellow" : "gray"}
          onClick={() => setSelectedTab("receipt")}
        >
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ padding: "0 0.5rem" }}
            alignContent={"space-around"}
          >
            <IoReceiptOutline size={"1.5rem"} />
            <Text as={"span"} fontSize={"0.75rem"}>
              Danh sách phiếu nhập
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

export default StaticsPage;
