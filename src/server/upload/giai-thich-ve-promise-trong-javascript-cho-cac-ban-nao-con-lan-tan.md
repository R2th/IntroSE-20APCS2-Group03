![](https://images.viblo.asia/3b6c197d-cf24-41b1-acf1-c0477c2621ea.jpeg)

Mình trước giờ chắc cũng đã đọc nhiều bài viết giải thích về khái niệm Promises trong Javascript, đọc xong vẫn cảm giác mơ hồ, có thể là do nhận thức của mình chưa được nhanh lắm :sweat_smile: 
Hoặc có thể tác giả viết chưa được hay... 

Thì ngày hôm nay, mình xin được gửi đến các bạn một bài viết mà mình nghĩ là lối viết vô cùng dễ hiểu, và trực quan! :heart_eyes: 

* Bài viết gốc mình tham khảo thì ở [đây](https://www.freecodecamp.org/news/what-is-promise-in-javascript-for-beginners/?fbclid=IwAR3CO5TBB1Kbplj7wvAheZmeXAApOvVPAdRDTuvUOn622Kz_gwt9gVY5a7U)
* Tác giả tự giới thiệu là người mong muốn giúp đỡ những bạn chưa hiểu rõ về các kiến thức công nghệ có thể tiếp cận một cách đơn giản các khái niệm thông qua những bài giảng thú vị của anh ấy. Các bạn có thể truy cập: https://ubahthebuilder.tech để đọc thêm nhá :hugs: 
 * Bạn nào mà kiểu **"Đã học thì học sách giáo khoa chính thống"** thì có thể tham khảo tại [MDN Web Doc - Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) và [MDN Web Doc - Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) nhá :sunglasses: 

## Promise trong Javascript là gì? 

*Một câu chuyện đời thực* 

Tưởng tượng bạn là một nhà tuyển dụng, sắp phỏng vấn ứng viên của mình.
Có một anh chàng nọ, đến bạn phỏng vấn cơ mà *lại quên CV* ... - toang :sweat_smile: 

May thay, cậu này lại có bạn cùng phòng, cậu ấy nhanh chóng gọi cho cậu bạn và bảo tìm giúp CV, cậu bạn này **Promise** (hứa) là sẽ tìm giúp và sẽ báo lại: 
* trường hơp tìm thấy sẽ báo: "ok, tao tìm thấy rồi, để tao mang đến cho!".
* trường hợp đen thì sẽ báo: "tao ko thấy mày ạ". 

Trong lúc cậu bạn tìm CV giúp thì buổi phỏng vấn vẫn được tiếp tục, anh chàng trả lời mọi câu hỏi của bạn một cách suôn sẻ. tuy nhiên kết quả buồi phỏng vấn sẽ phụ thuộc vào việc có tìm thấy CV kia hay không. 
* Nếu tìm thấy thì "pass" phỏng vấn :fireworks: 
* Nếu không thấy thì "sorry, em rất tốt, chị rất tiếc" :satisfied: 

##  Câu chuyện trên được chuyển thể vào JS Code ra sao?

Việc cậu bạn *promise* tìm cái CV và hồi âm lại, tương tự câu chuyện Promise trong Javascript. Phần code trong Promise sẽ không trả về ngay lập tức kết quả, mà thường sẽ mất một lúc (như việc tìm CV mất thời gian vậy), thay vào đó phần code đó sẽ "hứa" trả về ngay sau khi nó có được kết quả. 

Promise trong Javascript hoạt động "bất đồng bộ" - asynchronous, nghĩa là nó cần thời gian để xử lý, và do vậy **JS Engine** không cần phải đợi nó hoàn thành xong, mà có thể thực thi các phần code khác (và trong "đầu" thì vẫn nhớ - pending cái vụ promise kia)

Trường hợp Promise tìm thấy kết quả (tưc là tìm thấy CV), ta dùng function: `resolve(value)` <br>
Trường hợp Promise thất bại, ta dùng function `reject(value)`

Sau khi có kết quả từ Promise, Trong Javascript, ta dùng function **Callback** để xử lý tiếp các kết quả đó. 

Function callbacks được định nghĩa trong phương thức `then()` được gắn - nested sau hàm Promise.

`.then()` có thể có tối đa 2 argument: **Một** là callback function trường hợp Promise xử lý thành công - resolved; **Hai** là callback function trường hợp Promise xử lý thất bại - rejected.

Mình nói là "tối đa 2 argument" vì với tùy mục đích sử dụng, ta có thể chỉ cần khai báo một trong 2 argument vẫn được. :star: 

## OK, lý thuyết rồi, giờ là lúc thực hành CODE!

Chúng ta có thể khai báo promise thông qua gọi class `Promise` và dựng một object như sau: 

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('I found your CV!!!!');
  }, 3000);
});

myPromise.then(value => { alert(value) }
```

Chạy đoạn code này ở console sẽ trả về value "I found your CV!!!" hiện tại trong khung Alert.

*(đơn giản nhất bạn bật console của Browser Chrome hoặc Firefox rồi chạy đoạn trên nhá). *

## Nếu lúc bị Reject (promise bị thất bại) thì làm sao?

Trường hợp code trên đây mới chỉ mô phỏng 1 trường hợp duy nhất là người bạn kia tìm thấy cái CV sau "3000 mili giây" (=3 giây) .

Để mô phòng cả trường hợp bị Reject ta có thể tham khảo code mẫu dưới đây nhá.

```js
const myPromise = new Promise((resolve, reject) => {
  let a = false;
  setTimeout(() => {
    return (a) ? resolve("I found your CV"): reject("sorry, I can't see your CV");
  }, 3000);
}); 

myPromise.then(value => { alert(value); }, error => { alert(error); } )
```

Do `a = false` nên sau khi hết 3 s, setTimeout trả về trường hợp **reject**, để xử lý tiếp trong trường hợp bị **reject**, ta khai báo argument thứ 2 trong `then`

Kết quả cuối cùng là màn hình sẽ Alert lên value `"sorry, I can't see your CV"`

## Tính chất chaining - xâu chuỗi của `then()`

Chúng ta có thể tạo ra một loạt các sự kiện Promises nối tiếp nhau, như ví dụ dưới đây.

```js
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('First value');
  }, 3000);
});

firstPromise
.then(value => { console.log(value); return "Second value"; })
.then(value => { console.log(value); return "Third value"; })
.then(value => { console.log(value); })
```

Mỗi `.then()` lại trả về một Promise object, tạo tiền đề để ta có thể gọi một `.then()` tiếp theo.

Kết quả cuối cùng sẽ là: sau 3 giây -> chúng ta nhận được "Second value" và ngay sau đó là "Second value" và "Third value"

**Lưu ý:** Kể cả khi anh em quên không trả về bất kì một value nào trong `.then()` thì Javasciprt vẫn sẽ xử lý đến `.then()` tiếp theo, do đó sẽ gây lỗi. Do `then()`sau không có value trả về từ Promise. Để phòng các trường hợp này, anh em có thể sử dụng `catch()` nhá. :sunglasses: 

```js
const myPromise = new Promise((resolve, reject) => {
  let a = false;
  setTimeout(() => {
    return (a) ? resolve('a is found!'): reject('sorry, no a');
  }, 300);
}); 

myPromise
.then(value => { console.log(value) })
.catch(err => { console.log(err) });
```