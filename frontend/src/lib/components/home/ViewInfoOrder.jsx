import {
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { default as VNnum2words } from "vn-num2words";
import { BsCashStack } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../App";

const ViewInfoOder = ({ order, setOrder, orderDetail, setOrderDetail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalPay, setTotalPay] = useState(0);
  const [totalInWords, setTotalInWords] = useState("");

  const toast = useToast();
  // Lưu các orderDetail không có orderId vào trong state

  // useEffect(() => {
  //   console.log("order", order);
  //   console.log("orderDetail", orderDetail);
  // }, [order, orderDetail]);

  const calculateTotalPay = () => {
    return orderDetail.reduce((sum, item) => sum + item.ThanhTien, 0);
  };

  useEffect(() => {
    const updateTotalPay = calculateTotalPay();
    setTotalPay(updateTotalPay);
    setTotalInWords(VNnum2words(updateTotalPay));
    setOrder((prevOrder) => ({ ...prevOrder, TongTien: updateTotalPay }));
  }, [orderDetail]);

  // Xử lý xoá sản phẩm
  const handleDeleteOrderDetail = (index) => {
    setOrderDetail(orderDetail.filter((_, i) => i !== index));
  };

  // Xử lý khi nhấn nút OK
  const handlePayment = async () => {
    const maHD = await addOrder2API(order);
    // Xử lý bất đồng bộ khi thêm chi tiết hóa đơn trong OrderDetail
    for (const detail of orderDetail) {
      await addOrderDetail2API(detail, maHD);
    }
    setOrder({
      orderId: "",
      MaNV: "",
      // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
      NgayLap: new Date().toISOString().split("T")[0],
      TongTien: 0,
    });
    setOrderDetail([]);
    setTimeout(() => {
      onClose(); // Đóng modal
    }, 2000);
  };

  // API Thêm hoá đơn
  const addOrder2API = async () => {
    try {
      const res = await fetch(BASE_URL + "/hoadon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NgayLap: order.NgayLap,
          MaNV: order.MaNV,
          TongTien: parseFloat(order.TongTien),
          PhuongThucThanhToan: 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return data.MaHD;
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // API Thêm chi tiết phiếu nhập
  const addOrderDetail2API = async (detail, maHD) => {
    try {
      const res = await fetch(BASE_URL + "/chitiethoadon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaHD: maHD,
          MaSP: detail.MaSP,
          SoLuong: detail.SoLuong,
          ThanhTien: detail.ThanhTien,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        direction={"column"}
        bg={"#dbdbdb"}
        width={"45vw"}
        alignItems={"center"}
        gap={"1"}
        p={"3"}
      >
        <Text fontWeight={"bold"}>Thông tin đơn hàng</Text>
        <Stack bg="white" width="40vw" height={"50vh"}>
          <Grid templateColumns="repeat(5, 1fr)" gap={"2"} textAlign={"center"}>
            <Text fontWeight="bold" color={"red"}>
              Tên sản phẩm
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Số lượng
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Đơn giá
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Thành tiền
            </Text>
            <Text fontWeight="bold" color={"red"}>
              Hành động
            </Text>

            {orderDetail.map((product, index) => (
              <React.Fragment key={index}>
                <Text>{product.TenSP}</Text>
                <Text>{product.SoLuong}</Text>
                <Text>{product.DonGiaBan.toLocaleString()} VND</Text>
                <Text>{product.ThanhTien.toLocaleString()} VND</Text>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteOrderDetail(index)}
                >
                  Xoá
                </Button>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
        <Flex
          direction={"column"}
          alignContent={"center"}
          gap={"5"}
          width={"40vw"}
          marginTop={"5"}
        >
          <Text color={"red"} fontWeight={"bold"}>
            Tổng Tiền:{" "}
            <Text as="span" fontSize={"3xl"} marginLeft={"1vw"}>
              {totalPay.toLocaleString()} VND
            </Text>
          </Text>

          <Text fontWeight="bold" mt={2} textAlign="left">
            Bằng chữ:{" "}
            <Text as="span" marginLeft={"1vw"}>
              {totalInWords} đồng
            </Text>
          </Text>

          <Flex justifyContent={"center"} alignContent={"center"}>
            <Button textAlign={"center"} bg={"green.400"} onClick={onOpen}>
              <BsCashStack style={{ marginRight: "1vw" }} />
              <Text>Thanh Toán</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Modal Thanh Toán */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thông tin thanh toán</ModalHeader>
          <ModalBody>
            <Text>
              Tổng tiền:{" "}
              <Text as="span" fontWeight="bold">
                {totalPay.toLocaleString()} VND
              </Text>
            </Text>
            <Text mt={2}>
              Bằng chữ:{" "}
              <Text as="span" fontWeight="bold">
                {totalInWords} đồng
              </Text>
            </Text>
            <Input
              mt={4}
              placeholder="Nhập mã nhân viên"
              value={order.MaNV}
              onChange={(e) =>
                setOrder((prevOrder) => ({
                  ...prevOrder,
                  MaNV: e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePayment}>
              OK
            </Button>
            <Button onClick={onClose}>Huỷ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewInfoOder;
