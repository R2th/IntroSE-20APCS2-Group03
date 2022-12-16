React là thư viện giao diện người dùng phổ biến nhất thế giới. Nó rất mạnh mẽ và giàu tính năng, nhưng điều đó có thể hơi quá đối với các dự án nhỏ hơn. Đây là lúc AlpineJS phát huy tác dụng. Nó nhỏ hơn, nhanh hơn và dễ học hơn React, điều này làm cho nó hoàn hảo cho các mục đích cụ thể.

# Quan điểm cá nhân
Mỗi dự án, sẽ giải quyết một bài toán cụ thể và do đó cần một cấu trúc, các quy tắc cụ thể và có thể có một framework/library nào đó. Có những framework rất tốt cho dự án này nhưng với dự án khác thì nó lại không được như vậy.
Ở đây mình sẽ giới thiệu và hướng dẫn sử dụng Alpinejs chứ không hề "rap diss" React hay Vue nha :stuck_out_tongue_winking_eye:.

Series Alpinejs của mình sẽ có 3 phần:

Phần 1: Giới thiệu tổng quan và cách sử dụng.

Phần 2: Tìm hiểu về các chỉ thị.

Phần 3: Làm Alarm clock bằng Alpinejs.

***Let's get started***

# 1. AlpineJS là gì và Installation?
**AlpineJS** là một minimal framework để xây dựng giao diện người dùng. "Bản chất" của nó cũng như Vue hay React nhưng với chi phí thấp hơn nhiều. Bí mật là AlpineJS không sử dụng DOM ảo, hoạt động hoàn toàn trong DOM thực tế. Bạn bỏ qua hoàn toàn bước chuyển đoạn, quá trình kết xuất và thuật toán đối chiếu. Tôi nghĩ đây là một vụ hack hấp dẫn và rất vui mừng về nó.

Hãy nghĩ về nó giống như Tailwind cho JavaScript. Cú pháp của công cụ này gần như hoàn toàn vay mượn từ Vue (và bằng phần mở rộng Angular ).

**Installation**
**Từ CDN**: Thêm tập lệnh sau vào cuối <head>phần của bạn.
```
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.xx/dist/alpine.min.js" defer> </ script>
```
Đối với môi trường sản xuất, bạn nên ghim một số phiên bản cụ thể trong liên kết để tránh bị hỏng không mong muốn từ các phiên bản mới hơn. Ví dụ: để sử dụng phiên bản 2.7.3(mới nhất):
```
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.7.3/dist/alpine.min.js" defer> </ script>
```
**Từ npm:**  Cài đặt gói từ npm.
    
    npm i alpinejs

-----
Để hỗ trợ IE11 Thay vào đó, hãy sử dụng các tập lệnh sau.
```
<script type ="module" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.xx/dist/alpine.min.js"> </script> 
<script nomodule src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.xx/dist/alpine-ie11.min.js" defer> </script>
```
Mẫu trên là mẫu mô-đun / mô-đun sẽ dẫn đến gói hiện đại được tải tự động trên các trình duyệt hiện đại và gói IE11 được tải tự động trên IE11 và các trình duyệt cũ khác.
    
# 2. Usage
Thả xuống / Phương thức
```
<div x-data="{open: false}"> 
    <button @click="open=true"> Mở menu thả xuống </button>

    <ul 
        x-show="open"
         @click.away="open=false"
     >
        Nội dung thả xuống
    </ul> 
</div>
```
Các tab
```
<div x-data="{tab: 'foo'}"> 
    <button :class="{'active': tab === 'foo'}" @click="tab='foo' "> Foo </button> 
    <button :class="{'active': tab === 'bar'}" @click="tab='bar' "> Thanh </button>

    <div x-show="tab === 'foo' "> Tab Foo </div> 
    <div x-show="tab === 'bar' "> Thanh tab </div> 
</div>
```
Bạn thậm chí có thể sử dụng nó cho những việc không nhỏ: Tìm nạp trước nội dung HTML của menu thả xuống khi di chuột.
```
<div x-data="{open: false}"> 
    <button
        @mouseenter.once ="
            fetch('/dropdown-part.html').then 
                (response=>response.text ()) 
                .then(html=>{$refs.dropdown.innerHTML=html})
         "
         @click ="open=true"
     > Hiển thị menu thả xuống </button>

    <div x-ref ="dropdown" x-show ="open" @click.away ="open = false">
        Đang tải Spinner ...
    </div> 
</div>
```
# 3 Tổng kết
Ở phần tiếp theo chúng ta sẽ đi sâu vào tìm hiểu vê các chỉ thị trong Alpinejs.
Phần 1 này ngắn gọn vậy thôi.
    
Thanks for reading!
    
# Tài liệu tham khảo
 https://medium.com/better-programming/when-react-is-too-much-alpinejs-will-do-the-trick-c165a2da4701