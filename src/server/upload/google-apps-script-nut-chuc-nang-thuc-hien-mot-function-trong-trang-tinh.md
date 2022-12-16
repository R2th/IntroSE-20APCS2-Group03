Nếu các bạn đã từng quen làm việc với Excel, có thể các bạn đã từng sử dụng chức năng "Thêm một button trong trang tính, khi click vào button thì thực hiện chạy một Macro hoặc một hàm VBA". Đây làm một tính năng rất hay của Excel.

Thật may là Trang tính google cũng cung cấp cho chúng ta một tính năng tương tự.

Nếu bạn là người bắt đầu với **Google App Script(GAS)**, hãy tìm đọc những bài viết trước của tôi trên Viblo.

Trong bài viết này, mình sẽ trình bày cách thêm các **nút** chức năng vào trang tính, chức năng này sẽ là các hàm được viết bởi GAS. Ứng dụng ngay với một vài hàm chức năng đơn giản.

# Tạo nút chức năng cho trang tính
Thực sự thì việc tạo một nút chức năng dễ dàng hơn nhiều so với việc chúng ta thêm các **Custom UI menu** như ở các bài viết trước mình hướng dẫn.

Việc thêm một nút chức năng sẽ gồm 3 bước:
## 1. Chèn button vào trang tính
Bạn phải thêm một đối tượng "ảnh" có thể click được - coi như một button vào trang tính.

Có 2 cách để thêm một nút trong trang tính:

* Chèn một ảnh(Image)
* Tự vẽ một ảnh(Drawing)

(Trong bài viết này mình sẽ sử dụng cách `Chèn vào một ảnh`. Mình sẽ lấy ảnh con Pikachu làm ví dụ, hy vọng mọi người sẽ thích (len)).

Trên menu top của Trang tính chọn **Insert > Image** or **Insert > Drawing**.

![](https://images.viblo.asia/9c2174dd-a18d-48db-b6d0-f3fb263d7f58.png)

Có rất nhiều cách để nhúng một ảnh vào trang tính, bạn có thể tải ảnh lên, thêm từ URL,... thậm chí là tìm kiếm luôn bằng công cụ tìm kiếm.

![](https://images.viblo.asia/36173748-4cfa-43b2-9d4f-10065ec79240.png)


Việc tạo một Button bằng cách tự vẽ (Drawing) cũng rất đơn giản. Chỉ cần tạo ra hình dáng button mà bạn muốn sau đó thì nhấn **Save & Close** để sử dụng hình vẽ đó. Lợi ích của việc bạn tự vẽ button bằng tay là bạn có thể viết mô tả ngắn ngọn chức năng mà button sẽ thực hiện vào ngay chính button.

Xong bước trên chúng ta đã có button ở trên trang tính. Tiếp theo chúng ta sẽ viết function mà button đó sẽ gọi tới khi được click.

## 2. Tạo GAS function
Để làm ví dụ, chúng ta sẽ làm đơn giản thôi. Chúng ta sẽ viết một function với tên hàm là `chooseYou`, hàm chỉ đơn giản là hiển thị một pop-up với thông điệp `"I Choose You!"`. Chúng ta sẽ nói tới những hàm có chức năng thú vị hơn ở phần dưới của bài viết.

Nội dung file `Code.gs`
```javascript
function chooseYou() {
  Browser.msgBox("I Choose You!");
}
```
Khá đơn giản phải khống, chúng ta lưu nó lại.

## 3. Gán `chooseYou` cho button
Chọn button - ảnh (Right-click), bạn sẽ thấy ở phái trên bên phải sẽ có một menu dropdown đơn giản.

Nhấn chọn **Assign script…**

![](https://images.viblo.asia/1c7e4155-e183-4d9f-b1f8-5636933fd078.png)

Sẽ có một pop-up hỏi bạn `What script do you want to assign?` hãy điền tên function mà bạn muốn sử dụng. Trong trường hợp này là `chooseYou`

![](https://images.viblo.asia/c2bf0a6e-ea63-428b-84fb-516ed8862bd3.png)

Khi bạn click vào ảnh sẽ có một message box hiển thị thông báo `I Choose You!`

![](https://images.viblo.asia/207c8da9-6792-4d4d-a178-e631849f9a4d.png)

**Nếu bạn muốn di chuyện button của bạn**, chuột phải vào button, button sẽ chuyển sang trạng thái "được chọn", bạn có thể kéo thả button tới nơi bạn muốn.

Đặt button trong một `frozen row` cũng là một ý tưởng hay khi bạn có một Trang tính lớn.

## Một số hàm hữu dụng cho button
- **Lấy ngày và giờ hiện tại**

    Nếu bạn sử dụng Trang tính để thực hiện các công việc liên quan tới tracking thời gian, ví dụ bạn phải biết chính xác thời gian mà bạn đã bắt đầu và kết thúc của một task. Trong trường hợp này, bạn có thể tạo một button để thực thi một hàm, hàm này sẽ đặt giá trị cho cell đang chọn là ngày giờ hiện tại.
    ```javascript
    function setTimestamp() { 
      var activeRange = SpreadsheetApp.getActiveRange();
      var d = new Date();
      var currentTime = d.toLocaleTimeString(); // eg. 10:54:56 AM ICT
      var currentDate = d.toDateString(); // eg. Sun Sep 16 2018
      activeRange.setValue(currentDate + ' ' + currentTime);
    }
    ```
    
 - **Gửi email tới người được chọn**

    Việc sử dụng một button để thực hiện một hàm là cách rất thuận tiện nếu bạn muốn các giá trị trên trang tính là tham số của hàm. Đoạn code dưới đây cho phép  bạn gửi một email với nội dung như trong những dữ liệu được chọn (active) trên trang tính, bao gồm email địa chỉ nhận, tiêu đề và nội dung.
    
    ```javascript
    function sendEmail() {
      var activeRange = SpreadsheetApp.getActiveSheet().getActiveRange()
      var params = activeRange.getValues()[0];
      // TODO: Valid sendEmail params
      GmailApp.sendEmail(params[0], params[1], params[2]);
    }
    ```
    
    ![](https://images.viblo.asia/6c57028a-17d7-48d8-9051-76d42f9297e4.png)
    
    ![](https://images.viblo.asia/9cf20612-3e15-479d-bf6b-8ac1bdacb555.png)
    
    
# Tổng kết
Thật không may là chúng ta không thể chèn một button vào một ô (cell) của Trang tính. Button được chèn vào trang tính luôn "trôi" trên bề mặt trang tính. Nhưng như tôi đã viết ở phía trên, chúng ta có thể kéo thả button vào khu vực `freeze row` để cố định vị trí của nó.

Tôi hy vọng bài viết này sẽ giúp các bạn hiểu cách sử dụng các nút kết hợp với các hàm GAS, và có thêm các ý tưởng để xây dựng những ứng dụng riêng cho mình.