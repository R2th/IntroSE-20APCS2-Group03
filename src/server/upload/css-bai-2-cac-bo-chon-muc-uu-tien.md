Trong bài viết này, chúng ta sẽ cùng nói về các bộ chọn `selector` trong CSS và mức độ ưu tiên của các bộ chọn khi có nhiều giá trị được áp dụng cho một luật CSS.

## Làm thế nào để chọn riêng một phần tử HTML?

Ở bài trước, chúng ta đã thấy các bộ chọn cơ bản của CSS hoạt động như thế nào. Chỉ đơn giản là chúng ta sử dụng tên của các thẻ HTML để chọn các phần tử tương ứng. Các bộ chọn cơ bản rất phù hợp để giúp chúng ta trang trí những nội dung chung chung như các đoạn văn bản, các tiêu đều...

Tuy nhiên đôi khi chúng ta sẽ cần khiến cho một vài phần tử HTML đặc biệt trở nên nổi bật. Để làm được điều này, CSS cho phép chúng ta chọn một phần tử HTML bất kỳ bằng `id`.

Hãy thử viết một vài dòng CSS để xem bộ chọn `id` hoạt động như thế nào.

```unique.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Not special but Unique</title>
      <link rel="stylesheet" href="unique.css">
   </head>
   <body>
      <ul>
          <li id="rose">I'm a Rose and I'm Unique.</li>
          <li id="clover">I'm a Clover and I'm Unique, too.</li>
          <li id="lotus">I'm a Lotus and I'm Unique, too.</li>
      </ul>
   </body>
</html>
```

```unique.css
li { font-size: 26px; }
#rose { color: red; }
#clover { color: green; }
#lotus { color: blue; }
```

Bạn có thể nhận ra rằng mỗi một bộ chọn `id` đều bắt đầu với một dấu hash `#`. Cách viết này khá tương tự như khi chúng ta sử dụng `id` để tạo liên kết nội bộ trong HTML.

## Bộ chọn class

- Các bộ chọn cơ bản rất hữu ích để trang trí những thứ chung chung, phổ biến.  
- Các bộ chọn `id` thì lại rất phù hợp để trang trí những thứ đặc biệt.  
- Và chúng ta còn có thêm các bộ chọn `class` để trang trí những thứ được nhóm lại thành các lớp. :D

Để sử dụng bộ chọn `class`, chúng ta cần chỉ định tên `class` cho các phần tử HTML bằng cách sử dụng [thuộc tính `class`](https://www.w3schools.com/tags/att_class.asp) và sử dụng tên của các `class` làm bộ chọn trong CSS.

Lưu ý ở đây là các bộ chọn `class` khi viết trong code CSS sẽ được bắt đầu với dấu chấm `.`

```groups.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Hangout Groups</title>
      <link rel="stylesheet" href="groups.css">
   </head>
   <body>
      <ul>
         <li class="dog">Max</li>
         <li class="dog">Toby</li>
         <li class="dog">Lily</li>

         <li class="cat">Tigger</li>
         <li class="cat">Oliver</li>
         <li class="cat">Kitty</li>

         <li class="tree">Apple</li>
         <li class="tree">Kamilah</li>
         <li class="tree">Hazel</li>
      </ul>
   </body>
</html>
```

```groups.css
li { font-size: 21px; }
.dog { color: red; }
.cat { color: blue; }
.tree { color: green; }
```

Đó vẫn chưa phải là tất cả. Các bộ chọn `class` còn tuyệt vời hơn thế nhiều. Chúng ta đã thấy rằng mỗi `class` hay mỗi lớp có thể có nhiều hơn 1 thành viên. Lần này, chúng ta sẽ định nghĩa các `class` và phong cách hiển thị trước. Rồi sau đó, chúng ta mới quyết định phần tử HTML nào sẽ tham gia vào những `class` nào.

```join.css
.text-red   { color: red; }
.text-blue  { color: blue; }
.text-green { color: green; }

.font-tiny   { font-size: 27px; }
.font-medium { font-size: 45px; }
.font-huge   { font-size: 81px; }
```

```join.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>The Harmony</title>
      <link rel="stylesheet" href="join.css">
   </head>
   <body>
      <ul>
         <li class="text-red font-medium">
            The Rose is red and beautiful .
         </li>
         <li class="text-blue font-huge">
            The Sky is big and blue .
         </li>
         <li class="text-green font-tiny">
            And my color is lovely, too .
         </li>
      </ul>
   </body>
</html>
```

Ý tưởng này cũng rất tương đồng với việc tổ chức cuộc sống thực tế của chúng ta phải không? Chúng ta có các lớp học các kĩ năng nơi mọi người có thể gặp mặt và học cùng nhau. Và mỗi người có thể tham gia nhiều hơn 1 lớp học.

### Mức ưu tiên của bộ chọn

Lấy ví dụ là khi màu chữ của một phần tử HTML được quy định bởi nhiều luật CSS khác nhau, khi đó sẽ chỉ có 1 luật duy nhất được chọn để áp dụng. Hãy thử xem ví dụ dưới đây.

```choice.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Choice</title>
      <link rel="stylesheet" href="choice.css">
   </head>
   <body>
      <h1 id="unique" class="grouped">
         Tôi nên chọn Đỏ, Xanh Lá, hay Xanh Dương?
      </h1>
   </body>
</html>
```

```choice.css
#unique { color: green; }
.grouped { color: blue; }
h1 { color: red; }
```

Thông thường thì các tệp CSS sẽ được duyệt từ trên xuống và luật CSS cuối cùng sẽ được chọn để áp dụng thay vì các luật CSS ở phía trên. Tuy nhiên, do các bộ chọn khác nhau lại có những mức độ ưu tiên khác nhau và điều này sẽ ảnh hưởng đến kết quả hiển thị -

1. Bộ chọn `id` có mức ưu tiên cao nhất
2. Bộ chọn `class` có mức ưu tiên cao hơn so với các bộ chọn cơ bản
3. Bộ chọn cơ bản ....

### Mức ưu tiên đặc biệt

Chúng ta cũng có thể khiến 1 luật CSS trở thành rất rất quan trọng bằng cách gắn thêm `!important` vào phía sau nó.

Từ khóa này sẽ không quan tâm đến các bộ chọn. Nó chỉ đơn giản là sẽ khiến phần tử HTML được chọn  cảm thấy luật CSS đó rất quan trọng và ưu tiên sử dụng luật này so với tất cả các lựa chọn khác.

```important.css
h1 { color: crimson !important; }
#unique { color: blue; }
```

```important.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Important</title>
      <link rel="stylesheet" href="important.css">
   </head>
   <body>
      <h1>Gia đình là điều quan trọng nhất .</h1>
   </body>
</html>
```

Phần quan trọng tiếp theo của việc học CSS là về các `thuộc tính` và `giá trị`. Đối với mỗi `thuộc tính` cụ thể, chúng ta sẽ thấy có những `giá trị` khác nhau có thể được sử dụng. Vì vậy nên chúng ta sẽ nói chi tiết hơn về các `giá trị` trong CSS khi bắt đầu học về từng `thuộc tính`.

Trong bài viết tiếp theo, chúng ta sẽ nói về 2 kiểu giá trị phổ biến trong CSS. Đó là các giá trị chỉ `màu sắc` và các giá trị chỉ `độ dài`.

[[CSS] Bài 3 - Màu Sắc & Độ Dài](https://viblo.asia/p/Eb85oAb8Z2G)