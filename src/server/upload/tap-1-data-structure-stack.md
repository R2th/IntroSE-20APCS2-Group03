## Giới thiệu
> Stack là một cấu trúc dữ liệu cơ bản và được ứng dụng rộng rãi trong các chương trình máy tính 
### 1. Khái niệm
**Stack (ngăn xếp)** là một cấu trúc dữ liệu hoạt động theo nguyên lý LIFO (vào sau ra trước)

Một ngăn xếp là như một thùng chứa, nó chứa các dữ liệu bên trong thùng chứa đó

Cơ chế của stack là dữ liệu được đưa vào (push) và khi muốn lấy ra thì sẽ lấy dữ liệu từ mới nhất đến cũ nhất (pop) cho tới khi stack trống

![](https://images.viblo.asia/14cf19c6-0898-48f2-8fc9-9ad96c9d09e6.png)

Sau khi đọc khái niệm nếu các bạn còn thấy mơ hồ thì hãy qua phần ví dụ, mình sẽ ví dụ cụ thể hơn về stack
### 2. Ví dụ
Có nhiều bài viết có lấy ví dụ về chồng đĩa (không biết là đĩa DVD thời xưa hay là đĩa đựng thức ăn nữa)

Nhưng để dễ hình dung hơn khi đang đọc bài viết này, mình sẽ lấy một ví dụ đơn giản ngay trên trình duyệt bạn đang online

Khi bạn truy cập vào trình duyệt, search Google và bạn nhấn vào Kết quả tìm kiếm nào đó (ví dụ là link 1), sau đó bạn lại nhấn vào link 2, link 3,... nghĩa là bạn đã đẩy vào stack theo thứ tự link 1 -> link 2 -> link 3 -> ...

Và khi bạn nhấn nút back ở góc trên bên trái thì bạn sẽ được quay lại theo từng link là link 3 -> link 2 -> link 1

### 3. Code Example (Using javascript)
**Interface:** Nhìn tổng quát về các thuộc tính và phương thức của stack
```
class Stack {
    #stack;
    #size;

    constructor() {
        this.#stack = [];
        this.#size = 0;
    }

    get stack() {}
    get size() {}

    // add value vào stack
    push(value) {}

    // remove value ra khỏi stack
    pop() {}

    // lấy value mới nhất nhưng không remove nó
    peek() {}

    // kiểm tra stack có đang trống không?
    isEmpty() {}
}
```
**Push method:** Đưa một giá trị vào stack
```
push(value) {
    this.#stack.push(value);
    this.#size++;
}
```
**Pop method:** Xoá giá trị mới nhất trong stack
```
pop() {
    if (this.#size > 0) {
        this.#stack.pop();
        this.#size--;
        return;
    }
    console.log('Stack is empty');
}
```
**Peek method:** Lấy giá trị mới nhất nhưng vẫn giữ nguyên stack
```
peek() {
    if (this.#size > 0) {
        return this.#stack[this.#size - 1];
    }
    return 'Stack is empty';
}
```
**isEmpty method:** Kiểm tra stack có đang rỗng không?
```
isEmpty() {
    return this.#size === 0;
}
```

**Using:**
```
const stack = new Stack();

stack.push(1);
stack.pop();
stack.push(2);
stack.push(3);

console.log('Stack', stack.stack);
console.log('size', stack.size);
console.log('isEmpty', stack.isEmpty());
console.log('peek', stack.peek());
```

**Toàn bộ source code:**
```
class Stack {
    #stack;
    #size;

    constructor() {
        this.#stack = [];
        this.#size = 0;
    }

    get stack() {
        return this.#stack;
    }

    get size() {
        return this.#size;
    }

    push(value) {
        this.#stack.push(value);
        this.#size++;
    }

    pop() {
        if (this.#size > 0) {
            this.#stack.pop();
            this.#size--;
            return;
        }
        console.log('Stack is empty');
    }

    peek() {
        if (this.#size > 0) {
            return this.#stack[this.#size - 1];
        }
        return 'Stack is empty';
    }

    isEmpty() {
        return this.#size === 0;
    }
}

const stack = new Stack();

stack.push(1);
stack.pop();
stack.push(2);

console.log('Stack', stack.stack);
console.log('size', stack.size);
console.log('isEmpty', stack.isEmpty());
console.log('peek', stack.peek());
```
### 4. Tổng kết
Như vậy ở trên mình đã giải thích đơn giản về ngăn xếp. Trong tập tiếp theo của series [**[Lặn sâu] Cấu trúc dữ liệu**](https://viblo.asia/s/nB5pX8Lb5PG), mình sẽ giới thiệu về Queue, một anh em họ hàng cũng gần với Stack. Cảm ơn các bạn đã đọc

## Kham khảo
* https://vi.wikipedia.org/wiki/Ng%C4%83n_x%E1%BA%BFp