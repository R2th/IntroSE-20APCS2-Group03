## 1. Adjacent sibling selectors :
`tag01 + tag02 {CSS}` : Chọn tất cả thành phần `tag02` được đặt cùng cấp và kề ngay sau thành phần `tag01`( mỗi `tag01` chỉ có 1 `tag02` kề ngay sau ).

Ví dụ minh họa:
{@embed: https://codepen.io/hoangtrunghuy/pen/rPPYbr}

Trong ví dụ trên thì bạn có thể hiểu rõ hơn rằng khi dùng `div + p {}` thì chỉ các thẻ `<p>` cùng cấp với `<div>`  và liền kề ngay sau `<div>` sẽ nhận được CSS là có nền màu vàng( chỉ chọn   những thẻ `<p>` kề sau đầu tiên ), còn lại các thẻ `<P>`  là con của `<div>` và không nằm liền kề sẽ không nhận được CSS.
## 2. General sibling selectors : 
`tag01 ~ tag02 {CSS}` : Chọn tất cả thành phần `tag02` khi có thành phần `tag01` cùng cấp ở trước.

ví dụ minh họa:
{@embed: https://codepen.io/hoangtrunghuy/pen/zeejZX}


Từ ví dụ này bạn có thể hiểu đơn giản đây là trường hợp mở rộng hơn cho **Adjacent sibling selectors**, tức là nếu `tag01 + tag02 {CSS}`chỉ chọn 1 phần từ là *kề ngay sau* thì `tag01 ~ tag02 {CSS}` sẽ là chọn tất cả các phần từ là *kề sau* và cùng cấp. Cụ thể ở đây có tất cả 3 thẻ `<p>` là kề sau của `<div>` sẽ đều có nền màu vàng.
## 3. Child selectors : 
`tag01 > tag02 {CSS}` : Chọn tất cả thành phần `tag02` là con cấp 1 của thành phần  `tag01`.

Ví dụ minh họa:
{@embed: https://codepen.io/hoangtrunghuy/pen/qggyEY}

Trong ví dụ này thì chỉ những thẻ `<p>` là con cấp 1 của `<div>` sẽ nhận  CSS có nền màu vàng, còn lại các thẻ `<p>` không phải là con hoặc là con nhưng ở cấp 2 thì sẽ không nhận được CSS.
## 4. Descendant selectors : 
`tag01 tag02 {CSS}` : Chọn tất cả thành phần `tag02` bên trong thành phần `tag01`.

Ví dụ minh họa:
{@embed: https://codepen.io/hoangtrunghuy/pen/MLLBrE}

Ở ví dụ này thì đây lại là trường hợp mở rộng hơn cho **Child selectors** tức là nếu `tag01 > tag02 {CSS}` chỉ chọn các phần tử là con cấp 1, thì `tag01 tag02 {CSS}`sẽ chọn toàn bộ các `tag02` là con của `tag01` mà không quan tâm đến `tag02` là con cấp thứ bao nhiêu.




-----


Trên đây là phần chia sẻ nho nhỏ của mình về một số Combinator hữu ích hay dùng trong CSS, mong rằng bài viết này sẽ có ích đối với bạn. Nếu bạn có thêm những lưu ý mới hãy chia sẻ cho mình biết dưới bình luận nhé! Cảm ơn bạn :blush: :blush: