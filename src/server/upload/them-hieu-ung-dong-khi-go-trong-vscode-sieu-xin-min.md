Bài viết này hướng dẫn bạn cách tùy chỉnh thiết lập VSCode của bạn để hiển thị hình ảnh động trong khi bạn đang gõ, giúp code trở nên sinh động hơn,giúp giải toả căng thẳng stress 😅.

Hình động có thể là hình chó mèo dễ thương , các em wibu nhảy múa .... whatever....


Ngoài ra còn có thêm phần hướng dẫn căn chỉnh tuỳ chỉnh hình cho các bạn.

Dưới đây là hình demo 1 chú vịt vàng rất ngộ nghĩnh mà mình đã sử dụng hơn 1 năm rồi 😜
![](https://images.viblo.asia/76916f6a-618d-46bd-bb20-f6c582b78580.gif)


Bây giờ mình sẽ đi vào phần hướng dẫn luôn :


###  CÀI ĐẶT

Bước đầu tiên ,các bạn cần có VS Code , [https://code.visualstudio.com](https://code.visualstudio.com/) tải vscode.

Sau khi cài đặt VSCode xong , các bạn vào giao diện bên trái , xuống tab Extension , gõ vào tìm và cài đặt plugin power mode

![image.png](https://images.viblo.asia/1ec05309-9e7f-4073-8143-0b4035fbaea4.png)

Về cơ bản power mode cho phép các bạn gõ và tuỳ chỉnh hiệu ứng khi gõ như 1 pro ,  sau khi cài đặt xong các bạn vui lòng giành ít thời gian để đọc mô tả về plugin cũng rất hữu ích.

Lưu ý :để plugin hoạt động vui lòng thêm **powermode.enabled: true**  vào file setting.json của bạn

Tùy thuộc vào hệ điều hành của bạn, tệp cài đặt VSCode nằm ở đây:

Windows - %APPDATA%\Code\User\settings.json
macOS - $HOME/Library/Application Support/Code/User/settings.json
Linux - $HOME/.config/Code/User/settings.json

Hiệu ứng default khi gõ của power mode:
![](https://images.viblo.asia/f4ca5c6c-72a4-4947-92a2-80006c7bff85.gif)


Lưu ý : hiệu ứng nổ pháo có kèm hiệu ứng rung có thể gây nhức đầu ,rối loạn tiền đình ,muốn tắt rung màn hình chỉ cần set **"powermode.enableShake": false** là được.

Có thể 1 số bài viết khác đã hướng dẫn các bạn cài power mode rồi nhưng phần dưới đây mình sẽ hướng dẫn 1 số tuỳ chỉnh nâng cao giúp các bạn có thể dùng plugin này để cài 1 số hình động khác.

### Tuỳ biến cách Power Mode hiển thị hình ảnh động

**"powermode.enabled"** kích hoạt hiệu ứng default của plugin nhưng nếu bạn muốn dùng những hình động khác của mình các bạn phải chỉnh ở mục **powermode.customExplosions**

Để tìm hình động các bạn có thể lên trang [https://giphy.com/](https://giphy.com/) nhé
Nhập chủ đề cần tìm kiếm sau đó bấm vào mục **Sticker** (sticker để lấy hình trong suốt).
![image.png](https://images.viblo.asia/1e6a6342-8a8a-4c3e-a40b-5e59f1e913dc.png)


Tiếp theo các bạn copy link hình bằng cách nhấp chuột vào biểu tượng link , hoặc chuột phải vào hình "copy link address"

![](https://images.viblo.asia/dab58696-e549-41ef-97e6-e0d679059c62.png)


- Kế tiếp khi đã có link hình các bạn hãy mở setting json lên và paste vào trong **powermode.customExplosions** (Lưu ý dùng url https nha! )

![image.png](https://images.viblo.asia/4168b64e-7450-4a9c-9833-9a1cb6ab0d74.png)


customExplosions là 1 array nên bạn có thể bỏ nhiều link hình ,hình động sẽ hiển thị ngẫu nhiên với các hình mà bạn đã chọn. (Còn xếp hình theo thứ tự mình từng làm được nhưng quên rồi , các bạn chịu khó mò tiếp nhé 😊)

Thế là chúng ta đã có được 1 hình động tự tạo ưng ý rồi ,và khi gõ thì màn hình sẽ ra như sau
![](https://images.viblo.asia/9978b68b-e3eb-4120-b866-25728e1142ac.gif)

Hoặc ví dụ 1 em manga/anime cực nuột cho các ae wibu
![](https://images.viblo.asia/954b2a33-8050-4ba7-a55d-549eaa7983a2.gif)


Nếu thấy hình quá nhỏ các bạn có thể tăng thuộc tính **"powermode.explosionSize"**

1 số thuộc tính  mình biết giúp bạn tuỳ chỉnh Power Mode động:
- "powermode.explosionDuration" : thời gian nổ của hiệu ứng.
-  "powermode.explosionSize" : size của hình động.
- "powermode.maxExplosions" :số lượng hình có thể có tối đa trong 1 lúc
-  "powermode.explosionOffset": khoảng cách giữa các lần nổ.

Ngoài ra các bạn có thể dùng thuộc tính "powerMode.customCss" để căn chỉnh css cho hình động như hình dưới,giúp dễ dàng chỉnh vị trí hơn
![image.png](https://images.viblo.asia/2eaba4e6-8ce9-4fa1-839f-34a2f46168ef.png)



Đây là Full setting power mode của mình trong setting.json, các bạn có thể tham khảo:
![image.png](https://images.viblo.asia/2dc47e58-cb5a-4151-9254-b1d59ba8f365.png)

Chúc các bạn sớm tìm được em hình động ưng ý góp phần giảm tải stress 😆

Bài viết có tham khảo nguồn từ :
https://aboutmonica.com/blog/how-to-make-your-vs-code-sparkle/?fbclid=IwAR0ibnLB2gIYzPGfqxlBqP07GDT9SKVktaQVGo4a5BVIx03NE34hEHb13Gw