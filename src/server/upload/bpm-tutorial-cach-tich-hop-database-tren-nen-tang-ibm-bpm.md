Bài viết này hướng dẫn các bạn các thiết lập connection từ Database sẵn có với IBM BPM. Hiện nay IBM BPM hỗ trợ 3 loại DB là IBM Db2, Oracle, và Microsoft SQL Server DB. Trong bài viết này mình sẽ hướng dẫn các bạn cách kết nối với một DB Oracle.

*Xem bài viết gốc tại https://viblo.asia/p/bpm-tutorial-cach-tich-hop-database-tren-nen-tang-ibm-bpm-4dbZN96nKYM*

## Chuẩn bị:
- Một DB Oracle với url có sẵn, kèm theo một user và password.
- Phần mềm SQL Developer được cung cấp bởi Oracle, để phát triển cũng như quản trị Database Oracle.
- Tài khoản, mật khẩu công cụ quản lý Máy chủ ứng dụng WebSphere của IBM.
## Các bước tiến hành:
### 1. Tạo kết nối giữa Máy chủ ứng dụng WebSphere và Database
- Đăng nhập vào url WebSphere Application Server

![](https://images.viblo.asia/1d737043-3816-4fd6-9d28-4113bfd1a590.JPG)
- Vì IBM BPM (nay là IBM Business Automation Workflow) dùng java nên hãng này cũng dùng luôn JDBC để tạo kết nối DB (Java Database Connectivity), click theo thứ tự như hình (lưu ý chọn đúng tên Node/App Cluster mà bạn đang cần cài đặt):
![](https://images.viblo.asia/68042f87-10b3-4471-acfe-990827f36464.JPG)
- Create a data source:
    * **Step 1**:  Enter basic data source information : Điền tên Data Source Name và JNDI name (Java Naming Directory Interface -  là một API được chỉ định trong công nghệ Java, cung cấp chức năng đặt tên và thư mục cho các ứng dụng được viết bằng ngôn ngữ lập trình Java)
   ![](https://images.viblo.asia/73caf9da-35a6-4c4d-b6d2-b3d4e639aecf.JPG)
   * **Step 2**: Select JDBC provider : bước này nếu có sẵn JBDC Provider thì bạn chọn dòng thứ 2, nếu không bạn chọn dòng thứ nhất để khởi tạo như sau:
   ![](https://images.viblo.asia/473d918c-ef53-4288-afb7-f06173efbd76.JPG)
   Chọn các giá trị như hình sau đây:
   ![](https://images.viblo.asia/34f5bb88-7ace-4749-9418-ff48dbbb5ca2.JPG)
   Điền thông tin database classpath:
   ![](https://images.viblo.asia/69925422-5bc3-4168-8e1f-2bc9f5520e8e.JPG)
   (lưu ý bạn cần hỏi người quản trị để điền JDBC driver path cho chuẩn)
    * **Step 3**: Enter database specific properties for the data source: điền url của DB theo định dạng "jdbc:oracle:thin:@//localhost:1521/sample" cho thin driver và "jdbc:oracle:oci:@//localhost:1521/sample" cho thick driver, ở đây mình sẽ dùng thin driver. 
    ![](https://images.viblo.asia/7d35002f-d426-4f09-a774-4c67d35c301e.JPG)
    * **Step 4**: Setup security aliases: Click vào Global J2C authentication alias, bước này ta sẽ khởi tạo và cài đặt một Authentication alias.
    ![](https://images.viblo.asia/7b546538-3229-4392-96a1-568af43da1ec.JPG)
    Trong cửa sổ JAAS - J2C authentication data mở ra, bạn chọn New: điền username và password được cung cấp để truy cập Database
    ![](https://images.viblo.asia/8623848a-a511-4a9b-9b80-62c6f71704b5.JPG)
    
    Sau đó nhấn Apply, lưu ý sau đó phải ấn thêm Save để lưu
    Quay trở lại màn hình Step 4, bạn chọn dòng 1,2 và 4 là Alias bạn vừa chọn như hình:
    ![](https://images.viblo.asia/981b7c6c-6a37-4d7a-adde-94ce852cf198.JPG)
    * **Step 5**: Summary : Bạn kiểm tra lại các thông tin lần cuối và nhấn Finish
    ![](https://images.viblo.asia/34535082-b2f7-4503-a1bb-ac6d23b7767a.JPG)
    Lưu ý sau khi ấn Finish bạn vẫn phải ấn thêm nút Save để hoàn tất. Sau đó trong danh sách các DataSource, bạn chọn vào Datasource bạn vừa chọn và nhấn vào Test connection để test. Bạn cũng cần phải Synchronize changes with Nodes để có thể hoàn tất hoàn toàn.
    Lưu ý tiếp theo (lại lưu ý, kì cục dữ z..): để hoàn tất thật sự kết nối, bạn phải nhờ Admin hệ thống restart dùm Node/ App Cluster mà bạn vừa thiết đặt kết nối vừa xong.
### 2. Tạo kết nối giữa Process App và Database
Lúc này WAS đã có kết nối với DB, điều bạn cần làm tiếp theo là khai báo kết nối này vào trong Process App
- Mở App của bạn lên, trong phần Process App Settings, tab Environment Variables, bạn nhấn vào dấu cộng và thêm dòng như hình:
![](https://images.viblo.asia/5d114327-9211-4380-b7b5-a0717b1d3cba.JPG)

Vậy là bài này đã hoàn tất, bài tiếp theo mình sẽ hướng dẫn cách truy vấn dữ liệu, thêm sửa xóa trong Database bằng BPM.