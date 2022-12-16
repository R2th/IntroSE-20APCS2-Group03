Chào mọi người, hôm nay mình sẽ chia sẻ cho các bạn 4 cú pháp hữu ích trong javascript khi bạn làm project về Reactjs, Vuejs,...
4 mẹo này sẽ giúp các bạn cải thiện được time, lượng code mình viết ra, quan trọng hơn là dể hiểu và dể học nữa, cùng mình tìm hiểu nhé.
<br>
<br>
Bài viết này sẽ có liên quan tới [Destructuring, Spread Operator](https://viblo.asia/p/destructuring-rest-parameters-va-spread-syntax-trong-javascript-bWrZn08v5xw) các bạn có thể tìm hiểu thêm tại đây nhé.

## 1. If-else shorthand
Câu lệnh if-else thì không quá xa lạ với mọi người rồi, đây là một đoạn code các bạn thường hay sử dụng:
```javascript
if (6 > 5) {
    console.log('6 is greater than 5)
} else {
    console.log('6 is less than or equal to 5')
}
```
Các bạn có thể thấy là đoạn code trên cũng đơn giản và rõ ràng nhưng chúng ta có thể viết lại ngắn hơn như sau:
```javascript
console.log(6 > 5 ? '6 is greater than 5' : '6 is less than or equal to 5')
```
Đơn giản hơn rồi phải không.
<br>
**Syntax:**
```
condition ? if true : if false
```
Và đoạn code trong Reactjs là:
```javascript
const Ternary = () => {
    return (
        <div>
            {6 > 5 ? (
                <p>6 is greater than 5</p>
            ) : (
                <p>6 is less than or equal to 5</p>
            )}
        </div>
    )
}
```
Bạn có thể tạo một đoạn text loading... đoạn text này sẽ hiển thị khi đang chờ load data:
```javascript
const Post = () => {
    return (
        <div>
            {!isLoading ? (
                <p>This is post</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
```

## 2. The Spread Operator Shorthand
Spread Operator là gì? là một tính năng hữu ích được giới thiệu trong ES6, giúp bạn thực hiện rất nhiều công việc.
Dưới đây sẽ là vài ví dụ để bạn hiểu rõ hơn:
<br>
**Clone một object:**
```javascript
let array = [1, 2];
let array1 = [...array]; // [1, 2]
```
**Sử dụng trong đối số function**
```javascript
let object = { name: 'Nguyen Van A', age: 23 }

function getUserInfo(object) {
    console.log(object);
}

getUserInfo({...object}); // {name: "Nguyen Van A", age: 23}
```

Còn nhiều ví dụ nữa bạn có thể đọc thêm tại [Đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
<br>
Bạn có thể áp dụng trong Reactjs khi bạn muốn truyền props xuống component con
<br>
Ví dụ:
```javascript
const Post = () => {
    const props = { title: 'title', content: 'abcxyz', createdBy: 'Nguyen Van A' };
    return (
        <Detail {...props} />
    )
}

const Detail = ({ title, content, createdBy }) => {
    return (
       <div>
           <h1>{title}</h1>
           <p>{content}</p>
           <p>{createdBy}</p>
       </div>
    )
}
```
Bạn có thể thấy rằng props ở trong component Post có rất nhiều thuộc tính, thay vì ta viết hết vào component detail thì ta có thể sử dụng Spread rất tiện phải không ạ.

## 3. Destructuring
Destructuring là một cú pháp rất hay và được áp dụng rất nhiều, rất hữu ích trong việc xử lý data, khi bạn muốn gán thuộc tính của một object thành một biến.
<br>
<br>
Ví dụ: Ở đây mình có một Object có rất nhiều thuộc tính, bây giờ mình muốn trích xuất vài thuộc tính ra để sử dụng mình sẽ làm như sau.
```javascript
const post = { title: 'title', content: 'abcxyz', createdBy: 'Nguyen Van A', image: 'img.png' };

// trích xuất thuộc tính createdBy và title
const { title, createdBy } = post;
console.log(title + '-' + createdBy)
```
Bạn xem thêm tại [Đây](https://viblo.asia/p/destructuring-rest-parameters-va-spread-syntax-trong-javascript-bWrZn08v5xw).
<br>
<br>
Áp dụng vào trong Reactjs, mình sẽ lấy lại ví dụ phía trên nhé:
```javascript
const Post = () => {
    const props = { title: 'title', content: 'abcxyz', createdBy: 'Nguyen Van A' };
    return (
        <Detail {...props} />
    )
}

// Bình thường bạn sẽ làm như vậy
const Detail = (props) => {
    return (
       <div>
           <h1>{props.title}</h1>
           <p>{props.content}</p>
           <p>{props.createdBy}</p>
       </div>
    )
}

// Với Destructuring
const Detail = ({ title, content, createdBy }) => {
    return (
       <div>
           <h1>{title}</h1>
           <p>{content}</p>
           <p>{createdBy}</p>
       </div>
    )
}
```

## 4. Template String
Template String hay còn gọi là Template literals, là một cú pháp giúp bạn có thể lồng các biến hoặc biểu thức vào trong một string, hoặc multi-line strings.
<br>
<br>
Ví dụ:
```javascript
const profile = { name: 'Nguyen Van A', age: 23, address: 'Da Nang' };

// Bth bạn sẽ viết là
console.log('Ten: ' + profile.name + ', ' + 'Tuoi: ' + profile.age + ', ' + 'Dia chi: ' + profile.address);

// Template String
console.log(`
        Ten: ${profile.name}
        Tuoi: ${profile.age}
        Dia chi: ${profile.address}
 `)
```

## Tóm lại
Trên đây là những cách viết rất hữu ích giúp bạn tiết kiệm rất nhiều time và code, hy vọng sẽ giúp các bạn có thêm kiến thức hữu ích, cảm ơn