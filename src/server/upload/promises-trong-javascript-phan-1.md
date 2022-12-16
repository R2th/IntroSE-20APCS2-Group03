# Giới thiệu
Khi làm việc với **JavaScript** thì **Promise** là một topic hết sức thú vị. 
Trong bài viết này mình sẽ giới thiệu cho các bạn **Promise** trong JS là gì, cách nó hoạt động, làm sao để tạo ra và handle **Promise**.

![](https://images.viblo.asia/b060bbdf-c1b9-403c-b2ce-67bde30c6aa6.jpeg)

# Khái niệm
**JavaScript** là một ngôn ngữ lập trình **đồng bộ** (Synchoronous), nhưng nhờ có callback function, chúng ta có thể viết nó như là một ngôn ngữ lập trình **bất đồng bộ** (asynchoronous).

**Promise** trong JavaScript cũng giống như **Promise** ở trong đời sống hiện tại, có có nghĩa là 1 "lời hứa", vậy điều gì xảy ra khi ai đó hứa với bạn điều gì đó?
1. Một lời hứa (Promise) cho bạn 1 sự đảm bảo rằng một cái gì đó sẽ được hoàn thành, có hay không người đưa ra lời hứa sẽ thực hiện nó, hoặc nhờ 1 bên thứ ba. Nói chung điều này cho bạn một sự đảm bảo, để bạn có thể lên kế hoạch khi lời hứa được thực hiện xong  (hoặc có thể lời hứa không được thực hiện như mong đợi)
2. Một lời hứa (Promise) có thể được thực hiện trôi chảy (be kept) hoặc không thể hoàn thành (broken)
3. Khi một lời hứa (Promise) được thực hiện trôi chảy (be kept), bạn mọng đợi một vài điều gì đó sẽ làm sau khi có kết quả từ lời hứa, và bạn có thể lên kế hoạch để làm.
4. Khi một lời hứa (Promise) không thể hoàn thành (broken), bạn mong muốn biết tại sao nó lại không được hoàn thành, khi bạn biết được lý do, bạn có thể lên kế hoạch để xử lý.
5. Khi một lời hứa (Promise) được tạo ra, chúng ta đều có đảm bảo là nó sẽ được thực  hiện trôi chảy hoặc không, nhưng chúng ta phải đợi vì không phải hứa cái là làm xong liền ngay, nên chúng ta phải tính toán là sẽ làm gì khi lời hứa được thực hiện trôi chảy, hoặc trường hợp hứa thật nhiều thất hứa thì cũng thật nhiều.
6. Bạn nên nhớ là lời hứa (Promise) luôn trả về kết quả là nó thực hiện trôi chảy hoặc không, nhưng trong thời gian bao lâu để có kết quả thì chưa biết. Vì vậy chúng ta có quyền không quan tâm đến kết quả nếu nó vượt quá thời gian mà chúng ta có thể chờ. Vì dụ: nếu một người không quay lại trong 10 ngày, tôi sẽ cho rằng họ không giữ lời hứa, nếu 15 ngày sau họ quay lại, điều đó cũng không quan trọng vì tôi đã có dự định khác.

# Promise trong JavaScript
Có 2 phần quan trọng để có thể hiểu được Promise trong JavaScript, đó là **việc tạo ra promise** và **hướng xử lý promise**. Mặc dù, nhiều lúc viết code chúng ta sử dụng các thư viện bên ngoài khác để handle promise, việc hiểu được bản chất của **Promise** là vô cùng quan trọng. Hiểu được việc **Promise** được tạo ra cũng rất quan trọng để bạn làm việc hiệu quả hơn khi dùng các thư viện ngoài. 

Tham khảo trang web chính thống của JS để hiểu hơn về Promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Cách tạo ra Promise 
Dưới đây là cú pháp để tạo 1 Promise
```
new Promise( /* executor */ function(resolve, reject) { ... } );
```
**Constructor** chứa 1 **executor function**. Và executor function này có 2 tham số là **resolve** và **reject**, cũng là 2 function để xử lý 2 trường hợp là lời hứa được thực hiện trôi chảy và lời hứa thất bại.

Bây giờ mình xin phép dùng từ Promise thay cho lời hứa.

**Promise** thường được dùng để xử lý các thao tác bất đồng bộ, hoặc có thể gây blocking code, ví dụ đọc/ghi file, gọi API, gọi DB, gọi IO, ... Những thao tác bất đồng bộ này được xử lý trong executor function. Nếu nó hoàn thành trôi chảy (**success**), thì kết quả trả về sẽ được xử lý bởi **resolve function**. Tương tự nếu một vài lỗi xảy ra (**failure**) thì nguyên nhân lỗi trả về sẽ được xử lý ở **reject function**.

Hãy thử tạo một promise xem như thế nào nhé.

```JavaScript
var keepsHisWord;
keepsHisWord = true;
promise1 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesnt want to keep his word");
  }
});
console.log(promise1);
```

![](https://images.viblo.asia/cabb3aa8-ac46-4861-af34-518455f99961.png)


Bởi vì Promise trên được resolve ngay lập tức, nên chúng ta không thể thấy được trạng thái ban đầu của Promise. Vì vậy hãy tạo một Promise mà nó phải mất vài giây để resolve. Cách đơn giản nhất là dùng **setTimeOut**

```JavaScript
promise2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve({
      message: "The man likes to keep his word",
      code: "aManKeepsHisWord"
    });
  }, 10 * 1000);
});
console.log(promise2);
```

Đoạn code trên tạo ra 1 promise, được resolve sau 10 giây. Chúng ta có thể kiểm tra trạng thái của nó trong giai đoạn từ 0-10s trước khi nó được resolve.

![](https://images.viblo.asia/dd9e64a5-b205-471c-96d5-32b3d5a826fb.png)

Sau khoảng thời gian 10 giây thì promise sẽ được resolve. Cả 2 gía trị **PromiseStatus** và **PromiseValue** sẽ được upadate. Như các bạn có thể thấy, việc update resolve function cho thấy ta có thể trả về JSON object thay vì một string đơn giản. 

![](https://images.viblo.asia/4ab5c5db-0e67-42ad-816f-1bc3c031fa0d.png)

Bây giờ hãy xem một Promise bị rejected sẽ như thế nào. Chúng ta sẽ sửa lại ví dụ promise đầu tiên một chút
```JavaScript
keepsHisWord = false;
promise3 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesn't want to keep his word");
  }
});
console.log(promise3);
```

Bởi vì Promise bị reject, Chrome browser sẽ đưa ra error.

![](https://images.viblo.asia/92f83d31-92d2-4099-8d72-ade952d59208.png)

Như các bạn có thể thấy, PromiseStatus có thể có đến 3 giá trị: **pending**, **resolved** và **rejected**. Khi promise được tạo ra, **PromiseStatus** có giá trị là pending, và **PromiseValue** có giá trị là undefined. Khi một promise được **resolved** hoặc **rejected**, chúng ta gọi là promise đã được **settled**, nghĩa là hoàn thành (trôi chảy hay thất bại thì chưa biết). Vì vậy 1 **promise** thường phải trải qua từ giai đoạn **pending** cho đến **settled**.
Bây giờ bạn đã biết cách promise được tạo ra. Wow.

# Kết luận
Bài viết khá dài nên mình xin phép tạm dừng tại đây. Hi vọng bài viết đã giúp các bạn hiểu được khái niệm **Promise**.
Ở bài viết tiếp theo, mình sẽ nói tiếp về phần cách **chúng ta xử lý Promise**, hứa hẹn sẽ thú vị hơn nhiều. :)
Cảm ơn các bạn đã đọc bài.

Bài viết có tham khảo tại: https://medium.com/better-programming/understanding-promises-in-javascript-13d99df067c1