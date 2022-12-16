# Giới thiệu.

Khi bắt đầu với một ngôn ngữ lập trình chúng ta đều cố gắng làm sao có thể viết ra một chương trình chạy được và ít bug nhất có thể.
Tuy nhiên để một chương trình phần mềm có thể đến tay người dùng thì còn là một câu chuyện dài sau đó về tối ưu hoá hiệu năng và tăng trải nghiệm người dùng cho sản phẩm.

Multithreading(đa luồng) tưởng chừng như là một khái niệm bắt buộc phải nắm được và sử dụng thuần thục đối với mỗi developer với bất cứ ngôn ngữ, nền tảng nào nhưng nhiều developer lại không biết về nó hay nói về nó như một con vẹt mà chẳng hiểu rõ bản chất cũng như sử dụng nó như thế nào.

Câu chuyện là nhiều lần mình đi phỏng vấn các ứng viên cho công ty khi hỏi về đa luồng các bạn thường nói rất chung chung, rất giống những gì mà khi chúng ta search được trên google, thậm chí có những anh code đến 7 năm rồi mà vẫn còn không nắm rỗ về đa luồng. 

Vì thế hôm nay mình viết bài này, mình sẽ không đi vào việc implement nó trên IOS như nào mà mình sẽ phân tích một chút về nó để những ai còn chưa rõ có thể hiểu được bản chất, từ đó có thể áp dụng một cách linh hoạt hơn.

# Multithread là gì ?

Trước khi nói về khái niệm Multithread, chúng ta sẽ tìm hiểu một chút về nguồn gốc của thread.
Chúng ta đều biết kiến trúc máy tính bao gồm:
- [CPU](https://vi.wikipedia.org/wiki/CPU) xử lý các phép tính logic
- [memmory](https://vi.wikipedia.org/wiki/B%E1%BB%99_nh%E1%BB%9B) bao gồm bộ nhớ trong(Ram, Rom, cache) nơi mà CPU có thể truy cập trực tiếp và sử dụng cho việc lưu tạm các giá trị bởi vì chúng có tốc độ đọc ghi rất nhanh sẽ đảm bảo việc tính toán it delay nhất và do đó chúng đều rất đắt và dung lượng nhỏ do đó khi chúng ta viết chương trình nên hạn chế tối đa nhất có thể lưu trữ trên vùng nhớ này. Bên cạnh bộ nhớ trong là bộ nhớ ngoài như HDD, SSD rẻ hơn, dung lượng lớn hơn nhưng tốc độ chậm hơn do đó nó thương để lưu những dữ liệu mang tính backup và ít khi truy cập đến
- Các hệ thống Bus, ghép nối IO ...

Một phần mềm là một tâp các program(chương trình) nhỏ gồm các dãy lệnh nằm trong bộ nhớ để thực hiện một công việc cụ thể.
Hệ điều hành được sinh ra để quản lý, điều khiển tất cả các tài nguyên của máy tính, phân phối bộ nhớ, bộ xử lý,.. cho các chương trình con. Khi một phần mềm được khởi chạy, hệ điều hành sẽ tạo ra một process(tiến trình) với id riêng và chia sẻ CPU, memory,.. để cho chương trình đó hoạt động. Lưu ý là các process không chia sẻ bộ nhơ vì thế nếu process A đang sử dụng thì process B sẽ buộc phải chờ đến khi A giải phóng nó, điều này càng cho thấy tài nguyên cho process là hữu hạn và việc chương trình được viết bởi một developer tồi không chỉ ảnh hương đến trải nghiệm người dùng với chương trình đó mà còn ảnh hưởng tới cả thiết bị của người dùng.

Các bạn có thể mở máy tính ra vào activity monitor để xem với mỗi chương trình sẽ có một tiến trình quản lý nó. Nếu bạn thấy máy tính của mình rất nóng và bị chậm, hãy kiểm tra xem chương trình nào đang thường xuyên chiếm CPU và memory một cách bất thường và kill nó nếu cần thiết.

![](https://images.viblo.asia/2ba47228-79f0-43fc-be6e-7f82561dc425.png)

**Vậy một chương trình hoạt động như thế nào ? Đó chính là Thread!**

Tưởng tượng chương trình của bạn giống như một công việc xây nhà, tài nguyên của máy tính cũng tương tự vật liệu xây dựng, máy móc, các đoạn code logic giống như bản vẽ và hướng dẫn xây nhà.

Bay giờ việc còn lại là tìm người thực thi các công việc, nếu như việc xây nhà cần một anh công nhân thì thread đóng vai trò tương tự trong chương trình của bạn.

Khi một chương trình chạy, nó sẽ tạo ra một thread gọi là Main-thread, nếu bạn không tạo ra một thread nào khác thì mọi công việc sẽ do main-thread này đảm nhiệm. Một anh công nhân mà tự mình xây nhà hẳn là điều tồi tệ cũng giống như chương trình lúc nào cũng chỉ có một mình main-thread làm việc.

Vậy Multithread là gì, chẳng cần định nghĩa nữa đến đây chắc hẳn ai cũng hiểu là gì rồi.
# Vậy tại sao phải sử dụng Multithread ?
- multithread sẽ xử lý được nhiều công việc một lúc.
- multithread sẽ giúp chia công việc lớn thành nhiều việc nhỏ do đó thời gian hoàn thành sẽ nhanh hơn.
- multithread sẽ giúp chúng ta tận dụng tối đa được khả năng của CPU. Khi người dùng đi mua máy họ luôn bỏ tiền ra để mua một thiết bị cấu hình mạnh multi-core để hi vọng máy tính mình chạy nhanh hơn nhưng nếu gặp phải developer one-thread thì nó cũng chẳng khác gì việc ném tiền qua cửa sổ.

Vậy tại sao multithread hay như vậy, quan trọng như vậy mà nhiều developer lại không hiểu rõ về nó ?

Việc sử dụng multithread giống như một con dao hai lưỡi, nếu sử dụng đúng cách chương trình của bạn sẽ hoạt động một cách trơn tru tuy nhiên nếu sử dụng sai sẽ gây ra những vấn đề nghiêm trọng. 

# Lưu ý khi sử dụng multithread.
- Cái gì quá cũng không tốt. Tại sao mình lại nói như thế ?

Khi chúng ta tạo ra một thread cho một công việc tức là chúng ta bắt CPU làm việc, mặc dù CPU ngày càng được trang bị khả năng để xử lý nhiều thread một lúc nhưng cái gì nó cũng có giới hạn của nó. Việc tạo ra qúa nhiều thread một lúc dễ làm CPU trở nên quá tải hay luôn hoạt động trên 100% dẫn đến thiết bị rất nóng và bạn hiểu cảm giác cầm cái điện thoại mà nó nóng thì như nào rồi đấy.

- Cẩn thân trọng việc quản lý thread, huỷ bỏ nó khi không dùng nữa.

Đôi khi chúng vô tình tạo ra một thread, tuy rằng thread đang hoạt động nhưng kết quả của thread đó không còn quan trọng nữa. Ví du khi bạn hiển thị danh sách các mặt hàng, bạn sử dụng thread phụ để load ảnh, tuy nhiên nếu người dùng trượt rất nhanh thì rõ ràng nhiều khi ảnh chưa kịp download xong thì người dùng đã bỏ qua nó, vấn đề xảy ra là rất nhiều thread được tạo ra về nó sẽ quay trở về trường hợp phía trên.

- Luôn cẩn trọng trong việc chia sẻ dữ liệu giữa các thread.
Không giống như process, các thread trong cùng một thread đều chia sẻ bộ nhớ heap. Do đó vấn đề đồng bộ và bất đồng bộ dữ liệu là vấn đề cực kỳ lớn và cẩn thận nếu bạn không muốn dữ liệu bị thay đổi và không kiểm soát được.

# Kết.

Như vậy qua bài viết này mình muốn những bạn chưa hiểu rõ về thread và multi-thread sẽ hiều hơn về nó, trong lượt bài tiếp theo mình sẽ nói về các vấn đề multi-thread trong lập trình IOS. 

Thank you for spending time with me !