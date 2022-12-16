## 1. Mở đầu
<hr>

Trong bài viết trước kìa của mình từ khá lấu rồi mình đã giới thiệu với các bạn một số extension vô cùng tiện lợi mà mình đã và hiện tại vẫn đang sử dụng trong VSCode cho quá trình làm việc của mình. Ở bài viết phần 2 này, mình sẽ giới thiệu cho các bạn thêm một số extension hay ho khác đang nằm trong danh sách các extension của mình. Nào chúng ta cùng bắt đầu.

## 2. VSCode Extension
<hr>

### a. Liver Server - Ritwick Dey

Như các bạn đã biết với một file dạng HTML ta có thể mở nó ngay bằng trình duyệt để có thể xem được giao diện từ file đó trên trình duyệt thực tế như nào mà không cần thêm công cụ hay setup gì bổ sung cả. Tuy nhiên khi chúng ta có nhu cầu cần chỉnh sửa file HTML này hoặc chỉnh sửa phần CSS trong file đó hoặc được thêm vào từ file `.css` bên ngoài thì ta sẽ phải vào trình duyệt và reload lại trang để có thể xem được nội dung thay đổi đó.

![](https://images.viblo.asia/e482bfe9-5f75-4d04-a46a-f4d690437674.gif)

Đối với các bạn dev front-end đã có kinh nghiệm rồi hoặc ít nhất các bạn đã có một thời gian code rồi thì xử lý việc này quá đơn giản rồi ta có thể setup webpack, vite hoặc một công cụ nào đó để phục vụ cho việc hot reload (tự động reload lại trình duyệt khi có thay đổi) hay nếu bạn code React/ Vue thì việc setup này dương như đã được thực hiện hết rồi, các bạn chỉ cần chạy lệnh `yarn start` hoặc `yarn dev` mà thôi. Tuy nhiên với các bạn mới bắt đầu học code HTML/CSS thì có thể các bạn chưa biết setup hoặc sẽ mất thời gian tìm hiểu để setup. Nhưng với sự hỗ trợ của extension nói trên thì mọi việc trở nên vô cùng đơn giản, bạn chỉ cần vào mục extension và cài đặt nó:

![](https://images.viblo.asia/a884916c-a06d-4e50-8431-d4b6a5588ad6.png)

Sau khi cài đặt thành công thì ở dưới chân của VSCode bạn sẽ thấy xuất hiện biểu tượng như sau:

![](https://images.viblo.asia/1db7d138-e033-46ac-9aaf-1c9f828585a3.png)

Tiếp đến, trong file `.html` mà bạn đang mở bạn bấm chuột phải và chọn `Open with Live Server [Alt L O]` để mở trang HTML của bạn lên:

![](https://images.viblo.asia/01bfb224-dacf-4a2e-b7d7-8079ccd43efb.gif)

Sau đấy bất cứ nội dung gì bạn sửa trong file HTML sẽ được  tự động cập nhật trên trình duyệt, thật tiện lợi đúng không nào.

###  b. Auto Rename Tag - Jun Han

Đây cũng là một extension hỗ trợ cho các bạn code front-end, giống như tên của extension thì đơn giản nó sẽ hỗ trợ bạn thay đổi tên của thẻ HTML mà bạn mong muốn. Đối với nhóm thẻ HTML gồm cả thẻ đóng và thẻ mở như thẻ `<p></p>` thì khi ta có nhu cầu thay đổi nó sang thẻ `<h6></h6>` chẳng hạn, thì thông thườn ta sẽ phải làm điều đó 2 lần như sau:

![](https://images.viblo.asia/f2e6e3de-a63e-47da-93d3-531830bf3743.gif)

Có thể các bạn có thể sửa nó bằng cách bấm tổ hợp phím `Ctrl + D` để bôi chọn phần giống nhau của 2 thẻ sau đó sửa, tuy nhiên mình thích dùng extenstion cho nó tiện lợi 🤣. Tương tự như extension mình đã giới thiệu trước đó ở tên, ta cũng chỉ cần tìm nó trong mục extension của VSCode và bấm cài đặt mà thôi.

![](https://images.viblo.asia/672e9f68-8d14-4ec0-a97d-a5c941bba41f.png)

Và sau đó bạn có thể tận hưởng thành quả của nó luôn bằng các thử lại edit thẻ HTML như trên:

![](https://images.viblo.asia/fe9ef0ee-1e61-4911-a1e7-8c5e786e07d8.gif)

### c. Thunder Client - Ranga Vadhineni

Với bản thân mình thì đây là extension mà mình dùng thay thế cho `Postman` dùng để test các API bên back-end cung cấp. Về tính năng thì nó hỗ trợ mình đủ các nhu cầu cơ bản của mình như tạo các request, lưu thông tin về request đó, tạo các collection cho các request (phục vụ cho việc gom nhóm các API trong cùng 1 project), tạo các env, .... . Sau khi cài exntension thành công, bạn sẽ thấy icon của nó xuất hiện trong thành navigator của VSCode:

![](https://images.viblo.asia/275e053a-76e3-456d-aa10-bcee4dc44f90.png)

Khi bạn click vào logo của extension sẽ mở ra giao diện như sau:

![](https://images.viblo.asia/5998a366-4c2b-4646-908b-ef42f66cfd1d.png)

Ở đây sẽ có các phần là:
- `New Request`: dùng để tạo mới một request
- `Activity`: là danh sách các lần mà bạn tạo request
- `Collections`: là danh sách các request mà bạn đã tạo và lưu trữ lại
- `Env`: là nơi quản lý các biến môi trường của bạn để sử dụng cho các request

Còn dưới đây là giao diện của Thunder Client khi chúng ta tạo request

![](https://images.viblo.asia/779b9bf9-124c-49c5-8555-4e01705abf31.png)


### d. WakaTime - WakaTime

Extension này có chức năng lưu lại thông số, thông tin về quá trình bạn sử dụng VSCode và tạo thành các biểu đồ mà các bạn có thể xem lại được. Đây không phải là extension tham gia trực tiếp vào việc hỗ trợ bạn trong quá trình coding, tuy nhiên mình vẫn thấy nó khá hay vì đôi khi nó cho mình thấy được thời gian mà mình dành ra cho việc dùng VSCode là bao lâu, ngôn ngữ nào dùng nhiều hoặc dự án nào đang code. Trước khi cài đặt extension này thì bạn cần truy cập vào trang web sau https://wakatime.com/vs-code-time-tracking.

![](https://images.viblo.asia/1c052859-ff0b-41b9-a7f7-ae3f45a9bfad.PNG)

Sau đó bạn bấm `Sign Up` để tạo tài khoản mới và sau đó tiền hành Login. Khi đã login thành công thì bạn bấm vào phần avatar của bạn ở góc trên bên phải và chọn Setting:

![](https://images.viblo.asia/fccb3ec2-7dc1-40b9-8a8c-cf31e3466fa2.PNG)

Tiếp đó trong màn này, bạn sẽ thấy có một phần là `Secet API key`, bạn sẽ cần bấm copy lại cái key này lại để sử dụng trong VSCode:

![](https://images.viblo.asia/ea892cbb-dc4c-4106-bd80-8e3fa1e21962.PNG)

Khi bước này đã xong, ta quay trở lại với VSCode và tiến hành cài đặt extension này:

![](https://images.viblo.asia/d5fc9a36-3bcb-4f9f-845c-bf5f42dc23f3.png)

Sau khi cài đặt xong bạn bấm tổ hợp phím `Ctrl + Shift + P` và tìm phần cài đặt API key của WakaTime sau đó click chọn rồi  paste cái secret key mà bạn vừa copy ở trên vào đây là xong:

![](https://images.viblo.asia/fdf80c3b-cec7-4f99-ae4f-6f1bb0013f5d.gif)

Tiếp đến bạn cứ sử dụng VSCode của bạn và WakaTime sẽ tiến hành lưu trữ lại các thông tin của bạn. Sau này bạn có thể truy cập vào trang web của WakaTime mà bạn đã đăng nhập ở trên để xem lại thông số đó:

![](https://images.viblo.asia/a54c7722-1227-4d9c-91bb-135019e07c22.png)

Ở đây, bạn có  thể xem các thông số như thời gian bạn sử dụng VSCode, project/ workspace mà bạn code, ngôn ngữ mà bạn sử dụng cũng như các con số thống kê khác. Đôi khi sau một tuần code chăm chỉ bạn có thể vào đây xem lại sự chăm chỉ của mình để có thêm động lực hoặc chụp ảnh up lên facebook khoe với mọi người 🤣. Một lưu ý cho các bạn đó là với plan free của WakaTime thì bạn sẽ bị giới hạn chỉ xem được lịch sử 2 tuần mà thôi, ngoài ra thì hàng tuần bạn cũng sẽ nhận được thêm email report về các chỉ số của bạn.

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã đón đọc. Mong là các extension mà mình đã giới thiệu ở trên có thể giúp ích phần nào cho các bạn trong công việc. Cuối cùng, nếu bạn thấy bài viết bổ ích thì nhở để lại một upvote để ủng hộ mình nhé.