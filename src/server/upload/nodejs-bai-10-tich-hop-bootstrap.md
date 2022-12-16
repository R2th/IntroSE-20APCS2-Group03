> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4)   

Hôm nay, chúng ta quay trở lại với phần Views nhé

Ở các bài trước thì chúng ta đã tạo ra một vài trang HTML dành cho users. Tuy nhiên, giao diện trông thật "củ chuối" phải không nào? Bây giờ hãy thử thêm Bootstrap và chỉnh sửa giao diện một chút nhé

> Thêm Bootstrap CDN vào trang  _*users/index.pug*_  nhé:
```html:nodeapp/views/users/index.html
html
  head
    link(rel='stylesheet', href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
  body

    script(src='https://code.jquery.com/jquery-3.3.1.slim.min.js')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js')
    script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js')
```

> Tuỳ chỉnh mã HTML lại nào:
```html:nodeapp/views/users/index.html
html
  head
    link(rel='stylesheet', href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css')
  body
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

    script(src='https://code.jquery.com/jquery-3.3.1.slim.min.js')
    script(src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js')
    script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js')
```

Lướt qua thành quả một chút nào...
![](https://images.viblo.asia/5ec60e29-7320-40fd-ba03-3c2f6bef02f8.png)

Oke, trông cũng đã ổn hơn. Các bạn có thể tự chỉnh sửa theo ý muốn của mình nhé

Như vậy, ta sẽ còn thêm 2 file HTML nữa là  _*show.pug*_ và _*create.pug*_. Các bạn hãy xem đó là bài tập. và có thể chỉnh sửa theo ý muốn của mình nhé

Qua bài này, ta đã biết được cách tích hợp Bootstrap. Tuy nhiên, các bạn sẽ thấy nó có 1 nhược điểm như sau: Ta sẽ phải copy Bootstrap CDN đến từng file mà bạn muốn sử dụng Bootstrap. Hãy thử tưởng tượng, dự án của bạn có 100 trang HTML, và bạn ngồi copy đoạn mã CDN cho 100 trang... :) Nếu mà thật sự như vậy thì mình xin ngưng học ExpressJS tại đây.     

Ta thấy rằng, các đoạn mã trên là hoàn toàn giống nhau, lặp đi lặp lại rất nhiều lần. Vậy, liệu có cách nào để chỉ phải viết một lần, mà vẫn sử dụng được ở nhiều trang không? Câu trả lời sẽ có ở bài sau: ***Template layout***. Hẹn gặp lại các bạn!!!