*Eclipse là một phần mềm dạng portable, tức là chỉ cần tải về giải nén ra là có thể sử dụng. Tuy nhiên, như vậy thì chúng ta không thể khởi động Eclipse từ menu hay từ thanh favorites trong Ubuntu. Trong bài viết này mình sẽ hướng dẫn mọi người thêm phần mềm Eclipse vào menu trên Ubuntu ( các phần mềm dạng portable khác đều có thể làm tương tự)*

***Xem thêm*** : [***Chia sẻ và review môn học trường đại học Bách Khoa Hà Nội***](https://tailieu-bkhn.blogspot.com/)

Tạo một tệp .desktop và đặt nó trong `~/.local/share/applications`, đây là một thư mục ảo để hiển thị các thư mục ảo trong cây thư mục của Ubuntu các bạn ấn vào nút có 3 gạch ngang trên thanh công cụ rồi chọn Show Hidden Files ( như hình bên dưới) : 

![Show hidden files](https://images.viblo.asia/b9d653ad-3009-492a-8a6b-1354c46b7f27.png)

Nội dung trong thư mục vừa tạo có dạng như sau : 
```
[Desktop Entry]
Name=Eclipse
Comment=Eclipse IDE
Keywords=Eclipse;Eclipse IDE;IDE;Programing IDE
TryExec=/home/trannguyenhan01092000/eclipse/eclipse
Exec=/home/trannguyenhan01092000/eclipse/eclipse
Terminal=false
Type=Application
Icon=/home/trannguyenhan01092000/eclipse/icon.xpm
Categories=Utility;Application;Development;
```

Trong đó:
- *Name*: Tên của Shortcut Icon
- *TryExec*: Là command chạy ứng dụng
- *Exec*: Là command chạy ứng dụng nếu TryExec không thành công
- *Icon*: Là đường dẫn tới icon của ứng dụng 

Lưu lại và mở menu lên bạn sẽ thấy có ứng dụng Eclipse đã được thêm vào trên menu : 

![Eclipse](https://images.viblo.asia/5b43ab8a-6bd1-451e-8272-df20ec490efc.png)

Ok! vậy là mọi thứ đã xong, để thêm Eclipse vào thanh favorites thì làm bình thường như các ứng dụng khác, chuột phải và chọn add favorites. Với các ứng dụng khác dạng portable thì mọi người làm tương tự để thêm ứng dụng vào menu và thanh favorites để dễ dàng hơn trong việc khởi động và sử dụng ứng dụng. 

Tham khảo : [https://vinasupport.com/](https://vinasupport.com/)