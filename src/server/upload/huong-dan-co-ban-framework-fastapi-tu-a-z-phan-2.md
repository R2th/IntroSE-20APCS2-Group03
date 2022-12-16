# Lời mở đầu
Hôm nay tôi sẽ cùng các bạn nghiên cứu tiếp framework FastAPi, cụ thể là về vấn đề bảo mật của framework này.

# Security
Hiện nay có rất nhiều cách giải quyết vấn đề về bảo mật, xác thực hay ủy quyền. Đây là 1 chủ đề khó, nhiều lập trình viên tốn kha khá công sức để viết code. Bài viết này sẽ gói gọn trong khuôn khổ của framework, giới thiệu các tools giúp bạn thực hiện chức năng bảo mật nhanh chóng và dễ dàng.

## Các chuẩn bảo mật
Phần này đi nhanh thôi, mặc định các bạn biết rồi đi :(.

### OAuth2
Là 1 chuẩn giao thức ủy quyền ra đời vào tháng 10 năm 2012, được sử dụng ở hầu hết mọi ứng dụng (web, mobile), cho phép người dùng cung cấp thông tin cá nhân bởi ứng dụng của bên thứ 3, cũng được dùng để cung cấp cơ chế cho việc xác thực người dùng.

![](https://images.viblo.asia/56417d20-27ce-4209-8547-c1bcbf446fe4.png)

### OAuth 1
Đây cũng là 1 chuẩn giao thức nhưng khác với OAuth2, phức tạp hơn vì có thêm cơ chế mã hóa giao tiếp. Tại thời điểm này, chuẩn này không còn được dùng nhiều nữa.

![](https://images.viblo.asia/8217df26-23a4-4cce-b910-bc92e4f18257.png)

### OpenID
Còn cũ hơn cả 2 cái trên, chuẩn này cần người dùng cung cấp username và password. Nói chung là có 1 nhà cung cấp OpenID, chúng ta tài khoản trên đó, tài khoản này có thể truy cập vào các trang web sử dụng cơ chế xác thực của OpenID.

![](https://images.viblo.asia/c7144b94-851a-4eb3-b1f2-682e041f4238.png)

### OpenID Connect
Based trên OAuth2, là 1 layer nằm phía trên giao thức OAuth2.

## Cơ chế bảo mật của FastAPI
Do based trên OpenAPI nên FastAPI thừa kế security flow của OpenAPI
- `apiKey`: chỉ là key mà thôi, có thể đến từ query param, header hoặc cookie.
- `http`: hệ thống xác thực của HTTP, bao gồm:
    -  bearer: header param với giá trị là một token (thừa kế từ OAuth2)
    -  HTTP Basic authentication
    -  HTTP Digest authentication
- `oauth2`
- `openIdConnect`

## Practice
Khu vực này mang tính chất minh họa, code chưa hoàn thiện :)

Giả sử hiện giờ tôi có 1 backend API trên server, 1 frontend trên Android, backend và frontend đã kết nối với nhau nhưng còn thiếu 1 ổ khóa nếu không request nào đều có thể dễ dàng thông qua frontend tới backend. Đơn giản nhất tôi dùng username và password, ở đây tôi dùng OAuth2 để build.

Trong hàm `main.py`, thêm cơ chế xác thực dựa trên login username/password của OAuth2. Khi chạy app, kiểm tra trong doc ta có 1 url api `/items/`, góc phải trên cùng có 1 box `Authorize` là nơi để điền username/password.

``` python
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
```

![](https://images.viblo.asia/dd20432f-f1da-48a1-a9c7-ad359fb90d93.png)

![](https://images.viblo.asia/f9a749f4-354a-495e-807e-68ccb8362e5b.png)

Áp dụng trong thực tế khi có frontend:
- Người dùng sẽ đăng nhập username/password trên frontend
- Frontend (browser chẳng hạn) gửi username và password tới url api (tokenUrl="token")
- API kiểm tra username và password, trả về kết quả là 1 token (code trên chưa có đoạn này, đoạn dưới sẽ đề cập)
    - Token là 1 chuỗi các ký tự dùng để xác thực người dùng.
    - Token tồn tại có thời hạn, thời hạn này do bên phía backend setup
- Frontend sau đó lưu token ở một nơi tạm thời nào đó (cookie, ram, ...)

Tạo 1 instance của OAuth2PasswordBearer `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")`. Ở đây tôi không tạo endpoint nhưng định nghĩa đường dẫn /token để người dùng lấy token sau đó, khá quan trọng khi làm việc với proxy.

Còn nếu muốn trả token về trong response body. Ok truyền param vào hàm `read_items` biến token có type là string phụ thuộc instance oauth2_scheme: `token: str = Depends(oauth2_scheme)`. Param này sẽ ngó qua request ở `Authorization` header, kiểm tra xem có token hay không và trả về, nếu không có thì sẽ báo lỗi 401 `UNAUTHORIZED`.

![](https://images.viblo.asia/c40c9b8b-f103-42d2-b127-3f3558ba969a.png)

## OAuth2 với Password và Bearer
Như tiêu đề, tôi sẽ dùng cách thức xác thực đơn giản nhất để tạo ổ khóa, đó là dùng username/password, vì vậy tôi cần validate khi người dùng điền username/password. Giả sử tôi có 1 dict user có username là `admin` và password là `123456`. Khi người dùng đăng nhập tôi phải so sánh xem 2 cái username có giống nhau không hoặc 2 cái password có giống nhau không.

``` python
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

user = {
    "username": "admin",
    "password": "123456"
}

app = FastAPI()


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    if not username == user["username"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    password = form_data.password
    if not password == user["password"]:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user["username"], "token_type": "bearer"}
```

![](https://images.viblo.asia/8c21684a-4661-49a2-a4c2-7072355e047d.png)

Ok ở đây có 2 trường hợp nhập sai => trả về error code 400. Như hình dưới là do tôi nhập sai tên.

![](https://images.viblo.asia/84378004-68a5-4efc-a3c9-518f728fd7b9.png)

Trường hợp đúng sẽ có hình như thế này:

![](https://images.viblo.asia/ad998a71-f88b-4518-8948-653cc7b676a5.png)

Nếu muốn bảo mật thêm, tôi phải tùy biến password nhận được, như thêm 1 hàm hash code chẳng hạn, để nếu mà hacker có hack mất pass ý thì chỉ lấy được hashed password thôi :)

``` python
def fake_hash_password(password: str):
    return "fakehashed" + password
```

### Get current user
Trước khi đi vào phần JWT, như các bạn biết phần `Pratice` trên tôi có giới thiệu sơ qua cơ chế bảo mật của fastapi là follow theo oauth2 nên phải import `OAuth2PasswordBearer`, api đòi hỏi đăng nhập nhưng username với password ở đâu ? Để giải quyết vấn đề này tôi kết hợp `OAuth2PasswordBearer` và `OAuth2PasswordRequestForm`. Cái sau cung cấp cho người dùng form để đăng nhập (url api), kết quả là tạo token, thông báo có token với type bearer này và cái trước phát hiện có token sẽ cho phép trả về thông tin người dùng. Nghe có vẻ hơi khó hiểu nhưng không sao tôi sẽ giải thích code cho bạn.

Code tổng thể là đây, tôi sẽ bóc tách từng phần ra.

``` python
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "password": "secret",
    },
}

app = FastAPI()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return user_dict


def fake_decode_token(token):
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    if not form_data.password == user_dict["password"]:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    return {"access_token": user_dict["username"], "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

Khai báo người dùng có các thông tin như sau
``` json
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "password": "secret",
    },
}
```

Khai báo User model thừa kế từ BaseModel của thư viện pydantic.
``` python
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
```

Hàm login này tạo 1 url api `token`, khi người dùng đăng nhập sẽ gửi 1 request về phía server, thông tin của request chứa trong biến `form_data`. Dựa trên attribute username của form_data, nếu đúng giá trị thì ta sẽ được 1user dict, ngược lại trả về lỗi 400. Lại xét tiếp attribute password của form_data, nếu sai cũng trả về lỗi 400, ngược lại trả về token là tên của người dùng (bạn có thể trả về token tùy ý, không nhất thiết là tên người dùng).

``` python
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    if not form_data.password == user_dict["password"]:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    return {"access_token": user_dict["username"], "token_type": "bearer"}
```

![](https://images.viblo.asia/3bcbe143-4b28-46aa-a64b-1be615ad9599.png)

Ok đã có token, chúng ta cần pass qua ô `Authorize` ở góc phải trên cùng. Chúng ta tiếp tục validate token bằng hàm get_current_user. Hàm này có param truyền vào là token dạng string, phụ thuộc vào instance oauth2_scheme đã khai báo ở trên. Token sau đó truyền vào hàm fake_decode_token, hàm này có nhiệm vụ decode token và trả về nguyên dạng (nếu bạn encode bằng thuật toán mã hóa nào đó thì lúc decode cũng phải dùng thuật toán đấy), nhưng ở đây tôi chỉ code ví dụ nên không có mã hóa token gì hết. Trong hàm fake_decode_token gọi hàm get_user xem thử token (ở đây là username) có trong db (ở đây tôi chỉ khai báo 1 biến dict, các bạn có thể tùy biến nhé) hay không, nếu có thì trả về user. Đấy validate chỉ đơn giản thế thôi, các bạn muốn phức tạp thì có thể tùy biến mấy hàm này.

![](https://images.viblo.asia/c7141c87-c137-498a-99a1-73c090fc9e04.png)

``` python
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return user_dict


def fake_decode_token(token):
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
```

Kết quả đúng khi trả về
![](https://images.viblo.asia/5409c095-a790-4559-9e97-c2d4c782e961.png)

Kết quả sai khi trả về
![](https://images.viblo.asia/36c00883-eabc-4129-895a-d6b32e575a88.png)

Cuối cùng khai báo hàm read_users_me để tạo api `/users/me`, biến current_user phụ thuộc vào hàm `get_current_user`.
``` python
@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

![](https://images.viblo.asia/e6c2097b-d412-4f38-8dad-d9c043cab561.png)

## OAuth2 với Password (có hashing), Bearer với JWT tokens
Nói sơ qua về JWT, viết tắt của `JSON Web Tokens`, là 1 chuỗi các ký tự, dạng mã hóa của Json. Ví dụ:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
Mỗi chuỗi phân cách nhau bằng dấu chấm. Ở trên có 3 chuỗi tương ứng với:
![](https://images.viblo.asia/27bfac4b-593d-40f4-8c98-3492d1e7928d.png)

Signature a.k.a chữ ký cần truyền vào là 1 token.

Các thư viện cần cài thêm: jose (để sing JWT token, passlib (hash password)
```
pip install python-jose[cryptography]
pip install passlib[bcrypt]
```

Phần này tập trung việc "băm" và xác thực mật khẩu nên tôi thêm một số thư viện vào.
``` python
from typing import Optional
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, status, Depends, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
```

Khai báo user dict
``` json
user = {
    "email": "xxx@gmail.com",
    "password": "secret",
}
```

Gọi instance cần thiết
``` python
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
```

Đầu tiên tôi cần các hàm dùng để xác thực người dùng với các biến truyền vào là user, tên người dùng, mật khẩu. Nếu username không khớp với `user["email"]` hoặc password không khớp với `user["password"]` đã được hash thì trả về False, ngược lại trả về user (True). 

Để mã hóa password, tôi gọi hàm get_password_hash,  instance `pwd_context` dùng thuật toán `Bcrypt` để mã hóa mật khẩu.

Để xác thực mật khẩu, tôi so sánh biến password được truyền vào và password của user trong db bằng hàm verify_password. Cơ chế so sánh tôi không cần quan tâm bởi instance `pwd_context` hỗ trợ sẵn rồi.
``` python
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(user, username: str, password: str):
    if not username == user["email"]:
        return False
    hashed_password = get_password_hash(user["password"])
    if not verify_password(password, hashed_password):
        return False
    return user
```

Tiếp, nếu bạn thông qua validate username/password thì sẽ nhận được token trả về, thấy quen không :), bên trên đã code rồi đấy còn hàm dưới đây sẽ thêm các cơ chế bảo mật như: mã hóa, thời gian tồn tại. Mục đích của hàm là encode 1 json data (có thể là thông tin người dùng hay thứ khác tùy bạn).

Tạo 1 biến copy data gọi là `to_encode`. Khởi tạo biến `expire` có thời gian tồn tại là 15 phút kể từ thời điểm hiện tại. Biến `to_encode` sẽ cập nhật `expire`. Thời điểm để tôi dùng thư viện jose tới rồi :), thư viện này encode json dict `to_encode` thành JWT với Secret Key và thuật toán `HS256`. Biến `ACCESS_TOKEN_EXPIRE_MINUTES` là thời gian tồn tại khoảng 30 phút, nếu không truyền vào hàm `create_access_token` thì mặc định là 15 phút.
```
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```

``` python
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

Sau tất cả, hàm `authenticate_user` và `create_access_token` sẽ được gọi ở đâu ? Tất nhiên là trong hàm login rồi :). Hàm này nhận request từ form, request đi qua hàm `authenticate_user` để validate. Nếu kết quả false thì trả về lỗi 401, ngược lại tạo token với payload là email. và trả về token đó. Đơn giản thế thôi.
``` python
@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_info = authenticate_user(user, form_data.username, form_data.password)
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_info["email"]}, expires_delta=access_token_expires
    )

    return {"status": 1, "result": {"access_token": access_token}}
```

Nếu bạn để ý ở các api thường đòi hỏi api key ở header, cho nên tôi cũng sẽ code thêm 1 url api đòi hỏi access token. Hàm `text_to_speech` có biến truyền vào là 1 Header parameter, biến này sẽ được decode để lấy payload, phần decode dùng thuật toán và Secret Key  y hệt encode. Validate xem 2 cái user có giống nhau không, nếu giống thì "do something" thôi, trả về kết quả còn ngược lại trả về lỗi 400.
```
@app.post("/tts")
async def text_to_speech(access_token: Optional[str] = Header(None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        # detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email == user["email"]:
            # do something here
            return {"status": 1, "result": {"data":1}}
        else:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
```

Tổng hợp tất cả các block code ở trên:
``` python
from typing import Optional
from datetime import datetime, timedelta

from fastapi import FastAPI, HTTPException, status, Depends, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

user = {
    "email": "xxx@gmail.com",
    "password": "secret",
}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(user, username: str, password: str):
    if not username == user["email"]:
        return False
    hashed_password = get_password_hash(user["password"])
    if not verify_password(password, hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_info = authenticate_user(user, form_data.username, form_data.password)
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_info["email"]}, expires_delta=access_token_expires
    )

    return {"status": 1, "result": {"access_token": access_token}}


@app.post("/tts")
async def text_to_speech(access_token: Optional[str] = Header(None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        # detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email == user["email"]:
            # do something here
            return {"status": 1, "result": {"data": 1}}
        else:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
```

Page 1
![](https://images.viblo.asia/59a70a0c-7c71-411e-a4ab-cc2f2f38c451.png)

Page 2
![](https://images.viblo.asia/dc8ef939-8611-4586-9f35-a150476e18f1.png)

Page 3: Copy access token từ page 2 và nhét vào header box
![](https://images.viblo.asia/2820867a-ad45-4113-92f9-30d8f329d650.png)

# Kết luận
Xong rồi đấy, có lẽ sẽ có phần 3 bởi framework này có nhiều thứ để vọc. Ai đi ngang qua tiện thể cho 1 upvote để mình có động lực viết tiếp. Cám ơn vì đã đọc đến tận đây :bow:

# Reference
https://fastapi.tiangolo.com/tutorial/security/

https://jwt.io/

https://oauth.net/2/

https://dzone.com/articles/open-id-connect-authentication-with-oauth20-author

https://medium.com/@greekykhs/whats-the-difference-oauth-1-0-and-oauth-2-0-9f1d22e06963

https://en.wikipedia.org/wiki/OAuth