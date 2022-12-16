Chào mọi người, Báu lại lên sóng rồi đây. Hôm nay mình xin chia sẻ về 1 chủ đề, đã rất hot trong giới FrontEnd từ buổi sơ khai mình tập tành những dòng HTML và CSS đầu đời: ATOMIC COMPONENTS. Bạn có biết `atomic components` không? Có hay không thì cũng đọc qua bài viết của mình 1 lần nhé 😉. Okay, Let's get started! :fireworks: 
# I. From `Atoms` to `Atomic Component`:

Kể từ cấp 2 (mình nhớ là lớp 8), chúng ta đã được biết đến `atom - nguyên tử`. Có rất nhiều cách để giải thích về `atom`, mình xin trích dẫn từ 1 vài bài viết tham khảo:

![](https://images.viblo.asia/d094c2d4-ee43-4608-bec4-8f592efa3a52.png)


> Atoms are the most basic building blocks of our universe (forget about sub-atomic particles 😃).
> 
> Những hạt nguyên tử được coi là những vật liệu xây dựng cơ bản nhất trong vũ trụ chúng ta (khi đã bỏ qua vấn đề rằng những hạt nhỏ hơn tạo nên nguyên tử là `sub-atomic particles` 😃 - nah, keep it basic, please).

Và
> ... atomic elements combine together to form `molecules`. These `molecules` can combine further to form `relatively complex organisms` ...
>
> ... các nguyên tử khi kết hợp với nhau sẽ tạo thành các phân tử. Các phân tử này có thể kết hợp thêm để tạo thành các cơ quan tương đối phức tạp ...

Hãy liên hệ đến UI nói chung, các `atoms` được nhắc đến ở đây chính là các cá thể nhỏ bé trong 1 ứng dụng/trang web: `button, input, text, etc`. Và cụ thể hơn trong UI development, đây chính là các `basic UI components`:

![](https://images.viblo.asia/7fdde7b8-88b0-43c3-ba27-903abaed2818.png)

Và kết nối các `basic UI components` lại với nhau, chúng ta có thể xây dựng lên các `molecules`,  và tiến xa hơn là các `organisms`:

![](https://images.viblo.asia/b79d4391-4637-450a-98fe-74c0dc8c3ff4.jpg)


Nhưng mà rằng, anh Brad Frost, người tạo ra định nghĩa cơ bản cho `Atomic Design` đã nói rằng: 
> Atomic design is like mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time.

Vậy cho nên là:
# II. From `Thinking` to `Doing` - split to control in `Vuejs`:
## 1. Not only `component`:

Đối với những bạn từng làm việc qua với FrontEnd Libraries - Framework như ReactJS/Vuejs, chúng ta đều biết đến việc tạo nên các `component` để dễ quản lý cho từng `Page/Feature`, và mỗi file `component` thường sẽ chứa rất nhiều `element` (như là nguyên 1 cái `Page/Feature` chẳng hạn), và trong các `component` này thường xuất hiện những bạn kiểu như, hmmm,  `Link like Button`:

```HTML
<template>
    ...
    <button class="Block__element--modifier" @click="redirectTo('/homepage')">Click me to redirect!</button>
    ...
</template>
```
Và rồi mình sẽ phải định nghĩa cho hàm `redirectTo()` ở phía dưới:
```js
...
    methods: {
        redirectTo(path = '', params = '') {
            this.$router.push({ path, params });
        },
    },
...
```

Có 1 vấn đề là, nếu chúng ta lặp đi lặp lại `Link like Button` ở nhiều `component` khác nhau, chúng ta sẽ gọi hàm `redirectTo` nhiều lần nhỉ?

Tạo sao chúng ta không tạo ra một `atom component` cho riêng các `Button/Link` để chỉ quản lý các `element` này nhỉ?

```html
<template>
  <router-link
    v-if="link"
    :class="`btn btn--${type}`"
    :to="link"
    @click.native="handleClick"
  >
    <span class="btn__inner">
      <slot />
    </span>
  </router-link>
  <button
    v-else
    :class="`btn btn--${type}`"
    :disabled="disabled"
    type="button"
    @click.prevent="handleClick"
  >
    <span class="btn__inner">
      <slot />
    </span>
  </button>
</template>
```
Lúc này, mình còn có thể custom `Link/Button` của mình với bất cứ `type/style` mà mình muốn (`outline, button, ect...`), cũng như dễ dàng quản lý hơn. Ngoài ra, việc cố định các `type/style` của `Button/Link` ở 1 chỗ như thế này cũng rất tốt cho các bạn vào sau, dễ dàng tiếp cận, cũng như không bị xót các trường hợp `type/style` đã tạo rồi nhưng bị trùng...

Vậy nên, có thể các bạn đã chia các `component` rất đẹp, rất dễ nhìn, nhưng hãy chia `nhỏ nhất có thể`, giống như `Chiến thuật chia để trị` trong lập trình vậy :smile:. Và không dừng lại ở việc chia thật nhỏ các `element` thành các `atom component`, hãy sử dụng [`Storybook`](https://storybook.js.org/) để quản lý các `atomic components` này, cũng như các kết hợp của chúng tạo nên các `organisms`, các thành viên dự án vào sau sẽ rất biết ơn vì điều này đấy.

## 2. But also `CSS`:
> Báu has a `Button`, Báu has a `Link`, Bump, `AtomButton`!
> Báu has a `H2`, Báu has a `Label`, Báu has a `p`, Báu ....

Chắc các bạn sẽ tự hỏi, `Button` thì cụ thể rồi, thế tôi có phải viết `AtomicText` cho mấy cái thẻ kia không?

Câu trả lời là không, vì chúng ta đã có `ATOMIC CSS`, và tất nhiên, đây cũng chỉ là `design thinking`, nhưng có rất nhiều thư viện hiện tại đi theo tư duy này, và ứng viên sáng giá mà mình muốn giới thiệu đó là `TailwindCSS`. 

### a) Viết bằng BEM là đẹp rồi:
```html
<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">Look at me!</figcaption>
</figure>
```

Nhưng nếu sử dụng `BEM` lâu dài, các bạn sẽ thấy gặp 2 vấn đề sau:

* CSS của cùng một thuộc tính đè lên nhau, và đôi khi chỉ có thể fix bằng `!important` hoặc `inline CSS`. Wow, bad way!
* Class lồng nhiều cấp và không thể tái sử dụng.
* Tải HTML chỉ một trang nhưng full-package CSS của cả hệ thống!
* Tên của class chỗ này nên là gì?

```html
<div class="c-card">
    <div class="c-card__header">
        <h2 class="c-card__title">Title text here</h3>
    </div>

    <div class="c-card__body">
        <p>I would like to buy:</p>

        <ul class="l-list">
            <li class="l-list__item">
                <div class="c-checkbox">
                    <input id="option_1" type="checkbox" name="checkbox" class="c-checkbox__input">
                    <label for="option_1" class="c-checkbox__label">Apples</label>
                </div>
            </li>
            <li class="l-list__item">
                <div class="c-checkbox">
                    <input id="option_2" type="checkbox" name="checkbox" class="c-checkbox__input">
                    <label for="option_2" class="c-checkbox__label">Pears</label>
                </div>
            </li>
        </ul>
    </div>
</div>
```

Ngoài ra còn có nhiều vấn đề khác, hãy tham khảo [Battling BEM CSS](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/).

### b) Functional CSS || Atomic CSS || Utility-first CSS:
Chúng ta có thể gọi khái niệm này bằng 3 cách ở trên, nhưng mình thích `Atomic CSS`, vì Yahoo có 1 bạn có cái tên thế thật [Atomic](https://acss.io/).

Lấy ví dụ với `TailwindCSS`, việc sử dụng `TailwindCSS` giúp chúng ta: (good and bad)
* Tránh phải đối mặt với 1 cuộc nội chiến CSS, thoát khỏi cảnh `!important` và `inline CSS` - [A Specificity CSS](https://css-tricks.com/a-specificity-battle/).
* Không phải suy nghĩ chỗ này nên đặt tên là gì?
* Thay đổi thuộc tính màu sắc, spacing,... dễ dàng.
* Sửa màu cũ thành màu mới ở mọi page chỉ với 1 vị trí chỉnh sửa.
* Nhẹ hơn nếu việc sử dụng BEM cho cả 1 site dự án siêu bự.
* Có những class tên tối nghĩa (mx? px? tracking-tighter?).
* Không hỗ trợ cụ thể 1 kích thước cố định, ví dụ như việc design cần 1 bức ảnh kích thước chính xác 153px. Lúc này mình sẽ kết hợp `tailwind` vào `BEM` bằng `@apply`.
* Sửa nhiều chỗ khi ông designer thay đổi/cập nhật UI Design Patterns.

```html
<div class="text-red-500">
    Roses are red
    <div class="text-blue-500">
        Violets are blue
        <div class="text-orange-500">
            <span>
            Honey is sweet
            </span>
            <div class="text-pink-500">
            But not as sweet as you
            </div>
        </div>
    </div>
</div>
```

# III. From Atoms To Universe:
Dẫu chỉ là 1 `Design Thinking`, xong `Atomic Design` đã thể hiện được những ưu điểm rất tốt của mình. Và vì là `Design Thinking`, bạn không cần phải loại bỏ những giá trị cũ có sẵn được kế thừa từ trước, hãy đơn giản là áp dụng và cải thiện phương pháp vốn có, để cùng đạt được những thành tựu to lớn mang tầm `Vũ trụ` nhé 😉.

Bài viết có sự tham khảo từ:

* [Atomic Design and UI Components: Theory to Practice](https://blog.bitsrc.io/atomic-design-and-ui-components-theory-to-practice-f200db337c24).
* [How to structure a Vue.js app using Atomic Design and TailwindCSS](https://vuedose.tips/how-to-structure-a-vue-js-app-using-atomic-design-and-tailwindcss/).
*  [Atomic Design](https://atomicdesign.bradfrost.com/table-of-contents/).
*  [Battling BEM CSS](https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/)
*  [A Specificity CSS](https://css-tricks.com/a-specificity-battle/).
*  [Atomic CSS, Vì Một Thế Giới Hoà Bình](https://ehkoo.com/bai-viet/introduction-to-functional-utility-first-atomic-css).
*  Avatar bài viết: [A Boy And His Atom](https://www.youtube.com/watch?v=oSCX78-8-q0)

Cảm ơn các bạn đã đọc qua bài viết của mình. Hy vọng nhận được những đóng góp từ các bạn. 👏🏻