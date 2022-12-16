Khi phát triển 1 ứng dụng, hình ảnh là một trong những yếu tố không thể thiếu trong nội dung của ứng dụng, việc upload ảnh lên server là việc cần thiết trong quá trình phát triển ứng dụng. Trong bài viết này mình sẽ hướng dẫn các bạn thực hiện bằng laravel, chọn ảnh sau đó chương trình sẽ tự động hiển thị & upload lên server.


-----


### Bước 1: Xây dựng Form để chọn file ảnh và upload
```php
{!! Form::open(array('url'=>null, 'file'=>true, 'method'=>'post', 'id'=>'imageImage', 'name'=>'saveImage')) !!}
<label for="imgInp" class="clone">
	{!! Html::image('../resources/assets/img/images.png', 'upload photo', array('class' => 'image_rounded imgId', 'id' => 'imgId', 'width' => '400px', 'height' => '280px' ))!!}
</label>
{!! Form::hidden('pathPhoto', null, array('class' => 'pathPhoto', 'id' => 'pathPhoto')) !!}
{!! Form::file('image_path', array('style'=>'display:none', 'id' => 'imgInp', 'accept' => 'image/x-png, image/jpeg')) !!}
{!! Form::hidden('_token', csrf_token()) !!}
<br>
{!! Form::submit('save') !!}
{!! Form::close() !!}
```
* Theo cách thông thường khi thêm file thì chúng ta chỉ sử dụng Form::file thông thường như sau: 

```php
{!! Form::file('image_path') !!}
```
kết quả hiển thị cho chúng ta 1 button cho phép chọn file từ máy khi click, và sau khi chọn thì tên file sẽ hiển thị ngay bên cạnh button.
![](https://images.viblo.asia/6d57d276-0235-4875-877a-0a4cecb270fb.jpg)
<br>
* Khi làm theo cách này thì để chọn được ảnh từ máy người dùng cần phải tạo 1 button  có type=”file

```php
{!! Form::file('image_path', array('style'=>'display:none', 'id' => 'imgInp', 'accept' => 'image/x-png, image/jpeg')) !!}
```
để ở chế độ **display : none** ẩn nó đi, khi bấm vào bức ảnh action mà chúng ta mặc định cho button này sẽ được kích hoạt.
<br>
* Đồng thời đường dẫn file được chọn sẽ không hiển thị ra ngoài trình duyệt mà được ẩn đi nhờ vào việc sử dụng **Form::hidden** 
<br>
```php
{!! Form::hidden('pathPhoto', null, array('class' => 'pathPhoto', 'id' => 'pathPhoto')) !!}
```
<br>
thay vào đó là hình ảnh được chọn upload sẽ được hiển thị ra ngoài trình duyệt.
<br>

> Tạo controller và tạo đường dẫn Route để chạy Form kết quả:

![](https://images.viblo.asia/c639bf06-73e8-4c8c-970e-836b2920f23d.jpg)
### Bước 2: Xây dựng đoạn mã JavScript để xử lý việc upload file
```javascript
<script>
	function readURL(input,img)
	{
		if(input.files && input.files[0])
		{
			var reader = new FileReader();

			reader.onload = function (e)
			{
				$(img).attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	};

	function browserURL(path,path2)
	{
		$(path).change(function()
		{
			readURL(this,path2);
		});
	};
	
	browserURL("#imgInp","#imgId");
</script>
```
Chúng ta click vào khung ảnh upload photo chọn ảnh muốn upload, khi ảnh được upload sẽ được gọi bởi hàm browserURL("#imgInp","#imgId"), đây là action mà chúng ta tạo ra cho button file được kích hoạt, ảnh được chọn sẽ được hiển thị ra ngoài trình duyệt luôn.
![](https://images.viblo.asia/2b7ea4f5-bbd6-44f4-96fa-d08875a5de37.jpg)

Sau khi chọn ảnh, muốn lưu chúng vào cơ sở dữ liệu và đồng thời lưu chúng vào thư mục thì chúng ta cần xử lý tiếp ở phía server.
### Bước 3: Tạo function xử lý đường dẫn file ảnh
Tạo class photo chứa **function insertPhoto** để xử lý đường dẫn file ảnh lấy được và định nghĩa đường dẫn mới của ảnh sẽ được lưu vào csdl.

-----


```php
use Input;
use Illuminate\Http\Request;

Class Photo
{
    public static function insertPhoto($fileName, $path, $defaultName=null, Request $request)
    {
    	$photo = null;
    	$file = Input::file($fileName);
    	if(Input::hasFile($fileName))
    	{
    		$destinationPath = $path;
    		$extension = $file -> getClientOriginalExtension();
    		$name = $file -> getClientOriginalName();
    		$name = date('Y-m-d').Time().rand(11111, 99999).'.'.$extension;
    		$photo = $destinationPath.'/'.$name;
    		$file->move($destinationPath, $name);
    	}
    	else 
    	{
    		$photo = $defaultName;
    	}
    	return $photo;
    }
}
```
### Bước 4: Xử lý ở Server để lưu trữ ảnh
vẫn trong controller ở **bước 1** chúng ta xây dựng 1 **function** tướng ứng với 1 **route** để xử lý việc load file ảnh vào thư mục lưu trữ và lưu nó vào cơ sở dữ liệu của chúng ta.

-----


```php
public function postUpload(Request $request)
	{
	    try
	    {
	    	$data = array('image_path'=>Photo::insertPhoto('image_path', '../resources/assets/imageUpload', 'no image', $request));
		    DB::table('tblImage')->insert($data);

		    return "saved";
		}
		catch(\Exception $e)
		{
			return $e->getMessage();
		}
	}
```
kết quả sau khi xử lý server:

> ảnh được lưu vào cơ sở dữ liệu
> 
<br>

![](https://images.viblo.asia/4b6dda6a-52e9-4b96-b17c-67e538f7b6e2.jpg)
<br>

> ảnh được chọn upload cũng được tự động load vào thư mục resources/assets/imageUpload/ 
> 
![](https://images.viblo.asia/a91d6c93-8798-4422-a4d8-e6832c1ece33.jpg)
<br>
<br>

**Về cơ bản như vậy là xong, trong trường hợp form dữ liệu của bạn ngoài ảnh ra còn nhiều trường thông tin khác cần lưu vào database thì cũng làm hoàn toàn tương tự, lấy hết các trường thông tin cần thiết sau đó lưu vào cơ sở dữ liệu là xong :)**
<br>
> Tham khảo: http://apollo13.vn/lap-trinh/php/laravel/upload-anh-giong-nhu-doi-avatar-facebook.html