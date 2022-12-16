# I. Form validation
## 1. Intro
Nếu bạn nào chưa đọc bài cơ bản ban đầu thì đọc ngay nhé, vì nó rất quan trọng : [kích vào đây để đọc phần 1](https://b29.vn/post/laravel-livewire-esp-1?id=4)
Cái này giường như mọi khi làm việc với form đều sẽ có và livewire cũng vậy, nó chẳng khác gì laravel. Tóm lại lài livewire sẽ cung cấp cho chúng ta property ```$rules``` cho việc setting validation trong mỗi form. và method ```$this->validate()``` sẽ tiến hành validate những property được xác định trong form.
```php
class LoginForm extends Component
{
    public $username;
    public $password;

    protected $rules = [
        'username' => 'required|min:6',
        'password' => 'required|min:6',
    ];

    public function submit()
    {
        $this->validate();

        // nếu validate thất bại, nó sẽ ko pass được tới đây
		Auth::attempt([
            'username' => $this->username,
            'password' => $this->password,
        ]);
    }
}
```

```html
<form wire:submit.prevent="submit">
    <input type="text" wire:model="username">
    @error('username') <span class="error">{{ $message }}</span> @enderror

    <input type="password" wire:model="password">
    @error('password') <span class="error">{{ $message }}</span> @enderror

    <button type="submit">Login</button>
</form>
```
Rất là gọn gàng, ở đây chúng ta có sử dụng ```wire:submit.prevent, wire:model``` , nếu bạn nào chưa xem thì hay xem lại bài trước nhé.

**NOTE:**
Nếu validation thất bại thì ```ValidationException``` sẽ được bắn ra và được livewire bắt, và $errors object sẽ có sẵn ở view component.  Do vậy bạn có thể hoàn toàn xử lý chúng bao bao gồm ca blade mà bạn included.

Ngoài ra bạn cũng có thể custom key/message trong error bag
```php
$this->addError('key', 'message')
```

Nếu bạn cần định phía rules dynamically , bạn có thể thay thế $rules property bằng method rules() ở component, vì property ```$rules``` chỉ nhận những rule cơ bản, với những case phức tạp, bắt buộc bạn phải dùng tới method rules() này:
```php
use Rule;

class Login extends Component
{
    public $username;
    public $password;

    protected function rules()
    {
        return [
            'username' => [
				'required',
				Rule::exists('users', 'username'),
				... 
			],
            'password' =>'required',
        ];
    }
}
```

## 2. Real-time Validation
Đôi lúc bạn muốn ô input nào đó sẽ được validate tức khắc khi người dùng nhập đó, Livewire có thể làm được nó 1 cách dễ dàng với phương thức ```$this->validateOnly()```:
quay về form ban nãy, chúng ta sẽ thêm method updated(), cái này là 1 lifecircle hooks của livewire, các bạn tham khảo bài trước nha.
```php
class Login extends Component
{
    public $username;
    public $password;

    protected $rules = [
        'username' => 'required|min:6',
        'password' => 'password|min:6',
    ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

...
}
```

Với đoạn html là đoạn form phần trên, ta sẽ đi giải thích cách hđ như sau:
Khi người dụng nhập username chưa đủ 6 chữ, lúc này message validate của min:6 sẽ show lên
 - Do property username được gắn vào input là wire:model nên khi type sẽ trigger updated (lifecircle hooks)
 - Updated sẽ nhận vào 1 tham số đó chính là pros nào được update, cứ props nào được change thì nó sẽ được gọi là re-render component
 - Sau đó chúng ta sẽ tiến hành field đó với ```$this->validateOnly($propertyName);``` , khi fail, nó sẽ re-render và kèm với msg đúng với field đó

Vậy tại sao không dùng ```$this->validated()``` mà lại dùng ```$this->validateOnly($propertyName);```, thật ra dùng cũng được nhưng ```validated()``` sẽ validate toàn bộ, điều này sẽ ko hay.

# Validating with rules outside of the $rules property
Thật ra cách này thì cũng như những validate trên, nhưng thay vì t khai báo ```$rules``` thì t sẽ khi báo mảng đó ở :
```php
$this->validateOnly($propertyName, [
	'username' => 'min:6',
	'password' => 'min:6',
]);

...
hoặc 
$validatedData = $this->validate([
	'username' => 'min:6',
	'password' => 'min:6',
]);
		
```

 Cách này thì tuỳ trường hợp thôi, đôi lúc thấy cái nào nhanh thì mình làm :D 
 ## 3. Customize Error Message & Attributes
 Cái này thì càng quá qen trong laravel rồi
 Bình thường trong 1 file Request của laravel :
 ```php
    ...
    public function rules()
    {
        return [
			'email' => 'required|email',
		];
    }
	
	public function message()
    {
        return [
			'email.required' => 'The Email Address cannot be empty.',
			'email.email' => 'The Email Address format is not valid.',
		];
    }
	
	public function attributes()
    {
        return [
			'email' => 'email address'
		];
    }
```
đó là laravel, vậy con livewire, i chang mà gọn gẽ hơn 1 xíu :D
```php
public $email;

protected $rules = [
	'email' => 'required|email',
];

protected $messages = [
	'email.required' => 'The Email Address cannot be empty.',
	'email.email' => 'The Email Address format is not valid.',
];

protected $validationAttributes = [
	'email' => 'email address'
];

// hoặc có thể làm như như này như laravel, gộp 3 cái vào 1:
$validatedData = $this->validate(
	['email' => 'required|email'],
	[
		'email.required' => 'The :attribute cannot be empty.',
		'email.email' => 'The :attribute format is not valid.',
	],
	['email' => 'Email Address']
);
```

## 4. Direct Error Message Manipulation

Hai method ```validate()``` and ```validateOnly()``` sẽ handle trong mọi case, nhưng thỉnh thoảng bạn có thể control lại Livewire's ErrorBag, kiểu kiểm soát lại viêcn show lỗi.

Livewire cung cấp một số phương pháp để bạn thao tác trực tiếp với ErrorBag.

```php
// Cách nhanh nhất để thêm message vào error bag
$this->addError('email', 'The email field is invalid.');

// 2 method dùng để clear error bah
$this->resetErrorBag();
$this->resetValidation();

// ngoài ra, bạn có thể chỉ định field muốn clear
$this->resetValidation('email');
$this->resetErrorBag('email');

// lấy full error
$errors = $this->getErrorBag();
// với instance error bag, bạn cũng có thể làm như này :
$errors->add('some-key', 'Some message');
```

## 5. Custom validators

Ngoài ra bạn có thể dùng ```use Illuminate\Support\Facades\Validator;``` để custom lại theo ý bạn muốn

```php
$validatedData = Validator::make(
	['email' => $this->email],
	['email' => 'required|email'],
	['required' => 'The :attribute field is required'],
)->validate();
```

```html
<div>
    Email: <input wire:model.lazy="email">

    @if($errors->has('email'))
        <span>{{ $errors->first('email') }}</span>
    @endif

    <button wire:click="saveContact">Save Contact</button>
</div>
```
# II. File upload
## 2.1 Basic File Upload

**Note: Phiên bản Livewire version của bạn phải >= 1.2.0 để sử dụng feature này.**

Làm việc với file upload trong livewire rất đơn giản, hầu như nó đã support cho chúng ta rồi, chỉ cần use vào và dùng. Một ví dụ về việc upload
```php
use Livewire\WithFileUploads;

class UploadPhoto extends Component
{
    use WithFileUploads;

    public $photo;

    public function save()
    {
        $this->validate([
            'photo' => 'image|max:1024',
        ]);

        $this->photo->store('photos');
    }
}
```

```html
<form wire:submit.prevent="save">
    <input type="file" wire:model="photo">

    @error('photo') <span class="error">{{ $message }}</span> @enderror

    <button type="submit">Save Photo</button>
</form>
```
Khá là đơn giản phải không ?  tuy nhiên cả một quá trình xử lý ẩn bên dưới nó đấy :
- Khi một tệp mới được chọn, Livewire's JavaScript sẽ tạo 1 request đến server và get về URL "signed" tạm thời đã tải lên.
- Sau khi nhận được url, Js sẽ upload URL đã đường đẩy lên, và lưu trữ nội dung tải lên trong thư mục /tmp do Livewire chỉ định và trả về ID  unique hash của file tạm mới.
- Sau khi tệp được upload và ID hash được tạo, Livewire js sẽ đưa ra request cuối cùng từ component đến server và " set " file đó đến props public được upload ($photo).
- Props public này (đây $photo) đã được set là file lưu tạm cuối cùng và sẵn sàng được strore hoặc validate bất cứ lúc nào.

## 2.2 Storing Uploaded Files
Hầu như các cách strore file thì giống như laravel, và đây là những cách common mà ta hay sử dụng :
```php
// File uploaded lưu ở photos dir của default filesystem disk.
$this->photo->store('photos');

// Lưu với photo dir nhưng của s3
$this->photo->store('photos', 's3');

// Lưu với filename khác.
$this->photo->storeAs('photos', 'avatar');
$this->photo->storeAs('photos', 'avatar', 's3'); // lưu trên s3 với file nam khác

// Lưu trên s3 và set public cho nó
$this->photo->storePublicly('photos', 's3');

// Store in the "photos" directory, with the name "avatar.png", with "public" visibility in a configured "s3" bucket.
$this->photo->storePubliclyAs('photos', 'avatar', 's3');
```

Rất dễ dàng và y chang laravel.

## 2.3 Handling Multiple Files
Ngoài upload từng file, livewire còn support cho chúng ta handle nhiều file 1 lúc, chỉ cần bạn thêm ```multiple``` attr vào html tag ```<input multiple />``` . ví dụ :
```html
<form wire:submit.prevent="save">
    <input type="file" wire:model="photos" multiple>

    @error('photos.*') <span class="error">{{ $message }}</span> @enderror

    <button type="submit">Save Photo</button>
</form>
```
```
use Livewire\WithFileUploads;

class UploadPhotos extends Component
{
    use WithFileUploads;

    public $photos = [];

    public function save()
    {
        $this->validate([
            'photos.*' => 'image|max:1024', // 1MB Max
        ]);

        foreach ($this->photos as $photo) {
            $photo->store('photos');
        }
    }
}
```
Giống như y cách mà bạn lưu 1 image, chí có điều lúc save, t chạy vòng lặp vì nó nhiều file thôi :D

## 2.4 File Validation
Như những ví dụ ở trên thì file cũng có thể validate được, và validate bình thường như các type khác, và bạn cũng có thể sử dụng ```Real-time Validation``` cho nó.
### 2.5 Temporary Preview Urls
Có khi nào bạn làm chức năng upload mà phải preview trước image chưa ?, nếu bạn sử lý cách thủ công của js, thì cũng hơi lằng nhằn, nhưng đối với livewire thì không, khá đơn giản :
Khi bạn upload 1 file, nó sẽ thêm 1 thuộc phương thức cho field của bạn ```->temporaryUrl()```. phương thức này sẽ trả về url image trong lưu tạm để show lên.
```
... 
<!-- ở ví dụ trên, ta thêm 1 cục html này vào nữa -->
@if ($photo)
	Photo Preview:
	<img src="{{ $photo->temporaryUrl() }}">
@endif
```
Khi bạn chọn filme, mặc định nó sẽ lưu file vào thành file tạm và props $photo đã chưa file đó rồi. nên việc còn lại livewire lo.

#### Chú ý khi upload trên s3.
 - Livewire sẽ lưu các file ở folder temp cho đến khi mình submit và lưu file hoàn toàn, mặc định nó sẽ được lưu ở ```local``` và tại folder ```livewire-tmp/.``` , và các khi bạn chọn lưu trữ ở s3 thì các file này vẫn được lưu ở đây
 - Nếu bạn muốn lưu cả file tạm lên s3, thì vào ```config/livewire.php```, và set ``` livewire.temporary_file_upload.disk``` thành ```s3```
 - 
 ```php
 return [
    ...
    'temporary_file_upload' => [
        'disk' => 's3',
        ...
    ],
];
```

#### Configuring Automatic File Cleanup
 Mặc định ở dưới local, các file tạm này sẽ đc cleanup sau 24h, nhưng khi bạn sài s3, bạn cần chạy thêm câu lệnh ```php artisan livewire:configure-s3-upload-cleanup``` của livewire để các file tạm được clean sau 24h.
 
## 2.5 Loading Indicators
Làm việc với file thì khi bạn upload 1 file gì đó rất nặng, muốn cho người dùng biết là nó đang đc tải lên, chúng ta sẽ phải viết đoạn script rất mệt nếu dùng js thường, nhưg với livewire rất dễ dàng vì nó cung cấp cho ta 1 loading state để control phần nào đang loading. Và cách sử dụng ko thể dễ hiểu hơn đc :

```html
<input type="file" wire:model="photo">

<div wire:loading wire:target="photo">Uploading...</div>
```
 => Khi file được upload => file sẽ up lên server để re-render, lúc đó sv sẽ xử lý và state loading đc trigger, wire:target để biết rằng cái nào đang đc bên sv xử lý.

## 2.6 Configuration
Livewire cung cấp cho chúng ta global config cho việc upload file để dễ dàng control hơn trước khi qua xử lý 
### . Global Validation
 - Mặc định livewire sẽ defaukt cho chúng ta là ```file|max:12288```
 - Chúng ta cũng có thể config tại config/livewire.php:
```php
return [
    ...
    'temporary_file_upload' => [
        ...
        'rules' => 'file|mimes:png,jpg,pdf|max:102400', // (100MB max, and only pngs, jpegs, and pdfs.)
        ...
    ],
];
```
### Global Middleware
- Ngoài ra nó cũng cho phép cho ta có phép người dùng có thể upload bn image trên 1 phút nữa
```php
return [
    ...
    'temporary_file_upload' => [
        ...
        'middleware' => 'throttle:5,1', // 
    ],
];
```

### Temporary Upload Directory
Mặc đinhj file tạm sẽ ở ```livewire-tmp/ ```, bạn có thể config lại tại đây 
```
return [
    ...
    'temporary_file_upload' => [
        ...
        'directory' => 'tmp',
    ],
];
```

# III. Kết
Qua bài viết này, bạn có thể hiểu sâu hơn cách làm việc với form, validate... hẹn gặp lại bạn ở bài tiếp theo