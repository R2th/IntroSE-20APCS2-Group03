Stack và Queue là hai trong số dạng mà ta có thể bắt gặp ở bất kì cuốn sách nhập môn cấu trúc dữ liệu cơ bản (data structure) . Do cấu trúc của Stack và Queue giống nhau nên thường được đi cùng với nhau, và từ đó cũng có gây nhầm lẫn. Hôm nay mình sẽ hướng dẫn xây dựng một Stack và Queue cơ bản sử dụng JavaScript

![](https://images.viblo.asia/494c4935-fc7f-4032-a5f7-b7142d85b96c.png)
# Stack
### Tổng quan
Stack là một danh sách có thứ tự mà phép chèn và xóa được thực hiện tại đầu cuối của danh sách và người ta gọi đầu cuối này là đỉnh (top) của stack ( cơ chế last-in-first-out hay LIFO)
![](https://images.viblo.asia/af2dfff8-b9ad-4312-89ac-31a8fb28e637.png)

Bạn có thể coi Stack như là một giá sách. Để lấy cuốn sách thứ nhất thì phải lấy dần dần từ quyển thứ 5 và lần lượt đến hết quyển thứ 2
### Lợi ích
Việc thêm và xoá item trong stack cực kì nhanh, cả hai tác vụ có thời gian thực hiện bằng nhau.

### Các phương thức
Sẽ 4 phương thức chính:
* pop(): Lấy ra item đỉnh stack
* push(item): Thêm item vào đỉnh stack
* peek(): Trả về giá trị đầu tiên của đỉnh stack
* isEmpty(): Trả về là true nếu stack rỗng

### Xây dựng 
```javascript
class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    return this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.length - 1];
  }

  get length() {
    return this.stack.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}

```
Ngoài ra chúng ta có thể xây dựng bằng closure:
```javascript
function Stack() {
  const stack = [];

  return {
    push(item) {
    return stack.push(item);
    },

    pop() {
        return stack.pop();
    },

    peek() {
        return stack[this.length - 1];
    },

    get length() {
        return stack.length;
    },

    isEmpty() {
    return this.length === 0;
    }
  }
}

```
### Ứng dụng 
* Đệ quy: Được sử dụng trong các ứng dụng tìm kiếm, N-queen, v.v
{@embed: https://www.youtube.com/watch?v=kX5frmc6B7c}

* Đảo ngược chuỗi

# Queue
### Tổng quan
Queue gần giống stack ở cấu trúc và các phương thức, điểm khác nhau chính là cách thức hoạt động.  Queue tuân theo phương pháp First-In-First-Out, tức là dữ liệu được nhập vào đầu tiên sẽ được truy cập đầu tiên. Bạn có thể liên tưởng Queue như một hàng người đứng xem phim vậy.
![](https://images.viblo.asia/d2546dc6-e210-4dfe-9d81-d2f367162d19.png)
### Ứng dụng
* Heap Sort
* Lịch trình cho CPU, phần cứng
### Các phương thức
* enqueue(item) : Lấy phần từ đầu tiên của queue
* dequeue(): Thêm phần tử vào đỉnh queue
* peek(): Lấy giá trị phần tử đầu tiên của queue
* isEmpty(): Trả về là true nếu queue rỗng
### Xây dựng
```javascript
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    return this.queue.unshift(item);
  }

  dequeue() {
    return this.queue.pop();
  }

  peek() {
    return this.queue[this.length - 1];
  }

  get length() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

```
# Tham khảo
[https://en.wikipedia.org/wiki/Stack_(abstract_data_type)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))

[https://en.wikipedia.org/wiki/Queue_(abstract_data_type)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))

[https://dev.to/rinsama77/data-structure-stack-and-queue-4ecd](https://dev.to/rinsama77/data-structure-stack-and-queue-4ecd)