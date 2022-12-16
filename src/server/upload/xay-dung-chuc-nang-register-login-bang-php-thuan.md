# I. Giới thiệu:
Sau khi các bạn đã học các kiến thức cơ bản về PHP và MySQL thì trong bài này mình sẽ hướng dẫn các bạn xây dựng chức năng đăng nhập và đăng ký sử dụng php và mysql. Nội dung của bài này rất căn bản và cũng rất phù hợp cho những bạn mới bắt đầu học lập trình web với PHP và MySQL. Bài này mình sẽ giải thích và demo chi tiết nhất có thể để mọi người dễ hiểu nhé!

# II. Lên ý tưởng:
**Các bước để thực hiện chức năng**
1. Tạo database và một bảng lưu danh sách người dùng. 
2. Tạo folder và các file cần thiết.
3. Tạo form thêm người dùng.
4. Xử lý dữ liệu nhập vào từ form để insert vào database.
5. Xử lý đăng xuất.

**Bước 1: Tạo database và một bảng lưu danh sách người dùng**

Để lưu danh sách các tài khoản, tôi tạo một database ở phpmyadmin có tên là ‘login’ và chọn bảng mã là unicode_utf8_ci để có thể lưu dữ liệu tiếng Việt vào database. Trong database này tôi tạo 1 bảng tên là ‘user’ để lưu thông tin của các user. Bảng này có các trường sau (chọn uft8 là bảng mã có thể viết tiếng VIệt):
Cách cài đặt và kết nối phpmyadmin các bạn tự tìm hiểu trên google nhé :D
* id: dữ liệu kiểu int, là khóa chính, tự động tăng. Trường này sẽ lưu id của người dùng.
* user_name : kiểu varchar(50), trường này sẽ lưu tài khoản đăng nhập của người dùng.
* password: kiểu text, trường này sẽ lưu mật khẩu của người dùng.
* full_name: kiểu varchar(100), trường này sẽ lưu họ tên của người dùng.
Sau khi tạo bảng xong, cấu trúc bảng này sẽ như sau:

![](https://images.viblo.asia/ca934f07-d2f0-48ae-b557-4a14c6abf4fa.png)

**Bước 2: tạo folder và các file cần thiết:**

Tạo folder có tên là login ở trong /var/www/html nếu các bạn cài xampp thì sẽ ở trong C:\xampp\htdocs nhé. Trong folder này sẽ có:

* Trang index.php: sẽ là trang chủ, thực hiện việc xử lý, tính toán, và lấy dữ liệu cho phù hợp.
* Trang register.php: sẽ là trang để đăng ký thành viên.
* Trang login.php: là trang đăng nhập, nếu người dùng đăng nhập không thành công hoặc chưa đăng nhập thì index.php sẽ gọi login.php vào.
* Trang admin.php: là trang sẽ được gọi vào index.php khi đã đăng nhập thành công

Cấu trúc thư mục sẽ như sau:

![](https://images.viblo.asia/3ee12c8e-0849-48dc-beec-ef5dfc568023.png)

**Bước 3: kết nối database:**

Mọi thao tác xử lý chúng ta đều thực hiên trên trang index.php, do vậy mà việc kết nối database tôi cũng sẽ thực hiện ở trang index.php.

Ở trang này tôi thực hiện việc kết nối tới database với lệnh sau:
`mysqli_connect(‘$_host_name’, ’$_user_name_db’, ’$_pass_login_db’, ’$_database_name);`

Trong đó:
* $_host_name: là tên host của bạn. Nếu cài localhost thì bạn sẽ đặt trường này là localhost (tên máy chủ hoặc địa chỉ ip máy chủ).
* $_user_name_db: tài khoản đăng nhập database (nếu cài xampp, tài khoản mặc định là ‘root’).
* $_pass_login_db: mật khẩu đăng nhập database (mặc định xampp không đặt mật khẩu đăng nhập, nên trường này bạn để trống).
* $_database_name: tên database mà bạn cần thao tác.

Gán vào biến connect: `$connect = mysqli_connect(‘localhost’,’root’, "", ’login’);

Tiếp theo tôi chọn việc truy vấn này có thể đọc và hiểu tiếng Việt, tôi viết tiếp lệnh sau:

`mysqli_set_charset($connect,”utf8″);`

Hoàn thành 2 lệnh trên ta có cấu trúc file index.php như sau:
```
<?php
	$connect = mysqli_connect('localhost','root','','devpro');
	mysqli_set_charset($connect, "utf8");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Devpro.edu.vn</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
	
</body>
</html>
```

**Bước 4: tạo form đăng ký người dùng:**\

Form đăng ký sẽ viết ở file register.php

Trước khi đăng nhập, bạn phải có tài khoản để đăng nhập đã. Để có tài khoản thì bạn phải đăng ký, khi đăng ký thành công, tài khoản của bạn sẽ được insert vào database. Trong form đăng ký sẽ có ô nhập tài khoản (user_name), một ô nhập mật khẩu, 1 ô nhập laị mật khẩu và 1 ô nhập họ tên đầy đủ(full_name)

Sau đó ở trang index.php tôi tạo một nút nhấn, khi nhấn vào nút này, tôi sẽ gọi trang register.php vào (gọi form đăng ký vào).

Trang index.php tôi viết tiếp như sau:

```
<?php
	$connect = mysqli_connect('localhost','root','','devpro');
	mysqli_set_charset($connect,"utf8");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Index</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
	<div class="container">
        //tạo nút nhấn: truyền biến $_GET["page"]="register" lên URL
		<div class="row">
			<a href="index.php?page=register" class="btn btn-success">'Đăng ký thành viên'</a>
		</div>

		<div class="row">
            //kiểm tra nếu tồn tại biến $_GET["page"] = "register" thì gọi register.php vào
			<?php
			if(isset($_GET["page"]) && $_GET["page"] == "register")
				include "register.php";
			?>
		</div>

	</div>
</body>
</html>
```

**Bước 5: lấy dữ liệu người dùng thêm từ form đăng nhập, kiểm tra , và insert vào database:**

Khi người dùng nhấn nút submit (đăng ký) thì dữ liệu sẽ được gửi đi theo phương thức post, vì method của form tôi đã đặt là post.

Tôi sẽ lấy dữ liệu người dùng nhập và insert vào database bằng các lệnh sau ở trang index.php:

```
<?php
	$connect = mysqli_connect('localhost','root','','login');
	mysqli_set_charset($connect,"utf8");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Index</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
<body>
	<?php
		if(isset($_POST["register"])){
			$user_name = $_POST["user_name"];
			$pass1 = $_POST["pass1"];
			$pass2 = $_POST["pass2"];
			$name = $_POST["full_name"];
			//kiểm tra xem 2 mật khẩu có giống nhau hay không:
			if($pass1 != $pass2){
				header("location:index.php?page=register");
				setcookie("error", "Đăng ký không thành công!", time()+1, "/","", 0);
			}
			else{
				$pass = md5($pass1);
				mysqli_query($connect,"
					insert into user (user_name,password,full_name)
					values ('$user_name','$pass','$name')
				");

				header("location:index.php?page=register");
				setcookie("success", "Đăng ký thành công!", time()+1, "/","", 0);
			}
		}

	?>
	<div class="container">
		<div class="row">
			<a href="index.php?page=register" class="btn btn-success">Đăng ký</a>
			<a href="index.php" class="btn btn-info">Trang chủ</a>
		</div>

		<div class="row">
			<!-- start nếu xảy ra lỗi thì hiện thông báo: -->
			<?php
				if(isset($_COOKIE["error"])){
			?>
				<div class="alert alert-danger">
				  	<strong>Có lỗi!</strong> <?php echo $_COOKIE["error"]; ?>
				</div>
			<?php } ?>
			<!-- end nếu xảy ra lỗi thì hiện thông báo: -->


			<!-- start nếu thành công thì hiện thông báo: -->
			<?php
				if(isset($_COOKIE["success"])){
			?>
				<div class="alert alert-success">
				  	<strong>Chúc mừng!</strong> <?php echo $_COOKIE["success"]; ?>
				</div>
			<?php } ?>
			<!-- end nếu thành công thì hiện thông báo: -->

			<?php
				if(isset($_GET["page"]) && $_GET["page"] == "register")
					include "register.php";
			?>
		</div>

	</div>
</body>
</html>
```

Trong đó:

* header(“location:index.php?page=dangky”) : là chuyển hướng trang sang trang index.php?page=dangky
* hàm isset(): là hàm kiểm tra một biến có tồn tại hay không.
* include() : là hàm triệu gọi file
* lệnh thực hiện truy vấn: mysqli_query($connect,” các câu lệnh truy vấn “);
* Tôi sử dụng hàm setcookie() để tạo ra một biến thông báo tồn tại trong 1 giây, để hiện các thông báo có thực hiện thành công hay không.
* md5(): là hàm mã hóa một chuỗi thành 1 dãy kí tự gồm 32 ký tự.

**Bước 6: tạo một form đăng nhập:**

```
<form action="" method="post">
<div class="col-md-6 col-md-offset-3">
	<div class="alert alert-info">
	  <strong>'Trang đăng nhập'</strong>
	</div>

	<div class="panel panel-primary">
	    <div class="panel-body">
	    	<div class="form-group">
				<label for="email">Tài khoản:</label>
				<input type="text" class="form-control" name="user_name_lg" placeholder="Nhập tên đăng nhập...">
			</div>

			<div class="form-group">
				<label for="pwd">Mật khẩu:</label>
				<input type="password" class="form-control" name="passlg" placeholder="Nhập mật khẩu..." required>
			</div>

			<button type="submit" class="btn btn-default" name="dangnhap">'Đăng nhập'</button>
	    </div>
	</div>
</div>
</form>
```

**Bước  7: lấy dữ liệu từ form đăng nhập và xử lý:**

```
<?php
	$connect = mysqli_connect('localhost','root','','login');
	mysqli_set_charset($connect,"utf8");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Index</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
<body>

	<!-- 'start thực hiện kiểm tra dữ liệu người dùng đăng ký' -->
	<?php
		if(isset($_POST["register"])){
			$user_name = $_POST["user_name"];
			$pass1 = $_POST["pass1"];
			$pass2 = $_POST["pass2"];
			$name = $_POST["full_name"];
			//kiểm tra xem 2 mật khẩu có giống nhau hay không:
			if($pass1!=$pass2){
				header("location:index.php?page=register");
				setcookie("error", "Đăng ký không thành công!", time()+1, "/","", 0);
			}
			else{
				$pass = md5($pass1);
				mysqli_query($connect,"
					insert into user (user_name,password,full_name)
					values ('$user_name','$pass','$name')
				");
				header("location:index.php?page=register");
				setcookie("success", "Đăng ký thành công!", time()+1, "/","", 0);
			}
		}

	?>
	<!-- 'end thực hiện kiểm tra dữ liệu người dùng đăng ký' -->


	<!-- 'start thực hiện kiểm tra dữ liệu người dùng nhập ở form đăng nhập' -->
	<?php
		if(isset($_POST["dangnhap"])){
			$tk = $_POST["user_name_lg"];
			$mk = md5($_POST["passlg"]);
			$rows = mysqli_query($connect,"
				select * from user where user_name = '$tk' and password = '$mk'
			");
			$count = mysqli_num_rows($rows);
			if($count==1){
				$_SESSION["loged"] = true;
				header("location:index.php");
				setcookie("success", "Đăng nhập thành công!", time()+1, "/","", 0);
			}
			else{
				header("location:index.php");
				setcookie("error", "Đăng nhập không thành công!", time()+1, "/","", 0);
			}
			
		}
	?>
	<!-- 'end thực hiện kiểm tra dữ liệu người dùng nhập ở form đăng nhập' -->



	

	<div class="container">
		<div class="row">
			<a href="index.php?page=register" class="btn btn-success">'Đăng ký'</a>
			<a href="index.php" class="btn btn-info">'Trang chủ'</a>
			<?php if(isset($_SESSION["loged"])) echo "<a href='index.php?act=logout' class='btn btn-danger'>Đăng xuất</a>"; ?>
		</div>

		<div class="row">
			<!-- 'start nếu xảy ra lỗi thì hiện thông báo:' -->
			<?php
				if(isset($_COOKIE["error"])){
			?>
			<div class="alert alert-danger">
			  	<strong>'Có lỗi!'</strong> <?php echo $_COOKIE["error"]; ?>
			</div>
			<?php } ?>
			<!-- 'end nếu xảy ra lỗi thì hiện thông báo:' -->


			<!-- 'start nếu thành công thì hiện thông báo:' -->
			<?php
				if(isset($_COOKIE["success"])){
			?>
			<div class="alert alert-success">
			  	<strong>'Chúc mừng!'</strong> <?php echo $_COOKIE["success"]; ?>
			</div>
			<?php } ?>
			<!-- 'end nếu thành công thì hiện thông báo:' -->




			
			<?php
			//nếu tồn tại biến $_GET["page"] = "register" thì gọi trang đăng ký:
			if(isset($_GET["page"])&&$_GET["page"]=="register")
				include "register.php";


			//nếu không tồn tại biến $_GET["page"] = "register"
			if(!isset($_GET["page"])){
				//nếu tồn tại biến session $_SESSION["loged"] thì gọi nội dung trang admin.php vào
				if(isset($_SESSION["loged"]))
					include "admin.php";
				//nếu không tồn tại biến session $_SESSION["loged"] thì gọi nội dung trang login.php vào
				else
					include "login.php";
			}
			?>
		</div>

	</div>
</body>
</html>
```

Như vậy Minh nhé đã hoàn tất việc giới thiệu chức năng đăng nhập một cách hoàn chỉnh.