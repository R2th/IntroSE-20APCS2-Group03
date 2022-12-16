# 1. Tìm hiểu Kanban board
## 1.1. Định nghĩa kanban board 

Kanban board là một công cụ quản lý dự án linh hoạt giúp bạn trực quan hóa công việc, hạn chế công việc đang thực hiện và tối đa hiệu quả công việc.

Kanban board được thực hiện theo nguyên tắc PUSH- nguyên lý kéo. Khi chúng ta hết công việc thì chúng ta sẽ kéo một công việc mới sang, và nguyên tắc PUSH là nguyên tắc không cho phép công việc tồn đọng lúc nào chúng ta cũng phải tiết kiệm, linh hoạt.

Thành phần một bảng Kanban
+ Bảng Kanban với các hàng và cột phù hợp quy trình
+ Kanban card: Có thể là các ticker chứa  nội dung công việc
+ Limit WIP - work in progress: Giới hạn công việc đang làm

## 1.2. Xây dựng Kanban board

Tùy từng quy trình, công việc mà chúng ta có thể xây dựng bản kanban phù hợp. Dưới đây là một ví dụ minh họa cho bảng Kanban kết hợp với quy trình Scrum

![](https://images.viblo.asia/8264bb4c-dc67-4092-9d87-ca469ce70179.png)

*Hình 1: Kanban board*

**To Do :** Những mảng công việc, các task công việc chưa làm đến

**In progress:** Dành cho những công việc đang làm đang thực hiện

**Testing:** Những công việc đã làm xong và Tester có thể kiểm tra

**Done:** Dành cho những công việc đã hoàn thành, đã xong,đã kiểm tra xong

Bảng Kanban này kết hợp với quy trình Scrum nên chúng ta có thêm cột Stories (User Stories) để chúng ta quản lý luôn tiến độ của các yêu cầu trong dự án

Nếu như các bạn có một quy trình khác các bạn cũng có thể thiết kế một bảng Kanban khác với các hàng, các cột phù hợp với quy trình đó.

## 1.3. Nguyên lý hoạt động của kanban board

Đầu mỗi sprint chúng ta sẽ có buổi Plan meeting, tại buổi plan meeting này chúng ta sẽ lập nên các User Stories sẽ làm trong một sprint. Khi tạo bảng Kanban chúng ta nên dùng các Kanban card(có thể dùng giấy nhớ) với các màu sắc khác nhau để dễ phân biệt


Trong buổi Plan meeting ngoài việc chọn các US(User stories) để làm chúng ta sẽ tiến hành break task, phân chia các công việc sẽ làm trong sprint này và ai là người thực hiện từng task. Mỗi US sẽ bao gồm các task, các task này sẽ được phân chia thành các task bé hơn. Công việc nào sẽ được thực hiện trong sprint này chúng ta sẽ kéo từ cột To Do sang Inprogress, và người thực hiện task đó cần viết tên mình vào Kanban card.

Nếu ai đó không thể hoàn thành được task thì họ có thể chuyển từ Inprogress về cột To Do để các thành viên khác biết và tiếp nhận công việc. Nguyên tắc Kanban board đó là mỗi người không làm cùng lúc 2-3 công việc, ví dụ trong cột Inprogress không thể có 2 ticket của cùng 1 người

![](https://images.viblo.asia/d4a5b998-613d-4ce1-a9fb-ac41f4c63586.png)

*Hình 2: Kanban board*

Ví dụ nhìn vào hình 2 ta có thể biết được đối với US Task #1 chúng ta sẽ cần làm 8 công việc đó là Task #2,  Task #3, Task #6,Task #7, Task #9, Task #8, Task #16,Task #17. Trong đó
- Task chưa làm đến(To do ): Task #2,  Task #3, Task #6
- Task đang trong quá trình làm(In progress) : Task #7, Task #9
- Task dev đã hoàn thành và Tester có thể tiến hành kiểm thử: Task #8
- Task đã hoàn thành kể cả việc kiểm thử: Task #16, Task 17

Dựa vào Kanban board chúng ta có thể biết được tiến độ của công việc, những US nào đang được thực hiện, US nào chưa được thực hiện. Nhìn trên bảng Kanban board chúng ta có thể nắm được tiến độ dự án mà không cần hỏi bất cứ ai, vì nó luôn hiện trước mặt. Đây là ưu điểm của Kanban board về độ trực quan, linh hoạt và dễ sử dụng.
# 2. Tìm hiểu Burndown chart
## 2.1 Định nghĩa Burndown chart
Biểu đồ Burndown thể hiện các ước tính cập nhật hàng ngày về khối lượng công việc còn lại tới khi hoàn thành. Burndwown chart được sử dụng để theo dõi tiến độ của sprint(có thể gọi là Sprint Burndown chart ). Biểu đồ Burndown lấy dữ liệu ước tính từ bảng Kanban

## 2.2 Nguyên lý hoạt động của Burndown chart 
![](https://images.viblo.asia/48ea7de5-76e5-4c03-b0a3-5cfd2980c6a0.png)

*Hình 3: Burndown chart* 

Giả sử chúng ta có một sprint: 
- Timebox: Hoạt động trong 2 tuần
- Sprint backlog: 90 User stories

Biểu đồ Burndown chart được thể hiện như hình(Hình 3)
- Trục tung hiển thị số US
- Trục hoành hiển thị thời gian của sprint
- Đường màu xanh được gọi là đường tuyến tính - đường kế hoạc của đội dự án, mỗi một ngày chúng ta sẽ hoàn thành một số task sao cho số task giảm dần đến ngày kết thúc sprint sẽ về 0. 
- Đường màu đỏ thể hiện tiến độ hoàn thành của đội dự án

Sau ngày thứ nhất số task giảm từ 90 xuống 70 task. Số task còn lại chúng ta sẽ đếm trên cột To Do của bảng Kanban và sự báo cáo của mọi người vào buổi daily meeting hàng sáng. Như vậy chúng ta có đường thực tế của ngày thứ nhất. Tương tự kết thúc ngày thứ 2 chúng ta chỉ còn lại 60 task chúng ta sẽ vẽ được đường thực tế của ngày thứ 2. Lặp lại với các ngày tiếp theo chúng ta vẽ được đường thực tế thể hiện tiến độ của đội dự án. 

Dựa vào sự chênh lệch giữa đường kế hoạch(màu xanh) và đường thực tế(màu đỏ) chúng ta có những điều chỉnh sao cho phù hợp. Đường màu đỏ nằm dưới đường màu xanh có nghĩa chúng ta đang hoạt động rất tốt, đường màu đỏ nằm trên đường màu xanh có nghĩa chúng ta đang làm được ít hơn so với kế hoạch, đang còn những task cần hoàn thành mà chúng ta chưa làm được.

Nếu việc này sảy ra nhiều ngày liên tiếp hoặc gần kết thúc sprint mà không thể hoàn thành công việc  thì chúng ta cần họp đội dự án để đưa ra phương án giải quyết. Có thể bỏ bớt một số task chưa thật sự quan trọng để đảm bảo kết thúc sprint chúng ta vẫn có sản phẩm giao cho khách hàng. Tương tự nếu chúng ta hoàn thành công việc tốt hơn kế hoạch, đến ngày thứ 5 chúng ta chỉ còn 10 task thì chúng ta có thể pick thêm những US khác đơn giản để vào làm trong sprint này vì timebox của 1 sprint là cố định chúng ta không được kết thúc sprint sớm hơn. 

Tuy nhiên mọi quyết định vẫn phải do toàn đội dự án quyết định dựa vào quan sát và phân tích Kanban board cũng như Burndown chart.

Như vậy dựa vào Kanban board và Burndown chart chúng ta có thể dễ dàng quả lý và theo dõi tiến độ công việc một cách trực quan, nhanh chóng và dễ dàng. 

**Link tham khảo:** 

1. https://labs.septeni-technology.jp/agile/scrum-master-o-septeni-technology/
2. https://www.atlassian.com/agile/kanban/boards
3. https://www.projectmanager.com/blog/burndown-chart-what-is-it