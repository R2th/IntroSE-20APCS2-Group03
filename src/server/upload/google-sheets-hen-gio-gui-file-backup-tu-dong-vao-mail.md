![](https://images.viblo.asia/1ff26180-f423-4822-926b-811715b31de1.png)


# Đặt vấn đề
Một ngày đẹp trời có một người bạn gọi cho mình, chưa vội nghe máy mình nghĩ trong đầu lâu ngày gọi như này kiểu gì cũng có việc nó nhờ mình. Thông thường nó gọi thì chỉ có thể một là nhờ tư vấn mua điện thoại, 2 là nhờ cài lại win máy tính. Chả hiểu sao cứ làm nghề này là cứ bị auto nhờ sửa máy với cài win nhỉ? :rofl::rofl: Và quả đúng như dự đoán, sau một hồi vòng vo thì cũng đi vào vấn đề chính, cũng là nhờ nhưng lần này nó nhờ mình một việc có vẻ cao siêu hơn việc bình thường. Bài toán nó đề ra cho mình như sau: Có 1 file Google Sheets lưu thông tin quan trọng của một hệ thống. Hàng ngày nhân viên của hệ thống đó sẽ vào cập nhật thông tin. Nhưng vì lý do nhiều người sử dụng và edit được nên vấn đề về bảo mật và thất thoát thông tin là có thể xảy ra. Vì thế yêu cầu đặt ra là làm sao mỗi ngày sẽ tự động gửi 1 file backup vào email của admin. Để phòng trường hợp bị hack hay cố tính phá hoại thì sẽ không ảnh hưởng hoặc thiệt hại ít nhất có thể. 

Mình nghe qua thì có vẻ hay ho và có chút hứng thú vì nó thực sự liên quan đến cái nghiệp của mình. Bản chất tốt bụng lại nhiệt tình mình đồng ý giúp nó ngay. Tắt máy và suy nghĩ để giải quyết bài toán trên thôi. Đầu tiên là cứ phải search Google đã xem có thông tin gì không. Sau khi quần thảo Google thì có vẻ như không có nhiều thông tin khớp với yêu cầu bài toán. Nhưng cũng có ra đc 2 idea giải quyết vấn đề như sau: 
* Suy nghĩ thông thường nhất: Tạo 1 server, dựng 1 con cronjob để hàng ngày chạy và thực hiện tải file Google Sheets đó về đồng thời gửi vào mail như yêu cầu. Cách này tiếp cận bài toán chắc ai cũng nghĩ ra nhưng nếu để thực hiện 1 việc con con mà lại mất quá nhiều tài nguyên và công sức như vậy thì quả thật không đáng.
* Suy nghĩ cao cấp hơn 1 chút: Thử nghĩ xem Google Sheets tự bản thân nó có chức năng nào có thể hỗ trợ yêu cầu bài toán không. Câu trả lời là không. Tuy nhiên theo chút manh mối tìm kiếm ở trên thì cho mình một idea: Google có một trợ thủ đắc lực có thể có khả năng làm được điều này đó là: Google Apps Script. Vậy Google Apps Script là gì mà nghe nguy hiểm quá vậy?? :joy: Thật may là mình đã có 1 bài viết tìm hiểu về cái này. Anh em có thể xem nó ở đây:[ Google Apps Script có gì hay ho?!](https://viblo.asia/p/google-apps-script-co-gi-hay-ho-07LKX2xElV4) Đọc xong nhớ upvote nhé =)) 

Như vậy đã xong bước phân tích yêu cầu và tìm hướng giải quyết. Bước tiếp theo là chọn cách giải quyết và đào sâu tìm hiểu về nó. Đương nhiên là mình chọn hướng suy nghĩ thứ 2 rồi. Vậy để xem Google Apps Script có giúp được mình trong trường hợp này không nhé?? Let's go!  ;)

# Giải quyết bài toán
Nếu đọc bài viết ở trên của mình thì chắc hẳn các bạn cũng mường tượng được cách thức và cơ chế hoạt động của Google Apps Script rồi đúng không. Nhưng mình vẫn xin phép giới thiệu qua 1 chút. Google Apps Script mà cụ thể trong trường hợp này nó là một đoạn mã có thể giúp người phát triển tùy biến các tính năng và viết thêm chức năng cho Google Sheets. Ví dụ bạn có thể thêm 1 hàm tính toán phức tạp, thêm 1 menu... Trong trường hợp này là mình thêm chức năng đặc biệt: hẹn giờ gửi mail tự động. 

Đầu tiên vẫn phải làm 1 bài Hello World với script trong Sheets để hiểu nó hoạt động như nào đã. Mình thì chả có file GoogleSheets chứa thông tin quan trọng hay bảo mật gì đâu nên lấy tạm file tính tiền điện nhân dịp điện tăng giá: https://docs.google.com/spreadsheets/d/1YnodpvMcgZQ-o5xnATAlY6kUpUcrbsk7dnEu2h7WadI/edit?usp=sharing 

![](https://images.viblo.asia/db722cac-95a9-4f2a-aebf-5aab6e65dffe.jpg)

Giờ ta thử viết 1 đoạn mã lệnh cơ bản để thao tác với Google Sheets xem nhé. Ví dụ viết 1 đoạn mã để khi bắt đầu mở file thì tự động thêm 1 cái menu chẳng hạn. =)) Đầu tiên để viết mã cho file Google Sheets này ta vào Công cụ => Trình chỉnh sửa tập lệnh. Mở ra giao diện để soạn code. Ta soạn code như sau: 
```javascript
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('Custom Menu')
      .addItem('First item', 'menuItem1')
      .addToUi();
```
Chạy lên ta có kết quả menu như sau:
![](https://images.viblo.asia/498da7e6-a4a4-4661-b35f-0c80d42db49f.png)
Hoặc thử 1 đoạn code khác. Set background màu vàng và kiểu chữ nghiêng cho ô Tổng hóa đơn:
```javascript
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var cell = sheet.getRange('A12:E12');
  cell.setFontStyle('italic');
  cell.setBackground('yellow');
}
```
Kết quả:

![](https://images.viblo.asia/e4021e2b-dfcb-4341-9032-f68fb77bd188.png)

***Note:*** Hàm onOpen là 1 trigger của Apps Script dành cho Sheets. Code trong hàm này sẽ tự động chạy khi bạn mở file Google Sheets. Để tìm hiểu thêm về các trigger trong Apps Script mời bạn xem tại đây https://developers.google.com/apps-script/guides/triggers/

Xong Helloworld, quay trở lại bài toán ban đầu. Sau quá trình nghiên cứu tìm cách giải quyết mình đã tìm được một công cụ đắc lực trong Apps Script giúp chúng ta giải quyết bài toán đó là **Time-driven triggers**. Đơn giản Time-driven triggers giống như Cron-job trong Unix. Time-driven triggers cho phép các tập lệnh được kích hoạt trong một thời điểm cụ thể hoặc trong một khoảng thời gian định kì, thường xuyên như mỗi phút hoặc không thường xuyên mỗi tháng 1 lần. Thời gian có thể được ngẫu nhiên một chút - ví dụ: nếu bạn tạo trình kích hoạt 9 giờ sáng định kỳ, Apps Script chọn thời gian từ 9 giờ sáng đến 10 giờ sáng, sau đó giữ thời gian đó nhất quán từ ngày này sang ngày khác để 24 giờ trôi qua trước khi kích hoạt lại. 

Ví dụ cơ bản về Time-driven trigger:
```javascript
function createTimeDrivenTriggers() {
  // Trigger every 6 hours.
  ScriptApp.newTrigger('myFunction')
      .timeBased()
      .everyHours(6)
      .create();
}
```
Code này sẽ kích hoạt hàm myFunction mỗi 6 giờ một lần.

Như vậy ta đã có phương pháp giải quyết bài toán: Thực hiện hẹn giờ định kì mỗi ngày 1 lần sẽ tự động tải file backup và gửi về email. Mình sẽ dự định làm nó như sau:
1. Tạo 1 custom menu là "Hẹn giờ gửi email"
2. Mở ra 1 popup cho phép nhập mail vào đồng thời hiển thị trạng thái hiện tại có đang được kích hoạt hay không
3. Có button để cho phép Hẹn giờ hoặc hủy hẹn giờ theo yêu cầu

Hiện thực hóa nó thôi:

Đầu tiên ta thêm 1 file Page.html để làm cái popup như trên:
```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" >
  </head>
  <body style="padding: 2px;">
    <form>
    <div class="form-group">
    <label for="exampleInputPassword1">Trạng thái</label>
    <p class="form-control-plaintext text-success <?= status ? '' : 'd-none' ?>"><i class="fa fa-check"></i> Đã kích hoạt</p>
    <p class="form-control-plaintext text-info <?= status ? 'd-none' : '' ?>"><i class="fa fa-times"></i> Chưa kích hoạt</p>
  </div>
  <br />
  <div class="form-group">
    <label for="exampleInputEmail1">Nhập email cần gửi đến</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" value="<?= yourEmail ?>">
    <small id="emailHelp" class="form-text text-muted">Hệ thống sẽ tự động tạo bản sao file và gửi vào mail lúc 23h hàng ngày</small>
  </div>
  
  <button type="button" class="btn btn-success btn-sm btn-setting"><span class="spinner-border spinner-border-sm d-none loading-setting" role="status" aria-hidden="true"></span> Hẹn giờ</button>
  <button type="button" class="btn btn-danger btn-sm btn-clear-setting" <?= status ? '' : 'disabled' ?>><span class="spinner-border spinner-border-sm d-none loading-clear" role="status" aria-hidden="true"></span> Hủy hẹn giờ</button>
</form>
    
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script>
      $(function() {
        $('.btn-setting').click(function() {
          $('button').attr('disabled', true);
          $(this).find('.loading-setting').removeClass('d-none');
          google.script.run.withSuccessHandler(successEvent).setting(document.getElementById('email').value);
        });
        
        $('.btn-clear-setting').click(function() {
          $('button').attr('disabled', true);
          $(this).find('.loading-clear').removeClass('d-none');
          google.script.run.withSuccessHandler(successEvent).clearSetting()
        });
        function successEvent() {
          $('.btn-setting').find('.loading-clear').addClass('d-none');
        }
      });
    </script>
  </body>
</html>
```

Tiếp theo là file code.gs xử lý logic:
```javascript
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('Hẹn giờ gửi email')
      .addItem('Cài đặt', 'showDialog')
      .addToUi();
  
}

function showDialog() {
  var html = HtmlService.createTemplateFromFile('Page');
  
  var myData = PropertiesService.getUserProperties();
  Logger.log(myData.getProperties());
  var status = myData.getProperty('status');
  html.yourEmail = Session.getActiveUser().getEmail();
  html.status = parseInt(status);
  
  var htmlOutput = html.evaluate()
      .setWidth(500)
      .setHeight(300);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(htmlOutput, 'Cài đặt hẹn giờ gửi email');
}

function sendEmail() {
  var sheet = SpreadsheetApp.getActive();
  var fileName = sheet.getName();
  
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + sheet.getId() + "&exportFormat=xlsx";
  var params = {
    method      : "get",
    headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true
  };
  var blob = UrlFetchApp.fetch(url, params).getBlob();
  
  blob.setName(sheet.getName() + '_' + Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "dd-MM-yyyy HH:mm") + ".xlsx");
    
  // Send email
  var myData = PropertiesService.getUserProperties();
  var email = myData.getProperty('email');
  var subject = "Gửi file " + fileName + " tự động";
  var message = "File đính kèm bên dưới";
  MailApp.sendEmail(email, subject, message, {attachments: [blob]});
}

function setting(email) {
  var myData = PropertiesService.getUserProperties();
  var status = myData.getProperty('status');
  
  status = 1;
  
  myData.setProperty('status', status);
  
  myData.setProperty('email', email);
  
  deleteTrigger();
  ScriptApp.newTrigger('sendEmail')
   .timeBased()
   .atHour(23)
   .everyDays(1)
   .create();
  
  
  SpreadsheetApp.getUi().alert('Cài đặt hẹn giờ gửi mail thành công');
}

function clearSetting() {
  var myData = PropertiesService.getUserProperties();
  var status = myData.getProperty('status');
  
  status = 0;
  
  myData.setProperty('status', status);
  
  deleteTrigger();
  SpreadsheetApp.getUi().alert('Hủy hẹn giờ gửi mail thành công');
}


function deleteTrigger() {
  // Loop over all triggers.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

```

Giải thích một chút về đoạn code trên:
* Khi click vào menu cài đặt thì sẽ dùng hàm `showDialog` để mở popup cài đặt
* Để lưu lại trạng thái của cài đặt ta sẽ dùng đến 1 service trong Google Apps Script giống như Redis để lưu thông tin gọi là `PropertiesService` https://developers.google.com/apps-script/reference/properties/properties-service?hl=vi
* Khi click hẹn giờ thì ta sẽ chạy hàm setting để thay đổi trạng thái của cài đặt hẹn giờ đồng thời sẽ kích hoạt trigger `sendEmail` và thực hiện nó định kì mỗi ngày 1 lần vào lúc 23h
* Để tải file Google Sheets xuống ta dùng service `UrlFetchApp`

Giờ thử xem thành quả thôi nào:
![](https://images.viblo.asia/8d80aebd-7977-4581-bffc-8d8fb495fa59.png)

Thử click hẹn giờ và chờ đợi điều kì diệu xảy ra. Mà để đợi đến đêm thì lâu quá chỉnh sửa lại code cho chạy mỗi phút 1 lần để nhìn thấy luôn thành quả =))

![](https://images.viblo.asia/baafbc6b-41c5-4c65-8f84-b24adcaf2621.png)

![](https://images.viblo.asia/ebba697b-5690-4b19-8d2f-3dc8228296e5.png)

Ngon rồi anh em ạ. Cầm máy gọi ngay cho thằng bạn để đòi nó 1 bữa beer thôi. :stuck_out_tongue_winking_eye:

# Kết bài
Dựa vào bài toán đề ra ta mới thấy Google Apps Script có thể mở rộng ra nhiều bài toán hơn ví dụ như Hẹn giờ gửi mail cho 1 danh sách người dùng trong 1 sheet...vv Bạn hãy thử đề ra 1 bài toán và giải quyết nó bằng Google Apps Script xem sao nhé. Ngoài ra không chỉ Google Sheets mà Google Apps Script còn hỗ trợ chúng ta trong tất cả các ứng dụng nằm trong hệ sinh thái Google: Calendar, Docs, Drive, Gmail, Sheets, and Slides. Vì vậy nếu bạn có 1 yêu cầu đặc biệt nào đó với các dịch vụ Google thì hãy tìm đến Google Apps Script. Cảm ơn các bạn đã theo dõi bài viết. (bow)

Tham khảo: 
* [Apps Script ](https://developers.google.com/apps-script/)
* [Tutorial: Sending emails from a Spreadsheet](https://developers.google.com/apps-script/articles/sending_emails)