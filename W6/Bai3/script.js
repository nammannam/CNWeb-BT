// Không cần sự kiện DOMContentLoaded vì script được load ở cuối thẻ body

/* 
 * PHẦN 1: TÌM KIẾM SẢN PHẨM
 * Cho phép người dùng tìm kiếm sản phẩm theo tên (không phân biệt hoa thường)
 * Bao gồm cả tìm kiếm khi nhấn nút và tìm kiếm theo thời gian thực khi gõ
 */
const searchInput = document.getElementById('searchInput'); // Lấy thẻ input tìm kiếm
const searchButton = document.getElementById('searchButton'); // Lấy nút tìm kiếm
const productList = document.getElementById('product-list'); // Lấy danh sách sản phẩm

/**
 * Hàm lọc sản phẩm theo từ khóa tìm kiếm
 * Ẩn các sản phẩm không khớp với từ khóa, hiện những sản phẩm khớp
 */
function filterProducts() {
  const q = searchInput.value.trim().toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển thành chữ thường
  const items = document.querySelectorAll('.product-item'); // Lấy tất cả sản phẩm
  
  // Duyệt qua từng sản phẩm để kiểm tra
  items.forEach(item => {
    const titleEl = item.querySelector('h2'); // Lấy thẻ tiêu đề của sản phẩm
    const title = titleEl ? titleEl.textContent.trim().toLowerCase() : ''; // Lấy nội dung tiêu đề
    
    // Hiển thị sản phẩm nếu không có từ khóa hoặc tiêu đề chứa từ khóa
    if (!q || title.includes(q)) {
      item.style.display = ''; // Hiển thị sản phẩm (giá trị mặc định)
    } else {
      item.style.display = 'none'; // Ẩn sản phẩm không khớp
    }
  });
}

// Xử lý sự kiện khi nhấn nút tìm kiếm
searchButton.addEventListener('click', (e) => {
  e.preventDefault(); // Ngăn hành động mặc định của form (tránh tải lại trang)
  filterProducts(); // Gọi hàm lọc sản phẩm
});

// Cho phép lọc theo thời gian thực khi người dùng gõ
searchInput.addEventListener('keyup', (e) => {
  filterProducts(); // Gọi hàm lọc sản phẩm sau mỗi lần gõ phím
});

/* 
 * PHẦN 2: HIỂN THỊ/ẨN FORM THÊM SẢN PHẨM
 * Bật/tắt hiển thị form thêm sản phẩm khi nhấn nút "Thêm sản phẩm"
 */
const addProductBtn = document.getElementById('addProductBtn'); // Lấy nút "Thêm sản phẩm"
const addProductForm = document.getElementById('addProductForm'); // Lấy form thêm sản phẩm

// Xử lý sự kiện khi nhấn nút "Thêm sản phẩm"
addProductBtn.addEventListener('click', () => {
  addProductForm.classList.toggle('hidden'); // Bật/tắt class "hidden" để hiện/ẩn form
  
  // Tự động focus vào ô input đầu tiên khi form hiện lên (UX tốt hơn)
  if (!addProductForm.classList.contains('hidden')) {
    const first = addProductForm.querySelector('input, textarea'); // Tìm ô input đầu tiên
    if (first) first.focus(); // Focus vào ô đó nếu có
  }
});

/* 
 * PHẦN 3: XỬ LÝ THÊM SẢN PHẨM MỚI
 * Xử lý sự kiện submit form và tạo sản phẩm mới từ dữ liệu người dùng nhập
 */
// Xử lý khi người dùng submit form thêm sản phẩm
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Ngăn hành động mặc định của form (tránh tải lại trang)

  // Lấy giá trị từ các trường nhập liệu và loại bỏ khoảng trắng thừa
  const title = document.getElementById('prodTitle').value.trim(); // Tiêu đề sách
  const image = document.getElementById('prodImage').value.trim(); // URL ảnh bìa
  const desc = document.getElementById('prodDesc').value.trim(); // Mô tả sách
  const price = document.getElementById('prodPrice').value.trim(); // Giá sách

  // Kiểm tra dữ liệu: tiêu đề là bắt buộc
  if (!title) {
    alert('Vui lòng nhập tiêu đề sách');
    return;
  }

  // Tạo cấu trúc DOM cho sản phẩm mới
  const article = document.createElement('article'); // Tạo thẻ article cho sản phẩm
  article.className = 'product-item'; // Thêm class "product-item" để áp dụng CSS

  // Tạo phần tử hình ảnh
  const img = document.createElement('img');
  img.src = image || 'https://via.placeholder.com/160x220?text=No+Image'; // Dùng ảnh mặc định nếu không có URL
  img.alt = title; // Alt text cho hình ảnh (tốt cho SEO và accessibility)

  // Tạo phần tử tiêu đề
  const h2 = document.createElement('h2');
  h2.textContent = title;

  // Tạo phần tử mô tả
  const p = document.createElement('p');
  p.textContent = desc;

  /**
   * Hàm định dạng giá tiền
   * Nếu người dùng nhập số (ví dụ: 100000), chuyển thành dạng 100.000 VNĐ
   * Nếu không nhập giá, hiển thị "Giá: Liên hệ"
   * @param {string} value - Giá trị người dùng nhập vào
   * @returns {string} Giá đã được định dạng
   */
  function formatPrice(value){
    if(!value) return 'Giá: Liên hệ'; // Không có giá => "Giá: Liên hệ"
    
    // Loại bỏ tất cả ký tự không phải số
    const digits = value.replace(/\D/g,'');
    
    if(!digits) return value; // Nếu không có số nào, giữ nguyên giá trị gốc
    
    // Thêm dấu chấm ngăn cách hàng nghìn và đơn vị tiền tệ
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
  }

  // Tạo phần tử giá tiền
  const span = document.createElement('span');
  span.textContent = formatPrice(price); // Áp dụng hàm định dạng giá

  // Xây dựng cấu trúc sản phẩm bằng cách thêm các phần tử con vào article
  article.appendChild(img);   // Thêm ảnh vào đầu tiên
  article.appendChild(h2);    // Tiếp theo là tiêu đề
  article.appendChild(p);     // Sau đó là mô tả
  article.appendChild(span);  // Cuối cùng là giá

  // Thêm sản phẩm mới vào danh sách sản phẩm
  productList.appendChild(article);

  // Đặt lại form và ẩn đi sau khi thêm thành công
  addProductForm.reset(); // Xóa dữ liệu đã nhập
  addProductForm.classList.add('hidden'); // Ẩn form
});
