Tiêu đề là mình lấy từ trang chủ của https://inertiajs.com/ chứ không phải mình tự nghĩ ra đâu nhé :v. Lâu lâu rồi chưa động tới Laravel (dự án cuối cùng mình code là ở ver 5.8), thế nên một ngày đẹp trời lượn vào đọc docs ver 8.x tí và thấy cái gọi là[ Laravel Jetstream](https://jetstream.laravel.com/). Ngay ở phần Introduction mình đã đọc được 2 thứ nghe khá mới lạ đối với mình là `Livewire` và `Inertia` (có lẽ với nhiều bạn thì nó không mới lắm). Sau khi xem qua thì mình cảm thấy thích `Inertia` hơn nên quyết định tìm hiểu về nó. `Inertia` cho phép chúng ta dễ dàng tạo ra single page app một cách đơn giản hơn.

# Cách hoạt động
Chúng ta vẫn sẽ xây dựng một app với model, controller, middleware,... như cách mà chúng ta thường làm khi xây dựng web với laravel. Điều khác ở đây là tầng view. Thay vì việc sử dụng server-side render, nay view sẽ là Javascript components. Nhưng mọi chuyện không chỉ dừng ở đây. Để mang lại trải nghiệm của SPA (single page app) thì khi click vào 1 link, nếu browser thực hiện load lại cả trang thì không ổn chút nào. Đó là lúc mà `Inertia` sẽ tham gia vào. Về cơ bản thì `Inertia` là một thư viện giúp thực hiện truy cập trang mà không phải reload lại toàn bộ trang. Điều này thực hiện nhờ sử dụng `<inertia-link>` component. Khi click vào một `Inertia link`, `Inertia` sẽ chặn lại và thay thế bằng `XHR`. Khi mà `Inertia` tạo ra một XHR request, server sẽ nhận biết được và thay vì trả về HTML, nó sẽ trả về JSON cùng với tên và data của component JS. Sau đó, Inertia sẽ đổi  component trước thành component mới và update vào lịch sử state.

# Cài đặt
Về phần tạo project Laravel thì mình sẽ không nói nữa nhé và mình sẽ sử dụng react để build frontend nhé. Đầu tiên thì bạn cần cài đặt laravel/ui:

```
composer require laravel/ui
```

Cài đặt react

```
php artisan ui react
```


Cài các dependencies của `Inertia`
### Server side
```
composer require inertiajs/inertia-laravel
```

Sau khi cài đặt xong thì hãy tạo ra root template nhé. Mặc định Laravel adapter sẽ sử dụng file `app.blade.php`

```php
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>
  </head>
  <body>
    @inertia
  </body>
</html>
```

Tạo middleware:
```
php artisan inertia:middleware
```

Ở trong file `App\Http\Kernel`, bạn hãy thêm đoạn này vào cuối group
```php
'web' => [
    // ...
    \App\Http\Middleware\HandleInertiaRequests::class,
],
```

### Client side
Đầu tiên chạy lệnh:

```
npm install
```

Sau đó chúng ta sẽ cài thêm package liên quan
```
npm install @inertiajs/inertia @inertiajs/inertia-react
```

Ở file `resources/js/app.js`

```javascript
import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'

const el = document.getElementById('app')

render(
  <App
    initialPage={JSON.parse(el.dataset.page)}
    resolveComponent={name => require(`./Pages/${name}`).default}
  />,
  el
)
```

Giờ bạn chỉ cần khởi tạo server bằng lệnh
```
php artisan serve
```

và build giao diện bằng lệnh

```
npm run dev
```

để có thể tự động build lại mỗi lần có thay đổi thì bạn dùng lệnh

```
npm run watch-poll
```

# Routing
Khi setup xong thì cta cùng tạo ra một cái view nhỏ để xem nhỉ. Muốn có view thì đầu tiện chúng ta phải có url để truy cập. Với nhưng view mà không cần data, chỉ đơn giản là render giao diện tĩnh ra thì các bạn có thể định nghĩa route trong `web.php` như sau:

```php
Route::inertia('/', 'TestComponent');
```

```resources/js/Pages/TestComponent.js javascript
import React from 'react';

const TestComponent = (props) => {
    return (
        <div>
            <h1>This is test component</h1>
        </div>
    )
}

export default TestComponent;
```

Giờ thì truy cập lại app bạn sẽ có kết quả như sau:

![](https://images.viblo.asia/8a2f3dd8-78a9-48a5-914f-ffd941019edb.png)

Giờ thì với view có data thì sao. Đầu tiên mình sẽ tạo ra `TestController` nhé:

```app\Http\Controllers\TestController.php php
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TestController extends Controller
{
    public function index()
    {
        $user = [
            [
                'id' => 1,
                'name' => 'Test 1',
            ],
            [
                'id' => 2,
                'name' => 'Test 2',
            ]
        ];

        return Inertia::render('TestComponent', [
            'users' => $user,
        ]);
    }
}
```

Ở đây thì mình fake tạm 1 ít dữ liệu. Sau đó sửa 1 ít ở `TestComponent`

```resources/js/Pages/TestComponent.js javascript
import React from 'react';

const TestComponent = (props) => {
    const { users } = props;

    return (
        <div>
            <h1>List test users</h1>
            {
                users.map(user => (
                    <p>{user.name}</p>
                ))
            }
        </div>
    )
}

export default TestComponent;
```

Và kết quả:

![](https://images.viblo.asia/716df35b-d819-4be3-8b2b-06f52225390e.png)

Khá là đơn giản phải không nào :D. Thay vì dữ liệu ảo kia bạn có thể lấy dữ liệu từ DB thông qua Model hoặc viết Query builder. Thế là không phải mất công viết API và làm bao nhiêu thứ khác nữa

# Pages
Về cơ bản thì pages là những javascript components thôi. Ở đây thì Pages sẽ nhận data từ controller trả về và đưa coi đó như props. Ví dụ như `TestComponent` ở trên sẽ được coi là 1 page

### Tạo và sử dụng layout
Việc tạo layout và sử dụng đi sử dụng lại chắc cũng không xa lạ gì với anh em nữa rồi. Và `InertiaJS` cũng hỗ trợ chúng ta làm điều đó một cách khá dễ dàng. Ở đây thì mình sẽ đưa ra một ví dụ cơ bản thôi nhé, còn thực tế mình sử dụng như thế nào mình sẽ để trong bài xong, khi mà mình sẽ làm hẳn ra 1 demo khác

Giờ sẽ tạo 1 file `Layout.js`

``` resources/js/Pages/Layout.js javascript

import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

const Layout = (props) => {
    const { children } = props;

    return (
        <main>
        <header>
          <InertiaLink href="/">Home</InertiaLink>
          <InertiaLink href="/pages">Pages</InertiaLink>
        </header>
  
        <article>{children}</article>
      </main>
    )
}

export default Layout;
```

ở file `TestComponent` thì các bạn thêm đoạn
```javascript
TestComponent.layout = page => <Layout children={page} />
```

cụ thể:
```resources/js/Pages/TestComponent.js javascript
import React from 'react';
import Layout from './Layout'

const TestComponent = (props) => {
    const { users } = props;

    return (
        <div>
            <h1>List test users</h1>
            {
                users.map(user => (
                    <p>{user.name}</p>
                ))
            }
        </div>
    )
}

TestComponent.layout = page => <Layout children={page} />

export default TestComponent;
```


Và giờ view của chúng ta sẽ như này:

![](https://images.viblo.asia/a2bb75a7-1298-4e12-a7a8-e45f2911be50.png)


Bạn cũng có thể tạo ra các layout lồng nhau (hay trong docs gọi là `nested layout`)

```resources/js/Pages/NestedLayout.js javascript
import React from 'react';

const NestedLayout = (props) => {
    const { children } = props;

    return (
       <div>
           This is nested layout

           <article>{children}</article>
       </div>
    )
}

export default NestedLayout;
```

```resources/js/Pages/TestComponent.js javascript
import React from 'react';
import Layout from './Layout';
import NestedLayout from './NestedLayout';

const TestComponent = (props) => {
    const { users } = props;

    return (
        <div>
            <h1>List test users</h1>
            {
                users.map(user => (
                    <p>{user.name}</p>
                ))
            }
        </div>
    )
}


TestComponent.layout = page => (
    <Layout>
      <NestedLayout children={page} />
    </Layout>
  )

export default TestComponent;
```

Kết quả:

![](https://images.viblo.asia/afe94d56-fc49-41d2-976a-5d6dc821cb72.png)

Nhưng hay dùng nested layout một cách sáng suốt nhé. Nếu tất cả các pages của bạn đều cần tới component nested đó (ví dụ giờ có `SidebarComponent` chẳng hạn), thì hãy để nó là một component con của Layout chính, chứ đừng file nào cũng khai báo nested layout như này :D


# Kết
Bài viết của mình đến đây thôi, cơ bản giới thiệu tới mọi người như vậy để nắm sơ sơ. Bài sau mình sẽ đi vào hẳn demo để có thể nói về những điều trong docs dễ hơn nhé :D. Dạo này cũng hơi bận nên khả năng bài sau sẽ ra muộn nên các bạn cũng tự thử làm demo trước xem sao nha :D

Tham khảo: https://inertiajs.com/