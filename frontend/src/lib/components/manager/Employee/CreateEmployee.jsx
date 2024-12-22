import { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Text,
  HStack,
} from "@chakra-ui/react";

const CreateEmployee = ({ onInput, onCancel }) => {
  // State cho các trường nhập liệu
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(""); // 1: Nam, 0: Nữ
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");

  // Gửi dữ liệu tạm lên component cha khi người dùng nhập
  useEffect(() => {
    onInput({
      HoTenNV: name,
      NgaySinh: birthDate,
      GioiTinh: gender,
      DiaChi: address,
      NgayVaoLam: startDate,
    });
  }, [name, birthDate, gender, address, startDate]);

  return (
    <Flex
      direction="column"
      width="30vw"
      alignItems="center"
      gap="5"
      bg="#f5f5f5"
      p="4"
    >
      <Text fontWeight="bold">Thêm Nhân Viên</Text>
      <FormControl isRequired width="28vw">
        <Flex direction="column" gap="5">
          <Flex alignItems="center">
            <Text width="50%">Tên nhân viên:</Text>
            <Input
              placeholder="Nhập tên"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <Text width="50%">Ngày sinh:</Text>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <Text width="50%">Giới tính:</Text>
            <RadioGroup
              value={gender}
              onChange={(value) => {
                setGender(value);
              }}
            >
              <HStack spacing="2rem">
                <Radio value="1">Nam</Radio>
                <Radio value="0">Nữ</Radio>
              </HStack>
            </RadioGroup>
          </Flex>
          <Flex alignItems="center">
            <Text width="50%">Địa chỉ:</Text>
            <Input
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <Text width="50%">Ngày vào làm:</Text>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </Flex>
        </Flex>
      </FormControl>
      <Flex gap="3">
        <Text as="button" color="red" onClick={onCancel}>
          Hủy
        </Text>
      </Flex>
    </Flex>
  );
};

export default CreateEmployee;
