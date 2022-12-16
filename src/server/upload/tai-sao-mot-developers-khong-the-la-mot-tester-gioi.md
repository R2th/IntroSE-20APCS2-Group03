Bạn có thể dạy một con chó rất nhiều những mánh khóe nhưng bạn lại không thể dạy nó làm thể nào để bay, đó là hoạt động dành riêng cho loài chim, đĩa bay hay máy bay…. 
Tôi đã cố gắng giải thích cho một nhóm Agile rằng tại sao developers thông thường không phải một người kiểm thử giỏi, vì vậy sau khi làm việc rất chăm chỉ để nhớ được tất cả những lý do tôi có thể nghĩ ra (dựa trên kinh nghiệm của tôi từ trước đến nay) tôi quyết định đặt chúng lại với nhau để đưa ra 1 danh sách ngắn và đăng nó. 
Đừng hiểu lầm rằng tôi nghĩ developers nên tham gia vào một phần của công việc kiểm thử, đặc biệt là trong nhóm Agile, nhưng tôi nhận thấy được những sự hạn chế của họ và các điểm mù nhận thức có xu hướng gây hại cho công việc thử nghiệm, và như nói trước đây, bước đầu tiên để cải thiện điểm yếu của bạn là hiểu bạn có chúng. 

Tại sao developers thường thiếu kinh nghiệm kiểm thử? 

# 1. “Cảm xúc của cha mẹ” đối với chính code của mình tạo ra

Developers thường có sự liên kết cảm xúc với những thứ họ viết. Nó rất khó để có được 1 cái nhìn khách quan về những thứ mình tạo ra. 
Ví dụ: Bạn biết đứa con của mình không hoàn hảo nhưng vẫn cảm thấy rất khó khăn nếu có một ai đến góp ý hay chỉ chích đứa con của mình bằng bất kỳ cách nào (sau tất cả bạn vẫn thấy chúng hoàn hảo đúng không? :) )

# 2. Thường tập trung vào “Đường dẫn tích cực”

Công việc phát triển được dựa trên việc lấy các kịch bản tích cực và thiết lập chúng trên sản phẩm. Hầu hết developers tập trung vào việc nỗ lực làm mọi thứ hoạt động tốt và hiệu quả, …. Việc chuyển đổi chúng từ một góc nhìn tích cực, có tính xây dựng sang một góc nhìn tiêu cực, cái mà có thể đi sai là không tầm thường và rất khó để đạt được trong một thời gian ngắn. 


# 3. Làm việc dựa trên nguyên tắc đơn giản hóa các kịch bản phức tạp 

Một trong những điều cơ bản mà tester làm như một phần của công việc kiểm thử đó là tìm kiếm những kịch bản phức tạp (ví dụ như thực hiện nhiều hành động cùng một lúc  hoặc thực hiện thao tác lặp đi lặp lại nhiều lần …. ) để phá vỡ hệ thống và tìm ra lỗi. Vì vậy chúng tôi cơ bản là lấy những điều đơn giản và tìm ra những cách để có thể làm phức tạp nó. 

Mặt khác, các đối tác phát triển của chúng tôi được đào tạo để thực hiện một quy trình phức tạp hoặc một dự án phức tạp, chia nó ra thành các thành phần nhỏ nhất có thể cho phép họ tạo ra một giải pháp (Tôi vẫn nhớ rằng tôi bị sốc ở trường đại học, lần đầu tiên tôi có thể hiểu rằng tất cả các máy tình có thể làm việc với  AND, OR, KHÔNG, NAND, NOR, XOR và XNOR trên Zeros & Ones).

# 4. Không có khả năng bắt những thứ nhỏ trong một bức tranh lớn

Tôi không thể giải thích lý do đằng sau của việc này, nhưng tôi có thể nhìn thấy rất nhiều lần trong suốt quãng thời gian làm kiểm thử của mình. 
Một trong những ảnh hưởng từ việc trở thành một người thử nghiệm giỏi là phát triển ý thức (gần như vô thức) phát hiện ra những gì không phù hợp không bức tranh. Cách tốt nhất để mô tả nó là bằng sự cảm giác mà người ta có được khi có gì đó không phù hợp trong bức tranh nhưng chúng ta không thể đặt tay lên nó, sau đó bằng cách áp dụng một số quy trình, chúng ta có thể tìm ra được vấn đề cụ thể. 
Có một developers từng nói với tôi rằng những người kiểm thử giỏi có thể ngửi thấy lỗi và có lẽ họ ở không quá xa sự thật 

# 5. Thiếu quan điểm từ đầu đến cuối của người dùng thực 

Do bản chất công việc của họ, hầu hết các developers tập trung vào một thành phần riêng lẻ hoặc tính năng riêng lẻ trong sản phẩm của họ, trong khi họ vẫn duy trì một ý tưởng mơ hồ về cách làm thể nào người dùng của họ làm việc với hệ thống đầu cuối. Người kiểm thử cần có tầm nhìn rộng hơn nhiều về các sản phẩm của mình, những người kiểm thử được yêu cầu phải hiểu và kiểm tra toàn bộ chúng trong khi sử dụng các kỹ thuật cái mà cho phép những người kiểm thử mô phỏng cách người dùng cuối cùng sẽ làm việc trong thế giới thực.

# 6. Ít kinh nghiệm với các lỗi chung phổ biến và cạm bẫy ứng dụng

Một lần nữa một cái gì đó cái mà đi kèm với thời gian và kinh nghiệm là kiến ​​thức của những người kiểm thử về các lỗi chung phổ biến và cạm bẫy ứng dụng. Rõ ràng là khi một nhà phát triển tích lũy KLOCs trên bàn phím của mình, anh ta cũng sẽ gặp nhiều lỗi và cạm bẫy, nhưng là một người thử nghiệm, chúng ta sẽ có được trải nghiệm này nhanh hơn và theo nghĩa sâu sắc hơn.

Một người kiểm tra có kinh nghiệm nhìn thấy một biểu mẫu và tự động bắt đầu suy nghĩ về các lỗi chung phổ biến mà anh ta có thể tìm thấy trước đó và bắt đầu kiểm tra chúng.

## Lời cuối cùng

Không phải là developers không muốn làm điều đó, chỉ đơn giản là họ không thể kiểm tra theo cách giống như tester đã làm. Điều này không có nghĩa là họ không thể giúp gì trong việc kiểm thử và ở một số khu vực cụ thể họ sẽ có thể làm điều đó thậm chí còn tốt hơn tester, nhưng trước khi họ bắt đầu, tester có thể giúp họ lập bản đồ điểm mù thử nghiệm cái mà có thể bù đắp cho họ

Thử nghiệm dành cho developers bổ sung rất nhiều giá trị cho quy trình thử nghiệm chung... Tôi thậm chí còn nghĩ khi tôi viết bài này về một bài đăng trong tương lai về chủ đề giá trị gia tăng thu được từ việc ghép nối kiểm thử từ developers và tester.

*Nguồn tham khảo*: https://qablog.practitest.com/why-cant-developers-be-good-testers/