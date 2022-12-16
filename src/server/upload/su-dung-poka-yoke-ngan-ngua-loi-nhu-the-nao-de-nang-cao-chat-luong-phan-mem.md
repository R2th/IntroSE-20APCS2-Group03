Công nghệ phần mềm là 1 chuyên ngành nhằm sản xuất ra phần mềm chất lượng cao thông qua 1 cách tiếp cận có kế hoạch và hệ thống để phát triển phần mềm.

Nó tuân thủ theo các tiêu chuẩn để đạt tới 1 sản phẩm chất lượng. Phát triển phần mềm có 3 giai đoạn chính là phân tích - thiết kế - thực thi. Việc tạo ra 1 phần mềm chất lượng cao là việc cần thiết để sản xuất ra 1 sản phẩm không lỗi. 

![](https://images.viblo.asia/f2283e70-cc10-45c9-af7f-8fbea5cc5800.png)

### Quản lý lỗi
Các lỗi là những hành vi bất ngờ và không được mong đợi xảy trong sản phẩm. Bất kỳ cái gì liên quan tới lỗi đều là một tiến trình chứ không phải 1 trạng thái cụ thể nào đó.

Việc tìm và sửa lỗi trong những giai đoạn đầu của phát triển phần mềm thì giúp giảm thời gian, công việc và tiền bạc. Việc tìm ra các lỗi ở những giai đoạn sau thì luôn tiêu tốn nhiều thời gian hơn là ở những giai đoạn đầu. Nó giúp nâng cao chất lượng bằng việc thêm vào độ tin cậy, tính di động và sự bảo trì, vv.

Do đó, người ta khuyến khích các công ty nên song hành với các hệ thống quản lý lỗi và các team quản lý lỗi ở mọi giai đoạn phát triển phần mềm để đạt được sản phẩm chất lượng tốt và xây dựng được niềm tin với khách hàng.

Một trong số những kỹ thuật ngăn ngừa lỗi là **POKA-YOKE**.

### Poka-Yoke là gì?

Nó là 1 tiến trình đảm bảo chất lượng được giới thiệu bởi kỹ sư người Nhật tên là Shigeo Shingo. Thuật ngữ này được sử dụng trong ngôn ngữ nhật bản như là “Poka” nghĩa là lỗi và “Yoke” nghĩa là ngăn chặn, nghĩa là Kỹ thuật ngăn chặn lỗi hay chống lỗi.

Mục tiêu của Poka-Yoke phát triển các tiến trình để giảm lỗi bằng cách tránh hoặc sửa sớm các lỗi (thiết kế để chỉ ra các cảnh báo hay các tin nhắn cảnh báo cho người dùng) trong các giai đoạn phát triển và thiết kế. Kỹ thuật này hầu hết được sử dụng trong công nghiệp chế tạo nhưng hiện nay sự hiệu quả của công nghệ này cũng được áp dụng vào trong các tiến trình phát triển phần mềm khá tốt.

**Ví dụ về Poka-Yoke từ 1 ngành công nghiệp chế tạo**
![](https://images.viblo.asia/3342ec48-99be-419b-bbae-0a6b254a0ede.jpg)

Một ví dụ về thiết kế Poka-Yoke từ công nghiệp chế tạo đó là – khe cắm thẻ SIM trong điện thoại di động được thiết kế theo 1 cách mà người dùng được phép cho thẻ SIM card vào điện thoại bằng 1 cách chính xác duy nhất. Sẽ không có cơ hội cho người dùng tạo ra lỗi khi mà bỏ thẻ SIM vào trong 1 điện thoại di động. Điều này ngăn ngừa (hay chống) lỗi thiết kế. 

Có lẽ hầu hết ai cũng đã từng làm việc lắp thẻ SIM rồi đúng không? Sure là chúng ta chẳng thể nào mà cho được thẻ SIM vào điện thoại nếu như cắm không ngắm đúng chiều đúng không nào =))

 **Ví dụ về Poka-Yoke từ ứng dụng phần mềm:**
 
 Ví dụ hoàn hảo về tiến trình Poka-yoke trong ứng dụng phần mềm đó là – tính năng đính kèm file của Gmail. 

Khi bạn nhập từ ‘find attached’ trong khi soạn email mới và thử gửi email nhưng không có đính kèm bất kỳ 1 file Google nào thì nó sẽ hiện 1 popup nhắc nhở bạn là “bạn đã sử dụng từ “find attached” trong email nhưng không có bất kỳ file nào được đính kèm, bạn vẫn muốn gửi email chứ?”

Mình đã test thử và đúng là như thế thật. Dùng Gmail bao lâu nay mới thấy cái tính năng hay ho thế này. Hãy xem ảnh dưới đây nhé :D

 ![](https://images.viblo.asia/7d7573a6-afdc-4344-b322-f124c00d2b1c.png)
### Kỹ thuật Poka-Yoke Technique hoạt động như nào?

**Các bước để thực thi 1 tiến trình Poka-Yoke:**

Dưới đây là 1 số bước để thiết kế và thực thi 1 tiến trình để ngăn chặn lỗi phần mềm:

1. Liệt kê tất cả các user scenarios hay end-to-end test cases của ứng dụng.
1. Phân tích tất cả các user scenarios này bằng việc hỏi câu hỏi 5-whys để hiểu rõ các cách mà những scenarios này có thể thất bại.
1. Một khi mà bạn có thể xác định được các cách mà những user scenarios có thể xảy ra lỗi, thì hãy thiết kế và áp dụng 1 kỹ thuật Poka-Yoke để tránh những vấn đề có thể xảy ra(Ví dụ, Thiết kế này có thể đơn giản là 1 Unit test đơn giản để kiểm tra xem liệu có bất kỳ chức năng nào đã được viết đang hoạt động không đúng hay không?).
1. Đảm bảo là kỹ thuật được thiết kế để tránh lỗi hoạt động đúng thông qua việc đưa ra các lỗi hay tin nhắn cảnh báo khi mà dữ liệu đầu vào không đúng hoặc xử lý các user scenario.
1. Một khi mà các bản thử nghiệm thành công thì hãy bổ sung kỹ thuật này vào trong danh sách tiến trình Poka-Yoke để thực hiện mỗi lần có release/build mới.  
Trong ví dụ về kiểm thử Unit ở trên, một khi mà kiểm thử Unit được viết ra để kiểm tra code, kiểm tra xem liệu nó đang làm việc đối với các giá trị tích cực và tiêu cực hay không. Khi mà các kiểm thử này thành công thì hãy bổ sung nó vào kho ‘Unit tests’ để thực thi mỗi khi có bất kỳ thay đổi nào được tạo ra trong các module liên quan.
4. Đo lường độ thành công của các tiến trình Poka-Yoke. Kiểm tra xem liệu kỹ thuật này có thực sự ngăn chặn hay bắt được các lỗi khi mà nó xảy ra hay không.

### Categories Of Poka-Yoke
* **Ngăn chặn lỗi**
* **Phát hiện lỗi**

Ngăn chặn lỗi là một hoạt động quan trọng nhất trong SDLC (vòng đời phát triển phần mềm). Phương pháp này được sử dụng để xác định tất cả các vấn đề và các hành động cần để loại bỏ các vấn đề này. Nhiều lỗi phần mềm có thể được ngăn chặn trong chính giai đoạn thiết kế.

Team QA có thể giúp ngăn chặn các lỗi này bằng việc xem xét, đánh giá tài các liệu yêu cầu phần mềm. Tất cả các vấn đề được xác định trong giai đoạn này được đánh dấu lại trong các giai đoạn lập trình và ngăn chặn chúng xảy ra ở những giai đoạn sau đó.

Các ví dụ trong công nghệ phần mềm và chế tạo cung cấp ở trên là các ví dụ tuyệt vời về các kỹ thuật ngăn chặn lỗi.

Phát hiện lỗi là nhiệm vụ phổ biến đối với các team QA. Các team QA sử dụng các phương pháp và chiến lược khác nhau để thực hiện các trường hợp kiểm thử một cách hiệu quả. Lỗi được phát hiện bởi nhiều phương pháp kiểm thử khác như smoke test và Exploratory test.

**Những phẩm chất của 1 tiến trình Poka-Yoke tốt là gì?**

1. Poka-Yoke nên đơn giản để có thể tạo và bảo trì. Nó cũng nên dễ dàng để xử lý và chi phí hiệu quả. Việc bảo trì một Poka-Yoke phức tạp thì tốn thời gian và thường dẫn tới các vấn đề nếu như không được bảo trì đúng cách.
1. Poka-Yoke nên được thiết kế sớm trong SDLC để có thể phát hiện ra các vấn đề 1 cách nhanh chóng.
1. Một tiến trình Poka-Yoke tốt nên đủ chính xác để có thể tìm ra các vấn đề khi chúng xảy ra.
1. Một tiến trình Poka-Yoke nên được thiết kế theo 1 cách mà nó có thể ngăn chặn được hầu hết các vấn đề phổ biến nhất xảy ra trong các phần mềm.
1. Nó cũng nên là 1 phần của quá trình lập trình và thiết kế phần mềm.

### Sự cần thiết của Kỹ thuật Poka-Yoke trong giai đoạn thiết kế phần mềm

Để phát triển phần mềm chất lượng thì điều quan trọng là thiết kế phải dựa trên các mong đợi của người dùng. Người dùng thì có thể sử dụng và xử lý phần mềm mà không mắc phải bất kỳ sai lầm tốn chi phí nào.

**Các ví dụ về Poka-Yoke trong thiết kế và chất lượng**

#1) Một ví dụ về thiếu tập tin đính kèm trong khi tạo email của Gmail.

#2) Một số trang Web đưa ra cảnh báo để chỉ ra độ mạnh/yếu của mật khẩu của người dùng. Nó cũng hướng dẫn cho người dùng sử dụng 1 mật khẩu đủ mạnh bằng việc mật khẩu phải chứa cả ký tự và số.

![](https://images.viblo.asia/caab6b86-e0c3-47e1-b637-a79251a3079e.png)

#3) Tính năng tìm kiếm của Google tự động đề xuất sửa những lỗi sai chính tả cho người dùng khi truy vấn tìm kiếm. Điều này giúp cho người dùng tránh mắc các lỗi vô ý.

![](https://images.viblo.asia/d8ceaf42-c295-498a-b910-b01540766472.png)

#4)  Các trang web của ngân hàng sử dụng tính năng trường văn bản kép để chấp nhận thông tin nhạy cảm như mật khẩu hoặc số tài khoản. Trường văn bản thứ hai thường được mã hóa để tránh mắc bất kỳ lỗi nào trong khi cung cấp giá trị đầu vào và kiểm tra xem liệu cả hai giá trị trường văn bản có khớp nhau hay không.

**Sự cần thiết của kỹ thuật Poka-Yoke trong phát triển phần mềm**

Từ vô số các ví dụ trong ngành công nghiệp, thì giờ đây người ta đã biết rằng chi phí sửa lỗi sau khi phát hành sản phẩm lớn hơn nhiều lần so với việc sửa nó trong chu kỳ phát triển.

Giải pháp tốt nhất để tránh các vấn đề xảy ra sau khi release là đưa các kỹ thuật Poka-Yoke vào giúp cho việc bắt được các lỗi trong những giai đoạn đầu của phát triển phần mềm giúp cho việc sửa chữa nó trở nên rẻ hơn. Việc thực thi các tiến trình Poka-Yoke một cách rộng rãi phụ thuộc vào khả năng của các Tester trong việc nắm bắt và loại bỏ các vấn đề.

**Các ví dụ về kỹ thuật Poka-Yoke trong phát triển phần mềm**

1. Unit test là một trong những phương tiện hiệu quả nhất trong việc phát triển phần mềm ngăn chặn lỗi. Chắc chắn rồi đúng không vì nếu như Dev tìm được lỗi ở ngay giai đoạn code và fix sớm thì sẽ khi đến lượt Tester số lượng lỗi sẽ giảm đi đáng kể đấy
1. Việc có sự xác thực các kỹ thuật Poka-Yoke trong bộ công cụ luôn là những gợi ý tốt cho các nhà phát triển. Các vấn đề xác thực nên được xử lý trong code của bạn. Những vấn đề xác thực này cũng nên được xem xét và cập nhật định kỳ. 
1. Một kỹ thuật Poka-Yoke hiệu quả và phổ biến nhất là thuê được đúng người để ngăn chặn lỗi trong phần mềm của bạn. Cái này thì lại lý tưởng quá rồi phải không ạ :D

### Kết luận
Việc gây ra lỗi là không vấn đề gì. Con người mà có phải thần thánh đâu, ai chả mắc sai lầm nhỉ =)) Chỉ là đừng tạo ra những lỗi giống nhau lặp đi lặp lại thôi ấy.

Thề là case này mình gặp nhiều rồi. Kiểu như test xong gặp lỗi A, rồi báo Dev fix, Dev fix xong không Unit test mà Dev báo lại luôn là "Oki rồi, test lại đê nhé". Rồi vừa test lại cái cái lỗi A đó lại lù lù xuất hiện. Thì ôi thôi cáu cực kỳ luôn. Muốn xông vào oánh nhau luôn ý. >"<

Và để tránh việc tạo ra các lỗi giống nhau và lặp đi lặp lại thì nên có một số những tiến trình hay sự kiểm tra tại chỗ. Và các kỹ thuật Poka-Yoke được phát triển để giải quyết vấn đề này.

Hãy thử và cảm nhận xem liệu Poka-Yoke hiệu quả tới mức nào nhé!

Bài viết được dịch từ link:
https://www.softwaretestinghelp.com/poka-yoke/