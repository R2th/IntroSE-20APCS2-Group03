# 1. Lời mở đầu 
Xin chào các bạn . Extensions là những công cụ hữu dụng cho trang web của chúng ta . Với mỗi extensions khác nhau, chúng sẽ phục vụ cho những trang web nhất định. Vậy mục đích để viết extension là gì ? Extension dịch ra tiếng việt tức là phần mở rộng,  Thực chất chính là thêm những công cụ hay thêm tính năng mở rộng mà giúp ích cho trải nghiệm web của chúng ta.  Chẳng hạn như extension nổi tiếng như google translate dùng để tìm kiếm từ trong các trang web và dịch những từ có trong trang web đó.

Ngày hôm nay với chút hiểu biết của mình .  Mình sẽ chia sẻ cho các bạn làm thế nào để tạo ra một extension cho trình duyệt. Trong phạm vi bài viết mình xin chia sẻ cách viết extension cho trình duyệt Chrome . Chúng ta cùng bắt đầu nào :D 
Các bạn chỉ cần biết về Javascript và một chút VueJS  thì có thể tạo cho mình một extension rồi ! 

# 2. Nội dung chính.
Tạo extension khá đơn giản. Extension giống như một ứng dụng web được chạy độc lập và được nhúng vào trình duyệt của chúng ta. Với VueJS, chúng ta có thể tạo extension một cách chuyên nghiệp và cực kì đơn giản.

Đầu tiên chúng ta sẽ sử dụng Vue CLI để tạo ra một ứng dụng Vue như tạo một ứng dụng web bình thường nhé: (trước tiên bạn hãy cài Vue CLI trước, có thể lên trên trang https://cli.vuejs.org/guide/installation.html để tham khảo :D )  Ở đây mình dùng npm để quản lý package và cài đặt vue.

Cài vue CLI : 
```
$ npm install -g @vue/cli
```

Khi nào bạn kiểm tra ```$  vue --version ``` và cho kết quả như này thì máy tính đã cài vue cli rồi nhé : 
```
@vue/cli 4.5.9
```
Khởi tạo ứng dụng vue : 

```
 $ vue create demo_extension
```
Bình thường đến bước này chúng ta đã tạo ra một ứng dụng và có thể chạy được trên trình duyệt web. Nhưng đối với extension, một thứ quan trọng nhất không thể thiểu đấy chính là bước sau đây: 
Sau khi tạo ứng dụng vue chúng ta sẽ vào folder gốc là demo_extension và tạo thêm một file ```manifest.json``` . Nôm na file này là phục vụ mục đích kê khai cho trình duyệt biết những thông tin của ứng dụng. Và quan trọng hơn hết là để giúp extension của chúng ta hoạt động được.
Mọi người tạo thêm cho mình file content-script.js nhé. File này sẽ thực thi các tác vụ js trên browser.
Cấu trúc folder của chúng ta bây giờ sẽ như sau : 


Tạm thời trong file manifest.json chúng ta sẽ khai báo như dưới đây : 
```js
{
    "name": "Demo extension",
    "version": "1.0.0",
    "manifest_version": 2,
    "description" : "This is demo extension",

    "browser_action": {
        "default_icon": {
            "16": "assets/icons/logo16.png",
            "32": "assets/icons/logo32.png"
            "48": "assets/icons/logo48.png"
            "128": "assets/icons/logo128.png"

        },
        "default_title": "Demo Extension",
        "default_popup": "index.html"
    },
    "content_scripts": [{
        "js": ["content-scripts.js"],
        "matches": ["https://viblo.asia/*"]
    }],
    
}
```

Trong đó :
- name - Tên extension sẽ hiện trong store của chrome extension hay hiển thị ở trong menu chọn extension của trình duyệt

- version: Phiên bản extension của chúng ta
- manifest_version: Phiên bản của manifest, hiện tại trên document của chrome extension có tài liệu hướng dẫn với phiên bản manifest version 3 
- browser_action: Tại đây chúng ta sẽ khai báo các biểu tượng, tiêu đề khi hover chuột vào hay popup hiện lên khi chúng ta click vào icon của extension ở góc trên bên phải trình duyệt. 
- content_scripts: ở đây chúng ta sẽ khai báo những file script để tương tác từ extension ```js``` với trình duyệt hay những trang web sử dụng được với extension ở attribute: ```matches```
...

Ngoài ra chúng ta còn nhiều thuộc tính để khai báo nữa như page_action, background,  storage, comands ... mọi người có thể vào trang chủ của chrome ở đây https://developer.chrome.com/docs/extensions/mv2/manifest/ để tìm hiểu thêm nhé .

Với tệp tin như trên thì hiện tại chúng ta cũng chưa chạy extension được đâu =))
Sau khi khởi tạo ứng dụng cũng như thêm file manifest.json. Các bạn thêm cho tạo cho mình thêm một thư mục assets để chứa các file ảnh icons nhé . 


Với ứng dụng Vue bình thường khi chúng ta chạy alias npm run serve thì vue sẽ chạy tự động và biên dịch khi có file thay đổi . Nó được khai báo trong ```package.json```
```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  ```
  
  Ok, vậy để chúng ta chạy được extension này thì chúng ta cần biên dịch nó như chạy trên production và chúng ta sẽ chạy ``` npm run build ``` nhé :D Khi này vue sẽ compile source code trong ứng dụng vue của chúng ta vào folder ```dist```  
  Và folder này cũng chính là folder chúng ta sẽ import vào chrome để làm extension.
  
  Bây giờ chúng ta hãy copy file ```content-scripts.js```,  ```manifest.json``` và folder ```assets``` lúc nãy vào trong folder dist này nhé. Và lưu ý trong file manifest.json những đường dẫn cần được trỏ đúng đến target của nó. File manifest.json luôn phải để ở thư mục ```root``` nhé ở đây là trong thư mục dist. 
  
  Và chúng ta sẽ vào menu Extension của Chrome và bật chế độ dev mode lên :D  Chọn load unpacked và tận hưởng thành quả ! 
  
  ![](https://images.viblo.asia/b26dd408-1b33-4839-aa7d-3a3e75e662ac.gif)

# 3. Tổng kết
Và qua những bước cơ bản như trên, chúng ta đã có thể tạo một extension  dễ dàng với VueJS. Trong phạm vi bài viết mình chỉ giới thiệu qua về cách hoạt động của một extension và làm thế nào để tạo ra nó, về phần để tối ưu hơn và làm sao chúng ta có thể thay thế việc phải copy tay các file manifest.json hay file icon .. bằng một công cụ đấy là webpack cũng như Để ứng dụng cũng như tìm hiểu sâu hơn nữa , hẹn mọi người vào những bài viết sau. Xin cảm ơn mọi người đã theo dõi đến cuối bài viết. Tạm biệt và hẹn gặp lại !