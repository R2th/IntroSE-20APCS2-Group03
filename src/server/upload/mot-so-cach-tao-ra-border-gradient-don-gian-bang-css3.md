## Giới thiệu:
Trước đây, để tạo đường viền đặc biệt như gradient chúng ta thường sử dụng hình ảnh. Ngày nay, nó trở nên dễ hơn rất nhiều với việc sử dụng CSS3 và một số trick đơn giản. Sau đây mình xin giới thiệu các bạn 2 cách tạo ra border gradient.
## Cách 1:
Cách này ta sẽ dụng chủ yếu vào `background-position `và `background-image` 

**HTML:**
```html
<div class="c-boder-1">
  ThangTV
</div>
```
**CSS:**
```css
.c-boder-1 {
    font-size: 70px;
    line-height: 170px;
    margin: 50px auto;
    font-weight: bold;
    width: 450px;
    padding: 20px;
    text-align: center;
    height: 250px;
    color: #3ACFD5;
    border-top: 20px solid red;
    border-bottom: 20px solid blue;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-position: 0 0, 100% 0;
    background-repeat: no-repeat;
    -webkit-background-size: 20px 100%;
    -moz-background-size: 20px 100%;
    background-size: 20px 100%;
    background-image: -webkit-linear-gradient(top, red 0%, blue 100%), -webkit-linear-gradient(top, red 0%, blue 100%);
    background-image: -moz-linear-gradient(top, red 0%, blue 100%), -moz-linear-gradient(top, red 0%, blue 100%);
    background-image: -o-linear-gradient(top, red 0%, blue 100%), -o-linear-gradient(top, red 0%, blue 100%);
    background-image: linear-gradient(to bottom, red 0%, blue 100%), linear-gradient(to bottom, red 0%, blue 100%);
}
```
**Giải thích:**
* Đầu tiên tao CSS tạo block cho thẻ đó tạo
* Tạo border top và bottom cho div với 2 màu, ở trên mình  `border-top: 20px solid red;` và  `border-bottom: 20px solid blue;`
* Để tạo màu gradient từ đỏ sang xanh theo hướng từ trên xuống dưới mình sử dụng `background-image: linear-gradient(to bottom, red 0%, blue 100%), linear-gradient(to bottom, red 0%, blue 100%)`  ,  set độ rộng cho background 20px bằng với border top và bottom` background-size: 20px 100%;`   và  set position cho  nó `background-position: 0 0, 100% 0;`
{@embed: https://codepen.io/TrinhThang/pen/KOPPGO}
## Cách 2:
Cách này khác là đơn giản bạn chỉ cần tạo thêm 1 thẻ giả và tạo backround cho nó và thêm z-index để nó ẩn xuống dưới

**HTML:**

```markdown
<div class="gradient-box">

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, lorem vel tincidunt imperdiet, nibh elit laoreet felis, a bibendum nisl tortor non orci. Donec pretium fermentum felis, quis aliquet est rutrum ut. Integer quis massa ut lacus viverra pharetra in eu lacus. Aliquam tempus odio adipiscing diam pellentesque rhoncus. Curabitur a bibendum est. </p>

</div>
```
**CSS:**

```css
.gradient-box {
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
  max-width: 22em;

  position: relative;
  padding: 30% 2em;
  box-sizing: border-box;
  color: #FFF;
  background: #000;
  background-clip: padding-box; 
  border: solid 5px transparent;
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -5px; 
    border-radius: inherit;
    background: linear-gradient(to right, red, orange);
  }
}
```
**Giải thích:**

* Đầu tiên ta sẽ set with cho gradient-box và set background của nó trùng với màu nền của trang ở đây tôi chọn là màu đen
* Tạo phần tử giả bằng cách sử dụng :before hoặc :after,
* CSS cho nó có độ rộng lớn hơn phần tử cha margin: -5px;
* Set background cho phần tư giả là dạng gradient background: linear-gradient(to right, red, orange);
* Set index cho phần từ giả là z-index: -1; để cho nó luôn ở dưới gradient-box
{@embed: https://codepen.io/TrinhThang/pen/EqYYwP}

**Chúc các bạn thành công**