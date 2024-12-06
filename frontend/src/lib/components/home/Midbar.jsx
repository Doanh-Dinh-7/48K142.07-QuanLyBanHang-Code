import {
  Button,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CardProduct from "./CardProduct";
import { useState } from "react";

const MidBar = ({ updateOrder }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Sử dụng useDisclosure
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn
  const [quantity, setQuantity] = useState(); // Số lượng sản phẩm

  // Mock danh sách sản phẩm
  const products = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    price: 21000 + index * 1000,
  }));

  // Mở modal và lưu thông tin sản phẩm
  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(); // Reset số lượng về mặc định
    onOpen(); // Kích hoạt modal
  };

  // Lưu số lượng
  const updateQuantity = () => {
    if (quantity < 1) {
      alert("Số lượng phải lớn hơn hoặc bằng 1!");
      return;
    }
    console.log(
      `Đã cập nhật số lượng ${quantity} cho sản phẩm ${selectedProduct}`
    );
    updateOrder(selectedProduct.name, quantity, selectedProduct.price); // Gọi hàm updateOrder từ HomePage
    onClose(); // Đóng modal
  };

  return (
    <>
      <Flex
        direction={"column"}
        gap={"5"}
        alignItems={"center"}
        p={"3"}
        bg={"#f0f0f0"}
        alignContent={"center"}
      >
        <Text fontWeight={"bold"}>Danh sách món</Text>
        <Grid
          gridTemplateColumns="repeat(2, 1fr)"
          gap={"5"}
          justifyContent={"center"}
          minWidth={"45vw"}
          maxHeight={"75vh"}
          overflowY={"auto"}
          overflowX={"hidden"}
          p={2}
          borderRadius={"md"}
          boxShadow={"sm"}
        >
          {products.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              price={product.price}
              onClick={() => openModal(product)}
            />
          ))}
        </Grid>

        {/* Modal nhập số lượng */}
        {/* Modal nhập số lượng */}
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalCloseButton />
          <ModalContent>
            <ModalHeader>Nhập số lượng</ModalHeader>
            <ModalBody>
              {selectedProduct && (
                <>
                  <Text mb={2}>
                    Sản phẩm:{" "}
                    <span
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedProduct.name}
                    </span>
                  </Text>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    placeholder="Nhập số lượng"
                    focusBorderColor="blue.500"
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" mr={3} onClick={updateQuantity}>
                Cập nhật
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Huỷ
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default MidBar;
