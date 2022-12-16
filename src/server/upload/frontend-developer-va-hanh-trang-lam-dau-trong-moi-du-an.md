Trong mỗi dự án, Frontend Dev có vai trò như lính đánh thuê, cũng giống như người ta thường nói "làm dâu trăm họ". Để hài lòng với mọi gia đình đặc biệt là những *"bà mẹ chồng khó tính"*, chị em chúng ta cần học theo kinh nghiệm đúc kết từ những bậc tiền bối.

![](https://images.viblo.asia/19ac86e9-4c69-45ab-bfbc-5b756d0530d8.jpg)

## 1. Bao nhiêu là đủ, indent với tab hay space

![](https://images.viblo.asia/bd6fc30d-0333-4afc-8631-576573f5cf7c.png)

Thông thường convention mà các lập trình viên lấy làm chuẩn sẽ là 2 hoặc 4 space tùy theo ngôn ngữ hoặc rules dự án. Bạn có thể tham khảo [code style PSR-2](https://www.php-fig.org/psr/psr-2/).

Khi code bạn thường dùng gì để thụt đầu dòng (indent)?

Có người thích dùng tab, người khác lại dùng 2 hoặc 4 dấu space để thụt dòng. Bên cạnh việc không thống nhất là bao nhiêu space còn có sự tranh cãi giữa dùng tab và dùng space. Vì sao lại xảy ra tình trạng tranh cãi, ai thích dùng gì thì dùng chứ. Đó là vì có ý kiến cho rằng gõ 2 dấu cách mới là code chuẩn, còn dùng tab thì không. Nên dùng 2 spaces hay dùng tab?

>Câu trả lời là dùng **space**. Mỗi editor sẽ định nghĩa độ dài của tab khác nhau nên rất lộn xộn về code. Tuy nhiên các editor hiện tại đã support việc convert 1 tab bằng 2 hoặc 4 space.

## 2. Đặt tên theo camelCase hay snake-case
Đây là 2 dạng [naming convention](https://en.bem.info/methodology/naming-convention/) phổ biến, cả 2 loại này sẽ xuất hiện trong cùng 1 project của bạn. Tuy nhiên dùng ở đâu là phù hợp?

![](https://images.viblo.asia/d382d8fc-e7a8-4070-bed0-1f5f52ae9159.jpg)

#### - camelCase
Nhìn vào cách viết, chắc các bạn cũng đã đoán được đây là gì.
CamelCase là kiểu viết code theo dạng lạc đà (u bướu) mà chắc ai cũng dễ dàng nhận ra khi mới bắt đầu học code. Các chữ cái đầu từ đều được viết hoa. Style này dùng đặt tên biến, tên function... thường sẽ xuất hiện ở những ngôn ngữ lập trình: java, javascript, php...

```js
var productItems;

function checkNumber() {};
```

#### - snake-case
Đây là cách viết code dùng dấu gạch dưới để phân cách các từ, tất cả từ đều được viết thường.
Tuy là người sợ rắn nhưng mình rất thích cách viết này vì nó rõ ràng. Thông thường trong `HTML/CSS` để đặt tên `class/id` bạn sẽ tuân theo style này. Nếu bạn đã biết về BEM, bạn cũng sẽ thấy đây là ứng dụng của style này.
```css
/* CSS */
#product-items {}

.section-banner {};
.section-banner__wrap {};
```

```html
<!-- HTML -->
<div id="product-items"></div>

<div class="section-banner">
  <div class="section-banner__wrap"></div>
</div>
```

## 3. Vị trí dấu ngoặc
Vũ trụ thường có 2 kiểu người, bạn thuộc kiểu nào dưới đây:

```js
// same line formatting
function ahihi() {

}
```

```js
// next line formatting
function ahihi()
{

}
```

**Same line formatting:**
- Dễ đọc hơn vì dấu mở ngoặc ở cạnh `function name`.
- Gọn gàng hơn, không làm số dòng phình to.
- Dễ dàng phân biệt và tìm dấu ngoặc đóng.

**Next line formatting:**
- Dễ đọc nhưng sẽ làm phình to số dòng code.
- Ngược lại, dễ dàng tìm dấu ngoặc đóng và cả hai đều cùng 1 vị trí.

>Nên viết theo dạng `same line formatting` vì hầu như convention nào cũng tuân theo styled này. Nó cũng thuận tiện hơn khi bạn collapse method trong các editor.


## 4. Nhập gia tùy tục thế nào cho đúng

![](https://images.viblo.asia/75309af5-13ba-43f5-9834-34a234b6d533.png)

Mỗi dự án sẽ có một convention khác nhau. Để dễ dàng tuân theo những [convention](https://github.com/airbnb/javascript) này và cũng có cảnh báo nếu mình "sa cơ lỡ bước".

Nếu dùng những editor như VSCode, Sublime text, Atom... bạn nên cài extension của những rules:
- [EditorConfig](https://editorconfig.org/): thống nhất style của editor và project
- [ESLint](https://eslint.org/): bắt những lỗi viết code javascript (khai báo thừa biến, function... sai convention...)
- [Stylelint](https://stylelint.io/): bắt những lỗi thuộc về CSS/SASS

>Ví dụ mình dùng VS Code, mình sẽ cài extension [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).
Khi bạn import project, extension sẽ đọc file `.editorconfig` để cấu hình workspace editor phù hợp với convention.

Đây là ví dụ đoạn config của file `.editorconfig`

```
# EditorConfig is awesome: http://EditorConfig.org

# Đây là file thiết lập gốc
root = true

# Newline theo chuẩn Unix và luôn có dòng mới ở cuối file
[*]
end_of_line = lf
insert_final_newline = true

# Đối với các tập tin Python thì dùng 4 khoảng trắng
[*.py]
indent_style = space
indent_size = 4

# Với các tập tin JavaScript thì dùng tab, không quy định size
[*.js]
indent_style = tab

# Nhưng với các tập tin JavaScript trong thư mục lib thì dùng 2 khoảng trắng
[lib/**.js]
indent_style = space
indent_size = 2

# Đối với tập tin package.json hoặc .travis.yml thì dùng 2 khoảng trắng
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

Tương tự, bạn cũng có thể tìm hiểu về rules cũng như cách config của [ESlint](https://eslint.org) và [Stylelint](https://stylelint.io/).

## Tổng kết
Hiện nay ngôn ngữ lập trình và các framework ngày càng trở nên phong phú. Nhưng về logic, convention thì đều có điểm chung. Để teamwork tốt và tạo cho bản thân mình một nề nếp *"sạch sẽ"*, chúng ta nên có thói quen viết code *"best practices"* nhờ convention. Chúc các bạn có một source code sạch sẽ và review những dòng code của người khác thật dễ nhìn.

>###### Một số convention mà mình thường làm chuẩn: 
>- CSS/SASS: https://github.com/airbnb/css
>- Javascript: https://github.com/airbnb/javascript
>- React: https://github.com/airbnb/javascript/tree/master/react
>- BEM - naming convention: http://getbem.com/

> ###### Tool support editor:
>- EditorConfig - config convention project with editor: https://editorconfig.org/
>- Eslint - validate Javascript : https://eslint.org/
>- Stylelint - validate CSS/SASS: https://stylelint.io/