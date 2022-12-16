![](https://images.viblo.asia/4c1e0291-545b-47fc-b707-a369ba5d9d69.jpeg)

Từ khóa `this` là một khái niệm cơ bản và không xa lạ gì đối với **JavaScript**, và theo mình nó cũng là thứ gây hiểu nhầm và nhầm lẫn nhất trong của ngôn ngữ này, bài viết này mình và các bạn sẽ cùng tìm hiểu cách sử dụng `this` một cách chính xác trong các tình huống khác nhau, kể cả những trường hợp nhạy cảm, nơi mà `this` rất khó nắm bắt.

# Vậy This là gì ? #

Về cơ bản, chúng ta sử dụng `this` tương tự như cách mà chúng ta sử dụng **đại từ nhân xưng**, Ví dụ cả tiếng **Anh** và tiếng **Việt** như sau:
- **Tiếng Anh**: *“John is running fast because he is trying to catch the train.”*
- **Tiếng Việt**: *"Huy đang học tiếng Anh, cậu ấy đang rất cố gắng."*

Bạn có thể thấy mình có dùng đại từ **he** và **cậu ấy** ở 2 câu ở trên không ? Rõ ràng mình hoàn toàn có thể viết lại như thế này :
- **Tiếng Anh**: *“John is running fast because, Joh is trying to catch the train.”*
- **Tiếng Việt**: *"Huy đang học tiếng Anh, Huy đang rất cố gắng."*

Tuy nhiên, trong văn nói và văn viết, chẳng mấy ai và chẳng mấy khi cứ lặp lại tên của nhân vật **John/Huy** như vậy, ( tất nhiên nó không sai, nhưng nghe hơi khó lọt tai và trường hợp bạn cứ dùng đi dùng lại tên như vậy cũng khó nghe hẳn ).

=> Vậy tóm lại con trỏ `this` trong **JavaScript** dùng để đại diện cho **1 Object** ( đối tượng ) , **Object** đó là chủ thể của ngữ cảnh, hoặc chủ thể của code đang chạy.

Ví dụ :
```
const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    // mình sử dụng cách bình thường để lấy value trong 1 Object
    // tên Object toán tử '.' rồi đến name của object cần lấy value
    console.log('Họ và tên',Person.ho + " " + Person.ten);

    // Mình sử dụng con trỏ this, tương tự như việc dùng he/anh ấy 
    console.log('Họ và tên',this.ho + " " + this.ten);

  }
}
Person.ghepHoTen();
```
Các bạn có thể chạy, và hiển thị kết quả hoàn toàn giống nhau, tuy rằng đối với những người mới thì việc dùng **Person.ho** sẽ là trực quan và dễ dàng hiểu hơn so với mình dùng con trỏ `this` như cách số 2.

Tuy nhiên, nếu **Project** ( dự án ) của bạn sau 1 thời gian phát triển, và **Project** đó cũng vài ba người cùng tham gia chứ không riêng gì mình bạn, và `Person` ở trên ví dụ là 1 biến **Local** ( cục bộ ) được tạo ra và nằm trong 1 **function** nào đó, và 1 **function** nào đó cũng có 1 biến **local** trùng tên `Person` như vậy, và còn tồn tại thêm 1 biến **Global** ( toàn cục ), vấn đề nó trở nên rắc rồi rồi nhỉ :3.

Để tránh việc làm khổ mình, khổ người, chúng ta hãy dùng từ khóa `this`, không đơn giản chỉ vì nó dễ nhìn, mà còn sự rõ ràng và chính xác trong code, giống như **đại từ nhân xưng** trong giao tiếp vậy.

Cũng giống như **he**, **cậu ấy** dùng để chỉ các **danh từ** trên ví dụ, từ khóa `this` trong **JavaScript** cũng sẽ sử dụng để tham chiếu đến **Object** mà **function** ( nơi mà `this` được sử dụng ) bị ràng buộc.

Từ khóa `this` không những chỉ tham chiếu **Object** đó mà còn chứa **value** ( giá trị ) của **Object** đó.

# Cơ bản về this #
Trước hết, các bạn cần hiểu rằng tất cả **function** đều có **Property**, giống như mọi **Object** khác. Khi thực thi **fuction** đó, nó sẽ có **Property** `this`chứa  **item**  của 1 **Object** đang gọi tới **function** này.

Hiểu đơn giản, mình có 1 **function** tạm gọi là **functionA**, thì con trỏ `this` chứa **item**  của **Object** gọi tới **functionA**, và ta cũng có thể thông qua `this` này để lấy các **item** khác nằm trong **Object** gọi tới **functionA**.

Lưu ý rằng, nếu chúng ta sử dụng [strict mode](https://www.w3schools.com/js/js_strict.asp), `this` sẽ là **undefined** trong các **function Global**.

ví dụ:
```
"use strict";

const ObjA ={
  ho:'Nguyễn',
  ten:'Tâm'
}

function functionA(){
  console.log(this.ObjA)
}

functionA();
```

> Nếu `this` được sử dụng bên trong một `function` ( mình tạm gọi là **functionA** ) thì nó sẽ chứa `item` của `Object` gọi **functionA**. Chúng ta cần `this` này để truy cập ngược lên để lấy các `method` và `Property` của `Object` gọi **functionA**.

Có vài lưu ý về `this` như sau :
- `this` chính là **context** ( ngữ cảnh ) của nơi mà **function** có chứa từ khóa `this` gọi.
- có 2 loại **context** đối với từ khóa `this` : **Object** chứa **method** được gọi hoặc **Global**, không còn gì nữa cả.
- Vậy nên khi gặp `this` bạn đừng quan tâm đến nó là cái gì ? mà  chỉ quan tâm đến cái nơi gọi **function** chứa nó.

Xem lại ví dụ để hiểu thêm về `this`
```
const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log('Họ và tên',this.ho + " " + this.ten);
  }
}
Person.ghepHoTen();
```

Ví dụ trên mình sử dụng con trỏ `this` được sử dụng trong **method** ghepHoTen, và **method** này được định nghĩa trong **Object** Person, vậy nên `this` này sẽ có `item` của **Object** Person.

Mình có thêm ví dụ về `this` đối với [jQuery](https://jquery.com/):

```
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
// mình sẽ không nói gì đến jQuery nữa nhé
// quan tâm từ đây nè
   $ ("button").click (function (event) {
        console.log ($ (this).prop("name"));
    });
// kết thúc, những thứ khác bạn hãy tự tìm hiểu
});
</script>
</head>
<body>

<button name="ahihidongok">Add</button>

</body>
</html>

```

Với ví dụ **jQuery** trên, hãy lưu ý một vài điểm sau:
- `<button name="ahihidongok">Add</button>` đây là 1 phần tử của **DOM**, vì vậy nó là 1 **Object**.
- ` $ ("button")` , ta thấy `button` này được bao đặt trong **function** của **jQuery** `$()`, vì vậy giờ nó đã thành **Object jQuery**.
- **function** của **jQuery** `$()` bản chất là **anonymous function** ( hàm không tên ), mà đã là **anonymous function** thì không có **Object** nào gọi nó cả. mà đã không có **Object** nào thì `this` sẽ không có **context** để trỏ vào cả.
- Dẫu vậy, `$(this)` vẫn có giá trị của **jQuery Object** `button` bởi vì các tác giả của thư viện **jQuery** đã định nghĩa luôn là `$(this)` đấy sẽ bị ràng buộc với **Object** gọi **method click()**.


Cái này cũng khá thú vị đấy, mình có vị dụ để các bạn xem thử nhé :
```
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
// mình sẽ không nói gì đến jQuery nữa nhé
// quan tâm từ đây nè
   $ ("button").click (function (event) {
        console.log ($ (this).prop("name"));
    });
// kết thúc, những thứ khác bạn hãy tự tìm hiểu
});
</script>
</head>
<body>

<button name="ahihidongok_1">Add 1</button>
<button name="ahihidongok_2">Add 2</button>
<button name="ahihidongok_3">Add 3</button>
<button name="ahihidongok_4">Add 4</button>

</body>
</html>

```

Tự chạy **code** và xem **kết quả** nhé các bạn, khá hữu ích, **ahihi**

## Lưu ý thêm ##
Nếu bạn đã đi đến tận đây, và hiểu những điều cơ bản về con trỏ `this` rồi thì sẽ nhận ra rằng:
- `this` cùa 1 **function** sẽ không được truyền bất cứ **item** gì cả cho đến khi có 1 **Object** gọi **function** có chứa `this` bên trong ( mình tạm gọi nó là **functionB** nhé ).

```
const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log('Họ và tên',this.ho + " " + this.ten);
  }
}
// cái này mình không biết lấy ví dụ thế nào để dễ hiểu hơn, nhưng nó như thế này.
// Person không gọi method ghepHoTen, các bạn console.log sẽ cho ra kết quả.
console.log(Person)
```

- Trong hầu hết `this` chứa **item** của **Object** gọi **function**, nhưng là hầu hết thôi nhé.

## Sử dụng `this` ở phạm vi global ##
Trong phạm vi **global**, khi **code** được thực thi trong trình duyệt, thì mọi **variables** ( biến ) và **function** dạng **Global** đều được định nghĩa trong **Object** `window`.

Vì thế, khi dùng `this` trong hàm dạng **Global**, nó sẽ trỏ tới (và mang giá trị) của **Object** `window` (điều này không đúng nữa trong **strict mode** như đã nói ở trên).

Lưu ý: **Object** `window` là thằng quản toàn bộ các ứng dụng **JavaScript** chạy trên nền **web**.

```
 var firstName = "Nhung",
        lastName = "Nguyễn Hồng";

    function showFullName () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong môi trường global, cùng môi trường với variables "firstName" và "lastName".
        // Do đó, "this" ở trong dây sẽ trỏ (và mang giá trị) của object "window"
        console.log (this.firstName + " " + this.lastName);
    }

    var person = {
        firstName   :"Hà",
        lastName    :"Trần Thu",
        
        showFullName:function () {
        // Lưu ý: Đây là 1 hàm được định nghĩa trong 1 object (tên là "person")
        // object "person" này sẽ gọi hàm "showFullName" khi có nhu cầu
        // do đó, "this" ở trong đây sẽ trỏ và mang giá trị của object "person" 
        // chứ ko phải object "window" như ở trên. 
            console.log (this.firstName + " " + this.lastName);
        }
    }

    showFullName (); // Nhung Nguyễn Hồng
    
// this hay window đều được, mình có giải thích ở trên rồi nhé.
    window.showFullName (); // Nhung Nguyễn Hồng

    person.showFullName (); // Hà Trần Thu
```

## Một số trường hợp dễ nhầm lẫn về `this` ##
Khi vào dự án thực tế, có những trường hợp `this` rất khó biết nó trỏ đi đâu, trong phần này, mình và các bạn cùng tìm hiểu những tình huống như vậy và cách xử lý tương ứng nhé.

### Thay đổi context ###

**Một chút về "context" trước khi tiếp tục :**

Như mình đã nói ở trên **context** là ( bối cảnh ), tương tự như 1 câu sau :

`Tâm là một lập trình viên, anh ấy là người Việt Nam.`

> Quay về thời cấp 1 tí xíu, xác định câu văn trên thì **Tâm** chính là chủ ngữ của câu văn, và chúng ta lên thêm lớp 11 để biết thêm rằng **context** chính là **Tâm** vì toàn bộ câu này vào thời điểm này đều tập trung nói về **Tâm**.
> 
>   ngay cả đại từ **anh ấy** cũng trỏ về **Tâm**.
>
> Và giống như chúng ta có thể sử dụng **dấu chấm phẩy** (";") để chuyển chủ ngữ của câu, ta có thể chuyển **context** hiện tại của đối tượng thứ nhất sang một một đối tượng thứ hai bằng cách gọi **function** ứng với đối tượng thứ hai đó.

Ví dụ :
```
const PersonA = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log(this.ho +' '+ this.ten);
  }
}

const PersonB = {
  ho:'Đức',
  ten:'Trọng'
}


// "Ngữ cảnh", khi chúng ta gọi ghepHoTen là đối tượng personA
// khi chúng ta gọi ghepHoTen cho đối tượng này.  Và "this" trong
// function này sẽ có giá trị của đối tượng personA.
console.log(PersonA.ghepHoTen())

// Chúng ta có thể sử dụng function apply để gán giá trị "this" một cách rõ ràng hơn 
// trong function apply, "this" sẽ có giá trị của bất cứ thứ gì gọi functon this.  Vì thế:
console.log(PersonA.ghepHoTen.apply(PersonB));

// Lưu ý mặc dù trông thì có vẻ như Object PersonA gọi functon ghepHoTen
// Nhưng do dùng method apply rồi, nên về thực tế là nó đã chuyển sang gọi thông qua object PersonB
```

### Sử dụng `this` trong function được truyền như callback
 ###

Giả sử, mình muốn **click** vào một **button**, ta sẽ gọi **function** ghepHoTen của **Person** . Vô cùng đơn giản, ta chỉ cần truyền  **function** ghepHoTen vào như một **callback** cho **function** click là xong.

```
const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log(this.ho +' '+ this.ten);
  }
}

//Ở đây this sẽ là object Person
Person.ghepHoTen(); //Nguyen Tam

$('button').click(Person.ghepHoTen); //ghepHoTen truyền vào như callback
```

Tuy nhiên, kết quả trả về sẽ không như ta mong muốn, mình cũng đã giải thích lý do phía trên với ví dụ dùng **jQuery**. **Object** ở đây sẽ là chính là `button` chứ không phải `Person`.

> Khắc phục bằng cách sử dụng **anonymous function**, hoặc dùng **function bind** để thay đổi **context** **function** truyền vào là được.

Thay lại ví dụ như sau :

```
const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log(this.ho +' '+ this.ten);
  }
}

//Ở đây this sẽ là object Person
Person.ghepHoTen(); //Nguyen Tam

$('button').click(Person.ghepHoTen); //ghepHoTen truyền vào như callback 

// anonymous function, dùng jQuery thì mình nghĩ cách này sẽ dùng mặc định rồi
$('button').click(function(){Person.ghepHoTen()}); 

// Xem coi nó trỏ đến Object button như mình nói không nhé
$('button').click(function(){console.log(this)});

// sử dụng bind
$('button').click(Person.ghepHoTen.bind(Person)); //this ở đây vẫn là object Person

```

### Sử dụng `this` bên trong closure ###

Một trường hợp khác dễ bị hiểu sai, đó là khi có `this` được sử dụng trong một **function** lồng trong một **function** khác ( **một closure** ). Lưu ý là **closure** không thể truy cập vào `this`  của **outer function** ( function bên ngoài ).

```
const Person = {
  ten:'Tam',
  tuoi: [20,21,22,23,24,25],
  ghepHoTen:function(){
  	this.tuoi.forEach(function(value){
    // trong này là 1 anonymous function được lồng trong 1 function,
    // do vậy nó không truy cập được this của function bên ngooài.
    console.log(this.ten +' '+ value);
    })
  }
}

Person.ghepHoTen();
```

`this` bên trong **anonymous function** không thể truy cập `this` của **function** bên ngoài, nên nó sẽ được gán cho **Object** `window` (nếu không sử dụng `strict mode`).

Thay lại ví dụ như sau :
```
const Person = {
  ten:'Tam',
  tuoi: [20,21,22,23,24,25],
  ghepHoTen:function(){
      var that = this; //Gán giá trị this vào biến that
  	this.tuoi.map(function(value){
    console.log(that.ten +' '+ value);
    })
  }
}

Person.ghepHoTen();
```

Trong trường hợp này, cách giải quyết ta thường dùng là tạo một **variable** để gán giá trị `this` vào, và truy xuất tới giá trị đó trong **anonymous function**, ở đây mình dùng :

`var that = this; //Gán giá trị this vào biến that`

Nếu đọc nhiều **code** mẫu, bạn sẽ thấy các lập trình viên **JavaScript** hay thích truyền `this` sang 1 **variable** tên là `that`. Cách đặt tên này không mang nhiều thông tin (dù nghe có vẻ ngồ ngộ), vì vậy một lời khuyên là hãy dùng tên gì có tính mô tả hơn, như là `theUserObj`.

`var theUserObj = this; //Gán giá trị this vào biến theUserObj`

### Khi function được gán vào một variable ###
Trường hợp ta gán **function** cho một **variable** khác, thì **context** sẽ cũng sẽ bị thay đổi theo.
ví dụ:

```
  const ho = 'Duc';
  const ten = 'Thanh';

const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log(this.ho +' '+ this.ten);
  }
}

// in kết quả kiểm tra context của this trong function ghepHoTen
Person.ghepHoTen();
// gán function ghepHoTen cho 1 variable
const PersonA = Person.ghepHoTen;
// context đã bị thay đổi, mình cần là kết quả 'Nguyen Tam'
PersonA();
```

Để giải quyết, ta cũng sử dụng **function bind**, quá đơn giản phải không các bạn.

```
  const ho = 'Duc';
  const ten = 'Thanh';

const Person = {
  ho:'Nguyen',
  ten:'Tam',
  ghepHoTen:function(){
    console.log(this.ho +' '+ this.ten);
  }
}

// in kết quả kiểm tra context của this trong function ghepHoTen
Person.ghepHoTen();
// gán function ghepHoTen cho 1 variable
const PersonA = Person.ghepHoTen;
// context đã bị thay đổi, mình cần là kết quả 'Nguyen Tam'
PersonA();
// dùng bind để sửa lại context
const PersonB = Person.ghepHoTen.bind(Person)
// context đã cập nhật là Person, mình có kết quả như cũ 'Nguyen Tam'
PersonB()
```

### Khi `this` dùng trong borrowing method ###
**borrowing method** ( hàm mượn ) là việc khá phổ biến trong **JavaScript**, việc **borrowing method** giúp chúng ta tiết kiệm thời gian để phát triển những tính năng đã có người phát triển trước đó, công việc của chúng ta chỉ đơn giản lấy và dùng lại.

ví dụ:

```
// Chúng ta có 2 Object, 1 Object có function computeAvg() và 1 Object thì không
// Chúng ta sẽ thực hiện mượn function này
var gameController = {
    scores: [10, 15, 20],
    avgScore: null,
    players: [
        {name: "Tommy", playerID: 987, age: 23},
        {name: "Pau", playerID: 87, age: 33}
    ]
};

var appController = {
    scores: [30, 40, 50],
    avgScore: null,
    computeAvg: function () {      
           var sumOfScores = 
           this.scores.reduce (function (prev, cur, index, array) {
               return prev + cur;
           });
       this.avgScore = sumOfScores / this.scores.length;
   }
 }
```

Ta muốn mượn **method** computeAvg() của **Object** appController để tính điểm trung bình cho **Object** gameController. Muốn làm được điều này ta cần phải thay đổi **context** của **method** computeAvg() sang thành **Object** gameController khi chạy, **method** apply() trong **JavaScript** sẽ giúp ta làm được điều này:

```
appController.computeAvg.apply(gameController);
console.log(gameController.avgScore);
```

Như vậy ta vừa thực hiện dùng **borrowing method** và thay đổi **context** bằng **function apply**.

# Kết luận #
Hi vọng bài viết trên đây của mình đã giúp các bạn hiểu thêm về con trỏ `this`, đối với **function (bind, apply, và call)** mình sẽ cố gắng viết một bài mới giải thích rõ hơn về cách sử dụng chúng, nhưng mong rằng trong bài viết này của mình các bạn có thể hiểu và sử dụng chúng một tí.

> hãy luôn nhớ là `this` chỉ trỏ về **Object** chứa **method** được gọi hoặc **Global** `window`, và không còn gì nữa cả.

Mọi đóng góp hoặc ý kiến các bạn vui lòng bình luận phía dưới.
### Bài viết có tham khảo từ nguồn: ###
https://travisnguyen.net/general/2017/09/27/javascript-hieu-ve-this/

https://viblo.asia/p/this-trong-javascript-gAm5ywe8Zdb

https://kipalog.com/posts/Con-tro-this-trong-Javascript

https://toidicodedao.com/2016/01/26/series-javascript-sida-luan-ban-ve-cai-dit-this-trong-javascript/

### Xin cảm ơn ###