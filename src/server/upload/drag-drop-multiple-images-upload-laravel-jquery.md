Demo
![](https://images.viblo.asia/82961f0f-6fa9-4a98-9923-8b4c050eb3ef.png)

Các bước thực hiện

### Step 1: Install Laravel.

```
composer create-project laravel/laravel multipleimages --prefer-dist
```
Bạn tự cài đặt cấu hình, connect db.... nhé
##### Create migration
```php
php artisan make:migration create_images_table
```
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->string('filename');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
}

```
Next
``` php
php artisan migrate
```
#### Step 2: Create Model & Controller
```
php artisan make:model Image
```
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'filename',
    ];
}

```
```php
php artisan make:controller UploadController
```

```php
<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class UploadController extends Controller
{
    //
    public function create()
    {
        return view('admin.product.dragdrop');

    }

    public function store(Request $request)
    {
        if ($request->ajax()) {
            try {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = time() . '.' . $extension;
                $file->move(public_path('uploads'), $fileName);
                // set data
                $image = new Image;
                $image->filename = $fileName;
                $image->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Upload Successful',
                    'url' => URL::to('uploads') . '/' . $fileName
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Upload failed'
                ]);
            }
        }
    }
}


```

### Step 3: Define routes in the web.php file.

```
Route::get('drag-drop-images', 'UploadController@create');
Route::post('drag-drop-images', 'UploadController@store');
```
### Step 4: Create blade
path: resource/view/admin/product/dragdrop.blade.php

```html
<section class="body">
    <div class="inner-wrapper">
        <section role="main" class="content-body" style="padding: 20px;">
            <div class="images_layout">
                <div class="images_chk">
                    <div class="images_chk_list">
                    </div>
                </div>
                <div class="images_dropbox" id="dragAndDropFiles">
                    Drag and Drop Images Here
                </div>
            </div>
        </section>
    </div>
</section>


<!-- Modal -->
<div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="imageModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modal-dialog-center">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form name="formImageUpload" id="formImageUpload" enctype="multipart/form-data">
                <div class="modal-body ">
                    <div class="modal_body_inner" style="text-align: center">
                        Are you sure you want to submit this form?
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="spinner" id="img_spin"></div>
                    <div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" id="submitHandler">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
```


### Step 5: Add javascript
Link:
```javascript
<script
        src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
        crossorigin="anonymous"></script>
<link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
```
```js
<script>

        $(document).ready(function() {

            initImageUpload();

        });


        function uploadImage(config) {

            this.config = config;
            this.items = "";
            this.all = [];
            var self = this;

            uploadImage.prototype._init = function() {

                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    document.getElementById(this.config.dragArea).addEventListener("dragover", function(e) {
                        $(this).css('background', 'antiquewhite');
                        e.stopPropagation();
                        e.preventDefault();
                    }, false);
                    document.getElementById(this.config.dragArea).addEventListener("drop", this._dropFiles, false);
                    document.getElementById(this.config.form).addEventListener("submit", this._submit, false);
                } else
                    console.log("Browser supports failed");
            }

            uploadImage.prototype._submit = function(e) {

                e.stopPropagation();
                e.preventDefault();

                $("#img_spin").addClass('is-active');
                self._startUpload();
            }

            uploadImage.prototype._preview = function(data) {

                this.items = data;
                if (this.items.length) {
                    var html = "";
                    var uId = "";
                    for (var i = 0; i < this.items.length; i++) {
                        var sampleIcon = '<i class="fa fa-image"></i> ';
                        var errorClass = "";
                        if (typeof this.items[i] != undefined) {
                            if (self._validate(this.items[i].type) <= 0) {
                                sampleIcon = '<i class="glyphicon glyphicon-minus-sign"></i>';
                                errorClass = " invalid";
                            }
                            html += '<div class="dfiles' + errorClass + '" rel="' + uId + '"><h5>' + sampleIcon + this.items[i].name + '</h5></div>';
                        }
                    }
                    $("#dragAndDropFiles").append(html);
                }
            }

            uploadImage.prototype._read = function(evt) {

                if (evt.target.files) {
                    self._preview(evt.target.files);
                    self.all.push(evt.target.files);
                } else
                    console.log("Failed file reading");
            }

            uploadImage.prototype._validate = function(format) {

                var arr = this.config.support.split(",");

                return arr.indexOf(format);
            }

            uploadImage.prototype._dropFiles = function(e) {

                e.stopPropagation();
                e.preventDefault();
                // reset
                self.all = [];
                $(this).css('background', 'white');
                var files = e.dataTransfer.files;
                console.log(files);
                if (files.length) {
                    for (var i=0; i < files.length; i++) {
                        // check file type
                        if (self._validate(files[i].type) <= 0) {
                            swal("error", "Uploaded file (" + files[i].name + ") is not a valid image. Only JPG and PNG files are allowed", "error");
                            return false;
                        }
                    }
                }
                // preview file
                self._preview(e.dataTransfer.files);
                // push file to array
                self.all.push(e.dataTransfer.files);
                $('#imageModal').modal({backdrop: 'static', keyboard: false});
            }

            uploadImage.prototype._uploader = function(file, f) {

                if (typeof file[f] != undefined && self._validate(file[f].type) > 0) {
                    // set data
                    var data = new FormData();
                    data.append('file', file[f]);
                    data.append('_token', '<?php echo csrf_token() ?>');
                    $.ajax({
                        type: "POST",
                        url: this.config.uploadUrl,
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(rponse) {
                            self._formReset();
                            $(".dfiles").hide();
                            $('#imageModal').modal('hide');
                            self._appendImage(rponse);

                            if (f + 1 < file.length) {
                                self._uploader(file, f + 1);
                            }
                        },
                        error: function(jqXhr, textStatus, errorThrown) {
                            console.log('Uploaded failed')
                        }
                    });
                } else
                    console.log("Invalid file format - " + file[f].name);
            }

            uploadImage.prototype._startUpload = function() {
                if (this.all.length) {
                    for (var k = 0; k < this.all.length; k++) {
                        var file = this.all[k];
                        this._uploader(file, 0);
                    }
                }
                // set empty
                self.all = [];
            }

            uploadImage.prototype._appendImage = function (rponse) {

                var img = '';
                img = '<label id="img_id_' + rponse.img_id + '" class="item_img">';
                img += '<input type="checkbox" class="imgCheckbox" name="itemImages[]"  value="' + rponse.img_id + '">';
                img += '<div class="images_demo">';
                img += '<img class="images_demo" src="' + rponse.url + '">';
                img += '</div>';
                img += '</label>';
                $('.images_chk_list').append(img).slideDown(400);
            }

            uploadImage.prototype._formReset = function() {
                $("#img_spin").removeClass('is-active');
            }

            this._init();
        }

        function initImageUpload() {

            var url = '/drag-drop-images';
            var config = {
                support: "image/jpg,image/png,image/jpeg",
                form: "formImageUpload",
                dragArea: "dragAndDropFiles",
                uploadUrl: url 
            }
            new uploadImage(config);
        }

        // if close Modal
        $('#imageModal').on('hidden.bs.modal', function () {

            $('.dfiles').remove();
            $("#img_spin").removeClass('is-active');
        });

    </script>
```


### Demo

![](https://images.viblo.asia/b990af64-3076-4589-821e-be127d799ed7.gif)