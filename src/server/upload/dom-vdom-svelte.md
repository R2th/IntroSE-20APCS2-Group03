# 1. DOM
> The Document Object Model (DOM) is a programming interface for HTML, XML and SVG documents. It provides a structured representation of the document as a tree. 

https://developer.mozilla.org/vi/docs/Web/API/Document_Object_Model

Hiểu đơn giản thì DOM là biểu diễn của HTML, XML, SVG dưới dạng cây. DOM cung cấp các API giúp bạn có thể thay đổi cấu trúc, nội dung, style của văn bản.

```
document.getElementById("app").innerHTML = "Hello";
```

# 2. DOM Ảo
> The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM

https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom

Theo như định nghĩa của React thì DOM ảo là biểu diễn của DOM được lưu trong bộ nhớ và đồng bộ hóa với DOM thông qua thư viện ReactDOM.

```
<ul class="animals">
  <li>dog</li>
  <li>cat</li>
  <li>cow</li>
</ul>
```

```
// DOM ảo
{
  type: "ul",
  props: {
    "class": "animals"
  },
  children: [
    {
      type: "li",
      props: null,
      children: [
        "dog"
      ]
    },
    {
      type: "li",
      props: null,
      children: [
        "cat"
      ]
    },
    {
      type: "li",
      props: null,
      children: [
        "cow"
      ]
    }
  ]
}
```


# 3. DOM ảo nhanh hơn DOM ?

Trước khi trả lời câu hỏi này thì chúng ta cùng xem ví dụ sau:
```
let animals = ['dog', 'cat', 'cow'];

function createList(animals) {
  let ul = document.createElement('ul');
  document.getElementByClassName('.animals').appendChild(ul);
  animals.forEach((item) => {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += item;
  });
  return ul;
}

document.getElementById('#list').innerHtml = generateList(animals);
```

Sau khi `animals` thay đổi

```
let animals = ['pig', 'cat', 'cow'];
document.getElementById('#list').innerHtml = generateList(animals);
```

Chúng ta có thể thấy chỉ có `dog` được thay thành `pig` nhưng chúng ta lại cần tạo ra một `ul` mới và cập nhật nó vào DOM. Thay vào đó chúng ta có thể tối ưu lại như sau:

```
document.querySelector('li').innerText = 'pig';
```

Nhưng vấn đề là rất khó để chúng ta biết được chính xác chỉ những gì thay đổi để apply nó tới DOM. Đó là khi DOM ảo thể hiện khả năng của nó. Vì DOM ảo được đồng bộ với DOM nên với bất cứ thay đổi nào trên DOM ảo, sẽ được apply đến DOM chỉ những thay đổi đó mà không phải là toàn bộ. Để làm được điều đó thì chúng ta có cơ chế diff. Mỗi khi state thay đổi, một instance của DOM ảo sẽ được tạo ra và so sánh với phiên bản trước đó, những khác biệt sẽ được tìm ra và apply tới DOM sau đó. Vì diff nhanh hơn so với việc cập nhật toàn bộ DOM nên mới có khái niệm DOM ảo nhanh hơn DOM. Thực tế thì DOM ảo vẫn phải dùng các API của DOM nên nói DOM ảo nhanh hơn DOM là không chính xác. DOM ảo chỉ giúp chúng ta tìm ra các thay đổi, còn việc cập nhật vẫn phải dùng API của DOM.

# 4. Svelte
Svelte là một bộ compiler giúp bạn chuyển đổi các components thành code Javascript có thể tự cập nhật những thay đổi vào DOM mà ko cần diff. Để bắt đầu với Svelte rất đơn giản:
```
npx degit sveltejs/template your-project
cd your-project
npm install
npm run dev
```

Sau đó các bạn có thể vào http://localhost:5000/ để xem kết quả

Tài liệu chi tiết về Svelte các bạn có thể tham khảo ở đây
https://svelte.dev/

# Tài liệu tham khảo
https://dev.to/karthikraja34/what-is-virtual-dom-and-why-is-it-faster-14p9

https://svelte.dev/blog/virtual-dom-is-pure-overhead