Hôm nay mình sẽ trình bày với các bạn bài viết về AWS basic cho người mới bắt đầu. <br>
Thực ra mình cũng chỉ mới vọc vạch AWS được khoảng vài ba tháng gần đây  thôi, <br>
Nên bài viết dưới đây có thể sẽ hơi "nhàn" với những người đã làm việc lâu năm.<br>
Tuy nhiên - hi vọng  có thể giúp các bạn lần đầu thực hành + tiếp cận aws dể dàng hơn.<br><br>
<br>
Các khái niệm, thuật ngữ về AWS thì cũng có khá nhiều bài chia sẽ rồi nên mình cũng không đề cập nhiều.<br>
Các bạn tham khảo một số bài viết bên dưới nhé:<br>
https://viblo.asia/p/aws-overview-naQZR7omlvx<br>
https://viblo.asia/p/aws-overview-mot-so-thuat-ngu-E375zyG6lGW<br>
https://viblo.asia/p/tim-hieu-ve-amazon-web-service-phan-1-Qbq5QWzJZD8<br>
https://viblo.asia/p/15-khai-niem-co-ban-can-tim-hieu-khi-lam-quen-aws-WAyK8Lo9KxX<br>
<br>

Giờ mình sẽ vào chủ đề bài viết hôm nay luôn: Nhập môn AWS P1<br>
Trong phần này mình sẽ hướng dẫn về: Tạo tài khoản, Tạo User, Group, Bảo mật MFA. <br>
### 1. Tạo tài khoản AWS
Đối với người mới, sau khi tìm hiểu về các khái niệm, các thuật ngữ - thì cũng đến lúc cần phải thực hành.<br>
Đầu tiền, các bạn tiến hành tạo 1 tài khoản AWS:<br>
Truy cập vào trang này nhé:  https://aws.amazon.com/ec2/<br>
-> Click "Try Amazone EC2 for free"<br><br>
![](https://images.viblo.asia/11c50f86-c454-4ab0-ae00-6bd95eae70e2.png)<br><br>
Tiến hành điền một số thông tin phù hợp <br>
( Lưu ý quang trọng, khi tạo tài khoản AWS thì bạn nhất định phải có 1 thẻ visa nhé , chí phí cho việc tạo account là 1$ )<br><br>
![](https://images.viblo.asia/08ddeaba-1ef1-4488-8d32-56fb4b08700d.PNG)<br><br>
Các bạn cứ điền thông tin theo form họ đưa, trong trường hợp tạo tài khoản xong, xác thực vẫn chưa được. <br><br>
Trường hợp này, bạn nên contact trực tiếp họ để nhờ hỗ trợ. Bên họ sẽ call mình hoặc inbox qua email.<br><br>
![](https://images.viblo.asia/a80b4ae8-eb49-402f-ae35-a94b30583218.png)<br><br>
Ngày trước mình cũng phải inbox để nhờ họ support việc active account đấy - vất vã =))<br><br>
![](https://images.viblo.asia/c37bdd70-6f57-412f-b802-8ae498a300c8.png)<br><br>
<br>
Ok, vậy là ta đã có 1 account để login vào aws.<br>
Sau khi login vào console của aws, việc đầu tiên bạn nên làm là  tạo 1 account khác mà  sử dụng<br>
Không nên dùng tài khoản root ( tức tài khoản default của mình).<br>
Việc sử dụng account root này khá là nhiều rủi ro vì nó full toàn bộ quyền, truy cập toàn bộ services trên aws,...<br>
Bạn cứ so sánh như trên hệ điều hành windown chẳng hạn - trên đấy tài khoản quản trị (administrator) luôn bị disable. <br>
Tài khoản mình login đó chỉ là tài khoản bình thường nhưng có quyền admin thôi. <br><br>
![](https://images.viblo.asia/fb3fb605-a3b9-4325-ad26-9a4b750156ba.PNG)<br>
<br>
### 2. Tạo  Group 
Tiến hành tạo 1 User khác trên aws, tài khoản này mình sẽ dùng để làm việc sau này.<br>
Tại thanh tìm kiếm của aws, ta search từ khóa IAM:<br>
IAM là gì, đây là services của AWS, cho phép bạn control quyền access đến AWS service và quản lý user.<br><br>
![](https://images.viblo.asia/bd614b8a-326f-45ad-a1cd-dc4d4967fe15.png)<br><br>
Tiến hành tạo 1 group:<br><br>
![](https://images.viblo.asia/acd5bcaa-f66b-41c4-8e69-0948231dd686.png)<br><br>
Đặt tên group đó:<br><br>
![](https://images.viblo.asia/4b032c8c-754b-44d5-9c4a-ae172d94d761.PNG)<br><br>
Attach policy cho nó:<br><br>
![](https://images.viblo.asia/18bde7a8-8ee9-4161-9926-45d8441e67b6.png)<br><br>
Review lại:<br><br>
![](https://images.viblo.asia/72832d20-325e-41d5-9407-6558f703d674.png)<br><br>
Finish:<br><br>
![](https://images.viblo.asia/677b3b1e-80cb-4e2b-83d2-07754f9f64b7.png)<br><br>
Như vậy là ta đã có 1 group tên là: administrator<br><br>
### 3. Tạo User
Tiếp đến tiến hành tạo 1 user.<br><br>
![](https://images.viblo.asia/9e72d812-2a30-49b1-8833-e55c521cec92.png)<br><br>
Đặt tên user và lựa chọn: Access type<br>
Note:<br>
'+ Programatic: Access key và secret key -> mình gen ra bộ key này để connect đến aws thông qua command line: ví dụ cmd, terminal...<br>
'+ AWS Management Console Access -> mình dùng passwd để login vào console.<br><br>
![](https://images.viblo.asia/7580fb6c-7985-4523-ab2d-aeaeea6ab062.png)<br><br>
Tiến hành set permision và add user vào group ban nãy ta đã tạo.<br><br>
![](https://images.viblo.asia/798495e8-23c2-418a-a573-d460ee2f8a38.png)<br><br>
Check lại thông tin<br><br>
![](https://images.viblo.asia/1212cdec-b13e-4b6c-852c-201276b0ff15.png)<br><br>
Tạo thành công user, aws sẽ hiển thị như thế này, mình tiến hành download file .csv về để bảo quản key các kiểu.<br><br>
![](https://images.viblo.asia/14c8d1de-a63e-4e17-996a-2bcbf7c09b0a.png)<br><br>
example file .csv<br><br>
![](https://images.viblo.asia/cd2f0a8d-ab7a-4d88-8f6b-f87841bbaaa0.png) <br><br>
<br>
=> OK, vậy là từ đầu bài viết đến giờ mình chỉ mới làm được 2 việc:  <br>
'+ Đăng kí tài khoản aws,<br>
'+ login account root -> sử dụng IAM để tạo group và user.<br><br>
### 4. Bảo mật tài khoản
Tiếp đến, mình sẽ tăng bảo mật cho user vừa được tạo.<br>
Chúng ta tiến hành login vào user. (không dùng account root nữa nhé)<br><br>
![](https://images.viblo.asia/bedf8622-d2e1-44c7-8a5b-087f0a1f77ca.PNG)<br><br>
Trong IAM, ta vào user của mình.<br><br>
![](https://images.viblo.asia/2d9f2e30-275b-491c-970e-3ec335ae040f.png)<br><br>
Sau đấy, vào tab security credentials -> Lựa chọn assigned MFA device <br><br>
![](https://images.viblo.asia/927096ef-c46d-4439-9597-856b5f3b662c.png)<br><br>
lựa chọn Vitual MFA device <br><br>
![](https://images.viblo.asia/ca19acf7-d25f-4132-ae7c-4d8257cd1665.PNG)<br><br>
Assign MFA<br>
Khi có hình QR code thế này, ta dùng app "google authenticate" trên điện thoại để scan nó nhé.<br>
Mỗi lần login vào aws, nó sẽ xác thực thêm mã MFA trên điện thoại của mình<br><br>
![](https://images.viblo.asia/115c08db-c207-4a41-b38a-18fc780cfc2c.png)<br><br>
Kết quả thành công sẽ như thế này.<br><br>
![](https://images.viblo.asia/2316eced-8105-4ec0-9cb6-0ab6d22e569d.PNG)<br><br>
Check lại phát nữa cho chắc:<br><br>
![](https://images.viblo.asia/e90fcd7f-15ca-4cba-a4b7-779a89958870.PNG)<br><br>

------
Bài viết chắc tới đây thôi, trong bài viết này mình đã làm được một số việc như sau:<br>
+ Tạo account AWS.<br>
+ Dùng tài khoản root để tạo group và user.<br>
+ Bảo mật cho tài khoản user thông qua MFA (google authenticate).<br>

Bài viết tiếp theo mình sẽ demo về các khái niệm như: VPC, Public subnet, Private subnet, Internet GateWay và NAT GateWay. <br>
https://viblo.asia/p/basic-amazon-web-services-p2-bWrZnwnYlxw <br>

Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai sót có thể góp ý để em(mình) cải thiện. <br><br>
Nguồn tham khảo:<br>
https://viblo.asia/p/aws-overview-naQZR7omlvx<br>
https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html<br>
https://cuongquach.com/aws-dang-ky-tai-khoan-aws-free-tier-mien-phi.html<br>
https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_create.html<br>