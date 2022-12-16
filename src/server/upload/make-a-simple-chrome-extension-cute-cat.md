![](https://images.viblo.asia/90319c07-8c1f-422e-87e4-e41f2ab79ad0.png)![](https://images.viblo.asia/90319c07-8c1f-422e-87e4-e41f2ab79ad0.png)![](https://images.viblo.asia/90319c07-8c1f-422e-87e4-e41f2ab79ad0.png)

Dạo gần đây mình có tìm hiểu 1 ít về Chrome Extension nên hôm nay mình xin viết 1 bài để chia sẻ với các bạn kiến thức đã học được, mong nhận được nhiều ý kiến của các bạn về bài viết.

# 1. Chrome Extension là gì:
- Extension có thể hiểu là 1 chương trình nhỏ cho phép user thực hiện customize khi lướt web .
- Extension cho phép user thực hiện điều chình lại Chrome theo nhu cần và sở thích, đôi khi là để phục vụ cho công việc, đi làm ở Sun* mà không có Chat++ for Chatwork để thả emotion chém gió thì cũng buồn thật (yaoming).
- Extension được develop bằng HTML, CSS và JS như khi làm web bình thường nên bạn nào có kiến thức về web đều có thể làm được.

# 2. Giới thiệu bài toàn và solution:
- Extension mình đang build có chức năng đơn giản là show hình "quàng thượng mèo", khi click thì sẽ chuyển sang hình tiếp theo,.
- Hình thì mình sẽ sử dụng [GIFPGY](https://giphy.com/search/cat) để lấy hình, GIFPHY có cung cấp sẵn [API](https://developers.giphy.com/docs/) nên có thể dễ dàng lấy hình từ GIFPHY.
- OK, let's go.

## a. Init Chrome Extension:
- Để tạo Chrome Extension, đầu tiên bạn cần tạo folder chứa source code, trong ví dụ của mình thì folder `CuteCatExtension`
- Trong folder vừa tạo, tạo file `manifest.json` như sau:
    ```json
    // manifest.json
    {
      "name": "Cute Cat Extension",
      "description": "This extension show random cat image using GIFPHY's API",
      "version": "1.0",
      "manifest_version": 2
    }
    ```
- Trong file `manifest.json`  mình đã khai báo những field cơ bản để tạo 1 extension, trong đó `name`, `version`, `manifest_version` là những field required, những field còn lại là optional.
- File `manifest.json` chứa những thông tin về extension của mình, bạn có thể tham khảo thêm về file `manifest.json` tại [đây](https://developer.chrome.com/extensions/manifest).

## b. Run test Chome Extension:
- Sau khi tạo xong file `manifest.json` bạn có thể run test Chrome Extension của mình r =)).
- Để run test Chrome Extension bạn truy cập `chrome://extension`, bật `Developer mode`.
- Click vào `Load unpacked` và chọn folder chứa source code Chrome Extension, trong ví dụ của mình là folder `CuteCatExtension`.
- Chrome Extension của bạn sẽ được sẽ được hiển thị ở toolbar của Google Chrome và trang Extension management của Google Chrome.

![](https://images.viblo.asia/5b141471-a52d-4b3d-a2c7-82f64085b391.png)
- Bạn có thể tham khảo thêm về quá trình run test ở [đây](https://developer.chrome.com/extensions/getstarted#manifest).

## c. Add icon:
- Hiện tại Chrome Extension của mình đang hiển thị ở toolbar với icon là chữ `C` (chữ cái đầu tiên của `CuteCatExtension`) và sử dụng icon mặc định của Chrome Extension ở màn hình Chrome Extension management.
- Mình sẽ thực hiện update file `manifest.json`, thêm 2 field `default_action` của field `browser_action` để show icon trên toolbar và `icons` để show icon mà mình mong muốn trên màn hình Chrome Extension management.
    ```json
    // manifest.json
    {
      ...
      "browser_action": {
        "default_icon": "images/icon.png"
      },
      "icons": {
        "16": "images/icon.png",
        "32": "images/icon.png",
        "48": "images/icon.png",
        "128": "images/icon.png"
      }
      ...
    }
    ```
![](https://images.viblo.asia/4e7b89b6-9f56-4c5a-a2ab-7b71bc8e1fa4.png)
- Bạn có thể tham khảo thêm về icon của Chrome Extension tại [đây](https://developer.chrome.com/extensions/user_interface#icons).

## d. Add popup:
- Hiện tại khi click vào icon của Chrome Extension trên toolbar chưa có cửa sổ popup hay thứ gì khác hiện ra.
- Mình muốn khi click vào icon của Chrome Extension trên toolbar sẽ xuất hiện cửa sổ popup show hình "quàng thượng mèo".
- Để làm điều đó mình tiếp tục update file `manifest.json`, thêm field `default_popup` của field `browser_action` và tạo file `popup.html`.
    ```html
    // popup.html
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <h1>Cute Cat</h1>
        <img src="https://media2.giphy.com/media/CjmvTCZf2U3p09Cn0h/200w.gif"/>
        <p>Source: <b>GIFPHY</b></p>
      </body>
    </html>
    ```
    
    ```json
    // manifest.json
    {
      ...
      "browser_action": {
        "default_icon": "images/icon.png",
        "default_popup": "popup.html"
      },
      ...
    }
    ```
    ![](https://images.viblo.asia/170be8f5-b13a-4130-b5b6-5c3ffc67dfde.png)
- Ở ví dụ này mình đang sử dụng user interface là `popup`, Chrome Extension cung cấp cho các bạn các dạng user interface khác như `tooltip`, `omnibox`, `context menu`, các bạn có thể thêm khảo thêm tại [đây](https://developer.chrome.com/extensions/user_interface#additional_features).

## d. Add javascript and jQuery for popup:
- Mình cần implement sự kiện`click` cho `<img>` nên mình cần thêm `jQuery` vào trong file `popup.html` trước.
- Mình sẽ thêm thẻ `<script>` vào phần `<head>` của `popup.html` với với src là [CDN](https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js) của jQuery.
    ```html
    // popup.html
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>  
      </head>
      <body>
        ...
      </body>  
    </html>
    ```
- Sau khi re-load và run Chrome Extension bạn sẽ thấy báo lỗi như sau

![](https://images.viblo.asia/ae2f4ca1-66a1-4e18-a713-05c17d334959.png)
- Click vào `Errors` để xem chi tiết

![](https://images.viblo.asia/a12b12a5-dd56-4d72-9f26-95a8b11d5887.png)

- Để fix lỗi này mình sẽ update file `manifest.json`.
    ```json
    {
     // manifest.json
      ... 
      "content_security_policy": "script-src 'self' https://ajax.googleapis.com; object-src 'self'"
    }
    ```
- Bạn có thể tham khảo cách fix tại [đây](https://stackoverflow.com/questions/34950009/chrome-extension-refused-to-load-the-script-because-it-violates-the-following-c).
- Ở đây mình sẽ chọn 1 cách khác đơn giản hơn, thay vì sử dụng CDN là src của `<script>`, mình sẽ download file `jquery.min.js` bỏ trong thư file `javascripts/lib/jquery.min.js` làm src của `<script>`.
    ```html
    // popup.html
    <html>
      <head>
        <script src="javascripts/lib/jquery.min.js"></script>  
      </head>
      <body>
        ...
      </body>  
    </html>
    ``` 
- Với cách này bạn không cần phải update `manifest.json` mỗi lần thêm 1 thư viện mới, chỉ cần download thư viện và bỏ trong project để xài, cách này cũng giúp thư viện được load nhanh chóng, dễ dàng và đảm bảo hơn, không phục thuộc vào CDN nữa.
- Mình tạo thêm file `javascripts/popup.js` để implement sự kiện `click` của `<img>` trong file `popup.html`.
    ```javascript
    $(document).ready(function(){
      alert('WORK');
    });
    ```
- Thêm file `javascripts/popup.js`vào file `popup.html`.
    ```html
    // popup.html
    <html>
      <head>
        <script src="javascripts/lib/jquery.min.js"></script>  
      </head>
      <body>
        ...
      </body>  
    </html>
    ``` 

## e. Load random gif every click:
- Mình cần xem trước và reseach 1 chút về cách gọi [API](https://developers.giphy.com/docs/) của GIFPHY để load random gif.
- Đầu tiên bạn cần login vào [GIFPHY](https://developers.giphy.com/), điền đầy đủ thông tin để tạo app mới và lấy `api_key`.
- `api_key` cho app của mình là `CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt` .

![](https://images.viblo.asia/476b615e-3c72-41d4-8317-cf5f2c3468b9.png)
- Tiếp theo là API để random gif, bạn có thể đọc document về API random gif tại [đây](https://developers.giphy.com/docs/#operation--gifs-random-get).
- OK, API enpoint mình cần gọi sẽ là `https://api.giphy.com/v1/gifs/random?api_key=CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt&tag=cat`
- API response data trả về sẽ là [GIF Object](https://developers.giphy.com/docs/#gif-object)
- Mình sẽ lấy `url` của gif thông qua câu truy vấn sau 
    ```
    response['data']['images']['original']['url']
    ```
- Sau khi đã reseach xong, mình sẽ implement sự kiện `click` cho `<img>`, thêm `id="js-img"` để làm selector, thay `src="images/loading.gif"` để hiển thị khi chưa load được gif nào.
    ```
    // popup.html
    <html>
    ...
    <body>
    ...
     <img id="js-img" src="images/loading.gif"/>
    ...
    </body>
    </html>
    ```
- Update file `javascripts/popup.js` như sau
    ```javascript
    // javascripts/popup.js
    $(document).ready(function(){
      randomImage();

      $('#js-img').on('click', function() {
        randomImage();
      });

      function randomImage() {
        $('#js-img').attr('src', '/images/loading.gif');

        $.ajax({
          url: 'https://api.giphy.com/v1/gifs/random',
          type: 'GET',
          dataType: 'JSON',
          data: {
            api_key: 'CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt',
            tag: 'cat'
          },
          success: function(response) {
            var url = response['data']['images']['original']['url'];
            $('#js-img').attr('src', url);
          }
        });
      }
    });
    ```
- Kết quả thu được như sau

![](https://images.viblo.asia/4d22adc3-268f-439a-8ea9-8afff2eadff8.gif)
- Các bạn có thể thấy sau khi click thì mình sẽ phải chờ 1 lúc để API trả gif về và hiển thị.
- Mình sẽ cải thiện việc này ở phần sau bằng cách preload gif sau khi khi install Chrome Extension và preload gif sau khi click 1 vài lần.

## f. Preload gif onInstalled event:
- Ở phần này mình muốn giới thiệu với các bạn về `background scripts`, các bạn có thể tham khảo thêm tại [đây](https://developer.chrome.com/extensions/background_pages).
- `Background scripts` được dùng để quản lý các event của extension.
- Các event cuae extension có thể là mở 1 tab mới, đóng 1 tab hoặc xóa 1 bookmark trên trình duyệt.
- Trong ví dụ của mình, mình sẽ dùng `background scripts` để quản lý sự kiện khi `Chrome Extension` vừa được install.
- Để sử dụng `background scripts` mình thêm 1 files `"background"` vào file `manifest.json`.
    ```json
    // manifest.json
    ...
    "background": {
      "scripts": ["javascripts/lib/jquery.min.js", "javascripts/background.js"],
      "persistent": false
    }
    ````
- Field `"scripts"` là 1 mảng lưu các file cần được load vào `backgrouns scripts`.
- Field `"persistent"` được recommend nên set giá trị là `false`.
- Tạo file `javascripts/background.js`
    ```javascript
    // javascripts/background.js
    chrome.runtime.onInstalled.addListener(function() {
      var gifUrls = []
      var loaded = true;

      $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search',
        type: 'GET',
        dataType: 'JSON',
        data: {
          api_key: 'CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt',
          q: 'cat',
          offset: 0
        },
        success: function(response) {
          var data = response['data']
          for (var i = 0; i < data.length; i++) {
            var url = data[i]['images']['original']['url'];
            gifUrls.push(url);
          }

          chrome.storage.sync.set({gifUrls: gifUrls}, function() {
            console.log('\nInitialized gifUrls: ');
            for (var i = 0; i < gifUrls.length; i++) {
              console.log(gifUrls[i]);
            }
          });

          chrome.storage.sync.set({loaded: loaded}, function() {
            console.log('\nInitialized done');
          });
        }
      });
    });
    ```    
- Lần này mình sử dung [API search](https://developers.giphy.com/docs/#operation--gifs-search-get) để lấy về nhiều gif 1 lúc thay vì chỉ lấy 1 gif như [API random](https://developers.giphy.com/docs/#operation--gifs-random-get).
- Mình sử dụng thêm 1 params `offset`, sau mỗi lần gọi thì cộng thêm 25 vào giá trị của offset để lấy hình mới so với lần gọi trước.
- Mình sử dụng event [onInstalled](https://developer.chrome.com/extensions/runtime#event-onInstalled) của [chrome.runtime API](https://developer.chrome.com/extensions/runtime) để gọi API search của GIFPHY, event này được gọi khi Chrome Extension được install lấn đầu tiên, update lên version mới hay  khi Chrome update lên version mới.
- Mình sử dụng method `set` của [chrome.storage API](https://developer.chrome.com/extensions/storage) để lưu hình đã load về.
- Trong ví dụ trên, mình đã gọi hàm `set` 2 lần, bạn có thể gộp lại thành 1 lần như sau
    ```javascript
    chrome.storage.sync.set({gifUrls: gifUrls, loaded: loaded}, function() {

    });
    ```
- Để sử dụng [chrome.storage API](https://developer.chrome.com/extensions/storage), bạn phải thêm 1 field [`"permissions"`](https://developer.chrome.com/extensions/declare_permissions) trong file `manifest.json`.
    ```json
    // manifest.json
    {
      ...
      "permissions": ["storage"]
    }
    ```

## g. Show loadded gif:
- Sau khi đã preload gif, mình sẽ show gif đã được preload khi click vào icon trên toolbar và show popup.
- Update file `javascripts/popup.js`
    ```javascript
    // javascript/popup.js
    $(document).ready(function(){
      var gifUrls;
      var loaded;
      var offset = 25;
      var index = 0;

      showFirstUrl();

      function showFirstUrl() {
        chrome.storage.sync.get(['gifUrls', 'loaded'], function(result) {
          gifUrls = result['gifUrls'];
          loaded = result['loaded'];

          if (loaded) {
            $('#js-img').attr('src', gifUrls[index]);
            index = index + 1;
          }
        });
      }
    });
    ```
- Mình sử dụng method `get` của [chrome.storage API](https://developer.chrome.com/extensions/storage) để lấy hình đã load về làm `src` của `<img>`.

## Click event:
- Mình cũng update `click` event của `<img>` để mỗi lần click sẽ show ra 1 lấn mới và load thêm nhiều hình nếu click đủ 10 lần.
```javascript
// javascript/popup.js
...
$('#js-img').on('click', function() {
  showNextUrl();

  if (index !=0 && index % 10 == 0) {
    loadMoreUrl();
  }
});

function showNextUrl() {
  if (!loaded) {
    showFirstUrl();
  } else {
    $('#js-img').attr('src', gifUrls[index]);
    index = index + 1;
  }
}

function loadMoreUrl() {
  $.ajax({
    url: 'https://api.giphy.com/v1/gifs/search',
    type: 'GET',
    dataType: 'JSON',
    data: {
      api_key: 'CquT5TApZFwM8KxqlEVCKJuAuFieI6Zt',
      q: 'cat',
      offset: offset
    },
    success: function(response) {
      var data = response['data']
      for (var i = 0; i < data.length; i++) {
        var url = data[i]['images']['original']['url'];
        gifUrls.push(url);
      }

      offset = offset + 25;
    }
  });
}
````

# 3. Document:
- Mình để source code ở [github](https://github.com/LeTanThanh/CuteCatExtension), các bạn có thể download về và chạy thử.
- Các bạn cũng có thể tìm hiểu thêm về  Chrome Extension ở [đây](https://developer.chrome.com/extensions).
- Cám ơn các bạn đã đọc bài viết của mình (thankyou).