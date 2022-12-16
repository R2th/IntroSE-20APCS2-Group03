Công việc nào cũng vậy, sau một thời gian chúng ta sẽ tự nhận thấy có những thứ cứ lặp đi lặp lại hàng ngày. Mình cũng vậy, công việc của mình được thực hiện rất nhiều trên Google Chrome và sẽ thật hữu ích nếu như chúng ta có riêng cho một extension để tự động những công việc lặp đi lặp lại nhàm chán ấy, cũng là một cách để tiết kiệm thời gian và hơn thế nữa là nhìn có vẻ chuyên nghiệp hơn rất nhiều. Bạn có thể trèn thêm các chức năng khác cho một trang web mà bạn sử dụng nó thường xuyên, lấy dữ liệu, lưu trữ...và nhiều thứ hay ho khác nữa bạn có thể làm với một extension.

## Cấu trúc của một Chrome Extension
Về cơ bản, một Chrome Extension chủ yếu sẽ được viết bằng Javascript và HTML. Bạn có thể tổ chức các thư mục tùy ý sao cho phù hợp và tiện lợi nhất trong quá trình code. Với mình thì sẽ như thế này:
![](https://images.viblo.asia/301a44c5-7aaf-4ae4-8eed-2e80c3e30de9.png)
Dưới đây, chúng ta sẽ đi sâu vào bên trong để tìm hiểu chức năng của từng file

## Chức năng của các thành phần
### 1. manifest.json
 Đây là file config cho extension của chúng ta. Nó chứa thông tin cơ bản về extension, các file sẽ được chạy, inject...
```json
{
    "name": "Nhaccuatui Extension",
    "version": "0.0.1",
    "manifest_version": 2,
    "description" : "Extension for Nhaccuatui",
    "icons": {
        "16": "images/icon.png",
        "48": "images/icon.png"
    },
    "browser_action": {
        "default_icon": {
            "19": "images/icon.png",
            "38": "images/icon.png"
        },
        "default_title": "Nhaccuatui Extension",
        "default_popup": "popup.html"
    },
    "background": {
        "page": "background.html",
        "persistent": false
    },
    "content_scripts": [
        {
            "matches": [
                "*://nhaccuatui.com/bai-hat/*",
            ],
            "js": [
                "scripts/content.js",
            ],
            "css": [
                "styles/font.css",
                "styles/main.css"
            ],
            "run_at": "document_idle"
        }
    ],
    "permissions": [
        "clipboardWrite",
        "storage"
    ]
}
```
- `name`: Là thuộc tính xác định tên extension của bạn
- `version`: Phiên bản hiện tại, Chrome sẽ dựa vào đây để xác định xem extension của bạn có bản cập nhật mới hay không
- `manifest_version`: Xác định phiên bản của chính file manifest.json
- `description`: Miêu tả chi tiết hơn về extension
- `icons`:  Icon của extension sẽ được hiển thị trên store. Trong trường hợp này, mình để chúng trong thư mục images
- `browser_action`:
    - `default_icon`: Icon sẽ được sử dụng để hiển thị trên trình duyệt
    - `default_title`: Title sẽ được hiển thị khi hover chuột vào icon của extension
    - `default_popup`: Đây là file HTML sẽ được hiển thị khi bạn mở extension ra. Chúng ta sẽ nói rõ hơn về file này trong phần sau
- `background`:
    - `page`: Đây sẽ là trang chạy ngầm bên dưới và thường sẽ chỉ chứa một script tag để đưa file javascript vào
    - `persistent`: Là flag có giá trị là `true` hoặc `false`. Xác định trang background sẽ được chạy như thế nào
- `content_scripts`:
    - `matches`: Xác định các trang web mà bạn muốn thêm các nội dung của mình vào
    - `js`: Là danh sách các file javascript sẽ được inject vào các trang web đã được khai báo bên trên
    - `css`: Tương tự như thuộc tính `js` nhưng là danh sách các file css
    - `run_at`: Thời điểm inject các file content bên trên vào trang web
- `permissions`: Khai báo các quyền hạn truy cập cho extension
### 2. Content script
Đây là các thành phần được inject vào các trang web mà bạn khai báo ở thuộc tính `matches` trong file `manifest.json`. Các thành phần này được chạy cùng môi trường với trang web hiện tại nên bạn có thể sử dụng javascript, css để thao tác lên các thành phần DOM. Nhờ đó bạn có thể thay đổi giao diện trang, thêm các button, thêm các chức năng khác mà bạn muốn.
### 3. Popup page
Đây là trang sẽ chạy và hiển thị khi bạn mở extension của mình lên. Cấu trúc của nó cũng tương tự như những trang HTML khác. Trong trường hợp của mình thì đó trang `popup.html`. Trang này được chạy ở một môi trường khác so với các content script. Có thể hiểu nôm na là chúng được chạy ở một cửa sổ trình duyệt khác so với cửa sổ trình duyệt hiện tại. 
```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="./styles/lib/bootstrap.min.css">
        <link rel="stylesheet" href="./styles/page.css">
        <title>My Extension</title>
    </head>
    <body>
        <div class="wrapper">
            <h1>This is popup page</h1>
        </div>
        <script src="./scripts/lib/bootstrap.min.js"></script>
        <script type="module" src="./scripts/popup.js"></script>
    </body>
</html>
```
Bạn sẽ tạo giao diện chính cho extension của mình tại đây. Trang sẽ được load lại mỗi khi extension được mở.
Bạn có thể sử dụng `localStorage` để lưu trữ dữ liệu giống như một database. 
### 4. Background page
Cũng giống như trang` popup.html`, trang `background.html` cũng sẽ chạy cùng một môi trường. Tuy nhiên nó không có giao diện mà đơn thuần chỉ chứa một script tag với mục đích đưa vào đó file `background.js`.
```html
<html>
    <body>
        <script type="module" src="./scripts/background.js"></script>
    </body>
</html>
```
Mặc định trang này sẽ được tự động sinh ra và tự động inject file `background.js`, nhưng trong trường hợp bạn muốn custom nó thì đây sẽ là nơi để bạn thực hiện điều đó

File `background.js` được sử dụng với mục đích tương tự như một server, nó lắng nghe các sự kiện được gọi từ trang popup hay trang content. Xử lý, lưu trữ dữ liệu cũng như là trả về data trong response.
## Giao tiếp gữa các thành phần
Vừa rồi chúng ta đã phần nào hiểu được chức năng của các thành phần trong một extension. Như chúng ta đã biết, file `content.js` được chạy cùng với trang web hiện tại mà nó được inject vào. Trong khi đó, `popup.js` và  `background.js` được chạy ở cùng một môi trường và chúng tách biệt hoàn toàn so với của sổ hiện tại mà trình duyệt đang hiển thị. Vì thế, để có sự kết nối giữa các file script ở các môi trường khác nhau, Chrome sử dụng các message để thể hiện sự giao tiếp đó.

Chúng ta sẽ cùng nhau làm môt ví dụ để hiểu hơn vấn đề này nhé.
Extension của chúng ta sẽ  có chức năng là lưu lại các bài hát mà mình thích trên https://www.nhaccuatui.com/ để hàng ngày có thể nghe lại chúng mà không phải mất công tìm kiếm. Tất nhiên là thực tế thì trang nhạc nào cũng có chức năng tạo playlist rồi. Nào hãy cùng bắt đầu thôi.
#### `content.js`
Trong phần này, chúng ta sẽ xử lý việc chèn thêm vào trang một button mà khi click vào nó, chúng ta sẽ lấy dữ liệu ở trang hiện tại và gửi lên cho `background.js` xử lý:
```js
window.onload = function () {
    var button = document.createElement('button');

    button.innerHTML = 'Add to Playlist';
    document.body.prepend(button);

    button.addEventListener('click', function () {
        var link = window.location.href;
        var name = document.querySelector('.name_title').innerText;
        chrome.extension.sendMessage({
            type: 'add-song', 
            data: {link, name}
        });
    });
}
```
Để ý rằng, ở thuộc tính `matches` trong  `manifest.json`, chúng ta có một giá trị là `"*://nhaccuatui.com/bai-hat/*"`. Như vậy đoạn script trên sẽ chỉ được chạy ở trang mà bài hát đang được phát.
#### `background.js`
Vừa rồi ở `content.js` chúng ta đã gửi một message đi. Vậy muốn `background.js` nhận được thông điệp này thì chúng ta phải đăng ký cho nó lắng nghe những request được gửi đến
```js
chrome.extension.onMessage.addListener(
    function (request) {
        switch(request.type) {
            case 'add-song':
                addSong(data);
                break;
            case 'remove-song':
                break;
        }
});

function addSong(data) {
    var songs = getSongs();
    songs.push(data);
    localStorage.songs = JSON.stringify(songs)
}

function getSongs() {
    if (!localStorage.songs) {
        localStorage.songs = JSON.stringify([]);
    }

    return JSON.parse(localStorage.songs);
}
```
Khi nhận được message, chúng thực hiện lưu data vào trong `localstorage`.
#### `popup.js`
Như đã thấy chúng ta sử dụng `popup.js` trong trang `popup.html` do đó tại đây chúng ta sẽ xử lý ở `popup.js` để hiển thị danh sách các bài hát đã được lưu.
```js
$(document).ready(function () {
    var songs =  JSON.parse(localStorage.songs || '[]');
    var songHTML = null;

    songs.forEach(song => {
        songHTML = $(`<a href="${song.link}" target="_blank">${song.name}</a>`);
        $('.wrapper').append(songHTML);
    })
});
```
Như vậy, mỗi lần extension được mở ra, chúng ta sẽ thấy danh sách các bài hát mà mình đã lưu được hiển thị ra ở đây.
Bạn có thể thêm các tính năng khác nữa như tự động phát các bài hát trong danh sách, hay download tất cả chúng về máy của mình.
#### Load extension
- Các bạn vào google chrome, gõ vào địa chỉ `chrome://extensions/`
- Click vào nut `Load unpacked` bên góc trái màn hình
- Tìm đến folder chứa extension của chúng ta, thế là xong
## Tổng kết
Vừa rồi chúng ta đã tìm hiểu về các thành phần của một chrome extension cũng như các chức năng và sự giao tiếp giữa chúng.
Hi vọng với những chia sẻ đó, các bạn sẽ phần nào hiểu hơn về cấu trúc của một extension để có thể tự tạo riêng cho mình một extension, phục vụ các nhu cầu của bản thân.

Dưới đây là một extension phục vụ cho công việc của mình. Chức năng của nó là lưu lại dữ liệu của các ticket, tạo template pull request, tạo message gửi cho team trên chatwork...
Các bạn có thể tham khảo ở đây nhé https://github.com/dongoclam/rg-plugin.