![](https://images.viblo.asia/b0785b14-79e1-4c2e-9600-0b18cfb41c17.jpg)


Chào các bạn, đến hẹn lại gặp nhau ^_^

Hôm nay mình sẽ hướng dẫn các bạn tạo ra thanh điều chỉnh âm lượng, các bạn có thể đặt nó trong setting, và người dùng có thể chỉnh âm lượng to nhỏ tùy theo nhu cầu! ;)

Bước 1: Tạo thanh slide.

- Các bạn chuột phải trong cửa sổ Hierarchy -> chọn  UI -> Chọn slider.

![](https://images.viblo.asia/6f400588-e8f7-41e2-bd07-9cbf1cb0c250.png)


Bước 2: Thêm âm thanh.

- Tại object Camera, các bạn add thêm component Audio Source.

![](https://images.viblo.asia/4d600696-8f8d-4b6c-9863-a93eb6402096.png)


- Tại component Audio Souce các bạn ấn vào AudioClip -> chọn 1 file âm thanh các bạn đã chuẩn bị sẵn.
- Ấn nút play trong Unity để kiểm tra xem âm thanh đã chạy hay chưa.

![](https://images.viblo.asia/97f35d9c-41ac-447d-a2db-4f6fc188c553.png)


Bước 3: Điều chỉnh âm lượng theo thanh slider.

- Chọn thanh slider trong cửa sổ Hierarchy, tại component Slider các bạn sẽ thấy có phần On Value Changed (Single).
- Các bạn ấn vào dấu + sau đó kéo Main Camera vào vị trí None (Object) của On Value Changed (Single).

![](https://images.viblo.asia/4cf4e106-d126-457c-8df6-c4a38e20820f.png)

![](https://images.viblo.asia/4fb22dd1-9e77-483b-bd97-8faeb8c26464.png)


- Trong On Value Changed (Single) các bạn thấy dropbox "No Function", các bạn ấn vào đó rồi chọn AudioSource -> volume.

![](https://images.viblo.asia/1fe6e709-fb2b-437b-82aa-43af84e8e240.png)


- Ấn nút play trong Unity, khi âm thanh vang lên, hãy thử kéo thanh Slider trên màn hình để thấy âm thanh thay đổi theo Slider của bạn!

Bước 4: Áp dụng cho toàn bộ âm thanh game.

- Bài toán đặt ra là, nếu chúng ta có nhiều hơn 1 âm thanh chạy cùng 1 thời điểm thì sao? việc này sẽ yêu cầu chúng ta phải chuẩn bị trước rất nhiều, và nó không linh hoạt nếu số lượng âm thanh được tạo ra tại một thời điểm là không xác định.
- Chúng ta có 2 cách, 1 là chỉnh volume của thiết bị (điện thoại), và cách 2 là sẽ chỉnh âm lượng cho các file âm thanh trước khi được play. Chúng ta sẽ dùng cách 2 nhé, cách 1 nghe hơi tiệu cực nhỉ ^_^
- Để áp dụng setting cho toàn bộ âm thanh trong game trước hết ta cần 1 script để quản lý những âm thanh đó.
- Các bạn tạo 1 scirpt có tên là SoundManager với nội dung như sau:

![](https://images.viblo.asia/df3a80a3-45eb-43bd-8027-cd3cc4932523.png)


- Add script này vào Main Camera.
- Các bạn chọn lại Slider, tại On Value Changed (Single) các bạn lại chọn vào dropbox Function lúc trước, sau đó chọn SoundManager -> ChangeVolume.
- Hãy thử add thêm 1 component AudioSource vào Main Camera, sau đó chọn 1 AudiClip cho nó, rồi ấn play và thử kéo thanh Slider coi sao ;)
- Giờ thì các bạn có thể thoải mái tạo thêm bao nhiêu cái AudioSource trong đối tượng Main Camera bằng Script hoặc tạo bằng tay trong Editor, nhưng khi kéo thanh Slider kia nó đều sẽ thay đổi âm lượng theo ý các bạn! ;)

Chúc các bạn thành công nhé ^_^