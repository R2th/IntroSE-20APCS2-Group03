Như mọi người đã biết thì `styled-components` là một thư viện của reactjs giúp ta tạo một style component với sự kết hợp giữa css và javascript.
Nó có thể được cài đặt thông qua `npm` hoặc `yarn`
`npm install --save styled-components` or `yarn add styled-components`

Trong lúc code, chắc hẳn đã có nhiều lúc chúng ta tìm được một cái form, template, hay là một cái hiệu ứng đẹp ở đâu đó và muốn áp dụng vào reactjs application của mình, nhưng cho dù đã có được source code css thì việc áp dụng đó cũng không hề dễ dàng chút nào :v. Sau đây là một loạt ví dụ về những dòng code css và cách viết tương đương của nó với `styled-components`.

```
#css
div {
  color: red;
}

#styled-components
const Div = styled.div`
    color: red;
`
```

```
#css
div:hover {
  color: blue;
}

#styled-components
const Div = styled.div`
    &:hover{
        color: blue;
  }
`
```
```
#css
input[type=submit] {
  background-color: #45a049;
}

#styled-components
const Input = styled.input.attrs({
  type: 'submit',
})`
  background-color: #45a049;
`;
`
```
```
#css
.my-class {
  background-color: #45a049;
}

#styled-components
const MyClass = styled.div`
 .my-class {
    background-color: #45a049;
 }
`
```
```
#css
div p {
  color: red;
}

#styled-components
const Div = styled.div`
 &>p {
   color: red;
 }
`
```
```
#css
div * {
  color: green;
}

#styled-components
const Div = styled.div`
 * {
   color: green;
 }
`
```

Hy vọng sau bài viết này mọi người sẽ biết thêm được nhiều cách để sử dụng `styled-components` sao cho hiệu quả nhất.

`Happy coding`