Android Auto đặt tất cả nội dung trên nền đen để tạo ra trải nghiệm người dùng nhất quán, với các màu sắc tương tự giữa các chủ đề light và dark.

Nền đen thường hoạt động tốt nhất bên trong ô tô, vì các nhà sản xuất ô tô thường sử dụng vật liệu và màu tối cho nội thất ô tô, bảng điều khiển và giao diện người dùng.

**Điểm thoáng qua 1 vài điều cần chú ý:**
* Sử dụng nền đen để hỗ trợ lái xe cả ngày và đêm
* Duy trì tỷ lệ tương phản ít nhất 4,5: 1 giữa nền và các biểu tượng hoặc văn bản
* Sử dụng lượng màu tối thiểu và có chủ đích
* Hiển thị độ cao bằng cách sử dụng các sắc thái xám khác nhau
* Sử dụng độ trong suốt và độ mờ để hướng dẫn lấy nét trực quan

## Bảng màu và Gradients

Dark theme cho Android Auto sử dụng bảng màu thang độ xám. Bất kỳ màu bổ sung nào được thêm vào giao diện người dùng của bạn sẽ bị giảm về cường độ, tương tự như các biến thể màu tối hơn từ [bảng màu của Material Design](https://material.io/design/color/the-color-system.html#color-usage-palettes).

### Bảng màu xám của Android Auto

Sử dụng bảng màu thang độ xám của Android Auto, bạn có thể áp dụng màu cho tất cả các phần tử, bao gồm cả văn bản và biểu tượng.

Bảng màu này được thiết kế để:
* Phản ánh mức độ phân cấp của từng phần tử giao diện người dùng với phạm vi sắc thái được cung cấp
* Giải quyết tất cả các trường hợp sử dụng giao diện người dùng chủ đề tối
    
    ![](https://images.viblo.asia/8545258f-043e-45dc-b834-c6b6ad1ace30.png)

<div align="center">    
Bảng màu xám này là bảng màu mặc định của Android Auto, hỗ trợ chủ đề tối của giao diện.
</div>
<br>

Trong Android Auto, cảm giác về chiều sâu được thể hiện bằng các sắc thái xám khác nhau. Mỗi shade đại diện cho một mức độ cao khác nhau, trong đó các thành phần có sắc thái tối hơn (chẳng hạn như thành phần danh sách) có độ cao thấp hơn các thành phần có sắc thái nhẹ hơn (chẳng hạn như các nút tác vụ nổi).

Tất cả các thành phần được hiển thị trên nền đen mà không có bóng. Để cung cấp đủ độ tương phản giữa các thành phần này, bảng màu xám của Android Auto chứa nhiều màu xám. Đó là sự tiến triển dần dần của các màu xám so với bảng màu cơ bản của Material Design, vì các sắc thái của Material dưới Gray 900 quá sáng đối với bối cảnh tự động.

![](https://images.viblo.asia/59edb87c-414a-4611-8025-81284f39d572.png)

<div align="center">    
Mỗi mức độ cao cho các thành phần khác nhau được liên kết với một giá trị màu xám duy nhất.
</div>
<br>

![](https://images.viblo.asia/1391f1ce-8b38-4442-9254-f55524d9b296.png)

<div align="center">    
Biểu đồ này hiển thị các giá trị màu xám được liên kết với các mức độ cao khác nhau cho chế độ ngày và đêm.
</div>
<br>

### Màu nhấn (Accent color)

Ngoài bảng màu xám của Android Auto, màu nhấn (accent color) có thể được sử dụng một cách tiết kiệm cho các mục đích như thu hút sự tập trung của người dùng.

Hiện tại, Android Auto có một màu nhấn chính thức, màu xanh lam được gọi là "màu xe" trong thư viện hỗ trợ. Màu xanh lam này đã tăng độ bão hòa và độ sống động từ màu xanh lam tiêu chuẩn của Google để có khả năng hiển thị tốt hơn trên bề mặt tối của giao diện người dùng.

![](https://images.viblo.asia/f1589817-16f1-42a4-980e-9d17b4d9fb55.png)

<div align="center">    
Màu "điểm nhấn xe" xanh lam trong Android Auto bão hòa hơn màu xanh lam tiêu chuẩn của Google, được thiết kế để hoạt động tốt trong giao diện có chủ đề tối khi lái xe cả ngày và đêm.
</div>
<br>

## Biểu đồ độ mờ (Opacity charts)

Mô hình không gian Material Design dựa vào các mức độ mờ khác nhau để truyền tải cảm giác về chiều sâu trong giao diện người dùng. Để sử dụng hiệu quả, hãy chọn mức độ mờ dựa trên trường hợp sử dụng của bạn.

**Giá trị độ mờ tối**

Trường hợp sử dụng phổ biến nhất cho các bề mặt tối bán trong suốt là scrim (còn được gọi là "lớp phủ" (overlay)).

![](https://images.viblo.asia/3cb719db-4e1d-479e-8a49-350de9f4bda2.png)

**Giá trị độ mờ trắng**

Các giá trị màu trắng bán trong suốt chủ yếu được sử dụng cho văn bản, đặc biệt khi nền được tô màu, thay vì sử dụng màu xám đồng nhất.

![](https://images.viblo.asia/09627be7-89dd-43ea-96b8-3a5fc005b447.png)

Để biết ví dụ về cách sử dụng độ mờ trong tập lệnh và phân cấp văn bản, hãy xem [Hướng dẫn và ví dụ](https://developers.google.com/cars/design/android-auto/design-system/color#guidance_and_examples).

## Tương phản

Độ tương phản màu phù hợp giúp người lái xe nhanh chóng diễn giải thông tin và đưa ra quyết định.

Cần có độ tương phản hình ảnh tối thiểu giữa nền trước (văn bản hoặc biểu tượng) và nền (màu sắc, ảnh bìa album, v.v.) để dễ đọc khi lái xe. Màu ứng dụng phải đáp ứng các yêu cầu về độ tương phản Văn bản thông thường cấp AA của [WCAG 2.0](https://www.w3.org/TR/WCAG20/#visual-audio-contrast), yêu cầu này chỉ định tỷ lệ tương phản là 4,5: 1). Sử dụng bộ kiểm tra độ tương phản, chẳng hạn như [Bộ kiểm tra độ tương phản màu WebAIM](http://webaim.org/resources/contrastchecker/), để đảm bảo rằng màn hình của bạn đáp ứng các yêu cầu về độ tương phản.

Để biết thêm chi tiết về cách áp dụng tỷ lệ tương phản cho các phần tử giao diện người dùng cụ thể, hãy xem [nguyên tắc Thiết kế cho Lái xe](https://developers.google.com/cars/design/design-foundations/visual-principles#make_content_easy_to_read).

![](https://images.viblo.asia/ccd7bd2f-a882-4f05-800c-28c38c56ac18.png)

<div align="center">    

 **Nên**
Các biểu tượng này tuân theo các đề xuất về tỷ lệ tương phản màu và dễ đọc hơn so với nền của chúng
    
</div>
<br>

![](https://images.viblo.asia/0914efcc-7d0f-4738-adf6-633eb9b39bfc.png)

<div align="center">    

**Không nên**
Các biểu tượng này không tuân theo các khuyến nghị về tỷ lệ tương phản màu và khó phân biệt với nền của chúng
    
</div>
<br>

## Hướng dẫn và ví dụ

Giao diện người dùng tối cho Android Auto rõ ràng và đơn giản, với việc sử dụng màu sắc tối thiểu. Ngoài việc sử dụng màu sắc, tông màu và giá trị độ mờ thích hợp cho các phần tử giao diện người dùng (xem [Bảng màu và độ chuyển màu](https://developers.google.com/cars/design/android-auto/design-system/color#palettes_and_gradients)), mọi việc sử dụng màu sắc và độ mờ đa dạng đều phải có mục đích.

Phần này cung cấp hướng dẫn và ví dụ để áp dụng các biến thể độ mờ và màu sắc để đạt được nhiều mục tiêu, bao gồm:
* Nền che khuất
* Duy trì tính nhất quán
* Thiết lập hệ thống phân cấp trực quan thu hút sự tập trung của người dùng vào các hành động chính
* Phân biệt các mục trong danh sách

### Nền che khuất bằng scrims

Scrims toàn màn hình (lớp phủ (overlay)) được sử dụng để che nền khi nội dung có mức độ ưu tiên cao xuất hiện ở nền trước, chẳng hạn như hộp thoại yêu cầu người dùng thực hiện hành động. Partial scrims được sử dụng để thu hút sự chú ý đến quá trình chuyển đổi của các phần tử, chẳng hạn như lối vào của thông báo.

![](https://images.viblo.asia/f73281cb-333f-4028-a3d5-3ad3a50438d7.png)

<div align="center">    

Full scrims (phía sau dialog) ở chế độ ban ngày
    
</div>
<br>

![](https://images.viblo.asia/a8c3b6c0-85d4-4082-8ed4-7b43b7005f7b.png)

<div align="center">    

Full scrims (phía sau dialog) ở chế độ ban đêm
    
</div>
<br>

![](https://images.viblo.asia/ac9783f9-3172-4e02-95a9-63ec494d3c6e.png)

<div align="center">    

Partial scrim (phía sau dialog) ở chế độ ban ngày
    
</div>
<br>

![](https://images.viblo.asia/a93b8753-57dd-4631-ae4d-a025d55968d5.png)

<div align="center">    

Partial scrim (phía sau dialog) ở chế độ ban đêm
    
</div>
<br>

### Duy trì sự nhất quán với màu sắc

Màu sắc là một gợi ý mạnh mẽ để củng cố kết nối giữa các yếu tố chính trong các luồng người dùng, chẳng hạn như tất cả các yếu tố liên quan đến điều hướng được tô màu xanh lục. Tính liên tục của màu sắc như vậy hỗ trợ trí nhớ và nhận dạng về các phần tử giao diện người dùng được kết nối và cách chúng liên quan với nhau. Bạn có thể sử dụng nó để tạo ra trải nghiệm nhất quán từ màn hình này sang màn hình khác.

![](https://images.viblo.asia/03135356-bc5d-4017-bacb-a24a802cbcf7.png)

<div align="center">    

**Nên**
Duy trì tính liên tục của hình ảnh bằng cách sử dụng cùng một màu cho một mục trên nhiều chế độ xem, chẳng hạn như màu xanh lục được sử dụng cho các chế độ xem điều hướng từng chặng này.
    
</div>
<br>

![](https://images.viblo.asia/08d0bb51-31fb-40b1-8d3c-9d76093e2881.png)

<div align="center">    

**Nên**
Sử dụng màu sắc để kết nối trực quan các yếu tố và chức năng liên quan, chẳng hạn như các CTA treo máy màu đỏ này.
    
</div>
<br>

![](https://images.viblo.asia/cdac1114-6794-4b13-bede-f3608cb8cee7.png)

<div align="center">    

**Nên**
Sử dụng màu chủ đạo của ảnh bìa album hoặc màu chỉ định của ứng dụng trên các yếu tố liên quan như một biện pháp phù hợp về mặt hình ảnh. Vòng tròn xung quanh nút tạm dừng này được đánh dấu bằng màu xanh lá cây của Spotify.
    
</div>
<br>

![](https://images.viblo.asia/95c565d9-3df7-480c-ab9e-64fbc08b30f7.png)

**Không nên**
Không sử dụng các màu khác nhau để tùy ý phân biệt các thành phần lặp lại trong một màn hình. Hãy thận trọng khi sử dụng màu sắc khi chúng không làm tăng giá trị - như trường hợp của những đường viền màu này xung quanh các thẻ tóm tắt, trùng lặp với màu của biểu tượng ứng dụng.
    
</div>
<br>

### Thiết lập hệ thống phân cấp trực quan

Một hệ thống phân cấp trực quan nhất quán và mạnh mẽ có thể được tạo ra bằng cách tô màu văn bản bằng cách sử dụng một loạt các độ mờ trắng. Các giá trị độ mờ 88%, 72% và 56% cho văn bản trắng chứa độ tương phản vừa đủ để đáp ứng các yêu cầu về khả năng tiếp cận đồng thời tạo ra một môi trường đọc thoải mái trên nền tối. Sử dụng độ mờ 96% trên tất cả văn bản màu trắng cho chế độ ban đêm.

![](https://images.viblo.asia/3091a4e5-a269-4f16-b775-b3f372c0e803.png)

<div align="center">    

**Nên**
Sử dụng các giá trị độ mờ và độ tương phản khác nhau để duy trì hệ thống phân cấp trực quan.
    
</div>
<br>

![](https://images.viblo.asia/1646ba79-a5c3-4da7-baa8-2646ba3d18f4.png)

<div align="center">    

**Không nên**
Đừng lạm dụng các giá trị độ mờ hoặc độ tương phản đầy đủ bằng cách áp dụng chúng cho quá nhiều phần tử. Cần có sự tương phản về giá trị độ mờ để phân biệt thông tin chính và thông tin phụ.
    
</div>
<br>

Đây là các guideline để thiết kế màu sắc trên các ứng dụng Android Auto. Cảm ơn mọi người đã đọc bài của mình :D