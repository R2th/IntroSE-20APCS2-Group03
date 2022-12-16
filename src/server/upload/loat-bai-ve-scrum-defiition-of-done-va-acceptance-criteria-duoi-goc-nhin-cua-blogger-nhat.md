Lời nói đầu: Chào anh em, mình triển khai loạt bài về Scrume đã được 3 kì rồi.
3 kì trước, mình dịch từ tài liệu của Scrum forum nên chủ yếu có thêm nhiều văn bản gốc tiếng Anh để anh em dễ học thuộc sau này thi lấy chứng chỉ.
Để đổi gió, lần này mình sẽ dịch 1 bài của 1 blogger người Nhật bàn về các yếu tố làm nên Definition of Done (Định nghĩa hoàn thành) và Acceptance Criteria ( Tiêu chuẩn tiếp nhận sản phẩm) nhé.

Bài gốc: http://agile.blog.jp/agile_scrum/14974054.html

Definition of Done (Định nghĩa hoàn thành) là một list các yêu cầu mà user story phải tuân theo nếu một scrum team muốn tuyên bố đã hoàn thành công việc.
Tiêu chuẩn để tiếp nhận user story : là việc test scenario phục vụ cho mục đích kiểm tra software có chạy đúng mong muốn hay chưa phải được thỏa mãn hoàn toàn .

Khác biệt: Definition of Done là đối ứng chung cho các user story trong khi tiêu chuẩn tiếp nhận chỉ dùng cho một user story xác định.
Các tiêu chuẩn tiếp nhận cho từng user story sẽ tuân theo yêu cầu của riêng user story đó.

Nói cách khác, cả DoD và Tiêu chuẩn  chấp nhận phải được đáp ứng để hoàn thành một User Story. Trừ khi cả hai danh sách này đã được lập, phần được làm thêm của sản phẩm không được coi là hoàn thành.
Do đó, bạn cần xác định hai khía cạnh của Định nghĩa Hoàn thành (DOD): Tiêu chuẩn  Hoàn thành và Tiêu chuẩn  Chấp nhận.

![](https://images.viblo.asia/f5da4d2a-af72-4361-a61d-7d64ea4a87be.png)


Định nghĩa các tiêu chí hoàn thành và nghiệm thu

Định nghĩa hoàn thành:

```
Định nghĩa hoàn thành được tổ chức dưới dạng danh sách các mục, mỗi mục được sử dụng để xác thực Story  hoặc PBI( product backlog item ).
 Những điều này tồn tại để thống nhất về chất lượng công việc mà nhóm phát triển đang cố gắng tạo ra. 
Nó hoạt động như một danh sách kiểm tra được sử dụng để kiểm tra tính toàn vẹn của từng  product backlog item  hoặc User story. 
```

Các mục trong Định nghĩa hoàn thành nhằm áp dụng cho tất cả các mục trong product backlog, không chỉ một User story đơn lẻ. Nó có thể được tóm tắt như sau.

```

- Thuật ngữ này áp dụng cho toàn bộ sản phẩm 
- Trong hầu hết các trường hợp, thuật ngữ này có nghĩa là sản phẩm có thể được giao (delivery).
- Thuật ngữ này được định nghĩa trong Hướng dẫn Scrum.
- Được sử dụng như một phương tiện giao tiếp giữa các thành viên trong nhóm khi trao đổi về: 
   + Chất lượng phần mềm tổng thể
   + Liệu phần gia tăng có thể delivery hay chưa?
```

Mục tiêu  của DoD :

```
- Xây dựng sự hiểu biết chung trong nhóm về chất lượng và tính chính trực
- Sử dụng làm danh sách kiểm tra để kiểm tra User story  (hoặc PBI)
- Đảm bảo rằng các sản phẩm được delivery trong giai đoạn nước rút có chất lượng cao và chất lượng đó được tất cả mọi người tham gia hiểu rõ.
```

Ví dụ cho DoD

Ví dụ, trong ngành công nghiệp phần mềm, các nhóm cần đưa ra các DoD bằng cách đặt các câu hỏi sau:
- Bạn đã tiến hành code peer chưa?
- Code đã hoàn thành chưa?
- Bạn đã kiểm tra  chưa?
- Code check chưa ?
- Bạn đã pass Unit test chưa?
- Bạn đã pass function test chưa ?
- Bạn đã hoàn thành việc kiểm tra nghiệm thu chưa?
- Chủ sở hữu sản phẩm đã xem xét và phê duyệt nó chưa?

Tiêu chuẩn xem xét đạt/ không đạt

Đối với user story, các quá trình phát triển agile dành cho các vật nhân tạo (vốn là một trong những việc phát triển chủ yếu),
thì chúng ta không cần thiết phải xem coi user story nào đang dùng một cách rõ ràng scrum cũng như tiêu chuẩn đánh giá hợp lệ.
Trong trường hợp nếu bạn cho rằng backlog sản phẩm đã được đưa vào quá nhiều, 
bạn sẽ cần chia vào các user story hiển thị trên sơ đồ sau đây, rồi sau đó chia vào 1 loạt các task bên dưới. 

![](https://images.viblo.asia/465b2c2c-2ff6-4226-b0b7-bbb21447cf00.png)


Tiêu chí Đạt / Không đạt

Bởi vì tiêu chí chấp nhận được gói gọn trong User STory, nê DoD và định nghĩa tiêu chí chấp nhận thường cùng tồn tại trong quá trình phát triển Scrum. 
User Story cung cấp bối cảnh của các tính năng mà nhóm của bạn nên cung cấp. 
Tiêu chí chấp nhận cung cấp chi tiết về các tính năng và hướng dẫn về cách khách hàng sẽ chấp nhận chúng. 
Hai tiêu chí này cùng bàn giao toàn bộ sản phẩm hoàn thành.

Một số tiêu chí phê duyệt được phát hiện trong sự kiện sàng lọc tồn đọng đang diễn ra trước khi bắt đầu Sprint. 
Nó cũng có thể được phát hiện ngay sau khi Lập kế hoạch Sprint cho các cuộc trao đổi quy mô  nhóm nhỏ về User story . 
Do đó, tiêu chí phê duyệt là các thuộc tính dành riêng cho User Story  hoặc các mặt hàng tồn đọng của sản phẩm.

```

- Thuật ngữ này áp dụng cho các PBI / Story  riêng lẻ
- Tiêu chí vượt qua khác nhau đối với mỗi PBI / Story 
- Thuật ngữ không được định nghĩa trong Hướng dẫn Scrum
- Nó được sử dụng như một phương tiện để thông báo với tất cả những người có liên quan rằng một yêu cầu cụ thể về PBI / STory  được đáp ứng.
- Còn được gọi là Acceptance test , điều kiện thỏa mãn, trong một số trường hợp là "testcase" v.v.
```


Tiêu chí để đánh giá đạt mục tiêu: 
- Làm rõ những gì nhóm nên xây dựng trước khi bắt đầu công việc
- Đảm bảo rằng mọi người đều có hiểu biết chung về vấn đề
- Thông báo cho các thành viên trong nhóm khi story  hoàn tất
- Sử dụng auto test  để giúp xác thực story  của bạn.

Ví dụ về tiêu chí đạt chuẩn :

- Người dùng phải điền vào tất cả các trường bắt buộc trước khi họ có thể gửi form 
- Thông tin từ form  được lưu trữ trong cơ sở dữ liệu đăng ký.
- Thanh toán bằng thẻ tín dụng
- Sau khi gửi form , một email xác nhận sẽ được gửi đến người dùng.


Hình sau cho thấy một ví dụ về tiêu chí phê duyệt user story.
![](https://images.viblo.asia/bf32af0f-a1bc-43a3-9191-216ed126cd41.png)


///

Hi vọng là qua bài viết vừa rồi, anh em đã có thêm một góc nhìn về Definition of Done cũng như Acceptance Criteria.
Việc làm rõ các tiêu chí này trước khi bắt đầu một Sprint sẽ giúp giảm thiểu thời gian phát sinh thêm do chưa nắm rõ các tiêu chí, cũng như đảm bảo việc giao hàng đúng hẹn với chất lượng tốt nhất.