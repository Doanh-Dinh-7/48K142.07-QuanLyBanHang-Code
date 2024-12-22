import { useState } from "react";
import {
  Flex,
  FormControl,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Text,
  RadioGroup,
  HStack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "../../../../App";

const CreateMaterial = ({ onInput, onCancel }) => {
  const [materialName, setMaterialName] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [materialPrice, setMaterialPrice] = useState("");
  const [materialUnit, setMaterialUnit] = useState("");
  const toast = useToast();
  // const handleInputForm = () => {
  //   onInput({
  //     id: Date.now(),
  //     name: materialName,
  //     quantity: parseFloat(materialQuantity),
  //     price: parseFloat(materialPrice),
  //     unit: materialUnit,
  //   });
  // };

  // // với đơn vị tính: Ky = Ký, Hop = Hộp, Thung = Thùng
  // const unit = {
  //   Ky: "Ky        ",
  //   Hop: "Hop       ",
  //   Thung: "Thung     ",
  // };
  // tạo nguyên liệu mới tới API
  const handleInputForm2API = async () => {
    try {
      const res = await fetch(BASE_URL + "/nguyenlieu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TenNL: materialName,
          Soluong: parseFloat(materialQuantity),
          DonGiaNhap: parseFloat(materialPrice),
          DonViTinh: materialUnit, // "Ky", "Hop", "Thung"
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
      onInput();
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
    <Flex direction="column" alignItems="center" gap="5" bg="#f5f5f5" p="3">
      <Text fontWeight="bold">Thêm Nguyên liệu</Text>
      <FormControl isRequired width={"28vw"}>
        <Flex direction="column" gap="5">
          <Flex alignItems="center">
            <Text width={"30%"}>Tên nguyên liệu:</Text>
            <Flex>
              <Input
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                placeholder="Nhập tên nguyên liệu"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <Text width="30%">Số lượng:</Text>
            <NumberInput
              min={0}
              value={materialQuantity}
              onChange={(valueString) => setMaterialQuantity(valueString)}
            >
              <NumberInputField placeholder="Nhập số lượng" />
            </NumberInput>
          </Flex>
          <Flex alignItems="center">
            <Text width="30%">Giá nhập:</Text>
            <NumberInput
              min={0}
              value={materialPrice}
              onChange={(valueString) => setMaterialPrice(valueString)}
            >
              <NumberInputField placeholder="Nhập giá nhập" />
            </NumberInput>
          </Flex>
          <Flex alignItems="center">
            <Text width="30%">Đơn vị tính:</Text>
            <RadioGroup
              value={materialUnit}
              onChange={(value) => {
                setMaterialUnit(value);
              }}
            >
              <HStack spacing="2rem">
                <Radio value="Ky">Ký</Radio>
                <Radio value="Hop">Hộp</Radio>
                <Radio value="Thung">Thùng</Radio>
              </HStack>
            </RadioGroup>
          </Flex>
        </Flex>
      </FormControl>

      <Flex justifyContent={"space-around"} gap={"5"}>
        <Button colorScheme="teal" width="full" onClick={handleInputForm2API}>
          Lưu
        </Button>
        <Button colorScheme="red" width="full" onClick={onCancel}>
          Hủy
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateMaterial;
