Xin chào tất cả các bạn.

Lâu rồi cũng không viết bài, hôm nay nghỉ lễ ở nhà tránh dịch nên mình lại lên đây, type vài dòng cho đỡ buồn.

Hiện tại, trong khi rảnh rỗi mình có viết một cái extension nho nhỏ để nghịch, nay lên đây chia sẻ lại mọi người tham khảo cho vui 😁

Extension này mình viết dựa trên chức năng là sử dụng **OpenWeatherMap API**, chắc các bạn cũng biết đến thằng này rồi đúng không?

Dưới đây là giao diện cơ bản của nó, mình làm cũng rất đơn giản, chủ yếu là tạo một cái input để nhập địa phương để xem giá trị thời tiết thôi.

![](https://images.viblo.asia/ea9ddf33-695f-45fd-af66-523e36f70792.jpg)

Đầu tiên, để biết được cấu trúc của một extension chrome nó hoạt động như thế nào thì chúng ta cần hiểu rõ về nó một tý. Các bạn có thể tham khảo thêm tại địa chỉ: https://developer.chrome.com/docs/extensions/mv3/getstarted/

nhưng cơ bản, nó chỉ bao gồm các file HTML, CSS và JS để hoạt động. Các bạn tham khảo chi tiết thêm ở link trên để rõ hơn về cấu trúc file.

Và mình sử dụng các file đó như sau, hiện tại trong cấu trúc mình làm sử dụng popup nên mình xử lý ở file `popup.js`, dưới đây là code của mình

```
var searchInput = document.getElementById('search-location');
var searchButton = document.getElementById('search-button');
var searchForm = document.getElementById('mw-search');
var api_key = 'API_KEY_HERE';
document.addEventListener('DOMContentLoaded', function() {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var location_value = searchInput.value;
        if (location_value != '') {
            var location = location_value;
        } else {
            var location = 'Quang Tri';
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + location + ',VN&appid=' + api_key + '&units=metric&lang=vi', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.responseText;
                var data_parse = JSON.parse(data);
                //console.log(data_parse);
                var feels_like_value = data_parse.main.feels_like;
                var temp_value = data_parse.main.temp;
                var wind_value = (data_parse.wind.speed) * (60 * 60) / 1000;
                var sunrise_value = data_parse.sys.sunrise;
                var sunset_value = data_parse.sys.sunset;

                var date_sunrise = new Date(sunrise_value * 1000);
                var hours_sunrise = date_sunrise.getHours();
                var minutes_sunrise = "0" + date_sunrise.getMinutes();
                var seconds_sunrise = "0" + date_sunrise.getSeconds();
                var formattedTime_sunrise = hours_sunrise + 'h' + minutes_sunrise.substr(-2);

                var date_sunset = new Date(sunset_value * 1000);
                var hours_sunset = date_sunset.getHours();
                var minutes_sunset = "0" + date_sunset.getMinutes();
                var seconds_sunset = "0" + date_sunset.getSeconds();
                var formattedTime_sunset = hours_sunset + 'h' + minutes_sunset.substr(-2);

                document.getElementById("image-icon").src = 'http://openweathermap.org/img/wn/' + data_parse.weather[0].icon + '@2x.png';
                document.getElementById("name").innerHTML = data_parse.name;
                document.getElementById("temp").innerHTML = temp_value.toFixed();
                document.getElementById("humidity").innerHTML = data_parse.main.humidity;
                document.getElementById("feels_like").innerHTML = feels_like_value.toFixed();
                document.getElementById("wind").innerHTML = wind_value.toFixed();
                document.getElementById("sunrise").innerHTML = formattedTime_sunrise;
                document.getElementById("sunset").innerHTML = formattedTime_sunset;
                document.getElementById("description").innerHTML = data_parse.weather[0].description;
            } else if (this.readyState == 2 && this.status == 404) {
                var error_html = `<div class="alert alert-danger alert-dismissible fade in" id="search-error">
	                              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
	                              <strong>Warning!</strong> Không tìm thấy thông tin thời tiết cho thành phố này
	                            </div>`;
                document.getElementById("weather-info").insertAdjacentHTML('beforebegin', error_html);
                setTimeout(function() {
                    document.getElementById("search-error").remove();
                }, 1500);
            }

            searchInput.value = '';
        };
    }, false);
});
```
Còn về phần giao diện thì mình để ở file tương ứng là `popup.html`

Vì mình làm nó đơn giản nên mình chỉ xử lý ở 2 file này thôi 😁.

Sau khi xử lý xong, mình để chung thư mục và đóng gói, sau đó bật **Chế độ dành cho nhà phát triển** của tiện ích trên chrome tại địa chỉ: chrome://extensions/
và mở tới thư mục của extension để hoạt động thôi.

![](https://images.viblo.asia/83f10a1f-f31e-411f-8783-441388281f01.jpg)

Và kết quả sử dụng thì sẽ như hình bên dưới 😁

![](https://images.viblo.asia/a41b62c2-f994-48af-b484-6417432d80ca.jpg)

Cảm ơn các bạn đã đọc bài viết. Chúc các bạn nghỉ lễ vui vẻ 😄