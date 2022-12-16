# Hướng dẫn cài đặt và sử dụng VPS trên Vultr

<br>
<br>

### I. Giới thiệu về Vultr

<br>

**1. Vultr là gì?**

<br>

Vultr là nhà cung cấp dịch vụ VPS Server, Cloud Server với 100% phần cứng SSD, 15 datacenter location trải dài trên khắp thế giới. Ưu điểm của Vultr là giá rẻ, hiệu năng cao và cài đặt dễ dàng, nhanh chóng

<br>

![](https://images.viblo.asia/f4b3c7b4-b60f-4bbd-b3da-ca9b01b80799.jpg)

<br>

**2. Điều kiện để sử dụng dịch vụ của Vultr**

<br>

- Để sử dụng được dịch vụ VPS của Vultr, bạn cần đăng ký một tài khoản để sử dụng. Và thực hiện thanh toán đối với họ

- Thanh toán: Hiện tại Vultr hỗ trợ khá nhiều hình thức thanh toán khác nhau

<br>

![](https://images.viblo.asia/46a220a5-1c60-426a-b0dd-b0394de1811d.png)

<br>

Nhưng phổ biến nhất là dùng credit và paypal để thanh toán.


### II. Hướng dẫn cài đặt VPS và sử dụng

<br>

Sau khi bạn đã tạo được một tài khoản và setting một hình thức thanh toán với Vultr, thì chúng ta hoàn toàn có thể sử dụng dịch vụ của Vultr. Các bước tạo một VPS trên vultr

***Bước 1:***

<br>

Click vào products. Sau đó chọn biểu tượng dấu + để khởi tạo một vps mới

<br>

![](https://images.viblo.asia/6b1b97d5-9454-4f8c-ac21-2b0cd75c1d10.jpg)

<br>


***Bước 2:***

<br>

Tiến hành lựa chọn các thông số, cài đặt cho VPS:

- Chọn server : Cloud computer

<br>

![](https://images.viblo.asia/3095212f-97d2-4f1b-a5c2-1733c17aa969.png)

<br>

- Chọn Server Location: Mình hay chọn Tokyo (vì nó khá gần Việt Nam mình)

<br>

![](https://images.viblo.asia/2c3c5976-0723-408c-b271-32400edcad96.png)

<br>

- Chọn Server Type:

Bạn hiểu đại khái là bạn đang chọn hệ điều hành và cách cài hệ điều hành cho VPS của bạn. Như mình thì thường hay chọn Centos 7

<br>

![](https://images.viblo.asia/f85ac404-ee2e-4ff1-964a-eeec1933d404.png)

<br>

- Chọn Server Size: 

Tùy chọn vào yêu cầu về hệ thống của các bạn mà chọn loại phù hợp


- Additional Features, Startup Script, SSH Keys: 

Bạn có thể setting hoặc không

- Server Hostname & Label: 

Điền hostname và label bạn muốn đặt


***Bước 3:***

Cuối cùng nhấn Deploy Now và chờ đợi quá trình install hoàn tất

<br>

![](https://images.viblo.asia/70f1a7dd-812d-462c-8220-59b0c9778850.jpg)

<br>

Sau khi quá trình cài đặt hoàn tất. Bạn có thể vào detail mà server mình đã cài. Trong đó chứa thông tin đăng nhập để bạn ssh vào server.

<br>

![](https://images.viblo.asia/510dd792-9934-47f8-8d16-d3b9eefc430d.png)

<br>

Đối với các bạn dev làm mảng website và server sẽ không còn lạ lẫm với việc thao tác với VPS hoặc server nữa rồi nhỉ.

<br>

<br>

### III. Tính năng Snapshot trong vultr

<br>

Đây là một tính năng khá thú vị và mình cũng hay dùng trong lúc cài đặt VPS ở vultr.

Có một vấn đề đặt ra như này: Mình thường cần phải tạo khá nhiều vps cho các hệ thống mình làm. Ví dụ cứ mỗi một con outsource mình cần phải tạo 1 cái vps cho khách hàng, dẫn tới mình cứ phải lặp đi lặp lại thao tác cài đặt vps như vậy. 

Nếu chỉ cần cài vps không thôi thì không sao, quan trọng mình cần phải cài đặt môi trường rồi các thứ cần thiết khác ví dụ như JDK, mysql, nodejs, setting firewall,.... Có khi cài xong tất tần tật cũng gần tiếng. 

Vậy thay vì mình phải cài đi cài lại nhiều lần như vậy, thì mình tạo ra 1 bản snapshot, giống như 1 bản sao chép toàn bộ các cài đặt cơ bản của vps đó. Giờ khi tạo mới 1 vps. Mình chỉ cần đổ toàn bộ sao chép như trên vào vps là xong. Việc còn lại là để hệ thống tự làm.

Tiếp theo chúng ta sẽ đi vào chi tiết các tạo và sử dụng snapshot nhé:

**1. Tạo snapshot**

Bạn vào detail của một con VPS chọn tab Snapshots

<br>

![](https://images.viblo.asia/6b1b97d5-9454-4f8c-ac21-2b0cd75c1d10.jpg)

<br>

Điền tên và click Take Snapshot

<br>

![](https://images.viblo.asia/7e28726e-df00-4fe6-939b-56d88da91908.png)

<br>

Bạn đợi cho đến khi quá trình hoàn tất là xong

**2. Sử dụng snapshot**

Ở bước chọn Server Type của quá trình tạo vps. Thay vì chọn 64 bit OS bạn chọn tab Snapshot

<br>

![](https://images.viblo.asia/2896c2e0-e606-42fc-861a-6124930e534b.png)

<br>

Rồi chọn snapshot mà bạn muốn restore là xong. Các bước khác làm tương tự như thường.

<br>

<br>


### Bài viết chia sẻ về cách cài đặt VPS trên Vultr đã kết thúc. Hi vọng nó sẽ hữu ích với các bạn