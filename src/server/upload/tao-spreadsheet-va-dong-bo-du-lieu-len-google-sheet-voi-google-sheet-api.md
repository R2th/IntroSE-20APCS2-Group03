# Giới thiệu
Google Sheets là một ứng dụng trang tính dựa trên nền tảng web. Nó cho phép lưu trữ và tổ chức thông tin như là Microsoft Excel. Trong khi Google Sheets không thể cung cấp tất cả các tính năng nâng cao như Excel, nó khá dễ dàng để tạo và chỉnh sửa các trang tính từ đơn giản đến phức tạp.

Google Sheets API cho phép chúng ta có thể sửa và đọc bất các thành phần của spreadsheet. Spreadsheets có rất nhiều cài đặt hỗ trợ làm đẹp cho nó và các sheet chức năng, vậy API cũng có rấy nhiều các sitting đó. API cung cấp 2 cách để tương tác với các Spreadsheet:
* Đọc/ghi các giá trị cell(thông qua spreadsheets.values [https://developers.google.com/sheets/reference/rest/v4/spreadsheets.values](https://developers.google.com/sheets/reference/rest/v4/spreadsheets.values))
* Đọc/ghi bất kỳ aspect nào của spreadsheet (thông qua các spreadsheets [https://developers.google.com/sheets/reference/rest/v4/spreadsheets](https://developers.google.com/sheets/reference/rest/v4/spreadsheets))

Bạn có thể xem thêm thông tin về các bộ sưu tập và cách sử dụng của chúng thông qua những hướng dẫn develop sau đây: [https://developers.google.com/sheets/api/guides/concepts](https://developers.google.com/sheets/api/guides/concepts)

 Hôm nay chúng ta sẽ cùng tìm hiểu cách thức tạo trang google tuyến tính và đồng bộ dữ liệu trang web lên đó nhé !

# Cài đặt
Để có thể kết nối trang web với Google Sheets chúng ta cần tạo **Key** và **Client_id** để tiến hành xác thực tài khoản google. Để làm được điều này trước hết chúng ta cần:
1. **enable** Sheets API tại [https://console.developers.google.com/apis/library](https://console.developers.google.com/apis/library), tìm kiếm từ khóa **"sheets"** ,chọn **"Google Sheets API"** và click **enable**
![](https://images.viblo.asia/045f935a-d3b6-4f1c-beb4-ece61567059d.png)
2. Tới trang [https://console.developers.google.com/projectcreate](https://console.developers.google.com/projectcreate) để tạo **project** mới
3. Tới trang [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials) -> chọn **project** của bạn và tạo **API key** và OAuth client id :

Edit API key như sau:
![](https://images.viblo.asia/6bd6c47c-2996-4d0f-b028-e1ccd2dc111d.png)
 
4.  Vào OAuth consent screen -> chọn **Application type** **public** , điền **Application name**, chọn **Support Email** và điền **Authorized domains** chính là domain gốc trang web của bạn (ví dụ abc.com) và **Save lại**.
![](https://images.viblo.asia/356cd8dc-ad29-4644-8abf-f96593df9322.png)

5. Tạo OAuth client id lần lượt: Chọn Web Application -> điền đầy đủ Name, Authorized JavaScript origins, Authorized redirect URIs (đối với Authorized JavaScript origins và Authorized redirect URIs  điền đầy đủ link trang web của bạn, **trường hợp test local thì điền link local ví dụ như http://localhost:8000**)
![](https://images.viblo.asia/e00d3553-6430-412a-81e6-6620fec3074e.png)

# Tạo và đồng bộ SpreadSheets
## Tạo SpreadSheets
Đầu tiền, trong trang html của bạn thêm dòng này giúp mình nhé:`<meta name="google-signin-client_id" content="your-client-id">`

Các bạn truy cập trang https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create . Ở đây đã có hết code mẫu dùng cho việc tạo SpreadSheets rồi nhé. Ban chỉ cần lấy ra dùng thôi :grinning:

1. Tạo button: `<button onclick="handleSignInClick()">Đồng bộ</button>`
2. Import thêm thư viện:`<script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>`
3. Bạn cần khởi tạo **function initClient()** để xác thực người dùng trước khi thao tác với Google Sheets
```
function initClient() {
      var API_KEY = 'YOUR-API-KEY';
      var CLIENT_ID = 'YOUR-CLIENT-ID';
      var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

      gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

    function updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        createSheet();
      }
    }

    function handleSignInClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }
```

3. Sau khi xác thực thì chúng ta sẽ tạo SpreadSheets:
```
function createSheet() {
      var spreadsheetBody = {
        "properties": {
            "title": "YOUR-SHEET-NAME",
        },
      };

      var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
      request.then(function(response) {
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
```

Kết quả trả về (response.result) sẽ có đầy đủ thông tin của SpreadSheet vừa được tạo: spreadsheetId, spreadsheetUrl, ....
## Đồng bộ với Sheet 
Tương tự như phần tạo SpreadSheets chúng ta chỉ cần khởi tạo function syncToSheet và lấy code từ trang https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update 
```
function syncToSheet() {
      var params = {
        spreadsheetId: 'YOUR_SPREADSHEET_ID', //bạn lấy từ response.result lúc createSheet thành công
        range: 'YOUR_SHEET_NAME',  //chính là title bạn khai báo lúc tạo SpreadSheet
        valueInputOption: 'RAW', 
      };

      var valueRangeBody = { //data bạn cần đồng bộ
         "values": [
            ['STT', 'Name', 'Age'],
            ['1', 'Nguyễn A', 12],
            ['2', 'Phan B', 13]
        ]
      };

      var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
      request.then(function(response) {
        console.log(response.result);
      }, function(reason) {
        console.error('error: ' + reason.result.error.message);
      });
    }
```

Bạn chỉ cần gọi lại function syncToSheet sau khi createSheet thành công là xong
> Đây là trường hợp script viết trong file html. Nếu như bạn muốn tách riêng 2 file html và js thì bạn cần thay đổi sự kiện onclick cho **button Đồng bộ** và thay thư viện script đã import phía trên bằng: `<script src="https://apis.google.com/js/platform.js?onload=handleClientLoad"></script>`

Và đây là kết quả:
![](https://images.viblo.asia/3dc867c6-4443-450b-947e-75613706a150.png)
Chúc các bạn thành công !

**Nguồn tham khảo:** https://developers.google.com/sheets/api/reference/rest/