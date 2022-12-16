![](https://images.viblo.asia/f96280fc-0f9a-4f8f-a445-9348b6775731.png)

Xin chào mọi người! Như ở bài viết trước mình có đề cập đến phương thức `...` trong ES6. Các bạn quan tâm thì có thể xem bài viết tại [đây](https://viblo.asia/p/es6-spread-operator-va-mot-so-vi-du-khi-lam-viec-voi-array-aWj534DQK6m).

Vậy ngoài cách dùng `...` thì còn những cách nào để clone 1 Object trong Javascript? Ưu nhược điểm của các phương thức này như thế nào? Dùng như thế nào là thích hợp cho từng trường hợp? Bài viết này mình xin phân tích cụ thể và chi tiết nhất trong khả năng hiểu biết của mình! :bow: 

## Tổng quan
Object trong Javascript là những giá trị tham chiếu, vì vậy để đảm bảo tính bất biến (immutable) khi thao tác với Object, ta không thể dùng phương thức gán trực tiếp thông qua biểu thức `=`. Thay vào đó, thông thường sẽ có 3 cách sau:

```javascript
const face = { smile: '🙂', love: '😘' }

// Spread
{ ...face }

// "Object.assign"
Object.assign({}, face)

// JSON
JSON.parse(JSON.stringify(face))

// Kết quả
// { smile: '🙂', love: '😘' }
```

Như ta thấy, 3 phương thức ở trên đều cho ra một kết quả như nhau. Vậy giữa chúng có sự khác nhau như thế nào. Chúng ta sẽ xem xét từng phương thức một nhé.

## Spread operator

Trước tiên, ta xem qua 1 ví dụ đơn giản:

```javascript
const face = { smile: '🙂', love: '😘' }

const cloneFace = { ...face }

cloneFace.smile = ('😗');

console.log(cloneFace);
//Kết quả: { smile: '😗', love: '😘' }

console.log(face);
//Kết quả: { smile: '🙂', love: '😘' }
```

Ví dụ ở trên rất dễ hiểu và cho kết quả như mong muốn đúng không nào! Tuy nhiên, đó mới chỉ là **shallow copy** object trong Javascript. Khi sử dụng `...` để clone một object,  phương thức này chỉ thực hiện **shallow copy** (ngược lại với **deep copy**).  Vậy thế nào là **shallow copy**, thế nào là **deep copy**. Để giải thích bằng ngôn từ về 2 khái niệm này thì chắc nói một hồi vẫn thấy khó hiểu (lúc mình mới tìm hiểu mình cũng thế :D). Vậy nên, hãy xem ví dụ bên dưới cho dễ hiểu trước đã:

Ví dụ: 
```javascript
const nestedObject = {
  face:
  {
    smile: '🙂'
  }
};

const shallowClone = { ...nestedObject };

shallowClone.face.smile = '😗';

console.log(shallowClone);
// Kết quả: {face: { smile: '😗'}
console.log(nestedObject);
// Kết quả: {face: { smile: '😗'}
```

Ở trên mình có 1 object lồng nhau, tức là object trong object. Như kết quả ở ví dụ trên, khi sử dụng cú pháp spread operator thì với object lồng cấp nhau từ 2 cấp trở lên, việc bảo đảm tính immutable cho object ban đầu là không thể. 

Như vậy, để thấy rằng spread chỉ có tác dụng với object 1 cấp, và khi thực hiện clone object thì nó chỉ bảo đảm tính immutable cho dữ liệu ở cấp đầu tiên mà thôi, đó gọi là **shallow copy**. Ngược lại với **shallow copy** là **deep copy**, tức là một object có lồng bao nhiêu cấp thì khi clone object, object đó luôn phải bảo đảm tính immutable cho toàn bộ object ban đầu (bao gồm tất cả các cấp con của nó).

***Có 1 lưu ý nữa là khi sử dụng cú pháp spread, bạn cần phải có Babel để biên dịch để browsers có thể hiểu được.***

Hãy xem xét các phương thức clone object khác xem nó có thực hiện deep copy được hay không?

##  Object.assign

Ta cùng xem qua 2 ví dụ dưới đây, một là shallow copy và một là deep copy:

Với shallow copy:

```javascript
const face = { smile: '🙂', love: '😘' }

const cloneFace = Object.assign({}, face, {smile: '😗'});

console.log(cloneFace);
//Kết quả: { smile: '😗', love: '😘' }

console.log(face);
//Kết quả: { smile: '🙂', love: '😘' }
```

Với deep copy:

```javascript
const nestedObject = {
  face:
  {
    smile: '🙂'
  }
};

const shallowClone = Object.assign({}, nestedObject);

shallowClone.face.smile = '😗';

console.log(shallowClone);
// Kết quả: {face: { smile: '😗'}
console.log(nestedObject);
// Kết quả: {face: { smile: '😗'}
```

Như kết quả ở trên, rõ ràng phương thức `Object.assign` cũng không khác gì cú pháp `...`, khi mà nó chỉ có tác dụng với shallow copy. Không những thế, cú pháp của `Object.assign` còn lằng nhằng và khó hiểu hơn cả spread nữa. Cho nên nếu chỉ là shallow copy thì mình vẫn khuyên các bạn dùng cú pháp `...` cho khoẻ :D

## JSON

Tương tự 2 cách ở trên, ta cũng thử xem qua 2 ví dụ với `JSON` xem sao nhé!

Với shallow copy:

```javascript
const face = { smile: '🙂', love: '😘' }

const cloneFace = JSON.parse(JSON.stringify(face));

cloneFace.smile = ('😗');

console.log(cloneFace);
//Kết quả: { smile: '😗', love: '😘' }

console.log(face);
//Kết quả: { smile: '🙂', love: '😘' }
```

Deep copy:

```javascript
const nestedObject = {
  face:
  {
    smile: '🙂'
  }
};

const shallowClone = JSON.parse(JSON.stringify(nestedObject));

shallowClone.face.smile = '😗';

console.log(shallowClone);
// Kết quả: {face: { smile: '😗'}
console.log(nestedObject);
// Kết quả: {face: { smile: '🙂'}
```

Ồ, kết quả thật tuyệt vời! Đúng như mong muốn, `JSON` đã thực hiện được deep copy, chúng ta đã có thể thoải mái sử dụng clone object mà không ngại việc ảnh hưởng đến object gốc. 😗

Nhưng... hãy khoan! **Không hẳn JSON luôn tối ưu và tốt trong mọi trường hợp, nhất là về hiệu suất**. Trong 3 cách trên, nếu chỉ là shallow copy, `Object.assign` cho thấy hiệu suất tuyệt vời nhất, nhanh hơn rất nhiều so với `JSON`. Các bạn có thể xem hình bên dưới (cao hơn là hiệu suất tốt hơn), hoặc kiểm chứng cụ thể ở [đây](https://jsperf.com/3-ways-to-clone-object/1). 

![](https://images.viblo.asia/9963d6c2-242b-48e6-a078-ff78ca71e2e1.png)

Ở đây ta có thể nhận ra rằng, `JSON` là tốt nhất về phương pháp nhưng `Object.assign` lại tốt hơn hẳn về hiệu suất. Dân gian có câu "**Không cần thiết phải lấy dao mổ trâu đi giết gà**", mình thấy nó cũng khá thú vị như cách mình clone object vậy. Nếu chỉ là shallow clone, chỉ cần `Object.assign` là đủ :D

Trên đây là 1 bài viết nhỏ chia sẻ một số kiến thức mà mình biết, hy vọng nó sẽ giúp ích cho các bạn trong công việc cũng như trong công cuộc chinh phạt thứ ngôn ngữ khó nhằn Javascript. Xin cảm ơn và hẹn gặp lại!

Tham khảo:

[freecodecamp.org](https://www.freecodecamp.org/news/copying-stuff-in-javascript-how-to-differentiate-between-deep-and-shallow-copies-b6d8c1ef09cd/)

[samanthaming.com](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects)