HIện này rất nhiều website tích hợp đa nền tảng, việc debug trên máy tính đã không còn xa lạ đối với các lập trình viên. Tuy nhiên, có thể ứng dụng của bạn làm việc tốt trên máy tính mà lại gặp phải lỗi trên thiết bị di động. Điều này sẽ gây khó khăn cho các bạn mới bước chân vào con đường của lập trình viên khi sửa lỗi. Vậy làm cách nào để kiểm tra hoạt động website của mình trên các thiết bị di động?

Bài viết này sẽ phần nào giúp các bạn trả lời câu hỏi trên với việc sử dụng Chrome's Remote Debugging.
# Chrome's Remote Debugging là gì?
Chrome's Remote Debugging cho phép bạn kết nối các công cụ của nhà phát triểntrên máy tính của mình đến thiết bị android đang chạy trình duyệt Chrome. Với điều này, bạn sẽ có toàn quyền truy cập vào các công cụ dành cho nhà phát triển Chrome cho trình duyệt trên di động của bạn!


**Tất cả những thứ bạn cần là gì? Rất đơn giản:**

- Trình duyệt Chrome được cài trên máy tính của bạn.

- Trình duyệt Chrome được cài trên thiết bị Android của bạn (*Lưu ý: Android 4.0 trở lên*).

- Cáp USB để kết nối điện thoại với máy tính.


Ok, giờ chúng ta hãy bắt đầu nào:

# Bước 1:  Sử dụng chế độ dành cho nhà phát triển trên thiết bị Android của bạn.
- Trên thiết bị Android của mình, bạn vào phần *Settings* -> Chọn *Developer options* -> kích hoạt *USB Debugging*:
    
![](https://images.viblo.asia/349b66f4-d8d0-47d7-9558-6bac2889d02f.jpg)

![](https://images.viblo.asia/37149a87-6453-4e70-bc3c-201ca042ee90.jpg)





- Trường hợp không thấy *Developer options*, có nghĩa bạn chưa kích hoạt chế độ nhà phát triển.


Đừng lo, hãy vào *Setting* -> *About phone* và nhấn vào mục *Build Number* 7 lần. Chế độ dành cho nhà phát triển sẽ được kích hoạt. Lúc đấy bạn có thể bật *USB Debugging*.


- Trên máy tính của bạn, mở developer tools bằng F12. Ở góc phải màn hình, kích vào button 3 chấm và chọn *More tools* -> *Remote Devices*.

![](https://images.viblo.asia/ed188b18-0c3c-4037-8c9c-a5568022647c.png)

- Kết nối thiết bị Android với máy tính của bạn bằng cáp USB, điều này sẽ cần bạn cấp phép kết nối. Bạn nhấn OK.


![](https://images.viblo.asia/38b2f472-2380-4b09-a0ce-2e6df295ef43.png)

![](https://images.viblo.asia/a178a04b-d7bd-41b1-ae30-ecf09aca91d3.png)

- Bây giờ trên máy tính của bạn đã hiển thị thiết bị Android kết nối, bạn chọn thiết bị và tiến hành *Inspect* website như trên máy tính của mình.

![](https://images.viblo.asia/7410077e-75ae-416c-b9f4-9471568157f5.png)

# Bước 2: Inspecting
Việc cài đặt đã xong, bây giờ chúng ta sẽ *inspect tabs* trực tiếp trên máy tính của bạn bằng Chrome.

- Bật app bạn cần *Inspect* bằng trình duyệt chrome trên thiết bị Android của bạn.

- Click vào tên thiết bị ở máy tính, nó sẽ hiển thị tất cả các tabs mà bạn đang mở trên thiết bị Android. Click vào Inspect ở tab mà bạn muốn check.

- Chrome sẽ mở ra một cửa sổ mới, hiển thị thời gian thực những gì diễn ra trên tab trình duyệt ở thiết bị Android cùng với các công cụ cho nhà phát triển.
![](https://images.viblo.asia/97480e2c-54de-45ba-9bd5-037ceceaf9fa.png)


Vậy là bạn đã thành công để sử dụng được tất cả các công cụ debug cho thiết bị mobile của mình.

*Tài liệu tham khảo:
-  https://blog.campvanilla.com/debug-website-on-mobile-device-5c27c8809d39*