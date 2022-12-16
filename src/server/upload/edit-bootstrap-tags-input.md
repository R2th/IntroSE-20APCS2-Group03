# 1. Giới thiệu Bootstrap Tags Input:
- Bootstrap Tags Input là bộ thư việc jQuery kết hợp với thư viện Bootstrap hỗ trợ người dùng tạo giao diện quản lý tag.
- Các bạn có thể download source code bộ thư viện tại [đây](https://github.com/bootstrap-tagsinput/bootstrap-tagsinput) và tham khảo cách cài đặt và sử dụng các hàm của thư viện tại [đây](https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/).

# 2. Cài đặt:
- Để sử dụng bộ thư viện Bootstrap Tags Input, ta chỉ cần include file css và js của Bootstrap và Tags Input vào file html.
- Thêm `data-role="tagsinput"` vào thẻ input được sử dụng để tạo và quản lý tag.
```
<!DOCTYPE html>
<html>
<head>
	<title>Edit With Bootstrap TagsInput</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.min.js"></script>
</head>
<body>
	<center>
	 	<div class="form-group">
			<input type="text" value="123,456,789" data-role="tagsinput" placeholder="Add tags" />
		</div>
	</center>	
</body>
</html>
```
- Kết quả thu được.
![](https://images.viblo.asia/99b4ff6a-3133-4b93-b837-aa8679a474a2.png)

# 3. Một vài hàm cơ bản:
-  Lấy giá trị của các tag .
```
    $('input').val(); // trả về "123,456,789"
```

- Lấy các item đang có
```
    $('input').tagsinput('items'); trả về ["123", "456", "789"]
```

- Tạo tag mới
```
    $('input').tagsinput('add', '123');
```

- Xóa tag bất kì
```
    $('input').tagsinput('remove', '123');
```

- Xóa tất cả các tag
```
    $('input').tagsinput('removeAll');
```

# 4. Một vài sự kiện đơn giản:
- `beforeItemAdd` được gọi trước khi tag được thêm vào.
```
    $('input').on('beforeItemAdd', function() {
        event.item                 // item sẽ được thêm vào
        event.cancel = true;       // ngăn không cho item được thêm vào
    });
```

- `itemAdded` được gọi sau khi tag được thêm vào.
```
    $('input').on('itemAdded', function() {
        event.item                 // item đã được thêm vào
    });
```

- `beforeItemRemove` được gọi trước khi tag bị xóa đi.
```
    $('input').on('beforeItemRemove', function() {
        event.item                 // item sẽ được thêm vào
        event.cancel = true;       // ngăn không cho item bị xoá đi
    });
```

- `itemRemoved` được gọi sau khi tag bị xóa đi.
```
    $('input').on('itemRemoved', function() {
        event.item                 // item đã bị xóa đi
    });
```

# 4. Edit Bootstrap Tags Input:
- Thư viện Bootstrap Tags Input chỉ cho phép ta thêm hoặc xóa 1 tag, để edit 1 tag đã có sẵn ta phải xóa tag đó và thêm 1 tag mới với nội dung tương ứng.
- Hôm nay mình sẽ hướng dẫn các bạn edit trực tiếp 1 tag bằng javascript.
- Giả sử ta có file html `edit_bootatrap_tags_input.html` đã include thư việc Bootstrap, thư việc Bootstrap Tags Input và file `edit_bootatrap_tags_input`.js
```
<!DOCTYPE html>
<html>
<head>
	<title>Edit With Bootstrap TagsInput</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.min.js"></script>

	<script src="edit_bootatrap_tags_input.js"></script>
</head>
<body>
	<center>
	 	<div class="form-group">
			<input type="text" value="123,456,789" data-role="tagsinput" placeholder="Add tags" />
		</div>
	</center>	
</body>
</html>
```
- Ta cài dặt sự kiện `onclick` cho `.tag`, khi click vào `.tag`, ta ẩn tag đó, ẩn thẻ `<input>` măc định, thay thế bằng 1 thẻ `<input>` có giá trị của `.tag` và fpcus vào thẻ `<input>` đó.
```
$(document).on('click', '.tag', function() {
		var tagsInput = $('input[data-role="tagsinput"]');
		var valuesStr = tagsInput.val();
		var values = valuesStr.split(',');

		var bootstrapTagsInput = $('.bootstrap-tagsinput');
		var input = bootstrapTagsInput.find('input');
		var index = bootstrapTagsInput.children().index($(this));
		value = values[index];

		var htmlStr = 	'<span class="tag label label-info" id="js-edit-container">' + 
							'<input type="text" class="form-control" id="js-edit-input" style="background-color: white">' + 
						'</span>'
		$(this).after(htmlStr);
		$(this).hide();
		input.hide();

        var editContainer = $('#js-edit-container');
		var editInput = $('#js-edit-input');
		editContainer.data('value', value);
		editInput.val(value);
		editInput.focus();
	});
```
- Kết quả thu được.
    ![](https://images.viblo.asia/2a29073d-0b98-417b-9799-9ea20f8800b7.png)    
- Ta cài đặt sự kiện `focusout` và cho thẻ  `<input id="js-edit-input">` để khi user click ra ngoài ô input tag được edit và lưu lại kết qủa hoặc trả lại giá trị ban đấu khi user nhập tag rỗng.
```
    $(document).on('focusout', '#js-edit-input', function() {
		var bootstrapTagsInput = $('.bootstrap-tagsinput');
		var editContainer = $('#js-edit-container');
		var tags = bootstrapTagsInput.children();
		var index = tags.index(editContainer);

		var tagsInput = $('input[data-role="tagsinput"]');
		var values = tagsInput.val().split(',');

		var value = $(this).val();
		var defaultValue = editContainer.data('value');
		var value = value || defaultValue;

		var input = bootstrapTagsInput.find('input');

		editContainer.remove();
    	values[index - 1] = value;
    	tagsInput.tagsinput('removeAll');

    	for (var i = 0; i < values.length; i++) {
	      	tagsInput.tagsinput('add', values[i]);
	    }

    	input.show();
    	input.focus();
	});
```
- Bạn cũng có thể cài đặt tương tự khi user nhấn enter hoặc tab.
- Tham khảo source code ví dụ tại [đây](https://github.com/LeTanThanh/edit_bootatrap_tags_input).