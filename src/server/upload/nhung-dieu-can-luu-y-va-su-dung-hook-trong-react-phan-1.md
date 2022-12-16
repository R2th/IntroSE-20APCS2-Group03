# I. UseState và điều cần lưu ý .
Cần chú ý khi code để hạn chế bug nhé các bạn :v: 
## 1. Giới thiệu về hook useState()

* Nó là 1 cái hook cơ bản . 
* Chức năng của nó là giúp cho mình sử dụng functional component. Trước đây thì chỉ có class mới sử dụng được state nhưng sau khi có hook thì đó không còn là cản trở của functional component nhé.
* `Input` là 1 cái initialState (giá trị hoặc calback function)
* `Output`: là 1 mảng có 2 phần tử tương ứng cho `state` và `setState`
* Cách dùng : `const [name, setName] = useState('I love you');`

## 2. Array destructoring syntax
Đầu tiên mình cần phải hiểu 1 số quy tắc mà Facebook dùng để tạo ra hook nhé . 
Trước đây ta thường dùng cú phaps như này để get dử liệu trong mảng ra

```Javascript
const array = ['I love you', '23'];
const a = array[0];  //I love you
const a = array[1];  //23
```

Còn bây giờ chúng ta sẽ sử dụng cú pháp của array destructoring để lấy dử liệu của mảng 1 cách ngắn gọn nhe.


```Javascript
const [a, b] = ['I love you', '23'];
// a = I love you
// b = 23
```

Vậy quay lại cú pháp của useState nhé.
```Javascript
const [name, setName] = useState('I love you');
```

Chúng ta quan sát, tạo sao lại có cái array ở đầu `[name, setName]` như này . Chúng ta cứ hiểu là thằng này `useState('I love you')` có output là 1 mảng có 2 phần tử là name và setName. Chúng ta dùng cú pháp  array destructoring để gét 2 phần tử đó ra nhé các bạn cho dù mình không biết trong function useState đang làm gì hết .

Đó là cú pháp mà 1 hook được viết ra nhé. Còn cách dùng và so sánh việc dùng function và class component thì nhiều tài liệu nói rất rỏ rồi. mình không nói lại nhé. 

### 3. Một số lưu ý khi dùng useState()
* useState() dùng theo kiểu REPLACING chứ không phải là MERGING.

Ta có ví dụ như sau . 

```Javascript
 // setState() trong class component là MERGING
 this.state = { name: 'I love you', age: '20' }
 this.setState({ age: '18' })
 
 // --> { name: 'I love you', age: '18' }
```
Trong trường hợp trên thì nó sẽ giữ nguyên giá trị hiện tại cộng với giá trị mới của state .

```Javascript
 // setState() trong function component là REPLACING
const [person, setPerson] = useState({ name: 'I love you', age: '20' })
setPerson({ age: '18' })
 
 // --> { age: '18' }
```

Trong trường hợp này thì nó lấy object mới luôn và thay thế hoàn toàn object củ của bạn . trường hợp này cần chú ý nhé. chứ không lại ra bug đấy. Lưu ý và lưu ý.

**Giải pháp :**
Chúng ta có nhơ đến giấu 3 chấm không. chúng ta cùng sử dụng nó nhé.

```Javascript
 // setState() trong function component là REPLACING
const [person, setPerson] = useState({ name: 'I love you', age: '20' })
setPerson({ ...person, age: '18' })
 
 // --> { name: 'I love you', age: '18' }
```
Nhớ là lấy các thuộc tính của cái state củ qua và thêm các thuộc tính mới vào.

* Initial state chỉ sử dụng cho lần đầu, những lần sau nó bị bỏ rơi các bạn nhé . 

```Javascript
const initColor = getPerson()
const [person, setPerson] = useState(initColor)
```

Trong function trên thì giá trị initColor nó được set bằng kết quả của function getPerson() . Chúng ta không biết thằng getPerson() nó làm gì trong đó nhưng kết quả của person sẽ bằng giá trị của initColor sau khi được gán. Và nhưngx lần render sau nó sẽ không được goị lại và chúng ta thấy `const initColor = getPerson()` nó thực sự là dư thừa cho những lần render kế tiếp. Cho dù function getPerson() có run và trả kết quả khác nhau về đi chăng nữa nó củng trở nên dư thừa và vô nghĩa

Nếu lần render kế tiếp người ta dùng setPerson để gán lại cho person giá trị mới thì các bạn hiểu rồi chứ, initColor trở nên vô nghĩa .

**Giải pháp :**
Dùng initial state callback để nó chỉ chạy 1 lần duy nhất.

```Javascript
const [person, setPerson] = useState(() => {
    const initColor = getPerson()
    return initColor
})
```

Trong trường hợp này thì thằng useState nó đảm bảo là function getPerson() chỉ được chạy 1 lần duy nhất và trả về kêts quả duy nhất cho initialState.
Dùng như này vùa giảm được các lần chạy function dư thừa và tối ưu code của chúng ta nhé. 

## 4. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc . Một số nguồn :

https://reactjs.org/docs/hooks-intro.html

https://reactjs.org/docs/hooks-faq.html