Mình phân vân có nên làm bài về tạo một ứng dụng web cơ bản bằng ReactJs không nhưng khi tìm thử thì đã thấy có khá nhiều rồi,  còn toàn là bài chất lượng nữa. Nên đành thôi, nhặt lại những thứ mình note lại trong thời gian làm React vừa rồi để chia sẻ với mọi người.

Nếu bạn bắt đầu học, hãy thử làm một ứng dụng đơn giản và áp dụng những điều dưới đây xem sao, có thể các bạn sẽ thấy những điều hay ho khác mà mình chưa thể đề cập ở đây, khi đó hãy chia sẻ với mình và các bạn khác nữa nhé.

![](https://images.viblo.asia/ace0be84-9cb2-43a7-af58-ca82a4fcb171.png)
# ESLint
Khi viết code nói chung và javascript nói riêng thì việc code đúng cú pháp hay code style theo đúng chuẩn của dự án sẽ giúp bạn tiết kiệm rất nhiều thời gian code, code của bạn sạch sẽ hơn, và quan trọng là ngay sau lúc save file bạn sẽ biết ngay lỗi và có thể sửa luôn. Và ESLint là một Linter dành cho javascript mạnh mẽ như vậy. 
Và đặc biệt hơn khi nó có rất nhiều plugin hỗ trợ trên các thể loại text editor. Ví dụ Sublime text 3 có SublimeLinter + SublimeLinter-contrib-eslint.

![](https://images.viblo.asia/1c7fe572-2785-4c02-8873-64ea7ae8cc09.png)
# functional stateless Component VS class Component 
Bắt đầu code ReactJs, nếu sử dụng ES6 bạn sẽ biết có 2 cách để tạo một component, đó là *functional stateless Component*: 
```js
import React from ‘react’;

const HelloWorld = ({name}) => (
 <div>{`Hi ${name}`}</div>
);

export default HelloWorld;
```
và *class Component*: 
```js
import React from ‘react’;

class HelloWorld extends React.Component {
    constructor() {
        super(props);
    }
    
    render() {
        return (
            <div>{`Hi ${this.props.name}`}</div>
        );
    }
}

export default HelloWorld;
```
Vậy khi nào thì sử dụng loại nào?
Có khá nhiều điều cần phân biệt ở 2 cách viết này nhưng mình thấy việc quyết định sử dụng cách nào nằm ở việc trả lời 2 câu hỏi: 
1. Component của bạn có cần truy xuất đến `this` hay không?
2. Component của bạn có sử dụng những method thuộc vòng đời của component như `componentWillMount(),...` hay không?

Nếu không hãy dùng loại đầu tiền, còn có hãy dùng loại thứ hai. Hãy sử dụng một cách mềm dẻo để những component có thể thật gọn gàng mà vẫn dễ dàng hiểu code.  
# Naming Conventions
Naming được coi là một trong những việc khoai sắn nhất trong lập trình, React + Redux thì lại chả có quy định gì cụ thể, tùy cách đặt tên cho biến hoặc hàm của bạn sẽ quyết định sự sống và cái chết của dự án khi nó phình to ra :v

Đùa thôi, nhưng mà là thật đấy :| Vì vậy với mỗi chức năng thì hãy tương ứng với một cái tên, một cách đơn giản như prefix cho chúng bằng một từ thể hiện hành động của bạn, kiểu như:
```js
// tạo Admin trong component
onCreateAdmin(){
}

// trong action creator
doCreateAdmin(){
}

// trong reducer
applyCreateAdmin(){
}

// trong selector
getAdmin(){
}
```
# State trong Component
Tại sao chỉ là `state` mà không nói đến `props` ở đây? 

Khi truyền `props` tới component thì ở component đó `props` là bất biến. Còn `state` là private ở component, nó thể hiện trạng thái của component và có thể thay đổi được. 

Tuy nhiên khi phát triển, không phải component nào cũng sử dụng `state`. Hãy chắc chắn rằng component cần tương tác qua lại với UI, nếu không thì hãy bỏ qua việc sử dụng state.

Như ví dụ về việc lấy parameter trên url: *http://abc.com/find/?name=TuanioT*
```js
class HelloWorld extends React.Component {
    constructor() {
        super(props);
    }

    render() {
        return (
            <div>{`Hi ${getParamUrl('name)}`}</div>
        );
    }
}

export default HelloWorld;
```
Chứ không cần thiết đến `state` như dưới đây:
```js
class HelloWorld extends React.Component {
    constructor() {
        super(props);
        
        this.state = {
            name: getParamUrl('name')
        };
    }

    render() {
        return (
            <div>{`Hi ${thís.state.name}</div>
        );
    }
}

export default HelloWorld;
```

# Tạm kết
Trên đây là một số điều mình gặp phải và thấy cần note lại để việc code thuận lợi hơn, sẽ còn một phần nữa :D Mong sẽ giúp đỡ các bạn phần nào trên con đường ReactJs đầy chông gai =))