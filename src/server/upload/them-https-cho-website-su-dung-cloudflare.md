Chào các bạn.

Hôm nay mình sẽ hướng dẫn các bạn thêm https miễn phí cho website của mình thông qua Cloudflare, 1 dịch vụ mà mình thấy rất nhanh chóng, tiện lợi và cực kỳ hữu ích.

Nào cùng bắt đầu nhé!
# 1. Mua domain
- Hiện nay có rất nhiều nhà cung cấp tên miền tại việt nam và thế giới như GoDaddy, namecheap, z.com, matbao, tenten, pavietnam, ... Ở đây mình hay dùng của z.com đây là 1 dịch vụ của tập đoàn GMO Nhật Bản. 

Địa chỉ website mình mua ở đây: [https://domain.z.com/vn/](https://domain.z.com/vn/)

- Các bước mua domain mới rất đơn giản: 
+ Tìm kiếm tên miền
+ Thanh toán
+ Trỏ DNS về server

Nếu có khó khăn trong quá trình setup, bộ phận hỗ trợ sẽ giúp đỡ bạn nhiệt tình luôn :D

Okey. Ở đây mình demo luôn 1 tên miền: [http://nhomductamduc.com](http://nhomductamduc.com)
Hiện giờ vào đã có https rùi nhé các bạn.

- Khi đăng ký tên miền xong, domain mới sẽ có 1 DNS mặc định sẽ tự trỏ về nhà cung cấp như hình dưới đây.
![DNS default](https://images.viblo.asia/c7c0fc26-4c4b-4db5-b64c-7cdaeba942ed.PNG)


Bất kể bạn mua domain ở nhà cung cấp nào cũng sẽ có DNS mặc định như vậy, chỉ là họ thay đổi giao diện để setup thôi.

# 2. Thêm site trên cloudflare
OK, Tiếp đến mình sẽ thêm domain vào cloudflare.
- Bước đầu vào giao diện click button add domain sẽ ra giao diện như này:
![Add domain](https://images.viblo.asia/9dc009f5-d54e-4a41-8fd9-af68190f8e99.PNG)

- Sau khi thêm domain, sẽ redirect đến màn hình chọn gói dịch vụ, ở đây các bạn cứ dùng gói free thoải mái nhé, chọn Free và Click Continue.
![Choose type](https://images.viblo.asia/cf71276e-41fc-4958-adac-32ab46355989.PNG)

- Sau khi thêm domain vào cloudflare, hệ thống sẽ scan DNS hiện tại của domain đang là gì? sau đó các bạn click nút Add record DNS và nhập 2 dòng DNS theo thứ tự:
+ DNS type A, tên domain, địa chỉ IP //dòng này để trỏ domain vào IP
+ DNS type A, www, địa chỉ IP //dòng này để thêm www cho domain
=> Click Continue để xác nhận

![Add DNS](https://images.viblo.asia/3533efb9-b08a-4483-bde2-79321b062d54.PNG)


- Sau đó sẽ redirect đến màn hình hướng dẫn thay đổi DNS mặc định thành DNS của cloudflare. 
![Guide DNS](https://images.viblo.asia/74b8f4c8-da2a-4215-b99b-e09c7c40dddb.PNG)

# 3. Trỏ DNS vào cloudflare
Tiếp theo các bạn mở phần DNS mặc định của domain trên nhà cung cấp domain ra.
- Các bạn copy 2 DNS ở màn hình finish bên cloudflare vào chỗ DNS mặc định của nhà cung cấp domain.

Như hình trên, DNS của cloudflare là: 
+ elisa.ns.cloudflare.com
+ randall.ns.cloudflare.com

Các bạn copy thay vào DNS mặc định:
![Change DNS](https://images.viblo.asia/708c5d3b-f5c4-4b4d-822a-f6803380f50f.PNG)

![Finish](https://images.viblo.asia/f0637044-05b7-4e75-a482-1e8c7fe7f99c.PNG)

# 4. Setup cloudflare
Ok, sau khi thay đổi DNS mặc định của nhà cung cấp tên miền thành DNS của cloudflare, hệ thống đã bắt đầu chuyển đổi rùi, việc tiếp theo là config bên cloudflare để hoạt động như ý muốn.

- Bước đầu sẽ chọn luôn luôn redirect đến HTTPS
![Redirect HTTPS](https://images.viblo.asia/a61a907f-010a-4841-90b7-4f1530613dd2.PNG)

- Bước 2 sẽ chọn auto minify Javascript, CSS, HTML
![Minify Javascript, CSS, HTML](https://images.viblo.asia/704893dc-a45b-43f3-a97a-fd8e9cb265ec.PNG)

- Finish
![Finish](https://images.viblo.asia/d630bea0-8726-45d6-84eb-8ae8551cad14.PNG)

Sau khi qua hết các bước trên, bạn đã hoàn thành 99% rùi :D 

Ở màn hình review cuối cùng tại Cloudflare, các bạn click nút Check nameserver nữa là finish.
![Review](https://images.viblo.asia/388d288d-a932-4852-894e-3244e395adf6.PNG)

Sau đó chờ thành quả của các bạn nhé :D
![Finish](https://images.viblo.asia/42fb470f-a4e7-433c-8f42-b194f008ae8d.PNG)

# 5. Kết luận
Như vậy mình đã hướng dẫn xong cách thêm https cho domain bằng cloudflare. Trước đây mình chỉ biết cách thêm file certificate để xác nhận https, nhưng từ khi biết đến cloudflare mình đã dùng rất nhiều, và thấy rất thuận tiện và nhanh chóng.

Chúc các bạn sử dụng thành công nhé!