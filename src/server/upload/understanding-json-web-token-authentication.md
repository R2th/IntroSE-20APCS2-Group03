# I. Tại sao chúng ta phải sử dụng  JSON Web Token ? 
JSON Web Token (JWT) là một cách an toàn, nhỏ gọn và khép kín để truyền thông tin giữa nhiều bên dưới dạng đối tượng JSON.
Giả sử bạn muốn đăng nhập vào một ứng dụng, như nói Tinder. Tinder cho phép người dùng đăng nhập bằng hồ sơ Facebook của họ. Vì vậy, khi người dùng chọn tùy chọn để đăng nhập bằng Facebook, ứng dụng sẽ liên lạc với máy chủ Xác thực Facebook của Facebook với thông tin xác thực của người dùng (tên người dùng và mật khẩu).
Khi máy chủ Xác thực xác minh thông tin đăng nhập của người dùng, nó sẽ tạo JWT và gửi cho người dùng. Ứng dụng hiện có JWT này và cho phép người dùng truy cập vào dữ liệu của nó.

# Cấu trúc JWT’s
JSON Web Token bao gồm ba phần được phân tách bằng một bản. Họ đang:
 - Header
- Payload
- Signature
Tiêu đề thường bao gồm hai phần: loại token và thuật toán băm đang được sử dụng.

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```


Payload là nơi lưu trữ thông tin thực tế mà chúng tôi muốn gửi. Dưới đây là một ví dụ về Payload đơn giản. Biết rằng Payload có thể phức tạp hơn cách này để đảm bảo bảo mật tốt hơn.
```
{
  "sub": "65165751325",
  "name": "Rajat S",
  "admin": true
}
```

# II. Sử dụng JWT vào ứng dụng như thế nào 
- Cài đặt JWT vào ứng dung:
npm install jsonwebtoken

- Thư mục service để code phần login mình có code như sau: 
```
const jwt = require('jsonwebtoken');
```

```
module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(contants.userMessage.USER_NOT_FOUND);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(contants.userMessage.INVALID_PASSWORD);
    }

    const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d'});
    return { token };

  } catch (error) {
    console.log('Error Service Signup', error);
    throw new Error(error);
  }
}
```

Các bạn chú ý ở dòng này 
```
 const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d'});
```

Có nghĩa khi dòng code này chạy jwt.sign nó sẽ tạo ra 1 token ,  expiresIn: '1d' là token sẽ hết hạn sau 1 ngày

- Ở Controller mình sẽ gọi vào Service code như trên như sau : 
```
const userService = require('../service/userService');
```

```
module.exports.login = async (req, res) => {
  let response = {...constants.defaultServerResponse};
  try {
    const responseFromService = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: Login', error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
}
```

-  Kết quả khi login như sau 
![](https://images.viblo.asia/fe8a6391-e110-4876-a42b-96761dc33061.png)

# III. Code tham khảo: 
https://github.com/trieunnh-0800/node-api

# IV. Kết bài : 
Trên đó là những chia sử cơ bản nhất của mình về tìm hiểu JWT (khi mình tìm hiểu làm việc với api ) , hy vọng qua bài bài này mình giúp các bạn hiểu rõ về JWT , sau đó tự tin sử dụng kiến thức đó vào dự án 1 cách nhanh nhất có thể . 

# V. Tài liệu tham khảo : 
https://blog.bitsrc.io/understanding-json-web-token-authentication-a1febf0e15