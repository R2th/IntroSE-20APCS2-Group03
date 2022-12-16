# Tìm hiểu cách viết extension
## manifest.json
Như tên gọi thì đây là file chứa các thông tin cơ bản của extension. Đây là file mặc định và bắt buộc phải có thì extension mới hoạt động được. Nó giống như file config, từ đó Chrome có thể biết Extension của bạn là gì, hoạt động ra sao. Bên trong **mainfest.json** yêu cầu ba thuộc tính cơ bản:
- **name**: tên của Extension
- **version**: phiên bản hiện tại của Extension
- **manifest_version**: phiên bản của file *mainfest.json*, nên để là 2 vì phiên bản 1 hiện tại không còn được hỗ trợ nhiều nữa.

Ngoài ra **mainfest.json** còn có nhiều thuộc tính khác như:
- **description**: mô tả về Extension, phần nội dung này sẽ hiển thị khi người dùng di chuột lên icon của Extention
- **default_locale**: default languages cho extension.
- **permissions**: danh sách các quyền mà extension cần sử dụng.
- **page_action**: hiển thị trên thanh address bar.
- **icons** : khai báo ảnh biểu tượng của extension, có nhiều kích thước khác nhau được cho phép. Nếu chỉ khai báo một ảnh thì chrome sẽ tự thay đổi kích thước để phù hợp với việc hiển thị được tối ưu hơn.
  + **128:** hiển thị trên web store.
  + **48:** hiển thị ở trang quản lý extensions (extensions management page).
  + **16:** hiển thị trên thanh công cụ của trình duyệt.
- Còn nhiều thuộc tính khác nữa, bạn có thể xem thêm [tại đây](https://developer.chrome.com/apps/manifest).

Ví dụ về một file **mainfest.json**
```css
{
    "name": "Youtube Skipper",
    "version": "1.0",
    "description": "description",
    "manifest_version": 2,
    "icons: {
        128: "youtube-skipper-icon.png"
    }
}
```

## Background Script
**Background Script** là script chạy ngầm của extension, đồng thời nó cũng là nơi để lắng nghe các event của trình duyệt, xử lý thông tin được gửi tới từ popup hay content script.... Nó sẽ tự đóng khi đã xử lý xong các event, thế nên ta không nên lưu trữ thông tin tại đây.

Cách khai báo Background Script:
```javascript
"background": {
    "script": ["background.js"],
    "persostent": false,
}
```

## Content Script
**Content Script** giúp cho chúng ta có thể thao tác với nội dung trang web hiện tại thông qua javascript và cách thức hoạt động của nó giống như việc bạn chèn thêm một thẻ `<script>` vào trong trang web vậy. **Content Script** sẽ thao tác với trang web qua DOM từ đó chúng ta có thể thêm mới, thay đổi thông tin các element trên nội dung của trang web. Để đảm bảo tính bảo mật, đem lại an toàn cho người dùng thì tất cả các thành phần của Extension sẽ được chạy trong môi trường **sandbox** mà Chrome cung cấp với protocol mặc định là `chrome://`. Điều đó khiến cho tất cả các biến kể cả biến `window` sẽ không truy cập được từ phía Content Script và ngược lại.

**Content Script** không hoạt động độc lập mà nó có thể trao đổi thông tin với extension gốc. Content Script gồm những thuộc tính như:
+ matches: thuộc tính sẽ quyết định xem trang nào sẽ được inject, các bạn có thể xem thêm [tại đây](https://developer.chrome.com/extensions/match_patterns).
+ scripts: danh sách các file script sẽ được inject.
+ css: danh sách các file css sẽ được inject.
+ all_frames : quyết định Extension sẽ đưa Script/CSS vào toàn bộ các trang khớp với điều kiện ở trên hay chỉ chạy ở trang đâu tiên bạn truy cập đến (mặc định sẽ là false).
+ Ngoài ra còn nhiều thuộc tính khác nữa [ở đây](https://developer.chrome.com/extensions/content_scripts).

Để khai báo, các bạn thêm dòng sau vào trong file `mainfest.json`:
```markdown
...
"content_scripts": [
   {
      "matches": [url hoặc regex],
      "js": [đường dẫn đến file js]
      ...
   }
],
...
```

## Popup.html
Một file HTML chứa nội dung sẽ được hiển thị khi người dùng click vào biểu tượng của Extension trên thanh công cụ. Phần này sẽ giúp cho người dùng có thể tương tác với Extension nhiều hơn.

# Bắt tay vào làm
Nói qua về chiếc Extension skip quảng cáo mình định làm. Nó chỉ có chức năng đơn giản là tìm đến nút skip quảng cáo của Youtube rồi click vào đó và nó chỉ có tác dụng đối với những quảng cáo nào có nút skip. Và đối với chức năng đơn giản như vậy thì mình chỉ cần sử dụng tới Content Script là đủ.

Việc đầu tiên cần làm là khai báo nội dung cho file **mainfest.json**, nội dung như sau:
```javascript
{
    "manifest_version": 2,
    "name": "Youtube Skipper",
    "version": "1.0",
    "description": "Skip ads on Youtube",
    "content_scripts": [{
          "matches": ["*://www.youtube.com/watch*"],
          "js": ["content.js"]
    }],
}
```

Việc tiếp theo là viết nội dung cho **Content Script**, để test xem phần *matches* ở trên mình đã khai báo đúng chưa thì trước hết thử log ra console xem script đã được gọi khi chúng ta vào các trang xem video không đã.
```sql
console.log('Ú òa');
```

![](https://images.viblo.asia/525c2762-1d53-4f40-9fb7-0a38bfa87ff8.PNG)

Thử vào xem một video trên Youtube, rồi ngó qua thử console. Như vậy là sau khi bắt đầu vào xem một video bất kỳ trên Youtube thì nội dung trong file Content Script đã được chạy, việc tiếp theo là tìm đến nút Skip và click vào thôi. 

Trên Youtube hiện nay thì có hai loại quảng cáo, loại thứ nhất thì là loại quảng cáo ngắn không cho skip. Loại này cũng hay gặp nhưng thôi mình sẽ không xử lý loại này coi như là xem ủng hộ người ta chút. Bài viết này mình sẽ tập trung xử lý dạng thứ hai, loại quảng cáo dài và có xuất hiện nút skip. 
Sau một hồi ngó qua một loạt các element thì mình nhận ra có điều đặc biệt là luôn có các cặp class `ytp-ad-skip-button ytp-button`,
`ytp-ad-skip-button-text`, `ytp-ad-overlay-close-button` xuất hiện mỗi khi có quảng cáo, công việc bây giờ là tìm đến và click vào các element có chứa những class kia.

![](https://images.viblo.asia/69a61b18-924a-4cc4-a2fd-99ccee5ab398.PNG)

Bây giờ chúng ta sẽ sửa lại nội dung của file `Content Script` như sau:
```cpp
const click = (clazz) => {
  const buttons = document.getElementsByClassName(clazz);
  for (const button of buttons) {
    button.click();
  }
}

setInterval(() => {
  click("ytp-ad-skip-button ytp-button");
  click("ytp-ad-skip-button-text");
  click("ytp-ad-overlay-close-button");
}, 300);
```

Giải thích qua một chút, ở đây mình sẽ tìm đến những element có chứa những class mà nút skip đang chứa rồi cứ sau mỗi `0.3s` thì click vào chúng. Điều đó sẽ thay việc chúng ta phải ngồi đợi rồi click từng tí một. 

Thử cài đặt và dùng thử xem sao. Để cài đặt Extension chưa được đưa lên cửa hàng của Chrome, chúng ta phải bật mode Developer của Chrome và load chúng vào theo cách thủ công.
1. Truy cập vào đường uri: `chrome://extensions`
2. Chuyển sang **Developer mode**.
3. Sau đó chọn **Load unpacked**.
4. Trỏ đến thư mục đang chứa Extension cần load.
![](https://images.viblo.asia/377b81b8-ae75-4868-bb17-c367b1410cc5.png)

Như vậy là script đã chạy và skip được quảng cáo mà không cần chờ đến 5s như cách thông thường. Nhưng cách ở trên chưa tối ưu, bài viết này mình sẽ update thêm về cách làm thông qua MutationObserver, một WebAPI khá là hữu dụng. Trong bài viết còn nhiều thiếu sót, có đóng góp gì các bạn bình luận ở phía dưới phần comment nha. Cảm ơn bạn vì đã đọc đến cuối bài viết <3.