### Giới thiệu
Hôm nay mình sẽ giới thiệu cách lấy dữ liệu từ 1 file XML để hiển thị ra HTML bằng Javascrip thì thì ví dụ mình lấy sẽ là hiển thị ra table. Ở các trang tin tức khi có thông tin update thì nó cũng  xuất ra file XML, khi có thông tin mới thì nó sẽ xuất vào file XML nếu mình load đọc những file XML này vào Website của mình thì nó cũng cập nhập theo.

**HTML**
```HTML
<table cellpadding="0" cellspacing="0" border="0" class="tbl">
<col width="15%" />
<col width="15%" />
<col width="70%" />
<tbody>
<tr>
<th></th>
<td></td>
</tr>
</tbody>
</table>
<script src="http://code.jquery.com/jquery-1.6.2.min.js"></script>
<script src="js/news.js"></script>
```

**CSS**
```CSS
body{
padding:20px;
font-size:100.01%;
}

table.tbl{
width:600px;
margin:0 auto;
border-collapse:collapse;
}

table.tbl th,
table.tbl td{
padding:10px;
font-size:0.8em;
font-weight:normal;
vertical-align:top;
border:1px solid #ccc;
line-height:1.6;
}

table.tbl td span{
display:inline-block;
padding:2px 10px;
font-size:0.78em;
color:#fff;
}

table.tbl td span.company{background:#0066cc;}
table.tbl td span.products{background:#0dd000;}
```
**Js**
```JS
// -------------------------------------------------
// init
// -------------------------------------------------
$(function(){
$("table.tbl tbody").html("");
});


// -------------------------------------------------
// load XML
// -------------------------------------------------

function xmlLoad(){
$.ajax({
url:'xml/data.xml',
type:'get',
dataType:'xml',
timeout:1000,
success:parse_xml
});
}

// -------------------------------------------------
// Lấy XML data
// -------------------------------------------------

function parse_xml(xml,status){
if(status!='success')return;
$(xml).find('item').each(disp);
}


// -------------------------------------------------
// Make table
// -------------------------------------------------

function disp(){

var $day = $(this).find('day').text();
var $label = $(this).find('label').text();
var $category = $(this).find('category').text();
var $content = $(this).find('content').text();
var $url = $(this).find('url').text();
var $target = $(this).find('target').text();

$('<tr>'+
'<th>'+$day+'</th>'+
'<td class="label"><span class="'+$label+'">'+$category+'</span></td>'+
'<td><a href="'+$url+'" target="'+$target+'">'+$content+'</a></td>'+
'</tr>').appendTo('table.tbl tbody');
}

$(function(){
xmlLoad();
});
```

```XML
<?xml version="1.0" encoding="UTF-8" ?>
<info>
<item>
<day>2020.05.23</day>
<label>company</label>
<category>AAAA</category>
<content>AAAAAAAAAA</content>
<url>http://www.google.com/</url>
<target>_self</target>
</item>

<item>
<day>2020.05.23</day>
<label>company</label>
<category>BBBB</category>
<content>BBBBBBBBBBB</content>
<url>http://www.google.com/</url>
<target>_self</target>
</item>

<item>
<day>2020.05.24</day>
<label>company</label>
<category>CCCC</category>
<content>CCCCCCCC</content>
<url>http://www.google.com/</url>
<target>_self</target>
</item>

</info>
```

Demo
http://www.ezgate-mt.sakura.ne.jp/data/tips/entry109/


### Lời kết
Cảm ơn mọi người đã đọc bài , hi vọng bài viết có ích cho các bạn !