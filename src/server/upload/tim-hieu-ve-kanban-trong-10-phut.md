# Tổng quan (Overview)
![](https://images.viblo.asia/d95577a4-9fb6-401f-9391-a2465689169b.jpg)

Khi tìm hiểu về mô hình phát triển phần mềm Agile chúng ta không thể không nhắc tới Kanban, một methodology nổi tiếng của Agile (cùng với các methodology khác như Scrum, XP, ...). Tóm gọn lại thì Kanban là một hệ thống quản lý công việc giúp bạn có thể trực quan hóa (visualize) công việc của mình, giới hạn số việc đang làm dở, và tối đa hóa năng suất công việc. Hệ thống này hoạt động theo dòng chảy (flow). Nói cách khác, **Kanban là một dòng chảy công việc được trực quan hóa (visualize workflow)**. Kanban là một từ tiếng Nhật (看板) có nghĩa là bảng thông tin (signboard). Bạn có thể bắt đầu mô hình Kanban cực kì đơn giản trong 3 nốt nhạc:
* Bước 1: Vẽ một bảng Kanban (**Kanban Board**)
* Bước 2: Dán lên đó các thẻ Kanban (**Kanban Card**)
* Bước 3: Đặt ra giới hạn số công việc đang làm (**Limit WIP** - work in progress)

Vậy là xong !!!

# Các quy tắc của Kanban (Principles of Kanban)  
* Bắt đầu bằng những việc đang làm (**Start With What You Do Now**): Bạn có thể bắt đầu chuyển đổi từ mô hình phát triển hiện tại sang phương thức Kanban một cách nhanh chóng và dễ dàng, ngay từ những công việc còn đang làm dở, mà không gây ảnh hướng tới các phần công việc đã hoàn thành trước đó.
* Tôn trọng các vai trò và trách nhiệm hiện có (**Respect the Current Roles & Responsibilities**): Bạn chỉ việc áp dụng mô hình Kanban vào dự án thôi mà không cần thay đổi vai trò và trách nhiệm của các thành viên
* Khuyến khích phát triển từ mọi cấp độ (**Encourage Acts of Leadership at All Levels**): Điều này có nghĩa là mọi thành viên trong dự án đều cần cải thiện bản thân liên tục (tinh thần Kaizen) để tăng performance của team/của bộ phận/ của cả công ty.

Để dễ hình dung hơn chúng ta hãy cùng bắt tay vào thực hành luôn, vẽ Kanban board.

# Kanban board
Kanban board là một bảng bao gồm:
1. Các cột thể hiện trạng thái: Tùy vào độ phức tạp của dự án, bạn có thể có nhiều hoặc ít cột. Mình lấy ví dụ đơn giản nhất là 3 cột tương ứng với 3 trạng thái của task là:
- Những việc phải làm (TO DO)
- Những việc đang làm (DOING)
- Những việc đã làm xong (DONE)

Kanban board có thể được vẽ bằng bút dạ trên bảng trắng truyền thống hoặc sử dụng các tool điện tử như [JIRA](https://jira.atlassian.com/) hoặc [TRELLO](https://trello.com/).

*Example:*

*Sử dụng Kanban board để quản lí bài viết này. Chúng ta sẽ kẻ 1 bảng gồm 3 cột: TO DO, DOING và DONE*

![](https://images.viblo.asia/1eebf0f5-2273-475d-b81d-8963fbd6fa71.png)

2. Các thẻ Kanban card:
- Đây là một thành phần quan trọng của Kanban, giúp trực quan hóa các task. Mỗi thẻ Kanban chứa một công việc cụ thể có thể đo lường được (càng nhỏ, càng cụ thể càng tốt). Giống như 1 tờ sticky note vậy. Kanban card sẽ được di chuyển từ cột này sang cột khác khi status của nó thay đổi, giúp trực quan hóa workflow. Ở trong Agile thì Kanban card chính là từng feature\product backlog được chia nhỏ thành các user-story.

*Example:*

*Viết tên các task lên Kanban card rồi sắp xếp vào các cột tương ứng. Chúng ta sẽ có các task cần làm như sau: Overview, Principles of Kanban, Kanban board, Kanban vs. Scrum.*

*Phần Overview và Principles of Kanban đã hoàn thành nên sẽ để ở cột DONE.*

*Phần Kanban board đang làm dở nên sẽ để ở cột DOING* 

*Phần Kanban vs. Scrum vẫn chưa làm nên sẽ để ở cột TO DO.*

![](https://images.viblo.asia/5583fcf2-59ca-4670-ac14-55fe1650b116.png)

3. Limit WIP:
- Để có thể đảm bảo tiến độ công việc (ai cũng có việc để làm) và tránh hiện tượng nghẽn cổ chai, chúng ta cần giới hạn số WIP tối đa trong một cột. Con số WIP này tùy thuộc vào số lượng member trong team và năng lực của các member.

*Example:*

*Do bài viết này chỉ có một mình mình thực hiện cho nên vào một thời điểm chỉ có 1 task được làm. Vì vậy mình sẽ để limit cho cột DOING là 1. Đồng thời sẽ kéo thẻ Kanban board sang phần DONE vì mình sẽ kết thúc phần này tại đây. Đồng thời kéo tiếp thẻ Kanban vs. Scrum để thực hiện nó.*

![](https://images.viblo.asia/774f4878-4cda-48b8-a43c-95480c69d84b.png)

*Một ví dụ khác về limit WIP:*

![](https://images.viblo.asia/475ef177-4b1b-47e2-a4c4-16fe3b99b256.png)

# Kanban vs. Scrum

Đã có rất nhiều bài so sánh chi tiết về sự khác nhau giữa hai methodology này của Scrum. Tuy nhiên trong bài viết này thì mình sẽ nêu vắn tắt như sau:

1. Tổng quan: 

| Kanban | Scrum |
| -------- | -------- |
| Làm việc theo danh sách hàng đợi | Hoạt động theo Sprint plan | 
| Kéo task từ cột TO DO sang DOING để làm, hết task này thì tự động kéo task khác | Chỉ làm các task của sprint đó thôi |
| Làm cho đến khi thỏa mãn tiêu chí DONE | Phải pass Sprint Review của PO |
| Lặp lại y như cũ | Có Retrospective để cải thiện chất lượng các sprint sau |

2. Meeting:

| Kanban | Scrum |
| -------- | -------- |
| Không cần meeting cũng được | Có rất nhiều meeting (Spring planning, Daily Meeting, Retrospective Meeting) |l

3. Role:

| Kanban | Scrum |
| -------- | -------- |
| Giữ nguyên role của mô hình cũ | Yêu cầu đủ các role: Stakeholder, Product Owner, Scrum Master, Team |

4. Các công cụ:

| Kanban | Scrum |
| -------- | -------- |
| Kanban board | Backlog, Burndown chart, Potiential Shipable Product (PSP) |

Như vậy qua bảng phân tích sự khác nhau giữa Kanban và Scrum thì chúng ta có thể thấy Kanban thường được coi là method và áp dụng cho các dự án nhỏ, đơn giản. Còn Scrum thì có thể gọi là một framework đầy đủ và phù hợp với các dự án vừa và lớn. Do Scrum bao gồm đầy đủ các yếu tố cần thiết (role, meeting, artifacts,...) để có thể áp dụng vào mọi loại dự án mà không cần phải thêm bất cứ một framework nào khác.

Tuy nhiên do tính chất đơn giản và linh động nên Kanban có thể được áp dụng rộng rãi trong rất nhiều domain của cuộc sống chứ ko chỉ riêng lĩnh vực software development. Ví dụ bạn có thể áp dụng Kanban board để quản lý công việc hàng ngày của bạn, hoặc quản lý bài tập về nhà, quản lý nhà hàng, quán ăn... 

P/S: Trước khi kết thúc bài viết thì mình xin update nốt phần cuối vào cột Done để kết thúc bảng Kanban board của mình :)
Cảm ơn các bạn đã dành thời gian đọc bài viết này.

![](https://images.viblo.asia/1a8d4e99-33ae-4161-9442-0ab755c58c8b.png)


Source:

https://www.atlassian.com/agile/kanban

https://kanbanize.com/kanban-resources/getting-started/what-is-kanban