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
import ViewReceipt from "./receipt/ViewReceipt";
import CostChart from "./receipt/CostChart";
import { BASE_URL } from "../../../App";

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [receiptDetails, setReceiptDetails] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [getCost, setGetCost] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [timeUnit, setTimeUnit] = useState("day");
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);

  // Lấy danh sách phiếu nhập từ API
  useEffect(() => {
    const getReciepts = async () => {
      try {
        const res = await fetch(BASE_URL + "/phieunhap");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setReceipts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReciepts();
  }, [refresh]);

  // Lấy danh sách chi tiết hóa đơn từ API
  const getReceiptDetails = async (receipt) => {
    try {
      const res = await fetch(BASE_URL + "/chitiethoadon/" + receipt?.MaHD);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setReceiptDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Xác nhận xóa phiếu nhập
  const handleDeleteConfirmation = (receipt) => {
    setSelectedReceipt(receipt);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteReceipts = () => {
    const deleteReceipts = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/phieunhap/" + selectedReceipt?.MaPN,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setRefresh(!refresh);
        toast({
          title: "Xóa phiếu nhập thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Xóa phiếu nhập thất bại",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    deleteReceipts();
    setIsDeleteAlertOpen(false);
    setSelectedReceipt(null);
  };

  const handleShowDetails = (receipt) => {
    setSelectedReceipt(receipt);
    getReceiptDetails(receipt);
    setIsModalOpen(true);
  };

  // API lấy chi phí dựa vào ngày bắt đầu và ngày kết thúc
  const getInfoCost = async (startDate, endDate) => {
    try {
      const res = await fetch(BASE_URL + "/cost", {
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
      setGetCost(data.cost);
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
        <Heading fontSize="1.5rem">Quản Lý Chi Phí</Heading>
      </Flex>
      <Flex height="73vh">
        <ViewReceipt
          receipts={receipts}
          receiptDetails={receiptDetails}
          onDelete={handleDeleteConfirmation}
          onShowDetails={handleShowDetails}
        />
        {/* Phần chọn mốc thời gian */}

        {/* Hiển thị biểu đồ doanh thu */}
        <Flex direction="column" align="center" padding="1rem" width="37vw">
          <CostChart
            data={receipts}
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
          {/* Nhập ngày bắt đầu và ngày kết thúc để tính Chi phí mặc định là ngày đầu tháng tới hiện tại */}
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
              onClick={() => getInfoCost(startDate, endDate)}
            >
              Tính
            </Button>
            {/* Show giá trị Doanh thu */}
            <Box fontWeight="bold" fontSize="1.5rem" color="red">
              {getCost.toLocaleString()} VND
            </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* Modal chi tiết Phiếu nhập */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi Tiết Hóa Đơn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="0.5rem">
              <Flex gap={"2"}>
                <strong>Mã phiếu nhập:</strong> {selectedReceipt?.MaPN}
              </Flex>
              <Flex gap={"2"}>
                <strong>Ngày lập:</strong> {selectedReceipt?.NgayLap}
              </Flex>

              <Flex gap={"2"}>
                <strong>Mã nhân viên:</strong> {selectedReceipt?.MaNV}
              </Flex>
              <Flex gap={"2"}>
                <strong>Mã nhà cung cấp:</strong> {selectedReceipt?.MaNCC}
              </Flex>
              <Flex gap={"2"}>
                <strong>Phương thức thanh toán:</strong>
                {selectedReceipt?.PhuongThucThanhToan === 1
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </Flex>
              <Flex direction={"column"}>
                <strong>Chi tiết nguyên liệu:</strong>
                <ul>
                  {receiptDetails
                    .filter((detail) => detail.MaPN === selectedReceipt?.MaPN)
                    .map((detail) => (
                      <li key={detail.MaNL}>
                        Mã nguyên liệu: {detail.MaNL}, Số lượng:{" "}
                        {detail.SoLuong}, Thành tiền:{" "}
                        {detail.ThanhTien.toLocaleString()} VND
                      </li>
                    ))}
                  <Flex gap={"2"}>
                    <strong>Tổng cộng:</strong>
                    {selectedReceipt?.TongTien.toLocaleString()} VND
                    <strong>Tax:</strong>
                    {(
                      (selectedReceipt?.TienVAT / selectedReceipt?.TongTien) *
                      100
                    ).toLocaleString()}
                    %
                  </Flex>
                  <Flex gap={"2"}>
                    <strong>Tiền VAT:</strong>
                    {selectedReceipt?.TienVAT.toLocaleString()} VND
                  </Flex>
                  <Flex alignItems={"flex-end"} gap={"2"}>
                    <strong>Tổng tiền:</strong>
                    <Text fontWeight={"bold"} color={"red"} fontSize={"2rem"}>
                      {selectedReceipt?.TongCong.toLocaleString()}
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

      {/* AlertDialog Xóa Phiếu nhập */}
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
              Bạn có chắc muốn xóa Phiếu nhập **{selectedReceipt?.MaPN}** không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button colorScheme="red" onClick={handleDeleteReceipts} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ReceiptList;
