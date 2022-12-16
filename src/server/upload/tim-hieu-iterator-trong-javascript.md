Bài viết này tôi sẽ chia sẻ về iterator  trong es6.

Trước khi tìm hiểu về iterator, chúng ta sẽ bắt đầu với cách để lặp qua 1 collection trong javascript.

Sử dụng `for` loop khi lặp qua array.
```
const arr = [1,2,3,4,5]
for (let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i])
}
```

Tuy nhiên với cách làm như trên, khi số lượng item trong collection lớn, việc lặp trở nên không hiệu quả.
Thay vào đó, ta thường chia dữ liệu thành nhiều phần nhỏ (chunk) và xử lý từng phần nhỏ tại mỗi thời điểm.

#### Iterator
Chúng ta có thể sử dụng es6 để lặp
```
for (const item of arr) {
    console.log(item)
}
```
Sử dụng `for/of` cho phép lặp qua các value của 1 *iterable*.

Nếu như sử dụng cách lặp thông thường, ta cần phải biết được toàn bộ các items của 1 collection, 
sử dụng iterator ta chỉ cần biết giá trị hiện tại.

```
const createEvenIterator = () => {
   let currentValue = 0

    return {
        next: () => {
             currentValue +=2
        
            return {
                value: currentValue,
                done: false
            }
        }
    }
}

const evenIterable = {
    [Symbol.iterator]: createEvenIterator
}

for (const even of evenIterable) {
     console.log(even)
}
```

 Như bạn thấy, ở trên ta tạo ra 1 collection không giới hạn số lượng items.
 Sử dụng iterator cho phép ta làm việc với collection có số lượng item rất lớn (hoặc không hạn chế) hiệu quả hơn
 bởi nó cho phép ta chỉ xử lý dữ liệu (item) cần tại từng thời điểm thay vì phải load hết tất cả các items trong collection.