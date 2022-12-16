*Xem link bài viết gốc tại: https://viblo.asia/p/bpm-tutorial-quy-trinh-xin-nghi-phep-phan-3-create-the-user-interface-aWj53WYQ56m*
# Phần III: Create the user interface
Trong phần này, bạn sẽ tạo user interface (UI) mà nhân viên và quản lý sẽ dùng để tương tác với process.
User interface là tập hợp của các *coach* và *human service*, human service là một implementation (xin lỗi chỗ này mình không tìm được từ tiếng Việt nào hợp lý...) của activity mà người dùng dùng để tương tác với hệ thống.
### Mục đích bài học:
- Tạo được các coach view
- Tạo được các human service
- Tạo được luồng trong cách human service từ coach này đến coach kia
## 1. Chuẩn bị thiết kế interface
Trong phần này, ta sẽ dựa vào yêu cầu của process để xác định các thành phần cần có trong user interface. Tôi phác thảo ra một cái màn hình (screen) đơn giản cho tác vụ tạo đơn xin nghỉ phép như sau: 
![](https://images.viblo.asia/7e580306-9362-4ae6-8036-fa161a71d801.png)

còn đây là màn hình cho tác vụ phê duyệt:
![](https://images.viblo.asia/9aede942-046f-48b2-807a-cf05eec557ec.png)
## 2. Tạo Coach view
Ta có một số định nghĩa sau:


| Khái niệm | Mô tả |
| -------- | -------- |
| Coach view     | Là một phần giao diện, mà người dùng sẽ tương tác với BO (Business object) hoặc service.  Coach view có thể chứa các coach view khác   |
| Control     | Là một coach view đơn giản nhất. Nó bao gồm những cấu thành cơ bản của interface như các Button hoặc Text field     |
**Cách thức tiến hành:**
1. Trong library, click vào dấu cộng cạnh mục **User Interface** và chọn **View**.
![](https://images.viblo.asia/101277e1-4248-4516-a0f2-ed7a83e3d3c1.png)

2. Điền *Đơn xin nghỉ phép* và click **Finish**. Bây giờ bạn đã có thể chỉnh sửa Coach View bạn vừa tạo.
3. Bind (từ này mình không dịch sang tiếng Việt vì dịch xong nghe không chuẩn nữa) coach view vừa tạo với Business object **AbsenceRequest** bằng cách tạo biến kiểu **AbsenceRequest** và lấy luôn tên là *absenceRequest* :
- Click chọn **Variables** tab.
- Click vào dấu cộng cạnh **Business Data**.
- Điền *absenceRequest* vào tên.
- Mục Variable Type, click và tìm chọn **AbsenceRequest** Business object.
4. Click vào **Layout** tab, ấn vào dấu cộng sau đó tìm chọn tên **Panel**
![](https://images.viblo.asia/77786943-bbc4-4679-846f-e9ee36e25005.png)
Điền label Panel là **Đơn xin nghỉ phép**.
5. Trong mục **Configuration/Appearance**, set **Color style** là *Primary*. Lúc này ta sẽ có hình như sau:

![](https://images.viblo.asia/754261ba-4fc5-4ea5-8fdb-a1ca8c6be1ab.PNG)

> Mẹo: Nếu bạn click chọn panel, sẽ hiển thị ra ba nút nhỏ dưới panel như hình bên trên, nút đầu tiên là **Change Label**, nút thứ hai là **Select Color** và nút cuối cùng là **Select Icon**. Giúp ta có thể nhanh chóng thay đổi Label của Panel, Chọn màu cho Panel và chọn icon cho Panel.
6. Ở trong Panel, Mục (+) Add content here, click tìm và chọn *Horizontal Layout*, đây là một control để sắp xếp bố cục thành phần theo chiều ngang, trong *Horizontal Layout* ta click chọn và thêm một control tên là *Vertical Layout* để sắp xếp bố cục theo chiều dọc.
7. Click vào dấu cộng ở cạnh bên phải của *Vertical Layout* thứ nhất, tiếp tục tạo ra một *Vertical Layout* thứ hai
![](https://images.viblo.asia/074f4287-f557-4541-995e-4227daea9940.PNG)
8. Ta sẽ thêm các control input sau đây trong hai Vertical Layout vừa tạo (theo chiều từ trên xuống):

   **Vertical Layout bên trái:**
 - Text
 - Single Select
 - Text
   
   **Vertical Layout bên phải:**
 - Single Select
 - Text Area
 - Horizontal Layout (Bởi vì ta muốn bố trí việc chọn ngày theo chiều ngang), trong horizontal chọn thêm hai control Date Time Picker
9. Đổi tên các control để tạo thành một màn hình như sau:
![](https://images.viblo.asia/5ca87728-c1ff-422e-9e20-1562df10483c.PNG)
10. Chỉnh sửa thuộc tính của control **Họ và tên**
- Click vào phần **Select** mục binding. Trong list, expand biến *absenceRequest* sau đó chọn *fullName*.
![](https://images.viblo.asia/e4e4ebec-e11e-4255-b89a-648f059414ed.PNG)

- Click **Configuration** properties, mục **Behavior**, bên cạnh dòng **Placeholder text**, điền: Nhập họ tên.
- Click **Visibility** properties, mục **Visibility** chọn *Required*- người dùng sẽ bắt buộc phải nhập trường này, trên control sẽ hiển thị dấu *
![](https://images.viblo.asia/943c99c2-f160-4963-802f-375961bc3fbb.PNG)

11. Chỉnh sửa thuộc tính của  control **Phòng ban**
- Click vào phần **Select** mục binding. Trong list, expand biến *absenceRequest* sau đó chọn *department*.
- Click **Configuration** properties, mục **Item**, Item lookup mode: chọn *Items From Service* - Tạo một service chứa list các phòng ban.
- Để tạo List items Service, click **New** để tạo service mới chứu các phòng ban.
- Trong hộp thoại mở ra, bạn điền tên  *get all department* sau đó click **Finish**. Màn hình service flow mở ra.
- Kéo từ palette ra một **Script Task**, nối **Start** đến **Script Task** rồi đến **End**.
![](https://images.viblo.asia/9fe7cde9-6787-4770-ad8d-6f1e4a1b91d9.PNG)

- Click vào **Script Task**. Trong mục **Script** properties, điền code sau:
``` 
tw.local.results = new tw.object.listOf.String();
tw.local.results[0] = "Phòng kinh doanh";
tw.local.results[1] = "Phòng kĩ thuật";
tw.local.results[2] = "Phòng nhân lực";
```
- Chuyển sang tab Overview. Mục **Ajax Access** chọn *Allow calls from all users* - Nhằm cấp quyền sử dụng service này cho mọi người
![](https://images.viblo.asia/2e581eb2-ad80-4130-9eaa-8d84041c1b1d.PNG)

- Click **Visibility** properties, mục **Visibility** chọn *Required* 
12. Cài đặt các thuộc tính cho control **Mã nhân viên**:

| Property | Value |
| -------- | -------- |
| General > Binding  |  *absenceRequest.empNumb*     | 
| Configuration > Behavior > Placeholder text  |  Nhập mã nhân viên     | 
| Visibility > Visibility |  Required |
13. Cài đặt các thuộc tính cho control **Chọn loại nghỉ**:

| Property | Value |
| -------- | -------- |
| General > Binding  |  *absenceRequest.absenceType*     | 
| Configuration > Items > Item lookup mode > Items From Service  |  get all absence type     | 
| Service Flow > Service Task > Script  |  tw.local.results = new tw.object.listOf.String();<br> tw.local.results[0] = "Nghỉ trừ phép"; <br>tw.local.results[1] = "Nghỉ không lương";<br> tw.local.results[2] = "Nghỉ dịp đặc biệt";|
| Service Flow > Overview > Ajax Access  |  Allow calls from all users. |
| Visibility > Visibility   |  Required |
13. Cài đặt các thuộc tính cho control **Lý do nghỉ**:

| Property | Value |
| -------- | -------- |
| General > Binding  |   *absenceRequest.reasonAbsence*     | 
| Configuration > Behavior > Placeholder text   |  Nhập lý do    | 
| Visibility > Visibility |  Required   |
14. Cài đặt các thuộc tính cho control **Ngày bắt đầu** và **Ngày kết thúc**:

| Property | Value |
| -------- | -------- |
| General > Binding |   *absenceRequest.startDate*  và  *absenceRequest.endDate*   | 
| Visibility > Visibility  |   Required |
15. Ta tạo thêm một coach view nữa gần giống với coach view trên :
- Vào **Library**,  **User Interface**,  mục **View** ta click vào dấu mũi tên cạnh  **Đơn xin nghỉ phép** rồi chọn Duplicate, hệ thống sẽ tạo ra **Đơn xin nghỉ phép 2**.
- Ấn vào mũi tên cạnh **Đơn xin nghỉ phép 2**, chọn Rename.
- Điền **Đơn xin nghỉ phép review** rồi ấn Finish.
16. Mở coach view**Đơn xin nghỉ phép review** lên thay đổi thuộc tính của tất cả các control, mục **Visibility** thành Read only
17. Lưu lại
## 3. Tạo user interface 
Trong phần này, bạn sẽ tạo Client-side human service (CSHS) mà chứa đựng user interface mà bạn đã tạo ở phần trước. CSHS là một service flow cung cấp các user interface để quản lý process và các tác vụ trên ứng dụng web, nó chạy trên trình duyệt web và có thể gọi tới server để lấy dữ liệu.
**Cách thức tiến hành:**
### Tạo CSHS activity **Tạo đơn xin nghỉ phép**
1. Tạo human service cho activity **Tạo đơn xin nghỉ phép**:
- Mở lại Process **Absence Management**, tab **Definition**.
- Chọn activity **Tạo đơn xin nghỉ phép** mục **Properties** chọn tab **Implementation**.
- Tạo CSHS bằng cách click vào **New** ở cạnh mục Implementation.  
![](https://images.viblo.asia/d1f47973-4687-416e-9c74-6f5c350b10f6.PNG)
CSHS bạn tạo lúc này sẽ thay thế cho Default UI Human Service .
- Nhập *Tạo đơn xin nghỉ phép*  và click **Finish**. Human service *Tạo đơn xin nghỉ phép* được mở ra. Mục **Variables**, các biến private của process được tự động add vào trong input và output của human service.
2. Tạo Coach cho CSHS (Coach là user interface trong human service)
- Chọn tab **Diagram**.
- Ta thấy luồng hiện tại có Start nối tới Coach nối tới End, click vào coach và đổi tên thành **Màn hình khởi tạo**.
- Click đúp vào **Màn hình khởi tạo** hoặc tab Coach: Màn hình khởi tạo để vào mục chỉnh sửa Coach
![](https://images.viblo.asia/347f0992-d217-41d7-8ba7-4387eb075880.PNG)

- Xóa hết tất cả các control được tạo tự động đi
3. Tạo phần biểu mẫu cho coach:
- Click vào dấu cộng, thêm **Panel** vào trong coach, đặt tên *Tạo đơn xin nghỉ phép*
- Click vào dấu cộng bên trong **Panel**, thêm coachview **Đơn xin nghỉ phép** 
![](https://images.viblo.asia/71c36d04-e33c-4db2-ad56-44a2bea09764.PNG)

- Mục binding chọn bind với biến *absenceRequest*  trong input (bind biến cha với coachview lớn thì các param con tương ứng sẽ được bind tự động vào các control trong coachview đó).
4. Tạo phần điều khiển cho coach:
- Nhấn vào dấu cộng dưới cùng để thêm một **Horizontal Layout**
- Nhấn vào dấu cộng trong Horizontal layout vừa tạo thêm vào 3 control **Button**, đặt tên như hình:

![](https://images.viblo.asia/313e4b47-d7f9-4ba3-9e09-262caebcf6ef.PNG)

- Điều chỉnh thuộc tính cho Button **Lưu hồ sơ**: Mục **Properties** chọn tab **Configuration/Appearance**, cài đặt như sau:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Info     |
| Shape style     | Flat     |
| Icon     | save     |
| Width     | 200px     |

tương tự với Button **Hủy hồ sơ**:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Danger     |
| Shape style     | Flat     |
| Icon     | trash     |
| Width     | 200px     |

và Button  **Chuyển phê duyệt**:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Success     |
| Shape style     | Flat     |
| Icon     | arrow-right     |
| Width     | 250px     |

- Ta muốn có khoảng cách giữa nút **Lưu hồ sơ** và nút **Hủy hồ sơ** như thiết kế, vậy click vào dấu cộng bên phải **Lưu hồ sơ** và thêm một control tên là **Spacer**
5. Ta tạo thêm hai coach nữa, dùng để xác nhận khi hủy và để xem lại trước khi chuyển phê duyệt:
- Trong tab **Diagram** của CSHS, nhấp chọn và copy paste hai coach tương tự như coach **Màn hình khởi tạo**, đổi tên là một cái là **Xác nhận hủy**, một cái là **Xác nhận chuyển phê duyệt**
- Xóa đường **OK** giữa **Màn hình khởi tạo** và **End**
- Nối từ **Màn hình khởi tạo** sang **Xác nhận hủy** click vào đường nối. Mục **Properties/ Behavior**, phần End state binding, nhấp Select, màn hình mở lên, chọn nút **Hủy hồ sơ**, click **Finish**.
- Nối từ **Màn hình khởi tạo** sang **Xác nhận chuyển phê duyệt**. Tương tự bind đường nối với nút **Chuyển phê duyệt**
6. Chỉnh sửa coach **Xác nhận hủy**:
- Click đúp vào coach **Xác nhận hủy**, đổi label panel ngoài cùng từ *Tạo đơn xin nghỉ phép* thành *Xác nhận hủy*, 
- Click chọn coachview **Đơn xin nghỉ phép**, trong **Properties/ General** đổi View thành **Đơn xin nghỉ phép review**.
- Đổi tên button **Hủy hồ sơ** thành **Xác nhận hủy**, đổi tên **Chuyển phê duyệt** thành **Quay lại chỉnh sửa** và đổi thuộc tính icon của **Quay lại chỉnh sửa** thành undo. Xóa nút **Lưu hồ sơ**.
![](https://images.viblo.asia/924a6e3e-9d4f-402b-a936-8c87917c73b8.PNG)
- Quay trở lại Diagram, nối **Xác nhận hủy** với **End**, bind với Xác nhận hủy, nối thêm một đường từ **Xác nhận hủy** tới **Màn hình khởi tạo** và bind với Quay lại chỉnh sửa.
7. Chỉnh sửa coach **Xác nhận chuyển phê duyệt**:
- Click đúp vào coach **Xác nhận chuyển phê duyệt**, đổi label panel ngoài cùng từ *Tạo đơn xin nghỉ phép* thành *Xác nhận chuyển phê duyệt*.
- Click chọn coachview **Đơn xin nghỉ phép**,  trong **Properties/ General** đổi View thành **Đơn xin nghỉ phép review**.
- Đổi tên button **Hủy hồ sơ** thành **Quay lại** và đổi thuộc tính icon của **Quay lại** thành arrow-left. Xóa nút **Lưu hồ sơ**.
![](https://images.viblo.asia/fa92ed45-1cd5-4bad-b4ec-e3dc990e5df9.PNG)
- Quay trở lại Diagram, nối **Xác nhận chuyển phê duyệt** với **End**, bind với Chuyển phê duyệt, nối thêm một đường từ **Xác nhận chuyển phê duyệt** tới **Màn hình khởi tạo** và bind với Quay lại.
8. Lưu ý rằng ngoài process ta có điều kiện nếu như biến reasonAdsence bằng "cancel" thì luồng quy trình sẽ đến End, vì vậy trong nhánh **Xác nhận hủy** ta sẽ làm thêm thao tác sau:
- Kéo từ palette vào một **Client-Side Script** đổi tên thành *Assign absence reason*
- Trong mục **Properties/Script** ta viết `tw.local.absenceRequest.reasonAbsence = 'cancel';`
- Nối đường xác nhận hủy vào Script này trước khi nối từ Script này về **End**
![](https://images.viblo.asia/6dbe5a8b-9123-446a-9108-f45fee0258c6.PNG)
- Lưu lại.
9. Test CSHS: Ta có thể test hoạt động của CSHS ngay lập tức bằng cách sau:
- Trong CSHS, chuyển tab **Variables**.
- Click vào biến absenseRequest trong input, phần Default Value, tick vào Has default.
![](https://images.viblo.asia/8d8e2db3-a885-4b13-bdf8-93cc49797a0a.PNG)
- Nhấn nút **Run**  góc trên bên phải màn hình ![](https://images.viblo.asia/656b0277-5f04-4c60-9f91-e862c4bf2c89.PNG)

- Màn hình CHSH hiện lên, ở đây bạn có thể thao tác/ test màn hình mà mình đang thực hiện phát triển.
### Tạo CSHS activity **Phê duyệt đơn nghỉ phép**
1. Tạo human service cho activity **Phê duyệt đơn nghỉ phép**:
- Mở lại Process **Absence Management**, tab **Definition**.
- Chọn activity **Phê duyệt đơn nghỉ phép** mục **Properties** chọn tab **Implementation**.
- Click vào **New** ở cạnh mục Implementation.  
- Nhập *Phê duyệt đơn nghỉ phép*  và click **Finish**. Human service *Phê duyệt đơn nghỉ phép* được mở ra. Mục **Variables**, các biến private của process được tự động add vào trong input và output của human service.
2. Tạo Coach cho CSHS (Coach là user interface trong human service)
- Chọn tab **Diagram**.
- Ta thấy luồng hiện tại có Start nối tới Coach nối tới End, click vào coach và đổi tên thành **Màn hình phê duyệt**.
- Click đúp vào **Màn hình phê duyệt** hoặc tab Coach: Màn hình phê duyệt để vào mục chỉnh sửa Coach
- Xóa hết tất cả các control được tạo tự động đi
3. Chỉnh sửa coach **Màn hình phê duyệt**:
- Click vào dấu cộng, thêm **Panel** vào trong coach, đặt tên *Phê duyệt đơn nghỉ phép*
- Click vào dấu cộng bên trong **Panel**, thêm coachview **Đơn xin nghỉ phép review**
![](https://images.viblo.asia/ac288ed9-f31c-44fe-9ab8-8720a2d0aa54.PNG)

- Mục binding chọn bind với biến *absenceRequest*  trong input (bind biến cha với coachview lớn thì các param con tương ứng sẽ được bind tự động vào các control trong coachview đó).
- Nhấn vào dấu cộng dưới cùng để thêm một **Horizontal Layout**
- Nhấn vào dấu cộng trong Horizontal layout vừa tạo thêm vào 1 control **Spacer** và 3 control **Button**, đặt tên như hình:
![](https://images.viblo.asia/d7904351-ec6e-4b55-bb76-3e7124230135.PNG)
- Điều chỉnh thuộc tính cho Button **Yêu cầu điều chỉnh**: Mục **Properties** chọn tab **Configuration/Appearance**, cài đặt như sau:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Info     |
| Shape style     | Flat     |
| Icon     | undo     |
| Width     | 220px     |

tương tự với Button **Từ chối**:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Danger     |
| Shape style     | Flat     |
| Icon     | close     |
| Width     | 180px     |

và Button  **Phê duyệt**:

| Tên thuộc tính | Giá trị |
| -------- | -------- |
| Color style     | Success     |
| Shape style     | Flat     |
| Icon     | check     |
| Width     | 200px     |

4. Thêm pop up xác nhận:
- Thêm vào trong Coach **Phê duyệt đơn nghỉ phép**, dưới cùng, một control tên là **Modal Section**, trong mục **Properties/Configuration**, phần **Appearance** dòng Modal placeholder width: điền 40%.
- Trong **Modal Section** đổi Label thành **Xác nhận Phê duyệt**, đổi Control ID thành *ModalConfirm*,
- Thêm một control **Panel**.
- Trong Panel **Thông báo**, thêm một control **Output text**, đổi label thành **Bạn có chắc chắn muốn thực hiện phê duyệt ?**
- Dưới **Output text** trên, thêm một **Horizontal layout**, trong mục **Properties/Configuration**, phần **Appearance** dòng Layout flow: chọn *Horizontal tight*.
- Trong  **Horizontal layout**, thêm hai **Button** Đồng  ý và quay lại, đổi màu như hình, :
![](https://images.viblo.asia/9822f2ce-83a9-4061-8bcf-c3f089e76c41.PNG)
- Click chọn lại **Modal Section** ModalConfirm, mục Visibility chọn *Hidden* (lưu ý control Modal Section là một kiểu pop up mặc luôn nổi trên chính giữa màn hình nên việc ta thêm nó vào dưới cùng trong lúc thiết kế là không quan trọng)
- Copy thêm 2 cái pop up nữa cho option **Yêu cầu điều chỉnh** và **Từ chối**.

Modal section *ModalReject*
| Thuộc tính | Giá trị |
| -------- | -------- |
| Modal Label     | Xác nhận Từ chối  | 
| Modal Control ID    | ModalReject     | 
| Output text label     | Bạn có chắc chắn muốn từ chối phê duyệt ?     | 

Modal section *ModalEdit*
| Thuộc tính | Giá trị |
| -------- | -------- |
| Modal Label     | Xác nhận Yêu cầu chỉnh sửa  | 
| Modal Control ID    | ModalEdit     | 
| Output text label     | Bạn có chắc chắn muốn yêu cầu chỉnh sửa ?     | 

![](https://images.viblo.asia/7a086d69-892b-4651-b73c-e7996596ff01.PNG)
5. Hiển thị pop up và dẫn luồng:
- Trong coach **Phê duyệt đơn nghỉ phép**, click vào button **Phê duyệt** 
- Mục **Properties** phần **Event/onClick**  nhập `${ModalConfirm}.show();`
- Tương tự với Button **Từ chối** nhập `${ModalReject}.show();`
-  **Yêu cầu điều chỉnh**  nhập  `${ModalEdit}.show();`
-  Nút **Quay lại** của 3 pop up, bạn điền Event onClick lần lượt là *${ModalConfirm}.hide();  ${ModalReject}.hide();  ${ModalEdit}.hide();*, khi người dùng ấn nút này pop up sẽ đóng đi.
-  Chuyển sang tab **Diagram** thêm vào trong luồng 3 **Client-Side Script** đặt tên là *Phê duyệt script*, *Từ chối script*, *Điều chỉnh script*.
-  Xóa luồng nối từ Coach đến End và nối từ coach đến 3 script này rồi nối đến end. 
- Click vào luồng nối đến **Phê duyệt script** Mục Behavior / End state binding chọn vào Button Đồng ý của popup thứ nhất, tương tự với **Từ chối script** thứ hai và **Điều chỉnh script** thứ 3.
![](https://images.viblo.asia/20a0631a-ef72-408c-b60c-4e14c10c2c44.PNG)
- Trong **Phê duyệt script**, mục Script bạn viết: `tw.local.managerDecision = "accept";`
- Trong **Từ chối script**, mục Script bạn viết: `tw.local.managerDecision = "reject";`
- Trong **Điều chỉnh script**, mục Script bạn viết: `tw.local.managerDecision = "edit";`

(Mục đích của script này là để truyền giá trị cho biến managerDecision ra ngoài process, khi ấy thì Gateway **Phê duyệt?** ngoài process sẽ nhận đúng giá trị và đi đúng luồng)
Bạn có thể run test luôn CSHS **Phê duyệt đơn nghỉ phép** để xem luồng chạy được chưa.

## 4. Tạo SnapShot thứ hai
Như vậy là chúng ta đã dựng được bộ khung chính về luồng sử dụng và giao diện cho Quy trình xin nghỉ phép, trước khi đến với các phần develop sâu hơn như validation, service implementation, migrate and deploy thì chúng ta sẽ thực hiện chạy thử những gì ta đã làm được, trên mức độ giao diện và luồng. Ta sẽ thực hiện các test happy case sau đây:
- Nhân viên thực hiện khởi tạo đơn xin nghỉ phép, sau đó chuyển lên cho phê duyệt
- Quản lý nhận được đơn nghỉ phép, thực hiện phê duyệt/ hủy đơn.

**Cách thức tiến hành**
1. Mở Process **Absence Management**, tab **Definition**
2. Để chạy một instance của process, click biểu tượng Run trên góc màn hình: 
![](https://images.viblo.asia/a3865b2a-6676-41da-b41a-b89e9cf9481d.PNG)
3. Phần điều khiển được chuyển từ Designer sang Inspector, giao diện hiện lên như sau:
![](https://images.viblo.asia/701e0062-c9b1-4aec-994e-db1383b3b46f.PNG)
- 1: Khu vực chứa các thông tin của Instance, Inspector info
- a: Locations: Thể hiện vị trí của thao tác/ tiến trình hiện tại đang ở đâu
- b: Tasks: Hiển thị tác vụ hiện tại mà human hoặc system đang thực hiện
- c: Details: Tất cả các thông tin cơ bản của Instance như trạng thái, ngày khởi tạo, thời gian hết hạn,...
4. Trong mục Location, nhấn vào nút **Start** Tạo đơn xin nghỉ phép
![](https://images.viblo.asia/143bf36e-80b1-4424-9237-bfdc49b55084.PNG)
5. Màn hình Tạo đơn xin nghỉ phép được bật lên, bạn tiến hành điền thông tin vào như người dùng bình thường
![](https://images.viblo.asia/d4f37f72-669d-45b7-b886-a86044216eb8.PNG)
sau đó nhấn chuyển phê duyệt -> chuyển phê duyệt (màn hình xác nhận)
6. Màn hình thông báo **The service has finished.** tức là bạn đã hoàn thành xong task đó, tắt màn hình đó đi và trở lại **Inspector**, lúc này bạn nhìn thấy:
- Location đã được chỏ vào bước phê duyệt ở Diagram và hiển thị trên Inspector
- Task **Tạo đơn xin nghỉ phép** đã xong và có dấu **✓** và task **Phê duyệt đơn nghỉ phép** được tạo ra
- Ngoài ra Location và mục Timers còn hiển thị thêm một Timer event tên là **Quá hạn phê duyệt** đang trong trạng thái chờ đợi thời gian tới để trigger.
7. Nhấn nút start **Phê duyệt đơn nghỉ phép** trong mục Location, màn hình Phê duyệt đơn nghỉ phép hiện ra, lúc này bạn sẽ test 3 khả năng nếu nhấn yêu cầu điều chỉnh sẽ thấy task Tạo đơn xin nghỉ phép được mở ra lần nữa, nhấn từ chối và phê duyệt thì chương trình sẽ đều kết thúc.
8. Tạo snapshot 0.2, nhấn **Finish**.