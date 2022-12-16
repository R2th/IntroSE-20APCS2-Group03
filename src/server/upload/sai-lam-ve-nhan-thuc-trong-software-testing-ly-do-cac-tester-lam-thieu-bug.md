**Sai lầm về nhận thức trong software testing: Bạn đã từng bị ảnh hưởng chưa?**

Software testing đang chuyển động ở 1 tốc độ rất nhanh với các tiến bộ trong lĩnh vực công nghệ để đảm bảo “chất lượng ở tốc độ ánh sáng”.

“Tích hợp liên tục, chuyển đổi kỹ thuật số, tự động hóa vòng đời, chất lượng ngày càng đc cải thiện để giảm thiểu chi phí ”… là một số từ kỳ diệu đang ở khắp quanh ta. Trong khi chúng ta nói về những điều này, câu hỏi cơ bản - "Tại sao và làm thế nào khuyết điểm đã bị bỏ xót" vẫn tiếp tục được tìm thấy mà vẫn chưa có câu trả lời thỏa đáng.

Và tại những thời điểm chúng ta có cảm giác những khuyết điểm rõ ràng bị bỏ xót.

Nhưng tại sao nó lại xảy ra?

Mặc dù tất cả chúng ta đều muốn nghĩ rằng chúng ta rất logic, có cấu trúc hợp lý, nhưng thực tế đáng buồn là tất cả chúng ta đều chịu ảnh hưởng của các nhận thức sai lầm cái mà ảnh hưởng từ quá trình tư duy của chúng ta trong cuộc sống hàng ngày bao gồm cả công việc.

## Nhận thức sai lầm – Mô tả ngắn gọn

Theo Wikipedia - “1 nhận thức sai lầm là một mô hình có hệ thống của sự lệch hướng từ qui tắc hay tính hợp lý trong sự phán xét. Cá nhân tạo ra "thực tại xã hội chủ quan" của riêng họ từ nhận thức của họ về đầu vào.
Việc xây dựng thực tại xã hội của một cá nhân, không phải là đầu vào khách quan, có thể dẫn đến hành vi của họ trong xã hội. Do đó, các nhận thức sai lầm đôi khi có thể dẫn đến biến thể tri giác, phán đoán không chính xác, giải thích phi lý, hoặc bất hợp lý. “

Và đó là định nghĩa. Nhưng nó tác động như thế nào đến suy nghĩ và ý nghĩa của nó đối với các tester trong testing là gì?

Khi các tester tiếp cận bất kỳ việc test nào, họ đã bị ảnh hưởng bởi những thành kiến riêng của họ - những khung suy nghĩ và phán đoán dựa trên những gì cần tìm, nơi sẽ có những khiếm khuyết tiềm ẩn sắp tới, người đang phát triển nó, toàn bộ lịch sử của chương trình, v.v. và nhiều thứ khác.

Chúng tôi rất cần biết về các loại khuynh hướng khác nhau để chúng tôi có thể nhận thức rõ hơn và thực sự nghĩ đến việc quản lý chúng một cách hiệu quả

Tìm kiếm các loại nhận thức sai lầm trong software testing

Có các nhận thức sai lầm khác nhau mà chúng ta cần tìm trong chính bản thân chúng ta và một trong số đó được giải thích chi tiết bên dưới đây.
![](https://images.viblo.asia/e362259a-e696-4a72-9b2c-c7ef171139ff.png)https://images.viblo.asia/e362259a-e696-4a72-9b2c-c7ef171139ff.png

## 1) Khuynh hướng tương tự

Nó rất dễ dàng cho con người để đánh giá một tình huống dựa trên sự giống nhau của một tình huống tương tự.

Ví dụ, với tư cách là các tester, chúng ta thường có xu hướng nghĩ rằng các ứng dụng web sẽ có các loại lỗi tương tự trong khi các ứng dụng client-server sẽ có một bộ lỗi tương tự.

Chúng ta là các tester , mặc nhiên sẽ chỉ tìm ra những lỗi tương tự tùy thuộc vào bản chất của dự án. Thật không may, bởi vì bản chất này, đôi khi chúng ta có xu hướng bỏ lỡ những điều rõ ràng nhất chỉ vì tâm trí của chúng ta đã không cho phép chúng ta suy nghĩ điều đó.

## 2) Xu hướng hợp thức hóa

Đây là hành vi mà tâm trí chúng ta từ chối suy nghĩ về các lựa chọn thay thế.

Nó có nghĩa là, các tester có xu hướng xác nhận rằng chỉ có các hành vi đã mong muốn và kết quả là các xác thực phủ định (negative validations) được loại bỏ.

Khi viết test case, chúng ta có xu hướng bao quát tất cả các yêu cầu với hành vi mong muốn của chúng và bỏ lỡ các negative flow vì không phải tất cả các negative flow đều được đề cập cụ thể trong các yêu cầu.

Chúng ẩn chứa trong các yêu cầu và thực tế là các yêu cầu không thể ghi lại tất cả các hành vi của người dùng. Và trong thực tế, bản thân khách hàng khi đưa ra yêu cầu họ cũng chỉ đưa ra được điều họ mong muốn, còn những trường hợp không mong muốn thì họ không hề nhắc tới.

## 3) Khuynh hướng xác nhận

Đây là xu hướng tìm kiếm và diễn giải thông tin bằng xác nhận niềm tin và các giả thuyết của chúng ta.

Thông thường, trong môi trường testing, chắc chắn rằng chúng ta sẽ có các tình huống mà chúng ta cho rằng code của 1 bạn developer theo mặc định sẽ có nhiều lỗi hơn khi so sánh với những người khác và do đó chúng ta đã dành rất nhiều thời gian để test mô-đun do anh ấy phát triển.

Dưới sự ảnh hưởng của những niềm tin này sẽ có xu hướng làm tăng nguy cơ thiếu xót lỗi trong các mô-đun được phát triển bởi những người khác.

## 4) Các hiệu ứng trào lưu

Các hiệu ứng trào lưu khẳng định các hành vi hoặc niềm tin (tín ngưỡng) đồn đại lan truyền trong mọi người.

Khi một số người nhất định tin vào một cái gì đó, sau đó nó sẽ tự động làm tăng xác suất của người khác cũng tin như vậy. Điều này xảy ra nhiều lần trong cuộc sống hàng ngày của chúng ta.

Một ví dụ phổ biến nhất là khi chúng ta mua một số sản phẩm. Thay vì chúng ta độc lập lựa chọn một sản phẩm, chúng ta thường đi liền với niềm tin của người khác.

Chính các hành vi tương tự cũng được hiển hiện trong testing. Trong nhóm tester của chúng ta, nếu một số người cảm thấy rằng một mô-đun cụ thể là không có khuyết điểm, chúng ta vô tình có xu hướng tin tưởng tương tự và sự chú trọng chúng ta dành cho mô-đun đó trong quá trình test sẽ giảm đáng kể.

## 5) Mù nhận thức

Đây là một hành vi rằng các tester, chúng ta có xu hướng bỏ lỡ những khiếm khuyết rõ ràng nhất khi chúng ta không tìm kiếm nó.

Hãy tưởng tượng một tình huống, ở đó, bạn yêu cầu một nhóm người đếm số lượng người đến với một chiếc váy màu đặc biệt, bạn có thể quan sát thấy mọi người sẽ rất hăng say trong việc đếm nó và họ bỏ lỡ việc nhìn bất kỳ điều quan trọng nào hoặc thứ quan trọng nào khác xung quanh họ .

Để liên kết điều này với testing, ví dụ trong một dự án, một trong những màn hình được phát triển mới thì xu hướng tự nhiên của những tester tập trung vào màn hình mới được phát triển hơn và bỏ lỡ những tích hợp quan trọng khác. Đôi khi sẽ bỏ quên những tính năng cũ có bị ảnh hưởng hay không, data cũ có tích hợp được với sự thay đổi mới hay không.

## 6) Xu hướng tiêu cực

Xu hướng tiêu cực là một khuynh hướng của con người đặt nặng tâm lý cho những trải nghiệm xấu hơn là một trải nghiệm tốt.

Trường hợp này vào nơi nào trong testing? Rất khó để thuyết phục các tester ngừng đưa 1 bản build tới production vì sự chú ý của họ sẽ chỉ dựa trên những khiếm khuyết mà họ đã không bao hàm được.

Không lúc nào mà họ có thể xác nhận rằng hoàn toàn không có khiếm khuyết trong sản phẩm. Đây là một trong những lý do chính mà quyết định Go-Live cho một sản phẩm sẽ phụ thuộc business manager mặc dù đề xuất được đưa ra bởi test manager.

## Kết luận

Hy vọng bạn sẽ có một ý tưởng tốt hơn về nhận thức sai lầm trong software testing, sự ảnh hưởng của nó, và những gì có thể được thực hiện để loại bỏ những ảnh hưởng đó?

Và một thực tế quan trọng để nhận ra là chúng ta đã quá mù quáng đối với những thành kiến riêng của chúng ta trong khi chúng ta có thể xác nhận được những thành kiến của người khác (điều này là một điểm mù nhận thức). Tuy nhiên, chúng ta có thể ý thức hơn và hướng tới 1 tư tưởng rộng mở hơn, chúng ta có thể mở rộng thêm suy nghĩ về những điều này bất cứ nơi nào khi cần thiết.

Tham khảo: [https://www.softwaretestinghelp.com/cognitive-bias-in-software-testing/](https://www.softwaretestinghelp.com/cognitive-bias-in-software-testing/)