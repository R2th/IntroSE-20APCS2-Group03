Xin chào mọi người. Một thời gian trước mình có được join vào 1 dự án sử dụng laravel (dự án đó kết thúc rồi). Đó là 1 dự án yêu cầu phải refactor code sử dụng repository design pattern. Nghe có vẻ ghê gớm. Cá nhân mình thì không thích sử dụng nguyên lý này trong laravel lắm, lý do thì tương tự [bài này](https://viblo.asia/p/how-you-shouldnt-use-repository-pattern-MLzkOzYEepq). À còn nếu bạn muốn sử dụng nó một cách tốt nhất thì nên tham khảo hai bài viết này:  [bài 1](https://viblo.asia/p/tan-man-ve-repository-design-pattern-trong-laravel-wjAM7ajLvmWe) và [bài 2](https://viblo.asia/p/tim-hieu-ve-repository-pattern-trong-laravel-part-ii-oZVRgl2EMmg5) nhưng mà đó không phải điều mình muốn giới thiệu.

Bất cập trong dự án là mỗi lần refactor 1 phần liên quan đến model là mình phải tạo tay 1 class rồi init các thứ từ A->Z giống nhau, rất mất thời gian. Do đó nên mình đã tìm hiểu cách mà laravel có thể generate ra class, giống như tạo ra Model bằng lệnh make:model. Ta hãy đi tìm hiểu chút về cách làm này nhé.


# 1. Laravel console
Để biết command console trong laravel được tạo ra như thế nào thì anhem hãy đọc bài trên trang chủ, hướng dẫn chi tiết và dễ hiểu:
https://laravel.com/docs/5.8/artisan, mình không giới thiệu lại đâu =)).

# 2. Vấn đề
Tất nhiên docs của laravel chỉ là thứ để tham khảo, nó không có tất cả những gì bạn cần và các bài toán bạn phải làm, do đó mình phải mò trong code của laravel để lần ngược ra manh mối (mà thực tế là bắt trước họ rồi tìm hiểu cách hoạt động).

Để mà nói thì cấu trúc của package laravel nó tương tự như trong thư mục dự án, gồm bộ khung để xây dựng, một số cài đặt cụ thể được viết trong thư mục **Foundation**. 

Do đó mình mò dần từ trong `vendor/laravel/framework/src/Illuminate/Foundation`... À và oke, mình thấy được thư mục **Console**, đó rất có thể là thứ mình cần. Mở nó ra và lướt qua các command được cài đặt sẵn cho laravel, mình đã tìm thấy ví dụ cho bài toán mình cần, đó là file **ModelMakeCommand.php**. Oke lẹt đu ịt =)))

# 3. Bắt trước
Đầu tiên mình cứ phải bắt trước cái đã, vì mình muốn tạo ra 1 repository nên mình sẽ tạo command là **RepositoryMakeCommand** (cái này tùy tâm anhem đặt tên nhé, nhưng đặt cho giống người chút). Vài chỗ cần sửa trong command này như sau:

```php
class RepositoryMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:repository';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Repository class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Repository';
}
```

Nhìn giống người ra phết rồi này. Đoạn sau là cái mà ta cần tìm hiểu thêm 1 chút. 

# 4 Mày (hoặc tao) mò.

Bắt đầu chú ý đến đoạn dưới của command này 1 chút:
```php
    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        if (parent::fire() === false && ! $this->option('force')) {
            return;
        }

        if ($this->option('migration')) {
            $this->createMigration();
        }

        if ($this->option('controller') || $this->option('resource')) {
            $this->createController();
        }
    }
```

Đoạn này nói về việc command của bạn sẽ diễn ra như thế nào (trước dự án mình dùng 5.4 thì hàm để run command là **fire()**, nhưng ở các bản sau này mà bản hiện tại đang phổ biến là 5.8 thì lại chuyển tên hàm thành **handle()**, nên áp dụng không được thì đừng chửi mình nhá, do các bạn đọc chưa kĩ thôi). Mình thì đọc qua chút cũng hiểu là 2 cái option migrate và controller hay cái resource kia hiện là chưa cần lắm nên mình sẽ skip qua và chỉ lấy đoạn **if** đầu tiên thôi là ngon rồi.

Kéo xuống dưới thêm chút nữa thấy hàm getStub(). Hàm này chỉ đường dẫn đến file `__DIR__.'/stubs/model.stub'`, à tức là sẽ sử dụng 1 cái file nào đó đây, thử mở nội dung thằng cha này ra xem nào:

```php
vendor/laravel/framework/src/Illuminate/Foundation/Console/stubs/model.stub
<?php

namespace DummyNamespace;

use Illuminate\Database\Eloquent\Model;

class DummyClass extends Model
{
    //
}
```
Oke đại khái file này mình hiểu nó là 1 file dữ liệu mẫu để thằng laravel này đọc vào, nó sẽ thay thế **DummyClass** và **DummyNamespace** tương ứng với tên mà mình muốn đặt. Nhưng nó thay kiểu khỉ gì nhở, câu hỏi văng vẳng trong đầu khiến mình ngồi tìm hiểu thêm 1 lúc và mình cuối cùng cũng nhận ra. Thằng **ModelMakeCommand** này nó được kế thừa từ 1 class tên là **GeneratorCommand**, nhiệm vụ của thằng này là chuyên đi để tạo các file (generator mà), nên ngay từ constructor nó đã khởi tạo 1 instace là **Filesystem**. Do ở trên hàm fire của mình chủ yếu kế thừa từ parent::fire() nên mình sẽ đọc xem ở thằng cha nó sẽ làm gì.

Lần mò 1 lúc mình thấy nó gọi như sau:

```php
    public function fire()
    {
        ...
        $this->files->put($path, $this->buildClass($name));
        ...
    }
    
    protected function buildClass($name)
    {
        $stub = $this->files->get($this->getStub());

        return $this->replaceNamespace($stub, $name)->replaceClass($stub, $name);
    }
    
    protected function replaceNamespace(&$stub, $name)
    {
        $stub = str_replace(
            ['DummyNamespace', 'DummyRootNamespace'],
            [$this->getNamespace($name), $this->rootNamespace()],
            $stub
        );

        return $this;
    }
    
    protected function replaceClass($stub, $name)
    {
        $class = str_replace($this->getNamespace($name).'\\', '', $name);

        return str_replace('DummyClass', $class, $stub);
    }
```

Oke vậy là mọi thứ đã sáng tỏ, hàm fire gọi đến hàm buildClass và hàm này lấy stub và thay thế các tên mà chúng ta định sẵn bởi những cái mà ta muốn tạo ra. Vậy mình sẽ sửa lại file stub cho giống ý mình.
```php
app/Console/Commands/stubs/repository.stub
<?php

namespace DummyNamespace;

use App\Repositories\BaseRepository;
use App\Repositories\Contracts\DummyClassInterface;

class DummyClass extends BaseRepository implements DummyClassInterface
{
    protected $model;

    /**
     * DummyClass construct
     *
     * @param  DummyModel $dummyModel
     *
     * @return void
     */
    public function __construct(DummyModel $dummyModel)
    {
        parent::__construct($dummyModel);
    }
}
```

Sau đó overide lại method **buildClass()** cho nó giống với những gì mình cần replace là được. Vậy là xong, đoạn về sau thì các bạn tự tinh chỉnh như ý muốn nhé. 

Ngay sau đó ta có thể register command như 1 command bình thường của laravel. Và oke chạy thử đi, nó sẽ như ý mà bạn muốn :v: 

# 5 Chốt tộ
Chả có gì để chốt cả nên recommend anhem vài điều sau 1 tẹo:
> Nên nhớ điều quan trọng nhất khi tạo ra file đó là bạn phải biết file của bạn cần những gì, đơn giản hay phức tạp để có thể tạo dummy stub file như ý muốn nhé. 
> 
> Ngoài ra thì khi muốn tìm hiểu luôn phải xem kĩ để tinh chỉnh theo ý muốn. Nhiều anh em đọc không kĩ áp dụng không được như ý muốn dễ bị hoảng loạn :( . Nên nhớ, luôn phải tìm hiểu kĩ trước khi làm nhé.

Xàm thế thôi chứ nhiều cái mình cũng chả đọc kĩ được vì không có đủ thời gian, lúc ý là cũng nhống hết cả kèn lên rồi, nhưng cứ note lại vậy coi như nhắc nhở bản thân trước =)) 

Bài viết được tham khảo từ tự bản thân mình nên không có mục bài viết tham khảo đâu nhé =)) À mà có tham khảo cái Artisan Console của laravel, link thì dẫn ở trên rồi =.=

Cảm ơn anh em đã đọc bài viết, mọi thắc mắc hay có điều gì sai trái anh em cứ chửi ở phía dưới nhé, mình sẽ đọc và giải đáp hết tất cả. Đợt này hơi mệt với bận nên 2 seri về [Design Pattern](https://viblo.asia/s/desgin-pattern-with-php-Am5yq0ek5db) và [Khám phá Docker](https://viblo.asia/s/kham-pha-docker-JzKmgDnBl9N) của mình vẫn đang để ngỏ :( Đợt tới hy vọng sẽ viết tiếp được để mình cũng vừa biết thêm mà có thể có chỗ nào đó lưu lại cho mọi người đọc cùng :vulcan_salute: