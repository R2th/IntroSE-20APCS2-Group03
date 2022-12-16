Hôm này mình sẽ hướng dẫn các bạn cách làm một trình duyệt web với những chức năng cơ bản trong IOS nhé.
Đầu tiên chúng ta cần phải tạo một giao diện cơ bản cho trình duyệt của ta.
# Tạo ứng dụng
![](https://images.viblo.asia/600119b0-a132-43aa-82df-81fac3b2d85a.png)
Sau khi đã tạo project thành công ta vào trong StoryBoard để tiến hành thiết kế giao diện cho ứng dụng của ta.
## Tạo giao diện
Đầu tiên ta embed một Navigation Controller cho ứng dụng.
![](https://images.viblo.asia/de4115ad-e4cb-42e6-93f2-1a2e927012b5.png)

Tiếp theo đó ta sẽ chỉnh cái title mặc định thành tên app của ta ở đây mình để là Web browser 
. Sau đó ta tiếp tục thêm vào Navigation Bar những cái Bar Button Item cần thiết như quay lại,tiến lên,tải lại trang cho ứng dụng của ta.
![](https://images.viblo.asia/8cf493cd-8f75-4d30-b65f-f083385b8b7f.png)
Sau khi đã thêm các Bar Button Item thành công được như hình thì ta tiếp tục thêm vào trong ứng dụng của ta một cái WebKitView để hiển thị trang web. Ta chỉnh cho constraints bằng 0 hết để cho cái webview của ta to toàn màn hình.
## Tạo các Action  
Bây giờ ta tiến hành thêm các Referencing Outlets của các item ta đã tạo từ view sang controller của ta.
**Lưu ý :** Ở bước này ta phải nhớ ngoài import UIKit thì ta phải import cả thằng WebKit để có thể sử dụng thằng WKWebView

![](https://images.viblo.asia/5f865992-f52e-46f9-a13a-9e7bf86ad0b5.png)

Tiếp sau đó ta tiến hành hiển thị một url của trang web. Ở đây ta sẽ hiển thị đường dẫn đến trang google bằng hàm load trong WKWebview.
![](https://images.viblo.asia/1b17c62f-491c-4914-b1fb-d0e9b3e03950.png)

Giờ ta sẽ chạy ứng dụng của ta để xem như thế nào nhé.
![](https://images.viblo.asia/dd9a5e2e-0574-4a34-bdab-7879189bdc72.png)

Giờ ta đã hiển thị thành công một trang web trên webview của ta rồi.Ta tiếp tục thêm các action cho các Bar Button Item.
Bây giờ ta sẽ thêm action cho nút quay lại trang web đằng trước cho ứng dụng của ta.

![](https://images.viblo.asia/2a42f6cc-6cea-41a8-bfb7-6913c29e3bad.png)


Ta sẽ kiểm tra nếu webview của ta có có mục lùi hợp lệ trong danh sách chuyển tiếp.Nếu có thì ta sẽ cho webview lùi lại bằng hàm goBack.
Tương tự như vậy ở nút another của ta. Ta cũng kiểm tra có mục chuyển tiếp hợp lệ trong danh sách chuyển tiếp hay không ? Nếu có thì ta mới cho webview chuyển tiếp bằng goForward.
![](https://images.viblo.asia/ab968836-c306-4bbe-b6ec-e6442f6889e7.png)

Ở nút refresh thì ta chỉ cần gọi đến hàm reload vủa webView là có thể tải lại trang rồi.
![](https://images.viblo.asia/fd7c7aa1-61e9-4193-8fb8-7546a82d1e62.png)

Ngay lúc này thì ứng dụng của ta đã có được những chức năng cơ bản của một ứng dụng web rồi.Giờ ta tiếp tục thêm một số thứ để ứng dụng của ta được tốt hơn nhé.
# Cấu hình trong WKUIDelegate và WKNavigationDelegate
Đầu tiên ta phải implement hai class là WKUIDelegate và WKNavigationDelegate vào trong controller của ta.Sau đó ta gán cho hai cái uiDelegate và navigationDelegate bằng self.
![](https://images.viblo.asia/d92ce07a-252a-4616-9bfc-2761c4a8834f.png)

Ở trong cái WKUIDelegate và WKNavigationDelegate ta tiến hành overide hai hàm là didcomit (biết khi nào trang web đang được load) và didFinish (biết khi nào trang web load xong).
![](https://images.viblo.asia/2c1bf19b-1148-48f7-b898-8983398c2a25.png)
Nếu trang web đang được load thì ta sẽ deactivate để cho người dùng không thể bấm vào hai nút đó.Còn nếu khi load xong thì ta sẽ kiểm tra nếu webview cho quay lùi thì ta mới active cái nút back .Nút chuyển tiếp cũng tương tự như vậy.
# Thêm Activity Indicator vào trong ứng dụng của ta
Bên story board ta tiến hành kéo Activity Indicatorr View vào trong view của ta.

![](https://images.viblo.asia/d6e2c353-19c0-4ea1-85e6-0e786921da52.png)

![](https://images.viblo.asia/556a5650-b4fa-4870-af41-e207105da6c5.png)

Ở bên Controller ta tiến hành thêm các action cho Indicator của ta.Khi trang web đang được load thì ta sẽ cho hiện và chạy Indicator . Còn nếu khi trang web đã được load xong thì ta sẽ dừng Indicator lại và ẩn nó đi.
Rồi sau khi qua các bước trên thì ta đã viết xong một cái một cái trình duyệt đơn giản rồi.Chúc các bạn thành công !!! :kissing_heart::kissing_heart::kissing_heart: