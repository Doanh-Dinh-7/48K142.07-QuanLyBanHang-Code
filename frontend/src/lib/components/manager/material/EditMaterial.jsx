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

const EditMaterial = ({ material, onInput, onCancel }) => {
  const [materialName, setMaterialName] = useState(material?.TenNL || "");
  const [materialQuantity, setMaterialQuantity] = useState(
    material?.SoLuong || 0
  );
  const [materialPrice, setMaterialPrice] = useState(material?.DonGiaNhap || 0);
  const [materialUnit, setMaterialUnit] = useState(material?.DonViTinh || "");
  const toast = useToast();

  // const handleUpdate = () => {
  //   const updateMaterial = {
  //     ...material,
  //     name: materialName,
  //     quantity: parseFloat(materialQuantity),
  //     price: parseFloat(materialPrice),
  //     unit: materialUnit,
  //   };
  //   onInput(updateMaterial);
  // };

  // cập nhật nguyên liệu mới tới API
  const handleUpdate2API = async () => {
    try {
      const res = await fetch(BASE_URL + "/nguyenlieu/" + material.MaNL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TenNL: materialName,
          SoLuong: parseInt(materialQuantity),
          DonGiaNhap: parseInt(materialPrice),
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
      console.log(error.info);
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
      <Text fontWeight="bold">Sửa Nguyên liệu</Text>
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
        <Button colorScheme="teal" width="full" onClick={handleUpdate2API}>
          Lưu
        </Button>
        <Button colorScheme="red" width="full" onClick={onCancel}>
          Hủy
        </Button>
      </Flex>
    </Flex>
  );
};

export default EditMaterial;
