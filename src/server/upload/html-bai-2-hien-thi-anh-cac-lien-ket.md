Như vậy là chúng ta đã tạo ra được trang web sơ khai đầu tiên với một vài thẻ HTML đơn giản. Hãy cùng tiếp tục xem HTML có thể giúp chúng ta hiển thị những nội dung khác nữa như thế nào. Trong bài viết thứ hai này, chúng ta sẽ thử tìm cách chèn ảnh và các liên kết vào trong trang web đơn đã có.

## Thêm hình ảnh vào trang đơn

Đầu tiên, chúng ta hãy cùng khám phá phép màu của trình soạn thảo Atom trước đã!

- Mở Atom và nhấn `Ctrl + o` để mở tệp `index.html` đã lưu ở bài trước.
- Trong khung soạn thảo, bạn hãy xóa hết các nội dung đã có trước đó.
- Gõ chữ `im` và nhấn phím `Enter`.

`Ảnh chụp màn hình`
![trình soạn thảo code Atom](https://images.viblo.asia/b9efe2cf-a91e-4741-b974-3f2794eac619.png)

Tuyệt... Chúng ta mới chỉ gõ vào `2 ký tự` và bằng cách nào đó thì Atom đã biết là chúng ta muốn gắn thêm một file ảnh vào trang web đơn này. Bây giờ chúng ta cần chỉ cho trình duyệt web biết `nơi` để lấy file ảnh -

- Sao chép/Dán đường dẫn này `https://bit.ly/3pAQSV4` vào vị trí `src=""`.
- Lưu và mở lại tệp bằng trình duyệt web của bạn.

`Ảnh chụp màn hình`
![thẻ img](https://images.viblo.asia/5fba0a2b-eb28-4c0e-9695-1c207d0629fe.png)

Chúng ta vừa mới sử dụng một tệp ảnh được lưu trữ online để nhúng vào trang đơn đã có. Trong trường hợp bạn không muốn sử dụng hình ảnh được lưu trữ tại trang web khác, bạn có thể tạo ra một thư mục có tên dạng như `images` đặt cùng chỗ với tệp `index.html` và đặt tất cả các tệp ảnh vào trong đó. Lúc này ở thuộc tính `src`, bạn gõ vào tên của thư mục ảnh và theo sau bởi một dấu `/` và `tên của tệp ảnh`. Trình duyệt web sẽ bắt đầu tìm kiếm từ thư mục đang chứa tệp `index.html` và đi theo đường dẫn được cung cấp để lấy tệp ảnh cần hiển thị.

`Ảnh chụp màn hình`
![](https://images.viblo.asia/c7134664-c36a-46bf-9006-475c464739d8.png)

Liên kết tham khảo: [Các định dạng ảnh được hỗ trợ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Supported_image_formats)

## Các thẻ HTML đơn

Có thể bạn sẽ nhận ra rằng có 1 vài điểm hơi kỳ lạ trong ví dụ vừa rồi. Chúng ta mới chỉ gặp các thẻ HTML được thiết kế theo cặp `1 thẻ đóng & 1 thẻ mở`. Thế nhưng thẻ `<img>` mà chúng ta vừa sử dụng lại chỉ có một mình.

Đúng là như vậy, có một số thẻ HTML được thiết kế để đứng đơn lẻ. Các thẻ này được gọi ngắn gọn là các thẻ đơn. Tuy nhiên, những thẻ này cũng không có gì quá đặc biệt đâu. Chỉ đơn giản là chúng không cần phải ghép đôi với một thẻ đóng mà thôi.

Một ví dụ khác về thẻ đơn đó là `<br>`. Thẻ này được sử dụng để biểu thị một dấu ngắt<br>dòng  và thường được sử dụng trong các `<p>` nếu như bạn muốn viết một bài thơ.

> Viết thơ thì phải xuống<br>
> dòng.  
> *_Một người sử dụng máy tính*

Hãy cùng nói về điểm kỳ lạ tiếp theo trong ví dụ trước.

## Các cuộc tính của thẻ

[Các thuộc tính - hay `attribute`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) - giúp chúng ta cung cấp các thông tin mô tả thêm về các phần tử HTML. Như bạn đã thấy thì chúng ta đã cung cấp một đường link để nói với trình duyệt web `nơi` tìm tệp ảnh cần hiển thị trong ví dụ trước bằng thuộc tính `src`.

Thuộc tính [`alt` (alternative)](https://www.w3schools.com/tags/att_img_alt.asp) - được sử dụng để thêm vào một đoạn văn bản mô tả nội dung `thay thế` cho tệp ảnh cần hiển thị. Đoạn văn bản mô tả thay thế này được sử dụng dự phòng cho trường hợp máy tính của hàng xóm của bạn không tải được tệp ảnh cần hiển thị. Có thể là trong trường hợp đường truyền internet bị gián đoạn hay tệp ảnh đã được di chuyển tới nơi nào đó khác, v.v...

## Làm thế nào để thêm các liên kết vào trang web?

Hãy thử làm gì đó khác với Atom:

- Trong dòng tiếp theo của phần soạn thảo, bạn gõ `a` rồi nhấn phím `Enter`.
- Bây giờ chắc là bạn đã nhìn thấy một cặp thẻ `<a href="#"></a>` hiện lên.
- Hãy thay thế ký hiệu hash `#` trong thuộc tính `href` bằng liên kết này: `https://bit.ly/3pyAWmg`.
- Di chuyển thẻ `<img>` trước đó vào bên trong cặp thẻ `a (anchor)`.
- Lưu tệp và làm mới lại Tab trên trình duyệt web của bạn.
- Bây giờ thì nhấn trỏ chuột vào tấm ảnh được hiển thị.
- Và nếu bạn đang có dư thời gian rảnh thì có thể đọc thông tin trong liên kết vừa sử dụng. :D

```index.html
<a href="https://bit.ly/3pyAWmg">
   <img src="images/trees.jpg" alt="">
</a>
```

Thực tế thì chúng ta có thể sử dụng cặp thẻ `<a></a>` để bao quanh bất kỳ nội dung nào trong trang web như các đoạn văn bản, hình ảnh, hoặc một khối nội dung phức tạp bao gồm nhiều thứ - để tạo ra một vùng có thể nhận nhấp trỏ chuột và liên kết tới đâu đó.

Ồ, và bây giờ thì chúng ta vừa biết thêm được rằng các phần tử HTML có thể được xếp chồng bằng cách lồng các thẻ HTML. Thẻ nào bao quanh ở ngoài thì sẽ được hiển thị làm nền và thẻ ở bên trong sẽ được hiển thị xếp chồng lên trên vào cùng vị trí đó. Điều này có nghĩa là chúng ta hoàn toàn có thể tự do cấu trúc một văn bản HTML cho phù hợp với ý muốn sử dụng.

## Nếu như... ?

> Nếu như chúng ta muốn tạo ra các liên kết giữa các trang đơn với nhau chứ không chuyển đến một trang web khác bên ngoài thì phải làm như thế nào?

Cái này ~~không~~ dễ lắm. (Bạn thông cảm nhé. Có một lỗi chính tả ở đây. :D)  
Chúng ta chỉ cần cung cấp đường dẫn tương quan như trong ví dụ về thẻ `<img>` trước đó.

- Trước hết hãy đặt hai trang đơn trong cùng thư mục.
- Trong thuộc tính `href`, chỉ cần trỏ tới tệp mà bạn mong muốn bằng cách gõ tên tệp.

`Ảnh chụp màn hình`
![](https://images.viblo.asia/73241714-3d20-4b75-b59b-073b3162f49b.png)

> Nếu như chúng ta muốn tạo ra một liên kết để di chuyển tới một phần đặc biệt nào đó của một trang web đơn cuộn dài thì phải làm như thế nào?

Có một thuộc tính HTML được gọi là [`id` (identity)](https://www.w3schools.com/tags/att_id.asp) - hay còn được gọi một cách văn vẻ là `định danh`. Bạn có thể sử dụng thuộc tính này để đặt tên cho một phần tử HTML bất kỳ và sau đó sử dụng tên này để trỏ tới trong thuộc tính `href` của thẻ `<a>` (thêm vào dấu hash `#` ở phía trước).

```identity.html
<a href="#beauty">Read about the beauty only</a>

<p id="green">
   It's not easy being green.<br>
   It seems you blend in with so many other ordinary things.<br>
   And people tend to pass you over<br>
   'cause you're not standing out like flashy sparkles in the water<br>
   or stars in the sky.
</p>

<p id="beauty">
   But green's the color of Spring.<br>
   And green can be cool and friendly-like.<br>
   And green can be big like a mountain,<br>
   or important like a river,<br>
   or tall like a tree.
</p>
```

Đoạn code vừa rồi hoạt động tốt trên trình duyệt web của bạn chứ? Nếu không thì có lẽ bạn cần khiến đoạn văn bản đó dài thêm một chút để trang web có thể được cuộn lên xuống bằng trỏ chuột.

Ồ... Mình đã không để ý rằng bài hướng dẫn của chúng ta đã quá dài. Hãy nghỉ giải lao một chút nhé. Trong bài viết tiếp theo, chúng ta sẽ cùng nói về các nội dung nhúng.

[Bein' Green](https://www.youtube.com/watch?v=z4ZxxHbJGbY)

> “What if being green is not easy?”  
> “How about being blue or yellow instead?”  
> “But green is beautiful.”  
> “Then why wonder?”

[[HTML] Bài 3 - Các Nội Dung Nhúng](https://viblo.asia/p/Az45bRJN5xY)