import { useState } from "react";
import {
  Flex,
  FormControl,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";

const CreateProduct = ({ onInput, onCancel }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleInputForm = () => {
    onInput({
      id: Date.now(),
      name: productName,
      price: parseFloat(productPrice),
    });
  };

  return (
    <Flex direction="column" alignItems="center" gap="5" bg="#f5f5f5" p="2">
      <Text fontWeight="bold">Thêm Sản phẩm</Text>
      <FormControl isRequired width={"28vw"}>
        <Flex direction="column" gap="5">
          <Flex alignItems="center">
            <Text width={"30%"}>Tên sản phẩm:</Text>
            <Flex>
              <Input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Text width="30%">Giá:</Text>
            <NumberInput
              min={0}
              value={productPrice}
              onChange={(valueString) => setProductPrice(valueString)}
            >
              <NumberInputField placeholder="Nhập giá sản phẩm" />
            </NumberInput>
          </Flex>
        </Flex>
      </FormControl>

      <Flex justifyContent={"space-around"} gap={"5"}>
        <Button colorScheme="teal" width="full" onClick={handleInputForm}>
          Lưu
        </Button>
        <Button colorScheme="red" width="full" onClick={onCancel}>
          Hủy
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateProduct;
