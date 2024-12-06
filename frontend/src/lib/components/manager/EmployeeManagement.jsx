import { useState } from "react";
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
import CreateEmployee from "./Employee/CreateEmployee";
import Activities from "./Employee/Activities";
import ViewEmployee from "./Employee/ViewEmployee";
import EditEmployee from "./Employee/EditEmployee";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên
  const [isCreating, setIsCreating] = useState(false); // Trạng thái bật/tắt CreateEmployee
  const [editingEmployee, setEditingEmployee] = useState(null); // Nhân viên đang sửa
  const [tempEmployee, setTempEmployee] = useState(null); // Lưu tạm nhân viên mới hoặc đã sửa
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false); // Trạng thái bật/tắt thông báo xóa
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Nhân viên được chọn để xóa

  // Lưu nhân viên mới từ CreateEmployee
  const handleSaveNewEmployee = () => {
    if (tempEmployee) {
      setEmployees((prev) => [...prev, tempEmployee]); // Thêm nhân viên mới
      setTempEmployee(null); // Xóa dữ liệu tạm
      setIsCreating(false); // Tắt form
    }
  };

  // Lưu nhân viên đã chỉnh sửa từ EditEmployee
  const handleSaveEditedEmployee = () => {
    if (editingEmployee) {
      // Tìm nhân viên cần chỉnh sửa trong mảng
      const index = employees.findIndex(
        (employee) => employee.id === editingEmployee.id
      );
      if (index === -1) return;
      // Cập nhật nhân viên
      employees[index] = tempEmployee;
      setEmployees([...employees]);
      setEditingEmployee(null); // Tắt chế độ sửa
      setTempEmployee(null); // Xóa dữ liệu tạm
    }
  };

  // Mở thông báo xác nhận xóa
  const handleDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteAlertOpen(true);
  };

  // Xóa nhân viên
  const handleDeleteEmployee = () => {
    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== selectedEmployee.id)
    );
    setSelectedEmployee(null);
    setIsDeleteAlertOpen(false);
  };

  return (
    <Flex direction="column">
      <Flex
        width="100vw"
        justifyContent="center"
        bg="#4782b4"
        style={{ padding: "0.2rem 0" }}
      >
        <Heading fontSize="1.5rem">Quản Lý Nhân Viên</Heading>
      </Flex>
      <Flex height="100vh">
        {/* Hiển thị CreateEmployee hoặc EditEmployee dựa vào biến trạng thái isCreating và editingEmployee*/}
        {isCreating && (
          <CreateEmployee
            onInput={(employee) => setTempEmployee(employee)} // Nhận dữ liệu từ form
            onCancel={() => {
              setTempEmployee(null);
              setIsCreating(false);
            }}
          />
        )}
        {editingEmployee && (
          <EditEmployee
            employee={editingEmployee} // Truyền dữ liệu nhân viên cần sửa
            onInput={(employee) => setTempEmployee(employee)} // Nhận dữ liệu từ form
            onCancel={() => {
              setTempEmployee(null);
              setEditingEmployee(null);
            }}
          />
        )}

        {/* Component xử lý */}
        <Activities
          onAdd={() => {
            setIsCreating(true);
            setEditingEmployee(null); // Tắt trạng thái sửa nếu đang sửa
          }}
          onSave={() => {
            if (isCreating) {
              handleSaveNewEmployee(); // Lưu nhân viên mới
            } else if (editingEmployee) {
              handleSaveEditedEmployee(); // Lưu chỉnh sửa nhân viên
            }
          }}
        />

        {/* Danh sách nhân viên */}
        <ViewEmployee
          employees={employees}
          onDelete={handleDeleteConfirmation}
          onEdit={(employee) => {
            setEditingEmployee(employee);
          }}
        />
      </Flex>

      {/* Thông báo xóa nhân viên */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa Nhân Viên
            </AlertDialogHeader>
            <AlertDialogBody>
              Bạn muốn xóa nhân viên **{selectedEmployee?.name}**?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteAlertOpen(false)}>Hủy</Button>
              <Button colorScheme="red" onClick={handleDeleteEmployee} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default EmployeeManagement;
