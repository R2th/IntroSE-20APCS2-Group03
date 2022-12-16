Xin chào mọi nguời , mình là một coder vô danh kinh nghiệm chưa nhiều lần đầu viết bài nên bố cục , từ ngữ, kiến thức có chỗ chưa được đúng mong mọi người góp ý nhẹ tay ạ.<br>
Lúc mới đi làm cái đầu tiên mình học là Vue Js nên mình khá có thiện cảm với nó. Một thời gian sau do dòng đời đưa đẩy mình có dịp học và chuyển sang làm React Js . Lúc đấy React Js mới tung ra React Hook nên mình học lifecycles rồi mình nhẩy vô Hook học luôn , ban đầu thấy khá là ngợp với nhiều kiến thức mới nhưng dần dần càng mê quả react hook hơn. Lý do vì nó có thể gom lại các logic của 1 chức năng trong component vào và tạo thành 1 custom hook rồi sau đó có thể dùng ở các chức năng quan trọng. Bẵng đi một thời gian thì Vue cho ra mắt feature mới là compositon api trong phiên bản Vue 3 đình đám gần đây. Composition Api này có thể giúp mọi người có thể tạo ra các custom hook i hệt giống trong React Js.
<br>
<br>
![](https://images.viblo.asia/49ed6fbe-56ff-4439-8edb-9bc63fdcba87.jpeg)
 Nguồn: https://v3.vuejs.org/guide/composition-api-introduction.html
<br>

Ý tưởng của việc tạo ra các custom hook có thể dùng lại được dựa trên hàm `setup()`. Giới thiệu sơ qua về hàm `setup()` thì đây là 1 hook lifecycle mới được thêm vào trong Vue 3 (Chúng ta có thể sử dụng trong Vue 3 hoặc cài thư viện vue/composition-api).<br> Sơ lược 1 chút về chức năng của `setup()` :
<br>+ Hàm này sẽ được chạy trước cả hàm `beforeCreate`
<br>+ Mọi Composition Api đều chỉ được chạy trong `setup()` (Các Composition Api gồm: ref, reactive, watchEffect, ...))
<br>+ Hiểu nôm na thì trong hàm  `setup()`  là một thế giới riêng biệt, không liên quan gì đến các hàm khác, và ở cuối cùng hàm `setup()` sẽ return ra các các data reactive ( tương đương với các state trong `data()`) , các function ( các func này tương đương các function được khai báo trong `methods`),..
<br>
![](https://images.viblo.asia/a13e9774-03ed-48ea-8f08-0a29e6faaa4b.png)
<br>
Phân tích ảnh trên 1 chút thì mình sẽ dùng ref, reactive để khởi tạo dữ liệu , sau đó có thể viết thêm watch, hoặc function để làm gì đấy. Khá giống React function component đúng k nào,  ref, reactive thì ứng với useState , watch thì ứng với useEffect, các function được khai báo i hệt ( Các bạn làm React đã thấy quen chưa ạ ). Còn đối với những người chưa làm qua React thì cũng đừng nên hoang mang vì sau đây mình sẽ đưa ra một ví dụ mọi người thường hay gặp phải qua đó sẽ cảm thấy nó dễ dàng để sử dụng hơn
<br>
<br>
### Bài toán đặt ra: Tạo 1 component Dropdown, mỗi khi click vào sẽ xổ ra 1 list các item để click vào
(Ví dụ mình đưa ra có thể có các hướng giải quyết hay hơn nên mong mọi người đóng góp thêm)<br>
=> Hướng đặt vấn đề : Đây là 1 bài toán khá basic chúng ta có thể dùng `position: "absolute"` để có thể cho list bay theo dropdown. Nhưng đấy là hướng giải quyết cho những layout đơn giản, còn đối với một layout phức tạp ắt hẳn mọi người đã gặp trường hợp cái list khi xổ ra bị che khuất hoặc có thể làm vỡ các thẻ xung quanh nó
=> Hướng giải quyết : Tạo ra một list item có thể bay theo vị trí của mouse mỗi khi click vào vào dropdown đấy, và đặt ở cấp layout to nhất nơi mà có thể đè lên được tất cả mọi thứ. Mình có thể dùng chức năng teleport của Vue 3 hoặc thư viện portal-vue để có thể bắn list item từ component Dropdown ra được layout lớp ngoài cùng. <br>
Cách 1: <br>
Với option api bình thường thì thành phần trong component Dropdown sẽ gồm có :
<br>+ 1 biến lưu trạng thái ẩn hiện của dropdown
<br>+ 1 biến lưu list item
<br>+ 1 function để ẩn hiện dropdown
<br>+ 1 function để chọn giá trị trong list item<br>
<br>
![](https://images.viblo.asia/d2dc25fc-f7a8-4093-b56e-421bbba15a09.png)
<br>
<br>
Cách 2: <br>
Còn với Composition Api thì ta sẽ đóng gói lại được chức năng này thành 1 custom hook useLogicDropdown như sau:<br>
![](https://images.viblo.asia/2756ac21-0e3a-4a74-8f1d-c2571ca85c09.png)
<br>
Và được dùng trong component như sau :<br>
![](https://images.viblo.asia/bd1fc3ab-44c8-4acf-8817-23a7f268cf0f.png)
<br>
Từ 2 hình ví dụ trên chúng ta có thể thấy state `yMouse` , `isOpenOption` và function `toggleDropdow()`, `closeDropdown()` sẽ được đóng gói vào trong 1 custom hook nhằm mục đích có thể tái sử dụng lại đoạn logic này ở các trường hợp có chức năng tương tự, khi được return từ hàm `setup()` thì sẽ được sử dụng 1 cách bình thường như cách viết đầu tiên.<br>
<br>
### Tổng kết
Qua ví dụ be bé mong rằng mình đã đưa đến cho các bạn một cái nhìn khái quát về Composition Api  trong Vue 3 cũng như việc tạo 1 custom hook. Nếu bài viết có chỗ nào còn sơ suất mình luôn đón nhận mọi sự góp ý từ các bạn
Link repo github:https://github.com/windddd1/demo-vue3-typescript (trong repo còn có ví dụ sử dụng custom hook để làm dark mode bằng tailwind nữa hihe nếu thấy hay mong mọi người ủng hộ mình 1 star trên github với ạ)