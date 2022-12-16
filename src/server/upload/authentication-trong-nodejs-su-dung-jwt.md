# Tổng quan
Ứng dụng NodeJS sử dụng JWT (Json Web Token) rất phù hợp cho các ứng dụng cho phép người dùng có thể xác thực từ nhiều thiết bị khác nhau (website, mobile app,...).

Ở bài viết này, mình sẽ tạo ra một REST API cho phép người dùng đăng kí tài khoản, đăng nhập và lấy lại mã truy cập khi mã truy cập này hết hạn.
# Xác thực người dùng sử dụng JWT
## Cơ chế xác thực bằng JWT
* Người dùng nhập username và password, sau khi hệ thống kiểm tra username đó có tồn tại và password đó là của user đó thì hệ thống gửi cho client một mã token duy nhất (gọi là **access token**), mã này chỉ có thể sử dụng trong một khoảng thời gian nhất định.
* Khi muốn truy cập để lấy data thì client phải gửi kèm theo mã truy cập đó, nếu mã truy cập đó hợp lệ (đúng do hệ thống đó tạo ra và chưa hết hạn) thì server sẽ trả về cho client những thông tin mà client yêu cầu hoặc thêm data cho client đó vào database.
* Khi access token này hết hạn, client phải nhập lại username và password để server trả về một mã truy cập mới (điều này sẽ có bất cập và ta phải dùng cơ chế **refreshing access token**).
## Phát sinh ra access token và refresh token
Một **access token** và một **refresh token** (nó là gì mình sẽ nói rõ ở phần dưới) có thể được sinh ra khi gọi thành công đến một API nào đó (chẳng hạn **/auth/login**) và trả về cho client đồng thời lưu **refresh token** vào database (hoặc một nơi nào đó).

Một **access token** có thời gian tồn tại nhất định, bạn có thể cài đặt khoảng thời gian này cho nó.
## Cơ chế refreshing access token
Như đã đề cập ở trên thì **refresh token** là gì, nó dùng để làm gì, mình sẽ giải thích ở dưới đây.

Nếu một ngày đẹp trời (mà cũng có thể không đẹp :satisfied:) **access token** của bạn nó bị rơi vào tay của mấy chú hacker, ở đây sẽ phát sinh ra hai vấn đề:
* Nếu thời gian sống của access token này ngắn (khoảng 5 - 10 phút gì đó) thì chẳng lẽ cứ sau 5 -10 phút lại thoát ứng dụng của họ ra rồi bắt đăng nhập lại để cố thể có mã truy cập mới nhất, người dùng cũng chẳng muốn suốt này phải nhập đi nhập lại username, password (như mình là mình không bao giờ  lên website đó lần thứ hai ý chứ :grinning:), mà cũng rất ít website nào bắt người dùng phải làm như thế cả - trừ những ứng dụng cần bảo mật cao như mấy ứng dụng ngân hàng, thanh toán,.... Do đó **access token** phải có thời gian tồn tại lâu (tầm cỡ 1 ngày gì đó hoặc 2 ngày, 1 tuần,...)
* Nhưng nếu thời gian tồn tại của **access token** này dài thì những kẻ tấn công đó sẽ dựa vào **access token** đó để truy cập vào để lấy thông tin người dùng, lấy các data khác cho đến khi **access token** này hết hạn, sẽ làm lộ thông tin người dùng, ảnh hưởng đến tốc độ truy cập, tính an toàn của server.
Do đó phải sinh ra một cái là **refresh token** để đảm bảo rằng **access token** có thời gian tồn tại ngắn thôi (từ 5 đến 10 phút) và khi khoảng thời gian này hết thì client sẽ dựa vào **refresh token** để lấy **access token** mới nhất. Đến đây có nhiều bạn thắc mắc là cần gì **refresh token** này, bên front-end chỉ cần lưu lại username và password ở 1 nơi nào đó (cookie, local storage) và sau khoảng thời gian đó thì tự động gửi đến server để lấy accsee token, như này thì chẳng khác cho luôn người ta thông tin đăng nhập của mình :)).

Khi **access token** bị lộ, người dùng chỉ cần liên hệ với admin của ứng dung/hệ thống đó để yêu cầu xóa **refresh token** này đi, người dùng chỉ cần đăng nhập lại và có thể sử dụng tiếp (và lại tiếp tục bị lộ :rofl:).

Tóm lại, cơ chế sẽ như sau:
* Khi người dùng đăng nhập thành công, back-end sẽ gửi cho front-end **access token** và **refresh token**, front-end sẽ lưu lại hai token này ở 1 nói nào đó (có thể là cookie, local storage,...).
* Giả sử thời gian tồn tại của **access token** là 10 phút thì sau mỗi 9 phút 59 giây (nên là ít hơn, khoảng tầm 9 phút:laughing:) thì front-end sẽ tự động gọi API gửi kèm theo **access token** đã hết hannj và **refresh token** để lấy lại **access token** mới nhất.

Một **refresh token** có thể có thời gian tồn tại hoặc không. Nếu không có thời gian tồn tại thì người dùng chỉ cần đăng nhập 1 lần duy nhất và có thể sử dụng app đó từ đời này qua đời khác mà không cần đăng nhập lại (nghe vui chứ :joy:). Hoặc nếu có thời gian tồn tại thì nên để lâu lâu một chút (khoảng 30, 45,... ngày), sau khoảng thời gian đó mới bắt người dùng đăng nhập lại.
# Cách cài đặt
## Các dependencies cần thiết
* **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Mã hóa mật khẩu.
* **[lowdb](https://www.npmjs.com/package/lowdb)**: Mình dùng file json để lưu data nên dùng package này để query đata.
* **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: phát sinh, verify **access token**
* **[rand-token](https://www.npmjs.com/package/rand-token)**: phát sinh ra 1 chuỗi ngẫu nhiên và duy nhất, ở đây mình dùng để phát sinh **refresh token**.
## Cấu trúc project
```
|
|_.env                          # Chứa các biến môi trường
|_src                           # API
|   |_auth                      # Các API về xác thực người dùng
|   |   |_auth.routes.js        # Tầng router (Khai báo URL của API)
|   |   |_auth.controller.js    # Xử lý nghiệp vụ cho các API tương ứng
|   |   |_auth.methods.js       # Các phương thức local dành cho authentication
|   |   |_auth.middlewares.js   # Các middlewares local dành cho authentication
|   |_users                     # Các API về user
|       |_users.routes.js       # Tầng router (Khai báo URL của API)
|       |_users.models.js       # Các truy vấn tới database (thêm, sửa, xóa data)
|_variables                     # Khai báo các biến toàn cục sẽ được dùng trong toàn bộ project
|   |_auth.js                   # Các biến toàn cục liên quan đến tính năng xác thực người dùng
|   |_jwt.js                    # Các biến toàn cục cho json web token
|_app.js                        # Xử lý chính cho project (Khởi tạo server, require các middlewares)
|_package.json                  # Khai báo các dependencies , các scripts để khởi chạy server
|_data.js                       # Lưu data (thay vì dùng database thì lưu bằng file cho nhanh ha)
```
## Khởi tạo server, khai báo các biến, các router tương ứng
Ở file **./app.js**
```
const express = require('express');
const createError = require('http-errors');
require('express-async-errors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const authRouter = require('./src/auth/auth.routes');
const userRouter = require('./src/users/users.routes');

const app = express();

app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('APP IS RUNNING');
});
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res) => {
	console.log(err.stack);
	res.status(err.status || 500).send(err.message);
});

const server = app.listen(process.env.PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
```
Ở đây mình khởi tạo server, định nghĩa ra 2 router cơ bản: **/auth** và **/users**, các API về authentication và user mình sẽ thêm tiếp vào 2 file **./src/auth/auth.routes** và **./src/users/users.routes**
## Đăng kí tài khoản
Trong phần đăng kí tài khoản này, ta yêu cầu client gửi lên hai tham số **username** và **password**, ngoài ra cũng có thể thêm các tham số khác như số điện thoại, họ tên,..

Ở file **./src/auth/auth.routes** ta khai báo API đăng kí tài khoản như sau:
```
const express = require('express');
const router = express.Router();

const authController = require('./auth.controllers');

router.post('/register', authController.register);

module.exports = router;
```
Khi đó API của ta sẽ có dạng: **http://example.com/auth/register**

Tương ứng với đó, trong **./src/auth/auth.controllers** ta xử lý cho API đó như sau:
```
exports.register = async (req, res) => {
	const username = req.body.username.toLowerCase();
	const user = await userModel.getUser(username);
	if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
	else {
		const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
		const newUser = {
			username: username,
			password: hashPassword,
            ... Thêm các tham số khác tại đây ...
		};
		const createUser = await userModel.createUser(newUser);
		if (!createUser) {
			return res
				.status(400)
				.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
		}
		return res.send({
			username,
		});
	}
};
```
Ban đầu ta sẽ kiểm tra xem username đó đã tồn tại trong database chưa, nếu chưa có thì ta mới thêm user đó.
Ở đây mình dùng bcrypt để hash password và sau đó mới lưu nó vào database.
Hai hàm tương ứng trong **./src/auth/users.models.js** (**getUser()** và **createUser()**) sẽ như sau:
```
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const TABLENAME = 'users';

exports.getUser = async username => {
	try {
		const data = await db.get(TABLENAME).find({username: username}).value();
		return data;
	} catch {
		return null;
	}
};

exports.createUser = async user => {
	try {
		await db.get(TABLENAME).push(user).write();
		return true;
	} catch {
		return false;
	}
};
```
Ở đây mình dùng file .json để lưu data, bạn có thể dùng bất kì một loại database khác (MSSQL, DynamoDB, MongoDB,...) để lưu data, phần xử lý code đó bạn thay vào trong hai hàm này nhé :grinning:

Như vậy là phần code đã xong, giờ dùng **postman** gọi API và xem kết quả nào:
![](https://images.viblo.asia/054dfd4d-90be-4394-ba0d-10abee30e516.png)
Và cùng xem data đã được thêm vào database chưa nhé:
![](https://images.viblo.asia/9e180e01-6626-4998-ab23-efdc412a1852.png)
Có rồi ha, mật khẩu cũng đã được hashed đơn giản mà nhỉ :grinning:
## Đăng nhập
Tương tự như phần đăng ký tài khoản, phần đăng nhập sẽ như sau,  ta yêu cầu client gửi lên hai tham số **username** và **password**

**./src/auth/auth.routes.js**
```
router.post('/login', authController.login);
```
**./src/auth/auth.controllers.js**
```
exports.login = async (req, res) => {
	const username = req.body.username.toLowerCase() || 'test';
	const password = req.body.password || '12345';

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('Tên đăng nhập không tồn tại.');
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send('Mật khẩu không chính xác.');
	}

	const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send('Đăng nhập không thành công, vui lòng thử lại.');
	}

	let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
	if (!user.refreshToken) {
		// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
		await userModel.updateRefreshToken(user.username, refreshToken);
	} else {
		// Nếu user này đã có refresh token thì lấy refresh token đó từ database
		refreshToken = user.refreshToken;
	}

	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
		user,
	});
};
```
Ban đầu ta cũng kiểm tra username đó đã tồn tại chưa, nếu chưa có thì trả về lỗi ngay.

Sau đó ta tiến hành compare giữa **password** người dùng nhập vào và **password** của user đó đã được lưu trong database bằng hàm **bcrypt.CompareSync()**. Nếu đúng thì thực hiện tiếp.

Ta khai báo hai biến **accessTokenLife** (thời gian tồn tại của **access token**) và **accessTokenSecret** (khóa bí mật của **access token** - phải được bảo mật tuyệt đối (như kiểu mật khẩu tài khoản ngân hàng của bạn ý :grinning:)). Ở đây mình lưu nó trong file **.env**
```
#JWT_CREDENTIAL
ACCESS_TOKEN_SECRET = Access_Token_Secret_#$%_ExpressJS_Authentication
ACCESS_TOKEN_LIFE = 10m
```
Tiếp theo ta khai báo biến **dataForAccessToken** để chỉ định những gì sẽ được lưu trong **access token**, ở đây mình chỉ lưu **username** (nên lưu càng ít càng tốt, do mình chọn **username** là khóa chính nên mình lưu **username**, bạn cũng có thể lưu **id** của user)
```
const dataForAccessToken = {
		username: user.username,
	};
```
Ta sẽ tạo ra một **access token** 
```
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
```
Trong đó hàm **generateToken** mình khai báo ở **./src/auth/auth.methods.js**
```
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};
```
Mình sử dụng package **jsonwebtoken**, trong đó có hai hàm cơ bản là **sign()** và **verify** nhưng hai hàm này là hàm **callback**, để có thể **export** giá trị trả về của hàm này khá phức tạp nên mình dùng package **util** để biến hàm **callback** này trả về một **Promise**.
```
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
```
Sau đó ta gọi hàm **sign** đã được "chỉnh sửa" để tạo **access token**
```
return await sign(
        {
            payload,
        },
        secretSignature,
        {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        },
);
```
Mặc dù là nó đã trả về một **Promise**, tuy nhiên mình lại không thích viết kiểu **.then()** nên mình dùng **async/await** để lấy kết quả và trả về một **access token**.

Bạn có thể tham khảo thêm về **callback, promise, async/await** ở đây: [JavaScript: từ Callbacks đến Promises và Async/Await](https://viblo.asia/p/javascript-tu-callbacks-den-promises-va-asyncawait-Do754Jq3ZM6)

Sau đó nữa, ta sẽ phát sinh ra **refresh token**
```
let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
if (!user.refreshToken) {
    // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    await userModel.updateRefreshToken(user.username, refreshToken);
} else {
    // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    refreshToken = user.refreshToken;
}
```
Ta dùng hàm **generate()** của package **rand-token** để phát sinh ra một token với kích thước tùy chọn. Mỗi tài khoản mình chỉ phát sinh một **refresh token**, nếu nó đã tồn tại (đã được phát sinh ở lần đăng nhập trước) thì không phát sinh lại, bạn cũng có thể mỗi lần đăng nhập phát sinh ra một **refresh token** mới toanh. Sau đó ta sẽ update **refresh token** đó cho user đó ở **./src/users/users.models** như sau:
```
exports.updateRefreshToken = async (username, refreshToken) => {
	try {
		await db
			.get(TABLENAME)
			.find({username: username})
			.assign({refreshToken: refreshToken})
			.write();
		return true;
	} catch {
		return false;
	}
};
```
Ngoài ra bạn cũng có thể sử dụng hàm **generateToken()** ở trên để phát sinh ra một **refresh token** nếu muốn nó có thời gian tồn tại như **access token** (nếu dùng thì nên đặt thời gian này lâu lâu một xíu).

Cuối cùng ta trả về những thứ đó cho client
```
return res.json({
    msg: 'Đăng nhập thành công.',
    accessToken,
    refreshToken,
    user,
});
```
Giờ cùng đi xem kết quả sau một khoảng thời gian đọc code hoa cả mắt nhé :grinning:
![](https://images.viblo.asia/390d589f-dd0e-40db-8916-2532b1b6ea34.png)
Giờ có **access token** và **refresh token** rồi, nhiệm vụ của bên front-end là lưu nó vào một chỗ nào đó.
## Phát sinh một access token khi cái cũ hết hạn
Ở API này, mình sẽ yêu cầu bên front-end gửi **access token** ở trong **headers** và **refresh token** ở **body** của **request**

* headers
```
{
    x_authorization: ... accessToken ...
}
```
* body
```
{
    refreshToken: ... refreshToken ...
}
```

Ở file **./src/auth/auth.routes.js**
```
router.post('/refresh', authController.refreshToken);
```
Tương ứng ở **./src/auth/auth.controllers.js**
```
exports.refreshToken = async (req, res) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	// Decode access token đó
	const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const username = decoded.payload.username; // Lấy username từ payload

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	// Tạo access token mới
	const dataForAccessToken = {
		username,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
	});
};
```
Ta khai báo hàm **decodeToken()** để decode **access token** cũ đã hết hạn trong **./src/auth/auth.methods.js** như sau
```
exports.decodeToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey, {
			ignoreExpiration: true,
		});
	} catch (error) {
		console.log(`Error in decode access token: ${error}`);
		return null;
	}
};
```
Ta vẫn dùng hàm **verify()** đã được "sửa" lại ở trên nhưng lần này có thêm thuộc tính **ignoreExpiration: true** mục đích để dù cho **access token** đó đã hết hạn nhưng vẫn cho verify. **Bạn không được dùng package *[jwt-decode](https://www.npmjs.com/package/jwt-decode)* để decode *access token* vì nó có thể decode bất kì *json token* nào mà không cần biết *khóa bí mật* của *access token*, những kẻ phá hoại sẽ có thể tạo ra một token có phần *payload* giống như *token* của bạn và họ có thể phát sinh ra một *access token* dựa vào lỗ hổng này** (mất công phải liên hệ với quản trị viên của app để xóa **refresh token** phải hônggg).

Khi đã decode được rồi (**access token** hợp lệ), ta sẽ lấy toàn bộ thông tin của user dựa vào thông tin của user đã lưu vào **access token** đó. Sau đó kiểm tra xem **refresh token** mà client gửi lên có giống **refresh token** đã lưu trong database không, nếu có ta sẽ phát sinh ra một **access token** mới (giống như lúc **login** và trả về thôi)

Cùng xem kết quả nào:

Phần **headers** như sau:
![](https://images.viblo.asia/d565840d-adcd-4111-8d71-6e74356899ac.png)
Và phần **body** như sau:
![](https://images.viblo.asia/b2ecca65-4bb6-47de-a421-112d8ce514a8.png)
## Xử lý đối với các API yêu cầu xác thực
Giả sử ta có một API để lấy thông tin user ở **./src/users/users.routes.js** sau khi đăng nhập như sau:
```
const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.get('/profile', isAuth, async (req, res) => {
	res.send(req.user);
});

module.exports = router;
```
API này sẽ yêu cầu các tham số như sau:
* headers
```
{
    x_authorization: ... accessToken ...
}
```
* body
```
{
    ... Thêm vào đây (nếu cần) ...
}
```
Ta sẽ cần có một **middleware** trung gian để xác thực có đúng client đã đăng nhập không, mình định nghĩa ở **./src/auth/auth.middlewares.js** (Xem thêm **middleware** [ở đây](https://viblo.asia/p/tim-hieu-ve-middleware-trong-expressjs-gVQelwaaGZJ))
```
const userModle = require('../users/users.models');

const authMethod = require('./auth.methods');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Bạn không có quyền truy cập vào tính năng này!');
	}

	const user = await userModle.getUser(verified.payload.username);
	req.user = user;

	return next();
};
```
Ta cũng sẽ cần **access token** được đính kèm trong phần **headers** sau đó ta sẽ verify token đó như sau:

Trong **./src/auth/auth.methods.js**
```
exports.verifyToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
};
```
Lần này **access token** phải còn thời gian tồn tại mới verify được nhé. Sau đó hàm này cũng trả về phần **data** được lưu trong đây. Cuối cùng ta sẽ kiểm tra lại một lần nữa **user** này có tồn tại không, nếu có tồn tại ta sẽ gán nó vào **req** để sử dụng ở các hàm sau.
```
const user = await userModle.getUser(verified.payload.username);
req.user = user;

return next();
```
kết thúc hàm ta cần sử dụng lệnh **next()** để chuyển qua hàm tiếp theo, nếu không xử lý sẽ bị treo tại đó.

Cuối cùng ở **./src/users/profile** ta cần require đến **middleware** đó và đặt vào đây:
```
const authMiddleware = require('../auth/auth.middlewares');

const isAuth = authMiddleware.isAuth;

router.get('/profile', isAuth, async (req, res) => {
	res.send(req.user);
});
```
Các API khác yêu cầu đăng nhập trước mới lấy/thêm/sửa/xóa được data thì bạn làm tương tự nhéee :+1:

Xem kết quả nào (ở đây mình chỉ trả về thông tin user, và mình lấy nó ở **req.user**)

Khi sai **access token** hoặc **access token** hết hạn:
![](https://images.viblo.asia/66e55f70-6226-4c76-89f5-31104bacc460.png)
**Access token** hợp lệ:
![](https://images.viblo.asia/ffa4a196-958b-4e95-9a33-bade5aba703b.png)
# Tổng kết
Vậy là xong rồi nè, mình vừa chia sẻ cách mà mình xác thực người dùng sử dụng JWT. Hy vọng bài viết sẽ giúp các bạn mới làm quen với NodeJS có thể tạo ra các API authentication để sử dụng cho các API tiếp theo.

Không quên phần code của mình trên github [tại đây](https://github.com/minhduc1612112/ExpressJS-Authentication), các bạn có thể tham khảo.