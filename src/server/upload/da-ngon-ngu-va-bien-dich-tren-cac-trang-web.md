Bài viết này sẽ giới thiệu về cách mà các trang web xử lý đa ngôn ngữ.

## Ngôn ngữ đối với website là gì ?

Điều đầu tiên có thể nghĩ tới đó chính là ngôn ngữ mà văn bản HTML sử dụng. Thuộc tính `lang` giúp trình duyệt xác định được ngôn ngữ mà website đang thể hiện.

Thông thường, thuộc tính này được thêm ở root element của văn bản HTML
```html
<html lang="en">
```
Việc thêm thuộc tính này vào root element thực sự quan trọng, đặc biết đối với những người dùng mà ngôn ngữ chính của họ khác với ngôn ngữ của trình duyệt. Ví dụ những người nói tiếng Pháp khi sử dụng website này.

Khi thiếu thuộc tính `lang`, trình duyệt sẽ coi trang web được viết bằng ngôn ngữ mặc định của người dùng, dẫn đến một vài kết quả không mong muốn. Dưới đây là một ví dụ với việc máy đọc màn hình xử lý trang web tiếng Anh bằng ngữ giọng tiếng Pháp, mà nguyên nhân là bởi thiếu thuộc tính `lang`

![](https://images.viblo.asia/530800cb-61b4-42fc-8b93-96e541c76aa9.jpg)

Thuộc tính `lang` là một trong những thuộc tính HTML toàn cục cho phép áp dụng trên bất cứ thẻ HTML nào. Điều này có nghĩa rằng chúng ta có thể chỉ định những phần khác nhau của trang web với các ngôn ngữ khác nhau. Đặc biệt hữu dụng nếu một bài viết có sử dụng một đoạn văn bản có ngôn ngữ khác, `comme ça, par exemple.`
```html
<html lang="en">
<body>
  <h1>Localisation and Translation on the Web</h1>
  <p>
    This can be really useful, for example, if you are writing an article that references a text in a different language, <strong lang="fr">comme ça, par exemple</strong>
  </p>
</body>
```

## Chỉ định ngôn ngữ cho các trang liên kết ngoài

Thuộc tính `lang` được sử dụng cho các nội dung hiện tại của trang web. Vậy những tài nguyên/văn bản liên kết bên ngoài thì sao ?

Chúng ta có thể chỉ định ngôn ngữ của tài nguyên liên kết bên ngoài bằng các sử dụng thuộc tính `hreflang`. Như tên gọi, thuộc tính này chỉ định ngôn ngữ thông qua thuộc tính `href` và chỉ có thể áp dụng cho các thẻ HTML có sử dụng thuộc tính `href`. Ví dụ: thẻ `<a>`, `<link>` và `<area>`.

```html
<a href="https://adblockplus.org/ar/" hreflang="ar">adblockplus.org (Arabic)</a>
```

## Kiểm soát việc biên dịch

Trong một vài trường hợp, chúng ta muốn một phần của trang web luôn được hiển thị bằng một ngôn ngữ nhất định và không bao giờ được biên dịch. Đây là lý do để thuộc tính `translate` trong HTML5.1 ra đời.

Thuộc tính `translate` có thể nhận hai giá trị:

- `yes`: nội dung của thẻ có thể được biên dịch.
- `no`: nội dung của thể không được biên dịch.

```html
<html lang="de">
  <p>Übersetze mich!</p> <!-- Translate me! -->
  <p translate="no">Übersetze mich nicht</p> <!-- Do not translate me -->
</html>
```

Không may thay, thuộc tính này không được hỗ trợ bởi tất cả các trình duyệt. Tuy nhiên, có thể giả lập chức năng này bằng cách sử dụng class `.notranslate` - quyết định bởi công cụ dịch trang web của Google. Ví dụ ở hai đoạn văn bản sau:
```html
<html lang="de">
  <p>Übersetze mich!</p> <!-- Translate me! -->
  <p class="notranslate">Übersetze mich nicht</p> <!-- Do not translate me -->
</html>
```
Nếu trang web được dịch ra một ngôn ngữ khác, chỉ có đoạn văn bản đầu được dịch sang ngôn ngữ mới.

![](https://images.viblo.asia/fcf95fe9-5822-48a2-bcbd-381ea284899d.png)

## Phương hướng của văn bản

Trong nhiều ngôn ngữ, phương hướng của văn bản không phải là từ trái sang phải như tiếng Anh. Các ngôn ngữ như Ả Rập, văn bản được viết từ phải sang trái.

Để thay đổi hướng của văn bản, chúng ta có thể sử dụng thuộc tính `dir` với ba giá trị sau:

- `ltr`: Trái sang phải
- `rtl`: Phải sang trái
- `auto`: cho phép thiết bị/trình duyệt quyết định hướng chữ dựa theo nội dung văn bản.

```html
<html lang="ar" dir="rtl">
```

Dựa vào phương hướng gốc trên, trình duyệt sẽ áp dụng CSS tương ứng để chuyển đổi phương hướng của văn bản sử dụng thuộc tính `direction`.

Thuộc tính `direction` của CSS nhận hai giá trị `ltr` và `rtl`

```css
html[dir="rtl"] {
  direction: rtl;
}
```

Thuộc tính này hoạt động giống với thuộc tính `text-align`. Nó không làm thay đổi thứ tự của các từ mà chỉ điều chỉnh phương hướng của chữ cái trong văn bản.

Những thuộc tính khác liên quan đến việc kiểm soát phương hướng văn bản bao gồm:

- `writing-mode`: Xác định văn bản hướng theo chiều dọc hay chiều ngang.
-  `text-orientation`: Xác ddịnh hướng chữ khi ở chiều dọc.

## Các giá trị thay thế 

Đối với hầu hết các trang web được dịch sang các ngôn ngữ khác nhau, sẽ có những trang hiển thị riêng cho từng ngôn ngữ. Ví dụ, có thể có nhiều phiên bản của trang chủ:

- https://adblockplus.org/en/ đối với phiên bản tiếng Anh
- https://adblockplus.org/ar/ đối với phiên bản tiếng Ả Rập
...

Để thiết bị của người dùng biết được tất cả các trang riêng biệt và phân loại chúng giống như trang chủ trên, chỉ cần dịch văn bản sang các ngôn ngữ khác nhau và sử dụng thẻ `<link>` với kiểu quan hệ là `alternate`. Trong thẻ `<head>` của văn bản, chúng ta định nghĩa tất cả các phiên bản thay thế cho trang web.
```html
<html lang="en">
<head>
  <link rel="alternate" href="https://adblockplus.org/ar" hreflang="ar">
  ...
</head>
</html>
```
Chú ý thấy thuộc tính `hreflang` kết hợp với kiểu `alternate` để chỉ định ngôn ngữ của mỗi trang thay thế.

### Các giá trị thay thế đối với những trang mạng xã hội

Khi đường dẫn của trang web được chia sẻ, ngôn ngữ của nó có thể được xác định từ thẻ meta `og:locale`.

```html
<meta name="og:locale" content="en_US">
```

Nếu có nhiều khu vực ngôn ngữ hỗ trợ, có thể sử dụng thẻ meta `og:locale:alternate`
```html
<meta property="og:locale:alternate" content="ar_AR">
```

## Trái, Phải, Đầu, Cuối

Bởi hầu hết các trang web được viết chính thức bằng tiếng Anh nên những thuộc tính của CSS được viết với tư tưởng bắt dầu một dòng từ trái và kết thúc dòng là bên phải. Nhưng các trang web đang có sự quốc tế hóa hơn. Do đó, tình thế đang thay đổi.

Ví dụ với Flexbox, bên trái mặc định của một box được gọi là điểm đầu, bởi đối với một box điểm đầu có thể đi từ bốn phía. Nhiều thuộc tính CSS mới bắt đầu sử dụng cách thức thể hiện này, ví dụ như thuộc tính `margin-inline-start`.

Thuộc tính `margin-inline-start` tương ứng với margin inline ở điểm bắt đầu và có thể bằng với bất kỳ hướng nào trong bốn hướng của thẻ theo hướng của văn bản. Ví dụ, nếu hướng của thẻ là từ phải sang trái thì margin điểm bắt đầu sẽ tương đương với margin bên phải.

```css
span {
  direction: rtl;
  margin-inline-start: 20px; /* Equivalent to margin-right */
}
```

![](https://images.viblo.asia/2a015dec-5012-4532-a0f4-6dbf9e38ade6.png)


Tương tự, nếu `writing-mode` của thể được thiếp lập là chiều dọc và từ trái sang phải, thì điểm bắt đầu sẽ tương đương với margin bên trên.
```css
span {
  writing-mode: vertical-lr;
  margin-inline-start: 20px; /* Equivalent to margin-top */
}
``` 

![](https://images.viblo.asia/e0c639f1-f2eb-415f-ac12-b84f95639fd3.png)

Có những thuộc tính khác hoạt động tương tự. Ví dụ `margin-inline-end` hoạt động tương tự `margin-inline-start` nhưng khác là áp dụng cho điểm cuối của thẻ. Lấy ví dụ ban ban đầu kể trên, nếu hướng văn bản từ phải sang trái thì margin điểm cuối sẽ tương đương với margin bên trái.
```css
span {
  direction: rtl;
  margin-inline-end: 20px; /* Equivalent to margin-left */
}
```

![](https://images.viblo.asia/45801197-a507-42a7-b651-fcefc10116a8.png)

-----


***Tham khảo***

**Ire Aderinokun**, *[Localisation and Translation on the Web](https://bitsofco.de/localisation-and-translation/)*