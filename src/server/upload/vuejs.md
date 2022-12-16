Sau đây là những nội dung bản thân tìm hiểu được về VueJS, tất nhiên sẽ còn nhiều thiếu sót, nhưng sẽ được hoàn thiện ở các bài sau.
# 1. Introduction
VueJS là một framwork JavaScript được sử dụng để phát triển các giao diện web người dùng. Tập trung nhiều hơn vào phần view, nó rất dễ dàng để tích hợp với các project và library khác. Việc implement VueJS khá đơn giản, người mới bắt đầu có thể dễ dàng hiểu và bắt đầu xây dựng giao diện người dùng của riêng họ. 
Để hiểu chi tiết, chúng ta hãy bắt đầu với một ví dụ đơn giản.
```html
<html>
   <head>
      <title>VueJs Introduction</title>
      <script type = "text/javascript" src = "js/vue.js"></script>
   </head>
   <body>
      <div id = "intro" style = "text-align:center;">
         <h1>{{ message }}</h1>
      </div>
      <script type = "text/javascript">
         var vue_det = new Vue({
            el: '#intro',
            data: {
               message: 'My first VueJS Task'
            }
         });
      </script>
   </body>
</html>
```
Output

![](https://images.viblo.asia/82b4271c-d08a-4b6a-8adf-21289e1a7506.jpg)
Ở trên là một ví dụ về sử dụng VueJS. Như các bạn đã nhìn thấy, chúng ta đang include vuejs vào page html
```html
<script type = "text/javascript" src = "js/vue.js"></script>
```
Thẻ div dùng để in ra nội dung thông báo
```html
<div id = "intro" style = "text-align:center;">
   <h1>{{ message }}</h1>
</div>
```
Để có thể hiển thị được nội dung thông báo trên trình duyệt, chúng ta phải khai báo một instance sau:
```javascript
var vue_det = new Vue({
   el: '#intro',
   data: {
      message: 'My first VueJS Task'
   }
})
```
Đây chỉ là một ví dụ cơ bản cho thấy sự liên kết của VueJS với DOM và cách thao tác với nó. Ở mục tiếp theo, chúng ta sẽ tìm hiểu về các instance, template, components,...
# 2. Instance
Để bắt đầu với VueJS, chúng ta phải tạo ra một instance Vue, nó sẽ gọi đến root Vue Instance.
```javascript
var app = new Vue({
   // options
})
```
Hãy nhìn ví dụ sau đây:
```html
<html>
   <head>
      <title>VueJs Instance</title>
      <script type = "text/javascript" src = "js/vue.js"></script>
   </head>
   <body>
      <div id = "vue_det">
         <h1>Firstname : {{firstname}}</h1>
         <h1>Lastname : {{lastname}}</h1>
         <h1>{{mydetails()}}</h1>
      </div>
      <script type = "text/javascript" src = "js/vue_instance.js"></script>
   </body>
</html>
```
Nội dung html sẽ hiển thị firstname, lastname và thông tin chi tiết.
Chúng ta sẽ tạo một instance Vue trong file vue_instance.js.
```javascript
var  vm = new Vue({
   el: '#vue_det',
   data: {
      firstname : "Ria",
      lastname  : "Singh",
      address    : "Mumbai"
   },
   methods: {
      mydetails : function() {
         return "I am "+this.firstname +" "+ this.lastname;
      }
   }
})
```
 Đối với Vue, có một tham số gọi là el. Nó lấy id của phần tử DOM. Trong ví dụ trên, chúng ta có id là vue_det. Nó là id của phần tử div, có trong file html.
```html
<div id = "vue_det"></div>
```
Output

![](https://images.viblo.asia/6abb2bc8-fedf-4785-8c52-1cbfff5aa5be.jpg)
Tạm dừng ở đây, trong bài sau chúng ta sẽ tiếp tục với chủ đề này nhé.

Nguồn tham khảo: Tutorial Spoint