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
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";

const ViewInvoice = ({ invoices, onDelete, onShowDetails }) => {
  return (
    <Flex
      direction={"column"}
      bg={"#dbdbdb"}
      width={"53vw"}
      alignItems={"center"}
      gap={"1"}
      overflowY={"auto"}
    >
      <Text fontWeight={"bold"}>Danh sách Hoá đơn</Text>
      <Table
        bg="white"
        width="50vw"
        size="sm"
        fontSize={"1rem"}
        variant="striped"
      >
        <Thead>
          <Tr>
            <Th>Mã Hoá đơn</Th>
            <Th>Ngày lập</Th>
            <Th>Tổng tiền</Th>
            <Th>Mã Nhân Viên</Th>
            <Th>Phương thức thanh toán</Th>
            <Th>Hành động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices
            .filter((invoice) => {
              const time = invoice.NgayLap.split(" ")[4];
              return time !== "11:11:11"; // Loại bỏ hóa đơn nếu thời gian là '11:11:11'
            })
            .map((invoice, key) => (
              <Tr key={key}>
                <Td>{invoice.MaHD}</Td>
                <Td>{invoice.NgayLap}</Td>
                <Td>{invoice.TongTien.toLocaleString()}</Td>
                <Td>{invoice.MaNV}</Td>
                <Td>
                  {invoice.PhuongThucThanhToan === 1
                    ? "Chuyển khoản"
                    : "Tiền mặt"}
                </Td>
                <Td>
                  <Flex gap="2">
                    <Button
                      size="sm"
                      leftIcon={<BsInfoCircle />}
                      colorScheme="yellow"
                      onClick={() => onShowDetails(invoice)}
                    >
                      Chi Tiết
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<RiDeleteBin2Line />}
                      colorScheme="red"
                      onClick={() => onDelete(invoice)} // Gọi hàm onDelete từ props
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

export default ViewInvoice;
