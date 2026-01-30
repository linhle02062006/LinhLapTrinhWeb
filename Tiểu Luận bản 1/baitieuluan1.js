// Function to show specific section and hide others
function showSection(sectionId) {
    // Get all content sections
    const sections = document.querySelectorAll('.content-section');
    
    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Initialize: Show first section by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('khachhang');
    
    // Add form submission handlers
    setupFormHandlers();
});

// Setup form handlers for all forms
function setupFormHandlers() {
    // Customer form
    const formKhachHang = document.getElementById('form-khachhang');
    if (formKhachHang) {
        formKhachHang.addEventListener('submit', function(e) {
            e.preventDefault();
            addCustomer();
        });
    }

    // Employee form
    const formNhanVien = document.getElementById('form-nhanvien');
    if (formNhanVien) {
        formNhanVien.addEventListener('submit', function(e) {
            e.preventDefault();
            addEmployee();
        });
    }

    // Product form
    const formSanPham = document.getElementById('form-sanpham');
    if (formSanPham) {
        formSanPham.addEventListener('submit', function(e) {
            e.preventDefault();
            addProduct();
        });
    }

    // Order form
    const formDonHang = document.getElementById('form-donhang');
    if (formDonHang) {
        formDonHang.addEventListener('submit', function(e) {
            e.preventDefault();
            addOrder();
        });
    }

    // Payment form
    const formThanhToan = document.getElementById('form-thanhtoan');
    if (formThanhToan) {
        formThanhToan.addEventListener('submit', function(e) {
            e.preventDefault();
            addPayment();
        });
    }
}

// Add customer function
function addCustomer() {
    const makh = document.getElementById('makh').value;
    const tenkh = document.getElementById('tenkh').value;
    const sdtkh = document.getElementById('sdtkh').value;
    const diachikh = document.getElementById('diachikh').value;

    const tbody = document.getElementById('tbody-khachhang');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${makh}</td>
        <td>${tenkh}</td>
        <td>${sdtkh}</td>
        <td>${diachikh}</td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
        </td>
    `;

    // Reset form
    document.getElementById('form-khachhang').reset();
    
    // Show success message
    showNotification('Đã thêm khách hàng thành công!', 'success');
}

// Add employee function
function addEmployee() {
    const manv = document.getElementById('manv').value;
    const tennv = document.getElementById('tennv').value;
    const chucvu = document.getElementById('chucvu').value;
    const sdtnv = document.getElementById('sdtnv').value;

    const tbody = document.getElementById('tbody-nhanvien');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${manv}</td>
        <td>${tennv}</td>
        <td>${chucvu}</td>
        <td>${sdtnv}</td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
        </td>
    `;

    // Reset form
    document.getElementById('form-nhanvien').reset();
    
    // Show success message
    showNotification('Đã thêm nhân viên thành công!', 'success');
}

// Add product function
function addProduct() {
    const masp = document.getElementById('masp').value;
    const tensp = document.getElementById('tensp').value;
    const dongia = document.getElementById('dongia').value;
    const slt = document.getElementById('slt').value;
    const maloai = document.getElementById('maloai').value;

    const tbody = document.getElementById('tbody-sanpham');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${masp}</td>
        <td>${tensp}</td>
        <td>${formatCurrency(dongia)}</td>
        <td>${slt}</td>
        <td>${maloai}</td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
        </td>
    `;

    // Reset form
    document.getElementById('form-sanpham').reset();
    
    // Show success message
    showNotification('Đã thêm sản phẩm thành công!', 'success');
}

// Add order function
function addOrder() {
    const madon = document.getElementById('madon').value;
    const tenkhachhang = document.getElementById('tenkhachhang').value;
    const sdtkhachhang = document.getElementById('sdtkhachhang').value;
    const diachidonhang = document.getElementById('diachidonhang').value;
    const nhanviengh = document.getElementById('nhanviengh').value;
    const sdtnvgh = document.getElementById('sdtnvgh').value;
    const ngaydat = document.getElementById('ngaydat').value;
    const tongtien = document.getElementById('tongtien').value;
    const trangthai = document.getElementById('trangthai').value;

    const tbody = document.getElementById('tbody-donhang');
    const row = tbody.insertRow();
    
    const statusText = getStatusText(trangthai);
    const statusClass = getStatusClass(trangthai);
    
    row.innerHTML = `
        <td>${madon}</td>
        <td>${tenkhachhang}</td>
        <td>${sdtkhachhang}</td>
        <td>${diachidonhang}</td>
        <td>${nhanviengh}</td>
        <td>${sdtnvgh}</td>
        <td>${formatDate(ngaydat)}</td>
        <td>${formatCurrency(tongtien)}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
        </td>
    `;

    // Reset form
    document.getElementById('form-donhang').reset();
    
    // Show success message
    showNotification('Đã thêm đơn hàng thành công!', 'success');
}

// Add payment function
function addPayment() {
    const mathanhtoan = document.getElementById('mathanhtoan').value;
    const madonhang = document.getElementById('madonhang').value;
    const phuongthuc = document.getElementById('phuongthuc').value;
    const ngaythanhtoan = document.getElementById('ngaythanhtoan').value;
    const trangthaithanhtoan = document.getElementById('trangthaithanhtoan').value;

    const tbody = document.getElementById('tbody-thanhtoan');
    const row = tbody.insertRow();
    
    const paymentMethodText = getPaymentMethodText(phuongthuc);
    const statusText = getPaymentStatusText(trangthaithanhtoan);
    
    row.innerHTML = `
        <td>${mathanhtoan}</td>
        <td>${madonhang}</td>
        <td>${paymentMethodText}</td>
        <td>${formatDate(ngaythanhtoan)}</td>
        <td><span class="status-badge ${getPaymentStatusClass(trangthaithanhtoan)}">${statusText}</span></td>
        <td>
            <button class="edit-btn" onclick="editRow(this)">Sửa</button>
            <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
        </td>
    `;

    // Reset form
    document.getElementById('form-thanhtoan').reset();
    
    // Show success message
    showNotification('Đã thêm thanh toán thành công!', 'success');
}

// Delete row function
function deleteRow(button) {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
        const row = button.closest('tr');
        row.remove();
        showNotification('Đã xóa thành công!', 'success');
    }
}

// Edit row function (placeholder)
function editRow(button) {
    alert('Chức năng sửa đang được phát triển!');
    // You can implement edit functionality here
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Helper function to get status text
function getStatusText(status) {
    const statusMap = {
        'wait': 'Chờ Xử Lý',
        'delivery': 'Đang Giao Hàng',
        'done': 'Đã Giao',
        'cancel': 'Đã Hủy'
    };
    return statusMap[status] || status;
}

// Helper function to get status class
function getStatusClass(status) {
    const classMap = {
        'wait': 'status-wait',
        'delivery': 'status-delivery',
        'done': 'status-done',
        'cancel': 'status-cancel'
    };
    return classMap[status] || '';
}

// Helper function to get payment method text
function getPaymentMethodText(method) {
    const methodMap = {
        'apple': 'Apple Pay',
        'bank': 'Chuyển khoản ngân hàng',
        'card': 'Thẻ tín dụng',
        'visa': 'Thẻ Visa',
        'COD': 'COD'
    };
    return methodMap[method] || method;
}

// Helper function to get payment status text
function getPaymentStatusText(status) {
    const statusMap = {
        'unpaid': 'Chưa thanh toán',
        'paid': 'Đã thanh toán',
        'refund': 'Hoàn tiền'
    };
    return statusMap[status] || status;
}

// Helper function to get payment status class
function getPaymentStatusClass(status) {
    const classMap = {
        'unpaid': 'status-wait',
        'paid': 'status-done',
        'refund': 'status-cancel'
    };
    return classMap[status] || '';
}

// Show notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);