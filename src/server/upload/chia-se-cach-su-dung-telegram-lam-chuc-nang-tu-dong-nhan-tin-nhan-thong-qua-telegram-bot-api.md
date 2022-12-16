Xin chào các bạn, lại là Quang đây 😁

Hôm nay, mình lại lên đây và chia sẻ cho các bạn về cách mình dùng Telegram nhận tin nhắn dự báo thời tiết thông qua Telegram Bot API.

Và không để các bạn đợi lâu, mình xin bắt đầu ngay!

Đầu tiên, bạn cần có 1 tài khoản telegram, việc đăng ký khá đơn giản, vì hầu như telegram thì nó cũng đã khá phổ biến rồi, nhất là đối với các dev, dân chơi coin... thì telegram càng gần gũi, ngoài các lớp học chia sẻ tài liệu học tập đêm khuya, thì trên telegram còn có nhiều thứ hay ho để cho các bạn tìm hiểu, thôi mình nói vậy là các bạn hiểu rồi chứ không mất công lại nói mình nhiều chuyện 🤣

Gạt qua các vấn đề lan man trên, khi bạn đã có một tài khoản trên telegram rồi thì điều tiếp theo, là chúng ta cần tạo 1 channel trên tài khoản telegram của mình, channel này sẽ dùng để sử dụng chức năng nhận tin nhắn khi tele bot gửi lệnh vào 😃

Cách tạo channel thì cũng khá đơn giản, các bạn mở telegram lên, ở đây mình làm trên telegram phiên bản desktop ( máy tính cá nhân) nhé, trên mobile cũng tương tự thôi.

![](https://images.viblo.asia/4850600e-4a72-4844-a421-f4c28d6e5478.jpg)

Và sau khi nhấn vào, các bạn đặt tên cho channel của mình, upload ảnh đại diện, thêm mô tả (nếu cần) thế là xong, chúng ta đã tạo ra một channel thành công.

Tiếp theo, chúng ta cần tạo một con bot trên telegram, việc tạo bot trên telegram thì sau khi bạn đăng nhập vào Telegram thì ở ô tim kiếm, tìm BotFather, sau đó gõ /newbot để tạo,

![](https://images.viblo.asia/316df0f1-e18a-4d0a-9fd1-7fb0b3ff3653.jpg)

Sau khi tạo xong, bạn chỉ cần lấy API Token của bot để sử dụng.

Tiếp tục, chúng ta sẽ tìm đến tài liệu api để xem cách sử dụng, tài liệu api: https://core.telegram.org/bots/api

Ở đây, mình dùng chức năng gửi tin nhắn kèm ảnh nên mình đã tìm đến api này: https://core.telegram.org/bots/api#sendphoto

Xem các tham số cần dùng là gì nào? Mình gửi thông tin thời tiết nên mình chỉ cần dùng 3 tham số là `chat_id`, `photo`, `caption`. Tham số chat_id là dãy số id của group chat, hoặc là username của channel, cái channel mình tạo ở tên sẽ có dạng @ten_channel thì tham số này chấp nhận kiểu số hoặc chuỗi. Vậy để lấy cái username của channel thì lấy kiểu gì? Rất đơn giản, bạn bấm vào tên của channel thì sẽ thấy thông tin, ở cửa số Channel Info thì bạn sẽ lấy phần username ở phần link. Ví dụ:  https://t.me/codedaokysu => @codedaokysu (đây là username)

![](https://images.viblo.asia/7304b20a-ac88-4e57-b9c4-4158925ba4f5.jpg)

Khi đã có thông tin, thì bạn cần viết code để gửi tin nhắn, kết hợp với Bot Token khi tạo bot để sử dụng gửi tin nhắn vào channel. Các bạn xem code tham khảo của mình ở bên dưới.

```
<?php 
header('Content-Type: application/json; charset=utf-8');

$url_qtri = 'http://api.openweathermap.org/data/2.5/weather?id=1582926&appid=**APIKEY_CỦA_OPENWEATHERMAP_API**&units=metric&lang=vi';
$content_tri = file_get_contents($url_qtri);
$json_qtri = json_decode($content_tri, true);

$token = "**ĐỂ TOKEN TELEBOT VÀO ĐÂY**";

$icon_qtri = $json_qtri['weather'][0]['icon'];
switch ($icon_qtri) {
	case '01d':
	case '01n':
		$icon_qtri_url = 'https://i.imgur.com/9CGjkOE.jpg';
		break;
	case '02d':
	case '02n':
		$icon_qtri_url = 'https://i.imgur.com/CRh04K2.jpg';
		break;
	case '03d':
	case '03n':
		$icon_qtri_url = 'https://i.imgur.com/zHuhzVo.jpg';
		break;
	case '04d':
	case '04n':
		$icon_qtri_url = 'https://i.imgur.com/riGvdrP.jpg';
		break;
	case '09d':
	case '09n':
		$icon_qtri_url = 'https://i.imgur.com/XHUnTV6.jpg';
		break;
	case '10d':
	case '10n':
		$icon_qtri_url = 'https://i.imgur.com/7ECPQGA.jpg';
		break;
	case '11d':
		$icon_qtri_url = 'https://i.imgur.com/dMj6Rt9.jpg';
		break;
	case '50d':
	case '50n':
		$icon_qtri_url = 'https://i.imgur.com/j4jSE6N.jpg';
		break;
	default:
		$icon_qtri_url = 'http://openweathermap.org/img/wn/' . $json_qtri['weather'][0]['icon'] . '@2x.png';
		break;
}

$data_qtri = [
	'chat_id' => '@codedaokysu',
	'photo'   => $icon_qtri_url,
	'caption' => 'Thời tiết ngày ' . date('d/m/Y') . ' tại Đông Hà, Quảng Trị có ' . $json_qtri['weather'][0]['description'] . '. Nhiệt độ là ' . round($json_qtri['main']['temp']) . '℃'
];
file_get_contents("https://api.telegram.org/bot$token/sendPhoto?" . http_build_query($data_qtri));

$url_hue = 'http://api.openweathermap.org/data/2.5/weather?id=1580240&appid=**APIKEY_CỦA_OPENWEATHERMAP_API**&units=metric&lang=vi';
$content_hue = file_get_contents($url_hue);
$json_hue = json_decode($content_hue, true);

$icon_hue = $json_hue['weather'][0]['icon'];
switch ($icon_hue) {
	case '01d':
	case '01n':
		$icon_hue_url = 'https://i.imgur.com/9CGjkOE.jpg';
		break;
	case '02d':
	case '02n':
		$icon_hue_url = 'https://i.imgur.com/CRh04K2.jpg';
		break;
	case '03d':
	case '03n':
		$icon_hue_url = 'https://i.imgur.com/zHuhzVo.jpg';
		break;
	case '04d':
	case '04n':
		$icon_hue_url = 'https://i.imgur.com/riGvdrP.jpg';
		break;
	case '09d':
	case '09n':
		$icon_hue_url = 'https://i.imgur.com/XHUnTV6.jpg';
		break;
	case '10d':
	case '10n':
		$icon_hue_url = 'https://i.imgur.com/7ECPQGA.jpg';
		break;
	case '11d':
		$icon_hue_url = 'https://i.imgur.com/dMj6Rt9.jpg';
		break;
	case '50d':
	case '50n':
		$icon_hue_url = 'https://i.imgur.com/j4jSE6N.jpg';
		break;
	default:
		$icon_hue_url = 'http://openweathermap.org/img/wn/' . $json_hue['weather'][0]['icon'] . '@2x.png';
		break;
}

$data_hue = [
	'chat_id' => '**ĐỂ USERNAME CỦA TELEBOT VÀO ĐÂY**',
	'photo'   => $icon_hue_url,
	'caption' => 'Thời tiết ngày ' . date('d/m/Y') . ' tại TP.Huế, Thừa Thiên Huế có ' . $json_hue['weather'][0]['description'] . '. Nhiệt độ là ' . round($json_hue['main']['temp']) . '℃'
];
file_get_contents("https://api.telegram.org/bot$token/sendPhoto?" . http_build_query($data_hue));
```

Khi thiết lập xong, bạn chạy code thì nó sẽ gửi như hình dưới 😃

![](https://images.viblo.asia/7fb93a60-57a7-414d-b539-10d2b42493ec.jpg)

Và để tự động gửi tin, bạn cần sử dụng chức năng cronjob của hosting, ở đây mình thiết lập gửi tin vào 7h sáng mỗi ngày, ngày nào cũng gửi 😁

![](https://images.viblo.asia/49eb8086-773e-4ca9-8b2c-938f1d381293.jpg)

Vậy là xong, cám ơn bạn đã đọc bài viết, nếu có gì thắc mắc hãy để lại bình luận bên dưới để trao đổi nhé 😉