Ngày nay, công nghệ gần như đã là một phần không thể thiếu của cuộc sống. Và đi cùng sự phát triển đó, đội ngũ đứng phía sau những công nghệ này khó có thể không nhắc đến đội ngũ developer và các tester. Sự hoàn hảo của một ứng dụng, một website có nhiều công sức và đóng góp của họ. Tuy vậy, tester hay developer(dev) tuy cùng phát triển lên một sản phẩm nhưng họ có nhiều những suy nghĩ và quan điểm  khác nhau. Và dù bạn là một tester hay 1 deverloper, hãy cùng xem những quan điểm trái ngược này đã góp phần gì cho việc phát triển và hoàn thiện 1 sản phẩm công nghệ nhé.
 
Một điều tất nhiên mà tester  hay dev hướng tới đều là 1 sản phẩm chất lượng cho người dùng hay doanh nghiệp. Tuy nhiên, đối với 1 dev, câu hỏi thường trực trong đầu họ luôn là: "Phải làm thế nào để làm ra sản phẩm này" , trong khi đó, câu hỏi của 1 tester thường xuyên phải nghĩ tới là: "Làm thế nào thế nào để phá hỏng chúng đây?" 
![](https://images.viblo.asia/06b10838-013e-4648-bd8e-95bba3d3ced1.jpg)

Tại sao lại như vậy? Có thể nói dev và tester luôn hành động giống như trò đuổi bắt vậy, dev đứng trên phương diện người phát triển, xây dựng lên sản phẩm nên họ có thể "quên" đi những yêu cầu thực tế từ người dùng, và tester bổ khuyết vào những điều đó. Tester đứng vai trò như một người sử dụng  và còn hơn cả người dùng, tester có nhiều cách nghĩ "Think out of the box" để có thể nghĩ tới tất cả các tình huống tốt/xấu có thể xảy ra đối với ứng dụng đó. Và trò đuổi bắt này chỉ kết thúc khi ứng dụng này không bị phá hỏng và tồn tại trong môi trường của chính nó.

Phát triển bất cứ ứng dụng nào, Software Development life Cycle (SDLC) đều đóng vai trò vô cùng quan trọng. Vì việc sửa chữa các sai sót/ khiếm khuyết ở giai đoạn cuối cùng đã được chứng minh là rất khó khăn và tốn kém. vậy nên  để tránh những điều phức tạp, kiểm thử phần mềm đã ra đời như một phần quan trọng trong chu trình SDLC. Điều đó có nghĩa là việc kiểm thử hày chính là các tester sẽ bắt tay vào công việc ngay từ những bước đầu tiên của chu trình phát triển.
Vậy hãy cùng xem những quan điểm của tester và dev ở từng giai đoạn khác nhau của SDLC như thế nào:
![](https://images.viblo.asia/09b13852-369d-4c25-9179-d3993152fdf5.png)
## 1. Thu thập và phân tích yêu cầu

Ở giai đoạn này, bắng cách thu thập yêu cầu 1 tài liệu sẽ được xây dựng dựa theo nó. Tài liệu yêu cầu (spec) này được chia sẻ với đội ngũ kiểm thử để họ nắm vững yêu cầu của ứng dụng bằng cách đặt các câu hỏi của họ dưới dạng “Review comment”. Các review này hoàn toàn có thể là các suy đoán hoặc phân tích chủ quan của họ về 1 vấn đề nào đó trong spec. 

Ví dụ: Người dùng cuối yêu cầu : "Texbox ABC cấm không cho phép nhập các kí tự đặc biệt ở đây". Lúc nào, sẽ có các quan điểm khác nhau từ phía dev và test:

- Quan điểm của dev : Viết code để check xem khi người dùng nhập bất kỳ ký tự đặc biệt nào thì hiển thị thông báo lỗi phù hợp. 
- Quan điểm của tester : Họ sẽ có nhiều kịch bản tình huống xảy ra trong đầu:
 + Điều gì sẽ xảy ra nếu có ký tự đặc biệt trong ô nhập? Nó sẽ hiển thị gì cho người sử dụng?
 + Điều gì sẽ xảy ra nếu người dùng copy và paste kết hợp ký tự đặc biệt và ký tự số vào ô nhập đó?

 Họ sẽ phải tự đặt ra nhiều câu hỏi bởi vì người dùng cuối có thể là bất kì ai và sử dụng sản phẩm thêm bất kì cách nào.
 
##  2. Thiết kế hệ thống 

 Ở giai đoạn này,  dev bắt đầu thiết kế trên ứng dụng.
Ngược lại, ở phía tester, họ dựa vào các tài liệu sẵn có cùng với kinh nghiệm của mình xây dựng các kịch bản có thể xảy ra đối với người dùng. Họ xây dựng lên kịch bản kiểm thử để phục vụ cho việc kiểm thử của mình đối với ứng dụng. 


## 3. Phát triển phần mềm 

Lúc này, dev đã thực hiện hoàn thiện phần phát triển. Đối với các dev thì họ sẽ thực hiện phát triển dựa trên các chức năng yêu cầu và đối với họ sản phẩm tạo ra sẽ hoàn toàn theo đúng ý của khách hàng. 
Nhưng ngược lại, từ phía tester, họ dựa vào các tình huống đã xây dựng trong kịch bản kiểm thử để tìm ra các lỗ hổng mà dev tưởng chừng như chúng sẽ không xảy ra . Hoặc cũng có trường hợp dev hiểu sai spec và xây dựng sản phẩm của mình theo 1 cách hoàn toàn khác. Và nhờ có tester, các vấn đề này có thể được tìm ra nhanh chóng, 

## 4. Kiểm tra hệ thống

Trong giai đoạn này, các dev deploy ứng dụng lên môi trường / môi trường QA (môi trường có sẵn cho các testers thực hiện việc test).
Dev deploy ứng dụng với quan điểm rằng các chức năng thực hiện được phát triển một cách hoàn hảo theo các yêu cầu đã được nêu ra; họ chỉ đưa các ứng dụng này cho testers để xác nhận lại.
Nhưng đối với các tester, khác với các chức năng mong muốn, có rất nhiều cách khác nhau khác nhau mà người dùng có thể nghĩ ra khi sử dụng một ứng dụng cụ thể. Đó là nhiệm vụ của các tester nhằm sử dụng tư duy sáng tạo của chính mình và khám phá tất cả các kịch bản có thể xảy ra. 

## 5. Bảo trì 
![](https://images.viblo.asia/95be7b41-d6ab-4d49-a75b-4bfdddccfe40.jpg)

Giai đoạn này chính là giao đoạn kiểm tra sự hợp tác giữa các dev và tester 

Sản phẩm sau khi hoàn thiện sẽ được gửi đến người dùng. Và nếu có bất kì sai sót nào, nó sẽ đòi hỏi sự hợp tác từ cả 2 phía để  xem xét và chỉnh sửa lại sai sót này nếu cần. 
Testers và dev cùng nhau tạo nên một team hiệu quả như thể nó là trách nhiệm cần hoàn thành nhằm đảm bảo có sản phẩm tốt nhất. Điều này đạt được nếu cả hai cùng phối hợp làm việc với những hiểu biết đúng đắn và thu thập những ý kiến phản hồi tích cực.

**Hãy cùng xem một vài điểm quan trọng để xác định vai trò của Testers và Dev**

- Dev đảm bảo những gì mình xây dựng đúng theo Spec, và với họ như vậy là đủ
- Test phải luôn nghĩ răng: sẽ luôn luôn có bug tồn tại, và việc của mình là phải tìm ra chúng 

Có thể 1 dev sẽ có khả năng tự test rất tốt tuy nhiên điểm quan trọng là một người thì không nên tự test cái mà mình đã tạo ra/ ứng dụng của riêng mình. Tester không bị ảnh hưởng suy nghĩ từ 1 người phát triển và họ luôn có cái nhìn khách quan nhất , họ kiểm thử dựa trên kinh nghiệm của mình và kiểm thử tất cả các tình huống có thể xảy ra.
Như vậy:  mục tiêu chính mà Testers hướng đến là "Cái gì đang sai". Trọng tâm chính của các dev là vận hành dự án đúng với yêu cầu.
![](https://images.viblo.asia/ef35b59b-3494-405a-97ba-4022f970abb4.jpeg)

Với mục tiêu khác biệt đó, tester luôn phải cố gắng tìm ra lỗi và phản ánh nó với dev. Và 1 tester có kinh nghiệm sẽ luôn biết cách khéo léo thông báo các vấn đề này với dev để dev có thể giải quyết chúng 1 cách tốt nhất. 

Còn đối với 1 dev, việc phát triển là chưa đủ, họ còn phải biết lắng nghe ý kiến từ tester, nhận lấy phản hồi một cách tích cực và có tính xây dựng, chuẩn đoán các vấn đề, và debugs chúng và biết cách tránh các xung đột có thể gây ra trở ngại giữa 2 bên.

**Kết luận**
Vì mục tiêu chúng của cả dev và test đều là xây dựng 1 sản phẩm tốt nhất cho khách hàng, vì vậy, việc dung hòa giữa các quan điểm của nhau là 1 điều cần thiết. Dev là không thể thiếu trong việc phát triển phần mềm. Và 1 sản phẩm khó có thể hoàn thiện nếu thiếu đi các tester. Vì vậy, dù là dev hay là tester, hãy luôn học cách hợp tác để cùng nhau phát triển và xây dựng một sản phẩm tốt nhất tới tay người dùng. 

Bài viết được tham khảo từ trang: http://www.softwaretestinghelp.com/the-difference-in-perspective-of-testers-and-developers/