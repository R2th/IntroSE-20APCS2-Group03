# Gantt Chart là gì?

> Gantt là sơ đồ ngang, dùng để trình bày các công việc và sự kiện theo thời gian. Sơ đồ sẽ gồm 2 phần chính: trục tung thể hiện tên các công việc và trục hoành thể hiện các mốc thời gian cho những công việc ấy. Nhìn vào một sơ đồ Gantt, bạn dễ dàng nắm bắt được các thông tin của từng đầu công việc và của cả dự án.
> 
> 
> Chính vì cách bố trí thông tin đơn giản mà lại rõ ràng, trực quan nên nó đã trở thành công cụ hữu ích để lập kế hoạch, lên timeline thực hiện hoặc quản lý tiến độ dự án.
> 

Một ví dụ đơn giản nhất về Gantt Chart là Redmine. Chúng ta có lẽ đã quá quen thuộc với redmine khi làm việc các dự án trên công ty.  Trên redmine có support sẵn sơ đồ Gantt. Các bạn có thể thử mở dự án của mình ra để xem nhé. Dưới đây là một ví dụ về Gantt trên Redmine.
![](https://images.viblo.asia/4ea42ebd-ca43-4962-b3de-b1c36f8804a4.jpg)

Để tích hợp Gantt Chart vào project ta có khá nhiều thư viện nhưng trong phạm vi bài viết này mình sẽ sử dụng thư viện [dHtmlx Gantt](https://dhtmlx.com/docs/products/dhtmlxGantt/). Đây là một thư viện mã nguồn mở với và đồng thời cũng có phiên bản trả phí gồm có các chức năng cao cấp hơn.
# Xây dựng cơ sở dữ liệu
Một CSDL cơ bản nhất cho việc lưu trừ sơ đồ Gantt ta có các bảng sau:
* Tasks: lưu trữ thông tin các đầu công việc, thời gian bắt đầu, thời gian kết thúc, tiến độ theo %...
* Links: lưu trữ kết nối giữa các đầu việc

![](https://images.viblo.asia/9a4a67c0-c37f-4440-9e88-5d113dfd4c36.jpg)

Ta tạo luôn migration trong project Laravel
```bash 
php artisan make:model GanttTask -m
```
```php
<?php
 
namespace App;
 
use Illuminate\Database\Eloquent\Model;
 
class GanttTask extends Model
{
    protected $appends = ["open"];
 
    public function getOpenAttribute(){
        return true;
    }
}
```
```php
<?php
 
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
 
class CreateGanttTasksTable extends Migration
{
    public function up()
    {
        Schema::create('gantt_tasks', function (Blueprint $table){
            $table->increments('id');
            $table->string('text');
            $table->integer('duration');
            $table->float('progress');
            $table->dateTime('start_date');
            $table->integer('parent');
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
```

```bash 
php artisan make:model GanttLink -m 
```
```php
<?php
 
namespace App;
 
use Illuminate\Database\Eloquent\Model;
 
class GanttLink extends Model
{
}
```
```php
<?php
 
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
 
class CreateGanttLinksTable extends Migration
{
    public function up()
    {
        Schema::create('gantt_links', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->integer('source');
            $table->integer('target');
            $table->timestamps();
        });
    }
 
    public function down()
    {
        Schema::dropIfExists('links');
    }
}
```


# Xây dựng API lưu trữ dữ liệu phía backend

Tiếp theo, ta sẽ xây dựng API để lưu trữ dữ liệu mỗi khi các thao tác được gửi lên từ phía client.
Ta thêm 2 controller tương ứng với 2 model đã tạo ở trên.

```php
<?php
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\GanttTask;
 
class GanttTaskController extends Controller
{
    public function store(Request $request){
 
        $task = new GanttTask();
 
        $task->text = $request->text;
        $task->start_date = $request->start_date;
        $task->duration = $request->duration;
        $task->progress = $request->has("progress") ? $request->progress : 0;
        $task->parent = $request->parent;
 
        $task->save();
 
        return response()->json([
            "action"=> "inserted",
            "tid" => $task->id
        ]);
    }
 
    public function update($id, Request $request){
        $task = GanttTask::find($id);
 
        $task->text = $request->text;
        $task->start_date = $request->start_date;
        $task->duration = $request->duration;
        $task->progress = $request->has("progress") ? $request->progress : 0;
        $task->parent = $request->parent;
 
        $task->save();
 
        return response()->json([
            "action"=> "updated"
        ]);
    }
 
    public function destroy($id){
        $task = GanttTask::find($id);
        $task->delete();
 
        return response()->json([
            "action"=> "deleted"
        ]);
    }
}
```

Ở controller này ta có 3 hàm cơ bản để lưu trữ và cập nhật dữ liệu gồm: thêm, sửa, xóa. 
Thêm route tương ứng:

```php
<?php
Route::resource('tasks', 'GanttTaskController');
```

Tiếp tục thêm controller cho Link:
```php
<?php
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\GanttLink;
 
class GanttLinkController extends Controller
{
    public function store(Request $request){
        $link = new GanttLink();
 
        $link->type = $request->type;
        $link->source = $request->source;
        $link->target = $request->target;
 
        $link->save();
 
        return response()->json([
            "action"=> "inserted",
            "tid" => $link->id
        ]);
    }
 
    public function update($id, Request $request){
        $link = GanttLink::find($id);
 
        $link->type = $request->type;
        $link->source = $request->source;
        $link->target = $request->target;
 
        $link->save();
 
        return response()->json([
            "action"=> "updated"
        ]);
    }
 
    public function destroy($id){
        $link = GanttLink::find($id);
        $link->delete();
 
        return response()->json([
            "action"=> "deleted"
        ]);
    }
}
```

Routes:
```php
Route::resource('links', 'GanttLinkController');
```

# Tích hợp dHtmlx vào Frontend VueJS
Project mình dùng demo lần này mình có sử dụng VueJS nên mình sẽ hướng đến việc viết Gantt thành component để tiện sử dụng lúc nào cần thiết. Đầu tiên để cài đặt dhtmlx ta cài đặt qua npm:
```bash
npm install dhtmlx-gantt --save
```

Tạo component Gantt:
```javascript
<template>
  <div ref="gantt" style="height: 70vh;, width: 100%" />
</template>

<script>
import 'dhtmlx-gantt';

import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';
import { fileDragAndDrop } from '@/snippets/dhx_file_dnd.js';

export default {
  name: 'Gantt',
  data() {
    return {
      dp: null,
      fileDnD: null,
    };
  },
  computed: {
    api_url() {
      return '/api/gantt;
    }
  },

  mounted () {
    //this.$_initGanttEvents();
    gantt.config.fit_tasks = true;
    gantt.config.grid_width = 500;
    gantt.config.columns = [
      { name: 'id', label: 'No', align:'center', width:35, template: function (task) {
        return task.$index + 1;
      }},
      { name:'text', label: 'Tên công việc', tree:true, width:'*'},
      { name:'start_date', label: 'Start', align:'center', width:80},
      { name:'duration', align:'center', width:70 },
      { name:'add', width:44 }
    ];

    gantt.locale.labels['section_progress'] = 'Progress';
    gantt.config.lightbox.sections = [
      {name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true},
      {
        name: 'progress', height: 22, map_to: 'progress', type: 'select', options: [
          {key: '0', label: 'Not started'},
          {key: '0.1', label: '10%'},
          {key: '0.2', label: '20%'},
          {key: '0.3', label: '30%'},
          {key: '0.4', label: '40%'},
          {key: '0.5', label: '50%'},
          {key: '0.6', label: '60%'},
          {key: '0.7', label: '70%'},
          {key: '0.8', label: '80%'},
          {key: '0.9', label: '90%'},
          {key: '1', label: 'Complete'}
        ]
      },
      {name: 'time', type: 'duration', map_to: 'auto', height: 50}
    ];

    gantt.config.date_grid = '%d/%m/%Y';
    gantt.config.date_format = '%Y-%m-%d %H:%i';

    gantt.config.scale_height = 50;
    gantt.config.scales = [
      {unit: 'month', step: 1, format: 'Tháng %m, %Y'},
      {unit: 'day', step: 1, format: '%j'}
    ];
  gantt.init(this.$refs.gantt);
  gantt.clearAll();
  gantt.ajax.get({
    url: this.api_url,
    headers: {
      'Authorization': 'Bearer ' + window.token
    }
  }).then(function (xhr) {
    gantt.parse(xhr.responseText);
  });
  this.dp = gantt.createDataProcessor({
    url: this.api_url,
    mode:'REST',
  });
  this.dp.setTransactionMode({
    headers: {
      'Authorization': 'Bearer ' + window.token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, true);

  this.fileDnD = fileDragAndDrop();
  this.fileDnD.init(gantt.$container);

  this.initImportFromMSProject();
    

    var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
    var markerId = gantt.addMarker({
      start_date: new Date(),
      css: 'today',
      text: 'Today',
      title:date_to_str( new Date())
    });

  },
  beforeDestroy() {
    if (this.dp) {
      this.dp.destructor();
    }
  },

  methods: {
    $_initGanttEvents: function () {
      gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id);
        this.$emit('task-selected', task);
      });

      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        this.$emit('task-updated', id, 'inserted', task);
        task.progress = task.progress || 0;
        if(gantt.getSelectedId() == id) {
          this.$emit('task-selected', task);
        }
      });

      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        this.$emit('task-updated', id, 'updated', task);
      });

      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted');
        if(!gantt.getSelectedId()) {
          this.$emit('task-selected', null);
        }
      });

      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        this.$emit('link-updated', id, 'inserted', link);
      });

      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        this.$emit('link-updated', id, 'updated', link);
      });

      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        this.$emit('link-updated', id, 'deleted');
      });
    },

    exportToMSProject() {
      gantt.exportToMSProject();
    },
    exportToExcel() {
      gantt.exportToExcel();
    },
    initImportFromMSProject() {
      this.fileDnD.onDrop(this.sendFile);
    },

    sendFile(file) {
      this.fileDnD.showUpload();
      this.upload(file, () => {
        this.fileDnD.hideOverlay();
      });
    },
    upload(file, callback) {
      gantt.importFromMSProject({
        data: file,
        callback: function (project) {
          if (project) {
            gantt.clearAll();

            if (project.config.duration_unit) {
              gantt.config.duration_unit = project.config.duration_unit;
            }

            gantt.parse(project.data);
          }

          if (callback)
            callback(project);
        }
      });
    }
  }
};
</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
    @import "../../snippets/dhx_file_dnd.css";

    .gantt_message_area {
        top: 50px!important;
    }
</style>
```

Trong component trên mình đã viết sẵn một số hàm để hỗ trợ import và export từ file excel, file Microsoft Project. Giải thích một chút về code: Đầu tiên ta init gantt ra 1 div và get dữ liệu về từ ajax thông qua api `/api/gantt/`, Sau đó ta tạo một bộ xử lý dữ liệu thông qua REST API và như vậy khi ta thao tác chỉnh sửa trên biểu đồ Gantt thì thư viện sẽ tự động gọi api để update dữ liệu vào DB:
```javascript
 gantt.init(this.$refs.gantt);
  gantt.clearAll();
  gantt.ajax.get({
    url: this.api_url,
    headers: {
      'Authorization': 'Bearer ' + window.token
    }
  }).then(function (xhr) {
    gantt.parse(xhr.responseText);
  });
  this.dp = gantt.createDataProcessor({
    url: this.api_url,
    mode:'REST',
  });
  this.dp.setTransactionMode({
    headers: {
      'Authorization': 'Bearer ' + window.token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, true);

```

Kết quả như sau:

![](https://images.viblo.asia/14be4c0b-1511-4805-bbc0-381c95d1d7b2.jpg)

Như vậy mình vừa giới thiệu qua cách tích hợp Gantt Chart vào project Laravel + VueJS. Đây mới chỉ là bài cơ bản nhất để học về GanttChart. Ngoài ra muốn custom lại chi tiết các chức năng thì chúng ta cần bám sát vào tài liệu của thư viện để custom code phù hợp với yêu cầu của cá nhân. Cảm ơn các bạn đã theo dõi bài viết
# Tham khảo
* [Dhtmlx Gantt](https://docs.dhtmlx.com/gantt/)