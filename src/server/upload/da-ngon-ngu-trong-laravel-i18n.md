Chào các bạn hôm nay mình cùng các bạn tìm hiểu về làm thế nào cài đặt đa ngôn ngữ cho một website sử dụng laravel framework.

### **Website đa ngôn ngữ là gì?**

Ví dụ bạn đang sử dụng một trang web, mà trên trang ấy bạn có thể chuyển đổi từ tiếng việt sang tiếng anh, hoặc ngược lại hoặc chuyển sang một ngôn ngữ khác. Những website hỗ trợ nhiều ngôn ngữ như vậy gọi là web đa ngôn ngữ.
Để làm được như vậy ta làm như sau ==>.

### **Cài đặt và sử dụng**
    
Trong laravel có 2 cách ta có thể thiết lập để sử dụng đó là dùng file.php hoặc file json.
    
   **1.  Sử dụng file php**
   
   ![](https://images.viblo.asia/90aa5c1a-8f1d-4882-9f1c-afd76609f801.png)

Ví dụ ở trên mình muốn cài đặt ngôn ngữ tiếng việt và tiếng anh cho trang web của mình.
Mình tạo 2 thư mục " en " và " vi" trong " resources\lang\ "  bên trong mình file messages.php 
trong file này mình viết các label hiển thị ra


`resources\lang\en\messages.php`
    
   ![](https://images.viblo.asia/ba628b35-6ee3-4ec2-b27d-6581abf3a70b.png)

và 

`resources\lang\vi\messages.php`
    
   ![](https://images.viblo.asia/b1035fa7-053a-45ee-832c-b295f326c8a6.png)

Vậy ta thiết lập xong rồi, làm thế nào để dùng nó? 

Mỗi khi muốn in label thay vì ta gõ thẳng đoạn text đó bằng ngôn ngữ ta đang dùng thì ta sẽ dùng hàm `trans()` để gọi tới những label chúng ta vừa thiết lập. 

ví dụ : Ta có button login thay vì ta viết thẳng label của nó là login thì ta dùng `trans('message.login')` --> tai sao phải làm vậy, vì chúng ta đã thiết lập 2 ngôn ngữ ở trên, nếu ta chọn tiếng việt thì button đó sẽ có label là " Đăng nhập " , hoặc " Login " nếu sử dụng tiếng anh.

Ở ví dụ trên ta in ra label theo ngôn ngữ mình muốn,  nhưng ta muốn in ra label cùng một tham số thì làm sao. Ví dụ ta muốn in tên của mình kèm theo khi in ra màn hình =>  Xin chào : Ha ha

Điều này ta làm như sau.. ta quay lại `resources\lang\vi\messages.php và resources\lang\en\messages.php` 

   ![](https://images.viblo.asia/b3a8f51f-e65c-4532-8ed5-7a53b451f3c2.png)

ở đây ta thêm :name nó thể hiện là một tham số, ta có thể truyền giá trị cho chúng, 
`trans('messages.welcome', ['name' => 'Ha Ha'])` ta được kết quả khi in Xin chao Ha Ha 

**2. Sử dụng file json**
   
Thay việc chúng ta phải chui sâu vào trong và phải tạo 2 thưc mục " vi " và " en " thì ta chỉ cần 
    
   ![](https://images.viblo.asia/10240f38-5a87-46d4-9537-d2c54ba2cd4c.png)
    
Câu hỏi đặt ra là tạo sao mình làm cách kia cũng làm đươc rồi mà lại nghĩ ra cách dùng json này. Câu trả lời là khi một web ta chạy sẽ có rất nhiều label và rất nhiều ngôn ngữ ta muốn sử dụng. Việc đặt keyword để đặt cho nhiều label như thế quả là việc khó khăn. việc này được giải quyết khi ta sử dụng file json. Tại sao lại vây, vì chúng ta có thể dùng cả đoạn văn để làm keyword.
    
    
`resources\lang\en.json` 
```json
       {
        
            'Welcome to Website': 'Welcome to Website!',
            
            'Welcome to Website, :name': 'Welcome to Website, :name'
            
        }

```
`resources\lang\vi.json`
```json
  {
        
    'Welcome to Website': 'Chào mừng bạn đến với Website !',
            
    'Welcome to Website, :name': 'Chào mừng bạn đến với Website, :name'
            
  }
```  
Cũng giống như dùng file php , khi dùng file json ta sẽ lấy chuỗi đó ra như nào. Ta dùng `__('keyword') ` hoặc `@lang('keyword')`
```json
     {{ __('Welcome to Website') }}
        
     {{ __('Welcome to Website, :name', ['name' => 'Ha Ha ']) }}
```
        
        
Vậy là chúng ta đã thiết lập và sử dụng để gọi một label ra như nào. Bây giờ ta tiến hành thiết lập để có thể chuyển đổi linh hoạt giữa các ngôn ngữ với nhau.
### Đổi ngôn ngữ cho website
Đầu tiên ta quan tâm đến 2 tham số này 

 `'locale' => 'en'`, //ngôn ngữ mặc định -> ở đây ngôn ngữ mặc định là tiếng anh.
     
 `'fallback_locale' => 'en'`, // được sử dụng khi không tìm thấy config locale -> quay về tiếng anh.
     
==> 2 tham số này được đặt trong \config\app.php
    
    
Rồi giờ ta đi thiết lập nào..mục đích của thiết lập là ta có set 'locale' bằng ngôn ngữ mà mình muốn.

Đầu tiên mình tạo controller có tên là **LangController** ==> các bạn có thể dùng lệnh `php artisan make:controller LangController` trong controller này mình nhận request thay đổi ngôn ngữ và tiến hành tạo một session để lưu giá trị nó lại để dùng.

 ```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class LangController extends Controller
{
    private $langActive = [
        'vi',
        'en',
    ];
    public function changeLang(Request $request, $lang)
    {
        if (in_array($lang, $this->langActive)) {
            $request->session()->put(['lang' => $lang]);
            return redirect()->back();
        }
    }
}

```
   
   ==> Trong này mình tạo một mảng các ngôn ngữ mình dùng, nếu người dùng request ngôn ngữ có trong cài đặt của mình thì mình sẽ cho họ đổi.
   Mình đã lấy được giá trị và lưu vào session rồi, giờ đến bước tiếp theo. Mình sẽ tạo một Middleware là LangMiddleware ==> câu hỏi là tại sao dùng đến file này. Lý do là mình muốn mỗi lần thao tác với website thì mình sẽ gán được giá trị mà mình lưu trong session hồi nãy cho `'locale'`, tức là ngôn ngữ mình vừa đổi ý ạ. 
   
   `php artisan make:middleware LangMiddleware`
   
  ![](https://images.viblo.asia/06affd60-05ea-45d5-bda7-7c0df3c40f71.png)
   
   Để có thể chạy được mỗi khi request thì ta vào `app\Http\kernel.php` và thêm middleware vừa tạo.
   
   ![](https://images.viblo.asia/59b16ba9-c2ae-434e-9ce7-45fababec480.png)
   
   Òa mọi việc đến đây cũng khá oke rồi..giờ ta vào route để thiết lập link nữa là đc rồi.
   
   `Route::get('lang/{lang}','LangController@lang')->name('lang');` mình đã tạo route trong ` Routers\web.php`
   
   Cuối cùng ở file view mình đặt 
   ```html
   <a href="{{ route('lang',['lang' => 'vi']) }}">VI</a>
   
   <a href="{{ route('lang',['lang' => 'en' ]) }}">EN</a>
   ```
   
###    Tổng kết 
   Vậy chúng ta tìm hiểu làm thế nào sử dụng đa ngôn ngữ cho một trang web với laravel.
   Chúc các bạn thành công!
   
###    Tài liệu tham khảo
 https://laravel.com/docs/5.7/localization