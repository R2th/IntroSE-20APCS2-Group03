Tạo một **chrome extension**  thực sự rất đơn giản và trong bài viết này mình sẽ hướng dẫn các bạn cách để tạo 1 **chrome extension** chỉ trong 3 bước đơn giản.

Chúng ta sẽ tạo extension đơn giản là khi click vào icon và nó sẽ show ra text  "Hello Chrome Extensions".

![](https://images.viblo.asia/d5cb9ef4-435c-43c3-b5dd-9cfe8169c9c4.png)

# Tạo thư mục chứa file manifest.json


    Trước khi bắt đầu chúng ta cần phải tạo thư mục chứa **extension**. Ở đây mình đặt tên thư mục là **my-first-extension**.


Tiếp đến là tạo file manifest.json. Tập tin này được sử dụng để giải thích cho chrome về extension của bạn. File này đuợc tạo trong thư mục **my-first-extension** và có nội dung như sau.

```
{
	"manifest_version": 2,
	"name": "My First Chrome Extension",
	"description": "This is the description for your first chrome extension",
	"version": "1.0",
	"browser_action": {
 		"default_icon": "image.png",
 		"default_popup": "popup.html",
 		"default_title": "My First Chrome Extension"
 	}
}
```

Và save nó lại :D

# Tạo file popup.html


Trong file manifest.json chúng ta có khai bao cho chrome là khi người dùng click vào icon của extension thì sẽ hiện thị ra nội dùng của file popup.html.

Chúng ta sẽ tạo file có tên là **popup.html** và có nội dung như sau

```html
<!DOCTYPE html>
<html>
<head>
	<title>My First Chrome Extension</title>
	<style>
		#popup{
			width:300px;
			height:200px;
			text-align:center;
			line-height:200px;
		}
	</style>
</head>
<body>
	<div id="popup">
		Hello Chrome Extensions
	</div>
</body>
</html>
```

Bạn cũng phải tạo thêm 1 file ảnh nữa để làm icon. Các bạn có thể dùng tạm icon bên dưới và lưu nó vào thư mục `my-first-extension`
https://github.com/tnylea/creating-your-first-chrome-extension/blob/master/image.png

# Chạy extension

OK. bây giờ chúng ta cần phải chạy thử extensions xem nó có hoạt động hay không.

Bạn phải đi tới **Chrome Extensions** bằng cách click vào **Chrome Options -> More Tools -> Extensions**, hoặc bạn chỉ cần click vào đường dẫn sau `chrome://extensions/ `

Ở trang này bạn sẽ nhìn thấy danh sách extensions của bạn, tiếp theo bạn click để unbled button **Developer mode** 

![](https://images.viblo.asia/875d11e4-d432-4f92-ae9a-15aec59f5934.png)

Khi click vào button đó, bạn sẽ thấy buttons sẽ được hiện lên như hình dưới đây

![](https://images.viblo.asia/e6c3706c-9d62-44c1-b58d-87d93bbe7a15.png)

Khi click vào button **Load Unpacked** sẽ có 1 popup hiện lên yêu cầu bạn chọn thư mục chứa extension thì bạn hãy chọn thư mục và bạn vừa tạo. Ở đây mình sẽ chọn thư mục  `my-first-extension`.

Và sau đó bạn sẽ thấy icon extension sẽ hiện ra ở góc phải màn hình như hình bên dưới.

![](https://images.viblo.asia/67660a15-4feb-4ac4-80e6-39d42d77ef97.png)

Có phải rất đơn giản đúng không???

Bạn có thể tham khảo Github Repo: https://github.com/tnylea/creating-your-first-chrome-extension

# Tham khảo
https://devdojo.com/tutorials/creating-your-first-chrome-extension