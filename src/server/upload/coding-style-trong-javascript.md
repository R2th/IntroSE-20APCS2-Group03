![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/85xr4edt1b_clean-code.png)
>## Chém Gió tản mạn về Coding style.


Hôm Qua chém gió với  a phương là admin react việt nam(group facebook) .Nói chung là đối với mình a ấy là thánh sống :joy::joy::joy: .Nói về việc học lập trình như thế nào.A ý bảo nên học về cách tư duy này,design pattern và cái mình để ý là dễ học nhất là  xem coding style.Nên Hôm qua tìm hiểu lùng sục cả đêm và đã thông cmn não về nó.Hôm nay rảnh trời mình xin viết một bài viết về nó .

Với mình Code là cũng được coi như một tài liệu tham khảo,vậy nó phải có quy luật thống nhất để người viết code viết ra thì người đọc cũng sẽ hiểu nhanh ,tiếp cận vấn đề với nhau một cách nhanh chóng.
Vậy nên người ta mới đẻ ra các thuật ngữ clean code, beautifull code,... để giúp code đọc dễ hiểu hơn, nhìn thoáng hơn,hơn nữa là giúp các a dev yêu nhau nhiều hơn à nhầm hiểu nhau nhiều hơn huhu @@


>## Whitespace(Khoảng trắng)

- Use soft tabs set to 2 spaces

  ```javascript
  // bad
  function() {
  ∙∙∙∙var name;
  }

  // bad
  function() {
  ∙var name;
  }

  // good
  function() {
  ∙∙var name;
  }
  ```

- Thêm các prefix get ,set giúp người đọc biết function nào là return ,cái nào là change

  ```javascript
  // bad
  function test(){
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }

  // bad
  dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog'
  });

  // good
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog'
  });
  ```

-  Sử dụng space để code thoáng hơn, như mình thì mình dùng cái VS code .Mình dùng cái extension beautiful code .Thế mĩnh mỗi khi save file js nó tự space các biến , đẩy phân cấp các dòng code :v. Nói thế thôi chứ các chi tiết tiết nhỏ thế này rất quan trọng, nên rèn ngay khi code

  ```javascript
  // bad
  var x=y+5;

  // good
  var x = y + 5;
  ```



  ```javascript
  // good
  (function(global) {
    // ...stuff...
  })(this);↵
  ```

- Nhảy dòng các method trong jquery giúp trách code quá dài và khi nhảy thể giúp ta dễ nhìn code hơn,jquery code rất dễ tính, nhảy dòng thoải mái nó cũng chả bug đâu

  ```
  // bad
  $('#items').find('.selected').highlight().end().find('.open').updateCount();

  // good
  $('#items')
    .find('.selected')
      .highlight()
      .end()
    .find('.open')
      .updateCount();

  // bad
  var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
      .attr('width',  (radius + margin) * 2).append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);

  // good
  var leds = stage.selectAll('.led')
      .data(data)
    .enter().append('svg:svg')
      .class('led', true)
      .attr('width',  (radius + margin) * 2)
    .append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);
  ```








* Mặc dù nó không báo lối nhưng các dấu chấm phải có đầy đủ

  ```javascript
  // bad
  (function() {
    var name = 'Skywalker'
    return name
  })()

  // good
  (function() {
    var name = 'Skywalker';
    return name;
  })();

  // good
  ;(function() {
    var name = 'Skywalker';
    return name;
  })();
  ```



>## Type Casting & Coercion

- Kiểu ở trong js rất quan trọng, mình dùng js khá lâu rồi thì đánh giá type ở trong javascript là cái món mình ghét và nó sida vch -.-.Quán lý nó là rất cần thiết trong những project vừa và lớn,Mình từng code một file js tầm 3k dòng trở lên và việc kiểm soát biến rất khó khăn.Khó ở đây là kiếm soát về scope, type, vì js chỉ 2 kiểu khai báo là var,let. Var ,let thực chất mà nói chỉ là 1 kiểu khai bảo thôi chỉ khác nhau ở cái scope.Vậy ở dưới đây là vài cách giúp ta kiểm soát type in js

  ```javascript
  //  => this.reviewScore = 9;

  // bad
  var totalScore = this.reviewScore + '';

  // good
  var totalScore = '' + this.reviewScore;

  // bad
  var totalScore = '' + this.reviewScore + ' total score';

  // good
  var totalScore = this.reviewScore + ' total score';
  ```

- Sử dụng ParseInt và Number

  ```javascript
  var inputValue = '4';

  // bad
  var val = new Number(inputValue);

  // bad
  var val = +inputValue;

  // bad
  var val = inputValue >> 0;

  // bad
  var val = parseInt(inputValue);

  // good
  var val = Number(inputValue);

  // good
  var val = parseInt(inputValue, 10);
  ```





- Booleans:

  ```javascript
  var age = 0;

  // bad
  var hasAge = new Boolean(age);

  // good
  var hasAge = Boolean(age);

  // good
  var hasAge = !!age;
  ```
- Cách sử dụng mảng

```
// bad
var items = new Array();

// good
var items = [];

// lenght array : ))) 

var someStack = [];
// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

- Code về object

```
// bad
var item = new Object();

// good
var item = {};
```
- Về code String khi gán chuỗi hãy sử dung '. Sang ES6 thì có hỗ trợ thêm Template literals.Thuật tiện cho việc nuối chuỗi.: )) các bạn có thể gg  theo keywork

```
// bad
var name = "Bob Parr";

// good
var name = 'Bob Parr';

// bad
var fullName = "Bob " + this.lastName;

// good
var fullName = 'Bob ' + this.lastName;
```



>## Naming Conventions

- Trách đặt các tên hàm  kiểu củ chuối như a ,b,c,d... Tập đặt các tên mang luôn hàm ý vai trò của chính hàm đó.

  ```javascript
  // bad
  function q() {
    // ...stuff...
  }

  // good
  function query() {
    // ..stuff..
  }
  ```

- Cái thứ 2 cần  nhắc đến là cách đặt tên biến, cách đặt tên biến cần thống nhất từ đầu đến cuối.Cái này tùy từng team, thống nhất với nhau.Mình làm team thì họ hay sử dụng eslint để deauft nó.Mình thấy đa số team đều dùng kiểu  camelCase 

  ```javascript
  // bad
  var OBJEcttsssss = {};
  var this_is_my_object = {};
  function c() {}
  var u = new user({
    name: 'Bob Parr'
  });

  // good
  var thisIsMyObject = {};
  function thisIsMyFunction() {}
  var user = new User({
    name: 'Bob Parr'
  });
  ```

- Tự code rồi tìm điểm khác biết cho nó nhớ :3

  ```javascript
  // bad
  function user(options) {
    this.name = options.name;
  }

  var bad = new user({
    name: 'nope'
  });

  // good
  function User(options) {
    this.name = options.name;
  }

  var good = new User({
    name: 'yup'
  });
  ```

- sử dụng _tenbien khi set các biến private

  ```javascript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';

  // good
  this._firstName = 'Panda';
  ```

- Khi gán this function current thì .. như ở dưới,Các bạn thắc mặc tại sao gán như thế này thì nên đọc bài viết về [this](https://kipalog.com/posts/Con-tro-this-trong-Javascript) mình thấy rất hay ở trên kipalog.Nhiều ông nghĩ this thì có quái gì đâu thì mình nói luôn thằng this nó cực dễ bị lộn, Đôi khi mình code mà méo biết this nó trỏ về thằng class hay function nào.

  ```javascript
  // bad
  function() {
    var self = this;
    return function() {
      console.log(self);
    };
  }

  // bad
  function() {
    var that = this;
    return function() {
      console.log(that);
    };
  }

  // good
  function() {
    var _this = this;
    return function() {
      console.log(_this);
    };
  }
  ```





>## Accessors
- Thêm các prefix cho các method get ,set .Ở ES7 cũng có hàm get,set riêng .Các bạn có thể tham khảo ES7

  ```javascript
  // bad
  dragon.age();

  // good
  dragon.getAge();

  // bad
  dragon.age(25);

  // good
  dragon.setAge(25);
  ```

-Các function check tuổi, check có phải number, String,.... ko thì thêm has.... vào : ))).Nhỏ mà nhoi.Mấy cái nhỏ này tuy nó đơn giản nhưng khi làm code những file js tầm cỡ vài nghìn dòng thì như phao cứu sinh luôn.

  ```javascript
  // bad
  if (!dragon.age()) {
    return false;
  }

  // good
  if (!dragon.hasAge()) {
    return false;
  }
  ```




>## Protype trong javascript

-Ở javascript.Khi bạn muốn tạo các method cho object ,Nên Sử dụng protype để khai báo các method cho nó.Viết thể sẽ tách được ra một chỗ là biến sẽ declare ở trong function ,Còn method nó sẽ viết ở ngoài. : ))).Cái này rất hữu ích
Ở dưới đây mình clone Hàm toString sử dụng protype



  ```javascript
  function Jedi(options) {
    options || (options = {});
    this.name = options.name || 'no name';
  }

  Jedi.prototype.getName = function getName() {
    return this.name;
  };

  Jedi.prototype.toString = function toString() {
    return 'Jedi - ' + this.getName();
  };
  ```
> ##END GANE

Mình xin kết thúc phần bài viết đến đây .Mọi góp mình sẽ nhận và sửa đổi ngay lúc tức nếu thấy sai,Các bạn độc giả xin hãy góp ý nhiệt tính để mình hoàn thiện hơn cho bài viết.Mình xin cảm ơn.Mọi Thắc mắc xin liên hệ [facebook](https://www.facebook.com/duc.ceh.cnna) của mình.Sắp tới mình sẽ viết một loạt bài về các thủ thuật code như design pattern , SOLID,functional programming.= ))). Mọi ng nhớ ủng hộ mình
Mình cảm ơn mọi người đã dành thời gian đọc bài viết của mình.
Nguồn: [Link](https://github.com/ducga1998/node-style-guide#blocks)