Ngày nay, các conditional attributes được sử dụng rộng rãi trong React. Tuy nhiên, đối với các bạn mới làm quen với React thì có thể chưa quen với việc sử dụng các conditional attributes.
Vì vậy, trong bài viết này, chúng ta sẽ cùng thảo luận về các phương pháp khác nhau và các phương pháp hay nhất được sử dụng khi check điều kiện nhé.

Bắt đầu thôi 

# Rendering Conditional Attributes in React
OK trước khi thực hành thì chúng ta sẽ tìm hiểu về việc React sẽ render như thế nào khi sử dụng các conditional attributes.

Trong JavaScript, nếu chúng ta set một thuộc tính là null, undefined hoặc false,thuộc tính đó sẽ bị xoá khỏi DOM :

```javascript
const required = true;
const disabled = false;
return <input type="text" disabled={required} required={disabled}/>;
```

Ở trong đoạn code trên, thẻ input của chúng ta đã nhận 2 props được truyền vào và thằng required có giá trị là false nên nó sẽ bị vô hiệu khóa khi được render ra ngoài màn hình :

```javascript
<input type="text" disabled>
```

Bây giờ chúng ta sẽ cùng nhau xem qua các cách tiếp cận khác nhau trong việc triển khai các conditional attributes trong một ứng dụng React.

# if Statement
Sử dụng câu lệnh if-else là một trong những cách dễ nhất để triển khai cácconditional attributes. Việc sử dụng này thì khiến cho code của chúng ta rất đơn giản và dễ đọc.

Ví dụ trong trường hợp của chúng ta sẽ xem xét dưới đây, thằng input sẽ bị disabled nếu nó có role là student. Role này sẽ được check từ object user :

```javascript
const App = () => {

    let disabled = false;
    let type = "text";
    let name = "address";

    const user = {
        role: 'Student',
        name: 'John',
    }

    if(user.role === 'Student') {
        disabled = true;
    }

    return <input type={type} name={name} disabled={disabled}/>;
}
```
 Nhưng cách này cũng sẽ trở nền không hợp lí nếu chúng ta tạo ra nhiều giá trị cho mỗi attribute
 
 Xa hơn nữa, thì đoạn code của chúng ta sẽ trờ nên khá là dài nếu có thêm nhiều điều kiện nữa.
 
#  Ternary Operator
Toán tử ba ngôi mà chúng ta sử dụng có ba đối số. Cách này thì cho phép chúng ta gói các điều kiện mình cần check vào một dòng duy nhất mà đối số đầu tiên chính là điều kiện mà chúng ta cần check. Các đối số khác sẽ thực hiện điều tương ứng nếu nó là true hoặc false .

```javascript
const App = () => {

    const user = {
        role: 'Student',
        name: 'John',
    }

    return <input type="text" name="address" disabled={ user.role === 'Student' ? true : false }/>;
}
```

Khi sử dụng cách này thì chúng ta có thể làm giảm thiểu số lượng dòng code trong project, nó cũng làm giảm thiểu thời gian đọc code khi số lượng thuộc tính của chúng ta tăng lên.

# && Operator
Việc sử dụng dấu && tương tự như việc chúng ta sử dụng toán tử ba ngôi. && là một toán tử logic cho phép chúng ta check điều kiện cần được kiểm tra ở phía bên trái và đầu ra thì sử dụng ở phía bên phải. Kết quả của đầu ra sẽ được thực thi nếu điều kiện chúng ta check là true hoặc nếu điều kiện check không đúng thì kết quả trả ra của chúng ta sẽ là false.

```javascript
const App = () => {

    const user = {
        role: 'Student',
        name: 'John',
    }

    return <input type="text" name="address" disabled={ user.role === 'Student' && true }/>;
}
```

Như chúng ta đã thấy việc sử dụng && thì sẽ gọn hơn so với việc sử dụng toán tử ba ngôi. Nó cũng ít phức tạp hơn so với các tiếp cận của toán tử ba ngôi.

# Spread Operator
Mình thấy cách này khá là hợp lí và mọi người nên dùng này:

Spread Operator được sử dụng khi chúng ta muốn passing tất cả các propertíe của một object hoặc tất cả các elements của một array vào React component.

```javascript
const App = () => {

    const user = {
        role: 'Student',
        name: 'John',
    }

    const attributes = {
        type: 'text',
        name: 'address'
    }

    if(user.role === 'Student') {
        attributes.disabled = true;
        attributes.required = false;
    }

    return <input { ...attributes }/>;
}
```

Chúng ta đã sử dụng attributé object để lưu lại các tất các các required attributes trong ô input. Điều này giúp chúng ta xử lí code dễ hơn bởi vì tất cả các attributes sẽ được xử lí trong object.

Hãy thử tưởng tượng chúng ta sử dụng if trong trường hợp này thì ra sao :

```javascript
const App = () => {

    let disabled = false;
    let required = true;
    let type = "text";
    let name = "address";

    const user = {
        role: 'Student',
        name: 'John',
    }

    if(user.role === 'Student') {
        disabled = true;
        required = false;
    }

    return <input type={type} name={name} disabled={disabled} required={required}/>;
}
```

Thấy không đoạn code của chúng ta sẽ tràn ngập các biến và rất là lâu khi code.

# Suggest 
Chúng ta có thể xây dụng và chía sẻ các component độc lâp với việc sử dụng [Bit](https://bit.dev/).

Nó là một công cụ cho phép chúng ta tạo ra các truly modular applications với các independently  authored, versioned và maintained components.

![](https://images.viblo.asia/a907986d-cc4f-4e12-9daf-64775e4faa85.png)


# Kết luận 

Vậy là chúng ta đã thảo luận về bốn cách tiếp cận chính trong việc thêm các conditional attributes hoặc props vào React Component. Chúng ta có thể sử dụng bất kỳ phương pháp nào tùy thuộc vào sở thích của mình. Nhưng trước tiên chúng ta nên xem xét các các trường hợp đó diễn ra như thế nào.

Sử dụng câu lệnh 'if' là cách tiếp cận đơn giản nhất nếu bạn không muốn bị làm khó với các cú pháp JavaScript phức tạp hơn. Nếu độ phức tạp và khả năng đọc của code không phải là vấn đề bạn quan tâm, bạn có thể tiếp tục với 'if'.

Toán tử ba ngôi và toán tử && rất hữu ích nếu bạn đang xử lý ít thuộc tính hơn.

Cuối cùng, toán tử spread có tính linh hoạt hơn so với các cách tiếp cận khác.

Bài viết của mình đến đây là kết thúc rồi.

Nếu thấy hay hãy **like**, **share** và **upvote** cho mình với nhé .

Many thanksssss