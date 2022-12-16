# Một sáng Chủ nhật vui vẻ,

Vâng, chào các bạn, lại là mình với 1 bài mới về chủ đề quen thuộc trong frontend là CSS. Khác với thường lệ, nay mình muốn các bạn cùng mình tham gia một câu đố vô cùng thú vị mà mình cá là sau đó bạn sẽ học thêm được những điều rất bổ ích đó. :sunglasses:

Nói qua về câu hỏi, đây là câu hỏi đã được đặt ra bởi một nữ frontend developer, diễn giả, nhà soạn vô cùng nổi tiếng mà mình có follow là [Lea Verou](https://twitter.com/LeaVerou). Các bạn hãy tự trả lời trước rồi mỡi xem đáp án nha, như vậy mới học hỏi được thêm nhiều điều nè...

Như chiếc tiêu đề của bài, mình đây, một chàng trai khá tự tin về CSS, đã trả lời sai. Vậy nên mình đã quyết định chia sẻ nó tới các bạn... Càng nhiều người sai cùng mình càng vui mà. Còn đúng thì mình càng vui hơn nữa. :stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

# Bắt đầu thôi, đừng xem đáp án trước nha :wink:

Vâng, trước tiên ta có 1 đoạn code quen thuộc như sau:

```css
:root {
    --accent-color: skyblue;
}

div {
    --accent-color: revert;
    background: var(--accent-color, orange);
}
```

Nếu bạn nào chưa rõ về các khái niệm kế thừa trong CSS thì có thể tìm hiểu qua ở đây để trả lời đúng hơn nhé:  [*"Bạn đã thật sự hiểu giá trị “Initial”, “Inherit” và “Unset” trong CSS?"*](https://viblo.asia/p/ban-da-that-su-hieu-gia-tri-initial-inherit-va-unset-trong-css-RQqKLPwOK7z)

:sunglasses: **Không** \
:stuck_out_tongue_closed_eyes: **được**\
:roll_eyes: **xem**\
:kissing_heart: **trước**\
:innocent: **đáp**\
:thinking: **án!!!**

Vâng, và đây là kết quả trả lời của rất nhiều các developers trên thế giới, trong đó có mình. Đương nhiên như tiêu đề thì mình đã sai... 

![](https://images.viblo.asia/ea6eef6a-0d15-4d81-9cfc-40542c4a6ffb.png)

# Đáp án là?
Vâng, đừng bất ngờ khi đáp án đúng của chúng ta là: `skyblue` (chỉ chiếm 18.1%) nha các bạn!

# Lý do mình sai, bạn giống mình không?

Mình cá là sau một hồi suy luận, không ít người sẽ nghĩ giống mình như sau:
1. Ban đầu `--accent-color` có giá trị là `skyblue`.
2. Xong trong block `div` lại bị set lại thành `revert`, mà `revert` thì lại là set về mặc định theo một cách nào đó, chi tiết ở đây nha: [MDN docs revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert).
3. Nhưng dù theo cách nào thì mặc định cũng không thể có nơi nào khai báo thuộc tính `--accent-color` được nên sau khi `revert` biến này sẽ là 1 kiểu nào đó không có giá trị chăng!? :thinking:
4. Nghe chừng hợp lý, vậy thì nếu lấy `var(--accent-color, orange)`, chắc chắn nó sẽ trả về fallback color là `orange` rồi. Vậy đáp án là `orange`. :no_mouth:

Mình đã nghĩ **"Xời, quá dễ, lại còn đông người vote giống mình, đúng là cái chắc :sunglasses:"**... Nhưng sau khi cô nàng của chúng ta công bố đáp án, mình đã ngã ngửa. Bộ phim "Người nhà quê" đảm bảo phải mời mình làm diễn viên chính mất.:flushed::sweat:

![](https://images.viblo.asia/c7a9a507-4b11-4def-b05c-090c97c5b066.jpg)

Đùa vậy thôi, chứ đến ông đồng nghiệp, cùng phát triển [CSS Cascading and Inheritance](https://drafts.csswg.org/css-cascade/#default) (nơi định nghĩa `revert`), của Lea Verou là [Tab Atkins](https://xanthir.com/) còn trả lời sai như chúng ta thì không có gì phải "xấu hổ" cả các bạn ạ... :rofl:

# Lời lý giải của tác giả

Mình xin được chia sẻ lại chi tiết cách giải thích của chị Lea và thêm một số diễn giải dễ hiểu hơn của riêng mình ở dưới đây nhé! :relaxed:

Hãy bắt đầu bằng những gì mà `revert` thực hiện: Nó sẽ set lại mặc định giá trị xếp theo tầng của thuộc tính, từ giá trị hiện tại của nó thành giá trị mà thuộc tính sẵn có (khi mà chưa có thay đổi nào được thực hiện bởi style nguồn đối với phần tử hiện tại). Cái này có vẻ khó hiểu một chút, các bạn đọc link về revert mình có nêu ở trên để hiểu cụ thể hơn nhé. :innocent:

Tức là mọi giá trị mà tác giả/người phát triển tạo ra sẽ được đặt về theo *[style người dùng tự định nghĩa (user stylesheets)](https://www.thoughtco.com/user-style-sheet-3469931)* hoặc *[style mặc định trên trình duyệt (user argent stylesheets)](https://stackoverflow.com/a/35526793)*. Mà đương nhiên theo như thường lệ, gần như ta biết ở cả 2 stylesheets trên, đều không có sẵn thuộc tính `--accent-color`, trừ khi người dùng đã định nghĩa nó trên trình duyệt của họ trước đó nhưng ta bỏ qua trường hợp này. Vì vậy sau khi `revert`, thuộc tính của chúng ta sẽ không được đặt giá trị nào nữa. 

Mà như [MDN docs revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert), trong trường hợp này `revert` sẽ có tính năng tương tự như `unset`. Các bạn có thể đọc thêm `unset` tại đây: [MDN docs unset](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)

> If used within the user agent's default styles, this keyword is functionally equivalent to unset.

> The unset CSS keyword resets a property to its inherited value if the property naturally inherits from its parent, and to its initial value if not.

Hơn nữa, thuộc tính tuỳ chỉnh của CSS lại có thể kế thừa được (trừ khi ta [đăng ký](https://drafts.css-houdini.org/css-properties-values-api-1/#registered-custom-property) là `inherits: false`, mà ở đây thì không), nên ta có thể nhận định ở đây, giá trị `bluesky` đã được kế thừa từ `:root` sau khi áp dụng `revert`. Thật xoắn cả não ý chứ nhỉ? :rofl:

Các bạn có thể tự xem ở [Codepen](https://codepen.io/leaverou/pen/zYZZpaY?editors=1100) này nha:

{@codepen: https://codepen.io/leaverou/pen/zYZZpaY?editors=1100}

Vậy nếu như thuộc tính của chúng ta được đăng ký là không kế thừa (non-inheriting) thì sao? Liệu nó có ra được màu `orange` không nhỉ? Nghe chừng thú vị đó, nhưng không! Bởi khi ta đăng ký một thuộc tính, bắt buộc phải cho nó giá trị khởi tạo, vì thế thuộc tính ngay lập tức sẽ được phân giải có một giá trị cụ thể. Kể cả ta có đặt `--accent-color` thành `initial` thì nó cũng không có tác dụng gì, và fallback cũng không thể được kích hoạt để có được màu `orange`. Chi tiết ở [Codepen](https://codepen.io/leaverou/pen/qBrrpKZ?editors=1100) này nữa nha (Nhớ xem [caniuse](https://caniuse.com/mdn-css_at-rules_property) để biết trình duyệt của bạn có hỗ trợ @property trong CSS đã không nhé):

{@codepen: https://codepen.io/leaverou/pen/qBrrpKZ?editors=1100}

# Giải đố kết thúc...
Thế là chúng ta đã vừa xoắn tít cả não với một câu đố tưởng chừng vô cùng đơn giản, cảm ơn các bạn đã cùng mình tham gia nhé. Mong là sau bài viết "gây lú" này thì chúng ta đều đã học được thêm thật nhiều kiến thức bổ ích ạ. :sunglasses::stuck_out_tongue_closed_eyes::stuck_out_tongue_closed_eyes:

Chúc các bạn cuối tuần vui vẻ, đi bầu cử cũng vui vẻ và hẹn gặp lại các bạn trong các bài viết tiếp theo của mình nhé. Peaceeeeee! :wave:

___
[Tham khảo](https://lea.verou.me/2021/05/82-of-developers-get-this-3-line-css-quiz-wrong/)