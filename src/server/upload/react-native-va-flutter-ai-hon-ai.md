# Overview
Hiện nay, với ngành công nghiệp phát triển phần mềm di động nói riêng đang vô cùng phát triển, cởi mở và rất nhiều tiềm năng, cơ hội cho các bạn developer. Đặc biệt hơn, việc xây dựng (build) các ứng dụng di động trên đa nền tảng đang là xu hướng ngày nay. Với sự ra đời của các framework có thể xây dựng các ứng dụng native mà không cần sử dụng ngôn ngữ thuần cho từng nền tảng. Ví dụ: Swift cho iOS hoặc Java cho Android.

React Native và Flutter là hai framework phát triển di động đa nền tảng phổ biến nhất đang được sử dụng để xây dựng hàng ngàn ứng dụng di động hiện nay. Nếu bạn phải chọn React Native vs Flutter thì nên chọn cái nào?

Thật khó để có câu trả lời đúng cho câu hỏi này. Câu trả lời cho câu hỏi này phụ thuộc vào rất nhiều yếu tố. Tuy nhiên, cả React Native và Flutter đều là những ứng cử viên mạnh mẽ với những ưu và nhược điểm riêng.
Hãy cùng mình khám phá React Native vs Flutter dựa trên 1 vài tiêu chí nhé :D

# So sánh
## 1. Language
**React Native:**

![](https://images.viblo.asia/b8571e42-421e-4bca-92c5-a5754f1124b4.png)

React Native được viết hoàn toàn bằng JavaScript sử dụng React. Đây là một lợi ích rất lớn cho React Native vì JavaScript luôn được xếp hạng là một trong những ngôn ngữ lập trình phổ biến và được sử dụng nhiều nhất trên thế giới. Tìm kiếm các nhà phát triển để viết code bằng JavaScript rất dễ dàng và do đó việc học React Native khá dễ dàng đối với bất kỳ nhà phát triển JavaScript nào.

**Flutter:**

![](https://images.viblo.asia/e201665d-1164-49a9-b9b3-7f572cb614db.png)

Flutter được viết bằng một ngôn ngữ gọi là Dart. Mặc dù, Dart tương đối dễ và là một ngôn ngữ lập trình tốt, nhưng nó không có sự phổ biến như JavaScript. Một nhà phát triển Flutter, sẽ cần phải học Dart. Thông thường, các nhà phát triển có background C ++ / Java có thể liên quan đến Dart nhiều hơn là nhà phát triển JavaScript.
Tuy nhiên, theo ý kiến của mình thì Dart nó là một ngôn ngữ tương đối mới mẻ, sẽ hơi khó khăn 1 chút thôi. Chung kết lại React Native dành phần thắng.

**Winner: React Native**

## 2. Corporate Backing (Thế lực chống lưng)
**React Native:**

![](https://images.viblo.asia/fabf6539-e931-4773-8795-b5932e933d80.jpg)

React Native được hỗ trợ bởi Facebook và được Facebook open source vào năm 2015. Facebook có một đội ngũ kỹ sư chuyên dụng đang làm việc trên React Native và làm cho nó tốt hơn mỗi ngày. Do Facebook được đầu tư rất nhiều vào React Native, nhiều sản phẩm nội bộ của Facebook được mã hóa bằng React Native (Instagram, What's app..v.v...). Với sự tham gia mạnh mẽ của Facebook vào React Native, cho nên React Native đã giành được rất nhiều sự tin tưởng và phổ biến trong những năm qua.

**Flutter:**

![](https://images.viblo.asia/53f19779-69a5-460a-b2a9-3d5765924693.png)

Flutter là một framework tương đối mới khi so sánh với React Native. Nó được hỗ trợ bởi một người khổng lồ khác, đó là Google. Flutter là SDK open source của Google để tạo ra ứng dụng cho Android và iOS bằng cách sử dụng một single codebase. Google rất ủng hộ Flutter, giống như Facebook đang ủng hộ React Native. Cộng đồng Google được đầu tư để biến Flutter trở thành một trong những giải pháp tốt nhất hiện có để xây dựng các ứng dụng đa nền tảng.

Chung quy lại, với tiêu chí này thì cả React Native và Flutter có thể nói là kẻ tám lạng, người nửa cân. 

**Winner: React Native, Flutter**
## 3. What is Trending? (Xu thế)
Nếu bạn nhìn vào Khảo sát trên trang [StackOverflow năm 2019 gần đây](https://insights.stackoverflow.com/survey/2019#technology), chúng ta có thể biết được framework nào đang được thịnh hành ngày hôm nay. Cuộc khảo sát đã hỏi các nhà phát triển về các framework yêu thích nhất của họ.

![](https://images.viblo.asia/9485dd0e-cba4-4250-b142-1bea80024546.png)
Các bạn có thể thấy:
> Flutter xếp hạng cao hơn với 75,4% và React Native cũng thực hiện việc cắt giảm với 62,5% trong số các framework được yêu thích nhất.

Tuy nhiên, Có một điều cần lưu ý ở đây là React Native đã xuất hiện từ nhiều năm nay và một số người đã làm việc với nó. Trong khi đó, Flutter chỉ mới một tuổi và bắt đầu trở nên phổ biến hơn. Chúng ta sẽ phải thực hiện so sánh tương tự vào năm tới để xem họ so sánh như thế nào.
Dựa trên các xu hướng hiện tại, chúng ta có thể dành phần chiến thắng cho Flutter.

**Winner: Flutter**

## 4. Performance (Hiệu năng)
Có một quan niệm phổ biến rằng Flutter hoạt động tốt hơn React Native. Điều này có thể là do Flutter không có cầu nối JavaScript như React Native để tương tác với các thành phần gốc (native component). Dart code được biên dịch thành mã máy (machine code), do đó loại bỏ việc kết nối bắc cầu qua JavaScript. Điều này cải thiện hiệu suất so với React Native sử dụng JavaScript.
Tuy nhiên cũng không có nhiều hồ sơ để so sánh. Dựa vào thời gian thực tế hiện tại, mình thấy Flutter là vượt trội hơn.

**Winner: Flutter**

## 5. Adoption
**React Native:**
Nó được áp dụng rộng rãi và sự phổ biến của nó cũng là do sự thành công của React. Các nhà phát triển React có thể dễ dàng phát triển các ứng dụng di động React Native. Ngày nay, các sản phẩm như Facebook, Instagram, Uber Eats, Tesla, Bloomberg và nhiều sản phẩm khác sử dụng React Native cho các ứng dụng di động của họ.

**Flutter:**
Với việc Google là người ủng hộ Flutter, năm nay nó cũng đã thu hút được khá nhiều sự chú ý.
Người khổng lồ mua sắm trực tuyến của Alibaba, đã áp dụng Flutter cho một trong những ứng dụng di động của họ. Google Ads và Hamilton music cũng được phát triển bằng Flutter. Nhưng ngoài những thứ này, không có nhiều ứng dụng trong cửa hàng ứng dụng (play store) được phát triển với Flutter. Vẫn còn rất ít các ứng dụng được phát triển bằng Flutter
Và một lần nữa, chúng ta cần phải truy cập lại vào năm tới để xem có bao nhiêu sản phẩm đã sử dụng Flutter nhé :D

**Winner: React Native**

## 6. Job Prospects (Triển vọng nghề nghiệp)
React Native đã xuất hiện được một thời gian, sử dụng React và JavaScript (hai tùy chọn phổ biến) dẫn đến triển vọng công việc tốt hơn.
Khảo sát StackOverflow tương tự năm 2019, cũng chỉ ra rằng React Native được mong muốn hơn so với Flutter. Điều này cho chúng ta biết rằng có nhiều công việc React Native ngoài thị trường hơn so với Flutter.

![](https://images.viblo.asia/153e4acb-493e-4b9a-b8a0-304aad223a20.png)

Có lẽ không thể đi đến kết luận nhanh về Flutter dựa trên các công việc hiện có. Flutter vẫn còn mới và sắp ra mắt, và vài năm nữa có thể có nhu cầu cho các nhà phát triển Flutter. Nhưng cho đến ngày nay, có rất nhiều công việc React Native khi so sánh với các công việc Flutter trên thị trường. Điều này là do các nhà phát triển React Native cũng là các nhà phát triển React và React tình cờ là framework công tác front end phổ biến nhất hiện có. 
> React Native xếp hạng cao hơn với 13,1% và Flutter với 6,7% trong số các Framework mong muốn nhất.

Vì vậy, học React Native có thể có lợi hơn khi bạn tìm kiếm cơ hội việc làm. 

**Winner: React Native**

# Conclusion
Mặc dù, hiện tại React Native có một số điểm mạnh, Flutter cũng là một ứng cử viên mới nổi và mình chắc chắn rằng nó sẽ được nhiều người đón nhận hơn trong những ngày tới.
Nếu bạn là một nhà phát triển C ++ hoặc Java nhiều hơn, bạn có thể thích Dart và do đó thích Flutter. 
Hãy luôn thích nghi với xu thế hiện tại và khám phá công nghệ bất cứ khi nào các bạn nhé. :D

Thanks for reading.

Tài liệu tham khảo:
https://medium.com/@adhithiravi/react-native-vs-flutter-what-are-the-differences-b6dc892f0d34