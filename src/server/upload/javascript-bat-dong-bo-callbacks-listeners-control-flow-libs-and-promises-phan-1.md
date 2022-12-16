![](https://images.viblo.asia/11108ba5-048a-44e8-83f1-7a5ee879b74b.jpg)
Khi nói đến việc xử lý sự phát triển bất đồng bộ trong JavaScript có rất nhiều công cụ bạn có thể sử dụng. Bài viết này giải thích bốn trong số những công cụ này và lợi thế của chúng là gì. Đó là: Callbacks, Listeners, Control Flow Thư viện và Promises.
# Tình huống
Để minh họa việc sử dụng bốn công cụ này, chúng ta hãy tạo một kịch bản ví dụ đơn giản.

Giả sử chúng ta muốn tìm một số hồ sơ, sau đó xử lý chúng và cuối cùng trả lại kết quả xử lý. Cả hai hoạt động (tìm và quá trình) là không đồng bộ.
# Cách giải quyết

## Callbacks
Hãy bắt đầu với callback pattern, đây là mô hình cơ bản nhất và nổi tiếng nhất để đối phó với lập trình async.
Một callback sẽ như sau:
```
finder([1, 2], function(results) {
  ..do something
});
```
Trong callback pattern chúng ta gọi một hàm sẽ thực hiện thao tác không đồng bộ. Một trong những tham số mà chúng ta truyền là một hàm sẽ được gọi khi hoạt động được thực hiện xong.
### Setup
Để minh họa cách chungs làm việc, chúng ta cần một vài chức năng sẽ tìm và xử lý hồ sơ. Trong thực tế, các chức năng này sẽ tạo một AJAX request và trả về kết quả, nhưng bây giờ chúng ta chỉ cần sử dụng *timeouts*.
function finder(records, cb) {
    setTimeout(function () {
        records.push(3, 4);
        cb(records);
    }, 1000);
}
function processor(records, cb) {
    setTimeout(function () {
        records.push(5, 6);
        cb(records);
    }, 1000);
}``
### Using the callbacks
```
finder([1, 2], function (records) {
    processor(records, function(records) {
      console.log(records);
    });
});
```
Chúng ta gọi hàm đầu tiên, truyền qua một callback. Bên trong callback này chúng ta gọi hàm thứ hai đi qua một callback khác.

Các callback lồng nhau này có thể được viết rõ ràng hơn bằng cách truyền một tham chiếu đến một hàm khác.
```
function onProcessorDone(records){
  console.log(records);
}

function onFinderDone(records) {
    processor(records, onProcessorDone);
}

finder([1, 2], onFinderDone);
```
Trong cả hai trường hợp đều trả ra kết quả với log [1,2,3,4,5,6]
Ví dụ ở đây:
```
// setup

function finder(records, cb) {
    setTimeout(function () {
        records.push(3, 4);
        cb(records);
    }, 500);
}
function processor(records, cb) {
    setTimeout(function () {
        records.push(5, 6);
        cb(records);
    }, 500);
}

// using the callbacks
finder([1, 2], function (records) {
    processor(records, function(records) {
             console.log(records);       
    });
});

// or

function onProcessorDone(records){
    alert(records);   
}

function onFinderDone(records) {
    processor(records, onProcessorDone);
}

finder([1, 2], onFinderDone);
```
### Ưu điểm
- Chúng là một mô hình rất phổ biến, do đó, chúng rết dễ hiểu.
- Rất dễ implement trong các function của chúng ta.
### Nhược điểm
- Callback lồng nhau sẽ tạo thành một kim tự tháp khét tiếng của sự diệt vong như được hiển thị ở trên, điều này có thể khiến bạn khó đọc khi bạn có nhiều mức lồng nhau. Nhưng điều này là khá dễ dàng để sửa chữa bằng cách tách các chức năng như thể hiện ở trên.
- Bạn chỉ có thể truyền một callback cho một sự kiện nhất định, điều này có thể là một giới hạn lớn trong nhiều trường hợp.
## Listeners
Listeners cũng là một pattern nổi tiếng, chủ yếu được phổ biến bởi jQuery và các thư viện DOM khác. Listeners có thể như thế này:
```
finder.on('done', function (event, records) {
  ..do something
});
```
Chúng ta gọi một hàm trên một đối tượng mà đối tượng đó được thêm vào một Listener. Trong chức năng đó chúng ta truyền tên của sự kiện mà chúng ta muốn nghe và một callback function. 'On' là một trong nhiều tên phổ biến cho chức năng này, các tên phổ biến khác bạn sẽ gặp là 'bind', 'listen', 'addEventListener', 'observ'.
### Setup
Hãy làm một số thiết lập cho một sự kiện khi được lắng nghe
Đầu tiên chúng ta cần một vài đối tượng sẽ làm công việc tìm và xử lý hồ sơ.
```
var finder = {
    run: function (records) {
        var self = this;
        setTimeout(function () {
            records.push(3, 4);
           self.trigger('done', [records]);
        }, 1000);
    }
}
var processor = {
    run: function (records) {
        var self = this;
        setTimeout(function () {
            records.push(5, 6);
            self.trigger('done', [records]);
        }, 1000);
    }
 }
```
Lưu ý rằng chúng đang gọi một trigger method khi công việc được hoàn thành, tôi sẽ thêm method này cho các đối tượng mà chúng ta đã có bằng cách sử dụng một-mix. Một lần nữa, 'trigger'  là một trong những tên mà bạn sẽ gặp, những cái tên phổ biến khác là ‘fire’ và ‘publish’..
Chúng ta cần một mix-in object có hành vi nghe, trong trường hợp này tôi sẽ chỉ dựa vào jQuery cho điều này:
```
var eventable = {
    on: function(event, cb) {
        $(this).on(event, cb);
    },
    trigger: function (event, args) {
        $(this).trigger(event, args);
    }
}
```
Sau đó, áp dụng các hành vi vào các đối tượng đi tìm và bộ xử lý:
```
 $.extend(finder, eventable);
 $.extend(processor, eventable);
```
Tuyệt vời, bây giờ các đối tượng của chúng ta có thể lắng nghe và trigger các sự kiện.

### Using the listeners
```
finder.on('done', function (event, records) {
  processor.run(records);
});
processor.on('done', function (event, records) {
    console.log(records);
});
finder.run([1,2]);
```
Console output sẽ trả ra [1,2,3,4,5,6]
Ví dụ hoàn chỉnh ở đây:
```
// using listeners
var eventable = {
    on: function(event, cb) {
        $(this).on(event, cb);
    },
    trigger: function (event, args) {
        $(this).trigger(event, args);
    }
}
    
var finder = {
    run: function (records) {
            var self = this;
        setTimeout(function () {
            records.push(3, 4);
           self.trigger('done', [records]);            
        }, 500);
    }
}
var processor = {
    run: function (records) {
         var self = this;
        setTimeout(function () {
            records.push(5, 6);
            self.trigger('done', [records]);            
        }, 500);
    }
 }
 $.extend(finder, eventable);
 $.extend(processor, eventable);
    
finder.on('done', function (event, records) {
          processor.run(records);  
    });
processor.on('done', function (event, records) {
    alert(records);
});
finder.run([1,2]);
```
### Ưu điểm
- Đây là một pattern dễ hiểu.
- Ưu điểm lớn nhất là bạn không giới hạn trong một listener trên mỗi đối tượng, bạn có thể thêm nhiều listeners như bạn muốn. Ví dụ:
```
finder
  .on('done', function (event, records) {
      .. do something
  })
  .on('done', function (event, records) {
      .. do something else
  });

```
### Nhược điểm
Thiết lập phức tạp hơn nhiều so với callback trong code, có thể bạn sẽ muốn sử dụng thư viện ví dụ: jQuery, bean.js.

# Kết luận:
Trong phần này mình đã giới thiệu 2 cách để chúng ta có thể control với bất đồng bộ trong Javascript, mỗi cách đều có ưu và nhược điểm khác nhau. Tùy từng trường hợp bạn sẽ có thể chọn ra những cách xử lý hợp lý riêng. Trong phần kế tiếp, mình sẽ giới thiệu 2 cách còn lại trong việc xử lý asynchronous đó là các thư viện control flow và Promises.
# References:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
http://sporto.github.io/blog/2012/12/09/callbacks-listeners-promises/