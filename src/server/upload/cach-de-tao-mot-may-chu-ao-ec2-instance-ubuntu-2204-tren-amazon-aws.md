Ở bài viết này, chúng ta sẽ tìm hiểu về cách tạo một máy chủ ảo Ubuntu 22.04 LTS trên Amazon AWS.

Tất cả những setup sau đây là **Free tier** cho phép bạn sử dụng miễn phí dịch vụ trong hạn mức nhất định do AWS quy định.

### Cần chuẩn bị:
Một tài khoản AWS.

### Các bước để tạo một Ubuntu Instance:
1. Đăng nhập bằng tài khoản AWS của bạn và đi đến bảng điều khiển.

2. Tìm kiếm **EC2** trên thanh tìm kiếm Services và bấm chọn **EC2**.

3. (Không bắt buộc) Phía trên góc phải của trang Amazon EC2, bấm chọn **Region** (vùng) mà bạn muốn tạo EC2 instance.

![Ảnh chụp Màn hình 2022-08-23 lúc 13.55.43.png](https://images.viblo.asia/9c268bbf-d694-423f-836f-643e6d740795.png)

4. Bấm chọn **Launch Instance** ở EC2 Dashboard.

5. Chọn **AMI** (Amazon Machine Image). Chọn **Ubuntu 22.04 LTS**.

![Ảnh chụp Màn hình 2022-08-23 lúc 13.58.22.png](https://images.viblo.asia/1d98ae47-10e7-4c5e-97de-6379f3cdc1fe.png)

6. Chọn **Instance Type**. Ở đây mình sẽ chọn General purpose t2.micro. Bởi vì nó có **Free Tier**. Bây giờ tiếp tục bấm **Next: Configure Instance Details**.

![Ảnh chụp Màn hình 2022-08-23 lúc 14.03.37.png](https://images.viblo.asia/9f68a4e8-e1b2-4b6f-bab0-ff4a59e8b09d.png)

7. (Không bắt buộc) Cấu hình cho Instance. Ở đây chúng ta có thể tùy chỉnh số lượng Instance và User Roles cho những Instance này bằng cách cài đặt và định nghĩa IAM Role. Những thông tin còn lại bạn có thể giữ nguyên mặc định ban đầu. Bây giờ tiếp tục bấm **Next: Add Storage**.

![Ảnh chụp Màn hình 2022-08-23 lúc 14.07.20.png](https://images.viblo.asia/e130158f-b7a6-4d0b-8431-29de1bb430f0.png)

8. **Add Storage:** Ở đây chúng ta có thể thay đổi kích thước dung lượng cho EC2 Instance. Free Tier có thể áp dụng cho dung lượng tối đa 30GB.

![Ảnh chụp Màn hình 2022-08-23 lúc 14.18.59.png](https://images.viblo.asia/5d7712c3-0ffc-48d8-aa43-2fbc9997b8c4.png)

9. (Không bắt buộc) **Add Tags:** Ở đây, chúng ta có thể gắn vài tag cho EC2 Instance. Sau đó tiếp tục bấm **Next: Configure Security Group**.

![Ảnh chụp Màn hình 2022-08-23 lúc 14.36.40.png](https://images.viblo.asia/fa44455b-0972-4106-b14a-27b2763c9cfd.png)

10. Cấu hình **Security Group**

    Ở đây, chúng ta có thể tạo mới nhóm bảo mật (Security Group) và định nghĩa các cổng (Port) sẽ được mở cho EC2 Instance.
    Về mặt cơ bản, chúng ta sẽ thêm cổng HTTP, HTTPS và SSH cho EC2 Instance. HTTP và HTTPS là để cho phép các yêu cầu trình duyệt từ khắp nơi trên thế giới đến máy 
    chủ ảo của chúng ta. Và SSH là để kết nối với EC2 Instance từ máy cục bộ của chúng ta.
    Ở đây mình sẽ cấu hình như sau:

    ```
    HTTP   80  Anywhere 0.0.0.0/0
    HTTPS  443 Anywhere 0.0.0.0/0
    SSH    20  Anywhere or Custom
    ```

    *Đối với SSH, mình khuyến khích mọi người nên custom bằng cách cấu hình như sau:
    `<Your Public IP Address>/32` – Cho phép kết nối đến EC2 Instance chỉ duy nhất từ Public IP Address của máy cục bộ của bạn.*

![Ảnh chụp Màn hình 2022-08-23 lúc 15.13.21.png](https://images.viblo.asia/87b690bd-f105-4115-a32b-423b111c6457.png)

11. Bấm chọn **Review and Launch**. Kiểm tra các thông tin chi tiết về Instance rồi bấm chọn **Launch**.

12. Tạo một **Key pair** để kết nối với EC2 Instance từ máy cục bộ. Tải Key pair về và giữ nó an toàn. Nó sẽ được sử dụng để kết nối với EC2 Instance sau đó.

![Ảnh chụp Màn hình 2022-08-23 lúc 15.18.13.png](https://images.viblo.asia/3da799da-fe83-4419-bf32-40d9a255f9f7.png)

13. Cuối cùng bấm chọn **Launch Instance**.

![Ảnh chụp Màn hình 2022-08-23 lúc 16.11.50.png](https://images.viblo.asia/cb7629ee-9dba-4a05-8f1e-e34f721bc85c.png)

> EC2 Instance của bạn đã sẵn sàng để sử dụng. Hãy chờ một lúc cho đến khi trạng thái của Instance (Instance State) đổi từ `running` sang `status check`. Bây giờ bạn có thể kết nối với EC2 Instance từ máy cục bộ của bạn. Kham khảo: [Cách SSH đến EC2 Instance Ubuntu từ Mac/Ubuntu.](https://viblo.asia/p/cach-ssh-den-ec2-instance-ubuntu-tu-macubuntu-PAoJe0xN41j)