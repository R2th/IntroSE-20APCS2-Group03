# 1. Cơ bản về S3
### 1.1 Định nghĩa
S3 (Simple Storage Service) là một dich vụ lưu trữ trực tuyến số lượng lớn mà bạn có thế truy cập nó từ gần như bất kì thiết bị nào. Bạn có thể tưởng tượng nó như một ổ cứng ảo mà bạn có thể truy cấp nó từ bất kì nơi nào miễn là bạn có kết nối internet.
<br>

Bạn có thể lưu trữ bất cứ loại file nào trong S3.
<br>

### 1.2 Thành phần và cấu trúc
![](https://images.viblo.asia/31d5d752-f3f7-414c-89b5-88e17a20f2b0.png)

**Buckets:**
- Các "folder" ở tầng root mà bạn tạo trong S3 được gọi là các ***bucket***.
- Các folder con bạn tạo trong bucket gọi là các ***folder***.

**Objects:**
- Các file được lưu trong bucket được gọi là các ***object***.

**Regions:**
- Khi tạo một bucket, bạn cần phải chọn một region nào đó cho nó. Điều này có nghĩa rằng ***bất cứ dữ liệu nào bạn upload lên bucket S3 sẽ nằm trong data center ở region đó***.
- Best practice khi chọn region: chọn region gần với bạn nhất để giảm tối đa độ trễ.
- Nếu bạn cần cung cấp file tới người dùng thì hãy tạo bucket ở region gần nhất với khu vực của người dùng (để giảm tối đa độ trễ cho người dùng).

### 1.3 Chi phí
AWS sẽ tính phí sử dụng S3 của bạn như sau:
#### Phí lưu trữ:
- Áp dụng với các dữ liệu lưu trong S3
- TÍnh phí theo số GB đã sử dụng
- Đơn giá theo từng GB sẽ tùy thuộc vào region và loại storage (storage class)

#### Phí request - di chuyển dữ liệu ra/vào S3:
- PUT
- COPY
- POST
- LIST
- GET
- Request chuyển đổi lifecycle
- Truy xuất dữ liệu
- Lưu kho dữ liệu
- Khôi phục dữ liệu

Nếu bạn sử dụng [AWS Free Tier](https://viblo.asia/p/co-ban-ve-tai-khoan-aws-1Je5E7RGZnL#_aws-free-tier-0), bạn có thể sử dụng miễn phí S3 ở một mức nhất định. Cụ thể là bạn sẽ có 5GB S3 storage class standard; 20.000 GET request, 2.000 PUT, COPY, POST hoặc LIST request và có thể transfer 15GB dữ liệu ra ngoài mỗi tháng trong vòng 1 năm.
<br>

Lượng sử dụng của bạn sẽ dược tính hàng tháng theo tổng lưu lượng sử dụng của tất cả các region, phần lưu lượng chưa sử dụng sẽ không được cộng dồn vào tháng tiếp theo.

# 2. Storage class
### 2.1 Định nghĩa
Storage class thể hiện sự phân loại của từng object trong S3. Các storage class hiện có bao gồm:
- Standard
- Intelligent-Tiering
- Standard-Infrequent Access (Standard-IA)
- One Zone-Infrequent Access (One Zone-IA)
- Glacier
- Glacier Deep Archive
- Outposts

Mỗi storage class lại có các thuộc tính khác nhau quy định các mặt như:
- Chi phí storage
- Độ khả dụng của object
- Độ bền của object
- Mức độ truy cập thường xuyên tới object

Mỗi object đều phải được assign một storage class nào đó (mặc định là standard)
<br>

Bạn gần như có thể thay đổi storage class của một object bất cứ lúc nào bạn muốn.

### 2.2 Standard
- Là class thông dụng nhất
- Được thiết kế cho việc lưu trữ nói chung (tất cả các mục đích lưu trữ)
- Là lựa chọn storage mặc định
- ***99.999999999% độ bền object*** (11 số 9)
- ***99.99% độ khả dụng object***
- Là storage class có phi đắt nhất

### 2.3 Intelligent-Tiering
- Được thiết kế cho các object chưa xác định mức độ truy cập hoặc có mức độ truy cập không cố định. S3 sẽ theo doi mức độ truy cập các object và chuyển chúng vào cấp truy cập phù hợp.
- ***99.999999999% độ bền object*** (11 số 9)
- ***99.9% độ khả dụng object***
- Rẻ hơn storage class standard

### 2.4 Standard-IA
- Được thiết kế cho các object không được truy cập thường xuyên nhưng cần phải khả dụng ngay lập tức khi được truy cập.
- ***99.999999999% độ bền object*** (11 số 9)
- ***99.9% độ khả dụng object***
- Rẻ hơn storage class standard

### 2.5 One Zone-IA
- Được thiết kế cho các object không quan trọng, có thể tái sản xuất được.
- ***99.999999999% độ bền object*** (11 số 9)
- ***99.95% độ khả dụng object***
- Rẻ hơn storage class Standard-IA

### 2.6 Glacier
- Được thiết kế cho việc lưu trữ dài hạn
- Cần từ vài phút đến vài tiếng để truy xuất được dữ liệu
- ***99.999999999% độ bền object*** (11 số 9)
- Là storage class giá rất rẻ của S3

### 2.7 Glacier Deep Archive
- Được thiết kế cho việc lưu trữ dài hạn
- Có thể cần đến 12 tiếng để truy xuất được dữ liệu
- ***99.999999999% độ bền object*** (11 số 9)
- Là storage class có giá rẻ nhất

# 3. Object Lifecycles
Lifecycle của một object là một bộ các quy tắc dùng để tự động hóa việc chuyển đổi storage class của object từ class này sang class khác, hoặc là tự động hóa việc xóa object đó sau một khoảng thời gian chỉ định.
<br>

Để rõ hơn thì mình có một ví dụ như sau:
- Mình có một file dùng cho công việc mà mình sẽ cần phải truy cập nó mỗi ngày trong vòng 30 ngày tới.
- Sau đó, mình sẽ chỉ cần truy cập file đó 1 lần/tuần trong 60 ngày tiếp theo.
- Sau đó, mình có lẽ sẽ không bao giờ cần phải check file đó nữa, nhưng vẫn cần lưu giữ để đề phòng.

Trong trường hợp trên, mình có thể sử dụng lifecycle policy để tự động hóa quá trình chuyển storage class của file sang các class khác để phù hợp với nhu cầu sử dụng và giảm thiểu tối đa chi phí sử dụng S3 storage. Cụ thể giải pháp sẽ như sau:
<br>

**Ngày 0-29 (30 ngày):**
- Mức truy cập = rất thường xuyên
- Storage class phù hợp = Standard
- Đơn giá = mức cao nhất

**Ngày 30-89 (60 ngày):**
- Mức truy cập = không thường xuyên
- Storage class phù hợp = Standard-IA
- Đơn giá = mức trung bình

**Ngày 90+:**
- Mức truy cập = gần như không bao giờ
- Storage class phù hợp =Glacier
- Đơn giá = mức cực thấp

![](https://images.viblo.asia/6d2651a1-238c-4573-b22f-ece012c9c183.png)

Bạn có thể tìm thấy tab quản lý lifecycle ở màn hình quản lý bucket, tuy nhiên một lifecycle policy có thể áp dụng với:
- Toàn bộ bucket (toàn bộ object trong bucket)
- Một folder nhất định trong bucket (toàn bộ object trong folder đó)
- Một object nhất định trong bucket

![](https://images.viblo.asia/b8854843-b958-4e34-87ff-28ba3740efa3.png)

Bạn có thể xóa một lifecycle policy hoặc tự tay thay đổi storage class bất kì khi nào bạn muốn.

# 4. Permissions
S3 permission là thứ giúp bạn có thể kiểm soát chặt chẽ việc ai có thể xem, truy cập và sử dụng một bucket hoặc object nào đó.
<br>

Tab permission có thể được tìm thấy ở màn hình quản lý bucket hoặc màn hình quản lý của một object nào đó:
![](https://images.viblo.asia/5623d4ba-24e3-4c0b-9b2c-2f2642380b23.png)

![](https://images.viblo.asia/21f141d6-4b2e-475a-8d1c-7d72ae8f513d.png)

Nếu bạn chọn public một object nào đó thì link ở trong mục Object URL ở tab Properties của object có thể được sử dụng để truy cập object đó.

# 5. Object versioning
S3 versioning là một tính năng theo dõi và lưu trữ tất cả các phiên bản của một object để giúp bạn có thể truy cập và sử dụng các phiên bản cũ hơn nếu muốn.
<br>

Bạn có thể lựa chọn ON hoặc OFF tính năng versioning. Tuy nhiên, một khi đã bật tính năng này thì sau đó bạn chỉ có thể dừng việc tạo phiên bản chứ không thể hoàn toàn tắt tính năng này đi. Có nghĩa là bạn chỉ có thể dừng lại việc tạo ra thêm các phiên bản của object, còn các phiên bản đã được tạo ra trước đó sẽ vẫn tồn tại trong storage.

![](https://images.viblo.asia/d5b81703-c271-4708-b006-b75f798ccbe8.png)

Tính năng versioning chỉ có thể thiết lập ở tầng bucket, nó sẽ được áp dụng cho tất cả các object nằm trong bucket.
<br>

Bạn có thể check các version của một object tại màn hình quản lý của chính nó:
![](https://images.viblo.asia/76242290-06fb-4609-9c4c-56430a12d29f.png)


-----

*Hết*
<br>
*Source: https://www.udemy.com/course/draft/2231112/learn/lecture/13742782#overview*