Chà, đợt này mình bỗng thấy cần phải tích luỹ thêm nhiều kiến thức hơn và đồng thời lưu lại những kinh nghiệm mình từng trải qua một cách thật chi tiết, có phân tích kĩ càng để sau này còn ngó lại.

Chào mừng các bạn tới với bài viết nhằm phân tích những khác biệt khi SE và BrSE phải đối mặt với khối lượng công việc lớn hơn khả năng của mình. Để chuẩn bị trước tinh thần cho các bạn chim non mới bước chân vào ngành IT, đồng cũng là tài liệu tham khảo cho các bạn chưa có cơ hội được trải nghiệm ở các dự án khó khăn, có team size tương đối lớn và yêu cầu cao.

![](https://images.viblo.asia/d81573a2-5af8-4ab4-92f8-c1ae265ddbe5.jpg)

# I. Những sự khác biệt
## 1. SE chịu áp lực lâu dài hơn-BrSE chịu áp lực lớn hơn

**Với BrSE?** 

BrSE tiếp nhận và chuyển giao `imput` của dự án, SE tiếp nhận nó và tạo ra `output`. Vì quá trình tạo ra output luôn cần nhiều thời gian hơn là tiếp nhận imput nên có thể hiểu đơn giản rằng, áp lực lên SE sẽ được dàn đều trên một khoảng thời gian dài hơn so với áp lực của BrSE. Tuy nhiên chúng ta cần đi thật sâu và phân tích chi tiết quan điểm này.

Thứ nhất, vốn dĩ công việc của BrSE đã được so sánh với hình ảnh `"Trên đe dưới búa"`. Trên thì bị khách hàng giã, dưới thì chịu áp lực từ phía team. Khi khối lượng công việc dồn về nhiều vượt quá khả năng tiếp nhận và xử lý thì vị trí này bỗng trở thành một `"Bottleneck"-Nút thắt cổ chai` của cả dự án. Khi đó vấn đề gặp phải và áp lực tương ứng tạo ra sẽ là:

* **Không dịch kịp tài liệu và các trao đổi từ phía khách hàng cho team**
-> Điều này khiến cho các tasks của team bị đình trệ, anh em có thể phải ngồi chơi giai đoạn đầu, còn giai đoạn sau lại chạy thục mạng. Khi bạn làm không kịp và gây ra ảnh hưởng lên nhiều người khác, bạn sẽ thấy một áp lực vô hình, đôi khi là cảm thấy bản thân khá bất lực.

* **Không trả lời kịp thời các câu hỏi khách hàng đưa ra**
-> Quá trình trao đổi bị `"ùn ứ"`. Khác với SE, task sẽ có due date, có deadline tính bằng ngày. Còn trao đổi với khách hàng sẽ luôn có yêu cầu response giới hạn tính bằng phút, 15, 30 phút hay tối đa là cũng chỉ tầm vài giờ bạn phải trả lời trong điều kiện bạn không bị bận họp hành hay có lý do bất khả kháng nào đó. Vì vậy bạn luôn bị căng thẳng cao độ nếu như một lúc có tới 4, 5 người bên khách hàng hỏi và yêu cầu giải quyết vấn đề của họ. Xong rồi thư thoảng sẽ có vài SE sang yêu cầu bạn giải thích hay chốt spec để họ làm.

* **Không bao giờ có đủ thời gian để nắm bắt toàn bộ tiến độ của dự án, chứ đừng nói gì tới cách mỗi task được implement ra sao**
-> Và khi báo cáo với khách hàng thì đúng là chả khác gì một cuộc phỏng vấn tuyển dụng, hay như một cuộc chiến mà bạn mang thân ra chiến trường chỉ để đối phương hành xác và làm bia để nã đạn. Người ta nói con giun xéo lắm cũng quằn, có thể ngay lập tức bạn không cảm nhận được, nhưng dần già sẽ là stress, ức chế và trầm cảm...vv

* **Không bao giờ đảm bảo được chất lượng như bạn mong muốn**
-> Đúng vậy, bạn không bao giờ có được tất cả như mình mong muốn. Bạn buộc phải lựa chọn giữa `"chất"` lượng và `"số"` lượng. Đây là vấn đề đa số mọi người và các công ty sẽ phải đối mặt trong thực tế. Nếu bạn là người cầu toàn thì ắt hẳn sẽ có một sự khó thích nghi ở đây.

* **Không có đủ thời gian để quản lý và đảm bảo quy trình vận hành đúng**
-> Sau thời gian đủ dài làm trong ngành, cuối cùng mình cũng đã cảm nhận được vai trò to lớn của người quản lý và task quản lý với việc vận hành của team và đánh giá từ phía khách hàng. Và khi nó thiếu sót, ắt hẳn tác động của nó là vô cùng lớn. "Nếu bạn không thể chủ động quản lý team của mình, thì khách hàng sẽ gây sức ép và ép team của bạn theo ý của họ" - Đây là điều mình luôn tự nhắc bản thân. Tuy nhiên có những thời điểm bạn có thể biết, nhưng bạn không thể tránh.

..vv. Tóm lại thì tất cả những vấn đề này đều cẩn giải quyết nhanh nên áp lực này sẽ dồn nén nên BrSE sẽ rất lớn.


**Còn với SE thì sao?**

* **Nếu không hoàn thành task của mình, thì task của người khác sẽ không bắt đầu hay không hoàn thiện được**
-> Không chỉ task của SE khác sẽ bị đình trệ, mà task của QA cũng sẽ bị chậm.

* **Phải làm thêm giờ nhiều để đảm bảo tiến độ**
-> Việc tăng tốc độ hoàn thành task của SE có vẻ ít khả thi, vì nghĩ nhanh hơn và tăng tốc độ gõ bàn phím để code nhanh hơn thực sự là ít khả thi. Và phương án đưa ra chỉ có thể là ở lại làm thêm một chút, OT để làm thêm được task khác. Về cơ bản áp lực sẽ kéo dài hơn.

* **Dễ dẫn tới sai sót**
-> Tuy không bị áp lực lớn trong thời gian hữu hạn như BrSE, nhưng OT triền miên trong thời gian dài dễ gây nên sự mất tập trung, buồn ngủ. Mà hậu quả do những sai sót của SE trong quá trình implement nếu không được phát hiện trong quá trình test thì thực sự là một thảm hoạ khi nó gây ảnh hưởng nên người dùng cuối và uy tín của khách hàng.

* **Dễ bị stress và chán nản với công việc**
-> Trong tình hình nhân lực CNTT đang thiếu thốn dư này thì đây quả là vấn đề khá là nghiêm trọng.

## 2. Khi không hoàn thành nhiệm vụ, BrSE gây hậu quả rộng hơn, SE có thể gây hậu quả nghiêm trọng hơn

Như đã phân tích ở trên. 

**Như một cái bottleneck, khi BrSE không hoàn thành nhiệm vụ của mình thì hậu quả sẽ lan rất rộng.**

* Chậm chuyển task và spec cho cả team khiến tiến độ chung bị chậm
* Chậm báo cáo tình hình được cho khách hàng khiến cả team bị đánh giá
* Sai sót có thể dẫn tới nhiều member implement nhầm hướng

...vv

**Còn SE sẽ gây ra những hậu quả có độ nghiêm trọng có thể rất cao**

* Hoàn thành task chậm ảnh hưởng tới việc merge và test các task khác
* Nhiều bugs hơn ảnh hưởng tới tiến độ fixbug của dự án
* Bug lọt qua vòng test xảy ra trên production dễ gây ảnh hưởng lớn tới user và uy tín của khách hàng

Đặc biệt là những bugs liên quan tới bảo mật, lộ thông tin cá nhân...vv


## 3. Tác động lên sức khoẻ khác nhau

Ngoài các bệnh chung khi dân IT làm việc lâu dài với khối lượng công việc lớn như là đau lưng, đau vai, đau đầu, trĩ, stress...vv ra thì giữa BrSE và SE do đặc trưng áp lực khác nhau nên sẽ có chút khác biệt

**Với SE**
* Chán nản với công việc, mệt mỏi
* Thoát vị đĩa đệm
* Béo bụng
* Cận thị
* Lười vận động

...vv

**Với BrSE**
* Stress cao độ
* Đau dạ dày
* Đau nửa đầu và hốc mắt
* Tâm thần

...vv

Có thể các bạn sẽ thấy **"Tâm thần"** thì chắc không tới mức đó đâu. Nhưng mình đã chứng kiến trong thực tế rồi nên các bạn đừng chủ quan với sức khoẻ của mình nhé.

Hiện tại, vì số lượng BrSE đang ít và nhu cầu thị trường đang cao nên để giải quyết vấn đề cho BrSE sẽ khó khăn hơn.

# II. Các phương pháp thích nghi

Thích nghi với một khối lượng công việc lớn và cường độ làm việc cao nhưng vẫn đảm bảo được sức khoẻ thực sự không phải là một điều dễ dàng. Nói ra các phương pháp có vẻ đơn giản nhưng áp dụng nó vào cuộc sống lại là một bài toán khác, cần nhiều quyết tâm để giải được.

## 1. Về các thói quen sinh hoạt

* **Ngủ sớm hơn và đủ giấc**
* **Ăn uống đủ chất**
* **Chịu khó tập thể dục thể thao**: Việc tập thể thao sẽ giúp bạn giảm hầu hết các vấn đề liên quan tới sức khoẻ mà bạn gặp phải. Giúp bạn có được một nền tảng tốt hơn để đối mặt với áp lực lâu dài. Đồng thời cũng giúp bạn không nghĩ ngợi lung tung gây nên stress
* **Đọc sách**: Đọc sách là cách tốt nhất giúp cho bạn có góc nhìn đa chiều, hiểu được vấn đề mà mình gặp phải. Thấy được rằng hoàn cảnh của bản thân vốn cũng đã có nhiều người từng trải qua rồi và đó là điều tất yếu giúp bạn trưởng thành trong công việc và cuộc sống
* **Du lịch hay tụ tập bạn bè**

## 2. Về cách nhìn nhận và tiếp nhận vấn đề

Trong cuộc sống không phải điều gì cũng theo mong muốn của bạn. Dù bạn có chỉnh chu, cẩn thận tới mức nào thì đôi lúc, để làm việc cùng nhau, bạn vẫn sẽ cần lao vào cuộc chiến mà mình không được chuẩn bị đầy đủ.

Ở vị trí của PM hay của các sếp to thì đôi khi cũng rất khó khăn và đau đầu để tìm kiếm nguồn lực hay thương lượng làm sao để giải toả áp lực cho team. Không từng ở vị trí đó chắc chắn bạn không thể hiểu được rõ ràng. 

Nếu bạn để áp lực công việc cao và khối lượng công việc lớn đè nén tới mức làm bản thân chán nản, mệt mỏi thì chính bạn đã đánh mất đi cơ hội để cảm nhận và học hỏi từ hoàn cảnh ấy rồi. Hơn nữa, nếu bạn yếu đuối và mệt mỏi, chán nản thì những thành viên trong team cũng sẽ bị ảnh hưởng bởi những cảm xúc tiêu cực đó của bạn.

Không ai trong một cuộc chiến thực sự mà không bị ngấm đòn đau cả. Bạn cần phải học cách đứng dậy và trưởng thành từng những cuộc chiến như thế, cần đủ mạnh mẽ và lạc quan để làm điểm tựa cho những member khác trong team.

Tuy nhiên cũng nên xác định rõ giới hạn của bản thân ở mỗi thời điểm, để tránh ôm đồm quá nhiều việc. Lạc quan và ôm đồm thái quá không chỉ khiến bản thân bạn mệt mỏi mà còn khiến cả team mệt mỏi, dự án đứng trước nguy cơ bị Over Load. Cái này người ta gọi là **"Nhiệt tình + Ngu dốt = Phá hoại"**, còn dân dã và ngắn gọn hơn là **"Ngu"**.

Khi cần trợ giúp thì nên nhờ. Hạ cái tôi cá nhân xuống đồng thời cũng là giảm bớt gánh nặng cho bản thân và cho team.

# III. Kết

Tóm lại thì mong các bạn có được tâm thế lạc quan, sẵn sàng học hỏi từ những thách thức như áp lực và khối lượng công việc lớn. Thay đổi và thích nghi một cách hợp lý chứ đừng dễ dàng từ bỏ nhé. Phí lắm ^^

![](https://images.viblo.asia/805190ea-9c92-4d76-baac-fc42031f525a.jpg)