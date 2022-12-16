![](https://images.viblo.asia/12841e77-2f7e-4a83-87ab-37b2c79334cf.jpg)
Xin chào các bạn, với Front-end thì việc căn phần tử theo trái/phải/trên/dưới là chuyện như cơm bữa. Việc căn phần tử theo chiều ngang thì có vẻ suôn sẻ, vậy còn theo chiều dọc thì sao ? liệu bạn đã trang bị cho mình đầy đủ giáp gai để ứng phó với mọi tình huống éo le trong thực tế chưa, hãy cùng mình điểm qua một vài kỹ thuật "Căn giữa phần tử theo chiều dọc trong CSS" qua bài viết này nhé

## 1. Sử dụng thuộc tính `vertical-align `
{@embed: https://codepen.io/hoanghung96cs/pen/yLyXjdX}

`vertical-align: middle;` sinh ra là để tập trung các phần tử theo chiều dọc, kết hợp với `display: table-cell;` như ví dụ trên, ta có thể làm cho phần tử cách đều trên/dưới

## 2. Sử dụng flexbox kết hợp với `margin`
{@embed: https://codepen.io/hoanghung96cs/pen/oNgwdKJ}

Khi sử dụng flexbox, các flex-item có `margin: auto;` luôn rất ảo diệu, việc gán giá trị `margin-top/bottom: auto;` giúp đẩy phần tử vào giữa flex-container theo chiều dọc (tương tự với chiều ngang)

## 3. Sử dụng flexbox với `align-items`
{@embed: https://codepen.io/hoanghung96cs/pen/xxbrzKa}

`align-items` chúng ta thường dùng để căn chỉnh các phần tử với nhau, nhưng khi trong flex-container chỉ chứa 1 flex-item thì nó lại giúp ta căn giữa theo chiều dọc rất mượt mà

## 4. Sử dụng `display:table`
{@embed: https://codepen.io/hoanghung96cs/pen/RwNgJwX}

Ví dụ này khá giống ví dụ 1, chỉ khác ta sẽ  "lồng phần tử table-cell vào phần tử table để nó hiển thị như 1 table" :laughing:

## 5. Sử dụng `line-height`
{@embed: https://codepen.io/hoanghung96cs/pen/KKwqewm}

`height` bao nhiêu cho `line-height` bấy nhiêu cũng là một giải pháp không tồi

## 6. Sử dụng `padding`
{@embed: https://codepen.io/hoanghung96cs/pen/XWJgYbq}

`padding-top` = `padding-bottom` cũng giúp ta căn đều phần tử theo chiều dọc

## 7. Sử dụng `position: absolute` kết hợp với `margin` âm
{@embed: https://codepen.io/hoanghung96cs/pen/bGNRKEw}

Theo ví dụ bạn chỉ cần **set up đủ bộ combo position, top, left** các kiểu và sử dụng `margin` âm = 1/2 `height` của phần tử sẽ giúp phần tử ở giữa cha củ nó

## 8. Sử dụng `position: absolute` kết hợp với `transform`
{@embed: https://codepen.io/hoanghung96cs/pen/wvBeXGW}

Cách này có vẻ xịn xò hơn cách 7 vì: CSS3 hỗ trợ hàm translate() tính toán theo kích thước nội tại của element, còn left/top để tính toán vị trí theo kích thước của parent, nên ta có dịch chuyển cho tâm của parent và child trùng với nhau, nhờ đó căn giữa được đối tượng theo cả 2 chiều ngang/dọc. 

## 9. Sử dụng `float`
{@embed: https://codepen.io/hoanghung96cs/pen/ZEYyRLx}

Bản thân mình rất ít khi dùng float vì phải clear rất mất công tuy nhiên đây cũng là một phương án được dùng để căn giữa phần tử theo chiều dọc

## Kết luận

Trên đây mình đã giới thiệu tới các bạn một số cách căn giữa phần tử theo chiều dọc thường được sử dụng, chắc chắn sẽ còn nhiều cách hay ho hơn hi vọng sẽ đến từ khung bình luận.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !

//
Tham khảo: https://www.w3docs.com/snippets/css/how-to-vertically-center-text-with-css.html