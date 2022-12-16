# Giới Thiệu
CURL dùng để gửi request đến một đường dẫn trên Internet nào đó và bạn có thể tùy chỉnh các thông tin như User Egent để phía đường link kia không chặn requets. Ví dụ : login sử dụng data bên thứ 3 cung cấp API.

CURL là một hàm của PHP, giúp ta lấy, gửi, chiết tách hay đọc nội dung một trang web khác ngay trên Server của chúng ta. Một thuận lợi lớn nhất mà hàm curl này mang lại đó là tốc độ, nhanh hơn rất nhiều so với hàm open file  gần gấp 3 lần. cURL được ví như một công cụ giao tiếp đa giao thức, giúp ta xem hoặc tải một địa chỉ.

Trong bài viết này chúng ta sẽ tìm hiểu cURL được sử dụng trong ngôn ngữ PHP như thế nào.
# Các bước sử dụng CURL
Một ứng dụng CURL thường có 4 bước cơ bản:
* Bước 1: Khởi tạo CURL
* Bước 2: Cấu hình thông số cho CURL
* Bước 3: Thực thi CURL
* Bước 4: Ngắt CURL, giải phóng dữ liệu
# Cấu hình CURL
Khởi tạo CURL: $ch = curl_init();

Cấu hình cho CURL: curl_setopt($ch, CURLOPT_URL, " https://www.google.com.vn/");

Thực thi CURL: curl_exec($ch);

Ngắt, giải phóng CURL: curl_close($ch);
# Các bước thực hiện
Bước 1: Tạo 1 file api để lấy dữ liệu từ API - Service
```
<?php 
	function getDataFromAPI($nameCity){
		$urlApi = "http://api.openweathermap.org/data/2.5/forecast?q={$nameCity}&appid=073f342f34bacc8898356a523fa5b4f8&units=metric&lang=vi";
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $urlApi);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30);
		$res = curl_exec($ch);
		curl_close($ch);
		$data = ($res !== null || $res !== '') ? json_decode($res, true) : [];
		return $data;
	}
?>

```

Bước 2: Tạo file view đơn giản để chạy trên trình duyệt
```
<body>
	<div class="container">
		<header id="header" class="header">
			<div class="logo">
				<img src="public/img/weather.png" alt="weather">
			</div>
			<nav>
				<div class="form-group">
					<input type="text" name="txtCity" id="txtCity" class="form-control" placeholder="Nhập tên thành phố">
					<button type="button" class="btn" id="btnSearch">Tìm kiếm</button>
				</div>
			</nav>
			<div id="loading">
				<img src="public/img/loading.gif" alt="loading">
			</div>
			<section id="mainResult">
				
			</section>
		</header>
	</div>
</body>
```

![](https://images.viblo.asia/6aff1635-7bc7-4876-a83a-2ef420ba6be3.png)
Sau đó tạo 1 file để hiển thị kết quả phía dưới sau khi tìm kiếm tên thành phố
```
<?php if($listWeather): ?>
	<?php foreach ($listWeather as $key => $items): ?>
	<div class="weatherData" style="border-bottom: 1px solid #ccc; margin: 8px 0px; width: 100%;">
		<h4>Thời gian: <?php echo $items['dt_txt']; ?></h4>
		<p>Nhiệt độ: <?php echo $items['main']['temp']; ?>°C</p>
		<p>Độ ẩm: <?php echo $items['main']['humidity']; ?>%</p>
		<p>Mực nước biển: <?php echo $items['main']['sea_level']; ?> m</p>
		<p>Trạng thái: <?php echo $items['weather'][0]['description']; ?></p>
		<p><img src="http://openweathermap.org/img/w/<?php echo $items['weather'][0]['icon']; ?>.png" alt=""></p>
		<p>Sức gió: <?php echo $items['wind']['speed']; ?> m/h</p>
	</div>
	<?php endforeach; ?>
<?php else: ?>
	<h3 style="text-align: center;">Không có kết quả</h3>
<?php endif; ?>

```

Bước 3: Tạo file Controller để xử lý dữ liệu từ API trả về
```
<?php
	require '../api/api.php';
	$nameCity = $_POST['name'] ?? '';
	$nameCity = strip_tags($nameCity);
	$data = getDataFromAPI($nameCity);
	$listWeather = isset($data['list']) ? $data['list'] : [];
	require '../view/weather_view.php';
?>

```

Bước 4: Mở trình duyệt lên và chạy chương trình. Ta chỉ cần nhập đúng tên thành phố và sẽ thấy kết quả như đưới đây:

![](https://images.viblo.asia/ee553d7d-1527-438e-9823-da5d3ac2db2a.png)

Tất nhiên bạn cũng có thể xem các thông tin khác của thời tiết như áp suất, độ ẩm, nhiệt độ thấp nhất, nhiệt độ cao nhất, ... Ta chỉ cần dump dữ liệu từ API trả về và lấy ra những trường mà mình mong muốn.

# Kết luận
Với CURL trong PHP ta có thể dễ dàng tạo được những trang web đơn giản mà không mất công tạo dữ liệu trên trang của mình. Chỉ cần dùng API - Service từ nhà cung cấp thì việc tạo ra trang web sẽ dễ dàng hơn, ví dụ như 1 trang xem kết quả xổ số chẳng hạn: API [ở đây](https://xskt.com.vn/rss/).

Nguồn: tổng hợp từ internet.