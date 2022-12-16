## 1. Mở đầu
<hr>

Chào mừng các bạn đến với bài viết tiếp theo của mình về chủ đề `ReactJS`. Nếu như ở các bài viết trước đó mình thường tập chung chia sẻ vào việc coding thì trong bài viết này chúng ta sẽ không tập chung vào phần đó nữa mà sẽ chuyển qua tìm hiểu về **"lý thuyết"** nhiều hơn. Cụ thể trong bài viết này mình sẽ chia sẻ cho các bạn những một số thứ mà mình tìm hiểu được về một trong những bước mà `ReactJS` thực hiện trong quá trình cập nhật giao diện của chúng ta đó là `Reconciliation`.  Để có thể hiểu được nội dung bài viết thì mình nghĩ các bạn nên đã có kiến thức cơ bản về `ReactJS` nếu không sẽ khá là khó hiểu. Nào chúng ta cùng bắt đầu.

## 2. Reconciliation trong React
<hr>

### a. Virtual DOM Tree

Nếu đã từng làm việc với `ReactJS` hoặc `VueJS` thì chắc hẳn bạn đã từng nghê đến khái niệm `Virtual DOM`. Thực tế thì `Virtual DOM` là một kiểu Object trong Javascript mà React sử dụng để biểu diễn DOM thật. Cụ thể thì bạn có thể nhìn hình dưới đây:

![](https://images.viblo.asia/f49b9f76-a561-4f85-bddb-86ef3b8af42f.png)

Như bạn thấy ở từng phần:
- `The App`: là thứ mà chúng ta sẽ nhìn thấy ở trên trình duyệt WEB.
- `Real DOM`: là phần DOM thật mà chúng ta có thể nhìn thấy bằng cách inpect trong dev tool trên trình duyệt hoặc view-source của trang web.
- `DOM Tree`: Là biểu diễn lại DOM của chúng ta dưới dạng **"cây"**.
- `VDOM`: hay chính là phần `Virtual DOM` của chúng ta được biểu diễn dưới dạng là **Javascript Object**.

Phần `Javascript Object` mà bạn thấy trên hình trên nó còn có thể hiểu là `Virtual DOM Tree` tương ứng với việc `DOM Tree` của `Real DOM`.  Trong `ReactJS` thì `Virtual DOM Tree` được cấu thành bởi các `Element` - là đơn vị nhỏ nhất trong `React`. Các `Element` này thực tế cũng đơn giản là một `Javascirpt Object`. Ví dụ:
```js
// DOM thật
<h1 class="title">This is h1 tag</h1>

// React
{
    type: 'h1',
    props: {
        className: 'title',
        children: 'This is h1 tag'
    }
}
```
Như các bạn thấy trong ví dụ trên ta có một `Real DOM` là thẻ `<h1>` với class là `title` và nội dung bên trong là `This is h1 tag`. Thì ứng với nó chính là `React Element` có cấu trúc như bạn thấy bao gồm:
- type: 1 - ứng với thẻ h1
- props: danh sách các thuộc tính bao gồm `className` ứng với `class` bên DOM thật và phần `children` ứng với phần nội dung nằm trong thẻ đó.

Tương tự thì đối với các `Real DOM` phức tạp hơn như dạng lồng nhau thì `ReactJS` cũng biểu diễn lần lượt thành các `Element` như sau:
```js
// DOM thật
<div class='container'>
    <h1 class='title'>This is title</h1>
    <p class='sub-title'>This is subtitle</p>
</div>

// React
{
    type: 'div',
    props: {
        className: 'container',
        children: [
            {
                type: 'h1',
                props: {
                    className: 'title',
                    children: 'This is title'
                }
            },
            {
                type: 'p',
                props: {
                    className: 'sub-title',
                    children: 'This is subtitle'
                }
            }
        ]
    }
}
```
Các `Javascript Object` mà mình cho các bạn thấy trong 2 ví dụ nói trên thực chất nó nằm kết quả mà chúng ta thu được khi `React` thực hiện việc `render` đã được loại bỏ đi bớt một vài thuộc tính.:
```js
Object {type: "h1", key: null, ref: null, props: Object, _owner: null…}
    type: "h1"
    key: null
    ref: null
    props: Object
    className: "title"
    children: "This is title"
    _owner: null
    _store: Object
```
Bạn có thể xem phần `console` của 2 ví dụ trên để thấy được kết quả của việc `render` như mình nói ở trên [ví dụ 1](https://codesandbox.io/s/jsx-p1-1q5s5), [ví dụ 2](https://codesandbox.io/s/jsx-p2-e9yvk).

### b. Cập nhật DOM

Trong `React` mỗi khi component của chúng ta bị thay đổi về `state` hoặc `props` sẽ dẫn tới việc nó thực hiện việc `re-render` lại chính component nó và các component con của nó. Việc `re-render` này thực chất là chạy lại hàm `render` để thu được một `Javascript Object` mới có dạng như mình đã đề cập đến ở phần trên. Khi thực hiện việc cập nhật cho DOM thật thì `React` sẽ đi qua các bước cơ bản như sau:

![](https://images.viblo.asia/cad49b73-0ee0-45b0-aeec-1b2a36f5bee3.png)

- Đầu tiên `React` sẽ thực hiện việc tạo ra một `Virtual DOM Tree` mới
- Thực hiện việc so sánh `Virtual DOM Tree` mới được tạo ra và `Virtual DOM Tree` ngay trước đó để xác định các vị trí cần thay đổi
- Tiến hành cập nhật `Real DOM`.

### c. Diff Algorithm (Reonciliation)

Đây chính là phần nội dung chính mà mình muốn đề cập với các bạn và cụ thể đó là  về cách mà `React` thực hiện việc so sánh 2 virtual DOM tree mới và cũ. Ở đây mình sẽ không nói về chi tiết từng bước từng bước mà `React` thực hiện việc so sánh này trên thực tế mà sẽ chỉ trình bày cho các bạn hiểu cơ bản về cách hoạt động của nó.

Khi thực hiện việc so sánh 2 Virtual DOM tree mới và cũ để update thì thuật toán của `React` sẽ cần đưa ra quyết đó là khi nào tái sử dụng lại `Element` đang có và khi nào cần tạo mới `Element` đó. Nếu bỏ qua việc tái sử dụng lại `Element` đang có thì sẽ dẫn đến vấn đề về hiệu năng vì `React` sẽ tiến hành tạo mới lại toàn bộ các `Element` mà trong khi nó có thể tái sử dụng lại và chỉ cần cập nhật thuộc tính hoặc phần children của `Element` đó. Ta sẽ xét ví dụ như sau ta có 1 cái button và class của cái button đó bị thay đổi:
```html
// Old
<button className="blue" />
{
    type: 'button',
    props: { className: 'blue' }
}

// New
<button className="red" />
{
    type: 'button',
    props: { className: 'red' }
}
```
Như các bạn thấy ở trên thì button của chúng ta chỉ bị thay đổi về phần `className` vì thế trong trường hợp này nếu nếu React tạo lại `<button>` này thì nó sẽ dẫn đến việc lãng phí tài nguyên thay vào đó nó chỉ cần update đúng phần `className`. Việc quyết định tạo mới hay update lại sẽ được đưa ra bằng cách so sánh type giữa 2 `Element` nằm ở vị tri tương ứng với nhau trong `Virtual DOM Tree`. Bạn có thể hiểu cơ bản giả sử ta có 2 mảng lần lượt là:
```js
$arr1 = [1, 2, 3, 4, 5];
$arr2 = [1, 3, 4, 5, 6];
```
Thì việc so sánh của theo vị trí tương ứng với nhau sẽ theo kiểu so sánh  `$arr1[0]` với `$arr2[0]`, `$arr1[1]` với `$arr2[1]`, ... cho đến hết. Cách mà `React` thực hiện so sánh lần lượt cũng tương tự như vậy, so sách 2 `Element` có cùng vị trí ở `Virtual DOM Tree` cũ và mới với nhau. Trong trường hợp nếu bên `Virtaul DOM Tree` cũ hoặc mới ít `Element` hơn thì các vị trí đó sẽ nhận được giá trị là null. Quay trở lại với ví dụ nói trên thì như bạn thấy ở đây:
```js
// Old
{
    type: 'button',
    props: { className: 'blue' }
}
// New
{
    type: 'button',
    props: { className: 'red' }
}
```
Cả 2 đều có cùng kiểu type là `button` chính vì thế `React` sẽ đưa được ra ngay quyết định đó là tái sử dụng  `Element` này thay vì phải tạo mới nó. Ví thế quy tắc ở đây rất đơn giản:
- `type` khác nhau -> tạo mới
- `type` giống nhau -> tái sử dụng

Xét ví dụ tiếp theo:
```js
// Old
{
    type: 'div',
    props: { className: 'blue' }
}
// New
{
    type: 'span',
    props: { className: 'blue' }
}
```
Nếu áp dụng quy tắc mà mình nói trên thì như bạn có thể thấy ngay khi bắt đầu việc so sánh thì ta có thể thấy ngay type của `Element` đã bị thay đổi từ `div` sang `span`. Chính vì vậy mà ở đây `React` sẽ tiến hành tạo mới `Element` này và đi kèm với việc đó sẽ gọi đến hàm `componentWillUnmount()` (nếu là class component) sau đó sẽ hủy bỏ toàn bộ trạng thái của `Element` này đi kèm với nó là cả phần `children` của nó nữa. Có nghĩa là nếu ta có phần `children` hay phần nội dung nằm bên trong nó như sau:
```html
// Old
<div>
    <SomeComponent />
</div>

// New
<span>
    <SomeComponent />
</span>
```
Thì toàn bộ các component hay các thẻ tag html khác nằm bên trong nó sẽ bị xóa đi và tại lại mới hoàn toàn. Tương tự thì việc mất trạng thái cũ hay gọi hàm `componentWillUnmount()` cũng sẽ xảy ra với các component con này. Đối với các `Element` phức tạp hơn thì toàn bộ việc so sánh type để quyết định cập nhật hay tạo mới nó cũng diễn ra tương tự:
```js
<div class='container'>
    <h1 class='title'>This is title</h1>
    <p class='sub-title'>This is subtitle</p>
</div>

{
    type: 'div',
    props: {
        className: 'container',
        children: [
            {
                type: 'h1',
                props: {
                    className: 'title',
                    children: 'This is title'
                }
            },
            {
                type: 'p',
                props: {
                    className: 'sub-title',
                    children: 'This is subtitle'
                }
            }
        ]
    }
}
```
`React` vẫn sẽ đầu tiên tiến hành so sánh `type` bọc ngoài cùng ở đây là `type`: `div` nếu không bị thay đổi thì sẽ tiến hành đi tiếp vào bên trong nó là so sánh các `Element` con của ở vị trí tương ứng với nhau. Các bạn có thể hiểu với các `Element` có `children` là các `Element` khác thì việc so sánh nó vẫn diễn ra tuần tự với nhau theo kiểu `parent` với `parent` và `children` với `children`. Cụ thể thì nó giống như chúng ta so sánh mảng đa chiều như này:
```js
$arr1 = [1, [2, 3 , 6], 4];
$arr2 = [2, [3, 4, 7], 5];
```
Thì việc so sánh sẽ là `$arr1[0]` với `$arr2[0]`, `$arr1[1][0]` với `$arr2[1][0]` và lần lượt hết phần mảng con rồi mới quay ra so sánh tiếp `$arr1[2]` với `$arr2[2]`. Việc so sánh các `Element` có `children` là các `Element` khác (hay gọi là nested Element) cũng diễn ra như vậy. Còn trong trường hợp `type` bị thay đổi thì `React` sẽ bỏ qua toàn bộ quá trình so sánh phía trong mà lập tức tạo mới ngay. Như vậy bạn mới có thể thấy rằng trên thực tế việc ta gặp các `Element` dạng nested hay phưc tạp hơn như này là rất thường xuyên. Chính vì thế như mình nói ở trên nếu không đưa ra quyết định là tạo mới hay cập nhật mà chỉ tạo mới sẽ dẫn đến ảnh hưởng về hiệu năng rất nhiều. Với toàn bộ những gì mình vừa nói thì ta sẽ xét ví dụ này:
```js
// Old                              // New
<div>                               <div>
  <h1 className="a">Title</h1>          <h2 className="a">Title</h2>
  <p className='b'>Hello</p>            <span className="b">Hello</span>
</div>                              </div>
```
Việc so sánh sẽ lần lượt là:
- `type`: div -> div -> cập nhật.
- `type`: h1 -> h2 -> tạo mới.
- `type`: p -> p -> không tạo mới.

## 3. Kết bài
<hr>

Mình dự định sẽ trình bày hết toàn bộ nội dung về `Reconciliation` của `React` trong bài viết này tuy nhiên có vẻ sẽ làm bài viết sẽ trở nên khó dài và làm các bạn khó nắm bắt cho nên bài viết xin tạm dừng tại đây và chuyển phần nội dung còn lại qua bài viết sau. Hẹn gặp lại các bạn ở bài viết tiếp theo.