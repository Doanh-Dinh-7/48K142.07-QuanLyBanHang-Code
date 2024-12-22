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

const EditEmployee = ({ employee, onInput, onCancel }) => {
  // Trạng thái nội bộ để lưu thông tin chỉnh sửa
  const [name, setName] = useState(employee?.HoTenNV || "");
  const [birthDate, setBirthDate] = useState(employee?.NgaySinh || "");
  const [gender, setGender] = useState(employee?.GioiTinh || true); // Mặc định là "Nam"
  const [address, setAddress] = useState(employee?.DiaChi || "");
  const [startDate, setStartDate] = useState(employee?.NgayVaoLam || "");

  // Gửi dữ liệu tạm lên component cha khi người dùng nhập
  useEffect(() => {
    const updatedEmployee = {
      ...employee,
      HoTenNV: name,
      NgaySinh: new Date(birthDate).toISOString().split("T")[0],
      GioiTinh: gender,
      DiaChi: address,
      NgayVaoLam: new Date(startDate).toISOString().split("T")[0],
    };
    // Gửi dữ liệu ra ngoài thông qua onInput
    onInput(updatedEmployee);
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
      <Text fontWeight="bold">Sửa Nhân Viên</Text>
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
              value={new Date(birthDate).toISOString().split("T")[0]}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <Text width="50%">Giới tính:</Text>
            <RadioGroup
              value={gender ? "1" : "0"} // Chuyển đổi true/false thành 1/0
              onChange={(value) => {
                setGender(value === "1"); // Chuyển đổi 1/0 thành true/false
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
              value={new Date(startDate).toISOString().split("T")[0]}
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

export default EditEmployee;
