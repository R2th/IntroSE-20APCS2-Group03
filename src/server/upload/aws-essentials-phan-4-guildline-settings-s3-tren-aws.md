Tiếp tục với chuỗi chủ đề Guildline Settings các module function cơ bản trên Amazon Web Service, mình xin được giới thiệu tiếp về Settings S3 (Simple Storage Service) trên AWS
Như thường lệ, đầu tin mình xin được điểm lại một số định nghĩa, khái niệm về S3
# 1. Tổng quan S3 (Simple Storage Service)
### 1.1 Định nghĩa S3
Tổng quan nhất, S3 là online storage service lưu trữ data khổng lồ, và user có thể thực hiện access data này từ gần như bất kì device nào
Định nghĩa phía AWS:
- Amazon S3 có giao diện web service tối giản, nơi mà người dùng có thể store và get bất kì data, với bất kì dung lượng nào bất kì lúc nào và bất kì đâu trên website. 

### 1.2 Các thành phần và cấu trúc của S3

![](https://images.viblo.asia/e6c90fff-b3e0-47f6-8061-32d1ea99df6f.png)


**S3 Basics:**
- S3 : Simple Storage Service
- Đây là primary storage service của AWS
- User có thể thực hiện store bất kì file type nào trên S3

**S3 Buckets: **
- "Folders" root level user tạo trong S3 được gọi là **buckets**
- Bất kì "subfolder" nào user tạo trong bucket sẽ được gọi là một **folder**

**S3 Objects:**
- Các file được store trong một bucket được gọi là các **objects**

**S3 Regions:**
- Khi tạo một bucket, chúng ta phải chọn một region cụ thể để dựng S3 trên region đó. Điều này có nghĩa là bất kì data chúng ta upload lên S3 bucket thì sẽ được store trên data center của region tương ứng chúng ta đã chọn.
- AWS recommend chúng ta chọn region có vị trí địa lý gần nhất, để giảm thiểu tối đa thời gian transfer dữ liệu 
- Nếu bạn đang cung cấp file cho **khách hàng** dựa trên một vùng nhất định trên thế giới, hãy setting **region gần nhất với khách hàng** 

### 1.3 Tổng quan Pricing/Cost 
Free Tier (Gói free) có áp dụng cho S3 
Cách Amazon charge phí sử dụng S3:
**1.3.1. Storage Cost:**
- Áp dụng cho data store trên S3
- Charge phí dựa theo mỗi GB sử dụng 
- Giá của mỗi GB có thể thay đổi dựa theo region và storage class khác nhau.

**1.3.2. Request Pricing - move data in/out vào S3:**
- PUT
- COPY
- POST
- LIST
- GET
- Lifecycle Transitions Request
- Data Retrieval
- Data Archival
- Data Restoreation

Link Pricing/Cost trên S3: https://aws.amazon.com/s3/pricing/

# 2. Buckets và Folders:
### 2.1 Khởi tạo một S3 Bucket:
**2.1.1. Chọn Bucket name:**
Bucket name phải **follow các rules sau đây**: 
- Bucket name phải unique trên **toàn bộ** hệ thống AWS
- Bucket name phải có độ dài 3~63 kí tự digit.
- Bucket name chỉ có thể bao gồm **kí tự viết thường, number, và các dấu gạch nối "-"**
- Bucket name không được có format như địa chỉ IP address (e.g., 192.168.5.4)

**2.1.2 Chọn Region:**
- AWS recommend chúng ta chọn region gần nhất so với đại đa số người dùng website, app
- Ở đây mình chọn Region Singapore là nơi gần nhất đặt máy chủ của AWS so với Việt Nam

![](https://images.viblo.asia/b5dd0b52-5696-4bc5-8d81-6974b5790595.png)

**2.1.3 Properties:**
- Versioning: Cho phép keep toàn bộ version của một object trong cùng một bucket
- Server access logging: Log toàn bộ request access tới bucket (Nên setting phần này để dễ thực hiện tracking log nếu phát sinh lỗi khi call API)
- Object-level logging: Đây là phần trả phí để sử dụng thêm các tính năng manage events, data events cũng như Cloudtrail Insights của AWS
- Default encryption: 

![](https://images.viblo.asia/48655800-b344-4a83-a9e6-4ba33dd00a94.png)

Tạm thời chúng ta sẽ set phần này ở default và sẽ đi sâu tìm hiểu những mục setting advance này sau và sẽ tiến hành thực hiện tạo 1 S3 Bucket 

Step config options:

![](https://images.viblo.asia/cf477379-130d-468d-abe4-5309c00b3934.png)

Step review:

![](https://images.viblo.asia/2df8ad44-2ba3-4649-b686-41acde0b67af.png)

Kết quả tạo bucket: 

![](https://images.viblo.asia/c8ab6d80-9c4a-4506-833b-0d03ca99d393.png)

**2.1.4 Upload Object (file) vào bucket**
**2.1.4.1 Tạo subfolder (AWS sẽ gọi các subfolder là folder)**

![](https://images.viblo.asia/9063e65b-e3f4-4c21-93d1-9a8e194f3102.png)


- Sau khi khởi tạo 1 S3 bucket thành công, chúng ta có thể tiến hành upload file bất kì lên folder S3 (text, video, image,...)

![](https://images.viblo.asia/471f1395-c78a-4757-a058-15ceca7261b3.png)

- Kết quả sau khi upload file vào subfolder:

![](https://images.viblo.asia/8851669f-9111-4dac-adaf-51f78a552372.png)


- Tiếp tục thực hiện upload file trên vào S3 Bucket thay vì subfolder:

![](https://images.viblo.asia/5816ded4-d7d6-43d6-aadf-3490ebe3307a.png)

- Lúc này chúng ta sẽ có Object được store trong cả subfolder và S3 Bucket. Chúng ta không nhất thiết phải tạo folder để upload file mà có thể upload trực tiếp vào S3 Bucket, nhưng như vậy sẽ khó quản lý hơn.
- Bởi vì chúng ta đã lựa chọn Region cho S3 bucket vậy nên khi Object được upload vào S3 Bucket thì dữ liệu sẽ được store trên data center của Region tương ứng.

**2.1.4.2 Set permission cho Objects**
- Chúng ta có thể tiến hành set quyền Read/Write cho từng account AWS khác. Setting này nhằm hạn chế quyền truy cập của các user tới resource lưu trữ trên S3

![](https://images.viblo.asia/3e57d8cd-ff24-4b02-85b6-21406d37e009.png)

**2.1.4.3 Set properties cho Objects**
- Settings này cho phép chúng ta giới hạn thời gian lưu trữ của file trên S3 Bucket (30 ngày, 90 ngày ,... ), dung lượng của file cũng như mã hóa bảo về data bằng việc sử dụng Amazone master-key

![](https://images.viblo.asia/635c8617-6a5a-4570-a61d-18150e1c4e18.png)

![](https://images.viblo.asia/50a149f9-1f50-435b-946e-a5c6e7254320.png)

- Sau khi tạo xong file, bằng cách click vào trực tiếp file, AWS cung cấp cho chúng ta một Object URL để có thể download được file này

![](https://images.viblo.asia/ddaec085-d1ed-43f5-a6b2-86adee4dbd30.png)

### 2.2 Bucket, Folder và Object Properties:
Bucket, Folder và Object Properties được chia thành các level khác nhau như sau:

![](https://images.viblo.asia/13218877-6863-44f0-b2cf-2aad4df912ef.png)

# 3. Storage Class
### 3.1 Định nghĩa Storage Class
Có một điều chúng ta cần chú ý đó là S3 pricing dựa trên **Storage Class**:

https://aws.amazon.com/s3/pricing/

**3.1.1 Mỗi storage class được coi là class phân loại được assign cho mỗi Object trên S3**
* Các storage class bao gồm:
* Standard
* Intelligent-Tiering
* Standard Infrequent Access
* One Zone-Infrequent Access  (One Zone-IA)
* Glacier
* Glacier Deep Archive
* Redduced Redundancy (not recommended)

**3.1.2 Mỗi Storage Class có nhiều thuộc tính để thực hiện command như:**
* Storage cost
* Object availability
* Object durability
* Frequency of access (tới object)

**3.1.3 Mỗi Object phải được assign một storage class (standard chính là default class)**
**3.1.4 Chúng ta có thể tiến hành thay đổi storage class của một object bất kì lúc nào đối với một số Storage Class nhất định như:**
* Standard
* Intelligent-Tiering
* Standard-Infrequent Access (S3 Standard-IA)
* One Zone-Infrequent Access (S3 One)

**3.1.5 Chi tiết, đặc trưng của từng Storage class**

![](https://images.viblo.asia/8708636a-19b6-496d-b95f-f7f11dd75fbd.png)

![](https://images.viblo.asia/e6d3aa91-9647-4df2-8c0e-a0ad08a0744c.png)

### 3.2 Setting/Changing Storage Class
**3.2.1 Default, thì toàn bộ object mới được upload lên S3 thì đều set là Standard Storage Class**

![](https://images.viblo.asia/5680da0e-ceb6-4d79-9440-c290c118bd0d.png)

Khi click vào text link Storage Class thì sẽ hiển thị popup setting 

![](https://images.viblo.asia/b24e625a-17cc-427e-8102-3d5599b09872.png)

Nếu bạn muốn setting new object với storage khác. chúng ta có thể thực hiện setting bằng 2 cách:
* Chọn object khác trong quá trình upload (set details)
* Sử dụng **object lifecycle policies** (sẽ đề cập ở phần sau)

Lưu ý:
Để có thể move object vào **Glacier** và **Glacier Deep Archive** storage class: thì cần thoả mãn điều kiện:
* Cần sử dụng object lifecycles.
* Việc change thành Glacier có thể mất từ 1 tới 2 ngày để apply.

# 4. Object Lifecycle
### 4.1 Object lifecycle là gì?
Một object lifecycle là một bộ các **rule tự động** migration object's storage class thành một storage class khác, hoặc có thể tự động xoá, dựa trên một khoảng thời gian nhất định 

Ví dụ:
1. Chúng ta có một file cần access hàng ngày trong vòng 30 ngày tới.
1. Sau 30 ngày, chúng ta chỉ cần access file này 1 lần/1 tuần trong vòng 60 ngày kế tiếp.
1. Sau tổng cộng  90 ngày, chúng ta sẽ không bao giờ cần access lại file này nữa, nhưng vẫn muốn giữ lại để đề phòng.


Solution của vấn đề này:
**Từ ngày 0-29:**
1. Usage need = very frequent
1. Storage class thích hợp nhất: Storage class = Standard
1. Cost = Cost tier cao nhất

**Ngày 30-89**
1. Usage need = Infrequent
1. Storage class thích hợp nhất: Storage class = Standard Infrequent Access
1. Cost = Cost tier middle

**Ngày 90+**
1. Usage need = Gần như không bao giờ
1. Storage class thích hợp nhất: Storage class = Glacier
1. Cost = Cost tier thấp nhất

### 4.2 Lifecycle Management
1. Chức năng Lifecycle được đặt trong bucket level
1. Tuy nhiên, một lifecycle policy có thể apply cho:
- Toàn bộ bucket (Apply cho toàn bộ object trong bucket)
- Một folder nhất định trong bucket (Appli cho toàn bộ object trong folder)
- Một Object nhất định trong bucket.
3. Chúng ta có thể xoá một lifecycle bất kì lúc nào hoặc sửa storage class back về setting nào mong muốn

### 4.3 Tiến hành setting Lifecycle
- Trong bucket tiến hành chọn Tab Managemen và chọn Add lifecycle rule

![](https://images.viblo.asia/b24e625a-17cc-427e-8102-3d5599b09872.png)

![](https://images.viblo.asia/b340876c-03fd-40e0-8767-7a6c7f8165e8.png)

- Ở tab Transition chúng ta sẽ tiến hành setting theo như Solution nói trên:
Lưu ý: Việc transition object nhỏ sang Storage class Glacier sẽ phát sinh chi phí

![](https://images.viblo.asia/b20e8669-abe5-4e3f-be3a-0d654349aa04.png)

- Setting expired object/incomplete multiple part upload

![](https://images.viblo.asia/dcaadfe8-fc51-46a7-a49d-cf0de1038f09.png)

- Step review:

![](https://images.viblo.asia/cc9f3aab-0031-4adc-8624-373438125c3a.png)

- Kết quả:

![](https://images.viblo.asia/388bcde6-7703-4793-8d3c-2c5f211ddc26.png)

# 5. S3 Permission
### 5.1 S3 Permission là gì?
S3 permission cho phép chúng ta setting ai có thể view, access, và sử dụng bucket hay object.

Trong bucket level chúng ta có thể thực hiện control (cho mỗi bucket riêng biệt)
* List: Ai có thể xem bucket name
* Upload/Delete
* Permission: Add/Edit/Delete/View permisions

Trong Object level, chúng ta có thể control (cho mỗi object riêng biệt)
* Open/Download
* View Permission
* Edit Permission

# 6. S3 Versioning
### S3 Versioning là gì?
S3 Versioning là feature traking và store toàn bộ version của một object để chúng ta có thể access và sử dụng old version nếu muốn.

1. Versioning có thể là ON hoặc OFF
1. Một khi đã bật ON, chúng ta chỉ có thể tạm suspend versioning chứ không thể hoàn toàn turn OFF.
1. Suspending versioning chỉ để tránh việc versioning tiếp tục tăng, Toàn bộ object version cũ sẽ vẫn được lưu lại trong Storage
1. Versioning chỉ có thể được set trong bucket level, và appl cho toàn bộ object trong bucket

Mình xin kết thúc bài viết Guildline hướng dẫn setting cho S3 ở đây, hẹn mọi người tiếp tục ở phần tiếp theo về RDS