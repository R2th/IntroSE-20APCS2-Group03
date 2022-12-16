**Trong bài này, chúng ta sẽ tìm hiểu về CSS Flexbox, đã trở thành một trong những kỹ năng bắt buộc của một Web Developer và Designer trong vài năm trở lại đây.**

Chúng ta sẽ sử dụng thanh điều hướng (navbar) như là một ví dụ, bởi vì nó là trường hợp điển hình sử dụng CSS Flexbox. Chúng ta sẽ tiếp cận đến các thuộc tính được sử dụng nhiều nhất và bỏ qua những thuộc tính không quá quan trọng

# Layout Flexbox đầu tiên
Hai thành phần chính của một Flexbox layout đó là ***container*** và ***items***

Ở đây có một ví dụ về HTML, nó gồm một container có chứ 3 items

```
<nav class="container">
  <div>Home</div>
  <div>About</div>
  <div>Contact</div>
</nav>
```

Trước khi chúng ta biến nó thành một Flexbox layout, chúng sẽ được xếp chồng lên nhau như dưới đây:

![](https://images.viblo.asia/e7d7dcc5-91e8-43c6-a712-2918d922026a.png)

Mình sẽ thiết kế lại một chút để chúng ta có thể dễ dàng quan sát hơn. Phần này mình sẽ không show cụ thể code vì nó không quá liên quan đến vấn đề mà chúng ta đang muốn tìm hiểu là CSS Flexbox:

![](https://images.viblo.asia/8c1b05c4-4d60-4b3f-b209-ae12eda4cb8f.png)

Để biến ví dụ trên thành một Flexbox layout, đơn giản chúng ta chỉ cần cung cấp cho **container**  thuộc tính CSS sau:

```
  .container {
    display: flex;
  }
```

Điều này sẽ tự động sắp xếp những item con thuộc **container** theo chiều ngang:

![](https://images.viblo.asia/22aadde4-6aba-4391-a40a-10c86087d0bd.png)

Bây giờ chúng ta sẽ xáo trộn chúng một chút bằng cách sử dụng những thuộc tính dưới đây!

# Justify Content và Align Items

`justify-content` và `align-items` là 2 thuộc tính giúp chúng ta phân bố những phần tử con trong **container**. Chúng kiểm soát cách các phần tử được sắp xếp theo chiều dọc và chiều ngang.

Bây giờ chúng ta sẽ sử dụng jutify-content để căn giữa cả 3 phần tử con của **container** trong ví dụ đầu tiên:

```
  .container {
    display: flex;
    justify-content: center;
  }
```

Ta được kết quả như phía dưới:

![](https://images.viblo.asia/c0d5634a-4deb-4522-bcbd-b21a6d6ba594.png)

Hoặc chúng ta có thể tạo giữa các phần tử con một khoảng trống bằng cách thay đổi giá trị của `justify-content` từ `center` thành `space-between`

```
  .container {
    display: flex;
    justify-content: space-between;
  }
```

![](https://images.viblo.asia/db1c0851-d349-4414-805f-b46945086663.png)

Dưới đây là một số giá trị của thuộc tính `justify-content` mà bạn có thể sử dụng:

* flex-start (**default**)
* flex-end
* center
* space-between
* space-around
* space-evenly

Mình khuyến khích các bạn nên sử dụng thử những giá trị này và xem chúng hiên thị như thế nào trên trình duyệt. Điều này sẽ giúp chúng ta hiểu sâu hơn.

Nếu như `justify-content` kiểm soát cách hiển thị của các phần tử theo chiều ngang thì `align-items` lại kiểm soát chúng theo chiều dọc. Ở ví dụ về thanh điều hướng này thì chúng ta sẽ không sử dụng đến thuộc tính `align-items` nhưng mình sẽ demo cho các bạn một ví dụ nhỏ để chúng ta có thể hiểu thêm về nó

```
.box {
    display: flex;
    justify-content: center;
    background-color: yellow;
    height: 300px;
}

.box div {
    width: 100px;
    height: 100px;
   background-color: red;
}


<div class="box">
    <div></div>
</div>
```

![](https://images.viblo.asia/c1df8669-2fcb-4fda-aba1-0ae2a8978270.png)

Chúng ta sẽ căn giữa hình vuông màu đỏ bên trên theo chiều dọc bằng cách gán giá trị `center` cho thuộc tính `align-items`

```
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellow;
    height: 300px;
}
```

![](https://images.viblo.asia/a54be652-eece-472d-9a38-1b63634a5c4c.png)

Cũng như justify-conten, align-items cũng có một số giá trị mà chúng ta có thể vận dụng trong từng trường hợp nhất định. Bạn có thể tìm hiểu thêm về nó sau khi đã nắm được cơ bản về CSS Flexbox:

* stretch (**default**)
* flex-start
* flex-end
* baseline

# "Control" một phần tử

Trở lại với ví dụ ở đầu bài viết, chúng ta có thể căn chỉnh một phần tử trong **container**. Ta sẽ giữ nguyên 2 phần tử đầu, nhưng sẽ di chuyển phần tử cuối cùng về phía bên phải - ở đây chính là `contact`

```
// đặt cho phần tử cuối cùng một class là contact

.contact {
    margin-left: auto;
 }
```

![](https://images.viblo.asia/2fa801d0-d5d3-4711-9f60-7ba8a4d315be.png)

Nếu bạn muốn cả mục `about` và mục `contact` cùng được di chuyển về bên phải, ta sẽ thêm thuộc tính `margin-left` cho mục `about`:

```
.about {
    margin-left: auto;
 }
```

![](https://images.viblo.asia/32028157-bf9f-4777-bcde-5c155d1d985a.png)

# Thuộc tính Flex
Nãy giờ, chúng ta mới chỉ làm việc với những phần tử có chiều rộng cố định. Điều gì sẽ xảy ra nếu như chúng ta muốn một layout responsive? Để giải quyết vấn đề đó, chúng ta sẽ sử dụng một thuộc tính có tên là `flex`. Nó sẽ dễ dàng hơn so với cách sử dụng giá trị % trước đây.

Bây giờ chúng ta chỉ đơn giản gắn cho cho tất cả các phần tử con thuộc tính `flex` có giá trị bằng 1:

```
.container > div {
    flex: 1;
}
```

![](https://images.viblo.asia/9ae9f4c3-7563-4fe7-bb51-55f4c03b7092.png)

Như chúng ta thấy, nó sẽ tự động kéo dài các mục để lấp đầy được mục cha

Trong nhiều trường hợp, ta có thể để một phần tử chiếm khoảng không gian chưa được "lấp đầy" của **container** bằng cách sử dụng thuộc tính flex cho riêng phần tử đó. Ví dụ ở đây mình set cho mục `contact`:

```
.contact {
  flex: 1;
}
```

Khi đó, chiều rộng của `contact` sẽ là phần còn lại của **container** - ( chiều rộng của `home` + chiều rông của `about` )

![](https://images.viblo.asia/a954fc47-d8b4-45fa-975a-4d863c3bd521.png)

Trước khi kết thúc bài viết này, mình muốn đề cập thêm 3 thuộc tính khá thông dụng của CSS Flexbox là : **flex-grow**, **flex-shrink** và **flex-basis**. Tuy nhiên, để có thể "clear" được chúng thì chúng ta sẽ phải mất hơn "5 phút", vậy nên nó nằm ngoài phạm vi của bài viết này :).

Nhưng nếu như các bạn có hứng thú tìm hiểu thêm về chúng, các bạn có thể tìm hiểu những bài viết, tài liệu trên mạng hoặc chờ đợi những bài viết tiếp theo về CSS Flexbox của mình. Cảm ơn các bạn đã dành thời gian theo dõi bài viết này. Hi vọng nó sẽ giúp các bạn tiếp cận dễ dàng hơn với CSS Flexbox.