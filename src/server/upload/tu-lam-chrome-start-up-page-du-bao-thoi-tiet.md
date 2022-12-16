![](https://images.viblo.asia/6499aad0-49ae-4b9d-8df9-364c5bc398dc.png)

# Mở đầu
Như đã nói trong bài trước, bài này sẽ sử dụng những gì đã học tại [bài trước](https://viblo.asia/p/tap-tanh-tim-hieu-css-thuc-hanh-hieu-ung-thoi-tiet-3P0lPn7GKox)  để làm 1 cái start up page thời tiết. Thực tế thì cái start up page này mới là ý định ban đầu của mình, vì trông cái start up page nhàm chán quá, nghĩ mãi xem nên tô vẽ gì đỡ chán thì nghĩ ra trò hiển thị thời tiết bên ngoài (tiện thể lúc nào sắp ra khỏi cửa mà nhìn thấy báo mưa to thì cầm sẵn ô/áo mưa luôn :D). Nhưng mà hiển thị thôi vẫn chán, mình mới nghĩ ra trò thêm animation thời tiết vào nữa, thế nên mới có bài kia, để làm tiền đề áp dụng cho bài này.

Cách làm cơ bản của mình là sử dụng css + jquery/ajax, lấy dữ liệu thời tiết bằng ajax về rồi dựa trên kết quả animation thời tiết tương ứng. Chủ yếu sẽ sử dụng cách replace HTML sau khi nhận được dữ liệu trả về.

Ngoài ra thì như mọi người thấy, mình còn thêm vài thứ linh tinh như ngày giờ, với link hay vào là mail và drive nữa, mọi người tùy ý thêm bớt theo nhu cầu sử dụng, mình sẽ để link demo và source tham khảo ở cuối bài nhé.

Công việc gồm có các phần chính như sau:
 - Thay start up page mặc định của chrome thành của mình
 - Tạo giao diện và chuẩn bị các hiệu ứng thời tiết
 - Lấy thông tin thời tiết thông qua API
 - Xử lý thông tin nhận được và đưa lên giao diện, active các hiệu ứng tương ứng thông tin 
# Replace Start up page
Việc đầu tiên tất nhiên là phải làm cho thay vì hiển thị cái start up page nhàm chán thì chrome sẽ hiện ra cái trang màu mè của mình. 
Trước hết hãy tạo 1 folder Project với 1 file `html` đã nhé.

Tiếp theo, để có thể thay thế cho start up của chrome, cần thêm 1 file `manifest.json` nữa. Nội dung file này sẽ như sau:
```json:manifest.json
{
  "name": "Empty new tab page", // tên cho app
  "description": "Override the new tab page with an empty page, for users who don't like the original or custom new tab pages",
  "version": "1.0",
  "incognito": "split",
  "chrome_url_overrides": { "newtab": "newtab.html" }, //tên file mà ứng dụng sẽ chạy vào đầu tiên
  "manifest_version": 2
}
```

Bước tiếp theo cần bật ứng dụng lên trên extension của Chrome. Truy cập link:` chrome://extensions/ `  để tới trang list tắt/bật extension. Tuy nhiên là ứng dụng của mình vẫn chưa thấy trong này, nên cần phải 'load' nó lên danh sách đã. 

![](https://images.viblo.asia/60378aaf-4c7e-4082-94b6-00bded5e63df.png)

Đầu tiên cần bật Developer Mode lên để có thể tự tải các extension bên ngoài chrome store (cụ thể là để sử dụng extension mình tự build dưới local). 

Sau đấy thì  có thể bấm vào 'Load unpacked' để lôi PJ của mình lên list được rồi

Còn mỗi bước cuối là active PJ extension đó lên thôi.

Giờ bạn có thể mở new tab, và thấy là thay vì cái hình ảnh lúc trước ngày nào cũng thấy, giờ cái newtab trắng trơn sạch sẽ trông còn chán đời hơn =)). Nếu bạn viết vài chữ vào file html, thì nó sẽ hiển thị ra new tab vừa rồi đấy :D. Nhưng mà thế có nghĩa là đã có thể thay start up page được rồi.
# Vẽ vời tí cho đẹp
Khi đã active được extension của bạn rồi, thì giờ hãy làm 2 việc:
* Xác định bạn muốn có chức năng gì trên đó
* Vẽ trang của bạn sao cho đẹp. Bởi vì sau khi vẽ trang xong thì mới có thể làm các bước như replace HTML, replace animation theo những điều kiện của mình.

Như trang của mình, mình muốn hiển thị ngày giờ, thời tiết đi kèm hiệu ứng, và cả vài link mình hay vào mà ko muốn gõ link nữa (thực ra là quen bấm mấy cái đó ở trên start page cũ, giờ mở ra thấy thiếu thiếu, với cả lười gõ link :D). À, mặt trời và background nền của mình cũng thay đổi theo thời gian nữa :D

Rồi, sau khi tìm được cái rặng núi đẹp đẹp kia (chôm hình ảnh từ https://offset.earth/artilleryio), vẽ và xác định chỗ sẽ hiển thị từng thứ, và cả đám animation nữa, thì mình đã có thể biết phải replace giá trị vào class/item nào rồi.

Mặc dù đã sử dụng hiệu ứng thời tiết, nhưng mình vẫn sử dụng thêm các icon thời tiết nữa, mình sử dụng bộ icon này: https://www.iconfinder.com/iconsets/weather-color-2

Tiện thể thì mình định nghĩa các hình ảnh này luôn để sau gọi đến icon cho dễ:
```js:script.js
var cloudy = '<img src="images/cloudy.png">';
var foggy = '<img src="images/foggy.png">';
var heavy_rain = '<img src="images/heavy_rain.png">';
var light_rain = '<img src="images/light_rain.png">';
var light_sun = '<img src="images/light_sun.png">';
...
```

![](https://images.viblo.asia/6499aad0-49ae-4b9d-8df9-364c5bc398dc.png)


Khi bắt tay vào viết js, mình lưu ý 1 chút là với start up page, sẽ không thể nhận được js viết trong cùng file html, để thêm JS bắt buộc phải viết file js riêng và khai báo vào file `index.html` của bạn nhé
##  Dễ làm trước: Xác định hiệu ứng và sử dụng

### Hiệu ứng tương ứng thời gian
Như đã nói trên, trước hết mình muốn hiển thị thời gian rồi đổi màu nền và vị trí mặt trời. Vì vậy mình chọn vài mẫu màu background cho từng thời điểm: sáng sớm, sáng hẳn, trưa, chiều, chiều tối, tối. Còn mặt trời, mình sẽ cho nó di chuyển nửa vòng tròn tâm là `center bottom` của màn hình.  Vấn đề màu thì đơn giản rồi, dí `background-color` theo giờ là xong. Còn về vị trí mặt trời, mình áp dụng cái [này](https://viblo.asia/p/tap-tanh-tim-hieu-css-thuc-hanh-hieu-ung-thoi-tiet-3P0lPn7GKox#_lam-mat-troi-moc---lan-11) để định vị mặt trời, tất nhiên cũng phụ thuộc vào thời gian. Ở đây mình xác định đổi màu nền sẽ cùng lúc với đổi vị trí mặt trời => xác định các vị trí tương ứng với thời điểm đổi màu nền ở trên.

### Hiệu ứng tương ứng thời tiết
Tiếp theo, mình sẽ dựa vào thời tiết nhận lại để làm animation mưa/tuyết/sấm chớp đùng đùng... cho trang thêm sinh động. Để làm điều này cần chuẩn bị 1 số hiệu ứng tương ứng tham khảo từ [bài trước](https://viblo.asia/p/tap-tanh-tim-hieu-css-thuc-hanh-hieu-ung-thoi-tiet-3P0lPn7GKox): mưa nhỏ (chỉ dùng 1 layer mưa), mưa to (dùng thêm 1 - 2 layer mưa nữa với speed rơi nhanh hơn, hạt mưa to hơn để trông có vẻ mưa nặng hạt); trời gió (mình lười chưa làm); sấm chớp (nhớ để lớp sấm chớp dưới cùng, chỉ trên lớp màu nền thôi nhé); tuyết rơi (ở HN ko có tuyết nhưng mà bạn nào ở Sapa thì có thể có tuyết :D); sương mờ và sương dày (2 cái dùng chung, chỉ khác mỗi độ blur và opacity để có độ đặc khác nhau thôi)

Vậy là đại loại thì HTML sẽ trông như này:
```html:index.html
<script src="js/jquery-3.4.1.min.js"></script>
<body background=""> /* khi nào lấy thời gian thì if else đổi màu cho thẻ này */
    <div class="lightning" style="position: fixed">
        <img src="ảnh_chớp.png">
    </div>
    <div class="container">
        <div class="sun"></div> /* position sẽ được thay đổi theo thời gian
        ...
    </div>
    <div class="fog"></div> /* sương */
    <div class="rain">
        <div class="layer-1"> /* lớp mưa nhỏ, speed ko cần nhanh quá */
        </div>
        <div class="layer-2"> /* lớp mưa to, speed rơi nhanh, khi bật nó lên thì chỉnh width các hạt mưa lớn hơn */
        </div>
        ...
     </div>
    <div class="snow"></div> /* cũng có thể set tuyết nhiều hay ít tương tự như mưa */
</body>
```
Tất nhiên ban đầu tất cả các `div` thời tiết kia sẽ set `display: none`. Tương ứng với các thời tiết lấy về được sẽ chọn xem cái nào được `display: block` để chạy hiệu ứng.
# Xử lý ngày giờ
Việc lấy ngày giờ hiện tại với nhiều người chắc quá đơn giản rồi, nhưng để bài viết đầy đủ thì mình vẫn hướng dẫn cho những người lười tìm cách nhé:
```js:script.js
...
var today = new Date(); // Lấy ra ngày giờ hiện tại
var weekDay = today.getDay(); // Xem hôm nay là thứ mấy, kết quả trả về là từ 0 -> 6. Sử dụng switch case in ra thứ tương ứng:
switch (weekDay) {
    case 0:
        weekDay = 'Sun';
        break;
    case 1:
        weekDay = 'Mon';
        break;
        ...
}
// In ra chuỗi ngày tháng dạng: DD-MM-YYYY:
var date = weekDay + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + today.getDate() + '-'+ (today.getMonth() + 1) + '-' + today.getFullYear();

// Lấy giờ phút:
var hour = today.getHours();
var time = hour + ":" + today.getMinutes();

// In thế vào vị trí tương ứng trên màn:
$(".date").text(date);
$(".time").text(time);
```

Xong dòng ngày tháng, giờ có thời gian rồi, dựa vào đó và xử lý nền và mặt trời thôi, mọi người có thể tự chọn các mốc giờ, hoặc bỏ qua cái này cũng được nhé:
```js:script.js
...
var bgColor = '#feefc7';
if (hour > 5 && today.getHours() <= 7) {
    bgColor = '#efa18b';
    $(".sun").css("transform", 'rotate(-150deg) translate(40vw) rotate(-150deg)');
} else if (hour <= 10) {
    bgColor = '#e3c498';
    $(".sun").css("transform", 'rotate(-120deg) translate(40vw) rotate(-120deg)');
} else if (hour <= 14) {
    bgColor = '#f6e9d2';
    $(".sun").css("transform", 'rotate(-90deg) translate(40vw) rotate(-90deg)');
} else if (hour <= 16) {
    bgColor = '#e3c498';
    $(".sun").css("transform", 'rotate(-60deg) translate(40vw) rotate(-60deg)');
    $(".weather").css("left", '10%');
} else if (hour <= 17) {
    bgColor = '#efa18b';
    $(".weather").css("left", '10%');
    $(".sun").css("transform", 'rotate(-30deg) translate(40vw) rotate(-30deg)');
} else if (today.getHours() >= 18 || today.getHours() <= 5) {
    bgColor = '#010a3d';
    $(".sun").css("transform", 'rotate(-90deg) translate(40vw) rotate(-90deg)');
    $(".sun").css("background-color", '#e6dde4'); // buổi tối thì mặt trời đổi màu thành mặt trăng :D
    $(".date").css("color", '#e6dde4');
    $(".time").css("color", '#e6dde4');
}
$(".container").css("background-color", bgColor);
```

> 1 chút nhắn nhủ: Đoạn code trên mình viết kiểu tường minh dễ hiểu nhất có thể nên trông có vẻ dài dòng và trùng lặp nhiều, để tối ưu code các bạn có thể tham khảo bài này nhé: [Bớt if else đi để code sạch hơn](https://viblo.asia/p/bot-ifelse-di-de-code-sach-hon-GrLZDkLnKk0)
# Lấy thông tin thời tiết từ API
## Nguồn API
Sau khi tìm hiểu 1 số nguồn lấy API dự báo thời tiết, thì mình thấy hầu như không muốn dùng. Đa số càng nguồn mà các trang kiểu: "Những API dự báo thời tiết free" đưa ra đều "free" kiểu cho vài trăm lượt request mỗi ngày, sau đấy sẽ tính tiền cho các request tiếp theo. Mà mình sử dụng thì cho Chrome start up page, ngày ngứa tay làm việc mở nhiều tab thì tốn request lắm, nên dùng kiểu free cho những request đầu, tính tiền các request sau là không ổn. 

Và mình đã chọn [openweathermap](https://openweathermap.org), nó cho phép tối đa 60 request/phút, với việc sử dụng cá nhân thì thế là đủ, trừ khi bạn muốn thách thức tốc độ bấm new page :D. Theo như mình đọc được thì OpenWeatherMap có khoảng 11 API khác nhau để chúng ta sử dụng. Những điều cần làm đấy là đăng ký tài khoản để lấy API keys mà thôi.
## Open weather map
Để đăng ký tài khoản, bạn truy cập link này: https://home.openweathermap.org/users/sign_up và đăng ký tài khoản với email của mình. Sau đó sẽ được gửi 1 mail xác nhận tới email bạn đăng ký, bạn bấm vào link verify là được.

Đăng ký thành công rồi thì chỉ cần lấy API key nữa là có thể dùng được rồi! Trên màn hình `home`,  chọn tab API key để lấy key của mình nhé:

![](https://images.viblo.asia/256115db-6077-40ff-8735-c6364e3aef35.png)

Giờ chúng ta đã có API key để dùng rồi, tạm gán chuỗi key là: `122333444455555abcdef` nhé.
## Kết nối tới API
### Đọc API
Tùy vào mục đích sử dụng, ta sẽ cần các API khác nhau: thời tiết các thời điểm trong ngày, thời tiết trong tuần,... Bạn có thể vào https://openweathermap.org/api để tham khảo các doc và chọn cho phù hợp với mục đích nhé. Mình sẽ lấy ví dụ bằng 'Current weather forecast' (vì mục đích chính là check thời tiết hiện tại để cho start up page nó animate mà :D)

Theo như doc, thì API call sẽ như sau:
```
api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}
```

Ở đây city name nếu không chắc chắn key city name thì hãy vào https://openweathermap.org/city để search city name. Và `appid` chính là API key hồi nãy lấy được: `122333444455555abcdef`

Ngoài ra có thể lấy bằng city ID, zip code... nữa, nhưng mà mấy cách đó không đơn giản bằng city name, nên cái gì dễ thì dùng thôi :D

OK, giờ truy cập thử API nhé. Bạn sẽ thấy data trông như thế này:

![](https://images.viblo.asia/1f36f26c-2a9c-4059-aa53-4c342ee27939.png)

Trong đó cần chú ý: 

* `dt` là ngày giờ của mỗi item dự báo (VD như ảnh là lúc 9h ngày 12/2/2020 thì thời tiết Hà Nội như thế nào đó). Thời gian này đang ở dạng unix, vì vậy nếu muốn convert sang thời gian bình thường thì có thể sử dụng thư viện [`moment.js`](https://momentjs.com/) nhé:
```js
weather.date = moment.unix(data.dt).format("MM/DD/YYYY");
weather.time = moment.unix(data.dt).format("HH:MM");
```

* `weather.description` là thông tin thời tiết chính ta quan tâm
* `name`: Tên thành phố lấy thời tiết. có `sys.country` nữa là tên
* `main` chứa thông tin cụ thể về thời tiết: nhiệt độ (thang đo độ F), Cảm giác như bao nhiêu độ, nhiệt cao nhất, nhiệt thấp nhất,...

Ơ nhưng mà mình người Việt dùng nhiệt độ Fahrenheit (độ F) nó bị không quen ý. Để chuyển sang độ C cũng đơn giản thôi, bạn lấy độ F trừ 30 rồi chia 2 là ra độ C nhé ( F = (C x 2) + 30 theo [tài liệu](https://www.fahrenheittocelsius.com/) ). Hoặc đơn giản hơn là thêm `&units=metric` vào cuối của request API nhé =))

![](https://images.viblo.asia/e8cf3bc3-1992-4589-a8f3-592c6a2a2e2a.jpg)

Ngoài ra ở cuối cùng của API là thông tin địa điểm của thời tiết:
```json
id: 1581130 // đây là cityID nói ở trên này 
clouds: {all: 20} //cái này là mật độ mây thì phải
name: "Hanoi" // tên thành phố lấy thời tiết
sys:
    country: "VN" // quốc gia
    id: 9308 // id quốc gia
    sunrise: 1581463753 // giờ mặt trời mọc - cũng theo time unix
    sunset: 1581504762 // giờ mặt trời lặn
timezone: 25200
visibility: 2300
weather: [{…}]
wind:
    deg: 80 // hướng gió
    speed: 3.6 // tốc độ gió
```
### Tạo request lấy dữ liệu về bằng ajax

Mình dùng cách vô cùng cơ bản để lấy 
```js:script.js
...
$.ajax({
    type: "GET",
    dataType: "json",
    data: {name: name},
    url: "http://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=122333444455555abcdef&units=metric",
    success: function(data)
    {
       console.log(data);
    }
});
```

Và mở lên thì cái mình cần đã được lôi ra:
![](https://images.viblo.asia/1bd96e19-55dd-44d1-aa05-4cbbdeb62322.png)

### Xử lý dữ liệu để sẵn sàng sử dụng
Để nguyên như kia thì insert vào không được thuận tiện lắm, vì vậy mình sửa sang lại 1 chút cho dễ dùng:
```js:script.js
var city = '';
var weather = [];
$.ajax({
    type: "GET",
    dataType: "json",
    data: {},
    url: "http://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=8abd04009b0b784352dd637c0ecb8668&units=metric",
    success: function(data) {
        weather.date = moment.unix(data.dt).format("MM/DD/YYYY");
        weather.time = moment.unix(data.dt).format("HH:MM");
        weather.city = data.name;
        weather.weather_id = data.weather[0].id;
        checkWeather(weather.weather_id); //hàm này sẽ được giải thích ở dưới, nó xử  lý hiện tượng thời tiết
        weather.temp = data.main.temp;
        weather.maxTemp = data.main.temp_max;
        weather.minTemp = data.main.temp_min;

        $(".weather .city").html(weather.city);
        $(".weather .curr-temp span").html(weather.temp);
        $(".weather .description").html(weather.weather);
        $(".weather .feel").html(weather.feels_like);
        $(".weather .max a").html(weather.maxTemp);
        $(".weather .min a").html(weather.minTemp);
    }
});
```

Theo như trên thì mình chỉ lấy dữ liệu là ngày, giờ, nhiệt độ hiện tại, nhiệt độ max, nhiệt độ min và thời tiết hiện tại thôi. Thế là đã có đủ thông tin rồi.
## Gán thông tin thời tiết

Những thông tin cần đã có, các hiệu ứng tương ứng cũng đã chuẩn bị, giờ là ghép vào. Đối với các thông tin: nhiệt độ, tên thành phố, thì chỉ cần replace trực tiếp như thông tin ngày giờ ở trên là xong: `$(".weather .curr-temp span").html(weather.temp);`. Tuy nhiên với status của thời tiết cần 1 chút xử lý. 

Ở Openweathermap, họ định nghĩa rất nhiều status thời tiết (là item `data.weather[0].description`): mây cụm, ít mây, mưa phùn nhẹ, mưa phùn, mưa nhỏ, mưa lạnh, mưa như trút nước,.... nên là cần phải nhóm các status trả về, với các nhóm nào thì xử lý hiệu ứng như nào, hoặc là có thể thêm các icon thời tiết tương ứng cho đẹp nữa. Để xem tất cả các status của thời tiết và chọn nhóm sao cho phù hợp, thì có thể vào link này nhé: https://openweathermap.org/weather-conditions

Vậy là mình có 1 cái map conditions tổng hợp tương ứng như sau:
```js:script.js
const actions = new Map([
        [200, [thunder, 'add_thunder_rain']],
        [201, [thunder, 'add_thunder_rain']],
        [202, [thunder, 'add_thunder_heavy_rain']],

        [300, [light_rain, 'add_rain']],
        [301, [light_rain, 'add_rain']],
...
        [500, [light_rain, 'add_rain']],
        [501, [moderate_rain, 'add_rain']],
        [502, [heavy_rain, 'increase_rain_width']],
        [503, [heavy_rain, 'increase_rain_width']],
...
        [701, [windy, 'add_mist']],
        [702, [windy, 'add_mist']],
        [703, [windy, 'add_mist']],
...
        [771, [hail_rain, 'add_headvy_rain']],
        [781, [tornado, 'add_headvy_rain']],

        [800, [sunny, '']],
        [801, [light_sun, '']],
        [802, [cloudy, '']],
        [803, [cloudy, '']],
        [804, [cloudy, '']],

        ['default', [sunny, '']]
    ]);
```
Đại loại cái map trên là như này:
```
[weather_id, [icon_image_variable, weather_action_for_screen]
```
Trong đó: 
 - weather_id: khỏi cần giải thích, là id lấy từ API qua ajax ở trên
 - icon_image_variable: varisable chứa icon image đã định nghĩa ở trên: VD: `var windy = '<img src="images/windy.png">';`
 - weather_action_for_screen: chọn hiệu ứng mưa rơi hay tuyết bay, blah blah... cho màn hình

Code ở trên khá dài và chưa được "đẹp" lắm, mình cũng chưa biết xử lý sao cho gọn nên để tạm vậy, các bạn có thể tối ưu lại nhé.

## checkWeather(weather_id)
Hàm này sẽ làm việc chọn icon và hiệu ứng theo weather_id. 
```js:script.js
function checkWeather(status) {
    let action = actions.get(status) || actions.get('default');
    icon(action[0]);
    doWeather(action[1]);
}
```

Ở đây `actions.get(status)` sẽ chạy vào map actions ở trên kia, dựa vào status để đối chiếu với weather_id trong map và lấy ra icon + weather action tương ứng. Khi đó giá trị trả về sẽ là
```js:console.log(action)
Array(2)
    0: "<img src="images/windy.png">"
    1: "add_mist"
```

Như vậy hàm icon(action[0]) là để chèn icon vào vị trí icon thời tiết:
```js:script.js
function icon(icon_name) {
    $(".weather .icon").html(icon_name);
}
```

và kích hoạt hiệu ứng tương ứng:
```js:script.js
function doWeather(action) {
    switch (action) {
        case 'add_thunder_rain': 
            $(".lightning").css("display", 'block');
            $(".layer-1 .rain-drop").css("display", 'block');
            break;
        case 'add_thunder_heavy_rain': 
            $(".thunder").css("display", 'block');
            $(".rain-drop").css("display", 'block');
            $(".rain-drop").css("width", '2px');
            break;
        case 'add_thunder': 
            $(".thunder").css("display", 'block');
            break;
        case 'add_rain': 
            $(".layer-1 .rain-drop").css("display", 'block');
            break;
        case 'increase_rain': 
            $(".rain-drop").css("display", 'block');
            $(".rain-drop").css("width", '2px');
            break;
        case 'add_snow': 
            $(".snowflakes .snowflake").css("display", 'block');
            break;
        case 'add_mist': 
            $(".fog").css("display", 'block');
            break;
        case 'add_fog': 
            $(".fog").css("display", 'block');
            $(".fog").css("filter", 'blur(20px)');
            break;
        default: // default mình cho hoa anh đào rơi cho đỡ chán, làm y hệt tuyết :v
            $(".sakuras .snowflake").css("display", 'block');
    }
}
```
# Kết
Mọi người có thể xem trực tiếp code tại https://github.com/BunnyPi04/weather-start-up-page nếu làm theo tut trên mà mông lung quá nhé.

Còn đây là demo page: https://bunnypi04.github.io/weather-start-up-page/

Hoặc: https://weather.tothemoon-min.com/