Bài viết này được chuyển dịch từ [bài viết của tác giả GP Lee](https://medium.com/javascript-in-plain-english/google-javascript-technical-interview-7a20accd6ddf) với các câu hỏi phỏng vấn cơ bản mà không đề đơn giản về Callbacks, Promise và Async/await.


<b>Câu 1:</b> In ra 3 kí tự "A", "B", "C"  theo thứ tự sử dụng callback, promise và async/await

<b>Câu 2:</b> In ra mảng các kí tự theo thứ tự ["A", "B", "C"]

<b>Câu 3:</b> In ra mảng các kí tự theo thứ tự bảng chữ cái ["A", ..., "Z"]


Để giải quyết các vấn đề nêu trên, chúng ta cần có một số kiến thức cơ bản về <b>Callbacks</b>, <b>Promise</b> và <b>Async/await</b>. Nếu các bạn chưa biết thì hãy ngó qua một chút, mình đã đề cập tới 3 anh chàng này trong một bài viết trước đây:

[Promise và async/await: Cuộc chiến không hồi kết hay là sự đồng hành đáng ghi nhận](https://viblo.asia/p/js-promise-va-asyncawait-cuoc-chien-khong-hoi-ket-hay-la-su-dong-hanh-dang-ghi-nhan-4P856OjBKY3)

Nào, chúng ta hãy cùng giải quyết từng vấn đề một nhé!

<h2>Câu 1: in ra các kí tự A, B, C theo đúng thứ tự</h2>

<h3>1. Sử dụng callback</h3>

Một câu hỏi cũng khá là "dị" phải không nào. Chúng ta sẽ viết một hàm để thực thi việc in ra kí tự và nhận vào một callback function:

```javascript
function printString(string, callback) {
  setTimeout(
    () => {
      console.log(string)
      callback()
    },
    1 * 1000 // 1s
   )
}
```

Và bây giờ thì dùng nó thôi:
```javascript

function printAll() {
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {})
    })
  })
}

printAll()
```
Các bạn chú ý là ở lần in kí tự <b>C</b> cuối cùng, chúng ta vẫn cần truyền vào một callback function, mặc dù nó không làm gì cả. (có vẻ rất là "thừa" nhỉ :D )

Nhìn có vẻ là hơi bị <em>callback hell</em> một chút rồi phải không nào?

<h3>2. Sử dụng promise</h3>

Chúng ta vẫn viết hàm ```printString()``` để thực hiện in ra các kí tự, lần này chúng ta sẽ ```return``` ra một đối tượng ```promise``` như cách quen thuộc vẫn làm:

```javascript

function printString(string) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        console.log(string)
        resolve()
      },
      1 * 1000
      )
  })
}
```

Và code bây giờ nhìn sẽ đẹp hơn một chút đó:
```javascript
function printAll() {
  printString("A")
  .then(() => {
    return printString("B")
  })
  .then(() => {
    return printString("C")
  })
}

printAll()
```

<h3>3. Sử dụng async/await</h3>

Nếu mà cứ ```then``` rồi  ```then``` mãi cũng nản phải không nào, khi sử dụng ```async/await``` thì các bạn chỉ cần 3 dòng thôi:

```javascript
async function printAll() {
  await printString("A")
  await printString("B")
  await printString("C")  
}

printAll()
```

OK, câu hỏi đầu tiên khá là đơn giản và dễ dàng, chúng ta sang câu thứ 2 nhé.

<h2>Câu 2: in ra mảng kí tự  ["A", "B", "C"] theo đúng thứ tự</h2>

Phỏng vấn mà, luôn luôn có những câu hỏi "khó chịu", và luôn luôn có những lần "vặn vẹo" làm ta nhớ đời. Khi đã trả lời xong câu thứ nhất, ông phỏng vấn lại  <b>upgrade</b> câu hỏi của ông ấy lên và thế là có câu 2 này này! 

Và mình recommend các bạn hãy thử đặt bút suy nghĩ trước khi đọc xuống phần đáp án ngay bên dưới này nhé.

Trong phần này chỉ giải demo cho trường hợp sử dụng callback thôi nhé, hai trường hợp còn lại các bạn sẽ tự giải và cho mình comment bên dưới bài này được không nào:

Đầu tiên vẫn là hàm ```printString()``` quen thuộc:
```javascript
function printString(string, callback) {
  setTimeout(
    () => {
      console.log(string)
      callback()
    },
    1 * 1000 // 1s
   )
}
```

Bằng một cách hơi <em>tù túng</em> chúng ta fix luôn cái mảng có 3 phần tử cho dễ làm :D. Và chỉ cần gọi nó ra thôi:

```javascript
function printAll() {
  const arr = ["A", "B", "C"]
  
  let index = -1
  printString(arr[++index], () => {
    printString(arr[++index], () => {
      printString(arr[++index], () => {})
    })
  })
}

printAll()
```

Wow, lồng nhau ghê phết nhỉ, kiểu này chắc có thêm 10 kí tự nữa để in ra thì có mà ... sang câu 3!

<h2>Câu 3: In ra mảng các kí tự theo thứ tự bảng chữ cái ["A", ..., "Z"]</h2>

Tới đến đây ông phỏng vấn sẽ nghĩ: <b>"Mày làm thế kia là tự sát rồi, giờ anh sẽ cho mày in ra từ A đến Z cho mày ngất luôn! :joy:"</b>

Mà bạn vẫn cứ nhắm mắt viết callback:
```javascript
function cbHell() {

  XX(param, () => { // 1 callback
    XX(param, () => { // 2 callback
      XX(param, () => { // 3 callback
       ... // forever (hell)
      })
    })
  })
}

printAll()
```

Và thế là tay bạn đã rất khỏe, không cần đi tập tạ đâu!!!
![](https://images.viblo.asia/991702d8-28c4-4b8d-a30d-99ec3723774b.jpeg)

Không ổn không ổn. Bạn phải "dùng tới não" rồi. Nào, bây giờ chúng ta phải tránh ```callback hell``` mà vẫn bắt buộc dùng ```callback```. 

- Đầu tiên, chúng ta sẽ định nghĩa ra mảng 26 phần tử bao gồm các kí tự trong bảng chữ cái tiếng Anh.
- Tiếp theo, ta có một biến ```index``` tăng dần sau mỗi lần gọi hàm ```printString()```.
- Hàm ```printString()``` bây giờ sẽ không còn như trước nữa, nó sẽ được cải biên đôi chút, xem bên dưới nhé.
- Và điều quan trọng nhất ở đây đó là ... xem code rồi nói sau:

```javascript
function printAll(){
  let arr = [...Array(26)].map((val, i) => String.fromCharCode(i + 65)); 
  // console.log(arr) // ["A", "B", "C", "D" ... "Z"]

  let index = 0;
  setTimeout(function cbOfcb() {
    let array = arr
    if(index < 27){
      printString(array[index++], index, callback); // pass string , index , callback
      cbOfcb(); // call itself
    }

    
  }, 1000)


}

printAll()
```

Trong đó hàm ```printString()``` sẽ được cải biên như sau:
```javascript
function printString(string, indx, cb){
      if(indx == 27) {
        cb('err')
      }
      cb(null, string)
}
```

Điều quan trọng nhất mà mình muốn nói đến ở đây đó chính là hàm ```callback``` đó, nó được truyền vào hàm ```printString()``` , hàm này sẽ làm nhiệm vụ in ra kí tự hay dừng lại tùy thuộc vào việc duyệt hết ký tự của bảng chữ cái hay chưa:
```javascript
function callback(err, str) {
 
  if(err) {
    console.log('done');
    return
  }
  console.log(str);
}
```


Đó chính là nghệ thuật dùng callback mà không bị callback hell đó - <b>callback without callback hell</b>

<br>
<br>

Vậy là chúng ta đã giải quyết được 3 câu hỏi phỏng vấn khá "dị" này rồi, với cách làm cũng khá là "khoai" đúng không nào, nhất là trường hợp callback without callback hell :D . Giờ thì phải đợi ông phỏng vấn <b>upgrade</b> câu hỏi của ông ấy đã nhé! 

Cảm ơn các bạn đã theo dõi bài.