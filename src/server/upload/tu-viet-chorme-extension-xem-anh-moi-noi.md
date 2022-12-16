# Giới thiệu
Được lấy ý tưởng từ bài viết [Em thèm vếu](https://toidicodedao.com/2017/07/04/em-them-veu-tu-y-tuong-den-san-pham-chi-trong-30-phut/) trên trang tôi đi code dạo. Ở bài viết đó tác giả làm một extension mỗi khi click vào icon của extension thì sẽ show ra ảnh random
Mình thấy ý tưởng xem vếu khá là hay nên quyết định phát triển thêm cho nó.
Extension sẽ hiển thị một khung ảnh trong trình duyệtảnh sẽ tự động thay đổi sau mỗi 5 giây và có thể thay đổi kích thước, thêm chủ đề ảnh và di chuyển khung ảnh tự do tùy ý trong trình duyệt(xem ảnh mọi nơi )

![](https://images.viblo.asia/5e510f4b-8e72-4854-a58d-9f30fa5ec55f.png)

Popup chọn tag cho ảnh hiển thị

![Ảnh có thể thay đổi kích thước và di chuyển tùy ý trong trình duyệt](https://images.viblo.asia/2535f123-ad53-4eae-9015-a1702fc0b719.gif)

Có thể di chuyển và thay đổi kích thước

# Code
Code khá dài nên mình sẽ comment luôn trong code để các bạn dễ hiểu nhé!
## Cấu trúc thư mục

![](https://images.viblo.asia/7f911067-1257-4664-836e-1c484f2effc5.png)

Đầu tiên bạn tạo 1 thư mục để chứa các file như trên.

* css : Chứa các file css
* html: Chứa các file html như popup và các trang option
* js/externals :Chứa các file js được sử dụng bởi các trang bên ngoài như trang Popup, các trang option
* js/internal: Chứa các file js sẽ được inject vào bên trong website
* js/libraries:  Chứa các thư viện của bên thứ ba như Jquery, bootstrap,..
* logo.png: Icon hiển thị của extension
* manifest.json: Trái tim của extension, dùng để config mọi thứ cho extension, sẽ được nói rõ ở dưới

## File manifest.json
 `manifest.json` là file config cho extension, sẽ quyết định xem extension của bạn có những gì. Nội dung sẽ là như sau:
```
{
  "manifest_version": 2, //version của chrome extension bạn sử dụng
  "name": "gif everywhere", // tên của extension
  "description": "This extension get a random gif for relaxing", //mô tả extension
  "version": "2.0", //version extension của bạn
  "browser_action": {
    "default_icon": "logo.png", //icon của extension 
    "default_popup": "html/popup.html" //popup hiển thị khi click vào icon
  },
  "permissions": [ //khai báo quyền extension cần sử dụng, và các url mà extension sẽ chạy trên trang có url đó
    "activeTab", //quyền truy cập vào các tab đang hoạt động
    "http://*/*", 
    "https://*/*", //extension sẽ hoạt động trên tất cả các trang web 
    "storage"
  ],
  "content_scripts": [ //inject file js,css.. vào các trang web
    {
      "matches": [ // các trang sẽ được inject - trường hợp này là tất cả cá trang
        "http://*/*",
        "https://*/*"
      ],
      "js": [ //file js được inject 
        "js/libraries/jquery.min.js",
        "js/libraries/jquery-ui.js",
        "js/internal/background.js"
      ],
      "css": [ //file css được inject
        "css/jquery-ui.css",
        "css/background.css"
      ],
      "run_at": "document_end" // file sẽ được inject vào sau khi DOM được tải xong
    }
  ],
  "web_accessible_resources": [ // danh sách các file được inject trực tiếp vào trang web
    "js/internal/background.js"
  ]
}

```
## Popup
Popup là thành phần html sẽ được hiển thị khi chúng ta click vào biểu tượng của extension, bản chất của nó cũng là một trang html nên chúng ta có thể thỏa mái sử dụng css, js cho thành phần này.

Thường thì trang popup này sẽ hiển thị thông tin của extension, cho người dùng cài đặt và tương tác với extension.

Popup sẽ gồm 2 file chính là `html/popup.html` và `popup.js`, ngoài ra còn có 1 số thư viện bên ngoài như jquery, bootstrap, file css custom cho đẹp.
 nội dung file `popup.html` 
```
<!doctype html>
<html>
<head>
    <title>Getting Started Extension's Popup</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/popup.css">
    <script type="text/javascript" src="../js/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="../js/externals/popup.js"></script>
</head>
<body>
    <div class="container content">
        <div class="input-group">
            <input id="tag" type="text" class="form-control" name="tag" placeholder="Additional Tag">
            <span class="input-group-addon btn">Add Tag</span>
        </div>
        <hr>
        <div class="checkbox-inline">
            <label><input type="checkbox" value="cat">Cat</label>
        </div>
        <div class="checkbox-inline">
            <label><input type="checkbox" value="dog">Dog</label>
        </div>
        <div class="checkbox-inline">
            <label><input type="checkbox" value="animals">Animals</label>
        </div>
        <div class="checkbox-inline">
            <label><input type="checkbox" value="anime">Anime</label>
        </div>
        <hr>
        <div class="my-tags">
        </div>
        <hr>

        <div class="btn btn-success" id="play">Play</div>
        <div class="btn btn-warning" id="pause">Pause</div>
  </div>
</body>
</html>
```
File `popup.js` sẽ làm nhiệm vụ bật, tắt ảnh và thay đổi thẻ tag của ảnh.

Việc play hay pause  ảnh là do script ở file  `background.js` được inject vào các trang web  thực hiện, script ở phần popup ở một môi trường hoàn toàn khác nên sẽ không thể trực tiếp chạy script hay lấy dữ liệu của tab hiện tại được, mà phải thông qua [chrome.* APIs](https://developer.chrome.com/apps/api_index)
```
function addTag(tagName) { // sử dụng chrome storage để lưu trữ thẻ tag người dùng nhập thêm
    chrome.storage.sync.get('myTags', function(data) {
        if (Array.isArray(data.myTags)) {
            data.myTags.push(tagName);
        } else {
            data.myTags = [tagName];
        }
        chrome.storage.sync.set({myTags: data.myTags}, function() {
            console.log('The number is set to ' + data);
            renderTag(tagName);
        });
    });
}

function deleteTag(tagName) { // Xóa bỏ tag từ chrome storage
    chrome.storage.sync.get('myTags', function(data) {
        let id = data.myTags.indexOf(tagName);
        if (id !== -1) {
            data.myTags.splice(id, 1);
        }
        chrome.storage.sync.set({myTags: data.myTags}, function() {
            console.log('The number is set to ' + data);
        });
    });
}

function renderTag(tagName) { // render checkbox tương ứng với thẻ tag
    $(".my-tags").append(`
        <div class="checkbox-inline">
            <label><input type="checkbox" value="${tagName}">${tagName}</label>
            <span class="delete-tag"> x</span>
        </div>`
    );
}

function renderAllTag() { // render tất cả các thẻ tag của người dùng
    chrome.storage.sync.get('myTags', function(data) {
        if (Array.isArray(data.myTags)) {
            data.myTags.forEach((item) => {
                renderTag(item)
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () { 
    renderAllTag();
    $("#pause").hide();
    $('#play').on('click', () => {
        chrome.tabs.executeScript(null, {code:"playImg()"});

        $("#pause").show();
        $("#play").hide();
    });

    $('#pause').on('click', () => {
        chrome.tabs.executeScript(null,
          {code:"pauseImg()"});
        window.close();
        $("#pause").hide();
        $("#play").show();
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // get trang thái pause, play của ảnh trên trang
        chrome.tabs.sendMessage(tabs[0].id, {message: "get status"}, function(response) {
            if (response.isPlaying) {
                $("#pause").show();
                $("#play").hide();
            }
            $(".checkbox-inline input").each((index, element) => {
                let thth = $(element)[0].value;
                let id = response.tagList.findIndex((tag) => { return tag === $(element)[0].value});
                if (id >= 0) {
                    $(element).attr('checked', true);
                }
            });
        });
    });

    $(document).on('change', ".checkbox-inline input", (e) => { // thêm hoặc xóa tag khi người dùng click vào checkbox
        let tag = e.target.value;
        let message = '';
        if (e.target.checked) {
            message = 'add tag';
            
        } else {
            message = 'delete tag';
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: message, tag: tag});
        });
    })

    $(".input-group-addon").on('click', () => { // thêm thẻ tag
        let tag = $('#tag').val();
        if (tag !== '') {
            $('#tag').val('');
            addTag(tag);
        } else {
            console.log('khong nhap gi');
        }
        
    });

    $(document).on("mouseover", ".checkbox-inline", function() { //hiển thị nút xóa tag khi hover chuột qua checkbox
        if (!$(this).find('input')[0].checked) {
            $(this).find("span").css('display', 'inline');
        }
    });
    $(document).on("mouseout", ".checkbox-inline", function() {
        $(this).find("span").css('display', 'none');
    });

    $(document).on("click", ".delete-tag", function() { // khi người dùng xóa tag
        let tagName = $(this).parent().find("input").val();
        $(this).parent().remove();
        deleteTag(tagName);
    })
});
```
## Inject file js
Có thể inject nhiều file vào trong website, trong project này khá đơn giản nên chúng ta chỉ cần inject một file là đủ rồi, file `background.js` sẽ được inject vào mọi trang mà trình duyệt mở, đoạn script trong file sẽ nhận lệnh từ popup của extension thông qua  [chrome.* APIs](https://developer.chrome.com/apps/api_index) để thực hiện hiển thị ảnh.
```
var tagList = ["cat"]; // tag mặc định
var img = 0; // biến cục bộ để setInterval
var isPlaying = false; //trang thái ảnh có đang chạy hay không

function renderStatus(statusText) { // hiển thị trạng thái load ảnh
$('#status').text(statusText);
}

function renderImage(imageData) { //append url image nhận được vào thẻ html
    $('#image-wrap').attr('href', imageData.url)
    $('#image').attr('src', imageData.image_original_url)
}

async function getUrl() { // get random url của ảnh
    let tag = tagList[Math.floor(Math.random()*tagList.length)];
    if (tag === undefined) {
        return;
    }
    renderStatus('Loading for ' + tag + ' ...');
    let url = 'https://api.giphy.com/v1/gifs/random?api_key=6Mlyf4s706n6UOGc8MxfbIJIMXpLwj4i&tag=' + tag;
    let result = await fetch(url);
    let jsonResult =  await result.json();
    await renderImage(jsonResult.data);
    renderStatus('');
}

var textnode = '\
    <div id="wrap-extension">\
        <div id="content1" style="display: none;">\
            <a id="image-wrap" href="" target="_blank"><img width="100%" id="image" /></a>\
            <div id="status"></div>\
            <br/>\
        </div>\
    </div>';

function playImg() { // thực hiện play ảnh
    $("#content1").show();
    getUrl();
    img = setInterval(() => {
        getUrl();
    }, 5000);
    isPlaying = true;
}

function pauseImg() { // dừng hiển thị
    $("#content1").hide();
    console.log(img);
    clearInterval(img);
    isPlaying = false;
}

$(document).ready(function(){

    $("body").append(textnode);

    $("#head1").on("click", function(ev) {
        var content = $("#content1");
        if (content.css('display') === "none") {
            content.show();
            playImg();
        } else {
            pauseImg();
        }
    });
    
    $('head').prepend('<script>isVip=true;</script>');
    $('#wrap-extension').draggable({ containment: "window" }).resizable({handles: 'e, w'});
    chrome.runtime.onMessage.addListener((request, port, sendResponse) => {
        switch (request.message) {
            case 'get status':
                sendResponse({tagList: tagList, isPlaying: isPlaying});
                break;
            case 'add tag':
                tagList.push(request.tag);
                console.log(tagList, 'thêm')
                break;
            case 'delete tag':
                let id = tagList.indexOf(request.tag);
                console.log(id)
                if (id !== -1) {
                    tagList.splice(id, 1);
                }
                console.log(tagList, 'xóa')
        }
    })

});
```
# Kết
Vậy là chúng ta đã có một extension xem ảnh động ngay trong các website khác
Tuy nó hoạt động nhưng code vẫn còn khá smell, mong được sự góp ý của các bạn

Link github: https://github.com/ththth0303/ext các bạn có thể tải về và dùng thử

Tham khảo:
* https://developer.chrome.com/extensions/overview
* https://developer.chrome.com/extensions/api_index
* https://kipalog.com/posts/Viet-extension-cho-Chrome-Phan-1
* https://toidicodedao.com/2017/07/04/em-them-veu-tu-y-tuong-den-san-pham-chi-trong-30-phut/