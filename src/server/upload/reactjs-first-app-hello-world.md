Trong nội dung bài viết này, chúng ta sẽ tìm hiểu và xây dựng 1 ứng dụng bằng ReactJS ở mức độ cực kì căn bản. Bằng cách theo dõi hết seri bài viết này, mình cùng các bạn sẽ nắm được một vài kiến thức cốt lõi khi bắt đầu với ReactJS. 
# 1. Làm quen với JSX
Trước khi bắt đầu làm việc với ReactJS, có một điều chúng ta cần quan tâm đầu tiên đó chính là ReactJS không giống như nhiều các thư viện javascript mà chúng ta đã từng sử dụng trước đây, nó không chỉ đơn giản là cách bạn viết code trong cặp thẻ <script> thông thường.
    
    
Như chúng ta biết, 1 website được bao gồm từ các thành phần như HTML, CSS và Javascript:
    
![](https://images.viblo.asia/d0f451be-97f4-41bf-bb8b-5483052757a8.png)
    
    
 Nếu không có nhưng HTML, CSS và JS này thì trình duyệt web sẽ thật sự không hiểu bạn đang làm gì. Bên cạnh các HTML, CSS, JS truyền thống, từ nay chúng ta sẽ làm quen thêm một khái niệm mới gọi là **JSX**. JSX là một ngôn ngữ cho phép chúng ta dễ dàng trộn các thẻ JS và HTML lại với nhau, để tạo thành các thành phần(component) giao diện người dùng. Nghe có vẻ hay, nhưng trước tiên, chúng ta cần một trình biên dịch JSX để trình duyệt có thể hiểu được.
 
  JSX thực sự rất đơn giản nếu chúng ta kiểm soát tốt được chúng, việc chúng ta cần làm khi xây dựng 1 ứng dụng React là sẽ phải chuyển đổi từ JSX sang JS truyền thống, ngôn ngữ mà trình duyệt web có thể hiểu được.
    ![](https://images.viblo.asia/d1d2fb5b-929e-405b-af7d-43ee66936629.png)
    
 Nghe có vẻ khó nhưng thật ra chúng ta đã có rất nhìu sự hổ trợ, có 2 cách thông thường để biên dịch JSX:
    
*    Cài đặt các môi trường NodeJs, nó là một công cụ tuyệt vời, trong môi trường này các file JSX sẽ được tự động chuyển đổi thành các file js thông thường cho trình duyệt web sử dụng.
*    Hoặc chúng ta có thể để Trình duyệt web tự động chuyển từ JSX sang Js truyền thống. 

  Trong phương án đầu tiên, chúng ta sẽ tốn khá nhiều thời gian cho việc thiết lập môi trường Node, tuy nhiên, đây lại là cách được hầu hết mọi người sử dụng. Việc thông qua Node để biên dịch JSX thành file JS sẽ chính xác hơn so với phụ thuộc trực tiếp vào trình duyệt. Hơn nữa cách tiếp cận này cho phép chúng ta tận dụng các module sẵn có và rất nhiều rất nhiều các tính năng hữu ích từ 1 cộng đồng lớn, cho phép chúng ta dễ dàng xây dựng được ứng dụng.
    
   Phương án thứ 2 nghe có vẻ dễ, trong cách này đơn giản chúng ta chỉ cần tham chiếu đến một tệp script, tệp này sẽ đảm nhiệu việc đổi JSX thành JS mỗi lần tải trang, và đơn giản ứng dụng React của chúng ta sẽ chạy mà chúng ta chả cần làm gì nhiều cả.
    
  Trong hướng dẫn này, chúng tôi sẽ bắt đầu với cách đơn giản là phương án 2, nhúng trực tiếp JSX mà không phải cài đặt môi trường. Nhưng đây chỉ là cách cho chúng ta tiếp cận nhanh với React, còn sự thật, khi dùng cách này chúng ta sẽ mất khá nhiều hiệu năng khi cứ phải chờ trình duyệt biên dịch jsx thành js mỗi khi tải trang. Chúng ta sẽ quay lại từng bước cài đặt môi trường theo phương án 1 sau khi chúng ta đã biết sơ về React trong bài này.
#     2. Bắt đầu với React
   Ở phần trên, chúng ta đã biết 2 cách tiếp cận với React. Trong phần này chúng ta sẽ thực hành cách thứ 2. Đầu tiên, chúng ta cần 1 trang HTML để bắt đầu.
  Nếu các bạn chưa có sẵn, hãy copy đoạn code này và parse nó vào code editor của bạn:
   
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>React! React! React!</title>
</head>

<body>
  <script>

  </script>
</body>

</html>
```
Tiếp theo, chúng ta sẽ chèn thêm 2 link thư viện của React:
    
 ```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

  Đây là 2 thư viện cốt lõi, cách mà react có thể làm việc với DOM, không có chúng, chúng ta sẽ không thể làm gì được với React. Ngoài ra còn 1 thư viện nữa chúng ta cần dùng đó là Babel
    
```<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>```

Nôm na thì đây là trình biên dịch JSX sang JS. Các bạn có thể xem thêm tại [đây](https://babeljs.io/)

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>React! React! React!</title>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>

<body>
  <script>

  </script>
</body>

</html>
```
   
Xong các bước chuẩn bị, bây giờ bắt đầu thôi.
## Hello world
Việc đầu tiên chúng ta cần thử là hiển thị 1 cái gì đó ra ngoài trang html. Với React, để đưa 1 thứ gì đó ra View, chúng ta gọi đến phương thức `render`. Cũng như JS chúng ta sẽ viết code vào trong cặp thẻ `script`.
```javascript
ReactDOM.render(
  <h1>Hello world</h1>,
  document.body
);
```
F5 trang, và chúng ta vẫn không thấy gì thay đổi. Đơn giản vì trình duyệt vẫn chưa hiểu được các mã lệnh này. 
Nhìn lên trên, chúng ta đã thêm vào thư viện babel, đây là lúc chúng ta sử dụng nó.
```html
<script type="text/babel">
  ReactDOM.render(
    <h1>Hello world</h1>,
    document.body
  );
</script>
```
Thêm type trên thẻ `script` của bạn. Tiếp theo F5 trình duyệt, và đây là thành quả :

![](https://images.viblo.asia/a921e4c5-cb2b-461e-8ecb-cc90dcd60729.png)
    
Chúng mừng các bạn, chúng ta đã thành công với Hello world, đơn giản quá phải không :v. Tìm hiểu 1 chút về `render` nhé. 
    
Phương thức này nhận vào 2 đối số: 

1.    1 Đoạn mã HTML mà chúng ta mong muốn hiển thị
1.    Nơi mà chúng ta muốn thực hiện đoạn mã trên, (ở đây chúng ta định vị nó trong thẻ body)
 
Mọi thứ vẫn còn đơn giản, bây giờ nghịch 1 chút, chúng ta sẽ không chọn đích đến là thẻ `body` nữa, mà thử tạo cho nó 1 thẻ `div`.
```html
<body>
  <div id="container"></div>
  <script type="text/babel">
    var destination = document.querySelector("#container");
    ReactDOM.render(
      <h1>I'm Iron Man</h1>,
      destination
    );
  </script>
</body>
```
    
Chúng ta đặt 1 thẻ `div` với `id` là `container`. Trong phần js, chúng ta gọi querySelector("#container") để xác định đính đến cho thành phần html mà chúng ta đặt trong phương thức `render`. Và đơn giản, kết quả sẽ như mong đợi :
    
![](https://images.viblo.asia/26f88207-1605-4f47-acc7-febfdc8f3533.png)
    
Ở trên, chúng ta đã có thể hiển thị dễ dàng với HTML thô, bây giờ cho nó tý màu mè với CSS.
## Thêm CSS
```html
<style>
    #container {
    	padding: 50px;
    	background-color: #EEE;
    }
    #container h1 {
    	font-size: 144px;
		font-family: sans-serif;
   	 color: #0080a8;
    }
</style>
```
    
Giống như thông thường, kết quả sẽ thành : 
    
![](https://images.viblo.asia/38c09397-d7fe-41e3-b5ee-c7e2128ea4bf.png)
    
File HTML giờ đây sẽ trông như thế này :
    
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>React! React! React!</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

  <style>
    #container {
      padding: 50px;
      background-color: #EEE;
    }
    #container h1 {
      font-size: 144px;
      font-family: sans-serif;
      color: #0080a8;
    }
  </style>
</head>

<body>
  <div id="container"></div>
  <script type="text/babel">
    var destination = document.querySelector("#container");

    ReactDOM.render(React.createElement(
      "h1",
      null,
      "Batman"
    ), destination);
  </script>
</body>

</html>
```
    
Như chúng ta đã thấy, việc viết các thẻ html, h1, và container trong vùng javascript và việc thêm css stype nằm ngoài js không ảnh hưởng gì, mọi thức vẫn suông sẻ, bởi vì ReactDOM đã thêm đầy đủ các thẻ HTML vào DOM trước khi load đến các element của CSS.

Ở đoạn code trên có thêm 1 cách viết nữa. Gọi Method createElement để tạo ngắn gọn cho phần thân html. Chúng tôi sẽ đề cập tới cú pháp này trong các bài viết sau.
    
# Tổng kết
Ở trên là cách tiếp cận đơn giản nhất đối với ReactJS, hy vọng mọi người đỡ được bở ngỡ với ngôn ngữ này. Trong bài viết tiếp theo chúng ta sẽ cùng tìm hiểu với Component trong React.
Cảm ơn đã theo dõi.
    
    
*https://www.kirupa.com/react/building_your_first_react_app.htm*