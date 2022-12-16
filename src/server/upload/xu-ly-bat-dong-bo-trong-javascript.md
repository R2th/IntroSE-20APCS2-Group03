## I. Đồng bộ và bất đồng bộ
###     1) Khái niệm 
* Synchronous(đồng bộ) là một quy trình xử lý các công việc theo một thứ tự đã được lập sẵn. Công việc sau được bắt đầu thực hiện chỉ khi công việc thứ nhất hoàn thành. Quá trình đồng bộ là một quá trình rất phổ biến trong thực tế. Ví dụ dây chuyền sản xuất sản phẩm trong các nhà máy, hay lộ trình học tập của một học sinh từ lớp 1 đến lớp 12, …
  Trong lập trình, một chương trình đồng bộ là một chương trình được thực hiện theo từng câu lệnh từ trên xuống dưới, từ trái qua phải, câu lệnh sau được thực hiện chỉ khi câu lệnh trước đã hoàn thành. Đa số các ngôn ngữ biên dịch đều tuân theo quy tắc lập trình đồng bộ ví dụ C++, Java, ...Vì thế chỉ cần biên dịch một câu lệnh sai là cả chương trình sẽ dừng lại và báo lỗi.

*  Ngược lại, với Asynchronous(bất đồng bộ), nhiều công việc có thể được thực hiện cùng lúc. Và nếu công việc thứ hai kết thúc trước, nó có thể sẽ cho ra kết quả trước cả câu lệnh thứ nhất. Vì thế, đôi khi kết quả của các câu lệnh sẽ không trả về đúng theo đúng thứ tự như trực quan của nó.

### 2) So sánh ưu nhược điểm của lập trình đồng bộ và bất đồng bộ
* Lập trình đồng bộ có ưu điểm là chương trình sẽ chạy theo đúng thứ tự từ trên xuống, và sẽ phát dừng lại ngay khi gặp một câu lệnh lỗi. Điều này sẽ khiến chương trình dễ kiểm soát và dễ phát hiện ra lỗi hơn. 
* Lập trình đồng bộ cũng có một nhược điểm là hiệu suất chương trình sẽ chậm. Có rất nhiều câu lệnh cần phải thao tác với các dữ liệu bên ngoài nên nó cần có một thời gian chờ để nhận được dữ liệu trước khi hoạt động bình thường. Như thế thời gian thực hiện của chương trình sẽ bằng tổng thời gian chờ của các câu lệnh và thời gian hoạt động bình thường của các câu lệnh đó. Ở một số ngôn ngữ đồng bộ đa luồng, vấn đề này được xử lý bằng cách bổ sung một luồng để thực hiện các câu lệnh khác. Luồng ban đầu sẽ chờ kết quả của luồng bổ sung, sau đó hai luồng sẽ đồng bộ hóa để kết hợp lại kết quả của chúng.

* Lập trình không đồng bộ có cách khác để giải quyết vấn đề trên. Chúng cho phép các hành động  được thực hiện cùng lúc. Do đó, sẽ tối ưu được thời gian chờ của các câu lệnh vì các câu lệnh sẽ được “chờ cùng nhau”. Ở ví dụ sau, câu lệnh 1 và 2 đã “cùng nhau chờ” 0,4s, do đó thời gian thực hiện chương trình giảm được 0,4s.
![](https://images.viblo.asia/2bd68baa-d7db-4b81-86f1-5280fb89eccc.png)
 
	Ở hình sau, đường màu đỏ thể hiện thời gian chờ của một câu lệnh, đường màu xanh dày thể hiện thời gian thực hiện bình thường của lệnh đó.
![](https://images.viblo.asia/0f44c12e-bfa3-4904-8795-8a824ebf0dbb.png)

*  Tuy nhiên, lập trình không đồng bộ cũng có nhược điểm. Do các câu lệnh không đồng bộ có thể sẽ không được thực hiện theo đúng thứ tự từ trên xuống theo quy trình nên đòi hỏi chúng ta cần có các kỹ thuật để kiểm soát chúng. Ví dụ cụ thể ở đoạn mã sau:
```
setTimeout(()=>console.log(1),1000);
console.log(2);
```
Câu lệnh thứ hai trả về kết quả trước câu lệnh thứ nhất
##     II. Bất đồng bộ trong JavaScript
   Javascript là ngôn ngữ lập trình bất đồng bộ và chỉ chạy trên một luồng. Sự bất đồng bộ trong javascript xuất hiện khi nó thao tác với các  WebAPI (ajax, setTimeout(), ... ). Khi một câu lệnh thao tác với WebAPI, nó sẽ mất một khoảng thời gian để chờ các  dữ liệu trả về từ WebAPI, do đó ở trong luồng chính của javascript, nó sẽ ở trong trạng thái chờ. Tuy nhiên chương trình sẽ không bỏ trống khoảng thời gian chờ đó, chương trình sẽ tiếp tục thực hiện các câu lệnh tiếp theo. Đó là lý do Javascript là ngôn ngữ bất đồng bộ.
   Sau đây chúng ta sẽ tìm hiểu kĩ hơn về cách javascript hoạt động với các trường hợp bất đồng bộ.
![](https://images.viblo.asia/4f5918b4-39b4-4887-807c-ac734fa0061e.png)
   Một câu lệnh trong javascript khi được thực hiện nó phải trải qua sự kiểm soát các các đối tượng: Timer, Message Queue,  Event Loop, CallStack. Đầu tiên, nếu một câu lệnh được gọi thao tác với WebAPI, nó sẽ được chuyển đến hàng đợi Timer. Sau khi hết thời gian chờ nó sẽ được chuyển đến Message Queue. Call Stack là ngăn xếp rất quen thuộc trong lập trình. Khi một hàm được gọi, hàm đó được thêm vào ngăn xếp và hàm đó sẽ được lấy ra khỏi ngăn xếp khi hàm đó thực thiện xong. Event Loop sẽ kiểm tra khi nào trong Call Stack trống thì sẽ chuyển câu lệnh trong Message Queue vào trong Call Stack. 
## III. Xử lý bất đồng bộ trong JavaScript
   Để làm cho các câu lệnh thực hiện theo đúng thứ tự của nó, chúng ta có 3 phương án giải quyết phổ biến : Call Back,  Promise, Asyn/Await
###     1) Call Back
   Call Back là một hàm được truyền vào một hàm khác với tư cách như một tham số của hàm đó. Ví dụ như
  ```
 function nauGa(callback)
       nauNuocSoi();
      vatLongGa();
      callback();
}
 function luocGa(){
      //
}

 function nuongGa(){
  //
 }
 nauGa(luocGa);
 nauGa(nuongGa);
```
Ở đoạn mã trên, chúng ta thấy rằng, hàm luocGa và nuongGa được dùng như tham số trong hàm nauGa
   Với Javascript, một ngôn ngữ hướng sự kiện, call back được sử dụng rất nhiều khi xử lý các sự kiện, ví dụ như  
   ```
$('#button').click(function(){
   alert("hê nô");
   })
```
   Chúng ta có thể áp dụng call back để đồng bộ hóa các đoạn mã không đồng bộ. Ví dụ như ở đoạn mã trên. Nấu nước sôi cần một khoảng thời gian chờ nước sôi, chúng ta không phải làm gì. Ta có thể biểu diễn thời gian chờ này bằng hàm setTimeout() trong javascript. 
   ```
 function soCheGa(){
      nauNuocSoi();
      vatLongGa();
}
 function nauNuocSoi(){
      setTimeout(function(){
        console.log("nau nuoc soi")
      }, 1000)
}
function vatLongGa(){
    console.log("vat long ga");
}
soCheGa();
```
   
   Và nếu như theo đúng cách chạy của Javascript thì hành động vặt lông gà sẽ được thực hiện trước hành động nấu nước sôi. (à, quên mất, nấu nước sôi là để nhúng gà vào vặt lông chứ không phải để luộc gà đâu nhé ;) ) .Mà nếu chúng ta vặt lông gà luôn mà không cần nhúng nước nóng thì tội cho bác gà quá. Vì thế để cho gà có thể ra đi thanh thản chúng ta cần đồng bộ hóa lại quy trình bằng callback như sau
```
    function soCheGa(callback){
      nauNuocSoi(vatLongGa);
    }
     function nauNuocSoi(callback){
      setTimeout(function(){
        console.log("nau nuoc soi");
        callback();
      }, 1000)
    }
```
Tuy nhiên, Callback cũng có nhược điểm. Đó là khi chúng ta muốn nhiều hành động bất đồng bộ thực hiện theo đúng thứ tự liên tiếp nhau, chúng ta phải gọi nhiều hàm callback lồng vào nhau nhiều lần, gây ra đoạn code rất khó kiểm soát và không tối ưu. Đây gọi là tình trạng Callback Hell. Ví dụ như muốn in các số từ 1 đến 10, mà mỗi hành động in đều là một hàm bất đồng bộ
```
function printNumber(number, callback){
  setTimeout(
    () => {
      console.log(number)
      callback()
    },
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll(){
  printNumber(1, function(){
    printNumber(2, function(){
      printNumber(3, function(){
        printNumber(4, function(){
          printNumber(5, function(){
            printNumber(6, function(){
              printNumber(7, function(){
                printNumber(8, function(){
                  printNumber(9, function(){
                    printNumber(10, function(){

                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
```


### 2) Promise
   Promise là một đối tượng bao hàm một hàm chứa các đoạn code không đồng bộ. Hàm này chứa 2 tham số là hai hàm callback để giải quyết sau khi mã đồng bộ thực hiện thành công hay thất bại. Promise cung cấp cho ta hai phương thức xử lý sau khi đoạn mã bất đồng bộ thực hiện thành công hoặc thất bại. Hàm then() dùng để xử lý sau khi mã bất đồng bộ được thực hiện thành công và hàm catch() dùng để xử lý sau khi mã bất đồng bộ thực hiện thất bại
  ```
 function printNumber(number){
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
          if(number<0){
           reject(); 
           }else{
               console.log(number);
               resolve();
           }
          }, 
        1000
        )
      })
}
printNumber(1)
.then(()=>printNumber(2))
.reject(()=>console.log("number < 0"))
```
Phương thức then có thể thực thi một hàm, một Promise hay một đối tượng. Nếu chúng ta dùng then để trả về một Promise thì ta có thể tận dụng để xử lý tình trạng Callback Hell
```
printNumber(1)
.then(()=>printNumber(2))
.then(()=>printNumber(3))
.then(()=>printNumber(4))
.then(()=>printNumber(5))
.then(()=>printNumber(6))
.then(()=>printNumber(7))
.then(()=>printNumber(8))
.reject(()=>console.log("number < 0"))
```
Tuy nhiên, dù Promise đã giải quyết được vấn đề Callback Hell, nhưng chúng ta có thể thấy, đoạn mã vẫn chưa thực sự rõ ràng và dễ hiểu. Trong phương thức chúng ta vẫn phải truyền vào một hàm, mà hàm đó trả về một hàm khác có giá trị trả về là 1 Promise. Chúng ta tạm gọi đây là tình trạng Promise Hell. 
### 3) Asyn/Await
Async / Await là một tính năng ngôn ngữ là một phần của tiêu chuẩn ES8. Từ khóa Async để khai báo rằng hàm này sẽ xử lý các hàm bất đồng bộ, nó sẽ chờ kết quả của các hàm bất đồng bộ được trả về sau đó mới thực hiện tiếp. Hàm bất đồng bộ đó phải trả về một Promise và được khai báo với từ khóa Await
```
function printNumber(number){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
       console.log(number)
       resolve()
      }, 
     Math.floor(Math.random() * 100) + 1
    )
  })
}

async function printAll(){
  await printNumber(1);
  await printNumber(2);
  await printNumber(4);
  await printNumber(5);
  await printNumber(6);
}
printAll();
```
Đến đây thì chúng ta đã thấy Asyn/Await đã giải quyết triệt để được tình trạng Callback Hell cũng như Promise Hell.
## IV . Tổng kết
Qua một hồi luyên thuyên thì chúng ta rút ra kết luận là: Lập trình bất đồng bộ có hiệu suất tốt hơn lập trình đồng bộ. Tuy nhiên, trong nhiều trường hợp chúng ta vẫn phải thực thi các đoạn mã một cách đồng bộ. Trong JavaScript, chúng ta có ba kĩ thuật là Callback, Promise, Asyn/Await. Callback phù hợp trong các trường hợp xử lý đơn giản hơn (như đồng bộ 2, 3  hàm bất đồng bộ) vì nó dễ hiểu. Asyn/Await phù hợp cho các trường hợp phức tạp như cần đồng bộ quá nhiều hàm bất đồng bộ.<br>
*Nguồn tham khảo*<br>
https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee<br>
https://eloquentjavascript.net/11_async.html