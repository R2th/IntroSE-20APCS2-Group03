Bài trước tại [đây](https://viblo.asia/p/di-nghien-code-thuat-van-dap-cach-xay-dung-mot-website-hang-trieu-nguoi-dung-p4-OeVKBrLJKkW)
Đĩ: Ngày vừa mưa vừa lụt, nếu một server bị lụt thì cơ chế thế nào để đảm HA đây anh Nghiện?

Nghiện: Có vài con server chống lụt thôi chứ sao? Chết con này còn con khác đấy chính là cơ chế HA.

![](https://images.viblo.asia/e593562b-c533-4ec1-a876-d444e54cd509.png)


Đĩ: Chỗ API thì em ok rồi, vì mình có cơ chế load balancing, chết con Server API này thì vào con khác rất OK, nhưng chỗ worker ấy, em không muốn nó chạy tất cả các con worker cùng lúc, em chỉ có nhu cầu chạy một con thôi, để đảm bảo toàn vẹn dữ liệu, nhưng nếu con đó chết em muốn có con khác thay ngay lập tức.

Nghiện: Trường hợp đấy cần dùng cơ chế Leader Election, nghĩa là chỉ có một con là leader thực thi thôi, các con khác không thực thi mà sẽ thay khi con leader ngỏm mà thôi.

Đĩ: Đại loại như thế nào?

Nghiện: Kiểu như hình này![](https://images.viblo.asia/054b9951-4195-4d57-8e22-1cc9aab1e68c.png)

Trong đó thay vì mọi server đều thực hiện việc lưu dữ liệu vào database, chỉ có một con chạy còn các con khác để dự phòng thôi. Nếu con đó chết sẽ bầu lại leader mới và lúc đó con leader mới sẽ tiếp tục công việc.

 Đĩ: Nghe hấp dẫn đấy nhưng làm sao để bọn nó bầu được nhỉ? Như em đi bầu còn chả biết chọn ai nữa là cái máy. Lại còn biết nay con leader chết mà thay luôn chứ. Bầu nhanh thế mới ảo. Không bị nhầm kiểu hai con đều làm leader rồi cùng ra lệnh mới hay chứ.
 
 Nghiện: Uk cái đó cũng hơi bị khó đấy, may mà có mấy ông đầu to nghĩ cho mình rồi. Có vài thuật toán như Paxos hay Raft và nó tương đối là phức tạp. Nếu mình phải implement thuật toán đó cho server thì sẽ hơi bị mất công.
 
 Đĩ: Thế là có thư viện đỡ phải cài ấy gì hehe!
 
 Nghiện: Thực ra không hẳn thế, mà là có mấy phần mềm đã dùng các thuật toán trên rồi như zookeeper và etcd, Zookeeper được dùng trong Kafka còn Etcd được dùng trong K8s toàn hàng nổi tiếng cả. Nó không hẳn để dùng cho leader election, nhưng nó giúp chúng ta tự implement leader election dễ dàng hơn. 
 
 Đĩ: Như thế nào mà dễ, anh ví dụ em cái xem nào? Lại ngáo rồi. Hồi bé em thích vẽ bảo anh dạy thế là anh bắt em làm mẫu khỏa thân anh vẽ, xong lúc dạy lại bảo em cứ làm theo hướng dẫn là dc, em có vẽ được đâu.
 
 Nghiện: Hừm cái bức tranh đó mất đâu rồi, để hôm nào làm mẫu lại cho anh nhé! Đại ý thì cài tool mình dùng kia nó là một cái db cho dễ hiểu đi, key-value store và quan trọng nhất là nó highly available và strongly consistent. HA thì em biết rồi nghĩa là nó không hay bị ngỏm, còn consistent là gì? là trên hệ thống phân tán, khi em thêm hay lấy dữ liệu từ bất kỳ đâu cũng luôn ra một kết quả giống nhau, hoặc không lấy được cái gì cả. 
 
 Đĩ: Kinh nhỉ vừa HA lại vừa consistent khó phết đấy chứ, bên họ làm thế nào nhỉ?
 
 Nghiện: Anh không biết chắc là implement một trong hai thuật toán kia, thôi đi tiếp nào. Ý tưởng của việc này là ta chỉ cần lưu tên hoặc IP của leader vào Etcd với một thời gian cố định ví dụ 5s không cho bất kỳ server nào được sửa. Khi hết thời gian ta lại save key đó bằng ip của server đó. Nếu leader bị chết thì sẽ không giữ key đó được,  server nào mà save được vào thì nó lại trở thành leader. Anh không thích viết code vào đây em có thể google election leader etcd hoặc zookeeper là ra ngay.
 
 Đĩ: OK em hiểu rồi. 
 
 Một số khái niệm cần lưu ý: Leader election, etcd, zookeeper,consistent,Paxos,Raft