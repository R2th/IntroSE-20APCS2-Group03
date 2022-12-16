### Grafana là gì
Grafana là một nền tảng open-source chuyên phục vụ mục đích theo dõi và đánh giá các số liệu thu được. Theo định nghĩa như vậy chúng ta có thể thấy tính ứng dụng của Grafana rất rộng chứ không chỉ trong khối IT. Bất kì lĩnh vực nào có thể thu được dữ liệu theo dòng thời gian đều có thể hiển thị tối ưu trên Grafana. Ngoài khả năng kết nối đa dạng với các nguồn dữ liệu, phần giao diện của công cụ này rất thân thiền với người dùng. Dễ dàng đưa ra thông tin và cảnh báo.

### Cài đặt Grafana trên môi trường Debian
Trước hết, mời mọi người xem tài liệu chính thức từ nhà phát triển:
https://grafana.com/docs/grafana/latest/installation/debian/

#### Khởi tạo môi trường thử nghiệm
Vì môi trường cài đặt Grafana khá đơn giản nên mình sẽ sử dụng image ubuntu:16.04 cơ bản để làm một lab tương tự như máy chủ thật.
``` bash
$ docker run -itd --network=lab-prom -p 3030:3000 --name grafana-1 ubuntu:16.04
```
Chú ý: Cần sử dụng chung mạng với Prometheus để dễ dàng kết nối.

Cài đặt bản mới nhất Enterprise edition (Có khả năng nâng cấp bản Enterprise cho doanh nghiệp nếu muốn):
``` bash
$ apt-get update
$ apt-get install -y apt-transport-https
$ apt-get install -y software-properties-common wget
$ wget -q -O - https://packages.grafana.com/gpg.key | apt-key add -
```

Thêm repository:
``` bash
$ echo "deb https://packages.grafana.com/enterprise/deb stable main" | tee -a /etc/apt/sources.list.d/grafana.list 
```
``` bash
$ apt-get update
$ apt-get install grafana-enterprise
```

Khởi động grafana-server
``` bash
service  grafana-server start
```

**Xem trên trình duyệt máy chủ: http://127.0.0.1:3030**

Tài khoản Admin mạc định là admin | admin, sau lần đăng nhập đầu tiên, hệ thống sẽ bắt buộc admin đổi mật khẩu.
![](https://images.viblo.asia/f2676a0a-fa1b-468a-818d-9c1b18f2ffed.png)

**Màn hình Dashboard ban đầu:**

![](https://images.viblo.asia/f91a187f-7483-4103-98b2-0bf8f6504a32.png)

**Màn hình thêm nguồn dữ liệu (Data Sources)**

![](https://images.viblo.asia/5e788ca3-2b55-41ed-8b78-4c8ebbb9fb85.png)

**Chọn nguồn từ Prometheus**

![](https://images.viblo.asia/5a0bad30-5e98-4892-985a-59ca4d8b8634.png)
Hiện tại Grafana hỗ trợ rất nhiều nguồn dữ liệu phổ biến hiện nay.

**Tạo một Folder > Dashboard > Panel thông tin mới**

![](https://images.viblo.asia/6b417d75-b57f-4e34-9869-6e57bbd87122.png)

![](https://images.viblo.asia/dd17a35c-cdfd-4215-bbd8-7d2cab29cc5b.png)

![](https://images.viblo.asia/064485cd-1491-4033-8a07-9ac80836a4cb.png)

![](https://images.viblo.asia/ce14b69e-4306-4322-90a8-5f9bd6b5c492.png)

Kết quả là hiển thị số lượng message trong queue đang có. Còn vô số các cấu hình khác trên Panel này để phù hợp với dữ liệu cần theo dõi và cảnh báo. Nếu bạn muốn cấu hình các thông số khác, hãy để lại câu hỏi dưới comment mình sẽ trợ giúp nếu có thể nhé!