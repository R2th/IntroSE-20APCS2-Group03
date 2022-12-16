# Tại sao chúng ta nên sử dụng BEM + SASS ?

Có ý kiến đặt ra rằng việc sử dụng BEM + SASS nó còn tuỳ thuộc vào mỗi người, như vậy đúng không ?
Đúng, trong nhiều trường hợp nó còn tuỳ vào sở thích của cá nhân, bạn có thể lựa chọn xem bạn có nên sử dụng trong các dự án của mình hay không. Trong suốt bài viết này, chúng ta sẽ cùng tìm hiểu xem chúng là gì, cách chúng hoạt động và lợi ích của việc sử dụng chúng.

Trước hết hãy đi sâu vào BEM & SASS là gì .

##  BEM là gì ?
 
 BEM (Block Element Modifier) là một quy ước đặt tên thường được sử dụng để viết các class trong HTML. Nó giúp bạn tăng tốc trong quá trình phát triển trong khi giữ mọi thứ ngăn nắp và dễ hiểu cho cả team .

Nó dựa trên một ý tưởng đơn giản trong đó mỗi phần lớn đánh dấu gọi là một Block. Mọi thứ bên trong block được gọi là một Element. Và Modifier là các biến thể của một block hoặc một element cụ thể .

Hãy xem qua ví dụ sau để hiểu rõ hơn :

```
<section class="bar">
	<img class="bar__logo" src="#"/>
	<ul class="bar__list">
		<li class="bar__item">
			<a href="#" class="link link--highlight">Item 1</a>
		</li>
		<li class="bar__item">
			<a href="#" class="link">Item 2</a>
		</li>
		<li class="bar__item">
			<a href="#" class="link">Item 3</a>
		</li>
	</ul>
</section>
```

Ở đây chúng ta có một block gọi là “bar”. Nó chứa một image “bar__logo” và list “bar__list” các link ”bar__item” và “link” (là một block nhỏ khác được sử dụng trong toàn bộ dự án). Đối với một trong các link chúng ta cũng có một modifier, “—hightlight”, Nó chỉ ra rằng link của chúng ta sẽ trong khác với những link còn lại. -> Đó chính là BEM .

Cách tiếp cận tương tự có thể được áp dụng cho bất kỳ loại block nào. Để hiểu hơn chi tiết về BEM, chúng ta có thể tham khảo thêm [tài liệu này](http://getbem.com/introduction/) .

## SASS là gì ?

SASS (Syntactically Awesome Style Sheets) mặt khác, là một CSS preprocessor nó giúp viết cú pháp nhanh hơn và dễ đọc hơn so với CSS thông thường.

“Prepro-là sao ta?”  Hay nghĩ CSS preprocessor như các chương trình giúp bạn tạo CSS bằng cách sử dụng một cú pháp duy nhất. Những thứ như operators, nesting, mixins, inheritance ( có sẵn trong SASS ) sẽ giúp chúng ta dễ viết và dễ maintain hơn . 

Ta sẽ lấy một ví dụ, ở ví dụ này chúng ta sẽ sử dụng SCSS, một biến thể của SASS và nó gần giống hơn với CSS. Bạn  có thể tìm thấy những điều cơ bản cũng như sự khác biệt về cú pháp giữa SASS và SCSS tại [đây](https://sass-lang.com/guide). 
Đây là một ví dụ đơn giản : 

```
//variables
$color-red: #FF0000;
$color-gray: #CCCCCC;
$color-black: #111111;
$spacing: 5px;

//nesting
.bar {
	border: 1px solid $color-gray; // variable use
	
	&__list {
		padding: 0 3 * $spacing; //operation including variable
	}
	
	&__item {
		list-style: none;
		background-color: $color-black;
		margin-bottom: $spacing;
		padding: 2 * $spacing;
	}
	
	&__logo {
		display: none;
	}
}

.link {
	text-decoration: none;
    color: $color-red;

    &--highlight {
        font-weight: bold;
    }
}
```

Nó khá là dễ nhìn. Lưu ý cách mình đã kết hợp nó với BEM. 

## Sự kết hợp giữa BEM và SASS

Bây giờ chúng ta đã đề cập đến BEM & SASS, chúng ta hãy tìm hiểu thêm bằng cách nghiên cứu một lỗi phổ biến trong một ví dụ thực tế. Môi người nào đó có thể sẽ cuốn theo cách viết này : 

```
<section class="profile-card">
	<p class="profile-card__name">Name<p>
	<div class="profile-card__actions">
		<button class="profile-card__actions__save">
			<span class="profile-card__actions__save__icon" />
			<p class="profile__card__actions__save__text">Save</p>
		</button>
		<button class="profile-card__actions__delete">
			<span class="profile-card__actions__delete__icon" />
			<p class="profile__card__actions__delete__text">Delete</p>
		</button>
	</div>
	<div class="profile-card__info">
		Lorem ipsum
		<button class="profile-card__info__button">
			Request info
		</button>
	</div>
</section>
```

SCSS sẽ lồng vào nhau một cách hoàn hảo như sau :

```
.profile-card {
	&__name {
		font-size: 14px;
	}
	
	&__actions {
		padding: 10px;
		
		&__save,
		&__delete {
			&__icon,
			&__text {
				color: white;
				@debug &;
			}
			
			&__text {
				font-size: 12px;
			}
		}
		
		&__save { 
			background: black;
		}
		
		&__delete {
			background: red;
		}
	}
	
	&__info {
		&__button {
			color: white;
			background: black;
		}
	}
}
```

Tuy nhiên, có một vấn đề với cách tiếp cận này; Nó không tuân theo phương pháp đặt tên BEM. Nên tránh việc các class lồng nhau như vậy cho các element bên trong các block. Tại sao ?
Bởi vì nó sẽ dẫn đến một cái tên class dài dằng dặc như này : 

`.profile__card__actions__delete__text`

Bạn có thể nghĩ : “ Sau đó tôi sẽ bỏ qua class và và nhắm đến trực tiếp các tags ”. Điều đó cũng không tuân theo BEM. Một cách gọn nhất để xử lý trường hợp này đó là :

```
<section class="profile-card">
	<p class="profile-card__name">Name</p>
	<div class="profile-card__actions">
		<button class="btn btn--black">
			<span class="btn-icon btn-icon--check"/>
			<p class="btn-text">Save</p>
		</button>
		<button class="btn btn--red">
			<span class="btn-icon btn-icon--trash"/>
			<p class="btn-text">Delete</p>
		</button>
	</div>
	<div class="profile-card__info">
		Lorem ipsum
		<button class="btn btn--black">Request info</button>
	</div>
</section>
```

Nơi style của bạn sẽ trông như thế này :

```
.profile-card {
	&__name {
		font-size: 14px;
	}
	
	&__actions {
		padding: 10px;
	}
}

.btn {
	&--red,
	&--black {
		color: white;
	}
	
	&--red {
		background: red;
	}
	
	&--black {
		background: black;
	}
	
	&-icon,
	&-text {
		color: white;
	}
	
	&-text {
		font-size: 12px;
	}
}
```

Nó trông ổn hơn rất nhiều đúng không nào ? 
Bằng cách này bạn sẽ tránh được các tên class dài . Các block nhỏ cũng giúp bạn dễ dàng sử dụng lại, vì vậy bạn sẽ tiếp kiệm thời gian khi update sau này. Ngoài ra nó còn giúp chúng ta dễ dàng maintain UI của các element cơ bản được hiển thị trên tất cả các dự án của bạn ( ví dụ như : buttons, links )

## Một thủ thuật cuối cùng

Đôi khi việc tái cấu trúc lại markup không phải là một lựa chọn (ví dụ : dự án lớn với cú pháp BEM được thay đổi ), vì vậy hãy quay lại ví dụ ban đầu. Nếu bạn đang ở trong tình huống như thế và bạn cảm thấy khó nhắm tới các element từ SCSS, hãy thử debug .

“Chúng ta có thể debug SASS không ?”
Có, Chúng ta có thể debug và xuất style lồng nhau đã được biên dịch bằng @debug

```
...
&__save,
&__delete {
	&__icon,
	&__text {
		color: white;
		@debug &;
	}
}
...
```

Output sẽ là :

`.profile-card__actions__save__icon, .profile-card__actions__save__text, .profile-card__actions__delete__icon, .profile-card__actions__delete__text`

Debugging giúp bạn dễ dàng phát hiện ra lỗi cú pháp và sửa chúng.

# Kết Luận

Như mình có nói ở đầu bài viết, cách sử dụng này có thể phù hợp với bạn hoặc không. Hãy thử và dùng nó nếu bạn cảm thấy OK. Thậm chí bạn cũng có thể điều chỉnh nó sao cho phù hợp với style của riêng mình NHƯNG hãy đảm bảo rằng bạn vẫn nhất quán với phương pháp mà bạn sử dụng / sửa đổi .

Tới đây, xin cảm ơn bạn đã đọc bài viết và hẹn gặp lại bạn trong những bài viết tiếp theo nhé.
Thanks for watching !

Reference : https://www.pullrequest.com/blog/bem-and-sass-whats-the-difference-and-how-to-use-them/