![](https://images.viblo.asia/0512f1dd-e06d-4d24-9ed6-d4c7d3a6b320.jpg)


Chào các bạn,

Hôm nay chúng ta sẽ cùng tạo 1 setting/config cho game trên inspector nhé!

Vậy tại sao lại là inspector? và khi nào thì chúng ta nên tạo mấy cái kiểu thế này?

Câu trả lời đó là khi chúng ta cần 1 cái gì đó để thao tác trong editor, trực quan nhất, không cần sửa code để cập nhật dữ liệu.... Và hẳn các bạn cũng từng làm việc với những value trên inspector rồi, ví dụ khi ta khai báo 1 biến dạng publish, chúng ta sẽ thấy nó hiển thị trên inspector và có thể edit được nó khi đang play.

Nếu chỉ cần khai báo publish là được thì sao phải có bài này? đó là vì publish là không đủ cho nhiều nhu cầu, ví dụ chúng ta muốn hiển thị 1 nút ấn trên inspector thì publish sẽ không làm được.

Ok, vậy vào việc nhé!

Mục tiêu của ta sẽ là tạo ra 1 dropdown, một vài trường dữ liệu, và 1 nút ấn.

Bước 1: Tạo class.
- Chúng ta cần 2 class, 1 cái là định nghĩa các phương thức và thuật toán, 1 class để hiển thị lên inspector, các bạn đặt tên thêm hậu tố Editor và implements từ Class Editor.
- Ví dụ mình đặt tên 2 class là Settings và SettingsEditor.

Bước 2: Khai báo biến và phương thức.
- Chúng ta tạo ra 1 biến dạng enum để làm dropdown, 1 biến dạng  float có RangeAttribute, 1 biến bool làm checkbox, và 1 biến GameObject.
- Phương thức chúng ta tạo 1 phương thức DisplayValue để show những value chúng ta vừa sửa trên Inspector.

![](https://images.viblo.asia/1f45b70f-f4d3-4061-9ecd-ee6d9645d8dd.png)

Bước 3: Định nghĩa SettingsEditor.
- Khai báo lại các biến với thuộc tính là SerializedProperty.
- Trong phương thức OnEnable chúng ta sẽ tìm các property của các biến và gán cho những biến vừa tạo.
- Tiếp theo chúng ta override phương thức OnInspectorGUI để hiển thị tất cả những biến và nút ở trên.

![](https://images.viblo.asia/8cdeab35-d75b-4dec-ba32-76c6f72c126a.png)

Bước 4: Test.
- Các bạn bật Editor Unity lên, tạo 1 GameObject bất kì, sau đó kéo Script Settings vào.
- Tiếp theo các bạn modify các giá trị, cũng như kéo 1 prefab boss vào.
- Cuối cùng các bạn ấn vào button Display Value để xem log trên Console có đúng value các bạn vừa sửa không nhé.

![](https://images.viblo.asia/1aacc077-696d-4582-9f53-59fff2d63d5e.png)


![](https://images.viblo.asia/7d7078e4-43cd-46bf-aecd-a164b6ed8c4b.png)

Như vậy là chúng ta vừa tạo ra 1 setting có thể sửa trực tiếp trên inspector và nếu muốn các bạn có thể sửa nút Display Value thành Save Settings để lưu những thông số cài đặt đó xuống mà không phải play/run game mới có thể cập nhật được!

Chúc các bạn thành công nhé! ;)

P/s: mình thường sử dụng phương pháp này để làm level cho game rất hiệu quả, chúng ta sẽ lưu file xuống dạng json hoặc đẩy trực tiếp lên server mà không cần dùng tool ngoài tạo level ;)