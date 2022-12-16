## 1. Đôi nét

UUID (Viết tắt của Universally Unique Identifier), còn được gọi là GUID (Globally Unique Identifier) là một giá trị duy nhất dài 128 bit. Một chuỗi UUID chuẩn sử dụng chữ số hex (octet):
> 0710a5ca-f57e-11e9-802a-5aa538984bd8

![](https://images.viblo.asia/74fbd277-6c7e-4d1f-9687-a52d21497c94.png)
Mục đích của UUID sinh ra là bởi vì:
* Dữ liệu lớn, kiểu khóa chính auto imcrement cần nhiều byte để lưu hơn. Và khóa chính kiểu này không phù hợp khi mà hệ thống có nhiều server, nhiều client cùng lúc truy cập trên toàn thế giới.
* Nếu dùng khóa chính kiểu auto imcrement, có thể dễ dàng truy ra được trong database có bao nhiêu record. Thường thấy ở đường dẫn kiểu "domain.com/user/12345".

Bởi vậy UUID ra đời nhằm khắc phục những yếu điểm trên. Vậy nếu bạn đủ sức xây dựng một hệ thống với nhiều server, phục vụ hàng tỉ tỉ user hoặc chỉ đơn giản là không muốn để lộ id ra ngoài, hãy nghĩ tới UUID.

Trong bài này, chúng ta sẽ cùng tìm hiểu về UUID trong Java, thông qua class UUID.

## 2. Cấu trúc chuỗi UUID

Chúng ta cùng xem ví dụ về chuỗi UUID:
```
123e4567-e89b-42d3-a456-556642440000
xxxxxxxx-xxxx-Bxxx-Axxx-xxxxxxxxxxxx
```
A đại diện cho biến thể (variant) xác định bố cục (layout) của UUID. Tất cả các bit khác trong UUID phụ thuộc vào setting của các bit trong trường biến thể (variant field). Biến thể được xác định bởi 3 bit quan trọng nhất của A:
```
MSB1    MSB2    MSB3
 0       X       X     reserved (0)
 1       0       X     current variant (2)
 1       1       0     reserved for Microsoft (6)
 1       1       1     reserved for future (7)
```
Giá trị của A trong UUID là 'a '. Tương đương nhị phân của 'a' (=10xx) hiển thị biến thể là 2.
B đại diện cho phiên bản (version). Phiên bản trong UUID (giá trị của B) là 4.

Java cung cấp các phương thức để lấy ra variant (biến thể) và version (phiên bản) của UUID như sau:
```
UUID uuid = UUID.randomUUID();
int variant = uuid.variant();
int version = uuid.version();
```
Đây là 5 phiên bản khác nhau cho UUID biến thể 2: Time Based (UUIDv1), DCE Security (UUIDv2), Name Based (UUIDv3 và UUIDv5), Random (UUIDv4).

Java có cung cấp một implementation cho v3 và v4, nhưng cũng cung cấp một constructor để giúp người dùng tạo bất kỳ loại UUID nào:
```
UUID uuid = new UUID(long mostSigBits, long leastSigBits);
```
### Version 3 & 5
Các UUID được tạo bằng cách sử dụng hàm băm của namespace và name. Các định danh namespace là các UUID giống như Domain Name System (DNS), Object Identifiers (OIDs), URLs,...
```
UUID = hash(NAMESPACE_IDENTIFIER + NAME)
```
Sự khác biệt duy nhất giữa UUIDv3 và UUIDv5 là Thuật toán băm (Hashing Algorithm) - v3 sử dụng MD5 (128 bit) trong khi v5 sử dụng SHA-1 (160 bit).
Nói một cách đơn giản, chúng ta cắt bớt kết quả băm thành 128 bit và sau đó thay thế 4 bit cho version (phiên bản) và 2 bit cho variant (biến thể).

Và đây là cách tạo UUID loại 3 trong java:
```
String source = namespace + name;
byte[] bytes = source.getBytes("UTF-8");
UUID uuid = UUID.nameUUIDFromBytes(bytes);
```
Java không cung cấp implementation cho UUID loại 5.
### Version 4
Implementation của UUID v4 trong Java sử dụng các số ngẫu nhiên. Class được java implement là SecureRandom. Nó sử dụng một giá trị không thể đoán trước để tạo ra các số ngẫu nhiên nhằm giảm tỷ lệ trùng.
Để sinh chuỗi UUID v4, bạn sử dụng:
```
UUID uuid = UUID.randomUUID();
```
Bạn có thể sinh unique key sử dụng ‘SHA-256' và UUID như sau:
```
MessageDigest salt = MessageDigest.getInstance("SHA-256");
salt.update(UUID.randomUUID().toString().getBytes("UTF-8"));
String digest = bytesToHex(salt.digest());
```
## 3. Kết luận
Cả UUIDv3 và UUIDv5 đều có những điểm tốt mà các hệ thống khác nhau có thể tạo ra cùng một UUID bằng cách sử dụng cùng một namespace và name. Chúng cơ bản được sử dụng để tạo UUID phân cấp.

Vì cả hai hàm băm MD5 và SHA1 đều bị hỏng, nên tốt nhất khuyện bạn sử dụng v5. Nếu bạn chỉ cần tạo UUID đơn giản, loại 4 có thể đáp ứng tốt cho ứng dụng của bạn.