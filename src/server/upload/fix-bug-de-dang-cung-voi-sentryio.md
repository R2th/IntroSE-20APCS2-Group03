## `Sentry.io` là gì? Tại sao lại cần dùng tới `Sentry`

`Sentry.io` là một ứng dụng giúp chúng ta tracking lại những error xảy ra bên trong ứng dụng trong quá trình người dùng sử dụng, gửi thông báo lỗi thông qua email, SMS. 

Trên trang chủ [Sentry.io](https://sentry.io/features/), nói rằng:

> When your code breaks.
> Sentry is here to help you fix it.

Mỗi developer viết ra hàng tấn các bugs, và không thể tránh khỏi có rất nhiều bugs còn tồn tại trên production. `Sentry` giúp bạn tìm ra những bugs đó trước khi customer nhận ra chúng.
## Tạo một Organization mới trên `Sentry.io`
Đầu tiên các bạn vào [đây](https://sentry.io/organizations/new/) để tạo 1 Organization cho các dự án của mình,
![](https://images.viblo.asia/545018ea-525d-4b1a-85f4-34fb4482ad0c.png)
sau khi tạo Organization xong, trang sẽ  chuyển tới giao diện cho bạn tạo Project của mình. Có rất nhiều ngôn ngữ được `Sentry` hỗ trợ, việc của bạn là chỉ cần chọn 1 cái, điền tên và `Sentry` sẽ đưa bạn tới giao diện hướng dẫn integration và cung cấp cho bạn 1 `DSN key` để bạn sử dụng ở trong ứng dụng của mình.
![](https://images.viblo.asia/2df2192b-a55d-41f6-b7bb-709fca97fd96.png)

## Thêm `Sentry` vào dự án Laravel để ghi lại lỗi

Laravel được support bởi `Sentry` thông qua package [sentry-laravel](https://github.com/getsentry/sentry-laravel), để sử dụng `Sentry` trong dự án bạn chỉ cần cài nói thông qua Composer:

``` bash
$ composer require sentry/sentry-laravel:1.1.1
```

Nếu bạn đang dùng `Laravel 5.5` trở lên thì bỏ qua bước này:

```php:config/app.php
'providers' => array(
    // ...
    Sentry\Laravel\ServiceProvider::class,
)

'aliases' => array(
    // ...
    'Sentry' => Sentry\Laravel\Facade::class,
)
```
Thêm `Sentry` vào ` App/Exceptions/Handler.php` để ứng dụng của bạn report tới `Sentry.io` mỗi khi có Exception xảy ra:
```php
public function report(Exception $exception)
{
    if (app()->bound('sentry') && $this->shouldReport($exception)){
        app('sentry')->captureException($exception);
    }

    parent::report($exception);
}

```
Tạo file config của `Sentry` bằng command 
``` bash
$ php artisan vendor:publish --provider="Sentry\Laravel\ServiceProvider"
```
```php:config/sentry.php
<?php

return array(
    'dsn' => env('SENTRY_LARAVEL_DSN'),

    // capture release as git sha
    // 'release' => trim(exec('git log --pretty="%h" -n1 HEAD')),

    // Capture bindings on SQL queries
    'breadcrumbs.sql_bindings' => true,

    // Capture default user context
    'user_context' => true,
);

```
Cuối cùng, bạn cần bổ sung vào `.env` `DSN key` của dự án mà bạn đã tạo ở trên:

```bash:.env
SENTRY_LARAVEL_DSN=https://xxxx@sentry.io/xxxxx
```
---
Để kiểm tra xem `Sentry` đã nhận được lỗi trong ứng dụng Laravel chưa, bạn có thể test bằng việc vào tạo 1 route throw ra 1 exception:

```php
Route::get('/debug-sentry', function () {
    throw new Exception('Laravel Sentry error!');
});
```
và đây `Sentry` đã capture lại Exception vừa rồi:
![](https://images.viblo.asia/9f8ad476-8ad1-46de-8f89-c7e87efb3b47.png)
![](https://images.viblo.asia/0771cc34-a943-48de-9e74-c54ebe667a4f.png)

## Thêm `Sentry` vào  dự án React

Để sử dụng `Sentry` trong React, bạn sử dụng package `@sentry/browser`:

```bash
# Using yarn
$ yarn add @sentry/browser

# Using npm
$ npm install @sentry/browser
```

Trước kia, mỗi khi xảy ra một Javascript error trong 1 phần của UI, nó sẽ gây crash toàn bộ app. Để giải quyết vấn đề này cho React user, từ phiên bản 16 trở lên, `React` giới thiệu một concept mới [Error Boundary](https://reactjs.org/docs/error-boundaries.html).  Error boundaries là một `React component` sẽ catch Javascript errors xảy ra bên trong các child component, log lại error và hiển thị lỗi ở phần UI đó thay vì crash toàn bộ app.

`Sentry` tận dụng nó để capture các error trên client.

Đầu tiên mình tạo 1 instance của `Sentry`:

```javascript:sentry.js
import Raven from 'raven-js'

import config from 'config/'

const SENTRY_DSN = 'https://xxxx@sentry.io/xxxxx'

Raven.config(SENTRY_DSN, {
    environment: 'local'
}).install()

export default Raven

```

```javascript:ErrorBoundary.js
import React, { Component } from 'react'
import sentry from 'sentry'

class ErrorBoundary extends Component {
    state = { eventId: null }
    
    componentDidCatch(error, errorInfo) {
        const eventId = sentry.captureException(error, { extra: errorInfo })
        this.setState({eventId})
    }

    render() {
        return this.props.errorStatus
            ? <button onClick={() => sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
            : this.props.children
    }
}

export default ErrorBoundary
```

Cuối cùng bạn chỉ cần bọc toàn bộ các Component trong app của bạn bằng `ErrorBoundary` ở trên

```javascript:app.js
import React, { Component } from 'react'
import ErrorBoundary from 'ErrorBoundary'

class App extends Component {
    render() {
        return (
                <ErrorBoundary>
                    // Các component con
                </ErrorBoundary>
        )
    }
}

export default App
```