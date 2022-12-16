Khi tiếp xúc với javascript ta có thể gặp các thuật ngữ như "module bundlers vs module loader", "Webpack vs Browserify", "AMD vs CommonJS" - những thuật ngữ liên quan đến module trong javascript. Trong bài viết này ta sẽ tìm hiểu về chúng - một kiến thức khá quan trong khi phát triển web với javascript.
# 1. Module trong javascript
Giống như một quyển sách được chia thành các chapter khi đọc, thì khi lập trình một programmer sẽ chia chương trình thành cách module. Có thể hiểu đơn giản module giống như một chương của quyển sách, nó có thể bao gồm một tập các hàm để giúp xử lý một chức năng nào đó. Các chức năng khác nhau có thể có nhưng module khác nhau. Một module tốt có thể cho phép ta thêm, bớt hàm khi cần thiết mà không ảnh hưởng đến toàn bộ hệ thống. 
## Tại sao lại sử dụng module
Có rất nhiều lợi ích khi sử dụng module và một trong số lợi ích quan trọng đó là <br>
### Tính bảo trì
Như đã nói thì module như là một "gói" các function, nó sẽ độc lập với các phần khác của code vì vậy có thể dễ dàng mở rộng, phát triển một cách độc lập. Update module thì sẽ dễ dàng hơn rất nhiều khi nó được tách biệt với các phần khác của chương trình.
### Namespacing
Trong javascript thì khi biến được định nghĩa ngoài cùng thì sẽ là biến toàn cục, nghĩa là mọi nơi có thể truy cập được, điều này thì đặc biệt nên tránh trong javascript. Với module nó sẽ cho phép tránh được điều này bằng việc tạo các biến private chỉ sử dụng trong module đó mà bên ngoài không được phép truy cập vào.
### Tái sử dụng lại
Với module thì ta có thể sử dụng lại chúng nhiều lần trong chương trình để xử lý cùng một chức năng. Ta còn có thể sử dụng lại một module từ một project này trong một project khác.
# 2. Tổ chức một module như thế nào
Có rất nhiều cách để tổ chức thành module trong chương trình, hãy cùng tìm hiểu một vài cách dưới đây.
## Module pattern
Module pattern là khái niệm sử dụng để mô phỏng lại class trong javascript (khi mà javascript chưa support class). Với cách này chúng ta có thể lưu các biến public, private và định nghĩa các hàm tương đương bên trong giống như một class. Có một vài cách để implement pattern này trong javascript. Ví dụ <br>
### Anonymous closure
``` javascript
    (function () {
          // Với cách này thì các biến sẽ được private bên trong

          var myGrades = [93, 95, 88, 0, 55, 91];

          var average = function() {
            var total = myGrades.reduce(function(accumulator, item) {
              return accumulator + item}, 0);

              return 'Your average grade is ' + total / myGrades.length + '.';
          }

          var failing = function(){
            var failingGrades = myGrades.filter(function(item) {
              return item < 70;});

            return 'You failed ' + failingGrades.length + ' times.';
          }

          console.log(failing());

    }());
    // kết quả: 'You failed 2 times.'
```
Với cách tổ chức này thì chúng ta đã tạo ra một "closure", nó cho phép ta ẩn các biến đã sử dụng bên trong. Điểm tốt ở cách này đó là các biến được sử dụng bên trong một cách thoải mái mà không lo overwrite các biến toàn cục của chương trình. Ta vẫn có thể truy cập các biến toàn cục một cách bình thường như sau: <br>
``` javascript
    // biến global được định nghĩa bên ngoài
    var global = 'Hello, I am a global variable :)';

    (function () {
      var myGrades = [93, 95, 88, 0, 55, 91];

      var average = function() {
        var total = myGrades.reduce(function(accumulator, item) {
          return accumulator + item}, 0);

        return 'Your average grade is ' + total / myGrades.length + '.';
      }

      var failing = function(){
        var failingGrades = myGrades.filter(function(item) {
          return item < 70;});

        return 'You failed ' + failingGrades.length + ' times.';
      }

      console.log(failing());
      // vẫn có thể truy cập biến global bình thường
      console.log(global);
    }());

    // 'You failed 2 times.'
    // 'Hello, I am a global variable :)'
```
### Object interface
Một cách khác để implement đó là sử dụng một object giống như một interface như sau <br>
``` javascript
    var myGradesCalculate = (function () {
    
          // Vẫn giữ biến private bên trong
          var myGrades = [93, 95, 88, 0, 55, 91];
          
          // Trả về một tập các funtion và ẩn đi implement chi tiết của chúng

          return {
            average: function() {
              var total = myGrades.reduce(function(accumulator, item) {
                return accumulator + item;
                }, 0);

              return'Your average grade is ' + total / myGrades.length + '.';
            },

            failing: function() {
              var failingGrades = myGrades.filter(function(item) {
                  return item < 70;
                });

              return 'You failed ' + failingGrades.length + ' times.';
            }
          }
    })();
    
    // kết quả
    myGradesCalculate.failing(); // 'You failed 2 times.' 
    myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'
```
Với cách này, nó cho phép ta quyết định xem biến hay method nào muốn ở dạng private, hay muốn expose chúng bằng cách đặt chúng trong return.

### Revealing module pattern
Cách này khá giống với cách ở trên, chỉ khác đó là các biến và method sẽ được giữ ở trạng thái private cho đến khi ta expose chúng một cách tường minh <br>
``` javascript
    var myGradesCalculate = (function () {
    
          var myGrades = [93, 95, 88, 0, 55, 91];

          var average = function() {
            var total = myGrades.reduce(function(accumulator, item) {
              return accumulator + item;
              }, 0);

            return'Your average grade is ' + total / myGrades.length + '.';
          };

          var failing = function() {
            var failingGrades = myGrades.filter(function(item) {
                return item < 70;
              });

            return 'You failed ' + failingGrades.length + ' times.';
          };
          
          // public các biến trỏ đến các function

          return {
            average: average,
            failing: failing
          }
    })();

    myGradesCalculate.failing(); // 'You failed 2 times.' 
    myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'

```
## CommonJS and AMD
Các cách trên đều có một điểm chung: việc sử dụng một biến đơn được gói bên trong một function, tạo thành một closure scope. Mỗi cách đều có một hiệu quả riêng, tuy nhiên chúng cũng có những điểm hạn chế. Hạn chế đầu tiên đó là giả sử nếu chúng ta cần biết một dependency để load các file vào, ví dụ nếu đang sử dụng Backbone trong project, chúng ta sẽ include script tag cho source code của Backbone trong project. Tuy nhiên Backbone lại có một dependency trong Underscore.js, do đó script tag của Backbone không thể đặt trước file Underscore.js. Việc quản lý vấn đề này có thể khá đau đầu và phức tạp. Một hạn chế nữa dó là việc xung đột namespace, ví dụ sẽ xảy ra trường hợp nếu 2 module có cùng tên, hay là 1 module với 2 version nhưng project lại cần cả 2 version này. Để giải quyết các vấn đề trên thì 2 cách implement là CommonJS và AMD được sinh ra. <br>
### CommonJS
CommonJS là tên gọi module được thiết kế và implement javascript APIs, nó rất dễ dàng tái sử dụng. Với commonJS thì một file javascript sẽ lưu các modules trong một context duy nhất. Ở trong scope này chúng ta sử dụng **module.exports** để expose module và **require** để import chúng. Khhi chúng ta định nghĩa một CommonJS module chúng sẽ giống như sau: <br>
``` javascript
    function myModule() {
      this.hello = function() {
        return 'hello!';
      }

      this.goodbye = function() {
        return 'goodbye!';
      }
    }

    module.exports = myModule;
```
Khi một ai đó muốn sử dụng myModule, chỉ cần require chúng như sau: <br>
``` javascript
    var myModule = require('myModule');

    var myModuleInstance = new myModule();
    myModuleInstance.hello(); // 'hello!'
    myModuleInstance.goodbye(); // 'goodbye!'
```
Có 2 lợi ích khi implement theo cách này như ta đã nói từ trước: <br>
- Tránh được xung đột namespace
- Tạo dependencies một cách tường minh <br>
Với việc sử dụng CommonJS thì khi load module sẽ thưc hiện một cách đồng bộ, giả sử 3 module cần require, chúng sẽ được load lần lượt. Điều này sẽ tốt khi làm việc trên server tuy nhiên nó sẽ trở nên khó khăn khi viết javascript trong browser. Đọc một module trên web sẽ lâu hơn khi đọc từ disk. Khi load module, nó sẽ block browser cho đến khi thực hiện xong. Điều này được thực hiện bởi vì luồng javascript sẽ stop cho đến khi code được load xong.
### AMD
CommonJS đã nêu trên thực hiện khá tốt, tuy nhiên nếu chúng ta muốn xử lý bất đồng bộ thì câu trả lời là AMD viết tắt của Asynchronous Module Definition. Load module sử dụng AMD sẽ giống như sau <br>
``` javascript
    define(['myModule', 'myOtherModule'], function(myModule, myOtherModule) {
      console.log(myModule.hello());
    });
```
Ở đây, **define** function nhận vào 2 tham số, tham số đầu tiên là một mảng các module, chúng được load ngầm ở background và sau khi đã load xong thì **define** gọi callback function được truyền vào ở tham số thứ 2. Code cho myModule có thể nhìn như sau: <br>
``` javascript
    define([], function() {
          return {
            hello: function() {
              console.log('hello');
            },
            goodbye: function() {
              console.log('goodbye');
            }
          };
    });
```
Không giống như CommonJS, AMD xử lý một cách bất đồng bộ, bên cạnh đó một lợi ích khác của AMD đó là module có thể là object, function, constructor, string, JSON và nhiều loại khác, trong khi đó CommonJS chỉ hỗ trợ object. <br>
# III. Kết luận
Trên đây là những gì tìm hiểu về module và các cách để implement chúng trong javascript. Hi vọng bài viết giúp ích cho mọi người, nếu có gì góp ý hay thảo luận hãy để lại bình luận phía dưới. (See you)