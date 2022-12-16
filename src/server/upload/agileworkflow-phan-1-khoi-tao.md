Bài viết này thuộc chuỗi bài viết [AgileWorkflow](https://viblo.asia/s/agileworkflow-ung-dung-quan-ly-du-an-don-gian-WrZng82rlxw).  
> Đọc bài này, bạn không thực sự phải hiểu về Agile là gì, bản có thể hiểu đơn giản, app mình đang làm chỉ là **1 cái app để quản lý dự án**.
----
# Về Agile và Agile Scrum.
Nói một cách đơn giản, đây là 1 mô hình để phát triển phần mềm, với mục tiêu cao nhất là nhanh chóng đưa sản phẩm đến tay người dùng, phù hợp cho những dự án mà requirement thay đổi liên tục,...
Nó ra đời cũng khá lâu rồi, và cũng có khá nhiều bài viết nói về nó, mn có thể tìm hiểu nó ở đây:
- https://topdev.vn/blog/agile-la-gi-scrum-la-gi/
- https://scrum.org/
Ở đây thì mình sẽ tập trung vào dự án AgileWorkflow thôi.
# Về dự án AgileWorkflow.
## Goal
Về dự án này, expected output của mình là nó có thể hiển thị ra danh sách các dự án của 1 member, cho phép member đó thấy được tình trạng hiện tại của dự án, đang ở sprint nào, có milestone nào hay không, sprint hiện tại tình trạng như thế nào, các backlog đang ở đâu, cái nào đã xong, cái nào đang làm hay chưa làm. Team đã dành bao nhiêu thời gian cho backlog so với thời gian estimate ban đầu của backlog,...
## Tech
Về công nghệ, mình sẽ sử dụng các framework phổ biến để tối ưu hoá chí phí thiết kế.
- Với Frontend, mình sử dụng Antd (bạn có thể tìm hiểu về nó ở [đây](https://pro.ant.design), tại vì nó đã làm hết từ khâu set-up code, state management,... và đặc biệt là nó hỗ trợ Typescript.
- Với Backend, mình sẽ sử dụng NestJS (ở [đây](https://nestjs.com), nó là 1 framework cho NodeJS, và tất nhiên là nó cũng hỗ trợ Typescript.
- Với Database, thì mình sẽ sử dụng PostgreSQL, adminer để xem và quản lý DB, và một số thứ khác - Docker.
## Cover
Với dự án này, sẽ khó hiểu cho những ai chưa biết về Agile hay Scrum là cái quần gì, thì hiểu đơn giản, dự án này được tạo ra, như 1 công cụ **Quản lý dự án**.

![image.png](https://images.viblo.asia/f0c7e093-fe2c-4c6f-acde-7c767e9a41b9.png)

Nói về mô hình này, thì có thể hiểu như sau:
- Để hoàn thành/bàn giao (deliver) một project, 1 team cần phải deliver các iteration (iteration ở đây, có thể hiểu là 1 chu kỳ phát triển được lặp lại trong quá trình phát triển, có thể gọi theo tên khác là sprint).
- Để 1 iteration hoàn thành, team cần phải hoàn thành các backlog đã lên kế hoạch trong iteration đó (backlog ở đây là 1 tính năng của dự án)
- Để hoàn thành 1 backlog, team cần phải chia nó ra thành các task nhỏ hơn và hoàn thành các task đó.

VD: Dự án của bạn cần làm trang quản lý sinh viên, và trong iteration đầu tiên, team bạn đặt kế hoạch là xong chức năng đăng nhập và đăng ký. Như vậy ở đây, mình sẽ có 2 backlog là "Đăng nhập" và "Đăng ký". Để hoàn thành backlog "Đăng nhập", bạn có thể sẽ phải đi qua các task, ví dụ như: "implement UI, handle state sau khi đăng nhập, handle lỗi lúc đăng nhập fail, tạo API đăng nhập,..."

> Thực ra mình có dùng thử 1 tool là trello của Atlassian, nhưng thấy nó chỉ dừng lại ở mức là chia đến backlog, và mình gặp phải 1 vấn đề là, không biết được tình trạng hiện tại của backlog đó, ai đang và đã làm cái gì, dành bao nhiêu thời gian, tổng thời gian cho nó là bao nhiêu, để đánh giá độ ưu tiên cho nó.

Trên đây là phần mô tả bao phủ cho toàn bộ dự án nó sẽ làm về cái gì, có gì trong đó,...
Mô hình trên chỉ là khái quát về những thứ cần có, còn những thành phần chi tiết như database như thế nào, cấu trúc làm sao, có lẽ mình sẽ mang nó sang phần 2.