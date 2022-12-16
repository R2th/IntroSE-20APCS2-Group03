Hi mọi người, trong các bài viết trước chúng ta đã tìm hiểu về 4 nguyên lý đầu tiên của SOLID, trong bài viết này, chúng ta cùng tìm hiểu về chữ cái cuối cùng nhé
# 1. D - Dependency Inversion Principle

Nguyên tắc Dependency Inversion (viết tắt là DIP) đề cập đến việc tách rời các module. Khi tuân theo nguyên tắc này, các mối quan hệ phụ thuộc thông thường được thiết lập từ các module cấp cao đến các module cấp thấp sẽ bị đảo ngược. Vậy đảo ngược là như thế nào nhỉ? Cùng tìm hiểu khái niệm trước đã nhé

Nội dung của nguyên tắc này là

- Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả hai đều nên phụ thuộc vào  trừu tượng.
- Trừu tượng không nên phụ thuộc vào chi tiết. Các chi tiết nên phụ thuộc vào trừu tượng.

# 2. DIP trong JavaScript
Chắc hẳn bạn đã từng sử dụng export và import. Nó giúp chúng ta đóng gói mã và sau đó chỉ cần import nó vào nơi cần sử dụng. Đó chính là một cách triển khai của DIP qua các ES6 modules. 
Để tìm hiểu kỹ sâu hơn nữa thì hãy cùng đọc đoạn code dưới đây nhé:
```js
// DownloadToConsole.js
const url = "https://jsonplaceholder.typicode.com/posts"
class Example {
 constructor() {
  ...
 }
 downloadDataFromAPI(params) {
        
  //1.
  fetch(url, {
   method: 'GET'
  }).then(r => r.json())
    .then(r => {
      console.log("Posts:" + r);
   });
 }
}
```

Trong ví dụ trên, chúng ta có một class tên là `DownloadToConsole`.  Trong class này, chúng ta có method `downloadDataFromAPI`, nó sẽ download data từ API bên ngoài và sau đó in kết quả ra console. Nhưng hãy đọc đoạn code bên dưới và xem có vấn đề gì với cái triển khai này? Nếu thay vì sử dụng `Fetch`, chúng ta muốn sử dụng cách khác để lấy data như `Axios` hoặc `XMLHttpRequest` thì sao? 

Nếu chúng ta đã sử dụng `Fetch` cho tất cả các class của mình, chúng ta sẽ phải thay thế nó bằng một triển khai khác trong tất cả các class khác sử dụng nó vì chúng đang được sử dụng trực tiếp. Việc này rất tốn công và không tốt cho việc bảo trì code. Vì vậy mà DIP nói với chúng ta rằng nên sử dụng trừu tượng (interface), chứ không nên triển khai cụ thể.

Trong JavaScript, chúng ta không có interface, nhưng chúng ta có thể có được hành vi tương tự bằng cách đóng gói module: ví dụ như exporting một class hoặc một method rồi import chúng như phần trên mình có đề cập đến.

Trong trường hợp này để cho cách làm đơn giản nhất, chúng ta sẽ export một phương thức có nhiệm vụ để download data. 
Bây giờ, tạo method `doGet` trong file `utils.js` và  sử dụng `Fetch` để đóng gói cách lấy data.

```js
// utils.js
export const doGet = (url) => {
 //2.
 return fetch(url, {
        method: 'GET',
        mode: 'same-origin',
        ...
 }).then(r => r.json())
};
```
Sau đó, chúng ta có thể dễ dàng import phụ thuộc `doGet` và sử dụng nó:

```js
// DownloadToConsole.js
import { doGet } from './utils.js'

const url = "https://jsonplaceholder.typicode.com/posts"
class Example{
 constructor() {
  ...
 }
 downloadDataFromAPI(params) {
       
  doGet(url)
   .then(r => {
    console.log("Posts:" + r);
   });
 }
}
```
Và bây giờ, thay vì sử dụng `Fetch`, nếu muốn sử dụng `Axios` hay `XMLHttpRequest`, chúng ta sẽ chỉ cần đổi phần implemention trong `utils.js` sang sử dụng `Axios` hoặc `XMLHttpRequest`, và mọi thứ vẫn sẽ hoạt động tốt và không phải thay đổi gì thêm nữa.

```js
// utils.js

export const doGet = (url) => {
  return axios.get(url);
};
```
Như bạn có thể thấy, trong các class mà bạn import phương thức `doGet`, bạn sẽ không cần phải quan tâm nó được triển khai cụ thể như thế nào, việc này cho phép bạn tách đoạn code xử lý download ra khỏi module chính. Đồng thời cách đóng gói code như vậy cũng giúp code sẽ không bị lặp lại, dễ dàng maintain.

Bài viết đến đây là hết. Hi vọng đã giúp các bạn hiểu được phần nào về nguyên tắc cuối cùng trong SOLID và áp dụng được nó trong các dự án thực tế.
Cảm ơn các bạn đã theo dõi bài viết.

Tham khảo: [Link](https://medium0.com/m/global-identity?redirectUrl=https%3A%2F%2Fjavascript.plainenglish.io%2Fdecoupling-code-in-javascript-with-the-dependency-inversion-principle-6d23342b4aaa)