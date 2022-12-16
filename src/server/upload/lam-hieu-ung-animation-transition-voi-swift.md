# Mở đầu
{@embed: https://vimeo.com/508701375}
Xin chào các bạn hôm này mình sẽ giới thiệu cho các bạn một cách đơn giản để có thể tạo ra hiệu ứng chuyển động trong Swift.
Để bắt đầu vào demo thì các bạn hãy tải những ảnh mình sử dụng ở đây.
[](https://drive.google.com/drive/folders/1v_uPVao39Euy2NW9R5Afw0451FISXEpF?usp=sharing)

#  Bắt đầu nào
Bây giờ ta sẽ bắt đầu viết các hàm cần thiết vào trong view controller của ta .
## Storyboard

Ở đây ta sẽ thêm vào storyboard các background và thêm vào đó hai UIImageView để hiển thị hình ảnh của mèo máy Doraemon.
Ban đầu ta sẽ tạo ra một cái UIImageView chỉnh contraint cho nó thành 0 hết để tạo ra được một cái ảnh background toàn màn hình điện thoại của ta.
![](https://images.viblo.asia/b55b75f0-2ba6-4c35-8545-40b557b68024.png)

Tiếp tục ta sẽ tạo thêm một cái UIImageView để hiển thị hình ảnh Doraemon và ta tiếp tục set các contraint cho nó để cho ảnh của ta sẽ nằm ở phía bên trái của màn hình.
![](https://images.viblo.asia/a5fe49f0-307e-4986-8125-81767ecd80b8.png)

Tiếp tục ta sẽ tạo thêm một cái UIImageView để hiển thị hình ảnh Doraemon và ta tiếp tục set các contraint cho nó để cho ảnh của ta sẽ nằm ở phía bên phải của màn hình.
![](https://images.viblo.asia/88f1d9a3-a5f2-4349-851b-b989f7bfae6f.png)

Cuối cùng ta sẽ được một cái Storyboard như này.
![](https://images.viblo.asia/efe0e916-8369-4339-9f4b-0349bad4c6ff.png)

## Tạo ra các giá trị cần thiết
![](https://images.viblo.asia/6c0ec2b3-0007-4db5-a8e2-a5d019c3d4c9.png)

Tạo ra hai biến Outlet để liên kết đến hai cái hình doraemon ở bên storyboard của ta.
![](https://images.viblo.asia/e912d85a-013b-483b-993b-60bde14ec765.png)

Ở đây ta sẽ tạo ra các biến để lấy ra kích thước hiện tại của màn hình của ta . Lưu kích thước chiều dài và chiều rộng của màn hình vào hai biến để ngoài chổ ViewController để những chổ khác ta có thể truy xuất lấy ra kích thước màn hình.
![](https://images.viblo.asia/219f4647-8bed-4adc-90a6-be16f5e1d215.png)

Ta sẽ gọi hàm này ở trong viewWillAppear vì nếu ta gọi hàm này ở bên trong thằng viewDidLoad thì nó sẽ không lấy ra được chiều dài và chiều rộng thực tế của màn hình hiện tại của ta mà nó chỉ lấy ra được cái kích thước của màn hình ở trong StoryBoard. 
* viewDidLoad được gọi sau khi View Controller đã load cấu trúc cơ bản (hierarchy) vào bộ nhớ từ XIB hay Storyboard
* viewWillAppear được gọi để báo rằng viewController đã sẵn sàng cho việc hiển thị lên màn hình nên lấy ra kích thước màn hình ở đây dì đúng hơn.
## Viết các hàm để chuyển động
Hàm đầu tiên sẽ là hàm để doraemon có thể chuyển động từ phải qua trái. Thì khi đó ta sẽ ẩn đi cái hình doraemon ở bên phải đi. Chỉ để hiển thị hình ở bên trái thôi. Nó sẽ set cái center của hình bên phải này sang góc bên phải lại. 

Sau đó nó sẽ gọi hàm faceBugRight để hiển thị ảnh doraemon bên phải này lại và tiếp tục thay đổi điểm center của ảnh từ độ rộng của màn hình thành 0 để nó về lại bên trái góc màn hình. Sau đó tiếp tục gọi lại hàm moveBugRight. Để cho ảnh doraemon bên phải của ta có thể di chuyển từ phải qua bên trái lại.
Sau đó ẩn đi và quay lại điểm ban đầu của nó. Ta sẽ chỉnh lại position của ảnh thông qua thằng Center của thằng UIView.
* Center : Điểm trung tâm được xác định trong các điểm trong hệ tọa độ của super view của nó. Đặt thuộc tính này sẽ cập nhật nguồn gốc của hình chữ nhật trong thuộc tính frame một cách thích hợp. Sử dụng thuộc tính này, thay vì thuộc tính khung, khi bạn muốn thay đổi vị trí của một dạng xem. Điểm trung tâm luôn hợp lệ, ngay cả khi áp dụng các yếu tố tỷ lệ hoặc xoay cho phép biến đổi của chế độ xem. Các thay đổi đối với thuộc tính này có thể được làm Animation.

Ở những cái chổ chỉnh center ta sẽ để nó vào trong UIView.animate chỉnh duration cho nó lên 5 cho hình ảnh chuyển động chậm một xí.Ở option thì ta sử dụng hai cái option của UIAnimation là curveEaseInOut , allowUserInteraction.
*  curveEaseInOut
Chỉ định một đường cong dễ vào dễ khiến hoạt ảnh bắt đầu chậm, tăng tốc đến giữa thời lượng và sau đó làm chậm lại trước khi hoàn thành.
* allowUserInteraction
Cho phép người dùng tương tác với các chế độ xem khi chúng đang được làm động.

![](https://images.viblo.asia/a2e71a3f-2fec-43f5-a307-76d9ff58f34d.png)
![](https://images.viblo.asia/d48d4825-b230-4478-b3d8-72bdeb8a7723.png)

Tiếp tục ta sẽ viết hàm chuyển động cho cái hình bên trái. Tương tự như ở hai hàm trên thì ban đầu ta cũng sẻ ẩn đi hình ảnh doraemon ở bên trái đi. Sau đó ta sẽ set lại X của hình ảnh bên trái thành 0 để hình ảnh quay trở lại vị trí mặc định của nó quay về góc bên trái màn hình. 

Sau khi set xong thì ở chổ completion của ta gọi tới hàm faceBugLeft. Trong hàm này ta sẽ set lại X của ảnh thành chiều rộng của màn hình để cho ảnh của ta có thể di chuyển từ phần trái qua bên phải. Sau đó ẩn đi và quay lại từ phải qua trái lại. 
![](https://images.viblo.asia/00d5b2ad-5e0b-468e-97aa-d39085dde974.png)

Sau đó ta sẽ gọi những hàm này ta đã viết ở bên trong hàm viewDidLoad. Ban đầu ta sẽ set lại cái center cho hai cái hình để cho cái điểm y nó vào giữa màn hình. Và gọi hai hàm moveBugLeft() và moveBugRight() để animation bắt đầu chạy.
![](https://images.viblo.asia/4d53bb07-9549-452d-8e23-920a8d09c809.png)

Chúc mừng bạn đến đây thì bạn đã tạo ra được một cái demo animation đơn giản rồi đấy.