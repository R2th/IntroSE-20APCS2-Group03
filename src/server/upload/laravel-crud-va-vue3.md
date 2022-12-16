# Giới thiệu
Xin chào các bạn, mình đã từng có một bài viết nói về CRUD với livewire tại đây rồi : [https://b29.vn/bai-viet/laravel-crud-don-gian-voi-livewire?id=34](https://b29.vn/bai-viet/laravel-crud-don-gian-voi-livewire?id=34), hôm nay mình sẽ hướng dẫn các bạn làm một project nhỏ về CRUD với Vue Js.

Chúng ta sẽ sử dụng : 
- **Laravel 8** cho phần build API và build source FE tích hợp vào Laravel
- [Tailwind Css](https://tailwindcss.com/) để làm giao diện trong đẹp hơn. Thì lí do mình chọn thằng này vì mình sẽ sử dụng [laravel/breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze) nó sẽ tích hợp Tailwind sẵn :V
- **Vue 3**. Lí do mình chọn vue 3 là bởi vì vue3 sẽ có các tính năng mới hay ho mà mình sẽ dùng trong bài này như Composition API, Reactive Variables with ref.. 

# Setup Api
## 1. Cài breeze và setup model 
Thì đầu tiên chúng ta sẽ chuẩn bị một project Laravel thông qua composer :
```bash
composer create-project laravel/laravel crud-vue3
```

Tiếp theo, để sử dụng mau lẹ authenticate. mình sẽ sử dụng [laravel/breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze) để lo nốt
```bash
composer require laravel/breeze
```

Sau khi cài xong, bạn cần chạy `php artisan breeze:install` cái này nó sẽ publish các thứ liên quan đến auth như routes, controller, views ....

Project này mình sẽ làm CRUD company, nên sẵn mình sẽ migrate luôn company:
```bash
php artisan make:model Company -m
```

![](https://b29.vn/storage/image_contents/iWRQIsfjCEPuOY3O6cidd4FaNRYscG0GljrU9x92.png)

Vì là làm chức năng đơn giản nên chúng ta chỉ cần chừng này field là đủ. Xong rồi thì chạy migrate thôi `php artisan migrate`

OK xong xuôi thì mình sẽ chạy 
```bash
npm install && npm run dev
```
Để test thử chức năng auth của breeze xem nó hoạt động không nhé.
![](https://b29.vn/storage/image_contents/eaJ97HQOhu3T784bQ6MGLWK6wxbEKFKqx55zGyf5.png)

OK, sau khi chạy project xong, mình đã thử đăng kí và được như này, nhìn giao diện khi sử dụng tailwind nó bát mắt hơn phải không :v

À nhớ thêm `$fillable` vào model nhé.
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

## 2. Setup API
Vì là api, nên chúng ta sẽ tạo controller theo cách sau để nó gen code phục vụ cho api :
```bash
php artisan make:controller Api/CompanyController --api --resource --model=Company
```
Thì với cách tạo như vậy với 3 options `--api --resource --model=Company`, chúng ta sẽ có một controller với các method chuẩn resource api và model binding.
Và tạo thêm một class Resource để phục vụ cho việc transforming data :
```bash
php artisan make:resource CompanyResource
```

Ví đây là một ứng dụng đơn giản, nên mình chỉ tạo CRUD đơn giản cho các bạn, do đó ta sẽ có `CompanyController` như sau :
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CompanyResource::collection(Company::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompanyRequest $request)
    {
        $company = Company::create($request->validated());

        return new CompanyResource($company);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        return new CompanyResource($company);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(CompanyRequest $request, Company $company)
    {
        $company->update($request->validated());

        return new CompanyResource($company);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->noContent();
    }
}
```

À đừng quên tạo CompanyRequest nhé : `php artisan make:request CompanyRequest`
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'email'],
            'address' => ['string'],
            'website' => ['url'],
        ];
    }
}
```

OK, vậy test thử 2 Api Create và List thử nha :
![](https://b29.vn/storage/image_contents/17RUMZtC2tbdBUB3qraLPbIW6Jj8Rxo9yGSKvrZb.png)
![](https://b29.vn/storage/image_contents/NsgDZsvOzuRFYUQUbtYegiwHlDiQPXSHOHFI0P6Z.png)
OK ngon lành.

## 3. Setup Vue
Thì Api mình chỉ define đơn giản như vậy thôi, bây giờ chúng ta qua phần vue nhé, chúng ta phải cài đặt vue và các thư viện cần thiết :
```bash
npm install vue@next vue-router@next vue-loader@next
```

Điều này sẽ giúp chúng ta cài đặt vue3 cho dự án, cùng xem file `package.json` nhé :
```json
"dependencies": {
	"vue": "^3.2.19",
	"vue-loader": "^16.8.1",
	"vue-router": "^4.0.11"
}
```
Tiếp đó, bạn cần config lại `webpack.mix.js`:
```js
mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
]);
```
VIệc thêm `.vue()` vào trong mix sẽ giúp bạn load vuejs khi tải trang kèm trong mix laravel.

```js
require('./bootstrap');
require('alpinejs');

import { createApp } from "vue";

createApp({
    components: {}
}).mount('#app')
```

Chúng ta sẽ khởi tạo app `Vue` bên trong file `app.js`, và nhớ là hãy khai báo một `id="app"` cho một element mà bạn muốn `Vue` hoạt động trong đó nhé
```
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body class="font-sans antialiased">
        <div class="min-h-screen bg-gray-100" id="app">
            @include('layouts.navigation')
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>
</html>
```
Để tận dụng các file đã có sẵn, mình sẽ khai báo luôn `<router-view />` bên trong file `resources/views/dashboard.blade.php` luôn nhé :
```html
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
```

Việc đặt `<router-view />` như vậy sẽ làm cho các component của chúng ta sẽ được render vào đó.

## 4. Setup component, router và chạy thử
Bây giờ chúng ta sẽ tạo một component và router để test xem có chạy không nhé :
### Tạo component 
```vue
<!-- resources/js/components/companies/CompanyIndex.vue -->
<template>
    Hello world
</template>

<script>
export default {
    name: "CompanyIndex"
}
</script>

<style scoped>

</style>
```

### Setup router
```js
// resources/js/router/index.js

import { createRouter, createWebHistory } from "vue-router";

import CompaniesIndex from '../components/companies/CompanyIndex'

const routes = [
	{
		path: '/dashboard',
		name: 'companies.index',
		component: CompaniesIndex
	},
]

export default createRouter({
	history: createWebHistory(),
	routes
})
```

Chỉ cần khai báo component, và router vào file `app.js` nữa là xong :
```js
// resources/js/app.js

import { createApp } from "vue";
import router from './router'
import CompanyIndex from './components/companies/CompanyIndex'

createApp({
    components: {
        CompanyIndex
    }
}).use(router).mount('#app')
```
OK, `npm run dev` xem thử nó có hoạt động không nhé :
![](https://b29.vn/storage/image_contents/6PTP3mhE5tu4cZut4pjKTl9OFBZWqbhwP2JFhvND.png)
Thì như bạn thấy đó, nó đã chạy rồi.
# Thực hiện CRUD
Vậy các bước setup đã hoàn tất, bây giờ chúng ta sẽ, do chúng ta sẽ sử dụng các Composiion api nên sẽ chia ra một file cho dễ quản lí và đặt nó tại `resources/js/composables/companies.js`

## 1. Tạo các hàm thực thi việc xử lý với Vue Composition API
```js
import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useCompanies() {
  const companies = ref([])
  const company = ref([])
  const router = useRouter()
  const errors = ref('')

  const getCompanies = async () => {
    let response = await axios.get('/api/companies')
    companies.value = response.data.data;
  }

  const getCompany = async (id) => {
    let response = await axios.get('/api/companies/' + id)
    company.value = response.data.data;
  }

  const storeCompany = async (data) => {
    errors.value = ''
    try {
      await axios.post('/api/companies/', data)
      await router.push({name: 'companies.index'})
    } catch (e) {
      if (e.response.status === 422) {
        for (const key in e.response.data.errors) {
          errors.value += e.response.data.errors[key][0] + ' ';
        }
      }
    }
  }

  const updateCompany = async (id) => {
    errors.value = ''
    try {
      await axios.put('/api/companies/' + id, company.value)
      await router.push({name: 'companies.index'})
    } catch (e) {
      if (e.response.status === 422) {
        for (const key in e.response.data.errors) {
          errors.value += e.response.data.errors[key][0] + ' ';
        }
      }
    }
  }

  const destroyCompany = async (id) => {
    await axios.delete('/api/companies/' + id)
  }

  return {
    companies,
    company,
    errors,
    getCompanies,
    getCompany,
    storeCompany,
    updateCompany,
    destroyCompany
  }
}
```
Bên trên là mình sẽ định nghĩa cho các hàm nhằm phục vụ cho việc **CRUD** company. Đọc thì cũng dể hiểu thôi phải không? không có gì phức tạp cả.

## 2. Company list
```vue
<!-- resources/js/components/companies/CompanyIndex.vue -->
<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
        <table class="min-w-full border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Address</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Website</span>
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
            <template v-for="item in companies" :key="item.id">
                <tr class="bg-white">
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.name }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.email }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.address }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.website }}
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import useCompanies from "../../composables/companies";
import { onMounted } from "vue";

export default {
    name: "CompanyIndex",
    setup() {
        const { companies, getCompanies } = useCompanies()

        onMounted(getCompanies)

        return {
            companies
        }
    }
}
</script>
```

Kết quả : 
![](https://b29.vn/storage/image_contents/O4Q24eLEREKbFTgZCEiHAKOOeGQaKYuQPMhc9ciC.png)
## 2. Create/edit company
Tiếp theo chúng ta sẽ tiến hành xử lý phần tạo và edit company nhé. Đầu tiên ta sẽ tạo ra một component chứa `Form` chung :

```vue
<!-- resources/js/components/companies/Form.vue -->
<template>
  <div class="mt-2 mb-6 text-sm text-red-600" v-if="errors !== ''">
    {{ errors }}
  </div>

  <form class="space-y-6" @submit.prevent="saveCompany">
    <div class="space-y-4 rounded-md shadow-sm">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <div class="mt-1">
          <input type="text" name="name" id="name"
           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
           v-model="form.name">
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <div class="mt-1">
          <input type="text" name="email" id="email"
           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
           v-model="form.email">
        </div>
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <div class="mt-1">
          <input type="text" name="address" id="address"
           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
           v-model="form.address">
        </div>
      </div>

      <div>
        <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
        <div class="mt-1">
          <input type="text" name="website" id="website"
             class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
             v-model="form.website">
        </div>
      </div>
    </div>

    <button type="submit"
      class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
      {{ companyId ? 'Update' : 'Create' }}
    </button>
  </form>
</template>

<script>
import { reactive, onMounted } from "vue"
import useCompanies from "../../composables/companies";

export default {
  name: "Form",
  props: {
    companyId: {
      required: false,
      type: String
    },
  },

  setup(props) {
    let form = reactive({
      'id': null,
      'name': '',
      'email': '',
      'address': '',
      'website': '',
    })

    const { errors, company, getCompany, updateCompany, storeCompany } = useCompanies()

    if (props.companyId) {
      onMounted(getCompany(props.companyId))
      form = company;
    }

    const saveCompany = async () => {
      props.companyId
        ? await updateCompany(props.companyId)
        : await storeCompany({ ...form })
    }

    return {
      form,
      saveCompany,
      errors
    }
  }
}
</script>
```
### Company Company create
```vue
<!-- resources/js/components/companies/CompanyCreate.vue -->
<template>
  <Form />
</template>

<script>

import Form from "./Form";

export default {
  name: "CompanyCreate",
  components: {
    Form
  },
}
</script>

```
### Company Company edit

```vue
<!-- resources/js/components/companies/CompanyEdit.vue -->
<template>
  <Form :companyId="id" />
</template>

<script>
import Form from "./Form";

export default {
  name: "CompanyEdit",

  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    Form,
  },
}
</script>

```

OK vậy là xong 2 cái form, việc còn lại bây giờ là thêm route và thêm button để thao tác :

```js
// resources/js/router/index.js
...
import CompanyCreate from "../components/companies/CompanyCreate";
import CompanyEdit from "../components/companies/CompanyEdit";
...

{
	path: '/create',
	name: 'companies.create',
	component: CompanyCreate
},
{
	path: '/:id/edit',
	name: 'companies.edit',
	component: CompanyEdit,
	props: true
},
...
```

```vue
<!-- resources/js/components/companies/CompanyIndex.vue -->
...
<div class="flex place-content-end mb-4">
	<div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
		<router-link :to="{ name: 'companies.create' }" class="text-sm font-medium">Create company</router-link>
	</div>
</div>
...

<th class="px-6 py-3 bg-gray-50"></th>

...

<td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
	<router-link :to="{ name: 'companies.edit', params: { id: item.id } }"
		class="mr-2 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
		Edit
	</router-link>
</td>
...
```

List : 
![](https://b29.vn/storage/image_contents/7j5BwChkSsKOJt1ct1ijUnIYnVobduNv8L1yoxZo.png)

Update / Create :
![](https://b29.vn/storage/image_contents/wSZXWStRyl9vNKgNqozN9BUkmhDAoIY0yZShiuQ3.png)

## 3.  Xoá company
Về phần xoá, các bạn chỉ việc thêm button để gọi event xoá
```html
<button @click="deleteCompany(item.id)"
	class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
	Delete
</button>
```

Và thêm function xoá vào `setUp()` của list :
```js
const { companies, getCompanies, destroyCompany } = useCompanies()
onMounted(getCompanies)

const deleteCompany = async (id) => {
	if (!window.confirm('Are you sure?')) {
		return
	}
	await destroyCompany(id);
	await getCompanies();
}

return {
	companies,
	deleteCompany
}
```

## 4. Khai báo lại route của Laravel

Khi các bạn sử dụng SPA trong laravel, bạn cần phải khai báo lại route, vì mục đích chúng ta sẽ sử dụng route của `Vue-router` là chính

```php
Route::view('/{any}', 'dashboard')
    ->middleware('auth')
    ->where('any', '.*');
```

OK mọi việc đã xong, các bạn test lại xem nào

# Kết
Vậy thì mình cũng hướng dẫn xong các bạn cách tạo một CRUD đơn giản bằng laravel và vue3 rồi. Hi vọng nó sẽ giúp ích được cho các bạn, mình chỉ đang tìm hiểu về Composition API của vue, nên có gì sai sót mong mọi người bỏ qua. Cảm ơn các bạn đã ủng hộ mình, hi vọng chúng ta cũng sẽ gặp lại trong những bài kế tiếp .

Repository : https://github.com/nguyenthuong1304/crud_vue3

Tham khảo :
 - https://b29.vn/bai-viet/laravel-crud-va-vuejs-3-composition-api?id=42
 - https://v3.vuejs.org/guide/composition-api-introduction.html
 - https://www.youtube.com/watch?v=KfaZRBdN2as
 - https://laravel.com/docs/8.x/starter-kits#laravel-breeze