Những năm trở lại đây, ngành Công nghệ thông tin đang trở nên HOT hơn bao giờ hết. Chính vì vậy mà rất nhiều bạn học sinh sinh viên có nguyện vọng tham gia vào lĩnh vực này. Nhưng cụ thể như thế nào thì không phải bạn nào cũng hiểu rõ và định hướng được sẽ trở thành ai và làm công việc gì.
   Trong bài này, mình xin chia sẻ với các bạn một lĩnh vực mà người ta hay gọi với các thuật ngữ là tester, QA - Quality Insurance, QC - Quality Control - liên quan đến ngành kiểm thử phần mềm để các bạn hiểu thêm và có cái nhìn tổng quát về định hướng công việc tương lai của các bạn.
   
   Các nội dung chia sẻ được mình tổng hợp sau khi đã đọc cuốn sách **Software Testing: An ISTQB-BCS Certified Tester Foundation guide** xuất bản lần thứ 4 của nhóm các tác giả bao gồm Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams 
   
   Các bạn cũng có thể tìm mua trên Amazon: (https://www.amazon.com/gp/product/1780174926?pf_rd_p=2d1ab404-3b11-4c97-b3db-48081e145e35&pf_rd_r=KY7ME62983EWF9VM4M03)
 
   Sau khi đọc xong tất cả những chia sẻ của mình, các bạn sẽ phần nào hiểu được các nội dung như sau:

- Kiểm thử phần mềm là gì?

- Vì sao việc kiểm thử lại trở nên cần thiết như vậy?

- Lỗi (bug) là gì?

- Bảy nguyên tắc trong kiểm thử phần mềm

- Quy trình kiểm thử cơ bản

- Tâm lý học trong kiểm thử phần mềm

- Trách nhiệm của người thực hiện công việc kiểm thử phần mềm

**Bài hôm nay giúp chúng ta sẽ hiểu được thế nào là kiểm thử phần mềm, vì sao nó lại cần thiết đến vậy và kiểm thử phần mềm thì sẽ làm những gì?**

## I. Sự cần thiết của việc kiểm thử
Điểm qua một số ví dụ như sau:
1. 2019, Các vấn đề nảy sinh trong quá trình sản xuất máy bay Airbus A380 không được phát hiện nên dẫn đến hậu quả một loạt máy bay gặp sự cố sau khi cất cánh dẫn đến các vụ tai nạn hàng không hết sức nghiêm trọng.
Thiệt hại từ vụ tai nạn này ước tính khoảng 6,1 tỷ USD bao gồm chi phí trực tiếp và gián tiếp chưa tính đến thiệt hại về tính mạng con người và gây ra sự tổn thất không thể đền bù cho các gia đình nạn nhân.

2. Vi phạm an ninh tại quân đội Hoa Kỳ dẫn đến lộ thông tin chi tiết thanh toán của nhiều nhân sự.
Các thông tin bị xâm phạm, bao gồm tên, địa chỉ, email và chi tiết tài khoản ngân hàng của nhiều cá nhân và tổ chức.
Các thành phần đen tối lợi dụng thực hiện hàng ngàn giao dịch ảo để rút tiền bất hợp pháp gây tra thiệt hại số tiền lớn đến hàng tỷ USD.

3. Năm 1998, NASA tung phi thuyền vào quỹ đạo Khí hậu Sao Hỏa là nhưng hệ thống không định vị được vị trí của nó, cuối cùng phi thuyền bị mất tích  trong không gian mang theo 125 triệu USD biến mất.

===> Nguyên nhân chủ yếu  là do trong quá trình sản xuất và thử nghiệm, việc kiểm thử chất lượng của các sản phẩm này chưa được thực hiện hoặc đã thực hiện nhưng chưa đảm bảo đúng yêu cầu.

### Vậy, khi các sản phẩm công nghệ cao không được thực hiện kiểm thử một cách rõ ràng, chặt chẽ và chính xác thì sẽ gây ra nhưng hậu quả như sau:
* Mất tiền

* Mất thời gian

* Mất uy tín kinh doanh

* Tổn thương về mặt thể chất và tinh thần

* Thậm chí là tử vong

Từ các ví dụ và hậu quả được nêu ở trên, chúng ta thấy được rằng: Nếu muốn tránh các thiệt hại không đáng có xảy ra khi vận hệ một hệ thống, một sản phẩm công nghệ cao, chúng ta cần đảm bảo giữ cho phần mềm nằm dưới sự kiểm soát của con người.
Cụ thể:

1. Kiểm tra toàn diện các hệ thống phức tạp không khả thi bằng các kỹ thuật ước lượng, đo lường các trường hợp bất thường có thể xảy ra

2. Trong thực tế, chúng ta có thể kiểm tra tất cả các trường hợp hệ thống. 
    - Chúng ta chỉ có thể chọn một số trường hợp mẫu để kiểm tra nhưng như thế cũng đã góp phần vào việc hạn chế các trục trặc có thể xảy đến

3. Thử nghiệm các trường hợp bất thường và xem xét rủi ro đem lại để biết cách phòng tránh
    - Bởi vì chúng ta KHÔNG thể kiểm tra tất cả các trường hợp có thể xảy ra, nên chúng ta có thể thực hiện các trường hợp kiểm thử khả thi để chắc chắn phần mềm không có lỗi.
    -  Vì vậy, trong một số trường hợp việc mạo hiểm đưa phần mềm vào vận hành là cần thiết.

4. Kiểm thử và chất lượng có mối liên hệ mật thiết với nhau
    - Kiểm thử chất lượng là sự phụ thuộc với nhau trong tài nguyên tam giác như dưới đây. 
   
    ![](https://images.viblo.asia/7cd60f18-f022-4014-9529-9aad2fb9e8ca.png)

    - Vì vậy, bạn phải quyết định kiểm thử bao nhiêu là đủ để có thể dừng lại và đưa vào vận hành.

5. Khái niệm về quyết định khi nào **đủ là đủ**
    - Chúng ta rõ ràng KHÔNG thể kiểm tra tất cả các trường hợp của sản phẩm và chất lượng của nó còn phụ thuộc vào tam giác tài nguyên, do đó bạn phải quyết định khi nào nên dừng việc kiểm thử.
    
    -  Khía cạnh quan trọng nhất của việc đạt được kết quả chấp nhận được là việc thực hiện một loạt các thử nghiệm hữu hạn và hạn chế sẽ được ưu tiên.
    
    -  Khía cạnh quan trọng tiếp theo là thiết lập các tiêu chí sẽ cung cấp cho bạn một bài kiểm tra khách quan về việc liệu có an toàn để dừng thử nghiệm hay không.
 
##  II. Kiểm thử phần mềm là gì?

Từ các ví dụ và phân tích ở trên, chúng ta rút ra được kết luận như sau:

Kiểm thử phần mềm là hoạt động tìm lỗi của sản phẩm phần mềm đó để đảm bảo đạt được hai tiêu chí sau:

1. Tìm ra chúng càng sớm càng tốt
    
2. Chắc chắn rằng chúng đã được sửa kịp thời trước khi đưa vào vận hành

![](https://images.viblo.asia/50feb1fd-14ef-4b85-a230-3cc5b060b1eb.jpg)

## III. Kiểm thử phần mềm là làm những công việc gì?

Nói một cách ngắn gọn, công việc của người kiểm thử phần mềm sẽ bao gồm các hoạt động phục vụ các mục đích sau:

**1. Để kiểm tra sản phẩm phần mềm có hoạt động hay không**

* Muốn biết sản phẩm phần mềm có tốt hay không, trước hết bạn cần phải đảm bảo nó hoạt động được đã

* Cũng như muốn biết một chiếc ô tô chạy có êm hay không thì trước tiên bạn phải khởi động và lăn bánh được ô tô đã

**2.  Để kiểm tra nếu tất cả các yêu cầu về sản phẩm phần mềm đã được thỏa mãn**

* Với mỗi sản phẩm phần mềm, khác hàng đều mong muốn nó thực hiện được những yêu cầu mà họ đưa ra.

* Do đó, chất lượng của sản phẩm phần mềm cũng được đánh giá thông qua việc nó có mang lại sự thỏa mãn cho khách hàng khi đã đáp ứng được các yêu cầu họ đưa ra hay chưa

**3.  Để xem liệu mục đang thử nghiệm đã hoàn thành hay chưa, và hoạt động như người dùng và các chủ sở hữu khác mong đợi hay không**

* Với mỗi giai đoạn phát triển phần mềm, người ta đưa ra một số mục tiêu hoàn thành nhất định

* Công việc của các bạn là xem xem các mục tiêu tới hạn đó đã được thực hiện trọn vẹn hay chưa và nó hoạt động như thế nào, có đảm bảo được nhu cầu của khách hàng hay không

* Ngoài ra, khách hàng của bạn muốn bạn xây dựng một sản phẩm phần mềm với các yêu cầu của họ đưa ra để phục vụ cho khách hàng của họ, team phát triển của bạn hoàn toàn có thể đáp ứng được điều đó. Nhưng bạn là người kiểm thử phần mềm, bạn nên đặt mình vào vị trí khách hàng của khách hàng - hay còn gọi là người dùng cuối để xem xét rằng những điều đó đã hoàn toàn phù hợp với họ hay chưa. Đôi khi ĐÚNG nhưng chưa chắc đã PHÙ HỢP.

**4.  Để củng cố niềm tin vào chất lượng của sản phẩm được thử nghiệm**

* Chúng ta hoàn toàn có thể khẳng định rằng đảm bảo 100% sản phẩm phần mềm không có lỗi là điều KHÔNG THỂ

* Nhưng ít nhất chúng ta phải biết được rằng thời điểm nào là an toàn khi đưa sản phẩm phần mềm vào hoạt động

**5.  Để ngăn ngừa lỗi - đôi khi bạn có thể không bắt được chúng nhưng bạn ngăn chặn chúng xảy ra**

* Lỗi phần mềm sẽ sản sinh ra các hậu quả vô cùng nghiêm trọng nếu không được phát hiện và sữa lỗi kịp thời

* Việc của chúng ra là sử dụng tất cả các kỹ thuật kiểm thử có được để ngăn chặn tối đa điều đó xảy ra

**6.  Để tìm ra các thất bại và khuyết điểm của sản phẩm phần mềm một cách kịp thời và chính xác phục vụ công tác sửa chữa lỗi**

* Đây là điều hoàn toàn phải thực hiện được nếu mong muốn sản phẩm phần mềm hoạt động tốt và không xảy ra vấn đề nghiêm trọng nào

**7. Để cung cấp đủ thông tin để cho phép người có thẩm quyền đưa ra các quyết định đối với sản phẩm phần mềm**

* Kiểm thử phần mềm giúp các bạn có được cái nhìn tổng quá về chất lượng của sản phẩm phần mềm

* Từ đó đưa ra các kết luận để tham vấn cho các bên liên quan, hỗ trợ họ đưa ra các quyết định sống còn đối với sẩn phẩm phần mềm đó

**8. Để giảm tối đa mức độ rủi ro trong chất lượng phần của các sản phẩm phần mềm**

* Các sản phẩm phần mềm được ứng dụng vào hầu hết tất cả các lĩnh vực như tài chính ngân hàng, bảo hiểm, y tế, quân sự...

* Giảm thiểu tối đa rủi ro của chất lượng sản phẩm phần mềm là giảm thiểu tối đa rủi ro về thiệt hại kinh tế, quốc phòng an ninh và tính mạng con người


**9. Để tuân thủ các yêu cầu hoặc tiêu chuẩn của hợp đồng, đảm bảo tính pháp lý hoặc quy định đã được thống nhất**

* Mỗi sản phẩm phần mềm đều được xây dựng thông qua sự thống nhất của hai hay nhiều bên tham gia và mỗi bên đều có những yêu cầu cụ thể khác nhau nhưng đều hướng đến mục tiêu cung là mong muốn cho ra một sản phẩm đạt chất lượng cao

* Kiểm tra chất lượng sản phẩm phần mềm cũng góp phần quan trọng giữ gìn những sự thống nhất đó từ khi bắt tay vào sản xuất cho đến khi hoàn thành và đưa sản phẩm vào vận hành, bảo trì sản phẩm v.v...


### Nguồn: 

Sách Software Testing: An ISTQB-BCS Certified Tester Foundation guide, xuất bản lần thứ 4

Nhóm tác giả: Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams