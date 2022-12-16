Chào mọi người, hôm nay mình sẽ làm một số ví dụ về layout mà chúng ta thường gặp.

Anh em Backend thường nói "*làm ép e dễ mà, chỉ cần nhớ mấy cái thẻ `HTML` với thuộc tính `CSS` bỏ vào là xong chứ gì...*" à mà câu đó là của mấy bạn mới ra trường thôi, chứ mấy anh Dev từng trải không ai nói vậy. Nếu bạn là một Frontend Developer, những task liên quan đến Markup UI chắc hẳn chúng ta đã từng trải qua nhiều dạng layout, đặc biệt là xây dựng landing page hay web tương tác user. Những website như vậy mình rất hứng thú vì giao diện bắt mắt, hiệu ứng bay nhảy làm mình cũng vui hơn thay vì làm việc với những layout table dữ liệu nhàm chán. Tuy nhiên với những layout đẹp nó lại có độ phức tạp cao trong việc xây dựng và maintain, vì vậy việc đưa ra ý tưởng xây dựng trước khi code là một điều cần thiết.

![](https://images.viblo.asia/e8d0030d-be14-4147-a5a9-81635e4728e5.png)

Bài viết này hoặc có thể những bài sau sau sẽ là một chuỗi series chia sẻ về những dạng layout thường gặp.

### 1. Layout multi row với flex
Thông thường, flex được biết đến để dựng layout khi nó là hàng hoặc cột. Với trường hợp có nhiều item trên 1 row, để giãn các phần tử đều nhau và bám 2 bên bạn sẽ dùng `justify-content: space-between`. Tuy nhiên, cách này sẽ có nhược điểm không dùng cho trường hợp nhiều row được. Để mình cho bạn xem ví dụ nhé.

![](https://images.viblo.asia/912af0c8-fbd5-401e-99fe-63493ad35a09.png)
Trường hợp row có một item trống sẽ xảy ra tình trạng trên. Vì vậy mình sẽ dùng thủ thuật sau để có thể giãn đều các item mà vừa dùng cho nhiều row.
#### Ý tưởng thực hiện:
- List bọc các item bằng `flex`
- Ví dụ này mình sẽ cho `3 item trên 1 row`. Mỗi item có `width - 10px => 3(item) * 10px = 30px` sẽ trống ra `30px` khoảng cách.
-  Trừ item cuối ra, thì mỗi item trước đó (ở đây là 2 item) của 1 row sẽ có `margin-right = 30px / 2 = 15px`.

```pug
.list
  .item
  .item
  .item
  .item
  .item
```

```scss
* {
  box-sizing: border-box;
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 15px 0;
  background: #FFC107;
}

.item {
  background: #FF5722;
  // 100% / 3 để chia item thành 3 cột (33%), -10px tức là mỗi item sẽ trống 10px => 3 * 10px = 30px
  width: calc((100% / 3) - 10px);
  height: 200px;
  margin-bottom: 15px;

  // nth-child(3n) là những item vị trí là bội của 3, :not là những item khác điều kiện
  &:not(:nth-child(3n)) {
    // 1 row trống 30px, khoảng cách giữa sẽ là (item trên 1 row - 1) / 2. Vì thằng cuối cùng không có margin.
    margin-right: 15px;
  }
}
```
Khá đơn giản, bạn cũng có thể áp dụng nó cho số lượng item trên 1 row nhiều hơn. Bạn cũng có thể xem demo ở đây:
https://codepen.io/nguyenhuukhuyenudn/details/WNvzoGv

### 2. Layout change position avatar responsive
Một dạng layout nữa, đó là kiểu layout khi ở trên PC sẽ hiển thị thành 2 cột, một bên là avatar còn một bên là content. Khi responsive về màn hình nhỏ hơn thì avatar sẽ lọt vào giữa `title` và `desciption`. Để dễ hình dung, bạn có thể xem hình mình demo bên dưới.

![](https://images.viblo.asia/2162c76e-fa42-441d-8632-07c8f9944a69.png)

#### Ý tưởng thực hiện:
- **Ban đầu** cấu trúc `html` giống như hình ở mobile, theo thứ tự `title > avatar > content > button`
- Padding trái của wrapper sẽ bằng hoặc lớn hơn size avatar để giữ chỗ cho avatar
- Avatar sẽ để `position: absolute` khi đó sẽ không còn chiếm height nữa
- Style vị trí của avatar phù hợp với design
- **Về responsive**:
- Avatar sẽ thành `position: relative` lúc này size avatar sẽ trở lại như bình thường
- CSS lại size của avatar auto với wrapper

```pug
.card
  h3.card__title
    a(href="#") Lorem, ipsum dolor
  .card__avatar
    img(src="https://www.baohanam.com.vn/DATA/0/2019/09/anh_di_san-16_57_57_677.jpg", alt="")
  .card__description Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique cupiditate, doloremque expedita, fugit esse totam veniam ab maxime consectetur nesciunt fugiat, quis hic tempora temporibus beatae laborum cumque qui! Accusamus.
  a.card__button(href="#") Read more
```

```scss
.card {
  position: relative;
  width: 700px;
  box-shadow: 0px 14px 80px rgba(#000, 0.2);
  padding: 50px 50px 50px 140px;
  background: #fff;
  border-radius: 20px;
  
  &__avatar {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 220px;
    border-radius: 20px;
    box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
    overflow: hidden;
  }
  
  &__title {
    padding: 10px 0;
    
    a {
      color: #5D4037;
      font-size: 30px;
      font-weight: 600;
      line-height: 1.35;
      text-decoration: none;
    }
  }
  
  &__description {
    margin: 10px 0;
    color: #333;
    line-height: 1.35;
  }
  
  &__button {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 25px;
    background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
    color: #fff;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    border-radius: 50px;
    box-shadow: 0px 14px 60px rgba(252, 56, 56, 0.4);
  }
}

// Responsive khi màn hình <= 640px
@media screen and (max-width: 640px) {
  .card {
    padding: 20px;
    
    &__avatar {
      width: 100%;
      position: relative;
      top: 0;
      lef: 0;
      transform: translate(0, 0);
    }
    
    &__description {
      margin: 20px 0;
    }
    
    &__button {
      display: block;
    }
  }
}
```

Bạn có thể xem phần demo ở đây: https://codepen.io/nguyenhuukhuyenudn/details/KKpoaPv

## Tổng kết
Trên đây là 2 dạng layout mình thường làm. Ngoài cách mình chia sẻ nếu bạn có cách tối ưu hơn hãy chia sẻ bên dưới nhé. Hãy tiếp tục đón xem phần sau, mình sẽ cùng mọi người xử lý thêm một vài kiểu layout thú vị khác nữa.