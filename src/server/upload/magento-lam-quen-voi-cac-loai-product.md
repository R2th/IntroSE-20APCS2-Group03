Chào mọi người :D, hôm vừa rồi ngồi nghịch quyển sổ cũ, nhớ lại hồi tìm hiểu Magento, nên lần này mình chợt muốn đổi gió tí, viết về Magento cho các bạn muốn tìm hiểu, vì tài liệu Magento tiếng việt cũng hạn chế nên hi vọng là sẽ giúp được ai đó :D

Bài viết của mình dùng nhiều từ tiếng anh để nguyên xen lẫn tiếng Việt bởi vì mình cảm thấy dịch ra nó không mang được ý nghĩa đúng và đủ, mà cũng để các bạn làm quen với các từ tiếng anh (vì khi setting cho Magento toàn các trường tiếng anh mà :D) nên các bạn nếu có khó chịu cũng thông cảm nhé :)
# Giới thiệu Magento
Vì mình lười nghĩ câu cú, mà lại mắc bệnh giải thích dài dòng nên để đỡ phải viết thì các bạn có thể tham khảo link [này](https://viblo.asia/p/top-10-nen-tang-phat-trien-thuong-mai-dien-tu-2018-phan-1-6J3ZgOqBZmB#_1-magento-1) để biết cơ bản Magento là gì nhé :D.

Tóm tắt thì Magento là 1 CMS (Content management system) rất nổi tiếng và thông dụng trong Thương mại điện tử trên Thế giới. Và 1 lưu ý là CMS khác với Framework nhé, đừng bạn nào như mình lúc đầu lơ nga lơ ngơ đi so sánh nó với Framework Laravel xem cái nào tốt hơn, 2 cái là 2 phạm trù khác nhau như so sánh trà sữa với bánh kem cái nào uống ngon hơn ấy (bánh có uống đc đâu mà :v)
# Các loại sản phẩm trong Magento
Magento đã phát triển sẵn cho chúng ta 7 loại sản phẩm khác nhau, cực kỳ tiện ích và dễ sử dụng:
1. [Simple product - Sản phẩm thường](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_1-simple-product---san-pham-thuong-1)
2. [Grouped product - Sản phẩm theo nhóm](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_2-grouped-product---san-pham-nhom-2)
3. [Configurable product - Sản phẩm tùy biến](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_3-configurable-product---san-pham-tuy-bien-4)
4. [Virtual product - Sản phẩm ảo](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_4-virtual-product---san-pham-ao-5)
5. [Bundle product - Set sản phẩm tùy chọn](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_5-bundle-product---set-san-pham-tuy-chon-6)
6. [Downloadable product - Sản phẩm tải xuống được](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_6-downloadable-product---san-pham-tai-xuong-duoc-7)

## 1. Simple product - Sản phẩm thường
Đây là loại sản phẩm đơn giản nhất, dễ tạo, và đỡ tốn hiệu năng nhất (bởi vì nó chả có quan hệ hay liên kết gì nhiều cả :v). Lời khuyên là nếu có thể hãy tận dụng nó nhé. Simple product là nền tảng, cơ bản nhất cho cả các loại sản phẩm khác. 
![](https://images.viblo.asia/2b6d0d90-9e4e-4f62-9dcb-935434383c0e.PNG)

**Note:**

* 1 sản phẩm thường - sản phẩm đơn giản có thể có tùy chọn riêng với nhiều giá trị đầu vào, nhờ vậy mà có thể bán được nhiều biến thể sản phẩm chỉ với 1 SKU.
* Tùy chọn riêng thì không thể quản lý được như những sản phẩm riêng biệt trong kho hàng.
* Simple product chứa trong sản phẩm tùy biến, hay combo sản phẩm thì không thể có tùy chọn riêng được
## 2. Grouped product - Sản phẩm nhóm
Loại này có nghĩa là bạn sẽ gom 1 vài sản phẩm thường ([simple product](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_1-simple-product---san-pham-thuong-1)) thành 1 tập các sản phẩm. Ví dụ như là gom các sản phẩm theo mùa chẳng hạn, hoặc xếp riêng các sản phẩm là phụ kiện cho điện thoại thành 1 nhóm. Nhờ vậy mà khách hàng sẽ dễ mua nhiều đồ 1 lúc hơn, vì nó có thể hiển thị trên cùng 1 trang (như kiểu Category ấy nhỉ?). Chẳng hạn bạn gom Điện thoại Samsung J7 vào cùng ốp lưng J7, dán cường lực J7, sạc dự phòng Samsung 10000 mAh vào thành 1 nhóm, thì khi khách hàng bấm vào J7 để xem, nhân tiện họ cũng sẽ thấy được các sản phẩm đi kèm liên quan, và cho vào giỏ hàng nếu muốn tiện mua luôn cho đỡ mất công đi tìm :D, và mình cũng bán được thêm sản phẩm (hờ hờ).
<br/><br/>
Mặc dù là những sản phẩm trên được hiển thị thành nhóm, nhưng khi thanh toán hoặc thao tác thì sẽ được coi như các sản phẩm độc lập, tính riêng rẽ với nhau nhé. Mình nói trước vậy bởi vì sau khi các bạn đọc thêm những loại sản phẩm phía sau, có thể bạn sẽ hơi bối rối vì thấy có nhiều cái ná ná nhau đấy (như [configurable product](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_3-configurable-product---san-pham-tuy-bien-4) và [bundle product](https://viblo.asia/p/magento-lam-quen-voi-cac-loai-product-YWOZrp2r5Q0#_5-bundle-product---set-san-pham-tuy-chon-6) dễ nhầm với grouped product này này :D)

Các bạn có thể xem hình ảnh mình ghi chú các điểm dưới đây nhé, phần ghi chú màu tím là phần khiến grouped product khác với configurable product nhé:
![](https://images.viblo.asia/6aa4557f-4fd2-4490-93b0-8d8902d41cae.PNG)
**Ghi nhớ:**
* Grouped product chỉ là 1 nhóm các sản phẩm thường được liên kết với nhau.
* Sản phẩm thường và sản phẩm ảo nếu liên kết tới Sản phẩm nhóm thì sẽ không thể tùy chọn cài đặt được (xem thêm).
* Mỗi sản phẩm được xử lý độc lập trong giỏ hàng, dù rằng nó là 1 phần của nhóm
* Ảnh hiển thị trong giỏ hàng (thumbnail image) có thể được đặt để hiển thị trong bản ghi sản phẩm, hoặc lấy từ các sản phẩm có liên kết

## 3. Configurable product - Sản phẩm tùy biến
Configurable product, đúng như tên gọi, sản phẩm này có thể tùy chỉnh được các giá trị của nó. Nhìn qua thì bạn sẽ thấy khá giống như sản phẩm thông thường với những danh sách 'dropdown' các giá trị cho bạn tùy chỉnh. Mỗi giá trị đó sẽ tương ứng với 1 SKU riêng không trùng lặp. Chúng ta có thể nhận được kết quả tương tự với 1 Simple product đi kèm các tùy biến, nhưng như vậy sẽ khó để theo dõi số lượng còn lại trong kho tương ứng với mỗi loại giá trị.

Mặc dù là như mình nói, Configurable product sử dụng nhiều SKU cùng lúc, và có thể là cũng mất thời gian hơn để cài đặt, nhưng mà nó sẽ cực kỳ hữu ích nếu bạn có ý định mở rộng việc kinh doanh sản phẩm nếu 1 sản phẩm có nhiều tùy chọn :D
![](https://images.viblo.asia/07ef4c31-861f-4c81-a646-29d048c11969.PNG)

**Chú ý nhớ này:**

* Sản phẩm tùy biến cho phép người mua có thể chọn lựa thông tin qua 1 select-option - danh sách chọn. Và mỗi phần tử trong danh sách chọn là 1 sản phẩm độc lập, riêng biệt với nhau.
* 	Các lựa chọn trong danh sách chọn sẽ dựa trên các giá trị đã cài đặt trước với các trường bắt buộc. Tất cả các danh sách lựa chọn (attributes Scope) phải được đặt "Global", và "Use to Create Configurable Product" - Phải được đặt giá trị "true" cho việc sử dụng tạo sản phẩm tùy biến. Danh sách lựa chọn phải được đưa vào danh sách giá trị, để có thể sử dụng làm mẫu cho Sản phẩm tùy biến
* 	Sản phẩm thường liên kết với sản phẩm tùy biến (sản phẩm con) ko được bao gồm các giá trị lựa chọn đặc biệt/riêng biệt, và phải dựa trên các nhóm giá trị đã sử dụng khi tạo sản phẩm tùy biến. Các sản phẩm liên kết có thể được sinh ra tự động cùng với sản phẩm tùy biến
* 	Ảnh trong giỏ hàng có thể được đặt bằng ảnh trong khi cài đặt sản phẩm tùy biến, hoặc lấy ra từ sản phẩm được liên kết trong nó.
## 4. Virtual product - Sản phẩm ảo
Although virtual products are not physical in nature, they do represent something that can be sold, such as a membership, service, warranty, or subscription. Virtual products can be sold individually, or included as part of the following product types:
Mặc dù như cái tên, sản phẩm ảo ko thể hiện hữu thực, nhưng nó vẫn là 1 thứ có thể đem bán - trao đổi được, như kiểu là hạng thành viên (như kiểu mua upgrade lên VIP tài khoản xem phim chất lượng cao ấy), dịch vụ, hoặc là gói bảo hành,... Và tất nhiên là sản phẩm này thì không có lựa chọn phương thức vận chuyển bởi vì nó méo có gì để chuyển cả :v. 

Nó có thể được bán riêng lẻ, hoặc cũng có thể trở thành - liên kết tới:
* Grouped product
* Bundle product

Việc tạo Sản phẩm ảo thì cũng khá đơn giản, gần giống với Sản phẩm thường, tuy nhiên là vì nó ko được vận chuyển, nên bạn sẽ ko thể điền Cân nặng (weight) hay có tùy chọn đính kèm thiệp được.
![](https://images.viblo.asia/fa9239f8-ffaf-47b2-9d35-d224f084e2aa.PNG)
**Cần nhớ:**
* Sản phẩm ảo có thể đại diện - sử dụng cho bất kỳ cái gì ko hiện hữu dưới dạng tự nhiên, ví dụ như gói dịch vụ, hay gói bảo hành.
* Sản phẩm ảo không khác gì sản phẩm thông thường, chỉ là không có mục '*Cân nặng*' và '*Cho phép đính kèm thiệp lời nhắn*' thôi
* Tùy chọn giao hàng sẽ chỉ xuất hiện nếu có sản phẩm vậy lý nào đó trong giỏ hàng thôi nhá
## 5. Bundle product - set sản phẩm tùy chọn
Bundle product - Set sản phẩm tùy chọn giống như là 1 combo sản phẩm vậy. Bunlde product chỉ là 1 cái vỏ - tên của combo, còn lại những sản phẩm bên trong sẽ được chọn từ các sản phẩm:
* Simple product
* Virtual product

Tuy nhiên thì chúng ta có thể cho phép người dùng tự chọn các thành phần bên trong combo, như là bạn đặt 1 giỏ quà tết, trong giỏ quà sẽ gồm: 1 rượu, 1 bánh quy, 1 trà, 1 thiệp. Và bạn sẽ tự chọn xem lấy rượu vodka hay nếp cái hoa vàng, bánh quy Danisa hay Blue ribbon, chọn trà Cosy hay trà Phúc Long, và chọn mẫu thiệp hoặc bỏ qua mẫu thiệp. Với từng thành phần của giỏ quà mà bạn chọn sẽ có mức giá khác nhau, và giá trị của giỏ quà sẽ là tổng giá của các thành phần mà bạn lựa chọn. Vì vậy, có thể nói là Bundle product là sản phẩm bạn tự điều chỉnh cũng không sai :D

Vì mỗi phần của set sản phẩm có thể khác nhau về địa điểm kho, nên mục giao hàng sẽ có thể độc lập với từng sản phẩm. Sản phẩm con mà bạn chọn trong set cũng có thể khác nhau về cân nặng nữa, nên túm lại thì khoản giao hàng cho các set thành phần khác nhau có thể sẽ khác nhau nhé.

Do đặc thù là giá bundle product có thể thay đổi tùy theo những sản phẩm con mà bạn chọn, nên là giá của bundle product sẽ không cố định, mà là 1 khoảng giá, nên bạn có thể chọn hiển thị giá Bundle product là "*Khoảng giá từ ... đến ...*" hoặc chọn hiển thị giá thấp nhất "*Từ ...*"
![](https://images.viblo.asia/f7b52bba-c6f4-4de3-8184-8e372e705c2c.PNG)
Lại chú ý:
* Bundle product là sản phẩm do bạn-tự-tạo.
* Bundle product có thể là sản phẩm thường hoặc sản phẩm ảo mà không cài đặt tùy chỉnh riêng.
* Giá của Bundle product có thể được cài đặt hiển thị thành khoảng giá hoặc hiển thị mức giá thấp nhất "*Chỉ từ ...*"
* SKU và cân nặng có thể đặt là "Linh động" hoặc "Cố định"
* Số lượng của từng sản phẩm trong set có thể được gán cố định trước hoặc cho phép người dùng thay đổi số lượng
* Sản phẩm có thể được vận chuyển cùng nhau hoặc độc lập.
## 6. Downloadable product - Sản phẩm tải xuống được
Downloadable product là loại sản phẩm bất kỳ mà bạn có thể chuyển giao dưới dạng file - tệp như là eBook, bản nhạc, video, phần mềm, ...

Do Downloadable product là có đặc thù là không thể hiện ra cho đến khi giao dịch mua bán hoàn tất, vậy nên bạn có thể đính kèm bản thử, bản trailer ví dụ như tóm tắt nội dung sách hay 1 video ngắn để người dùng có thể xem thử trước khi chọn mua.

Downloadable product có thể sẽ yêu cầu người dùng phải login trước khi mua hàng để có thể nhận được link hay nhận qua email (Trên Magento cho phép bạn mua hàng ngay cả khi không đăng nhập). Trạng thái của đơn hàng trước khi bản tải về trở thành sẵn sàng - giá trị mặc định của nó và các sản phẩm giao hàng khác có thể tùy chỉnh lại trong cài đặt.

Tệp tải về của Downloadable product có thể được up lên server web của bạn, hoặc cũng có thể được link tới server khác.
![](https://images.viblo.asia/1a04d715-f21b-4dd5-947b-4d8f5197521c.PNG)

**Lại đến phần cần nhớ:**

* Downloadable products có thể được tải luôn lên server, hoặc được link tới server khác trên mạng
* Bạn có thể giới hạn được số lần khách hàng có thể tải sản phẩm về
* Khách hàng mua Downloadable products có thể được yêu cầu phải đăng nhập trước khi thanh toán
* Việc vận chuyển Downloadable products vẫn có thể được thực hiện nếu trong hóa đơn đang trong trạng thái: "Đang chờ" hoặc "Đã tạo hóa đơn".

# Kết
Lâu lâu đổi gió tí cho đỡ chán. Hồi tìm hiểu về Magento mình cũng loạn hết lên vì hay lẫn mấy loại product này với nhau, mà tài liệu tiếng Việt rất ít và ko đầy đủ, toàn phải đọc tiếng Anh. Nên là hy vọng bài viết cố gắng cụ thể và dễ hiểu của mình tổng hợp từ [Magento doc](https://magento.com/technical-resources) này giúp được ai đó trong quá trình học Magento :D. Magento cực kỳ phổ biến trong thương mại điện tử ở nước ngoài, nhưng nước mình thì lại còn biết khá ít, nhân lực thiếu nên nếu học tốt được thì bạn sẽ dễ kiếm việc lắm đấy :) Bài có gì chưa ổn thì góp ý mình "hot fix" nhá :3