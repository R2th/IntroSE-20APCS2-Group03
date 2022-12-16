# Làm thế nào để cài JAVA_HOME trên window và xem intellij của mình đã trỏ đúng phiên bản java chưa?
* Step 1 : Tải phiên bản java cần dùng ở [đây](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) chạy và cài đặt bình thường.
    * ![](https://images.viblo.asia/ec8cb91c-8fce-43de-b263-02a8e41ff467.PNG)
    * Cài đặt thành công thì nó sẽ có 2 thư mục này  :
        * ![](https://images.viblo.asia/2025a990-6b3b-4aea-8f0d-32f7d5572bef.PNG)
* Step 2 :  Cài đặt biến môi trường JAVA_HOME
    * Icon window -> gõ : View advanced system settings -> enter
    * Chọn Enviroment Variables...
        * ![](https://images.viblo.asia/be5c0a8d-cd8d-4fcb-b2aa-56070824117b.PNG)
    * Tiếp tục chọn : New ...
        * ![](https://images.viblo.asia/50394cb7-b3e7-4a66-8e4c-bf4cc14d966d.PNG)
    * Next step : 
        * Variable name : JAVA_HOME
        * Variable value : chính là đường dẫn thư mục jdk của bạn ở trên khi cài xong java
        * ![](https://images.viblo.asia/fe30ff1f-bd85-4384-87cb-7f1a23ca041f.PNG)
    * Tiếp tục : Double clicks vào biến path
        * ![](https://images.viblo.asia/ba857a81-2cdd-4406-970b-f6c73999e64c.PNG)
    * Tiếp nhé : Chọn new
        * ![](https://images.viblo.asia/caa8af3d-8dca-4c6b-b449-c53b240e80a1.PNG)
    *  Điền %JAVA_HOME%\bin vào chỗ đang nháy nháy nhé
        *  ![](https://images.viblo.asia/3cefaff3-ba12-4129-a752-d428cd4d396e.PNG)
    * Okiii done! Tiếp theo check xem biến đã được tạo chưa
        * cmd
        * gõ : echo %JAVA_HOME%
        * Kết quả hiện ra đường dẫn mình đã cài đặt ở trên là thành công nhé :
            * ![](https://images.viblo.asia/aa7c9611-e51b-4f9e-9646-4a50cb09edc0.PNG)
    * Mở inteliji chọn :
        * ![](https://images.viblo.asia/9aff837e-98c6-4b5b-a953-11f879af9b13.PNG)
    * Nếu chưa đúng với phiên bản java trong máy, bạn chọn new ...
        * ![](https://images.viblo.asia/21cee1f4-1d59-4dd8-88b1-c6cd58567f4c.PNG)
    * Chọn đúng verison java của mình , các bạn không nên nhầm giữa việc trỏ ver java cho debug và run project nhé!
        * ![](https://images.viblo.asia/d412fa1e-eab4-462d-a8be-ef060bc4a228.PNG)
    * Thế là done! Chúc các bạn thành công nhé! ^^