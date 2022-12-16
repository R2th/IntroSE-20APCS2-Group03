Trong lập trình giao diện web, khi chúng ta muốn một thành phần có sự bám dính trên giao diện, cách đơn giản nhất mọi người thường dùng là sử dụng `fixed` cho thuộc tính `position` và có thể kết hợp thêm `javascript` để xử lý. Tuy nhiên, CSS3 đã cung cấp một giá trị mới cho thuộc tính `position` là `sticky` cho phép định nghĩa các thành phần bám dính trên giao diện một cách linh hoạt, không phụ thuộc vào `javascript`.

Hiện tại, CSS3 sticky đã hỗ trợ trên hầu hết các trình duyệt, mọi người có thể tham khảo bảng bên dưới:
![](https://images.viblo.asia/301c4a2e-18bb-4744-b3db-7269986769c8.jpg)

## Cách sử dụng
Để sử dụng position sticky, mọi người chỉ cần đặt thuộc tính này vào thành phần muốn bám dính và định nghĩa khoảng cách căn các lề `top`, `bottom`, `left`, `right`.

VD:
```css
.sticky{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    /*left: 10px;*/
    /*right: 20px;*/
    /*bottom: 10px;*/
}
```

## Lưu ý
- Một thành phần được định nghĩa sử dụng `position: sticky` chỉ hoạt động trong thành phần cha chứa nó (Tức là: chỉ bám dính trên thành phần cha chứa nó, nếu thành phần cha bị scroll ra ngoài window thì thành phần con có sử dụng `sticky` cũng sẽ bị kéo theo).

VD:
```css
body{
    height: 2000px;
}

.cha{
    width: 500px;
    height: 1000px;
    margin: 30px auto;
    padding: 10px;
    background-color: #eee;
}

.con{
    width: 480px;
    height: 300px;
    margin-top: 30px;
    background-color: #666;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```
{@embed: https://jsfiddle.net/candysp/4nptfmvc/embed/result,html,css/dark}

- Các lề `top`, `bottom`, `left`, `right` sẽ lấy các lề của khung chứa nó làm gốc.

## Ví dụ sử dụng sticky trong hiển thị bảng
{@embed: https://jsfiddle.net/candysp/1t2fy5d0/embed/result,html,css/dark}