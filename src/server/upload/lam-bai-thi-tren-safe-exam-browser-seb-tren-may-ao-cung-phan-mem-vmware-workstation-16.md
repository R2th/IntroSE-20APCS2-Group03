Cùng tìm hiểu với mình qua bài viết này cách để sử dụng phần mềm Safe Exam Browser thông qua một Virtual Machine bằng phần mềm VMWARE WORKSTATION PLAYER 16

**LƯU Ý : BÀI VIẾT CHỈ MANG TÍNH CHẤT THAM KHẢO, CHO CÁI NHÌN TỔNG QUÁT VỀ TÍNH CÔNG BẰNG CỦA KÌ THI ONLINE, KHÔNG KHUYẾN KHÍCH ÁP DỤNG VÀO THI CỬ**

**LƯU Ý : KỂ TỪ PHIÊN BẢN 3.2 Safe Exam Browser (SEB) DEV TEAM CỦA DỰ ÁN ĐÃ CHẶN TÍNH NĂNG CONFIG REFLECT CỦA MÁY ẢO, VÀ TỪ CHỐI KẾT NỐI. BẠN PHẢI SỬ DỤNG PHIÊN BẢN 3.1.1 CỦA SEB ĐỂ TIẾP TỤC XEM BÀI VIẾT NÀY**

### Chuẩn bị trước 1 file .iso Windows để làm hệ điều hành của máy ảo, tìm hiểu qua bài viết sau : https://quantrimang.com/da-co-cach-tai-file-iso-cua-windows-10-tu-microsoft-116913

ĐẦU TIÊN, BẠN SẼ TẢI PHẦN MỀM VMWARE WORKSTATION PLAYER 16 THÔNG QUA ĐƯỜNG DẪN SAU : 
https://customerconnect.vmware.com/en/downloads/#all_products
![](https://images.viblo.asia/1d88d90b-1c00-4910-bb35-aa4d3d6869ff.png)
<div align="center">Tìm kiếm từ khóa VMWARE WORKSTATION</div>
Bạn có thể dùng bản pro tùy ý lưu ý là có tính phí hoặc bạn có thể nhập key tìm kiếm từ google. Trong phạm vi bài viết này mình sẽ dùng bản free

![](https://images.viblo.asia/3ebc022a-2922-456f-9e29-a4c578ae1b14.png)

Thực hiện cài đặt các bạn nhất next liên tục nhé =))). Cuối cùng, tiến hành chạy VMWARE WORKSTATION PLAYER 16, giao diện như sau

![image.png](https://images.viblo.asia/992ae1ca-bb8a-49a8-83da-b60a00ea059a.png)
<div align="center">Giao diện của phần mềm VMWARE WORKSTATION PLAYER 16</div>

Kế tiếp, thực hiện Create a New Virtual Machine, Browse file .iso của Windows đã được nêu ở đầu bài viết
![image.png](https://images.viblo.asia/caf6a204-5a62-4093-a19e-0c92b55c7182.png)

Tiếp theo điền tên user khởi tạo. Bạn có thể nhập password hoặc Product key của Win 10, ở đây mình sẽ để trống 
![image.png](https://images.viblo.asia/a36087db-44b3-4ba4-8b04-4a91b9abf3f6.png)

Chọn yes
![image.png](https://images.viblo.asia/d6ed889d-5d7e-4874-81d1-8b9d931c76c3.png)

Chọn đường dẫn lưu máy ảo, mình sẽ lưu đường dẫn ngắn, ở giữa bài viết ta sẽ thao tác với thư mục này bạn nên để nó ở nơi dễ tìm
![image.png](https://images.viblo.asia/9f0616df-3e6c-43a7-848a-f6d597c61732.png)

Mình sẽ cấp phát máy ảo 25GB (Bạn có thể chọn nhiều hơn nếu sử dụng lâu dài), mình sẽ chọn **Store virtual disk as single file** để dễ quản lý
![image.png](https://images.viblo.asia/176513cb-ae01-48f2-9bb3-a035cb051b15.png)

Nhấp finish
![image.png](https://images.viblo.asia/0508eb03-c20d-4bcd-bced-c4c422edb618.png)

Nếu vào được setup Windows như hình là bạn đang làm đúng
![image.png](https://images.viblo.asia/6a8fe4ee-87ad-4e14-8cad-0a507cb3e3c9.png)
![image.png](https://images.viblo.asia/e90bd4fe-73cc-4685-b80a-5e3456c8d453.png)
<div align="center">Ngồi đợi window setup tầm 7-30p tùy máy</div>

Để máy restart
![image.png](https://images.viblo.asia/f460d878-2b57-48f7-8b72-6d14bc08686b.png)

Máy đang được khởi động
![image.png](https://images.viblo.asia/f8e9b9e7-31a1-4e94-a10b-5ad5e7d8c475.png)
![image.png](https://images.viblo.asia/64aead81-97dd-4b9c-a1e6-9040343b10e5.png)

Hiện hộp thoại "...Public Network..." nên chọn Yes, No thì chắc cũng được 😅. Và đây là thành quả, đến đây thì gần xong rồi.
![image.png](https://images.viblo.asia/30a52f9b-6684-4ce3-b6f7-9384ef22ca0b.png)

Sử dụng tạm Microsoft Edge, để tải phần mềm Safe Exam Browser bạn có tải và cài đặt Chrome nếu không thích
![image.png](https://images.viblo.asia/323d569d-c052-4dd7-8805-720ce39a2e8b.png)

Thực hiện tải Safe Exam Browser 3.1.1 thông qua đường dẫn https://drive.google.com/file/d/1Iz9radg35gGRJ9fRJepF5XmI1LD5m6sq/view?usp=sharing

Sau khi tải xong, mở thư mục Download và tiến hành cài đặt
![image.png](https://images.viblo.asia/262f87f7-c9dd-494d-b20e-ab65e1bc5c66.png)
![image.png](https://images.viblo.asia/0f83697d-97a0-4bf8-b4f3-3075ed619843.png)
![image.png](https://images.viblo.asia/ae1ca80c-1835-4b37-b16c-6104e084efb0.png)
Hoàn tất cài đặt
![image.png](https://images.viblo.asia/e24db2e8-2c1f-4666-8903-d75cd324e230.png)

Thực hiện tìm kiếm Safe Exam Browser trên thanh tìm kiếm
![image.png](https://images.viblo.asia/69a285ac-8181-466f-98b0-d472ddf586f9.png)

Thông báo trên hiện ra, chúng ta sẽ config lại máy ảo để nó tham chiếu tới máy thật chúng ta đang xài 
![image.png](https://images.viblo.asia/8dda5f10-b22a-4b44-8ea3-933372946e17.png)
Thực hiện suspend máy ảo để đi config ở máy thật
![image.png](https://images.viblo.asia/2ef8016f-ed68-421c-9e48-27aacbbffff7.png)

Tìm tới thư mục đã cài máy ảo ở bước một, nếu không tìm được khởi động lại phần mềm VMWare, ấn chuột phải vào máy ảo đã tạo chọn Option, vào tab Obtion đường dẫn sẽ nằm trong mục Working directory
![image.png](https://images.viblo.asia/33c7862c-d781-4fb4-bf80-7f860e64f7f0.png)

Ở folder máy ảo ta nãy giờ làm việc, tìm đến file có tên là Windows 10 and later x64 và tệp mở rộng vmx, nếu không tìm thấy đuôi vmx như trong hình bạn chịu khó vào từng file xem hoặc search google cách config File Explorer hiện phần mở rộng =))

Nhấn chuột phải chọn Open With, ở ví dụ này để đơn giản mình sẽ dùng Notepad (nếu không nhấn vào lựa chọn Choose another app), bạn có thể dùng Visual Studio Code hoặc các Text Editor khác nếu thích
![image.png](https://images.viblo.asia/cec4f648-7934-46d9-aa31-fee724264364.png)

Thêm trường **SMBIOS.reflectHost = "TRUE"** vào file như trong hình, bạn không cần thiết phải thêm xuống dòng như hình của mình, mình làm cho rõ, bạn thích làm cũng được =))
![image.png](https://images.viblo.asia/2588c280-d0ab-4cce-b7df-aa52154f26fa.png)

Lưu file lại, thực hiện Ctrl+S hoặc File -> Save. Nhớ mở lại kiểm tra cho chắc 😅

Bật lại phần mềm VMWARE WORKSTATION PLAYER 16, khởi động lại máy ảo 
![image.png](https://images.viblo.asia/228d56aa-fe17-417b-ad9d-0af5ffd72d0e.png)

Thực hiện restart lại máy cho chắc 😅

Vào window search lại Safe Exam Browser rồi mở app đó lên 
![image.png](https://images.viblo.asia/51f78823-ccaf-41c6-8734-fbf799832f1a.png)

Kết quả hiện ra ngay trước sau thời gian dài miệt mài 
![image.png](https://images.viblo.asia/69200f56-f033-4e99-bc27-0b54310aa334.png)

Vừa rồi mình đã hướng dẫn cho bạn cách sử dụng Safe Exam Browser (SEB) trên máy ảo thông qua phần mềm VMWARE WORKSTATION PLAYER 16😁 Hãy nhớ học bài đầy đủ trước khi tham gia các kì thi thay vì tìm hiểu về các hình thức **gian lận** bạn nhé