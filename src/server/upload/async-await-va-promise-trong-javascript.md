Trong bài viết này, mình sẽ giải thích lý do tại sao **async / await** lại được sinh ra và chúng ta lại cần đến chúng trong trong khi ở phiên bản **es6**, js đã giới thiệu cho chúng ta **Promise**.
## Async/Await
Sự ra đời của **Promise**  đã giúp cho việc xử lý các tác vụ bất đồng bộ trở nên dễ đọc và dễ debug hơn rất nhiều.

<div align="center">

![](https://images.viblo.asia/c329d0b0-7351-4fda-b5ca-c1fde7921406.png)
    
</div>

Tuy nhiên, việc tạo ra một **promise** khá là lằng nhằng, nhiều bước, mối khi sử dụng nó, ta sẽ cần phải thêm các callback function, tạo object promise,... khiến cho nó đôi khi không hề dễ chịu chút nào :persevere::persevere::persevere:.

Nhưng tất cả đã được giải quyết khi **es7** mang đến cho chúng ta khái niệm **async / await**. Về cơ bản thì chúng được tạo ra để giúp chúng ta viết các function bất đồng bộ **(asynchronous)** giống với một function chạy đồng bộ  **(synchronous)** mà không lo bị block I/O.

Mọi người hãy xem hai vd bên dưới để thấy rõ hơn sự khác biệt giữa **async / await** và **promise** nhé. 

**Vd 1**: sử dụng **promise**:
```javascript
const asyncFunc = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("function bất đồng bộ đã chạy xong");
    }, 2000);
});

asyncFunc.then((message) => {
    alert(message);
});
```

**Vd 2**: sử dụng **async / await**:
```javascript
async function asyncFunc() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("function bất đồng bộ đã chạy xong"), 2000)
    });

    let result = await promise; // "asyncFunc" sẽ dừng không chạy tại dòng lệnh này trong 2s

    alert(result); // trình duyệt sẽ alert "function bất đồng bộ đã chạy xong"
}

asyncFunc();
```
## Cú Pháp
* ### Async :
    * Được đặt trước một function để khai báo một hàm bất đồng bộ.
    * Biến một function thành một **Promise**, tất cả mọi thứ được return từ một async function sẽ được coi như là một tham số của hàm **resolve** của **promise** và function đó trả về.
    
 * ### Await :
    * Được dùng để tạm dừng một async function cho đến khi một promise kết thúc đứng sau nó.
    * await chỉ hoạt động khi ta đặt nó trước một **Promise**.


  VD: 
  ```javascript
async function asyncFunc() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("function bất đồng bộ đã chạy xong"), 2000)
    });

    let result = await promise; // await sẽ dừng "asyncFunc"
                                // và chạy tiếp "asyncFunc" khi promise chạy xong
    alert(result); // trình duyệt sẽ alert "function bất đồng bộ đã chạy xong" chỉ chạy khi
                   // function promise chạy xong
}

asyncFunc();
```

## Tại sao ta nên dùng async / await
* Code trở nên ngắn và dễ đọc hơn rất nhiều, chúng ta không cần phải tạo object rồi chuyền các callback và dùng then(), catch() nữa mà chỉ cần viết như code tuần tự và chạy thôi.
* Mỗi lần viết await nằm trên một dòng mới, vì thế việc debug sử dụng debug tool cũng trở nên dễ dàng hơn, vì ta viết được chính xác lỗi xảy ra ở dòng nào 
* Chúng ta vẫn sẽ phải lồng các **Promise** vào nhau trong trường hợp ta gọi các hàm đó thông qua các câu điều kiện, trong khi đó **async / await** rất thân thiện với các câu điều kiện.
* Viết vòng lặp qua từng function bất đồng bộ cũng trở nên vô cùng đơn giản, chúng ta chỉ cần await promise mà ta muốn trong mỗi vòng lặp.

Về điểm yếu của **async / await** thì có lẽ chỉ có duy nhất một điểm đó là nó vẫn chưa được nhiều các trình duyệt hỗ trợ, các bạn nên sử dụng  **babel** hoặc một số công cụ js polyfill tool để dịch.

<div align="center">

![](https://images.viblo.asia/1cd29707-486b-433e-8fe2-1569314ee2d6.png)vẫn còn khá nhiều trình duyệt và các phiên bản cũ của các trình duyệt chưa hỗ trợ async và await
</div>

## Kết
Mình đã chỉ ra một số điểm mạnh và cách dùng cơ bản của **async / await**, nó thực sự không hề phức tạp và khó như một số bạn nghĩ, **async / await** hay bất cứ features mới nào trong các phiên bản mới của js đều được sinh ra để giúp chúng ta làm việc dễ dàng và hiệu quả hơn mà thôi. Qua bài viết, mình mong các bạn đã có một cái nhìn tổng quát về **async / await** cũng như cách chạy một function với chúng như thế nào.