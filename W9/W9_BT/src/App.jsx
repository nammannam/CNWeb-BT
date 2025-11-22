// Import các hooks cần thiết từ React
import { useState, useEffect } from 'react';
// Import file CSS cho styling
import './App.css';
// Import các components con
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
// Import các hàm API service để gọi JSONPlaceholder API
import { getAllUsers, createUser, updateUser, deleteUser } from './services/userService';

function App() {
  // ========== STATE MANAGEMENT ==========
  // State lưu trữ danh sách tất cả users từ API
  const [users, setUsers] = useState([]);
  // State lưu trữ danh sách users đã được lọc theo tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]);
  // State quản lý trạng thái loading khi gọi API
  const [loading, setLoading] = useState(false);
  // State lưu trữ thông báo lỗi nếu có
  const [error, setError] = useState(null);
  // State điều khiển hiển thị form thêm/sửa user
  const [showForm, setShowForm] = useState(false);
  // State lưu thông tin user đang được chỉnh sửa
  const [editingUser, setEditingUser] = useState(null);
  // State lưu từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  // State quản lý trang hiện tại trong pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State lưu thông báo hiển thị cho người dùng
  const [notification, setNotification] = useState(null);
  
  // Số lượng users hiển thị trên mỗi trang
  const usersPerPage = 5;

  // ========== EFFECTS ==========
  // Effect: Fetch danh sách users khi component được mount lần đầu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Effect: Lọc users khi từ khóa tìm kiếm hoặc danh sách users thay đổi
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Nếu không có từ khóa tìm kiếm, hiển thị tất cả users
      setFilteredUsers(users);
    } else {
      // Lọc users theo tên (không phân biệt hoa thường)
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    // Reset về trang đầu tiên khi có thay đổi tìm kiếm
    setCurrentPage(1);
  }, [searchTerm, users]);

  // ========== API FUNCTIONS ==========
  // Hàm lấy tất cả users từ API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    // Gọi API sử dụng async/await
    const result = await getAllUsers();
    
    if (result.success) {
      // Lưu danh sách users vào state
      setUsers(result.data);
      showNotification('Users loaded successfully!', 'success');
    } else {
      // Lưu lỗi vào state nếu có
      setError(result.error);
      showNotification(result.error, 'error');
    }
    
    setLoading(false);
  };

  // ========== HELPER FUNCTIONS ==========
  // Hàm hiển thị thông báo cho người dùng
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => setNotification(null), 3000);
  };

  // ========== CRUD OPERATIONS ==========
  // Hàm xử lý tạo user mới
  const handleCreate = async (userData) => {
    setLoading(true);
    const result = await createUser(userData);
    
    if (result.success) {
      // Lưu ý: JSONPlaceholder không thực sự tạo user mới
      // Nên ta phải tự thêm user vào state với ID mới
      const newUser = {
        ...result.data,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      // Thêm user mới vào đầu danh sách
      setUsers([newUser, ...users]);
      // Đóng form sau khi tạo thành công
      setShowForm(false);
      showNotification('User created successfully!', 'success');
    } else {
      showNotification(result.error, 'error');
    }
    
    setLoading(false);
  };

  // Hàm xử lý cập nhật thông tin user
  const handleUpdate = async (userData) => {
    setLoading(true);
    const result = await updateUser(editingUser.id, userData);
    
    if (result.success) {
      // Cập nhật user trong state local
      // Map qua danh sách và thay thế user có ID trùng khớp
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      ));
      // Đóng form và reset editingUser
      setShowForm(false);
      setEditingUser(null);
      showNotification('User updated successfully!', 'success');
    } else {
      showNotification(result.error, 'error');
    }
    
    setLoading(false);
  };

  // Hàm xử lý xóa user
  const handleDelete = async (id) => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    setLoading(true);
    const result = await deleteUser(id);
    
    if (result.success) {
      // Xóa user khỏi state local bằng cách lọc ra user có ID khác
      setUsers(users.filter(user => user.id !== id));
      showNotification('User deleted successfully!', 'success');
    } else {
      showNotification(result.error, 'error');
    }
    
    setLoading(false);
  };

  // ========== EVENT HANDLERS ==========
  // Hàm xử lý khi click nút Edit
  const handleEdit = (user) => {
    // Lưu user cần chỉnh sửa vào state
    setEditingUser(user);
    // Hiển thị form
    setShowForm(true);
  };

  // Hàm xử lý khi click nút Cancel trong form
  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Hàm xử lý khi submit form (tạo mới hoặc cập nhật)
  const handleSubmit = async (userData) => {
    if (editingUser) {
      // Nếu đang edit, gọi hàm update
      await handleUpdate(userData);
    } else {
      // Nếu không, gọi hàm create
      await handleCreate(userData);
    }
  };

  // ========== PAGINATION LOGIC ==========
  // Tính toán chỉ số của user cuối cùng trên trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  // Tính toán chỉ số của user đầu tiên trên trang hiện tại
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Lấy danh sách users cho trang hiện tại
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // Tính tổng số trang
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="app">
      {/* Header của ứng dụng */}
      <header className="app-header">
        <h1>User Management System</h1>
        <p>CRUD Application with JSONPlaceholder API</p>
        <p>With Dark-Mode Toggle</p>
        <p>Nguyen Khanh Nam - 20225749</p>
      </header>

      {/* Hiển thị thông báo nếu có */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Container chính của ứng dụng */}
      <div className="app-container">
        {/* Toolbar chứa thanh tìm kiếm và nút thêm user */}
        <div className="toolbar">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            + Add User
          </button>
        </div>

        {/* Hiển thị loading indicator khi đang tải dữ liệu */}
        {loading && <div className="loading">Loading...</div>}
        
        {/* Hiển thị thông báo lỗi nếu có và không đang loading */}
        {error && !loading && (
          <div className="error-box">
            <p>Error: {error}</p>
            <button className="btn btn-secondary" onClick={fetchUsers}>
              Retry
            </button>
          </div>
        )}

        {/* Hiển thị table, pagination và thông tin khi không loading và không có lỗi */}
        {!loading && !error && (
          <>
            {/* Table hiển thị danh sách users */}
            <UserTable 
              users={currentUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            
            {/* Component phân trang */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            
            {/* Hiển thị thông tin số lượng users đang xem */}
            <div className="user-count">
              Showing {indexOfFirstUser + 1} - {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
          </>
        )}
      </div>

      {/* Hiển thị form thêm/sửa user khi showForm = true */}
      {showForm && (
        <UserForm 
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
