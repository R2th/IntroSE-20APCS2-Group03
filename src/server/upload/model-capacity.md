Model Capacity là gì?

Chúng ta hiểu nôm na Model Capacity có nghĩa là độ phức tạp của mô hình. Trong Machine Learning, Deep Learning có vô vàn mô hình (hay giải thuật - tuy nhiên thường được gọi là mô hình vì cùng một giải thuật, nhưng thay đổi chút chút ta đã có một mô hình khác), đơn giản có, phức tạp có. Nhiều trong số đó rất dễ hiểu, chẳng hạn như Linear Regression gần gũi với chúng ta nhưng đường thẳng y = ax + b vậy, nhưng cũng có những mô hình vô cùng phức tạp, thậm chí có những mô hình còn được tạo bởi nhóm của các mô hình khác (chẳng hạn như mô hình WaveNet sử dụng nhiều mô hình WaveNet có độ phức tạp nhỏ để làm tiền đề cho WaveNet có độ phức tạp lớn). Nếu bạn mới học về lĩnh vực này thì việc bị đắm chìm bởi không biết nên dùng giải thuật nào, mô hình nào cho bài toán nào. Thậm chí "google" cùng một bài toán mà có tới mấy cách giải bằng các phương pháp khác nhau ! Chính vì vậy, đã - đang - và sẽ có những newbie bơi vào các diễn đàn, nhóm học tập hỏi những câu hỏi ngô nghê như "Em nên dùng giải thuật nào cho bài toán này ?" hay "Em nên sử dụng bao nhiêu lớp, bao nhiêu unit cho một lớp" ... Các bạn mới học, hỏi những câu như vậy là chuyện bình thường, nhưng điểm dở là mỗi ngày, mỗi tuần hay mỗi tháng, chúng ta luôn có những newbie mới, và những câu hỏi như vậy cứ liên tục bị hỏi đi hỏi lại. Điều này cũng khiến cho không ít những "lão làng" cảm thấy khó chịu, hoặc đơn giản là muốn phớt lờ chúng. Có nhiều bạn "già" hơn các newbie kia một chút, rất muốn giúp đỡ, nhưng mới bớt non thôi và kết quả là mình chưa đúng -> vội giúp người -> người hiểu lệch chút nữa -> ... -> rất nhiều các newbie sau này càng cảm thấy hoang mang hơn. Chính vì vậy tôi hi vọng mình viết bài này để...khiến các bạn hoang mang hơn nữa 😃

![](https://images.viblo.asia/44f24fb4-6a7d-4eeb-8311-f0fb0cd3eb1f.jpg)

1. Mô hình tuyến tính và phi tuyến tính:
Chuyện gì chứ chuyện ta được nghe ra rả về những mô hình này là tuyến tính, mô hình kia là phi tuyến, dữ liệu này tuyến tính nên áp dụng mô hình tuyến tính thôi, dữ liệu kia phức tạp lắm nên phải phi tuyến tính mới làm được... Tuyến tính thì để tránh cái chuyện chuyên môn, thì cứ cái gì thẳng và phẳng thì ta gọi là tuyến tính. Ví dụ như, ra đường bọn đàn ông, con trai chỉ thích nhìn mấy chị em phi tuyến tính thôi, chứ gặp ai tuyến tính là chúng nó chê ỏng chê eo liền. Vậy nên ta có đường thẳng là tuyến tính, mặt phẳng cũng là tuyến tính, và hàm số mà mô tả những thằng đó thì cũng là tuyến tính -> những hàm số kiểu như vậy nhưng mô tả ở không gian nhiều chiều hơn thì cũng tuyến tính nốt.

![](https://images.viblo.asia/7130b320-683a-49d3-9946-ae0907aa5265.png)
Phi tuyến tính: ở đời thì nói thực là cái gì phi tuyến tính cũng đẹp, nhìn cái thước kẻ với cây liễu thì ta ngắm liễu cả ngày thẩn thơ chờ trời tối còn đỡ cực hơn ngồi phòng thi 90 phút mà ngắm thước kẻ đợi giấy báo trượt. Ấy vậy mà Tây Thi màn hình cong lại có họ với Thị Nở màn hình phẳng đấy, tới đây chắc có bạn nhớ bạn quên 😃 . Bản chất thì mấy ông cong chẳng qua được tạo bởi vô số các ông thẳng, nên nếu là người yêu cái cốt lõi, mình khuyên thật, cứ tường vách trường tồn với thời gian còn hơn cam bưởi hóa mướp lúc nào không hay.

![](https://images.viblo.asia/12101722-34d3-4ee4-b7e2-aa4874f20e60.jpg)
2. Dung lượng của mô hình:
Chuyện dung lượng của mô hình này, nhiều khi nghe cứ kì kì. Nó như chuyện phân giai cấp vậy, dung lượng lớn thì mô hình khôn lắm còn nhỏ thì ù ù cạc cạc học hơi khó tí là chịu. Ấy vậy mà chẳng phải cứ khôn là nên thân, ối cha khôn quá, các gì cũng nhớ cái gì cũng học, thành thử ra tốt xấu học cả, kết cục là gặp vấn đề mới lại chẳng xử lý được.

![](https://images.viblo.asia/73aa0e75-1046-43d2-a6db-4da4abce80f0.jpg)

Vậy nên lĩnh vực này, "nhà có điều kiện" lại không phải là yếu tố then chốt. Học bốc vác tại các bến phà thì nhiều chữ để mà làm gì, lại nghĩ nhiều, lại tưởng mình bốc được hai ba bao gạo là có thể làm đốc công, quản lý. Dung lượng của mô hình đủ dùng, càng đơn giản càng tốt, vừa đỡ tốn chi phí tính toán mà lại vừa áp dụng tốt.
![](https://images.viblo.asia/499e2a89-234d-4419-804c-28c0f44fb277.png)


Quay lại câu chuyện tuyến tính kia, đường thẳng là tuyến tính, parabol là phi tuyến tính nhưng parabol thì chỉ nằm trên mặt phẳng thôi nên parabol 2 chiều ở trên không gian 3 chiều trở lên thì cũng chỉ là một anh tuyến tính không hơn không kém. Nhưng điều đó lại rất có ý nghĩa trong việc biến một mô hình tuyến tính thành phi tuyến tính nhưng lại vẫn giải quyết như tuyến tính 😃

![](https://images.viblo.asia/0735adfb-261d-41a6-89f4-682233eb3221.png)

Điều trên có nghĩa là, kể cả bạn chỉ học có 1 giải thuật đơn giản thôi, nó chỉ mô tả được dữ liệu tuyến tính thôi, nhưng bạn có tiềm năng xử lý chẳng khác gì mấy ông to cả. Câu chuyện là bạn áp dụng cái mô hình đơn giản kia của bạn ở đâu, không gian nhiều chiều hay ít chiều.

![](https://images.viblo.asia/b86d06c8-cbc5-479f-8f9a-b044b2f94c28.jpg)

Vậy thì cái vấn đề đặt ra ở đây là gì ? Tại sao mô hình tuyến tính của mạnh mẽ như phi tuyến tính thì tại sao ta phải dày công tạo ra biết bao nhiêu mô hình phức tạp, nên không muốn nói là chỉ nhìn vào số lượng thôi đã làm nản lòng biết bao người "hiếu học" !

![](https://images.viblo.asia/b4960a42-e867-4166-b463-20759564f1a5.gif)

Vấn đề là thời gian ! Ta có thể dành cả tuổi thanh xuân để "độ" phẳng thành cong nhưng rồi thì độ xong có được dùng không hay chỉ cái giai đoạn tích tiền đi "độ" kia thôi cũng khiến bạn chui vô hòm rồi. Chưa kể bạn có tiền nhưng phải đợi khoa học phát triển thì thậm chí tới cháu bạn cũng những người thương cũng vô hòm theo rồi ấy. Bạn giỏi, học gì cũng được, nhưng lại đợi học hết tất cả mới đi làm thì ... Kiến thức vô biên, chỉ có quay đầu là bờ thôi. Lĩnh vực này cũng vậy, bạn thỏa sức tăng độ phức tạp nhưng cái thời gian để bạn đợi cho mô hình học xong có thể tính bằng tháng, bằng năm bằng đời người hay thậm chí tính bằng những cái "vĩnh hằng". Ối người cũng nói giờ dữ liệu nhiều, máy xịn, nên chuyện ngày xưa không làm được bây giờ lại đâm ra dễ ! Chuyện này cũng đúng nhưng dữ liệu nhiều thôi chứ không vô biên (chưa kể là chỉ nhiều ở một số lĩnh vực), máy xịn hơn chứ không phải tính gì cũng tốc độ ánh sáng (chưa kể ánh sáng còn đi mòn mỏi mới từ dải ngân hà này sang cái khác được)

Lúc này chuyện đơn giản với phức tạp bị lu mờ, ta cần cái thích hợp. Hot girl xịn đấy nhưng không phải hợp với tất cả mọi người, Thị Nở xấu đó nhưng không phải không có ai thương. Quan trọng là ở chữ "hợp", thậm chí là "buộc phải hợp". Ti tỉ mô hình được tạo ra cũng chỉ mong nó hợp với bài toán cần giải, đôi khi không tìm được cái hợp ngay mà người ta đi tìm cái gần hợp, để rồi kéo nhau về ở lâu mà trở nên hợp.

Bài viết được tham khảo và dịch từ http://www.deeplearning.org/