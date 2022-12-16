### A. File QA Management có tầm quan trọng như thế nào? 
Trước khi bắt đầu start dự án phần mềm, chúng ta đều phải xây dựng plan công việc cho từng team: Team Dev, Team QA, Team Comtor, Team Brse ... họ cần làm những gì trong Sprint này, trong đợt Release/Milestone này. Chính vì vậy mỗi bên sẽ đều phải tạo cho team của mình 1 file để quản lý các task mà dự án cần phải thực hiện. Và QA Management -  là 1 file không thể thiếu đối với team QA.

File QA Management này không chỉ giúp cho QA team quản lý các task mình cần phải làm mà nó còn là 1 tài liệu để Manager hay Khách hàng của bạn có thể xem được plan rằng chúng ta đã làm được những gì với số tiền mà họ đã trả cho bên mình. 

### B. Cách tạo file QA Management:
Chúng ta sẽ chia làm 2 sheet cần phải có:
 - Testcasse Progress (Là sheet thể hiện rằng mỗi 1 màn hình sẽ cần phải tạo bao nhiêu số testcase cần phải check)
- Execute Progress (Là sheet thể hiện rằng từng màn QA team đã test được bao nhiêu %, bao nhiêu case Passed/ Failed/Pending....)
            
### 1.Testcase Progress
1 sheet Testcase Plan cơ bản gồm có các cột: 
 - Screen ID
 -  Screen Name 
- Link spec 
- Link ticket 
- Link Check list (CL) 
- Testcase Plan (Số testcase bạn estimate cần phải  có ở từng màn hình) 
- Start Date/End Date (Thời gian mà bạn dự định sẽ tạo CL)
- QA Pic (Người được assign viết testcase cho màn hình đó) 
- Create Status (Bao gồm các status: Open/Creating/Created/Updating/Updated/Done/Pending/N.A => Để Manager của bạn biết rằng với ticket này bạn đang ở trạng thái nào để có thể support kịp thời khi bạn gặp khó khăn)
- Testcase Actual (Số case mà thực tế bạn tạo CL ở từng màn hình) 
- Review Status (Để giúp bạn đánh dấu những màn nào đã được review hay chưa review, giúp người tạo có thể bổ sung thêm quan điểm nếu còn thiếu, để tránh đến tay khách hàng mà vẫn còn thiếu case hay bị những bug normal)
- Note (cột này bạn có thể note ra tất cả các lý do cần lưu ý ở từng màn để cho cả team cùng nắm được và follow được dễ dàng hơn)

**Bạn có thể xem template ở đây nhé:**
![](https://images.viblo.asia/f9cd0596-fb20-4516-adad-9c6c950c3383.png)

### 2. Execute Progress
Tương tự với sheet Testcase Progress thì bên sheet Execute Test cũng có các cột tương ứng sau: 

- Link ticket
- Screen ID 
- Screen Name 
- Dev Pic (Để QA có thể biết rằng ai là người làm ticket này và contact khi có vấn đề, hoặc khi đến deadline rồi mà Dev chưa đưa ticket cho QA test => QA sẽ chủ động với Dev pic task đó và communicate)
- Ticket Due Date (Để QA nắm được plan của Dev và lên plan test cho các task đó) 
- Link CL: Để các bên cùng follow và mở xem để check sẽ dễ dàng hơn) 
- Testcase Actual (Để mọi người cùng xem được tổng số case cần test của 1 màn hình) 
- Start Date/End Date (Để QA team có thể lên plan ngày test cho từng màn hình) 
- QA Pic (QA được assign test màn đó) 
- Result test (Passed/Failed/Pending/N.A/Remain => Thể hiện số case của từng màn hình đang ở trạng thái gì và giúp Manager của bạn có cái nhìn tổng thể 1 cách dễ dàng hơn để có thể lên plan OT nếu màn đó còn nhiều bug hoặc chậm deadline đã commit với khách hàng) 
- Note (cột này cũng là để note lại những điều cần chú ý cho từng màn để các bên có thể cùng follow được)

**Bạn xem template ở đây nhé:**
![](https://images.viblo.asia/4e3b5138-c8c6-43c3-8b4d-60a257641f4c.png)

Thực sự file QA management rất cần thiết cho team QA trong dự án phát triển phần mềm. Nó là 1 công cụ giúp bạn lên Plan/Control và Estimate task của chính mình hay của các member khác. Nó còn là một file evidience vô cùng đáng giá để giúp Project Manager/Manager hay thâm chí là Khách hàng của bạn nắm được tình hình hiện trạng của dự án đang như thế nào để có thể có những kế hoạch dự phòng tiếp theo. Vậy nên đây là 1 công cụ không thể thiếu đối với team QA team. Các bạn hãy lưu lại và tận dụng nó cho công việc của mình nhé. 

### Tải file template tại đây:
https://docs.google.com/spreadsheets/d/1nn6PhTtXGDGoOlRksStLpcmK63XlvZKv/edit#gid=885198309 (Author template file: chị Dương Vân - QA Manager của Sun- Asterisk)