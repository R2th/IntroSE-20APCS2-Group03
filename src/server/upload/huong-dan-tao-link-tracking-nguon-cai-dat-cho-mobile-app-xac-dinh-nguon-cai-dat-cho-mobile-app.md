# Giới thiệu
Bạn đang chạy quá nhiều campaign cho ứng dụng mobile từ các mạng xã hội: facebook, twitter, ... các chiến dịch offline cũng như các chiến dịch online của bên thứ 3. Bạn không thể xác định được nguồn nào mang cho mình lượng install cao nhất. Vì nếu dùng shortlink thì chỉ đo được lượt click thui à. Hôm nay mình sẽ chỉ các bạn 1 công cụ hoàn toàn miễn phí và giúp bạn có thể làm việc này một cách rất đơn giản hén. 
Bài viết bên dưới cần ứng dụng mobile đã có tích hợp Firebase hoặc Google analaytic (gần như app nào hiện nay cũng đều có rùi nè). Mình sẽ bỏ qua phần hướng dẫn cài đặt firebase nha, bài viết này chủ yếu cách sử dụng thui nè
# Ưu, nhược điểm của cách này
## Ưu điểm 
+ Miễn phí hoàn toàn không giới hạn số lượng tracking
+ Không cần add thêm sdk phức tạp(nếu app đã có sẵn firebase)
## Nhược điểm
+ Report khá chậm phải mất 24h sau mới hiển thị
+ Khó test 
Để khắc phục tình trạng này bạn có thể dùng Appflyer nha. Phần tracking này Appflyer gần như trùm rùi á, nhưng phải mất phí nha
# Cách tạo link tracking nguồn cài đặt cho mobile app
## Android
Bước 1: Các bạn truy cập vào link này [click vào đây](https://developers.google.com/analytics/devguides/collection/android/v4/campaigns?hl=vi)

Bước 2: Kéo đến cuối trang giống cái hình này rùi điền thông tin vào nha
![](https://images.viblo.asia/d9660fd9-e03f-4add-aa8c-537e64bb9866.png)

Bước 3: Click vào nút Generate để tạo link nhé, copy link này lại 
Xong bước 3 là có thể dùng được rồi nhưng mình sẽ có thêm 1 thủ thuật nữa nên bạn cứ lưu link này lại tý mình dùng sau nha
## IOS 
Bước 1: Các bạn truy cập vào link này [click vào đây](https://developers.google.com/analytics/devguides/collection/ios/v3/campaigns)

Bước 2: Kéo đến cuối trang như hình nha

**Google Analytics Property ID**: Cái này khá khó lấy bạn truy cập vào firebase -> Dashboard -> view on GA -> tìm cái id
Sau đó nhớ đổi về dạng UA-XXXX-Y nhé

**Ad Network**: Chọn custom 

**Redirect URL**: Bạn vào firebase -> setting(cái hình bánh răng cưa) -> project ios sẽ thấy cái id app rồi điền theo dạng này nha https://itunes.apple.com/us/app/my-app/id[cái id mà bạn thấy]

**App ID**: Hay còn gọi là Bundle ID cũng nằm trong chổ setting ở bước trên nha

**Device ID Macro**: điền %{idfa}

**Campaign Source**:  Đây là cái tên mà sẽ hiển thị trong report tracking của chúng ta á.

Cuối cùng cũng điền xong rùi nè. 
Bước 3: Nhấn nút generate để lấy link thui nè. Đến đây mình có 2 link cho android và ios rùi hén. Giờ chúng ta đi làm đẹp nó xíu xíu nữa trước khi đưa link đó ra chạy nè
## Rút gọn link cho đẹp
### 1. Cách rút đẹp tối đa chỉ còn 1 link
Bạn có thể dùng trang này [branch.io](https://branch.io/) 

sau đó rút gọn lại nhé tại phần chuyển hướng bạn chọn chuyển hướng cho từng nên android và ios riêng (copy 2 link chúng ta mới có từ bước trên)
Sau khi rút gọn chỉ còn 1 link duy nhất nè. 

**Nhược điểm**: Trang này chỉ free 1k click nên cân nhắc xài nhé. Bạn có link nào rút gọn có chia nền tảng xin hãy chia sẽ với mình với nhé hihi 
### 2. Rút gọn thông thường thành 2 link
Bạn có thể dùng các trang như cutly, bitly để rút gọn nhé, 

Ưu điểm: Miễn phí hoàn toàn

Nhược điểm: Lúc hiển thị hay đưa link cho khách hàng phải có 2 dòng 1 android 1 cho ios hơi không đẹp 
### 3. URL TO URL 
Cái này rút thành 1 link duy nhất. 
Link tham khảo: [click here](https://viblo.asia/p/xay-dung-onelink-bang-google-sheets-sieu-don-gian-XL6lA6BN5ek)

Ưu điểm: Dùng chính google sheet của bạn để tạo link nên dễ quản lý

Nhược điểm: Có phí khoảng 5$/ 1 năm
# Cách xem thành quả 
Để xem các campaign của bạn có hiệu quả install thế nào bạn có thể truy cập vào
Firebase -> Conversions-> chọn event first open hay bất kỳ 1 event nào mà deverloper bên bạn có gửi tracking lên firebase

Bạn kéo xuống cái ảnh cuối cùng sẽ thấy nguồn tracking chính là cái name lúc nãy bạn điền từ 2 link trên á
(Do khúc này khó che số liệu nên mình hem thể chụp ảnh được mong bạn thông cảm nha)
Chúc bạn tận dụng công cụ này một cách hiệu quả nhất, Để report 1 cách chính xác và chạy campaign hiệu quả nhất hén <3

# Kết
Cảm ơn bạn đã đọc hết bài viết
Bạn muốn trao đổi nhiều hơn với mình về các công cụ hỗ trợ martketing mobile app có thể add skype: ruaconnb93 hoặc zalo 0833211026 nhé