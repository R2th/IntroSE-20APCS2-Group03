## Burp Intruder
- Burp Intruder là một công cụ tuyệt vời để `automating customized attacks` lên các ứng dụng web. Công cụ này theo mình thấy nó cực kỳ mạnh mẽ và có thể `custom` được. Nó sử dụng để thực hiện hàng loại các hành động hay trinh sát. Từ việc đoán các `path` đơn giản cho đến khai thác các lỗ hổng như `XSS`, `SQL Injection`, ...
## Cách thức hoạt động
- Burp Suite Intruder hoạt động bằng cách sửa đổi request HTTP ban đầu theo ý mình và tự động gửi các payloads tới target. Các payloads có thể tự custom theo ý muốn và chúng ta có thể filter những response từ Website.
- Đối với mỗi cuộc tấn công, bạn phải thêm vào đó 1 hoặc nhiều bộ `Payloads` vào các vị trí đánh dấu trong `Positions`. Có nhiều các cách để tạo nhiều bộ `Payloads`. Burp Intruder cũng có nhiều tùy chọn để giúp phân tích kết quả và xác định các mục tiêu để điều tra thêm.
## Cấu hình một cuộc tấn công
- UI Intruder chính cho phép bạn cấu hình đồng thời nhiều cuộc tấn công, mỗi 1 cuộc tấn công là 1 tab riêng. Khi bạn gửi yêu cầu đến Intruder thì nó sẽ tự động mở tab và đánh số riêng. Mỗi tab cấu hình thì chứa một số tab phụ khác, phục vụ cho việc `config` cuộc tấn công đó. 

![](https://images.viblo.asia/375bb752-b9d2-4329-811e-a9e998229ab5.png)

### Chi tiết từng tab
- Target: Sử dụng để cấu hình chi tiết của target server cho cuộc tấn công.
- Positions: Ở đây sẽ được định cấu hình `mẫu` cho cuộc tấn công hàng loạt, cùng với vị trí của `payloads` và kiểu tấn công.
- Payloads: Sử dụng để cấu hình 1 hoặc nhiều bộ payloads, sẽ được đặt vào các positions trong cuộc tấn công.
- Options: Sử dụng để cấu hình nhiều tùy chọn khác với cuộc tấn công đó.
#### Target:
![](https://images.viblo.asia/86afdbe1-47a6-4b4f-b22b-d9b102dc55c7.png)

Tab này được sử dụng để cấu hình chi tiết của target server cho cuộc tấn công.
- Host: Đây là địa chỉ IP hoặc tên máy chủ của target server.
- Port: Đây là số cổng của dịch vụ HTTP/S.
- Use HTTPS: Sử dụng HTTPS hay là không.
Cách dễ nhất để cấu hình các chi tiết này là sử dụng HTTP history nằm trong tab Proxy hoặc bất cứ nơi nào trong Burp rồi gửi đến Burp Intruder. Điều này sẽ gửi yêu cầu để Burp Intruder mở 1 tab mới trong Intruder và sẽ được tự động điền vào Target và Positions.

#### Positions:
![](https://images.viblo.asia/fcd951ec-f228-4b6f-8fa0-6a03398886a2.png)

Payload Positions
- Ở đây mình sẽ cấu hình `request template` để tấn công. 

Payload markers
- Các dấu `payloads` được đặt trong §§, khi positions payload được chỉ định, các điểm đánh dấu đó sẽ được thay thế bằng payloads.
- Để dễ dàng hơn trong việc config thì Intruder sẽ tự động `tô màu` từng cặp dấu `payloads` và bất kỳ ký tự hay văn bản nào bên trong chúng.
- Add §, Clear §, Auto §, Refresh khá là dễ dàng, bạn đọc tự tìm hiểu nha ^^

**Các kiểu tấn công:**

**1. Sniper**
- Sniper chỉ sử dụng một bộ payload, nếu có 1 position nó sẽ chèn lần lượt từng payload từ đầu đến cuối danh sách. Trong trường hợp có nhiều position, nó sẽ chèn từng payload trong danh sách vào position 1, sau đó tiếp tục đến với position 2, position 3…

- Tổng số request của kiểu tấn công Sniper = số payload của bộ payload * số position

- Ứng dụng: tìm lỗ hổng SQL injection, XSS, dò password một user biết trước…
Ví dụ:
    ```bash
    Request 1: position1=payload[0]&position2=
    Request 2: position1=payload[1]&position2=
    Request 3: position1=payload[2]&position2=
    ...
    Sau khi chèn hết payload trong danh sách vào position1 sẽ tiếp tục với position2

    Request 4: position1=&position2=payload[0]
    Request 5: position1=&position2=payload[1]
    Request 6: position1=&position2=payload[2]
    ...
    ```

**2. Battering ram**

- Tương tự như Sniper thì kiểu Battering ram chỉ dùng 1 bộ payload, tuy nhiên nó được dùng trong trường hợp pentest ứng dụng có 2 position trở lên và các position sẽ dùng chung một payload tại một thời điểm.
- Tổng số request của kiểu tấn công Battering ram = số payload của bộ payload.
- Ứng dụng: dò giá trị user/password người đặt giống nhau…
Ví dụ:
    ```bash
    Request 1: position1=payload[0]&position2=payload[0]
    Request 2: position1=payload[1]&position2=payload[1]
    Request 3: position1=payload[2]&position2=payload[2]
    ...
    ```
**3. Pitchfork**
- Tấn công Pitchfork sử dụng nhiều bộ payload. Mỗi position tương ứng với một bộ payload. Tại một thời điểm, các position sẽ chạy đồng thời tương ứng với bộ payload cho từng position. Nói cách khác, với request đầu tiên, tại position1 sẽ dùng payload đầu tiên trong bộ payload1, tại position2 sẽ dùng payload đầu tiên trong bộ payload2, sau đó tương tự với request tiếp theo...
- Tổng số request của kiểu tấn công Pichfork = số payload của bộ payload nhỏ nhất.
Ví dụ:
    ```
    Request 1: position1=payload1[0]&position2=payload2[0]
    Request 2: position1=payload1[1]&position2=payload2[1]
    Request 3: position1=payload1[2]&position2=payload2[2]
    ...
    ```
**4. Cluster Bomb**
- Tương tự với tấn công Pitchfork, Cluster Bomb sử dụng nhiều bộ payload, mỗi bộ tương ứng với một position. Tuy nhiên với Cluster Bomb các position sẽ được chạy đồng thời, payload tại các postion sẽ được kết hợp chéo với nhau.
- Ứng dụng: brute force trang đăng nhập…
    ```bash
    Request 1: position1=payload1[0]&position2=payload2[0]
    Request 2: position1=payload1[1]&position2=payload2[0]
    Request 3: position1=payload1[2]&position2=payload2[0]
    ...

    Sau khi chèn lần lượt hết bộ payload1 vào position1 với payload đầu tiên ở position2 quá trình sẽ tiếp tục như sau:

    Request 4: position1=payload1[0]&position2=payload2[1]
    Request 5: position1=payload1[1]&position2=payload2[1]
    Request 6: position1=payload1[2]&position2=payload2[1]
    ```
>     Nguồn: https://whitehat.vn/threads/tim-hieu-cac-loai-tan-cong-bang-burp-suite-intruder.12643/
#### Payloads:
![](https://images.viblo.asia/36e6f7f9-f604-4252-95a7-19d47875dbc7.png)

- Ở đây ta sẽ sử dụng để cấu hình một hoặc nhiều bộ `payloads`. Số lượng payloads thì tùy vào loại tấn công được xác định trong `Positions`. Đối với `fuzzing parameters` hay `brute force` thì thường sử dụng 1 bộ payloads duy nhất.

**Payload Sets:**
- Ở đây mình sẽ được cấu hình từng bộ payloads và kiểu payloads, đối với những kiểu payloads thì bạn đọc có thể tìm hiểu thêm tại [đây](https://portswigger.net/burp/documentation/desktop/tools/intruder/payloads/types). Có rất nhiều kiểu cho bạn lựa chọn, tùy theo mục đích tấn công là gì.

**Payload Options**
- Tại đây mình sẽ nạp các `payloads` cần thiết để nạp vào chỗ đã đánh dấu tại `Positions`.  Có nhiều danh sách cho bạn lựa chọn tại `Add from list ...`

**Payload processing**
- Tại đây là nơi mà mình xử lý các payload với các quy tắc như thêm tiền tố phía trước payloads hay thêm hậu tố phía sau payloads, ... Các tùy chọn đã được viết chi tiết tại [đây](https://portswigger.net/burp/documentation/desktop/tools/intruder/payloads/processing).

**Payload Encoding**
- Bạn có thể định cấu hình các ký tự trong payloads phải được mã hóa URL để truyền trong HTTP. Việc này sẽ được áp dụng sau cùng sau khi bất kỳ `Payload Processing Rule` được thực thi.

### Tham khảo
- https://whitehat.vn/threads/tim-hieu-cac-loai-tan-cong-bang-burp-suite-intruder.12643/
- https://portswigger.net/burp/documentation/desktop/tools/intruder
> Ở phần 2 mình sẽ viết tiếp mục **Option** các thông số kết quả và cách Intruder sao cho hiệu quả nhé :D
> 
> Phần 2: [Sử dụng Burp Intruder sao cho hiệu quả [Phần 2]](https://viblo.asia/p/su-dung-burp-intruder-sao-cho-hieu-qua-phan-2-gAm5yGBVZdb)