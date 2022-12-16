Tiếp theo bài trước, bài này mình sẽ hướng dẫn mọi người cách thứ 2 để thu thập dữ liệu từ form trên web về google sheet chỉ cần biết chút ajax và có file google sheet (tất nhiên :D)
> [Xem thêm Bài 1](https://viblo.asia/p/quan-ly-web-voi-google-sheet-thu-thap-thong-tin-tu-form-tren-website-ve-google-sheet-bai-1-RQqKLw1z57z)
# Tạo file response google sheet
## Bước 1: tạo các trường thông tin
Đầu tiên ta cần 1 file kết quả thu thập thông tin trước, và tất nhiên, các bạn chỉ việc vào Drive của mình và tạo 1 google spread sheet mới thôi :)

Tiếp theo, xác định các thông tin cần thu thập: Ở đây, mình sẽ thu thập tương tự form bài trước, đó là Email, Tên và Lời nhắn của người sử dụng. Giờ thì bạn cần viết tên các dữ liệu này vào hàng đầu tiên của bảng tính vừa tạo (hàng 1 nhé). Tên các dữ liệu này cũng sẽ chính là `name` của các input trong form bạn sẽ thu thập, nên cần phải đặt chính xác và dễ nhận biết nhé, thứ tự không quan trọng, mà quan trọng là phải khớp tên cột với `name` của input cho Form.
## Bước 2: Xử lý file google sheet này với vài script
Trên thanh công cụ của file google sheet, bạn hãy chọn `Tools/ Công cụ` -> chọn tiếp `Script editor/ Trình chỉnh sửa tập lệnh` như phía dưới:

![](https://images.viblo.asia/cdac3803-2b80-46eb-81ee-439d0c4a9b8a.png)

Giờ bạn đã được mở sang 1 trang mới, trông giống giống như sau:
![](https://images.viblo.asia/e90734cb-cfe9-471c-acde-6088d54d98c3.png)

Thế là bạn đã vào đến nơi để "xử lý" script cho google sheet của bạn rồi. Giờ viết lại toàn bộ đoạn mã như sau vào nhé:
```javascript
function doGet(e) {
    return handleResponse(e);
}

//  Cái sheet hồi nãy mới viết dùng để thu thập thông tin là gì thì điền tên nó vào đây nhé, mình viết vào Sheet1 
    var SHEET_NAME = 'Sheet1';
    var SCRIPT_PROP = PropertiesService.getScriptProperties(); // Tạo new property service

function handleResponse(e) {
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);  // wait 30 seconds before conceding defeat.
  
    try {
        // Chọn nơi để lưu data lấy về được (sheet1)
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        var sheet = doc.getSheetByName(SHEET_NAME);
    
        // Ở đây định nghĩa tên các input nằm hết trên hàng 1 nhé
        var headRow = e.parameter.header_row || 1;
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1; // Nhảy sang hàng tiếp theo
        var row = []; 
        // Lặp lại đến hết các cột trên đầu
        for (i in headers) {
            if (headers[i] == 'Timestamp') { // Nếu bạn có cột Timestamp lưu lại thời gian nhé
                row.push(new Date());
            } else { // Nếu không thì cứ dùng tên hàng đầu để lấy data
                row.push(e.parameter[headers[i]]);
            }
        }

        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        // return json success results
        return ContentService
            .createTextOutput(JSON.stringify({'result': 'success', 'row': nextRow}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch(e) {
    // Nếu lỗi báo lỗi trả về
        return ContentService
            .createTextOutput(JSON.stringify({'result': 'error', 'error': e}))
            .setMimeType(ContentService.MimeType.JSON);
    } finally { //release lock
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty('key', doc.getId());
}
```

Như đoạn script trên thì hàm `doGet()` sẽ là hàm xử lý lấy dữ liệu được gửi lên và lưu vào vị trí tương ứng trong google sheet. Giờ thì hãy `Save` lại đoạn mã trên với 1 cái tên, rồi chạy hàm `setup` nhé:
![](https://images.viblo.asia/054cff91-38d5-49e8-82e7-572ced951a90.png)

Khi chạy hàm này bạn sẽ được hỏi về cấp quyền cho ứng dụng, hãy cấp quyền cho nó nhé:
![](https://images.viblo.asia/794294ba-cf8a-4b2d-a276-8c7996b1c6bd.png)

Rồi xong, cài đặt đã xong, giờ bạn cần phải `Publish` ứng dụng vừa làm để bất kỳ form nào cũng có thể sử dụng đẩy dữ liệu về đây. Điều này tạo thuận lợi khi bạn có nhiều trang web nhưng cùng 1 mục đích thu thập thông tin. Khi đó chỉ cần truyền thêm tên web vào danh sách các biến gửi qua form là được :D

Trên thang công cụ, chọn `Publish/ Xuất bản`, chọn tiếp `Deploy as web app/ Triển khai dưới dạng ứng dụng web`
![](https://images.viblo.asia/058dc0c0-f01c-4de0-bf82-62493546387e.png)

2 Option cuối đặc biệt chú ý nhé, bạn cần cấp quyền đúng thì Ajax Script của bạn mới có quyền gửi dữ liệu vào đây được: Bạn phải chọn `Thực thi ứng dụng với tư cách chính bạn` và `Những người có quyền truy cập ứng dụng: Bất kỳ ai kể cả ẩn danh`.

![](https://images.viblo.asia/ea9bc25f-8956-4be1-836d-67a33a6169d6.png)

Giờ thì chọn `Triển khai/Deploy` thôi nhé :). Sau khi chạy 1 hồi, bạn sẽ nhận lại được 1 đoạn script như sau:

![](https://images.viblo.asia/a59a4d4b-444e-4bf5-a786-02c56de793e4.png)

Copy đoạn URL trên để tiếp theo sẽ dùng cho Ajax nhé.
# Đến lượt form HTML
Về form HTML chắc không cần nói nhiều, mọi người đều biết tạo rồi đúng không :D. Mình tạo mẫu 1 form sử dụng bootstrap như dưới đây nhé:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Google sheet Form</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="container">
        <form id="google-form" onsubmit="return sendForm();">
            <div class="form-group">
                <label for="email">Your Email:</label>
                <input type="email" class="form-control" id="email" name="email">
            </div>
            <div class="form-group">
                <label for="fullname">Your Full Name:</label>
                <input type="text" class="form-control" id="name" name="fullname">
            </div>
            <div class="form-group">
                <label>Your message:</label>
                <input type="text" class="form-control" id="message" name="message">
            </div>
            <button type="submit" class="btn btn-default" id="submit-form">Submit</button>
        </form>
    </div>
</body>
```

Ở đây nhớ chú ý `name` của các input đặt chính xác với các tên cột ở google sheet mà mình đã nhắc từ đầu nhé

# Giờ tới xử lý Gửi dữ liệu với JS
Để việc gửi và nhận phản hồi dữ liệu nhanh hơn, mình sẽ sử dụng Ajax để tránh việc load lại trang nhé:
```javascript
function sendForm() {
    // đem tất cả dữ liệu trong form id là 'google-form' gom thành biến data
    let data = $('#google-form').serialize();

    $.ajax({ //Sử dụng Ajax gửi dữ liệu đi
        url: 'https://script.google.com/macros/s/AKfycbzply1R8l2-doZk3W32MoF2EfMDa8chgaibF8jTpRcfeNPzdSM/exec',
        method: 'GET',
        dataType: 'json',
        data: data,
        success: function(responseData, textStatus, jqXHR) {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    window.jQuery(this).trigger('reset');
    alert('Success!');

    return true;
};
```

Giờ các bạn có thể thử gửi dữ liệu đi rồi đấy :D. Với sheet của mình, mình có đặt thêm cột TImestamp để lưu lại ngày thêm dữ liệu, kết quả như sau:

![](https://images.viblo.asia/3219f6a1-47e9-449d-9e62-8d04be387bbd.png)

Như các bạn thấy là nó chỉ hiển thị ngày, nhưng đưa chuột chọn vào ô là hiển thị rõ ràng cả giờ giấc luôn nhé :D

# Kết
Trên đây là 2 cách gửi dữ liệu từ web sang google sheet mà không cần ngôn ngữ lập trình backend nào, cũng không cần động tới Google API luôn, thời gian tới mình sẽ tiếp tục nghiên cứu cách quản lý web site bằng google sheet, để nhẹ nhàng đỡ mất công cài đặt cơ sở dữ liệu. Mong là có thể viết thêm vài bài nữa thành series cho các bạn thích sự tối giản và ... lười như mình tham khảo :D