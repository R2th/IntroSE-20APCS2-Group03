Mình làm công việc BRSE đã được một thời gian, nhìn lại con đường không ngắn không dài đã đi thì tự cảm thấy một trong những điều may mắn của mình khi mới chập chững bước chân vào nghề này đó là được tiếp nhận dự án đã run sẵn rồi.
Nghe có vẻ phi lý, thường thi người ta muốn tiếp nhận dự án ngay từ khi mới bắt đầu. Chẳng ai muốn vào dự án giữa chừng cả, vì như vậy vừa phải tốn công sức tìm hiểu dự án càng nhanh càng tốt để theo kịp tiễn độ của mọi người.

Vây cái hay của việc vào dự án lúc giữa chừng là gì mà mình lại cho nó là may mắn của mình?
Đó là khi dự án đã chạy được một thời gian rồi thì process của nó đã ổn định. Nếu bạn đã nắm được spec, tính chất của dự án rồi thì cứ thế mà áp dụng quy trình đã xây dựng sẵn rồi quản lý team thôi.
(Nghe có vẻ như hưởng lợi từ công sức của người khác. Nói vậy cũng đúng một phần, nhưng kể từ sau khi tiếp nhận dự án thì bạn phải có trách nhiệm thay đổi process cho thích hợp với tình hình dự án. Nên cũng không phải là không cần bận tâm về process nữa đâu)

May mắn là vậy thì đương nhiên nó cũng có mặt trái của nó.
Đó là khi bạn đã quen với việc base trên process người khác xây dựng sẵn để làm việc thì đến lúc tiếp nhận một dự án ngay từ đầu có lẽ bạn sẽ rơi vào tình huống không biết cần chuẩn bị những gì.

Trong bài viết hôm nay mình sẽ giới thiếu cho các bạn những điều cần chuẩn bị khi bắt đầu một dự án mới hoàn toàn.

## 1. Xác định phạm vi công việc, xây dựng plan resource
Đây là công việc đầu tiên và vô cùng quan trọng khi bắt đầu một dự án.
Việc xác định phạm vi công việc rõ ràng không những giúp estimate chính xác mà còn tránh gây hiểu nhầm nhận thức giữa khách hàng và team phát triển.
Ví dụ khi phát triển app thì cần xác nhận rõ ràng chỉ làm app thôi, hay cần làm cả web, admin? Về phía server thì ai xây dựng môi trường, ai thiết kế database. Hay đối với QA thì xác định rõ test trên những môi trường nào, device nào, có test api không, hay chỉ test app thôi,...

Sau khi xác định rõ phạm vi công việc thì có tiến hành kiểm tra lại estimate sau đó xây dựng kế hoạch resource cho đến khi release dự án.
Chú ý ở đây là việc xây dựng resource cần xây dựng kế hoạch nhân sự cho đến khi release dự án luôn chứ không phải chỉ là kế hoạch của tháng tiếp theo.
Sau đó, vào mỗi tháng tương ứng sẽ tiến hành điều chỉnh resource lại theo tình hình thực tế.

Sau khi xây dựng kế hoạch nhân sự cho đến khi release sản phẩm thì gửi cho khách hàng confirm.
Điều này vừa giúp khách hàng mường tượng ra được cost họ phải chuẩn bị, vừa giúp team phát triển chuẩn bị lượng nhân sự cần thiết để vận hành dự án.

## 2. Xác định các tool cần sử dụng, xây dựng rule sử dụng tool
### 2.1 Tool quản lý task
Thông thường chúng ta hay lựa chọn giữa redmine hoặc backlog. Sau khi thống nhất tool quản lý task thì cần phải xây dựng ngay từ đầu rule quản lý task.
Rule quản lý task các bạn có thể tham khảo một số đầu mục như sau:
* Ai là người tạo task?
* Ai là người update tiến độ? Update khi nào và như thế nào?
* Liên lạc các bện liên quan như thế nào khi thay đổi trạng thái task (từ Inprogress -> Done chẳng hạn)?
* Ai là người xác nhận task Done và close task?
* Mô tả description của task như thế nào (cần những thông tin gì)?
...

Thông thường dev sẽ cảm thấy việc vậng hành theo rule như thế này mang lại hiệu quả ít và tốn thời gian.
Tuy nhiên, nếu tuàn thủ theo rule thì quá trình phát triển sẽ trở nên minh bạch, rõ ràng. Tiện cho khách hàng cũng như các leader tracking, nắm rõ tiến độ.
Và nếu chẳng may dự án xảy ra vấn đề đây sẽ là một kênh history, evidence để làm rõ vấn đề xuất phát từ đâu.

Tóm lại đừng để đến khi dự án dính phốt, khách hàng muốn kiểm tra quá trình phát triển thì mới bắt đầu quản lý task. Điều này sẽ tạo cho khách hàng ấn tượng không tốt rằng bạn không chuyện nghiệp trong việc quản lý công việc.

### 2.2 Tool quản lý source code
Đa số mọi người đều chọn github (nói là đa số vì mình từng làm dự án ko quản lý source bằng git mà chỉ quản lý file source code thôi).
Đương nhiên ở đây cũng cần rule sử dụng rõ ràng.
Ví dụ như:
* Cách đặt tên pull
* Link đến task liên quan như thế nào? (Ví dụ như copy link task vào description của pull)
* Mô tả description như thế nào?
* Có gắn tag hay không?
* Cách fix comment (tạo commit mới hay sửa đè)
* Ai là người merge pull?
* Các nhánh đã merge thì xóa đi hay giữ nguyên?
...
Tương tự như quản lý task, việc xây dựng rule quản lsy source code rõ ràng cũng giúp cho công việc trở nên tường minh hơn và tránh gây hiểu nhầm giữa các bên.

### 2.3 Chuẩn bị môi trường
Đương nhiên nếu muốn code được thì phải có môi trường. Thông thường môi trường phát triển sẽ do dev dựng trên server local của công ty để phát triển.
Tuy nhiên, cũng cần confirm rõ với khách những vấn đề sau:
* Việc xây dựng các môi trường (dev, stg, prod) sẽ do bên nào đảm nhiệm
* Sử dụng môi trườnng gì? (AWS chẳng hạn)
* Vẽ sơ đồ môi trường, estimate cost

# 3. Xây dựng process vận hành dự án, xác định vai trò của mọi người trong dự án
Quyết định process sử dụng trong dự án. Thông thường mọi người sẽ lựa chọn Agile, phân chia chu kỳ phát triển với độ dài khoảng 1 tuần hoặc 2 tuần.
Sau khi quyết định chu kỳ phát triển thì xác định công việc của mỗi người trong 1 chu kỳ như sau:
* Ai là project owner? Ai là master?
* Khi nào cần complete việc phát  triển?
* Khi nào thì bắt đầu test? Khi nào test xong?
* Khi nào thì gửi kết quả công việc cho khách xác nhận?
...

# 4. Tạo các file quản lý cần thiết
Ngoài các tool quản lý ra cũng cần chuẩn bị thêm 1 số file giúp ích cho việc quản lý.
Thông thường sẽ có những file sau:
* MileStone : xây dựng schedule cho đến khi release toàn bộ sản phẩm
* File quản lý feedback, CR : đối với CR có thể tiến hành estimate đối với mỗi task để biết lượng effort phát sinh thêm.
* File quy trình release
...


Trên đây là những nội dung mình cảm thấy cần thiết chuẩn bị trước khi bắt đầu một dự án. 
Sau khi vận hành dự án một thời gian tùy theo nhu cầu có thể tăng thêm để đáp ứng nhu cầu quản lý của các bên.