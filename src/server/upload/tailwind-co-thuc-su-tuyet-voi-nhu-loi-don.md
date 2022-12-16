"Chị ong nâu nâu nâu nâu. Chị bay đi đâu đi đâu?" Mình thì thời gian qua đã bay đến một vùng trời mới, lần đầu trải nghiệm một dự án sử dụng tailwind và bài viết này cũng ra đời từ đó. 
![tailwind-pre.png](https://images.viblo.asia/b708e821-f9a6-4205-8769-a48b9a2d6700.png)
### Vậy thì tailwind là gì?
> Tailwind không chỉ là một CSS framework, đây chính là nền tảng tạo nên cả một hệ thống thiết kế. — Tailwind website

Theo như định nghĩa trên trang chủ Tailwind thì nó là một utility-first CSS framework. Đúng vậy, nó không phải là một UI kit với những components xây dựng sẵn, nó chẳng có components nào cả và cũng không có một default theme luôn. Như thời gian qua mình có sử dụng em nó thì tailwind css đơn giản là một framework mà tất cả các thuộc tính css của nó đã được viết sẵn, khi sử dụng thì chỉ cần gọi tên class ra thôi.

Chúng ta thường dùng CSS như thế này nhỉ?
```css
.btn {
    display: inline-block;
    border: 1px solid #34D399;
    background-color: transparent;
    border-radius: 0.375rem;
    padding: 0.5rem 1.5rem;
    color: #34D399;
    line-height: 1;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 300ms, color 300ms;
}

.btn:hover {
    background-color: #34D399;
    color: #FFF;
}
```

Nhưng đây, đối với tailwind thì sẽ trông như thế này:
```html
<button class="inline-block border border-green-400 bg-transparent rounded-md py-2 px-6 text-green-400 leading-none cursor-pointer hover:bg-green-400 hover:text-white transition-colors duration-300">
    Example
</button>
```
Đối với ví dụ trên thì bạn thấy tailwind vô cùng ngắn gọn, xúc tích và tiện lợi phải không? Nhưng trong chăn thì mới biết chăn có rận, cái nào cũng có mặt xấu và mặt tốt của nó cả. Vậy cùng nhau tìm hiểu thử nhé!
### Nét đẹp của Tailwind CSS
Ưu điểm nổi trội của Tailwind CSS không thể không nhắc đến đó là:

* Bạn không cần viết 1 dòng css nào mà chỉ cần thêm class để tạo giao diện, bạn không cần phải đau đầu suy nghĩ tên class để đặt cho các div.
* Các tên class của tailwind rất dễ nhớ, dễ hiểu và thân thiện với người dùng, 1 class đại diện cho 1 thuộc tính.
* Rất dễ dàng sử dụng flex để chia Layout, rất linh động.
* Cải thiện hiệu suất vì giảm thiểu các việc trùng lặp thuộc tính. Có nhiều plugin hỗ trợ loại bỏ các class thừa không sử dụng, giảm thiểu việc có mặt trong việc khai báo ở class HTML.
* Không phải lo lắng về việc sửa ở một chỗ này có thể chết ở chỗ khác do việc sử dụng cascading tạo ra.
* Tài liệu khá là chi tiết, bao gồm tất cả cách sử dụng chi tiết của class và chỉ dẫn nhiều cách tùy chỉnh khác nhau. Bạn có thể tìm hiểu [tại đây](https://tailwindcss.com/docs/responsive-design). 
### Điểm chưa đẹp của Tailwind CSS
Bên những ưu điểm trên thì nó cũng có những nhược điểm sau:
* Khi sử dụng tailwind thì bạn sẽ thấy là số lượng class cực kì nhiều, số class sẽ tương ứng với số thuộc tính mà bạn muốn cài đặt. Ví dụ như mình muốn custom một bé radio nhỏ thì số class có thể như thế này:
```html
<input
    type="radio"
    className={clsx(
        {
          'relative checked:bg-white checked:border-2 checked:border-blue-500 hover:checked:border-2 hover:checked:border-blue-500 focus:checked:border-2 focus:checked:border-blue-500 hover:checked:bg-white focus:checked:bg-white before:content-before before:w-2 before:h-2 before:rounded-full before:bg-blue-500 before:absolute before:top-[2px] before:left-[2px]': checked,
          },
          'form-radio mt-1 cursor-pointer focus:outline-none focus:shadow-none focus:ring-offset-white focus:ring-offset-0 focus:ring-white',
        )}
/>
```

* Mình nghĩ đây cũng là một điểm trừ đó là sẽ mất nhiều thời gian cho những bạn mới bắt đầu vì chưa quen làm quen được hết các class của tailwind. Phải cần có thời gian để có thể nhớ về các quy tắc và cách thức viết cho đúng chuẩn.
* Khi dùng font-size hoặc màu sắc vẫn đang còn phải custom lại bằng css riêng.
* Đương nhiên thì nó cũng không thể nào đủ hết 100% thuộc tính css nên bạn cần phải config thêm khi muốn sử dụng. Mình đã từng tốn khá nhiều thời gian tìm hiểu để config và tạo ra 1 cái before, config như này nè:
```js
plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        '.content': {
          content: 'attr(data-content)',
        },
        '.content-before': {
          content: 'attr(data-before)',
        },
        '.content-after': {
          content: 'attr(data-after)',
        },
      };

      addUtilities(contentUtilities, ['before', 'after']);
    }),
```
Sau đó mới biết là phiên bản mới nhất của tailwind đã có hỗ trợ rồi. Nên bạn cứ yên tâm là trong tương lai tailwind nâng cấp và sẽ lấp đầy tất cả các thuộc tính của css nhé.

### Tổng kết
Ở bài viết này mình chỉ giới thiệu qua tailwind là gì để bạn đưa ra sự lựa chọn của mình, bài viết sau mình sẽ giới thiệu nhiều hơn về các thủ thuật khi sử dụng tailwind nè. Để sử dụng tốt cái tailwind này thì bạn phải thực hành nhiều để nhớ các class để có thể khai thác cái tiện ích nhất của tailwind. Chúc bạn thành công khi sử dụng tailwind nhé!

Cảm ơn bạn đã dành thời gian đọc bài viết!