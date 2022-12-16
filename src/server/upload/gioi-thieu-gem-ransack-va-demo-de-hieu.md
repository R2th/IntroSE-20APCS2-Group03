# Ransack là gì
Ransack là thư viện hỗ trợ cho việc xây dựng chức năng tìm kiếm, sắp xếp kết quả một cách nhanh chóng và dễ dàng nhất. Vì vậy với những lập trình viên "Hồng ngọc trên đường tàu" từng lập trình web thì ranksack không hề xa lạ, thậm chí phải nói là dùng ở hầu hết các dự án ruby web.  
# Cài đặt và sử dụng
## Cài đặt
Cũng đơn giản như bao gem khác, ta chỉ cần thêm 1 dòng bên dưới vào Gemfile rồi chạy thầy chú ***bundle install*** là xong
```
gem 'ransack'
```
hoặc
```
gem 'ransack', github: 'activerecord-hackery/ransack'
```
để cài ransack với version mới nhất từ master
## Ứng dụng
Ransack có 2 chế độ dùng đó là Simple Mode và Advanced Mode. Ở bài này mình sẽ nói qua Simple Mode:

Để cho dễ hiểu thì mình xin bỏ qua phần lý thuyết và ứng dụng vào project nhỏ nhỏ luôn nhé. Ở đây mình sẽ hướng dẫn làm một trang quản lý accounts và tích hợp gem ransack để hỗ trợ cho việc tìm kiếm cũng như sắp xếp(sort)

Đầu tiên chúng ta cần chuẩn bị một project, và một database có table Accounts như bên dưới(Và những phần chuẩn bị để có view và controller các bạn tự xử nhé :v)
![](https://images.viblo.asia/61690782-fd3d-4468-8d8e-2999b83831db.png)

Ở hàm index trong AccountsController, mình viết
```
    def index
        @search = Account.ransack params[:q]
        @accounts = @search.result.paginate page: params[:page],  per_page: 10
    end
```
với **params[:q]** là param chứa một hash gồm các trường của Account và cách tìm kiếm trường đó. Ví dụ như `params = {"q": {"name_cont": "Actually query from the User"}}`

Để lấy kết quả tìm kiếm, ta sử dụng hàm result để lấy kết quả sau khi query và paginate ở đây là để phân trang. Như ví dụ của mình thì cứ 10 accounts sẽ là một trang, accounts thứ 11~20 thì sang trang 2. Nhân tiện thì các bạn tìm hiểu thêm về gem paginate này nhé.

Vậy là xong với controller rồi. Ta cùng sang view nào:

Mình muốn view của mình giống như thế này
![](https://images.viblo.asia/6c383458-04be-4a71-999f-b2aaf546c2ac.png)
Có một field tìm kiếm, có thể sắp xếp theo name, role mỗi khi click vào Title của cột thì làm thế nào. Dễ lắm: 
Đầu tiên thêm cái này nào file index.html.erb
```
  <%= search_form_for @search, url: accounts_path, local: true, class: "input-group", method: "get" do |f| %>
      <div class = "field">
            <%= f.label :name_or_email_or_phone_number_cont, t("searchfor") %>
            <%= f.text_field :name_or_email_or_phone_number_cont %>
      </div>
      <div class="actions"><%= f.submit "Search" %></div>
  <% end %>
```

Thay vì ```form_for``` như thông thường, ransack cung cấp cho ta ```search_form_for``` để sử dụng cho việc search
Ở text_field ta thấy có *name_or_email_or_phone_number_cont*, đây là qui tắc mà ransack hỗ trợ, ở vd này ta có thể tìm kiếm theo column name, email, phone_number

Qui tắt viết ở đây là *colum1_or_column2_or_columnx_cont*, đơn giản nhỉ

Ở dưới phần bảng, mình muốn bảng của mình có thể sort theo name và role. Vì vậy phần code sẽ như sau
```
    <table class = "table table-responsive-sm table-hover table-outline mb-0">
      <thead class="thead-light">
        <tr>
          <th class = "text-center"></th>
          <th class = "text-center"><%= sort_link @search, :name, "Tên" %> </th>
          <th class = "text-center"><%= t"email" %></th>
          <th class = "text-center"><%= sort_link @search, :role, "Chức năng" %></th>
          <th class = "text-center"><%= t"phone_number" %></th>
          <th class = "text-center"><%= t"status" %></th>
          <th class = "text-center"></th>
        </tr>
      </thead>
    </table>
```
   *sort_link @search, :name, "Tên"* : Ransack hỗ trợ cho ta cách viết như thế này, mục đích là khi click vào title cột Tên thì sẽ tự động sort theo column name. Tương tự với role.
   
   Lưu ý, mỗi lần sort cũng như search thì sẽ gửi request mang theo param :q về cho server và thực hiện query, sau đó server sẽ trả kết quả về cho client. Vì vậy sẽ có hiện tượng load lại trang, không giống như sort và search khi code bằng javascript nhé
   ## Thành quả
   Mình thử search nhé. Viblo không hỗ trợ up gif nên mình để img sau mỗi lần thực hiện search/soft nhé
   
   Đây là thứ tự ban đầu
   ![](https://images.viblo.asia/ecfe7a03-004c-4ee7-ad15-dd202b7e0423.png)
   Search theo keyword: user (Nếu search với field trống thì sẽ là search all nhé)
   ![](https://images.viblo.asia/930cfe6b-554b-4b7f-9ede-86696913c77c.png)
  Đây là kết quả khi mình click vào ***Tên***
  ![](https://images.viblo.asia/149b2c87-2cae-4b07-a503-7a20d2113690.png)
   # Một số options khi search với ransack
   Lúc nãy chúng ta có *cont* ở phần search. Viết đầy đủ là contain = chứa
   1. Ngược lại có *not_cont*
   ```Account.ransack(name_not_cont: 'Hon').result.to_sql```
   ```=> SELECT "users".* FROM "users"  WHERE ("users"."nick_name" LIKE '%Hon%')```
   2.  Bắt đầu với..
         ``` User.ransack(nick_name_start: 'Hon').result.to_sql```
         ``` => SELECT "users".* FROM "users"  WHERE ("users"."nick_name" LIKE 'Hon%')```
   3. Ngược lại có ```end``` cũng tương tự
   4. in: có nằm trong
   ```        User.ransack(age_in: 20..22).result.to_sql ```
   ``` => SELECT "users".* FROM "users" WHERE "users"."age" IN (20, 21, 22) ```
   5. Và not_in
   6. eq: Bằng(Khác với cont nhé)
   
        ```User.ransack(name_eq: 'Hang').result.to_sql ```
	    ```=> SELECT "users".* FROM "users" WHERE "users"."name" = 'Hang' ```
   7. not_eq
  ......
  Nhiều lắm, các bạn tham khảo thêm ở đây nhé https://github.com/activerecord-hackery/ransack
   # Tổng kết
   Chỉ với mục đích là tìm kiếm và sort nhưng có rất nhiều thứ cần học ở ransack, ở trên chỉ là phần basic. Nếu có cơ hội thì lần tới mình sẽ giới thiệu advanced mode nhé
   
   Tham khảo: https://github.com/activerecord-hackery/ransack