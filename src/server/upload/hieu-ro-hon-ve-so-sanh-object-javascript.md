Gần như mọi thứ trong JavaScript là object.

Nếu bạn đã làm việc với JavaScript một thời gian thì hẳn bạn cũng biết điều này. Tuy nhiên objects trong JS có chút khác biệt với Java, C++ hoặc các ngôn ngữ bậc cao khác.

Object trong JavaScript đơn giản là 1 hashmap của các cặp key-value với key luông là string và value có thể là bất cứ định dạng nào bao gồm string, integers, booleans, functions hoặc thậm chí là một object khác.
Khi làm việc với JS thì không thể nào mà không đụng chạm tới các object được và sẽ có lúc bạn phải so sánh chúng với nhau.

Khi muốn kiểm tra sự bằng nhau thì bạn sẽ dùng toán tử so sánh `==`  hay `===`. Tuy nhiên nhiều lúc so sánh các object lúc ra `true` lúc ra `false` và bạn chả hiểu sao :-?

Bạn có nghĩ rằng nếu 2 object có cùng các thuộc tính và giá trị của nó bằng nhau thì chúng sẽ bằng nhau. Hãy xem ví dụ dưới đây.

```js
var obj1 = { 
    name: "Sankalp",     
    job: "JavaScript Developer" 
};  
var obj2 = {
    name: "Sankalp",     
    job: "JavaScript Developer"
};
// Output: false
console.log(obj1 === obj2);

Thuộc tính của obj1 và obj2 có giá trị giống nhau, tuy nhiên các object này vẫn ko được tính là bằng nhau.
Có lẽ vì chúng ta đang dùng deep equal (===) ?? Nếu dùng == thôi thì sao nhỉ?

// Output: false
console.log(obj1 == obj2);
```

Nguyên nhân của vấn đề này là do bản chất của Javascript có 2 cách khác nhau để so sánh bằng.

Chuối (string) hoặc số (number) khi so sánh thì sẽ so sánh với giá trị của chúng, trong khi các đối tượng khác như mảng (array), ngày tháng (date) và object thuần sẽ được so sánh qua tham chiếu.
Việc so sánh bằng tham chiếu về cơ bản sẽ kiểm tra xem các đối tượng có được tham chiếu đến cùng một vị trí trong bộ nhớ hay không.

```javascript
var obj1 = { 
    name: "Sankalp",     
    job: "JavaScript Developer" 
};
var obj2 = {
    name: "Sankalp",     
    job: "JavaScript Developer"
};
var obj3 = obj1;
// Output: false
console.log(obj2 === obj1);
// Output: true
console.log(obj3 === obj1);
```

Lý do mà `obj3 === obj1` vì obj3 và obj1 cùng tham chiếu đến một ví trí trong bộ nhớ. Thế nên cách so sánh trên có thể dùng để kiểm tra xem 2 objects có cùng chung vị trí trong bộ nhớ hay không.

Nhưng nếu bạn đọc đến đây rồi thì chắc cũng tự hỏi rằng làm thế nào để có thể so sánh đúng 2 object vì kể cả props của chúng bằng nhau thì dùng `==` hoặc `===` vẫn ra false? Nếu đúng như vậy, thì bạn sẽ cần phải làm nhiều việc hơn một chút và kiểm tra sự bằng nhau này bằng cách kiểm tra xem hai object này có phải là “cùng một giá trị” hay không.

Cách cơ bản nhất có thể dùng hàm sau:
```javascript
function isEqual(objA, objB) {
// Tạo các mảng chứa tên các property
var aProps = Object.getOwnPropertyNames(objA);
var bProps = Object.getOwnPropertyNames(objB);
// Nếu độ dài của mảng không bằng nhau,
// thì 2 objects đó không bằnh nhau.
if (aProps.length != bProps.length) {
    return false;
}

for (var i = 0; i < aProps.length; i++) {
     var propName = aProps[i];          
      // Nếu giá trị của cùng một property mà không bằng nhau,
      // thì 2 objects không bằng nhau.
     if (objA[propName] !== objB[propName]) {             
         return false;         
     }     
}
// Nếu code chạy đến đây,
// tức là 2 objects được tính lằ bằng nhau.
return true; 
}  
// Output: true
console.log(isEqual(obj1, obj2));
```

Để check các object có "giá trị bằng nhau", ta sẽ đi qua toàn bộ các property trong object đó là so sánh xem giá trị có bằng nhau không.
Tuy nhiên trong khi hàm so sánh phía trên chạy tốt cho ví dụ của chúng ta, thì nó có cả hàng tỉ trường hợp khác mà nó chưa bao quát. Ví dụ như:

Điều gì sẽ xảy ra nếu một trong các giá trị thuộc tính là một object?
Điều gì xảy ra nếu một trong các giá trị thuộc tính là NaN (Giá trị duy nhất trong JavaScript không bằng với chính nó. Chỉ cần thử NaN === NaN trong browser console của bạn : P)
Điều gì sẽ xảy ra nếu objA có thuộc tính có giá trị `undefined`, trong khi objB không có thuộc tính này (nên cũng được coi là `undefined`)
Để giải quyết việc này thì thay vì tự viết hàm để check hết các trường hợp thì ta có thể sử dụng các thư viện như Underscore và Lo-Dash, những thư viện này có các hàm xử lý deep equal rất tốt đó là `_.isEqual`.

*Fun tips: Facebook khi tuyển dụng React Developer sẽ lại không hỏi nhiều về kiến thức React của bạn, thay vào đó họ sẽ hỏi hiểu biết của bạn về Javascript, và để thể hiện được hiểu biết của bạn thì viết lại được những hàm trong Lodash sẽ là một minh chứng rõ ràng nhất  (Dan Abramov said)