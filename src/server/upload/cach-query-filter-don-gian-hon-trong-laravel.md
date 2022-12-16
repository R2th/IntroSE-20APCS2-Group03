Trong một dự án thực tế việc chúng ta phải query filter cho các phần search data cho một website là một chức năng thông thường. Vậy làm sao để xây dựng filter một cách hiệu quả dễ mở rộng, thay đổi, tái sử dụng. Trong bài viết này mình sẽ hướng dẫn các bạn query filter trong laravel và nó không thật sự quá khó đâu.
## 1. Cách làm thông thường
```
public function index(Request $request)
{
    $user = User::query();

    if ($request->has('name')) {
        $user->where('name', 'LIKE', '%' . $request->name . '%');
    }
    if ($request->has('status')) {
        $user->where('status', $request->status);
    }
    if ($request->has('birthday')) {
        $user->whereDate('birthday', $request->birthday);
    }

    return $user->get();
}
```
Đây là cách chúng ta thường hay sử dụng, rất dễ viết tuy nhiên có một nhược điểm là sẽ khó kiểm soát nếu cần search nhiều field, phải lặp đi lặp lại điều kiện if nhiều lần và không tái sử dụng được. Ở bài viết trước mình có giới thiệu về scope, nó có thể được sử dụng để giải quyết vấn đề không tái sử dụng được.
Cách viết sẽ như thế này:
```
public function scopeName($query, $request)
{
    if ($request->has('name')) {
        $query->where('name', 'LIKE', '%' . $request->name . '%');
    }

    return $query;
}

public function scopeStatus($query, $request)
{
    if ($request->has('status')) {
        $query->where('status', $request->status);
    }

    return $query;
}

public function scopeBirthday($query, $request)
{
    if ($request->has('birthday')) {
        $query->whereDate('birthday', $request->birthday);
    }

    return $query;
}
```
Sau đó chúng ta sẽ gọi như sau:
```
public function index(Request $request)
{
    $user = User::query()
        ->name($request)
        ->status($request)
        ->birthday($request);

    return $user->get();
}
```
Nhìn nó sẽ clear hơn, và chúng ta có thể sử dụng lại được ở những trường hợp khác khi cần filter theo 1 field nào đó.
## 2. Xây dựng class filter
Để tránh việc mỗi lần cần filter thêm một trường ta lại phải thêm một scope function trong model. Ta sẽ đi xây dựng một hàm filter, ý tưởng ở đây sẽ như thế này:
```
public function index(Request $request)
{
    $user = User::filter($request);

    return $user->get();
}
```
Hàm filter không nên khai báo nhiều lần, nó chỉ là hàm "trung chuyển" gọi các hàm filter của mỗi model. Ta sẽ triển khai nó bằng trait để các model có thể dùng chung.
Tôi sẽ tạo một trait Filterable:
```
<?php

namespace App\Traits;

use App\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function scopeFilter(Builder $builder, QueryFilter $filters, array $filterFields = ['*'], array $orderFields = [])
    {
        return $filters->apply($builder, $filterFields, $orderFields);
    }
}

```
Trait này sẽ được gọi ở mỗi model. Và tạo thêm một class base filter ở đây tôi đặt tên là QueryFilter:
```
<?php

namespace App\Filters;

use App\Helpers\Common\StringHelper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QueryFilter
{
    /**
     * @var Request
     */
    public $request;

    /**
     * @var array
     */
    protected $filters;

    /**
     * @var array
     */
    protected $search = [];

    /**
     * @var $builder
     */
    protected $builder;

    /**
     * @var string|null
     */
    protected $orderField = null;

    /**
     * @var string
     */
    protected $orderType = 'desc';

    /**
     * @var $filterable
     */
    protected $filterable;

    /**
     * QueryFilter constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->filters = $this->request->all();
    }

    /**
     * @param Builder $builder
     * @param array $filterFields
     * @param array $orderFields
     * @return Builder
     */
    public function apply(Builder $builder, array $filterFields, array $orderFields = [])
    {
        $this->builder = $builder;
        $this->orderFields = $orderFields;

        foreach ($this->filters as $name => $value)
        {
            $method = 'filter' . Str::studly($name);

            if (is_null($value) || $value == '') {
                continue;
            }

            if (method_exists($this, $method)) {
                $this->{$method}($value);
                continue;
            }

            if (empty($this->filterable) || !is_array($this->filterable)) {
                continue;
            }

            if (in_array($name, $this->filterable)) {
                $this->builder->where($name, $value);
                continue;
            }

            if (key_exists($name, $this->filterable)) {
                $this->builder->where($this->filterable[$name], $value);
                continue;
            }
        }

        return $this->builder;
    }
}

```
Sau đó tôi có thể tạo một class filter riêng cho model user ví dụ như sau:
```
<?php

namespace App\Filters;

class UserFilter extends QueryFilter
{
    protected $filterable = [
        'id',
        'author_id',
        'birth_day',
        'gender',
    ];
    
    public function filterName($name)
    {
        return $this->builder->where('name', 'like', '%' . $name . '%');
    }
}

```
Class UserFilter này được extends vs class QueryFilter.
Tôi sẽ giải thích luồng xử lý từ lúc gọi function filter đến lúc làm sao mỗi class filter này sẽ được áp dụng với các model.
Đầu tiên ở model user chúng ta use trait Filterable. Khi đó ở model user sẽ call function scopeFilter ở trait, có nghĩa là mỗi khi chúng ta gọi đến User::filter() thì Laravel sẽ hiểu được là các bạn đang gọi đến 1 local scope tương tự như các bạn gọi từng scope chúng ta tạo trong model như ví dụ trên. Mỗi lần ta gọi đến hàm filter và chuyền vào một instance của class UserFilter 
```
User::filter($userFilter)
```
Khi đó hàm scopeFilter trong trait chúng ta khai báo sẽ được gọi và gọi đến function apply, tôi sẽ giải thích logic trong hàm này để các bạn dễ hiểu hơn. Đầu tiên thuộc tính $filters đã được gán value là một mảng của request người dùng gửi lên, value này là các giá trị người dùng gửi lên từ phía client để filter theo mong muốn của họ value có thể được gửi bằng form data or json data. Ở class UserFilter tôi đã khai báo thêm một biến $filterable là một array sẽ chứa các trường tôi mong muốn filter theo điều kiện where('fieldName', value), và khai báo function bắt đầu name là filter theo sau đó là name của fieldname camel case được gửi từ client. Ở mỗi vòng lặp tôi sẽ build query dựa vào value được gửi lên và dựa theo function và các field name được khai báo trong biến thuộc tính filterable.  Khi tôi gọi đến scope filter và truyền vào một instance của class user function này sẽ build và return ra câu query có instance là Builder sau đó ở cuối câu query tôi chỉ cần gọi tới function get() để lấy ra data mong muốn được filter. 
```
User::filter($userFilter)->get();
```

Cách làm này tôi học được khi làm dự án thực tế. Nếu có chỗ nào hiểu sai mong các bạn góp ý chứ đừng ném gạch nhé =))