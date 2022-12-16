Chào các bạn lại là mình đây, bài trước mình đã hướng dẫn các bạn viết auto để test API với phương thức GET
hôm nay mình sẽ giới thiệu và hướng dẫn các bạn với API phương thức post
- Chúng ta sẽ viết test case tự động gửi request tới service cần check => rồi sau đó kiểm tra respone trả về

giả sử chúng ta phải test API như sau:

host: http://localhost:9906/payinvoice

**Request  API có header đóng các tham số: **

- Authorization=Basic 123456
- Content-Type=application/json
- 
- body gồm các thông tin sau:
```
{
    "id": "6237033471",
    "transaction_id": "203290",
    "information": {
        "branch": {
            "code": "292929",
            "name": "hoang thuong",
            "address": "so 8",
            "postal_code": "126",
            "city": "ha noi",
            "country_code": "84"
        },
        "id_detail": {
            "id_type": "pass sport"
        },
        "purpose_of_transaction": "shoping",
        "occupation": "occupation"
    }
}
```

**Respon  API **
```

{
    "status": "10000",
    "status_class": "1",
    "status_class_message": "CREATED",
    "status_message": "CREATED",
    "branch": {
        "code": "001",
        "name": "Anson",
        "address": "100 Anson Road",
        "postal_code": "100000",
        "city": "Singapore",
        "country_iso_code": "SGP"
    }
}
```

====> Vậy với bài này trước tiên mình giả lập Service cần test nhé :

Mình dùng Mountebank để giả lập service chứa API cần test ( các bạn đọc lại bài Mountebank link: https://viblo.asia/p/mountebank-gAm5yE8q5db)
Trên Mountebank mình sẽ giả lập API như sau nhé:
host : http://localhost:9906/payinvoice
sử dụng phương thức POST

Mình tạo 1 file payinvoice.js  trong thư mục response

```
function (request, state, logger) {
    var data = JSON.parse(request.body);
    console.log(data);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "status": "10000",
            "status_class": "1",
            "status_class_message": "CREATED",
            "status_message": "CREATED",
            "branch": {
                "code": "001",
                "name": "Anson",
                "address": "100 Anson Road",
                "postal_code": "100000",
                "city": "Singapore",
                "country_iso_code": "SGP"
            }
        })
    }
}
```

và file  imposters.ejs

```
{
    "port": 9906,
    "protocol": "http",
    "recordRequests": true,
    "stubs": [
                {
                    "responses": [{
                        "inject": "<%- stringify(filename, 'response/response1.js') %>"
                    }],
                    "predicates": [{
                        "equals": {
                            "method": "POST"
                        }
                    },
                    {
                        "matches": {
                            "path": "/test"
                        }
                    }]
                },
                {
                    "responses": [{
                            "inject": "<%- stringify(filename, 'response/payinvoice.js') %>"
                    }],
                    "predicates": [{
                        "equals": {
                                    "method": "POST"
                                }
                            },
                            {
                                "matches": {
                                    "path": "/payinvoice"
                                }
                            }]
                }
    ]
}
```

===> sau đó mình restart lại MounteBank bằng lệnh :  mb --configfile imposters.ejs --allowInjection

giờ kiểm tra lại API bằng post man xem có lỗi gì ko nhé

![](https://images.viblo.asia/98af0646-36db-4247-bce4-963384141d0d.png)


Như vậy là đã xong việc giả lập API giờ vào việc chính Tạo Automation test
 Mình sẽ Viết 1 test case tự động gửi request và kiểm tra Response trả về
 
 Đầu tiên Mình cần tạo 1 Request  :   ====> Mình sẽ tạo 1 keywords  để tạo ra request 
 Vì chúng ta làm việc với API kiểu Json do vậy cần import thêm Lib Json vào nhé   
  Cần ramdon String nên cũng cần import Library String vào nữa
  Cần làm việc với Request => cũng import RequestsLibrary
 
```
*** Settings ***
Library  RequestsLibrary
Library  json
Library  String

*** Keywords ***

Pre_request - Request - body
        [Arguments]     ${id}=12992
        ...     ${transaction_id}=203290
        ...     ${information}=111
        ...     ${code}=292929
        ...     ${name}=hoang thuong
        ...     ${address}=so 8
        ...     ${postal_code}=126
        ...     ${city}=ha noi
        ...     ${country_code}=84
        ...     ${id_type}=pass sport
        ...     ${purpose_of_transaction}=shoping
        ...     ${occupation}=occupation
        ${schema}     catenate    SEPARATOR=
            ...     {
            ...         "id": "${id}",
            ...         "transaction_id": "${transaction_id}",
            ...         "information": {
            ...             "branch": {
            ...                 "code": "${code}",
            ...                 "name": "${name}",
            ...                 "address": "${address}",
            ...                 "postal_code": "${postal_code}",
            ...                 "city": "${city}",
            ...                 "country_code": "${country_code}"
            ...             },
            ...             "id_detail": {
            ...                 "id_type": "${id_type}"
            ...             },
            ...             "purpose_of_transaction": "${purpose_of_transaction}",
            ...             "occupation": "${occupation}"
            ...         }
            ...     }
        ${body}     loads   ${schema}
        [Return]    ${body}


*** Test Cases ***
TC01 - API with method Post
    [documentation]     Check API with POST Request
    ${code}     Generate Random String      10      [NUMBERS]
    &{request}       Pre_request - Request - body
                     ...    id=${code}
    &{header}=  Create Dictionary  Authorization=Basic 123456      Content-Type=application/json
    ${response}=  POST      http://localhost:9906/payinvoice        json==${request}     headers=${header}     expected_status=200
    Should Be Equal As Strings     10000       ${response.json()}[status]
```



Giải thích 1 chút về Key word : Pre_request - Request - body ===> Mục đích để tạo ra cái body của request  có thể truyền các tham số tùy theo test case bạn cần 

loads  =====> là hàm được define trong thư viện Json ===> nó sẽ giúp chuyển đổi Chuỗi về dạng Dictionary 


Phần Test case được define dưới chỗ   *** Test Cases ***

TC01 - API with method Post   ===> Chỉ là tên test case thôi 

 [documentation]  ===> cái này chỉ là tài liệu để cho người sau vào đọc cho dễ hiểu mục đích của test case
 
 Generate Random String   ===> sẽ tạo ra 1 chuỗi tự động , với độ dài là 10
 
 Pre_request - Request - body  => nó sẽ tạo body của request cho mình ===> vì mình làm đơn giản  ==>  mình truyền mới giá trị cho trường id thôi
 
  &{header}  ===> Chỗ này tạo header cho request
  
   sau đó mình sẽ gọi POST  ( POST này được define trong  thư viện RequestsLibrary ) sẽ gửi API tới host http://localhost:9906/payinvoice và với body

   
  **Kiểm tra response trả về  :**
  
   Should Be Equal As Strings     10000       ${response.json()}[status]     ========> Đoạn này là lấy trường status trong respone để kiểm tra có giống  giá trị bằng 10000 ko thôi
    
    ============ Kết quả chạy robot ===================
    
![](https://images.viblo.asia/169da40a-5455-47d7-8b6d-89e320dabf25.png)

    
    Thanks vì đã đọc bài  ===> Chúc các bạn thành công