Với các dự án lớn, có độ phức tạp cao, cách bạn tổ chức code của mình là chìa khóa để cho dự án đó làm việc hiệu quả. Hãy trả lời 3 câu hỏi sau: nó ảnh hưởng đến thời gian bạn viết code? bạn sẽ phải viết bao nhiêu mã code? khối lượng dữ liệu browser của bản sẽ phải load?

Điều này đặc biệt quan trọng khi bạn làm việc trong một dự án có nhiều dev cùng tham gia phát triển, sẽ rất cần một quy chuẩn để tất cả mọi người áp dụng. Cũng như việc dự án của bạn cần làm việc với hiệu suất cao.

Với những dự án dài hơi, việc chuyển giao code cũ code mới, dev cũ dev mới cũng rất cần một quy chuẩn.

Có rất nhiều phương pháp để cấu trúc code CSS, tổ chức hợp tác giữa các dev và duy trì các khối code CSS lớn. Điều này là rõ ràng trong các dự án khủng như Twitter, Facebook và Github; nhưng các dự án khác, thường thì tập tin CSS phát triển khá nhanh chóng, sẽ phình to ra nhanh chóng. Một số phương pháp như:

![](https://images.viblo.asia/40e53b8a-becc-4a53-885c-28effdff5d43.jpg)

- [OOCSS](http://oocss.org/)
- [SMACSS](https://smacss.com/)
- [SUITCSS](http://suitcss.github.io/)
- [Atomic](https://github.com/nemophrost/atomic-css)

Nhưng trong nội dung bài viết này, mình xin giới thiệu đến các bạn phương pháp [BEM](en.bem.info).

#### Tại sao lại là BEM.

Các hương pháp trên đều có những ưu điểm của nó, và nếu bạn chọn phương pháp nào để sử dụng trong các dự án của mình thì bạn đều được hưởng lợi từ những lợi thế của nó với CSS và UI sẽ được cấu trúc tốt hơn, rõ ràng hơn. Một số phương pháp có quy tắc ít nghiêm ngặt, linh hoạt hơn; trong khi đó lại có những phương pháp dễ hiểu và dễ thích nghi hơn cho dev trong dự án.

Lý do tôi chọn **BEM** so với các phương pháp khác là nó ít gây nhầm lẫn hơn các phương pháp khác (ví dụ: SMACSS), nhưng **BEM** vẫn cung cấp một kiến trúc tốt mà ta muốn và với một thuật ngữ dễ nhận biết.


#### Naming

**BEM** là tên viết tắt của các yếu tố chính của phương pháp: **Block** - **Element** - **Modifier**.

> There are only two hard problems in Computer Science: cache invalidation and naming things — Phil Karlton

Một thực tế rằng một cấu trúc style tốt có thể làm tăng đáng kể tốc độ phát triển, debug, và giúp cho việc phát triển các tính năng mới. Tuy nhiên, hầu hết các style đôi khi được phát triển mà không có bất kỳ cấu trúc hoặc quy ước đặt tên nào. Điều này dẫn đến không thể hoặc là rất khó để duy trì và phát triển thêm được trong dài hạn.

**BEM** đảm bảo rằng tất cả dev tham gia vào việc phát triển một dự án sẽ làm việc với cùng một quy chuẩn. Sử dụng cách đặt tên thích hợp sẽ chuẩn bị cho bạn những thay đổi trong thiết kế của dự án.

Hãy cùng đi cụ thể vào từng thành phần của phương pháp **BEM** nhé.

#### Block

Là một thực thể độc lập có ý nghĩa riêng. Các block có thể lồng vào nhau cũng như là tương tác với nhau, về ngữ nghĩa thì chúng ngang hàng nhau. Không có ưu tiên hay phân cấp giữa các block.

- Naming: Tên block có thể bao gồm chữ cái Latinh, chữ số và dấu gạch ngang. Để tạo một lớp CSS, hãy thêm một tiền tố ngắn cho việc đặt tên, vd: `.block`.
- HTML: Bất kỳ nút DOM nào cũng có thể là một khối nếu nó có tên `class`, vd: `<div class='block'>...</div>
`
- CSS: vd: `.block { color: #042; }`
    - Chỉ sử dụng `class`.
    - Không có `tag` hoặc `id`.
    - Không phụ thuộc vào block/element khác trong page.
    
#### Element

Là một thành phần của một block và nó không có ý nghĩa độc lập. Bất kỳ element nào được liên kết ngữ nghĩa với block của nó.

- Naming: Tên element có thể bao gồm các chữ cái Latinh, chữ số, dấu gạch ngang và dấu gạch dưới. Lớp CSS được tạo thành bằng tên block cộng với hai dấu gạch dưới cộng với tên tên element, vd: `.block__elem`
- HTML: Bất kỳ nút DOM nào trong một block cũng có thể là một element. Trong một block nhất định, tất cả các element đều giống nhau về mặt ngữ nghĩa. vd: 
    ```html
    <div class='block'>
	  ...
	  <span class='block__elem'></span>
	</div>
    ```
- CSS: 
    - Chỉ sử dụng `class`.
    - Không có `tag` hoặc `id`.
    - Không phụ thuộc vào block/element khác trong page.
    
 vd: `.block__elem { color: #042; }`, hoặc có thể viết như sau:
     ```css
     .block {
       .&__elem { color: #042; }
     }
     ```
     
#### Modifier

Là flag trên các block hoặc element. Sử dụng chúng để thay đổi hành vi hoặc trạng thái.

- Naming: Tên modifier có thể bao gồm các chữ cái Latinh, chữ số, dấu gạch ngang và dấu gạch dưới. Tên class CSS được tạo bởi tên block hoặc element thêm dấu `--`, các khoảng trắng bên trong các modifier phức tạp được thay thế bằng các dấu `-`, vd: `.block--mod`, `.block__elem--mod`, `.block--color-black`.
- HTML: Tên modifier là tên lớp bổ sung mà bạn thêm vào nút DOM của block hoặc element đó. vd:
    ```html
    <div class='block block--mod'>...</div>
    
	<div class='block block--size-big block--shadow-yes'>...</div>
    ```
- CSS: Sử dụng tên lớp của modifier làm công cụ chọn, vd: `.block--hidden { }`, của block `.block--mod .block__elem { }`, của element `.block__elem--mod { }`

#### Ví dụ:

Giả sử ta có block `form` với modifier `theme: 'xmas'` và `simple: true`, block có element `input` và `submit`, element `submit` thì có modifier `disable: true`

```html
<form class='form form--theme-xmas form--simple'>
  <input class='form__input' type='text' />
  <input class='form__submit form__submit--disabled' type='submit' />
</form>
```

```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

#### Kết

Với việc cấu trúc file css, ta sẽ dễ dàng hơn trong việc triển khai, phát triển một dự án, đặc biệt là những dự án lơn, những dự án dài hơi, dự án yêu cầu hiệu năng cao.

Cám ơn bạn đã theo dõi bài viết.

***
 
#### Tham khảo.

- http://getbem.com/introduction/