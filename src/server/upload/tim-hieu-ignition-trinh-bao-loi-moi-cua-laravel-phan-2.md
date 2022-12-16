# Giới thiệu 
- Tiếp tục nội dung phần 1, phần 2 là tìm hiểu thêm về Ignition - Trình báo lỗi mới của Laravel 6.x
- Xem link [bài viết gốc tại đây ](https://freek.dev/1441-introducing-ignition)
- Xem nội dung phần 1 trong series. 

# Nội dung
## Ignition tabs 

### Request tab
![request-tab](https://images.viblo.asia/d34972e5-e3cf-4586-98f0-0ac8660ec1c4.png)

Bên cạnh "Stack trace" tab, là **Request** tab. Nó hiển thị toàn bộ các thông tin của 1 request. 

### App tab
![app-tab](https://images.viblo.asia/b442cd51-6ca6-43f0-a91f-f27f2c6dde9c.png)

**App** tab sẽ hiển thị một số thông tin khá thú vị. Nó hiển thị các thông tin về ứng dụng của bạn. Đầu tiên chúng sẽ hiển thị route nào đang xảy ra exception, nó bao gồm các controller thực thi nếu nó khả dụng, và cả tên của route của nó. 
Một tính năng tuyệt vời nữa là nó có khả năng hiển thị các route params trong request của bạn. 

Chúng ta hãy đến với một ví dụ, để hiểu rõ hơn. Chúng ta có một route được định nghĩa như sau:
```php
Route::get('/posts/{post}', function (Post $post) {
	// do somethings
});
```
Nếu có một exception xuất hiện trên route này, chung ta sẽ hiển thị các thành phần của của `post` model sau khi đã chuyển nó sang kiểu mảng (array) qua function toArray().  Cũng như các tham số đơn giản của route sẽ được hiển thị trước khi bindings, để chúng ta có một cái nhìn chính xác về việc những thông tin nào mà Laravel đã nhận như là 1 phần của route đó. 
Sau route param, chúng ta sẽ hiển thị các thông tin về middleware, cái mà được sử dụng với request trên. 
Tiếp theo chúng ta có `VIEW` section, nếu exception xảy ra ở 1 view nào đó, chúng ta sẽ hiển thị tên của view, và cũng hiển thị mọi dữ liệu được ném xuống view. 

:question:  Mình chưa biết có tool nào để quản lý các phiên bản của Laravel không, ví dụ, mình có thể sử dụng song song Laravel 5.5 và Laravel 5.6 trên cùng thiết bị. Chắc sẽ có giải pháp nào đó chứ đúng không nhỉ? 

### User Tab

![user-tab](https://images.viblo.asia/ed948bb9-c15d-448a-9c41-2b230517d32e.png)

Trong tab chứa thông tin xung quanh việc ai đang sử dụng app, và trình duyệt họ sử dụng là gì. 

### Context tab 

![context-tab](https://images.viblo.asia/c9d7e0a2-d4e0-44a9-82ac-8a346f4bc1a7.png)

Trong context tab, sẽ hiển thị thông tin repo git của bạn (bao gồm vị trí repo, mã hash commit) và thông tin môi trường  (ví dụ như php version và Laravel version ) mà bạn sử dụng 

### Debug tab 

![debug-tab](https://images.viblo.asia/6f8fcede-7622-45cf-9ac8-dac3ab20970d.png)

Trong **Debug** tab, chúng ta sẽ hiển thị thông tin nơi mà exception diễn ra, mọi thứ giống như các câu queries, log, và dump sẽ được hiển thị. Tiếp đó, khi hiển thị 1 dump, chúng ta sẽ hiển thị `filename` nơi mà bạn để lệnh `dump`. Một cú click vào biểu tượng bút chì, nbanj sẽ đến chính xác dòng trong file đó bằng trình editor yêu thích của bạn (mặc định là phpStorm)

## Gợi ý các giải pháp (suggesting solutions)

- Hãy nhìn vào một ví dụ lỗi. Cụ thể là chúng ta quên một import một class trong khi sử dụng. Đây là cách Ignition sẽ hiển thị nội dung lỗi như sau:

![import-missing](https://images.viblo.asia/7e0e0639-0103-4e7a-9cb8-811572ff1f24.png)

Vì Ignition `nhìn` thấy exception về một class không có tìm thấy, nó sẽ thử tìm theo tên class ở các namespace khác, nếu tên class đó có tồn tại ở một namespace nào đó, nó sẽ gợi ý import chúng. 

Ignition sẽ đưa ra một số những gợi ý về giải pháp của một số vấn đề thường gặp. Ví dụ như đây là khi file .blade không tìm thấy. 

![invalid-view](https://images.viblo.asia/dd8b5e50-db4e-40c8-9ae8-4c5660790611.png)

Bạn có thể thêm các gợi ý về các giải pháp cho những exception của riêng bạn. Hãy cài đặt exception của bạn ở  `Facede\IgnitionContracts\ProvidesSolution`. Nó sẽ yêu cầu bạn thêm vào hàm `getSolutions`. Dưới đây là một ví dụ cài đặt chúng. 
```php
namespace App\Exceptions;

use Exception;
use Facade\IgnitionContracts\Solution;
use Facade\IgnitionContracts\BaseSolution;
use Facade\IgnitionContracts\ProvidesSolution;

class CustomException extends Exception implements ProvidesSolution
{
    public function getSolution(): Solution
    {
          return BaseSolution::create("You're doing it wrong")
            ->setSolutionDescription('You are obviously doing something wrong. Check your code and try again.')
            ->setDocumentationLinks([
                'Laracasts' => 'https://laracasts.com',
                'Use Flare' => 'https://flareapp.io',
            ]);
    }
}
```

Dưới đây là Ignition khi có lỗi này xảy ra 

![custom-solution](https://images.viblo.asia/311fc610-3050-4b19-b566-be515bff0648.png)

Nhìn ham vc.

## Running solutions
Không đơn thuần là thêm những gợi ý về giải pháp giải quyết vấn đề (suggesting solutions), Ignition cũng có thể thực thi những giải pháp này. 
Hãy tưởng tượng, trong tường hợp bạn quên mất set app key, đây là ảnh mà Ignition sẽ hiển thị. 

![app-key-missing](https://images.viblo.asia/1b39fa70-dde8-4e13-b5ac-1b42ed33368c.png)

Nếu bạn click vào **Generate app key** button, Ignition sẽ generate và set chúng thành app key
Và Ignition nó sẽ trông có vẻ như này:

![app-key-generated](https://images.viblo.asia/e8129d82-130d-4da3-9eab-9c838979740a.png)


Nếu không tồn tại thêm bất kỳ một exception nào khác, thì ứng dụng sẽ chạy mà không có vấn đề gì cả. 

Ở đây có một link youtube giới thiệu về **Runable solution in Ignition**. 

Cấu trúc cài đặt nó cụ thể có thể như sau. 

```php
namespace App\Exceptions;

use Exception;
use Facade\IgnitionContracts\ProvidesSolution;

class CustomException extends Exception implements ProvidesSolution
{
    public function getSolution(): Solution
    {
          return new MyRunnableSolution();
    }
}
```

Còn đây là code về **MyRunableSolution**
```php
namespace App\Solutions;

use Facade\IgnitionContracts\RunnableSolution;

class MyRunnableSolution implements RunnableSolution
{
    public function getSolutionTitle(): string
    {
        return 'You are doing it wrong';
    }

    public function getSolutionDescription(): string
    {
        return 'You are doing something wrong, but we can fix it for you.';
    }

    public function getDocumentationLinks(): array
    {
        return [];
    }

    public function getSolutionActionDescription(): string
    {
        return 'To fix this issue, all you need to do is press the button below.';
    }

    public function getRunButtonText(): string
    {
        return 'Fix this for me';
    }

    public function run(array $parameters = [])
    {
        // Your solution implementation
    }

    public function getRunParameters(): array
    {
        return [];
    }
}
```

Và đây là cách mà **CustomException** hiển thị trên Ignition sẽ dư lày

![custom-runnable-solution](https://images.viblo.asia/b5c1313a-d3fd-4036-bcd1-62066d22d5eb.png)

Hàm **run** sẽ được thực thi nếu người dùng clicked vào `Fix this for me` button. 
Bạn có thể truyền thêm các tham số từ request khi mà exception này xảy ra để giải quyết chúng khi chạy. Nó đơn giản chỉ là `getRunParameters` trả về một mảng, và nó sẽ được truyền vào hàm `run`. 

Nhìn thì có vẻ chim ưng lắm rồi đấy, nhưng không biết function `getRunParameters` nó có thể như này không
```php
   // code.....
    public function getRunParameters(): array
    {
        return request()->all();
    }
    // code ...
```

## Làm cho Ignition thông minh hơn.

Bạn có thể nâng cao cách giải quyết exception bằng cách sử dụng các gợi ý bằng văn bản hay *runable solution*.  Tuy nhiên, thỉnh thoảng bạn cũng sẽ gặp phải những exception của php hoặc exception của phần mềm bên thứ 3, những thứ mà bạn không thể điều khiển được.  Như vậy, Ignition cung cấp **Solution Provider**.  *Solution provider* là những class mà nó sẽ hook một tiến trình solution nào đó với Ignition. Khi exception được bắn ra, Ignition sẽ nhận nó, và `custom solution provider` của bạn sẽ được gọi một lầ, hoặc nhiều các solution sẽ có thể được gọi đến với exception này. 

Bạn có thể tạo một *Stack Overflow* solution provider, cái mà bạn có thể tìm những câu trả lời cho những exception, và coi đó là giải pháp. 

Dưới đây là một số code example. Ý tưởng này mình kết quá đi mất. 

```php
use Throwable;
use RuntimeException;
use Facade\IgnitionContracts\Solution;
use Facade\Ignition\Solutions\GenerateAppKeySolution;
use Facade\IgnitionContracts\HasSolutionForThrowable;

class MissingAppKeySolutionProvider implements HasSolutionForThrowable
{
    public function canSolve(Throwable $throwable): bool
    {
        if (! $throwable instanceof RuntimeException) {
            return false;
        }

        return $throwable->getMessage() === 'No application encryption key has been specified.';
    }

    public function getSolutions(Throwable $throwable): array
    {
        return [
            new GenerateAppKeySolution()
        ];
    }
}
```

```php
namespace App\Providers;

use App\Solutions\GenerateAppKeySolution;
use Facade\IgnitionContracts\SolutionProviderRepository;
use Illuminate\Support\ServiceProvider;

class YourServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register(SolutionProviderRepository $solutionProviderRepository)
    {
        $solutionProviderRepository->registerSolutionProvider(GenerateAppKeySolution::class);
    }
}
```


Sau một hồi tìm hiểu, tôi thấy ưng lắm, nhưng mà khổ nỗi version Laravel đang dùng, lại nhỏ hơn 6.0. Tôi đặt ra câu hỏi, có cách nào để sử dụng nó ở version dưới không. 
Vậy là tôi tìm hiểu và tìm ra cái link này các ông ạ. Nó dễ voãi chưởng ra: https://flareapp.io/docs/ignition-for-laravel/installation
Hỗ trợ từ bản Laravel 5.5. trở lên, tôi thử và đã thành công anh em nhé. Mỗi tội dự án là private, nên không chụp cho các ông xem được, nhưng tôi thấy cũng là ngon rồi.