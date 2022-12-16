Sau sự ra mắt của Skynet với việc cung cấp nơi lưu trữ cho các Dapp, file,...Skynet đã tích hợp thêm SkyDB để tạo dựng những tài khoản phi tập trung và lưu trữ file trên nó. Tuy nhiên hiện tại SkyDB đang chỉ hỗ trợ lưu trữ dưới dạng text chứ chưa trực tiếp lưu trữ file, có thể do họ muộn tận dụng những tính năng lưu file có sẵn của Skynet để chỉ việc lưu lại địa chỉ của file trên mạng trên **SkyDB**.

![](https://images.viblo.asia/950c55be-c702-4400-bee9-92dcb97665ef.png)


# Giới thiệu

Trong bài việt ngày hôm nay mình sẽ giới thiệu các bạn các xây dựng một ứng dụng với SkyDB và deploy ứng dụng đó trên lên mạng Skynet.
Trong bài viết lần này thì mình sẽ xây dựng ứng dụng hoàn toàn chỉ với html, css, js nên sẽ chỉ yêu cầu các bạn có một chút kiến thức web base là được, việc tương tác với skydb cũng vô cùng đơn gian, vì cơ bản thì đây cũng mới chỉ là một tính năng mới của Sia nên chưa thực sự có nhiều chức năng.

Trong bài viết này mình sẽ xây dựng một game 2048 có thể lưu lại điểm cao nhất của người chơi lên mạng Skydb.

# Thực hành
Trong bài này có sử dụng 2 package là **regenerator-runtime** cho các hàm async và **skynet-js** để tương tác với SkyDB. Các API mình sẽ dùng trực tiếp từ trang chủ : 

https://nebulouslabs.github.io/skynet-docs/?javascript--browser#skydb

Tại thời điểm bài viết thì các function dưới đây mới chỉ được implement cho các **Browser JS**

Khởi tạo project với các package (Bài này mình sẽ dùng webpack để build):

**package.json:**

```js
{
  "name": "2048",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "git@github.com:TheAndre980/2048.git",
  "license": "MIT",
  "dependencies": {
    "skynet-js": "^2.7.0",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  }
}
```

Tiếp đó sẽ xây dựng các hàm tương tác với mạng Skynet:

Đầu tiên là hàm để lấy **public key** tương ứng từ seed đầu vào, **seed** này có thể hiểu nó giống như một mã **mnemonic** của các bạn vậy, với mỗi seed sẽ có 1 public key tương ứng. Và để tương tác với **Skynet** thì chúng ta cũng phải khởi tạo một client được map với node có địa chỉ https://siasky.net

```js
import { async } from 'regenerator-runtime';
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';
const dataKey = 'bestScore';
const client = new SkynetClient('https://siasky.net');
window.getPublickey = seed => {
  const { publicKey } = genKeyPairFromSeed(seed);
  return publicKey.slice(0, 10) + '...' + publicKey.slice(publicKey.length - 10, publicKey.length);
};

```

Tiếp theo là hàm để lấy score tương ứng với seed đã được lưu trên Skynet :

Về cơ bản thì cách tương tác với SkyDB là khá đơn giản, trong đó còn có **dataKey** mà mình đã định nghĩa ngay phía trên  **const dataKey = 'bestScore';** . Các bạn có thể hiểu là dataKey này như cái keyword để mình query dữ liệu trên SkyDB - Do đó về cơ bản thì chỉ cần 2 thứ là seed và dataKey là có thể lấy được dữ liệu mình cần trên SkyDB.

```js
window.getScore = async seed => {
  const { publicKey } = genKeyPairFromSeed(seed);
  try {
    const { data } = await client.db.getJSON(publicKey, dataKey);
    return data;
  } catch (_) {
    return false;
  }
};
```

Cuối cùng thì có get thì cũng phải có **set**, để lưu trữ trên SkyDB thì cũng rất đơn giản, chúng ta cũng chỉ cần có seed và dữ liệu muốn lưu trữ. Có một điểm rất đặc biệt của SkyDB là sẽ không tốn fee để lưu trữ dữ liệu. điều này khá đột phá cho với các dạng blockchain hệ lưu trữ như Ocean hay Arweave - chúng sẽ đòi hỏi người dùng phải trả một lượng phí nhất định coi như là phí duy trì dữ liệu, tuy nhiên tại thời điểm hiện tại SkyDB miễn phí hoàn toàn (Kể cả việc upload lên skynet cũng là hoàn toàn miễn phí, thậm chí còn không yêu cầu phải có privatekey để xác thực như SkyDB):

```js
window.setScore = async (seed, bestScore) => {
  const { privateKey } = genKeyPairFromSeed(seed);
  try {
    await client.db.setJSON(privateKey, dataKey, { bestScore: bestScore });
  } catch (error) {
    console.log(error);
  }
};
```

Dữ liệu sẽ được map vào theo giá trị của **dataKey**, dữ liệu lưu sẽ có dạng **JSON**

Vậy là xong cơ bản 3 hàm chính để tương tác với **SkyDB**, việc tiếp theo để có một ứng dụng hoàn chỉnh là sẽ phải xây dựng phần giao diện :

![](https://images.viblo.asia/25bbd71d-bd35-4341-a77b-78a77b0a2b99.png)


Luồng hoạt động cơ bản của ứng dụng sẽ là :

- Người dùng **Login** với mã **seed** của mình vào ô textarea kia
- Sau khi **Login** ứng dụng sẽ tự động gọi hàm **getScore** để lấy điểm cao nhất của user theo giá trị của seed được nhập vào.

Sau khi đăng nhập và chơi, seed đã được lưu và hiển thị public key tương ứng. Khi game over, user có thể chọn save score để lưu lại số điểm của mình, khi này sẽ gọi đến hàm **setScore**

![](https://images.viblo.asia/957e1080-25bc-4338-9290-e4541043f4c9.png)

Toàn bộ code phần giao diện tương đối ngắn :

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>2048</title>

    <link href="main.css" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" href="./favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="apple-touch-startup-image" href="apple-touch-startup-image-640x1096.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
    <!-- iPhone 5+ -->
    <link rel="apple-touch-startup-image" href="apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)">
    <!-- iPhone, retina -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui">
</head>

<body>

    <div class="container">
        <div class="heading">
            <h1 class="title">2048</h1>
            <div class="scores-container">
                <div class="score-container" id="score">0</div>
                <div class="best-container" id="bestscore">0</div>
            </div>
        </div>

        <div class="above-game">
            <p class="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
            <a class="restart-button">New Game</a>
            <div style="width:100%;justify-content: flex-end;display: flex;">
                <textarea id="seed" name="message" rows="2" cols="40" style="margin-right: 68px;"></textarea>
                <p id="address" style="margin-right: 150px; display: none;font-weight: bold;"></p>
                <a class="login-button" id="login" onclick="login()" style="background: #8f7a66;
                                                            border-radius: 3px;
                                                            padding: 0 20px;
                                                            text-decoration: none;
                                                            color: #f9f6f2;
                                                            height: 40px;
                                                            line-height: 42px;
                                                            display: block;
                                                            text-align: center;
                    ">Login</a>
                <a class="login-button" id="logout" onclick="logout()" style="background: #8f7a66;
                    border-radius: 3px;
                    padding: 0 20px;
                    text-decoration: none;
                    color: #f9f6f2;
                    height: 40px;
                    line-height: 42px;
                    display: block;
                    text-align: center;
                    display: none;
                    ">Logout</a>
            </div>
            <p id="wallet"></p>

            <div class="file-input" id="input_file" style="position: absolute;
                                            z-index: 999;
                                            background: #8f7a66;
                                            top: 50%;
                                            padding: 10px;
                                            left: 49vw;
                                            min-width: 60vw;
                                            color: white;
                                            border: 1px solid white;
                                            transform: translate(-50%, -50%);
                                            display: none;">
                <script src="main.js"></script>
                <script>
                    function login() {
                       (async () => {
                        let seed = document.getElementById("seed").value;
                        let data = await getScore(seed)
                        console.log("data",data)
                        let publicKey = getPublickey(seed)
                        if(seed){
                            localStorage.setItem('seed', seed);
                            document.getElementById('login').style.display = 'none'
                            document.getElementById('seed').style.display = 'none'
                            document.getElementById('logout').style.display = 'block'
                            document.getElementById('address').style.display = 'block'
                            document.getElementById('address').innerHTML = 'Address: ' + publicKey
                        }
                        if(data) {
                            localStorage.setItem("bestScore", parseInt(data.bestScore))
                        } else {
                            localStorage.setItem("bestScore", 0)
                        }
                       })()
                    }

                    function logout() {
                        localStorage.removeItem('seed')
                        document.getElementById('login').style.display = 'block'
                        document.getElementById('seed').style.display = 'block'
                        document.getElementById('logout').style.display = 'none'
                        document.getElementById('address').style.display = 'none'
                    }
                </script>
            </div>

            <div class="game-container">
                <div class="game-message">
                    <p></p>
                    <div class="lower">
                        <a class="keep-playing-button">Keep going</a>
                        <a class="retry-button">Try again</a>
                        <a class="save-button" id="save">Save Score</a>
                        <script>
                            let save = document.getElementById("save");

                            save.addEventListener("click", saveScore)

                            function saveScore() {
                                (async () => {
                                    let seed = localStorage.getItem("seed");;
                                    let bestScore = localStorage.getItem("bestScore");
                                    await setScore(seed, bestScore);
                                    alert("Save score")
                                })()
                            }
                        </script>
                    </div>
                </div>

                <div class="grid-container">
                    <div class="grid-row">
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                    </div>
                    <div class="grid-row">
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                        <div class="grid-cell"></div>
                    </div>
                </div>

                <div class="tile-container">

                </div>
            </div>

            <p class="game-explanation">
                <strong class="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>
            </p>
        </div>
    <script src="bind_polyfill.js"></script>
    <script src="classlist_polyfill.js"></script>
    <script src="animframe_polyfill.js"></script>
    <script src="keyboard_input_manager.js"></script>
    <script src="html_actuator.js"></script>
    <script src="grid.js"></script>
    <script src="tile.js"></script>
    <script src="local_storage_manager.js"></script>
    <script src="game_manager.js"></script>
    <script src="application.js"></script>
</body>

</html>
```

Còn đây là những thư viện dependencies cần có cho phần giao diện:
https://github.com/justins21/2048/tree/master/dist

Để ý trong các dependencies này sẽ có một file là **main.js** đây là file bundle từ chính file **index.js** mà chúng ta viết phía trên

# Build and Deploy

Để build file **main.js** thì chúng ta chỉ đơn giản với command:

```bash
yarn webpack-cli index.js
```

Để deploy ứng dụng lên mạng Skynet thì trước tiên phải cài package **skynet**:

```bash
npm install -g skynet
```

Sau khi hoàn thành đầy đủ ta có một folder **dist**, từ đây chỉ cần gọi :

```bash
skynet upload dist
```

Kết quả thành công trả về:

```
Successfully uploaded directory! Skylink: sia://fAKDAV1xhXdb9Zc--heSwRyshwtvwpBDd8GDU1mwQhsckw
```

Như vậy ứng dụng đã được đưa một cách thành công lên skynet. (Tương tự cho các ứng dụng được xây dựng bằng react - chúng ta chỉ cần đấy folder chứa file build tương ứng)


# Tham khảo
- Skydb API: https://nebulouslabs.github.io/skynet-docs/?javascript--browser#skydb
- Full code: https://github.com/justins21/2048