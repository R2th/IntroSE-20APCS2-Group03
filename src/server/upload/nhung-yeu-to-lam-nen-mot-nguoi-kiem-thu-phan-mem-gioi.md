# Hãy suy nghĩ như một ông chủ 
- Khi bạn bắt tay vào thực hiện bất kì một dự án nào, hãy ghi nhớ một điều: dự án bạn đang thực hiện là dự án của chính bạn, hãy đóng góp 100% nỗ lực của bạn vào sự thành công của dự án. 
- Tôi không nói rằng bạn nên tự mình đưa ra các quyết định về bussiness của dự án, nhưng ngay từ đầu bạn nên thu thập yêu cầu, đặt câu hỏi cho các bên liên quan, nhà phát triển, các member trong đội ngũ và giải quyết các câu hỏi nếu có thể
- Trách nhiệm của bạn không chỉ là xác nhận phần mềm hoạt động đúng theo các yêu cầu đặt ra mà còn nên đưa ra các ý kiến đề xuất để cải thiện nó

# Đảm bảo sự hài lòng của end user
- Nếu bạn đứng ở vai trò của một owner hãy đảm bảo rằng tôi - người dùng sản phẩm của bạn có thể sử dụng phần mềm dễ dàng hơn, điều này đảm bảo rằng người dùng cuối hài lòng khi truy cập phần mềm.
- Bạn không chỉ nên kiểm tra các tập hợp yêu cầu require được đưa ra, mà còn phải suy nghĩ cảm nhận của người dùng cuối khi dử dụng phần mềm. Để đạt được điều này trước tiên hãy cố đảm bảo rằng: Phần mềm bạn kiểm tra không có lỗi

# Suy nghĩ như end user 
- Mục đích của phần mềm là để phục vụ người dùng cuối, và sự thành công của dự án chỉ dựa trên việc người dùng cuối có thể sử dụng phần mềm một cách dễ dàng.
- Hãy nhớ công việc của bạn là tìm ra lỗi trước khi phần mềm, sản phẩm tới tay người dùng 
- Hãy đảm bảo rằng các kịch bản kiểm thử và dữ liệu thử nghiệm phải được thiết kế với phù hợp, tương ứng với thao tác của người dùng khi sử dụng, nói một cách khác hãy đặt đôi chân của mình vào giày của người dùng cuối 

# Khả năng ưu tiên và  sắp xếp
- Trong vòng đời kiểm thử phần mềm (STLC), tester phải tạo rất nhiều các trường hợp kiểm thử và thực hiện nó, việc thực hiện tất cả là không khả thi 
- Ví dụ trong trường hợp có 1000 testcase cần phải chạy trong một sprint, bạn không thể chạy toàn bộ vì thiếu effort việc đầu tiên bạn phải làm là cần xác định độ ưu tiên cho những case quan trọng => điều đó khiến bạn thực hiện kiểm thử trơn tru hơn và không bỏ xót các lỗi lớn làm ảnh hưởng tới hệ thống
- Đừng thực hiện các trường hợp kiểm thử mà không quyết định mức độ ưu tiên. Hãy ghi nhớ rằng " kiểm tra chất lượng, không phải số lượng"

# Đừng thỏa hiệp về chất lượng
- Sự hiện diện của bạn chỉ là do có các khiếm khuyết trong phần mềm, lưu ý không thỏa hiệp về chất lượng trong mọi giai đoạn kiểm thử 
- Việc thỏa hiệp dẫn đến sự xuất hiện của một số bug trong phần mềm, vì vậy hãy tiến hành kiểm tra hiệu quả hơn để đảm bảo rằng mình tạo ra những phần mềm chất lượng 

# Tham gia vào dự án từ những giai đoạn đầu
- Là một QA bạn tham gia vào dự án từ giai đoạn đàu tiên, tức là thu thập yêu cầu và tất nhiên bạn sẽ không mong đợi rằng đến khi deploy code xong bạn mới join vào dự án. 
- Trước khi bạn bắt đầu công việc, hãy đọc review các yêu cầu, làm rõ Q&A các bên. Bước này là bước ngăn ngừa lỗi, khi đó bạn sẽ tìm thấy một số vấn đề mà có thể trở thành lỗi trong tương lại, từ đó tiết kiệm thời gian và tiền bạc 
- Khi bạn tham gia sớm vào dự án, bạn sẽ nắm được bức tranh tổng thể về phạm vi dự án, từ đó giúp bạn lập kế hoạch thử nghiệm, chuẩn bị chiến lược, trường hợp, môi trường thử nghiệm trong giai đoạn đầu 

# Hãy lắng nghe mọi người
- Một thực tế rằng, không ai hoàn hảo trên thế giới này ngay cả khi bạn nhận thức được và tính năng của dự án từ đầu tới cuối, nhưng có thể bạn vô tình bị quên hoặc bỏ sót bất khì phần đơn giản nào => vì vậy việc lắng nghe là một phẩm chất rất tốt, hãy lắng nghe để cải tiến, để thay đổi, để tốt hơn. Hãy luôn chú ý đến ai đó đưa ra ngụ ý hoặc ý tưởng nào điều nay chắc chắn sẽ giúp bạn cải thiện chất lượng dự án đang thử nghiệm 

# Tin tưởng vào chính mình chứ không phải người khác
- Đảm bảo rằng bạn đang tiến hành xác minh từng bước trước khi tiến hành các hoạt động thử nghiệm 
- Hãy xem xét một tình huống trong đó bạn nhận được một bạn build mới do dev fix bug gửi lên, lúc này bạn nên đặt ra một số câu hỏi về bạn build mà bạn nhận được. kiểm tra xem bản sửa lỗi này có hoạt động bình thường hay không? kiểm tra xem phần sửa lỗi này có làm ảnh hưởng đến các chức năng khác hay không? Đảm bảo rằng bạn kiểm tra tất cả mà không bị áp lực bởi bất kì thành viên cấp cao nào, để thành công hơn trong quá trình thử nghiệm, bạn nên theo dõi hoạt động này trong suốt STLC

# Hiệu quả của report bug  
- Khi bạn log bug, hãy đảm bảo rằng bạn đã đính kèm EVD và các thông tin bổ sung cùng với bug, điều này sẽ giúp dev hiểu được thực tế các vấn đề
- Bạn có thể đính kèm ảnh chụp, video ghi lại tình huống mà bạn quan sát thấy, bạn có thể thêm vào như vấn đề xuất hiện ở đâu, có tái hiện được ngẫu nhiên không? trên nền tảng nào? trình duyệt hệ điều hành nào....
=> Hãy cố gắng cung cấp mọi thứ chi tiết để dev hiểu được vấn đề nhanh nhất 

# Đừng chơi trò đổ lỗi 
- Xu hướng tự nhiên của con người là đổ lỗi cho người khác nếu lỗi không được phát hiện trong quá trình thử nghiệm. Những tình huống như vậy sẽ xảy ra thường xuyên hơn nếu vai trò và trách nhiệm không được xác định một cách hợp lý.
- Nếu xảy ra tình huống như vậy trước tiên hãy cố gắng tìm ra nguyên nhân gố rễ của vấn đề. Ứng dụng đang thử nghiệm được kiểm tra bởi con người, và là con người ai cũng sẽ có thể mắc sai lầm, khi đó bạn nên làm việc theo nhóm và tìm ra cách giải quyết chứ không phải là đổ lỗi 

# Hãy chuyên nghiệp và khách quan trong việc kiểm tra 
- Mỗi khi bắt đầu thử nghiệm hãy bắt đầu với một tâm trí tươi mới
- Bỏ suy nghĩ rằng bạn đã biết về phần mềm này rất nhiều hoặc bạn sử dụng phần mềm này sớm thì có thể không nhận thấy các lỗi quan trọng 
- Hãy chuyên nghiệm và không kiểm tra với ý kiến chủ quan 

# Rèn luyện kĩ năng của bạn - bằng văn bản hoặc lời nói 
- Một trong những kĩ năng quan trọng mà người thử nghiệm giỏi cần có là " kỹ năng giao tiếp" 
- Hằng ngày QA phải làm việc để lên các testcase, test plan, report bug.....Là một QA đây là những hoạt động quan trọng nhất trong SDLC mà QA phải thực hiện, cùng với đó QA phải tham gia cuộc họp thuyết trình trước các thành viên nhóm và các bên liên quan, vì vậy kĩ năng giao tiếp bằng lời nói cũng rất quan trọng 

# Người kiểm tra tốt phải là người quan sát tốt 
-  Bạn nên quan sát những điều đang xảy ra trong dự án, đảm bảo rằng bạn đang theo dõi những thứ diễn ra xung quanh mình 
-  Thao dõi tiến trình kiểm tra và thực hiện những thay đổi nếu có 
-  Dữ liệu như vậy rất quan trọng, nó giúp bạn cập nhật và bạn sẽ chủ động trong bất kì tình huống nào 
-  Các hoạt động thử nghiệm đang đi lệch hướng hoặc theo đúng plan, hãy ghi nó lại và thực hiện các hành động cần thiết để đảm bảo rằng những điều xấu tương tự sẽ ko xảy ra nữa 

Tham khảo : https://www.softwaretestingclass.com/what-qualities-make-a-software-tester-to-a-good-software-tester/
Còn nữa ....