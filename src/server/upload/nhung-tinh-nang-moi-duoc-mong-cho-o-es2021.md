Mỗi năm kể từ năm 2015, JavaScript đã liên tục tung các bản cập nhật với các tính năng thú vị.
Mặc dù việc phát hành ES2021 vẫn còn khá xa, nhưng chúng ta đã có thể dự đoán những gì sẽ xảy ra vì nhiều tính năng đã đến stage 4 (giai đoạn cuối cùng đánh dấu rằng đề xuất được đưa ra đã hoàn thành) và có khả năng sẽ được đưa vào thông số kỹ thuật.

Là một developer, điều quan trọng là phải luôn cập nhật các kỹ thuật mới của ngôn ngữ lập trình và nếu bạn cảm thấy mình bị hụt hẫng bởi số lượng bản cập nhật mà JavaScript đã đưa ra trong những năm qua, bạn có thể đọc cuốn sách này nhé [The Complete Guide to Modern JavaScript](https://github.com/AlbertoMontalesi/The-complete-guide-to-modern-JavaScript), cuốn sách bao gồm mọi thứ, từ những điều cơ bản đến các thông số kỹ thuật mới nhất của ES2020, bao gồm một chút giới thiệu về TypeScript.

Âu kei, bây giờ hãy bắt đầu với tính năng mới đầu tiên của ES2021:

# 1. String.prototype.replaceAll
**String.replace** là một phương thức vô cùng hữu ích, cho phép chúng ta thay thế 1 pattern trong một chuỗi bằng giá trị chúng ta truyền vào. Vấn đề là nếu chúng ta muốn sử dụng *string* làm pattern chứ không phải là RegEx, thì nó chỉ thay thế pattern đầu tiên được tìm thấy.
Coi ví dụ để hiểu nè :
```
const str = 'I like my dog, my dog loves me';
const newStr = str.replace('dog', 'cat');
newStr;
// "I like my cat, my dog loves me"
```

Cái tên nói lên tất cả, **String.replaceAll** sẽ làm chính xác những gì chúng ta cần trong trường hợp này, thay thế tất cả các pattern phù hợp mà không cần sử dụng RegEx:
```
const str = 'I like my dog, my dog loves me';
const newStr = str.replaceAll('dog', 'cat');
newStr;
// "I like my cat, my cat loves me"
```
Hiểu rõ hơn ở đây nhé, [đây!](https://github.com/tc39/proposal-string-replaceall)

# 2. Promise.any

Trong những năm qua, các phương thức mới liên tục được đưa ra, như Promise.all và Promise.race với ES6, Promise.allSettled vào năm ngoái với ES2020 và ES2021 sẽ giới thiệu một phương thức mới: Promise.any

Tôi cá là bạn biết nó làm gì từ tên phương thức.

Promise.any () sẽ resolve nếu bất kỳ promise nào được cung cấp được resolved. Dưới đây ta có 3 promise, resolve vào các thời điểm ngẫu nhiên.

```
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});
```

Trong số p1, p2 và p3, cái nào resolve được trước sẽ được thực hiện bởi Promise.any()
```
(async function() {
  const result = await Promise.any([p1, p2, p3]);
  console.log(result); // Prints "A", "B" or "C"
})();
```

Vậy điều gì sẽ xảy ra nếu không có promise nào được resolve? Trong trường hợp đó, Promise.any() ném một ngoại lệ AggregateError. Chúng ta cần catch và xử lý nó.
```
const p = new Promise((resolve, reject) => reject());

try {
  (async function() {
    const result = await Promise.any([p]);
    console.log(result);
  })();
} catch(error) {
  console.log(error.errors);
}
```
Với mục đích demo, chỉ một promise được chuyển đến Promise.any(). Và promise đó bị reject. Đoạn mã dưới ghi lại lỗi sau trong console.
![](https://images.viblo.asia/d17165ab-3baf-4556-92ab-fd9948f9dc68.png)

Bạn có thể tìm hiểu kĩ hơn ở [đây](https://github.com/tc39/proposal-promise-any) nhé.

# 3. Toán tử logic và biểu thức gán

Với ES2021, chúng ta sẽ có thể kết hợp các Toán tử logic (&&, || và ??) với biểu thức gán (=) tương tự như cách nó đã có thể làm trong Ruby.
Nếu bạn bỏ qua ES2020, bạn có thể không biết ?? là toán tử liên kết vô hiệu (nullish coalescing). Hãy xem một ví dụ:
```
const a = null ?? 'test';
// 'test'
const b = 0 ?? 'test';
// 0
```

Toán tử kết hợp nullish trả về phần tử bên phải khi phía bên trái là null hoặc undefined, nếu không nó trả về phần tử bên trái. Trong ví dụ đầu tiên, phần tử bên trái là null do đó nó trả về phần tử bên phải trong khi ở ví dụ thứ hai, nó trả về phía bên trái vì nó không phải là null hoặc undefined.

Back lại ES2021, với những đề xuất mới, chúng ta có thể thực hiện những việc sau:
```
a ||= b;
// equivalent to a = a || b

c &&= d;
// equivalent to c = c && d

e ??= f;
// equivalent to e = e ?? f
```
Hãy xem qua từng chiếc một nào:
* a || = b sẽ trả về a nếu a là đúng, trả về b nếu a false
* c && = d sẽ trả về d nếu cả c và d đều đúng, ngược lại trả về c
* e ?? = f sẽ trả về f nếu e là null hoặc undefined, nếu không nó sẽ trả về e

Bạn có thể tìm hiểu kĩ hơn ở [đây](https://github.com/tc39/proposal-logical-assignment) nhé!

# 4. Dấu phân cách số
Sự ra đời của Dấu phân cách số sẽ giúp việc đọc các giá trị số dễ dàng hơn bằng cách sử dụng ký tự _ (gạch dưới) để cung cấp sự phân tách giữa các nhóm chữ số.
```
x = 100_000;
// 100 thousand

dollar = 55_90;
// 55 dollar 90 cents

fraction = 0.000_1;
// 1 thousandth
```
Mặc dù không khó, nhưng bạn có thể ơ-mây-zing với những ví dụ khác ở [đây](https://github.com/tc39/proposal-numeric-separator) đó, thề ^^!

# 5. WeakRefs và Finalizers
## 5.1. WeakRefs
WeakRef là viết tắt của Weak References. Mục đích chính của việc sử dụng WeakRef là để triển khai bộ nhớ đệm hoặc ánh xạ tới các đối tượng lớn.

Trong những tình huống như vậy, chúng ta không muốn giữ nhiều bộ nhớ trong một thời gian dài để lưu bộ nhớ cache hoặc ánh xạ hiếm khi được sử dụng này. Chúng ta có thể cho phép bộ nhớ được "thu dọn" sớm và sau này nếu chúng ta cần, chúng ta có thể tạo bộ nhớ cache mới.

**JavaScript is a garbage collected language.** Tức là, nếu một biến không thể truy cập được nữa, JavaScript sẽ tự động xóa nó (bạn có thể tìm hiểu kĩ hơn về việc "thu dọn" này ở đây nhé [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management))

Hãy nhìn đoạn code dưới đây 
```
const callback = () => {
  const aBigObj = {
    name: "Backbencher"
  };
  console.log(aBigObj);
}

(async function(){
  await new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 2000);
  });
})();
```
Đoạn code có thể trông phức tạp. Nhưng về cơ bản, những gì chúng ta làm là tạo một function có tên callback() và thực thi nó bằng setTimeout(). await là một tính năng trong ES6, giúp thực thi các đoạn code không đồng bộ một cách đồng bộ. Khi thực thi đoạn code trên, nó sẽ in ra "Backbencher" sau 2 giây. Dựa trên cách chúng ta sử dụng fucntion callback(), aBigObj có thể được lưu trữ trong bộ nhớ mãi mãi.

Bây giờ, hãy thử làm cho aBigObj trở thành một tham chiếu yếu (WeakRef)
```
const callback = () => {
  const aBigObj = new WeakRef({
    name: "Backbencher"
  });
  console.log(aBigObj.deref().name);
}

(async function(){
  await new Promise((resolve) => {
    setTimeout(() => {
      callback(); // Guaranteed to print "Backbencher"
      resolve();
    }, 2000);
  });

  await new Promise((resolve) => {
    setTimeout(() => {
      callback(); // No Gaurantee that "Backbencher" is printed
      resolve();
    }, 5000);
  });
})();
```
Một WeakRef được tạo bằng new WeakRef(). Sau đó, tham chiếu được đọc bằng phương thức .deref(). Bên trong hàm async, setTimeout() đầu tiên chắc chắn sẽ in ra giá trị của name. Điều đó chắc chắn xảy ra trong lượt đầu tiên của vòng lặp sau khi tạo tham chiếu yếu. 

Nhưng không có gì đảm bảo rằng setTimeout() thứ hai in ra "Backbencher". Nó có thể đã bị thu dọn bởi "người thu gom rác" của Javascript. Vì thành phần "thu rọn rác" hoạt động khác nhau trong các trình duyệt khác nhau, nên không thể đảm bảo đầu ra. Đó cũng là lý do tại sao, ta sử dụng WeakRef trong các tình huống như quản lý bộ nhớ cache.

## 5.2. Finalizers
FinalizationRegistry là một tính năng đồng hành của WeakRef. Nó cho phép các lập trình viên "đăng ký" các callback có thể được gọi lại sau khi một đối tượng được "thu dọn".
```
const registry = new FinalizationRegistry((value) => {
  console.log(value);
});
```

*registry* là 1 *instance* của *FinalizationRegistry*. Callback function được truyền cho *FinalizationRegistry* được kích hoạt khi một đối tượng được thu dọn.
```
(function () {
  const obj = {};
  registry.register(obj, "Backbencher");
})();
```
Dòng 3 đính kèm 1 đối tượng với registry. Khi obj được thu dọn, đối số thứ hai của phương thức ** .register ()** được chuyển cho callback function. Vì vậy, theo đoạn code logic ở trên, khi obj được thu dọn, "*Backbencher*" được chuyển tới callback function và được in trong console log.
Khi thực thi code trên trong Google Chrome Canary console, sau khoảng 1 phút, nó sẽ in "Backbencher" trong console.

# 6. Intl.ListFormat
Intl.ListFormat là một constructor - phương thức khởi tạo cho các đối tượng, cho phép format các list 1 cách linh hoạt theo ngôn ngữ (hiện thì hỗ trợ 47 ngôn ngữ nhé).

Cùng tìm hiểu ví dụ dưới nhé :
```
const list = ['Apple', 'Orange', 'Banana'];

new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);
// Apple, Orange and Banana

new Intl.ListFormat('en-GB', { style: 'short', type: 'disjunction' }).format(list);
// Apple, Orange or Banana
```

Intl.ListFormat là constructor với 2 tham số:
* tham số đầu tiền là locales - tag ngôn ngữ ('en-GB' là tiếng Anh, 'it' là Italia, ...)
* tham số thứ hai là các options: 
    * style: "long" (mặc định, e.g., A, B, and C), "short" hoặc "narrow" (e.g., A, B, C), nếu style là "narrow" thì type phải là "unit"
    * type: "conjunction" (danh sách dựa trên sự kết hợp, là "and" với English giống như "và" trong tiếng Việt vậy), "disjunction" (or/ hoặc,...), "unit" cho danh sách ứng với các đơn vị đo (ví dụ : 5 pounds, 12 ounces)
    
Như mình nói ở trên, nó linh hoạt với các ngôn ngữ khác nhau, không chỉ sử dụng với tiếng Anh, ta có thể dùng với các ngôn ngữ khác nhau:
```
const list = ['Apple', 'Orange', 'Banana'];

// Italian
console.log(new Intl.ListFormat('it', { style: 'long', type: 'conjunction' }).format(list));
// Apple, Orange e Banana

// Spanish
console.log(new Intl.ListFormat('es', { style: 'long', type: 'conjunction' }).format(list));
// Apple, Orange y Banana

// German
console.log(new Intl.ListFormat('de', { style: 'long', type: 'conjunction' }).format(list));
// Apple, Orange und Banana
```

Tìm hiểu thêm ở [đây](https://github.com/tc39/proposal-intl-list-format) nếu bạn muốn đi sâu hơn nhé

# 7. Options dateStyle và timeStyle cho Intl.DateTimeFormat
Chúng ta có thể sử dụng dateStyle và timeStyle để yêu cầu một ngày và giờ cụ thể theo ngôn ngữ và với độ dài nhất định.
```
// short
new Intl.DateTimeFormat("en" , {
  timeStyle: "short"
}).format(Date.now())
// "2:45 PM"

// medium
new Intl.DateTimeFormat("en" , {
  timeStyle: "medium"
}).format(Date.now())
// "2:45:53 PM"

// long
new Intl.DateTimeFormat("en" , {
  timeStyle: "long"
}).format(Date.now())
// "2:46:05 PM GMT+7"
```

Còn với dateStyle:
```
// short
new Intl.DateTimeFormat("en" , {
  dateStyle: "short"
}).format(Date.now())
// "7/25/20"

// medium
new Intl.DateTimeFormat("en" , {
  dateStyle: "medium"
}).format(Date.now())
// "Jul 25, 2020"

// long
new Intl.DateTimeFormat("en" , {
  dateStyle: "long"
}).format(Date.now())
// "July 25, 2020"
```

Bạn có thể sử dụng bất kỳ ngôn ngữ nào bạn muốn và bạn cũng có thể sử dụng cả hai tùy chọn dateStyle và timeStyle cùng một lúc, lựa chọn giữa ba tùy chọn 'short', 'medium' và 'long' 1 cách phù hợp nhất với nhu cầu của bạn.

# 8. Private Methods
Các phương thức private chỉ có thể được truy cập bên trong Class mà nó được định nghĩa. Tên phương thức bắt đầu bằng #.
```
class Person {
  // Private method
  #setType() {
    console.log("I am Private");
  }

  // Public method
  show() {
    this.#setType();
  }
}

const personObj = new Person();
personObj.show(); // "I am Private";
personObj.setType(); // TypeError: personObj.setType is not a function
```
Vì setType () là một private method, nên personObj.setType trả về undefined. Cố gắng sử dụng undefined như một hàm sẽ nhận được TypeError :stuck_out_tongue_winking_eye:


Ơ-mây-zing, gút chóp. Bây giờ thì cũng chờ đợi để sử dụng những điều mới mẻ này thôi. Bạn có thể xem những tính năng mới kể từ ES6 theo bài viết này nhé [In viblo](https://viblo.asia/p/javascript-da-co-nhung-tinh-nang-moi-nao-ma-ban-chua-biet-ke-tu-es6-den-es11-Eb85o4BOK2G)

# References
* [JavaScript đã có những tính năng mới nào mà bạn chưa biết kể từ ES6 đến ES11?](https://viblo.asia/p/javascript-da-co-nhung-tinh-nang-moi-nao-ma-ban-chua-biet-ke-tu-es6-den-es11-Eb85o4BOK2G)
* [ES2021 / ES12 New Features](https://backbencher.dev/javascript/es2021-new-features)
* [Everything new coming in ES2021](https://inspiredwebdev.com/everything-new-in-es2021)
* [mozilla doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
* [ECMAScript proposals](https://github.com/tc39/proposals)