## 1. Đặt vấn đề:
- Trong vòng 3 năm gần đây mình làm 4 dự án. Cả bốn dư án  đều dùng jwt token để xác thực. Có thể thấy jwt token thực sự phổ biến. Hôm nay mình viết cái mini blog mong muốn chia sẽ tí kinh nghiệm về cách config postman với jwt token để anh em làm việc chuyên nghiệp và hiệu quả hơn.
- Flow xác thực bằng jwt token phía client: 
    1. Post API login
    2. Nhận token
    3. Lưu token ở client
    4. Tất cả các API có auth -> set header Authcation = Bearer + token
- Bạn là một BE developer hoăc tester.
- Bạn muốn test API thì bạn phải thực hiện qui trình trên
 -> Open postman and try 😆😆
## 2. Thực hiện bằng cơm:

- Viết api login
![](https://images.viblo.asia/cdf29145-5d23-41b5-9332-ef9e142346f8.png)

- Nhận được token như này
![](https://images.viblo.asia/037e8191-9dc5-4a1b-a10c-386aeb8ce1fa.png)

- Sau đó `Ctrl + C`
- Và `Ctrl + V` vào header Authcation của API muốn test
- ![](https://images.viblo.asia/7ce08c19-506d-41c9-b9eb-fce2275a7d8a.png)

- Vậy nếu muốn test 20 API thì bạn phải coppy và dán 20 lần. -> Quá là gà đi mất 😅😅😅

## 3. Cũng là bằng cơm nhưng xịn hơn một tý:

- Tạo một biến( global) `acccessToken`
- ![](https://images.viblo.asia/17014b00-e6ae-4227-bf11-909c7a67f0df.png)
- Setting header tết cả API, Authcation = "Bearer {{acccessToken}}"
- Gọi api login
- Coppy token rồi dán vào biến `acccessToken`
- Chỉ cần gọi API login 1 lần, và dán 1 lần, xin hơn rồi 👋👋👋👋

## 4. Thực hiện tự động

- Tự động là sau khi bạn gọi login, postman sẽ tự coppy token rồi dán vào header.

- Các thực hiện, thêm script sau vào mục `Tests`

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const res = pm.response.json(); 

pm.globals.set("accessToken", res.access_token);

```
![](https://images.viblo.asia/3761b2d2-7583-4d13-9489-c3073e9d1599.png)

- Hiện giờ bạn cần thực hiện 01 lần login trước khi muốn test api. Không biết có thể xịn hơn được không chớ như vầy vẫn còn lười lắm 😒😒😒

## 5. Siêu tự động:

- Thêm pre-script thực hiện set token trước khi thực hiện gọi API. 
```javascript
const Host = pm.globals.get("Host")
const postRequest = {
  url: `${Host}/v1/public/auth/login`,
  method: 'POST',
  header: {
    'Content-Type': 'application/json',
    'X-Foo': 'bar'
  },
  body: {
    mode: 'raw',
    raw: JSON.stringify({"phone" : "phone", "password" : "password"})
  }
};
pm.sendRequest(postRequest, (error, response) => {
   console.log(error ? error : response.json());
   const res = response.json(); 
   pm.globals.set("accessToken", res.access_token);
});
```
- Vậy là giờ bạn không cần quan tâm gì đến quy trình xác thực bằng jwt nữa, cứ vào là làm thôi, tha hồ mà lười  👏👏👏
- File postman của [chotot](https://postman-jwttoken.s3.ap-southeast-1.amazonaws.com/Config+Access+Token.postman_collection.json), các bạn có thể sử dụng bằng cách thay đổi phone và pass của mình.
- Hoặc thực hành trên chính api dự án mình đang làm.