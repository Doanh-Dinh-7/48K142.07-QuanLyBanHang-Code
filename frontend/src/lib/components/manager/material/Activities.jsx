import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
  FormControl,
  FormLabel,
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
  Select,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { LuArchive, LuClipboardList } from "react-icons/lu";
import { TfiPencilAlt } from "react-icons/tfi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BASE_URL } from "../../../../App";

const Activities = ({ materials }) => {
  const [isModalOpen, setIsInfoSupplierModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const toast = useToast();
  // const [suppliers, setSuppliers] = useState([
  //   { id: "NCC001", name: "Nhà Cung Cấp 1", address: "Địa chỉ 1" },
  //   { id: "NCC002", name: "Nhà Cung Cấp 2", address: "Địa chỉ 2" },
  // ]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    address: "",
  });
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await fetch(BASE_URL + "/nhacungcap");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setSuppliers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSuppliers();
  }, [refresh]);

  // Khi cần refresh lại dữ liệu
  const refreshData = () => {
    setRefresh((prev) => !prev);
  };

  const handleAddSupplier2API = () => {
    const addSupplier = async () => {
      try {
        const res = await fetch(BASE_URL + "/nhacungcap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TenNCC: newSupplier.name,
            DiaChi: newSupplier.address,
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
        setNewSupplier({ name: "", address: "" });
        refreshData();
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
    addSupplier();
  };
  // const handleEditSupplier = () => {
  //   setSuppliers(
  //     suppliers.map((supplier) =>
  //       supplier.id === selectedSupplier.id ? selectedSupplier : supplier
  //     )
  //   );
  //   setSelectedSupplier(null);
  // };

  const handleEditSupplier2API = () => {
    const editSupplier = async () => {
      try {
        const res = await fetch(
          BASE_URL + "/nhacungcap/" + selectedSupplier.MaNCC,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              TenNCC: selectedSupplier.TenNCC,
              DiaChi: selectedSupplier.DiaChi,
            }),
          }
        );
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
        setSelectedSupplier(null);
        refreshData();
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
    editSupplier();
  };

  // const handleDeleteSupplier = (supplierId) => {
  //   setSuppliers(suppliers.filter((supplier) => supplier.id !== supplierId));
  //   setSelectedSupplier(null);
  // };

  const handleDeleteSupplier2API = (supplierId) => {
    const deleteSupplier = async () => {
      try {
        const res = await fetch(BASE_URL + "/nhacungcap/" + supplierId, {
          method: "DELETE",
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
        refreshData();
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
    deleteSupplier();
  };

  const [OrderDetail, setOrderDetail] = useState([]);
  const [newOrder, setNewOrder] = useState({
    NgayLap: "",
    MaNV: "",
    TongTien: 0,
    TienVAT: 0,
    TongCong: 0,
    MaNCC: "",
  });

  const [newOrderDetail, setNewOrderDetail] = useState({
    MaPN: "",
    MaNL: "",
    SoLuong: 0,
    ThanhTien: 0,
    ThueTax: 0.08,
    GiaNhap: 0,
  });

  const handleOpenInfoSupplierModal = () => setIsInfoSupplierModalOpen(true);
  const handleCloseInfoSupplierModal = () => setIsInfoSupplierModalOpen(false);
  const handleOpenOrderModal = () => setIsOrderModalOpen(true);
  const handleCloseOrderModal = () => setIsOrderModalOpen(false);

  useEffect(() => {
    const updatedTotalMoney = calculateTotalMoney();
    const updatedVAT = updatedTotalMoney * newOrderDetail.ThueTax;
    const updatedTotalCost = updatedTotalMoney + updatedVAT;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      TongCong: updatedTotalCost,
      TienVAT: updatedVAT,
      TongTien: updatedTotalMoney,
    }));
  }, [OrderDetail]); // Chỉ chạy khi OrderDetail thay đổi

  const handleAddOrderDetail = () => {
    newOrderDetail.MaPN = newOrder.MaPN;
    setOrderDetail([...OrderDetail, { ...newOrderDetail }]);
    setNewOrderDetail({
      MaPN: "",
      MaNL: "",
      SoLuong: 0,
      ThanhTien: 0,
      ThueTax: 0.08,
      GiaNhap: 0,
    });
  };

  const handleEditOrderDetail = (index) => {
    const detail = OrderDetail[index];
    setNewOrderDetail(detail);
    setOrderDetail(OrderDetail.filter((_, i) => i !== index)); // Xóa tạm để chỉnh sửa
  };

  const handleDeleteOrderDetail = (index) => {
    setOrderDetail(OrderDetail.filter((_, i) => i !== index));
  };

  const handleSaveOrder = async () => {
    const maPN = await addOrder2API(newOrder);
    // Xử lý bất đồng bộ khi thêm chi tiết phiếu nhập trong OrderDetail
    for (const detail of OrderDetail) {
      await addOrderDetail2API(detail, maPN);
    }
    setNewOrder({
      MaPN: "",
      MaNL: "",
      SoLuong: 0,
      ThanhTien: 0,
      ThueTax: 0,
    });
    setOrderDetail([]);
    setNewOrderDetail({
      MaPN: "",
      MaNL: "",
      SoLuong: 0,
      ThanhTien: 0,
      ThueTax: 0.08,
      GiaNhap: 0,
    });
    handleCloseOrderModal();
  };

  // API Thêm phiếu nhập
  const addOrder2API = async () => {
    try {
      const res = await fetch(BASE_URL + "/phieunhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NgayLap: newOrder.NgayLap,
          MaNV: newOrder.MaNV,
          TongTien: parseFloat(newOrder.TongTien),
          TienVAT: parseFloat(newOrder.TienVAT),
          TongCong: parseFloat(newOrder.TongCong),
          MaNCC: newOrder.MaNCC,
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
      return data.MaPN;
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
  const addOrderDetail2API = async (detail, maPN) => {
    try {
      const res = await fetch(BASE_URL + "/chitietphieunhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaPN: maPN,
          MaNL: detail.MaNL,
          SoLuong: detail.SoLuong,
          ThanhTien: detail.ThanhTien,
          ThueTax: detail.ThueTax,
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

  const calculateTotalMoney = () => {
    return OrderDetail.reduce(
      (sum, item) => sum + item.SoLuong * item.GiaNhap,
      0
    );
  };

  return (
    <Flex
      direction={"column"}
      width={"15vw"}
      bg={"#dbdbdb"}
      alignItems={"center"}
      gap={"7"}
      style={{ padding: "0 2rem " }}
    >
      <Text fontWeight={"bold"}>Xử lý</Text>
      {/* Nút "Thông tin nhà cung cấp" */}
      <Flex direction={"column"} minWidth={"10vw"}>
        <Button
          colorScheme="yellow"
          variant="solid"
          textAlign="center"
          whiteSpace="normal"
          height={"auto"}
          onClick={handleOpenInfoSupplierModal}
        >
          <Flex gap={"2"} alignItems={"center"}>
            <LuArchive fontSize={"3rem"} />
            <Text fontSize={"0.8rem"}>TT Nhà cung cấp</Text>
          </Flex>
        </Button>
      </Flex>

      {/* Nút "Đặt nguyên liệu" */}
      <Flex direction={"column"} minWidth={"10vw"}>
        <Button
          colorScheme="yellow"
          variant="solid"
          textAlign="center"
          whiteSpace="normal"
          height={"auto"}
          onClick={handleOpenOrderModal}
        >
          <Flex gap={"2"} alignItems={"center"}>
            <LuClipboardList fontSize={"3rem"} />
            <Text fontSize={"0.8rem"}>Nhập Nguyên liệu</Text>
          </Flex>
        </Button>
      </Flex>

      {/* Modal for Supplier Information */}
      <Modal isOpen={isModalOpen} onClose={handleCloseInfoSupplierModal}>
        <ModalOverlay />
        <ModalContent maxWidth="80vw">
          <ModalHeader>Danh Sách Nhà Cung Cấp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"2"} direction="row">
              {/* Left: Supplier List (70vw) */}
              <Box
                width="70vw"
                maxHeight="60vh" // Chiều cao tối đa của bảng
                overflowY="auto" // Thêm thanh cuộn dọc
                bg="white"
                borderRadius="md"
                boxShadow="sm"
              >
                <Table
                  bg="white"
                  width="50vw"
                  size="sm"
                  fontSize={"1rem"}
                  variant="striped"
                >
                  <Thead>
                    <Tr>
                      <Th>Mã nhà cung cấp</Th>
                      <Th>Tên nhà cung cấp</Th>
                      <Th>Địa chỉ</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {suppliers.map((supplier) => (
                      <Tr key={supplier.MaNCC}>
                        <Td>{supplier.MaNCC}</Td>
                        <Td>{supplier.TenNCC}</Td>
                        <Td>{supplier.DiaChi}</Td>
                        <Td>
                          <Flex gap="2">
                            <Button
                              size="sm"
                              leftIcon={<TfiPencilAlt />}
                              colorScheme="yellow"
                              onClick={() => setSelectedSupplier(supplier)}
                            >
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              leftIcon={<RiDeleteBin2Line />}
                              colorScheme="red"
                              onClick={() => (
                                setSelectedSupplier(supplier),
                                setIsDeleteAlertOpen(true)
                              )}
                            >
                              Xóa
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              {/* Right: Form for Add or Edit Supplier (10vw) */}
              <Box width="30vw" p="2" borderLeft="1px solid #ccc">
                {/* Add new supplier form */}
                <FormControl>
                  <FormLabel fontSize="sm">Thêm Nhà Cung Cấp</FormLabel>
                  <Input
                    placeholder="Tên NCC"
                    value={newSupplier.name}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, name: e.target.value })
                    }
                    mb="2"
                    fontSize="sm"
                  />
                  <Input
                    placeholder="Địa Chỉ"
                    value={newSupplier.address}
                    onChange={(e) =>
                      setNewSupplier({
                        ...newSupplier,
                        address: e.target.value,
                      })
                    }
                    mb="2"
                    fontSize="sm"
                  />
                  <Button
                    colorScheme="green"
                    size="sm"
                    width="100%"
                    onClick={handleAddSupplier2API}
                  >
                    Thêm
                  </Button>

                  {/* Edit Supplier form (if selected) */}
                  {selectedSupplier && (
                    <>
                      <FormLabel fontSize="sm" mt="4">
                        Sửa Nhà Cung Cấp
                      </FormLabel>
                      <Input
                        value={selectedSupplier.TenNCC}
                        onChange={(e) =>
                          setSelectedSupplier({
                            ...selectedSupplier,
                            TenNCC: e.target.value,
                          })
                        }
                        mb="2"
                        fontSize="sm"
                      />
                      <Input
                        value={selectedSupplier.DiaChi}
                        onChange={(e) =>
                          setSelectedSupplier({
                            ...selectedSupplier,
                            DiaChi: e.target.value,
                          })
                        }
                        mb="2"
                        fontSize="sm"
                      />
                      <Button
                        colorScheme="blue"
                        size="sm"
                        width="100%"
                        onClick={handleEditSupplier2API}
                      >
                        Cập Nhật
                      </Button>
                    </>
                  )}
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={handleCloseInfoSupplierModal}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Order Management */}
      <Modal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal}>
        <ModalOverlay />
        <ModalContent maxWidth="90vw">
          <ModalHeader>Đặt Nguyên Liệu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"9"} direction={"column"}>
              <FormControl>
                <Flex gap={"7vw"} width={"80%"}>
                  {/* Form chi tiết nhập liệu */}
                  <Flex direction={"column"} gap={"5"} width={"30%"}>
                    <Flex alignItems="center">
                      <Text width={"60%"}>Ngày</Text>
                      <Input
                        type="date"
                        value={newOrder.NgayLap}
                        onChange={(e) =>
                          setNewOrder({ ...newOrder, NgayLap: e.target.value })
                        }
                      />
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"60%"}>Mã nhân viên</Text>
                      <Input
                        value={newOrder.MaNV}
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            MaNV: e.target.value,
                          })
                        }
                      />
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"60%"}>Nhà Cung Cấp</Text>
                      <Select
                        placeholder="Chọn Nhà cũng cấp"
                        value={newOrder.MaNCC}
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            MaNCC: e.target.value,
                          })
                        }
                      >
                        {suppliers.map((supplier) => (
                          <option key={supplier.MaNCC} value={supplier.MaNCC}>
                            {supplier.TenNCC}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"60%"} color={"blue.700"}>
                        Tổng tiền
                      </Text>
                      <Text
                        color={"blue"}
                        fontWeight={"bold"}
                        fontSize={"2rem"}
                      >
                        {newOrder.TongTien}
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"60%"} color={"yellow.700"}>
                        Tiền Thuế VAT ({newOrderDetail.ThueTax * 100}%)
                      </Text>
                      <Text
                        color={"yellow.700"}
                        fontWeight={"bold"}
                        fontSize={"2rem"}
                      >
                        {newOrder.TienVAT}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* Form thêm chi tiết nguyên liệu */}
                  <Flex direction={"column"} gap={"5"} width={"30%"}>
                    <Flex alignItems="center">
                      <Text width={"50%"}>Nguyên liệu</Text>
                      <Select
                        placeholder="Chọn nguyên liệu"
                        value={newOrderDetail.MaNL}
                        onChange={(e) =>
                          setNewOrderDetail({
                            ...newOrderDetail,
                            MaNL: e.target.value,
                          })
                        }
                      >
                        {materials.map((material) => (
                          <option key={material.MaNL} value={material.MaNL}>
                            {material.TenNL}
                          </option>
                        ))}
                      </Select>
                    </Flex>

                    <Flex alignItems="center">
                      <Text width={"50%"}>Số lượng</Text>
                      <Input
                        type="number"
                        value={newOrderDetail.SoLuong}
                        onChange={(e) =>
                          setNewOrderDetail({
                            ...newOrderDetail,
                            SoLuong: e.target.value,
                          })
                        }
                      />
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"50%"}>Giá</Text>
                      <Input
                        type="number"
                        value={newOrderDetail.GiaNhap}
                        onChange={(e) =>
                          setNewOrderDetail({
                            ...newOrderDetail,
                            GiaNhap: e.target.value,
                            ThanhTien: e.target.value * newOrderDetail.SoLuong,
                          })
                        }
                      />
                    </Flex>
                    <Flex alignItems="center">
                      <Text width={"60%"} color={"red.700"}>
                        Tổng Cộng
                      </Text>
                      <Text color={"red"} fontWeight={"bold"} fontSize={"2rem"}>
                        {newOrder.TongCong}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center">
                    <Button colorScheme="blue" onClick={handleAddOrderDetail}>
                      Thêm
                    </Button>
                  </Flex>
                </Flex>
              </FormControl>

              {/* Bảng danh sách chi tiết nguyên liệu */}
              <Flex>
                <Table
                  bg="white"
                  width="80vw"
                  size="sm"
                  fontSize={"1rem"}
                  variant="striped"
                >
                  <Thead>
                    <Tr>
                      <Th>Mã nguyên liệu</Th>
                      <Th>Tên nguyên liệu</Th>
                      <Th>Số lượng</Th>
                      <Th>Đơn giá</Th>
                      <Th>Thành tiền</Th>
                      <Th>Hành động</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {OrderDetail.map((detail, index) => (
                      <Tr key={index}>
                        <Td>{detail.MaNL}</Td>
                        <Td>
                          {
                            materials.find(
                              (material) => material.MaNL === detail.MaNL
                            )?.TenNL
                          }
                        </Td>
                        <Td>{detail.SoLuong}</Td>
                        <Td>{detail.GiaNhap}</Td>
                        <Td>{detail.GiaNhap * detail.SoLuong}</Td>
                        <Td>
                          <Button
                            colorScheme="yellow"
                            size="sm"
                            onClick={() => handleEditOrderDetail(index)}
                          >
                            Sửa
                          </Button>
                          <Button
                            colorScheme="red"
                            size="sm"
                            ml="2"
                            onClick={() => handleDeleteOrderDetail(index)}
                          >
                            Xóa
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex gap={"3"}>
              <Button colorScheme="green" onClick={handleSaveOrder}>
                Lưu
              </Button>
              <Button colorScheme="gray" onClick={handleCloseOrderModal}>
                Đóng
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Thông báo xoá TT Nhà cung cấp */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Nhà Cung Cấp
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn muốn xóa Nhà Cung Cấp **
              <strong>{selectedSupplier?.TenNCC}</strong>
              **?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteSupplier2API(selectedSupplier.MaNCC);
                  setIsDeleteAlertOpen(false);
                }}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Activities;
