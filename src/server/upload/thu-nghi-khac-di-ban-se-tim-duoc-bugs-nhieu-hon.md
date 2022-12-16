Bài viết mang tính chất tham khảo ,giúp các bạn có thêm những cái nhìn mới trong việc detect bug . Nếu có phần nào hơi không đúng. Mong các bạn bỏ quá nhé ^^

Thực tế là có rất nhiều cách để detect bugs trong các ứng dụng phần mềm và nó còn phụ thuộc vào khả năng và trình độ của mỗi người.  Tuy nhiên ,kĩ năng và học thức có thể học hỏi được. Về cơ bản thì bạn cần : hiểu toàn bộ ứng dụng, chuẩn bị tốt bộ Testcase, tạo đủ data test, apply monkey testing, thực hiện test lặp lại cùng với các môi trường khác nhau... 

Còn ngay sau đây là một số suggest mới mà mình nghĩ sẽ có ích thêm cho các bạn ngoài những cách tìm bugs thông thường :D

# Tip number one: Tấn công nhanh 

Nếu bạn có ít hoặc chưa có kiến thức trước về một hệ thống, bạn không biết được các yêu cầu của nó, vì vậy các formal technique  để chuyển đổi các requirements  thành tests sẽ khó có thể tìm ra bugs được vì đơn giản hệ thống đã chạy OK theo luồng ấy rùi . Thay vào đó, bạn có thể tấn công hệ thống,  tìm cách đưa nó vào các trạng thái hoảng loạn bằng cách thực hiện  những bước không đúng. 

Nếu một trường là bắt buộc, hãy thử để trống nó . Nếu giao diện người dùng đi theo một workflow , hãy thử đi một  đường khác. Nếu trường đầu vào rõ ràng là một số, hãy thử nhập một từ hoặc thử nhập một số quá lớn để hệ thống xử lý.  Nếu bạn phải sử dụng số, hãy tìm hiểu xem hệ thống có mong đợi toàn bộ số (số nguyên) hay không và sử dụng số thập phân thay thế. Nếu bạn phải sử dụng các từ, hãy thử sử dụng ứng dụng CharMap trong Windows (Bắt đầu> Chạy> charmap) và chọn một số ký tự đặc biệt nằm ngoài các ký tự chuẩn được truy cập trực tiếp bằng các phím trên bàn phím của bạn... vân vân và mây mây

# Tip 2: Điều kiện tương đương và giá trị biên 

Khi bạn biết một chút về những gì phần mềm nên làm, bạn sẽ khám phá các rules về hành vi và kịch bản cho nó /  
Thử Ví dụ thế này nhé : một ứng dụng đánh giá các mức phí lái xe cho bảo hiểm xe hơi.  Vậy yêu cầu sẽ phải chia ra kiểu như là :  các tài xế trong độ tuổi từ 16 đến 18 phải trả một mức nhất định , các tài xế từ 19 đến 25 phải trả một mức giá khác...

# Tip 3: Nhớ về lỗi hay thường gặp 

Hãy nhớ khi trang Web còn mới  và bạn đã cố gắng test nó bằng cách đặt mua một cuốn sách hoặc một cái gì đó từ một trang web, nhưng dường như không có gì xảy ra?  Bạn bấm vào nút đặt hàng một lần nữa. Nếu bạn may mắn, hai cuốn sách xuất hiện trong giỏ hàng của bạn  .Nếu bạn không may mắn, chúng sẽ xuất hiện trước cửa nhà bạn =))).
Lỗi đó là một trong những vấn đề khá phổ biến, một vấn đề đã xảy ra rất nhiều và chúng ta đã học cách test nó.  Cuối cùng thì các lập trình viên đã nhận thức được và cải thiện code của họ, và cách để tìm ra bugs này sẽ trở nên kém hiệu quả hơn vào những lần test sau , nhưng dù sao nó vẫn chỉ ra một điều:  Các nền tảng thường có cùng một lỗi xuất hiện lặp đi lặp lại. Và hãy thử các lỗi đã gặp ở nền tảng trước đó; biết đâu bạn sẽ tìm ra được lỗi :D

# Tip 4: Dựa vào sơ đồ chuyển trạng thái

Hãy tưởng tượng rằng người dùng của bạn đang ở đâu đó trong hệ thống của bạn, hãy nói, màn hình đăng nhập. Anh ta có thể thực hiện một hành động dẫn đến một nơi khác, có lẽ trang chủ của anh ấy, hoặc có lẽ là một màn hình lỗi. Nếu chúng ta  liệt kê ra tất cả các màn và các liên kết giữa chúng, chúng ta có thể đưa ra một chỉ dẫn luồng cho toàn ứng dụng, và sau đó chúng ta có thể xây dựng các bài kiểm tra để thực hiện mọi chuyển đổi trong toàn bộ ứng dụng. Hay đấy. Và lỗi di chuyển màn hình này rất dễ gặp nha. Nhất là các hệ thống maintain ấy . cực kỳ hay gặp luôn

# Tip 5: Nghĩ về các use cases và thử nghiệm Opera Opera

Các use cases và kịch bản test thường tập trung vào vấn đề rằng : vai trò của phần mềm là để cho phép con người làm điều gì đó.  Sự thay đổi này đã cho chúng ta đưa ra các ví dụ về những gì con người thực sự sẽ cố gắng thực hiện, thay vì nghĩ phần mềm là một bộ sưu tập các tính năng, chẳng hạn như "Open" và "Save ". 
Các trường hợp sử dụng hiệu quả bằng văn bản của Alistair Cockburn mô tả phương pháp một cách chi tiết. Tuy vậy  bạn có thể hiểu đơn giản rằng : hãy nghĩ  ra các ý tưởng  để trả lời câu hỏi :  What, where,when, why, who and How  vào hành vi của người dùng hệ thống trong phần mô tả trước khi phần mềm được xây dựng. 

# Tip 6: Coverage dựa trên code

Cái này có liên quan đến code nên nếu bạn là người đọc hiểu được code là một lợi thế. Còn không hãy quên nó đi :D 
Hãy tưởng tượng rằng bạn có một máy ghi hộp đen ghi lại từng dòng code  khi nó thực thi. Bạn bật máy ghi âm này khi bạn bắt đầu thử nghiệm, tắt nó khi bạn kết thúc và sau đó nhìn vào nó trong khi các dòng code chưa được kiểm tra ("đỏ"); sau đó bạn có thể cải thiện việc kiểm tra các hàm và nhánh màu đỏ. Các công cụ tồn tại để thực hiện chính xác điều này, cả ở cấp độ thử nghiệm đơn vị (Clover) và cấp độ thử nghiệm đối mặt với khách hàng (McCabe IQ)

Refer to link :
https://www.quora.com/How-do-I-find-more-bugs-in-software-application