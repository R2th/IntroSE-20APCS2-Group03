Trước đây mình đã từng giới thiệu về [**Yahoo! Query Language (YQL)**](https://viblo.asia/p/yahoo-query-language-yql-n7prv32AGKod) giúp chúng ta parse HTML webpage dưới dạng truy vấn SQL. Nhưng hiện tại hình như YQL service đã ngưng hoạt động hoặc thay đổi cấu trúc (ít nhất đối với table HTMLString, còn các table khác của Yahoo! vẫn hoạt động thì phải :thinking:), đó là một tin rất buồn đối với thằng thích "cào" dữ liệu từ các trang web như mình :broken_heart:. Trước đây, mình đã thử tìm các dịch vụ khác để có thể thay thế YQL nhưng không thành công. Việc "cào" dữ liệu từ website đối với các ngôn ngữ server-side scripting thì không có gì là quá khó. Nhưng việc này đối với client-side scripting (như JavaScript) thì không hề đơn giản (không muốn nói là không thể - *ý kiến cá nhân*).

Rất may, duyên số đã cho mình gặp được thằng [**Cool QL Cool**](https://coolql.cool/) :stuck_out_tongue_winking_eye:. Hiểu nôm nay là nó cũng tương tự như YQL, nhưng chúng ta sẽ truy vấn dữ liệu theo dạng query của [**GraphQL**](https://graphql.org/learn/) thay vì dạng query SQL. Và điều đặc biệt hơn nữa là thằng **Cool QL Cool** này là open source. Nếu một ngày không may dịch vụ của nó ngừng hoạt động thì bạn cũng vẫn có thể tự build cho mình một service từ source của nó để thay thế :heart_eyes:!

Mình sẽ điểm qua một số features của thằng CQC này:

* Có thể đợi JavaScript trên trang thực hiện xong các công việc của nó nếu như bạn chỉ định

    Theo mặc định, CQC sẽ chỉ tải trang web như một request AJAX bình thường. Nhưng nếu bạn truyền thêm tham số `wait` hoặc `waitForSelector` trong khi khởi tạo `site` thì CQC sẽ đợi theo thời gian bạn đưa ra (đối với `wait`) hoặc đợi cho đến khi element được chỉ định xuất hiện trên trang (đối với `waitForSelector`) thì nó mới thực hiện truy vấn.
    
* Cho phép bạn truy vấn nhiều trang web cùng lúc

    Với các thư viện khác (như [Jam API](https://www.github.com/dinubs/jam-api)) chỉ có thể quét một trang tại một thời điểm, nhưng đối với CQC thì bạn có thể truy vấn nhiều trang trong một request bằng cách đặt alias cho các `site`.
    
Sau khi điểm qua một số features nổi bật (mình có bỏ đi feature cuối, đại ý của nó là "tôi là open source, nên mọi người có thể thoải mái đóng góp các chức năng mới cho nó"), chúng ta cùng đi xem schema của thằng CQC này nhé.

# Query

* `site(url: String, html: String, wait: Int, waitForSelector: String, waitForFn: String): Site`

    * `url`: Đường dẫn đến page mà bạn muốn parse
    * `html`: Mã HTML mà bạn muốn truy vấn trong trường hợp bạn có HTML code và không muốn request.
    * `wait`: Số mili giây mà bạn muốn đợi trước khi truy vấn trang. Chỉ sử dụng khi dùng với tham số `url`
    * `waitForSelector`: Selector mà bạn muốn đợi đến khi nó xuất hiện rồi mới thực hiện truy vấn. Chỉ sử dụng khi dùng với tham số `url`
    * `waitForFn`: Đợi một function nào đó trả về giá trị `true` trước khi thực hiện truy vấn trang. Chỉ sử dụng khi dùng với tham số `url`

Trong field `site` sẽ có các fields con sau:

* `select(elem: String): Element`: Lấy một phần tử phù hợp trong trang (ví dụ `$("#id")`)
* `selectAll(elem: String): [Element]`: Lấy tất cả các phần tử phù hợp trong trang (ví dụ `$(".className")`)
* `count(elem: String): Int`: Đếm số phần tử phù hợp trong trang.

Khi sử dụng fields `select` hoặc `selectAll`, nó sẽ trả ra kiểu `Element`. Và trong `Element` sẽ có các fields sau:

* `select(elem: String): Element`: Lấy một phần tử phù hợp
* `selectAll(elem: String): Element`: Lấy tất cả các phần từ phù hợp
* `count(elem: String): Int`: Đếm số phần tử phù hợp
* `classList: [String]`: Lấy tất cả các class của phần tử đó (ví dụ `$(selector).attr("class")`)
* `class: String`: Lấy class đầu tiên của phần tử đó (ví dụ `$(selector).attr("class").split(" ")[0]`)
* `html: String`: HTML trong phần tử (ví dụ `$(selector).html()`)
* `text: String`: Text trong phần tử (ví dụ `$(selector).text()`)
* `href: String`: Lấy thuộc tính `href` của phần tử
* `src: String`: Lấy thuộc tính `src`
* `data(name: String): String`: Lấy tất cả `data-` attribute của phần tử. Nếu bạn truyền tên vào thì sẽ lấy dữ liệu của data attribute đó (ví dụ: `$(selector).data()` hoặc `$(selector).data("id")`)
* `attr(name: String): String`: Lấy attribute của phần tử (ví dụ `$(selector).attr("data-id")`)

Vậy là đã xong. Bây giờ chúng ta thử thực nghiệm xem sao phát nhỉ :D! Để ví dụ, chúng ta thử lấy danh sách các bài viết trên trang 1 thuộc danh mục **Pháp luật** và **Giáo dục** của báo điện tử **VNExpress** nhá. Bạn vào trang [**Graph*i*QL**](https://coolql.cool/graphiql) và thực hiện truy vấn như sau:

```JSON
{
  phapLuat: site(url: "https://vnexpress.net/phap-luat") {
    news: selectAll(elem: ".sidebar_1 .list_news") {
      title: select(elem: "h4.title_news a") {
        text: attr(name: "title"),
        href
      }
      thumb: select(elem: ".thumb_art .vne_lazy_image") {
        src: data(name: "original")
      }
    }
  }
  giaoDuc: site(url: "https://vnexpress.net/giao-duc") {
    news: selectAll(elem: ".sidebar_1 .list_news") {
      title: select(elem: "h4.title_news a") {
        text: attr(name: "title"),
        href
      }
      thumb: select(elem: ".thumb_art .vne_lazy_image") {
        src: data(name: "original")
      }
    }
  }
}
```

Hoặc bạn có thể xem kết quả ở bên dưới:

{@embed:https://codepen.io/namnv609/pen/QzJQjV}


# Lời kết

Đến đây, bài viết của mình đã kết thúc. Bài viết này vừa là chia sẻ cũng vừa là để mình note lại để tiện việc sử dụng lần sau. Hy vọng nó sẽ giúp ích cho bạn trong tương lai. Hẹn gặp lại và chào thân ái :wave:!

> Original post: https://namnv609.cf/posts/cool-ql-cool-cqc-turn-websites-into-graphql-apis.html