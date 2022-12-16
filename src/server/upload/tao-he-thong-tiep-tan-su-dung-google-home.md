Hiện nay có nhiều công ty Nhật đưa vào  sử dụng hệ thống tiếp tân thông qua sử dụng iPad.
Lần này chúng ta sẽ cùng thử bằng cách khác thông qua sử dụng Google Home và một số service khác .


Kết quả là những thông tin của người đến thăm sẽ được lưu vào Spreadsheet và có noti và bắn tới Slack báo cho những thành viên trong nhóm Slack việc có khách tới thăm công ty và ra tiếp đón. 

# Hiện trạng
Trước đây với cách sử dụng giấy và chuông để báo với nhân viên viên của một công ty nào đó ra đón mỗi khi có khách đến thăm công ty. 


Các step thường là điền những thông tin của cá nhân và công ty sau đó bấm chuông thì sẽ có nhân viên ra tiếp đón. 


Thay vì như vậy, chúng ta hãy cùng sử dụng GoogleHome để thực hiện nhiệm vụ này. 
![](https://images.viblo.asia/6bdd577e-7e81-4989-97c2-25beab9e913d.png)

# Sơ đồ cấu trúc
![](https://images.viblo.asia/98566164-86af-499e-8e1f-b53371bd1547.png)


# Chi phí đầu tư
Chỉ với vài trăm K là chúng ta đã có trong tay 1 em Google Home . Ngại ngần gì mà ko đầu tư ngay ạ. 
![](https://images.viblo.asia/2124a2e4-51cf-4b21-a247-16d4ea766283.png)

# Step
## 1. Register công thức vào IFTTT
Đầu tiên chúng ta cần register công thức để Google Home có thể đối ứng bởi IFTTT.
Select Google Assistant.
![](https://images.viblo.asia/b0950888-db5d-4f66-9542-4fe74b61b4bb.png)

### ■ Input vào Complete trigger fields
Nhập vào 受付(tiếp tân) GGH sẽ đối ứng tương ứng với Key này. 

![](https://images.viblo.asia/7ab2d95d-b471-4b82-9954-335ed1e0be16.png)

Đến đây bạn chỉ cần nói 「OK! Google 受付 株式会社◯◯の名前」「OK! Gu gồ tôi là ◯◯ đến từ công ty XYZ」 thì thông tin sẽ được record lại .

### ■ Input Update cell in spreadsheet
![](https://images.viblo.asia/4e9e1b4a-fb80-4108-8874-fab2acddbe1b.png)


Which cell: Chọn B2 là cell muốn write.
![](https://images.viblo.asia/7180c9ed-47c6-4a94-8abd-d8e9a9624af3.png)

## 2. Talk với Google Home
## 3. Edit spreadsheet của Google Drive
Thêm vào sheet "Khách tới thăm" vào thư mục IFTTT.
![](https://images.viblo.asia/a00fe4c3-b35c-4338-8a16-8996cae0a6f9.png)

### ■ Add Script
Click vào Script editor trong tool và thêm script vào.
![](https://images.viblo.asia/b112def4-ecfe-4f3b-968a-5e643066fcfa.png)

### ■ Edit Script
Từ Google Home thì thông thường data sẽ được update ở cell B2. 
```
function showStatus() {
  var mySheet = SpreadsheetApp.getActiveSheet();      // get sheet
  var currentRow = mySheet.getActiveCell().getRow();  // get dòng được update
  var myCell = mySheet.getActiveCell();               // get cell active

  if(myCell.getColumn() == 2) { // Check có phải là cột số 2 hay ko（Trường hợp spreadsheet sẽ là hàng B）
    // Ngày tháng update sẽ được ghi vào A1
    var updateRange = mySheet.getRange('A' + currentRow);
    updateRange.setValue(Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/M/d H:m:s'));

    var text = myCell.getValue() + '様が来訪されました'; // Ngài... đã đến thăm công ty
    slackPost();    

    // Thêm dòng mới
    mySheet.insertRowBefore(2);

  }

  function slackPost() {
  var url        = 'https://slack.com/api/chat.postMessage';
  var token      = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  var channel    = '#チャンネル名'; // Tên Channel 
  var username   = '来訪通知';     // Báo có khách đến thăm 
  var parse      = 'full';
  var icon_emoji = '';
  var method     = 'post'; 
  var payload = {
    'token'      : token,
    'channel'    : channel,
    'text'       : text,
    'username'   : username,
    'parse'      : parse,
    'icon_emoji' : icon_emoji
  };
  var params = {
    'method' : method,
    'payload' : payload
  };
  var response = UrlFetchApp.fetch(url, params);
  }
}
```
### ■ Get token của Slack
Trong đoạn script có note get token của Slack.
https://api.slack.com/custom-integrations/legacy-tokens
![](https://images.viblo.asia/22c769e5-4520-49ab-9b4d-faabf519e28c.png)

### ■ Rigister trigger run script
Sau khi value của Spreadsheet được update thiến hành run đoạn script này. 
![](https://images.viblo.asia/a65d7780-82aa-43b0-b3b0-2997ce91a518.png)

Trigger của project hiện tại. 
![](https://images.viblo.asia/aa2386fc-b822-457b-8e2a-99cd72bb92e5.png)


### ■ Ví dụ về Record
Sau khi thực hiện các step trên, thì thực tế sẽ có noti như sau : 
![](https://images.viblo.asia/4aa83ae5-a97c-43a3-ba05-6778d5560b5f.png)
Đúng như format chúng ta đã set ở trên: 


Với username : 来訪通知


Nội dung : myCell.getValue() + '様が来訪されました'

Nội dung của GGsheet sẽ auto được update như sau : 
![](https://images.viblo.asia/3e070eda-9985-46de-9bb5-ec20f8aafec8.png)


Như source trên, ngày tháng sẽ được update vào cột A, tương ứng với nội dung KH talk ở cột B.


Dữ liệu mới sẽ luôn được insert vào A2 và B2 tương ứng. 

# Video demo
https://twitter.com/gaomar/status/938296234699296768?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E938296234699296768&ref_url=https%3A%2F%2Fqiita.com%2Fh-takauma%2Fitems%2F4ecc3421f2995b207284

Note: Bài viết được dịch từ nguồn

https://qiita.com/h-takauma/items/4ecc3421f2995b207284#-complete-trigger-fields%E3%81%AB%E5%85%A5%E5%8A%9B