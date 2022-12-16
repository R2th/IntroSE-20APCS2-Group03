![](https://images.viblo.asia/223643e5-9d8b-42b8-939b-eefd4005cfb9.png)
 
Bài viết tuy không dài nhưng có thể nó sẽ rất hữu ích, khi các bạn code phải tái sử dụng nhiều và cần lưu lại các đoạn code đó để không phải viết lại, xcode đã hỗ trợ điều đó, bạn hãy tạo Code Snippet.
Code Snippet hiển thị ở góc dưới bên phải của xcode (bên dưới phần tiện ích)
Bất cứ khi nào bạn tìm thấy một số mã hữu ích mà bạn có thể sử dụng lại trong xcode, hãy tạo một đoạn mã. Đoạn mã xuất hiện ở góc dưới bên phải của xcode (bên dưới phần tiện ích).
 
![](https://images.viblo.asia/175c962a-38b7-46ba-af55-56fd443a5164.png)
*code snippets*
 
 Có rất nhiều đoạn code được xác định trước trong xcode. 
Bạn chỉ cần kéo đoạn mã cần thiết vào khu vực bạn muốn rất đơn giản.
Tất nhiên đôi khi bạn phải chỉnh sửa lại một số thứ như tên biến hoặc tất cả theo code của bạn. Nó khá hữu ích trong lập trình.
  
## Làm thế nào để tự tạo một Code Snippet?

Tạo một đoạn Code Snippet rất dễ dàng. Chỉ cần chọn mã mà bạn muốn tạo và kéo nó vào phần Code Snippet ở phía dưới bên phải của xcode.
Một cửa sổ sẽ xuất hiện và ở đó bạn có thể đổi tên nó và thêm một số mô tả.
 Xem ảnh bên dưới.
 
![](https://images.viblo.asia/3cac7a7c-7746-481e-bc8c-a6f0639fc43c.gif)
 
*Tạo một Code Snippet*
 
Bây giờ đoạn code được tạo. 
Chỉ cần kéo đoạn mã từ phần code snippet vào khu vực bạn cần.

![](https://images.viblo.asia/e9836e16-703e-453a-a571-bbde52652ce2.gif)
 
*Sử dụng Code Snippet*
 
Nhưng nếu bạn cần tạo placeholder trong đoạn code, bạn có thể chỉnh sửa đoạn mã bạn vừa lưu và thêm placeholder cho nó. 
Placeholder được viết như sau:
  
```
let const = <# placeholder_text/code #>
```

Nhìn vào ảnh bên dưới:
 
![](https://images.viblo.asia/fde8a3a8-2e63-47a7-81b5-0e70fc92d18a.gif)

## Tạo phím tắt

Ngoài việc kéo thả code snippet vào chỗ cần sử dụng, chúng ta còn có thể dùng phím tắt, dễ dàng và tiện hơn rất nhiều.

Mặc định, thuộc tính Completion Shortcut sẽ trống. Ví dụ thêm shortcut "hi" như sau.

![](https://images.viblo.asia/35a8e968-ae4c-4ec6-bd61-103337326234.png)

Khi code, ta chỉ cần gõ hi, Xcode sẽ tự suggest các code snippet tương ứng.

![](https://images.viblo.asia/ee624203-e04d-4b3e-8085-d966f77e858c.gif)

## Tạo phạm vi sử dụng phím tắt

Đó chính là Completion Scopes, nó chỉ cho phép chúng ta dùng shortcut của code snippet đó ở một phạm vi cụ thể nào đó.

Mặc định, giá trị này là All, nghĩa là ở bất kỳ đâu trong code ta cũng có thể gọi snippet này bằng shortcut.

Có thể chỉnh sửa thêm nhiều Completion Scopes khác nhau.

![](https://images.viblo.asia/c3acab9d-968b-440b-8597-32d1f343305a.png)

Nguồn: medium.com