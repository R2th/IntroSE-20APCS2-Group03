Hé lô các bạn, ở [bài viết trước](https://viblo.asia/p/hieu-ve-css-grid-layout-phan-1-naQZRA6GKvx), mình đã giới thiệu với bạn các cách dụng grid căn bản. Chúng ta đã biết cách tạo một grid, quy định số dòng/cột trong grid, thiết lập khoảng cách giữa các dòng/cột, và sắp xếp các phần tử trong grid theo ý muốn.

Trong bài này, mình sẽ hướng dẫn bạn một số thuộc tính hữu ích khác của CSS Grid cùng demo.

### grid-column

Thuộc tính này giúp chúng ta thiết lập vị trí và kích thước của phần tử theo cột. Nó là viết tắt của 2 thuộc tính `grid-column-start` và `grid-column-end`. Cú pháp của nó như sau `grid-column: grid-column-start / grid-column-end`.


Trong đó giá trị của `grid-column-start` và `grid-column-end` là các tracks line [(mình có giải thích ở bài trước)](https://viblo.asia/p/hieu-ve-css-grid-layout-phan-1-naQZRA6GKvx)

{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/BvRjOE}
![](https://images.viblo.asia/42d57fdd-6e3e-432f-bd47-c752ab7d5ca2.png)

Phần tử item1 mình cho background màu xanh và không set gì hết nên nó nằm ở track line số 1. Còn phần tử item2 mình cho background màu vàng và có `grid-column: 2 / 4` nghĩa là nó sẽ bắt đầu từ track line số 2 tới track line 4 như các bạn thấy ở hình trên.


Còn phần tử item3 có một giá trị là lạ đó là span. Và với `grid-column: span 2 / 7` nên nó sẽ chiếm 2 cột tính từ track line số 7 chạy từ phải qua trái. Giá trị span sẽ tương ứng số cột mà các bạn muốn. Ví dụ `span 2` nó sẽ chiếm 2 cột, `span 1` là một cột.


Ở đây có 2 trường hợp. Trường hợp 1 nếu giá trị span nằm ở đầu như thế này(`grid-colum-start`) `grid-column: span 2 / 7` thì sẽ tính ngược từ phải qua trái bắt đầu từ line số 7 và span 2(chiếm 2 cột).


Trường hợp 2 nếu `grid-column: 5 / span 2`  giá trị span nằm ở sau(`grid-column-end`) thì cũng tạo ra kết quả như Codepen ở trên. Nhưng phần tử sẽ tính từ line số 5 và chiếm 2 cột. Kết quả đều như nhau.

### grid-row

Cũng như trên nhưng thuộc tính này giúp chúng ta thiết lập vị trí và kích thước của phần tử theo hàng. Thuộc tính này được viết tắt của 2 thuộc tính `grid-row-start` và `grid-row-end`. Cú pháp của nó như thế này `grid-row: grid-row-start / grid-row-end`.

![](https://images.viblo.asia/95800e72-d992-411b-9759-dd24cb60b4c5.png)

Phần giải thích sẽ giống ở trên mục `grid-column` nhưng mà theo hàng. Các bạn đọc giải thích ở trên nhưng thay chữ “cột” bằng chữ “hàng” là được.

### grid-template-areas

Thuộc tính cực kỳ hay và hữu ích cho phép chúng ta tạo bố cục layout một cách nhanh chóng, dễ dàng mà lại đơn giản. Để sử dụng thì mình có tạo demo như dưới đây.

{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/EGmPOm}

![](https://images.viblo.asia/2391aad8-e543-41a2-8d0e-699ddcf9d387.png)

Nếu các bạn làm biết cách phân tích bố cục layout một website thì đã quá đơn giản rồi. Chỉ cần hình dung hoặc vẽ ra giấy cấu trúc của nó mà thôi. Rồi sau đó dùng `grid-template-areas: cấu trúc layout` tương ứng với hình mà các bạn vẽ với từng vị trí hiển thị cũng như kích thước của chúng.

Các bạn nhìn vào code và có thể thấy rằng việc tạo bố cục layout bây giờ dường như khỏe hơn rất nhiều. Chỉ cần dùng `grid-template-areas` cho container và dùng `grid-area` cho các phần tử  hiển thị ở vị trí mà các bạn mong muốn.

Ở trên mình tạo bố cục layout có 2 cột và 3 hàng cho container và trong đó `Header` chiếm 2 cột ở trên cùng, `Menu` chiếm 1 cột và 2 hàng ở bên trái sau đó là `Main` content chiếm 1 cột + 1 hàng bên phải và cuối cùng là `Footer` chiếm một cột một hàng dưới cùng bên phải luôn.

Lưu ý nếu các bạn muốn `Header` chỉ chiếm một cột thôi còn cột thứ 2 bỏ trống thì các bạn dùng dấu chấm `.` vào `grid-template-areas` như thế này. Nếu các bạn bỏ trống thì nó sẽ không hoạt động. Vì thế nên cẩn thận khi làm nhé.

```css
#grid {
  grid-template-areas: "head ."
                       "nav  main"
                       "nav  foot";
}
```

### minmax

Hàm này giúp chúng ta thiết lập độ rộng của cột hoặc chiều cao của dòng theo giá trị tối thiểu và tối đa cho phần tử.

Chúng ta có thể sử dụng hàm này như thế này `grid-template-columns: minmax(300px, 500px)` sẽ tạo ra một cột trong đó giá trị 300px đầu tiên sẽ là độ rộng tối thiểu và 500px sẽ là độ rộng tối đa.

Dưới đây là một ví dụ nho nhỏ về hàm `minmax`. Các bạn xem demo kèm giải thích cho dễ  hiểu nhé.

{@embed: https://codepen.io/nguyenhuukhuyenudn/pen/gZWPqq}

Ở trên mình tạo ra 3 cột với cột đầu tiên có `minmax(min-content, 300px)` hàm này sẽ làm cho cột đầu tiên có độ rộng tối đa là 300px và độ rộng tối thiểu là `min-content`. Vậy `min-content` là cái gì vậy nhỉ?

Ngoài `min-content` còn có `max-content` nữa, mình sẽ giải thích sau nhé. Cột số 2 có `minmax(200px, 1fr)` sẽ tạo ra cột có độ rộng tối thiểu là 200px và tối đa là 1fr(free space). Giả sử container có độ rộng là 1000px nhé.

Cột đầu tiên chiếm tối đa 300px, cột thứ 3 chiếm 150px từ đó độ rộng của cột số 2 có 1fr suy ra nó chiếm 1000 – (300 + 150) = 550px. Vậy `min-content` và `max-content` là gì?

Đúng như tên gọi là content nghĩa là nó sẽ phụ thuộc vào content bên trong phần tử theo ví dụ của mình thì nó sẽ phụ thuộc vào các đoạn text bên trong. Các bạn có thể xem Codepen mình làm ở trên để biết nhé.

`Max-content` thì content sẽ rộng ra hết mức có thể với demo Codepen (các bạn có thể thay giá trị min-content thành max-content để thấy kết quả) dù mình đã set `minmax(max-content, 300px) `rồi nhưng khi dùng với `max-content` thì content vẫn sẽ dài ra làm cho độ rộng của phần tử dài ra vượt qua độ rộng tối đa 300px luôn.

`Min-content` thì ngược lại nó sẽ nhỏ lại hết mức có thể. Khi các bạn co trình duyệt lại tới mức phần tử không còn độ rộng tối đa là 300px nữa với `min-content` thì content bên trong sẽ tự động thu nhỏ lại hết mức (phụ thuộc vào từ dài nhất) và tất nhiên các chữ sẽ rớt xuống rồi.

### Tạm kết

Vậy là mình đã trình bày sơ sơ thêm một chút về CSS Grid nữa. CSS Grid nhiều thuộc tính và hàm quá. Các bạn cần demo nhiều mới dễ nhớ được Nếu có công thức hay ý tưởng gì hay về Grid thì đừng ngần ngại commnet nhé. Cảm ơn đã đọc bài và hãy ủng hộ mình ở các bài tiếp theo.