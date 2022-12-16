Trong lập trình component về joomla chúng ta có thể tạo ra một component ở ngoài rồi sau đó sẽ import vào sau bằng tính năng install extention 
![](https://images.viblo.asia/106fbd30-e4cb-48d7-8336-3f23e42307d6.png)

Đặt vấn đề: Chúng ta sẽ thử tạo một khung của component để quản lý sách nhé. Mục tiêu của chúng ta chỉ đơn giản là hiểu được cấu trúc đơn giản nhất trong một component là gì. Trong bài viết này tôi vẫn chưa đề cập đến MVC trong một component.

Như vậy đầu tiên chúng ta sẽ phải tạo ra một folder có tên là com_book để đúng chuẩn component

Cấu trúc nó sẽ như thế này 
![](https://images.viblo.asia/acb84b39-d75c-459e-8aa7-e93dcea6cb6e.png)

Ở đây bạn có thể thấy chúng ta phải tạo trong folder com_book 1 file book.xml, 2 folder admin và site. Những file trong folder admin sẽ được thực thi trong giao diện quản lý còn những file trong folder site sẽ thực hiện trong giao diện người dùng. 

Ở trong file book.xml, file này là file thực thi component nó sẽ chứa các thông tin liên quan đến component 

```
<?xml version="1.0" encoding="utf-8"?>
<extension type="component" version="3.1" method="upgrade">
	<name>com_book</name>
	<author>Lê Văn Quang An</author>
	<creationDate>Junly 2020</creationDate>
	<copyright>(C) 2005 - 2020 Open Source Matters. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>admin@joomla.org</authorEmail>
	<authorUrl>www.joomla.org</authorUrl>
	<version>1.0.0</version>
	<description>book Shop</description>
	<media />

    <files folder="site">
			<filename>book.php</filename>
			<filename>index.html</filename>

		</files>
    <languages folder="site">
        <language tag="en-GB">language/en-GB.com_book.ini</language>
    </languages>

	<administration>
		<files folder="admin">
            <filename>book.php</filename>
			<filename>index.html</filename>
        </files>

        <languages folder="admin">
            <language tag="en-GB">language/en-GB.com_book.ini</language>
            <language tag="en-GB">language/en-GB.com_book.sys.ini</language>
        </languages>
        <menu link="option=com_book">
</menu>
	</administration>
</extension>

```
Dòng đầu tiên <?xml version="1.0" encoding="utf-8"?> là version và encoding của file xml 
Dòng thứ 2  `<extension type="component" version="3.1" method="upgrade">` khai báo kiểu và version của joomla method ở đây là upgrade sẽ đưa vào cơ sở dữ liệu. và bên trong là những thẻ liên quan đến thông tin của component 

```
    <files folder="site">
			<filename>book.php</filename>
			<filename>index.html</filename>
	</files>
    <languages folder="site">
        <language tag="en-GB">language/en-GB.com_book.ini</language>
    </languages>
```
Đoạn này được khai báo trong cặp thẻ file là những file sẽ thực hiện ở phần front-end mình sẽ phải chỉ rõ đó là folder nào thì hiện tại của mình đang là folder "site" và bên trong chứa 2 file là book.php và index.php
cặp thẻ languages cũng là để chỉ định ngôn ngữ được hiển thị trong folder site này 

```
<administration>
		<files folder="admin">
            <filename>book.php</filename>
			<filename>index.html</filename>
        </files>

        <languages folder="admin">
            <language tag="en-GB">language/en-GB.com_book.ini</language>
            <language tag="en-GB">language/en-GB.com_book.sys.ini</language>
        </languages>
        <menu link="option=com_book">
</administration>
```

Phần này được viết trong cặp thẻ administration thì mọi người chắc cũng hiểu được việc khai báo các file bên trong và ngôn ngữ bên trong để phục vụ cho back-end

Trong file en-GB.com_book.sys.ini ta hãy khai báo COM_BOOK_SHOPPING = "book shopping".

Như vậy là bạn đã có thể nén folder com_book thành com_book.zip và upload lên bạn sẽ nhận được thông báo 

![](https://images.viblo.asia/106fbd30-e4cb-48d7-8336-3f23e42307d6.png)

![](https://images.viblo.asia/3ef364fc-ac9b-4660-8fe0-c32b85839d0f.png)

Và bạn sẽ thấy một mục book bên trong component của mình 

![](https://images.viblo.asia/e819dce8-7b27-4878-b9ab-28053963b7b0.png)