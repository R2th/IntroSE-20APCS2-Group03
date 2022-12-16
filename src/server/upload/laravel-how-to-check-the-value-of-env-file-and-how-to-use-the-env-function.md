How to check if the value described in the `.env` file is reflected in Laravel.

# `env` helper function

Functions provided by default in Laravel. You can call the specified value in the `.env` file.

`env ('environment variable name','default value')`

The default value is displayed when the environment variable is null.

There is no need for a default value.

It is easier to understand if you set the default value to check if the value is read properly.

* Example 

```
env('DB_CONNECTION')

env('DB_CONNECTION', 'default')
```

# Steps to verify
Let's try to display on browser

## 1. Create view
`resources > views > env.blade.php`
As a test, let's list out three environment variables related to DB.
* env.blade.php
```
<p>{{ env('DB_CONNECTION', 'default')}}</p>
<p>{{ env('DB_HOST', 'default')}}</p>
<p>{{ env('DB_PORT', 'default') }}</p>
```

### ▼(Supplement) Target data
```
.env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
```

## 2. Routing
`routes > web.php`

* web.php

```
//env
Route::get('env', function () {
    return view('env');
});
```
## 3. Display on browser
```
#サーバー起動
php artisan serve
```

open http://127.0.0.1:8000/env

![](https://images.viblo.asia/1d58171c-8e6c-4d8b-afac-1d259a5c0ea0.png)

we can confirm that the value of the environment variable was read.

# What to do if it is not displayed

The cache may be read and the .env file may not be read.

Clear the cache with the following command.

`$ php artisan config:clear`

![](https://images.viblo.asia/0d6e6b73-f851-43c3-a046-a4d69a82afc8.png)
↓

```
$ php artisan config:clear
Configuration cache cleared!
```

↓

![](https://images.viblo.asia/2bc502bb-763d-4c3f-9f42-8bdc7d3d1e49.png)

# Commands that should not be executed in the local environment

When I run php artisan `config: cache`, it doesn't start reading the `.env` file.

If all the values are properly described in `.env`, but the browser display is null (default in the above settings), this command may have been executed.

# What is php artisan `config: cache`?
A command for the production environment that speeds up by combining all configuration files into one.

Not recommended in development environments where settings change frequently.

Also note that when executed, the cache will be created and the .env file will not be read.

```
$ php artisan config:cache
Configuration cache cleared!
```