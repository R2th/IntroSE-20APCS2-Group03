Nguồn: https://www.quora.com/What-is-the-most-sophisticated-piece-of-software-code-ever-written/answer/John-Byrd-2

Phần mềm tinh vi nhất trong lịch sử được viết bởi một nhóm người mà ta không biết tên.

Đó là một sâu máy tính (computer worm) có lẽ được viết trong khoảng từ 2005-2010.

Tôi chỉ có thể mô tả sơ qua nhất về những gì nó làm bởi vì con worm này rất phức tạp và tinh vi.

Đầu tiên con worm này tồn tại trên USB. Chỉ cần ai đó thấy cái USB này hoặc có được con worm này từ email và rồi tự hỏi bên trong nó có gì. Khi cái USB đó được cắm vào một cái Windows, người dùng sẽ không thể nào biết được là, con worm này có khả năng tự chạy mà không cần kích hoạt, sau đó tự copy nó vào cái PC đấy. Nó thậm chí có những 3 cách để tự kích hoạt cơ. Nếu cách một xài không được, nó sẽ thử cách khác. Ít nhất là 2 trong số 3 cách đó là hoàn toàn mới  (chưa ai biết cách mà nó có thể tự kích hoạt được) lợi dụng 2 bugs "ẩn" , độc lập trong Windows mà chưa ai biết cho đến khi mà con worm này xuất hiện.

Khi mà con worm này tự nó chạy, nó sẽ cố truy cập quyền quản trị trên chiếc PC đó. Con worm này lét lút hoạt động mà không bị các antivirus phát hiện vì nó miễn nhiễm với hầu hết các trình antivirus tồn tại khi đó. Sau đó, dựa trên phiên bản Windows đang chạy, con worm sẽ thử một trong 2 phương pháp nói trên để truy cập quyền quản trị. Và nhắc lại là cho đến khi con worm này bị phát hiện ra thì người ta vẫn không hề biết 2 bugs "ẩn" đó là gì.

Khi đã có quyền quản trị, nó đã có thể tự cover dấu vết của nó bằng cách chạy ở tầng dưới hệ điều hành, vì thế mà hoàn toàn không một trình antivirus nào có thể phát hiện sự tồn tại của nó. Nó gắn mình vào chiếc PC cho nên dù bạn có cố gắng tìm những nơi mà con worm có thể ở đó trên ổ đĩa thì cũng không thể tìm ra. Nói chung là con worm này nó che giấu bản thân mình giỏi đến mức mà dù chạy trên internet trong hơn 1 năm, không một công ty bảo mật nào trên thế giới nhận ra sự tồn tại của nó.

Worm này sau đó kiểm tra máy tính có thể kết nối mạng nay không. Nếu có, nó sẽ truy cập vào trang http://www.mypremierfutbol.com hoặc http://www.todaysfutbol.com. Khi đó thì 2 servers này đặt ở Malaysia và Đan Mạch. Nó mở một liên kết được mã hóa và thông báo cho servers nó đã chiếm được chiếc PC này. Con worm này sau đó sẽ tự update lên version mới nhất.

Tại thời điểm này, con worm tạo ra các bản copy khác của chính mình lên bất cứ chiếc USB nào được cắm vào. Nó làm vậy bằng cách cài đặt 1 driver giả được thiết kết hết sức cẩn thận. Driver này được kí số (digitally signed) bởi Realtek, tức là tác giả của con worm này bằng cách nào đó đã đột nhập vào nơi được cho là an toàn nhất, ở một công ty (nd: công nghệ) khổng lồ của Đài Loan, đánh cắp cái key bí mật nhất của công ty này, tát nhiên là Realtek hoàn toàn không biết gì về điều đó.

Sau đó cái người viết ra driver kia, bắt đầu kí nó với secret key của JMicron, một công ty lớn khác của Đài Loan. Và một lần nữa, ông này lại bằng cách nào đó đã biết cách đột nhập vào nơi được cho là an toàn nhất, ở một công ty blah blah, tát nhiên là JMicron hoàn toàn không biết gì về điều đó.

Con worm mà chúng nó đang nói đến phức tạp vãi. 

Mà nó còn chưa chạy đấy @.@

Ờ thì ở thời điểm đó, con worm đã lợi dụng 2 lỗi mới được phát hiện của Windows. Một lỗi liên quan đến máy in mạng (network printer), cái còn lại liên quan đến files mạng (network files). Con worm dùng 2 cái này để tự lây lan nó trên mạng local.

Giờ thì nó tìm kiếm một phần mềm điều khiển rất cụ thể, được thiết kế bởi Siemens cho tự động hóa máy móc công nhiệp lớn. Một khi đã tìm được, nó lợi dụng (vâng bạn đoán đúng rồi đấy) một bug chưa được biết trước đây để lây lan vào logic lập trình của một bộ điều khiển công nghiệp (nd: nguyên văn là "copying itself into the programmable logic of the industrial controller"). Khi con worm này đã đào sâu vào cái bộ điều khiển (controller) này, nó ở đó vĩnh viễn. Tóm lại là cái PC nào sử dụng phần cứng hay phần mềm của Siemens là dính hết. Thay thế hay là tẩy trùng (ND - chắc là diệt virus chuyên sâu) PC cũng không thoát khỏi con worm này được.

Con worm này kiểm tra những mô tơ/ động cơ (motors) công nghiệp từ 2 công ty cụ thể. Một từ Iran, cái còn lại từ Phần lan. Các động cơ cụ thể mà nó tìm kiếm được gọi là các ổ đĩa biến tần. Chúng được sử dụng để chạy máy ly tâm công nghiệp. Bạn có thể làm sạch nhiều loại hóa chất trong máy ly tâm.

Như là urani (ND - Ohhhh)

Lúc này, khi các worm có toàn quyền điều khiển các máy ly tâm, nó có thể làm bất cứ điều gì nó muốn. Ví dụ như tắt chúng đi, hay phá hủy chúng bằng cách quay chúng với tốc độ tối đa cho đến khi tất cả chúng vỡ vụ như bom, giết tất cả những ai vô tình đứng gần.

Nhưng không. Như thế đơn giản quá, vì đây là con worm tinh vi, nó có những kế hoạch khác...

Một khi nó điều khiển mọi máy ly tâm ... con sâu chỉ đi vào giấc ngủ.

Từng ngày trôi quá, từng tuần, hoặc từng giây...

Khi con worm quyết định đã đến thời điểm, nó lặng lẽ thức dậy. Con worm này chọn ngẫu gnhieen một vài trong số những máy ly tâm trong khi nó đang thanh lọc urani. Nó khóa những máy ly tâm lại, dù có ai phát hiện ra thì cũng không thể tắt đi được nữa.

Và rồi, một cách lén lút, con worm bắt đầu quay những máy ly tâm đó… một cách sai đi. Không phải là sai nhiều như bạn đang nghĩ đâu. Chỉ cần, bạn biết đấy, một chút quá nhanh. Hoặc một chút quá chậm. Chỉ cần quá thông số an toàn một chút thôi.

Đồng thời, nó làm tăng áp suất khí trong những máy ly tâm này. Khí trong các máy ly tâm này được gọi là UF6. Nó hơi ghê. Con worm làm cho áp lực của UF6 đó, chỉ cần nằm ngưỡng an toàn một chút. Đủ để lượng khí UF6 trong máy ly tâm có thể biến thành đá. Trong khi máy ly tâm đang quay.

Máy ly tâm không thích chạy quá nhanh hoặc quá chậm. Và nó cũng không thích đá một chút nào.

Con worm còn một trò cuối cùng nữa. Và nó thực sự là thiên tài.

Ngoài những thứ khác mà nó đang làm, con worm chạy những bản ghi dữ liệu dài 21 giây trên màn hình vi tính của chúng tôi ghi lại thông số khi các máy ly tâm hoạt động bình thường.

Nó cứ lặp đi lặp lại bản ghi này liên tục sau đó, như một vòng lặp.

Kết quả là, tất cả các dữ liệu máy ly tâm trên màn hình máy tính trông hoàn toàn ổn, đối với chúng ta, con người.

Nhưng tất cả chỉ là một bản ghi giả, được tạo ra bởi con worm.

Bây giờ hãy tưởng tượng rằng bạn có trách nhiệm thanh lọc uranium bằng những nhà máy công nghiệp khổng lồ này. Và mọi thứ dường như hoạt động tốt. Có lẽ một vài động cơ phát ra tiếng động kì kì, nhưng tất cả các con số trên máy tính cho thấy các động cơ ly tâm đang chạy chính xác như thiết kế.

Sau đó, các máy ly tâm bắt đầu vỡ/hỏng (breaking). Ngẫu nhiên, cái này rồi cái khác. Thông thường nó vỡ/ hỏng một cách im lặng. Và sản lượng uranium tiếp tục giảm mạnh. Uranium phải tinh khiết. Uranium mà không đủ tinh khiết thì không đủ để làm bất cứ điều gì hữu ích.

Bạn sẽ làm gì nếu bạn đang vận hành cơ sở làm giàu urani đó? Bạn sẽ kiểm tra mọi thứ, lặp đi lặp lại quá trình đó, không hiểu tại sao động cơ lại hỏng. Bạn có thể thay thế mọi máy tính trong cơ sở của bạn nếu bạn muốn. 

Nhưng các máy ly tâm sẽ lại hỏng. Và bạn không thể nào biết tại sao.

Và cuối cùng, khoảng 1000 máy ly tâm sẽ hỏng hoặc bị đưa ra ngoại tuyến. Bạn sẽ phát điên một chút, cố gắng tìm ra lý do tại sao nó không hoạt động đúng như thiết kế.

Đó là chính xác những gì đã xảy ra.

Bạn sẽ không bao giờ nghĩ rằng tất cả những vấn đề đó là do sâu máy tính, con sâu máy tính thông minh nhất trong lịch sử gây ra, được viết bởi một nhóm bí mật vô tận với số tiền không giới hạn và tài nguyên không giới hạn, được thiết kế với một mục đích duy nhất, vượt qua tất cả những phòng thủ kĩ thuật số, và để tiêu diệt chương trình bom hạt nhân của nước bạn, mà không bị bắt.

Nếu có một phần mềm chỉ cần làm được một phần trong số những thứ kiêu đã đủ để trở thành một điều kì diệu. Nếu một phần mềm có thể làm được hết tất thảy các thứ đó, và nhiều hơn thế nữa... well, thật sự là ...

Stuxnet worm chắc chắn là một phần mềm tinh vi nhất từng được viết cho đến nay.