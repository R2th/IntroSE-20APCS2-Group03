Dữ liệu thời gian thực hay time series hiện tại không hề xa lạ với các chuyên gia phân tích kinh tế, một trong những cơ sở dữ liệu phù hợp nhất để lưu trữ loại dữ liệu này chính là InfluxDB, cách cấu hình cơ bản cũng như hướng dẫn sử dụng cơ sở dữ liệu Influxdb các bạn có thể tham khảo qua bài viết trước đây của mình  =>  [Lưu trữ dữ liệu time series với InfluxDB cùng bài toán về dữ liệu chứng khoán](https://viblo.asia/p/luu-tru-du-lieu-time-series-voi-influxdb-cung-bai-toan-ve-du-lieu-chung-khoan-gGJ59xnGlX2)

Bài viết lần này mình sẽ hướng dẫn cách thức mô hình hóa dữ liệu GUI thông qua ứng dụng **Grafana** bằng một ví dụ về dữ liệu của các đồng tiền ảo 
![](https://images.viblo.asia/8f0be020-fd6e-4010-8ba1-d4c2c336d685.jpeg)





# Cài đặt Grafana
Tùy vào hệ điều hành mà các bạn có thể chọn các cách thức phù hợp hoặc  có thể cài đặt thông qua [docker](https://grafana.com/docs/installation/docker/). Các bạn có thể xem qua thông tin chi tiết cài đặt cho từng hệ điều hành [tại đây](https://grafana.com/docs/installation/) . Trong lần này mình sẽ sử dụng hệ điều hành ubuntu nên sẽ hướng dẫn những lệnh cho hệ điều hành này, tuy nhiên tư tưởng thì vẫn hoàn toàn giống nhau giữa các hệ điệu hành.

Lần lượt cài các gói cần thiết như trong [tài liệu](https://grafana.com/docs/installation/debian/)

Sau khi đã cài đặt thành công thì chạy server host cho **Grafana** :
```bash
sudo service grafana-server start
```

**Grafana** sẽ lấy chạy tại port 3000, do đó các bạn vào đường dẫn để thao tác trực tiếp qua GUI để mô hình hóa thay vì những  của **Grafana**. Truy cập đường dẫn http://localhost:3000 sẽ thầy màn hình đăng nhập :

![](https://images.viblo.asia/913aaf2d-eaba-4c6f-ab1f-a7637447124c.png)

Tài khoản mặc định có **username** và **password** cùng là **admin**, sau đó sẽ phải đặt lại password cho tài khoản admin.Sau đó màn hình **Home** :

![](https://images.viblo.asia/1f40e904-3fd9-440b-89ee-6931f2adfca5.png)

Phần màn hình **Home** sẽ liệt kê các công việc cần làm để hoàn thành toàn  bộ phần setup :
1. Install
2. Tạo một datasource
3. Tạo một dashboard
4. Thêm user (sharing)
5. Exploring plugin repository (Phần này thì mình chưa rõ )

Phần này mình sẽ giới thiệu các bạn cách thức tạo datasource và mô hình hóa dữ liệu bằng giao diện , còn các phần khác sẽ dành cho các bạn tự vọc thêm nhé. =))

# Tạo Datasource
Trên sidebar phía bên trái màn hình **Home** các bạn có thể chọn **Configuration** (Biểu tượng bánh răng ). Như mở đầu mình đã trình bày, dữ liệu lần này là dữ liệu thời gian thực và được lưu trữ bởi **InfluxDB**, do đó mình sẽ sử dụng **Datasource** là **InfluxDB**, để có thể thực hiện bước này các bạn cần có chút kiến thức về **InfluxDB**, những ai chưa có kiến thức về phần này thì có thể overview qua  [bài viết trước đó của mình](https://viblo.asia/p/luu-tru-du-lieu-time-series-voi-influxdb-cung-bai-toan-ve-du-lieu-chung-khoan-gGJ59xnGlX2) :

![](https://images.viblo.asia/de27b98d-a343-4f21-9a1e-7c5833bd1a5b.png)

Tiếp theo sẽ là config để có thể tương tác với Influx :
![](https://images.viblo.asia/5baa4de1-94dc-453c-be85-c53f3b006dcd.png)

Các bạn cần chú ý những phần chính
* **URL** mình sẽ để là http://localhost:8086 - đây chính là hosting mặc định của **InfluxDB**, chạy ở port **8086**
* Database mình sẽ để là database **coin_api** đã được mình khởi tạo (Nếu các bạn chưa có dữ liệu thì dưới đây mình sẽ hướng dẫn )

Do việc restore dữ liệu database từ một hosting này sang một hosting cũng khá nhiều  bước  do đó mình sẽ để nó là một đề mục
## Import dữ liệu đã có

Đây là dữ liệu mình đã thu thập về giá của các **đồng tiền  ảo** theo từng phút  trong khoảng hơn 1 tuần, các bạn có thể download từ đường dẫn sau : [dữ liệu tiền ảo](https://www.dropbox.com/home/coin) . 

Có dữ liệu đã được lưu về sẽ tồn tại trong folder **coin/**, mình lưu folder này tại Desktop do đó sẽ có dạng đường dẫn (c
```bash
/home/tmc/Desktop/coin
```
Sau đó mở terminal lên và gõ lệnh sau:

```sql
influxd restore -portable -db coin_api /home/tmc/Desktop/coin
```
Trước khi chạy lệnh các  bạn cần kiểm tra chính xác rằng database **coin_api**

Có thể kiểm tra thông qua câu lệnh sau :
1. Mở terminal và  gõ lệnh `influx` để thao tác console của influxdb
2. Kiểm tra các databases hiện có : `SHOW DATABASES`

Okay, vậy là nếu mọi thứ ổn thì hiện tại chúng ta sẽ có một cơ sở dữ liệu để thao tác. Để kiểm tra các **measurements** có trong csdl **coin_api** chúng ta sử dụng câu lệnh : 
```sql
SHOW MEASUREMENTS
```

Trong mỗi **measurement** sẽ có 2 trường là **time** và **price** là thời gian và giá tiền tương ứng được quy đổi theo **USD**

![](https://images.viblo.asia/59a4a674-f257-482c-a153-a945e959fa3a.png)

# Mô hình hóa dữ liệu
Sau các bước trên thì chúng ta đã config tương đổi ổn để có thể vizualizate dữ liệu, bước tiếp theo là tạo một **Dashboard** bằng cách click vào biểu tượng dấu Cộng phía sidebar bên trái, màn hình sẽ được thay đổi về giao diện giúp xây dựng **Dashboard**:

![](https://images.viblo.asia/c8a6d2fc-6258-4bf9-a60b-2b95ca7d4b35.png)

Các bạn sẽ thấy xuất hiện một sidebar mới hiển thị các trạng thái hiện tại của quá trình xây dựng **Dashboard**. Như trong màn hình thì chúng ta đang ở trạng thái chọn dạng biểu đồ hiển thị, với dữ liệu dạng này thì mình sẽ sử dụng sơ đồ dạng cột, cũng là sơ đồ default hiện tại (Được tô viền vàng như trong hình trên)

Sau khi chọn loại biểu đồ chúng ta sẽ thực hiện query để lấy ra dữ liệu - click vào button phía trên của trạng thái hiện tại ở sidebar. Tại đây chúng ta có các select option để xây dựng câu query hoặc có thể viết trực tiếp, mình sẽ chọn cách viết trực tiếp câu queryy (Bởi vì cái đó đối với mình đơn giản là cảm thấy trực quan hởi thôi còn các bạn có thể lựa chọn cách phù hợp với bản thân):
![](https://images.viblo.asia/dd3b8bc5-e19a-4e5b-a9ba-1ace33702e0b.png)

Câu query của mình khá đơn giản, chỉ là lấy toàn bộ dữ liệu đã store lại về giá của đồng **bitcoin**, dữ liệu đã được mô hình hóa một cách trực quan, các bạn có thể lựa chọn xem chi tiết từng mốc thời gian bằng cách quét chuột các mốc thời gian hoặc lựa chọn dựa trên dropdown phía góc  phải màn hình, sức  mạnh của **Grafana** ở việc có thể hiển thị giá trị tới từng giây.

Bên cạnh đó cũng có thể biểu diễn linh hoạt bằng các biểu đồ khác như sơ đồ quạt, table:
![](https://images.viblo.asia/93c50365-d204-466c-91f5-47061723afab.png)

# Kết luận
Trong bài viết lần này mình đã hướng dẫn các bạn một cách đơn giản có thể mô hình hóa dữ liệu thời gian thực với **influxdb** và **grafana**, có thể sẽ rất có ích đối với những bạn thiên hướng nghiên cứu về dữ liệu cũng như những bạn hiện đang học về kinh tế khi mà chưa có kinh nghiệm về lập trình

# Tham khảo
https://docs.influxdata.com/influxdb/v1.7