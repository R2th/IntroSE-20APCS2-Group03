> Như người bản xứ ... chắc vậy ...

### Show options

Thay vì ngồi lần mò các options một cách thủ công và mất thời gian, ta có thể hiện hết nó ra chỉ với tổ hợp phím quen thuộc.

Như ở trên VSCode, ta có thể dùng Crtl + P (Windows)/ Cmd + P (Mac) để hiển thị tất cả các lệnh có thể chạy được, như là: navigate files, đổi theme, chọn linter, bật debug, ... Thì trên DevTool, ta cũng hoàn toàn có thể làm như vậy, khác biệt duy nhất là nhấn thêm nút **Shift**: Ctrl + Shift + P (Windows)/ Cmd + Shift + P (Mac), và từ đây ta có thể:
- Chọn tab
- Chụp screenshot
- Đổi theme :v 
- ....

![](https://images.viblo.asia/adeb036b-fede-4720-a59b-1af78caa8e70.png)

### Chụp choẹt

Chụp cả trang? Chụp cả màn hình? Chụp cả node? Chụp 1 khoảng chỉ định? Tất cả đều có sẵn.
Trong đó thì chụp cả trang và chụp nguyên 1 node là hữu dụng hơn cả. Dí dụ:

> Chụp cả trang dài oằn tà là vằn

Dùng option này:

![](https://images.viblo.asia/cdaaffc9-4623-40cf-9855-309d1f3c2eff.png)

Và ta có được kết quả là toàn thể trang stackoverflow, ko thừa ko thiếu :v: 

![](https://images.viblo.asia/c5495b87-811d-400c-9ec7-409c09413bdf.png)

> Chụp chỉ 1 HTML node

Hay đầu tiên ta select cái node hình này:

![](https://images.viblo.asia/bfb87fa7-bf28-4511-a4df-fda80d7e6eca.png)

Rồi xài option này:

![](https://images.viblo.asia/bf2dfdb3-181a-4648-a60d-9a08fa24e671.png)

Và ta có được nguyên hình cái node đó, ko thiếu ko thừa :v:

![](https://images.viblo.asia/35f14c92-7345-4d1d-832d-5137f323b219.png)

### Lôi kết quả trước đó ra xài

Nếu ai đã từng dùng Ruby với cái irb trên terminal sẽ thấy kí tự **\_** vô cùng hữu dụng do nó luôn chứa giá trị output gần nhất.
Trong DevTool, cũng ko quá khác biệt, chỉ cần sử dụng **$\_** là ta có được kết quả tương tự:

![](https://images.viblo.asia/019db2ef-d7dc-4b1b-94cb-b2360ce9274e.png)

### Clone giá trị bất kì vào console

Trường hợp ta muốn tương tác với 1 node, nếu nó có id thì chạy document.getElementId('dien_id_vo'), còn nếu nó là class thì phải check xem nó là cái nào trong một đống kết quả, còn nó là một cái node ko tên ko tuổi thì lại phải hỏi xem cha của nó là ai, cháu nó là con thứ mấy trong nhà, vân vân và vân vân.

Hoặc, chuột phải vào mặt nó và chọn "store as global variable":

![](https://images.viblo.asia/91c58aa0-2360-4eed-b8c0-b14e93203a25.png)

Và ta có được reference của nó, tương tác nóng hổi vừa thổi vừa edit luôn:

![](https://images.viblo.asia/9ddfeef2-5259-452c-84c4-ee234c2e010b.png)
(ở đây nó được lưu dưới biến "temp2")

Ngoài ra, ta có thể store cơ số thứ linh tinh khác dưới dạng global variable, ví dụ như body của một cái response như này chẳng hạn:

![](https://images.viblo.asia/0fd96326-b95c-49e1-8116-0ef90e909f3b.png)

Và kết quả như mong đợi

![](https://images.viblo.asia/5fa9fc7e-0cd8-4f4b-8768-d9ae035dbd0c.png)

### Copy giá trị từ console vào clipboard

Thi thoảng ta phải copy dữ liệu rồi paste sang chỗ khác show hàng, cơ mà dữ liệu thì hay nest, mà nest thì khó bôi đen rồi copy, mà khó quá thì lại bỏ qua...

Hoặc, ta dùng hàm **copy** của DevTool, kết hợp với "store as global variable" là ta có combo hoàn chỉnh copy-paste everything :v 

> Copy

![](https://images.viblo.asia/c06c5ad8-eb65-4286-be89-fd1d556253de.png)

> Paste

![](https://images.viblo.asia/202a0b78-9c52-4b00-9626-bd563d2e3213.png)

### Kết

Ngoài ra còn vài các nữa cơ mà chụp ảnh nhiều hơi thốn nên tôi xin phép note thêm vài ý ngắn gọn (tất cả đều có thể truy cập từ **Cmd + Shift + P**):
- fps (Show frames per second (FPS meter): hiển thị khung đo fps như trong game, để phân tích hiệu năng của trang
- flash (Show paint flashing rectangles): xem các chỗ mà trình duyệt sẽ repaint khi mình tạo thay đổi (đổi tí mà xanh lè cả page là nát)
- onl/off (Go online/ Go offline): thay vì rút dây mạng để test mất mạng :)
- (j) (Disable JavasScript)

Sơ sơ như vậy cũng khá khá tips rồi, chúc các Dev có những trải nghiệm vui vẻ với Devtool của mình :)