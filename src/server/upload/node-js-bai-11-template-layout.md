> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4).   


Ở bài trước, chúng ta đã tích hợp được Bootstrap vào project của chúng ta. Hãy xem lại vấn đề ở cuối bài học lần trước nhé.   


> Qua bài này, ta đã biết được cách tích hợp Bootstrap. Tuy nhiên, các bạn sẽ thấy nó có 1 nhược điểm như sau: Ta sẽ phải copy Bootstrap CDN đến từng file mà bạn muốn sử dụng Bootstrap. Hãy thử tưởng tượng, dự án của bạn có 100 trang HTML, và bạn ngồi copy đoạn mã CDN cho 100 trang... :) Nếu mà thật sự như vậy thì mình xin ngưng học ExpressJS tại đây. Ta thấy rằng, các đoạn mã trên là hoàn toàn giống nhau, lặp đi lặp lại rất nhiều lần. Vậy, liệu có cách nào để chỉ phải viết một lần, mà vẫn sử dụng được ở nhiều trang không?    

Câu trả lời là có. Nó được gọi là ***Template layout***. Các phần này sẽ được định nghĩa đoạn code sẵn, nó nằm ở 1 file riêng biệt. Khi cần, bạn sẽ gọi đến file đó và đưa vào nơi mà mình muốn. Bắt tay vào làm thôi

> Đầu tiên, tạo một thư mục mới là ***layouts*** bên trong thư mục ***views***

```
|--nodeapp
|----views
|------layouts
```

> Bây giờ, ta sẽ tạo 1 file có tên là ***general.pub*** có nội dung như sau:

```html:nodeapp/views/layouts/general.pug
html
  head
    link(rel='stylesheet', href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
  body
    block content

    script(src='https://code.jquery.com/jquery-3.3.1.slim.min.js')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js')
    script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js')
```

Như các bạn thấy. Nội dung file này bao gồm các link CDN của Bootstrap mà ta đã tích hợp ở bài trước. Ngoài ra, trong phần body, mình có thêm một dòng mới là:
```
block content
```

Dòng này có nghĩa là ta định nghĩa 1 block có tên định danh là _*content*_. Đây là phần mà ta sẽ render bất kì nội dung nào mà ta muốn khi sử dụng layout ***general.pug*** này

> Tiếp theo, ta sẽ chỉnh lại file index.pug thành:
```html:nodeapp/views/users/index.pug
extends ../layouts/general
block content
  .container-fluid.my-5
      .row
        .col-8.offset-2
          .card
            .card-header.bg-primary.text-white.text-uppercase Users
            .card-body
              form.seach-form(action="/users/search")
                .container
                  h2 Searching
                  .row
                    .col-6
                      .form-group
                        label(for='name') Name
                        input#name.form-control(name="name", type='text')
                    .col-6
                      .form-group
                        label(for='age') Age
                        input#age.form-control(name="age", type='number')
                    .col-12
                      button.btn.btn-primary(type='submit') Search

              .users.my-3 
                h2.text-center.text-info.my-3 All users
                if users.length > 0
                  table.table.table-bordered
                    thead
                      tr.bg-info.text-white
                        th  Name
                        th  Email
                        th  Age 
                        th  Action 
                    tbody
                      each user in users
                        tr
                          td=  user.name 
                          td=  user.email
                          td=  user.age 
                          td
                            a.btn.btn-info(href="/users/" + user.id) View
                else
                  p No user to display

              a.btn.btn-primary(href="/users/create") Create new user
```

Ở đây, mình đã xoá đi phần Bootstrap CDN. Sau đó, ở đầu file, mình thêm 1 dòng
```
extends ../layouts/general
```
để gọi file layout ***general.pug***

Tiếp theo là 1 dòng
```
block content
```
để xác định đây là phần bắt đầu block content mà mình định nghĩa ở file ***general.pug***. Mọi đoạn code nằm trong block này sẽ được render vào phần block content của file ***general.pug***

Cuối cùng, bạn hãy vào lại trang index để xem kết quả nhé, mọi thứ sẽ vẫn diễn ra bình thường. Công việc của bạn, là làm tương tự với 2 file còn lại là  _*create.pug*_ và  _*show.pug*_ nha... 

> Lưu ý: Chúng ta có thể định nghĩa nhiều layout khác nhau để sử dụng. Trong 1 file HTML, bạn cũng có thể render cùng lúc nhiều layout. Nhưng hãy đảm bảo là đoạn code của bạn nằm đúng trong phần ***block*** mà bạn định nghĩa cho nó nhé.    


-----
Qua bài này, ta đã biết thêm về Template layout. Nó đã giúp chúng ta tránh lặp lại đoạn code, tiết kiệm thời gian và công sức hơn rất nhiều. Hẹn gặp lại các bạn vào bài sau.