MÌnh code Laravel cũng khá lâu nên cũng quen với cách tổ chức code PHP theo dạng OOP, Namespace, autoload theo chuẩn PSR-4 và cài cắm thêm nhiều các packages/library qua Composer. Và mình cũng áp dụng nó khi viết theme cho Wordprress. Ngày hôm nay mình sẽ chia sẻ lại "bí kíp" này tới anh em cộng đồng Viblo.

## Bạn sẽ biết thêm được những gì?

Qua bài viết này, một số thứ có thể hữu ích với các bạn như:
- Các bạn có thể cài thêm các package bằng composer để dùng trong wordpress
- Các bạn có thể biết cách tích hợp Laravel Mix vào trong wordpress theme
- Tổ chức code của theme theo hướng OOP

Nếu bạn thấy hứng thú, hãy nhấn cho mình +1 upvote và cùng bắt đầu nhé! <3

## Chuẩn bị

- Composer đã được cài đặt
- Node.js đã được cài đặt (để tích hợp thêm Laravel Mix)

## Tích hợp Composer

Composer là công cụ giúp chúng ta quản lý dependencies (package/library) mà mình cài thêm cho project. Nó tương tự như Bundler của Ruby và NPM của Node.js. Bạn có thể tham khảo thêm về Composer qua bài viết của tác giả @thangtd90 tại đây: https://viblo.asia/p/tim-hieu-ve-composer-jlA7GKWGKZQ2.

1. Để tích hợp Composer vào trong theme, bạn mở thư mục của theme viết, VD của mình:

```bash
cd wp-content/themes/webee
```

2. Khởi tạo file `composer.json` với nội dung mẫu sau:

```json
{
    "name": "kimyvgy/demo-theme",
    "description": "My Wordpress theme integrated with Composer",
    "authors": [
        {
            "name": "Nguyen Huu Kim",
            "email": "kimnh@webee.asia"
        }
    ],
    "require": {}
}
```

Hoặc nếu bạn cài một package luôn thì file `composer.json` và `composer.lock` cũng sẽ tự động được tạo ra.

3. Tích hợp composer vào theme, bạn thêm dòng include như sau vào trong theme bằng cách thêm vào file `functions.php`:

```php:functions.php
<?php

require "vendor/autoload.php";
```

Sau khi thêm dòng này, bất kỳ package nào bạn cài đặt đều đã có thể sử dụng trong theme.

3. Thử cài một package. Mình sẽ cài thử một package phục vụ việc debug thường dùng trong Laravel:

```bash
composer require -D symfony/var-dumper
```

Package này cung cấp các helper như: `dd`, `dump` để hiển thị thông tin về một biến lên website, nó cũng được higlight và format cho dễ nhìn.

```php
		dd([
			'Hello' => [
				'message_1' => 'Viblo!',
				'message_2' => 'World!',
			]
		]);
```

Và rồi xem kết quả:

![](https://images.viblo.asia/bc46b4e0-26de-4326-a77d-ebea464906f9.png)


## Tổ chức code wordprss theo hướng OOP

Ở phần trên, chúng ta đã tích hợp composer thành công. Composer sẽ tự động load thêm các helper/class có trong library khi mà mình sử dụng tới trong project.

Ở phần này, chúng ta sẽ tạo theme theo hướng OOP.

1. Khai báo autoload theo chuẩn PSR-4, để khi sử dụng namepace thay vì `include` theo từng file. Chúng ta sẽ thêm khai báo trong `composer.json` để composer thực hiện `autoload` tương tự như đối với package mà bạn cài thêm ở phần trên.

```json:composer.json
{
	"name": "kimnguyen/webee",
	"description": "Wordpress classes",
	"authors": [
		{
			"name": "Nguyen Huu Kim",
			"email": "kimnh@webee.asia"
		}
	],
	"require": {},
	"autoload": {
		"psr-4": {
			"Webee\\Theme\\": "classes/"
		}
	},
	"require-dev": {
		"symfony/var-dumper": "^5.2"
	}
}
```

Với mẫu composer.json ở trên, tất cả các file class đặt trong thư mục `classes` sẽ được thực hiện autoload, tương ứng với namespace: `Webee\Theme`.

2. MÌnh sẽ khởi tạo theme ngay sau dòng  include `autoload.php` tại `functions.php`:

```php:functions.php
<?php

require "vendor/autoload.php";

(new \Webee\Theme\ThemeManager)->init();
```

3. Một mẫu ví dụ của method `init()`:

```php:classes/ThemeManager.php
class ThemeManager
{
	public function init()
	{
		(new LaravelEloquent)->boot();

		(new ToolBar)->setup();
		(new Menu)->setup();
		(new WidgetManager)->setup();
		(new SearchPage)->setup();
        
        // ...
    }
}
```

Nếu bạn thấy hay ho thì có thể thử xây dựng theme theo kiểu OOP dựa trên mẫu mà mình giới thiệu bên trên nhé.

## Tích hợp Laravel Mix với Wordpress

Trong phần này, mình sẽ tích hợp Laravel Mix vào trong theme của mình. Đây là là package thường được dùng trong các dự án Laravel để build các file SCSS, JS theo ES6, Vue.js, React.js... mà trình duyệt không hiểu thành các file css thuần, các file js thuần (ES5) mà trình duyệt hiểu được.

### Cách thức hoạt động

1. Tương tự Laravel, mình sẽ tạo thư mục `resources` để chứa các file source: ES6, Vue.js, React.js, SASS, LESS... và dùng Laravel Mix xuất các file output ra thư mục `assets`.
2. Trong quá trình phát triển, chạy lệnh `yarn dev` để tự động build JS/CSS.. mỗi khi file bị sửa đổi
3. Load các file `assets` CSS/JS vào trong theme để website sẽ nhận style. Ví dụ như sau:

```php:classes/ThemeManager.php
class ThemeManager
{
    public function init()
    {
        // ...

		(new ThemeSupport)->setup()
			->loadStyles('assets/styles/app.css')
			->loadScripts('assets/scripts/app.js');
    }
}
```

### Cấu hình Laravel Mix

1. Cài đặt các dependencies: laravel-mix, cross-env... VD mình có dùng file config mặc định của Laravel, có cài: Font-awesome, Bootstrap, SASS:

```javascript:package.json
{
  "scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "npm run development -- --watch",
    "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "build": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
  },
  "devDependencies": {
    "@fortawesome/fontawesome-free": "^5.10.1",
    "browser-sync": "^2.26.7",
    "browser-sync-webpack-plugin": "2.0.1",
    "cross-env": "^5.2.0",
    "laravel-mix": "^4.1.2",
    "resolve-url-loader": "3.1.0",
    "sass": "^1.22.10",
    "sass-loader": "7.*",
    "vue-template-compiler": "^2.6.10"
  },
  "dependencies": {
    "animate.scss": "^0.0.6",
    "bootstrap": "^4.3.1",
    "lodash": "^4.17.15"
  }
}

```

2. Config Larave Mix, tạo file `webpack.mix.js`. Bạn có thể copy luôn file cấu hình đang có trong project Laravel hoặc làm theo mẫu sau:

```javascript:webpack.mix.js
let mix = require('laravel-mix');

mix.disableNotifications()
	.copyDirectory('resources/images', 'assets/images')
	.copyDirectory('resources/fonts', 'assets/fonts')
	.copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'assets/webfonts');

mix.setPublicPath('assets')
	.js('resources/scripts/app.js', 'scripts')
	.sass('resources/styles/app.scss', 'styles')
	.options({ processCssUrls: false	})
	.browserSync({
		proxy: 'my-website.localhost',
		ui: false,
		files: [
			'./**/*.js',
			'./**/*.scss',
			'./**/*.php',
		]
	});

```

Phần cầu hình Laravel Mix:
- Mình copy các file ảnh trong thư mục `resources/images`, các file fonts `resources/fonts` vào trong thư mục assets.
- Thiết lập build JS các file `resources/scripts/app.js` và `resources/styles/app.scss` tương ứng.
- Thiết lập `browserSync` để tự động reload trình duyệt sau mỗi khi file sửa đổi.

## Tổng kết

Trên đây là một số cách mà mình áp dụng để dùng được Composer, Laravel Mix và code theo hướng OOP trong dự án Wordpress. Hy vọng bài viết này sẽ mạng lại thêm một số kiến thức thú vị tới các bạn.

Mỗi lượt upvote/follow cũng như là một lời cảm ơn để mình có thêm động lực ra bài. Đọc tới đây rồi mà bạn vẫn chưa nhấn upvote và follow mình thì thật là buồn. Vậy nên đừng quên nhé bạn!

Cảm ơn các bạn đọc đã đọc tới hết bài. :)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***