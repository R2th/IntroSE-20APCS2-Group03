(Nguồn: http://weback.net/jqm/2207/)

jQuery Mobile là một loại JavaScript library đang được sử dụng ngày một rộng rãi dưới dạng mobile framwork trong phát triển site cho smartphone. 

Bài viết này sẽ trình bày trình tự xây dựng môi trường sử dụng jQuery Mobile.

**Nội dung:**
1. Download file cần thiết
2. Viết code dùng để load file trên HTML
3. Tạo HTML cho page cơ bản

**Môi trường sử dụng khi thực hiện bài viết:**

jQuery Mobile 1.4.4/1.4.5

#  Download file cần thiết
Nếu môi trường phát triển đang kết nối internet, bạn chỉ cần load những file cần thiết từ CDN (Content Delivery Network) là môi trường có thể sử dụng được jQuery Mobile.

Khi vận hành Website thực tế ta cũng nên làm cách này.

Tuy nhiên trường hợp muốn tạo site trên môi trường offline thì cần download file cần thiết rồi lưu vào local.

Để download, các bạn hãy access vào page dưới đây.

http://jquerymobile.com/


![](https://images.viblo.asia/73d1735f-2d58-401e-be36-3887e978da7e.png)


Khi click vào button [Latest stable] bạn có thể down được bản ổn định mới nhất.

Trong file đã down được, chúng ta có các file cần thiết cho việc tạo site thông thường như dưới đây:

* jquery.mobile-1.4.x.css  hoặc  jquery.mobile-1.4.x.min.css

* jquery.mobile-1.4.x.js  hoặc  jquery.mobile-1.4.x.min.js

* Images directory

![](https://images.viblo.asia/227a1f7f-f28c-462f-9067-cb8d1e616cf0.png)

File CSS và js có hai loại là bản Uncompressed và bản Minified, chúng ta chỉ dùng một loại phù hợp với mục đích sử dụng. Directory đặt file thì tùy ý.

Trong images directory có bao gồm file ảnh icon. Đặt ở từng directory ngay dưới directory đã đặt file CSS.

Ngoài ra còn cần cả body jQuery nữa. Trong file nén jQuery Mobile đã download không bao gồm file này nên các bạn hãy download version phù hợp tại [site download jQuery](http://jquery.com/download/).

Sau khi thiết lập xong, cấu trúc các file sẽ có dạng như sau:

![](https://images.viblo.asia/922ad029-c458-4811-b6f7-3d9305d640f7.png)


# Viết code dùng để load file trên HTML
Trường hợp là môi trường offline, ta mô tả như sau:
```
<link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery.mobile-1.4.5.min.js"></script>
```
Trường hợp là môi trường online

Nếu load từ CDN của jQuery thì mô tả như sau:
```
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
```
Có thể load từ Google Hosted Libraries.
```
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.3/jquery.mobile.min.js"></script>
```

# Tạo HTML cho page cơ bản
jQuery Mobile sử dụng funtion của HTML 5 nên ta sẽ viết bằng HTML5.

## Phần head element
Chỉ định character code là "UTF-8".

Sau đó set những nội dung như Viewport, page title, rồi code như sau cho phù hợp với code load file ban nãy.
```
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ページタイトル</title>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
</head>
```
Trường hợp toàn bộ sử dụng bản Uncompressed trên môi trường offline thì code như sau:
```
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ページタイトル</title>
<link rel="stylesheet" href="css/jquery.mobile-1.4.5.css">
<script src="js/jquery-1.11.1.js"></script>
<script src="js/jquery.mobile-1.4.5.js"></script>
```

## Phần body element
Trên jQuery Mobile sử dụng thuộc tính data độc lập “data-” của HTML5 và assign cho funtion trên HTML element.

Ví dụ, khi chỉ định data-role="page" thì nó sẽ nhận thức nội dung trong element đó như 1 page. 

Có nghĩa là trong cùng một file HTML nếu chỉ định nhiều data-role="page" thì sẽ có thể mô tả nội dung nhiều page lên cùng 1 file.

Trong element đã chỉ định data-role="page" sẽ có header, footer, content. Với header và footer phải chỉ định từng data-role="header" và data-role="footer" vào element.

Phần content thì hơi khác những cái khác, nó không phải thuộc tính data-role mà là kết hợp của thuộc tính role và class nên phải chỉ định là role="main" class="ui-content".

Tóm lại phần body element có thể viết như sau:
```
<body>
	<div data-role="page">
		<div data-role="header">
			<!-- ここにヘッダー内容を記述する -->
		</div>
		<div role="main" class="ui-content">
			<!-- ここにコンテンツ内容を記述する -->
		</div>
		<div data-role="footer">
			<!-- ここにフッター内容を記述する -->
		</div>
	</div>
</body>
```
---------------
Đến đây ta đã có thể load file cần thiết, markup HTML cơ bản rồi nên việc sử dụng jQuery Mobile để chuẩn bị môi trường tạo lập Website đã hoàn thành.