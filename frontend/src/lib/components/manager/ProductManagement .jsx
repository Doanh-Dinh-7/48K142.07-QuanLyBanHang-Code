import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import CreateProduct from "./product/CreateProduct";
import ViewProduct from "./product/ViewProduct";
import EditProduct from "./product/EditProduct";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSaveEditedProduct = (productEdited) => {
    if (productEdited) {
      // Tìm sản phẩm cần chỉnh sửa trong mảng
      const index = products.findIndex(
        (product) => product.id === productEdited.id
      );
      if (index === -1) return;
      // Cập nhật sản phẩm
      products[index] = productEdited;
      setProducts([...products]);
      setEditingProduct(null); // Tắt chế độ sửa
    }
  };

  // Mở thông báo xác nhận xóa
  const handleDeleteConfirmation = (product) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteProduct = () => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== selectedProduct.id)
    );
    setIsDeleteAlertOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Flex direction="column">
      <Flex
        width="100vw"
        justifyContent="center"
        bg="#ffbfc0"
        style={{ padding: "0.2rem 0" }}
      >
        <Heading fontSize="1.5rem">Quản Lý Sản Phẩm</Heading>
      </Flex>
      <Flex height="100vh">
        <ViewProduct
          products={products}
          onDelete={handleDeleteConfirmation}
          onEdit={(product) => {
            setEditingProduct(product);
          }}
          onAdd={() => setIsCreating(true)}
        />
        {isCreating && (
          <CreateProduct
            onInput={(product) => {
              setProducts([...products, product]);
              setIsCreating(false);
            }}
            onCancel={() => {
              setIsCreating(false);
            }}
          />
        )}
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onInput={(product) => {
              handleSaveEditedProduct(product);
            }}
            onCancel={() => {
              setEditingProduct(null);
            }}
          />
        )}
      </Flex>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Sản Phẩm
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn có chắc muốn xóa sản phẩm **{selectedProduct?.name}** không?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button colorScheme="red" onClick={handleDeleteProduct} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default ProductManagement;
