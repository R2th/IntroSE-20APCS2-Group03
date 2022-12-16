Đặt vấn đề: Chúng ta có một component để quản lý sách, bao gồm 3 mục category, book, invoice. Vậy để dễ truy cập vào 3 mục này ta cần một menu để có thể truy cập vào 3 mục đấy.

Đây là thành quả ta mong muốn.

![](https://images.viblo.asia/4ccbdac3-2a85-46c9-bf30-41609f554ac7.png)

Để tạo được một menu component  trong joom la chúng ta sẽ làm theo các bước sau:

![](https://images.viblo.asia/d14919a5-4993-427f-9533-25ad5eb4318c.png)
Ở bước này bạn hãy tạo cho mình một component trước đã. Bao gồm các file và folder như trên. 

Sau khi đã tạo xong thì ở trong file book.xml bạn sẽ khai báo các thông tin về component. Và khai báo cả menu nữa
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

        <menu link="option=com_book">COM_BOOK_SHOPPING</menu>
        <submenu>
            <menu link="option=com_book&amp;controller=category">COM_BOOK_CATEGORY</menu>
            <menu link="option=com_book&amp;controller=item">COM_BOOK_BOOK</menu>
            <menu link="option=com_book&amp;controller=invoice">COM_BOOK_INVOICE</menu>
        </submenu>
	</administration>
</extension>

```

Thì đây là code của mình trong file book.xml bạn có thể đọc nó để tham khảo. 

phần cần quan tâm ở đây là 
```
<menu link="option=com_book">COM_BOOK_SHOPPING</menu>
        <submenu>
            <menu link="option=com_book&amp;controller=category">COM_BOOK_CATEGORY</menu>
            <menu link="option=com_book&amp;controller=item">COM_BOOK_BOOK</menu>
            <menu link="option=com_book&amp;controller=invoice">COM_BOOK_INVOICE</menu>
        </submenu>
```
Với câu lệnh đầu tiên là menu chính của chúng ta, sau đấy là các submenu với mỗi thuộc tính link bên trong là một chuỗi gồm 2 phần option và controller được kết nối bằng &amp đấy là ký hiệu (&) bạn có thể xem trên url để thấy rõ hơn là đường dẫn đến controller của từng phần.

Ở trong file book.php
```
<?php
defined('_JEXEC') or die;
echo "<h2> Hello backend </h2>"
?>

```
Sau đấy chúng ta vào localhost: để xem kết quả vừa rồi 

![](https://images.viblo.asia/a7523f79-c083-43c1-a41a-fbb3de92766c.png)