### 1. Những lưu ý khi code API test
**a. Postman – Workspace**

Trước kia, ta chỉ có 1 workspace và làm nhiều project trên đó nhưng đã có tính năng tách workspace thì ta nên tách mỗi project là 1 workspace, sẽ dễ nhìn hơn rất nhiều, tránh được những nhầm lẫn khi kéo thả các request từ folder này sang folder khác.

![](https://images.viblo.asia/7063bfb2-2ee1-4c56-b740-5cee36f99143.png)

Ngoài ra, còn có nhiều tiện ích mà chúng ta ít sử dụng:

![](https://images.viblo.asia/314cd76d-8bc1-44c2-944f-5e00b426415e.png)

Trong số này thì console log là hay được sử dụng nhất vì console log sẽ show toàn bộ thông tin request và response, giúp ích cho việc debug nhiều. Nếu bạn thắc mắc là mỗi khi run Send API thì response sẽ trả về được hiển thị ở phía dưới rồi, cần gì phải console log? Có 2 trường hợp bạn sẽ cần phải sử dụng console log:

* Bạn test theo Runner. Runner dashboard chỉ lưu full thông tin của 10 request đầu tiên, những request phía sau, nó chỉ lưu thông tin cơ bản, bạn ko xem được full thông tin nếu có request nào đó bị lỗi.
* Nếu bạn viết các tham số của 1 API dưới dạng biến thì bạn cần có console log thì mới view được giá trị thực các tham số ở mỗi lần run.

**b. Test**

Ở phần test có thêm một vài điểm mọi người cần chú ý:

1. Các error code cần được check nếu các error code này được sử dụng đúng như định nghĩa của REST API ví dụ:
* 200 – success: Dùng cho happly case: nhận request và trả response có data đúng.
* 400 – bad request: Dùng trong các TH lỗi ở phía client ví dụ: sai data type, missing data parameter.
* 401 – Unauthorized: Dùng trong việc thiếu token authen
* 403 – Forbidden: Dùng cho việc access vào những resource không có quyền hạn
* 500 – Server error: Dùng cho các vấn đề error của server: Thiếu library, disconnect DB…
2. Ngoài error code thì có thể sử dụng response data để verify thêm. Đọc lại bài này để biết cách test API như thế nào.
3. Ngoài ra, các built-in function của Postman đã được thay đổi khá nhiều, xem [ở đây](https://learning.postman.com/docs/writing-scripts/script-references/postman-sandbox-api-reference/). 

**c. Environment**

Phần này thì cũng không có nhiều sự thay đổi, nhưng có 1 số lưu ý nhỏ:

1.  Nên đặt tên biến meaningfull. Ví dụ: ta thực hiện test 1 field là Phone, thì có 2 cases: phone sai và phone đúng, ta không nên đặt tên biến là phone và dùng chung cho cả hai trường hợp, ta nên tách ra thành wrongPhone và rightPhone.
2. Environment có thể lưu được array. Ví dụ: Khi nhận response trả về 1 list các giá trị customerId và bạn muốn lưu list customerId đấy về thành 1 array để request khác bạn có thể lấy random các giá trị đấy.
![](https://images.viblo.asia/8fa8d859-4a93-4f11-88b2-87008390b1e3.png)

**d. Run script**

Để đảm bảo rằng test API lúc nào chạy cũng đúng, có 2 cách làm:
1. Với trường hợp các API có đủ, “đủ” ở đây có nghĩa là với bất cứ cái dữ liệu, action nào trên UI thì cũng có API tương ứng. –> Mình sẽ tạo test data bằng cách dùng API cần thiết, sau đó mới run API test. Cách làm này sẽ giúp cho các Test case không bị phụ thuộc vào test data ở chỗ nào cả.

Ví dụ: Bạn cần test API update_info_user, bạn sẽ sử dụng API create_user trước, thay vì sử dụng 1 user đã có sẵn trong hệ thống

2. Với TH các API không có đủ, ta nên chuẩn bị sẵn các data test của mình và cả DB test nữa. Cách làm:
* Bạn tạo ra đủ các master data bằng cách thủ công: các data cần thiết để có thể run được API, ví dụ bạn tạo ra list các sản phẩm trước khi thực hiện mua hàng, đặt số lượng của sản phẩm ở mức cao tương đối, ví dụ đặt số lượng = 100.
* Chạy thử 1 lượt với tất cả các API bạn có với Runner, nếu có lỗi thì fix.
* Chạy lại lần 2 để đảm bảo đã hết lỗi. (Lưu ý, nên dynamic parameter nhiều nhất có thể, đừng hard code data)
* Dump DB ra thành 1 file sql để khi nào mình run lại script thì mình sẽ run lại file SQL này trước.
### 2. Reuse test script 

Đã bao giờ bạn nghĩ là bạn đang duplicate code ở khắp nơi trong postman, và hiện tại bạn chưa tìm được cách để xử lý vấn đề ấy. Bài này sẽ đưa ra 1 cách giúp bạn xử lý vấn đề đó.

Q: Tôi có 1 số common tests, được áp dụng cho các trường hợp giống nhau, có cách nào để tôi không phải copy-patse code vào từng mục [Tests] của từng request không? Ví dụ: tôi muốn check tất cả các request mà sử dụng token sai đều trả về mã code 401 và error_message là “Not logged in or Invalid user session”

A: Mình có 1 cách như sau, bạn save cái code đó vào thành 1 variable trong environment rồi bạn chỉ cần gọi cái code đó ở chỗ nào bạn cần.

**a. Sử dụng Pre-request của để save code common tests**

Ở đây mình sẽ sử dụng Pre-request của folder to nhất, vì để đảm bảo rằng code được save to environment trước khi run bất kỳ request nào.

![](https://images.viblo.asia/ae7740b4-de08-4c30-886c-9607030718c6.png)
![](https://images.viblo.asia/c2fd8cd3-58e7-4e35-93e9-3baf6600a1d9.png)
```
pm.environment.set("testNotLoggedin", function testNotLoggedin() {
     
    let jsonData = pm.response.json();
 
    pm.test("Error not loggedin", function () {
        pm.expect(jsonData.error).to.eql("Not logged in or Invalid user session");
    });
 
    pm.test("Status code is 401", function () {
        pm.response.to.have.status(401);
    });
} + '; testNotLoggedin();');
```
**b. Sử dụng code đó ở nơi nào mình muốn**
![](https://images.viblo.asia/b18694c7-6f0b-4a64-8512-f1ce7dfffa86.png)
`eval(pm.environment.get("testNotLoggedin"));`
* Function eval dùng để run script.