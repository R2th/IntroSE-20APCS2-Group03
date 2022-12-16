Tiếp nối series, phần ba cũng là phần cuối của loạt bài viết, sẽ tiếp tục đưa ra các khái niệm cũng như quan điểm test cần lưu ý khi kiểm thử UI/UX.

# Sự can thiệp từ phía người dùng (User Intervention)
Bạn đã bao giờ tự đặt câu hỏi tại sao lại có dấu chấm lửng ở phía sau một số lựa chọn trong một menu nhưng không phải tất cả chưa?

![](https://images.viblo.asia/8f542f0d-b011-42f0-9144-994782abdc65.png)

* Dấu chấm lửng báo hiệu rằng khi chọn mục đó, người dùng sẽ cần phải thực hiện một số hành động sau đó. Ví dụ như một popup yêu cầu người dùng nhập vào một số thông tin hoặc lựa chọn hành động tiếp theo. 
* Kiểm tra dấu chấm lửng có được đặt đúng lựa chọn nó cần được đặt vào không
* Kiểm tra xem với mỗi lựa chọn có dấu chấm lửng đó, khi trỏ tới có được liên kết với đúng hành động kết quả mong muốn không

# View Source

![](https://images.viblo.asia/63f2fef0-a5bc-4fd3-bf3b-1e5fea45905b.png)

Bạn đã từng thấy dev sử dụng tính năng View page source để debug ngay tại nơi lỗi xảy ra chưa? Là một tester bạn có thể tận dụng được gì từ tính năng này.

* Kiểm tra xem có thông tin thừa hoặc không nên có nào trong đoạn source không? Trong lúc code, dev có "vô tình" để lại một số comment thú vị nào đó không chẳng hạn.
* Thử đọc source và đoán logic từ đó. Liệu rằng từ phần source này, có kẻ xấu nào có thể lợi dụng đánh cặp thông tin IP hay một số thông itn nhạy cảm nào từ web của bạn không?
* Phát triển các ý tưởng test từ việc đọc source
* Có nhưng phần tử bị ẩn đi, vậy logic hiển thị của chúng là gì? 
* Nếu bạn nắm được cách thức hoạt động, thử thay đổi 1 số phần tử để kiểm tra xem xử lý về phía server có đúng không


# Cache

![](https://images.viblo.asia/eae43147-2b92-4731-babe-d2671fb3fcc5.png)

Đã bao giờ dev bảo bạn là: "Xóa cache đi rồi thử lại xem" chưa? Bạn có hiểu sự khác biệt giữa cache và cookies không?
* Có phải lúc nào cũng nên xóa cache không? Trong những trường hợp nào thì không được xóa cache?
* Những phần tử nào được lưu như một phần của cache? Hạn chế của bộ nhớ local có ảnh hưởng gì tới việc lưu cache?
* Shortcut để xóa cache? Trên IE, Ctrl + Shift + Delete khác gì Ctrl + R? 


# Che giấu Mật khẩu (Masked Passwords)

![](https://images.viblo.asia/04c9dfba-fd24-49d9-a9e6-3778ed36c320.png)

Chắc chắn không thể bỏ qua chi tiết này khi thực hiện kiểm thử. Bất kì lúc nào khi bạn nhập mật khẩu thì chuỗi kí tự đó cũng cần phải được masked, giấu đi dưới những kí tự đặc biệt, có thể là *** hoặc   • • •  
Tuy nhiên cũng có một số nơi tại trường nhập mật khẩu, có thêm lựa chọn view mật khẩu dưới dạng văn bản đúng với phần văn bản đã nhập vào. Để đảm bảo tính bảo mật thì có thể để sử dụng chức năng này bạn đôi khi lại phải nhập một mật khẩu khác. 

* Kiểm tra xem có thể sao chép mật khẩu từ trường mật khẩu này sang trường mật khẩu khác không (đương nhiên kết quả mong đợi phải là không)
* Khi mask mật khẩu thì điều gì quan trọng hơn? - bảo mật hay khả năng sử dụng?
* Một bài viết hay để tham khảo về đề vấn đề này: 
 http://www.nngroup.com/articles/stop-passwordmasking/ 

# Các con trỏ chuột
![](https://images.viblo.asia/07f90404-b3bb-4712-b56e-e1002d5a74e2.png)

Bạn đã bao giờ thử đọc/xem cửa sổ cài đặt về con trỏ chuột trong Control Panel trên máy tính của bạn chưa? Nếu chưa hãy thử mở ra và tìm xem các con trỏ được gọi tên thế nào nhé!

* Bao nhiêu người trong số chúng ta đã và đang gọi "Link Select" là "Hand Icon" hay "Hand shape Icon" :D 
* Gọi đúng tên các thuật ngữ và tìm hiểu mỗi con trỏ có hàm ý gì tương ứng
* Khi nào thì con trỏ nào sẽ xuất hiện trên màn hình?


# Session Files

![](https://images.viblo.asia/844a2e71-c98e-4841-be06-95a772240eef.png)

Tất cả các file tĩnh (static) ví dụ như js, css đều cần có thời gian hết hạn (expiry date)
* Bạn có thể tham khảo các bạn dev để xem rằng việc này đã được implement chưa. 
* Hiểu được lí do tại sao nó lại được hoặc chưa được implement cũng là một cách để mở rộng quan điểm test của bản thân.


# Session Timeout

![](https://images.viblo.asia/46a84247-4057-44fe-8b66-cdab412b4423.png)

Bạn có thể thực hiện ý tưởng test này trước khi đi ăn hoặc thực hiện trong khi làm 1 task khác. Ví dụ bạn bắt đầu một active session, khóa máy lại và đi ăn trưa hoặc test một chức năng khác. Khi bạn quay lại, kiểm tra hành vi của trang web khi session timeout. Thực hiện kiểm thử trên nhiều màn hình khác nhau. Nếu session timeout có thể thiết lập được, thử thay đổi giá trị của nó về một giá trị nhỏ hơn và thực hiện các flow kiểm thử như bình thường.
Chú ý khi có một popup hoặc flyout, session timeout ảnh hưởng đến chúng như thế nào?


# Colon

![](https://images.viblo.asia/71c602db-a51f-4ed5-8d54-d7ff99ff0bd9.png)

Ảnh chụp màn hình phía trên là một minh chứng cho việc sử dụng dấu hai chấm đúng cách.
* Đảm bảo rằng phía trước dấu hai chấm không có dấu cách nào. 
* Phía sau dấu hai chấm cần có một dấu cách.
* TÌm hiểu thêm thông tin về dấu hai chấm tại bài viết: http://grammar.quickanddirtytips.com/colongrammar.aspx


# Links

![](https://images.viblo.asia/e685fa72-efb2-411f-8eff-c01b0d2e00cd.png)

Chắc hẳn là hiếm có trang web nào lại không có hyperlinks. Điều gì sẽ xảy ra khi bấm chuột trái vào các đường dẫn này? Các đường dẫn sẽ được mở ra ngay trên cùng cửa sổ đó hay mở ra ở một tab khác hay một cửa sổ khác. 
* Kiểm tra xem những trang web với các đường dẫn này có làm ảnh hưởng đến trải nghiệm của người dùng không? Có cách nào hay hơn để hiển thị những nội dung được liên kết với đường dẫn không? 
* Khi nội dung gắn với đường dẫn được mở ra ở một tab khác, nội dung đó có được hiển thị đầy đủ không? Đó là một trang hoàn chỉnh hay chỉ là một cửa sổ để thực hiện một số thao tác trên đó.
* Kiểm tra xem đường dẫn có được đính với phần văn bản hiển thị một cách chính xác không?


# Kiểm tra lỗi chính tả

![](https://images.viblo.asia/7ba7460c-c983-46b6-8484-af1c03d0f620.png)

Nội dung tragn web của bạn có thể vô cùng tuyệt vời nhưng có để làm gì khi có vô xố lỗi chính tả trên các bài viết. Bạn có nhận ra 2 lỗi chính tả trong câu trước của tôi không? Việc mắc lỗi chính tả trong thời buổi này quả là khó... và kì lạ khi mà có vô vàn các công cụ hỗ trợ kiểm tra rà soát lỗi chính tả. 
* Bạn có thể sao chép nội dung ra MS-Word hoặc bất khi một phần mềm soạn thảo văn bản nào và chạy chức năng Spell Check
* Tuy nhiên bạn cũng cần chú ý những từ mặc dù không sai về đánh vần nhưng lại không có ý nghĩa gì hoặc dùng sai ý nghĩa khi đặt vào bối cảnh của câu, đoạn văn.
* Dù là cùng một ngôn ngữ nhưng lại có các phương ngữ nên gây ra sự khác nhau về đánh vần. Ví dụ điển hình đó là tiếng Anh của người Mỹ và tiếng Anh của người Anh.


# Lỗi Console 

![](https://images.viblo.asia/5b6a945c-b06b-4bae-a579-a58f1f9589e7.png)

Việc mở console và điều hướng qua các màn hình khác nhau của trang web cũng là một ý tưởng test. Các lỗi trên console là một nguồn thông tin hữu ích để điều tra một số bug.
* Đính kèm đoạn lỗi trên console này trong báo cáo bug. Thông thường những đoạn lỗi này sẽ giúp developer tìm ra nguyên nhân nhanh hơn.
* Lưu ý về đánh dấu phân biệt rõ ràng cách lỗi khác nhau. Xóa hết các lỗi này trước khi bắt đầu test một lượt mới. Không nên để các lỗi cũ và mới lẫn lộn vào nhau.
* Bất cứ khi nào bạn tìm thấy một lỗi console, hãy test lại luồng đó trên các trình duyệt khác. Đó có thể là lỗi chỉ xảy ra ở trên 1 trình duyệt cụ thể.
* Kết hợp việc test này với ý tưởng test sau đây - IE script error


# IE Script Error

![](https://images.viblo.asia/cedf43fa-5b30-4f1c-9f65-0b0d3b75a959.png)

Có nhiều trang hiển thị lỗi script ở cuối trang và có thể bạn chưa nhận ra điều này. Một trong số các lí do đó là bạn chưa bật cài đặt này lên để hiển thị thông báo về mọi lỗi script.
* Bật tính năng này lên và điều hướng qua tất cả các màn hình trên trang web của bạn
* Sử dụng những thông tin chi tiết để đưa vào trong báo cáo bug. Những thông tin này cũng giúp cho dev tìm ta được nguyên nhân gây lỗi nhanh và chính xác hơn. 
*  Vì bạn đã bật tính năng này lên, nên có thể bạn sẽ nhận được tất cả các lỗi script và phải chấp nhận bỏ qua chúng nhưng còn hơn là bỏ qua bug vì đã không bật tính năng này. 
*  Kết hợp quan điểm test này với Inspect Element > Console Error đặc biệt là với những trình duyệt khác ngoài IE.


# Các phím tắt trên bàn phím

![](https://images.viblo.asia/48ad598e-ff88-4266-91e0-17e7a7be11eb.png)

Nếu trang web của bạn hỗ trợ việc dùng các phím tắt trên bàn phím, bạn nên kiểm tra 2 điểm sau: 
* Phím tắt có hoạt động ngay khi bạn mở trang web ra không hay bạn cần phải chọn/bấm vào đâu đó để focus vào trang web.
* Kiểm tra xem các phím tắt có đè lên hay mâu thuẫn với những phím tắt phổ biến hay các phím tắt được cài đặt sẵn trong trình duyệt không
* Người dùng có thể tùy chỉnh các phím tắt này không?
* Những phím tắt này có sử dụng quá nhiều tổ hợp phím và rất khó để ghi nhớ không?
* Những phím tắt này có tuân theo một khuôn mẫu hay quy luật nào không hay được đặt ngẫu nhiên
* Những phím tắt này có thể dùng một bàn tay để bấm không?

# Những thay đổi chưa được lưu

![](https://images.viblo.asia/9602b7a7-edea-44c7-ad3a-7b938b657344.png)

Không ai muốn bị mất dữ liệu khi chưa kịp lưu lại. Vì vậy khi kiểm thử UX, bạn cũng nên đưa quan điểm này vào
* Thông báo cho người dùng biết họ đang có những thay đổi chưa được lưu trên trang hiện thời khi họ điều hướng sang màn hình khác. Giả sử người dùng đang nhập một biểu mẫu và lỡ click chuột vào 1 đường dẫn tới một địa chỉ khác hoặc điều hướng về trang trước và bạn không có cảnh báo nào. Tất cả dữ liệu chưa lưu trước đó sẽ mất hết. Người dùng sẽ cho rằng bạn không quan tâm đến dữ liệu của người dùng và UX.
* Cung cấp cho người dùng lựa chọn lưu dữ liệu dự phòng. Đồng thời, những phương án đơn giản như hình chụp trên có thể sẽ giúp duy trì lượng người dùng và tăng cao độ tín nhiệm của trang web về lâu về dài. 
* Một điểm đáng lưu ý ở quan điểm test này đó là bạn không nên lạm dụng tính năng này. Ví dụ như khi người dùng nhập dữ liệu vào và chọn HỦY, thi một hộp thoại xuất hiện cùng với tin nhắn cảnh báo. Chắc chắn sẽ làm phản tác dụng của nó.
* Hiểu được bối cảnh khi mà người dùng điều hướng giữa các chức năng. Thêm vào đó, xác định xem liệu bạn có cần cung cấp chức năng HỦY cùng với chức năng cảnh báo về những thay đổi chưa lưu không?


![](https://images.viblo.asia/a49f0554-85ed-43fd-a400-1b26f902f2bc.png)

Nguồn:
1. http://www.nngroup.com/topic/web-usability/
2. http://www.slideshare.net/arhan/usability-of-human-interfaces
3. http://communicationcloud.wordpress.com/2011/09/05/10-simple-ways-toimprove-softwares-usability/
4. http://www.ics.uci.edu/~kobsa/courses/ICS104/coursenotes/Microsoft_WindowsGuidelines.pdf