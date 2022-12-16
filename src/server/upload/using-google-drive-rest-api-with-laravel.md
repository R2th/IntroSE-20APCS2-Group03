![](https://images.viblo.asia/d46e2faf-5e40-4503-a0c9-b59a18a3ffef.jpg)

### Google Drive REST API Overview

Như bạn đã biết chức năng chính của ứng dụng Drive đó là download và upload files, search, share, open... trong Google Drive.

Google Drive cũng cung cấp các APIs cho phép các nhà phát triển ứng dụng có hể tích hợp drive vào ứng dụng của mình.

Trong bài viết này chúng ta sẽ sử dụng Google Drive REST API cùng với Laravel framework, sử dụng OAuth service để xác thực người dùng, sau đó chúng ta có thể truy xuất quản lý các files,  đọc, ghi files trên drive của user.

### Create a new project 

1. Cài đặt Laravel
```php
composer create-project laravel/laravel laravel-drive --prefer-dist 

```
2. Cài đặt thư viện Socialite để Xác thực người dùng và thư viện Google Client  
```php
composer require laravel/socialite
composer require google/apiclient
cd   laravel-drive 
php  artisan  make : auth 
```
### Create Google Drive Application

Để sử dụng được api của google. Bạn cần tạo 1 app Id, và key để sử dụng nó. 

Cáh tạo bạn có thể truy cập vào Google Developers Console đường link sau và làm theo hướng dẫn:

https://console.developers.google.com/flows/enableapi?apiid=drive

Bạn có thể tạo mới hoặc chọn một project của bạn đã tạo trước đó.

![](https://images.viblo.asia/43548564-3b16-4c30-b998-4ed97ce425a5.png)

![](https://images.viblo.asia/08866527-5d85-45d3-ab21-7a03a0ed3300.png)

![](https://images.viblo.asia/b8696214-6608-42aa-b74a-fd2c6f92525a.png)

![](https://images.viblo.asia/c5cc3247-1fb5-40fa-90cc-d377c1ff9526.png)

![](https://images.viblo.asia/e41121d1-02bc-4cf6-9b5f-642ff68639af.png)

![](https://images.viblo.asia/0c69db14-ae05-4d6a-b386-d76ec43c775d.png)

![](https://images.viblo.asia/e35c6cda-7fcc-4b0b-8c1c-aa17f647d0e6.png)

![](https://images.viblo.asia/50a98106-cd88-401c-bca5-aec82e92a0dc.png)

khi tạo xong các bước trên bạn sẽ nhận được
```
Project ID: neat-tube-217315
Client ID: xxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
Client secret: xxxxxxxxyyyyyyy
```

### Configure Google Service

Thêm cấu hình sau vào `config/serivces.php`

```
'google' => [
    'client_id' => env('GOOGLE_CLIENT_ID'),
    'project_id' => env('GOOGLE_APP_ID'),
    'auth_uri' => 'https://accounts.google.com/o/oauth2/auth',
    'token_uri' => 'https://accounts.google.com/o/oauth2/token',
    'auth_provider_x509_cert_url' => 'https://www.googleapis.com/oauth2/v1/certs',
    'client_secret' => env('GOOGLE_CLIENT_SECRET'),
    'redirect' => env('GOOGLE_REDIRECT'),
    'redirect_uris' => [env('GOOGLE_REDIRECT')],
]
```

Mở file ` .env` và thêm code sau:

```
GOOGLE_APP_ID=project-id
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
GOOGLE_REDIRECT='http://127.0.0.1:8000/login/google/callback'
```

### Add route: `app/routes/web.php`
```php
Route::get ('/login/google' , 'Auth\LoginController@redirectToGoogleProvider' ) ; 

Route :: get ( 'login/google/callback' ,'Auth\LoginController@handleProviderGoogleCallback') ;
 ```
 
Định nghĩa 2 phương thức sau trong `LoginController.php`

```php
public function redirectToGoogleProvider() 
 { 
	 $parameters = ['access_type' => 'offline' ] ; 
	 return Socialite::driver('google' )->scopes ( [ "https://www.googleapis.com/auth/drive" ] )->with( $parameters )->redirect () ; 
 } 
 
 public function handleProviderGoogleCallback() 
 { 
	 $auth_user   = Socialite::driver('google')->user () ; 
	 $user   =   User::updateOrCreate(['email' =>auth_user -> email] , [ 'refresh_token'  =>  $auth_user -> token , 'name'  => $auth_user -> name ] ) ; 
	 Auth:: login ($user , true ) ; 
	 return   redirect() -> to ('/' ) ;   // Redirect to a secure page 
 } 
 ```
 
*  Phương thức `redirectToGoogleProvider()` có chức năng để yêu cầu  user permissions
 
*  Phương thức `handleProviderGoogleCallback()` có chức năng tạo một user mới nếu nó k tồn tại, nếu nó tồn tại thì update `refresh_token` của user đó. Bạn cần thêm trường refresh_tocken vào bảng users nếu nó chưa có.

```php
 public   function   up ( ) 
 { 
	 Schema:: create ( 'users' ,   function   ( Blueprint   $table ) { 
		 $table -> increments ( 'id' ) ; 
		 $table -> string ( 'name' ) ; 
		 $table -> string ( 'email' ) -> unique ( ) ; 
		 $table -> string ( 'password' ) -> nullable ( ) ; 
		 $table -> string ( 'refresh_token' ) ; 
		 $table -> rememberToken ( ) ; 
		 $table -> timestamps ( ) ; 
	 } ) ; 
 } 
 ```
 
 ### Create GoogleServiceProvider

```php
 namespace   App \ Providers ; 
 
 use   Google_Client ; 
 use   Illuminate \ Support \ Facades \ Storage ; 
 use   Illuminate \ Support \ ServiceProvider ; 
 
 class   GoogleClientProvider   extends   ServiceProvider 
 { 
     public   function   boot ( ) 
     { 
 
     } 
 
     public   function   register ( ) 
     { 
         $this -> app -> singleton ( Google_Client:: class ,   function   ( $app )   { 
             $client   =   new   Google_Client ( ) ; 
             Storage:: disk ( 'local' ) -> put ( 'client_secret.json' ,   json_encode ( [ 
                 'web'   = >   config ( 'services.google' ) 
             ] ) ) ; 
             $client -> setAuthConfig ( Storage:: path ( 'client_secret.json' ) ) ; 
             return   $client ; 
         } ) ; 
     } 
 } 
 
 ```
 
 ### Add route
 
 ```php
 Route::get('/drive', 'DriveController@getDrive') ;   // retreive folders 
 
 Route::get('/drive/upload', 'DriveController@uploadFile');   // File upload form 
 
 Route:: post('/drive/upload','DriveController@uploadFile') ;   // Upload file to Drive from Form 
 
 Route::get('/drive/create','DriveController@create' ;   // Upload file to Drive from Storage 
 
 Route::get ('/drive/delete/{id}','DriveController@deleteFile') ;   // Delete file or folder 
 ```
 
 ### Create DriveController 
 
 ```php
  class   DriveController   extends   Controller 
 { 
     private   $drive ; 
     public  function __construct ( Google_Client   $client ) 
     { 
         $this -> middleware ( function($request ,   $next )   use   ( $client )   { 
             $client -> refreshToken ( Auth:: user ( ) -> refresh_token ) ; 
             $this -> drive   =   new   Google_Service_Drive ( $client ) ; 
             return   $next( $request ) ; 
         } ) ; 
     } 
 
     public   function   getDrive ( ) { 
         // param root  thư mục gốc trên  google drive
         $this -> ListFolders ( 'root' ) ; 
     } 
 
     public   function   ListFolders ( $id ) { 
 
         $query   =   "mimeType='application/vnd.google-apps.folder' and '" . $id . "' in parents and trashed=false" ; 
 
         $optParams   =   [ 
             'fields'   = >   'files(id, name)' , 
             'q'   = >   $query 
         ] ; 
         
         $results   =   $this -> drive -> files -> listFiles ( $optParams ) ; 
 
         if   ( count ( $results -> getFiles ())  ==   0 )   { 
             print   "No files found.\n" ; 
         }   else   { 
             print   "Files:\n" ; 
             foreach   ( $results -> getFiles()   as   $file )   { 
                 dump ( $file -> getName() ,   $file -> getID() ) ; 
             } 
         } 
     } 
 
     function   uploadFile ( Request   $request ) { 
         if ( $request -> isMethod ( 'GET' ) ) { 
             return   view ( 'upload' ) ; 
         } else { 
             $this -> createFile ( $request -> file ( 'file' ) ) ; 
         } 
     } 
 
     function   createStorageFile ( $storage_path ) { 
         $this -> createFile ( $storage_path ) ; 
     } 
 
     function   createFile ( $file ,   $parent_id   =   null ) { 
         $name   =   gettype ( $file )   ===   'object'   ?   $file -> getClientOriginalName ( )   :   $file ; 
         $fileMetadata   =   new   Google_Service_Drive_DriveFile ( [ 
             'name'   = >   $name , 
             'parent'   = >   $parent_id   ?   $parent_id   :   'root' 
         ] ) ; 
 
         $content   =   gettype ( $file )   ===   'object'   ?    File:: get ( $file )   :   Storage:: get ( $file ) ; 
         $mimeType   =   gettype ( $file )   ===   'object'   ?   File:: mimeType ( $file )   :   Storage:: mimeType ( $file ) ; 
 
         $file   =   $this -> drive -> files -> create ( $fileMetadata ,   [ 
             'data'   = >   $content , 
             'mimeType'   = >   $mimeType , 
             'uploadType'   = >   'multipart' , 
             'fields'   = >   'id' 
         ] ) ; 
 
         dd ( $file -> id ) ; 
     } 
 
     function   deleteFileOrFolder ( $id ) { 
         try   { 
             $this -> drive -> files -> delete ( $id ) ; 
         }   catch   ( Exception   $e )   { 
             return   false ; 
         } 
     } 
 
     function   createFolder ( $folder_name ) { 
         $folder_meta   =   new   Google_Service_Drive_DriveFile ( array ( 
             'name'   = >   $folder_name , 
             'mimeType'   = >   'application/vnd.google-apps.folder' ) ) ; 
         $folder   =   $this -> drive -> files -> create ( $folder_meta ,   array ( 
             'fields'   = >   'id' ) ) ; 
         return   $folder -> id ; 
     } 
 } 
 ```
 
 Trên đây mình đã giới thiệu qua 1 số phương thức cũng như cách sử dụng, bạn có thể truy cập vào https://developers.google.com/drive/api/v3/about-sdk để tham khảo chi tiết hơn. Cảm ơn bạn đã đọc và theo dõi.
 
 Nguồn tham khảo: https://quantizd.com