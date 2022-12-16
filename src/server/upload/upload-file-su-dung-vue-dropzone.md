## **I. Chuẩn bị** 
- Cài đặt Vue sử dụng Vue CLI bằng một trong 2 câu lệnh sau:
    ```
    npm install -g @vue/cli
         or
    yarn global add @vue/cli
    ```
- Nếu gặp lỗi bạn hay thử với quyền root.
- Tạo project với scaffold dựng sẵn:
    ```
    vue create vuedropzone
    ```
    ![](https://images.viblo.asia/b2359c02-8215-4e0c-8552-8d1b4bf93887.png)
- Di chuyển vào thư mục gốc và mở source code bắng sublime text:
    ```
    cd vuedropzone
    subl .
    ```
- Cài đặt vue-dropzone bằng một trong hai câu lệnh sau:
    ```
    yarn add vue2-dropzone
    or    
    npm install vue2-dropzone
    ```
- Ta cần import css cho package trên bằng cách update file **src/man.js**:
    ```
    import Vue from 'vue'
    import App from './App.vue'

    Vue.config.productionTip = false

    new Vue({
      render: h => h(App)
    }).$mount('#app')

    import 'vue2-dropzone/dist/vue2Dropzone.css'
    ```
- Trong trường hợp file css không hoạt động, ta cũng có thể import bằng tay vào file **src/App.vue** như sau:
    ```HTML
    <style lang="css">
      @import './assets/vue2Dropzone.css';
    </style>
    ```
- File *vue2Dropzone.css* tải về từ [đây](https://raw.githubusercontent.com/rowanwins/vue-dropzone/master/dist/vue2Dropzone.css)

## **II. Vue component**
- Tạo file **FileUpload.vue** trong thư mục **src/components/** với nội dung:
    ```HTML
    // FileUpload.vue

    <template>
      <div id="app">
        <vue-dropzone id="upload" :options="config"></vue-dropzone>
      </div>
    </template>

    <script>
    import vueDropzone from "vue2-dropzone";

    export default {
      data: () => ({
        config: {
          url: "https://your_url_uploadfile.com"
        }
      }),
      components: {
        vueDropzone
      }
    };
    </script>
    ```
- url ở đây chính là link post upload file, ta sẽ update ở phần dưới đây.
- Bây giờ ta sẽ gọi **FileUpload.vue** từ **App.vue** component:
    ```HTML
    // App.vue

    <template>
      <div id="app">
        <FileUpload />
      </div>
    </template>

    <script>
    import FileUpload from './components/FileUpload.vue'

    export default {
      name: 'app',
      components: {
        FileUpload
      }
    }
    </script>

    <style lang="css">
      @import './assets/vue2Dropzone.css';
    </style>
    ```
- Đến đây ta có thể khởi tạo server để test thử:
    ```
    npm run serve
    ```
- Truy cập vào đường link `http://localhost:8000` trên trình duyệt để xem kết quả.
    ![](https://images.viblo.asia/314c191d-aa6e-4f55-895e-848c0328061f.png)
- Tất nhiên là ta vẫn chưa thể upload file do url đang sai, phần dưới đây ta sẽ tạo ra url để upload file.
## **III. Server laravel**
- Install laravel5.6 sau đó chỉnh sửa file **.env** kết nối MySQL database.
- Tạo model *Image* cùng với migrate file:
   ```
   php artisan make:model Image -m
   ```
- Ta update thêm các trường vào file migrate như sau:
   ```PHP
   // create_images_table.php

    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image_name');
            $table->timestamps();
        });
    }
   ```
- Chạy câu lệnh sau để tạo database:
  ```
  php artisan migrate
  ```
- Ta cần cài đặt *laravel-cors* package để ngăn chặn lỗi `cross-site-allow-origin`:
  ```
  composer require barryvdh/laravel-cors
  ```
- Thêm provider vào **config/app.php**:
  ```PHP
  Barryvdh\Cors\ServiceProvider::class,
  ```
- Và thêm middleware vào file **app/Http/Kernel.php**:
     ```PHP
     // Kernel.php

    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \App\Http\Middleware\TrustProxies::class,
        \Barryvdh\Cors\HandleCors::class,
    ];
     ```
- Tạo controller *ImageController* sử dụng câu lệnh:
  ```
  php artisan make:controller ImageController
  ```
- Viết method *store* trong controller vừa được tạo ra:
     ```PHP
     // ImageController.php

    <?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Image;

    class ImageController extends Controller
    {
        public function store(Request $request)
        {
           if($request->file('file'))
           {
              $image = $request->file('file');
              $name = time().$image->getClientOriginalName();
              $image->move(public_path().'/images/', $name); 
            }

           $image= new Image();
           $image->image_name = $name;
           $image->save();

           return response()->json(['success' => 'You have successfully uploaded an image'], 200);
         }
    }
     ```
 - Trước đó ta cần tạo ra thư mục **images/** bên trong thư mục **pubblic/** để làm nơi lưu trữ ảnh upload lên.
 - Tạo route trong file **route/api.php**:
     ```PHP
     // api.php

    Route::post('image', 'ImageController@store');
     ```
 - Đến đây ta đã có url post upload file, ta cần update lại file **FileUpload.vue** như sau:
     ```HTML
    // FileUpload.vue

    <template>
      <div id="app">
        <vue-dropzone id="drop1" :options="config" @vdropzone-complete="afterComplete"></vue-dropzone>
      </div>
    </template>

    <script>
    import vueDropzone from "vue2-dropzone";

    export default {
      data: () => ({
        config: {
          url: "http://localhost:8000/api/image",

        }
      }),
      components: {
        vueDropzone
      },
      methods: {
        afterComplete(file) {
          console.log(file);
        }
      }
    };
    </script>
     ```
 - Bây giờ ta có thể khởi động lại server và upload ảnh thành công. Ảnh sẽ được lưu ở trong folder **public/images/** đồng database cũng sẽ được cập nhật.
 - Ngoài config *url: http://localhost:8000/api/image* là bắt buộc ta cũng có thể thêm một vài config khác như sau:
     ```JS
    export default {
      data: () => ({
        dropOptions: {
          url: "http://localhost:8000/api/image",
          maxFilesize: 5, // MB
          maxFiles: 5,
          chunking: true,
          chunkSize: 400, // Bytes
          thumbnailWidth: 100, // px
          thumbnailHeight: 100,
          addRemoveLinks: true
        }
      })
      // ...
    }
    ```

- Mình cũng đã tạo thành công và up source code lên github: [vue-dropzone](https://github.com/Giangnv2014/vuedropzone)

- Hy vọng bài viết sẽ giúp ích được bạn, nếu bạn có gặp khó khăn gì trong lúc thực hiện hãy liên hệ với mình hoặc tài liệu tham khảo bên dưới.
    
> **Tài liệu tham khảo**
> 
> [Vue File Upload Using vue-dropzone Tutorial ](https://appdividend.com/2018/04/18/vue-file-upload-using-vue-dropzone-tutorial/)