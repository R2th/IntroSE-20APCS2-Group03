# 1. SPATIAL DISPLAY MODEL

Sau một thời gian tìm hiểu về yêu cầu và đặc điểm để hiển thị AR thì quyết định viết một bài nội dung là làm sáng tỏ quá trình hiển thị thông tin AR thông qua sự tương tác của các phép biến đổi tọa độ khác nhau.

Như ở bài trước, mình đã nêu multiple indirections có thể liên quan đến việc người dùng xem thế giới AR. Trải nghiệm khi xem có thể được trung gian thông qua nguồn cấp dữ liệu như camera và màn hình hiển thị. Trong AR, họ dựa vào một đường ống đồ họa máy tính tiêu chuẩn để sản xuất lớp phủ trên thế giới thực. Do đó khi bạn tương tác với AR sẽ không phụ thuộc vào loại màn hình AR, đường ống này bao gồm model transformation, view transformation và projective transformation.

- **Model transformation**: mô tả mối quan hệ của tọa độ đối tượng 3D và tọa độ thế giới thật 3D,  mô tả cách các đối tượng được định vị trong thế giới thực.
- **View transformation:**  mô tả mối quan hệ của tọa độ thế giới thật dạng 3D và tọa độ chế độ xem 3D (người quan sát hoặc máy ảnh).
- **Projective transformation:** mô tả mối quan hệ của tọa độ xem 3D và tọa độ thiết bị 2D (màn hình).

Mô hình không gian của hầu hết các màn hình AR có thể được định nghĩa là mối quan hệ không gian của tối đa năm thành phần: mắt user, màn hình, máy ảnh, vật thể được tăng cường và thế giới thật. Họ mô tả các phép biến đổi tọa độ quan trọng nhất ở đây, do đó mỗi phép biến đổi có thể được cố định và hiệu chỉnh, theo dõi linh họat hoặc không bị giới hạn.

![](https://images.viblo.asia/e038859c-3455-49f4-90fb-daeee596a863.png)



# 2. VISUAL DISPLAYS

Để hiểu các công nghệ ngày nay, AR được hiển thị chi tiết như nào, ta cần xem xét những vấn đề sau. Cụ thể, ta sẽ phân biệt giữa các loại màn hình 3D sau: stereoscopic approaches, holographic displays, light-field displays, và volumetric displays.

- **Stereoscopic approaches** dựa vào màn hình với các mặt phẳng tiêu cự cố định, nhưng đôi khi lại được kết hợp với các phương pháp hình ảnh khác.

- **Holographic displays** và **light-field displays** là các loại màn hình liên quan chặt chẽ và ranh giới giữa chúng đôi khi bị mờ. Cả hai phương pháp đều liên quan đến việc ghi (hoặc tạo) và phát lại tất cả các đặc tính của sóng ánh sáng đại diện cho một cảnh nhất định.
- Hologram thường sử dụng ánh sáng kết hợp (laser) để tạo và xem. Light-field displays thường hoạt động với ánh sáng không liên tục. Light-field displays có thể có nhiều dạng, bao gồm **volumetric displays**, multi-projector arrays  và near-eye displays  sử dụng microlenses.

Dưới đây là một số màn hình phổ biến hiện nay:

### 1. Near-Eye Displays
![](https://images.viblo.asia/6fc3a6c3-4acd-4bdf-801c-579931e79c3f.png)

### 2. Optical See-Through Head-Mounted Display
Một OST HMD yêu cầu một bộ kết hợp quang học để trộn lẫn ảo và thực, sử dụng bộ tách chùm tia để phản chiếu hình ảnh từ màn hình LCD vào mắt người xem, đồng thời cho phép xem hình ảnh phía trước. Khó khăn đối với màn hình OST AR là làm thế nào để kiểm soát mức độ ánh sáng mà màn hình cho phép từ thế giới bên ngoài. 

![](https://images.viblo.asia/272bf2ac-47a5-477c-8700-0117a908ba69.png)

Các thiết kế hiển thị OST gần đây chẳng hạn như từ Lumus sử dụng quang học tiên tiến hơn. Thiết kế của Lumus là đưa đầu ra từ một máy chiếu thu nhỏ vào một thấu kính đặc biệt, nơi ánh sáng truyền qua sự phản xạ và khúc xạ bên trong.

![](https://images.viblo.asia/10d9305b-78fa-455f-83d4-1aa48f12e959.png)

### 3. Virtual Mirror
Một chiếc gương ảo sử dụng camera phía trước để chụp ảnh người dùng và hiển thị nó được phản chiếu qua trục dọc, để tạo ấn tượng khi nhìn vào gương. Kiểu thiết lập này, tất nhiên, thích hợp nhất cho các ứng dụng cho phép người dùng thử quần áo hoặc trang phục ảo. Nó có thể được thực hiện thuận tiện bằng cách sử dụng các máy tính đã có camera tích hợp. Để đặt các đối tượng chính xác liên quan đến người dùng, cơ thể và đầu người dùng cần phải được theo dõi. Điều này có thể được thực hiện chỉ với một camera hoặc nhiều camera :rofl:

![](https://images.viblo.asia/d49cd352-9332-49e6-95eb-cd8d7f5e22b5.png)

### 4. Virtual Showcase
 Virtual Showcase cũng là một loại gương ảo, nhưng có cấu hình khác, giống với một biến thể đứng yên của OST HMD. Một gương bán trong suốt ngăn cách người quan sát khỏi đối tượng quan sát. Gương kết hợp sự phản chiếu của màn hình được gắn phía trên hoặc bên dưới, để hình ảnh do máy tính tạo ra được phản chiếu về phía người xem. 
 
 ![](https://images.viblo.asia/aac2c527-3424-4c0b-a006-5d7fb1680e73.png)

### 5. Window and Portal Displays
![](https://images.viblo.asia/62b4829e-35d2-4131-b0e8-6fd6e696a9fc.png)

![](https://images.viblo.asia/6482fbc4-0e62-4b88-acb2-c556733641d0.png)
 
### 6. Spatial Augmented Reality
Máy chiếu có thể được sử dụng để tạo AR không gian mà không có bất kỳ màn hình rõ ràng nào. Với phương pháp này, phép chiếu được phản chiếu trực tiếp từ bề mặt của các vật thể thật, làm thay đổi diện mạo của chúng bằng mắt thường. Phép chiếu không thể thay đổi hình dạng của đối tượng, nhưng thêm chi tiết bề mặt, kết cấu, bóng.

![](https://images.viblo.asia/f90a3c71-e718-41f9-b1e0-3e9c3ce95e28.png)
AR không gian có thể được sử dụng để biến các đối tượng  thành các mô hình kết cấu. 

**Welcome to Augmented Reality**