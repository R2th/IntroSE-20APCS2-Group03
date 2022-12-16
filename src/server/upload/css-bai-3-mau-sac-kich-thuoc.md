Trong bài này, chúng ta sẽ cùng nói về 2 kiểu giá trị phổ biến trong CSS. Đó là các giá trị chỉ định `màu sắc` và các giá trị chỉ định `độ dài`.

## Làm thế nào để chỉ định Màu Sắc trong CSS

Các giá trị chỉ định `màu sắc` được sử dụng với nhiều `thuộc tính` khác nhau trong CSS - ví dụ như màu chữ, màu nền, màu viền của phần tử HTML, v.v... Cách `đơn giản nhất` để chỉ định `màu sắc` trong CSS đó là sử dụng `tên màu`. Bạn có thể dành thời gian để nhìn qua danh sách tên màu được CSS hỗ trợ ở đây: [Danh sách các tên màu được hỗ trợ trong CSS](https://www.w3schools.com/colors/colors_groups.asp).

Chúng ta hãy thử viết một chút code CSS sử dụng các `tên màu`. Bạn có thể chọn sử dụng những màu mà bạn yêu thích. Mình không hẳn có khiếu lắm với những thứ liên quan đến thiết kế, nên sẽ dùng tạm một tấm hình để làm bảng màu.

`Bảng màu`
![bảng màu](https://images.viblo.asia/bddb56a5-535a-4051-a972-3abc59bb424c.jpg)

```snowwhite.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Snow White</title>
      <link rel="stylesheet" href="snowwhite.css">
   </head>
   <body>
      <h1>Hi. I'm Snow White.</h1>
   </body>
</html>
```

```snowwhite.css
body {
   background-color: RoyalBlue;
}

h1 {
   text-align: center;
   color: Snow;
}
```

Trong ví dụ ở trên, có 2 màu được sử dụng đó là `royalBlue` (xanh hoàng gia) và `snowWhite` (bạch tuyết). Như bạn có thể thấy rằng cách viết CSS sử dụng `tên màu` thực sự rất trực quan và dễ hiểu khi nhìn vào code CSS.

### Chỉ định màu sắc sử dụng các giá trị HEX

Ngoài ra thì việc chỉ định màu sắc trong CSS cũng còn có thêm những lựa chọn khác nữa. Những lựa chọn này kém trực quan hơn khi nhìn vào code CSS nhưng lại có độ chính xác và mức độ linh động cao hơn.

Phương sử dụng `tên màu` là cách làm `đơn giản nhất`, và bây giờ thì chúng ta đến với phương `phổ biến nhất` - đó là sử dụng các `giá trị HEX`.

Có rất nhiều công cụ online có thể giúp chúng ta nhặt ra một màu và mã HEX của màu đó như 
[Adobe Color](https://color.adobe.com/) hay [W3schools Picker](https://www.w3schools.com/colors/colors_picker.asp). Bạn cũng có thể sử dụng trình chỉnh sửa ảnh yêu thích của mình để thực hiện tác vụ đó.

Đây là cách mà chúng ta nói `red` khi sử dụng giá trị HEX: `#ff0000`.

Do các giá trị HEX có độ chính xác cao và rất linh động, chúng ta còn có thêm những lựa chọn khác để nói `red`. Mã HEX vừa rồi là màu đỏ sáng nhất. Tuy nhiên nếu bạn muốn chọn màu đỏ bớt sáng hơn thì chúng ta có thể nói `#bb0000`.

```reddrawf.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Red Dwarf</title>
      <link rel="stylesheet" href="reddwarf.css">
   </head>
   <body>
      <h1>Hm. I'm a dwarf, the red one.</h1>
   </body>
</html>
```

```reddwarf.css
body {
   background-color: #bb0000;
}

h1 {
   text-align: center;
   color: #ffffff;
}
```

Hãy giả định rằng chúng ta đang tạo ra một trang web để chia sẻ những kiến thức hữu ích. Và đâu đó vẫn có những người dùng sử dụng các thiết bị với trình duyệt web cũ mà bạn muốn hỗ trợ. Thật may mắn, phương thức sử dụng các giá trị HEX được hỗ trợ 100% bởi tất cả các trình duyệt web. Đó là lý do vì sao đây lại là phương thức phổ biến nhất để chỉ định màu sắc trong CSS.

Tuy nhiên, vẫn còn nhiều phương thức khác nữa mà chúng ta có thể lựa chọn trong những trường hợp sử dụng khác. Những phương thức này cũng đã được được hỗ trợ bởi tất các phiên bản trình duyệt web được cập nhật gần đây. Và dưới đây là một số liên kết tham khảo trong trường hợp bạn muốn tìm hiểu về chúng -

- Phương thức đơn giản nhất để chỉ định màu sắc trong CSS - [sử dụng `tên màu`](https://www.w3schools.com/colors/colors_groups.asp).
- Phương thức phổ biến nhất để chỉ định màu sắc trong CSS - [sử dụng `giá trị HEX`](https://www.w3schools.com/colors/colors_hexadecimal.asp).
- Phương thức linh động nhất nhất để chỉ định màu sắc trong CSS - [sử dụng `giá trị HSLA`](https://www.w3schools.com/colors/colors_hsl.asp).
- Phương thức đẹp nhất để chỉ định màu sắc trong CSS - [sử dụng `dải màu Gradient`](https://www.w3schools.com/colors/colors_gradient.asp).

Như vậy là chúng ta đã biết về các giá trị chỉ `màu sắc` trong CSS. Hãy cùng nói về kiểu giá trị phổ biến tiếp theo - các giá trị chỉ `độ dài`.

### Làm thế nào để chỉ định độ dài trong CSS?

Trong những bài viết trước, chúng ta đã chỉ định các giá trị độ dài với đơn vị `px (pixel)` - hay còn được gọi là `số điểm ảnh` - để sử dụng với thuộc tính `font-size`. Đó là cách đơn giản nhất để chỉ định độ dài trong CSS - và được gọi là phương thức sử dụng các giá trị tĩnh.

Đây là một ví dụ khác về việc sử dụng các giá trị tĩnh để chỉ định độ dài.

```dimension.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>The Fifth Dimension</title>
      <link rel="stylesheet" href="dimension.css">
   </head>
   <body>
      <div id="sun"></div>
      <div id="air"></div>
      <div id="earth"></div>
      <div id="water"></div>
   </body>
</html>
```

```dimension.css
#sun {
   background-color: Red;
   width: 90px;
   height: 90px;
}

#air {
   height: 210px;
}

#earth {
   background-color: ForestGreen;
   width: 300px;
   height: 60px;
}

#water {
   background-color: Navy;
   width: 690px;
   height: 60px;
}
```

### Chỉ định độ dài bằng các giá trị linh động

Trong ví dụ ở trên, nếu như chúng ta điều chỉnh lại kích thước của trình duyệt web, các khối màu sẽ giữ nguyên độ rộng đã được chỉ định; Và như vậy có nghĩa là kết quả hiển thị sẽ không đáp ứng với các kích thước màn hình khác nhau. Các giá trị linh động sẽ giúp chúng ta khiến cho các khối này có khả năng hiển thị đáp ứng tốt hơn với các thiết bị của người sử dụng.

Hãy thay đổi đoạn code CSS ở trên một chút và thay đổi kích thước của trình duyệt web mà bạn đang sử dụng để xem kết quả. Lần này chúng ta sẽ sử dụng đơn vị `%` cho 2 khối màu cuối cùng thay vì `px`.

```dimension.css
#sun {
   background-color: Red;
   width: 90px;
   height: 90px;
}

#air {
   height: 210px;
}

#earth {
   background-color: ForestGreen;
   width: 38.2%;
   height: 60px;
}

#water {
   background-color: Navy;
   width: 100%;
   height: 60px;
}
```

Bài viết về các giá trị chỉ `màu sắc` và `độ dài` trong CSS của chúng ta tới đây là kết thúc. Trong các bài viết tiếp theo, chúng ta sẽ cùng nói về việc trang trí các `container`.

[[CSS] Bài 4 - Các Kiểu Container](https://viblo.asia/p/1Je5EAkL5nL)