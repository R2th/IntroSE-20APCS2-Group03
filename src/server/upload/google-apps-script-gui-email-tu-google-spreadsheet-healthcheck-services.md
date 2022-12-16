Đây là bài viết tiếp theo thuộc danh sách các bài viết giới thiệu và ứng dụng Google Apps Script(GAS).

Với GAS chúng ta có thể sử dụng rất nhiều dịch vụ của hệ sinh thái Google, trong đó có [Gmail Service](https://developers.google.com/apps-script/reference/gmail/). Dịch vụ này cho phép bạn gửi email, soạn thư nháp, quản lý nhãn, đánh dấu thư và chuỗi và thực hiện nhiều tác vụ quản lý tài khoản Gmail khác.

Trong bài viết này tôi sẽ hướng dẫn sử dụng [Mail service](https://developers.google.com/apps-script/reference/mail) để thực hiện gửi mail vào những địa chỉ email khác, là một phần của ứng dụng **Healthcheck services**

# Mail service
Các bước để bắt đầu làm việc với GSA các bạn có thể đọc lại [bài viết này](https://viblo.asia/p/google-apps-script-hien-thi-thong-tin-thoi-tiet-trong-google-sheet-4dbZN7DglYM).

Mặc định là các bạn có thể hoàn thành những bước để chúng ta có thể bắt đầu "viết code".

Phương thức được sử dụng để gửi một email tới là `sendEmail` thuộc class **[MailApp](https://developers.google.com/apps-script/reference/mail/mail-app#sendEmail(String,String,String))**

```javascript
/**
* emailAddress String The addresses of the recipients, separated by commas
* subject      String The subject line
* message      String The body of the email
**/
function sendEmails(emailAddress, subject, message) {
  try {
    MailApp.sendEmail(emailAddress, subject, message);
  } catch (err) {
    Logger.log(err)
  }
}
```

Chúng ta sẽ thử gửi một email (GSA sẽ sử dụng quyền `Send email as you` trên tài khoản Google của bạn)

![](https://images.viblo.asia/ea7a7e64-bd47-4450-827b-1deba76ebdb1.png)

Với cấu hình gửi mail như trên, kết quả nhận được sẽ là:
![](https://images.viblo.asia/9d8dbdfd-56ea-4140-87ec-b8dc933eb191.png)

Tài khoản gửi tới sẽ là tài khoản Google của bạn.

# Healthcheck services
Chúng ta sẽ xây dựng một ứng dụng giúp theo dõi trạng thái (online-offline) của các dịch vụ http.

**Ý tưởng:** Chúng ta sẽ có một danh sách các dịch vụ cần theo dõi, và một danh sách các email của những người liên quan. Ứng dụng sẽ gửi mail vào email của những người liên quan khi có một dịch vụ không online.

![](https://images.viblo.asia/b7cb56ce-4e89-4fbc-a865-e0e416aa7c4b.png)

Đầu tiên là lấy dữ liệu cần thiết trên sheet
```javascript
    var sheet = SpreadsheetApp.getActive().getSheetByName('Healthcheck');
    var values = sheet.getDataRange().getValues();

    var serviceEndpoints = [];
    var maintainers = sheet.getRange("B2").getValue();

    for(var i = 1; i < values.length; i++) { // Bỏ qua header
        serviceEndpoints.push(values[i][0]) // Lấy dữ liệu ở cột "A" của từng dòng
    }
```

Tiếp theo là kiểm tra trạng thái của từng service trong mảng `serviceEndpoints`, nếu dịch vụ nào không phản hồi, chúng ta sẽ gửi email cho những người có liên quan.
```javascript
    var response = UrlFetchApp.fetch(endpoint, {muteHttpExceptions: true});
    if(response.getResponseCode() != 200) {
      sendEmails(maintainers, 'Issue with service', 'Endpoint: ' + endpoint + '\nStatus: ' + response.getResponseCode() + '\nResponse: ' + response.getContentText()); 
    }
  });
```

Trong ví dụ các dịch vụ, mình có để 2 dịch sẽ trả về các mã lỗi lần lượt là `400` và `500` => Nội dung email nhận được sẽ là:

![](https://images.viblo.asia/9d19a862-4d15-460a-8e9e-2b891adfbcfd.png)

![](https://images.viblo.asia/7d44d7ca-4c64-4b57-bbf7-511956f6eefd.png)

Nội dung của file `Code.gs`
```javascript
function healthCheckServices() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Healthcheck');
  var values = sheet.getDataRange().getValues();
  
  var serviceEndpoints = [];
  var maintainers = sheet.getRange("B2").getValue();
  
  for(var i = 1; i < values.length; i++) {
    serviceEndpoints.push(values[i][0])
  }
  
  serviceEndpoints.forEach(function(endpoint) {
    var response = UrlFetchApp.fetch(endpoint, {muteHttpExceptions: true});
    if(response.getResponseCode() != 200) {
      sendEmails(maintainers, 'Issue with service', 'Endpoint: ' + endpoint + '\nStatus: ' + response.getResponseCode() + '\nResponse: ' + response.getContentText()); 
    }
  });
}

/**
* emailAddress String The addresses of the recipients, separated by commas
* subject      String The subject line
* message      String The body of the email
**/
function sendEmails(emailAddress, subject, message) {
  try {
    MailApp.sendEmail(emailAddress, subject, message);
  } catch (err) {
    Logger.log(err)
  }
}
```

**!!!** Bước cuối cùng là đặt lịch cho việc tự động kiểm tra trạng thái dịch vụ mỗi phút 1 lần

![](https://images.viblo.asia/4716a24a-4cfc-4db2-825c-c4ad08f9c30c.png)

(Ngoài cách thêm trigger như trên, chúng ta cũng có thể thêm các trigger bằng "code")

# Kết luận
Làm việc với GAS và các dịch vụ của Google có rất nhiều điều thú vị, hy vọng sau bài viết này các bạn sẽ có thêm các ý tưởng để xây dựng các ứng dụng của mình.

Link trang tính cho bài viết: https://docs.google.com/spreadsheets/d/1Coj8IQDASeGXnaLBkQjm6P-cUax9-nkP_NXtnxt6I98/edit?usp=sharing 
(Các bạn có thể tạo bản copy từ trang tính này, ở trang tính này mình đã xoá trigger)