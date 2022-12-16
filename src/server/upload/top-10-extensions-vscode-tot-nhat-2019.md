**Vscode** được biết đến là một công cụ editor vô cùng đa dụng, với một kho extensions khổng lồ hộ trợ tận răng. Hôm nay mình sẽ giới thiệu cho mọi người một vài extensions có thể nói là tốt nhất hiện nay của thằng Vscode này.

# REST Client
Có thể những ai đã từng code Resful API thì hẳn không còn lạ lẫm với Postman, một công cụ giả lập request hữu dụng. Bây giờ bạn có thể biến Vscode của mình thằng Postman bằng cách cài đặt thêm extensions REST Client

![](https://images.viblo.asia/60c18f34-bcd8-4fab-8783-cd6756635fc2.gif)

Công việc đơn giản chỉ cần tạo một file **.http** hoặc **.rest**. Tiếp đến nhập kiểu method và url cần request sau đó send request là ta sẽ nhận được response ở màn hình bên phải.

```js
    // request.http
    GET https://example.com/comments/1 HTTP/1.1
    GET https://example.com/comments/1
    https://example.com/comments/1
```
**Query Strings**
```
    GET https://example.com/comments?page=2&pageSize=10
```
**Request Headers**
```js
    User-Agent: rest-client
    Accept-Language: en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4
    Content-Type: application/json
```
**Request Body**
```js
    POST https://example.com/comments HTTP/1.1
    Content-Type: application/xml
    Authorization: token xxx

    <request>
        <name>sample</name>
        <time>Wed, 21 Oct 2015 18:27:50 GMT</time>
    </request>
```
**Có thể chỉ định file path để sử dụng như một body, bằng cách sử dụng dấu `<`**
```js
    POST https://example.com/comments HTTP/1.1
    Content-Type: application/xml
    Authorization: token xxx

    < C:\Users\Default\Desktop\demo.xml
    POST https://example.com/comments HTTP/1.1
    Content-Type: application/xml
    Authorization: token xxx

    < ./demo.xml
```
**Một tính năng vô cùng hay ho Generate Code từ request**

![](https://images.viblo.asia/9e01f0ec-53ed-46c9-b4c2-d8a950b54d8c.gif)

và có rất nhiều những tính năng tuyệt vời khác anh em có thể đọc docs: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
Hoặc xem docs trên vscode ở phần details extensions

# Live Sass Compiler
Sẽ không còn phải lo lắng về việc mất công sửa code **sass** và chạy lại phần mềm biên dịch sang **css** nữa. Giờ chúng ta đã có **Live Sass Compiler**, chỉ cần save là có file css mới ngay

![](https://images.viblo.asia/ea56b3fc-a778-427b-bef2-2b135d1731a1.gif)

Trước hết ta cần config compiler:
**`Ctrl + ,`** nhập **Live Sass** chọn **Live Sass Compiler** tiếp đến **Edit in settings.json**

![](https://images.viblo.asia/3f0dd221-24c9-4362-ad75-dac31a8efa30.png)

```json
   "liveSassCompile.settings.formats": [
        {
            "format": "compressed",
            "extensionName": ".min.css",
            "savePath": "/dist/css/"
        }
    ],
   "liveSassCompile.settings.generateMap": false
```

Config chi tiết hơn tại : https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md

- Bấm `F1` or `ctrl+shift+P` và  nhập `Live Sass: Watch Sass` để bắt đầu compilation hoặc `Live Sass: Stop Watching Sass` để dừng compilation
- Bấm `F1` or `ctrl+shift+P` và  nhập `Live Sass: Compile Sass - Without Watch Mode` để biên dịch Sass hoặc Scss một lần.

# AutoRename
Tự động sửa cả thẻ đóng và thẻ mở mà không cần phải mất công đì mò thẻ đóng.

![](https://images.viblo.asia/886102c7-b955-40a3-87ae-188a4cb75e96.gif)

**Configuration**

Nếu bạn chỉ muốn nó tư động rename ở một vài ngôn ngữ thì hãy thêm vào mục `auto-rename-tag.activationOnLanguage` để set ngôn ngữ.
Còn mặc định nó đang là `["*"]` và sẽ hoạt động với tất cả các ngôn ngữ.

```json
    {
        "auto-rename-tag.activationOnLanguage": [
            "html",
            "xml",
            "php",
            "javascript"
        ]
    }
```

# Bracket Pair Coloruzer 2
Ngoặc đóng ngoặc mở và indent giờ sẽ dễ dàng kiểm tra khi đã có **Bracket Pair Coloruzer**  

![](https://images.viblo.asia/c918a37e-bb13-452b-944b-c94776dcd4ac.gif)

![](https://images.viblo.asia/69ab882d-9858-41d5-86a1-bf4bc0d0451d.png)

Định nghĩa các màu được sử dụng, cho phép sử dụng tên màu, mã hex và `rgba()`

```json
    "bracket-pair-colorizer-2.colors": [
        "Gold",
        "Orchid",
        "LightSkyBlue"
    ]
```

```json
    "bracket-pair-colorizer-2.forceUniqueOpeningColor"
```

![](https://images.viblo.asia/88e2a8a7-3a5c-4e35-8a1a-91316d02f80c.png) 

![](https://images.viblo.asia/b17b306b-73ad-47a6-8047-2a05d3307436.png)

```json
    "bracket-pair-colorizer-2.forceIterationColorCycle"
```

![](https://images.viblo.asia/2a95d2c2-8753-4fcc-ba88-5184b6130c48.png)

**Quick-start:**
```json
    {
        "key": "shift+alt+right",
        "command": "bracket-pair-colorizer-2.expandBracketSelection",
        "when": "editorTextFocus"
    },
    {
        "key": "shift+alt+left",
        "command": "bracket-pair-colorizer-2.undoBracketSelection",
        "when": "editorTextFocus"
    }
```
Để xem chi tiết hơn về thiết lập mọi người có thể xem tại detail extensions

# CSS Peek
Giúp bạn tìm đến file nguồn định nghĩa css của `class` hoặc `id` một cách nhanh chóng. Không cần phải `ctrl + shift + f ` tìm toàn bộ project để xem phần định nghĩa của css nữa.

![](https://images.viblo.asia/956d496e-d9bb-4b31-a504-6a99b908c24a.gif)

- **Peek**:  load phần định nghĩa và sửa ngay tại chỗ không cần chuyển đến file định nghĩa`(Ctrl+Shift+F12)`
- **Go To**: Nhảy đến phần định nghĩa css và tùy chỉnh (F12)
- **Hover**: Hiển thị nội dung định nghĩa (Ctrl+hover)

# HTML CSS Support
![](https://images.viblo.asia/fc9fe5d8-9c45-449f-8d34-525b8443ea00.gif)

**Tính Năng**

- Hỗ trợ  Zen Coding với `class` và `id` một cách nhanh chóng
- Hỗ trợ kết nối file css remote 
- Có sử dụng [ vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice)

**Ngô ngữ hỗ trợ**

- html
- laravel-blade
- razor
- vue
- pug
- jade
- handlebars
- php
- twig
- md
- nunjucks
- javascript
- javascriptreact
- typescript
- typescriptreact

**Remote Style Sheet**

Không cần thiết phải có file ở local mà có thể kết nối với file remote
```json
    "css.remoteStyleSheets": [
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
    ]
```
**Sử Dụng**

`ctrl + space` để xem danh sách các attributes

# Prettier
Một extension format code tuyệt vời không thể thiếu 

![](https://images.viblo.asia/30a1fdfc-2f5c-4dc2-a90f-a3d989566df5.gif)

**Sử Dụng**

 (CMD/CTRL + Shift + P)
 ```js
    // format tất cả file
    1. CMD + Shift + P -> Format Document
    OR
    // format phần được chọn
    2. CMD + Shift + P -> Format Selection
 ```
**Thiết lập Format On Save**
```js
    "editor.formatOnSave": true,
    // Enable per-language
    "[javascript]": {
        "editor.formatOnSave": true
    }
```
# Live_Server
Thường thì đối với những file satics như **.html** khi chạy sau đó sửa đổi code nếu muốn xem sự thay đổi thì ta cần reload lại browser. **Live Server** sẽ hỗ trợ điều đó.

![](https://images.viblo.asia/4a4f45e0-9ac7-4a9f-93bd-3a7e8f9e0b40.gif)

**Shortcuts để bật/tắt Server**
- Bật/Tắt **Go Live**

![](https://images.viblo.asia/adb92779-43dc-40fb-955e-a8c1dfa413ca.jpg)

- Chuôt phải vào một file **html** và chọn `Open with live server`.

    ![](https://images.viblo.asia/82247e57-69ce-48cc-bc18-11a9c5fd31b0.gif)

- Hoặc khi đang ở một file **html** thì chuột phải và chọn `Open with Live Server

![](https://images.viblo.asia/0d5bacbc-1d7c-4947-9d13-7701b5052d1f.jpg)

# Indent Rainbow
Đây là một extension hỗ trợ cho việc format indent 

![](https://images.viblo.asia/dae1dc9b-e1fd-4a23-bf74-0f3b3be8f33c.gif)

**Configuration**
```json
      // Có thể chỉ định những ngôn nhữ nào được áp dụng với extension (Nếu để trống là áp dụng cho tất cả các ngôn ngữ).
      "indentRainbow.includedLanguages": [] // for example ["nim", "nims", "python"]

      // Hoặc vô hiệu hóa với những ngôn ngữ nào (để trống là không có ngôn ngữ nào).
      "indentRainbow.excludedLanguages": ["plaintext"]

      // Delay đến khi trình soạn thảo update (ms).
      "indentRainbow.updateDelay": 100 
      
      // Định nghĩa màu của indent
      "indentRainbow.colors": [
        "rgba(255,255,64,0.07)",
        "rgba(127,255,127,0.07)",
        "rgba(255,127,255,0.07)",
        "rgba(79,236,236,0.07)"
      ]
```
và còn rất nhiều tùy chỉnh khác mọi người có thể tham khảo tại detail extension **Indent-Rainbow**

# Theme Material
![](https://images.viblo.asia/fbb5f3f8-5e9e-4807-a91b-f291db681580.gif)

Theme Material Với rất nhiều theme đẹp vừa mắt. Ngoài thì chúng ta cũng có thể config một vài thông số cơ bản như sau

**Ví dụ cơ bản**
```json
    "editor.tokenColorCustomizations": {
        "[Material Theme]": {
            "comments": "#229977"
        }
    },
```

**Ví dụ nâng cao**
```json
    "editor.tokenColorCustomizations": {
        "[Material Theme VARIANT]": {
            "textMateRules": [
                {
                    "scope": [
                        "punctuation.definition.comment",
                        "comment.block",
                        "comment.line",
                        "comment.block.documentation"
                    ],
                    "settings": {
                        "foreground": "#FF0000"
                    }
                }
            ]
        },
    },

    "workbench.colorCustomizations": {
        "[Material Theme VARIANT]": {
            "sideBar.background": "#ff0000",
        }
    },
```

# Tổng Kết
Trên đây là 10 extensions rất hữu ích của Vscode và hiện cũng đang được rất nhiều người sử dụng. Mong là chia sẻ này có thể giúp các bạn có thêm cho mình được những lựa chọn tốt nhất về các extensions vscode


#### Nguồn:
https://www.youtube.com/watch?v=c5GAS_PMXDs&feature=youtu.be