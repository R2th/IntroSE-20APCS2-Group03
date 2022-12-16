### 1. Mở đầu
****
Chắc hẳn khi học và làm việc với Laravel chúng ta đều đã nghe và sử dụng đến `artisan console`  mà Laravel cung cấp cho chúng ta để thực thi một công việc thông qua lệnh gõ vào từ command line. Tuy nhiên đã bao giờ bạn hỏi về việc làm thế nào mà các lệnh `artisan console` như:
```php
$ php artisan make:model Product
```
Lại có thể tạo ra một file với định dạng, đường dẫn, namespace và tên class đã được thay thế với đúng những gì mà chúng ta gõ trên command line như dưới đấy:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
}
```
Bài viết này sẽ hướng dẫn bạn có thể tạo một lệnh artisan cung cấp chứng năng giống như trên để bạn có thể tủy ý tạo lệnh nhằm tạo các file, class theo mục đích cá nhân. Để có thể nắm bắt bài viết tốt hơn, trước tiên bạn nên có kiến thức cơ bản về `artisan console`, bạn có thể tìm đọc ở [đây](https://laravel.com/docs/5.6/artisan) .

### 2. Bài toán
****
Giả sử ở đây, chúng ta muốn muốn mỗi khi tạo mới một model sẽ có những hoạt động sau được diễn ra:
<br/>
- Model được tạo ra thay vì được lưu ngay ở trong folder `app/` thì sẽ được lưu ở trong folder `app/Models/`
- Một `trait` sẽ được tạo trong folder `app/Models/Relations/`. Trait này sẽ dùng để định nghĩa các `relation` cho Model của chúng ta và sau đó được `use` ở trong chính Model chúng ta vừa tạo ở trên<br/>
- Một `trait` khác sẽ được tạo trong folder `app/Models/Mutators/`. Trait này dùng để định nghĩa các `muator` cho Model của chúng ta và cũng sẽ được `use` trong Model đã tạo

Ví dụ khi chúng ta gõ lệnh:<br/>
```
$ php artisan model:generate Product // Đầy là  lệnh artisan chúng ta sẽ tạo
```
Thì sẽ thu được kết quả như sau:<br/>
- Cấu trúc folder:

![](https://images.viblo.asia/cfaed1b0-8c36-4cec-8faf-702bc84cf6f0.png)
- Nội dung Model `Product`:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Relations\ProductRelation;
use App\Models\Mutators\ProductMutator;

class Product extends Model
{
    use ProductRelation, ProductMutator;

    /**
     * The table associated with the entity.
     *
     * @var string
     */
    protected $table = '';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

    ];
}
```
- Nội dung Trait `Relation`:
```php
<?php

namespace App\Models\Relations;

trait ProductRelation
{
    //
}
```
- Nội dung Trait `Mutator`:
```php
<?php

namespace App\Models\Mutators;

trait ProductMutator
{
    //
}
```
### 3. Model Make Command
****
Mỗi khi chúng ta tạo một `command` mới bằng lệnh:
```
$ php artisan make:command DoSomething
```
Thì class mà chúng ta nhận được sẽ có dạng:
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DoSomething extends Command
{
    protected $signature = 'command:name';

    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        //
    }
}
```
Như bạn có thể thấy, `class DoSomething` của chúng ta ở đây đang được extends từ `class Command` và class này không hỗ trợ gì chúng ta trong việc sinh file như bài toán chúng ta đặt ra ở trên. Để có thể hiện thực hóa được bài toán trên, chúng ta cần tìm hiểu trong thư viện của Laravel. Trong folder `vendor/laravel/src/Illumiate/Foundation/Console/` bạn sẽ thấy một loạt các file mà Laravel sử dụng trong console để thực hiện việc sinh file như `EventMakeCommand.php` để tạo Event, `ModelMakeCommand.php` để tạo Model,... .Việc chúng ta muốn thực hiện ở đây là sinh một Model nên ta sẽ đi 'mổ xẻ' file `ModelMakeCommand.php`. Khi mở file lên, ta sẽ thấy class này có nhiều điểm tương đồng với `class DoSomething` mà chúng ta tạo ở trên là cũng có các thuộc tính như `$name`, `$description`, hàm `handle()` dùng để đảm nhiệm công việc mà chúng ta mong muốn.
```php
<?php

namespace Illuminate\Foundation\Console;

use Illuminate\Support\Str;
use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputOption;

class ModelMakeCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'make:model';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Eloquent model class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Model';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (parent::handle() === false && ! $this->option('force')) {
            return;
        }

        if ($this->option('all')) {
            $this->input->setOption('factory', true);
            $this->input->setOption('migration', true);
            $this->input->setOption('controller', true);
            $this->input->setOption('resource', true);
        }

        if ($this->option('factory')) {
            $this->createFactory();
        }

        if ($this->option('migration')) {
            $this->createMigration();
        }

        if ($this->option('controller') || $this->option('resource')) {
            $this->createController();
        }
    }
```
Ở bên dưới sẽ có thêm một số hàm mới như:
```php
/**
 * Create a model factory for the model.
 *
 * @return void
 */
protected function createFactory()
{
    $this->call('make:factory', [
        'name' => $this->argument('name').'Factory',
        '--model' => $this->argument('name'),
    ]);
}

/**
 * Create a migration file for the model.
 *
 * @return void
 */
protected function createMigration()
{
    $table = Str::plural(Str::snake(class_basename($this->argument('name'))));

    $this->call('make:migration', [
        'name' => "create_{$table}_table",
        '--create' => $table,
    ]);
}

/**
 * Create a controller for the model.
 *
 * @return void
 */
protected function createController()
{
    $controller = Str::studly(class_basename($this->argument('name')));

    $modelName = $this->qualifyClass($this->getNameInput());

    $this->call('make:controller', [
        'name' => "{$controller}Controller",
        '--model' => $this->option('resource') ? $modelName : null,
    ]);
}
```
Nếu bạn đọc mô tả hàm sẽ thấy nó dùng để sinh `class factory`, `class migration` và `class controller` đi kèm với Model mà chúng ta tạo nếu chúng ta truyền thêm các tham số phụ vào. Ví dụ như ta muốn tạo Model đi kèm với cả 3 class trên thì lệnh mặc định của Laravel sẽ là:
```
$ php artisan make:model Product -a
```
Để xem được chi tiết các tham số phụ mà lệnh trên hỗ trợ bạn có thể gõ lệnh
```
$ php artisan make:model --help
```
Tiếp sau nhóm hàm hỗ trợ tạo class theo tham số phụ ta có hai hàm mới rất quan trọng là:
```php
/**
 * Get the stub file for the generator.
 *
 * @return string
 */
protected function getStub()
{
    if ($this->option('pivot')) {
        return __DIR__.'/stubs/pivot.model.stub';
    }

    return __DIR__.'/stubs/model.stub';
}

/**
 * Get the default namespace for the class.
 *
 * @param  string  $rootNamespace
 * @return string
 */
protected function getDefaultNamespace($rootNamespace)
{
    return $rootNamespace;
}
```
Hàm thứ nhất `getStub` dùng để lấy một file có định dạng `.stub` có vai trò giống như template cho class mà chúng ta sẽ tạo ra. Cụ thể nếu lần theo được dẫn trên ta sẽ tìm thấy file `pivot.model.stub` nằm trong folder `vendor/laravel/src/Illumiate/Foundation/Console/stub` với nội dung như sau:
```php
<?php

namespace DummyNamespace;

use Illuminate\Database\Eloquent\Relations\Pivot;

class DummyClass extends Pivot
{
    //
}
```
Hàm thứ hai `getDefaultNamespace($rootNamespace)` dùng để lấy namspace của file đồng thời hỗ trợ việc xác định vị trí tạo file. Cuối cùng còn một hàm nữa là:
```php
protected function getOptions()
{
    return [
        ['all', 'a', InputOption::VALUE_NONE, 'Generate a migration, factory, and resource controller for the model'],

        ['controller', 'c', InputOption::VALUE_NONE, 'Create a new controller for the model'],

        ['factory', 'f', InputOption::VALUE_NONE, 'Create a new factory for the model'],

        ['force', null, InputOption::VALUE_NONE, 'Create the class even if the model already exists.'],

        ['migration', 'm', InputOption::VALUE_NONE, 'Create a new migration file for the model.'],

        ['pivot', 'p', InputOption::VALUE_NONE, 'Indicates if the generated model should be a custom intermediate table model.'],

        ['resource', 'r', InputOption::VALUE_NONE, 'Indicates if the generated controller should be a resource controller.'],
    ];
}
```
Dùng để lấy các option về tham số phụ cho lệnh console này. Nếu bạn để ý kỹ, ở ngay phần khai báo `class MakeModelCommand` này có một điểm khác biệt là nó không kế  thừa từ `class Command` giống như trong lệnh console mà chúng ta tạo mà thay vào đó nó kế thừa từ `class GeneratorCommand`. Đây mới chính là class hỗ trợ chúng ta trong việc sinh file dứa trên `stub template` mà mình đã đề cập ở trên. `class GeneratorCommand` bạn có thể tìm thấy theo đường dẫn `vendor/laravel/framework/src/Illuminate/Console/GeneratorCommand.php`. <br/>
- Vì class này khá dài nên mình sẽ không đưa lên đây và nội dung của các hàm trong đó bạn có thể đọc phần mô tả hàm để hiểu được chức năng của mỗi hàm là gì. Các hàm sử dụng đến trong quá trình tạo giải quyết bài toán mình sẽ nhắc đến khi chúng ta bắt tay vào làm. 
- `class ModelMakeCommand` mà chúng ta tìm hiểu ở trên đơn giản chỉ kế thừa lại các chức năng của `class GeneratorCommand` và ghi đè một số hàm sao cho phù hợp với nó.
- Để giải quyết bài toán ở trên, chúng ta sẽ làm theo cách mà `class ModelMakeCommand` làm là kế thừa lại `class GeneratorCommand` và sửa lại một số hàm cần thiết. Nào chúng ta cùng bắt tay vào việc thực hiện.<br/><br/>
Chúng ta sẽ tách những việc cần làm thành 3 phần:
- Tạo lệnh dùng để sinh Model
- Tạo lệnh dùng để sinh Trait Relation và Mutator (Việc sinh 2 trait này là giống nhau nên mình sẽ gộp thành một)
- Tạo lệnh kết hợp sinh cả Model với Raltion và Mutator<br/>
*Lưu ý: Với mỗi `class GeneratorCommand` mà chúng ta kế thừa chỉ hỗ trợ sinh 1 file nên để sinh 3 file như trên ta sẽ phải tạo nhiều class*

### 4.  Lệnh tạo Model
****
Đầu tiên, ta sẽ tạo một `command` với lệnh:
```
$ php artisan make:command CreateModalCommand
```
Sau đó ta sẽ thay thế kế thừ `class Command` thành `class GeneratorCommand` và sửa lại thuộc tính `$name` và `$description` như sau:
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class CreateModalCommand extends GeneratorCommand
{
    protected $name = 'create:model';

    protected $description = 'Create a new model';
}
```
Tiếp đó ta sẽ tạo 1 file stub dùng để làm template cho class mà chúng ta sinh ra. Trong folder `app/Console/Commands/`,  ta tạo một folder mới tên là `Stubs/` sẽ chứa toàn bộ các file stub của chúng ta. Sau đó ta tạo file `model.stub` làm template cho `class CreateModalCommand` của chúng ta ở trên. Nội dung file `model.stub` như sau:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Relations\DummyRelation;
use App\Models\Mutators\DummyMutator;

class DummyClass extends Model
{
    use DummyRelation, DummyMutator;

    /**
     * The table associated with the entity.
     *
     * @var string
     */
    protected $table = '';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

    ];
}
```
Như bạn thấy file stub này có nội dung khá giống với Model mặc định của Laravel, ta chỉ thêm vào đó phần `use` cho trait Relation và trait Mutator của chúng ta. Đồng thời tên class, tên trait sẽ được đặt theo mẫu `Dummy[...]` để tiện cho việc thay thế với tên class sau này. Tuy nhiên với tên class bạn nên để là `DummyClass` để chúng ta không phải viết lại hay thêm việc thay đổi tên class sau này vì `class GeneratorCommand` sẽ tự động thay nó với tên class.  Quay lại với `class CreateModelCommand`, lúc này ta sẽ bổ sung thêm hàm sau:
```php
protected function getStub()
{
    return __DIR__.'/Stubs/model.stub';
}
```
Hàm này có chức năng trả về đường dẫn đến file `model.stub` mà chúng ta sử dụng để khi thực hiệnh lệnh nó sẽ biết tìm file template ở đâu. Tiếp đến ta cần xác định namespace của class cũng như đường dẫn đến nơi mà chúng ta sẽ lưu class tạo ra. Ta sẽ override hàm `getDefaultNamespace()` mà t thấy trong `class ModelMakeCommand` thành như sau:
```php
protected function getDefaultNamespace($rootNamespace)
{
    return $rootNamespace . '\Models';
}
```
Vì class mà chúng ta tạo ra sẽ được lưu trong folder `app/Models/` nên namespace của nó sẽ tương ứng là `App\Models`. Mặc dù ta đã khai báo sẵn namespace trong filder `model.stub` nhưng ở đây ta vẫn phải khai bảo bởi vì như đã nói ở trên, hàm này sẽ được sử dụng trong việc xác định vị trí lưu trữ cho file mà chúng ta tạo ra trong project. Cuối cùng ta sẽ override hàm `replaceNamespace()` dùng để thay thế các phần ta đặt là `Dummy[...]` trong file stub. Ta sẽ copy hàm này từ trong `class GeneratorCommand` và chỉnh sửa lại như sau:
```php
protected function replaceNamespace(&$stub, $name)
{
    $stub = str_replace(
        [
            'DummyRelation',
            'DummyMutator'
        ],
        [
            $this->getNameInput() . 'Relation',
            $this->getNameInput() . 'Mutator'
        ],
        $stub
    );

    return $this;
}
```
Với `DummyRelation` và `DummyMutator` là 2 cái tên ta đặt trong file stub sẽ được thay thế thành `ProductRelation` và `ProductMutator`. Hàm `$this->getNameInput()` dùng để lấy tên class mà chúng ta đặt khi chạy lệnh command đang tạo. Đây là phiên bản hoàn chỉnh của `class CreateModalCommand` những gì chúng ta đã làm:
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class CreateModalCommand extends GeneratorCommand
{
    protected $name = 'create:model';

    protected $description = 'Create a new model';

    protected function getStub()
    {
        return __DIR__ . '/StubTemplate/repository-entity.stub';
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Models';
    }

    protected function replaceNamespace(&$stub, $name)
    {
        $stub = str_replace(
            [
                'DummyRelation',
                'DummyMutator'
            ],
            [
                $this->getNameInput() . 'Relation',
                $this->getNameInput() . 'Mutator'
            ],
            $stub
        );

        return $this;
    }
}
```
Khoan đã, hình như class chúng ta vừa tạo vẫn thiếu thiếu một cái gì đó rất quan trọng và nếu bạn để ý sẽ thấy ta đang thiếu hàm quan trọng nhất đối với mỗi commang là hàm `handle()`. Tuy nhiên với class kế thừa từ `GeneratorCommand` thì bạn không nhất thiết phải viết hàm `handle()` trừ trường hợp bạn có những thay đổi riêng. Trong `class GeneratorCommand` đã định nghĩa sẵn hàm `handle()` cho bạn rồi:
```php
public function handle()
{
    $name = $this->qualifyClass($this->getNameInput());

    $path = $this->getPath($name);

    // First we will check to see if the class already exists. If it does, we don't want
    // to create the class and overwrite the user's code. So, we will bail out so the
    // code is untouched. Otherwise, we will continue generating this class' files.
    if ((! $this->hasOption('force') || ! $this->option('force')) && $this->alreadyExists($this->getNameInput())) {
        $this->error($this->type.' already exists!');

        return false;
    }

    // Next, we will generate the path to the location where this class' file should get
    // written. Then, we will build the class and make the proper replacements on the
    // stub files so that it gets the correctly formatted namespace and class name.
    $this->makeDirectory($path);

    $this->files->put($path, $this->buildClass($name));

    $this->info($this->type.' created successfully.');
}
```
Bạn có thể hiểu đơn giản, hàm này sẽ nhận thông tin từ câu lệnh của bạn, kiểm tra các thông tin đó và tạo ra file từ stub template mà bạn cung cấp đến đúng vị trí bạn muốn. Bây giờ bạn hãy chạy thử command mà bạn tự tạo sẽ thu được kết quả giống như file stub của bạn:
```
$ php artisan create:model Product
```
Kết quả:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Relations\ProductRelation;
use App\Models\Mutators\ProductMutator;

class Product extends Model
{
    use ProductRelation, ProductMutator;

    /**
     * The table associated with the entity.
     *
     * @var string
     */
    protected $table = '';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [

    ];
}
```
### 5. Lệnh tạo trait
****
Sau khi đã tạo xong việc tạo command sinh Model, ta sẽ bắt tay vào việc tạo command sinh Trait, các bước làm cũng tương tự như trên, bạn cũng bắt đầu bằng việc tạo một `artisan console` với lệnh:
```
$ php artisan make:command CreateModelRelationCommand
```
Sau đó tạo luôn file stub tương ứng với nó và lưu lại:
```php
<?php

namespace App\Models\Relations;

trait DummyClass
{

}
```
Tiếp đến ta sẽ cập nhật nội dung class vừa tạo tương tự như những gì ta làm với `class CreateModalCommand`:
```php
/**
protected $name = 'create:relation';

protected $description = 'Create a model realtion';

protected function getStub()
{
    return __DIR__.'/Stubs/model-relation.stub';
}

protected function getDefaultNamespace($rootNamespace)
{
    return $rootNamespace.'\Models\Relations';
}
```
Để tránh phải gõ cả chữ Relation khi thực hiện lệnh:
```
$ php artisan create:relation ProductRelation
```
Mà chỉ cần gõ:
```
$ php artisan create:relation Product
```
Là thu được trait có tên `ProductRelation` thì ta sẽ override lại thêm 1 hàm nữa:
```php
protected function getNameInput()
{
    return trim($this->argument('name')) . 'Relation';
}
```
Hàm `$this->argument('name')` sẽ lấy ra được từ `Product` trong lệnh của chúng ta và ta chỉ cần thêm phần `Relation`. Cả hàm `getNameInput()` sau này sẽ được dùng để xác định tên của class khi thay thế trong file stub hay ở đây chính là tên của trait. Sau khi tạo xong class bạn thực hiện lệnh:
```
$ php artisan create:relation Product
```
Sẽ thu được:
```php
<?php

namespace App\Models\Relations;

trait ProductRelation
{

}
```
Tương tự với phần trait Mutator bạn cũng thực hiện giống như với Relation.

### 6. Tạo lệnh sinh kết hợp Model cùng với Relation và Mutator
****
Với các lệnh đã tạo ở trên chúng ta đã giải quyết được phần nào của bài toán. Tuy nhiên sẽ rất phiền phức khi mỗi lần chúng ta phải gõ tới 3 câu lệnh để thực hiện những gì mình mong muốn. Sẽ thật tuyệt vời nếu chúng ta chỉ cần gọi 1 lệnh dạng như:
```
$ php artisan model:generate Product
```
Là có thể sinh đồng thời  class Model,  traitn Relation và Mutator. Nếu bạn đã từng thao tác với Event và Listener trong Laravel chắc bạn sẽ quen thuộc với lệnh:
```
$ php artisan event:generate
```
Lệnh trên sẽ sinh đồng thời được cả Event và Listner tương ứng với nó. Vậy là có thể đây chính là nhữn gì mà chúng ta cần sử dụng cho command mới của mình. Ta sẽ mở file chức lệnh generate này lên ở đường dẫn `vendor/laravel/framework/src/Illuminate/Foundation/Console/EventGenerateCommand.php`:
```php
class EventGenerateCommand extends Command
{
    protected $name = 'event:generate';

    protected $description = 'Generate the missing events and listeners based on registration';

    public function handle()
    {
        $providers = $this->laravel->getProviders(EventServiceProvider::class);

        foreach ($providers as $provider) {
            foreach ($provider->listens() as $event => $listeners) {
                $this->makeEventAndListeners($event, $listeners);
            }
        }

        $this->info('Events and listeners generated successfully!');
    }

    protected function makeEventAndListeners($event, $listeners)
    {
        if (! Str::contains($event, '\\')) {
            return;
        }

        $this->callSilent('make:event', ['name' => $event]);

        $this->makeListeners($event, $listeners);
    }

    protected function makeListeners($event, $listeners)
    {
        foreach ($listeners as $listener) {
            $listener = preg_replace('/@.+$/', '', $listener);

            $this->callSilent('make:listener', array_filter(
                ['name' => $listener, '--event' => $event]
            ));
        }
    }
}
```
Ta có thể thấy class này chỉ kế thừa từ `class Command` có nghĩa là nó sẽ không dùng để tạo file mà dùng để gọi các lệnh tạo file khác. Ta thấy có hai hàm là `makeEventAndListeners()` và `makeListeners()` chính là 2 hàm để sinh đồng thời Event/Listener hoặc để sinh Listner. Trong nội dung hàm ta thấy có đoạn:
```php
$this->callSilent('make:event, ['name' => $event]);
```
Đây chính là hàm dùng để gọi một command khác, cụ thể ở đây là command `make:event` với tham số truyền vào `name` chính là tên của event hay với trường hợp của chúng ta thì `name` chính là tên của class `Product`.
Ta sẽ tạo thêm một class console nữa như sau:
```
$ php artisan make:command GenerateModelCommand
```
Class này chỉ cần kế thừa mặc định `class Command` nên ta sẽ phải định nghĩa lại phần `$signature`, `$description` và hàm `handle()` như sau:
```php
protected $signature = 'model:generate {name}';

protected $description = 'Generate repository contract and implementation';

public function __construct()
{
    parent::__construct();
}

public function handle()
{
    $this->callSilent('create:model', ['name' => $this->argument('name')]);
    $this->callSilent('create:relation', ['name' => $this->argument('name')]);
    $this->callSilent('create:mutator', ['name' => $this->argument('name')]);

    $this->info('Create model success');
}
```
Hàm `handle()` lúc này sẽ gọi lần lượt đến lệnh tạo Model, lệnh tạo Relation và lệnh tạo Mutator với tham số truyền vào là `{name}` của Model đó. Giờ đây mỗi khi muốn tạo 1 'combo' Model, Relation và Mutator bạn chỉ cần gõ:
```
$ php artisan model:generate ModelName
```
Là đã tạo đủ các thức cần thiết.

### 7. Kết bài
Qua bài viết này mong rằng các bạn đã phần nào hiểu được cách tạo command hỗ trợ việc sinh file giống như Laravel và áp dụng vào project của mình. Bạn có thể tham khảo lại `class GeneratorCommand` để có thể tìm hiểu nhiều hơn về các cách sinh file phức tạm khác.