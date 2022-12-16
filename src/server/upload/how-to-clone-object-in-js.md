### 1. Mở đầu
Như các bạn có thể thấy, nhiều khi chúng ta muốn clone giá trị object bằng cách gắn nó vào một biến khác.

```
const obj_1 = {
    username: "chamdev.com"
};

const obj_2 = obj_1;

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", age: 10}
```

Nhưng các bạn không thể clone như vậy được @@, vì Object là loại reference types. Khi các bạn làm như trên nghĩa là các bạn đang lấy giá trị và lấy cả địa chỉ ô nhớ của nó trên memory rồi.

Và như vậy thì để giải quyết cho bài toàn clone này, chúng ta sẽ phải dùng đến một số cách để clone.

### 2. Chi tiết
Chúng ta sẽ có 4 cách chính để clone một Object đó là: Spread, Object.assign(), JSON methods, Library 3nd. Cụ thể như thế nào sẽ được mình viết ở dưới nhé.

Nhưng 4 cách trên được chia làm 2 nhóm chính đó là Deep clone và Shallow copy. Chủ yếu là chúng ta sẽ dùng Shallow copy trong thực tế thôi nhé các bạn.

### Using Spread (Shallow copy)
Đây là một tính năng rất mạnh mẽ trong ES6 (Một version của JS release vào năm 2015). Đây là một cách clone Object rất hay và được đông đảo lập trình viên sử dụng.

```
const obj_1 = {
    username: "chamdev.com",
    getUsername() {
        return this.username;
    }
};

const obj_2 = {...obj_1};

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", getUsername: ƒ}
```

Nhưng chúng ta hãy thử thêm một ví dụ nữa nào ^^. Ở đây bạn sẽ thấy rõ hạn chế của Spread khi clone Object nhé.

```
const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    }
};

const obj_2 = {...obj_1 };

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "Not found"}}
```

Ok, các bạn đã thấy gì chưa @@, nó không thể deep clone được. Thật là bất ngờ – tưởng tính năng mới như thế nào. HAHA. Không biết là sau này nó có update gì không, chứ hiện tại khi mình viết bài này là nó vậy nhé.

### Using Object.assign() (Shallow copy)
Đầu tiên mình muốn nói là đây có lẽ là cách các thư viện và các framework hay dùng nhất. Chúng ta hãy cùng xem một cái ví dụ nào ^^.

```
const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    },
    getUsername() {
        return this.username;
    }
};

const obj_2 = Object.assign({}, obj_1);

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}, getUsername: ƒ}
```

Như vậy, chúng ta vẫn clone được Object bình thường. Ok giống cách bên trên, nhưng hãy thử xem nó có deeping clone được không nhé.

```
const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    },
    getUsername() {
        return this.username;
    }
};

const obj_2 = Object.assign({}, obj_1);

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "Not found"}, getUsername: ƒ}
```

Câu trả lời là không @@, thế các bạn muốn deep clone thì làm như thế nào nhỉ? How??? Xem tiếp sẽ rõ nhé. 😀

### Using JSON methods (Deep clone – nửa vời)
Ở đây chúng ta sẽ dùng 2 methods đó chính là parse() và stringify() nhé các bạn. Mình xin phép nói qua một chút parse() là khi mà các bạn muốn biến một String có fomat là json trành Object. Còn stringify() là khi mà chúng ta muốn chuyển một Object sang dạng JSON string nhé.

Ở đây các bạn hãy hiểu đơn giản là đầu tiên nó biến cái Object của chúng ta thành JSON rồi sau đó chính thằng parse biến đổi lại thành Object.

Hãy cùng quan sát ví dụ ở dưới nào ^^:

```
const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    },
    getUsername() {
        return this.username;
    }
};

const obj_2 = JSON.parse(JSON.stringify(obj_1));

obj_1.age = 10;

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}}
```

Như vây, các bạn có thể thấy nó vẫn clone rất tốt. Nhưng có một cái không ổn lắm là nó đang không clone method cho chúng ta . WTH. bây giờ phải làm sao. Nhưng trước khi mình trả lời ta hãy cùng xem nó có deeping clone được hay không đã nhé.

```
const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    }
};

const obj_2 = JSON.parse(JSON.stringify(obj_1));

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}}
```

Đó, đây chính là câu trả lời cho hai thằng trên nhé các bạn. Cách này đã fix được khi mà chúng ta deep clone nhưng làm sao clone method bây giờ nhỉ.??? Câu trả lời là dùng thư viện như là lodash, nó có những phương thức clone cho chúng ta rồi dùng rồi đó. Ưu điểm là đỡ phải viết nhiều code, đỡ phải nghĩ nhiều nhưng nhược điểm là làm chúng ta ăn sẵn quá.

### Library 3nd (Deep clone) – Lodash
Deep clone và Shallow copy lần lượt là ví dụ bên dưới nhé.

```
const _ = require("lodash");

const obj_1 = {
    username: "chamdev.com",
    info: {
        address: "https://chamdev.com"
    },
    getUsername() {
        return this.username;
    }
};

const obj_2 = _.cloneDeep(obj_1);
const obj_3 = _.clone(obj_1);

obj_1.age = 10;
obj_1.info.address = "Not found";

console.log("obj_2", obj_2); // {username: "chamdev.com", info: {address: "https://chamdev.com"}, getUsername: ƒ}
console.log("obj_3", obj_3); // {username: "chamdev.com", info: {address: "Not found"}, getUsername: ƒ}
```

### 3. Kết luận
Như vậy, các bạn đã thấy một việc nhỏ clone một Object tưởng là nó dễ hóa ra cũng nhiều cách làm – nhiều kĩ thuật ra phết. ^^

Bonus là mình đã rất nhiều lần khốn khổ với cái clone Object này rồi, code nó chạy méo theo theo ý mình, debbug mãi mới ra. @@. Nhũng lúc đó là những lúc mà mình muốn bỏ về quê để nuôi cá với trồng rau đó các bạn. ^^

Đó là 4 cách hay dùng thôi nhé, các bạn còn có cách nào mới hoặc hay hơn nữa thì đừng ngần ngại mà comment xuống bên dưới nhé.

3s quảng cáo. Mình mới viết blogs từ đầu tháng 3, nên còn nhiều thiếu xót mong các bạn bỏ quá cho nhé https://chamdev.com/how-to-clone-object-in-js/ .

### 4. Tham khảo
[3 Ways to Clone Objects in JavaScript](https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/)

[How to deep clone a JavaScript object](https://flaviocopes.com/how-to-clone-javascript-object/)