# Giới thiệu #
Biết cách sử dụng **function** (hàm) như **data** và tăng cường khả năng **mở rộng** của nó là đặc điểm được nhắc đến nhiều nhất của **Higher Order Function** trong **JavaScript**.

Chỉ cần giới thiệu đến đây thôi là các bạn thấy rằng nó đáng được tìm hiểu và sử dụng rồi phải không ạ.

![](https://images.viblo.asia/b88c3e38-0af3-4d94-8540-ff2fe3248e79.jpg)


# Higher order function là gì? #
Bình thường như mọi lúc, khi ta định nghĩa một **Function** , ta thường nhận **param** ( tham số đầu vào ) là các **String**, **Number**, **Boolean**, **Array** hoặc **Object** rồi lại **return** ( trả về ) các **String**, **Number**, **Boolean**, **Array** hoặc **Object**.

Đối với **Higher Order Function** (HOF), **param** có thể là **Function**, và lại **return** ra có thể cũng là **Function**.
## Gán Function đến các variable ##
- Chúng ta có thể gán **Function** đến các **variable**.

Ví dụ :

```
// gán constantA bằng functionA
const constantA = function functionA(x){
  console.log('kết quả',x * x);
}

//gọi constantA và xem kết quả
constantA(5);
```

- Chúng ta cũng có thể truyền chúng đến  **variable** khác.

Ví dụ:

```
// gán constantB bằng constantA
const constantB = constantA;

// gọi constantB và xem kết quả
constantB(6)
```
## Truyền các Function như params ##

Mình sẽ viết tiếp 1 **Function** khác là `chao`, để hiển thị một lời chào ra màn hình, tất nhiên hiển thị lời chào không không thì quá đơn giản,để phức tạp hơn một chút thì mình sẽ in hoa lời chào trước khi in.

```
// function có tên inHoa
function inHoa(text) {
    // thực hiện việc in hoa param truyền vào và return kết quả đó
    return text.toUpperCase() + '!'
}
// chạy để xem kết quả nhể 
inHoa('hello')

// function có tên chao và param là function
function chao(func){
   // thực hiện việc gán const greeting bằng return của function là param truyền vào
  const greeting = func('Hi, I am a Javascript programmer')
  // return kết quả greeting
  return greeting;
}

// chạy để xem kết quả nhể 
console.log(chao(inHoa))
```

Tất nhiên trong trường hợp bạn muốn **in thường** hay **in gì đi nữa** thì chỉ cần truyền tên **Function** vào cho `chao`:

```

function inThuong(text) {
    return text.toLowerCase() + '...'
}

chao(inThuong)
```

Các bạn thấy khái niệm và cách viết như vậy hay không ạ,

> Nó cho phép chúng ta thay đổi hành vi và kết quả của một **Function** mà không hề thay đổi lại **code** trong **Function** đó.


- Thêm ví dụ tiếp cho các bạn dễ hiểu nhé :
```
// nhìn tên function là biết ngay nó thực việc nhân 2 số rồi chứ 
const multiplication = function(a,b){
    // nhân 2 param đầu vào với nhau
    return a * b ;
}

// "operation" có nghĩa là "phép toán" trong Toán học 
function applyOperation(a, b, operation) {
  return operation(a, b);
}

// chạy function applyOperation và kiểm tra kết quả
console.log(applyOperation(6, 9, multiplication))

```

Bình thường nếu được giao nhiệm vụ nhân 2 số với nhau, thì tất nhiên mình chỉ cần viết 
hàm `multiplication`, sau đó thực hiện việc truyền **param** vào là có kết quả rồi,

Nhưng ở đây mình sử dụng `multiplication` như **param** cho **Function** `applyOperation`, nếu bây giờ phép toán mình không thực hiện là **nhân** mà là **cộng** thì sao nhỉ ?

Rất đơn giản, ta chỉ cần khai báo thêm **Function** `summation` rồi gọi như ví dụ :
```
// nhìn tên function là biết ngay nó thực việc nhân 2 số rồi chứ 
const summation = function(a,b){
    // cộng 2 param đầu vào với nhau
    return a + b ;
}

// chạy function applyOperation và kiểm tra kết quả
console.log(applyOperation(6, 9, summation))

```

- Giả sử mình có 1 **Array** chứa 3 **Object** ([`person1`,`person2`,`person3`]), mỗi **Object** mô tả 1 người, bao gồm `Donal Trump`, `Kim Jong Un`, và `Sơn Tùng MTP`. Mỗi **Object** có 1 **property** là `country`. 

Việc của ta là viết 1 **Function** để: 
- Tìm trên **Array** trên, ai là người **VietNam**.
- in ra **Object** đó với yêu cầu như trên.

Nếu theo cách viết truyền thống, chúng ta sẽ có cách viết như ví dụ sau:

```
// tạo 1 Array có 3 Object có key là name và country
const listOfPeople = [{name:'Donal Trump',country:'USA'},
 {name:'Kim Jong Un',country:'Korea'}, 
 {name:'Sơn Tùng MTP',country:'VietNam'}
 ];
 
function getPeopleInVietNam(people){
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
    // nếu trong Array listOfPeople có Object chứa country là VietNam thì in ra kết quả
    if (thisPerson.country === "VietNam") {
      console.log(thisPerson);
    }
  }
}

// chạy function getPeopleInVietNam để xem kết quả
getPeopleInVietNam(listOfPeople);
```
Trong ví dụ trên mình chỉ là tìm những ai có `country` là `VietNam`, nhưng mình muốn tìm những người ở `USA` hay ở `Laos` chẳng hạn thì sao, nói chung mình muốn  `country`  **linh hoạt**.

Vậy sẽ thêm 1 **Function** nữa có tên là `getPeopleInCountry`, **Function** này sẽ không chỉ nhận **param** là `people` mà sẽ nhận thêm **param** là `country`.

```
const listOfPeople = [{name:'Donal Trump',country:'USA'},
 {name:'Kim Jong Un',country:'Korea'}, 
 {name:'Sơn Tùng MTP',country:'VietNam'}
 ];

// Thêm param là country
function getPeopleInContry(people,country){
  for (let i = 0; i < people.length; i++) {
    const thisPerson = people[i];
// kiểm tra people có country bằng với param country không
    if (thisPerson.country === country) {

      console.log(thisPerson);
    }
  }
}

// chạy function và kiểm tra kết quả
getPeopleInContry(listOfPeople,'VietNam');
```

Vậy giờ sếp hoặc là dự án muốn thay đổi :
-  Không tìm theo `country` mà lọc theo tuổi, từ `35 đến 40` chẳng hạn.
-  không dùng `console.log` nữa mà dùng `console.error` hay là `alert()` gì đó.

Khi cần thay đổi, ta sẽ làm thế nào với **code** như ví dụ trên nhỉ :
- Ta sẽ phải đọc lại **code**. ( cái này thì chắc chắn rồi ).
- Xem đoạn nào tác động đến đoạn nào, đoạn nào cần thay đổi.
- Vừa điều chỉnh vừa kiểm tra 1 tí, không nó lỗi luôn thì khổ.

Vậy giờ chúng ta cùng áp dụng **Hight Order Function** vào xem thử sao nhé :
```
const listOfPeople = [{name:'Donal Trump',country:'USA'},
 {name:'Kim Jong Un',country:'Korea'}, 
 {name:'Sơn Tùng MTP',country:'VietNam'}
 ];

// function có param là people và action
function getPeopleInContry(people,action){
  for (let i = 0; i < people.length; i++) {
  
  // đây là cái chung ta cần quan tâm
    action(people[i],'VietNam')
  }
}

// đây nữa
function action(people,country){
    if (people.country === country) {
      console.log(people);
    }
}

// chạy function và hiển thị kết quả
getPeopleInContry(listOfPeople,action);
```

Chúng ta có thể thấy **Function** `getPeopleInContry` nhận **param** có **Function** là `action`, để trả về chính **Function** là `action` luôn, **code** lúc này trở lên rõ ràng, dễ dàng **debug** vì nó tách riêng từng phần xử lý với nhau, vậy giờ ta có thể viết lại `action()`thành `filterAge()`, `filterGender()` tùy vào nhu cầu.

## Functions có thể chứa bên trong hàm khác ##
**Function** trong **JavaScript** có thể được **define** ( định nghĩa ) trong 1 **Function** khác,  Chúng còn có thể được gọi như là **nested functions** hay **inner functions**. 

Xem ví dụ:
```
// khởi tạo function inText có param là text
function inText(text){
  // function inHoaText được lồng trong function inText
  // function inHoaText làm nhiệm vụ in hoa ký tự được truyền từ param vào
  function inHoaText(textInHoa){
      return textInHoa.toUpperCase();
  }

  // trả về function inHoaText có param là text
  return inHoaText(text);
}

// gọi function inText và in kết quả từ function inText
console.log(inText('Nguyen Thanh Tam'));
```

Khi ta thực hiện việc gọi **Function** `inText` thì nó sẽ đồng thời **define** một **Function** `inHoaText` mới và gọi **Function** đó.

Hãy thử làm nó phức tạp một tí nhé các bạn, mình muốn kết quả **return** về là **in hoa** hay **in thường** đoạn `text`sẽ phụ thuộc vào **param** truyền vào.

Ví dụ như thế này: 
```
// khởi tạo function inText có param là volume
function inText(volume){
  // function inHoaText được lồng trong function inText
  // function inHoaText làm nhiệm vụ in hoa ký tự được truyền từ param vào
  function inHoaText(text){
      return text.toUpperCase();
  }

  // function inThuongText được lồng trong function inText
  // function inThuongText làm nhiệm vụ in thường ký tự được truyền từ param vào
  function inThuongText(text){
      return text.toLowerCase();
  }

  // nếu volume > 5 thì sẽ trả về function inHoaText
  if (volume>5) return inHoaText;

  // nếu volume < 5 thì sẽ trả về function inThuongText
  if (volume<5) return inThuongText;

}
```

Bạn có thể dùng 2 cách để hiển thị kết quả như dưới này :
- Gọi trực tiếp **Function**.
```
// mình in ra kết quả của function inText với param là 6, thì theo điều kiện 
// chắc chắn nó sẽ return về inHoaText, và thêm param text là Xin Chao Cac Ban
console.log(inText(6)('Xin Chao Cac Ban'));
```
- Gán **Function** cho 1 **Variable** khác.
```
// gán Function inText cho variable dinhDangInHoa
var dinhDangInHoa = inText(7);
// hiển thị kết quả
console.log(dinhDangInHoa('Xin Chao Cac Ban'));
```
Xem thêm ví dụ nữa để biết cách sử dụng nó nhé các bạn:

![](https://images.viblo.asia/415601fc-0ffd-41b5-a242-885f5d627cb9.png)


```
// khởi tạo function totalAB có param là số A
function totalAB(A){
    // function numberB được lồng trong function totalAB
    // function numberB này có param là số B và thực hiện việc cộng 2 số là A và B
    function numberB(B){
      return A + B;
    }
    // return function numberB
    return numberB;
}

// Dùng cách gán Function cho 1 Variable khác.
const getTotal = totalAB(5);
console.log(getTotal(7))

// Gọi trực tiếp function
console.log(totalAB(4)(5));
```

# Kết luận #
**Hight Order Function** quả thực đã đem lại một làn gió mới, giúp ta viết **code** mạch lạcm rõ ràng hơn, việc chỉnh sửa đơn giản hơn so với việc phải ngồi dò lại **code** của **Function** và chỉnh sửa.

Nhưng nó cũng yêu cầu ta phải có tư duy theo kiểu khác so với cách viết **Function** cũ, theo mình thì phải thực hành nhiều và viết nhiều, va vấp nhiều hơn để thuần thục với nó, nhưng cơ bản các bạn hãy cứ thực hiện theo **3** bước :
- Ngẫm thử **Function** mình định viết.
- Chia tách **Function** đó ra nếu cần thiết.
- Viết **Function** dựa theo đúng **pattern** đó khi thấy điều kiện cho phép.
## Nguồn bài viết ##
Mình có tham khảo các nguồn dưới đây:
https://travisnguyen.net/functional/programing/2018/04/22/higher-order-function/
https://kipalog.com/posts/First-class-functions-trong-Javascript-la-gi--Phan-1-
## Cảm ơn ##

Cuối cùng là mình **Xin cảm ơn** khi các bạn đọc đến đây, nếu có gì thắc mắc hoặc góp ý xin bình luận phía dưới.