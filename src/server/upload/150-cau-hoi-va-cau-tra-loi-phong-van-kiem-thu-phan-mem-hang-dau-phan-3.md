# 80. Sự khác nhau giữa Kỹ thuật kiểm thử và Công cụ kiểm thử là gì ?

Kỹ thuật kiểm thử: - Là một quy trình đảm bảo rằng một số khía cạnh của hệ thống hoặc một đơn vị của hệ thống hoạt động đúng, có thể có một vài kỹ thuật nhưng sử dụng nhiều công cụ.

Công cụ kiểm thử: - Là phương tiện để thực hiện kiểm thử. Công cụ là tài nguyên hỗ trợ người kiểm thử, nhưng bản thân nó không đủ để tiến hành kiểm thử. 

# 81. Trường hợp nào sử dụng đầu ra của việc phân tích yêu cầu, đặc tả yêu cầu làm đầu vào ? 

Các trường hợp kiểm thử chấp nhận người dùng.

# 82. Kiểm thử lặp lại một chương trình đã được kiểm thử, sau khi sửa đổi, để phát hiện ra bất kỳ lỗi nào do kết quả của thay đổi trong phần mềm đang được kiểm thử hoặc trong một thành phần phần mềm liên quan hoặc không liên quan khác. Kiểm thử đó là gì ? 

Kiểm thử hồi quy

# 83. Một nhà bán buôn bán hộp mực máy in. Số lượng đặt hàng tối thiểu là 5. Có giảm giá 20% cho các đơn hàng từ 100 hộp mực máy in trở lên. Bạn đã được yêu cầu chuẩn bị testcase bằng cách sử dụng các giá trị khác nhau cho số lượng hộp mực máy in được đặt hàng. Nhóm nào sau đây chứa ba đầu vào kiểm thử sẽ được tạo bằng Phân tích giá trị biên?

4, 5, 99

# 84. Kiểm thử thành phần (component testing) là gì?

Kiểm thử thành phần, hay còn được gọi là kiểm thử đơn vị, mô-đun và kiểm thử chương trình, tìm kiếm các lỗi bên trong và xác minh chức năng của phần mềm (ví dụ: mô-đun, chương trình, đối tượng, lớp, v.v.) có thể kiểm thử riêng. Kiểm thử thành phần có thể được thực hiện tách biệt với phần còn lại của hệ thống tùy thuộc vào bối cảnh của vòng đời phát triển và hệ thống. Hầu hết gốc rễ ban đầu và trình điều khiển thường được sử dụng để thay thế phần bị thiếu và mô phỏng giao diện giữa các thành phần phần mềm một cách đơn giản. Một gốc rễ được gọi từ thành phần phần mềm sẽ được kiểm thử; một trình điều khiển gọi một thành phần sẽ được kiểm thử.

# 85. Kiểm thử chức năng hệ thống ( functional system testing)  là gì?

Kiểm thử toàn bộ chức năng từ đầu đến cuối của hệ thống được định nghĩa là kiểm thử chức năng hệ thống.

# 86. Những lợi ích của kiểm thử độc lập (Independent Testing) là gì?

Người kiểm thử độc lập không ưu tiên và xác định các khiếm khuyết khác nhau cùng một lúc.

# 87. Theo cách tiếp cận PHẢN ỨNG để kiểm thử khi nào phần lớn công việc thiết kế kiểm thử sẽ được bắt đầu?

Phần lớn công việc thiết kế kiểm thử bắt đầu sau khi phần mềm hoặc hệ thống được sản xuất.

# 88. Các phương pháp khác nhau trong mô hình phát triển Agile là gì?

Hiện tại có bảy phương pháp nhanh khác nhau mà tôi biết:

1. Extreme Programming (XP)
2. Scrum
3. Lean Software Development
4. Feature-Driven Development
5. Agile Unified Process
6. Crystal
7. Dynamic Systems Development Model (DSDM)

# 89. Hoạt động nào trong quy trình kiểm thử bao gồm đánh giá khả năng kiểm thử của yêu cầu , hệ thống ?

'Phân tích kiểm thử' và 'Thiết kế kiểm thử' .

# 90. Lý do quan trọng nhất sử dụng rủi ro để thúc đẩy các nỗ lực kiểm thử là gì ?
# 
Khi Kiểm thử mọi thứ đều không khả thi.

# 91. Kiểm thử random/monkey là gì? Khi nào sử dụng?

Kiểm thử ngẫu nhiên thường được gọi là kiểm thử monkey. Trong loại dữ liệu kiểm thử như vậy được tạo ngẫu nhiên thường sử dụng một công cụ hoặc cơ chế tự động. Với đầu vào được tạo ngẫu nhiên này, hệ thống được kiểm tra và kết quả được phân tích tương ứng. Những kiểm thử này ít đáng tin cậy hơn; do đó, nó thường được sử dụng bởi những người mới bắt đầu và để xem liệu hệ thống sẽ luôn ổn định trước nhữn tác động bất lợi.

# 92. Mục tiêu nào sau đây là hợp lệ cho các báo cáo sự cố?

* Cung cấp cho các nhà phát triển và các bên khác thông tin phản hồi về vấn đề này để cho phép nhận dạng, phân biệt và sửa chữa khi cần thiết.
* Cung cấp ý tưởng để cải tiến quy trình kiểm thử.
* Cung cấp một công cụ để đánh giá năng lực kiểm thử.
* Cung cấp cho người kiểm thử một công cụ theo dõi chất lượng của hệ thống.

# 93. Xem xét các kỹ thuật sau. Cái nào là tĩnh và cái nào là kỹ thuật động?

1. Phân vùng tương đương.
2. Sử dụng testcase.
3. Phân tích luồng dữ liệu.
4. Kiểm thử thăm dò.
5. Bảng quyết định.
6. Inspections.

Phân tích và kiểm thử luồng dữ liệu là tĩnh; Phân vùng tương đương, testcase, Kiểm thử thăm dò và Bảng quyết định là động.

# 94. Tại sao Kiểm thử tĩnh và kiểm thử động được mô tả là bổ sung?

Bởi vì cũng có mục đích xác định khuyết điểm nhưng khác nhau về các loại.

# 95. Các giai đoạn của đánh giá chính thức là gì?

Trái ngược với đánh giá không chính thức, đánh giá chính thức tuân theo một quy trình chính thức. Bao gồm sáu bước chính:

1. Planning
2. Kick-off
3. Preparation
4. Review meeting
5. Rework
6. Follow-up.

# 96. Vai trò của người điều hành trong quá trình là gì?

Người điều hành (hoặc người lãnh đạo đánh giá) dẫn dắt quá trình. Người đó xác định, hợp tác với tác giả, loại đánh giá, cách tiếp cận và thành phần của nhóm đánh giá. Người điều hành thực hiện kiểm tra đầu vào và theo dõi quá trình làm lại, để kiểm soát chất lượng đầu vào và đầu ra của quá trình xem xét. Người điều hành cũng lên lịch cuộc họp, phổ biến tài liệu trước cuộc họp, đào tạo các thành viên khác trong nhóm, điều chỉnh cuộc họp, dẫn dắt các cuộc thảo luận và lưu trữ dữ liệu được thu thập.

# 97. Phân vùng tương đương (còn được gọi là lớp tương đương) là gì?
# 
Một phạm vi đầu vào hoặc đầu ra của các giá trị sao cho chỉ một giá trị trong phạm vi trở thành trường hợp kiểm thử.

# 98. Thủ tục quản lý cấu hình nên được thực hiện khi nào?

Trong quá trình lập kế hoạch kiểm thử.

# 99. Một loại kiểm tra chức năng, điều tra các chức năng liên quan đến việc phát hiện các mối đe dọa, chẳng hạn như vi rút từ người ngoài độc hại ?

Kiểm tra bảo mật

# 100. Kiểm thử mà tuân theo mục tiêu của kiểm thử , với khối lượng công việc khác nhau để đo lường và đánh giá các hành vi hiệu suất và khả năng mục tiêu và kiểm thử để tiếp tục hoạt động đúng theo khối lượng công việc khác nhau này?

Kiểm tra tải (Load Testing). 

# 101. Hoạt động kiểm tra được thực hiện để phát hiện các khiếm khuyết giao diện và trong sự tương tác giữa các thành phần tích hợp là?

Kiểm tra mức độ tích hợp

# 102. Kiểm thử (hộp trắng) kiểm tra kỹ thuật kết cấu dựa trên ?

Các kỹ thuật kiểm thử dựa trên cấu trúc (cũng là động chứ không phải tĩnh) sử dụng cấu trúc bên trong của phần mềm để thực hiện các trường hợp kiểm thử. Được gọi là các kỹ thuật 'hộp trắng' hoặc 'hộp thủy tinh' (ngụ ý bạn có thể nhìn vào hệ thống) vì chúng yêu cầu kiến ​​thức về cách thức triển khai phần mềm, nghĩa là cách thức hoạt động của phần mềm. Ví dụ, một kỹ thuật cấu trúc có thể quan tâm đến việc thực hiện các vòng lặp trong phần mềm. trường hợp kiểm thử khác nhau có thể được bắt nguồn để thực hiện vòng lặp một lần, hai lần, và nhiều lần. Điều này có thể được thực hiện bất kể chức năng của phần mềm.

# 103. Khi nào nên thực hiện "Kiểm thử hồi quy"?

Sau khi phần mềm đã thay đổi hoặc khi môi trường thay đổi, nên thực hiện kiểm thử hồi quy.

# 104. Kiểm thử tiêu cực và tích cực là gì?

Một Kiểm thử âm tính là khi bạn đặt một đầu vào không hợp lệ và nhận lỗi. Còn kiểm thử tích cực là khi bạn đưa vào một đầu vào hợp lệ và mong muốn một số hành động sẽ được hoàn thành theo quy định.

# 105. Mục đích của tiêu chí hoàn thành kiểm thử là gì?

Mục đích là để xác định khi nào phải dừng kiểm thử. 

# 106. Phân tích tĩnh mà có thể KHÔNG được tìm thấy là gì ?

Ví dụ rò rỉ bộ nhớ.

# 107. Sự khác biệt giữa tái kiểm thử và kiểm thử hồi quy là gì?

Kiểm thử lại đảm bảo lỗi ban đầu đã được gỡ bỏ; kiểm thử hồi quy sẽ cho tác dụng  bất ngờ.

# 108. Các kỹ thuật kiểm thử dựa trên kinh nghiệm gì?

Trong các kỹ thuật dựa trên kinh nghiệm, kiến ​​thức, kỹ năng và kiến ​​thức nền tảng của mọi người là nhân tố chính cho các điều kiện kiểm thử và các trường hợp kiểm thử. Kinh nghiệm của cả kỹ thuật viên và kiểm thử viên là rất quan trọng, vì họ mang đến những quan điểm khác nhau cho quá trình phân tích và thiết kế kiểm thử. Do kinh nghiệm trước đây với các hệ thống tương tự, họ có thể có cái nhìn sâu sắc về những gì sai sót, vấn đề hữu ích để kiểm thử.

109. Loại xét đòi hỏi xuất nhập cảnh tiêu chuẩn chính thức, bao gồm các chỉ số?

Kiểm tra

# 110. Đánh giá hoặc kiểm tra có thể được coi là một phần của kiểm thử không?

Đúng, bởi vì cả hai giúp phát hiện lỗi và cải thiện chất lượng.

# 111. Đầu vào năm sinh của một trường từ 1900 đến 2004, các giá trị biên để kiểm tra trường này là gì?

1899,1900,2004,2005

# 112. Công cụ nào sau đây sẽ tham gia vào quá trình tự động hóa kiểm thử hồi quy?
# 
# a. kiểm thử dữ liệu b. Kiểm thử ranh giới c. Chụp / Phát lại d. So sánh đầu ra.

d. So sánh đầu ra.

# 113. Để kiểm tra một chức năng, người kiểm thử cần phải sử dụng  gì để lời gọi hàm này sẽ được kiểm tra và truyền dữ liệu kiểm tra.

Driver

# 114. Lý do chính tại sao các nhà phát triển gặp khó khăn trong kiểm tra công việc của mình là gì?

Thiếu khách quan

# 115. "Bao nhiêu kiểm thử là đủ?"

Câu trả lời phụ thuộc vào rủi ro trong ngành, hợp đồng và yêu cầu đặc biệt.

# 116. Khi nào nên dừng kiểm thử?

Nó phụ thuộc vào các rủi ro hệ thống đang được kiểm thử. Có một số tiêu chí dựa vào đó bạn có thể biết thời điểm dừng kiểm thử.

* Thời hạn (Kiểm thử, Phát hành)
* Ngân sách kiểm thử đã cạn kiệt
* Tỷ lệ lỗi giảm xuống dưới một mức nhất định
* Các trường hợp kiểm thử đã hoàn thành với tỷ lệ phần trăm nhất định được thông qua
* Thời gian Alpha hoặc beta để kết thúc kiểm thử
* Bảo đảm của mã, chức năng hoặc yêu cầu được đáp ứng đến một điểm cụ thể

# 117. Mục đích nào sau đây là mục đích chính của chiến lược tích hợp nhằm kiểm thử tích hợp trong quy mô nhỏ?

Mục đích chính của chiến lược tích hợp là chỉ định các mô-đun sẽ kết hợp khi nào và bao nhiêu cùng một lúc.

# 118. Kiểm thử bán ngẫu nhiên là gì?

Kiểm thử bán ngẫu nhiên thực chất là thực hiện các trường hợp kiểm thử ngẫu nhiên và thực hiện phân vùng tương đương với các trường hợp kiểm thử đó, nó sẽ loại bỏ các trường hợp kiểm thử dư thừa, do đó cung cấp các trường hợp kiểm thử bán ngẫu nhiên.

# 119. Cho mã sau đây, tuyên bố nào là đúng về số lượng tối thiểu các trường hợp kiểm thử cần thiết cho full statement và branch coverage?

```
Read p

Read q

IF p+q> 100

THEN Print "Large"

ENDIF

IF p > 50

THEN Print "p Large"

ENDIF
```

1  full statement và 2 branch coverage.

# 120. Đánh giá nào thường được sử dụng để đánh giá một sản phẩm nhằm xác định sự phù hợp của nó đối với mục đích sử dụng và nhằm xác định sự khác biệt?

Đánh giá kỹ thuật.

# Tài liệu tham khảo

https://www.guru99.com/software-testing-interview-questions.html