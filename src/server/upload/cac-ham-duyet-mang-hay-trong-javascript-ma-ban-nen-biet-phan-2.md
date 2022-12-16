# Mở đầu
Hiện nay, hầu hết khi code chúng ta đều phải xử lý các mảng dữ liệu. Và sử dụng vòng for để duyệt là cách vô cùng dễ dàng và phổ biến. Tuy nhiên, sử dụng vòng for cũng đem lại nhiều nhược điểm, ví dụ như mỗi lần duyệt, vòng for sẽ khai báo lại giá trị đếm mà ta sử dụng. Trong bài viết này, chúng ta sẽ cùng tiếp tục tìm hiểu các hàm được sử dụng trong javascript để làm việc với mảng một cách ngắn gọn và chuyên nghiệp hơn. 

Link phần 1: https://viblo.asia/p/cac-ham-duyet-mang-hay-trong-javascript-ma-ban-nen-biet-RnB5pWqblPG

# ForEach
forEach là một phương thức có sẵn của javascript array, được sử dụng để duyệt và thao tác với từng phần tử của mảng. Giả sử các bạn có 1 mảng và các bạn muốn in ra giá trị kèm với vị trí của từng phẩn tử trong mảng, forEach sẽ giúp bạn giải quyết rất dễ dàng, cùng xem ví dụ bên dưới nhé!

```
const example = ["dog", "cat", "fish", "chicken"]

example.forEach((item, index) => {
    console.log(item, index)
});

/* Output:
dog 0
cat 1
fish 2
chicken 3 */
```

**Ưu điểm của forEach:**
* Code rõ ràng, gần với ngôn ngữ tự nhiên
* Cú pháp ngắn gọn, dễ thao tác hơn trong đa số trường hợp khi so với for hoặc while

# Find
find là phương thức được sử dụng để tìm giá trị nhất định trong mảng. Find sẽ trả về phần tử đầu tiên thỏa mãn điều kiện trong mảng. Trong trường hợp không có phần tử nào thỏa mãn điều kiện đã cho, find sẽ trả về undefined

**Ví dụ: Ta có 1 mảng [0, 1, 2, 3, 4, 5] và muốn tìm phần tử đầu tiên có giá trị > 2**
```
const example = [0, 1, 2, 3, 4, 5]

example.find((item) => item > 3)

//Output: 4
```

**Ưu điểm của find:**
* Code ngắn gọn, dễ hiểu
* Trả về 1 giá trị duy nhất khi cần

# FindIndex
tương tự với find, findIndex cũng được sử dụng để tìm kiếm phần tử thỏa mãn điều kiện trong mảng. Tuy nhiên, thay vì trả về phần tử đó, findIndex sẽ trả về vị trí của phần tử đầu tiên thỏa mãn trong mảng. Nếu không có phần tử nào thỏa mãn, findIndex sẽ trả về giá trị là -1.

**Ví dụ: Ta có 1 mảng [ 1, 2, 3, 4, 5] và muốn tìm vị trí của phần tử đầu tiên có giá trị > 2**
```
const example = [1, 2, 3, 4, 5]

example.findIndex((item) => item > 3)

//Output: 3
```

**Ưu điểm của findIndex:**
* Code ngắn gọn, dễ hiểu
* Trả về 1 giá trị duy nhất khi cần

# Slice
Slice giúp chúng ta cắt đi một phần của mảng, tức là lấy đi một phần nào đó của mảng và sau đó thực hiện một số thao tác trên những gì chúng ta đã cắt bỏ hoặc những gì còn lại của mảng ban đầu. Slice rất hữu dụng khi chúng ta lấy ra 1 cụm phần tử trong mảng. Với đầu vào gồm 2 giá trị là start và end, với start là vị trí bạn muốn bắt đầu cắt và end là giá trị kết thúc.

**Ví dụ:  Ta có 1 mảng [0, 1, 2, 3, 4, 5] và muốn lấy ra mảng [2, 3]**
```
const example = [0, 1, 2, 3, 4, 5]

const result = example.slice(2, 4);

console.log(result);

//Output: [2, 3]
```

**Ưu điểm của slice:**
* Cú pháp ngắn gọn, dễ hiểu
* Dễ dàng thao tác để trích xuất mảng

# Splice
Splice giúp chúng ta xóa đi phần tử trong mảng và modify trực tiếp vào mảng đó.

**Ví dụ:  Ta có 1 mảng [0, 1, 2, 3, 4, 5] và xóa phần tử 2 có vị trí là 2**
```
const example = [0, 1, 2, 3, 4, 5]

example.splice(2, 1);

console.log(example);

//Output: [0, 1, 4, 5]
```

**Ưu điểm của splice:**
* Cú pháp ngắn gọn, dễ hiểu
* Dễ dàng thao tác khi muốn xóa phần tử khỏi mảng

# Join
Phương thức join được sử dụng để nối nội dung của một mảng thành một chuỗi.

**Ví dụ: Ta có một mảng ["dog", "cat", "fish", "chicken"] và muốn in ra chuỗi gồm các phần tử của mảng, ngăn cách bằng dấu '-'**
```
const example = ["dog", "cat", "fish", "chicken"];

console.log(example.join('-'))

//Output: dog-cat-fish-chicken
```

**Ưu điểm của join:**
* Code ngắn gọn, dễ hiểu, dễ đọc

# Lời kết
Qua bài viết này, mình đã giới thiệu đến các bạn một số hàm hay trong javascript được sử dụng để thao tác với dữ liệu của mảng. Mong bài viêt sẽ giúp các bạn code nhanh và hiệu quả hơn với javascript.