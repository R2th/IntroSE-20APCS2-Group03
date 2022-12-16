Người thử nghiệm và nhà phát triển (Tester và Dev) thường có những suy nghĩ khác nhau.  Thông thường , 1 anh Dev thường nghĩ: Làm thế nào tôi có thể tạo ra ứng dụng?  Trong khi đó Quan điểm của Tester cũng như Quan điểm của người dùng là: Làm thế nào tôi có thể phá vỡ ứng dụng?  Nhưng chúng ta chỉ có thể đạt được kết quả mong muốn khi cả dev và test cùng bắt tay nhau.

Trong bài viết này, chúng tôi sẽ thảo luận về các quan điểm khác nhau của Dev và Test và cách họ có thể làm việc cùng nhau để đạt được hiệu quả và thành công.


### Mindset của Dev và Tester

Tư duy là cách chúng ta xử lý tình huống, cách chúng ta giải quyết những gì đang xảy ra và những gì chúng ta nên làm. Những người khác nhau xung quanh chúng ta có suy nghĩ khác nhau. Tương tự như vậy, các dev và tester cũng có cách nghĩ khác. Thông thường dev sẽ hỏi: Tôi cần xây dựng cái gì, tôi nên làm thế nào? Tester sẽ hỏi: Điều gì có thể sai? Tôi có thể làm gì để phá vỡ ứng dụng hoặc tìm ra điểm yếu?

Bằng cách nói, 'Làm thế nào tôi có thể phá vỡ ứng dụng? Không có nghĩa là phương châm của Tester là làm hỏng công việc được thực hiện bởi các dev . Điều đó có nghĩa là Tester nên đặt mình vào vị trí của khách hàng và kiểm tra ứng dụng cho tất cả các tình huống có thể xảy ra và đảm bảo rằng ứng dụng không bị hỏng khi ở trong môi trường production.

![](https://images.viblo.asia/c44092af-07f6-4c68-88f2-fd2cf2cb8604.jpg)

### Quan điểm của dev và tester ở các giai đoạn khác nhau của Vòng đời phát triển phần mềm (SDLC):


Vòng đời phát triển phần mềm (SDLC) đóng vai trò rất quan trọng trong bất kỳ sự phát triển ứng dụng phần mềm nào. Trước đây, kiểm thử phần mềm đã xảy ra trong giai đoạn phát triển cuối cùng. Tuy nhiên, việc sửa lỗi trong giai đoạn cuối thường diễn ra rất khó khăn và tốn kém. Do vậy hiện tại kiểm thử phần mềm xảy ra trong mọi giai đoạn của SDLC. Nó có nghĩa rằng thử nghiệm bắt đầu ngay từ giai đoạn yêu cầu. Cả người thử nghiệm và nhà phát triển đều trở thành một phần không thể thiếu trong quá trình phát triển ngay từ đầu.

Hãy để chúng tôi thảo luận và có được một ý tưởng ngắn gọn về sự tham gia của người thử nghiệm và nhà phát triển ở các giai đoạn khác nhau của SDLC:

1. Thu thập và phân tích yêu cầu: Việc chuẩn bị các tài liệu yêu cầu diễn ra trong giai đoạn này, như đã nêu của khách hàng.

- Vai trò của dev : Sau khi nhận được tài liệu yêu cầu, họ sẽ phân tích các yêu cầu và bắt đầu nghiên cứu công nghệ.
- Vai trò của Tester : Sau khi phân tích tài liệu yêu cầu, nhóm thử nghiệm có thể hỏi thêm về những yêu cầu . Tester cũng có thể tìm thấy khiếm khuyết yêu cầu. Nó tiết kiệm thời gian và tiền bạc nếu được phát hiện và cố định ở giai đoạn này.

2. Thiết kế hệ thống: Trong giai đoạn này, cấu trúc , giao diện, mô-đun và dữ liệu cho một hệ thống được xác định để đáp ứng các yêu cầu đã chỉ định.

- Vai trò của nhà dev : Việc chuyển đổi các yêu cầu được xác định trong giai đoạn phân tích yêu cầu thành tài liệu thiết kế hệ thống xảy ra ở đây. Tài liệu này mô tả chính xác thiết kế hệ thống. Ngoài ra, nó hoạt động như một đầu vào cho sự phát triển của hệ thống trong giai đoạn tiếp theo. Dựa trên các thông số kỹ thuật chi tiết này, các nhà phát triển viết mã cho phần mềm.
- Vai trò của Tester: Từ những người thử nghiệm, từ sự hiểu biết và tư duy sáng tạo của họ, phân tích tất cả các kịch bản có thể có cho tất cả các tính năng mới, tích hợp...Chuẩn bị các kịch bản thử nghiệm & dữ liệu thử nghiệm xảy ra để đảm bảo thử nghiệm ứng dụng trơn tru. Đối với điều này, họ tạo ra một chiến lược thử nghiệm, kế hoạch thử nghiệm tích hợp, trường hợp thử nghiệm, danh sách kiểm tra và dữ liệu thử nghiệm.
 

3. Giai đoạn Coding : Giai đoạn coding còn được gọi là giai đoạn thực hiện hay phát triển. Nó liên quan đến sự phát triển của sản phẩm thực tế.  Dev viết code và sau đó kiểm tra nó liên tục và tăng dần để đảm bảo rằng các thành phần khác nhau làm việc cùng nhau. Đây là giai đoạn tốn nhiều thời gian nhất của quy trình SDLC.

- Vai trò của dev : Sau khi giai đoạn thiết kế hệ thống kết thúc, giai đoạn tiếp theo là coding . Trong giai đoạn này, các nhà phát triển bắt đầu xây dựng toàn bộ hệ thống bằng cách viết code bằng ngôn ngữ lập trình đã chọn. Trong giai đoạn coding , việc phân chia task thành các đơn vị hoặc mô-đun diễn ra và sau đó, nó được assign cho từng dev. 
- Vai trò Tester : Tron giai đoạn này  , function test  sẽ được thực hiện . Tester sẽ test ngay sau khi dev hoàn thành việc coding cho từng mô đum.  Ở giai đoạn này, tester sẽ kiểm tra từng thành phần và cũng tiến hành kiểm tra tích hợp thành phần. Do đó, Tester cần hợp tác chặt chẽ với các dev để làm cho giai đoạn này thành công.
 

4. Kiểm tra hệ thống: Sau khi phần mềm hoàn tất và được triển khai trong môi trường thử nghiệm, nhóm Tester bắt đầu kiểm tra chức năng của toàn bộ hệ thống. Đó là để đảm bảo rằng toàn bộ ứng dụng hoạt động theo yêu cầu của khách hàng.

- Vai trò của dev :  Tester tìm ra bugs và feedback lại cho các dev . Dev tiếp nhận các ticket bugs và check lại cũng như sửa lỗi và gửi lại cho nhóm Tester để kiểm tra lại. Quá trình này tiếp tục cho đến khi phần mềm không có lỗi, ổn định và hoạt động & phù hợp với Requirement 
- Vai trò của Tester : Trong giai đoạn này, Tester thực hiện các trường hợp kiểm tra từ đầu đến cuối và xác minh mọi khía cạnh của hệ thống. Ngoài chức năng mong muốn, họ cũng kiểm tra hệ thống từ góc độ người dùng. Vì vậy, những Tester sử dụng tư duy sáng tạo của họ và khám phá từng kịch bản có thể. Thử nghiệm tích hợp hệ thống, bao gồm tích hợp với các hệ thống của bên thứ ba, cũng xảy ra ở giai đoạn này.
 

5. Giai đoạn bảo trì: Giai đoạn bảo trì bắt đầu khi quá trình triển khai hệ thống đến sản xuất và khách hàng bắt đầu sử dụng sản phẩm. Giai đoạn này bao gồm các hỗ trợ và sửa lỗi sau triển khai.

- Vai trò của dev : Trong giai đoạn này, nhà phát triển thực hiện ba hoạt động sau:
      - Sửa lỗi:     Nhà phát triển sửa các lỗi được báo cáo bởi khách hàng.
      - Cập nhật: Họ cập nhật ứng dụng lên các phiên bản mới nhất của phần mềm.
      - Cải tiến:     Nhà phát triển cũng thêm một số tính năng mới vào phần mềm hiện có dựa trên phản hồi của khách hàng.
- Vai trò Tester : Khi dev  hoàn thành công việc của mình, Tester thử lại ứng dụng. Tester đảm bảo rằng hệ thống hoạt động chính xác sau khi thay đổi mã hoặc chức năng nâng cao. Tester cũng chịu trách nhiệm thực hiện kiểm tra hồi quy để đảm bảo chức năng hiện có không bị phá vỡ bởi những thay đổi mới nhất.

Do đó, chúng tôi thấy rằng các nhà phát triển và người thử nghiệm tương tác rất nhiều trong mỗi giai đoạn của vòng đời phát triển phần mềm. Do đó, họ phải làm việc cùng nhau như một nhóm duy nhất để đảm bảo dự án thành công.

### So sánh các Mindsets Tester và Dev

Tạo ra các sản phẩm phần mềm là một nỗ lực phức tạp đòi hỏi sự hợp tác của những người có kỹ năng, hiểu biết và tư duy khác nhau. Các nhà phát triển và người thử nghiệm phải làm việc cùng nhau để tạo ra và cung cấp các sản phẩm chất lượng. Những người này có thể có quan điểm, nhận thức và hiểu biết khác nhau. Để hiểu sự khác biệt trong cách tiếp cận và quan điểm của họ, chúng ta hãy xem xét các điểm sau đây-

- So sánh cách tiếp cận của dev và test :  Việc thử nghiệm và xem xét các ứng dụng khác với phân tích và phát triển của chúng. Dev, trong khi tạo hoặc phát triển các ứng dụng, đang làm việc tích cực để tạo ra sản phẩm theo thông số kỹ thuật của người dùng; liên tục giải quyết các vấn đề trong quá trình phát triển. Tuy nhiên, trong quá trình kiểm tra hoặc xem xét sản phẩm, Tester thường sẽ tìm ra defects và bugs trong sản phẩm. Do đó, xây dựng phần mềm đòi hỏi một tư duy khác để kiểm tra phần mềm.

- Dev đóng vai trò của Tester : Mặc dù, Dev và Tester  là hai vai trò riêng biệt; điều đó không có nghĩa là vai trò của họ không thể đảo ngược. Nói cách khác, Tester có thể là dev và ngược lại . Các dev luôn kiểm tra thành phần mà họ xây dựng trước khi đưa nó cho bất kỳ ai. Quá trình này được gọi là Unit Test. Tuy nhiên, tất cả chúng ta đều biết rằng rất khó để tìm ra sai lầm của chính mình. Vì vậy, dev gửi các ứng dụng để test , các chuyên gia hoặc Tester chuyên nghiệp cho phép kiểm tra độc lập hệ thống.  Mức độ độc lập này tránh được sự thiên vị của chính người tạo và thường hiệu quả hơn trong việc tìm ra  defects và bugs.

- Việc communicate về  defects giữa dev và test : Trách nhiệm của tester  là kiểm tra phần mềm theo các yêu cầu đã chỉ định và báo cáo các lỗi. Nhưng dev xây dựng ứng dụng có thể phản ứng bảo thủ và coi khiếm khuyết được báo cáo này là một sự phán xét cá nhân. Do đó, Tester cần hết sức cẩn thận khi hành động hoặc báo cáo lỗi / sai sót cho dev tránh mâu thuẫn không đáng có xảy ra.

Tóm lại, đánh giá cao sự khác biệt là điều cần thiết cho các nhóm sản xuất. Nhưng các cách tiếp cận khác nhau giúp tìm ra giải pháp và dẫn đến việc cung cấp một sản phẩm hoạt động theo cách tốt nhất. Tester và dev  cùng nhau tạo thành một nhóm có khả năng. Trách nhiệm của họ là đảm bảo sản phẩm tốt nhất. Và, chỉ có thể nếu cả hai cùng bắt tay với sự hiểu biết đúng đắn và phản hồi tích cực.

Refer link : 
https://www.toolsqa.com/software-testing/istqb/testers-and-developers-mindsets/