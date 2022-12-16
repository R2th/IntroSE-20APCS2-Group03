Chao,
Xin chào mọi người. Hôm nay mình xin giới thiệu đến các bạn cách viết test cho các request api khi bạn dùng Postman
Trong phạm vi bài viết này, mình sẽ giới thiệu đến cách viết test case và cách dùng iteration trong test api bằng Postman
# Giới thiệu chung
Tổng quát: Trong Postman hổ trợ cho bạn chức năng viết các test case cho các request và cách bạn handle response để test những kết quả tương ứng trong từng test case
![](https://images.viblo.asia/57adf3b3-7344-467f-ab7a-4ada88cb6162.png)

Bạn để ý đến các tab trong hình bên dưới, ta có:
1. Tab Params: Dùng để set những parameters cần thiết cho request
2. Auth: Hổ trợ các thông số về Authenticate
3. Headers: Set những keys cần thiết cho header của request(token, client, uid...)
4. Body: Set parameters cho các request POST, PUT, PATCH... và các keys khác
5. Pre-req: Nơi bạn cấu hình parameters, viết các trường hợp input với ý đồ test các trường hợp của bạn
6. Tests: Nơi bạn handle response để viết các test case tương ứng theo các trường hợp gửi params tương ứng ở Pre-req

Chúng ta sẽ bỏ qua 4 tabs đầu tiên và đi vào cụ thể trong Pre-req và Tests cho việc viết test api

# Pre-req

Trường hợp giả: Ví dụ như mình đang test cho một api: ```GET /user?id={{user_id}}```
Bạn có thể thấy params user_id mình đang đặt trong 2 dấu ngoặc nhọn, có nghĩa là nó đang được định nghĩa là một variable.
Điều đó có ý nghĩa là chúng ta có thể dễ dàng thay đổi giá trị truyền vào request mỗi khi ta thay đổi giá trị của biến user_id

Ta có đoạn code nhỏ trong tab Pre-req
```
pm.environment.set('user_id', 1);
```
Lệnh này có nghĩa là mình đang set giá trị 1 cho biến user_id

Vì Pre-req được thực hiện trước khi mình thực hiện send request, nên khi request được gửi lên server thì nó sẽ nhận params cho user_id là 1

# Tests

Test là tab được thực hiện sau khi request được gửi lên và nhận lại response

Với trường hợp params như đã set ở tab Pre-request, ta lại viết test case cho reuqest

```
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Should render success message", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.eql('Load data successfully');
});
```

Ta giả sử với user_id bằng 1 thì server sẽ trả ra được response successfully và message như trên

Mình nghĩ là tới đây thì các bạn đã hình dung ra được cách làm rồi đúng không, nên ta sẽ đi đến phần tiếp

# Iterations

Iterations là cách bạn viết và test nhiều test case trên 1 request với các trường hợp mà mình mong muốn.

Mình giả sử với api get user by id như trên, ta sẽ thấy được 2 case cơ bản là Load data successfully và Not found.

Vậy làm sao chúng ta có thể test được 2 case này đồng thời khi send request? 

Cách làm như sau:

## Pre-req

```
if(iteration === 0){
    pm.environment.set('user_id', 1);
} else if(iteration === 1){
    pm.environment.set('user_id', 0);
}
```


## Tests
```


if(iteration === 0){
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    pm.test("Should render success message", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.message).to.eql('Load data successfully');
    });
} else if(iteration === 1){
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(400);
    });
    pm.test("Should render success message", function () {
        var jsonData = pm.response.json();
        pm.expect(jsonData.message).to.eql('Not found');
    });;
}
```



Sau đó click vào RUNNER

![](https://images.viblo.asia/80da45c2-462e-46bc-9a06-35f79c5bbb42.png)

Chọn request, chọn Environment và set iterations là 2
![](https://images.viblo.asia/442677f4-7bbc-41f0-b744-d826a3440e83.png)


Sau nữa là nhấn Start Run


Với nhiều test case, bạn chỉ cần viết thêm và chạy như trên mình ví dụ là okie

Lưu ý: Ở ngoài mỗi folder hoặc collection, chúng ta cũng có thể code phần Pre-req và Test, nó sẽ chạy cho toàn bộ các elements bên trong.

Trên là một vài giới thiệu nhỏ của mình, hy vọng các bạn thành công
Bie bie :D