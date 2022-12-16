> Cảnh báo: Bài viết này cần được đọc cẩn thận!

Nếu bạn đang  việc trong ngành kiểm thử phần mềm hoặc phát triển phần mềm, bạn có thể biết một vài điều về mối quan hệ giữa "tester và coder". Tôi không biết ai là người bắt đầu cuộc chiến trước hay làm thế nào mà mối quan hệ của họ trở nên tồi tệ hơn, nhưng rõ ràng là tester và coder thường không thích nhau.
Coder về cơ bản không thích tester, nhưng nếu tôi nói với bạn rằng bạn có thể khiến họ ghét bạn hơn thì sao?

Trong bài viết này, tôi sẽ chia sẻ với bạn 10 cách dễ dàng để các coder ghét bạn hơn. Chờ đã nào...Tôi đã có đủ các vấn đề với coder của mình rồi, có phải bạn muốn chia sẻ về những mẹo sẽ phá hủy mối quan hệ ấy mãi mãi???????

Tôi không biết :)), Đó là những gì bạn đã hiểu cái mà tôi cố gắng truyền đạt qua bài viết này. Không sao, chúng ta đi nào.

![](https://images.viblo.asia/f770758c-4b48-4245-84ef-6e538b478acc.jpg)

### 1. Gửi một báo cáo lỗi tồi
Bạn muốn làm cho các coder ghét bạn ngay lập tức? Báo cáo một vấn đề quan trọng nhưng mơ hồ hoặc không đầy đủ thông tin để họ không có ý tưởng về vấn đề. Giống như cái này:

*Summary: System crashes*

*Description: The system crashes on my PC several times. Please fix it asap*

*Steps to reproduce: None*

*Observed result: None*

*Expected result: None*

Một báo cáo như thế này sẽ khiến các coder của bạn thất vọng ngay lập tức.

Tại sao điều này có thể làm cho họ ghét bạn?
Chúng ta đều biết rằng các coder phụ thuộc rất nhiều vào báo cáo lỗi của tester để hiểu lỗi và sửa nó đúng cách. Nếu bạn đang gửi cho họ một báo cáo tồi tệ, họ sẽ rất khó hoặc mất nhiều thời gian để tái hiện và fix bug.

### 2. Chỉ trích các developer về các lỗi gặp phải
Các coder luôn cảm thấy tồi tệ khi bạn tìm thấy một vấn đề nào đó trong dòng code của họ. Bạn có thể đã làm cho họ cảm thấy tồi tệ hơn khi chỉ ra chính xác Ai là người đã viết đoạn code gây ra lỗi đó.
Những câu nói như:
- Tôi nghĩ bạn nên làm việc tốt hơn sau khi xử lý bug này.
- Tôi nghĩ rằng đây là một thiết kế ngu ngốc mà bạn đã làm.
-  Lập trình viên đã không xử lý chính xác ngoại lệ này?
-  Tại sao chức năng này không hoạt động ?
- ......

Các phản hồi mang tính xây dựng chỉ làm cho coder thích bạn hơn, vì vậy hãy từ bỏ những feedback mang tính phá hoại như ở bên trên.

### 3. ...Chỉ trích công khai
Bạn muốn mọi thứ tồi tệ hơn? Đừng chỉ phê bình họ mà phải làm điều đó công khai.
Bạn có thể chỉ ra  trách nhiệm cho một lập trình viên cụ thể trong hệ thống theo dõi lỗi (như Redmine, Jira...) nơi mà mọi người có thể đọc được các nhận  xét, đánh giá của bạn. Bạn cũng có thể làm điều này trong các buổi họp nhóm và đặc biệt là với đội ngũ quản lý có liên quan.
Tại sao nên làm điều này?
Đó là vì bạn đang chạm vào một trong những phần nhạy cảm của các coder. Đó là bản năng của họ.

### 4. Test sai môi trường kiểm thử
Nó yêu cầu tester phải kiểm tra hệ thống và báo cáo sự cố trong môi trường phù hợp. Bạn có muốn làm cho nhà phát triển ngạc nhiên, hãy thử điều này:
1. Coder build cho bạn một môi trường thử nghiệm mới
2. Bạn đánh dấu môi trường thử nghiệm cũ và bắt đầu làm việc trên đó.
3. Vào sáng ngày hôm sau, bạn vội vàng tới gặp coder và thông báo bạn đã tìm thấy một lỗi trên bản build ngày hôm qua.
4. Sau đó bạn tái hiện cho anh ấy lại lỗi trên máy tính của bạn.
5. Coder sau đó mất cả ngày để phân tính, tái hiện lại bug bạn đã chỉ ra. Cho đến cuối ngày anh ấy mới phát hiện ra rằng bạn đã test sai bản build.

Hura hura bạn đã làm điều đó, và bây giờ nhà phát triển sẽ nhớ tên của bạn cho đến hết đời.

### 5: Báo cáo lỗi, nói với coder cách sửa và quy định deadline 
Bạn biết rằng mặc dù bạn chỉ là một tester, bạn cũng có kỹ năng kỹ thuật tốt.
Bạn có thể thể hiện bằng cách không chỉ báo cáo sự cố mà còn cung cấp hướng dẫn từng bước cho coder để khắc phục sự cố.
Bạn không chỉ đề xuất giải pháp, bạn làm cho các coder hiểu rằng đây là cách duy nhất để khắc phục vấn đề. Ồ, và nhân tiện, không quên đưa ra thời hạn để khắc phục sự cố vì lỗi này đang ảnh hưởng đến lịch trình thử nghiệm của bạn.
Ví dụ:
- Để sửa bug này bạn chỉ cần sửa ở step 1, step 2...tôi nghĩ theo cách này thì bug sẽ được sửa nhanh chóng.
- Nhân tiện , bạn có thể hoàn thành việc fix bug vào thứ 6 không? bởi vì tôi muốn hoàn thành test vào thứ 2 tuần tới.

Tại sao điều này lại khiến coder ghét bạn?

Bằng cách này, bạn đang cho thấy rằng bạn thông minh hơn các coder và bạn biết rõ hơn họ. Bạn cũng cho thấy bạn có thể kiểm soát và đặt deadline cho họ.

Tuyệt vời, bây giờ bạn trông giống như ông chủ của coder rồi đấy.

![](https://images.viblo.asia/734b8119-86e7-4806-b327-e46a00a93642.jpg)

### 6. Yêu cầu các coder khắc phục mọi lỗi mà bạn tìm thấy.
Bạn cảm thấy tồi tệ khi lỗi của bạn bị từ chối hoặc đánh dấu là Sẽ không sửa. Người quản lý của bạn sẽ nghi ngờ năng lực như một tester của bạn. Để ngăn chặn điều này, bạn yêu cầu, bạn khuyến khích, bạn cầu xin các coder sửa mọi lỗi mà bạn tìm thấy bất kể nó có mức độ nghiêm trọng hoặc mức độ ưu tiên như thế nào.
Nếu các coder từ chối khắc phục sự cố của bạn, bạn viết một email dài để thảo luận, trình bày qua lại để cung cấp cho họ lý do tại sao họ nên sửa lỗi của bạn (mặc dù từ tận đáy lòng, bạn biết vấn đề không đáng để sửa) . Bạn cũng có thể leo thang lên người quản lý nếu bạn không thể thuyết phục nhà phát triển sửa lỗi của mình.

Tại sao đây là một ý tưởng tuyệt vời để thử?

Chà, bạn cho rằng coder đang ở đó và có toàn bộ thời gian trên thế giới để sửa mọi lỗi bạn tìm thấy.

 Bạn có thể hỏi: "Này, Có vấn đề gì với điều này vậy? Đó là một lỗi của coder. Họ đã viết mã xấu và bây giờ họ phải dọn dẹp mớ hỗn độn mà họ tạo ra."

Thật ra, việc khắc phục sự cố là công việc của các coder, nhưng đừng quên rằng các họ cũng có lịch trình phát triển riêng và họ cũng có thời hạn để làm việc.

### 7. Để dành thứ tốt nhất đến cuối cùng

Bạn kiểm tra một bản build và bạn tìm thấy nhiều lỗi? Những người kiểm tra bình thường sẽ làm gì?

Họ báo cáo lỗi ngay lập tức và càng sớm càng tốt vì chi phí cho việc sửa chữa muộn là cao.

Đó là những gì người kiểm tra bình thường làm, bạn có thể muốn làm khác đi.
Bạn không báo cáo chúng cùng một lúc, bạn cũng có thể báo cáo một số, nhưng bạn dành thứ tốt nhất đến cuối cùng. Bạn chỉ báo cáo sự cố nghiêm trọng này một ngày trước khi hệ thống hoạt động với hy vọng bạn có thể dừng chương trình và nhận được tín dụng của mình.

Tại sao coder lại ghét điều này?
Các coder  ghét bất ngờ vào phút cuối. Điều này sẽ gây ra rất nhiều vấn đề và rủi ro khi khắc phục sự cố vào phút cuối như vậy. Một sửa chữa nhanh sẽ gây ra nhiều rủi ro hơn, một sửa chữa kỹ lưỡng hơn sẽ cần hai hoặc ba ngày, điều này là không thể vì lịch release đã được lên.

Các coder sẽ gãi đầu và nguyền rủa bạn tại sao bạn không báo cáo vấn đề sớm hơn.

![](https://images.viblo.asia/f0cd175a-0164-41ce-98b8-ae99e53e3d79.jpg)

### 8. Bạn đóng vai trò là người gác cổng (gatekeeper)

Đây là những gì một tester đang làm một vai trò gatekeeper:

Nếu coder không nhận được một từ "Pass" của bạn, thì bản build  không được phát hành.

Không phải tất cả những tester đều có quyền lực và thẩm quyền đó để làm điều đó, nhưng nếu bạn may mắn và bạn có thể đóng vai trò là gatekeeper và tận dụng điều đó.
Đây là một điều bạn có thể làm: 

Bạn từ chối release bản build từ coder nếu bạn tìm thấy bất kỳ lỗi nào trong bản build đó và nếu coder khăng khăng phát hành nó, hãy nói với họ rằng họ sẽ chịu trách nhiệm về chất lượng sản phẩm hoặc bất kỳ khiếu nại nào từ khách hàng.
Tại sao các coder ghét điều này?

Bởi vì họ ghét phải thỏa hiệp với những tester, nhưng bạn không còn lựa chọn nào khác vì giờ họ đã có bạn làm gatekeeper.

### 9. Bạn tạo ra một tấn các lỗi trùng lặp
Không cần phải nói, đây là một trong những nỗi thất vọng nổi tiếng nhất của các coder.

Làm như thế nào?

Khi bạn tìm thấy một lỗi, đừng dành chút nỗ lực của bạn để tìm kiếm trong hệ thống theo dõi lỗi hoặc kiểm tra kỹ với các đồng nghiệp của bạn để xem liệu vấn đề tương tự đã được báo cáo trước đó. Nếu bạn đang đi theo cách này có nghĩa là bạn đang đi đúng hướng để khiến các nhà phát triển ghét bạn.

Tại sao?

Lỗi trùng lặp có nghĩa là các coder sẽ lãng phí thời gian của họ để đọc lỗi, phân tích lỗi và cuối cùng thấy rằng vấn đề tương tự đã được báo cáo  trước đó. Nếu bạn có thể lặp lại ngày này qua ngày khác, các coder có thể gọi tên bạn trong giấc mơ của họ.

### 10. Bạn ngắt  luồng suy nghĩ khi các coder đang lập trình.
Trong khi các coder đang lập trình, hãy thử ping họ chỉ để nói rằng bạn vừa tìm thấy một lỗi lớn tuyệt vời trong mã của họ. Năm phút sau, bạn viết một email khác để yêu cầu tài liệu về một tính năng mà họ không phụ trách. Đôi khi, bạn đi ngang qua và mô tả vấn đề bạn tìm thấy trong hệ thống và hỏi ý tưởng của họ để xem nó có lỗi hay không.
Tại sao điều này có thể khiến các coder của bạn phát điên?

Trong khi lập trình, các coder cần hoàn toàn tập trung vào công việc của họ. 

Điều đó khiến họ thực sự bực bội khi suy nghĩ của họ chảy như một dòng sông và sau đó bạn làm gián đoạn chúng.

![](https://images.viblo.asia/232678cc-34ac-423c-b5da-e410530f4589.jpg)

### Kết luận

Tôi vừa chia sẻ với bạn 10 cách dễ dàng để khiến các coder ghét bạn. Tất nhiên, ý định của bài viết không phải là để cho bạn biết những cách theo nghĩa đen để khiến ai đó ghét bạn. Mục đích là để giúp bạn nhìn lại và xem liệu bạn có mối quan hệ xấu với các coder hay không và liệu bạn có đang mắc phải những sai lầm này không. Là một tester, bạn không có trách nhiệm tạo ra các coder như bạn muốn, nhưng bạn có trách nhiệm làm việc hiệu quả với các bên như một nhóm để xây dựng các sản phẩm tuyệt vời. Đó là mục tiêu cuối cùng của thử nghiệm.

Nguồn tham khảo: https://www.asktester.com/10-easy-ways-to-make-developers-hate-you/