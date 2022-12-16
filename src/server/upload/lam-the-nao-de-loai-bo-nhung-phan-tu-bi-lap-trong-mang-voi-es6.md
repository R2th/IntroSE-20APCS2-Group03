## 1. Sử dụng Set

Hãy bắt đầu bằng việc tìm hiểu xem `Set` là gì:

>Set là một data object mới được giới thiệu trong ES6. Bản chất của Set là nó chỉ cho phép bạn lưu trữ những giá trị độc nhất. Khi bạn truyền vào 1 array, nó sẽ tự động loại bỏ những phần tử bị lặp.

Giờ ta sẽ đi vào cách làm. Có 2 công đoạn tất cả:
1. Ta truyền tạo một Set và truyền vào nó 1 array. Như đã đề cập ở trên, Set sẽ chỉ cho phép các unique value nên tất cả các dữ liệu bị lặp sẽ bị xóa đi.
2. Vì Set và Array là 2 kiểu data object khác nhau nên ta phải convert ngược Set lại Array để có sử dụng như bình thường. Ở đây ta có 2 cách là:
```js
const array = [3, 1, 2, 3, 3, "a"];
const uniqueSet = new Set(array);

// 1. Sử dụng toán tử phân rã "..." (spread operator)
const removedDuplicateDatas = [...uniqueSet];
console.log(removedDuplicateDatas); // output: [3, 1, 2, "a"]

// 2. Sử dụng Array.from
const removedDuplicateDatas2 = Array.from(uniqueSet);
console.log(removedDuplicateDatas2); // output: [3, 1, 2, "a"]
```

## 2: Sử dụng filter + indexOf
Để hiểu về ý tưởng này thì đầu tiên ta đi qua về 2 hàm sẽ sử dụng cái đã: indexOf and filter.

indexOf
Hàm indexOf trả về index của phần tử đầu tiên tìm được.


filter
Hàm filter() tạo ra 1 array mới gồm các phần tử thỏa mãn điều kiện mà ta cung cấp.

```js
const array = [3, 1, 2, 3, 3, "a"];

const uniqueArray = array.filter((item, index) => array.indexOf(item) === index)

console.log(uniqueArray); // output: [3, 1, 2, "a"]

// Tại sao lại như vậy, ta cùng đi sâu vào từng vòng lặp để hiểu rõ vấn đề

// Loop1: item = 3, index = 0, indexOf(item) = 0; 
// Loop2: item = 1, index = 1, indexOf(item) = 1; 
// Loop3: item = 2, index = 2, indexOf(item) = 2; 
// Loop4: item = 3, index = 3, indexOf(item) = 0; => Vì indexOf trả về index của phần tử đầu tiên nó tìm được, mà 3 đã tồn tại ở trước nên trả về index của 3 ở trước chứ không phải của item hiện tại.
// Loop5: item = 3, index = 0, indexOf(item) = 0; => Tương tự
// Loop6: item = "a", index = 5, indexOf(item) = 5;
```
## 3: Sử dụng reduce
> Hàm reduce dùng để giảm số lượng phần tử trong mảng và tổng hợp chúng thành một array mới dựa trên những reducers ta truyền vào. Tuy nhiên sức mạnh của hàm này thì đôi khi hơn cả vậy. ¯\\\_(ツ)_/¯

Trong trường hợp này, ta chỉ cần đơn giản check các phần tử trong array gốc có tồn tại trong array mà hàm reduce trả về hay không. Nếu không thì push vào array đó, nếu đã tồn tại thì return luôn reduced array hiện tại.
Hàm reduce khá là phức tạp với những bạn mới học Javascript nên mình sẽ chỉ rõ từng bước trong reducer.
```js
const array = [3, 1, 2, 3, 3, "a"];
const uniqArray = array.reduce((acc, curr) => { // -> reducer
    console.log('array mới trả về sau mỗi lần chạy qua 1 phần tử', acc);
    console.log('giá trị hiện tại của phần tử được chạy qua', curr);
    console.log('kiểm tra xem array mới đã tồn tại phần tử hiện tại hay chưa', acc.includes(curr));
    console.log('giá trị ta trả về sau khi kiểm tra điều kiện', acc.includes(curr) ? curr : [...acc, curr])
    
    return acc.includes(curr) ? acc : [...acc, curr];
}
, []) // -> init value

console.log(uniqArray) // Output: [3, 1, 2, "a"]
```