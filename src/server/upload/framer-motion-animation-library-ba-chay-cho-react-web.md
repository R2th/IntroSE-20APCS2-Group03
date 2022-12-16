Bạn đã chán ngấy khi làm việc với những trang web bất động? Bạn muốn thổi hồn vào những ứng dụng web của mình? Bạn muốn làm cái gì đó sinh động hơn, sáng tạo hơn. Vậy còn chờ gì mà không dùng [**Framer Motion**](https://www.framer.com/motion/)? 🥳 Cùng mình khám phá vài sự thú vị với thư viện này nhé.

![Framer Motion](https://images.viblo.asia/d3d2c44a-7833-4002-8291-1aa4990c2ce6.png)

# Một chút "background"

Framer Motion là một **animation/motion library** (thư viện hoạt hình/chuyển động? dịch ra nghe cứ sao sao nhỉ, thôi thì mình xin phép không Việt hóa những từ nặng về technical). Framer Motion được [Matt Perry](https://github.com/mattgperry) phát triển dành riêng cho các ứng dụng, trang web được xây dựng bằng ReactJS, là một *high level* library được dựng lên từ cái nền móng kiên cố là [Popmotion](https://popmotion.io/) (cùng tác giả). *High level* ở đây có nghĩa là bên trong library đã được xử lý khá nhiều cơ chế và logic chuyển động cực kỳ phức tạp, cung cấp một bộ API tường minh, dễ sử dụng và linh hoạt, giúp chúng ta nhẹ đầu và có thời gian nhâm nhi tách cafe ☕ khi làm việc với library này.

> Dành cho những bạn quan tâm tác giả thì ngoài Framer Motion và Popmotion, Matt cũng phát triển cả [Motion One](https://motion.dev/) (chỉ là một pet project của anh thôi đấy 😳), một animation library khác sử dụng Web Animations API hiện đại, có kích thước siêu gọn, nhưng cũng siêu nhanh và dễ sử dụng không kém.

# Bá cháy làm sao?

Một số tính năng vượt trội được tác giả và team phát triển liệt kê trên chính [trang chủ](https://www.framer.com/motion/) như sau:

* Cú pháp khai báo animation đơn giản, ngắn gọn -> giảm số lượng code -> codebase dễ đọc, dễ maintain.
* Animation giữa 2 component được tự động xử lý một cách rất là "magic".
* Hỗ trợ nhiều thao tác và event listener phức tạp như: tap, drag, hover, viewport...
* Nhiều kiểu animation như **spring** (kiểu chuyển động đàn hồi tự nhiên), **tween** (chuyển động theo thời gian) hay **inertia** (chuyển động theo quán tính) đều được "mỳ ăn liền" hóa, chúng ta có thể sử dụng ngay mà không cần cài đặt gì, hoặc vẫn có thể dễ dàng cài đặt và kiểm soát hoàn toàn animation theo ý mình.
* Và còn nhiều tính năng khác như hỗ trợ SSR, unmount animation, accessibility... vân vân mây mây...

![Show me code](https://media.makeameme.org/created/enough-blah-blah.jpg)

Để thấy được độ khét của Framer Motion qua ví dụ trực quan, mình có làm một cái codepen dựng lại kiểu bố cục thông dụng của một trang web e-commerce như bên dưới, các bạn tham khảo nhé:

{@embed: https://codepen.io/khangnd/pen/QWQLwjg}

Bố cục này gồm 3 mảng chính:

* Thanh **header** ở trên cùng, chứa logo và các link điều hướng.
* Khung **sidebar** bên tay trái, có thể chứa các danh mục sản phẩm hay bộ lọc.
* Phần **content** bên phải, chứa danh sách các sản phẩm.

## Animation API đơn giản

Ở codepen trên, các bạn có thể thấy mình chỉ cần import duy nhất một component là `motion` từ library (tạm thời mình đừng quan tâm tới `AnimatePresence`), bất kể bạn đang dùng thẻ HTML nào, chỉ cần thêm tiền tố `motion.` trước tên thẻ là có thể bắt đầu tạo animation cho thẻ đó, ví dụ `motion.div`, `motion.span` hay `motion.li`.

Việc tạo animation đơn giản chỉ cần khai báo một object chứa các animation ta muốn trong thuộc tính là `animate` hoặc đối với các thao tác như `tap` thì dùng thuộc tính `whileTap`, focus thì dùng `whileFocus`.

Như ở codepen trên, đối với logo, khi mình hover chuột lên thì các bạn có thể thấy **logo phình to lên** một tí, nhờ khai báo animation `scale` như sau:

```jsx
// line 12
<motion.div className="logo" whileHover={{ scale: 1.2 }} />
```

Tương tự, nếu muốn logo dịch **sang phải 10px** khi hover, chỉ cần thay `scale: 1.2` thành `x: 10`:
```jsx
<motion.div className="logo" whileHover={{ x: 10 }} />
```

Hoặc kết hợp nhiều animation cùng lúc:
```jsx
<motion.div className="logo" whileHover={{ scale: 1.2, x: 10 }} />
```

Đơn giản chưa? 😃 Các bạn cứ fork pen về mà nghịch nhé.

> *Đọc thêm:*
> * https://www.framer.com/docs/animation/#simple-animations
> * https://www.framer.com/docs/gestures/

## Variants thông minh

`Variants` là một thuộc tính khác của motion component, cho phép chúng ta nhóm nhiều animation lại với nhau (thành những ~~biến thể~~/trạng thái). Ví dụ như một button có thể có nhiều trạng thái như: default, hover, active, focus; hoặc một dialog có 2 trạng thái như: close, open. Mỗi trạng thái sẽ có những animation khác nhau được khai báo và `variants` giúp dễ quản lý chúng, khi cần `animate` như thế nào thì chỉ cần trỏ đến trạng thái đó.

Như ở codepen trên, mình đặt 2 trạng thái là *collapse* và *expand* cho khung sidebar. Khi bấm vào nút mũi tên thì sẽ thu gọn/mở rộng sidebar tương ứng và dựa theo trạng thái đó để animate:

```jsx
// line 35
const listVariants = {
    collapse: { width: 0 },
    expand: {
        transition: { staggerChildren: 0.2 }
    }
};

// line 57
<motion.ul
    variants={listVariants}
    animate={isCollapsed ? "collapse" : "expand"}
>
    ...
</motion.ul>
```

Ngoài ra, `variants` còn cho phép chúng ta **propagate** (animate những component con dựa theo trạng thái của cha) và **orchestrate** (kiểm soát thời gian, delay của chúng từ component cha). Như trong codepen:

```jsx
// line 42
const itemVariants = {
    collapse: { opacity: 0 },
    expand: { opacity: 1 }
};

// line 62
<motion.li key={i} variants={itemVariants} ... />
```

Các `li` chỉ cần khai báo `variants` ứng với trạng thái của `ul` cha thì chúng sẽ được tự động animate biến mờ dần theo cha (propagation). Và nếu các bạn để ý, trong `listVariants` của `ul` cha, mình có dùng một thuộc tính là `staggerChildren`, thuộc tính này cho phép delay animation của từng component con theo một khoảng thời gian nhất định, ví dụ ở đây là 0.2s thì component con thứ 1 sẽ delay 0s, component con thứ 2 sẽ delay 0.2s, component con thứ 3 sẽ delay 0.4s... và cứ thế (orchestration).

> *Đọc thêm:*
> * https://www.framer.com/docs/animation/#variants
> * https://www.framer.com/docs/transition/#orchestration

## Unmount và layout animation

Một trong những khả năng ***ảo diệu*** của Framer Motion là đây. Trong codepen, tính năng unmount và một phần layout animation được mình thể hiện ở các link điều hướng. Các bạn có thể thấy, khi nhấp vào một link điều hướng, link này được "hai lai" màu xanh, sau đó chọn sang một link khác thì ô màu xanh như được "di dời" sang cái link mới đó. Đó chính là nhờ vận dụng thuộc tính `layoutId` của motion component và một component gọi là `AnimatePresence`:

```jsx
// line 15
<a key={i} onClick={() => setActiveElem(i)}>
    <AnimatePresence>
        {activeElem === i && (
            <motion.span
                layoutId="navlink"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
            />
        )}
    </AnimatePresence>
</a>
```

Logic mình xử lý ở đây là, mỗi thẻ `a` (link điều hướng) sẽ lồng một thẻ `span` (highlighter màu xanh), khi nhấp chọn một link thì hiển thị highlighter của link đó lên bằng cách mount component, sau đó animate `opacity` từ trạng thái ban đầu (initial) là 0 sang 1.

Mặc định, chúng ta chỉ có thể animate một component khi nó được mount vào cây DOM của React, để animate component cả khi nó được unmount thì Framer Motion có cung cấp component `AnimatePresence` giúp ta thực hiện điều đó. Chỉ cần bọc `AnimatePresence` bên ngoài component cần xử lý unmount animation, rồi khai báo thêm một thuộc tính là `exit` cho motion component là xong.

Các thẻ `span` mình chỉ cần khai báo cùng một `layoutId`, Framer Motion sẽ tự động xử lý layout animation như đang chuyển highlighter từ component này sang component kia.

Giờ các bạn thử chọn một button trong sidebar, sẽ thấy được sự ảo diệu của layout animation được thể hiện rõ hơn nữa. Các button này mình đang xử lý như một filter button, khi chọn một button, danh sách sản phẩm bên phía content sẽ được lọc tương ứng. Các bạn có thể thấy các ô sản phẩm bên tay phải bay nhảy mỗi khi chúng ta thay đổi filter, ảo diệu chưa 🤯 Chỉ đơn giản là khai báo thêm một thuộc tính `layout` cho motion component là chúng ta có ngay một animation cực kỳ "magic":

```jsx
// line 82
<motion.li
    layout
    className={[5, 17].includes(i) && "highlighted"}
    whileHover={{ y: -5 }}
>
    {i}
</motion.li>
```

![Magic gif](https://i.pinimg.com/originals/73/e5/53/73e55358e7b0703f20602b01b408e9e6.gif)

> *Đọc thêm:*
> * https://www.framer.com/docs/animate-presence/
> * https://www.framer.com/docs/animation/#layout-animations
> * https://www.framer.com/docs/animation/#shared-layout-animations

# "To Infinity and Beyond"

Ngoài những tính năng cơ bản được thể hiện qua những ví dụ đơn giản ở codepen trên, Framer Motion còn rất rất nhiều tính năng xịn xò và cao cấp hơn, ví dụ như các dạng animation (spring, tween, inertia), khả năng tự do tùy chỉnh transition, sử dụng dynamic variants, hay animate component bằng code nhờ các animation control... Tất cả đang chờ các bạn [khám phá](https://www.framer.com/docs/)! Hãy đem lại sức sống cho trang web, ứng dụng của mình! Hãy để user phải trầm trồ bởi sự sáng tạo, trí tưởng tượng của bạn, cho họ cảm giác thích thú khi được trải nghiệm một sản phẩm kỹ thuật nhưng có tính nghệ thuật cao. 😆

(Nhưng mà các bạn nhớ là "cái gì quá cũng không tốt" nhé, quá nhiều animation có thể sẽ làm phản tác dụng, khiến trải nghiệm của người dùng trở nên tệ hơn. Chỉ sử dụng chứ đừng lạm dụng!)

Cảm ơn các bạn đã theo dõi bài viết ✌

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)