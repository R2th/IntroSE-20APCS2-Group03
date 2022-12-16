> SOAP là cách mà Web Server sử dụng để truyền tải dữ liệu. SOAP là giao thức sử dụng XML để định nghĩa dữ liệu dạng thuần văn bản, thông qua HTTP.
> Một request dạng SOAP gồm 2 phần: Header và Body. Header chứa địa chỉ của Web Service, Host, Content-Type, Content-Length tương tự như một thông điệp HTTP.


# Config API dạng SOAP

Chúng ta sẽ thực hiện với một API cụ thể lấy từ trang web : http://www.dneonline.com/calculator.asmx

## GET request method

1.  Open Apache JMeter
2.  Add Thread Group
Để bắt đầu 1 Test Plan việc đầu tiên là phải add 1 Thread Group: Chuột phải vào Test Plan chọn Add > chọn Tiếp Threads (Users) > chọn tiếp Thread Group.

![image.png](https://images.viblo.asia/e056598f-4858-4aa8-af6b-a7218c56d050.png)

3. Add HTTP Request Sampler

Sau khi đã có Thread Group, chúng ta tiếp tục chuột phải vào Thread Group, chọn Add, chọn tiếp Sampler sau đó chọn HTTP Request. HTTP Request chính là nơi chứa body của API SOAP.

![image.png](https://images.viblo.asia/a61db148-b615-492b-8c88-b16957503429.png)

4. Add HTTP Request Manager

Sau khi đã add HTTP Request chúng ta tiếp tục add Header của API. Chuột phải vào HTTP Request chọn Add, chọn tiếp Config Element và sau đó chọn HTTP Header Manager.

![image.png](https://images.viblo.asia/bded56b1-8ff0-43dd-a25c-4bf0765486e6.png)

5. Add View Results Tree Listener

Để kiểm tra kết quả sau khi config và chạy API, chúng ta add thêm 1 Listener có tên là View Results Tree. Các bạn chuột phải vào Thread Group, chọn Add, chọn Listener và click vào View Results Tree.

![image.png](https://images.viblo.asia/0678681c-725b-4f4c-abd2-fb8dde1e4de5.png)

6. Thiết lập Body của API SOAP

Để thiết lập các thông tin của body API SOAP, chúng ta mở xem lại thông tin của request, click vào HTTP Request. URL của API SOAP đã đưa ra ở đầu bài là http://www.dneonline.com/calculator.asmx?op=Add, tương ứng với thông tin này chúng ta sẽ thiết lập ở JMeter như sau:

* Protocol: http
* Server Name or IP: www.dneonline.com
* Path: /calculator.asmx?op=Add
* Method: POST

![image.png](https://images.viblo.asia/90c80880-dd0c-43e1-ad82-c4efecd0ff0f.png)

Tiếp theo chúng ta config body data, mặc định của JMeter đang để dạng Parameters, chúng ta click vào tab Body Data bên cạnh sau đó copy và paste body data của link đã đưa ra:

```
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>int</intA>
      <intB>int</intB>
    </Add>
  </soap:Body>
</soap:Envelope>
```

Đây là API thực hiện phép tính tổng cộng 2 số nguyên với nhau, vì vậy chúng ta sẽ thực hiện điền vào 2 số nguyên ở trong cặp và , ở đây tôi điền lần lượt 2 số là 10 và 20.

![image.png](https://images.viblo.asia/925b2c1b-df67-468a-963f-63bba695ea05.png)

7. Thiết lập header:

Sau khi đã hoàn thành bước thiết lập Body, chúng ta click vào HTTP Header Manager để config Header. Dựa vào yêu cầu của hệ thống đã đưa ra ban đầu, click button Add và thực hiện lần lượt điền các thông tin của Header như sau:
* Host : www.dneonline.com
* Content-Type: text/xml; charset=utf-8
* Content-Length: length
* SOAPAction: "http://tempuri.org/Add"

![image.png](https://images.viblo.asia/11d71a25-8210-400f-a9da-6ce6c4fd35f1.png)

8. Run API

Ở màn hình View Results Tree, click vào HTTP Request, mặc định sẽ hiển thị tab Sampler result thông tin của request sau khi chạy.

![image.png](https://images.viblo.asia/dc8b11fa-91df-41cc-8226-949a49cb154b.png)

Click vào tab tiếp theo là Request sẽ là nơi hiển thị thông tin của request đã gửi lên server,  bao gồm Request Body và Request Header là thông tin về Body và Header đã thực hiện gửi.

![image.png](https://images.viblo.asia/7b7c133f-ef86-49a0-933b-8677b815dc50.png)

Click vào tab tiếp theo là Response data, nơi chứa thông tin mà server thực hiện response về các thông tin mà bạn vừa gửi bao gồm Response Body và Response Header. Ở bước 5, chúng ta đã thực hiện điền 2 số nguyên là 10 và 20 và chạy API thực hiện phép tính Cộng 2 số, kiểm tra giá trị trả về đúng là 30 như hình bên dưới.

![image.png](https://images.viblo.asia/c2b5fba4-dc77-45db-a3d7-3a8a825ffc39.png)

JMeter cũng có cơ chế hiển thị vẫn là data ở trên nhưng dưới dạng XML thì ở Dropdownlist có chữ Text đang hiển thị, chúng ta click vào và kéo xuống bên dưới chọn XML.

![image.png](https://images.viblo.asia/473782a8-f17a-4221-8450-018078834b90.png)

Như vậy, chúng ta đã cùng nhau tìm hiểu cách config API dạng SOAP. Cùng đón xem cách config API dạng REST tại đây nhé. :kissing_heart: