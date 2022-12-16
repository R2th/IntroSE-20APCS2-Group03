# 1.  Test design technique là gì ?
- Về cơ bản kỹ thuật thiết kế kiểm thử giúp chúng ta lựa chọn ra một bộ kiểm thử tốt từ tổng số các kiểm thử có thể có cho một hệ thống nhất định. Có nhiều loại kỹ thuật kiểm thử phần mềm khác nhau, mỗi loại có điểm mạnh và điểm yếu riêng.
- Ví dụ: một kỹ thuật khám phá các giới hạn trên và dưới của một phạm vi đầu vào duy nhất có nhiều khả năng tìm thấy lỗi giá trị biên hơn các lỗi liên quan đến việc kết hợp các đầu vào.
- Tương tự, thử nghiệm được thực hiện ở các giai đoạn khác nhau trong vòng đời phát triển phần mềm sẽ tìm ra các loại lỗi khác nhau, kiểm tra thành phần có nhiều khả năng tìm thấy lỗi logic mã hóa hơn lỗi thiết kế hệ thống.
# 2. Các loại kỹ thuật thiết kế kiểm thử 
 Có nhiều loại kỹ thuật thiết kế kiểm thử, tuy nhiên có 2 loại chính:

## 2.1. Static testing technique
- Kiểm thử tĩnh là loại kỹ thuật kiểm thử mà không thực thi mã nguồn hoặc không thực hiện chạy hệ thống phần mềm. Hiểu 1 cách đơn giản như kiểm tra, review các tài liệu đặc tả, tài liệu thiết kế, source code để tìm lỗi.
- Nó được thực hiện sớm trong vòng đời phát triển phần mềm và vì vậy nó được thực hiện trong quá trình xác minh.
- Hầu hết các kỹ thuật kiểm tra tĩnh có thể được sử dụng để kiểm tra bất kỳ hình thức tài liệu nào bao gồm mã nguồn, tài liệu thiết kế và mô hình, thông số chức năng và thông số kỹ thuật yêu cầu.
## 2.2. Dynamic testing technique
- Kỹ thuật kiểm thử động là loại kiểm thử xác nhận chức năng của ứng dụng khi code được thực thi / bằng cách thực thi code. Nói một cách đơn giản, kiểm tra động được thực hiện bằng cách thực sự sử dụng ứng dụng và xem liệu một chức năng có hoạt động theo cách nó được mong đợi hay không.
- Ví dụ như kiểm tra chức năng tạo tài khoản của hệ thống bằng cách nhập email và mật khẩu. Mật khẩu được yêu cầu mật khẩu mạnh ví dụ như dài 8 ký tự, cần phải có chữ in hoa và ít nhất một ký tự đặc biệt. Nếu người dùng nhập bất kỳ giá trị nào lệch khỏi các quy tắc này, ứng dụng sẽ cảnh báo hoặc từ chối. Ví dụ như chúng ta nhập 7 ký tự thì hệ thống sẽ báo lỗi không đăng ký được...
- Các loại kiểm thử động:
![](https://images.viblo.asia/b8795028-465e-4bc8-a5d7-5981740bd2de.png)

Kiểm thử động bao gồm 2 loại:
1. Whitebox testing (kiểm thử hộp trắng): là việc xem xét cách hoạt động bên trong của code. Đối với loại kiểm thử này, người kiểm thử cần có sự hiểu biết về code.
2. Blackbox testing (kiểm thử hộp đen): là việc kiểm tra chức năng của ứng dụng phần mềm có hoạt động đúng như mong đợi hay không.
- Có 2 loại kiểm thử hộp đen:
1. Functional testing (kiểm tra chức năng): Như chính tên gọi của nó, đây là loại thử nghiệm xác nhận chức năng của ứng dụng.
2. Non-Functional testing (kiểm tra phi chức năng): Kiểm tra phi chức năng bao gồm kiểm tra các khía cạnh như hiệu suất, phục hồi, kiểm tra khả năng tương thích,..
# 3. Làm thế nào để chọn ra kỹ thuật kiểm thử tốt nhất?
- Mỗi kỹ thuật sẽ có những ưu và nhược điểm nhất định. Ví dụ một trong những lợi ích của các kỹ thuật dựa trên cấu trúc (kiểm thử tĩnh) là họ có thể tìm ra các lỗi hoặc những thứ trong code đáng lẽ phải có. Tuy nhiên, nếu có các phần của spec thiếu trong code, chỉ các kỹ thuật dựa trên đặc tả (kiểm thử động)  mới tìm ra các lỗi thiếu spec này.
- Nếu có những thứ còn thiếu từ đặc tả yêu cầu và từ code, thì chỉ có các kỹ thuật dựa trên kinh nghiệm mới tìm thấy chúng.
- Do đó, mỗi kỹ thuật riêng lẻ là nhằm vào các loại lỗi cụ thể. Ví dụ, kiểm tra chuyển đổi trạng thái không có khả năng tìm thấy lỗi về các giá trị biên.
- Vì vậy, làm thế nào để chọn kỹ thuật kiểm tra nào là tốt nhất, quyết định sẽ dựa trên một số yếu tố, cả bên trong và bên ngoài.
- Các yếu tố bên trong ảnh hưởng đến quyết định sử dụng kỹ thuật nào là:
1. Các mô hình được sử dụng để phát triển hệ thống vì các kỹ thuật kiểm tra dựa trên các mô hình được sử dụng để phát triển hệ thống đó, ở một mức độ nào đó sẽ chi phối các kỹ thuật kiểm tra nào có thể được sử dụng. Ví dụ: nếu đặc tả có chứa sơ đồ chuyển trạng thái, kiểm tra chuyển trạng thái sẽ là một kỹ thuật tốt để sử dụng.
2. Dựa vào kiến thức và kinh nghiệm của người kiểm thử 
3. Loại lỗi tương tự - Kiến thức về loại lỗi tương tự sẽ rất hữu ích trong việc lựa chọn các kỹ thuật kiểm tra (vì mỗi kỹ thuật đều tốt trong việc tìm ra một loại lỗi cụ thể). Kiến thức này có thể có được thông qua kinh nghiệm thử nghiệm phiên bản trước của hệ thống và các cấp độ thử nghiệm trước đó trên phiên bản hiện tại.
4. Mục đích kiểm thử: Nếu mục tiêu thử nghiệm chỉ đơn giản là để có được sự tin tưởng rằng phần mềm sẽ đối phó với các task hoạt động điển hình thì việc sử dụng các case sẽ là cách tiếp cận hợp lý. Nếu mục tiêu là để thử nghiệm rất kỹ lưỡng thì nên chọn các kỹ thuật chi tiết và chặt chẽ hơn (bao gồm cả các kỹ thuật dựa trên cấu trúc).
5. Tài liệu - Có hay không tài liệu (ví dụ: một đặc tả yêu cầu) tồn tại và việc nó có được cập nhật hay không sẽ ảnh hưởng đến việc lựa chọn các kỹ thuật kiểm tra. Nội dung và phong cách của tài liệu cũng sẽ ảnh hưởng đến việc lựa chọn các kỹ thuật (ví dụ: nếu các bảng quyết định hoặc biểu đồ trạng thái đã được sử dụng thì nên sử dụng các kỹ thuật kiểm tra liên quan).
6. Tùy thuộc vào mô hình vòng đời phát triển phần mềm được sử dụng.
- Các yếu tố bên ngoài ảnh hưởng đến quyết định sử dụng kỹ thuật nào là:
1. Đánh giá rủi ro - Rủi ro càng lớn (ví dụ: các hệ thống quan trọng về an toàn), nhu cầu kiểm tra kỹ lưỡng và chính thức hơn càng lớn. Rủi ro thương mại có thể bị ảnh hưởng bởi các vấn đề chất lượng (vì vậy thử nghiệm kỹ lưỡng hơn sẽ phù hợp) hoặc bởi các vấn đề theo thời gian trên thị trường (vì vậy thử nghiệm thăm dò sẽ là lựa chọn phù hợp hơn).
2. Yêu cầu của khách hàng và hợp đồng: Đôi khi các hợp đồng sẽ chỉ định các kỹ thuật kiểm tra cụ thể sẽ sử dụng.
3. Loại hệ thống được sử dụng - Loại hệ thống (ví dụ: nhúng, đồ họa, tài chính, v.v.) sẽ ảnh hưởng đến việc lựa chọn các kỹ thuật. Ví dụ, một ứng dụng tài chính liên quan đến tính toán nhiều sẽ được sử dụng kỹ thuật phân tích giá trị biên nhiều hơn và có ích hơn.
4. Yêu cầu quy định - Một số ngành công nghiệp có các tiêu chuẩn hoặc hướng dẫn quy định chi phối các kỹ thuật kiểm tra được sử dụng. Ví dụ, ngành công nghiệp máy bay yêu cầu sử dụng phân vùng tương đương, phân tích giá trị biên và thử nghiệm chuyển đổi trạng thái cho các hệ thống toàn vẹn cao cùng với tuyên bố, quyết định hoặc điều chỉnh quyết định điều kiện tùy thuộc vào mức độ toàn vẹn của phần mềm.
5. Thời gian và ngân sách của dự án: Cuối cùng, có bao nhiêu thời gian có sẵn sẽ luôn ảnh hưởng đến việc lựa chọn các kỹ thuật kiểm tra. Khi có nhiều thời gian hơn, chúng ta có thể chọn thêm các kỹ thuật và khi thời gian bị hạn chế nghiêm trọng, chúng ta sẽ giới hạn ở những người có kinh nghiệm mà chúng ta biết để giúp chúng ta tìm ra những lỗi quan trọng nhất.

# Kết Luận
Trên đây là chia sẻ của mình về test design technique và cách để chọn ra test design technique phù hợp với dự án mà bạn đang làm. Mong những chia sẻ trên có thể giúp ích cho mọi người.

Nguồn: 
http://tryqa.com/how-to-choose-that-which-testing-technique-is-best/

http://tryqa.com/what-are-the-categories-of-test-design-techniques/