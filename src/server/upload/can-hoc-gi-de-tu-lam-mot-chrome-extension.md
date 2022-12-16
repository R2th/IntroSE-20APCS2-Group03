<div align="center">
    
# Lời mở đầu

</div>

Trong thời đại CNTT hiện nay, khi mà nhà nhà, người người đều có máy tính cá nhân, smartphone và wifi 4G phủ sóng khắp mọi nơi thì chắc hẳn việc lướt web đọc tin tức, giải trí đã trở thành một phần không thể thiếu của cuộc sống. Và không phải trang web nào cũng có các chức năng bạn muốn (facebook không có chức năng tải trực tiếp video clip, ...) hoặc là bạn không thích giao diện, cách hiển thị của trang web đó, thì **extension** chính là thứ mà bạn cần.

<div align="center">

# Nội dung
    
</div>

<div align="center">

## Extension là gì?
    
</div>

- **Extension** là một công cụ tiện ích hỗ trợ cho trình duyệt web nhằm cung cấp thêm các tính năng hoặc giúp cho người dùng tùy chỉnh trang web theo ý cá nhân. Khái niệm extension đã xuất hiện trên IE và Firefox từ lâu, tuy nhiên Chrome với sự hậu thuẫn của Google đã và đang phát triển rất mạnh mẽ, từ đó kéo theo sự phát triển của Chrome Extension. 

![](https://images.viblo.asia/1c44338b-3fe0-4c2c-9e02-3ca5087b30bc.png)

<div align="center">

Thống kê các trình duyệt phổ biến năm 2019 (theo thống kê của [W3School](https://www.w3schools.com/Browsers/default.asp))
</div>

- Nhờ có số lượng người dùng đông đảo, nên số lượng extension cho Chrome cũng phát triển hàng ngày theo cấp số nhân, từ đơn giản cho đến phức tạp. (Có thể bạn đã biết rồi, Viblo cũng có hẳn 1 [extension trên store](https://chrome.google.com/webstore/detail/viblos-news-feed/mliahmjgdpkkicelofhbhgiidgljijmj) đấy, bạn hãy trải nghiệm thử nhé)
- Vậy để làm ra một extension như vậy có khó không? Chúng ta hãy cùng đi tìm hiểu nhé!


<div align="center">

## Cấu trúc của 1 extension
    
</div>

- **Về hiển thị**: về cơ bản thì extension được xây dựng lên từ html, css, js nên nó gần giống với một website, tuy nhiên không giống hoàn toàn mà có một chút khác biệt về cấu trúc, gồm 2 phần:
    -  **Browser action**: gồm popup để người dùng tương tác trên trình duyệt (VD bên dưới là [extension wappalyzer](https://www.wappalyzer.com/) giúp detect các công nghệ sử dụng trên 1 website, mình thấy extension này khá hay đối với anh em coder)
    
    ![](https://images.viblo.asia/eb617e17-da3f-4bba-8c37-dc7fbbe487cc.png)
    -  **Page action**: gồm trang web của extension đó.
    ![](https://images.viblo.asia/29ce7429-a5b9-4dec-9434-a6bd12abb39e.png)

- **Về cấu trúc**: 
    -  Để có thể chạy được, mỗi extension có 1 file manifest.json gồm những thông tin sau (ngoài ra vẫn còn rất nhiều những thông tin khác, xem chi tiết tại [đây](https://developer.chrome.com/extensions/manifest))
        ```manifest.json
        {
            "name": "Getting Started Example", 
            "version": "1.0",
            "description": "Build an Extension!",
            "background": {
              "scripts": ["background.js"],
              "persistent": false
            },
            "content_scripts": [
                {
                "matches: [],
                "css": [],
                "js": [],
                }
            ],
            "browser_action": {
              "default_icon": "icon.png",
              "default_popup": "popup.html"
            }
            "manifest_version": 2
        }
        ```
        - **name**: tên của extension
        - **version**: phiên bản
        - **description**: mô tả về extension
        - **background**, **content_scripts**: sẽ cùng tìm hiểu cụ thể ở phía sau bài viết
        - **browser_action**: 
        - **manifest_version**: 

    ![](https://images.viblo.asia/35ec0a1f-9f46-4965-a87b-43708239ee97.png)
<div align="center">

Cách hoạt động của một Extension
    
</div>

<div align="center">

### Background
    
</div>

![](https://images.viblo.asia/5a0471c3-2eea-43d7-9248-40f9822a31c0.png)
- Background js sẽ tương tác ngầm với trình duyệt, cùng với phần hiển thị popup của browser action tạo nên UI chính cho extension, ngoài popup ra có thể là những trang HTML mới được hiển thị bằng  tabs.create hoặc window.open() 

- Đây là phần rất quan trọng đối với một extension. Nó phụ trách việc xử lý sự kiện của extension, bao gồm listener để lắng nghe các sự kiện của trình duyệt, từ đó rồi xử lí logic tương ứng. Phần này có thể khai báo 1 hoặc nhiều file scripts (lắng nghe các events) và giá trị `persistent` được khuyến cáo thiết lập giá trị `false`
    ```json
    "scripts": [
         "background1.js",
         "background2.js",
         "background3.js"
   ],
   "persistent": false 
    ```
    
- Background page được chia làm 2 loại:
    - persistent backgroud pages: luôn luôn mở
    - event pages: chỉ mở khi có event xảy ra (nên sử dụng event pages, vì vậy giá trị `persistent` nên để giá trị `false`)

<div align="center">

### Content_script
    
</div>

- **matches** (BẮT BUỘC- ARRAY) : chỉ định những trang web mà extension được phép hoạt động (nếu như ext của bạn có thể hoạt động trên nhiều trang web, hãy tham khảo cú pháp khai báo ở [đây](https://developer.chrome.com/extensions/match_patterns))
- **exclude_matches** (TÙY CHỌN- ARRAY): ngược lại với **matches**
- **css** (TÙY CHỌN- ARRAY): khai báo những file css được sử dụng trong extension
- **js** (TÙY CHỌN- ARRAY):  khai báo những file js được sử dụng trong extension

![](https://images.viblo.asia/9bcc3c41-2e23-4290-aaf1-762c7f13a6cf.png)
<div align="center">
Content script, chứa code script tương tác với trang được chỉ định trong phần match ở file manifest 
</div>
    


![](https://images.viblo.asia/6cd8e68c-cf26-4bd5-813b-0a761b0f58e8.png)
<div align="center">
Content scripts không hoàn toàn cắt đứt liên hệ với extension cha của chúng. Nó có thể trao đổi thông điệp với extension cha. Ví dụ một content script có thể gửi thông điệp bất kì khi nào tìm thấy một RSS feed trong trang web. Hoặc backgroud page có thể gửi thông điệp đến content script để thay đổi giao diện của trang web
</div>

<div align="center">

### Options Page
    
</div>

`Option page` là một lựa chọn với mong muốn cho phép người dùng có thể tùy chỉnh được extension theo ý mình. Bạn có thể mở `option page` này bằng cách click vào icon của extension. Có 2 loại `option page`:
- **Full page**: với tùy chọn này, `option page` sẽ được mở trong 1 tab trình duyệt mới. Khai báo trong manifest như sau:
    ```json
    {
        "options_page": "xxxxx.html"
    }
    ```
- **Embedded**: với tùy chọn này, người dùng sẽ không phải rời khỏi trang quản lí của extension mà thay vào đó là xuất hiện một `embedded box` (về trải nghiệm của người dùng thì mình nghĩ người dùng sẽ thích dùng embedded hơn)
    ```json
    {
        "options_ui": {
            "page": "xxxxx.html",
            "open_in_tab": false
        }
    },
    ```


<div align="center">
    
# Lời kết
    
</div>

- Bài viết hôm nay mục đích chính là để người đọc nắm được cấu trúc cơ bản của một extension và những kiến thức cần có (chủ yếu là html, css và js). Hy vọng các bạn sẽ tải và nhớ được những kiến thức này để đến part 2, chúng ta sẽ cùng bắt tay vào làm một extension nhé. 

- Cảm ơn các bạn đã dành thời gian đọc bài, nếu thấy bài viết có ích, hãy upvote hoặc clip để ủng hộ mình nhé!

<div align="center">

# Tài liệu tham khảo

</div>

- Developer chrome: https://developer.chrome.com/extensions/getstarted
- https://viblo.asia/p/lan-dau-viet-chrome-extension-E375zw0dKGW