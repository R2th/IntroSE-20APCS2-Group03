Chào mọi người, chắc hẳn mọi người đều biết về hệ thống nhận diện gương mặt rồi, trong phim hay có kiểu dùng camera tìm trong 1 đám đông để tìm tội phạm các thứ nhìn rõ ngầu,...
Vừa rồi Apple cũng rùm beng về cái FaceID của iPhone. Chắc ít nhiều cũng có vài lần bạn đặt câu hỏi: sao nó nhận ra mặt người này để phân biệt với mặt người khác nhỉ? Trong khi mình nhìn còn chả nhận ra (??)

Bài này sẽ giới thiệu sơ sơ cho các bạn cách mà hệ thống nhận diện gương mặt phân biệt được mặt mọi người nhé!

# Sơ bộ
Hệ thống nhận dạng khuôn mặt là một ứng dụng máy tính tự động xác định hoặc nhận dạng một người nào đó từ một bức hình ảnh kỹ thuật số hoặc một khung hình video từ một nguồn video. Một trong những cách để thực hiện điều này là so sánh các đặc điểm khuôn mặt chọn trước từ hình ảnh và một cơ sở dữ liệu về khuôn mặt.

Hệ thống này thường được sử dụng trong các hệ thống an ninh và có thể được so sánh với các dạng sinh trắc học khác như các hệ thống nhận dạng vân tay hay tròng mắt (theo wikipedia).

# Cách hoạt động
## Cơ bản
Trước hết, để có thể phân tích khuôn mặt và nhận diện, cần phải tách khuôn mặt ra khỏi khung cảnh còn lại trước đã

Tiếp đến, chính là việc phân tích gương mặt. Chúng ta nhận diện gương mặt mọi người qua các đặc điểm, hệ thống nhận diện cũng vậy, nhưng nó thực hiện đánh giá các đặc điểm ở 1 level cao hơn, chính xác hơn là việc cảm nhận bằng mắt như của chúng ta, vì thị giác có thể bị đánh lừa mà :D

Mỗi khuôn mặt đều có nhiều điểm mốc, những phần lồi lõm tạo nên các đặc điểm của khuôn mặt. 
Các hệ thống nhận diện gương mặt định nghĩa những điểm này là những điểm nút. Mỗi mặt người có khoảng 80 điểm nút. Có thể nhận diện một số điểm nút như sau:   
* Khoảng cách giữa hai mắt 
* Chiều rộng của mũi 
* Độ sâu của hốc mắt 
* Hình dạng của xương gò má 
* Độ dài của xương hàm 
*  ...

![](https://images.viblo.asia/71318af3-9e91-472f-aa89-2ed2a7e471e9.PNG)

Một số thuật toán nhận dạng khuôn mặt xác định các đặc điểm khuôn mặt bằng cách trích xuất các ranh giới, hoặc đặc điểm, từ một hình ảnh khuôn mặt của đối tượng. Từ đó các thuật toán sẽ trích xuất được các thông tin, và những tính năng này sau đó được sử dụng để tìm kiếm các hình ảnh khác với các tính năng phù hợp. Trong trường hợp sử dụng để nhận diện, cần phải lưu lại thông tin khuôn mặt để ghi nhớ trước. Các thuật toán sẽ đơn giản hóa một tập các hình ảnh khuôn mặt và sau đó nén dữ liệu khuôn mặt, chỉ lưu dữ liệu hình ảnh nào là hữu ích cho việc nhận dạng khuôn mặt. 

Khi đó, muốn nhận diện sẽ so sánh hình ảnh mấu với các dữ liệu khuôn mặt đã lưu.

Các thuật toán nhận dạng có thể được chia thành hai hướng chính, là hình học, đó là nhìn vào tính năng phân biệt, hoặc trắc quang (đo sáng), là sử dụng phương pháp thống kê để 'chưng cất' một hình ảnh thành những giá trị và so sánh các giá trị với các mẫu để loại bỏ chênh lệch.

Tuy nhiên, các trường hợp nhận diện thường không phải lúc nào cũng được đo đạc trong môi trường ổn định, có thể bị ảnh hưởng ngay chỉ bởi sự thiếu sáng, hay góc nghiêng của khuôn mặt, do đó ảnh hưởng đáng kể đến độ chính xác của kết quả.
## Nâng cao: nhận dạng 3D
Ngày nay, với sự phát triển của công nghệ, và với xu hướng 3D đang thịnh hành, thì cũng tương tự vậy, chúng ta có nhận dạng khuôn mặt 3 chiều. Và tất nhiên, nghe là biết kỹ thuật này sẽ cải thiện được độ chính xác nhờ việc phân tích được nhiều thông tin để so sánh hơn rồi.
Kỹ thuật này sử dụng các cảm biến 3D để nắm bắt thông tin về hình dạng của khuôn mặt, rồi dùng các điểm nổi bật trên khuôn mặt – nơi những mô cứng và xương nhìn thấy rõ nhất như đường cong của hốc mắt, mũi và cằm -- để nhận ra đối tượng. Các đặc điểm này là độc nhất đối với mỗi khuôn mặt và không thay đổi theo thời gian. 

![](https://images.viblo.asia/2f6408ed-e7f5-4639-8e5b-d73769206749.jpg)

Cách thức sử dụng độ sâu và trục của các phần trên khuôn mặt không bị ảnh hưởng bởi ánh sáng, vì thế việc nhận dạng khuôn mặt 3D có thể được sử dụng cả trong bóng tối và có thể nhận ra khuôn mặt từ nhiều góc độ khác nhau với độ chênh lệch lên tới 90 độ. Và nhờ có việc xác định khuôn mặt dựa trên hình ảnh 3 chiều, nên nhận dạng 3D có khả năng xác định 1 khuôn mặt từ nhiều góc nhìn hơn. Số lượng các điểm dữ liệu 3 chiều khiến cho độ chính xác tăng lên đáng kể bởi sự phát triển của các bộ cảm biến tinh vi giúp nắm bắt hình ảnh chụp khuôn mặt 3D được tốt hơn. Các cảm biến hoạt động bằng cách chiếu ánh sáng có cấu trúc lên gương mặt. Hàng chục hoặc nhiều hơn nữa các bộ cảm biến hình ảnh này có thể được đặt lên trên cùng một con chip CMOS-mỗi cảm biến sẽ thu một phần khác nhau của hình ảnh.

Hiện đại thì hại điện, để có thể nhận dạng 3 chiều, ngoài việc phải sử dụng phần mềm 3D, hệ thống nhận diện này cần trải qua một loạt bước để nhận diện một đối tượng:
1.   Nhận dạng

Việc ghi lại một hình ảnh có thể thực hiện bằng cách quét một tấm ảnh 2D sẵn có, hoặc sử dụng video để có được một hình ảnh 3D sống của đối tượng. 

2. Liên kết

Sau khi đã ghi lại một khuôn mặt, hệ thống này sẽ tính toán vị trí, kích cỡ và tư thế của đầu. Như đã đề cập từ trước, hệ thống có thể nhận ra một khuôn mặt ở góc lệch lên tới 90 độ, trong khi với hình ảnh 2D, khuôn mặt của đối tượng phải nghiêng ít nhất là 35 độ về phía camera. 

3. Đo đạc

Sau đó, hệ thống này sẽ đo đạc những đường cong trên khuôn mặt với độ chính xác lên tới dưới 1 milimet, rồi tạo một khuôn mẫu. 

4. Tái hiện 

Sau đó, hệ thống sẽ chuyển khuôn mẫu này thành một mã độc nhất với từng người. Với mỗi khuôn mẫu, mã này có dạng một nhóm các con số đại diện cho khuôn mặt của một đối tượng. 

5. So sánh

Nếu như hình ảnh này có dạng 3D và cơ sở dữ liệu cũng chứa các hình ảnh 3D, thì việc đối chiếu có thể tiến hành mà không phải thực hiện bất kỳ thay đổi nào đối với hình ảnh đó. Tuy vậy, nếu như hình ảnh vẫn ở dạng 2D thì sẽ có đôi chút khó khăn hơn, bởi công nghệ 3D đem lại hình ảnh thực và sống động hơn so với một hình ảnh 2D phẳng lì, bất động. Nhưng công nghệ mới có thể giải quyết được khó khăn này. Ví dụ, phần bên ngoài và bên trong của con mắt cùng với phần đỉnh mũi sẽ được lấy ra đo đạc. Sau khi việc đo đạc này hoàn tất, một thuật toán sẽ được áp dụng để chuyển hình ảnh trong cơ sở dữ liệu sang dạng 2D. Sau khi chuyển đổi, phần mềm sẽ so sánh hai hình ảnh 2D này với nhau để tìm ra đối tượng.  

6. Xác minh hay nhận diện 

 - Xác minh có nghĩa là một hình ảnh sẽ được đối chiếu với chỉ 1 hình ảnh trong cơ sở dữ liệu (tỉ lệ 1:1). Ví dụ như, một hình ảnh của một đối tượng nào đó sẽ được đối chiếu với một hình ảnh trong cơ sở dữ liệu của Uỷ ban phương tiện giao thông để xác minh xem đối tượng đó là ai. 

 - Còn nhận diện có nghĩa là một hình ảnh sẽ được đối chiếu với tất cả các hình ảnh trong cơ sở dữ liệu để tìm ra đối tượng (tỉ lệ 1:N). Khi đó, bạn phải ghi lại hình ảnh đối tượng và so sánh với toàn bộ cơ sở dữ liệu để biết được đối tượng đó là ai.


Tuy nhiên, ngay cả một kỹ thuật 3D hoàn hảo cũng có thể gặp khó khăn bởi các sắc thái biểu cảm trên gương mặt, bởi vì nó có thể gây sai lệch cho sự đo đạc cũng như xác định vị trí các điểm cần thiết cho nhận diện.

Đọc xong thì chắc các bạn cũng biết làm sao để đỡ bị nhận diện rồi đó, làm mặt xấu cho đỡ bị nhận ra :v 
## Nâng cao: Phân tích kết cấu da
Một xu hướng khác mới nổi lên đó là kỹ thuật phân tích kết cấu da. 
Quá trình này được gọi là Phân tích cấu trúc bề mặt, cũng hoạt động giống như hệ thống nhận diện khuôn mặt. Đầu tiên, đưa các đường đặc trưng, hình dạng, và các điểm nốt trên làn da của một người vào một không gian toán học. Một mảng da, gọi là dấu da (SkinPrint), sẽ được chụp thành hình ảnh . Sau đó, mảng da này được chia nhỏ ra thành nhiều khối. Bằng cách sử dụng thuật toán để chuyển mảng da thành một không gian toán học có thể đo đạc được, công nghệ này sau đó sẽ phân biệt từng đường nét, từng lỗ chân lông, và cấu trúc thực của bề mặt da. Điều này giúp phân biệt được cả một cặp song sinh giống hệt nhau mà một mình phần mềm nhận dạng khuôn mặt không thể thực hiện được. Các thử nghiệm đã chỉ ra rằng, bằng cách kết hợp công nghệ nhận dạng khuôn mặt với công nghệ phân tích cấu trúc da, độ chính xác có thể tăng thêm từ 20 đến 25%. 
# Ứng dụng hiện tại và tương lai phát triển
##  Ưu điểm và nhược điểm
Trong số các kỹ thuật sinh trắc học, nhận dạng khuôn mặt có thể không đáng tin cậy và hiệu quả nhất. Tuy nhiên, một trong những lợi thế quan trọng là nó không đòi hỏi sự hợp tác của các đối tượng thử nghiệm. Các hệ thống thiết kế được lắp đặt tại các sân bay, khu chung cư, và những nơi công cộng khác có thể xác định các cá nhân giữa đám đông, mà không bỏ sót một ai. Sinh trắc học khác như dấu vân tay, quét mống mắt, và nhận dạng giọng nói không thể thực hiện được như vậy. Tuy nhiên, câu hỏi đã được đặt ra về hiệu quả của phần mềm nhận dạng khuôn mặt trong trường hợp của an ninh đường sắt và sân bay (theo wikipedia)
## Nhược điểm
Mặc dù nhận dạng khuôn mặt đã thực hiện được khá tốt ở phía mặt trước và phía chênh lệch 20 độ, nhưng ngay sau khi bạn đi về phía góc khuất, thì nó có vấn đề.

Một số điều kiện có thể ảnh hưởng tới tính chính xác của phương pháp như:
* Thiếu ánh sáng, đeo kính mát, tóc dài, hoặc một phần khuôn mặt bị che
* Hình ảnh độ phân giải thấp
* Hệ thống sẽ kém hiệu quả nếu biểu hiện khuôn mặt khác nhau, ví dụ như khi cười lớn cũng có ảnh hưởng. Vì vậy nên chụp ảnh hộ chiếu, chứng minh thư, hay khi đi 1qua cửa hộ chiếu chụp ảnh hộ không cho mình cười là vì thế đấy :D

## Ứng dụng
### 1. Phát hiện tội phạm nguy hiểm

Như trong phim ấy, hệ thống quét nhận diện gương mặt trên diện rộng hoặc đối chiếu trực tiếp với ảnh chụp tội phạm có sẵn (kiểu poster Wanted dead or live ấy), cơ quan kiểm soát có thể tìm được đối tượng nguy hiểm đang truy nã, đỡ nguy hiểm cho chúng ta :v: 

![](https://images.viblo.asia/f3316c2a-5b9a-4436-b2ec-90be95b5390a.jpg)
(à, ảnh này là sai quy chuẩn nhé, khó nhận diện lắm :D )

Ngoài ra thì 1 số Casino cũng sử dụng hệ thống này để đề phòng những thành phần "cần đuổi" nữa.

### 2. Hệ thống kiểm tra chuyến bay
Năm ngoái, Baidu đã giới thiệu một hệ thống nhận diện khuôn mặt tại sân bay chính của Bắc Kinh, cho phép xác minh phi hành đoàn và nhân viên của hãng hàng không. Một sân bay ở thành phố Nanyang tỉnh Hà Nam cũng đang sử dụng một hệ thống tương tự như vậy. Tuy nhiên, hệ thống của họ đang áp dụng cho hành khách. Việc quét mặt được thực hiện và sử dụng để xác minh danh tính của họ trước khi lên máy bay.
### 3. Quét khuôn mặt để mở khóa điện thoại

Cái này thì fan nhà Táo rành quá rồi :). Apple mới ra mắt tính năng mở khóa bằng FaceID, sau tính năng mở khóa vân tay TouchID. Mặc dù độ chính xác của tính năng này còn nhiều lùm xùm, nhưng Apple đã khẳng định công nghệ bảo mật quét 3D gương mặt có tỉ lệ sai là 1/1,000,000 thấp hơn nhiều so với Touch ID ( 1/50,000 ).

![](https://images.viblo.asia/bf974a3c-e645-4a1b-9138-fe8fce613bbb.gif)
### 4. Hỗ trợ trong việc thanh toán

Vào tháng Bảy, một công ty Phần Lan, Uniqul đã tạo ra một hệ thống có thể thanh toán tiền thông qua nhận dạng khuôn mặt. Tại một cửa hàng, thay vì thanh toán bằng tiền mặt hoặc thẻ tín dụng, bạn chỉ cần đưa ra một biểu cảm cho máy quét để mua hàng. Một bài báo của Huffington Post mô tả công nghệ mới này, họ đã sử dụng nhận dạng khuôn mặt làm phương pháp bảo mật chính.

Ta có thể thấy, nhận diện khuôn mặt đang phát triển một cách nhanh chóng. Qua đó, con người có thể kì vọng  một số lợi ích mà nó mang lại trong đời sống.
# Cuối cùng là phần 'Nhưng' - Vấn đề riêng tư
Tuy là có sự hữu ích vô cùng lớn như vậy, nhưng nhiều cá nhân, tổ chức bày tỏ lo ngại rằng sự riêng tư đang được tổn hại bằng cách sử dụng các công nghệ giám sát. Một số người sợ rằng nó có thể dẫn đến một "xã hội giám sát toàn diện," với chính phủ và các cơ quan khác có khả năng biết nơi ở và hoạt động của tất cả các công dân suốt ngày đêm. Những kiến thức này đã được, đang được, và có thể tiếp tục được triển khai để ngăn chặn các sự xâm phạm quyền công dân của các chính sách nhà nước hoặc từ các công ty, tập đoàn. Nhiều cơ cấu quyền lực tập trung với khả năng giám sát đã lạm dụng đặc quyền truy cập của họ để duy trì sự kiểm soát của bộ máy chính trị và kinh tế, và để ngăn chặn những cải cách dân túy.

Các bạn nhớ mà xem, vụ Facebook lộ thông tin người dùng khiến dư luận phẫn nộ thế nào, khiến Facebook tổn thất bao nhiêu thì sẽ hiểu được mức độ nghiêm trọng của việc dữ liệu gương mặt của bạn được lưu trữ và để lộ ra ngoài.

Cứ nghĩ là giờ bạn đi đâu, ở đâu cũng có thể đang bị giám sát là thấy khó chịu rồi. Các ông chồng lúc nào chả than thở về việc vợ luôn hỏi xem đang ở đâu, làm gì, nữa là bị giám sát không nói dối được luôn :v 

Hình như Fast and Furious có 1 phần cũng nói về vụ "mắt thần" này, mà mình chả nhớ phần nào nữa :D

Thậm chí nghiêm trọng hơn, 1 người chỉ cần với 1 tấm ảnh của bạn có thể tìm ra mọi thông tin về bạn, cảm giác thật kinh hoàng, thông tin vào tay người xấu hay biến thái thì... thôi, không muốn nghĩ nữa.

Phương tiện truyền thông các trang web xã hội như Facebook có số lượng rất lớn các bức ảnh của người dân, chú thích bằng tên. Điều này đại diện cho một cơ sở dữ liệu mà có thể được sử dụng (hoặc bị lạm dụng) bởi các chính phủ cho các mục đích nhận dạng khuôn mặt. Việt Nam cũng mới thông qua Luật An ninh mạng hồi tháng 6 đó, nên nhỡ may mà Facebook bị buộc đưa ra các thông tin này cho chính phủ, mà nhỡ bị rò thông tin nữa thì bạn chẳng còn riêng tư nữa đâu @@.

Cái gì cũng có cái lợi cái hại, việc ứng dụng rộng rãi công nghệ này vẫn đang là chủ đề tranh cãi làm sao cho đúng. Nhưng mà bài viết này mình chỉ muốn cho các bạn cái nhìn tổng quan về cách hoạt động và thực tế hiện tại của công nghệ này sau khi đi tham khảo từ nhiều nguồn thôi, vậy nên hy vọng rằng bạn đã hiểu được ít nhất là "sơ sơ" về hệ thống này rồi nhé :D. Cảm ơn mọi người đã đọc