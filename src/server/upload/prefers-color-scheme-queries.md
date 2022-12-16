Trong năm 2020 này, các trình duyệt với phiên bản mới có thể sử dụng được những tính năng tuyệt vời, đặc biệt là CSS nói chung.
Trong bài này mình xin giới thiệu một tính năng ít được biết đến và mới xuất hiện gần đây của CSS, do nhu cầu sử dụng của nó hiện tại đang tăng nhanh nhằm đáp ứng và cho trải nghiệm người dùng tốt hơn, đó chính là thuộc tính: prefers-color-scheme
Thuộc tính này cho phép người dùng có thể lựa chọn tông màu sáng hoặc tối cho trang web mình đang xem hoặc tự động lựa chọn tông màu dựa vào chế độ xem của người dùng, ví dụ như bạn sử dụng macOS Catalina chế độ dark-mode, vậy thì ta có thể detech được và apply giao diện với tông màu tối vào cho đúng với như cầu của user một cách tự động.

Để chuyển tông màu từ root thì ta sẽ kết hợp với css variables để dễ kiểm soát và mạch lạc hơn:

```css
:root {
  --dark: #333;
  --light: #f7f7f7;
  --background: var(--light);
  --color: var(--dark);
}

.DarkMode {
  --background: var(--dark);
  --color: var(--light);
}
```

Để check xem hiện tại user có đang ở chế độ dark-mode hay không ta sử dụng:
`window.matchMedia("(prefers-color-scheme: dark)").matches;`
Sau đó tuỳ vào kết quả trả về mà ta có add class .DarkMode vào thẻ <html> hay là không

    JS:
```javascript
const checkbox = document.querySelector('input[type="checkbox"]');
const root = document.querySelector("html");

function checkSystem() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
 
  if (prefersDark) {
    root.classList.add("DarkMode");
  } else {
    root.classList.remove("DarkMode")
  }
}

function initDarkMode() {
  checkSystem();

  if (root.classList.contains("DarkMode")) {
    checkbox.setAttribute("checked", true);
  }

  checkbox.addEventListener("change", (event) => {
    root.classList.toggle("DarkMode");
    const isDarkMode = root.classList.contains("DarkMode");
    checkbox.setAttribute("checked", isDarkMode)  
  });
}


initDarkMode()
```

Demo: {@embed: https://codepen.io/buiduccuong30051989/pen/RwNJOgd}


Kết quả bạn sẽ nhìn thấy trang web đang xem ở chế độ darkmode nếu 
1.     Phiên bản browser là mới (Chrome 76, Firefox 67 or Safari 12.1)
2.     Đang ở chế độ darkmode