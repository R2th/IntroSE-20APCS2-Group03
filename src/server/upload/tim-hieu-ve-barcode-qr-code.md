# Giới thiệu
Chúng ta thường đến mua đồ ở **Vinmart** hay **BigC** và đến khi tính tiền, nhân vân bán hàng chỉ cần dùng 1 thiết bị quét để rà mã code trên các sản phẩm, "**beep**"- mã sản phẩm đã được nhận ra và ghi nhận vào list sản phẩm chúng ta đã mua. Những đường thằng đen trắng song song đó chính là mã **BarCode**. Nhưng thực sự **BarCode** là cái gì và nó khác biệt như thế nào với **QRCode**, hãy cùng phân tích nhé.


-----



# BarCode và QRCode
## 1. BarCode
Ai đã mua đồ ở các cửa hàng tiện lợi thì đều đã nhìn thấy barcode, tuy nhiên không biết họ có nhận ra là các mã barcode đó đều hoàn toàn khác nhau. 1 barcode là 1 tấm ảnh hiển thị thông tin mà máy quét có thể đọc được về thông tin của sản phẩm được ghi vào nó, là 1 tập hợp các đường thẳng đen song song với chiều rộng (width) khác nhau, hình thành 1 hình chữ nhật nhỏ, đính lên 1 góc của sản phẩm.

Mã barcode trên sản phẩm chứa thông tin về nhà sản xuất, loại sản phẩm, giá, .. những thông tin mà có thể đọc được bằng những máy đọc chuyên dụng. Bởi vì nó chứa thông tin chỉ theo 1 chiều ngang (horizontal direction), nên nó được gọi là chứa thông tin 1D (1-dimensional).

![](https://images.viblo.asia/49d21a53-a8a9-4488-8b19-f24b315c1f3b.gif)

## 2. QRCode
Là viết tắt của "**Quick Response**" (phản hồi nhanh chóng), thường được viết tắt là QR code, và ứng dụng khá giống với barcode, và nó chính là 1 loại barcode. QRCode cũng chứa thông tin của sản phẩm mà được ghi vào nó, nhưng không giống barcode, QR chứa thông tin 2D (2-dimentional), tức là cả chiều dọc và chiều ngang (vertical and horizontal directions).

QR codes chứa được rất nhiều thông tin trên đó. Từ những tổ chức to lớn đến các cửa hàng tạp hóa bên đường, đều có thể tạo ra mã QR code của riêng họ và attach chúng vào sản phẩm của họ. Ví dụ dưới đây chính là QR code của URL của website viblo.asia

![](https://images.viblo.asia/5974cb6b-ec70-41d0-9074-d4319b62f4c7.png)

QR code đã và đang ngày càng phổ biến trong kỉ nguyên phát triển mạnh mẽ của smartphone. Có rất nhiều ứng dụng trên **CHPlay** hay **AppStore** free dùng để đọc **QR code**. Vì vậy, chỉ cần nhìn thấy **QR code**, rút **smartphone** ra và scan, bạn sẽ ngay lập tức biết được thông tin trên đó ghi gì. Và ngày nay, các app còn tích hợp sẵn các **action** ngay khi scan được thông tin, như chuyển hướng vào browser nếu thông tin là website URL, gọi điện thoại nếu là số phone, ...


-----



# Sự khác biệt
Mặc dù cả QR code và BarCode cùng phục vụ mục đích là lưu trữ thông tin về 1 sản phẩm hoặc 1 tổ chức, nhưng chúng có những sự khác biệt lớn như sau
## Cách hiển thị
Có lẽ là sự khác biệt lớn nhất mà ai nhìn vào cũng thấy rõ, chính là hình dáng của chúng. QR code chứa các mảng màu đen trắng hình thành trong 1 hình vuông, trong khi BarCode chứa các sọc đen trắng song song trong 1 hình chữ nhật.

## Khả năng lưu trữ thông tin
Trong khi barcode chỉ giữ được thông tin theo chiều ngang (horizontal direction), QR code có thể giữ thông tin cả chiều ngang (horizontal direction) và chiều dọc (vertical direction). Với sự khác biệt về cấu trúc này, QR code có thể lưu trữ thông tin nhiều gấp hàng trăm lần (hundreds of times) so với bar code, do đó nó có thể lưu trữ thông tin tốt hơn trong 1 khoảng diện tích nhỏ hơn so với barcode. 

## Khả năng chịu lỗi
Đây chính là ưu điểm vượt trội của QR code so với barcode. QR code có khả năng chịu lỗi từ 7-30%. Điều này có nghĩa là gì? Tức là, trong trường hợp QR code in trên sản phẩm bị bẩn hay trầy xước, trong mức cho phép 7-30%, chúng ta vẫn có thể lấy được thông tin trên đó 1 cách chính xác. Nhờ tính năng chịu lỗi vô cùng lớn này, nhiều công ty đã đưa logo hay hình ảnh của họ vào code để phòng trường hợp có bất kì câu hỏi nào liên quan.


-----


Mặc dù Barcode đã phát triển mạnh trong những thập kỉ vừa qua, nhưng với sự ra đời của QR code với những tính năng hoàn toàn vượt trội, và với sự phát triển mạnh mẽ của Smart phone, QR đã và đang trở thành xu hướng (trend) trong các sản phẩm và dịch vụ hằng ngày. Chúc mừng **QR code**! :)


-----


# Chi tiết về QR Code
## Cấu trúc của QR Code
Các khung lưới caro đen và trắng ở cái nhìn đầu tiên có vẻ giống như trò chơi đoán ô chữ được tạo ra random. Nhưng nếu bạn nhìn kĩ, có có 1 cấu trúc được xác định. Để các máy scan có thể nhận ra QR code, nó phải ở dạng hình vuông. Và một số thành phần dưới đây sẽ đảm bảo cho việc thông tin được đọc một cách chính xác.

### Positioning markings - hướng đánh dấu
They indicate the direction in which the Code is printed.
Chỉ ra hướng mà Code được in ra
![](https://images.viblo.asia/6c626175-8660-4768-aa24-23e97546472b.png)


### Alignment markings - lề đánh dấu
Nếu QR code lớn, thành phần này giúp định hướng thông tin
![](https://images.viblo.asia/dc58638f-f618-480e-a4a1-f6e5461a4196.png)


### Timing pattern - khung thời gian
Những dòng này giúp scanner xác định dộ lớn của ma trận dữ liệu (data)
![](https://images.viblo.asia/2050bafa-3c44-45db-b6b4-177725353599.png)


### Version information - Thông tin phiên bản
Chỉ ra version của QR code đang được sử dụng. Cho đến hiện tại có đến 40 phiên bản khác nhau của QR Code. Với mục đích marketing, phiên bản 1-7 thường được sử dụng.
![](https://images.viblo.asia/00c436c6-4577-47c9-8236-0511c47558c6.png)


### Format information - Định dạng thông tin
Chứa đựng thông tin về khả năng chịu lỗi và khung data mask, giúp dễ dàng hơn cho việc scan Code
![](https://images.viblo.asia/d6ba5db4-2075-48f8-b7a2-e72f49a1e239.png)


### Data and error correction keys - Dữ liệu và key sửa lỗi
Thành phần này để lưu trữ dự liệu thực (dữ liệu muốn trích xuất)
![](https://images.viblo.asia/457128a0-a9aa-4f94-83c2-44dc37a90c9d.png)


### Quiet zone - vùng biên
Vùng này khá quan trọng để các chương trình scan có thể phân biệt vùng QR Code với bên ngoài.
![](https://images.viblo.asia/949dc875-f0f1-4861-a924-7aeb2d85fddd.png)

## Điều gì xảy ra nếu QR bị hư hại
Để đảm bảo thông tin chứa trong QR Code có thể đọc được cả khi nó bị hư hại, dữ liệu (data keys) được lưu trữ 2 lần (duplication). Nhờ đó, đến 30% của dữ liệu Code có thể bị hủy mà không ảnh hưởng đến khả năng đọc của Code.

## QR Code có thể lưu trữ gì
Có thể chứa đến 7089 số hoặc 4296 kí tự chữ, bao gồm cả dấu chấm câu và kí tự đặc biệt. Thông tin thêm vào QR Code càng nhiều, độ lớn và cấu trúc của QR Code càng trở nên phức tạp.

# Kết 
Bài viết đã trình bày cho các bạn sự khác biệt giữa Barcode và QRCode, cấu trúc và sự mạnh mẽ của QR code. Hi vọng bài viết giúp các bạn hiểu hơn về 2 loại mã code phổ biến này. Cảm ơn các bạn đã đọc bài.



-----


Các nguồn tham khảo

https://www.scienceabc.com/innovation/whats-qr-code-how-its-different-from-barcode.html

https://www.qr-code-generator.com/qr-code-marketing/qr-codes-basics/