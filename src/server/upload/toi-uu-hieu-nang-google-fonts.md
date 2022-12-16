Google Fonts dễ dàng triển khai, nhưng chúng có ảnh hưởng lớn đến thời gian tải trang. Bài viết này sẽ tìm hiểu về cách sử dụng chúng một cách tối ưu nhất.

Công bằng mà nói thì Google Fonts rất thông dụng. Tại thời điểm viết bài này, chúng được xem trên [29 nghìn tỷ](https://fonts.google.com/analytics) lần trên web và có thể dễ dàng hiểu tại sao - bộ font này cung cấp trên 9000 fonts đẹp, miễn phí. Nếu không có Google Fonts, người dùng có thể sẽ bị giới hạn vào các font của hệ thống được cài đặt trên thiết bị.

Giống như tất cả những thứ tốt đẹp khác, Google Fonts cũng đi cùng một cái giá. Mỗi font có kích thước nhất định mà trình duyệt cần tải trước khi chúng được hiển thị. Khi cài đặt đúng, thời gian tải sẽ không đáng kể. Tuy nhiên, nếu gặp sự cố, người dùng có thể phải đợi vài giây trước khi bất cứ văn bản nào được hiển thị.

# Google Fonts đã được tối ưu rồi #

Google Fonts API không chỉ cung cấp những tệp font đối với trình duyệt, mà còn thực hiện kiểm tra xem sẽ chuyển giao những tệp này theo định dạng tối ưu nhất như thế nào.

Xem xét font Roboto, có thể thấy kích cỡ của định dạng thông thường là 168KB.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/470e4f56-094d-4116-b621-d806b30bced7/github-file-size.jpg)

Tuy nhiên, nếu thử request cùng định dạng font từ API thì [font trả về](https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) chỉ có 11KB. Tại sao lại như vậy?

Khi trình duyệt tạo một request đến API, đầu tiên Google sẽ check xem những kiểu tệp tin nào mà trình duyệt hỗ trợ. Khi sử dụng Chrome (bản mới nhất), giống như hầu hết các trình duyệt hỗ trợ định dạng WOFF2, vì vậy font được trả về ở định dạng nén cao như vậy.

Nếu đổi sang Internet Explorer 11, font trả về ở định đạng WOFF

Cuối cùng, nếu chuyển sang IE8, font nhận được là ở định dạng EOT (Embedđe Open Type).

> Google Fonts duy trì hơn 30 định dạng đã tối ưu cho mỗi loại font và tự động phát hiện, chuyển giao định dạng tối ưu cho mỗi nền tảng và trình duyệt
>
> — Ilya Grigorik, [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#reducing_font_size_with_compression)

Đây là một đặc tính quan trọng của Google Fonts, bằng việc kiểm tra user-agent, chúng có thể được trả về theo định dạng tối ưu nhất mà trình duyệt có thể hỗ trợ, trong khi vẫn hiển thị ổn định trên những trình duyệt cũ.

# Cơ chế cache trên trình duyệt #
Một đặc tính tối ưu tích hợp khác của Google Fonts là cơ chế cache trên trình duyệt.

Vì tính phổ biến của Google Fonts, trình duyệt không cần tải toàn bộ tệp font. Nếu truy cập vào một trang đã sử dụng một font nào đó thì ở lần truy cập khác vào trang có sử dụng font đó, thì trình duyệt sẽ sử dụng phiên bản đã được cache của font.

> Vì Google Fonts API được sử dụng phổ biến nên gần như người dùng truy cập vào trang nào đó sẽ sử dụng Google fonts ở trong cache của trình duyệt
>
> FAQ, [Google Fonts](https://developers.google.com/fonts/faq#will_web_fonts_slow_down_my_page)

Google Fonts có thời hạn một năm trong cache của trình duyệt.

# Việc tối ưu hơn nữa là điều khả thi #

Trong khi Google đang đầu tư công sức lớn vào việc tối ưu truyền tải các tệp font, thì vẫn có những tối ưu có thể được thực hiện để giảm thiểu thời gian tải trang.

## 1. Giới hạn các loại font ##

Cách tối ưu đơn giản nhất là sử dụng dụng ít các loại font khác nhau hơn. Mỗi font có thể làm tăng kích thước của trang lên tới 400KB, nhân số này với số lượng loại font khác nhau thì bỗng dưng kích thước của fonts còn lớn hơn toàn bộ trang web.

Không nên sử dụng quá hai loại fonts, một loại cho heading và một loại cho nội dung thường là đủ. Việc sử dụng đúng font-size, font-weight, color cũng có thể giúp trang web trở nên dễ nhìn dù chỉ có một loại font.

## 2. Loại bỏ những định dạng không cần thiết ## 

Vì tiêu chuẩn chất lượng cao của Google Fonts, nhiều loại font chứa đầy đủ các font-weights:

- Thin (100)
- Thin Italic (100i)
- Light (300)
- Light Italic (300i)
- Regular (400)
- Regular Italic (400i)
- Medium (600)
- Medium Italic (600i)
- Bold (700)
- Bold Italic (700i)
- Black (800)
- Black Italic (800i)

Việc này phù hợp với những  tình huống sử dụng đặc biệt mà yêu cầu tất cả 12 định dạng nhưng đối với một trang web thông thường, nó lại đồng nghĩa với việc tải tất cả 12 định đạng trong khi chỉ cần 3 hoặc 4.

Ví dụ, loại font Roboto có kích thước ~144KB. Tuy nhiên, nếu chỉ sử dụng các định dạng Regular, Regular Italic và Bold, con số đó có thể giảm xuống ~36KB. Tiết kiệm 75%.

Code mặc định để triển khai Google Fonts giống như sau:
```html
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
```

Đoạn code trên chỉ tải duy nhất định dạng "regular 400". Đồng nghĩa với việc tất cả những văn bản in nghiên, in đậm, in mảnh sẽ không được hiển thị đúng.

Thay vào đó, cần chỉ định font-weight trong URL:
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
```

Hiếm khi một trang web sử dụng tất cả các định dạng từ Thin (100) đến Black(900). Chiến lược tối ưu ở đây là chỉ yêu cầu những định dạng cần thiết.
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,600" rel="stylesheet">
```

Điều này đặc biệt quan trọng khi sử dụng nhiều loại font khác nhau. Ví dụ, nếu sử dụng font Lato cho headings, thì chỉ yêu cầu duy nhất định dạng in đậm là hợp lý (có thể là in đậm nghiêng).
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,600" rel="stylesheet">
```

## 3. Gộp requests ##

Đoạn code ở trên tạo request đến server của Google (`fonts.googleapis.com`), hay còn gọi là HTTP request. Thông thường, trang web thực hiện càng nhiều HTTP request thì càng mất nhiều thời gian để tải.

Nếu muốn tải hai fonts, có thể sẽ thực hiện như sau:
```html
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
```

Có thể tối ưu bằng cách gộp thành một request như sau:
```html
<link href="https://fonts.googleapis.com/css?family=Roboto|Open+Sans:400,400i,600" rel="stylesheet">
```

Không có giới hạn bao nhiều fonts và định dạng trong một request có thể nắm giữ.
## 4. Resource hints ##

Resource hints là một tính năng được hỗ trợ trên các trình duyệt mới, giúp cải thiện hiệu năng của website. Xem xét hai loại resource hint sau: "DNS Prefetching" và "Preconnect".

Chú ý: Nếu trình duyệt không hỗ trợ tính năng này, nó sẽ đơn thuần bỏ qua. Trang web vẫn được hiển thị bình thường.

### *DNS Prefetching* ###

DNS Prefetching cho phép trình duyệt bắt đầu kết nối tới Google Fonts API ngay khi trang được tải. Điều này có nghĩ tại thời điểm trình duyệt sẵn sàng tạo một request, một vài công việc đã được thực hiện xong rồi.

Để triển khai DNS prefetching đối với Google Fonts, có thể đơn giản thêm một dòng sau vào `<head>` của trang web

```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
```

### *Preconnect* ###

Nếu nhìn vào đoạn code nhúng của Google Fonts thì có vẻ như nó thực hiện một HTTP request.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700" rel="stylesheet">
```

Tuy nhiên nếu truy cập vào URL kể trên thì sẽ có thêm bao request đến một URL khác https://fonts.gstatic.com/. Một request đối với mỗi định dạng font.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4655b9f4-3218-4e35-abec-113bd3b12302/google-fonts-css.jpg)

Vấn đề đối với những request phát sinh này là trình duyệt sẽ không bắt đầu xử lý chúng cho đến khi request đầu tiên đến `https://fonts.googleapis.com/css` được hoàn thành. Đây là lúc mà cần đến Preconnect.

Preconnect có thể được mô tả như một phiên bản nâng cấp của prefetch. Nó được thiết lập theo URL chỉ định mà trình duyệt sẽ tải. Thay vào việc chỉ thực hiện DNS lookup, nó cũng hoàn thành việc kết nối TLS và TCP.

Giống như DNS Prefetching, nó có thể được triển khai trong một dòng code:
```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
```

Việc chỉ thêm một dòng code trên có thể giảm thời gian tải trang 100ms. Điều này được thực hiện bằng việc kết nối đồng thời với request ban đầu thay vì đợi request đó hoàn thành xong trước.

## 5. Fonts đặt nội bộ ##

Google Fonts được cấp phép dưới dạng phần mềm miễn phí, cho phép tự do sử dụng, thay đổi và phân phối fonts mà không cần cấp phép. Điều đó có nghĩa là không cần sử dụng host của Google, thay vào đó sử dụng host nội bộ của trang web.

Tất các tệp fonts đều có sẵn trên [Github](https://github.com/google/fonts). Một [file zip](https://github.com/google/fonts/archive/master.zip) chứa tất cả các fonts cũng khả dụng trên đây (387MB).

Cuối cùng, có một [dịch vụ hỗ trợ](https://google-webfonts-helper.herokuapp.com/) cho phép lựa chọn font muốn sử dụng, sau đó cũng cung cấp cả những tệp tin và CSS cần thiết để thực hiện điều đó.

Có một điểm yếu của việc đặt nội bộ fonts. Fonts không được cập nhật lên phiên bản mới nhất mà chỉ ở phiên bản tại thời điểm tải fonts về host nội bộ.

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_auto/w_1600/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5250f760-5aaf-44a0-940b-d330ecaac79b/google-fonts-api-request.jpg)

*Chú ý tham số `lastModified` ở trong API. Font thường xuyên được thay đổi và cập nhật.*

## 6. Font display ##

Việc không hiển thị gì có thể đêm đến trải nghiệm xấu đối với người dùng. Cách thiết kế tốt sẽ hiển thị một font hệ thống mặc định như một fallback, sau đó tráo đổi fonts khi chúng đã được tải xong. Điều này có thể được thực hiện thông qua thuộc tính CSS `font-display`.

Bằng việc thêm `font-display: swap;` vào khai báo @font-face, trình duyệt sẽ hiển thị fallback font khi Google Font khả dụng.

```css
    @font-face {
    font-family: 'Roboto';
    src: local('Roboto Thin Italic'),
         url(https://fonts.gstatic.com/s/roboto/v19/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2)
         format('woff2');
         font-display: swap;
  }
```

Năm 2019, Google đã thông báo rằng họ sẽ hỗ trợ thêm cho đặc tính này. Có thể triển khai ngay tính năng này bằng cách thêm tham số phụ vào fonts URL:

```
https://fonts.googleapis.com/css?family=Roboto&display=swap
```

## 7. Sử dụng tham số `text` ##

Một tính năng ít được biết đến của Google API là tham số `text`. Tham số này cho phép chỉ tải những ký tự cần thiết.

Ví dụ, nếu một logo dạng văn bản chỉ cần một font duy nhất, có thể dụng tham số `text` chỉ để tải những ký tự được sử dụng có trong logo.

Ví dụ:

```
https://fonts.googleapis.com/css?family=Roboto&text=CompanyName
```

Rõ ràng, kỹ thuật này rất đặc thù và chỉ có một vài ứng dụng thực tế. Tuy nhiên, nó có thể giảm thiểu kích thước của font tải xuống tới 90%.

**Chú ý:** *Khi sử dụng tham số `text`, chỉ có font-weight "normal" được tải về mặc định. Để sử dụng weight khác, cần chỉ định tường minh trong URL:*
```
https://fonts.googleapis.com/css?family=Roboto&text=CompanyName
```

## ** Lược dịch ** ##

**Danny Cooper**, *Optimizing Google Fonts Performance*, [https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/](https://www.smashingmagazine.com/2019/06/optimizing-google-fonts-performance/)