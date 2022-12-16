Chào các bạn, đây là một bài viết trong series [áp dụng các thuật toán sắp xếp trong Javascript](https://viblo.asia/s/ap-dung-cac-thuat-toan-sap-xep-trong-javascript-Am5yqPgw5db). Ở bài viết này, mình sẽ giới thiệu các bạn về thuật toán **Merge Sort** và cách áp dụng thuật toán này trong `Javascript`.

## Các features của ES6 được sử dụng trong bài viết này
1. Arrow Function.
2. Spread Operators.
3. Shift + Splice (methods của Array).
4. Const + Let.

## Cách Merge Sort hoạt động

### Bước 1:
Chúng ta sẽ chia một mảng lớn ra thành thành từng cặp mảng con cho đến khi các mảng con chỉ chứa duy nhất 1 giá trị.

![](https://images.viblo.asia/28bb758c-7957-4c87-9469-cc688ea42dc9.png)

### Bước 2:
Chúng ta sẽ so sánh và sắp xếp các phần tử của các cặp mảng con theo một thứ tự nhất định, đồng thời gộp chúng lại thành một mảng.

![](https://images.viblo.asia/b163d1c9-d752-47b0-ae2f-3feee6bc86c1.png)

### Bước 3:
Chúng ta sẽ lặp lại bước 2 với các cặp mảng còn lại cho đến khi ta chỉ còn lại duy nhất một mảng thì đó chính là mảng gốc đã được sắp xếp thành công.

![](https://images.viblo.asia/a9156ffd-4bb8-4239-bee2-112aebcbb2c6.png)


Dưới đây là sơ đồ tổng quan các bước hoạt động của **Merge Sort**:

![](https://images.viblo.asia/18d2ebe9-4464-4f51-a863-7fd4985460c2.png)


## Áp dụng Merge Sort trong Javascript
Đúng như các bước mình đã miêu tả ở trên, việc đầu tiên chúng ta cần làm đó là chia một mảng cần được sắp xếp thành các mảng con.
```js
const mergeSort = arr => {
    // *** Chúng ta sẽ không chia arr ra thành các mảng con nữa nếu arr chỉ có 1 phần tử
    if(arr.length <= 1) return arr;
    
    // *** vì splice sẽ thay đổi giá trị của arr nên mình copy arr để giữ nguyên giá trị ban đầu của nó
    const right = [...arr];
    
    // *** chia đôi mảng ra thành 2 mảng con
    const middlePoint = arr.length / 2;
    const left = right.splice(0, middlePoint);

    // *** tiếp tục chia các mảng con ra thành các mảng con
    return mergeUnsortedArrs(mergeSort(left), mergeSort(right));
}
```

Tiếp theo, chúng ta sẽ so sánh giá trị của các mảng con, sắp xếp vị trí của chúng theo thứ tự ta muốn và kết hợp chúng lại với nhau. Trong bài này, mình sẽ sắp xếp theo thứ tự từ nhỏ đến lớn (**Asc**).

```js
const mergeUnsortedArrs = (left, right) => {
    // *** các phần tử cần được sắp xếp lại sẽ được chứa ở đây
    const sortedItems = [];
    
    /*
       *** Chúng ta sẽ dùng method shift của Array để loại bỏ các phần tử của 2 mảng left và right
           trong từng vòng lặp. Nên, nếu 1 trong 2 mảng left và right là mảng trống => ta khg thể
           và cũng khg cần phải so sánh thêm nữa,
    */
    while(left.length && right.length) {
        if(left[0] <= right[0]){
            sortedItems.push(left.shift())
        } else {
            sortedItems.push(right.shift())
        }
    }
    
    // *** kết hợp (merge) các cặp mảng con đã được sắp xếp lại với nhau thành một mảng mới,
    return [...sortedItems, ...left, ...right];
}
```

**Test:**
```js
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr)); // *** => [3, 9, 10, 27, 38, 43, 82]
```

## Lời kết

Vậy là mình đã giới thiệu cho các bạn thêm được một thuật toán hay ho nữa rồi :beers::beers::beers:. Qua bài viết lần này, mình mong các bạn sẽ nắm chắc được thuật toán **Merge Sort** và nâng cao khả năng phân tích logic trong lập trình. Nếu thấy hay và bổ ích, các bạn hãy cho mình một `like`, một `sub`... À nhầm, một `follow` các bạn nhé :joy::joy::joy:. Chúc các bạn một ngày vui vẻ và tràn đầy sức khoẻ.