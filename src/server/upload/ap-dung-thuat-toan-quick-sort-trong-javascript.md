Chào các bạn, đây là một bài viết trong series [ áp dụng các thuật toán sắp xếp trong Javascript](https://viblo.asia/s/ap-dung-cac-thuat-toan-sap-xep-trong-javascript-Am5yqPgw5db). Ở bài viết này, mình sẽ giới thiệu các bạn về thuật toán **`Quick Sort`**, một thuật toán mà chỉ cần đọc qua cái tên thôi, chúng cũng có thể thấy được điểm mạnh của nó rồi. Đó chính là **tốc độ** :dash::dash::dash:.

## Các features của ES6 được sử dụng trong bài viết này
1. Arrow Function.
2. Spread Operators.
3. Const + Let.

## Cách hoạt động của Quick Sort
Giả sử chúng ta có một mảng như sau:
```js
[1, 5, 4, 0, 2]
```

### Bước 1:
Bước đầu tiên chúng ta cần làm đó là chọn ra một phần tử bất kỳ trong mảng trên làm một `pivot` (tâm của một trục toạ độ). Trong trường hợp này, mình sẽ chọn phần tử **cuối cùng**, đó là `2` để làm `pivot`.

![](https://images.viblo.asia/92b6c5c9-8f6e-472a-b1d2-629ba50f9438.png)


### Bước 2:
Tiếp theo, ta sẽ cần phải đưa hết các phần tử  nhỏ hơn `pivot` sang bên trái của `pivot` và phần tử lớn hơn `pivot` sang bên phải của `pivot`.

![](https://images.viblo.asia/9a2f0e67-8d42-49db-a573-671f49c86b41.png)

### Bước 3: 
Cuối cùng, chúng ta chỉ cần thực hiện lại 2 bước ở trên với 2 bên trái, phải của `pivot` ở trên là chúng ta đã áp dụng thành công **`Quick Sort`** rồi :raised_hands:.

**Phía trên trái của `pivot`:**

Ta sẽ lấy `0` làm `pivot` và đưa `1` sang bên phải của `0`.

![](https://images.viblo.asia/d927a58f-6f10-4115-8f1c-9a3cfe146fd8.png)


**Phía trên phải của `pivot`:**

Tương tự như trên, ta sẽ lấy `4` làm `pivot` và đưa `5` sang bên phải của `4`.

![](https://images.viblo.asia/b41a44ec-b4af-4d02-9e45-c269131cba1f.png)

**Kết quả cuối cùng:**

![](https://images.viblo.asia/bad99f58-411b-42e5-b91f-c8b56da06511.png)

:sleepy: Khá là dễ hiểu phải không các bạn.

## Áp dụng Quick Sort trong Javascript

Điều quan trọng nhất trong thuật toán **`Quick Sort`** đó là ta phải lấy ra được ra `pivot`.

```js
const quickSort = (arr) => {

    if(arr.length < 2) return arr;
    
    // *** lấy phần tử cuối của 'arr' làm 'pivot'
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
}
```

Tiếp đến, ta cần phân loại những phần tử nhỏ hơn `pivot` sang bên trái của `pivot` và phần tử lớn hơn `pivot` sang bên phải của `pivot` bằng cách loop qua các phần tử còn lại của mảng (sau khi ta đã chọn được `pivot`) và sau đó so sánh giá trị chúng với `pivot`.

```js
const quickSort = (arr) => {

    if(arr.length < 2) return arr;
    
    // *** lấy phần tử cuối của 'arr' làm 'pivot'
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    let currentItem;
    // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
    for(let i = 0; i < pivotIndex; i++) {
        currentItem = arr[i];
        
        if(currentItem < pivot) {
            left.push(currentItem);
        } else {
            right.push(currentItem);
        }
    }
}
```

Cuối cùng, chúng ta chỉ việc kết hợp `left` + `pivot` + `right` và cho vào 1 mảng, sau đó ta lại chạy lại bước 1 và 2 cho `left` và `right` là xong :raised_hands:.


```js
const quickSort = (arr) => {

    if(arr.length < 2) return arr;
    
    // *** lấy phần tử cuối của 'arr' làm 'pivot'
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    let currentItem;
    // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
    for(let i = 0; i < pivotIndex; i++) {
        currentItem = arr[i];
        
        if(currentItem < pivot) {
            left.push(currentItem);
        } else {
            right.push(currentItem);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([100, 2, 5, 4, 7, 5, 6, 8, 0, 12, 34, 15]));
// *** => [0, 2, 4, 5, 5, 6, 7, 8, 12, 15, 34, 100]
```

## Lời kết
Vậy là ta đã hoàn thành việc áp dụng thuật toán **`Quick Sort`** trong Javascript. Mình hy vọng qua bài viết này nói riêng và toàn series toàn trung, các bạn sẽ nắm vứng các thuật toán `sort` hơn, nâng cao khả năng phân tích logic để có thể, đi phỏng vấn, hay áp dụng vào những tình huống đặc thù cần tới những thuật toán như thế này hay đơn giản là đi ... chém gió thiên hạ :joy:.