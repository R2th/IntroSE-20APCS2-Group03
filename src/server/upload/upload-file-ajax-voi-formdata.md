## 1. FormData là gì 

FormData là một interface mới được HTML5 giới thiệu trong Web API.

Hầu hết chúng ta đã từng chặn hoặc chỉnh sửa dữ liệu khi submit form với Jquery . FormData là một Web API interface, cung cấp cho ta một cách tiếp cận khác với việc xử lý form. Việc sử dụng FormData cũng giống với việc xử dụng ajax jquery.




## 2. Cách sử dụng form Data


### 2.1. .append()

Chèn thêm cặp key-value vào form data. Giống với việc ta chèn input hidden_field vào form thông thường.
```javascript
var formData = new FormData(); // Currently empty
formData.append('username', 'Chris');
formData.append('userpic', myFileInput.files[0], 'chris.jpg');
```



### 2.2 .delete()
Xóa cặp key-value trong FormData Object 
```javascript
var formData = new FormData(); // Currently empty
formData.append('username', 'Chris');
formData.append('userpic', myFileInput.files[0], 'chris.jpg');
```

### 2.3 Loop qua các key-value với entries 
Chúng ta có thể loop qua các key-value của FormData với entries
```javascript
// Create a test FormData object
var formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Display the key/value pairs
for(var pair of formData.entries()) {
   console.log(pair[0]+ ', '+ pair[1]);
}

// Result
key1, value1
key2, value2
```

### 2.4 .get()

Get giá  trị đầu tiên của formdata tương ứng với key 
```javascript
var formData = new FormData();
formData.append('username', 'Chris');
formData.append('username', 'Bob');
formData.get('username'); // Returns "Chris"
```

### 2.5 .getAll()
Trả về tất cả các giá trị của formdata tương ứng với key
```javascript
var formData = new FormData();
formData.append('username', 'Chris');
formData.append('username', 'Bob');
formData.getAll('username'); // Returns ["Chris", "Bob"]
```


### 2.6 .set()
Gán giá trị cho một key tương ứng
```javascript
var formData = new FormData(); // Currently empty
formData.set('username', 'Chris');
formData.set('userpic', myFileInput.files[0], 'chris.jpg');
formData.set('name', 72);
formData.get('name'); // "72"
```

## 3. Upload file với ajax formData

Mặc định thì file field khi submit form sẽ không được add vào ajax nếu ta submit như thông thường. Khi submit thì fields[type="file"] sẽ bị missing

```javascript
var form = $('form');
$.ajax({
    url: path,
    method: 'POST',
    data : form.serialize()
})

```

Với formData

```javascript
var formData = new FormData($('form')[0]);

$.ajax({
    ...
    processData: false,
    contentType: false,
    data: formData
    ...
});

```
mặc định Ajax sẽ để option processData là true, tự động convert data về string, và set content-type là "application/x-www-form-urlencoded". False sẽ skip quá trình này và set mặc định của form 

ContentType: false  cũng skip việc set contentType mặc định của ajax là "application/x-www-form-urlencoded".

## 4. Upload file với iframe
Còn 1 cách khác để upload file là sử dung iframe


```html

    <iframe id="uploadTrg" name="uploadTrg" height="0" width="0" frameborder="0" scrolling="yes"></iframe>

    <form id="myForm" action="http://example.com/file-upload-service" method="post" enctype="multipart/form-data"  target="uploadTrg">

        File: <input type="file" name="file">
        <input type="submit" value="Submit" id="submitBtn"/>

    </form>

    <div id="ajaxResultTest"></div>
 ```
 
 ```javascript
 $("iframe").load(function(){
    alert("The file is uploaded");
});
 ```