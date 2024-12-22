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
  useToast,
} from "@chakra-ui/react";
import CreateEmployee from "./employee/CreateEmployee";
import Activities from "./employee/Activities";
import ViewEmployee from "./employee/ViewEmployee";
import EditEmployee from "./employee/EditEmployee";
import { BASE_URL } from "../../../App";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]); // Danh sách nhân viên
  const [isCreating, setIsCreating] = useState(false); // Trạng thái bật/tắt CreateEmployee
  const [editingEmployee, setEditingEmployee] = useState(null); // Nhân viên đang sửa
  const [tempEmployee, setTempEmployee] = useState(null); // Lưu tạm nhân viên mới hoặc đã sửa
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false); // Trạng thái bật/tắt thông báo xóa
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Nhân viên được chọn để xóa

  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await fetch(BASE_URL + "/nhanvien");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    getEmployees();
  }, [refresh]);

  // Khi cần refresh lại dữ liệu
  const refreshData = () => {
    setRefresh((prev) => !prev);
  };

  // // Lưu nhân viên mới từ CreateEmployee
  // const handleSaveNewEmployee = () => {
  //   if (tempEmployee) {
  //     setEmployees((prev) => [...prev, tempEmployee]); // Thêm nhân viên mới
  //     setTempEmployee(null); // Xóa dữ liệu tạm
  //     setIsCreating(false); // Tắt form
  //   }
  // };
  const saveEmployeeToAPI = async (employee) => {
    try {
      const response = await fetch(BASE_URL + "/nhanvien", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error("Failed to save employee");
      }
      const data = await response.json();
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  const handleSaveNewEmployee = async () => {
    if (tempEmployee) {
      // Gửi dữ liệu đến backend
      await saveEmployeeToAPI(tempEmployee);

      // Cập nhật danh sách nhân viên (tùy chọn, nếu backend trả về danh sách mới)
      setEmployees((prev) => [...prev, tempEmployee]);

      // Reset trạng thái
      setTempEmployee(null);
      setIsCreating(false);
    }
  };

  // // Lưu nhân viên đã chỉnh sửa từ EditEmployee
  // const handleSaveEditedEmployee = () => {
  //   if (editingEmployee) {
  //     // Tìm nhân viên cần chỉnh sửa trong mảng
  //     const index = employees.findIndex(
  //       (employee) => employee.id === editingEmployee.id
  //     );
  //     if (index === -1) return;
  //     // Cập nhật nhân viên
  //     employees[index] = tempEmployee;
  //     setEmployees([...employees]);
  //     setEditingEmployee(null); // Tắt chế độ sửa
  //     setTempEmployee(null); // Xóa dữ liệu tạm
  //   }
  // };
  const updateEmployeeToAPI = async (employee) => {
    try {
      const response = await fetch(BASE_URL + `/nhanvien/${employee.MaNV}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const data = await response.json();
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  const handleSaveEditedEmployee = async () => {
    if (tempEmployee) {
      await updateEmployeeToAPI(tempEmployee); // Gửi thay đổi đến backend

      // Cập nhật danh sách trên frontend
      const index = employees.findIndex(
        (employee) => employee.MaNV === tempEmployee.MaNV
      );
      if (index === -1) return;

      employees[index] = tempEmployee;
      setEmployees([...employees]);

      // Reset trạng thái
      setEditingEmployee(null);
      setTempEmployee(null);
    }
  };

  // Mở thông báo xác nhận xóa
  const handleDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteAlertOpen(true);
  };

  // // Xóa nhân viên
  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      // Xóa nhân viên trên backend
      await deleteEmployeeFromAPI(selectedEmployee);

      // Cập nhật danh sách nhân viên
      const newEmployees = employees.filter(
        (employee) => employee.MaNV !== selectedEmployee.MaNV
      );
      setEmployees(newEmployees);
    }

    // Reset trạng thái
    setSelectedEmployee(null);
    setIsDeleteAlertOpen(false);
  };

  const deleteEmployeeFromAPI = async (employee) => {
    console.log(employee);
    try {
      const response = await fetch(BASE_URL + `/nhanvien/${employee.MaNV}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }
      const data = await response.json();
      toast({
        title: "Thành công",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
              refreshData;
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
            refreshData(); // Làm mới dữ liệu (nếu cần)
          }}
        />

        {/* Danh sách nhân viên */}
        <ViewEmployee
          employees={employees}
          onDelete={(employee) => handleDeleteConfirmation(employee)}
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
              Bạn muốn xóa nhân viên **{selectedEmployee?.HoTenNV}**?
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
