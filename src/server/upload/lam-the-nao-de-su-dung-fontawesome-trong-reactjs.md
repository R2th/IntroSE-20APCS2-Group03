# FontAwsome là gì

FontAwsome là một trong những thư viện icon khá phổ biến và được các Frontend Developer sử dụng một cách rộng rãi. Đây là một thư viện khá lớn với rất nhiều icon miễn phí cũng như trả phí đáp ứng đầy đủ các nhu của người dùng. Cùng với đó, FontAwsome có thể được dễ dàng sử dụng bằng nhiều cách khác nhau: thông qua CDN, tải về trực tiếp, ... cũng như hỗ trợ tận răng cho hầu hết các thư viện, framework phổ biến nhất hiện nay. Ở bài viết này, chúng ta cùng đi tìm hiểu làm thế nào để sử dụng được thư viện icon này trong dự án ReactJS của mình.
![](https://images.viblo.asia/60f55120-4d77-462c-9521-68cb68e0a5f0.png)

## Bắt đầu thôi !!!!!!
### 1. Sử dụng CDN
Đây là cách nhúng FontAwsome vào trong dự án ReactJS một cách nhanh chóng và dễ dàng nhất. Cách làm này khá giống cách mà bạn thường làm để nhúng và một trang web HTML thông thường.

Ban chỉ cần tìm đến thư mục `public` > `index.html` và copy đoạn code dưới đây và cho vào trong thẻ `<head>`


```HTML
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
```

Kết quả sẽ như sau:
![](https://images.viblo.asia/50f1fc8e-6fb8-4db2-988c-0524d461f124.png)

Với cách làm trên, bạn đã có thể sử dụng toàn bộ các icon free trong FontAwsome 5 trong dự án của mình. Nếu bạn muốn sử dụng FontAwsome 4 thay vì 5 trong dự án, bạn có thể sử dụng thẻ `link` dưới đây.

```HTML
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0=" crossorigin="anonymous" />
```

Cuối cùng, hãy nhớ đổi `class` thành `className` để không bị thông báo lỗi  nhé.

### 2. Sử dụng npm

Đây cũng là một cách làm khá đơn giản và cách tiếp cận này cũng hay hơn cách làm thứ 1 bởi lẽ thay vì phải thay đổi thư mục gốc của dự án, ta sẽ `install` thư viện thông qua `npm` và `import` thư viện vào file `index.js` của project.

Đầu tiên, ta chạy dòng lệnh sau trong terminal
```javascript
npm install --save-dev @fortawesome/fontawesome-free
```

Tiếp theo, ta cần import thư viện bằng cách sau: Tìm đến thư mục `src` > `index.js` > import thư viện
```
import '@fortawesome/fontawesome-free/css/all.min.css';
```

Sau đó, bạn đã có thể sử dụng FontAwsome 5 trong dự án

Với FontAwsome 4, bạn cần sử dụng câu lệnh sau:

```javascript
npm install --save font-awesome
```

Sau đó, bạn import thư viện vào file `index.js` bằng dòng lệnh sau:
```
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
```



### 3. Cài đặt các gói icon thông qua npm

Đây là cách được hướng dẫn trên trang chủ của `FontAwsome`. Với cách làm này, chúng ta có thể kiểm soát được các gói icon được sử dụng trong dự án. Tuy nhiên, đây cũng là cách cài đặt phức tạp nhất được nhắc đến trong bài viết này. Vì thế, nó thích hợp hơn trong việc sử dụng trong các dự án thực tế cũng như các dự án lớn, có nhiều yêu cầu chặt chẽ ràng buộc hơn.

**1. Cài đặt:**
Có khá nhiều version từ miễn phí, chuyến nghiệp, ... cho chúng ta lựa chọn, vì thế, trước khi cài đặt, bạn cần phải xác định được nhu cầu của mình để cài dặt các gói phù hợp.

Để cài đặt gói cơ bản, ta dùng dòng lệnh sau:
```javascript
npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome 
```
Nếu muốn sử dụng thêm các gói khác, bạn có thể tham khảo các gói dưới đây và câu lệnh để cài đặt chúng:
```javascript
# regular icons 
npm i -S @fortawesome/free-regular-svg-icons 
npm i -S @fortawesome/pro-regular-svg-icons 
```
```javascript
# solid icons 
npm i -S @fortawesome/free-solid-svg-icons 
npm i -S @fortawesome/pro-solid-svg-icons 
```
```javascript
# light icons 
npm i -S @fortawesome/pro-light-svg-icons 
```
```javascript
# duotone icons 
npm i -S @fortawesome/pro-duotone-svg-icons
```
```javascript
# brand icons 
npm i -S @fortawesome/free-brands-svg-icons  
```
Nếu bạn cảm thấy mất công khi phải lựa chọn các gói phù hợp, bạn có thể sử dụng câu lệnh dưới đây để cài đặt toàn bộ các icon miễn phí:
```javascript
npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons 
```
Nếu bạn có tài khoản có thể sử dụng các icon thu phí:
```javascript
npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/pro-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/pro-solid-svg-icons @fortawesome/pro-light-svg-icons @fortawesome/pro-duotone-svg-icons @fortawesome/free-brands-svg-icons 
```
**2.Tạo library:**
Tiếp theo, chúng ta cần tạo một thư viện riêng của mình để có thể dễ dàng sử dụng các icon trong dự án. Việc của bạn chỉ cần là tạo ra 1 file `fontawesome.js` trong folder `src` và sau đó import `fontawesome` vào trong file `index.js`. Với các làm này, bạn có thể kiểm soát tốt hơn các icon trong dự án. Nếu file này trở lên quá nhiều, bạn có thể gom các icon theo nhóm mà bạn muốn và rồi lại tổng hợp vào trong file `fontawasome.js`

Trong `src/fontawesome.js`, ta import các icon cần thiết theo từng gói.
```javascript
//Khởi tạo thư viện icon của riêng bạn
import { library } from '@fortawesome/fontawesome-svg-core'; 

//Import các icon mà bạn muốn sử dụng trong từng gói
import { faMoneyBill } from '@fortawesome/pro-solid-svg-icons';
import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';  

//Add các icon đã được import vào trong thư viện của bạn
library.add( faMoneyBill, faCode, faHighlighter )
```

Sau đó, trong file `App.js`:
```
import "./src/fontawasome.js"
// Nhúng thư viện của bạn vào dự án
```
Cuối cùng, ở bất cứ file nào bạn muốn sử dụng các icon từ thư viện của mình, bạn cần import `<FontAwesomeIcon/>` 
```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
```
**3.Sử dụng:**
Bây giờ, bạn có thể gọi các icon bằng cách sử dụng `<FontAwesomeIcon/>` như sau:
```
  <FontAwesomeIcon icon={['fab', 'google']} />
  // Với fab là tiền tố tương ứng với các gói mà bạn sử dụng, google là icon mà bạn sử dụng
```
Như vậy, bạn đã cài đặt thành công thư viện `FontAwesome` vào trong project của mình theo cách làm chính thống nhất.

### 4. Tổng kết
Mong rằng, với các cách nếu trên, bạn có thể lựa chọn được cách làm phù hợp nhất với yêu cầu riêng của mình

Link tham khảo: [Trang chủ FontAwesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)