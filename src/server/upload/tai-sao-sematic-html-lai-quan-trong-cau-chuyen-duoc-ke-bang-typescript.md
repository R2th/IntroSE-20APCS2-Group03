HTML không chỉ là nền tảng mà chúng ta xây dựng trang web của mình trên đó, nó đóng một vai trò quan trọng trong việc đưa trang web của chúng ta hoạt động như mong đợi trên các nền tảng và công nghệ khác. Nếu bạn sử dụng HTML đạt đến cảnh giới mạnh nhất của nó thì bạn không chỉ tận dụng tối đa các tính năng được xây dựng mà bạn đang làm cho nó hoạt động hiệu quả hơn cho mọi người, bot và cho bất kỳ công nghệ nào, không chỉ bây giờ mà trong tương lai sau này.

Với sự tập trung ngày càng tăng vào JavaScript trong Front End Development và giảm sự quan tâm cũng như đánh giá thấp giá trị của HTML, mình đã dành thời gian cố gắng tìm ra cách giải thích cho các bạn có khuynh hướng chỉ tập trung học Javascript có định hướng hiểu tại sao việc học & nắm vững HTML lại là điều cực kỳ quan trọng.

Vì vậy mình quyết định làm một bài post về chủ đề "Tại sao Sematic HTML lại quan trọng, câu chuyện được kể bằng Typescript".

```
interface hooman {
    name: string
    age: number
    loveCat: boolean
}
```
*TypeScript Interface về hooman.*

*TypeScript là một dự án mã nguồn mở được phát triển bởi Microsoft, nó có thể được coi là một phiên bản nâng cao của Javascript bởi việc bổ sung tùy chọn kiểu tĩnh và lớp hướng đối tượng mà điều này không có ở Javascript. TypeScript có thể sử dụng để phát triển các ứng dụng chạy ở client-side (Angular2) và server-side (NodeJS).*

Ở phía trên mình có định nghĩa một interface tên là `hooman` với thuộc tính `name` là dạng `string`. Nếu mình cố tình gán thuộc tính `name` với giá trị bất kỳ là kiểu `number` thì Typescript sẽ báo lỗi ngay lập tức.
Về cơ bản, chúng ta nói với TypeScript những gì chúng ta mong đợi và điều này làm cho việc gỡ lỗi, viết, đọc và làm việc với code của chúng ta dễ dàng hơn nhiều vì chúng ta đã định nghĩa rõ ràng về kiểu của dữ liệu.

Đối chiếu sang HTML, chúng ta cũng cần phải định nghĩa như vậy khi sử dụng các thẻ HTML.
```
<html>
    <body>
        <header>
            <h1>Hooman are boss</h1>
        </header>
        <main>
            <h2>Why Hooman are good?</h2>
            <p>Because my cat said so.</p>
            <img src="hooman.jpg" alt="Hooman are good">
            <blockquote>We're all good inside but bad outside</blockquote>
        </main>
    </body>
</html>
```

Chúng ta phải chỉ định chỗ nào cần dùng thẻ heading (h1,h2,...), chỗ nào cần danh sách (ul, ol), chỗ nào cần dùng thẻ ảnh (img), câu trích dẫn (blockquote)...
Khi chúng ta định nghĩa các thành phần trong trang web một cách rõ ràng & đúng nghĩa, sử dụng đúng thẻ cho những mục đích khác nhau thì khi các công nghệ khác tương tác với đoạn code HTML của bạn, như nhưng con bot của Google, Facebook ... sẽ hiểu được cấu trúc trong trang & sử dụng chúng để đưa ra các thông tin hữu ích cho người dùng.

Còn nếu việc bạn dùng các thẻ sai mục đích, hoặc sử dụng thẻ chung chung cho toàn bộ các thành phần trong trang web như ví dụ dưới đây, thì khi hiển thị cho người dùng, trang web của bạn vẫn hiển thị tốt & không có lỗi, nhưng sẽ là điều vô cùng bất lợi cho các công nghệ khác, hay cho chính những người cùng phát triển trang web với bạn bối rối & khó hiểu.

```
<html>
    <body>
        <div>
            <div>Hooman are boss</div>
        </div>
        <div>
            <div>Why Hooman are gooddivp>
            <p>Because my cat said so.</p>
            <img src="hooman.jpg" alt="Hooman are good">
            <div>We're all good inside but bad outside</div>
        </div>
    </body>
</html>
```

Trong Typescript có một kiểu dữ liệu là `any`, nó chính xác tương đồng với việc sử dụng thẻ `div` ở bất kỳ đâu như ví dụ trên. Khi sử dụng `any` trong một số trường hợp nhất định sẽ khá tiện lợi, nhưng thông thường việc dùng kiểu dữ liệu `any` sẽ hoàn toàn phá bỏ cấu trúc code của bạn, khiến nó khó hiểu, khó debug, khả năng gây lỗi mà không biết tại sao khá cao.

Trích dẫn một câu nói của diễn giả, tác giả, nhà phát triển web kỳ cựu Jeffery Zeldman
> “…to build for people and the long term, then simple, structural, semantic HTML was best — each element deployed for it’s intended purpose. Don’t use a div when you mean a p” — Jeffery Zeldman

Nói ngắn gọn lại thì điều này khá đơn giản. Hãy tìm hiểu các phần tử HTML có sẵn và sử dụng các chúng chính xác & thích hợp nhất cho trang web của bạn. Hãy tận dụng tối đa ý nghĩa của chúng giống như khi bạn  tận dụng sức mạnh của bất cứ ngôn ngữ lập trình khác.