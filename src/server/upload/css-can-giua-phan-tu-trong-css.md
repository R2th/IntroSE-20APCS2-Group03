Căn giữa phần tử trong css - nghe có vẻ đơn giản nhưng lại khá là phức tạp :'(. <br/>
Mỗi khi viết xong đoạn css căn giữa và đọc lại nó thì: `Tại sao mình lại viết một đống dài loằng ngoằng này chỉ để làm một việc đơn giản thế kia thôi à.` <br/>
Vậy nên ở bài này, mình xin giới thiệu từng trường hợp cụ cùng với giải pháp tối ưu tương ứng, hy vọng phần nào giúp các bạn dễ dàng hơn khi làm việc với nó. <br/>
Trước tiên mình xin liệt kê ra các inline và block hay gặp để mọi người tiện áp dụng:
- Thẻ block: `<p>`, `<ul>`, `<ol>`, `<h1>`, `<div>`, ...
- Thẻ inline: `<b>`, `<strong>`, `<i>`, `<u>`,…và đặc biệt là `<span>` - tương tự như thẻ `<div>` nhưng ở dạng inline <br/>

Giờ thì bạn cần căn giữa ....
## Theo chiều ngang:
### 1. Với phần tử inline hoặc inline-* (như text hoặc links)
Bạn có thể căn giữa các phần tử inline theo chiều ngang, nằm bên trong một phần tử block là thẻ cha, chỉ với cách đơn giản sau:
```css
.center-children {
  text-align: center;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/HulzB <br/>
Thuộc tính `text-align` sẽ căn giữa với các phần tử inline, inline-block, inline-table, inline-flex, ...
### 2. Với 1 phần tử block
Bạn có thể căn giữa một phần tử block bằng cách gán giá trị `margin-left` và `margin-right` của nó thành `auto` (và nó phải được set width nếu không nó sẽ chiếm toàn bộ chiều rộng và cũng không cần căn giữa), có thể sử dụng cú pháp shorthand như sau:
```css
.center-me {
  margin: 0 auto;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/eszon <br/>
Note: Bạn không thể sử dụng `float` lên phần tử được căn giữa. Có một vài mẹo nhỏ, bạn có thể tham khảo ở đây: https://css-tricks.com/float-center/
### 3. Với hơn 1 phần tử block
Nếu bạn có 2 hoặc nhiều hơn một phần tử block cần căn giữa theo chiều ngang trong một hàng thì tốt nhất bạn nên thay đổi cách `display` sang kiểu khác(`inline-block` chẳng hạn). Dưới đây là ví dụ khi sử dụng `inline-block` và `flex`:
```html
<main class="inline-block-center">
  <div></div>
  <div></div>
  <div></div>
</main>
<main class="flex-center">
  <div></div>
  <div></div>
  <div></div>
</main>
```
```css
.inline-block-center {
  text-align: center;
}
.inline-block-center div {
  display: inline-block;
  text-align: left;
}

.flex-center {
  display: flex;
  justify-content: center;
}
```
![](https://images.viblo.asia/36955695-24dd-4265-bae1-bec888b80910.png)

ví dụ: https://codepen.io/chriscoyier/pen/ebing
## Theo chiều dọc:
Căn giữa theo chiều dọc trong css thì phức tạp hơn một chút.
### 1. Với phần tử inline hoặc inline-* (như text hoặc links)
#### 1.1 Trên một dòng <br/>
Đôi khi các phần tử inline / text có thể căn giữa theo chiều dọc bằng cách set `padding-top` và `padding-bottom` bằng nhau.
```css
.link {
  padding-top: 30px;
  padding-bottom: 30px;
}
```

ví dụ: https://codepen.io/chriscoyier/pen/ldcwq <br/>
Vì một lý do nào đó bạn không thể sử dụng padding, khi đó bạn có thể set line-height bằng heigth cũng được:
```css
.center-text-trick {
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/LxHmK <br/>
#### 1.2 Trên nhiều dòng <br/>
Việc gán `padding-top` và `padding-bottom` bằng nhau cũng có thể căn giữa với nhiều dòng văn bản nhưng sẽ không hiệu quả đối với những text / inline nằm trong một ô của table chẳng hạn. Sử dụng `vertical-align` thì sẽ hợp lý hơn trong trường hợp này.
```csss
.center-table {
  vertical-align: middle;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/ekoFx <br/>
Ngoài ra bạn cũng có thể sử dụng `flexbox` với thuộc tính `flex-direction`:
```css
.flex-center-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/uHygv <br/>
**Note:** 2 cách trên chỉ thực sự hiệu quả khi phần tử cha có height cố định(px, %, ..) <br/>
**Ghost element** <br/>
Nếu cả 2 cách đưa ra bên trên đều không hoạt động, thì lúc này bạn có thể sử dụng kỹ thuật `ghost element`: Tạo ra một phần tử pseudo( phần tử ảo) có `full-height` được đặt bên trong phần tử cha - chứa các phần tử inline và các phần tử inline này được căn giữa theo chiều dọc dựa vào phần tử pseudo ta tạo ra.
```css
.ghost-center {
  position: relative;
}
.ghost-center::before {
  content: " ";
  display: inline-block;
  height: 100%;
  width: 1%;
  vertical-align: middle;
}
.ghost-center p {
  display: inline-block;
  vertical-align: middle;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/ofwgD <br/>
### 2. Với một phần tử block.
#### 2.1 Đã biết chiều cao - heigth
Nếu bạn biết được chiều cao của phần tử, bạn có căn giữa theo chiều dọc bằng cách đơn giản sau:
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; /* account for padding and border if not using box-sizing: border-box; */
}
```
ví dụ: https://codepen.io/chriscoyier/pen/HiydJ <br/>
#### 2.2 Không biết chiều cao - unknow heigth
Vẫn có thể căn giữa các phần tử không biết height bằng cách tăng `top` lên 1 nửa chiều cao ban đầu rồi dịch chuyển nó 1 nữa xuống dưới theo chiều dọc.
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```
ví dụ: https://codepen.io/chriscoyier/pen/lpema <br/>
#### 2.3 Căn giữa sẽ ảnh hưởng đến chiều cao - height
Nếu bạn không quan tâm đến việc chiều cao có thể bị kéo dài ra mà mục đích chính vẫn là căn giữa thì hãy sử dụng `tables` hoặc CSS `display` để biến phần tử đó thành dạng table để thực hiện mẹo này.
```css
main {
  position: relative;
  display: table;
}
main div {
  display: table-cell;
  vertical-align: middle;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/RmeWvQ <br/>
### 3. Sử dụng flexbox
Không có gì phải ngạc nhiên ở đây, sử dụng flexbox có vẻ còn dễ dàng nhất trong các cách nêu ra ở trên.
```css
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/FqDyi <br/>
## Theo cả chiều ngang lẫn chiều dọc:
Bạn có thể kết hợp những kỹ thuật căn giữa ở trên để thực hiện căn giữa theo cả ngang lẫn dọc, tuy nhiên bạn cũng có thể sử dụng những cách dưới đây: <br/>
### 1. Phần tử cố định width và height
Sử dụng `margin` âm có giá trị bằng một nửa chiều cao và chiều rộng, sau đó gán `position` là kiểu `absolute` và đưa `top` và `left` bằng 50% sẽ căn giữa nó một cách hoàn hảo trên nhiều loại trình duyệt.
```css
.parent {
  position: relative;
}

.child {
  width: 300px;
  height: 100px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 50%;

  margin: -70px 0 0 -170px;
}
```
ví dụ: https://codepen.io/chriscoyier/pen/JGofm <br/>
### 2. Phần tử không biết width và height
Nếu bạn không biết chiều cao hoặc chiều rộng bạn có thể sử dụng thuộc tính `transform` rồi `translate` 50% cả chiều cao lẫn chiều rộng để căn giữa đều 2 bên.
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
ví dụ: https://codepen.io/chriscoyier/pen/lgFiq <br/>
### 3. Sử dụng flexbox
Không gì dễ dàng hơn việc sử dụng flexbox để căn giữa.
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
### 4. Sử dụng grid
Đây là một mẹo nhỏ, sẽ khá hiểu quả khi sử dụng với một phần tử.
```css
body, html {
  height: 100%;
  display: grid;
}
span { /* thing to center */
  margin: auto;
}
```
 ví dụ: https://codepen.io/chriscoyier/pen/NvwpyK <br/>
#### Kết
Giờ đây, bạn có thể căn mọi thứ mình muốn trong CSS một cách đơn giản nhất có thể.
#### Tham khảo
https://css-tricks.com/centering-css-complete-guide