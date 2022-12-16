Chào các bạn, để có một trang web đẹp, UI/UX bắt mắt và thuận với trải nghiệm người dùng chúng ta không thể thiếu sự tỉ mỉ của một designer được. Để thực hiện được ý tưởng đó, các bạn designer sẽ sử dụng nhiều công cụ nổi tiếng như Photoshop, Illustrator (AI), Sketch...

Là một *"kỹ sư mặt tiền"* chúng ta luôn tìm cách để tối ưu thời gian và công sức cho source code của mình, bên cạnh đó thời gian cắt hình từ bản thiết kế tốn không ít công sức. Vì vậy, hôm nay mình sẽ chia sẻ cho bạn sức mạnh của export image asset.

![](https://images.viblo.asia/e733dad0-8c91-4c2e-b8a5-fc5b53a0ed58.png)

## 1. Thao tác với Photoshop
Nói về Photoshop thì đây là một phần mềm không còn xa lạ với mọi người, phần mềm thần thánh này ngoài công dụng *"hóa vịt thiên nga"* còn dùng để design Web, App cũng rất nổi tiếng.

### Image Assets
Thông thường với phương pháp cũ, những dev lão làng hay sử dụng là dùng `slice tool`, `convert smart object`... rồi phải `trim` để bỏ đi những khoảng dư không cần thiết. Cách trên thường thủ công cho mỗi layer.

Còn mình sẽ dùng phương pháp `"Image Assets"` hàng loạt nhiều layer chỉ trong chớp mắt.

Để sử dụng bạn chỉ cần đặt tên cho layer hoặc group layer mà bạn muốn để export thành file PNG hoặc JPG... là được. Layer export sẽ tự động trim những khoảng transparent xung quanh.
*Muốn group các layer lại thành 1 nhanh nhất, các bạn giữ ctrl để chọn nhiều layer, sau đó ấn ctrl + G để group layer.*

Cú pháp:
`Name_layer.type_file` ví dụ `logo.png`

![](https://images.viblo.asia/c9d8facb-ebcb-47d8-9bbf-11de5b99ac8c.png)

Sau khi đã đặt layer mong muốn được export ra bạn thao tác trên thanh menu của Photoshop:

```File > Generate > Image Assets```

Chỉ cần bật chức năng `Image Assets` thì những layer được đặt tên có đuôi `.png||jpg||svg...` sẽ tự động được export ra folder mới cùng vị trí với file PSD

![](https://images.viblo.asia/56b64a00-a03b-41c3-a8b6-6c95cc6acdb0.png)


## 2. Thao tác với Illustrator (AI)
Tương tự như Photoshop, AI cũng có vài tool thần thánh để cắt layer như `slice tool`, nhưng nhìn chung việc thao tác trên AI phức tạp và rườm rà hơn Photoshop. Tuy nhiên, mình vẫn sẽ dùng phương pháp Generate Export hàng loạt các layer cùng 1 lúc.

Chọn những layer hay một group layer sau đó ấn chuột phải để tới sẽ hiện ra context menu, chọn `Collect for export > As Single Asset hoặc As Multipe Assets`

![](https://images.viblo.asia/fa6119ad-156e-4344-8c71-b5fd196daede.png)

Ở bảng menu Asset Export có các tùy chọn scale tỉ lệ khi export, chọn định dạng file... Mặc định khi bạn `As single/multipe assets` thì sẽ có tên Asset theo thứ tự, bạn cũng có thể đặt lại theo tên mong muốn.
*Nếu bạn không thấy nút để hiện thị Asset Export cạnh bảng layer, thì đến `Windows > Asset Export` để bật lên*

![](https://images.viblo.asia/ec1ba923-81fb-4035-a137-9d697701047c.png)

Sau khi đã định nghĩa xong và muốn export thành phẩm, các bạn chỉ cần ấn vào "Export..." bên dưới menu rồi chọn nơi muốn generate file.

## 3. Thao tác với Sketch
Sketch là một phần mềm thiết kế chỉ chạy trên nền tảng MacOS. Đây là một phần mềm đột phá so với rất nhiều phần mềm thiết kế khác ở độ tối giản của nó và nó rất phù hợp với việc thiết kế giao diện cho Mobile app và Website.

Với Sketch, bạn cũng có thể slice bằng cách `chọn layer > Make exportable`, khi đó layer đã được add vào danh sách export, đồng thời mục `Export` được hiện ra, menu này gồm những tùy chọn về định dạng (PNG, JPG...), tỉ lệ size... Nếu bạn muốn tùy chỉnh nâng cao cho layer, thì hãy tìm "con dao", khi đó sẽ có các option cho layer.

Nếu bạn muốn export 1 layer đang select thì chọn "Export Selected".

![](https://images.viblo.asia/84bfc4d2-e6e1-475f-81a0-60d04e5e6b5a.png)

Sau khi bạn đã chọn được những layer và muốn export bạn chỉ cần `Ctrl + Shift + E`, bảng `Export Slices` sẽ hiện ra. Bạn chọn `Export` để generate.

![](https://images.viblo.asia/a06fc6c0-1bd9-4b1c-bbd4-70776f6c64bb.png)

## Tổng kết
Trên đây là một vài tip để giúp những người anh em đồng nghiệp bớt mất thời gian cho việc loay hoay cắt hình. Nếu có những trick hay nào, các bạn cùng chia sẻ ở bên dưới nhé.