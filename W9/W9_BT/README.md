# 👥 User Management System

Ứng dụng CRUD quản lý người dùng sử dụng React và JSONPlaceholder API.

## 👨‍🎓 Thông tin sinh viên

- **Họ và tên:** Nguyễn Khánh Nam
- **MSSV:** 20225749
- **Môn học:** Công nghệ Web

## 📋 Mô tả dự án

Đây là ứng dụng web quản lý người dùng với đầy đủ các tính năng CRUD (Create, Read, Update, Delete). Ứng dụng tương tác với API từ JSONPlaceholder để thực hiện các thao tác với dữ liệu người dùng.

## ✨ Tính năng chính

### 1. 📖 Read (Đọc)
- Hiển thị danh sách người dùng dưới dạng bảng
- Hiển thị thông tin: ID, Tên, Email, Số điện thoại
- Tự động tải dữ liệu khi khởi động ứng dụng

### 2. ➕ Create (Tạo mới)
- Form modal để thêm người dùng mới
- Validation đầy đủ cho các trường dữ liệu
- Thông báo khi tạo thành công/thất bại

### 3. ✏️ Update (Cập nhật)
- Chỉnh sửa thông tin người dùng qua form modal
- Hiển thị sẵn thông tin hiện tại khi edit
- Cập nhật UI ngay lập tức sau khi lưu

### 4. 🗑️ Delete (Xóa)
- Xóa người dùng khỏi danh sách
- Có hộp thoại xác nhận trước khi xóa
- Cập nhật UI tự động sau khi xóa

### 5. 🔍 Search (Tìm kiếm)
- Tìm kiếm người dùng theo tên
- Tìm kiếm real-time (không phân biệt hoa thường)
- Nút xóa tìm kiếm nhanh

### 6. 📄 Pagination (Phân trang)
- Hiển thị 5 người dùng mỗi trang
- Điều hướng Previous/Next
- Hiển thị số trang và trang hiện tại
- Thông tin số lượng người dùng đang xem

### 7. 🎨 UI/UX Features
- **Dark Mode**: Tự động phát hiện và hỗ trợ dark mode
- **Responsive**: Tương thích mọi thiết bị (desktop, tablet, mobile)
- **Loading States**: Hiển thị trạng thái loading khi gọi API
- **Error Handling**: Xử lý và hiển thị lỗi thân thiện
- **Notifications**: Thông báo toast cho mọi thao tác

## 🛠️ Công nghệ sử dụng

### Frontend Framework & Libraries
- **React 19.2.0**: Library UI component-based
- **Vite 7.2.4**: Build tool nhanh và hiện đại
- **Axios**: HTTP client để gọi API

### Styling
- **CSS3**: Custom CSS với CSS Variables
- **Responsive Design**: Media queries cho mọi kích thước màn hình
- **Dark Mode**: CSS `prefers-color-scheme` media query

### API
- **JSONPlaceholder**: Fake REST API cho testing
  - Endpoint: `https://jsonplaceholder.typicode.com/users`

## 📁 Cấu trúc dự án

```
W9_BT/
├── src/
│   ├── components/          # Các React components
│   │   ├── UserTable.jsx    # Component hiển thị bảng users
│   │   ├── UserForm.jsx     # Component form thêm/sửa user
│   │   ├── SearchBar.jsx    # Component thanh tìm kiếm
│   │   └── Pagination.jsx   # Component phân trang
│   ├── services/            # API service layer
│   │   └── userService.js   # Các hàm gọi API
│   ├── App.jsx              # Component chính
│   ├── App.css              # Styling chính
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies và scripts
├── vite.config.js           # Cấu hình Vite
└── README.md                # File này
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 9.0.0

### Các bước cài đặt

1. **Clone hoặc download dự án**
```bash
cd W9/W9_BT
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở trình duyệt**
- Truy cập: `http://localhost:5173`
- Server sẽ tự động reload khi có thay đổi code

### Các lệnh khác

```bash
# Build cho production
npm run build

# Preview build production
npm run preview

# Lint code
npm run lint
```

## 💻 Hướng dẫn sử dụng

### 1. Xem danh sách người dùng
- Khi mở ứng dụng, danh sách người dùng tự động được tải
- Cuộn xuống để xem thêm hoặc dùng phân trang

### 2. Tìm kiếm người dùng
- Nhập tên vào ô tìm kiếm
- Kết quả hiển thị ngay lập tức
- Click "×" để xóa tìm kiếm

### 3. Thêm người dùng mới
- Click nút "**+ Add User**"
- Điền thông tin vào form (tất cả các trường bắt buộc)
- Click "**Create**" để lưu hoặc "**Cancel**" để hủy

### 4. Chỉnh sửa người dùng
- Click nút "**Edit**" trên hàng của người dùng
- Thay đổi thông tin trong form
- Click "**Update**" để lưu

### 5. Xóa người dùng
- Click nút "**Delete**" trên hàng của người dùng
- Xác nhận trong hộp thoại
- Người dùng sẽ bị xóa khỏi danh sách

### 6. Phân trang
- Click số trang để chuyển trang
- Hoặc dùng nút "**Previous**" / "**Next**"

## 🎯 Yêu cầu đã thực hiện

✅ **CRUD đầy đủ**: Create, Read, Update, Delete  
✅ **Async/Await**: Sử dụng async/await thay vì .then()  
✅ **Manual UI Update**: Cập nhật UI thủ công sau POST/PUT/DELETE  
✅ **Error Handling**: Xử lý lỗi đầy đủ  
✅ **Search**: Tìm kiếm theo tên  
✅ **Pagination**: Phân trang với 5 items/page  
✅ **Responsive**: Tương thích mobile  
✅ **Dark Mode**: Hỗ trợ dark mode  

## 🎨 Giao diện

### Light Mode
- Nền sáng: `#f5f7fa`
- Màu chủ đạo: `#3498db` (xanh dương)
- Text: `#2c3e50` (xám đậm)

### Dark Mode
- Nền tối: `#1a1a1a`, `#2d2d2d`
- Màu chủ đạo: `#5dade2` (xanh sáng)
- Text: `#e0e0e0` (trắng nhạt)

### Màu sắc nút
- **Primary** (Add User): Xanh dương `#3498db`
- **Edit**: Cam `#f39c12`
- **Delete**: Đỏ `#e74c3c`
- **Success**: Xanh lá `#27ae60`

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🔧 API Endpoints

### JSONPlaceholder API

```javascript
// GET - Lấy tất cả users
GET https://jsonplaceholder.typicode.com/users

// POST - Tạo user mới (fake)
POST https://jsonplaceholder.typicode.com/users

// PUT - Cập nhật user (fake)
PUT https://jsonplaceholder.typicode.com/users/{id}

// DELETE - Xóa user (fake)
DELETE https://jsonplaceholder.typicode.com/users/{id}
```

**Lưu ý**: JSONPlaceholder là fake API, không thực sự lưu trữ dữ liệu. Ứng dụng sử dụng state management local để mô phỏng các thao tác CRUD.

## 🐛 Xử lý lỗi

Ứng dụng xử lý các trường hợp lỗi:
- ❌ Lỗi kết nối mạng
- ❌ Lỗi API (4xx, 5xx)
- ❌ Validation form
- ❌ Timeout
- ✅ Hiển thị thông báo lỗi thân thiện
- ✅ Nút "Retry" để thử lại

## 📝 Validation Rules

### Form thêm/sửa người dùng
- **Name**: 
  - Bắt buộc nhập
  - Không được để trống
  
- **Email**:
  - Bắt buộc nhập
  - Phải đúng định dạng email (có @ và domain)
  
- **Phone**:
  - Bắt buộc nhập
  - Không được để trống

## 🌟 Điểm nổi bật

1. **Code Clean & Organized**
   - Component-based architecture
   - Separation of concerns (UI, logic, API)
   - Comment tiếng Việt chi tiết

2. **UX tốt**
   - Loading states
   - Error messages
   - Confirmation dialogs
   - Toast notifications
   - Smooth animations

3. **Performance**
   - Vite cho build nhanh
   - Lazy loading nếu cần
   - Optimized re-renders

4. **Accessibility**
   - Semantic HTML
   - Keyboard navigation
   - Focus states
   - ARIA labels (có thể thêm)

## 📚 Kiến thức áp dụng

- ✅ React Hooks (useState, useEffect)
- ✅ Async/Await với API calls
- ✅ Component composition
- ✅ Props và State management
- ✅ Event handling
- ✅ Conditional rendering
- ✅ List rendering với key
- ✅ Form handling và validation
- ✅ CSS Variables
- ✅ Responsive design
- ✅ Dark mode implementation

## 🔮 Cải tiến có thể thêm

- [ ] Sắp xếp theo cột (sort)
- [ ] Export danh sách ra CSV/Excel
- [ ] Bulk actions (xóa nhiều users cùng lúc)
- [ ] Undo/Redo functionality
- [ ] Offline support với Service Worker
- [ ] Unit tests với Jest
- [ ] Integration tests với React Testing Library
- [ ] TypeScript migration
- [ ] Redux/Zustand cho state management phức tạp
- [ ] React Query cho API caching

## 📄 License

Dự án học tập - Đại học Bách Khoa Hà Nội

## 📧 Liên hệ

- **Sinh viên**: Nguyễn Khánh Nam
- **MSSV**: 20225749
- **Email**: nam.nk225749@sis.hust.edu.vn

---

⭐ **Cảm ơn đã xem dự án!** ⭐
