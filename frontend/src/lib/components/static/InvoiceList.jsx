import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  Select,
  useToast,
} from "@chakra-ui/react";
import ViewInvoice from "./invoice/ViewInvoice";
import RevenueChart from "./invoice/RevenueChart";
import { BASE_URL } from "../../../App";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [getRevenue, setGetRevenue] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [timeUnit, setTimeUnit] = useState("day");

  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  // Lấy danh sách hóa đơn từ API
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const res = await fetch(BASE_URL + "/hoadon");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setInvoices(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInvoices();
  }, [refresh]);

  // useEffect(() => {
  //   console.log(selectedInvoice);
  // }, [selectedInvoice]);

  // Lấy danh sách chi tiết hóa đơn từ API
  const getInvoiceDetails = async (invoice) => {
    try {
      const res = await fetch(BASE_URL + "/chitiethoadon/" + invoice?.MaHD);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setInvoiceDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Xác nhận xóa hóa đơn
  const handleDeleteConfirmation = (invoice) => {
    setSelectedInvoice(invoice);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteInvoices = () => {
    const deleteInvoices = async () => {
      try {
        const res = await fetch(BASE_URL + "/hoadon/" + selectedInvoice?.MaHD, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setRefresh(!refresh);
        toast({
          title: "Thành công",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Xóa hoá đơn thất bại",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    deleteInvoices();
    setIsDeleteAlertOpen(false);
    setSelectedInvoice(null);
  };

  const handleShowDetails = (invoice) => {
    setSelectedInvoice(invoice);
    getInvoiceDetails(invoice);
    setIsModalOpen(true);
  };

  // API lấy doanh thu dựa vào ngày bắt đầu và ngày kết thúc
  const getInfoRevenue = async (startDate, endDate) => {
    try {
      const res = await fetch(BASE_URL + "/revenue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ThoiGianBatDau: startDate,
          ThoiGianKetThuc: endDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setGetRevenue(data.revenue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction="column">
      <Flex
        width="100vw"
        justifyContent="center"
        bg="#4782b4"
        style={{ padding: "0.2rem 0" }}
      >
        <Heading fontSize="1.5rem">Quản Lý Doanh Thu</Heading>
      </Flex>
      <Flex height="73vh">
        <ViewInvoice
          invoices={invoices}
          invoiceDetails={invoiceDetails}
          onDelete={handleDeleteConfirmation}
          onShowDetails={handleShowDetails}
        />
        {/* Phần chọn mốc thời gian */}

        {/* Hiển thị biểu đồ doanh thu */}
        <Flex
          direction="column"
          align="center"
          padding="1rem"
          width="45vw"
          gap={"3"}
        >
          <RevenueChart
            data={invoices}
            timeUnit={timeUnit}
            startDate={startDate}
            endDate={endDate}
          />

          <Box fontWeight="bold">Chọn mốc thời gian:</Box>
          <Select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            width="200px"
          >
            <option value="day">Ngày</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </Select>
          {/* Nhập ngày bắt đầu và ngày kết thúc để tính Doanh thu mặc định là ngày đầu tháng tới hiện tại */}
          <Flex align="center" gap={"2"}>
            <Flex direction={"column"} gap={"0.5rem"}>
              <Box fontWeight="bold">Từ ngày:</Box>
              <input
                type="date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Flex>
            <Flex direction={"column"} gap={"0.5rem"}>
              <Box fontWeight="bold">Đến ngày:</Box>
              <input
                type="date"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </Flex>
            <Button
              colorScheme="blue"
              style={{ marginTop: "1rem" }}
              onClick={() => getInfoRevenue(startDate, endDate)}
            >
              Tính
            </Button>
            {/* Show giá trị Doanh thu */}
            <Box fontWeight="bold" fontSize="1.5rem" color="red">
              {getRevenue.toLocaleString()} VND
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* Modal chi tiết hóa đơn */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi Tiết Hóa Đơn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="0.5rem">
              <Flex gap={"2"}>
                <strong>Mã hóa đơn:</strong> {selectedInvoice?.MaHD}
              </Flex>
              <Flex gap={"2"}>
                <strong>Ngày lập:</strong>
                {selectedInvoice?.NgayLap}
              </Flex>
              <Flex gap={"2"}>
                <strong>Mã nhân viên:</strong> {selectedInvoice?.MaNV}
              </Flex>
              <Flex gap={"2"}>
                <strong>Phương thức thanh toán:</strong>{" "}
                {selectedInvoice?.PhuongThucThanhToan === 1
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </Flex>
              <Flex direction={"column"}>
                <strong>Chi tiết sản phẩm:</strong>
                <ul>
                  {invoiceDetails
                    .filter((detail) => detail.MaHD === selectedInvoice?.MaHD)
                    .map((detail) => (
                      <li key={detail.MaHD}>
                        Mã sản phẩm: {detail.MaSP}, Số lượng: {detail.SoLuong},
                        Thành tiền: {detail.ThanhTien.toLocaleString()} VND
                      </li>
                    ))}
                  <Flex alignItems={"flex-end"} gap={"2"}>
                    <strong>Tổng tiền:</strong>{" "}
                    <Text fontWeight={"bold"} color={"red"} fontSize={"2rem"}>
                      {selectedInvoice?.TongTien.toLocaleString()}
                    </Text>
                    VND
                  </Flex>
                </ul>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* AlertDialog Xóa hóa đơn */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Hóa Đơn
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa hóa đơn **{selectedInvoice?.MaHD}** không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button colorScheme="red" onClick={handleDeleteInvoices} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default InvoiceList;
