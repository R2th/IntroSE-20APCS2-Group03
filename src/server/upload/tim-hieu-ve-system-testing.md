# 1. System Testing (Kiểm thử hệ thống) là gì?
- System Testing là một cấp độ kiểm thử để xác nhận sản phẩm phần mềm đã được tích hợp hoàn chỉnh và đầy đủ. Mục đích của System Testing là đánh giá các thông số kỹ thuật của hệ thống từ đầu đến cuối. Thông thường, phần mềm chỉ là một yếu tố trong một hệ thống máy tính  nhưng đến cuối cùng nó vẫn cần phải được tương tác với các hệ thống phần mềm/phần cứng khác. System Testing trên thực tế là một loạt các thử nghiệm khác nhau với mục đích duy nhất là để toàn bộ hệ thống máy tính có thể hoạt động.
- System Testing thuộc danh mục Black Box Testing của kiểm thử phần mềm.
- White Box Testing là kiểm tra các hoạt động bên trong hoặc mã của ứng dụng phần mềm. Ngược lại, Black Box Testing hoặc System Testing thì khác hoàn toàn. System Testing liên quan đến hoạt động bên ngoài của phần mềm theo quan điểm của người dùng.

# 2. Bạn cần xác nhận điều gì trong System Testing?
- System Testing liên quan đến việc kiểm tra và theo dõi mã code của phần mềm. Kiểm tra các ứng dụng tích hợp đầy đủ bao gồm các thiết bị ngoại vi bên ngoài nhằm kiểm tra cách các thành phần tương tác với nhau và với toàn bộ hệ thống. Đây cũng được gọi là kịch bản thử nghiệm End to End.
- Xác minh và kiểm tra kỹ lưỡng từng input của ứng dụng để kiểm tra output mong muốn.
- Test trải nghiệm của người dùng với ứng dụng.
Đó là những mô tả rất cơ bản liên quan đến System Testing. Bạn cần tạo Test cases chi tiết để kiểm tra từng phần của ứng dụng khi nhìn từ bên ngoài mà không cần nhìn vào mã code thực tế.

Sơ đồ phân cấp kiểm thử phần mềm - Software Testing Hierarchy
![](https://images.viblo.asia/4f8ab44e-69ce-4d84-86cc-1ddbfb7afa22.png)

Như với hầu hết mọi quy trình kỹ thuật phần mềm, kiểm thử phần mềm cũng có một quy định để mọi việc được thực hiện theo thứ tự. Dưới đây là danh sách các danh mục kiểm thử phần mềm được sắp xếp theo thứ tự thời gian: 
- Unit test (Kiểm thử đơn vị) được thực hiện trên mỗi module hoặc mã code trong quá trình phát triển phần mềm. Kiểm thử đơn vị thường được thực hiện bởi lập trình viên.
- Integration testing (Kiểm thử tích hợp) được thực hiện trước, trong và sau khi tích hợp một module mới vào phần mềm chính. Điều này liên quan đến việc kiểm thử từng module code một cách riêng lẻ. Một phần của phần mềm có thể chứa những module mà được tạo bởi những lập trình viên khác nhau. Điều quan trọng là kiểm tra ảnh hưởng của từng module  trên toàn bộ chương trình phần mềm.
- System Testing được thực hiện bởi một tester chuyên nghiệp trên một sản phẩm phần mềm đã hoàn thiện trước khi đưa ra thị trường.
- Acceptance testing là thử nghiệm bản beta của sản phẩm và được thực hiện bởi End user thực tế.

# 3. Các loại System Testing:
Có khoảng hơn 50 loại System Testing. Dưới đây là các loại thử nghiệm hệ thống mà một công ty phát triển phần mềm lớn thường sử dụng:

1. Usability Testing: Kiểm tra khả năng sử dụng - chủ yếu tập trung vào việc người dùng dễ dàng sử dụng ứng dụng, linh hoạt trong việc xử lý các cách điều khiển và khả năng của hệ thống để đáp ứng các mục tiêu của phần mềm.
2. Load Testing: Kiểm tra khả năng load là cần thiết để biết rằng một giải pháp phần mềm sẽ thực hiện như thế nào trong trường hợp “loads” thực tế
3. Regression Testing: Kiểm tra hồi quy - bao gồm việc đảm bảo không có thay đổi nào được thực hiện trong quá trình phát triển đã gây ra lỗi mới. Việc này cũng đảm bảo không có lỗi cũ xuất hiện từ việc bổ sung các module phần mềm mới theo thời gian.
4. Recovery testing: Kiểm tra khôi phục - được thực hiện để chứng minh một giải pháp phần mềm là đáng tin cậy và có thể phục hồi thành công từ các sự cố có thể xảy ra.
5. Migration testing: Kiểm tra di chuyển - được thực hiện để đảm bảo rằng phần mềm có thể được chuyển từ hệ thống cũ sang hệ thống hiện tại mà không có bất kỳ vấn đề nào.
6. Functional Testing: Kiểm tra chức năng - Còn được gọi là kiểm tra tính đầy đủ chức năng, kiểm tra chức năng bao gồm cố gắng nghĩ về bất kỳ chức năng nào đó mà có thể bị thiếu. Người kiểm thử có thể lập danh sách các chức năng bổ sung mà sản phẩm có thể phải cải thiện trong quá trình kiểm tra chức năng.
7. Hardware/Software Testing: Kiểm thử phần cứng / phần mềm - Đây là khi tester tập trung sự chú ý của mình vào các tương tác giữa phần cứng và phần mềm trong quá trình kiểm tra hệ thống.

# 4. Những loại System Testing mà tester nên sử dụng:
Có hơn 50 loại thử System Testing. Các loại cụ thể được sử dụng bởi một tester phụ thuộc vào các điều kiện khác nhau:

- Tester làm việc cho ai - Đây là một yếu tố chính trong việc xác định các loại kiểm thử hệ thống mà tester sẽ sử dụng. Các phương pháp được sử dụng bởi các công ty lớn khác với các phương pháp được sử dụng bởi các công ty vừa và nhỏ.
- Khoảng thời gian phù hợp cho việc test - Khi có đủ thời gian thì tất cả 50 loại thử nghiệm đều có thể được sử dụng. Tuy nhiên điều đó là không thể, ta chỉ sử dụng các loại có liên quan và phù hợp nhất nhất cho dự án phần mềm.
- Trình độ của Tester - Các phương pháp testing đòi hỏi tester phải có trình độ và kinh nghiệm nhất định. Để sử dụng một số phần mềm liên quan, tester phải học cách sử dụng nó.
- Kiểm tra ngân sách - Chi phí là một yếu tố quan trọng không chỉ đối với các công ty nhỏ và các nhà phát triển phần mềm riêng lẻ mà nó cũng là vấn đề đối với các công ty lớn khi quyết định nên sử dụng phương pháp test phù hợp.

Tham khảo: https://www.guru99.com/system-testing.html