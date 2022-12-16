# Laravel livewire 
 - Livewire là một full-stack framework Laravel giúp cho việc xây dựng các dynamic interfaces đơn giản. Nói cách khác là chúng ta có thể build 1 trang web  hoàn toàn bằng Laravel mà không cần sử dụng JS.

##  1. Installation
 Chúng ta sẽ cài đặt thông qua composer như sau : 
 
 ```
 composer require livewire/livewire
 ```
 
 Sau khi cài đặt thành công chỉ cần bạn include chúng vào nơi mà bạn cần dùng là được, ví dụ ở đây mình sẽ include vào app.blade.php để toàn bộ ứng dụng của mình sẽ được sử dụng livewire

**app.blade.php**
```html
 ...
  @livewireStyles
</head>
<body>
    ...

    @livewireScripts
</body>
</html>
```

#### Tạo 1 component để thử nghiệm :
```
php artisan make:livewire hello-word
```

Sau khi chạy lệnh trên, chúng ta thấy nó sẽ sinh ra cho chúng ta 2 files như sau :

**App\Http\Livewire\HelloWord.php**
```php
namespace App\Http\Livewire;

use Livewire\Component;

class HelloWorld extends Component
{
    public function render()
    {
        return view('livewire.hello-word');
    }
}
```

**resources\views\livewire\hello-word.blade.php**
```html
<div>
   <h1>Hello World!</h1> // nội dung ta thêm vào
</div>
```

và bây giờ chúng ta thử include nó vào file app để xem kết quả :
```html
...
<livewire:hello-word />
```

Its works !!
Vậy là chúng ta đã hoàn thành bước đầu tiên trong việc sử dụng livewire.

## 2. Data binding
 
 Chi tiết: https://laravel-livewire.com/docs/2.x/properties
 
 Khái niệm đầu tiên và quan trọng nhất để hiểu khi sử dụng LiveWire là "data binding".  Đây là phần cốt lõi của Livewire nên các bạn đặc biệt chú trọng với nó.
 Khái niệm này rất là đơn giản và dễ hiểu cùng xem vd dưới đây : 
 
 ```php
 class HelloWorld extends Component
{
    public $message = 'Hello World!';
}
```

```html 
<div>
    <h1>{{ $message }}</h1>
    <!--  Output sẽ là "Hello World!" -->
</div>
```

Data binding theo ví dụ trên có nghĩa là : Một thuộc tính ```public``` của Livewire component sẽ được binding qua view hoặc ngược lại, vậy có nghĩa là khi thuộc tính này được change ở view thì ở component sẽ update theo và ngược lại. Cùng tìm hiểu nhé.

Tại html view ta thêm 1 ô input :

```html 
<div>
    <h1>{{ $message }}</h1>
	<input type="text" wire:model="message" />
</div>
```

Và thử gõ vào input nào, ... Wow ```$message``` cũng được update theo, ơ khoang :v cái này quen quen, đúng rồi, nếu các bạn học qua ```Vuejs``` thì nó chi chang rứa đó :v. Vậy làm sao nó có thể làm được điều đó ? bạn hãy thử bật qua tab network mà xem, mỗi lần bạn type trên input, thì nó sẽ send request kèm input và update lại ```DOM```, vì thế bạn mới thấy là nó sẽ realtime value.

Có 3 chú ý như sau khi đặt tên property:
-  Tên property không thể conflict với tên property khác trong Livewire reserved (vd: rules hay messages).
-  Data sẽ được lưu dưới dạng ```public```  để có thể hiện thị phía front-end javascript, Do đó bạn không nên cho các dữ liệu nhạy cảm vào đây.
-  VÌ data nó sẽ được mapping với phía js cho nên những property này phải được mapping type với js (string, int, array, boolean) hoặc là với php (Stringable, Collection, DateTime, Model, EloquentCollection).

#### Binding Directly To Model Properties:
Ngoài ra nó còn support chúng ta binding vào model nếu khai báo nó ```public```, vd:

```php
use App\Post;

class PostForm extends Component
{
    public Post $post;

    protected $rules = [
        'post.title' => 'required|string|min:6',
        'post.content' => 'required|string|max:500',
    ];

    public function save()
    {
        $this->validate();

        $this->post->save();
    }
}
```

```html
<form wire:submit.prevent="save">
    <input type="text" wire:model="post.title">

    <textarea wire:model="post.content"></textarea>

    <button type="submit">Save</button>
</form>
```
Như vậy khi bạn submit, mặc định các data sẽ được set vào model.

** Chú ý ** :
```$rules``` khai báo các field phải mapping với attr của model. ngoài ra nếu muốn check các rules nâng cao thì làm như sau :

```php
...
protected $rules = []
...

public function rules()
{
    $id = $this->post->id ?? 0;
    'post.name' => 'required|unique:posts,name,'.$id,
	// vì khi các bạn để rules trên nó sẽ ko hiểu id, và khi các bạn dùng Facade Rule cũng vậy
}
```

## 3.Actions:

Chúng như các framework FE khác thì livewire cũng có những actions tương tự để tương tác với người dùng, vd như :

|    Event     | Directive |
| -------- | -------- |
|   click     | wire:click      |
|   keydown     | wire:keydown      |
|   submit     | wire:submit      |

Nhìn thấy quen đúng không? nếu các bạn làm việc với vue rồi thì thằng này y chang như vậy, chỉ khác cách gọi :D

```html
<button wire:click="doSomething">Do Something</button>

<input wire:keydown.enter="doSomething">

<form wire:submit.prevent="save">
    ...

    <button>Save</button>
</form>
```

** Bạn có thể listen cho bất kì event dispatched bởi element mà bạn binding**
```
<button wire:somethingDispatcher="someAction">
```

#### Passing Action Parameters
Bạn cũng có thể truyền các action, param vào
```html
<button wire:click="addTodo({{ $todo->id }}, '{{ $todo->name }}')">
    Add Todo
</button>
```
Và ở component ta khai báo actions
```php
public function addTodo($id, $name)
{
    ...
}
```
Còn nhiều actions khác, hãy tham khảo tại đây : https://laravel-livewire.com/docs/2.x/actions

##Lifecircle hooks
 Một phần không thể thiếu ở các framework FE, và livewire cũng vậy.
 
 | Hooks| 	Description|
|----------|:-------------:|
| mount| Chỉ chạy 1 lần, sau khi components đc khởi tạo và trước khi render()|
| hydrate| Chạy mỗi khi có request, thực hiện trước khi exec 1 action hoặc render() |
| updating| Chaỵ trước khi prop được update|
| updated| Chạy sau khi prop được update|

Ngoài ra còn có thể add thêm biến phía sau updating, updated vd:
hydrateFoo, updatingFoo, updatedFoo => các hooks này chạy và tương tác với biến $foo, nếu biến có 2 từ thì nhận cả 2 vd : $foo_bar hoặc $fooBar.

```php
// Chúng ta sẽ có lifecircle Class như sau :
class HelloWorld extends Component
{
    public $foo;

    public function mount() {} 
    public function hydrateFoo($value) {} 
    public function dehydrateFoo($value) {}
    public function hydrate() {}
    public function dehydrate() {}
    public function updating($name, $value) {}
    public function updated($name, $value) {}
    public function updatingFoo($value) {}
    public function updatedFoo($value) {}
    public function updatingFooBar($value) {}
    public function updatedFooBar($value) {}
}
```

#### Javascript Hooks
Ngoài class lifecircle ra thì ở FE của js cũng có lifecircle:
```js
<script>
    document.addEventListener("DOMContentLoaded", () => {
        Livewire.hook('component.initialized', (component) => {})
        Livewire.hook('element.initialized', (el, component) => {})
        Livewire.hook('element.updating', (fromEl, toEl, component) => {})
        Livewire.hook('element.updated', (el, component) => {})
        Livewire.hook('element.removed', (el, component) => {})
		/* cả đoạn trên chắc hiểu rồi nhỉ ? */
        Livewire.hook('message.sent', (message, component) => {}) /*trigger khi update message đến server thông qua Ajax*/
        Livewire.hook('message.failed', (message, component) => {}) /* Được gọi nếu message bị failed */
        Livewire.hook('message.received', (message, component) => {})/* Được gọi nếu nhận response, và trước khi update DOM */
        Livewire.hook('message.processed', (message, component) => {}) /* Được gọi trước khi Livewire processes all side effects (including DOM-diffing) từ message */
    });
</script>
```
message là mỗi khi ta tương tác đến phía component nó sẽ call ajax để update lại DOM, cả lượt đi lẫn lượt về gọi là roundtrip.

Ngoài ra có thể tham khảo ở đây: https://laravel-livewire.com/docs/2.x/lifecycle-hooks

## Nesting Components
Về phần này thì chắc không cần phải nói, vì chính blade cũng có thể làm được rồi, chỉ có chú ý như sau :
 - Nested components có thể nhận data parameters từ parent của nó, Tuy nhiên chúng không reactive như props từ vue component
 - Livewire component không nên được dùng cho các trường hợp tách nhỏ như blade files, đối với như này, chúng ta cứ dùng include của blade thì tốt hơn 
 
```php
class UserDashboard extends Component
{
    public User $user;
}
```

```html
<div>
    <h2>User Details:</h2>
    Name: {{ $user->name }}
    Email: {{ $user->email }}

    <h2>User Notes:</h2>
    <div>
       <!-- nested component -->
        @livewire('add-user-note', ['user' => $user])
    </div>
</div>
```

## Events
Một phần rất quan trọng của livewire, cũng như các framework, library khác. Các livewire component có thể giao tiếp với nhau thông qua global event, miễn chúng đang trên cùng 1 trang,  chúng có thể  giao tiếp bằng các events and listeners.

#### Firing Events
 Có 3 cách để firing events.
 ```html
 <!-- từ template -->
 <button wire:click="$emit('postAdded')">
 ```
 ```php
 // từ component
 $this->emit('postAdded');
 ```
 ```js
 /* từ global js */
 <script>
    Livewire.emit('postAdded')
</script>
```
Khá là dễ hiểu phải không?. Thì sau khi chúng ta fire một event thì chắc sẽ có listener để nghe nó, và sẽ được define trong component như sau :

```php
class ShowPosts extends Component
{
    public $postCount;

    protected $listeners = ['postAdded' => 'postAdded'];
    // vậy mỗi lần postAdded được fire thì action postAdded sẽ được gọi
	// nếu cả listener và action cùng tên, ta chỉ cần protected $listeners = ['postAdded'];
    public function postAdded()
    {
        // handle
    }
	
	// hoặc nếu bạn muốn event được dynamic thì khai báo
	    protected function getListeners()
    {
        return ['postAdded' => true ? 'postAdded' : 'someAction'];
    }
}
```

### Passing Parameters
Chỉ cần 1 ví dụ là hiểu được ngay , ngắn gọn xúc tích.

```php
$this->emit('postAdded', $post->id);


 // another component
public function postAdded(Post $post)
{
	$this->postCount = Post::count();
	$this->recentlyAddedPost = $post;
}
	
 ```
 
 ### Scoping Events
#### Scoping To Parent Listeners
Khi làm việc với nested components, thỉnh thoảng bạn  chỉ muốn emit events đén parents và không emit tới children hoặc sibling components.
```php
$this->emitUp('postAdded');
```
hoặc
```html
<button wire:click="$emitUp('postAdded')">
```
#### Scoping To Components By Name
Hoặc emit đến tên component chỉ định
```php
$this->emitTo('counter', 'postAdded');
```
```html
<button wire:click="$emitTo('counter', 'postAdded')">
```
#### Scoping To Self
Hoặc chỉ emit chỉnh component này thôi (thường chỉ cách này ta call trực tiếp đến action đó khoẻ hơn :v )
```php
$this->emitSelft('counter', 'postAdded');
```
```html
<button wire:click="$emitSelft('counter', 'postAdded')">
```
 
 #### Ngoài listern ở component ta cũng có thể listen ở js:
 Thường chúng ta dùng cái này để show các toarts msg, ...
 ```js
<script>
Livewire.on('postAdded', postId => {
    alert('A post was added with the id of: ' + postId);
})
</script>
```
#### Dispatching Browser Events
Livewire cho phép bạn fire browser window event như sau:
```php
$this->dispatchBrowserEvent('name-updated', ['newName' => $value]);
```
Và bạn sẽ listen nó như sau:
```js
<script>
window.addEventListener('name-updated', event => {
    alert('Name updated to: ' + event.detail.newName);
})
</script>
```
Khá là dễ phải không ?
## KẾT
Bên trên là những thứ cơ bản để có thể làm quen với laravel livewire, ở bài sau, chúng ta sẽ đi vào sâu hơn. Đón xem ở bài sau nhé. Cảm ơn các bạn đã lắng nghe (bow)