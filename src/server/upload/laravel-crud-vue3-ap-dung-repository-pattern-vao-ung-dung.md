# 1. Giới thiệu

Ở bài trước, chúng ta đã làm một ứng dụng Laravel CRUD với VUE3 rồi, bây giờ chúng ta sẽ tối ưu hoá code lại và làm nó trông giống như code lúc thực hiện dự án thật hơn nhé. Ở bài này chưa ta sẽ tìm áp dụng **Repository design pattern** vào.

Nếu các bạn chưa xem bài CRUD trước đó thì hãy xem ở đây nhé :
- Link : https://b29.vn/bai-viet/laravel-crud-va-vuejs-3-composition-api?id=42
- Git : https://github.com/nguyenthuong1304/crud_vue3

## Repository design pattern là gì ? 

Repository Design Pattern là một trong những mẫu thiết kế được sử dụng nhiều nhất trong hầu hết các ngôn ngữ lập trình, các framework… như .NET, Java, PHP…, trải dài từ websites, services, applications,… hay kể cả mobile apps. 
![](https://b29.vn/storage/image_contents/7KfU0cpZIg4cawt9kaGACmshQYXbqf888FrWOvLA.png)

Chính xác nó là một lớp trung gian giữa **Business Logic** và **Data Source**, các đối tượng trong lớp trung gian này được gọi là **Repository**. Giao tiếp giữa Business logic và Data source sẽ được thực hiện thông qua các Interface.

## Repository pattern trong Laravel
Thay vì code của bạn viết một mớ query trong controller, thì thay vào đó, bạn hãy viết vào một class riêng để thực hiện việc đó. Class này đóng vài trò giao tiếp giữa **Model** và **Controller** là nơi tập trung xử lí các logic truy vấn dữ liệu nó được gọi là **Class Repository**.

Vì đây là project DEMO nên tầng **bussines logic** mình sẽ viết ở **Controller** luôn, chứ thực chất nó sẽ thông qua một tầng nữa, được gọi là **Service**, lúc này **Controller** sẽ gọi các class **Service** để xử lí logic, và bên trong `Service` sẽ gọi đến `Repository` và thao tác với DB. 

Khá phức tạp phải không ? đó là nhược điểm của Repository, cho nên nhiều dự án họ sẽ không cần sử dụng, và các class `Service` sẽ đảm nhiệm nốt.

OK lang mang nãy giờ đủ rồi, tới công chiện thôi =))

# 2. Triển khai
Ở bài trước chúng ta đã có Model `Company` rồi.
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'address', 'website'];
}
```

Ở controller, mình sẽ tiếng hành viết lại function index này nhé :
```php
public function index() {
	return CompanyResource::collection(Company::all());
}
```

## 1. Tạo repository
Tiếp theo, chúng ta sẽ repository, thì vị trí đặt ở đây mình để nó nằm trong thư mục `app/`:

```php
// app/Repositories/CompanyRepository.php

namespace App\Repositories;

namespace App\Repositories;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class CompanyRepository
{
	/**
	 * Get List
	 *
	 * @param  array $params 
	 * @return Collection
	 */
	public function getList(array $params = [])
	{
		$createdRange = [
			isset($params['created_from']) ? Carbon::parse($params['created_from']) : Carbon::minValue(),
			isset($params['created_to']) ? Carbon::parse($params['created_to']) : Carbon::maxValue(),
		];
		
		return Company::select('*')
		  // ->join(...)
		  ->where(function ($q) use ($params, $createdRange) {
			$q->when(isset($params['name']), fn ($sq) => $sq->where('name', 'LIKE', '%' . $params['name'] . '%'))
				->when(isset($params['email']), fn ($sq) => $sq->where('email', 'LIKE', '%' . $params['email'] . '%'))
				->when(isset($params['address']), fn ($sq) => $sq->where('address', 'LIKE', '%' . $params['address'] . '%'))
				->when(isset($params['website']), fn ($sq) => $sq->where('website', 'LIKE', '%' . $params['website'] . '%'))
				->whereBetween('created_at', $createdRange);
		})
		->orderBy('name')
		->get();
    }
}
```

Ở đây chúng ta sẽ tạo ra một hàm getList chịu trách nhiệm cho việc truy vấn dữ liệu cho index, bên trên là mình đang Ví dụ nhỏ, nhở sau này các bạn làm dự án, các câu query list đến tận cả trăm dòng mà bỏ vô `Controller` chắc hoa mắt :v

## 2. Thêm Request search
Chúng ta sẽ thêm 1 Request search để dễ control các query mà dưới client đẩy lên nhé :

```php
// app/Http/Requests/Company/SearchRequest.php
<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'nullable',
            'email' => 'nullable',
            'address' => 'nullable',
            'website' => 'nullable',
            'created_from' => 'nullable|date',
            'created_to' => 'nullable|date'
        ];
    }
}
```

## 3. Áp dụng vào controller
OK, vậy giờ bạn chỉ cần gọi nó repository vào construct của controller để sử dụng mà thôi.
```php
...

use App\Http\Requests\Company\SearchRequest;
use App\Repositories\CompanyRepository;

class CompanyController extends Controller
{
    public function __construct(private CompanyRepository $companyRepository)
    {}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(SearchRequest $request)
    {
        $companies = $this->companyRepository->getList($request->validated());

        return CompanyResource::collection($companies);
    }
...
```

## 4. Thêm khung search vào Company List
OK Tiếp theo, các bạn vào `resources/js/components/companies/CompanyIndex.vue` để thêm phần search vào :
```vue
<div class="flex place-content-end mb-4">
	<div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
		<router-link :to="{ name: 'companies.create' }" class="text-sm font-medium">Create company</router-link>
	</div>
</div>
<div class="flex place-content-end mb-4">
	<div class="flex-1 py-1 px-2">
		<input
			type="text"
			name="name"
			id="name"
			placeholder="Search company name"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.name"
		>
	</div>
	<div class="flex-1 py-1 px-2">
		<input
			type="text"
			name="email"
			id="email"
			placeholder="Search company email"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.email"
		>
	</div>
	<div class="flex-1 py-1 px-2">
		<input
			type="text"
			name="address"
			id="address"
			placeholder="Search company address"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.address"
		>
	</div>
	<div class="flex-1 py-1 px-2">
		<input
			type="text"
			name="website"
			id="website"
			placeholder="Search company website"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.website"
		>
	</div>
	<div class="py-1 px-2">
		<button
			type="button"
			name="email"
			id="search"
			class="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
			@click.prevent="search"
		>
			Search
		</button>
	</div>
</div>
<div class="flex mb-4">
	<div class="py-1 px-2">
		<input
			type="date"
			name="f"
			id="from"
			placeholder="Search company website"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.created_from"
		>
	</div>
	<div class="py-1 px-2">
		<input
			type="date"
			name="website"
			id="to"
			placeholder="Search company website"
			class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="params.created_to"
		>
	</div>
</div>
```

Và cũng thêm function search vào `setUp()`
```js
<script>
import useCompanies from "../../composables/companies";

import { onMounted, reactive } from "vue";

export default {
  name: "CompanyIndex",

  setup() {
    const { companies, getCompanies, destroyCompany } = useCompanies()
    // thêm reactive cho params search
    const params = reactive({
      'name': '',
      'email': '',
      'address': '',
      'website': '',
      'created_from': '',
      'created_to': null,
    })

    onMounted(getCompanies)
   ...
    
	// thêm method để search
    const search = async () => {
      await getCompanies({ ...params })
    }

    return {
      companies,
      search,
      params
    }
  }
}
</script>
```

Và cũng add thêm params vào method `getCompanies()` nữa
```js
// resources/js/composables/companies.js
const getCompanies = async (params = {}) => {
	console.log(params)
	let response = await axios.get('/api/companies', {
		params
	})
	companies.value = response.data.data;
}
```
![](https://b29.vn/storage/image_contents/dtWW3MjAFvQ3A0Ux9F8sKOISW18XINRGAW1LrHvn.png)
OK lên hình 

# Repository Interface 
Khi join vào các dự án lớn có sử dụng repository, thì người ta sẽ thường dùng `interface`. Việc áp dụng interface để đảm bảo code chuẩn theo thiết kế cũng như dễ dàng thay đổi, maintain dễ dàng là điều cần thiết.

Đầu tiên các bạn tạo một interface `CompanyRepositoryInterface`:

```php
<?php

namespace App\Repositories;

interface CompanyRepositoryInterface
{
    /**
     * Get all
     * @return mixed
     */
    public function getList();
	...
```

Sau đó tại CompanyRepository implement inteface nay:
```
class CompanyRepository implements CompanyRepositoryInterface
```

Và tại controller, chúng ta inject Interface thay vì CompanyRepository
```php
public function __construct(private CompanyRepositoryInterface $companyRepository) {}
```

Ở đây, khi bạn chạy sẽ nhận đc lỗi :
![](https://b29.vn/storage/image_contents/0NuqniENhVMkT2WBqsMqkTzPnfJ0GLtxspj5nJth.png)
Các interface chỉ hoạt động thông qua các implementation. Khi inject class, thì container sẽ tự động resolved còn đối với interface bạn cần phải binding cho nó vào container nữa :

```php
<?php

namespace App\Providers;

use App\Repositories\CompanyRepository;
use App\Repositories\CompanyRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
        CompanyRepositoryInterface::class => CompanyRepository::class,
    ];
}
```

OK, nây giờ chạy lại, ngon lành cành đào.

# Kết
Qua bài viết này, mình hi vọng bạn sẽ hiểu được hơn phần nào đó về Repository của laravel. Cảm ơn các bạn đã ủng hộ mình, hi vọng chúng ta cũng sẽ gặp lại trong những bài kế tiếp .

Repository : https://github.com/nguyenthuong1304/crud_vue3

Tham khảo : https://b29.vn/bai-viet/laravel-crud-vue3-ap-dung-repository-pattern-vao-ung-dung?id=43