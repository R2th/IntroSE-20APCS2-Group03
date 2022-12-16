Có một số kinh nghiệm, nguyên tắc giúp chúng ta quản lý dự án, công việc dễ dàng hơn.
# 1. Define rule :
![](https://images.viblo.asia/44320e53-cdb9-42e0-ad87-774f41dc4ca8.jpg)
   Một quốc gia cần có hệ thống luật pháp để vận hành. Một dự án cần có Rule/luật để hoạt động.
   Luôn define ra các luật một cách rõ ràng, ngắn gọn dễ hiểu, và thống nhất để toàn team có thể tuân theo. 
   Một số Rule cần có:
##   . Cách tạo branch name trên Git. 
            Ví dụ: đối với chức năng :Feature/TaskID
             Khi fixbug:  FixBug/TaskID
##   . Quy định thời gian push code từ local lên server. 
        Ví dụ: Cuối mỗi ngày . Tránh tình trạng member nghỉ mà người khác không có code để support/review.
##   . Quy định thời gian merge code vào nhánh chính. 
     Ví dụ: Khi xong mỗi màn hình (sao cho leader, member khác có thể check được) thì cần merge code vào nhánh chính. Việc này tránh được tình trạng để code quá lâu mới merge thì sẽ vừa mất time, vừa dễ bị conflict code với người khác.
##   . Quy định cách đặt tên các task trên redmine.
       Ví dụ: [Team][Phase][Task name]
       [Android][Design][Màn hình Login]
       [Android][Code][Màn hình Login]
        [Android][Test][Màn hình Login]
        [BackEnd][Design][Màn hình Login]
        [BackEnd][Code][Màn hình Login]
        [BackEnd][Test][Màn hình Login]
  . Quy định thời điểm update status các ticket trên redmine (trước 5h).
# 2. Chia task
  ![](https://images.viblo.asia/9c4bfc86-54b2-4f4e-a538-caeeab4f7b73.png)
##   . Chia task đủ nhỏ đến mức <= 8h/1 task. 
  Như vậy sẽ giúp ta quản lý cũng như tracking công việc chính xác và dễ dàng hơn. Nếu có vấn đề xảy ra cũng dễ phát hiện.  Trường hợp task bị delay thì ta cũng dễ cover hơn.
# 3. Checking task
![](https://images.viblo.asia/5a11088e-02d3-435c-a342-15f4cb4c4f11.jpg)
##  . Tự mình checking.
   Ngoài việc hỏi trực tiếp member về status task, ta cần tự mình verify lại bằng cách tự review code, build code nhìn màn hình ,... Lý do là có thể member không tự biết chính xác status cv, đôi khi là cố tình báo cáo sai vì sợ phải giải trình.
##  . Không lên tin con số % của mỗi task nhỏ đang làm. 
   Vì nhiều khi member đánh giá là  đã làm được 90% , nhưng lại không biết khi nào có thể hoàn thành nốt 10% còn lại.
##  . Task sẽ chỉ quan tâm 3 trạng thái: 
    Open/chưa làm, Processing/đang làm, Close/đã làm.  Ví dụ 1 task lớn chia làm 10 task nhỏ, trong đó 3 task đã xong, 4 task đang làm, và 3 task chưa làm. Vậy % của task lớn = số task đã làm/ tổng task = 3/10 = 30%.
# 4. Số hóa
![](https://images.viblo.asia/5696ea1f-d201-4f17-b8d5-65bb2410b129.jpeg)https://images.viblo.asia/5696ea1f-d201-4f17-b8d5-65bb2410b129.jpeg
 . Nhiều PM có thói quen hỏi member là "khi nào chú xong", member có thể trả lời là mai e xong, nhưng thực tế không biết ngày nào mới xong.
 . Thay vào đó, hãy check xem task đó có bao nhiêu task con, tình trạng của từng task con như thế nào mà tự tính ra được khi nào task đó có thể xong. Đương nhiên trước đó cần check xem member đã update status các task con theo đúng quy định hay chưa.
 . Sử dụng biểu đồ của redmine, excel,... để có thể checking tổng thể dự án.
#  5. Transparent info
![](https://images.viblo.asia/cdde278d-77f9-46ee-b01f-978a4d6fd227.jpg)
  . Thông tin cần được chia sẻ cho toàn bộ member trong dự án theo đúng level.
   Tránh hiện tượng: Member trao đổi trực tiếp với PM . PM confirm với KH rồi trả lời trực tiếp member đó. Nhưng đội tester lại không biết lên test thiếu.
#  6. Cần có file quản lý thông tin QA với KH
![](https://images.viblo.asia/b6daeec3-994c-4bda-a0c4-948bdaf6d672.jpg)
   . Nhiều khi để có được thông tin nhanh chóng, chúng ta thường confirm trực tiếp KH trong chatwork, slack,... và truyền đạt cho member.  Sau 1 tuần, 1 tháng hoặc lâu hơn nữa thì không còn ai nhớ là nội dung đó đã confirm KH hay chưa . Ngoài ra khi các team khác có vấn đề tương tự thì không tham khảo được. Có member mới vào cũng không nắm được các nội dung cũ.
   . Giải pháp là luôn list QA vào file google sheet hoặc excel(nếu KH không dùng google sheet).  Việc này giúp ta tracking được các nội dung trao đổi cũ, share được thông tin cho all member trong team, người mới có thể tìm hiểu nội dung trước đây.
   . Khi viết QA cần đưa sẵn ra vài solution để KH chỉ cần chọn 1 cái trong số đó.  Việc này thể hiện mình luôn active, chủ động điều tra tìm hiểu kỹ càng. Khách hàng sẽ đánh giá cao. Tránh việc hỏi vu vơ kiểu: chỗ này tôi không biết làm thế nào, mong các bạn chỉ cho. 
   . Lên confirm nội bộ trước khi hỏi KH. Lý do: có thể nội dung đó member khác trong team đã từng hỏi , nếu hỏi lại KH sẽ thấy phiền. Trường hợp member khác đã biết thì họ trả lời nhanh hơn là hỏi KH.
# 7. Quản lý version tài liệu
  ![](https://images.viblo.asia/458a4951-82b1-4322-97f3-45dac90cdfe5.jpg)https://images.viblo.asia/458a4951-82b1-4322-97f3-45dac90cdfe5.jpg
  . Trong quá trình làm dự án, không thể tránh được việc KH có thay đổi specs/ CR. Vì vậy cần đánh version cho tài liệu đầy đủ, chuẩn xác.
  Ví dự : Specs_0.1, Specs_0.2
  hoặc đặt theo ngày Specs_20190501, Specs_20190502
  . Các nội dung đã trao đổi qua QA, mail, chat,... cần được update vào specs
  . Cần yêu cầu KH có sheet History of Change để lưu lại thời điểm cũng như nội dung thay đổi, tô màu vào phần thay đổi gần nhất.