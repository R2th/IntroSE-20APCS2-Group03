## Mở đầu
Khi làm việc với javascript chắc hẳn bạn không xa lạ với `this`. Và bạn phải hiểu được context mà đoạn code bạn đang chạy để biết `this` đang là cái gì. Tùy vào cách gọi function mà `this` sẽ khác nhau.

Sẽ có lúc bạn sẽ không hiểu vì sao `this` bạn lại không đúng (undefined, null, ...). Trong bài viết này mình sẽ nói về cách giải quyết khi gặp nó.

### 'This' bị mất/thay đổi khi nào

Đối với javascript thì `this` rất dễ bị mất hoặc thay đổi. Chẳng hạn trong ví dụ dưới đây. 
Khi tách method ra khỏi object và gọi một cách riêng lẻ thì this sẽ bị thay đổi.

```
let user = {
  firstName: 'Herry',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

Chúng ta có thể thấy, kết quả không hiện ra "Herry"  ở dòng `this.firstName` mà nó `undefined`.
Bởi vì hàm `setTimeout` tách function user.sayHi ra khỏi object user và gọi nên context ở đây không còn là user nữa mà nó đã thành window. 
Chúng ta có thể hiểu là:

```
const f = user.sayHi;
setTimeout(f, 1000); // Mất user context
```

Vậy làm thể nào để `this` ở setTimeout đúng. Sau đây là các cách có thể giúp giải quyết được vấn đề này.

### Cách 1:  Dùng 1 function khác để gọi lại

Cách đơn giản nhất là dùng 1 function khác và gọi lại function `sayHi`
```
let user = {
  firstName: 'Herry',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, Herry!
}, 1000);
```

Nó đã hoạt động bởi vì hàm `sayHi` được gọi từ object `user` như cách gọi thông thường.

Hoặc ngắn ngọn hơn bạn có thể dùng arrow function ở trường hợp này.

`setTimeout(() => user.sayHi(), 1000); // Hello, Herry!`

2 đoạn code trên vẫn hoạt động tốt. Nhưng sẽ có rủi ro ở đây.

Trong trường hợp trước khi setTimeout được kích hoạt (ở đây là < 1 giây), nếu user bị thay đổi giá trị thì sao? Thì tất nhiên khi setTimeout được kích hoạt nó sẽ gọi sai object
```
let user = {
  firstName: 'Herry',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...user bị thay đổi trước khi setTimeout chạy callback
user = { sayHi() { console.log('Another user in setTimeout!'); } };

// Another user in setTimeout?!?
```

Kết quả in ra cũng bị thay đổi, và điều này chúng ta không mong muốn.
Chúng ta hãy đến cách thứ 2 để giải quyết vấn đề này.

### Cách 2: Dùng bind

`bind` là method được cung cấp nhằm thay đổi context khi gọi function.
Ví dụ:
```
let boundFunc = func.bind(context);
```

Kết quả `func.bind(context)` là một function giống với `func` nhưng có this=context.
Ví dụ:
```
let user = {
  firstName: 'Herry'
};

function func() {
  console.log(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // Herry
```
Ở đây `func.bind(user)` với this=user.

Đây là ví dụ truyền tham số vào 1 function đã được bind:
```
let user = {
  firstName: 'Herry'
};

function func(phrase) {
  console.log(phrase + ', ' + this.firstName);
}

// bind this thành user
let funcUser = func.bind(user);

funcUser('Hello'); // Hello, Herry (tham số 'Hello' đã được truyền như bình thường và this=user)
```

Đây là ví dụ khi dùng với object method:
```
let user = {
  firstName: 'Herry',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

sayHi(); // Hello, Herry!

setTimeout(sayHi, 1000); // Hello, Herry!
```

Ở dòng (\*) chúng ta bind user cho user.sayHi và khi setTimeout kích hoạt nó sẽ gọi đúng với this=user, kết quả in ra đúng như mong đợi

Khi truyền tham số:
```
let user = {
  firstName: 'Herry',
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say('Hello'); // Hello, Herry
say('Bye'); // Bye, Herry
```

Và khi user được thay đổi
```
let user = {
  firstName: 'Herry',
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi.bind(user), 1000);

// ...trước khi setTimeout chạy callback
user = { sayHi() { console.log('Another user in setTimeout!'); } };
// Hello, Herry!
```
Thì kết quả in ra vẫn đúng khi mà object user bị thay đổi.

**Lưu ý:** `bind` không làm thay đổi được `this` của 1 arrow function. Nên các bạn nãy lưu ý điều này.

### Tổng kết

Vậy là mình đã giới thiệu về cách xử lý trong trường hợp this bị thay đổi. Hy vọng bài viết này giúp ích được cho các bạn :)