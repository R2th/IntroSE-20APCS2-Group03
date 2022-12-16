Hiện tại, mình là Developer, đang công tác tại Trung tâm công nghệ thông tin của một cơ quan ngang bộ tại Việt Nam. Đơn vị mình thường xuyên thao tác với Map và API Maps của Google để phát triển các project nội bộ. Do lưu lượng request không lớn nên việc sử dụng API Maps do Google cung cấp là hoàn toàn miễn phí.

Tuy nhiên thời gian gần đây, API Maps miễn phí này bị chập chờn và tài khoản Google maps của mình bị hết quota liên tục khiến cho việc sử dụng bị gián đoạn. Vậy là, mình bắt đầu tìm cách giải quyết vấn đề này. Đầu tiên mình thử mượn thẻ credit tại Mỹ hoặc thẻ ở nước ngoài Việt Nam. Việc mượn thẻ credit là vấn đề nhạy cảm nên khá khó vì chưa biết số tiền chi tiêu hằng tháng là bao nhiêu. Chưa kể, nhỡ có vấn đề phát sinh mất tiền triệu thì ai chịu! Rồi sau đó, mình chuyển sang tìm các đơn vị cung cấp APIs Map khác như: Here map, OSM, Goong map .v.v

# Gặp gỡ Goong.io 
Mình thử thằng Goong Maps trước vì đọc thấy APIs giống param của Google maps, chỉ cần thay Key và địa chỉ server, đỡ phải code lại. Và hiện mình vẫn đang dùng luôn vì đáp ứng tốt các nhu cầu mà project đơn vị mình đặt ra.

Tìm hiểu thêm thì thấy một số thông tin về Goong Maps:
* Có khả năng hiển thị map và data của bên thứ 3, Mapview với khoảng 100 javascript front end 
* Cung cấp SDK cho Mobile
* Có Rest APIs (gồm: Geocode, Direction, Distance matrix, Search, Autocomplete)

Còn về phía đơn vị cung cấp dịch vụ này: 
* Đang phát triển app dẫn đường và cảnh báo tình trạng giao thông đã có mặt trên Google Play và Apple store.
* Là đối tác cung cấp Goong Maps được một số công ty công nghệ áp dụng vào khâu vận chuyển, giao hàng, định vị như: FPT, Viettel, Sendo, Ahamove, iCheck, Zalo…...

Lên Google search tiếp thì mình thấy, Goong Maps thuộc một công ty cung cấp dịch vụ bản đồ của Việt Nam, cung cấp dữ liệu bao phủ toàn quốc. Ok, một like :+1: cho hàng phát triển nội địa!

![](https://images.viblo.asia/1c2c86ad-cbb3-48aa-8c8e-3bf78858a3e7.png)
![](https://images.viblo.asia/64ca55f0-7598-429a-a930-d917467fb69e.png)
![](https://images.viblo.asia/b27553e7-9749-4712-ad03-755819f0ad98.png)



# Một số thông tin về Goong Maps API 
Cho bạn nào chưa biết thì API nói cho nôm na dễ hiểu chính là công cụ giúp ứng dụng của bạn tương tác với ứng dụng của người khác xây dựng. Điều quan trọng nhất đó là hai ứng dụng này có thể cùng hoặc khác nhau hoàn toàn về nền tảng. (Ví dụ: một ứng dụng Windows viết bằng C++ có thể kết nối với cơ sở dữ liệu của Oracle chẳng hạn.)

Như vậy, Goong Maps API có thể được hiểu là sử dụng một công cụ giúp bạn có thể nhúng Maps vào sản phẩm của mình kèm theo các chức năng như: di chuột, room, khoanh vùng, đánh dấu trên bản đồ,... bằng cách trao đổi với cơ sở dữ liệu của Goong Maps

Theo như thông tin mà Goong cung cấp thì Goong Maps API đã được nâng cấp lên phiên bản v1 không chỉ hỗ trợ cho laptop, máy tính để bàn truyền thống mà còn có thể hoạt động tốt trên các thiết bị di động, tablet, các thiết bị thông minh khác với tốc độ nhanh hơn và độ ổn định cao hơn. 

# Chi phí khi sử dụng Goong Maps API 
Trước những thông tin khá tích cực tìm kiếm được thì vấn đề tiếp theo mình quan tâm đến là chi phí sử dụng dịch vụ. Bắt đầu với việc đăng ký một tài khoản, mình nhận thấy dịch vụ của Goong Maps API sẽ hoàn toàn miễn phí với việc xây dựng một ứng dụng nhỏ (phù hợp với project ở đơn vị mình). Và sau một thời gian sử dụng thì mình còn phát hiện ra là Goong Maps sẽ tặng 100 USD mỗi tháng vào tài khoản trên Goong.io. 

Ngoài ra, mình cũng quan tâm thêm một chút về chi phí khi mở rộng, phòng trường hợp trong tương lai project của đơn vị mình đưa ra public sử dụng với một lượng requests lớn thì mình nhận thấy chi phí cần trả cho các gói cung cấp quota lớn phù hợp về mặt kinh tế. Khi thử đem so sánh với chi phí của Google Maps thì mình nhận thấy có thể **tiết kiệm được đến 70%** mỗi tháng!
![](https://images.viblo.asia/23ed482e-cb9d-4570-83d4-5266bb8a85ef.png)

# Đánh giá chất lượng API
Sau một quá trình sử dụng Maps tương đối dài, mình xin phép được đưa ra một số đánh giá về Goong Maps API cho các bạn tham khảo

## Hiển thị bản đồ:
![](https://images.viblo.asia/3e457bcd-6731-4ed1-ab09-c9906d6a2b97.png)

* **Tính thẩm mỹ:** mình không đánh giá độ đẹp hay xấu vì nó mang quan điểm cá nhân. Nhìn chung, nó cũng giống các bản đồ khác nhưng ưu điểm là sử dụng định dạng vector nên không bị vỡ hình như một số Map khác.
* **Tốc độ:** Khá nhanh - tương đương Google maps. Có sosmap.net và Zalo connect đang sử dụng - mình sẽ viết cụ thể về 2 use case và cách sử dụng Goong Maps ở các bài tới.

## APIs

* **Geocode:** Mình đánh giá tính năng này hoạt động tốt và nhanh, có khi tốt hơn Google, bắt đúng vị trí số nhà của mình khi test, Trong khi Google thì không cho kết quả chính xác đến vậy.
* **Search, Autocomplete:** cái này khá khó đánh giá vì tìm kiếm sẽ theo các tiêu chí như vị trí kết quả tìm kiếm, sai chính tả, viết tắt, tên tiếng anh, tiếng việt. Mình viết một tool để thử khoảng 1000 case so sánh giữa Goong Maps và Google Maps và chọn một số test-case tiêu biểu như sau:


| Input                                          | Goong - 3 kết quả đầu                                         | Google - 3 kết quả đầu                               |
|------------------------------------------------|---------------------------------------------------------------|------------------------------------------------------|
| **điện máy hc can phúc**                           | Siêu thị Điện máy HC, 102 Thái Thịnh                          | Siêu thị điện máy HC, Vạn Phúc                       |
|                                                | Siêu thị Điện máy HC, 63 Vạn Phúc, Vạn Phúc                   |                                                      |
|                                                | Siêu thị Điện máy HC, 411 Tam Trinh                           |                                                      |
| **s2 vinhomes smart city**                         | Phân khu Sapphire 4 - Vinhomes Smart City                     | Không có kết quả                                     |
|                                                | Phân khu Sapphire 3 - Vinhomes Smart City                     |                                                      |
|                                                | Phân khu Sapphire 2 - Vinhomes Smart City                     |                                                      |
| **bx my dinh**                                     | Mỹ Đình                                                       | Bến Xe Mỹ Đình                                       |
|                                                | My Dinh Pearl                                                 | Bến Xe Mỹ Đình                                       |
|                                                | Bến xe Mỹ Đình                                                | Bến Xe Mỹ Đình                                       |
| **viện y hoc co truyen bo cong an luong the vinh** | Bệnh viện Y học Cổ truyền Lương Thế Vinh - 278 Lương Thế Vinh | Bệnh viện Y học cổ truyền Bộ Công An, Lương Thế Vinh |
|                                                | Bệnh viện Y học Cổ truyền Hưng Yên                            |                                                      |
|                                                | Bệnh viện Y học Cổ truyền Yên Bái                             |                                                      |
| **g1 vin**                                         | Tòa G1 - Vinhomes Green Bay                                   | Saint Vincent Street, Glasgow G2 5RZ, Vương Quốc Anh |
|                                                | Nhà G1 Khu tập thể 7.2 ha Vĩnh Phúc                           |                                                      |
|                                                | 104G1 7.2 ha Vĩnh Phúc - Phường Vĩnh Phúc, Quận Ba Đình       |                                                      |



Nhìn chung, Goong Maps cho kết quả khá ổn. Với các test-case bằng tiếng Việt, có độ khó tương đối thì Goong Maps còn cho chất lượng tốt hơn cả Google Maps. Còn với test-case bằng tiếng Anh, thì có vẻ Goong Maps vẫn kém hơn ở một số trường hợp.

* **Direction:** Mình test 10 trường hợp, và kiểm tra bằng mắt thường thấy khá hợp lý

# Ưu - nhược điểm của Goong Maps
## Ưu điểm
* Dữ liệu khá đầy đủ, chính xác, gồm dữ liệu POIs của nhiều danh mục khác nhau .
* Tốc độ cao: ở chế độ miễn phí, Goong hỗ trợ 600 requests/phút. Các khách hàng trả tiền được hỗ trợ từ 1200 - 30,000+ request/phút.
* Tiết kiệm đến 70% chi phí so với việc sử dụng Google Maps API, mình đoán ký hợp đồng còn rẻ nữa. :grinning:
* Dễ dàng nhúng và tùy chỉnh khi phát triển các tính năng cho sản phẩm đối với developer. Cùng với tài liệu hướng dẫn sử dụng chi tiết.
## Nhược điểm
* Goong Maps API chỉ phát triển và thu thập dữ liệu trên lãnh thổ Việt Nam.
* Các thông tin địa điểm trả về chưa nhiều như Google map như ảnh, giờ đóng mở cửa, thông tin tắc đường.

Trên đây là những thông tin mà mình có được, kèm theo đó là đánh giá cá nhân sau một thời gian dài trải nghiệm Goong Maps sau cuộc gặp “may mắn”. Hy vọng những chia sẻ của mình trong quá trình tìm giải pháp khắc phục khó khăn sẽ giúp đỡ phần nào cho những bạn gặp tình cảnh tương tự như mình.