![](https://images.viblo.asia/a071167f-f8dc-4a2a-978e-601219e8cb32.jpg)
Dựa theo những kinh nghiệm ít ỏi tích lũy nhưng đầy thích thú về **styled-components** cùng những tham khảo thú vị. Mình sẽ đưa ra cái nhìn tại sao **styled-components** được xem như một bước chuyển mình đầy mạnh mẽ của CSS và đồng bọn.

Ở phần đầu này mình sẽ nói đặc điểm cơ bản của **styled-components** so với các bậc tiền bối. Phần sau chúng ta sẽ đến với những ưu việt styled-component có thể đóng góp trong một dự án cũng như nhược điểm hiện tại của package này.

## 1. Pure CSS

CSS đã có tuổi đời trên 20 và là phần core nền tảng không thể thay thế của mọi trang web. Các pre-processor, thư viện... cũng được xây dựng xung quanh ngôn ngữ này. Với những mong muốn sơ khởi thì CSS là hoàn hảo: nhanh, dễ đọc, hiểu, triển khai. Nhưng với sự mở rộng và nhu cầu của người dùng cũng như các sản phẩm về web đòi hỏi nhiều chi tiết, độ tinh xảo ngày một nâng cao, CSS không đáp ứng được nhu cầu phát triển. Một dự án trung bình hay lớn mà chỉ dùng CSS thuần sẽ có những lộn xộn rất khó kiểm soát và phân chia, maintain, mỗi người một cách viết/hiểu khác nhau. Rồi important, !important và !IMPORTANT cũng không giải quyết được vấn đề. Đó chính là lý do các ngôn ngữ pre-processor xuất hiện.  
*...Hãy luôn tự tin tỏa sáng*  
![](https://images.viblo.asia/224adaeb-4f24-4b25-aec6-0632dc99d3de.jpeg)
## 2. SASS

SASS đã biến CSS thành một ngôn ngữ chuẩn mực hơn rất nhiều với **nesting, variables, mixins, extends** và **add logic** vào việc styling. Chia nhỏ cấu trúc các file giúp cho việc quản lý và maintain dễ dàng
Tuy nhiên nó đòi hỏi bạn phải có thời gian thực hành khá dài cộng với những quy tắc và best practices nhất định, nếu không người viết cũng sẽ rơi vào một mớ bòng bong không hơn không kém như CSS và cũng khiến stylesheets của dự án nặng nề không đáng có bởi những selector sử dụng nesting thái quá

## 3. BEM

[BEM](https://m.alphasights.com/bem-i-finally-understand-b0c74815d5b0) chỉ đơn thuần là một syntax nhưng nó đã giúp SASS hay cách viết CSS chặt chẽ hơn rất nhiều
BEM bảo toàn các class name là unique và giảm thiểu tối đa nguy cơ mất phương hướng khi định nghĩa các element trong khi styling nhờ cấu trúc đơn giản Block\_\_Element--Modifier

Tuy nhiên cũng không hoàn hảo khi combo BEM + SASS cũng đem đến những side effects:

* Đặt tên class cũng sẽ là một nhiệm vụ khó khăn (cần rèn rũa) nhưng cũng sẽ rất dễ rơi vào nhàm chán và tiêu tốn thời gian
* HTML semantic thì đã đành, nhưng stylesheets của chúng ta...cũng sẽ semantic, tất nhiên là để những co-workers cùng hiểu, nhưng đây là một điều thừa thãi về mặt thực tiễn.

## 4. Styled-components

**Styled-components** là được xây dựng trên CSS và feature của ES6 là tagged literal template.  
Đây là một đoạn **code điển hình** khi ta thấy một React component được style bằng styled-components:

```js
const StyledDiv = styled.div`
  background-color: #c0ffee;
  border-radius: 3px;
  color: #bada55;
  display: flex;
`
```

Hãy hình dung đơn giản như bạn viết CSS trong một file JS và vẫn tận dụng được mọi ưu thế của các phương thức tiền nhiệm như [Emmet](https://emmet.io/) suggestion, syntax highlight, các đặc tính của SASS,...

## 5. Cấu trúc tagged literals template

Hãy tìm hiểu một chút điều gì thực sự xảy ra bên dưới tagged template
Tạo một function đơn giản để log các args truyền vào

```js
const logAll = (...args) => console.log(...args)
```

Bây giờ ta thử log một vài trường hợp

```js
logAll('a', 'b')
// -> a b
```

Hãy thử nghiệm với tagged template

```js
logAll``
// -> [""]

logAll`I like listening to music`
// -> ["I like listening to music"]
```

Vậy ta luôn nhận được một array với phần tử duy nhất là toàn bộ các kí tự bên trong backtick

Hãy đi xa hơn chút khi template literals có thể nhận các giá trị nội suy

```js
const anIdol = 'Ed Sheeran'
logAll(`I like ${anIdol}!`)
// -> I like Ed Sheeran!
```

Đây là điều sẽ xảy ra khi chúng ta gọi func logAll qua một template literals

```js
logAll`I like ${anIdol}!`
// -> ["I like ", "!"] "Ed Sheeran"
```

Hmm có vẻ khó hiểu. Chúng ta hãy làm một ví dụ nữa

```js
const anIdol = 'Ed Sheeran'
const aThing = 'music'

logAll`I like ${anIdol} and ${aThing}!`
// -> ["I like ", " and ", "!"] "Ed Sheeran" "music"

// 1st arg: ["I like ", " and ", "!"]
// 2nd arg: "Ed Sheeran"
// 3rd arg: "music"
// seems legit
```
Như vậy ta sẽ thu được một array là argument đầu tiên với số lượng các phần tử trong nó là toàn bộ các phần nằm ngoài **tất cả** giá trị nội suy: lần lượt từ trái, giữa, phải. Các argument còn lại nhận được sẽ là các giá trị nội suy.  
Giá trị nhận được sẽ hoàn toàn khác khi ta gọi func *logAll* một cách bình thường khi kết quả chỉ là một string đơn thuần
```js
logAll(`I like ${anIdol} and ${aThing}!`)
// -> I like Ed Sheeran and music!
```

**...Ứng dụng của feature trên là gì?**
Với ví dụ điển hình ở trên về styled-componentst ta thu được kết quả là string rất dễ hình dung, nhưng hãy nhìn vào đoạn code dưới đây:
```js
const Button = styled.button`
  color: ${props => props.primary ? '#c0ffee' : 'black'};
`
```
Dường như có một function bên trong CSS. Liệu nó có được thực thi? Liệu có lỗi gì về syntax ở đây không?. Đối chiếu với những phân tích ở trên ta dễ dàng trả lời được câu hỏi này:

```js
logAll(`Test ${() => console.log('Function executed')}`)
// -> Test () => console.log('Function executed')
```
Ta có kết quả là một string không hơn không kém. Vì vậy không có một function nào được thực thi với cách thông thường
```js
logAll`Test ${() => console.log('Function executed')}`
// -> ["Test", ""] () => console.log('Function executed')
```
Với tagged literals template thì hoàn toàn khác, như đã nói không có gì hơn ngoài text ở array đầu tiên nhận được, nhưng kể từ argument thứ 2 chúng ta sẽ nhận được một **function** đích thực!

Ta tạo thêm một func nữa để check type và thực thi function truyền vào:

```js
const executeFunc = (...args) => args.forEach(arg => {
  if (typeof arg === 'function') {
    arg()
  }
})
```
và kiểm chứng cho những lý thuyết ở trên:

```js
executeFunc(`Test ${() => console.log('Function executed')}`)
// -> undefined

executeFunc`Test ${() => console.log('Function executed')}`
// -> "Function executed"
```
Hurrrray! Mình dạo đầu như vậy đã. Hi vọng sẽ có nhiều điều kì diệu hơn để nói đến về styled-components ở kì sau! Chúc các bạn có những trải nghiệm thú vị

## 6. Ref

* [CSS Evolution: From CSS, SASS, BEM, CSS Modules to Styled Components](https://medium.com/@perezpriego7/css-evolution-from-css-sass-bem-css-modules-to-styled-components-d4c1da3a659b)
* [The magic behind 💅 styled-components](https://mxstbr.blog/2016/11/styled-components-magic-explained/)