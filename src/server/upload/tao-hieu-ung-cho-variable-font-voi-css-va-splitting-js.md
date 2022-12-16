Trong bài viết này, tác giả sẽ giới thiệu cho người đọc biết variable font là gì, làm thế nào để biến tấu thành animate với CSS, và cách tạo hiệu ứng breathing effect với CSS cộng với một chút Javascript đổ vào.

### Variable Font là gì?
Variable Font hay còn gọi là Font chữ biến đổi, là một sự xuất hiện mới vô cùng thú vị trong giới typhography website. Thay vì ghép nối nhiều file font để tạo ra một loại font đặc biệt, thì variable font cho phép chúng ta tạo ra một biến thể chỉ từ một file. Mặc dù một file như này có dung lượng lớn hơn một file font bình thường, tuy nhiên đây vẫn là một cải tiến tạo hiệu suất tốt và tất nhiên, hãy chỉ sử dụng một variable font khi thật sự cần thiết.

Một font chữ, nhiều biến thể
Thay vì việc font-weight chỉ có sẵn trong các giá trị với min là 100 (ví dụ: *font-weight: 600*), thì variable font cung cấp một loạt các khoảng giá trị hơn thế, chỉ từ một file font. Font-weight có thể thay đổi trong một khoảng phạm vi, nên đừng thấy lạ nếu thấy xuất hiện giá trị *font-weight: 372*!

Trục biến thể

Trục biến thể - Axe of variation, trọng lượng ( tức *font-weight*) chỉ là một trong các trục biến thể, tuy nhiên lại là phổ biến nhất. Variable fonts có thể đi kèm với nhiều loại trục khác nhau. Trong số trục dưới đây có một số đã được đăng ký, tương ứng với 4 loại sau:

```
weight (wght)
width (wdth)
italic (ital)
slant (slnt)
optical size (opsz)
```
Chúng tương ứng với các giá trị sau trong CSS:
```
font-weight
font-stretch
font-style
font-style
font-optical-sizing
```
Không phải tất cả các variable font đều chứa tất cả các trục biến thế. Có một số chỉ chứa nhiều nhất là một hoặc hai trục.
Cũng có thể truy cập bằng cách sử dụng thuộc tính *font-variation-settings*. Thuộc tính này cho phép vừa điều chỉnh lẫn tùy chỉnh các trục tiêu chuẩn. Vì thế, *font-weight* có thể được xác định theo hai cách:
```
font-weight: 372;
```
Hoặc
```
font-variation-settings: 'wght' 372;
```
> Chúng ta có thể sử dụng `font-weight` cho các trình duyệt không hỗ trợ variable fonts.

### Tùy chỉnh trục
Việc tùy chỉnh trục sẽ tạo ra một phạm vị không giới hạn cho sự sáng tạo của các design. Một trục biến thể có thể tùy chỉnh thành bất cứ thứ gì - theo nghĩa đen, như *x-height*, một số kiểu sẽ khá phổ biến với các kiểu chữ, nhưng đa phần là sẽ sáng tạo hơn.
Việc tùy chỉnh trục có thể được truy cập bằng thuộc tính *font-variation-setting*, nhưng đối với các trục loại không dấu, tên thẻ bốn loại trục nêu ở trên buộc phải viết hoa. Variable font Movement của NM Type cung cấp các loại trục tùy chỉnh gọi là khoảng trắng (space), dùng để điều khiển độ công của các dạng chữ.
```
font-variation-settings: 'wght' 200, 'SPAC' 118;
```

{@embed: https://codepen.io/ngannk/pen/ExYNQNv}
### Tạo hiệu ứng cho variable font với CSS
*font-variation-settings* là một hiệu ứng chuyển động, vì nó bao gồm cả một phạm vi giá trị, và chúng ta có thể nhận được một số hiệu ứng CSS transition đơn giản hay keyframe animation. Font IBM Plex Sans có hai trục biến thể là *weight* và *width*. Đoạn code sau thiết lập hoạt ảnh lặp 1s của hai trục trên:
```
h1 {
	font-variation-settings: 'wght' 100, 'wdth' 85;
	animation: breathe 4000ms infinite forwards;
}

@keyframes breathe {
	60% {
		font-variation-settings: 'wght' 700, 'wdth' 100;
	}

	100% {
		font-variation-settings: 'wght' 100, 'wdth' 85;
	}
}
```

Và chúng ta có kết quả:

{@embed: https://codepen.io/ngannk/pen/bGbBLgb}

Ngoài ra, đây có thể là một hiệu ứng hover đẹp mắt với một transition thay vì là animation.

### Staggering the animation
Thay vì toàn bộ văn bản của chúng tôi hoạt hình ở cùng một tỷ lệ, có thể rất hay khi các mẫu chữ của chúng tôi được tạo hiệu ứng theo thứ tự. Chúng tôi có thể gói từng chữ cái trong văn bản của chúng tôi trong <span> và đặt độ trễ cho hình ảnh động trên mỗi chữ cái:
    
 Thay vì chạy hiệu ứng cho nguyên một đoạn text, có thể tách thành từng chữ và tạo hiệu ứng theo thứ tự. Có thể chia từng chữ cái một và đặt trong thẻ <span>, sau đó set *animation-delay* trên mỗi chữ:
```
<h1>
	<span>B</span>
	<span>r</span>
	<span>e</span>
	<span>a</span>
	<span>t</span>
	<span>h</span>
	<span>i</span>
	<span>n</span>
	<span>g</span>
</h1>
```
```
h1 span:nth-child(2) {
	animation-delay: 400ms;
}

h1 span:nth-child(3) {
	animation-delay: 800ms;
}

h1 span:nth-child(4) {
	animation-delay: 1200ms;
}
/* etc...*/
```
 
Việc này sẽ gây mất thời gian để viết (mặc dù có thể sử dụng Sass để được trợ giúp) và không dễ để maintain cho lắm nếu tương lai muốn thay đổi lại đoạn text văn bản này.
Không sao, có một thư viện có thể gạt bỏ mấy suy nghĩ lo xa đó. Splits.js sẽ khiến mọi thứ hoàn hảo và tiện lợi hơn rất nhiều.
    
### Splitting

Splitting chủ yếu dùng để tạo hiệu ứng cho text, mặc dù splitting cũng có thể phân chia thành các grid và layout cho một số hiệu ứng thú vị. Để sử dụng splitting, đầu tiên hãy add thư viện của nó vào dự án, sau đó set thuộc tính *data-splitting *cho phần tử muốn có hiệu ứng:
```
<h1 data-splitting>Breathing</h1>
```
 Giờ đoạn JS chúng ta chỉ cần gọi rất đơn giản:
```
Splitting()
```
```
<span class="word" data-word="Breathing" style="--word-index:0;">
	<span class="char" data-char="B" style="--char-index:0;">B</span>
	<span class="char" data-char="r" style="--char-index:1;">r</span>
	<span class="char" data-char="e" style="--char-index:2;">e</span>
	<span class="char" data-char="a" style="--char-index:3;">a</span>
	<span class="char" data-char="t" style="--char-index:4;">t</span>
	<span class="char" data-char="h" style="--char-index:5;">h</span>
	<span class="char" data-char="i" style="--char-index:6;">i</span>
	<span class="char" data-char="n" style="--char-index:7;">n</span>
	<span class="char" data-char="g" style="--char-index:8;">g</span>
</span>
```
    

Để tạo animation theo tuần tự, chúng ta có thể sử dụng *calc()* để tính toán giá trị *animation-delay* cho mỗi chữ cái từ các thuộc tính tùy chỉnh:
```
 h1 .char {
	--delay: calc((var(--char-index) + 1) * 400ms);
	animation: breathe 4000ms infinite both;
	animation-delay: var(--delay);
}
```
 Sử dụng Splitting sẽ giảm bớt được lượng CSS mà chúng ta cần viết, đồng thời giúp chúng ta thay đổi dòng văn bản thoải mái mà vẫn có hiệu ứng tuyệt vời.   
 
### Nguồn
1. MDN’s Variable Fonts Guide - Đây là một nguồn tài liệu tuyệt vời nếu muốn tìm hiểu về variable fonts và các sử dụng chúng.

2. V-Fonts
Đây là một kho chứa với hàng trăm variable fonts, bao gồm cả các loại trục biến thể. Ở đây bao gồm các font chữ free và trả phí, một nơi tuyệt vời để có một font ưng ý mà không cần phải bòn rút túi tiền của mình.

3. Axis-Praxis
Axis-Praxis là một sân chơi để trải nghiệm các loại variable font cùng cơ hội thử thách sáng tạo không giới hạn.

4. VariableFonts.dev
 Đây là một dự án của Mandy Michael, một người nổi tiếng trong thế giới CSS vì đã tạo ra những bản demo đầy cảm hứng với variable font trên toàn thế giới.
    
Lược dịch từ tài liệu tham khảo [link](https://css-irl.info/variable-font-animation-with-css-and-splitting-js/?utm_source=CSS-Weekly&utm_campaign=Issue-374&utm_medium=web)