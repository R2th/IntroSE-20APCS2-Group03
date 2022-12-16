Xin chào các bạn. Hôm nay, mình gửi đến các bạn một bài viết không liên quan chính đến lập trình. Nhưng nó hỗ trợ cho việc lập trình, nên mình quyết định viết luôn. :smile:

# Lý do viết post
---
Lướt facebook dạo và chợt đọc được 1 bài post vô cùng thú vị.

Có một bức ảnh như thế này:

![](http://itshare.asia/uploads/images/1532004553_5b5088c9bb529.jpg)

Nhìn vào bức ảnh, ta có thể nhận ra ngay là các ` toán tử ` được hiển thị rất đặc biệt, không giống với cách hiển thị normal của sublime text (phiên bản mình đang dùng là Sublime text 3).

Một ý tưởng khởi lên trong mình là: "Ồ, đẹp thế nhỉ, mình phải cài cho được chúng?". Và thế là các câu hỏi được đặt ra

* Font chữ trong ảnh để hiển thị được các toán tử đó là gì?
* Tên font chữ đó là gì?
* Link tải là gì?

Sau một hồi lục lọi tung Google và Stackoverflow thì mình cũng biết được tên của font đó là: `Fira Code`.

# Installation
---
> Bước 1: Download font


Link download của font chữ: https://github.com/tonsky/FiraCode

![](http://itshare.asia/uploads/images/1532004573_5b5088dd73c4b.png)

> Bước 2: Giải nén file Zip vừa download về.

Sau khi các bạn tải về thì giải nén ra và được các `folder` như sau:

![](http://itshare.asia/uploads/images/1532004592_5b5088f0d32eb.png)

> Bước 3: Mở folder `ttf` và cài đặt font.

Ta chú ý đến folder có tên: `ttf`, mở folder đó ra ta sẽ được các `File`:

![](http://itshare.asia/uploads/images/1532004664_5b508938e18c7.PNG)

Ta `double-click` vào mỗi file đó như hình sau:

![](http://itshare.asia/uploads/images/1532004706_5b5089622fbcd.png)

Như vậy là đến bước này, ta đã cài đặt được font `Fira-code` vào máy tính...

> Bước 4: Cài đặt font `Fira-code` cho sublime text

Bây giờ, bước cuối cùng là chúng ta sẽ config `settings` cho sublime text.

Các bạn mở sublime text của các bạn và vào phần `references\settings-user`

```
{
	"color_scheme": "Packages/Material Theme/schemes/Material-Theme-Darker.tmTheme",
	"font_face": "Fira Code",
	"font_size": 10,
	"ignored_packages":
	[
		"Vintage"
	],
	"material_theme_accent_cyan": true,
	"material_theme_accent_lime": true,
	"material_theme_compact_sidebar": true,
	"material_theme_small_tab": true,
	"material_theme_tabs_autowidth": true,
	"theme": "Material-Theme-Darker.sublime-theme"
}
```

Đây là phần config của mình... 

Bạn để ý thấy ở dòng thứ 2 mình có:
`"font_face": "Fira Code",`

Sau khi thêm dòng đó, các bạn nhấn `Ctrl + s` và tận hưởng thành quả...

Đây là thành quả của mình:

![](http://itshare.asia/uploads/images/1532004726_5b5089765472e.PNG)

# Kết luận
---

Như vậy là mình đã giới thiệu và cài đặt hoàn tất font `Fira-Code` và `config` hiển thị trên sublime text. Nó sẽ giúp cho việc code của các bạn trở nên thú vị hơn.

Nếu có bất kỳ câu hỏi nào hãy comment bên dưới, mình sẽ giải đáp... :smile:

Bài viết này đồng thời cũng được chia sẻ ở [blog](http://itshare.asia/) của mình... Mình custom blog từ Viblo.. Mong mọi người thông cảm ạ.

Cám ơn các bạn đã đọc bài viết.