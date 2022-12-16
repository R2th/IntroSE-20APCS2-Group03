![](https://images.viblo.asia/38bc9dbd-357a-418b-8861-aad22859fe7e.jpg)


Chào các bạn!

Hôm rồi mình có làm 1 dự án khá là thú vì, có sự góp mặt của Firebase và Google Sheet trong đó.

Bài toán đặt ra là, chúng ta cần 1 nơi lưu dữ liệu miễn trí, có khả năng trúy vấn nhanh, để cung cấp cho các website, nhưng người có khả năng làm việc phía backend lại chỉ biết sử dụng google sheet, kiểu mấy bạn kế toán.

Lúc này mình nghĩ ngay tới Firebase, họ cung cấp database miễn phí, tuy có giới hạn băng thông truy cập cũng như lưu trữ, tuy nhiên với những gì free thì dự án này đã là dư thừa rồi.

Việc còn lại của chúng ta là làm sao đưa dữ liệu từ Google Sheet qua Firebase, và cần thiết có thể lấy dữ liệu từ Firebase đồng bộ lại vào Google Sheet.

Chú ý: mình có làm 1 vài bài hướng dẫn khá là chi tiết, kiểu cho người chưa có chút kinh nghiệm nào sử dụng các công cụ trong các bài viết, tuy nhiên bài này nếu viết vậy thì sẽ rất dài, vì vậy mình sẽ chỉ hướng dẫn phần chính thôi, những phần nhỏ nhỏ các bạn có thể inbox mình chỉ, hoặc google là ra. Cầm tay chỉ việc nhiều khi sẽ khiến chúng ta bị động mà không hiểu rõ được vấn đề ;)

OK! Let's go!

### Bước 1: Firebase Database Secret Key

- Để tăng tính bảo mật cho database, chúng ta sẽ giới hạn quyền truy cập vào nò, chính vì vậy để có đầy đủ quyền đọc và ghi database, chúng ta sẽ lấy Secret Key  để không bị giới hạn bởi bất cứ rule nào.
- Các bạn theo đường dẫn sau: Project Settings => Service Accounts => Database Secrets => ấn vào Secret => Show => Copy Secret.

![](https://images.viblo.asia/178f8d0c-dc7d-4632-8a6d-1366c033efa4.JPG)

### Bước 2: Add FirebaseApp

- Để có thể sử dụng được code trong Google Sheet, chúng ta sẽ sử dụng Google Script.
- Trong Goole Script chúng ta sẽ thêm thư viện FirebaseApp để hỗ trợ cho việc đọc dữ liệu ra.

![](https://images.viblo.asia/26745cd7-0207-45ad-b8bd-d3fc95ba17ba.JPG)

### Bước 3: Convert Data To Json

- Trước khi gửi dữ liệu qua Firebase chúng ta cần chuyển đổi dữ liệu trong Goolge Sheet thành dạnh json.

```
function ConvertDataGoogleSheetToJson() {
  //Get the currently active sheet
  var ss = SpreadsheetApp.getActiveSheet()
  var sheet = ss.getSheetByName("SHEET_NAME");
  //Get the number of rows and columns which contain some content
  var [rows, columns] = [sheet.getLastRow()-1, sheet.getLastColumn()]
  //Get the data contained in those rows and columns as a 2 dimensional array
  var data = sheet.getRange(1, 1, rows, columns).getValues();
  var jsonData = "[";
  var listHead = ["Head1","Head2"];
  for(var j = 0; j<data.length;j++) {
    var item = data[j];
    jsonData+="{"
    jsonData+="\""+listHead[0]+"\""+":"+"\""+item[1]+"\"";
    jsonData+=",";
    jsonData+="\""+listHead[1]+"\""+":"+"\""+item[5]+"\"";
    jsonData+="}";
    if(j<data.length-1) {
      jsonData+=",";
    }
  }
  
  jsonData+="]";
    return jsonData;
}
```

### Bước 4: Send Data To Firebase.

- Sau khi đã có Secret Key của Database, đã có dữ liệu Google Sheet dạng json, chúng ta sẽ đẩy nó qua Firebase Database để ghi lên.

```
function SendDataToFirebase(excelData, path) {
  /*
  We make a PUT (update) request,
  and send a JSON payload
  More info on the REST API here : https://firebase.google.com/docs/database/rest/start
  */
  var options = {
    method: 'put',
    contentType: 'application/json',
    payload: excelData
  }
  var fireBaseUrl = 'https://DATABASE_NAME.firebaseio.com/' +path +'.json?auth=' +secret;

  /*
  We use the UrlFetchApp google scripts module
  More info on this here : https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  */
  UrlFetchApp.fetch(fireBaseUrl, options)
}
```

### Bước 5: Get Data From Firebase.

- Trong quá trình sử dụng Firebase Database, các Website có cập nhật 1 số dữ liệu, và chúng ta cần đồng bọ nó cho Google Sheet.
- Chúng ta sẽ lấy dữ liệu từ trong Firebase Database và đồng bộ nó với Google Sheet như sau:

```
var firebaseUrl = "https://DATABASE_NAME.firebaseio.com/PATH";
  var data = FirebaseApp.getDatabaseByUrl(firebaseUrl,secret).getData();
  for (var i in data) {
    var item = data[i];
    // Write data item to cells/range value.
    
    }
  }
```

Như vậy mình đã hướng dẫn các bạn cách để đọc, ghi dữ liệu từ Google Sheet vào Firebase. Thật sự với những công việc văn phòng, với những website nội bộ, thì hẳn đây sẽ là 1 giải pháp giúp các bạn vừa có tốc độ nhanh như Google, vừa dễ sử dụng như Google Sheet, và đặc biệt là hoàn toàn miễn phí! Chúc các bạn thành công nhé ^_^