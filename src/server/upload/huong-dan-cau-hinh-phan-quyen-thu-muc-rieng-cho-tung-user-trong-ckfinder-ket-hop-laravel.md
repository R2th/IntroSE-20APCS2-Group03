Xin chào các bạn, nói đến ckfinder chắc ai cũng biết là nó để làm gì rồi phải không. Và hôm nay mình sẽ hướng dẫn các bạn phần quyền thư mục riêng cho mỗi user trong laravel.

Mình sẽ đưa ra 1 bài toán dễ hiểu là: Có 2 role là admin và employee

Admin: Show toàn bộ thư mục.

Employee: Chỉ xem được thư mục của chính nó.

Đầu tiên bạn cần phải cài package ckfinder, xem hướng dẫn [tại đây](https://github.com/ckfinder/ckfinder-laravel-package). Sau khi cài đặt xong các bạn thực hiện các bước sau:

### Bước 1: Config folder 

Config đường dẫn đến thư mục cần chứa, vd: mình cần lưu vào: domain.com/public/uploads

```
$config['backends']['default'] = array(
    'name'         => 'default',
    'adapter'      => 'local',
    'baseUrl'      => env('APP_URL', '').'/public/uploads/',
    'root'         => public_path('/uploads/'),
    'chmodFiles'   => 0777,
    'chmodFolders' => 0755,
    'filesystemEncoding' => 'UTF-8'
);
```

### Bước 2: Phân chia thư mục

Dưới đây mình sẽ phân chia gồm: 

1. Images: để chứa hình ảnh ( .png, .jpg, .gif,.... )
2. Files: để chứa các file ( .csv, .doc, .docx )
3. Videos; để chứa video
4. users: để phân quyền cho từng user

VD:

```
$config['resourceTypes'][] = array(
    'name'              => 'Images',
    'directory'         => 'images',
    'maxSize'           => 0,
    'allowedExtensions' => 'bmp,gif,jpeg,jpg,png',
    'deniedExtensions'  => '',
    'backend'           => 'default'
);

$config['resourceTypes'][] = array(
    'name'              => 'Files', // Single quotes not allowed.
    'directory'         => 'files',
    'maxSize'           => 0,
    'allowedExtensions' => '7z,aiff,asf,bmp,csv,doc,docx,fla,gif,gz,gzip,jpeg,jpg,mid,mp3,mpc,mpeg,mpg,ods,odt,pdf,png,ppt,pptx,pxd,qt,ram,rar,rm,rmi,rmvb,rtf,sdc,sitd,swf,sxc,sxw,tar,tgz,tif,tiff,txt,vsd,wav,wma,wmv,xls,xlsx,zip',
    'deniedExtensions'  => '',
    'backend'           => 'default'
);

$config['resourceTypes'][] = array(
    'name'              => 'Videos', // Single quotes not allowed.
    'directory'         => 'videos',
    'maxSize'           => 0,
    'allowedExtensions' => 'flv,mov,mp4,m3u8,ts,3gp,avi,wmv',
    'deniedExtensions'  => '',
    'backend'           => 'default'
);

$config['resourceTypes'][] = array(
    'name'              => 'Users',
    'directory'         => 'users',
    'maxSize'           => 0,
    'allowedExtensions' => 'bmp,gif,jpeg,jpg,png,7z,aiff,asf,avi,bmp,csv,doc,docx,fla,flv,gif,gz,gzip,jpeg,jpg,mid,mov,mp3,mp4,m3u8,ts,3gp,mpc,mpeg,mpg,ods,odt,pdf,png,ppt,pptx,pxd,qt,ram,rar,rm,rmi,rmvb,rtf,sdc,sitd,swf,sxc,sxw,tar,tgz,tif,tiff,txt,vsd,wav,wma,wmv,xls,xlsx,zip',
    'deniedExtensions'  => '',
    'backend'           => 'default'
);
```

###  Bước 3: Check role và chia thư mục theo user

Khi xem hướng dẫn cài đặt các bạn cũng đã thấy là nó sẽ tạo 1 middleware để check authentication. Và bây giờ mình sẽ tận nó để check role và chia thư mục luôn.

Vì trong file config không thể check auth được nên mình dùng function help `config()` để replace lại các config của ckfinder.

Luôn luôn cho phép truy cập vào ckfinder:
```
$configCkfinder = [
            'ckfinder.authentication' => function(){return true;}
        ];
```

Kiểm tra role và chia lại thư mục:
```
$auth = auth()->guard('admin')->user();

        if(!in_array($auth->role, ['admin', 'dev'])){

            $resourceTypes = config('ckfinder.resourceTypes');

            unset($resourceTypes[3]);

            array_merge($configCkfinder, [
                'ckfinder.resourceTypes' => $resourceTypes,
                'ckfinder.backends.default.baseUrl' => env('APP_URL', '').'/public/uploads/users/'.$auth->id.'/',
                'ckfinder.backends.default.root' => public_path('/uploads/users/'.$auth->id.'/'),
            ]);
        }
```

Replace config:
```
config($configCkfinder);
```

Kết quả cuối trong file middleware:

```
<?php

namespace App\Admin\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomCKFinderAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $configCkfinder = [
            'ckfinder.authentication' => function(){return true;}
        ];
        $auth = auth()->guard('admin')->user();

        if(!in_array($auth->role, ['admin', 'dev'])){

            $resourceTypes = config('ckfinder.resourceTypes');

            unset($resourceTypes[3]);

            array_merge($configCkfinder, [
                'ckfinder.resourceTypes' => $resourceTypes,
                'ckfinder.backends.default.baseUrl' => env('APP_URL', '').'/public/uploads/users/'.$auth->id.'/',
                'ckfinder.backends.default.root' => public_path('/uploads/users/'.$auth->id.'/'),
            ]);
        }

        config($configCkfinder);

        return $next($request);
    }
}

```

Trên đây mình chia sẽ cách chia thư mục cho từng user của mình. Vì trong docs ckfinder không hướng dẫn phần này, nên mình nghĩ sẽ có nhiều bạn cần tới. Chúc các bạn thành công.