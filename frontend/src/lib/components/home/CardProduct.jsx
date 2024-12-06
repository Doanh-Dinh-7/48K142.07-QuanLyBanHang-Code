import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const CardProduct = ({ name, price, onClick }) => {
  return (
    <>
      <Flex
        cursor={"pointer"}
        _hover={{
          transform: "scale(1.05)", // Phóng to nhẹ
          boxShadow: "lg", // Tạo bóng khi hover
          bg: "#f5f5f5", // Thay đổi màu nền
          transition: "all 0.1s ease", // Hiệu ứng chuyển động
        }}
        onClick={onClick} // Thêm sự kiện click
      >
        <Stat bg={"#ffffff"} padding={"5"}>
          <StatLabel color={"#767676"} fontWeight={"bold"} fontSize={"2.2rem"}>
            {name}
          </StatLabel>
          <StatNumber
            color={"#b5b5b5"}
          >{`Giá (VND): ${price.toLocaleString()}`}</StatNumber>
        </Stat>
      </Flex>
    </>
  );
};

export default CardProduct;
