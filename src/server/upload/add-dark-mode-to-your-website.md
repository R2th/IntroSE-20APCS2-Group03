## Introduction
![](https://images.viblo.asia/f3388f61-40e7-4e3d-b1e6-b121b0738091.jpg)

**Dark Mode** hay còn gọi là chế độ nền tối, về cơ bản, chế độ này sẽ chuyển đổi nền sáng (mặc định) sang nền có màu chủ đạo là tối/đen. Điều này khiến giao diện hiển thị không hề thay đổi nhưng phần màu sắc lại thay đổi mạnh mẽ, bên cạnh đó, nó cũng mang lại rất nhiều lợi ích  bao gồm: lợi ích đối với sức khỏe con người (cải thiện giấc ngủ, mắt, tim, da mặt..), lợi ích với chính thiết bị đang sử dụng (cải thiện hiệu suất, khả năng tiêu thụ năng lượng...)


Trong bài viết này chúng ta sẽ cùng tìm hiểu cách để include darkmode cho website của chúng ta qua việc sử dụng [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
## Implement
Chúng ta sẽ add 3 options để user lựa chọn bao gồm: *Dark*, *Light* và *Auto*. Ngoài 2 mode *Light* và *Dark* đã khá thông dụng, ở đây ta có thêm mode *Auto*, ý nghĩa của mode này là nó sẽ dựa trên thiết lập theme của hệ thống đang sử dụng để quyết định xem mode hiện tại sẽ là *Light* hay là *Dark*. 
### Adding the HTML
Chúng ta sẽ thêm đoạn html để user lựa chọn giữa các mode:
```html
<select id="theme">
    <option value="auto">Auto</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
</select>
```
### Adding the CSS
Chúng ta sẽ add thêm 1 chút CSS vào thẻ `body`, là nơi ta chỉ định màu sắc cho mode *Light*
```css
body {
    --background-color: #ffffff;
    --text-color: #000000;
}
```
Để sử dụng CSS variables ở toàn bộ style sheet hoặc ở những chỗ cần thiết, ta có thể thêm như sau:
```css
.main-content {
    background: var(--background-color);
    color: var(--text-color);
}

button {
    color: var(--text-color);
}
```
Tiếp theo ta sẽ implement mode *Dark* bằng cách thay thế các gía trị tương ứng vào các CSS variables vừa thêm ở bên trên:
```CSS
:root {
    --dark-background-color: #111111;
    --dark-text-color: #eeeeee;
}

body.theme-dark {
    --background-color: var(--dark-background-color);
    --text-color: var(dark-text-color);
}
```
Đến bước này về cơ bản 2 mode *Dark* và  *Light* đã hoạt động. Bây giờ chúng ta sẽ implement mode *Auto*:
```css
@media (prefers-color-scheme: dark) {
    body.theme-auto {
        --background-color: var(--dark-background-color);
        --text-color: var(--dark-text-color);
    }
}
```
Ở đây chúng ta sử dụng [Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) để detect settings của hệ thống hiện tại có phù hợp với mode *Dark* hay không. Nếu điều kiện thỏa mãn, đoạn css bên trong `@media` sẽ được thực thi, chi tiết về `prefers-color-scheme`, các bạn có thể tham khảo thêm ở [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

Chúng ta có thể check thử mode *Auto* này bằng cách chỉnh theme của OS sang darkmode hoặc view website qua điện thoại đang bật chế độ darkmode.
### Adding the JavaScript
Phần implement CSS cho 3 mode đã xong, bước tiếp theo chúng ta sẽ thêm 1 chút javascript để list dropdown chọn giữa các mode hoạt động.
```javascript
function applyTheme(theme) {
    document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
}

document.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#theme").addEventListener("change", function() {
        applyTheme(this.value);
   });
});
```
Ở đây chúng ta xử lý việc bắt sự kiện `change` của `#theme` để chèn thêm class tương ứng vào thẻ `body`
### A step further - remembering the theme
Để chức năng hoạt động hiệu quả hơn, chúng ta sẽ xử lý thêm việc browser sẽ nhớ mode đã setting trước đó cho trường hợp refresh, chuyển trang.. Để làm được điều này, chúng ta có thể sử dụng [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).


Trước tiên chúng ta cần save lại giá trị theme được chọn:
```javascript
localStorage.setItem("theme", this.value)
```
Từ các lần gọi tiếp theo, chúng ta sẽ check giá trị `theme` này để lựa chọn mode phù hợp:
```javascript
savedTheme = localStorage.getItem("theme") || "auto";
```
Chúng ta sẽ loop qua từng option của `#theme` để check xem nếu value có trùng với `savedTheme` bên trên hay không, nếu có, ta sẽ set value đó là `selected`:
```javascript
for (const optionElement of document.querySelectorAll("#theme option")) {
   optionElement.selected = savedTheme === optionElement.value;
}
```
Refactor lại logic `DOMContentLoaded` chúng ta sẽ được như sau:
```javascript
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "auto";

    applyTheme(savedTheme);

    for (const optionElement of document.querySelectorAll("#theme option")) {
        optionElement.selected = savedTheme === optionElement.value;
    }

    document.querySelector("#theme").addEventListener("change", function () {
        localStorage.setItem("theme", this.value);
        applyTheme(this.value);
    });
});
```
Và thành quả:
![a](https://user-images.githubusercontent.com/49507724/88144980-f1bf7700-cc23-11ea-96a1-f164b7026f7e.gif)

## Summary
Bài viết này nhằm giới thiệu và cùng tìm hiểu về cách để implement **DarkMode** cho website, bài viết còn thiếu sót, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo: https://dev.to/dcodeyt/add-dark-mode-to-your-websites-with-css-5bh4