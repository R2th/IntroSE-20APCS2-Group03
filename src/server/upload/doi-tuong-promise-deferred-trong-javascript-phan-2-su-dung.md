Trong [phần 1](https://viblo.asia/p/doi-tuong-promise-deferred-trong-javascript-phan-1-khai-niem-va-y-nghia-OeVKB462lkW) của bài viết này, tôi đã dành rất nhiều thời gian nhìn vào lý thuyết về `promises` và `deferreds`:  `promises` là gì và cách họ làm việc. Bây giờ là lúc để thực sự khám phá một số cách để sử dụng `promises` và `deferreds` trong JavaScript và đi sâu vào một số thực tiễn tốt nhất. Tôi sẽ bắt đầu với một số sử dụng cơ bản và ví dụ về  `promises` và sau đó sẽ đi sâu vào một số chi tiết cụ thể liên quan đến việc sử dụng `promises` trong jQuery. Mặc dù các chi tiết cụ thể về API có thể khác với thư viện bạn đã chọn, nhưng có đủ sự chồng chéo trong các khái niệm để minh họa cho việc sử dụng `promises`.

**Lưu ý**: Các mẫu code sẽ sử dụng jQuery bất chấp sự sai lệch của jQuery từ Promise/A proposal, đặc biệt đáng chú ý trong trường hợp xử lý lỗi và khi làm việc với các thư viện promises khác. Kể từ khi phần 1 thảo luận và bao gồm các liên kết đến các bài viết chuyên sâu về chủ đề này, tôi sẽ không nói bất cứ điều gì khác về nó trong bài viết này. Việc sử dụng jQuery vẫn còn phổ biến rộng rãi và việc triển khai thực hiện chúng như là một sự giới thiệu cho nhiều người sử dụng promises, cả hai đều dẫn tôi tin rằng nó có giá trị để hiểu về làm việc với promises trong jQuery.

## Các mẫu trình tự

Một `deferred ` là một đối tượng đại diện cho công việc chưa được thực hiện và `promises` là một đối tượng đại diện cho một giá trị chưa được biết đến. Nói cách khác, promises/deferred cho phép chúng tôi đại diện cho các tác vụ 'đơn giản' và có thể dễ dàng kết hợp để thể hiện các nhiệm vụ phức tạp và luồng của chúng, cho phép kiểm soát chặt chẽ trình tự. Điều này có nghĩa là chúng ta có thể viết JavaScript không đồng bộ song song với cách chúng ta viết mã đồng bộ. Ngoài ra, promises làm cho nó tương đối đơn giản để trừu tượng các mẩu chức năng nhỏ được chia sẻ trên nhiều tác vụ không đồng bộ - hãy xem xét làm ví dụ tải hình động, v.v.

Hãy bắt đầu với chế độ xem toàn cầu về ba mẫu trình tự phổ biến hứa hẹn có thể thực hiện: stacked, song song và tuần tự.
- **stacked**: liên kết nhiều trình xử lý ở bất kỳ đâu trong ứng dụng với cùng một sự kiện promise.
```
var request = $.ajax(url);

request.done(function () {
  console.log('Request completed');
});

// Somewhere else in the application
request.done(function (retrievedData) {
  $('#contentPlaceholder').html(retrievedData);
});
```
- **Tác vụ song song**: yêu cầu nhiều promise để trả lại promise mà cảnh báo về việc hoàn thành lẫn nhau của họ.
```
$.when(taskOne, taskTwo).done(function () {
  console.log('taskOne and taskTwo are finished');
});
```
- **Tác vụ tuần tự**: thực hiện các tác vụ theo thứ tự tuần tự.
```
var step1, step2, url;

url = 'http://fiddle.jshell.net';

step1 = $.ajax(url);

step2 = step1.then(
function (data) {
    var def = new $.Deferred();

    setTimeout(function () {
        console.log('Request completed');
        def.resolve();
    },2000);

  return def.promise();

},
function (err) {
    console.log('Step1 failed: Ajax request');
}
);
step2.done(function () {
  console.log('Sequence completed')
  setTimeout("console.log('end')",1000);
});
```
 
 Các mẫu này có thể được kết hợp hoặc sử dụng riêng biệt để xây dựng các tác vụ phức tạp và quy trình công việc.
 
##  Trường hợp sử dụng phổ biến

Nhiều ví dụ về các cách sử dụng promise liên quan đến các yêu cầu Ajax và hoạt ảnh UI. Trong thực tế, jQuery thậm chí trả về promises theo mặc định từ các yêu cầu Ajax. Điều này có ý nghĩa cho rằng promise là lý tưởng cho các tác vụ không đồng bộ mà hoàn thành cần phải được xử lý theo một cách độc đáo. Tuy nhiên, điều đó không có nghĩa là việc sử dụng promise sẽ bị giới hạn trong các trường hợp sử dụng này. Trong thực tế, promise có xu hướng là một công cụ đáng xem xét bất cứ lúc nào bạn có thể đạt được cho một cuộc gọi lại. Điều đó nói rằng, chúng ta hãy xem xét một số cách chúng ta có thể sử dụng promise
- Ajax
Ví dụ về việc sử dụng promise với các yêu cầu Ajax có thể được tìm thấy trong suốt bài đăng này, vì vậy tôi sẽ bỏ qua một ví dụ ở đây..
- Timing
Chúng ta có thể tạo một promise dựa trên timeout function.
```
function wait(ms) {
  var deferred = $.Deferred();
  setTimeout(deferred.resolve, ms);

 // We just need to return the promise not the whole deferred.
 return deferred.promise();
}

// Use it
wait(1500).then(function () {
  // Do something brilliant here!
});
```
- Animation
Rõ ràng animation sau đây là hoàn toàn vô dụng, nhưng nó phục vụ như là một ví dụ về cách promise và animation  có thể được sử dụng với nhau.
```
var fadeIn = function (el) {

      var promise = $(el).animate({
          opacity: 1
      }, 1500);

      // Dynamically create and return an observable promise object which will be resolved when the animation completes.
     return promise.promise();
  };

var fadeOut = function(el) {

    var promise = $(el).animate({
        opacity: 0
    }, 1500);

    // Dynamically create and return an observable promise object
      return promise.promise();
};

// With the setup out of the way, we can now do one of the following.

// Parallel
$.when(
    fadeOut('div'), 
    fadeIn('div')
).done(function () {
    console.log('Animation finished');
    $('p').css('color', 'red');
});

// OR
// Chained
fadeOut('div').then(function (el) {
    fadeIn(el); // returns a promise
}).then(function (el) {
    fadeOut(el); // returns a promise
});
```

- Đồng bộ hóa các tác vụ song song với `$.when()`
```
var promiseOne, promiseTwo, handleSuccess, handleFailure;

// Promises
promiseOne = $.ajax({ url: '../test.html' });
promiseTwo = $.ajax({ url: '../test.html' });

// Success callbacks
// .done() will only run if the promise is successfully resolved
promiseOne.done(function () {
    console.log('PromiseOne Done');
});

promiseTwo.done(function () {
    console.log('PromiseTwo Done');
});

// $.when() creates a new promise which will be:
// resolved if both promises inside are resolved
// rejected if one of the promises fails
$.when(
    promiseOne,
    promiseTwo
)
.done(function () {
    console.log('promiseOne and promiseTwo are done');
})
.fail(function () {
    console.log('One of our promises failed');
});
```
- Sự kiện tách và logic ứng dụng
Chúng ta cũng có thể sử dụng các sự kiện để kích hoạt resolution/failure của promises, truyền các giá trị thông qua cùng một lúc cho phép chúng ta phân tách ứng dụng, DOM và logic sự kiện.
```
var def, getData, updateUI, resolvePromise;

// The Promise and handler
def = new $.Deferred();

updateUI = function (data) {
    $('p').html('I got the data!');
    $('div').html(data);
};
getData = $.ajax({
          url: '/echo/html/', 
          data: {
              html: 'testhtml', 
              delay: 3
          }, 
          type: 'post'
    })
    .done(function(resp) {
        return resp;
    })
    .fail(function (error) {
        throw new Error("Error getting the data");
    });


// Event Handler
resolvePromise = function (ev) {
    ev.preventDefault();
    def.resolve(ev.type, this);
    return def.promise();
};

// Bind the Event
$(document).on('click', 'button', resolvePromise);

def.then(function() {
    return getData;   
})
.then(function(data) {
    updateUI(data);
})
.done(function(promiseValue, el) {
    console.log('The promise was resolved by: ', promiseValue, ' on ', el);
});


// Console output: The promise was resolved by: click on <button> </button>
```

## Tìm hiểu `$.then` trong jQuery

Giả sử hai hàm tiện ích sau đây cho các ví dụ sau:
```
// Utility Functions
function wait(ms) {
      var deferred = $.Deferred();
      setTimeout(deferred.resolve, ms);
      return deferred.promise();
}
function notifyOfProgress(message, promise) {
    console.log(message + promise.state());
}
```
Nỗ lực đầu tiên của tôi về chuỗi promise cùng nhau trông giống như thế này:
```
// Naive attempt at working with .then()

// Create two new deferred objects
var aManualDeferred = new $.Deferred(),
    secondManualDeferred = aManualDeferred.then(function () {
        console.log('1 started');

        wait(3500).done(function () {
            console.log('1 ended');
        });
    });

// After secondManualDeferred is resolved
secondManualDeferred.then(function () {
    console.log('2 started');

    wait(2500).done(function () {
        console.log('2 ended');
    });
});

// Resolve the first promise
aManualDeferred.resolve();
```
Khi thực hiện điều này, đầu ra bàn điều khiển là những gì tôi đã mong đợi đã có tôi không sử dụng promise.
API jQuery nói rằng `.then()` là có dây chuyền và trả về một promise mới, do đó, kỳ vọng của tôi là bất cứ điều gì tôi bọc trong `.then()` và chuỗi với nhau sẽ xảy ra tuần tự và chờ đợi cho bất kỳ nhiệm vụ để hoàn thành trước khi chuyển sang kế tiếp. Rõ ràng đó không phải là những gì đã xảy ra. Tại sao không?
Làm thế nào để .then () thực sự hoạt động?
Nhìn vào mã nguồn jQuery, chúng ta thấy rằng:

- `.then()` luôn trả về promise mới
- `.then()` phải được chuyển một hàm

Nếu  `.then()` không được truyền một hàm:
- promise mới sẽ có hành vi tương tự như promise ban đầu (có nghĩa là promise đó đã được giải quyết/từ chối ngay lập tức),
- Đầu vào bên trong `.then()` sẽ được thực thi nhưng bị bỏ qua bởi `.then()`

Nếu `.then()` được truyền một hàm trả về một đối tượng promise:
- promise mới sẽ có hành vi tương tự như promise được trả về
```
 var deferred = $.Deferred(),
    secondDeferred = deferred.then(function () {
      return $.Deferred(function (newDeferred) {
        setTimeout(function() {
          console.log('timeout complete');
        newDeferred.resolve();
      }, 3000);
    });
  }),
  thirdDeferred = secondDeferred.then(function () {
      console.log('thirdDeferred');
  });

secondDeferred.done(function () {
    console.log('secondDeferred.done');
});
deferred.resolve();
```
    
- Nếu `.then()` được truyền một hàm trả về một giá trị, giá trị trở thành giá trị của đối tượng mới
```
var deferred = $.Deferred(),
    filteredValue = deferred.then(function (value) {
      return value * value;
    });

filteredValue.done(function (value) {
    console.log(value);
});

deferred.resolve(2); // 4
```
Có thể bạn đã thấy (nếu bạn không nhìn thấy nó ngay lập tức) tại sao phiên bản của tôi không hoạt động.
Tôi đã không trả lời một cách rõ ràng từ `.then()` vì vậy promise mới được tạo ra bởi `.then()` có cùng giá trị như promise được xích lại.

**Avoiding the descent into callback hell**
Chúng ta biết chúng ta cần phải truyền vào `.then()` một function để nó có thể thực hiện công việc đó và chúng ta biết chúng ta cần phải trả về một promise từ `.then()`. Vì vậy, chúng ta có thể làm như sau:
```
// Anti-pattern - Return to callback hell

var aManualDeferred = new $.Deferred();

aManualDeferred.then(function () {
    console.log('1 started');

    return wait(3500).then(function () {
        console.log('1 ended');
    }).then(function () {
        console.log('2 started');

        return wait(2500).done(function () {
            console.log('2 ended');
        });
    });
});

// Resolve the first promise
aManualDeferred.resolve();
```
Nó làm việc. Thật không may, nó bắt đầu trở lại quay trở lại gốc của callbacks, đó là một trong những điều mà promises sẽ giúp chúng ta tránh được. May mắn thay, có một số cách để xử lý điều này mà không cần truy cập vào thân của các hàm lồng nhau. Làm thế nào chúng ta chọn để giải quyết nó, tất nhiên phụ thuộc vào tình hình cụ thể của chúng ta.

**Tránh sử dụng rộng rãi các promise chưa được đặt tên**
Ví dụ, chúng ta có thể làm như sau:
```
// A chain
// Create new deferred objects
var aManualDeferred = $.Deferred();

aManualDeferred.then(function () {
    console.log('1 started');

    // We need to return this, we return a new promise which is resolved upon completion.
    return wait(3500);
})

.then(function () {
    console.log('1 ended');
})

.then(function () {
    console.log('2 started');
    return wait(2500);
})

.then(function () {
    console.log('2 ended');
});

// Resolve the first promise
aManualDeferred.resolve();
```
Phiên bản này được thừa nhận là rất độc đáo nhưng có những bất lợi của chỉ một promise được đặt tên mà không thực sự cho chúng ta sự kiểm soát chi tiết trên từng bước trong quá trình đó là mong muốn trong nhiều tình huống.

**Giải phóng promises và xử lý của họ**
Giả sử chúng ta muốn tránh các hàm lồng nhau và chúng ta nên đặt tên cho các promise của mình để cung cấp cho chúng ta quyền truy cập vào từng bước của quá trình, đây là phiên bản cuối cùng:
```
var aManualDeferred, secondManualDeferred, thirdManualDeferred;

// Create two new deferred objects
aManualDeferred = $.Deferred();

secondManualDeferred = aManualDeferred.then(function () {
    console.log('1 started');

    // We need to return this, we return a new promise which is resolved upon completion.
    return wait(3500);
})
.done(function () {
    console.log('1 ended');
});

thirdManualDeferred = secondManualDeferred.then(function () {
    console.log('2 started');
    return wait(2500);
})
.done(function () {
    console.log('2 ended');
});

// Check current state
thirdManualDeferred.notify(
    notifyOfProgress('thirdManualDeferred ', thirdManualDeferred)
);

// Resolve the first promise
aManualDeferred.resolve();

// Console output
// aManualDeferred pending
// secondManualDeferred pending
// 1 started
// 1 ended
// 2 started
// 2 ended
```
Lợi thế thu được từ phiên bản này là chúng ta có 3 bước mà chúng ta có thể tham khảo rõ ràng để có thể yêu cầu mỗi promise cho trạng thái gửi thông báo tiến độ, hoặc sau đó quản lý trình tự của chúng ta khi cần mà không cần phải viết mã.

## Ngữ cảnh và truyền dữ liệu
Trong ví dụ Ajax trước đó, chúng ta đã thấy rằng chúng ta có thể chuyển một giá trị tới `.resolve()` và `.fail()`. Nếu promise được giải quyết bằng một giá trị, nó sẽ trả về giá trị đó như chính nó.
```
var passingData = function () {
    var def = new $.Deferred();

    setTimeout(function () {
        def.resolve('50');
    }, 2000);

   return def.promise();               
};

passingData().done(function (value) {
      console.log(value);
});
```

Chúng ta cũng có thể đặt ‘this’ khi chúng ta giải quyết một promise.
```
// Create an object
var myObject = {
    myMethod: function (myString) {
        console.log('myString was passed from', myString);
    }
};

// Create deferred
var deferred = $.Deferred();

// deferred.done(doneCallbacks [, doneCallbacks ])
deferred.done(function (method, string) {
    console.log(this); // myObject

    // myObject.myMethod(myString);
    this[method](string);
});

deferred.resolve.call(myObject, 'myMethod', 'the context');

=> myString was passed from the context

// We could also do this:
// deferred.resolveWith(myObject, ['myMethod', 'resolveWith']);
// but it's somewhat annoying to pass an array of arguments.

// => myString was passed from resolveWith
```

## Thực hành tốt nhất

Tôi đã cố gắng minh họa một số thực tiễn tốt nhất trên đường đi nhưng vì mục đích rõ ràng, cho phép tôi tóm tắt chúng theo một tiêu đề. Hoàn toàn thẳng thắn là phần lớn ví dụ này để áp dụng các phương pháp hay nhất khác khi sử dụng promise: cụ thể: DRY và Nguyên tắc chịu trách nhiệm duy nhất. Trong:
- Đặt tên cho lời hứa của bạn
```
var step2 = step1.then()
```
- các hàm xử lý riêng biệt từ logic promise bằng cách gọi hàm được đặt tên từ `.then()` và chức năng riêng biệt thành thứ nhỏ nhặt có thể tái sử dụng
```
var someReusableFunctionality = function () {
    // do something
};
step2.then(someReusableFunctionality);
```
- khi nó hợp lý, hãy trả lời promise thay vì hoãn lại để không ai khác có thể vô tình giải quyết/từ chối promise
```
step2.then(function() {
    // we don't want to give resolution / rejection powers 
    // to the wrong parties, so we just return the promise.
    return deferred.promise();
});
```
- không rơi vào địa ngục gọi lại lồng nhau hoặc địa ngục hứa hẹn lồng nhau

Bằng cách thực hiện theo các phương pháp hay nhất này, chúng tôi có thể thu được nhiều lợi ích nhất từ promise. Chúng tôi có thể tạo các ứng dụng được tách riêng với code dễ đọc, kiểm soát tốt trình tự sự kiện không đồng bộ, xử lý các giá trị chưa tồn tại như thể chúng thực hiện và các hoạt động chưa hoàn thành như chúng có.

## Kết luận
Quản lý JavaScript không đồng bộ và viết các ứng dụng tách rời có thể là một thách thức. Tôi hy vọng bây giờ bạn có một sự hiểu biết tốt hơn về promise, làm thế nào bạn có thể sử dụng chúng và làm thế nào để tránh một số cạm bẫy phổ biến. Vẫn còn rất nhiều vấn đề mà tôi chưa đề cập đến trong hai bài đăng này và sẽ được đề cập đến tài liệu thư viện của bạn.