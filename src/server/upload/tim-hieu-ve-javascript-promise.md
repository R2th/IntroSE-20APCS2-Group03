Một trong những điều mà các bạn phải làm quen khi chuyển qua lập trình Javascript đó là bất đồng bộ (Asynchronous) khác hẳn với khái niệm đồng bộ (Synchronous) mà ta đã làm quen với các ngôn ngữ như C# .NET hay PHP. 
# 1. Callback và Callback hell
Lập trình bất đồng bộ thì ta vẫn hay dùng một cơ chế gọi là callback :
```Javascript
function test() {
    console.log('a');
    setTimeout(function(){
       console.log('hello world!');
    }, 2000);
    console.log('b');
}
```
Hàm `setTimeout` nhằm mục đích giả lập môi trường giống như bạn lấy data về từ một url nào đó. Những gì in ra trong console của browser sẽ là:
```
a
b
hello world!
```
Bất đồng bộ ở đây có nghĩa là trình duyệt sẽ không đợi cho đến khi lấy được data về mới chạy lệnh tiếp theo (là `console.log('b')`) mà sẽ cứ chạy qua còn data về lúc nào thì in ra lúc đó. Việc in ra đoạn hello wolrd! có thể cách đoạn in ra b vài phút tùy thuộc tham số ta đưa vào. Câu hỏi đặt ra là callback đã giải quyết vấn đề bất đồng bộ rồi thì tại sao còn phải sinh ra Promise. Promise về cơ bản cũng là một kỹ thuật lập trình bất đồng bộ nhưng có những ưu điểm vượt trội so với callback, điển hình như ví dụ sau:
```Javascript
function test() {
    var a = 0;
    setTimeout(function() {
       a = a + 1;
       console.log(a);
       setTimeout(function() {
          a = a + 2;
          console.log(a);
          setTimeout(function() {
             a = a + 3;
             console.log(a);
          });
       });
    });
}
```

đây gọi là callback hell, khi mà các http request phụ thuộc vào nhau thì cảm giác function sẽ bị lặp vô tận rất khó theo dõi. Thật may mắn, Promise giúp chúng ta giải quyết vấn đề này.
# 2. Promise và Promise chaining
Về cơ bản Promise mang đúng nghĩa đen của nó — một lời hứa. Giống như kiểu mẹ bạn hay hứa lúc còn nhỏ : nếu con ngoan sẽ được đi công viên. Một lời hứa, như bạn đã biết, có thể được thực hiện hoặc không tùy vào người hứa và các điều kiện ngoại cảnh khác. Nó chỉ mô tả những gì bạn sẽ nhận được nếu mọi điều kiện được hoàn thành. Ngoan chẳng hạn, ngoan thì cái gì cũng có. Viết lại ví dụ ở trên bằng Promise như sau:
```Javascript
function test() {
    return new Promise(function(resolve, reject) {
       $.get( "http://google.com", {paramOne : 1, paramX : 'abc'}, function(error, data) {
            if (error) { // nếu không ngoan hoặc nếu tự dưng mẹ đang bực
               reject(error);
            } else { // nếu ngoan và mẹ thì đang vui
               resolve(data);
            }   
       });   
    });
}
```
Lần này ta lấy ví dụ get content của một url để mô phỏng chuẩn xác hơn vì nó có trường hợp error, nếu là `setTimeout` thì sẽ chẳng bao giờ có error. Trong hàm trên, resolve sẽ giống như mẹ đưa phần thưởng cho bạn, nếu bạn quên mất resolve thì bạn cũng không nhận được gì giống như khi mẹ quên mất và bạn phải nhắc vậy. Tương tự với reject, cái truyền vào hàm `reject` phải là một instance của error, nếu không bạn sẽ không catch được nó ở phần sau đâu. Đương nhiên nếu bạn không gọi reject thì bạn cũng không bao giờ biết được mình có phần thưởng hay không. Đến đây có thể bạn sẽ nghĩ “Chả có gì đặc biệt”, tuy nhiên Promise có 2 method `then` và `catch` rất tiện lợi.
```Javascript
test().then(function(data) {
   console.log('page content: ' + data);
}).catch(function(error) {
   console.log(error);
});
```
Hàm then có 2 tham số theo thứ tự là `success handler` và `failure handler` tuy nhiên thường người ta sẽ không truyền vào tham số thứ 2. then trả về kết quả là một Promise chính vì thế mà ta có thể tiếp tục gọi then từ object trả về – hay còn gọi là Promise chaining như ở dưới đây. Nếu vì lí do nào đó bạn không truyền cả 2 tham số hoặc 2 tham số truyền vào không phải là function thì một Promise mới sẽ được trả về với giá trị của Promise trước đó đã gọi then.
```Javascript
test().then(1, 2).
then(function(result) {
   console.log(error);
})
.catch(function(error) {
   console.log(error);
});
```
Hàm then đầu tiên có hai tham số không phải là function do đó Promise được return bởi hàm test() sẽ đi qua hàm then đầu tiên và đến hàm then thứ hai mà không có gì thay đổi. Nếu các handlers (hoặc `success handler` hoặc `failure handler`) return một giá trị thì hàm then sẽ return một Promise với giá trị đó và trạng thái thành công, nếu return hoặc throw một error thì hàm then sẽ return một Promise với giá trị là error và trạng thái là thất bại.
```Javascript
test()
.then(function() {
   return 'hello';
})
.then(function(result) {
   console.log('successful with result ' + result);
}, function(error) {
   console.log('failed with error ' + error);
})
```
kết quả nhận được sẽ là successful with result hello.
```Javascript
test()
.then(function() {
   throw 'oops!';
})
.then(function(result) {
   console.log('successful with result ' + result);
}, function(error) {
   console.log('failed with error ' + error);
})
```
thì kết quả nhận được lại là `failed with error oops!`.

Hàm catch nhận một tham số đầu vào chính là failure handler cho nên nó chỉ áp dụng cho các error. Gọi `catch` giống hệt như khi gọi `then` với tham số đầu tiên là undefined. Hai cách gọi sau đây là hoàn toàn tương đương nhau :
```Javascript
test().catch(function(error) {
   console.log(error);
});
test().then(undefined, function(error) {
   console.log(error);
});
```

Nếu `test()` return một Promise với trạng thái thành công thì hàm `console.log(error)` sẽ không bao giờ được gọi và Promise return từ `test()` sẽ được return cho thàm `then` hoặc `catch` tiếp theo (nếu có). 

Viết lại ví dụ 2 sử dụng Promise như sau:
```Javascript
function getUrl() {
    return new Promise(function(resolve, reject) {
       $.get( "http://example.com/url1", {paramOne : 1, paramX : 'abc'}, function(error, data) {
          if (error) {
             reject(error);
          } else {
             var id = data.id;
             resolve(id);
          }
       });
    });
}
function getUrl1(id) {
   return new Promise(function(resolve, reject) {
       $.get( "http://example.com/url1" + id, {paramOne : 1, paramX : 'abc'}, function(error, data) {
          if (error) {
             reject(error);
          } else {
             var id = data.id;
             resolve(id);
          }
       });
    });
}
function test() {
   getUrl()
   .then(function(id) {
      return getUrl1(id);
   })
   .then(function(id1) {
       ...
       console.log(id1);
       ...
   })
   .catch(function() {
   });
}
```
Dễ nhìn hơn hẳn callback hell ở trên đúng không ? Ta có thể gọi then và catch đan xen nhau để cho dễ nhìn như sau :
```Javascript
test()
.then(function(result) {
})
.catch(function(error) {
})
.then(function(result) {
})
.catch(function(error) {
});
```
cũng có thể hoàn toàn không dùng catch nhưng sẽ có vẻ không tường minh bằng phương án đan xen như ở trên :
```Javascript
test()
.then(
   function(result) {
   }, function(error) {
   }
)
.then(
   function(result) {
   }, function(error) {
   }
);
```
# 3. Chuyển từ callback sang Promise
Với các Browser cũ thì Promise chưa support native nên thường ta phải sử dụng các thư viện ngoài như async hay q. Mình sẽ hướng dẫn cách chuyển từ callback sang Promise sử dung library Mongoose. Để cho đơn giản mình lấy ví dụ cổ điển về todo và giả sử bạn đã có` todo schema` rồi:

**models/todo.js**
```Javascript
"use strict";
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const TodoSchema = new mongoose.Schema(
   {
       name: {
          type: String,
          require: [true, 'name can not be blank'],
       },
       description:{
          type: String
       },
   },
   { minimize: false }
);
TodoSchema.plugin(timestamps);
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
```
**repository/todoRepository.js**
```Javascript
"use strict";
const Todo = require('models/todo');
const Q = require("q");
function getList(params) {
   const deferred = Q.defer();
   Todo.find({}, function(error, todos) {
      if (error) {
         deferred.reject(error);
      } else {
         deferred.resolve(blogs);
      }
   });
   return deferred.promise;
}
```
Với các Browser support Promise ta không cần phải dùng các thư viện ngoài nữa. `todoRepository.js `sẽ sửa lại một chút như sau :
```Javascript
"use strict";
const Todo = require('models/todo');
function getList(params) {
   return new Promise(function(resolve, reject) {
      Todo.find({}, function(error, todos) {
        if (error) {
           reject(error);
        } else {
           resolve(todos);
        }
      });
   });
}
```
Tóm lại Promise là như vậy, rất đơn giản dễ hiểu, về các lib async khác có lẽ sẽ tìm cơ hội chia sẻ với mọi người trong một bài khác.