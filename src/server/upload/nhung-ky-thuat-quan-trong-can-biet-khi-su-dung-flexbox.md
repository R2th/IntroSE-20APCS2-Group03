- Chào mọi người !

- Hôm nay mình giới thiệu đến các bạn những kĩ thuật quan trọng khi mọi người sử dụng flexbox.

- Flexbox là một chuẩn CSS được tối ưu hoá để thiết kế giao diện người dùng. Chúng ta có thể sử dụng các thuộc tính của Flexbox để xây dựng lên trang web của mình theo từng block nhỏ. Các block này có thể dễ dàng thay đổi vị trí và kích thước theo bất kỳ cách nào mà chúng ta muốn. Các website và web app sử dụng flexbox có thể reponsive với mọi kích thước màn hình khác nhau

- Ở bài viết này chúng ta sẽ xem xét các kĩ thuật Flexbox để xây dựng CSS layout, và đưa ra các ví dụ cụ thể của các kỹ thuật đó.


## Xây dựng các box, các cột (column)... có chiều cao bằng nhau

- Nghe thì có vẻ đơn giản, nhưng thực sự để làm cho các column có chiều cao bằng nhau thật sự không dễ dàng. Nếu chúng ta chỉ set min-height thì sẽ không có tác dụng, vì khi nội dung trong các column khác nhau, thì sẽ có một số column có chiều cao lớn hơn các column khác.

- Flexbox sẽ giải quyết vấn đề này triệt để và cực kỳ đơn giản, bởi vì chiều cao bằng nhau là một thuộc tính mặc định trong Flexbox.  Tất cả những gì chúng ta cần làm là sử dụng flex, và đảm bảo rằng các thuộc tính **flex-direction** và **align-item** có giá trị mặc định.

![](https://images.viblo.asia/89bba44c-f399-4401-8572-c3816ea8b006.jpg)
```
    .box-demo {
      /* sử dụng flex */
        display: flex;
        /* set các giá trị cho các thuộc tính của flex */
        flex-direction: row;    /* Các item bên trong .box-demo sẽ bố trí theo chiều ngang (row) */
         align-items: stretch;   /* Các item bên trong .box-demo sẽ có chiều cao bằng chiều cao của box-demo */
   }
```


- Các bạn có thể tham khảo demo của kỹ thuật này thông qua demo ở đây https://codepen.io/vungocyen/pen/vMjoav


##  Sắp xếp lại các Element

- Trước đây, khi phải thay đổi thứ tự của các element một cách tự động , chúng ta có thể cần sử dụng một số thủ thuật với CSS, và sử dụng cả JavaScript. Với Flexbox, chúng ta chỉ cần sử dụng một thuộc tính của CSS để giải quyết bài toán này.

- Nó được gọi là **order**, cho phép chúng ta đổi vị trí của nhiều flex item, và thay đổi thứ tự xuất hiện của chúng trên màn hình. Tham số duy nhất của nó là một số nguyên, xác định vị trí của element, số càng thấp thì mức độ ưu tiên càng cao. 

![](https://images.viblo.asia/a95fda24-7b99-4e3e-8188-5294b528bab9.png)


```
.box-demo {
    display: flex;
}

/* đảo ngược thứ tự các element */

.box1 {
    order: 3;
}

.box2 {
    order: 2;
}

.box3 {
    order: 1;
}
```

- Thuộc tính **Order** có rất nhiều ứng dụng thực tế.  Nếu muốn xem sản phẩm thực tế, các bạn có thể xem [ở đây ](https://demo.tutorialzine.com/2015/11/using-flexbox-to-create-a-responsive-comment-section/) .Và xem demo đơn giản ở đây. https://codepen.io/vungocyen/pen/NmzKbb



##  Căn giữa cho Horizonal và Vertical 

- Căn giữa theo chiều doc(vertical) là một vấn đề tưởng chừng đơn giản nhưng lại rất phức tạp trong CSS. Nếu các bạn tìm kiếm cách giải quyết cho việc căn giữa vertical, thì hầu hết kết quả nhận được là sử dụng bảng, hoặc dùng transform. Những cách giải quyết này đều không được sử dụng để tạo layout.

- Flexbox cung cấp giải pháp đơn giản hơn để giải quyết vấn đề này. Mỗi flex layout có 2 trục (trục X và trục Y) và 2 thuộc tính riêng biệt để căn chỉnh theo 2 chiều.  Khi muốn căn chỉnh 1 element vào chính giữa , chúng ta chỉ cần center cả 2 thuộc tính của flexbox

![](https://images.viblo.asia/e63d5c44-c001-427f-9c96-603d77713faa.png)


```
.box-demo {
    display: flex;
    
    /* Căn giữa theo trục X */
    justify-content: center;

    /* Căn giữa theo trục Y */
        align-items: center;
}
```


Các bạn có thể xem việc sử dụng kỹ thuật này  [tại đây](https://codepen.io/vungocyen/pen/xezKXM)


##  Tạo full responsive grids

- Hầu hết developer đều sử dụng một framework CSS nào đó để tạo một responsive grids. Bootstrap là một framework nổi tiếng nhất, ngoài ra còn hàng trăm framework khác cũng có thể giúp chúng ta làm việc này. Các framework này thường hoạt động rất tốt, và có rất nhiều tuỳ chọn để tuỳ biến, nhưng lại thường khá nặng. Nếu bạn là một người không muốn sử dụng cả một framework chỉ để dựng mỗi grid responsive, thì các bạn có thể sử dụng Flexbox.

- Mỗi một hàng trong Flexbox grid chỉ đơn giản là một container với display:flex. Các horizonal column bên trong nó có thể là số lượng bất kỳ các element, kích thước của chúng được set thông qua flex.  Flex thích ứng với kích thước màn hình, vì vậy thiết lập này sẽ trông ổn trên tất cả các thiết bị. Tuy nhiên, nếu các bạn cảm thấy không đủ không gian theo chiều ngang trên màn hình, các bạn có thể dễ dàng chuyển đỏi sang dạng dọc với @media-query


![](https://images.viblo.asia/a0f35eaf-5651-405d-be80-56dde4a7bc3a.png)
![](https://images.viblo.asia/8b28d505-b765-484a-8f42-15ce8287f7c2.png)

```
@media (max-width: 767px){
    .box-demo {
        /* Biến layout theo chiều ngang thành chiều dọc */
        flex-direction: column;     
    }
```


- Các bạn có thể xem việc sử dụng kỹ thuật này [tại đây](https://codepen.io/vungocyen/pen/GLGKYq)




##  Tạo Sticky Footer hoàn hảo

- Flexbox có một cách đơn giản để tạo một sticky footer. Khi xây dựng trang web cần có footer, nếu trang được xây dựng toàn bộ với các element của Flex, chúng ta có thể đảm bảo rằng footer của mình luôn luôn nằm ở cuối trang.

- Áp dụng : flex cho thẻ body cho phép chúng ta xây dựng toàn bộ layout của trang web bằng các thuộc tính của flex. Điều này giúp chúng ta dễ dàng thao tác, xác định vị trí và đặt chúng chính xác vào vị trí mà chúng ta muốn.


![](https://images.viblo.asia/609d4857-0df2-4b40-af79-5c072e6c786e.png)

```
html{
    height: 100%;
}

body{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.main{
   / * .main sẽ chiếm tất cả không gian trống có sẵn
       trên trang trừ đi khoảng không gian footer chiếm. * /
   flex: 1 0 auto;
}

footer{
   /* Footer sẽ chiếm không gian theo chiều dọc mà nó cần */
   flex: 0 0 auto;
}

```

- Các bạn có thể xem demo[ ở đây](https://codepen.io/vungocyen/pen/XQYrLG)

## Tổng kết

- Tất cả các trình duyệt chính (trừ IE9) đã hỗ trợ Flexbox, vì vậy trừ khi các bạn có ý định sử dụng trang của mình trên IE, thì flexbox sẽ là một sự lựa chọn tuyệt vời. Nếu bạn chưa sử dụng nó, tôi khuyên bạn nên sử dụng thử.
- Tôi hi vọng bài viêt này sẽ giúp được các bạn xây dựng responsive layout tốt hơn