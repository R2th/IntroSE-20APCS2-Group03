Xin chào bạn!

Trong bài viết trước [Một số câu hỏi phỏng vấn JavaScript hay và khó 1 - Chắc ai đó sẽ cần !](https://viblo.asia/p/mot-so-cau-hoi-phong-van-javascript-hay-va-kho-1-chac-ai-do-se-can-4P856RPB5Y3) , mình đã giới thiệu với bạn một số câu hỏi phỏng vấn JavaScript khá hay (theo ý kiến chủ quan thôi nhé). Không biết bạn đã giải thích được chúng chưa?

Những câu hỏi trắc nghiệm này khi mới nhìn qua thì tưởng đơn giản, nhưng khi bắt tay vào làm thì mới thấy là không hề dễ. Có những phần kiến thức mình nghĩ chắc chắn phải là A, nhưng thực tế nó lại là B. Vì vậy, việc trả lời những câu hỏi trắc nghiệm sẽ giúp bạn củng cố kiến thức và tự tin hơn vào trình độ của mình.

Do đó, bài này mình lại tiếp tục gửi đến bạn 6 câu hỏi phỏng vấn JavaScript hay và khó khác. Mời bạn theo dõi bài viết!

## Câu 1
Cho bạn 4 đoạn code sau:

Đoạn 1:

```js
let person = {
  name : 'Bob', 
  sayName : function() {
    setTimeout(function() {
      console.log(`I'm ${this.name}`);
    }, 1000);
  }
};
person.sayName();
```

Đoạn 2:

```js
let person = {
  name : 'Bob', 
  sayName : () => {
    setTimeout(() => {
      console.log(`I'm ${this.name}`);
    }, 1000);
  }
};
person.sayName();
```

Đoạn 3:

```js
let person = {
  name : 'Bob', 
  sayName : function() {
    setTimeout(() => {
      console.log(`I'm ${this.name}`);
    }, 1000);
  }
};
person.sayName();
```

Đoạn 4:

```js
let person = {
  name : 'Bob', 
  sayName : () => {
    setTimeout(function() {
      console.log(`I'm ${this.name}`);
    }, 1000);
  }
};
person.sayName();
```

Hỏi console in ra kết quả thế nào và tại sao?

## Câu 2

```js
(function(foo) {
  console.log(typeof foo);
})([1, 2, 3]);
```

Hỏi [console](https://completejavascript.com/thu-thuat-su-dung-console-hieu-qua) in ra kết quả như thế nào và tại sao?

## Câu 3

```js
// Cách 1:
function func() {}
 
// Cách 2:
let func = function() {}
```

Hai cách khai báo function trên khác nhau như thế nào? Nêu ví dụ minh họa?

## Câu 4

```js
let cat = function() {
  return 
  {
    say: 'meow'
  }
}
```

Hỏi console in ra kết quả như thế nào và tại sao?

## Câu 5

```js
console.log(Math.max());
```

Hỏi console in ra kết quả như thế nào và tại sao?

## Câu 6

```js
console.log(0 + '0');
console.log(0 - '0');
console.log(0 * '0');
console.log(0 / '0');
```

Hỏi console in ra kết quả như thế nào và tại sao?

## Đáp án và giải thích

Để tránh tình trạng bạn chưa suy nghĩ kĩ mà đã xem lời giải, mình sẽ không để đáp án và giải thích tại đây. 

Thay vào đó, mời bạn xem đáp án và giải thích chi tiết tại [Xoắn não với phỏng vấn JavaScript 2](https://completejavascript.com/xoan-nao-voi-phong-van-javascript-2/).

Xin chào và hẹn gặp lại!

---
Theo dõi [Lam Pham](https://completejavascript.com/gioi-thieu/) trên [Viblo](https://viblo.asia/u/completejavascript) để nhận thông báo khi có bài viết mới nhất:

  * **Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)
  * **Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)