import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";

const ViewEmployee = ({ employees, onDelete, onEdit }) => {
  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"55vw"}
      alignItems={"center"}
      gap={"5"}
    >
      <Text fontWeight={"bold"}>Danh sách nhân viên</Text>
      <Table
        bg="white"
        width="50vw"
        size="sm"
        fontSize={"1rem"}
        variant="striped"
      >
        <Thead>
          <Tr>
            <Th>Mã nhân viên</Th>
            <Th>Tên</Th>
            <Th>Ngày sinh</Th>
            <Th>Giới tính</Th>
            <Th>Địa chỉ</Th>
            <Th>Ngày vào làm</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((emp) => (
            <Tr key={emp.id}>
              <Td>{emp.id}</Td>
              <Td>{emp.name}</Td>
              <Td>{emp.birthDate}</Td>
              <Td>{emp.gender === "1" ? "Nam" : "Nữ"}</Td>
              <Td
                maxWidth="150px"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                <Tooltip label={emp.address} hasArrow>
                  {emp.address}
                </Tooltip>
              </Td>
              <Td>{emp.startDate}</Td>
              <Td>
                <Flex gap="2">
                  <Button
                    size="sm"
                    leftIcon={<TfiPencilAlt />}
                    colorScheme="yellow"
                    onClick={() => onEdit(emp)} // Gọi hàm onEdit từ props
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<RiDeleteBin2Line />}
                    colorScheme="red"
                    onClick={() => onDelete(emp)} // Gọi hàm onDelete từ props
                  >
                    Xóa
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ViewEmployee;
