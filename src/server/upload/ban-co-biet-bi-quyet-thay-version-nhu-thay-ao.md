Hôm qua mình đang cài thêm thư viện thì gặp lỗi như vậy

```js
npm WARN notsup Unsupported engine for @ckeditor/ckeditor5-build-inline@23.1.0:
wanted: {"node":">=12.0.0","npm":">=5.7.1"} (current: {"node":"10.15.2","npm":"6.14.1"})
npm WARN notsup Not compatible with your version of node/npm: @ckeditor/ckeditor5-build-inline@23.1.0
```

Nếu làm việc với docker thì dễ rồi, chỉ việc đổi images, so easy. Nhưng nếu bạn không dùng docker thì sao? Gỡ version cũ để cài version mới hay làm thế nào?

Nếu bạn gỡ version cũ mà không biết cách xóa hết folder của nó thì có thể dẫn tới việc conflict, chưa kể, khi cài version mới, có thể version của bạn vẫn không đổi, còn bị lỗi. Vừa hay, mình đã tìm được vài thông tin hữu ích, chia sẻ một chút, hi vọng có thể giúp được mọi người.

### 1. Đổi version Laravel

Ví dụ, php máy mình ban đầu là version `php7.2`
```js
$ php -v
PHP 7.2.33-1+ubuntu16.04.1+deb.sury.org+1 (cli) (built: Aug  7 2020 14:43:59) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.2.33-1+ubuntu16.04.1+deb.sury.org+1, Copyright (c) 1999-2018, by Zend Technologies
    with Xdebug v2.9.6, Copyright (c) 2002-2020, by Derick Rethans
```
Nhưng giờ mình muốn sử dụng version `php7.4`

Đầu tiên, mình sẽ kiểm tra các version php mà mình đã cài trên máy
```js
$ ls /usr/bin/php*
/usr/bin/php  /usr/bin/php7.2  /usr/bin/php7.3  /usr/bin/php7.4  /usr/bin/php-config
/usr/bin/php-config7.3  /usr/bin/php.default  /usr/bin/phpize  /usr/bin/phpize7.3
```
Bạn có thể thấy máy mình đã có `php7.4`

Nếu bạn chưa có, hãy  cài thêm version `php7.4` bằng lệnh
```
$ sudo apt install php7.4
```

Bạn cũng có thể đổi version khác nếu  bạn muốn cài version khác vào máy

```
$ sudo apt install <version>
```

Và Đừng quên cài thêm các module cần thiết như mysql, xml nhé
```
$ sudo apt install php7.4-cli php7.4-xml php7.4-mysql 
```

Sau khi có version bạn cần rồi, bạn hãy chạy lệnh sau để set version php mà bạn muốn sử dụng nhé. Ở đây mình sẽ để verison mình muốn là `php7.4`
```
$ sudo update-alternatives --set php /usr/bin/php7.4
```

Kiểm tra xem nào
```js
$ php -v
PHP 7.4.11 (cli) (built: Oct  6 2020 10:35:19) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.11, Copyright (c), by Zend Technologies
    with Xdebug v2.9.6, Copyright (c) 2002-2020, by Derick Rethans
```
Đã là **7.4**. Dễ như ăn cháo phải không nào (nếu bạn thích cháo =)))

### 2. Đổi version Node

Tiếp theo là node nhé, chúng ta sẽ dùng NVM để use version chúng ta muốn sử dụng.

Đầu tiên bạn hãy cài thêm pakage NVM, nếu máy bạn chưa có pakage này
```
$ curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

Sau đó, cài thêm version node mà bạn cần.
Bạn có thể sử dụng NVM để cài
```
$  nvm install v12.18.2
```
hoặc bằng cách khác
```
$ sudo apt-get update
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install nodejs
```
>> Đây là ví dụ cho trường hợp bạn muốn cài node 12. Bạn có thể tham khảo version khác tại [đây](https://nodejs.org/en/about/releases/)

<br>

Cuối cùng, set version mà bạn muốn sử dụng nào
```
$ nvm use v12.18.0
```

Kiểm tra lại nhé
```js
node -v
v12.18.2
```
Done rồi phải không nào :)

### 3. Đổi version Python
Tương tự php, bạn có thể list xem những version python bạn đã cài trong máy
```js
$ ls /usr/bin/python*
/usr/bin/python   /usr/bin/python2.7  /usr/bin/python3.5         /usr/bin/python3.5m
/usr/bin/python3.8       /usr/bin/python3m        /usr/bin/python2  /usr/bin/python3
/usr/bin/python3.5-config  /usr/bin/python3.5m-config  /usr/bin/python3-config  /usr/bin/python3m-config
```

Nếu version bạn cần dùng chưa có, hãy cài thêm chúng
```
$ sudo apt-get update
$ sudo apt install python3.8
```

Cuối cùng, set version bạn muốn sử dụng là xong rồi :)

```
$ alias python='/usr/bin/python3.8'
```

Giờ thì kiểm tra lại thôi nào
```js
$ python --version
Python 3.8.5
```

Oke con dê quá dễ =))


Trên đây là một số mẹo mình nghĩ sẽ cần cho các bạn chưa tiếp xúc nhiều với docker. Hi vọng là bài viết này sẽ có ích với các bạn.

Tạm biệt và hẹn gặp lại bạn ở các bài viết tiếp theo.

Tài liệu tham khảo

[PHP](https://www.tecmint.com/install-different-php-versions-in-ubuntu/amp/?fbclid=IwAR3uxg7M-wQu8r_e93ulzNGLOIUTAgnJSUWNpPfN6oerFUQc-vkE2o1nU9k)

[Node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

[Python](https://phoenixnap.com/kb/how-to-install-python-3-ubuntu)