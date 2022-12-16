<p>Viết blog để thay đổi không khí, cũng như là một cách để lưu giữ kiến thức lâu hơn.<br>
    Nội dung bài viết bắt nguồn từ chính những thắc mắc của bản thân trong quá trình học nên chắc sẽ phù hợp hơn với những ai cũng đang mới học Rails như mình.<br>
     Có gì sai sót mọi người cùng góp ý và chia sẻ nha ^^ </p>

<h1>New, Build, Create</h1><hr>
<p><h2>Đặc điểm chung :</h2> Đều dùng để tạo mới object trong Rails.</p>
<br>
<h2>Create method</h2>
<p>Truyền data vào và Save luôn</p>
<strong>VD:</strong>

``` ruby
def new
     @book = Book.create(title: "RoR 5 超入門", author:"掌田津耶乃")
     #title là RoR 5 超入門,author là 掌田津耶乃
end
```
Hoặc
``` ruby
def create 
    @book = Book.create(book_params)
end
```


<h2>New method</h2>
<p>New method truyền data vào nhưng không save. Muốn tạo object thì cần kết hợp với cả save method nữa.</p>

    
``` ruby
def new
  @book = Book.new
end
```

Hoặc

``` ruby
def new
  @book = Book.new(title: "羅生門", author:"芥川龍之介")
   #title là RoR 5 超入門,author là 掌田津耶乃
end
```

<p>Kết hợp với save method để lưu data</p>

``` ruby
def new
  @book = Book.new
end
```


<h2>Build method</h2>
<p>Build method giống New ở chỗ đều có khả năng tạo object mới.<br> 
Nhưng khi tạo biến mới thì Build luôn đi cùng với user_id, điều mà New không làm được. </p>
<br>
<strong>Ví dụ:</strong>
Giả sử ta có model User và model Post, một User có khả năng tạo nhiều Post.  <br>
Trong trường hợp này thì ở file user.rb sẽ có quan hệ với post là 「has_many :posts」.<br>
Khi đó, nếu dùng New method để tạo biến Post instance mới thì code sẽ như sau:

``` ruby
def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @post.save
end
```
Đoạn code khá dài dòng. Thay vào đó, ta có thể dùng Build method để viết chỉ trong 1 dòng mà kết quả tương tự;

``` ruby
def create
    @post = current_user.posts.build(post_params)
end
```
Khá ngắn gọn phải không nào ! 😁😁

<h2>Tại sao lại phải chia ra nhiều cách dùng như vậy ?</h2>
<p>Tại sao lại phải dùng New trong khi có thể dùng Create ?<br><br>
    <strong>Khi ta tạo ra một biến instance và muốn thao tác với nó trong quá trình save thì phải dùng New, chứ không dùng Create được.<br>
    Vì nếu dùng Create thì nó sẽ save luôn mà không kịp thao tác gì cả,</strong>
  <br>
<h3>VD: Dùng hàm if </h3>
 
``` ruby
def create
  @user = User.new(user_params) #Tạo biến instance
  if @user.save
    redirect_to @user, notice: 'User created'
  else
    render :new  #Nếu Save thất bại thì render :new
  end
end
```

==> Tạo biến instance, nếu save thành công thì redirect_to @user, nếu save thất bại thì render :new 

<br>
<h2>Tổng kết</h2>
Một bức ảnh thay cho tóm tắt bài viết. 🤗

![image.png](https://images.viblo.asia/a4a906c2-771f-497b-aeb8-b6e34febed38.png)