### Cài đặt 

#### 1. Cài đặt jquery 
```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```

#### 2. Cài thư viện jQuery Selectric:
```
<script src="jquery.selectric.min.js"></script>
<link rel="stylesheet" href="selectric.css">
```
Hoặc cài bằng npm 
```
npm install selectric
```

### Khởi tạo:
```
$(function() {
  $('select').selectric();
});
```

### Browser hỗ trợ: 
Firefox, Chrome, Safari, Internet Explorer 7+, Opera

### Custom:

Cấu trúc:
```
$(function() {
  $('select').selectric({
      maxHeight: '300'
  });
});
```

Các option: 
```
- Function gọi trước khi khởi tạo 
    onBeforeInit: function() {},
    
- Function gọi khi khởi tạo xong
    onInit: function() {},
    
- Funtion gọi trước khi mở list option  
    onBeforeOpen: function() {},
    
- Function gọi sau khi đã mở list option 
    onOpen: function() {},
    
- Function gọi trước khi đóng list option 
    onBeforeClose: function() {},
    
- Function gọi sau khi đã đóng list option 
    onClose: function() {},
    
- Function gọi trước khi thay đổi giá trị ô select 
    onBeforeChange: function() {},
    
- Function gọi sau khi đã thay đổi giá trị ô select
    onChange: function(element) {
      $(element).change();
    },
    
- Function gọi sau khi select được reset
    onRefresh: function() {},
    
- Set maxHeight 
    maxHeight: 300,
    
- Sau khoảng thời gian này nếu không nhập nữa sẽ bắt đầu tìm kiếm 
    keySearchTimeout: 500,
    
- Custom HTML icon dropdown của ô select 
    arrowButtonMarkup: '<b class="button">&#x25be;</b>',
    
- Khởi tạo plugin trên trình duyệt di động
    disableOnMobile: true,
    
- Duy trì hành vi thả xuống tự nhiên trên thiết bị di động
     nativeOnMobile: true,
     
- Mở select khi hover thay vì click chuột
    openOnHover: false,
    
- Thời gian chờ khi di chuột khỏi ô select 
    hoverIntentTimeout: 500,
    
- Mở rộng list option trong thẻ bao ngoài trước 
    expandToItemText: false,
    
- Responsive
    responsive: false,
    
- Customize classes.
   customClass: {
      prefix: 'selectric',     // Class sẽ được thay cho class selectric (default)
      camelCase: false     // Chuyển đổi kiểu class giữa camelCase hoặc dash-case.
    },
    
- Ngăn chặn cuộn trên cửa sổ khi sử dụng con lăn chuột bên trong hộp tùy chọn
    preventWindowScroll: true,

- Chiều rộng kế thừa từ phần tử gốc
    inheritOriginalWidth: false,
    
- Cho phép quay lại item đầu hoặc cuối khi dùng arrow keys để chọn 
    allowWrap: true,
    
- Cho phép chọn nhiều giá trị 
    multiple: {
      separator: ', ',       
      keepMenuOpen: true,    //  Có đóng list option sau khi chọn không
      maxLabelEntries: false // Số lượng tối đa option có thể chọn
    }
```

### Methods:
```
var Selectric = $('select').data('selectric');

Selectric.open();    // Mở list options
Selectric.close();   // Đóng list options
Selectric.destroy(); // Huỷ cấu trúc selectplugin) và trở về mặc định
Selectric.refresh (); // Cấu trúc lại list options plugin
Selectric.init (); // Khởi động lại plugin
```

// Hoặc 
```
$('select').selectric('open');    // Mở list options
$('select').selectric('close');   // Đóng list options
$('select').selectric('destroy');  // Huỷ cấu trúc selectplugin) và trở về mặc định
$('select').selectric('refresh');// Cấu trúc lại list options plugin
$('select').selectric('init');    // Khởi động lại plugin
```


Tham khảo: [tại đây](https://selectric.js.org/)