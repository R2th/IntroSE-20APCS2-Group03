### 1. Đơn giản về đồng bộ và bất đồng bộ
Trong thực tế cuộc sống, `đồng bộ` (***Synchronous***) là quy trình xử lý công việc theo một thứ tự tuần tự đã được lập sẵn. Công việc tiếp theo chỉ được thực hiện khi công việc trước đó đã hoàn thành xong.<br>
Còn trong lập trình máy tính, một chương trình được thực hiện theo từng câu lệnh từ trên xuống dưới một cách tuần tự, câu lệnh sau thực hiện khi câu lệnh trước đó hoàn thành được gọi là một chương trình đồng bộ.<br>

Do thực hiện tuần tự nên chương trình đồng bộ rất sẽ dễ kiểm soát và `debug` khi có lỗi xảy ra bởi khi một câu lệnh bị lỗi thì cả chương trình sẽ dừng và báo lỗi.<br>
Tuy nhiên, chúng ta cũng có thể dễ dàng nhận ra, thời gian để hoàn thành một nhiệm vụ đồng bộ sẽ bằng tổng thời gian thực hiện các công việc của nhiệm vụ đó. Do đó, nếu một công việc mất quá nhiều thời gian để hoàn thành (như **call APIs**, truy vấn **database**, ...) nó sẽ làm ***tăng*** lượng thời gian cần để hoàn thành nhiệm vụ, khoảng thời gian chờ sẽ rất lớn. Trong khoảng thời gian chờ này, chúng ta không thể thực hiện bất kỳ một công việc nào khác. Việc này sẽ làm giảm hiệu suất của chương trình, lãng phí nhiều thời gian, đồng thời cũng gây ảnh hưởng tiêu cực tới trải nghiệm của người dùng.<br>

Ngược lại với đồng bộ, `bất đồng bộ` (***Asynchronous***) là việc các sự kiện, công việc có thể được thực hiện một cách độc lập, hoạt động song song không gây ảnh hưởng tới luồng công việc chính. Điều này sẽ tối ưu được thời gian chờ, qua đó làm giảm tổng thời gian cần để hoàn thành một nhiệm vụ.<br>
Nhưng kết quả của công việc thực hiện sau có thể được trả về trước kết quả của công việc chạy trước nó, do vậy kết quả trả về cuối cùng có thể sẽ không theo thứ tự đã định sẵn, yêu cầu chúng ta cần kiểm soát chặt chẽ hơn.
### 2. Bất đồng bộ trong JavaScript
![](https://images.viblo.asia/982c0bd3-62d0-46ad-ad1a-6e2543bf116c.png)

Để giải quyết vấn đề thời gian chờ trong các chương trình đồng bộ, ở một số ngôn ngữ đồng bộ như C/C++ hay Java, ... sẽ sử dụng cơ chế đa luồng (**multi-thread**). Chúng ta sẽ bổ sung thêm luồng (***thread***) để thực hiện các công việc cần nhiều thời gian hoàn thành. Những luồng này sẽ hoạt động độc lập và song song không ảnh hưởng tới luồng chính của chương trình, chúng ta vẫn có thể thực hiện các hành động khác ở luồng chính.<br>

Tuy nhiên, JavaScript lại là một ngôn ngữ đơn luồng (**single-thread**), các lệnh được thực hiện tuần tự (***hoisting***), không đồng thời.

![](https://images.viblo.asia/2e607f43-2834-48b4-be93-f6a8dbd956fb.png)

![](https://images.viblo.asia/9de9456a-5d89-45d3-a01a-c2689d8a481a.png)

Sự bất đồng bộ được thể hiện khi chúng ta thực hiện một số hành động call **WebAPI** như ***AJAX*** hay **setTimeout()**, nó sẽ tốn một khoảng thời gian chờ dữ liệu được trả về. Nhưng JS sẽ không lãng phí khoảng thời gian này, nó sẽ tiếp tục thực hiện các hành động khác, đó là lý do vì sao `JavaScript` lại là ***ngôn ngữ bất đồng bộ***.<br>

Một lệnh trong JS chịu sự kiểm soát của **Timer**, **Message Queue**, **CallStack** và **Event Loop** khi thực hiện. Function trong JS không bao giờ được gọi trực tiếp mà sẽ được gọi thông qua các ***Messages***.
+ ***Timer:*** lưu trữ các lệnh thực hiện thao tác với ***WebAPI***.
+ ***Message Queue:*** lưu trữ các ***Message*** (hoặc ***Event***) đến. Một lệnh sau khi hết thời gian chờ sẽ được chuyển từ hàng đợi ***Timer*** đến đây.
+ ***CallStack:*** lưu trữ các hàm được thực hiện. Khi một hàm được gọi, nó được đưa vào trên cùng của ***Stack***, và sẽ ra khỏi ***Stack*** khi thực hiện xong.
+ ***Event Loop:*** `người điều phối` các ***Messages***, nó thực hiện chuyển ***Message*** trong ***Message Queue*** vào ***CallStack*** khi ***CallStack*** trống.

### 3. Xử lý bất đồng bộ trong JavaScript
***Noted:***
```js
function() {}     function(a) {}      function(a,b) {}
```
viết ngắn gọn thành
```js
() => {}          a => {}            (a,b) => {}
```
**3.1. Callback (ES5)**

![](https://images.viblo.asia/34d6a4ef-d17f-4887-90aa-570a12cab540.png)

***Callback*** là hàm được truyền vào một hàm khác (tạm gọi là hàm cha) giống như một tham số của hàm đó. Khi hàm cha thực hiện xong, thường thì hàm này sẽ tốn nhiều thời gian hoàn thành, hàm ***callback*** sẽ được thực hiện.<br>
Đây là cách dễ thực hiện nhất dùng để xử lý bất đồng bộ trong `JS`.
```js
function getName(name){
  setTimeout(
    () => {
      console.log(name);
    }, Math.floor(Math.random() * 100) + 1
  )
}
```
Chúng ta có một ví dụ đơn giản: lấy ra `name` sau một khoảng thời gian ngẫu nhiên. Bây giờ, viết một hàm lấy ra tên của ***Hoa, Moc, Lan***:
```js
function getAll() {
  getName("Hoa");
  getName("Moc");
  getName("Lan");
}
getAll();
```
Mặc dù những hàm trên được xếp theo thứ tự, nhưng chúng lại độc lập với nhau (do **setTimeout()**), do vậy những hàm này là bất đồng bộ. Các `name` sẽ được lấy ra một cách ngẫu nhiên không theo thứ tự mỗi khi chúng ta gọi hàm **getAll()**.<br>

Giải quyết vấn đề này với **callback()**
```js
function getName(name, callback){
  setTimeout(
    () => {
      console.log(name);
      callback();
    }, Math.floor(Math.random() * 100) + 1
  )
}
```
Hàm **getAll()** sẽ được viết lại thành
```js
function getAll() {
  getName("Hoa", () => {
    getName("Moc", () => {
      getName("Lan", () => {} ) 
    })
  })
}
getAll();
```
***Hoa, Moc, Lan*** bây giờ sẽ luôn được lấy ra theo đúng thứ tự mỗi khi chúng ta gọi **getAll()**.<br>

Nhưng có một vấn đề phát sinh ở đây, khi chúng ta muốn nhiều hàm bất đồng bộ thực hiện theo đúng thứ tự tuần tự, chúng ta phải gọi nhiều hàm **callback()** lồng nhau, khi đó code của chúng ta nhìn sẽ phức tạp, không tối ưu và rất khó kiểm soát. Trường hợp này gọi là ***Callback Hell***.

**3.2. Promise - ES6/ES2015**
![](https://images.viblo.asia/62dc0740-011b-4e18-a411-feeb82b50c50.png)

***Promise*** là một ***Object*** chứa một hàm được gọi là ***executor*** gồm đoạn code bất đồng bộ. Nó cung cấp **.then()** thực thi một hàm, một ***Promise*** hay một ***Object*** sau khi code bất đồng bộ được thực hiện thành công và **.catch()** xử lý sau khi mã bất đồng bộ thất bại.<br>

Cú pháp khai báo một ***Promise***
```js
let promise = new Promise(function(resolve, reject) {
  // Coding
});
```
***Promise*** ban đầu có **state** là ***pending*** và **value** là ***undefined***. Sau khi ***executor*** hoàn thành, gọi một trong hai ***callback*** được truyền vào như sau:
+ ***resolve(value):*** xác định nhiệm vụ hoàn thành thành công. **State** chuyển thành ***fulfilled*** và kết quả trả về là ***value***.
+ ***reject(error):*** xác định nhiệm vụ thất bại, có lỗi xảy ra. **State** chuyển thành ***rejected***, kết quả trả về là ***error***.

***Promise*** sẽ giải quyết vấn đề ***Callback Hell*** (khi hàm **.then()** trả về một ***Promise***). Về bản chất, ***callback*** vẫn được sử dụng, nhưng với cú pháp rõ ràng hơn khi `chain` các đoạn code bất đồng bộ.<br>

Ví dụ trên được viết lại, sử dụng ***Promise***
```js
function getName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        console.log(name);
        resolve();
      }, Math.floor(Math.random() * 100) + 1)
  })
}
```
**getName()** sẽ trả về một ***Promise***.
```js
function getAll() {
  getName("Hoa")
  .then(() => {
    return getName("Moc");
  })
  .then(() => {
    return getname("Lan");
  })
  .catch(error => {
    console.log(error);
  });
}
getAll();
```
Nó được gọi là một ***Promise Chain***. **getName()** sẽ trả về một ***Promise*** và được gửi tới hàm **getName()** tiếp theo trong chuỗi.<br>

Chúng ta có một cách trình bày khác, sử dụng chức năng của các dấu `=>`
```js
function getAll() {
  getName("Hoa")
  .then(() => getName("Moc"))
  .then(() => getName("Lan"))
  .catch(error => {
	console.log(error);
  });
}
getAll();
```
**3.3. async/await - ES8/ES2017**

![](https://images.viblo.asia/d0c6fa8e-938b-4153-8607-cbe5902e4263.png)

***async/await*** là một cơ chế giúp thực hiện các thao tác bất đồng bộ một cách trông tuần tự hơn, nó giúp ***Promise*** đơn giản, dễ hiểu và tránh được phải ***chain*** **.then()** quá nhiều.<br>

**async** là từ khóa để khai báo hàm xử lý các hàm bất đồng bộ, nó sẽ chờ các hàm này hoàn thành rồi mới bắt đầu thực hiện. Hàm bất đồng bộ sẽ được khai báo với từ khóa **await** và phải trả về một ***Promise***. Một lưu ý nhỏ, **await** không thể sử dụng được ở mức ***global***.
```js
async function getAll() {
  await getName("Hoa");
  await getName("Moc");
  await getName("Lan");
}
getAll();
```
Với cách trình bày như trên, chúng ta có thể thực hiện thêm nhiều ***request*** nữa mà cấu trúc chương trình vẫn sẽ rõ ràng.

Ngoài ra, chúng ta có thể sử dụng ***try/catch*** trong phạm vi **async** khi bắt lỗi với ***async/await***. 
```js
async function getAll() {
  try {
 	await getName("Hoa");
 	await getName("Moc");
  	await getName("Lan");
  }
  catch (error) {
	console.log(error);
  }
  finally {
     // anything you want
  }
}
getAll();
```
***finally()*** nhận một hàm đầu vào và sẽ thực hiện dù cho ***Promise*** trước nó có thành công hay bị lỗi.

***async/await*** có thể làm cho code trông đồng bộ hơn nhưng bản chất nó vẫn được thực hiện theo cách tương tự như khi chúng ta sử dụng ***callback*** hay ***Promise***. Các hoạt động I/O bất đồng bộ vẫn sẽ được xử lý song song và code xử lý các ***response*** bất đồng bộ vẫn sẽ không được thực hiện cho đến khi hoạt động bất đồng bộ đó có kết quả. Ngoài ra, mặc dù là sử dụng ***async/await***, nhưng là giải quyết nó như một ***Promise*** ở mức cao nhất của chương trình. Bởi vì **async** và **await** chỉ là cú pháp (***syntactical sugar***) để tự động ***creating***, ***returning*** và ***resolving Promise*** mà thôi.

### 4. Nên sử dụng callback, Promise hay async/await?
Đây là một số quy tắc có thể sử dụng khi lựa chọn cơ chế nào để xử lý bất đồng bộ.
- Chỉ nên sử dụng ***callback*** khi có 2,3 function lồng nhau, tránh ***Callback Hell***.
- ***async/await*** có lẽ là cách viết code tốt nhất, ngắn và rõ ràng khi thực hiện bất đồng bộ, và không thể sử dụng với ***callback*** thuần.
- ***async/await*** cũng giống ***Promise***, là `non-blocking`.
- Không thể đặt ***breakpoint*** trong ***arrow function*** trả về ***expression*** của ***Promise***.
- ***Promise*** và ***async/await*** không hoàn toàn thay thế mà là hỗ trợ lẫn nhau. Hàm **async** trả về một ***Promise***. Ngược lại cũng đúng. Mọi function trả về một ***Promise*** cũng có thể được coi là **async** function.
- **await** được sử dụng để gọi một hàm **async** và chờ nó ***resolve*** hoặc ***reject***. **await** chặn việc thực thi code trong hàm **async** chứa nó. Và **await** nên được sử dụng khi ***output*** của function sau phụ thuộc vào ***output*** của function trước nó.
- Tạo hai hàm **async** khác nhau, chạy chúng song song nếu chúng có thể chạy song song độc lập với nhau.
- Nếu chạy song song các ***Promise*** thì cần tạo một mảng các ***Promise*** và phải sử dụng **Promise.all(promisesArray)**.
- Mỗi khi sử dụng **await** phải nhớ rằng bạn đang viết `mã chặn`, chúng ta thường quên mất điều này.
- Thay vì tạo các hàm **async** lớn có nhiều **await**, thì chúng ta nên tạo các hàm **async** nhỏ hơn, hạn chế viết quá nhiều code chặn.
- Một lợi ích khi sử dụng các hàm **async** nhỏ hơn đó là chúng ta buộc phải quyết định các hàm **async** nào có thể chạy song song.
- Nếu code có chứa mã chặn, hãy sử dụng **async** function.

Do vậy, câu trả lời là tùy từng trường hợp thực tế mà chúng ta sẽ có sự lựa chọn phù hợp nhé.
### 5. Tham khảo
* [Getting to know asynchronous JavaScript: Callbacks, Promises and Async/Await](https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee)
* [Callbacks, Promises and Async/Await](https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90)
* [Xử lý bất đồng bộ với callback, promise, async/await](https://completejavascript.com/xu-ly-bat-dong-bo-callback-promise-async-await)