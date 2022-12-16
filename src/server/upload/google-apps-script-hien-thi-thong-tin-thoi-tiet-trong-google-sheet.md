Đây là bài viết đầu tiên trong danh sách các bài viết giới thiệu và ứng dụng Google Apps Script.
# Google Apps Script
https://developers.google.com/apps-script/

Google App Script là ngôn ngữ lập trình dựa trên JavaScript với trình biên tập, biên dịch, nơi lưu trữ file đều nằm trên mây (máy chủ của Google). Với công cụ này, bạn có thể lập trình để thao tác, can thiệp đến rất nhiều các dịch vụ của Google(Google Docs, Spreadsheet, Calendar,... ). Do chương trình nằm trên mây nên có thể được chạy một cách tự động theo những khoảng thời gian chọn trước hoặc có một sự kiện diễn ra.

Để bắt đầu, chúng ta cần có một tài khoản Google và một máy tính có kết nối mạng internet.

# Ứng dụng hiển thị thông tin thời tiết
Chúng ta sẽ "bịa" ra một kịch bản kiểu như thế này: Chúng ta có một file Spreadsheet lưu thông tin chi tiết kế hoạch cho một buổi dã ngoại, để tăng thêm phần sinh động, chúng ta sẽ hiển thị thông tin thời tiết của khu vực ở trên cùng của Sheet.
## Chuẩn bị
- Một Spreadsheet có sẵn hoặc chúng ta có thể tạo một Spreadsheet mới ở đây https://sheets.google.com/create
- Api lấy thông tin thời tiết: [Openweathermap](https://openweathermap.org/) (Đăng ký tài khoản sử dụng miễn phí)
## Thực hiện
### Thêm mới memu cho trang tính
1. Từ trang tính chọn `Tools > Script editor`, nếu bạn được hỏi bởi màn hình chào mừng hãy chọn `Blank Project`.
2. Thêm menu
   
   Bạn đã có nơi để viết code, nhiệm vụ là chúng ta phải thêm một tuỳ chọn vào thành menu của trang tính, khi chọn tùy chọn này, ứng dụng sẽ cập nhật lại thông tin thời tiết.
   Google Apps Script có những hàm đặc biệt (sẽ nói ở 1 bài khác) trong đó hàm `onOpen` - Phương thức sẽ được gọi khi chúng ta mở trang tính. Chúng ta sẽ tiến hành thêm menu từ hàm này.
   ```javascript
   function onOpen(){
      var ui = SpreadsheetApp.getUi(); // Lấy ra đối tượng UI của trang tính
      ui.createMenu("Weather Forecast") // Tạo một menu
        .addItem("Update", "weatherForecast") // Thêm một item cho menu, và tên hàm sẽ được chạy khi chọn item.
        .addToUi(); // Thêm menu sau khi thêm vào trang tính.
    }
   ```
   File mà chúng ta đang code chỉ có thể tương tác với 1 trang tính được liên kết với nó. Lưu code, reload lại trang tính hoặc chủ động chạy function `onOpen`
   ![](https://images.viblo.asia/76b5df8f-aafc-427e-9957-d9d857f5344a.png)
   
   Kêt quả thu được
   ![](https://images.viblo.asia/5be53ee8-b087-45f7-9da5-8781218bb482.png)
   
   Một đoạn code khác cũng cho kết quả tương tự
   ```javascript
   function onOpen() {
      var spreadsheet = SpreadsheetApp.getActive();
      var menuItems = [
        {name: 'Update', functionName: 'weatherForecast'},
      ];
      spreadsheet.addMenu('Weather Forecast', menuItems);
    }
   ```
   
3. Hiển thị thông tin thời tiết

   Những thông tin chúng ta cần hiển thị có thể như thế này (Nhiệt độ hiện tại, lớn nhất, nhỏ nhất, độ ẩm, tình trạng thời tiết)
   ![](https://images.viblo.asia/ccaca990-194e-4455-9988-f253cb0d3bed.png)
   Thông tin của api `http://api.openweathermap.org/data/2.5/forecast/daily?q=Hanoi&units=metric&appid=xxx&cnt=1` có dạng:
   ```json
    {"city":{"id":1581130,"name":"Hanoi","coord":{"lon":105.8525,"lat":21.0292},"country":"VN","population":1431270},"cod":"200","message":0.5567828,"cnt":1,"list":[{"dt":1532235600,"temp":{"day":35.84,"min":25.8,"max":35.84,"night":25.8,"eve":30.92,"morn":30},"pressure":1004.09,"humidity":83,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":2.82,"deg":323,"clouds":36,"rain":9.99}]}
   ```
   Chúng ta có thể thấy được tất cả thông tin mà chúng ta cần.
   
   Nhiệm vụ: Gọi api, điền thông tin vào các ô cố định.
   
   ```javascript
   function weatherForecast(){
      var NOTATIONS = {
        CITY: "B1",
        WEATHER: "B2",
        TEMP: "B3",
        TEMP_MIN: "B4",
        TEMP_MAX: "B5",
        HUMI: "B6"
      }; // Các Notation cố định
      var ss = SpreadsheetApp.getActive(); // Lấy ra đối tượng trang tính
      var sheet = ss.getSheetByName("Weather"); // Lấy sheet có tên Weather. ss.getSheets()[0];
      var apiKey = "xxx"; // Openweathermap api key

      var cityName = sheet.getRange(NOTATIONS.CITY).getValue(); // Lấy thông tin thành phố ở vị trí B1
      var apiCall = "api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName +"&units=metric&cnt=1&appid=" + apiKey;

      var response = UrlFetchApp.fetch(apiCall); // Gọi api
      var data = JSON.parse(response.getContentText()); // Convert api response thành đối tượng json. getContentText trả lại string. 
      // Hàm này cần quyền https://www.googleapis.com/auth/script.external_request trên tài khoản google của bạn

      if (data.cod === "404") { // City not found
        return;
      }

      var today = data["list"][0]; // Lấy dữ liệu từ Json object

      var weather = today["weather"][0];
      var tempObj = today["temp"];
      var country = data["city"]["country"];
      var weatherDesc = weather["main"];
      var temp = tempObj["day"];
      var minTemp = tempObj["min"];
      var maxTemp = tempObj["max"];
      var humidity = today["humidity"];

      sheet.getRange(NOTATIONS.WEATHER).setValue(weatherDesc); // Gán dữ liệu
      sheet.getRange(NOTATIONS.TEMP).setValue(Math.round(temp));
      sheet.getRange(NOTATIONS.TEMP_MIN).setValue(Math.round(minTemp));
      sheet.getRange(NOTATIONS.TEMP_MAX).setValue(Math.round(maxTemp));
      sheet.getRange(NOTATIONS.HUMI).setValue(humidity);
    }
   ```
   Như vậy là chúng ta đã hoàn thành ứng dụng.
   
   Giờ bạn trở lại trang tính, xoá dữ liệu từ B2 tới B6, sau đó chọn menu `Weather Forecast > Update` để thấy kết quả.
## Kết quả
Về cơ bản thì đó là tất cả những gì chúng ta cần, nhưng tôi thì lại muốn thêm một chút nữa.

Chỉnh giao diện :)

![](https://images.viblo.asia/ba13cdcd-a0f3-49ca-9951-800aa7f09e98.png)

# Kết luận
Hy vọng với bài viết này các bạn có thể bắt đầu làm quen với `Google Apps Script` và có thêm các ý tưởng sử dụng nó cho công việc của mình.

Nội dung toàn bộ file code: https://gist.github.com/hoangsetup/0e7248c1b206e8a59dbbeff0425f93b9

Trang tính của bài mẫu: https://docs.google.com/spreadsheets/d/1_Ti2VfKndGI9ica83j7ePuWYRPVcqqTDed2AiO3QjR4/edit?usp=sharing Các bạn có thể tạo một bản sao từ trang tính này.