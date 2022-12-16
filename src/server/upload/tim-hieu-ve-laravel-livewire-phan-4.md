Ở bài trước chúng ta đã tìm hiểu về form của livewire, nếu bạn các bạn chưa xem thì vui lòng xem lại tại đây : https://b29.vn/bai-viet/laravel-livewire-esp-4?id=9

Đến với bài này, chúng ta sẽ nghiên cứu những cái liên quan đến UI hơn.
# Loading States
Bởi vì livewire hoạt động trên cơ chế lifecircle và request ajax, nên đôi khi bạn thực thi action nào đó trên trang nó sẽ chờ 1 khoảng thời gian nào đó để request đến server và trả kết quả về. Do đó livewire cung cấp cho ta dễ dàng handle loading state

## Toggling elements during "loading" states
Đầu tiên, ví dụ bạn muốn search 1 cái gì đó ? nhưng câu query của bạn quá nặng phải mất hơn 15s để load, vấn đề bây giờ là bạn muốn trong lúc nó request lên server, sẽ có 1 element hiển thị thông báo đang loading, sau khi load xong, sẽ ẩn cái loading đó đi và display result được search.

```html
<div>
    <button wire:click="checkout">Checkout</button>

    <div wire:loading>
        Processing Payment...
    </div>
</div>
```

Với livewire, chúng ta chỉ cần sử dụng `wire:loading`, mỗi khi request lên server mà phải chờ kq, thì element này sẽ dcd display. Hoặc lại thêm trường hợp data của bạn load quá nhanh, nó sẽ xảy ra hiện tượng hiển thị và ẩn đi rất nhanh, nó làm giống như đang bị nháy :
```html
<div wire:loading.delay>...</div>
```
hãy thêm delay, nó sẽ giúp bạn load lâu hơn `200ms` :v.

Mặc định element này được ẩn đi với css là `display:inline-block` nhiêu khi nó lại làm ở layout của bạn, thì livewire cũng cung cấp cho ta những option để lựa chọn phù hợp với layout của bạn :
```html
<div wire:loading.flex>...</div>
<div wire:loading.grid>...</div>
<div wire:loading.inline>...</div>
<div wire:loading.table>...</div>
```

Ngoài ra, bạn muốn kết quả của bạn được hiển thị lên sau khi mà loading xong, `.remove` sẽ làm điều đó. khi nào loading xong element kia sẽ xuất hiện/
```html
<div>
    <button wire:click="checkout">Checkout</button>

    <div wire:loading.remove>
        Hide Me While Loading...
    </div>
</div>
```

## Targeting specific actions

Các trường hợp trên thì bạn chỉ sử dụng được với những component đơn giản, đôi lúc component của bạn sẽ có 2 3 nơi load dữ liệu từ server, như thế mỗi lần load, chỗ nào có wire:loading sẽ được thực thi:

```html
<div>
    <button wire:click="checkout">Checkout</button>
    <button wire:click="cancel">Cancel</button>

    <div wire:loading wire:target="checkout">
        Processing Payment...
    </div>
</div>
```

Do đó livewire lại cung cấp cho ta `.target`, nhằm mục dích chỉ định loading đối với action nào.Ngoài ra nó cũng chấp nhận nhiều params như : `wire:target="foo, bar".`, hoặc nếu bạn có action và lại có param thì phải xử lý như sau :

```html
<div>
    <button wire:click="update('bob')">Update</button>

    <div wire:loading wire:target="update('bob')">
        Updating Bob...
    </div>
</div>
```

## Targeting models

Ngoài target cho 1 action chúng ta cũng target với model :

```html
<div>
    <input wire:model="quantity">

    <div wire:loading wire:target="quantity">
        Updating quantity...
    </div>
</div>
```

## Toggling classes

Bạn cũng có thể chỉ định load class css khi loading với `.class` modifier vào wire:loading directive.

```html
<div>
    <button wire:click="checkout" wire:loading.class="bg-gray">
        Checkout
    </button>
</div>

<!-- hoặc -->

<div>
    <button wire:click="checkout" wire:loading.class.remove="bg-blue" class="bg-blue">
        Checkout
    </button>
</div>
```

## Toggling attributes

Tương tự như class, các attributes của HTML bạn cũng có thể làm tương tự luôn :

```html
<div>
    <button wire:click="checkout" wire:loading.attr="disabled">
        Checkout
    </button>
</div>
```

# Polling
Livewire cung cấp một directive được gọi là wire:poll, khi thêm nó vào 1 element, nó sẽ auto refresh component mỗi 2s, nó tương tự như `setInterval` của js.

```html
<div wire:poll>
    Current time: {{ now() }}
</div>

<!-- Hoặc theo thời gian --> 
<div wire:poll.750ms>
    Current time: {{ now() }}
</div>

<!-- Hoặc theo 1 action, có nghĩa là nó sẽ refresh và call action nãy mỗi 2s --> 
<div wire:poll="foo">
    Current time: {{ now() }}
</div>
```

Polling dùng ajax để update component, và có thể thay thế những cái đơn giản như thay vì dùng  Laravel Echo, Pusher. hoặc WebSocket.

## Polling in the background

Livewire sẽ giảm polling đi khi tab trình duyệt ở chế độ nền để nó không làm hỏng máy chủ với các yêu cầu ajax không cần thiết, chỉ khoảng 5% yêu cầu request polling được chạy.

Nếu bạn muốn nó luôn đựoc chạy dưới background thì: 
```html
<div wire:poll.keep-alive>
    Current time: {{ now() }}
</div>
```

 ##### Polling only when element is visible : đôi khi element của bạn bị ẩn đi khi dưới màn hình nhỏ ... mà nó phải refresh liên tục, điều này ko tốt :
 
 ```html
 <div wire:poll.visible></div>
 ```
 
 điều này giúp cho khi element của bạn có thể nhìn được mới refresh.
 
 # Prefetching
 Cơ chế này khá là hay, nó giúp chúng ta fetch data lúc mà t đưa con chuột vào vị trí nào đó.
 
 **NOTE: Điều này rất hữu ích cho các trường hợp khi một action không phải là side effects (như ghi to session or database). Nếu action của bạn "pre-fetching" có side effects trong đó, thì side effects sẽ không đoán trước đc những gì xử xảy ra.
**

```html
<button wire:click.prefetch="toggleContent">Show Content</button>

@if ($contentIsVisible)
    <span>Some Content...</span>
@endif
```

Bây giờ, khi đưa chuột vào nút "Show Content", Livewire sẽ prefrech kết quả của action `"toggleContent"` trong background. Nếu nó được click, thì nó sẽ được hiện nội dung lên và không đã có kq trước đó r. Nếu nút KHÔNG được click, thì kết quả đó sẽ bị loại bỏ, vì thế cho nên nó ko khuyến khích chúng ta sử dụng prefreching cho các case lưu vào session hay DB là vậy.

# Offline State

Đôi khi, điều quan trọng là phải thông báo cho người dùng nếu họ bị mất kết nối Internet. Livewire cung cấp các tiện ích hữu ích để thực hiện các hành động dựa trên trạng thái "offline" của người dùng.

## Toggling elements

Với cái này, khi mà người dùng đang sài và bị ngắt mạng, sẽ thong báo cho họ biết là họ đang trong trạng thái offline

```html
<div wire:offline>
    You are now offline.
</div>
```

## Toggling classes

Cơ chế thằng này cũng như `Loading States`, bạn cũng có thể toggle class hoặc attributes :

```html 
<div wire:offline.class="bg-red-300"></div>

<div wire:offline.class.remove="bg-green-300" class="bg-green-300"></div>

<button wire:offline.attr="disabled">Submit</button>
```

# Dirty States
Cái này thật ra cơ chết hoạt động cũng như loading, offline hay polling, nó sẽ hoạt động khi data của bạn chưa sync với livewire BE. Ví dụ như khi đang nhập ô input, trong lúc nhập sẽ thêm class gì đó và sau khi nhập xong, input của bạn được sync với BE nó sẽ tắt đi :

```html
<div>
    <input wire:dirty.class="border-red-500" wire:model.lazy="foo">
</div>
```

Ngoài ra nó cũng có cơ chế hoạt động như những cái mình nêu trên nên sẽ làm như sau :

```html

<!-- toggle element -->

<div>
    <span wire:dirty wire:target="foo">Updating...</span>
    <input wire:model.lazy="foo">
</div>

<!-- toggle class or other element -->
<div>
    <label wire:dirty.class="text-red-500" wire:target="foo">Full Name</label>
    <input wire:model.lazy="foo">
</div>
```

# Defer Loading
Cái này nó sẽ hoạt động giống như `DOMContentLoaded` trong js, và `$(document).ready()` của jquery và attr `defer` của HTML, có nghĩa là đôi lúc bạn không muốn nó load all data khi trang đang tải, mà phải load sau khi trang được tải xong. Livewife cung cấp cho ta directive `wire:init` để làm việc này :

```html
<div wire:init="loadPosts">
    <ul>
        @foreach ($posts as $post)
            <li>{{ $post->title }}</li>
        @endforeach
    </ul>
</div>
```

```php
class ShowPost extends Component
{
    public $readyToLoad = false;

    public function loadPosts()
    {
        $this->readyToLoad = true;
    }

    public function render()
    {
        return view('livewire.show-posts', [
            'posts' => $this->readyToLoad
                ? Post::all()
                : [],
        ]);
    }
}
```

Khá là dễ hiểu luôn :v với cái này, sẽ giúp trang của bạn trông mượt hơn.

# Kết 
Cảm ơn các bạn đã ủng hộ và theo dõi, hẹn các bạn ở bài sau.

src : https://b29.vn/bai-viet/laravel-livewire-esp-4?id=9