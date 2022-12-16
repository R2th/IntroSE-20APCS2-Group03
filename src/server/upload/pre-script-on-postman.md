Pre-script là một đoạn mã code liên kết với các collection request và được thực hiện sau khi các yêu cầu được gửi đi. Với postman bạn có thể viết và chạy các request cho từng testcase bằng ngôn ngữ Javascript. Khi mà các dự án gần đây back-end chỉ có nhiệm vụ là nơi cung cấp api cho frond-end xử lí thì việc viết test này rất hữu dụng cho cả 2 bên.
Mời các bạn xem hình ảnh ví dụ dưới đây
![](https://images.viblo.asia/74ca4165-64ec-47fc-9b0c-b582c859514a.png)
Bây giờ mình sẽ đi vào chi tiết các viết test bằng Postman nhé
## 1. Writing Postman tests
Test postman về bản chất là sử dụng các đoạn code Javascript để thực thi sau khi các yêu cầu được gửi, nó cho phép truy cập vào đối tượng **pm.response**. Ví dụ
```
// example using pm.response.to.have
pm.test("response is ok", function () {
    pm.response.to.have.status(200);
});

// example using pm.expect()
pm.test("environment to be production", function () {
    pm.expect(pm.environment.get("env")).to.equal("production");
});

// example using response assertions
pm.test("response should be okay to process", function () {
    pm.response.to.not.be.error;
    pm.response.to.have.jsonBody("");
    pm.response.to.not.have.jsonBody("error");
});

// example using pm.response.to.be*
pm.test("response must be valid and have a body", function () {
     // assert that the status code is 200
     pm.response.to.be.ok; // info, success, redirection, clientError,  serverError, are other variants
     // assert that the response has a valid JSON body
     pm.response.to.be.withBody;
     pm.response.to.be.json; // this assertion also checks if a body  exists, so the above check is not needed
});
```
## Environment and global variables
Để postman có thể biết bạn đang test trên môi trường nào, và sẽ gửi và nhận các biến trên môi trường nào thì nó cung cấp **environment và global variables**. Nếu bạn sử dụng postman thường xuyên chắc hẳn không còn xa lạ với 2 biến môi trường này, và ở trong postman để sử dụng nó chúng ta làm như sau:
```
1. pm.environment.set("variableName", variableValue): Sets biến môi trường “variableName”, và gán giá trị cho nó. và biến này chỉ lưu value dạng chuỗi. các giá trị khác sẽ trả ra value không mong m
2. pm.environment.get("variableName"): Trả về giá trị mà mình đã set biến môi trường ở trên, nó sử dụng trong pre-request & test scripts
3. pm.environment.has("variableName"): Returns true if nếu biến môi trường "variableName" tồn tại
4. pm.environment.unset("variableName"): xóa biến môi trường với named “variableName”. 
5. pm.environment.clear(): Xóa tất cả biến môi trường mà bạn đã set từ trước đó
Đối với các global variable nó cũng có các method tương tự với enviroment variable nên mình sẽ không giải thích lại
6. pm.globals.set(variableName, variableValue): 
7. pm.globals.has("variableName"): 
8. pm.globals.get("variableName"):
9. pm.globals.unset("variableName"): 
10. pm.globals.clear():
```
## Postman Sandbox API 
Đây là phần quan trọng và dùng rất nhiều trong việc viết test api bằng postman, và mình thấy function quan trọng và sử dụng nhiều nhất đó là **pm.sendRequest:Function**. Đối với dự án hiện tại của mình, để tạo các data từ api khác, mình sẽ phải dùng function này để call api đó, ví dụ
```
pm.sendRequest({
    url: request_url,
    method: 'POST',
    header: {
    },
    body: {
            mode: 'urlencoded',
            urlencoded: [
                {key: "email", value: "test@example.com", disabled: false},
                {key: "password", value: "12345678", disabled: false}
            ]
            
    }
}, function (err, response) {
    pm.request.headers.add({
        'key': "client",
        'value': response.headers.get('client')
    });
    pm.request.headers.add({
        'key': "uid",
        'value': response.headers.get('uid')
    });
    pm.request.headers.add({
        'key': "access-token",
        'value': response.headers.get('access-token')
    });
});
```
ở ví dụ trên là mình call api để đăng nhập và add các client, uid, token vào header, và khi đó các api cần phải đăng nhập sẽ được cung cấp bộ header. Tuy nhiên sẽ có 1 trường hợp khiến code không được DRY cho lắm là khi mỗi collection bạn lại phải viết lại hàm đăng nhập này, như vậy sẽ rất mất thời gian để copy paste. Hmm, tại sao không tạo ra 1 function chung để gọi ở mọi nơi nhỉ. Postman hiện tại chưa hỗ trợ đến chức năng này, nhưng sẽ có 1 mẹo là chúng ta sẽ tạo ra các funtion global, và từ đây chúng ta sẽ gọi được ở mọi nơi. Từ collection gốc, bạn chọn edit, và tạo funtion global như sau:

```
postman.setGlobalVariable("login", (email, password) => {
    pm.request.headers.clear();
    var request_url =  pm.variables.get('baseUrl') + "/api/v1/auth/sign_in";
    pm.sendRequest({
        url: request_url,
        method: 'POST',
        header: {
        },
        body: {
            mode: 'urlencoded',
            urlencoded: [
                {key: "email", value: email, disabled: false},
                {key: "password", value: password, disabled: false}
            ]
                
        }
    }, function (err, response) {
        pm.request.headers.upsert({
            'key': "client",
            'value': response.headers.get('client')
        });
        pm.request.headers.upsert({
            'key': "uid",
            'value': response.headers.get('uid')
        });
        pm.request.headers.upsert({
            'key': "access-token",
            'value': response.headers.get('access-token')
        });
    });
});
```
Vậy là xong function global. Tuy nhiên để sử dụng nó chúng ta phải sử dụng đến eval. Như các bạn đã biết tất cả các ngôn ngữ đều hạn chế sử dụng eval vì nó dễ bị tấn công injection và ảnh hưởng đến hiệu năng.** Vì vậy nếu bạn viết test postman và chỉ sử dụng môi trường local thì có thể dùng thoải mái nhé** , chúng ta sử dụng eval như sau
`eval(globals.login)("test@example.com", "12345678")`
nó sẽ hiển thị lỗi *eval can be harmful* nhưng bạn đừng lo lắng, cứ dùng thoải mái thôi
Vậy là mình đã giới thiệu xong những kiến thức cơ bạn về pre-script trong postman. Hi vọng sẽ giúp đỡ được các bạn trong việc test và tránh được những lỗi trong quá trình sửa đổi code