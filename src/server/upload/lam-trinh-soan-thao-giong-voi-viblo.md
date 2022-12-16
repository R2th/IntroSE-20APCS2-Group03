Chào các bạn, bài viết hôm nay mình sẽ chia sẻ với các bạn cách mình làm một editor(trình soạn thảo) giống với editor hiện tại của viblo. Editor của viblo sử dụng ngôn ngữ đánh dấu văn bản ***Markdown***
Chúng ta sẽ sử dụng 2 thư viện `SimpleMDE` và `vue2Dropzone`

- `SimpleMDE` để tạo trình soạn thảo với ngôn ngữ Markdown
- `vue2Dropzone` dùng để upload ảnh lên server

![](https://images.viblo.asia/84b7a759-8320-4ceb-bbb7-443e54758d7f.png)

Bên trên là hình ảnh trình soạn thảo của viblo, và điều cần quan tâm nhất là phần sidebar của trình soạn thảo, đây là nơi tập trung các chức năng, và chúng ta sẽ làm một trình soạn thảo với chức năng tương tự như trình soạn thảo của viblo

Nhìn sidebar có thể nhiều chức năng, nhưng hầu hết là có sẵn của  `SimpleMDE` rồi, chức năng cần quan tâm là insert ảnh và insert link. Đây là 2 chức năng mà viblo đã custom lại để thuận tiện hơn cho người dùng.

Nói tóm lại thì  nội dung kiến thức của bài sẽ là customize thư viện  `SimpleMDE` và cách sử dụng `vue2Dropzone`  để updoad ảnh nhé.


# Api updload ảnh
Đầu tiên, ta cần chuẩn bị api để upload ảnh, cái này thì mình làm đơn giản thôi

Tạo file migrate
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUploadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uploads', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('path');
            $table->string('memo')->nullable;
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
        Schema::dropIfExists('uploads');
    }
}

```
file `Controllers\Api\FileUploadController.php`
```php
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Api\Upload;

class FileUploadController extends Controller
{
    public function __construct(Upload $upload) {
        $this->upload = $upload;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $files = $this->upload->orderBy('id', 'desc')->paginate(18);

        return response()->json($files);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $path = '/uploads/images/';
        if($request->file('file'))
        {
            $image = $request->file('file');
            $name = time().$image->hashName();
            $image->move(public_path() . $path, $name); 
        }

        $image= $this->upload;
        $image->name = $path . $name;
        $image->path = $path;
        $image->memo = 'upload in editer';
        $image->save();

       return response()->json($image);
    }
}



```
`router`
```php
Route::group(['namespace' => 'Api'], function(){
    Route::resource('upload/image', 'FileUploadController');
});
```
# Cấu hình SimpleMDE và xử lý upload ảnh 
## Cấu hình SimpleMDE
Để có được các chức năng và bố trí giống Viblo ta cần cấu hình như sau
```javascript
this.simplemde = new SimpleMDE({
                element: document.getElementById("markdown"),
                autofocus: true,
                promptURLs: true,
                toolbar: [
                    { name: "bold", action: SimpleMDE.toggleBold, className: "fa fa-bold", title: "Bold", },
                    { name: "italic", action: SimpleMDE.toggleStrikethrough, className: "fa fa-strikethrough", title: "Strikethrough", },
                    { name: "strikethrough", action: SimpleMDE.toggleItalic, className: "fa fa-italic", title: "Italic", },
                    { name: "heading-1", action: SimpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Bold",},
                    { name: "heading-2", action: SimpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Bold",},
                    { name: "heading-3", action: SimpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Bold",},
                    "|",
                    { name: "code", action: SimpleMDE.toggleCodeBlock, className: "fa fa-code", title: "Code", },
                    { name: "quote", action: SimpleMDE.toggleBlockquote, className: "fa fa-quote-left", title: "Quote", },
                    { name: "unordered-list", action: SimpleMDE.toggleUnorderedList, className: "fa fa-list-ul", title: "Generic List", },
                    { name: "ordered-list", action: SimpleMDE.toggleOrderedList, className: "fa fa-list-ol", title: "Numbered List", },
                    { name: "table", action: SimpleMDE.drawTable, className: "fa fa-table", title: "Insert Table", },
                    { name: "horizontal-rule", action: SimpleMDE.drawHorizontalRule, className: "fa fa-minus", title: "Insert Horizontal Line", },
                    { name: "clean-block", action: SimpleMDE.cleanBlock, className: "fa fa-eraser fa-clean-block", title: "Clean block", },
                    "|",
                    {
                        name: "link",
                        action: () => {
                            //show modal insert link
                            this.modalLink = true;
                        },
                        className: "fa fa-link no-mobile",
                        title: "Create Link",},
                    {
                        name: "image",
                        action: () => {
                            //show modal và get immage từ server lưu vào store
                            this.modalImage = true;
                            this.$store.dispatch('getFiles');
                        },
                        className: "fa fa-image",
                        title: "Upload Image",
                    },
                    "|",
                    { name: "preview", action: SimpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview",},
                    { name: "side-by-side", action: SimpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side",},
                    { name: "fullscreen", action: SimpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen",},
                    "|",
                    { name: "undo", action: SimpleMDE.togglePreview, className: "fa fa-undo no-disable", title: "Undo",},
                    { name: "redo", action: SimpleMDE.togglePreview, className: "fa fa-repeat no-disable", title: "Redo",},
                    "|",
                    {
                        name: "Help",
                        action: () => alert('Help'),
                        className: "fa fa-question-circle",
                        title: "Help",},
	            ]
            });
```

Tiếp theo cần sử lý insert ảnh và link vào nội dung soạn thảo, đây là phần khó nhất, phải mất thời gian tìm hiểu mới có thể làm cho đúng. Phần code xử lý mình sẽ để dưới cùng nội dung file đầy đủ luôn. 
file đầy đủ `resources\assets\js\admin\views\markdown\index.vue`
```javascript
<template>
    <div>
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
            <b-input v-model="title" placeholder="title"/>
            <br>
            <textarea name="markdown" id="markdown"></textarea>
            <b-modal title="Insert Image" class="modal-white" v-model="modalImage" ok-variant="danger" ok-only ok-title="Cancel">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="fileAdded"></vue-dropzone>
                Your image
                <div class="img-container">
                    <img v-for="item in files.data" :src="item.name" :alt="item.memo" :key="item.id" style="width:50px" @click="addImage(item.name)" class="img">
                </div>
                <b-pagination align="center" hide-goto-end-buttons size="md" :total-rows="files.total"  :per-page="files.per_page" @change="changePageImg"></b-pagination>
            </b-modal>
            <b-modal title="Insert Link" class="modal-white" v-model="modalLink" ok-variant="danger" @ok="addUrl" @cancel="cancelLink" cancel-title="Cancel" ok-title="Instert">
                <label v-show="linkErr" class="text-errors">Doesn't look like a valid URL</label>
                <input type="text" class="form-control" v-model="link" v-bind:class="{ errors: linkErr }">
            </b-modal>
        </div>
        <div>
            <b-button variant="success" @click="savePost">Save</b-button>
        </div>
    </div>
    
</template>
<script>
    import { callApiAdd } from "../../api/post";
    import SimpleMDE from "simplemde";
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    export default {
        name: 'Markdown',
        components: {
            vueDropzone: vue2Dropzone
        },

        data() {
            return {
                modalImage: false,
                modalLink: false,
                linkErr: false,
                simplemde: null,
                link: null,
                title: null,
            }
        },

        mounted() {
            this.simplemde = new SimpleMDE({
                element: document.getElementById("markdown"),
                autofocus: true,
                promptURLs: true,
                toolbar: [
                    { name: "bold", action: SimpleMDE.toggleBold, className: "fa fa-bold", title: "Bold", },
                    { name: "italic", action: SimpleMDE.toggleStrikethrough, className: "fa fa-strikethrough", title: "Strikethrough", },
                    { name: "strikethrough", action: SimpleMDE.toggleItalic, className: "fa fa-italic", title: "Italic", },
                    { name: "heading-1", action: SimpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Bold",},
                    { name: "heading-2", action: SimpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Bold",},
                    { name: "heading-3", action: SimpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Bold",},
                    "|",
                    { name: "code", action: SimpleMDE.toggleCodeBlock, className: "fa fa-code", title: "Code", },
                    { name: "quote", action: SimpleMDE.toggleBlockquote, className: "fa fa-quote-left", title: "Quote", },
                    { name: "unordered-list", action: SimpleMDE.toggleUnorderedList, className: "fa fa-list-ul", title: "Generic List", },
                    { name: "ordered-list", action: SimpleMDE.toggleOrderedList, className: "fa fa-list-ol", title: "Numbered List", },
                    { name: "table", action: SimpleMDE.drawTable, className: "fa fa-table", title: "Insert Table", },
                    { name: "horizontal-rule", action: SimpleMDE.drawHorizontalRule, className: "fa fa-minus", title: "Insert Horizontal Line", },
                    { name: "clean-block", action: SimpleMDE.cleanBlock, className: "fa fa-eraser fa-clean-block", title: "Clean block", },
                    "|",
                    {
                        name: "link",
                        action: () => {
                            this.modalLink = true;
                        },
                        className: "fa fa-link no-mobile",
                        title: "Create Link",},
                    {
                        name: "image",
                        action: () => {
                            this.modalImage = true;
                            this.$store.dispatch('getFiles');
                        },
                        className: "fa fa-image",
                        title: "Upload Image",
                    },
                    "|",
                    { name: "preview", action: SimpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview",},
                    { name: "side-by-side", action: SimpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side",},
                    { name: "fullscreen", action: SimpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen",},
                    "|",
                    { name: "undo", action: SimpleMDE.togglePreview, className: "fa fa-undo no-disable", title: "Undo",},
                    { name: "redo", action: SimpleMDE.togglePreview, className: "fa fa-repeat no-disable", title: "Redo",},
                    "|",
                    {
                        name: "Help",
                        action: () => alert('Help'),
                        className: "fa fa-question-circle",
                        title: "Help",},
	            ]
            });
        },
        methods: {
            //add image vào list 
            fileAdded(file, response, ) {
                this.$store.dispatch('addFile', response);
                this.$refs.myVueDropzone.removeFile(file);
            },
            // insert image vào nội dung soạn thảo
            addImage(url) {
                let cm = this.simplemde.codemirror
                cm.replaceSelection("![](" + url + ")");
                this.modalImage = false;
                setTimeout(function() {
                    cm.focus();
                    
                }, 0);
            },
            //insert link vào nội dung soạn thảo
            addUrl(e) {
                e.preventDefault()
                if (this.validateUrl()) {
                    window.prompt = () => {
                        return this.link;
                    }
                    let cm = this.simplemde.codemirror;
                    SimpleMDE.drawLink(this.simplemde)
                    setTimeout(function() {
                        cm.focus();
                        
                    }, 0);
                    this.modalLink = false;
                    this.linkErr = false;
                    this.link = false;
                } else {
                    this.linkErr = true;
                }
                
            },
            cancelLink() {
                this.linkErr = false;
                this.link = null;
            },
            validateUrl() {
                if (!this.link) {
                    return false;
                }
                return this.link.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
            },
            async savePost() {
                let result = await callApiAdd(this.post);
            },
            changePageImg(page) {
                this.$store.dispatch('getFiles', {page: page});
            }
        },
        computed: {
            //config vue2Dropzone
            dropzoneOptions() {
                let token = JSON.parse(localStorage.getItem('token'));
                return {
                    url: 'api/upload/image',
                    headers: { "Authorization": token.type + ' ' + token.token },
                    thumbnailWidth: 75,
                    thumbnailHeight: 75,
                    dictDefaultMessage: "<i class='fa fa-cloud-upload fa-3x'></i></br>  Drag and drop files here or click to upload",
                    maxFilesize: 2,
                    addRemoveLinks: true,
                }
            },
            files() {
                return this.$store.state.file.files;
            },
            post () {
                return {
                    content: this.simplemde.value(),
                    title: this.title
                };
            }
        }
    }
</script>

<style>
    .vue-dropzone {
        border: 2px dashed #dbe3e8;
    }

    .modal-dialog {
        max-width: 475px;
    }

    .img {
        margin: 10px;
        cursor: pointer;
    }

    .img-container{
        max-height: 250px;
        overflow: auto;
    }

    .pagination {
        margin-bottom: 0px;
    }

    header, footer {
        border: none !important;
    }

    .errors {
        border: 1px solid red;
    }

    .text-errors {
        color: red;
    }
</style>

```
Kết quả thu được 
![](https://images.viblo.asia/d5ea22f2-6156-443b-a357-698aaccce17b.gif)

# Kết
Cũng khá giống rồi, chức năng chính là insert ảnh và link hoạt động tốt. Bài viết chỉ đề cập đến cách đơn giản nhất để có thể có được chức năng tương tự như viblo thôi.  Viblo là ứng dụng phục vụ hàng triệu người dùng nên việc xử lý sẽ khác và tối ưu rất nhiều

Code có vẻ khó hiểu, các bạn có thể tham khảo cả project tại đây để dễ hiểu hơn nhé

Link github: https://github.com/ththth0303/laravel-vue-coreui/tree/editor