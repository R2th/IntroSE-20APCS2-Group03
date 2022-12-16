## Giới thiệu
Ở phần 2, chúng ta đã làm demo CRUD với Livewire và tìm hiểu cơ chế data binding cũng như các actions tương tác trên màn hình. Hôm nay, chúng ta sẽ xây dựng chức năng **search** và **phân trang**. Let's goooo!!!

### 1. Chức năng Search
Chúng ta hãy bắt đầu bằng việc tạo file view search.blade.php và thêm trong đó 1 input form và đừng quên liên kết nó với Livewire:

```
<div class="row">
    <div class="col-md-6">
        <h2>Search</h2>
        <div class="form-group">
            <input wire:model.debounce.1000ms="searchTerm" type="text" class="form-control">
        </div>
    </div>
</div>
```

Sau đó include vào file components.blade.php. Ở input form, mình data binding cho model có tên **searchTerm** vì vậy ở file controller ContactComponent sẽ phải khai báo 1 thuộc tính public có tên **$searchTerm** và sửa lại chút method **render()** để search được theo param truyền vào:

```
class ContactComponent extends Component
{
    ...
    public $searchTerm;

    public function render()
    {
        $this->data = Contact::where('name', 'like', '%' . $this->searchTerm . '%')->get();

        return view('livewire.contacts.component');
    }
}
```

Hãy thử xem kết quả nhé
![](https://images.viblo.asia/33315e31-8ce4-47b9-92de-53ba8caff88e.gif)

### 2. Chức năng Pagination
Livewire cung cấp việc phân trang trong 1 component bằng cách sử dụng **WithPagination**.

```
use Livewire\WithPagination;
 
class ContactComponent extends Component
{
    ...
    use WithPagination;
    
    public $contacts;
    
    public function render()
    {
        $this->contacts = Contact::where('name', 'like', '%' . $this->searchTerm . '%')->paginate(10);

        return view('livewire.contacts.component');
    }
}
```

component.blade.php

```
{{ $contacts->links() }}
    
<div class="row" style="margin-top: 20px">
    <table class="table table-bordered table-condensed">
        <tr>
            <td>ID</td>
            <td>NAME</td>
            <td>PHONE</td>
            <td>ACTION</td>
        </tr>
        @foreach($contacts as $row)
        <tr>
            <td>{{$row->id}}</td>
            <td>{{$row->name}}</td>
            <td>{{$row->phone_number}}</td>
            <td width="150">
                <button wire:click="edit({{$row->id}})" class="btn btn-xs btn-primary">Edit</button>
                <button wire:click="destroy({{$row->id}})" class="btn btn-xs btn-danger">Delete</button>
            </td>
        </tr>
        @endforeach
    </table>
</div>
```

Khi bạn chạy thử sẽ xuất hiện dòng thông báo lỗi:

> Livewire component's [contact-component] public property [contacts] must be of type: [numeric, string, array, null, or boolean]. Only protected or private properties can be set as other types because JavaScript doesn't need to access them.

Do $this->data là 1 instance của **Illuminate\Pagination\LengthAwarePaginator** mà thuộc tính public phải là 1 trong những dạng data: numeric, string, array, null hoặc boolean. Lúc này, ta phải truyền đối tượng vào method view() để phân trang

```
use Livewire\WithPagination;
 
class ContactComponent extends Component
{
    ...
    use WithPagination;
    
    public function updatedSearchTerm()
    {
        $this->resetPage();
    }
    
    public function render()
    {

        return view('livewire.contacts.component', [
            'contacts' => Contact::where('name', 'like', '%' . $this->searchTerm . '%')->paginate(10)
        ]);
    }
}
```

Tình huống user thường xuyên gặp phải là truy cập page 4, sau đó nhập vào trường tìm kiếm làm tập kết quả bị thu hẹp lại, thì thường có thể đặt lại trang thành page 1. Trait **WithPagination** cung cấp method `resetPage()` để giải quyết vấn đề này và chúng ta có thể sử dụng với lifecycle hooks `updated/updating`.

Tương tự như các framework JS thì package Livewire cũng có vòng đời với các method giúp bạn xử lý code ở bất kỳ phần nào trong vòng đời của component.



| Hooks | Chi tiết |
| -------- | -------- |
| mount     | Giống như `__construct()`, `mount()` chạy 1 lần duy nhất ngay sau khi component được khởi tạo và trước method `render()`     |
| hydrate     | Chạy mỗi khi có request, chúng được thực hiện trước 1 action hoặc `render()`     |
| updating     | Chạy trước bất kỳ cập nhật nào đối với dữ liệu của component|
| updated     | Chạy sau bất kỳ cập nhật nào đối với dữ liệu của component     |
| updatingFoo     | Chạy trước khi thuộc tính $foo được cập nhật     |
| updatedFoo     | Chạy sau khi thuộc tính $foo được cập nhật     |


### 3. Giao tiếp giữa các components
Với SPA sử dụng component thì việc tái sử dụng và giao tiếp giữa các components là việc vô cùng quan trọng. Đó là xương sống của ứng dụng. Livewire components có thể giao tiếp với nhau thông qua hệ thống global event. Với điều kiện chúng được gọi cùng trong 1 trang, 
lúc này components có thể giao tiếp bằng cách sử dụng events và listeners.

Trong 1 ứng dụng, việc search xuất hiện ở rất nhiều trang cho nên chúng ta sẽ tách chức năng này ra làm 1 component riêng có tên là SearchComponent và tái sử dụng nó.

```
namespace App\Http\Livewire;

use Livewire\Component;

class SearchComponent extends Component
{
	public $searchTerm;

	public function updated()
	{
		$this->emit('searchContact', $this->searchTerm);
	}

    public function render()
    {
        return view('livewire.search-component');
    }
}
```

Đừng quên gọi `@livewire('search-component')` vào file component.blade.php của chúng ta.

Để kích hoạt 1 event thì Livewire cung cấp 3 cách:

* Cách 1: Từ file view template

```
<button wire:click="$emit('postAdded')">
```

* Cách 2: Từ component

```
$this->emit('searchContact', $this->searchTerm);
```

* Cách 3: Từ global js
```
<script>
    window.livewire.emit('postAdded')
</script>
```

Để lắng nghe sự kiện này, ContactComponent của chúng ta tức là component cha sẽ phải khai báo trong thuộc tính `$listeners`. Hãy xóa function updatedSearchTerm() đi vì lúc này thuộc tính $searchTerm được cập nhật bằng cách lắng nghe sự kiện searchContact chứ không phải việc data binding nữa.

```
use Livewire\WithPagination;
 
class ContactComponent extends Component
{
    ...
    use WithPagination;
    
    protected $listeners = [
        'searchContact' => 'setSearchTerm',
    ];
    
    public function render()
    {

        return view('livewire.contacts.component', [
            'contacts' => Contact::where('name', 'like', '%' . $this->searchTerm . '%')->paginate(10)
        ]);
    }
    
    public function setSearchTerm($searchTerm)
    {
        $this->searchTerm = $searchTerm;
        $this->resetPage();
    }
}
```

Đôi khi, các sự kiện phát ra có đích đến cụ thể trong trường hợp các components lồng nhau, ta có thể xác định phạm vi bằng cách sử dụng:

* Chỉ các components cha mới có thể lắng nghe sự kiện

```
$this->emitUp('postAdded');
```

```
<button wire:click="$emitUp('postAdded')">
```

* Chỉ định 1 component cụ thể sẽ lắng nghe sự kiện bằng tên của nó

```
// Chỉ CounterComponent mới lắng nghe được sự kiện postAdded
$this->emitTo('counter', 'postAdded');
```

```
<button wire:click="$emitTo('counter', 'postAdded')">
```

* Chính component phát ra sự kiện mới có thể lắng nghe sự kiện đó

```
$this->emitSelf('postAdded');
```

```
<button wire:click="$emitSelf('postAdded')">
```

### Tổng kết

Vậy là chúng ta đã hoàn thành chức năng search và pagination cho 1 Single Page Application và tìm hiểu Lifecycle Hooks và Events của Livewire. Dễ dàng thấy Livewire quả thật là 1 package mạnh mẽ và hấp dẫn, nó còn rất nhiều thứ để chúng ta khám phá.

Mình xin chân thành cảm ơn các bạn đã đọc bài viết. Hy vọng rằng chúng ta sẽ gặp nhau ở những phần tiếp theo :heart_eyes:

Nguồn:
* https://laravel-livewire.com/