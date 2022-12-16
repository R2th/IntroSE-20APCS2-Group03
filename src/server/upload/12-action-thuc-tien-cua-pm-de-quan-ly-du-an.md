*Trong lúc tìm ý tưởng cho bài viết mới thì mình tình cờ đọc được bài viết của một ông chú Japan viết về việc quản lý dự án, thấy cũng khá thực tiễn chứ không lý thuyết sáo rỗng lắm nên mình xin phép dịch ra cho bạn nào có nhu cầu tham khảo nhé. 
Bắt đầu từ đây sẽ là phần dịch nên mình sẽ dùng ngôi thứ nhất của ông chú Japan luôn nhé. :kissingheart:*
# Sơ lược


-----


Bình thường thì tôi là 1 Backend developer nhưng dạo gần đây có cơ hội được support một dự án với tư cách là Project Manager (PM). Tôi chưa thấy các hành động cụ thể nên được thực hiện đối với một PM nên lần này tôi sẽ thử viết ra những hành động cụ thể của chính bản thân mình nhé. Tôi hy vọng nó sẽ giúp cho ai đó khi chưa biết rằng PM thì nên làm những công việc gì?
# Bối cảnh

-----



Tôi xuất thân từ một SIer (System integrator -er) của NTT Data Group sau đó chuyển sang phát triển web nội bộ của một công ty tư nhân, vì vậy tôi đã trải nghiệm qua quá trình làm việc với Water fall, cũng như Agile hay Scrum trong những năm tháng làm SIer.

Tuy nhiên, điều đó không có nghĩa là tôi có bằng cấp về PM (PMP chả hạn), vậy nên tôi vẫn mang một phong cách rất cá nhân, nhưng vì đã áp dụng rất tốt trong thực tế nên tôi nghĩ rằng nó sẽ không có nhiều sai khác.

# Tiên đề

-----



Mặc dù những action sau đây nói là mô hình phát triển Agile nhưng giả định là việc phát triển với số lượng Stakeholders nhiều và quy mô lớn. Ngược lại, với mô hình phát triển nhỏ thì lại có quá nhiều việc nên cần thực hiện  nhiều action cần thiết với trạng thái ổn định.

# Action

-----



Các action được chia ra theo 2 mục lớn là Process và Task. Với Process thì công việc chính là Trực quan hoá và Cải tiến, còn đối với Task thì việc quan trọng là đánh Độ ưu tiên.

## Process

-----



### 1. Tạo WBS

Đối với nhóm phát triển có quy mô lớn, các bên liên quan nhiều thì việc quan trọng là cần nắm được ai sẽ làm việc gì và đến bao giờ thì phải xong. Vì vậy, việc tạo WBS (Work Breakdown Structure) rất quan trọng. Sau khi tạo xong, sử dụng WBS sẽ giúp nắm bắt được tiến độ hiện tại của dự án ra sao, có bị chậm so với deadline hay không. 

### 2. Kiểm tra tiến độ dự án mỗi ngày

Mặc dù đã tạo WBS nhưng nếu không cập nhật nó thì việc đó không có nhiều ý nghĩa. Tiến độ nên được cập nhật hàng ngày vào các buổi như MTG sáng, MTG chiều, hoặc daily scrum,... Đặc biệt, khi tiến độ bị chậm, để nhanh chóng tìm ra nguyên nhân thì việc đó lại càng cần thiết.

### 3. Luôn điều chỉnh và cập nhật thông tin

Cập nhật không có nghĩa là chỉ cập nhật tiến độ. Cần phải có một nơi để lưu trữ dễ hiểu trạng thái mới nhất của những thông tin như Spec hay các điều chỉnh bên ngoài khác. Các thông tin cần phải được sắp xếp, tổ chức theo lớp (ví dụ như theo dạng tree dưới đây), thay vì sắp xếp 1 cách lộn xộn, tạp nham trên Wiki. Cần tránh việc sửa thông tin dựa trên những nhận thức chưa rõ hoặc các thông tin mơ hồ.

```
プロジェクトDir
  - Product Core
    - コンセプト
    - KGI/KPI
    - リーンキャンバス
    - ユーザーインサイト/ペルソナ
    - ドメイン知識
  - Development
    - ...
  - Operation
  - Security
  - Meeting
```

### 4. Thực hiện chu trình PDCA

Tôi không nghĩ rằng khi thực hiện điều này thì 100% dự án sẽ thành công. Đó là bởi vì mức độ thành thục của các thành viên luôn thay đổi và các bên liên quan cũng sẽ thay đổi. Tuy nhiên, việc này có thể giúp làm giảm tỉ lệ thất bại của dự án xuống. 

Khi  gặp vấn đề tồi tệ trong dự án, thật tốt khi nhìn lại và đưa ra các biện pháp cải tiến đúng không? Về phương pháp thì sử dụng KPT hay SSS đều được. Về thời điểm, đối với các dự án còn đang yếu kém thì thời điểm tốt là hàng tuần, trong các buổi meeting đánh giá lại hoặc Retrospective. Trong các buổi meeting đó sẽ quyết định Next Action đối với các vấn đề hiện tại và thực hiện cải tiến. 

## Task

-----



Đối với task thì điều quan trọng là phải quyết định độ ưu tiên, làm rõ ai sẽ chịu trách nhiệm và làm thế nào để đưa task đó đến trạng thái Done.

**Độ ưu tiên**

Đầu tiên, việc quan trọng là quyết định độ ưu tiên. Bằng việc hoàn thành các mục dưới đây, việc quyết định độ ưu tiên sẽ được làm rõ.

### 5. Nắm rõ nội dung của toàn bộ task

Nội dung của task không phải là chỉ phó mặc cho Dev, mà người quản lý cũng cần nắm được sơ lược task đó làm về cái gì. Nếu có chỗ nào không hiểu phải xác nhận lại ngay với Dev. Việc làm này sẽ mang đến sự hiểu biết về quan hệ phụ thuộc giữa các task với nhau.

### 6. Ưu tiên làm các task có nhiều Stakeholders

Đặc biệt, cần ưu tiên xử lý những task có liên quan tới bên ngoài, chả hạn như những task có khả năng gây tắc nghẽn do phụ thuộc bên ngoài, cần nhanh chóng chuyền quả bóng task đó sang các bên khác. Việc này là do ngay cả khi bạn cố gắng xử lý task một cách gấp rút thì cũng có thể do phụ thuộc tình hình resource phía khác mà task đó không thể close được. Vì vậy, cần ưu tiên giải quyết sớm những task đó.

### 7. Nắm được mối quan hệ phụ thuộc của task

Nắm được mối quan hệ phụ thuộc task nào được giải quyết thì task nào mới được bắt đầu triển khai. Nếu nắm được việc này thì bạn có thể xem xét liệu có thể giải quyết các task một cách song song hay không.

### 8. Xử lý nhanh những task gây tắc nghẽn

Việc này cũng gần giống như mối quan hệ phụ thuộc của task. Nếu các task gây tắc nghẽn không được xử lý thì sẽ kéo theo các task sau cũng bị chậm, vì vậy, những task kiểu như sẽ gây ảnh hưởng lớn đến task khác cần được ưu tiên bắt đầu xử lý cao hơn.

### 9. Những task không chắc chắn cần nhanh chóng được xem xét

Với những task không chắc chắn như là vì điều tra hogehoge hoặc nguyên nhân bên ngoài mà không rõ bao giờ sẽ hoàn thành thì cần phải nhanh chóng điều tra và xử lý trước. Ví dụ, khi áp dụng một kỹ thuật mới, cần nhanh chóng xác định kiến trúc và request các ứng dụng mới để giảm bớt sự không chắc chắn. Với việc nâng cao tính khả thi thì nỗi bất an về schedule sẽ được xoá bỏ.

**Status**

Những task đã quyết định độ ưu tiên cần phải cập nhật trạng thái cho đến khi kết thúc (Done).

### 10. Làm rõ ai là người thực hiện task

Việc làm rõ ai sẽ thực hiện task giúp cho việc nắm bắt tiến độ thực hiện task trở nên chính xác. Trong trường hợp có nhiều người phụ trách task và phải thoả mãn tất cả điều kiện thì cần phải chia nhỏ task đó ra.

### 11. Không tăng các task đang In progress, mà phải làm cho Done các task đó

Cần phải chú ý khi có một số lượng lớn task đang ở trạng thái In progress. Bởi vì thật khó để biết các task đang In progress đã được hoàn thành bao nhiêu %. Ngoài ra, có thể giữ một tinh thần thoải mái bằng cách hoàn thành cách task đều đặn thay vì nâng số lượng các task đang In progress. 

## Other

-----



### 12. Không đổ thừa trách nhiệm cho các member

Ngoài các vấn đề liên quan đến process, task thì còn có một việc rất quan trọng. Mặc dù các task được thực hiện bởi các thành viên, nhưng người chịu trách nhiệm cuối cùng phải là Quản lý dự án (PM). Người quản lý không có năng lực sẽ chỉ đơn giản dựa vào năng lực của các thành viên và nói rằng "Hãy cố lên nhé!". 
Nhưng nhiệm vụ của PM là nỗ lực giữ cho tiến độ dự án chạy ổn định bằng cách điều chỉnh scope, điều chỉnh schedule, bố trí nhân sự cho các phương án dự phòng. Đối với những task bị chậm tiến độ thì cần thảo luận với member thích hợp để cùng nhau giải quyết, loại bỏ mối lo lắng bất an. 

# Tổng kết

-----



Mặc dù có những chi tiết khác ngoài những điều được liệt kê phía trên, nhưng tôi nghĩ rằng, kết cục thì PM là người có trách nhiệm nắm rõ tình trạng dự án để loại bỏ những trạng thái mơ hồ, không chắc chắn có trong dự án. Ngoài ra, điều quan trọng là phải nỗ lực tối đa để giữ dự án ở tình trạng tốt, thay vì đồng nhất các thành viên trong đội phát triển. 

Tôi nghĩ rằng, bằng cách này, nhóm phát triển sẽ duy trì được QCD (Quality – Cost– Delivery) cao và liên tục, từ đó mang lại nhiều giá trị tốt đẹp hơn đến cho người dùng.

Bài viết gốc ở [đây](https://qiita.com/konchanxxx/items/7b7ecb9d13eed7cb0427)