Trong năm 2020 có rất nhiều developer cũng như designer muốn tìm hiểu về CSS cơ bản. Trong loạt bài dưới đây, mình sẽ giới thiệu cho các bạn về chủ đề  đó. Cụ thể trong bài viết này, là những chia sẻ về các thuộc tính định dạng kiểu chử của CSS bằng các ví dụ đơn giản.

![](https://images.viblo.asia/adf9bb59-67bb-4c91-85ba-1a93abcd1045.png)

## font-family
Thuộc tính `font-family` này được sử dụng để khai báo font chúng ta sử dụng. Nó có thể nhận một loạt các font chữ. Điều này là hữu ích cho chúng ta bởi 2 lý do:
1. Nếu font chữ đầu tiên không hoạt động trong một hệ điều hành cụ thể, trình duyệt sẽ sử dụng font chữ tiếp theo cho đến khi có thứ gì đó phù hợp với nó.
2. Nếu font chữ bị thiếu một số ký tự, nó sẽ điền vào các ký tự còn thiếu từ font chữ tiếp theo được khai báo.



```
font-family: Arial, Helvetica, sans-serif;
```

![](https://images.viblo.asia/ea6df910-560f-4421-a65e-33e76f9523ca.png)

[font-family types CodePen Example](https://codepen.io/elad2412/pen/c7a091dd4a4aa6d0bc102eb7ec67f6ad?__cf_chl_jschl_tk__=2be9d42e47ac6fffc8cbe0adc9c4fd2878d03b66-1600415688-0-AdEl4uXoJ2TIsGhzlrUM6mtgYRxgkVQ26KI1wYkQVDqQLL9W6yweV5LRO3EH2eZ3nLi7gUe9noNixSLimiqbwY1INj0tOCk9H0OvDsWfcQAWkiC49DykF1BjChCiWk0dc0EkFRcfcOZxIeJplORUv-FDjK9kq7h1P974phTvtz26iEGEL2JytBuO-LkMD3fqWiulfNFo2q047M3hbCeOLrO8O3GnhSqCAjcAT7LAEHvp2XHleijgIZKD99zphn79cPaKOgzy94tX3JwY8KaSXJR4QD8Wzd80wg_1FN0uwb8Y1WkS7uc90ynaKosjlPfdbzWHWDGjq2xj2MLfi-Uz9nKe7Of1WU4HYy2oBCiAH7d4eFfPzy0jbcBT0VwYi6tjioKZiG0knK7BZ3b8DucNVaI)

## font-weight
Về thuộc tính này, giống như tên của nó, dùng để xác định *"trọng lượng"* của ký tự. Giá trị mặc định của thuộc tính này là `normal`, và giá trị common thứ 2 của nó là `bold`.

Ở những font chữ nâng cao hơn, thuộc tính này có nhiều hơn 2 trạng thái. Thay vì sử dụng tên trong các giá trị, các phông chữ này đang sử dụng các giá trị số: `100`/`200`/`300`/`400`/`500`/`600`/`700`/`800` và `950`. Hãy xem bảng sau để biết thêm chi tiết

![](https://images.viblo.asia/cb8f5edf-d49b-4ca2-8511-01ca32741d71.png)

Giá trị `normal` có trọng số là `400`, và giá trị `bold` là **`700`**. Dưới đây là ví dụ

```
/* Keyword values */
font-weight: normal;
font-weight: bold;
/* Numeric keyword values */
font-weight: 100;
font-weight: 200;
font-weight: 300;
font-weight: 400;// = normal
font-weight: 500;
font-weight: 600;
font-weight: 700;// = bold
font-weight: 800;
font-weight: 900;
```

![](https://images.viblo.asia/46b9a1d3-1235-47cf-b01a-7488c8c2e6ae.png)

[Font-weight types CodePen Example
](https://codepen.io/elad2412/pen/afc5b19a66891264be9dc310348a03db?__cf_chl_jschl_tk__=ef8be02316942e12ca6bc9af8fabc251a788a9c8-1600416080-0-AcUxeJvj0vgn6MmzKUJviSF6GBJ0mh6kelDnWRa-0Kf8Jn9wrsIYAsx2G7x7tEh0fIDbctT2jtAeNteGOEv7-SkkSkAiZpy7SIMOjFEk_7O8ZSiNymYHsGZPQGmzyPXBDnf-sGBgsq1Lyj6ftkzcE54tnXDSfYBlqhNeGs9H1t1L0RLYHJjHd3pZnscnC8X8lc98A5VvtAd__1F4Uk46J19GLW0uLaxT00gE02hlUzeJmLvqUsFR1hDV-pzklmlR7LgYI1L_BgF3M2wtQ8UgoE5zMpsHSgzH9Al9z4YbFuTWkdfoe7XY7YeO_xbBvqHNqASb47qi_wIP4zS0hmVBTAy3HRWw3XnBk1dMnPipY-2BblWZiBBBX_i60pb57Dcw6ZYyxpauUs4Jy0LTN1ZyU6Q)

## font-size
Thuộc tính này dùng để khai báo kích thước font chữ của văn bản. Thời điểm hiện tại, đơn vị định cỡ phổ biến nhất là pixel. Ví dụ:

```
font-size: 16px;
```

![](https://images.viblo.asia/5a885378-fcd1-4427-add3-c8435760a5e4.png)

[Font-size CodePen Example](https://codepen.io/elad2412/pen/6853132c5ff181d429fb20316cc6e5c3)

Với quan điểm của mình, tốt hơn hết hãy kiểm soát kích thước font chữ bằng `rem`. Nếu bạn muốn tìm hiểu thêm về `rem`, có thể tham khảo một số bài viết khác, ví dụ như: [Về rem](https://www.sitepoint.com/understanding-and-using-rem-units-in-css/#:~:text=According%20to%20the%20W3C%20spec,to%20the%20property's%20initial%20value.)

## line-height
Thuộc tính này cho trình duyệt biết chiều của line tỷ lệ với kích thước văn bản. Thuộc tính này có thể nhận giá trị cố định như pixel, nhưng cách phổ biến nhất là cung cấp cho nó một giá trị tỷ lệ mà ko kèm theo đơn vị nào

`line-height` là một thuộc tính kế thừa, điều đó có nghĩa là bạn khai bao nó một lần ở phần tử gốc, và nó sẽ ảnh hưởng đến tất cả các phần tử con trên trang web. Bằng cách này nếu chúng ta có kích thước font chữ khác nhau trong phần tử con, thì chiều cao của dòng vẫn sẽ ở cùng một tỷ lệ và ta không cần khai báo nhiều lần. Ví dụ:

```
body{ 
  font-size: 15px; 
  line-height: 1.4; // 15px * 1.4 = 21px
}
.inner-class{ 
  font-size: 30px; 
  // 30px(font-size) * 1.4(line-height) = 42px (total line-height)
}
```

![](https://images.viblo.asia/cd1b2923-aec7-4b98-bfd2-ba6abcd3435d.png)

[line-height CodePen Example](https://codepen.io/elad2412/pen/743b7fdb18c44ab01105635849f81f99)

## font-style
Mình sử dụng nó để cập nhật font chữ văn bản thành dạng chữ nghiêng.

```
font-style: italic;
```

![](https://images.viblo.asia/1eedae50-f6e0-4ccc-b37b-39ff305a453f.png)

[font-style CodePen Example](https://codepen.io/elad2412/pen/4fabdbdd60592e13874dd8ab36ba3367)

## color
Thuộc tính `color` được sử dụng để set màu sắc cho text. Nó có thể nhận các từ khoá màu, ví dụ `red`, `green` ... Ngoài ra, nó cũng có thể nhận các mãu màu HEX hoặc các chứng năng màu như RGB và HSL. 

```
/*** the color red in diffrent writing methods ***/
/* Keyword syntax */
color: red;
/* Hexadecimal syntax */ 
color: #ff0000; 
color: #ff0000ff; /*last two characters for alpha*/
color: #f00; 
color: #f00f; /*last character for alpha*/
/* RGB Function syntax */
color: rgb(255, 0, 0);
color: rgb(255, 0, 0, 1); /*last value for alpha*/
/* HSL Function syntax */
color: hsl(0, 100%, 50%);
color: hsl(0, 100%, 50%, 1); *last value for alpha*/
```

![](https://images.viblo.asia/66d5a3ef-5795-47ce-80d2-50fe813373f4.png)

[Text color CodePen Example](https://codepen.io/elad2412/pen/7c94015e9f3ce9aa43439a70903a5d1a?__cf_chl_jschl_tk__=6d4fde96679e154605f4dffdbe28faa5115ad8de-1600417107-0-AXI5Q97s6y5rcOuFIJdYgF9_SGsCCJ6iK0BqXMpNk7JkFI0eCs5_AIi1MOkrYcV2BDnK_lcb_OfwsrLkEBWYqI789x3syOeS_8CMO89avzbD50ERk_13yN2uPrE5iN6aE30otyLVigbfpGfmtOdgeUbgml55S04GaJiOmlWkwOqscUl0LqBENq7eE6KznX-2P5w5ulKE7k0nsab_oW5rQjdoHNN0kNCsbzBNYeo6OBVnnUNzuk7ojO8kS4DTJWwLm3ZSJIwOBbM8O64iEVVOo3qIqh39_2Zc9c9lqpGo7fUUKgiZdKOOAs8YNATUrVENdogrg6QBRy5AWOsY_NVJjf2U2lt5JA3O1CbDlb1FIYKTXVtdYEDqtmWeZRs_noBwoa2gsZzom5HCtLZLrtryqyA)

## Lời kết
Trên đây là phần 1 của loạt bài viết về CSS Basics cho Typography. Cảm ơn các bạn đã theo dõi bài viết này.

Nguồn: https://medium.com/cssclass-com/css-basics-for-typography-160025e3aeca