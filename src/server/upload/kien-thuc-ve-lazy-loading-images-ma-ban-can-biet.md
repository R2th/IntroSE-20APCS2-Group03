## Lời tựa

Trong bài viết lần này, hãy cùng mình nghiên cứu từ "lịch sử" cho đến "hiện đại" các vấn đề về lazy-loading images nhé (có cả lý thuyết và code). Những trình bày của mình dựa trên kinh nghiệm và kiến thức của bản thân, cộng thêm nghiên cứu và tổng hợp từ nhiều nguồn khác nhau nhằm cung cấp cho các bạn cái nhìn đầy đủ nhất cả về lý thuyết lẫn thực hành. Nếu các bạn có góp ý hay bổ sung gì thì hãy để lại bình luận bên dưới nhé.

Kĩ thuật "lazy-loading images" hiện nay đã có nhiều cải tiến so với trước, tuy nhiên mình sẽ chưa đi ngay vào code mà sẽ tản mạn về lý thuyết một tí. Bài viết của mình khá dài nhưng không nhất thiết phải đọc theo thứ tự từ trên xuống, vì thế bạn nên xem phần mục lục ở bên tay phải và nhảy đến phần mình quan tâm nhé. Hoặc nếu bạn chỉ muốn download source code, thì hãy xuống cuối bài viết.

Các bạn có thể xem bài viết gốc của mình tại: https://phucluong.com/kien-thuc-ve-lazy-loading-images-ma-ban-can-biet/

## Lý thuyết: Lazy loading là gì?

![trì hoãn việc tải các tấm ảnh khuất màn hình](https://images.viblo.asia/53cbd9e0-26f7-45ab-8e65-57e0aa648102.png)

<div align="center">"Trì hoãn" việc tải các tấm ảnh khuất màn hình. Ảnh addyosmani.com</div>

Mình bổ sung phần này dành cho các bạn mới (fresh). Trước khi ứng dụng một công nghệ hay kĩ thuật gì vào dự án, các bạn nên hiểu về lý thuyết, thuật ngữ liên quan và lý do sử dụng nhé, vì biết đâu bạn đang sử dụng "dao mổ trâu để giết gà" đấy.

**Lazy loading**: có một điều quan trọng các bạn cần hiểu là nó chỉ là một khái niệm (ý tưởng) thôi nhé. Nghĩa là nó có thể được sử dụng trong nhiều trường hợp khác nhau, nhiều ngôn ngữ lập trình khác nhau, và mỗi nơi lại có nhiều cách implement khác nhau, nhưng ý tưởng thì cũng tương đối giống nhau thôi. Ví dụ như trong Angular thì có lazy-loading modules...

Mình xin lấy một ví dụ mà chắc ai cũng đã từng gặp, hãy tưởng tượng rằng bạn bước vào một quán nhậu:

  * Bạn gọi một loạt 10 món ăn, bạn đợi quán chế biến và mang thức ăn lên cho bạn.
* Bạn đợi thật lâu và đùng một cái quán bê lên cả 10 món một lúc.

Bạn có thật sự mong đợi điều trên không? Có một cách "tốt" hơn trong trường hợp này:

* Bạn chỉ nên gọi 3 món thôi và thưởng thức.
* Bạn canh thời điểm phù hợp và gọi tiếp 3 món nữa.
* Sau khi ăn 6 món, bạn thấy no và quyết định thanh toán và ra về, vậy là bạn đã tiết kiệm tiền (và thực phẩm) cho 4 món còn lại, và bạn vẫn cảm thấy vui vì không phải chờ đợi quá lâu.


Lazy loading chính là vậy đó. Khi user vào một trang web có rất nhiều feature (ảnh), nhiều khi họ chỉ vào mỗi trang chủ dạo chơi thôi. Và trong trang chủ, họ cũng chỉ xem cái giao diện đầu tiên chứ chưa chắc đã scroll xuống và xem hết. Trong trường hợp đó, tại sao chúng ta lại bắt browser tải về tất cả mọi feature, tất cả mọi tấm ảnh trong khi user chưa cần hoặc có thể không cần đến?

Trong giới hạn của bài viết này, mình xin phép chỉ phân tích về kĩ thuật lazy-loading images thôi nhé.

## Tại sao lại phải "lazy-loading images"?
#### Giải quyết vấn đề về performance
Khi bạn viết code 100 tấm ảnh chứa trong các thẻ `img`, browser sẽ tải về tất cả các tấm ảnh ấy, dù cho user có muốn hay không, hay có scroll và xem hết 100 tấm ảnh ấy không. Vì thế, việc lazy-load sẽ giúp browser tải ít resource (ảnh) lại, trả kết quả về user nhanh hơn. Bất kì user nào cũng thích các trang web chạy nhanh hơn là chậm.

#### Tiết kiệm tài nguyên
Việc "trì hoãn" những resource chưa cần thiết giúp tiết kiệm CPU, GPU, bộ nhớ, băng thông... đặc biệt là trên các thiết bị di động có tốc độ kết nối chậm.

#### Tăng trải nghiệm người dùng
Ngày nay số lượng người dùng trên mobile đã [vượt qua](https://gs.statcounter.com/press/mobile-and-tablet-internet-usage-exceeds-desktop-for-first-time-worldwide) cả trên desktop. Nếu trang của bạn có quá nhiều hình ảnh gây chậm tốc độ tải trang, thì user sẽ cảm thấy rằng đó là một trang web tệ và không còn muốn quay lại lần sau.

#### Tăng điểm số trên các trang đo tốc độ web, ví dụ như [Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/)
Nếu bạn quan tâm đến "điểm số" của web thì lazy load sẽ giúp điểm số tăng cao hơn nhé (nếu bạn áp dụng đúng cách). Bên cạnh đó, tốc độ web và trải nghiệm người dùng ảnh hưởng rất lớn đến xếp hạng (ranking) trang web trên Google search nữa nhé.

## Khi nào thì cần "lazy-loading images"?
Mặc dù lazy-load có rất nhiều lợi ích như trên, bạn cần đặt câu hỏi cho bản thân liệu bạn có thật sự cần nó không, vì "lazy-loading images" cũng có những tác hại (mình có chia sẻ ở cuối bài viết) nếu chúng ta lạm dụng hoặc sử dụng sai cách. Vậy khi nào thì chúng ta nên lazy-load hình ảnh của web:

* Trang của bạn có nhiều hình ảnh và chúng đang làm chậm trang web của bạn.
* Hình ảnh trong trang của bạn nằm khuất màn hình và không cần phải tải tức thời.
* Bạn cần tối ưu tốc độ tải trang trên mobile (và cả desktop), thì "lazy-load images" là một việc nên làm (tất nhiên chỉ lazy-load thôi chưa đủ đâu nhưng nhanh được thêm bao nhiêu hay bấy nhiêu)


## Trước khi "lazy-load", chúng ta cần phải làm gì?
Trước khi áp dụng bất kì kĩ thuật "lazy-load images" nào, còn nhiều việc mà bạn phải làm trước đó:
<blockquote>Ảnh của bạn phải được optimize về kích thước (pixel), dung lượng (KB), định dạng (format) hợp lý. Nếu bạn đang load một tấm hình banner cho trang home lên đến 4MB, thì bạn cần phải nén chúng lại trước nhé. Dù có áp dụng lazy-load nhưng một tấm hình 4MB với 500KB sẽ khác nhau rất nhiều đấy.</blockquote>
<blockquote>Kết hợp với thuộc tính `srcset` để load tấm hình tối ưu nhất dựa theo kích thước màn hình.</blockquote>

## Bản chất của "lazy-loading images" rất đơn giản
Bạn nói với browser rằng: "Này browser, tao có các tấm ảnh này, nhưng mày **đừng tải** nó nhé. Khi nào user **scroll đến vị trí tấm ảnh** nào, thì mày hãy **tải tấm ảnh** ấy ngay". Có 3 vấn đề cốt lõi mà mình tô đậm trong đoạn hội thoại trên.
**1. Đừng tải**: Khi bạn gán thuộc tính `src` cho thẻ `img`, browser sẽ tải nó ngay và luôn, nên để bảo browser đừng tải nó, đơn giản là chúng ta đừng sử dụng thuộc tính `src`
``` html
<!-- Browser sẽ tải tấm ảnh này ngay -->
<img src="example.jpg">

<!-- Bằng cách không sử dụng "src", browser sẽ không tải tấm ảnh đó ngay nữa -->
<!-- Bạn có thể sử dụng bất kì tên gì bạn muốn như "temp-src", "my-src", nhưng cách "chuẩn và tiện"
  nhất là sử dụng data-src nhé. -->
<img data-src="example.jpg">
```
**2. scroll đến vị trí tấm ảnh**: để kiểm tra được điều này, developers thường dùng những thứ gọi là "trick" như sự kiện `scroll`, hay mới hơn là "Intersection Observer API". Mình sẽ code cả 2 cách trên trong phần tiếp theo nhé.
**3. tải tấm ảnh**: để bắt browser tải tấm ảnh, chúng ta chỉ đơn giản là copy tấm ảnh từ `data-src` vào thuộc tính `src` (hoặc `background-image` cho ảnh background) thôi.
``` html
<!-- Bằng cách sử dụng javascript, chúng ta copy url của tấm ảnh từ data-src vào src
  là browser sẽ tải tấm ảnh ngay thôi -->
<img src="example.jpg" data-src="example.jpg">
```

**Lazy-load ảnh background cũng tuân theo các bước như trên, chỉ là thay vì copy từ `data-src` vào `src`, chúng ta copy vào `background-image` là được. Các ví dụ bên dưới mình đều ứng dụng cho cả 2 trường hợp `src` và `background-image` nhé.**

## Kĩ thuật 1: lazy-load chính thống và hiện đại
Chém gió hơi nhiều rồi, mình đi vào code ngay nhé. Thay vì đi ngược từ cách "cổ xưa" cho đến cách "hiện đại", mình xin giới thiệu về cách hiện đại trước. Cách này là cách chính thống (nghĩa là nó không phải trick), bạn sẽ không cần bất kì dòng Javascript nào, hay bất kì config gì phức tạp. Điều duy nhất bạn làm là báo cho browser biết tấm ảnh nào cần lazy-load là xong, với thuộc tính `loading`
``` html
<!-- Bạn chỉ cần thêm loading="lazy" vào tấm ảnh của bạn là xong -->
<img src="example.jpg" loading="lazy">

<!-- Thông tin thêm, loading="lazy" còn áp dụng được cho cả iframe nhé -->
<iframe src="example.html" loading="lazy"></iframe>
```

{@codepen: https://codepen.io/luongvanphuc/pen/YzqWEYe}  

{@youtube: https://www.youtube.com/embed/kbz4z-Wbu48}  

Thuộc tính `loading` có 3 giá trị là `lazy`, `eager` và `auto`

  * **lazy**: browser cần lazy-load tấm ảnh này.
  * **eager**: browser cần tải tấm ảnh này ngay lập tức (hoặc càng sớm càng tốt). Nếu tấm ảnh đang được load với cơ chế lazy mà bạn đổi nó sang eager thì nó sẽ lập tức tải ngay.
  * **auto**: browser sẽ quyết định việc có nên lazy-load ảnh hay không.

**Một điều quan trọng bạn cần lưu ý là nếu bạn muốn lazy-load ảnh background, thì cách này sẽ không chạy đâu nhé. Thay vào đó bạn phải dùng 2 cách mà mình đề cập bên dưới.**
Một lưu ý khác nữa, là browser không đợi đến lúc tấm ảnh xuất hiện ở viewport mới tải, mà khi tấm ảnh gần xuất hiện ở viewport là nó đã tải rồi nhé. Điều này giúp browser tải tấm ảnh sớm nhất có thể để nó sẵn sàng xuất hiện trên màn hình kịp lúc, vì tải cũng mất thời gian mà. Nếu bạn muốn tìm hiểu thêm thì có thể search từ khóa "threshold" nhé.
Theo trang [Can I Use](https://caniuse.com/#search=loading), thuộc tính này đã được hỗ trợ trên Chrome và Firefox, không hỗ trợ IE, còn Safari thì đang thử nghiệm và sẽ sớm có thôi.

#### Fallback
Trong trường hợp browser chưa support thuộc tính `loading`, thường ta sẽ dùng polyfill hoặc fallback. Mình ví dụ một đoạn code fallback để kiểm tra nếu trình duyệt chưa support thuộc tính `loading` thì sẽ tự dùng third-party bên ngoài để lazy-load.
``` html
<!-- Let's load this in-viewport image normally -->
<img src="hero.jpg" alt="..">

<!-- Let's lazy-load the rest of these images -->
<img data-src="unicorn.jpg" loading="lazy" alt=".." class="lazyload">
<img data-src="cats.jpg" loading="lazy" alt=".." class="lazyload">
<img data-src="dogs.jpg" loading="lazy" alt=".." class="lazyload">

<script>
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazyload");
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
      // Dynamically import the LazySizes library
    let script = document.createElement("script");
    script.async = true;
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js";
    document.body.appendChild(script);
  }
</script>
```

<div align="center">
  Nguồn: https://addyosmani.com/blog/lazy-loading/
</div>

## Kĩ thuật 2: lazy-load sử dụng Intersection Observer API
Định nghĩa về "Intersection Observer API" thì mình không nêu ra ở đây vì nó nằm ngoài phạm vi bài viết. Ứng dụng của nó thì có rất nhiều, và "lazy-loading images" là một trong số những ứng dụng ấy. Nói nôm na, bạn sử dụng API này để biết được khi nào user scroll đến vị trí tấm ảnh, và khi ấy chúng ta "ép" browser tải tấm ảnh ngay lập tức.

{@codepen: https://codepen.io/luongvanphuc/pen/oNxLbXP}  

{@youtube: https://www.youtube.com/embed/PyfF-MOhFPY}  


Tuy sử dụng Intersection Observer cho việc lazy-load là một cách không quá "lỗi thời", nó vẫn [không được support trên IE](https://caniuse.com/#feat=intersectionobserver) nhé. Tuy nhiên hầu hết các browser hiện nay và cả mobile nữa đều support nó, nên có thể nói đây là cách khá "an toàn".
Nếu vì tính chất công việc mà bạn buộc phải support IE, bạn có thể sử dụng [polyfill](https://github.com/w3c/IntersectionObserver) để giả lập Intersection Observer API, hoặc sử dụng kĩ thuật số 3 tiếp theo đây.

## Kĩ thuật 3: lazy-load sử dụng scroll event (resize, orientationChange...)
Kĩ thuật này là khá cổ điển, có thể xem nó là giải pháp cuối cùng để lazy-load images nếu bạn buộc phải support các browser cũ. Giải pháp này tuy chạy nhưng có nhiều vấn đề về performance và hiệu ứng giật (lag), vì nó là cách thủ công mà. Bạn sẽ phải tính toán xem vị trí của tấm ảnh xem nó đã xuất hiện ở trên màn hình chưa, và cứ lặp đi lặp lại mỗi khi user scroll.

Mình không khuyến khích các bạn sử dụng cách này cho production nhé. Nếu buộc phải support các browser cũ, thì polyfill của Intersection Observer ở trên là đủ rồi.

{@codepen: https://codepen.io/luongvanphuc/pen/YzqWaYe}  

{@youtube: https://www.youtube.com/embed/1TgWB7tyzcA}  

## "Lazy-loading images" có hại không?
Mặc dù lazy-load là một kĩ thuật tốt và hiệu quả, việc sử dụng lazy-loading images sẽ có một số mặt hại sau:

#### 1. Page bị nhảy khi tấm ảnh được load (layout shift)
Vấn đề này là thường gặp nhất khi áp dụng lazy-load. Lý do là vì browser không biết được kích thước của tấm ảnh trước khi nó thật sự load nó. Vì thế khi load xong tấm ảnh, nó sẽ đẩy content xung quanh ra xa gây giật trang khá khó chịu. Có rất nhiều cách để giải quyết vấn đề này, nhưng để tránh bài viết quá dài nên mình chỉ đưa một cách đơn giản và dễ hiểu nhất thôi. Nếu các bạn cần tìm hiểu thêm nhiều cách khác thì có thể Google hoặc để comment bên dưới nhé.

Cách để tránh layout shift thường thấy là chỉ ra chính xác kích thước của tấm ảnh, khi đó browser sẽ dành chỗ trước cho tấm ảnh đó trên layout, để đảm bảo khi load xong tấm ảnh, nó sẽ lấp đúng khoảng trống đó và không gây lỗi layout shift.

``` html
<!-- Chỉ cho browser biết kích thước tấm ảnh để tránh lỗi "layout shift" -->
<img src="sample.png" loading="lazy" width="200" height="200">
<img src="sample.png" loading="lazy" style="height:200px; width:200px;">
```

**Ngoài ra, bạn nên tránh lazy-load những tấm ảnh ở ngay phần đầu của trang (thuật ngữ chuyên môn gọi là above-the-fold) để tránh việc layout shift nhé.**

![GrabCV - above the fold](https://images.viblo.asia/b2a28d5f-b315-45c4-a1f4-7a1ca6506410.jpg)

#### 2. Khi web bị tắt Javascript
Đối với những user đã tắt Javascript trên trình duyệt (tỉ lệ rất thấp), thì cách sử dụng Intersection Observer hay `scroll` sẽ không những không chạy, mà nó còn làm những tấm ảnh của bạn mãi mãi không xuất hiện. Để giải quyết vấn đề đó, ta có thể sử dụng thẻ `noscript`
``` html
<img data-src="sample.jpg">

<!-- Nếu javascript bị tắt, thì hãy load tấm ảnh ngay nhé -->
<noscript>
  <img data-src="sample.jpg" />
</noscript>
```

Tuy nhiên bạn không cần phải lo lắng vì thật sự tỉ lệ user lướt web mà tắt javascript là rất thấp.

#### 3. Không tốt cho SEO
Vẫn là khi sử dụng Intersection Observer hay `scroll`. Khi con bot (mình ám chỉ GoogleBot) crawl trang web của bạn, nó sẽ không hiểu `data-src` là gì mà nó chỉ hiểu `src` mà thôi. Trong trường hợp này nó sẽ xem như tấm hình đó bị lỗi và không index tấm hình của bạn. Tuy nhiên nói vậy không có nghĩa là không có giải pháp, có một số trick dành cho bạn nếu bạn quan tâm:

* Feed cho con bot bằng cách thủ công thông qua sitemap (nếu bạn là dân SEO thì bạn sẽ hiểu nó là gì)
* Kiểm tra xem `navigator.userAgent` có phải là bot của Search Engine không. Nếu phải thì ta bỏ qua việc lazy-load bằng cách thực hiện ngay thao tác copy từ `data-src` sang `src`. Việc này khá tricky nên mình không nói chi tiết ở đây (nó liên quan đến SSR và CSR). Nếu bạn có thắc mắc gì thì để lại comment bên dưới nhé.


#### 4. Thêm code Javascript chỉ để lazy load vài tấm ảnh
Nếu số lượng ảnh cần lazy load chỉ dưới 5 tấm, và chúng không ảnh hưởng nhiều đến tốc độ tải trang, thì mình khuyên không nên sử dụng lazy load. Điều này chỉ khiến bạn tốn thêm nhiều dòng code javascript, và sẽ lớn hơn nếu bạn nhúng cả polyfill vào nữa. Thay vào đó, hãy tìm cách optimize tấm ảnh của bạn, và sử dụng native lazy-load nếu có thể.

#### 5. `loading="lazy"` không hỗ trợ background image
Nếu bạn muốn lazy-load ảnh background, thì cách sử dụng `loading="lazy"` sẽ không chạy và bạn buộc phải dùng 2 cách còn lại nhé.

## Tóm tắt bài viết trong một table
|  | Native | Intersection Observer | scroll |
|-|-|-|-|
| **Performance** | Tốt nhất | Tốt | Không quá tệ nếu xử lý tốt |
| **Background Image** | Không | Có | Có |
| **Javascript** | Không cần | Cần | Cần |
| **SEO** | Không ảnh hưởng | Có ảnh hưởng. | Có ảnh hưởng. |
| **User friendly** | Tốt nhất | Tốt | Có thể gây giật |
| **Layout shift issue** | Có, cần xử lý | Có, cần xử lý | Có, cần xử lý |
| **Browser support** | Chưa nhiều (thiếu safari). Không support IE. | Tốt trên các browser. Không support IE. | Tốt trên hầu hết browser, kể cả IE. |
| **Polyfill** | Có | Có | Bản thân nó như là một polyfill rồi |

## Download Source codes
Mình đính kèm source code đơn giản cho 3 giải pháp ở trên, bạn nào cần thì có thể tải về để tham khảo nhé.  
[https://drive.google.com/file/d/16jTYVUiA5xykDrhaP60GwvuztOPTOhwB/view?usp=sharing](https://drive.google.com/file/d/16jTYVUiA5xykDrhaP60GwvuztOPTOhwB/view?usp=sharing)

## Kết luận
"Lazy-loading images" chỉ là một trong rất nhiều kĩ thuật để tối ưu performance cho web. Sắp tới mình sẽ viết thêm nhiều bài viết phân tích về web performance nhé.

Bài viết của mình khá dài rồi, hi vọng các bạn thích bài viết lần này của mình, mình sẽ luôn cập nhật để nó không bị lỗi thời nhé. Nếu các bạn có góp ý hay thắc mắc gì thì xin để lại comment bên dưới.