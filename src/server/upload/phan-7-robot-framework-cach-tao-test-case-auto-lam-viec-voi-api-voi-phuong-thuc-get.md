- Bài này mình sẽ hướng dẫn các bạn viết robot để test API đơn giản
- Mình dùng Mountebank để giả lập service chứa API cần test ( các bạn đọc lại bài Mountebank link: https://viblo.asia/p/mountebank-gAm5yE8q5db)
- Trên Mountebank mình sẽ giả lập API như sau nhé:
- host : http://localhost:9906/payinvoice/?TfPin=TT-TH-03999
- sử dụng phương thức GET
- không có body
- Trên Mountebank sữ xử lý nếu TfPin, MB sẽ kiểm tra nếu TfPin bắt đầu TT ⇒ sẽ trả về 200 OK còn khác sẽ trả về 400

**Tạo file payinvoice.js trên Mountebank để trong thư mục pay: **

```
function(request, state, logger) {
   var param = request.query;
   var code = param.TfPin != null ? param.TfPin : "";
   console.log("code:",code);
   if(code == "") {
       console.log("Tfpin is empty")
       return {
           statusCode: 400,
           headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'Content-Length': '0',
               'Access-Control-Allow-Origin': '*'
           }
       }
   }else{
       if(code.startsWith("TT")){
           return {
               statusCode: 200,
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'Access-Control-Allow-Origin': '*'
               },
           }
       }else{
           return {
               statusCode: 400,
               headers: {
                   'Content-Type': 'application/json; charset=utf-8',
                   'Content-Length': '0',
                   'Access-Control-Allow-Origin': '*'
               }
           }
       }

   }
}
```
**Trong file importers mình sẽ thêm như sau nhé**

```
{
   "port": 9906,
   "protocol": "http",
   "recordRequests": true,
   "stubs": [
       {
           "responses": [
               {
                   "inject": "<%- stringify(filename, 'response/pay/payinvoice.js') %>"
               }
           ],
           "predicates": [
               {
                   "equals": {
                       "method": "GET"
                   }
               },
               {
                   "matches": {
                       "path": "/payinvoice"
                   }
               }
           ]
       }
   ]
}
```

⇒ sau khi xong bạn khởi động lại Mountebank bằng lệnh : 
    mb --configfile imposters.ejs --allowInjection

⇒ Kiểm tra API bằng cách gọi postman cho trường hợp trả về 200 :

![](https://images.viblo.asia/3e7b951d-7971-4124-830e-cbe5946178ed.png)

=> kết quả gọi Postman cho trường hợp 400 :
![](https://images.viblo.asia/76568e69-5810-4de9-856b-9661ea031ae2.png)

===> vậy ta giả lập xong API, Giờ vào việc chính là sẽ viết Auto Test  cho API này
- Test case cho API này mình chỉ define 2 case chính test trường hợp 200 success và trường hợp 400 nhé ( ( 2 case này có thể viết chung vào thành 1 test case, vì thực chất các bước giống hệt nau, chỉ khác input vào output thôi ) ==> để cho dễ hiểu mình sẽ viết thành 2 test case riêng biệt

- chúng ta sẽ làm việc lib đó là RequestsLibrary ( các bạn có thể tham khảo qua các keyword của 2 thư viện này ở đường dẫn này nhé : https://robotframework.org/robotframework/
- cài đặt lib bạn dùng lệnh: pip3 install robotframework-requests
- Trước tiên tạo file ApiTesting.robot :

```
*** Settings ***
Library  RequestsLibrary
Library  String
*** Test Cases ***
TC01 - Payinvoice - Success - Return 200
    [documentation]     This test case verifies that the response code of the GET Request should be 200,
    ${code}     Generate Random String      10      [NUMBERS]
    ${response}=  GET   http://localhost:9906/payinvoice/  params=TfPin=TT-${code}   expected_status=200

TC02 - Payinvoice - Success - Return 400
    [documentation]     This test case verifies that the response code of the GET Request should be 400,
    ${code}     Generate Random String      10      [NUMBERS]
    ${response}=  GET   http://localhost:9906/payinvoice/   params=TfPin=TS-${code}     expected_status=400
```

===> còn đây là kết quả chạy  test case TC01
![](https://images.viblo.asia/7806b469-6253-496f-bf1f-b576d1941301.png)

===> còn đây là kết quả chạy  test case TC02
![](https://images.viblo.asia/bbe6d0ea-97f6-412c-b5f4-51111a5da099.png)

Như Vậy mình đã hướng dẫn xong các bạn tạo automation test bằng robot làm việc với API rồi, Chúc Các bạn thành công !




-