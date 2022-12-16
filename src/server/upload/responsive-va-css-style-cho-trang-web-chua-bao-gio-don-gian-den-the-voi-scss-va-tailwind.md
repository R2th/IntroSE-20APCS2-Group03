# 1. Mở đầu:
Có lẽ bạn quá mệt mỏi với việc mỗi lần code responsive 
```css
@media (min-width: 375px) {
    width: 100%;
  }
@media (min-width: 768px) {
    width: 115%;
}
@media (min-width: 1000px) {
    width: 672px;
}
```
Thật sự là một trải nhiệm tồi tệ với việc sáng tạo mà (tức). Đây là một trong những lỹ do các bạn lên chuyển qua sử dụng tailwind và tương tư như những người anh đi trước, như bootraps, foundation vv... thì tailwind cũng có các thuộc tính được gán thành những class riêng. Vậy tại sao chúng ta lên sử dụng tailwind thay vì bootraps. Như ban đầu mình đã giới thiệu thì tailwind hỗ trợ responsive vô cùng hiệu quả và dễ dàng. Kèm với đó là một số điểm mình rất gét của bootrap là javascript của nó, đi kèm với đó là cách import của nó vào project của mình với các phiên bản khác nhau cũng khiến mình rất khó chịu (đây là chia sẻ cá nhân, các bạn có thể tham khảo). Nói chung là bootrap nó rất thuận tiện nhưng nó đang xử lý rất nhiều mảng không chỉ css và mình cảm thấy hơi khó chịu với việc custorm nó, thay vào đó mình thấy điểm thuận tiện đó ở tailwind.

# 2. tailwind
> Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.

Tailwind không giống như các framework khác, như mình đã đề cập ở trên thì tailwind không phải một UI kit với các components được xây dựng sẵn, hay các bạn có thể hiểu là các team blade,  navbar vv... được vẽ sẵn như một số màn example của bootraps, thì nó hoàn toàn không có. Nhưng như đó là một trong những thứ mình thấy là rất tốt ở tailwind bạn có thể xây dụng lên một theme theo phong cách của mình và chắc chắn không đụng hàng (yaomi)

# 3. Cài đặt tailwind
Sử dụng command để install tailwind
```js
# Using npm
npm install tailwindcss

# Using Yarn
yarn add tailwindcss
```
Import css của Tailwind:
```js
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";
```
Add vào css của bạn:
```js
@tailwind base;

@tailwind components;

@tailwind utilities;
```
Nếu bạn muốn tạo ra các config riêng cho dự án của mình, thì bạn có thể tạo ra file config file của tailwind bằng lệnh
```command
npx tailwindcss init
```
nó sẽ tạo ra file config tailwind.config.js trong project của bạn

nó sẽ có cấu trúc như sau:
```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
}
```
ví dụ như mình có thể custorm thành:
```js
theme: {
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px'
        }
    },
```
còn một thứ rất gì và này lọ các bạn có thể tìm hiểu thêm ở trong document của nó: https://tailwindcss.com/docs/installation
# 4. Ví dụ:
```js
<header className='product-development px-0 lg:px-12 py-16 md:w-full md:flex title'>
                <div className='text-center px-1 w-full md:w-4/6 md:flex-initial md:text-left'>
                    <h1 className='font-black text-2xl md:text-4xl'>
                        <span className='md:hidden lg:block'>Welcome to</span>
                        <p>Đắc nhân tâm của Dale Carnegie – top những quyến sách bán chạy nhất thế giới, một cuốn sách thật sự đem lại những giá trị tuyệt vời cho người đọc, bao gồm những lời khuyên cực kì bổ ích về cách ứng xử trong cuộc sống hàng ngày</p>
                    </h1>
                </div>
                <div className='text-center text-gray-700 md:pl-6 pt-4 md:pt-0 border-test md:pl-32 lg:pl-32 md:flex-initial md:text-right md:w-7/12'>
                    <div className='show-decision border-development pb-4 md:pb-0 h-full'>
                        <p>
                           Thoạt đầu, ấn tượng đầu tiên mà bạn có thể thấy về quyển sách này chính là cái bìa không quá sặc sỡ của nó, với giá thành rất rẻ (76.000đ), hai màu xanh – đỏ nằm xen kẽ nhau và ở giữa là dòng chữ ‘đắc nhân tâm’ được in đậm vô cùng rõ rệt nhằm mục đích đánh lừa thị giác
                        </p>
                        <p className='tech-no'>Smartphone Applications.</p>
                    </div>
                </div>
            </header>
```
Các bạn có thể để ý thấy những trường như: **px (padding căn left right), py(padding căn bottom top)** ... đây là các thuộc tính class cơ bản class built-in rồi, nhưng các bạn có thể thấy sẽ có thêm các trường như **md, lg, sm ...**  nó sẽ tương đương với kích thước các màn mà chúng ta đã config ở trên, và nó cũng có defaul sẵn cho các bạn các trường cơ bản rồi :v.

kết hợp chúng một chút nhé, mình có đoạn **md:hidden lg:block** tức là đoạn text ở rưới sẽ ẩn khi bạn ở dưới **kích thước màn md**, và hiện thị khi ở **kích thước màn lg**. Và còn rất nhiều cái hay ho nữa nhưng một bài viết là khó có thể nói hết được, lên các bạn hãy tự tìm hiểu thêm nhé, nếu có gì đó hay ho các bạn có thể thêm ở phần bình luận để mọi người cùng tham khảo nha (yaomi)

# 5. SCSS
Dù các framework có thần thánh đến mức nào, hay support tốt đến đâu thì chúng ta vẫn phải custorm, ghi đè, hay thậm chí tự viết một số đoạn, lên mình sẽ giới thiệu đến các bạn một trong các công cụ hỗ trợ viết css thuần rất gì và này nọ, đó là scss.
## vậy scss là gì:
> SCSS: là một CSS Prepocessor - giúp cho việc viết code CSS nhanh hơn và cấu trúc rõ ràng hơn, quản lý các biến đã định nghĩa sẵn.


## Cài đặt
command install
```js
npm install -g sass
```
Để biên dịch code SCSS sang CSS thì ta truy cập vào thư mục chứa file SCSS sau đó chạy lệnh:
```
sass --watch input.scss output.css
```
## Các cú pháp cơ bản về scss
Lấy theo ví dụ trên thì các bạn có thể viết css lại đợn giải như sau

### Quy tắc lồng nhau trong Scss
```css
.container {
    // css của bạn
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 2px;
    .product-development {
        // css của bạn
        font-weight: bold;
        font-size: 116px;
        opacity: .5
    }
}
```
### Tham chiếu trong Scss
Giúp tham chiều đến phần tử cha: cú pháp là **&**

Ví dụ mình sẽ có 1 div nữa với class là: **product-development__title** 

```css
.container {
    // css của bạn
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 2px;
    .product-development {
        // css của bạn
        font-weight: bold;
        font-size: 116px;
        opacity: .5
    }
    &__title {
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 900;
    }
}
```
hay  như thể **&:hover** ...

### Đặt biến trong Scss

Các bạn có thể đặt lại thành tên các biến với cú pháp: **$variales: value;**

ví dụ mình thường đặt các mầu trong project vào một file, và import ở những chỗ có sư dụng. Cách này rất hay khi các bạn có thể thay đổi theame cho cả dự án rất hay :)

### Kế thừa extend trong Scss

```
.message{
    border: solid 1px;
    text-align: center;
    font-size: 16px;
    padding: 20px 10px;
}
 
.error{
    @extend .message;
    background: red;
}
 
.success{
    @extend .message;
    background: blue;
}
 
.warning{
    @extend .message;
    background: yellow;
}
```

và các bạn có thể import các file với nhau để dễ dàng extend **@import 'Link của bạn'**

# Tài liệu tham khảo:
**tailwind:** https://tailwindcss.com/

**scss:** https://sass-lang.com/install

Một số bài viblo mình thấy viết khá chuyên sâu và hay về vấn đề này nếu bạn muốn tìm hiểu thêm về scss:

https://viblo.asia/p/nhung-kien-thuc-co-ban-ve-sassscss-gDVK29vm5Lj

https://viblo.asia/p/sass-va-scss-ban-chon-gi-part-1-gAm5yR1XKdb



# Kết luận
Bài viết cũng đã khá dài rồi lên mình xin phép tạm kết ở đây nếu các bạn có thắc mắc gì đừng ngại commend ở bên rưới nhé. Và để cho mình thêm động lực đừng quên để lại một upvote nhé (thankyou)

![](https://images.viblo.asia/862d5e57-e2e7-48dd-ac42-013b443109ed.jpg)