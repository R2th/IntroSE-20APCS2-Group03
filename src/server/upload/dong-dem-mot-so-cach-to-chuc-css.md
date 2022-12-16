## Đặt vấn đề
Không biết đó giờ bạn thường viết `CSS` như thế nào nhỉ? Dạo trước mình thường viết theo bản năng, cần `selectors` nào thì thêm `selectors` đó vào, lâu dần nghiễm nhiên nó trở thành một thói quen. Và rồi phải thừa nhận một điều rằng việc quản lý `CSS` rất khó.

![](https://images.viblo.asia/7fa625f8-afc3-402e-bf8f-99b63a72452c.gif)


Hồi đó thì vẫn chưa được `khai sáng` gì đâu, mình đã chắp vá tạm thời bằng cách chia cả `file styles` to thành các phần theo từng `pages` bằng `comment trong CSS` dạng như thế này:
```CSS
/* HOME PAGE - styles for home page */
.home { background: teal; }

/* PRODUCT PAGE - styles for product page */
.product { background: white; }
```

Đừng hiểu nhầm nhé ! Cách này chẳng có gì sai cả, thế nhưng cảm giác nó vẫn chưa hiệu quả lắm nhỉ?
Rõ ràng là chúng ta  luôn muốn hướng tới một mục tiêu: **`HTML` is smaller & `CSS` is more manageable** mà 🙄🙄


Trước khi tạo ra các `CSS native scoping mechanism` qua các `CSS preprocessors`như `SASS`, `LESS` & `Stylus`, để khắc phục các vấn đề về  `manageable` và `scalable`, các `CSS methodologies` chính là giải pháp của chúng ta !

 *Hãy cùng nhau tìm hiểu về một số các `CSS Methodologies` nhé ^^*

## BEM
#### Ý tưởng
**`BEM` chỉ ra `vai trò` & `mối quan hệ giữa các elements` qua các quy ước đặt tên `selectors`.**

> `BEM` stands for `Block`, `Element` & `Modifier`.

```css
.block { }
.block--modifier { }
.block__element { }
.block__element--modifier { }
```

##### Class-naming convention:

| BEM's key elements | Ý nghĩa | Ví dụ |
| -------- | -------- | -------- |
| **`Block`**    | Một khối, thành phần độc lập có ý nghĩa riêng     | `menu`, `header`,...|
| **`Element`**  | Một phần tử của một khối không có ý nghĩa độc lập và được gắn kết về mặt ngữ nghĩa với khối đó  | `menu item`, `header title`,...|
| **`Modifier`**    | Một lớp được sử dụng trên một khối hoặc phần tử có ý nghĩa về `UI` hành vi.     | `disabled`, `highlighted`,...|

#### Ví dụ

```html
<form class="loginfrm loginfrm--errors">
    <label class="loginfrm__name loginfrm__name--error">
        <input type="text" name="name" />
    </label>
    <button class="loginfrm__btn loginfrm__btn--inactive">Join DevNotes</button>
</form>
```
#### Nhận xét
Mình đặt tên các `class` theo `BEM` trông có thể khá dài dòng, song, nhìn vào đó ta dễ dàng biết được vai trò của chúng và kiểm soát `specificity` rất tốt, tránh việc `cascading` trong `CSS`. 

Hơn nữa, khi chúng ta sử dụng một số `pre-processors` như `SCSS` cũng được hỗ trợ `parent Selector(&)` để viết `styles` một cách linh hoạt hơn:
```scss
.loginfrm {
    &--errors { }
    &__name {
        /* ... */
        &--error { }
    }
    &__btn { }
}
```

*Wow, `BEM` ngon lành cành đào quá nhỉ ^^*

Tuy nhiên, `BEM` cũng có [những vấn đề của riêng nó](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/). 
Theo cá nhân mình, khi làm việc với `BEM`, đôi khi cần kha khá thời gian để cân nhắc về ngữ nghĩa (ý mình là`semantics-class` chứ không phải `sematic tag` nhé ^^): 

*`Block` này nên đặt tên là gì? Thành phần con của nó có nên là `element` hay là một `component` khác? Rồi `element` này nên có tên chi chi? `one`, `two`, hay `three` =)))*

Hơn nữa, `class name` đặt tên theo `BEM` thường đi đôi với `HTML structure` mà nó được sử dụng, dẫn đến trường hợp khi `refactor code`, muốn chuyển sang một component mới tổng quát hơn, chúng ta cần thời gian để đổi cái tên khác cho hợp lý.

Mà rõ ràng là `sematic class` không đem lại hiệu quả cho `crawlers` khi quét & đánh giá trang `web` mà chúng chỉ có giá trị với `developers` để dễ hiểu `code` của nhau thôi, và giá trị mà khách hàng mong muốn lại là thật giống với thiết kế nhất !?!

*Như vậy thì còn cách nào khác không nhỉ?* 🤔🤔

## Atomic
#### Ý tưởng
Khi dự án `scale` to dần lên, nhiều `component` xuất hiện đồng nghĩa với kích thước `file CSS` ngày càng to ra. Đáng buồn là, không phải tất cả `CSS` được `server` gửi xuống cho `client` sẽ thật-sự-được-sử-dụng trong trang.

> With `Atomic CSS`, a separate class is created for each reusable property.
> 
<br/>

**`Atomic CSS` là cách ta tạo ra các `class-riêng-biệt` định nghĩa cho từng-quy-tắc-CSS, tên `class` thường là dựa vào `properties – values`.**

#### Ví dụ

Thông thường:
```html
<button class="btn btn--secondary"></button>

<style>
    .btn {
        color: blue;
        padding: 10px;
    }
    .btn--teal {
      color: teal;
    }
</style>
```

thì với `Atomic CSS`:
```HTML
<button class="text-teal p-10"></button>

<style>
    .text-teal {
        color: teal;
    }
    .p-10 {
      padding: 10px;
    }
</style>
```

#### Nhận xét
**`Atomic CSS không-mô-tả-ngữ-nghĩa-của-phần-tử`**, điều này có thể làm ta thấy một `núi HTML` khá rối nếu như áp dụng nhiều `styles` cho `elements` dạng:
```html
<button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"> Cảm ơn bạn vì đã kéo tới tận đây :") </button>
```

Thế nhưng điểm nổi bật là **`Atomic CSS` giúp chúng ta tránh được vấn đề `casscading CSS` qua `CSS specificity` & tái sử dụng chúng được ở nhiều nơi**.

Cho tới thời điểm viết bài viết này, có rất nhiều `Atomic CSS Frameworks/Repositories` phổ biến có thể kể tới như *[Tailwind CSS](https://tailwindcss.com/),  [TACHYONS](https://github.com/tachyons-css/tachyons/), [Basscss](https://basscss.com/), etc.*

### Atomic vs. Functional vs. Utility-first

`Atomic CSS`, `Functional CSS`, `Utility-first CSS` - Bạn đã bao giờ thoáng nghe qua 3 thuật ngữ này chưa?

*Có lẽ đầu tiên mình nhờ chị `Google translate` một chút nhỉ?*

`Functional CSS` là *`CSS` theo chức năng*; `Atomic CSS` là *`CSS` theo nguyên tử (mình hiểu là từng element)*; `Utility-first CSS` là *`CSS` dựa trên các tiện ích*. **Cả 3 thuật ngữ này đều dùng chung cho một cách viết `CSS` nhé.**

Mình lưu ý như vậy là bởi vì nếu bạn thử `search` từ khóa *`Atomic CSS`* thì kết quả đầu tiên sẽ là một thư viện cùng tên của `Yahoo!`, hoặc trường hợp khác có thể nhầm lẫn sang khái niệm [`Atomic Design`](https://atomicdesign.bradfrost.com/). Khi mới đầu tìm hiểu, mình đã bị những `cú lừa` như vậy nên muốn chia sẻ lại 😹😹

<br/>

*Okayy, chúng mình đi vào `CSS methodology` tiếp theo nhé ^^*

## OOCSS
#### Ý tưởng
> `OOCSS` stands for `Object-Oriented CSS`.

<br/>

**`OOCSS` has 2 main ideas separation of:**
- **`Structure` from  `skin`**
- **`Container` from `content`**

 **⇒** **Focus on flexible & reusable components, each doing one thing well**

*Nghe thì hơi trừu tượng chút, xem qua ví dụ để hiểu rõ hơn nào:*
#### Ví dụ
Thông thường:
```css
#widget {
  width: 200px;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
}

#box {
  overflow: hidden;
  border: solid 1px #ccc;
  background: linear-gradient(#ccc, #222);
}
```
`Widget` & `box` mặc dù có một số `styles` chung nhưng đang được định nghĩa trong `Id selectors`. Chúng ta sẽ sửa như sau:
```css
.widget {
    width: 200px;
}

.box {
    overflow: hidden;
}

.skin {
    border: solid 1px #ccc;
    background: linear-gradient(#ccc, #222);
}
```
Mình vừa chuyển chúng thành các `Class selectors`, các `styles` chung được định nghĩa trong `.skin` để có thể dùng chung và được tái sử dụng sau này.

<br/>

Xét một ví dụ khác, với một tiêu đề trong `header`:
```css
#header .title {
    font-family: Arial;
    color: teal;
    font-size: 2em;
}
```
Và rồi xuống tới `footer` thấy một tiêu đề có `style` tương tự vậy nhưng `size chữ` bé hơn xíu, thế là đầu nhảy số luôn, thêm ngay vào phía dưới:
```css
#header .title, #footer .title {
    /* ... */
    font-size: 2em;
}

#footer .title {
    font-size: 1.5em;
}
```
hay thậm chí là:
```css
#header .title {
    /* ... */
}

#footer .title {
    /* Dublucate above styles for fontsize, font-family, color */
}
```

Trong ví dụ trên, `.title` - một `descendant selector` không thể tái sử dụng được, vì nó phụ thuộc vào `container` chứa nó (trong trường hợp này là `#header` và `#footer`). Thật không ổn chút nào đúng không? 🤨🤨

<br/>

#### Nhận xét

Như đã trình bày phía trên, một trong những mục tiêu của phương pháp `OOCSS` là giảm việc trùng lặp các bộ `property: value` trong các `selectors` (**separation of structure from skin**).

Hơn nữa, `OOCSS` đảm bảo việc `selectors` không phụ thuộc vào `container`, có nghĩa là, chúng hoàn toàn có thể được tái sử dụng ở bất cứ đâu, bất kể `structural context` nào (**separation of container & content**)

 **⇒** **`OOCSS` is so `DRY` ^^**
 
 ![](https://images.viblo.asia/fc9f42ef-84f7-4dbf-a116-ce78a9d57323.gif)

## SMACSS
#### Ý tưởng
> `SMACSS` stands for `Scalable`, `Modular` & `Architecture` for `CSS`.

<br/> 

Với `SMACSS`, chúng ta tổ chức `CSS` thành các `categories`:


| Category | Description | Selectors |
| -------- | -------- | -------- |
| **Base**     | Gồm các `styles` mặc định được sử dụng trên toàn bộ trang `web`     | `Type, attribute selectors` *(`h1`, `div`, `a`, etc)*     |
| **Layout**     | Gồm các `styles` liên quan tới các layout cấu trúc trong một trang `web`  | Containers, the grid *(`layout-header`, `l-footer`, etc)*   |
| **Modules**     | Gồm các `styles` của các `reusable components`  |*`search-form`, `social-media`, `call-action`, etc.*   |
| **State**     | Gồm các `styles` cho các thành phần ở một trạng thái, ngữ cảnh cụ thể *(chấp nhận `!important flag`)*    |  *`is-hidden`, `is-highlighted`, `is-active`, etc.*  |
| **Themes**     | Gồm các `styles` cần thay thế khi người dùng `trigger` một `context` khác | *Từ `Nomal theme` chuyển sang `Christmas theme`, etc.*   |

#### Nhận xét

Cá nhân mình, khi làm việc với `SCSS/less`, mình chia ra thêm 2 `file` nữa:
- `_font`: Chứa tất cả các `font chữ` cần dùng.
- `_variables`: Chứa các biến như *`main-color`, `font-size`,`main-space`, etc.*

<br/>

Sau đó, trong `main.scss` thêm các `file` này vào:
```scss
@import '_fonts';
@import '_variables';
@import '_base';
@import '_layouts';
/* ... */
```
và `compile` ra một `file css` duy nhất để  `import` vào `html`. 


### Others

Với ý tưởng chia `styles` thành các `file` riêng biệt như vậy chúng ta không chỉ được thấy qua `SMACSS` mà còn có thể kể tới các phương pháp khác như **MCSS**:

> `MCSS` is **Multilayer** `CSS`.
> 

<br/>

Nếu `SMACSS` chia CSS theo `categories` thì `MCSS` chia `CSS` theo từng lớp `layers`:


| Layers | Đặc điểm | Ví dụ |
| -------- | -------- | -------- |
| **Zero/Foundation**	     |  `Reset` `styles` của trình duyệt    |*`reset.css` hoặc `normalize.css`*     |
| **Base**     | Gồm các `styles` liên quan đến các thành phần sử dụng nhiều nơi  | *`buttons`, `input fields`, etc.*     |
| **Project**     | Gồm các `styles` cho một số modules riêng biệt |    |
| **Cosmetic**     |Gồm các `styles` chỉ liên quan & ảnh hưởng tới `UI`, KHÔNG có khả năng phá vỡ cấu trúc `layouts` | *`colors` & `non-critical indents`*     |

<br/> 

*Để đi sâu vào kiến trúc của nó, bạn có thể tham khảo thêm trên [Trang chủ của MCSS](https://operatino.github.io/MCSS/en/) nhé ! Tiếp theo chúng ta sẽ tìm hiểu một `CSS methodologies` mà mình thấy `lạ lùng` nhất 😄😄))* 

## AMCSS

#### Ý tưởng

> `AMCSS` stands for Attribute Modules for `CSS`.
> 

<br/>

`AMCSS` là một kỹ thuật sử dụng `HTML attributes` và `values` của chúng để `style` cho các `elements`(thay vì các `class`).

#### Ví dụ
Giả sử ta có một `button`:
```html
<div class="btn btn--large btn--teal">haodev.wordpress.com</div>
```

`Convention-based` của `BS` với một button: `'btn' class + class prefixed by 'btn'`. Một vài ý kiến cho rằng trông vậy khá rườm rà cho `html`. 

Như vậy, với `AMCSS` đoạn `code` trên được sửa đổi thành:
```html
<div hao-btn="large teal">haodev.wordpress.com</div>
<!-- HOẶC -->
<div hao-btn-large hao-btn-teal">haodev.wordpress.com</div>
```

Lúc này, chúng ta sẽ `CSS` theo các `attributes`: *(đó là lý do phương pháp này có tên là `Attribute Modules for CSS`)*

```css
[hao-btn] { }
[hao-btn~="large"] { }
[hao-btn~="teal"] { }
```

#### Lưu ý

*NAMESPACE (`haodev`) được `recommend` làm `prefix` trước ATTRIBUTE_NAME(`btn`) để tránh trường hợp trùng lặp với `HTML attributes` mặc định của `HTML tag`(`names collisions`).*

## Kết

Vậy là chúng ta đã điểm qua một vòng `BEM`, `Atomic`, `OOCSS`, `SMACSS`, `AMCSS` rồi nè 😄😄. Ngoài những `CSS methodologies` kể trên thì còn rất nhiều các phương pháp khác bạn có thể tham khảo thêm như *`Systematic CSS`, `FUN`, etc*.

Các `CSS methodologies` dù có những ý tưởng khác nhau trong cách quản lý `CSS`, song, mục tiêu chung vẫn là để quản lý `CSS` hiệu quả, dễ dàng maintain. Hơn nữa, việc tránh lặp `code` cũng giúp giảm kích cỡ `files CSS`, tăng tốc độ tải của trang giúp trải nghiệm người dùng tốt hơn ❤

<br/>

#### Cái nào cũng hay, vậy hay nhất là cái nào?

*Hmm...*

*Rõ ràng là các `CSS methodologies` chỉ là tham khảo, KHÔNG PHẢI LÀ QUY TẮC. Chúng ta hoàn toàn có thể sáng tạo ra một `concept riêng` dựa trên chúng sao cho phù hợp với `project` và `convention chung` của các thành viên trong `team`.
**Cá nhân mình thích cách kết hợp giữa ý tưởng của `OOCSS`, `naming conventions` theo `BEM` và tổ chức các `files` theo `SMACSS` ^^***


*Tất nhiên đó là ý kiến chủ quan của mình, phần là trải nghiệm và phần là cảm tính một chút 😽😽. Cùng chia sẻ cách tổ chức `CSS` của bạn phía dưới bình luận nhé 😋😋*

<br/>

Cảm ơn vì đã đọc bài viết của mình. Tặng mình **`1 upvote`** để có động lực cho các bài viết tiếp theo nha  🥰🥰

![](https://images.viblo.asia/1b06fdcd-2cb0-4795-a67a-3d98e2e05e8f.gif)

<br/>

Tham khảo thêm các bài viết về công nghệ tại [**DevNotes**](https://haodev.wordpress.com/devnotes/).


Chúc các bạn cuối tuần vui vẻ 😺😺 !!!

 <br/>
 
 <br/>
 
***Reference**: [Webfx](https://www.webfx.com/blog/web-design/css-methodologies/), [Medium](https://medium.com/@ZeeCoder/a-practical-introduction-to-the-bem-css-methodology-eeef578bac8c), [Clubmate](https://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/#Atomic_file_organization), [CSS Tricks](https://css-tricks.com/methods-organize-css/), [SnipCart](https://snipcart.com/blog/organize-css-modular-architecture), [Ehkoo](https://ehkoo.com/bai-viet/introduction-to-functional-utility-first-atomic-css), [Smashing Magazine](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/), [Zaraffasoft](https://www.zaraffasoft.com/2016/09/20/organize-your-css-smacss/), [Personal Blog](https://haodev.wordpress.com/).*