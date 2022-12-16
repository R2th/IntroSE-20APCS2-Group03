## SETUP Môi trường
Requires 
```
php: ^7.1
illuminate/config: 5.7.*
illuminate/filesystem: 5.7.*
illuminate/log: 5.7.*
illuminate/support: 5.7.*
league/flysystem: ~1.0
php-ffmpeg/php-ffmpeg: ^0.13
symfony/process: ~4.0
```
Sử dụng Lib - [PHP-FFmpeg](https://github.com/PHP-FFMpeg/PHP-FFMpeg). Thư viện yêu cầu cài đặt ffmpeg như hướng dẫn trước đây [Link bài cài đặt](https://viblo.asia/p/tim-hieu-ffmpeg-va-cach-thuc-su-dung-ffmpeg-jvElaPOxZkw) ( Đối với windows chú ý cần cài đặt PATH trỏ đến bin/ffmpeg.exe).
## Cài đặt và cách thức sử dụng
sử dụng composer để install:
```
$ composer require php-ffmpeg/php-ffmpeg
$ composer require pbmedia/laravel-ffmpeg
```
Cách sử dụng đối với php-ffmpeg
```
require 'vendor/autoload.php';

$ffmpeg = FFMpeg\FFMpeg::create();
$video = $ffmpeg->open('video.mpg');
$video
    ->filters()
    ->resize(new FFMpeg\Coordinate\Dimension(320, 240))
    ->synchronize();
$video
    ->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(10))
    ->save('frame.jpg');
$video
    ->save(new FFMpeg\Format\Video\X264(), 'export-x264.mp4')
    ->save(new FFMpeg\Format\Video\WMV(), 'export-wmv.wmv')
    ->save(new FFMpeg\Format\Video\WebM(), 'export-webm.webm');
```
Khởi tạo 1 main đầu vào
```
$ffmpeg = FFMpeg\FFMpeg::create();
```
FFMpeg sẽ tự động nhận dạng các chuỗi binary để truyền vào ffmpeg và ffprobe. Nếu cần phải sửa lại các đường dẫn hoặc các tham số thì cần thay đổi trong mảng như truyền vào cấu hình mặc định cho việc xử lý đo
```
$ffmpeg = FFMpeg\FFMpeg::create(array(
    'ffmpeg.binaries'  => '/opt/local/ffmpeg/bin/ffmpeg',
    'ffprobe.binaries' => '/opt/local/ffmpeg/bin/ffprobe',
    'timeout'          => 3600, // Timeout cho quá trình xử lý
    'ffmpeg.threads'   => 12,   // Số threads FFMpeg có thể sử dụng
), $logger); // ghi log sự kiện
```
Để kiểm tra các protocol hỗ trợ trong ffmpeg có thể sử dụng lệnh
```
ffmpeg -protocols
```
Result: ![](https://images.viblo.asia/0e9a6ab1-839d-4c8c-9ee8-2ca215b7588f.png)
```
Input:
  async  bluray  cache  concat  crypto  data  file  ftp  gopher  hls  http  httpproxy  https  mmsh  mmst  pipe  rtp  sctp  srtp  subfile  tcp  tls  udp  udplite  unix  rtmp  rtmpe  rtmps  rtmpt  rtmpte  sftp
```
```
 Output:  
  crypto  file  ftp  gopher  http  httpproxy  https  icecast  md5  pipe  rtp  sctp  srtp  tcp  tls  udp  udplite  unix  rtmp  rtmpe  rtmps  rtmpt  rtmpte  sftp 
```
## Đối với thư viện pbmedia
Cài đặt cần thêm Service Provider và Facade trong app.php
```
// Laravel 5: config/app.php

'providers' => [
    ...
    Pbmedia\LaravelFFMpeg\FFMpegServiceProvider::class,
    ...
];

'aliases' => [
    ...
    'FFMpeg' => Pbmedia\LaravelFFMpeg\FFMpegFacade::class
    ...
];
```
Publish config
```
php artisan vendor:publish --provider="Pbmedia\LaravelFFMpeg\FFMpegServiceProvider"
``` 
Cách sử dụng cũng như sử dụng thư viện php-ffmpeg
Ví dụ về cách convert 1 video hoặc 1 đoạn âm thanh 
```
FFMpeg::fromDisk('songs')
    ->open('yesterday.mp3')
    ->export()
    ->toDisk('converted_songs')
    ->inFormat(new \FFMpeg\Format\Audio\Aac)
    ->save('yesterday.aac');
```
Trong ví dụ trên sử dụng phương thức gọi `fromDisk()`, tuy nhiên có thể sử dụng thêm phương thức `fromFilesystem()`, cấu hình `$filesystem` được thiết lập trong `Illuminate\Contracts\Filesystem\Filesystem`
Ví dụ: 
```
$media = FFMpeg::fromFilesystem($filesystem)->open('yesterday.mp3');
```
Các bộ lọc hoặc options thêm có thể được gọi trong `Closure` được sử dụng bởi ` PHP-FFMpeg's Filter`
Ví dụ resize 1 video thành 640x480 
```
FFMpeg::fromDisk('videos')
    ->open('steve_howe.mp4')
    ->addFilter(function ($filters) {
        $filters->resize(new \FFMpeg\Coordinate\Dimension(640, 480));
    })
    ->export()
    ->toDisk('converted_videos')
    ->inFormat(new \FFMpeg\Format\Video\X264)
    ->save('small_steve.mkv');
```
Hoặc convert video sang chuẩn x264
```
$start = \FFMpeg\Coordinate\TimeCode::fromSeconds(5)
$clipFilter = new \FFMpeg\Filters\Video\ClipFilter($start);

FFMpeg::fromDisk('videos')
    ->open('steve_howe.mp4')
    ->addFilter($clipFilter)
    ->export()
    ->toDisk('converted_videos')
    ->inFormat(new \FFMpeg\Format\Video\X264)
    ->save('short_steve.mkv');
```
Nếu bạn không muốn sử dụng các filters mặc định được xây dựng, và bạn hiểu rõ về sử dụng ffmpeg thì bạn có thể truyền các tham số vào bằng cách sử dụng  như sau
```
FFMpeg::fromDisk('videos')
    ->open('steve_howe.mp4')
    ->addFilter(['-itsoffset', 1]);
```
hoặc
```
FFMpeg::fromDisk('videos')
    ->open('steve_howe.mp4')
    ->addFilter('-itsoffset', 1);
```
Với nhiều cách chuyển đổi 
```
FFMpeg::open('my_movie.mov')

    // export to FTP, converted in WMV
    ->export()
    ->toDisk('ftp')
    ->inFormat(new \FFMpeg\Format\Video\WMV)
    ->save('my_movie.wmv')

    // export to Amazon S3, converted in X264
    ->export()
    ->toDisk('s3')
    ->inFormat(new \FFMpeg\Format\Video\X264)
    ->save('my_movie.mkv');

    // you could even discard the 'toDisk()' method,
    // now the converted file will be saved to
    // the same disk as the source!
    ->export()
    ->inFormat(new FFMpeg\Format\Video\WebM)
    ->save('my_movie.webm')

    // optionally you could set the visibility
    // of the exported file
    ->export()
    ->inFormat(new FFMpeg\Format\Video\WebM)
    ->withVisibility('public')
    ->save('my_movie.webm')
```
Ví dụ lấy 1 frame ảnh từ video
```
FFMpeg::fromDisk('videos')
    ->open('steve_howe.mp4')
    ->getFrameFromSeconds(10)
    ->export()
    ->toDisk('thumnails')
    ->save('FrameAt10sec.png');
    
$media = FFMpeg::open('steve_howe.mp4');
$frame = $media->getFrameFromString('00:00:13.37');

// hoặc

$timecode = new FMpeg\Coordinate\TimeCode(...);
$frame = $media->getFrameFromTimecode($timecode);
```

## Áp dụng FFmpeg vào Laravel project
Tạo 1 model Video cùng với Controller, database
```
php artisan make:model Video --migration --controller
```
Database migration
```
Schema::create('videos', function (Blueprint $table) {
    $table->increments('id');
    $table->string('title');
    $table->string('original_name');
    $table->string('disk');
    $table->string('path');
    $table->datetime('converted_for_downloading_at')->nullable();
    $table->datetime('converted_for_streaming_at')->nullable();
    $table->timestamps();
});
```
Model
```
class Video extends Model
{
    protected $dates = [
        'converted_for_downloading_at',
        'converted_for_streaming_at',
    ];

    protected $guarded = [];
}
```
Trước khi làm việc với các controller cần 1 form request class để xác thực các input của người dùng.
```
php artisan make:request StoreVideoRequest
php artisan make:job ConvertVideoForDownloading
php artisan make:job ConvertVideoForStreaming
```
```
public function rules()
{
    return [
        'title' => 'required',
        'video' => 'required|file|mimetypes:video/mp4,video/mpeg,video/x-matroska',
    ];
}
```
Update Controller
```
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Jobs\ConvertVideoForDownloading;
use App\Jobs\ConvertVideoForStreaming;
use App\Video;

class VideoController extends Controller
{
    public function store(StoreVideoRequest $request)
    {
        $video = Video::create([
            'disk'          => 'videos_disk',
            'original_name' => $request->video->getClientOriginalName(),
            'path'          => $request->video->store('videos', 'videos_disk'),
            'title'         => $request->title,
        ]);

        $this->dispatch(new ConvertVideoForDownloading($video));
        $this->dispatch(new ConvertVideoForStreaming($video));

        return response()->json([
            'id' => $video->id,
        ], 201);
    }
}
```
Các Controller liên quan như ConvertVideo khi download 
```
<?php

namespace App\Jobs;

use App\Video;
use Carbon\Carbon;
use FFMpeg;
use FFMpeg\Coordinate\Dimension;
use FFMpeg\Format\Video\X264;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ConvertVideoForDownloading implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $video;

    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    public function handle()
    {
        // create a video format...
        $lowBitrateFormat = (new X264)->setKiloBitrate(500);

        // open the uploaded video from the right disk...
        FFMpeg::fromDisk($this->video->disk)
            ->open($this->video->path)

        // add the 'resize' filter...
            ->addFilter(function ($filters) {
                $filters->resize(new Dimension(960, 540));
            })

        // call the 'export' method...
            ->export()

        // tell the MediaExporter to which disk and in which format we want to export...
            ->toDisk('downloadable_videos')
            ->inFormat($lowBitrateFormat)

        // call the 'save' method with a filename...
            ->save($this->video->id . '.mp4');

        // update the database so we know the convertion is done!
        $this->video->update([
            'converted_for_downloading_at' => Carbon::now(),
        ]);
    }
}
```
Nếu bạn sử dụng HLS thì có thể quan tâm đển trích dẫn từ Wikipedia về HTTP Live Streaming 
> To enable a player to adapt to the bandwidth of the network, the original video is encoded in several distinct quality levels. The server serves an index, called a "master playlist", of these encodings, called "variant streams". The player can then choose between the variant streams during playback, changing back and forth seamlessly as network conditions change.
[Nguồn Wikipedia](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)
Với vấn đề này có thể viết lại controller thành
```
<?php

namespace App\Jobs;

use App\Video;
use Carbon\Carbon;
use FFMpeg;
use FFMpeg\Format\Video\X264;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ConvertVideoForStreaming implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $video;

    public function __construct(Video $video)
    {
        $this->video = $video;
    }

    public function handle()
    {
        // create some video formats...
        $lowBitrateFormat  = (new X264)->setKiloBitrate(500);
        $midBitrateFormat  = (new X264)->setKiloBitrate(1500);
        $highBitrateFormat = (new X264)->setKiloBitrate(3000);

        // open the uploaded video from the right disk...
        FFMpeg::fromDisk($this->video->disk)
            ->open($this->video->path)

        // call the 'exportForHLS' method and specify the disk to which we want to export...
            ->exportForHLS()
            ->toDisk('streamable_videos')

        // we'll add different formats so the stream will play smoothly
        // with all kinds of internet connections...
            ->addFormat($lowBitrateFormat)
            ->addFormat($midBitrateFormat)
            ->addFormat($highBitrateFormat)

        // call the 'save' method with a filename...
            ->save($this->video->id . '.m3u8');

        // update the database so we know the convertion is done!
        $this->video->update([
            'converted_for_streaming_at' => Carbon::now(),
        ]);
    }
}
```
Đối với việc hỗ trợ cho Video.js của HTML5 video player hoặc cho browsers không hỗ trợ HLS  thì có thể khởi tạo URLs để tải dữ liệu cũng như stream dữ liệu bằng cách
```
use Illuminate\Support\Facades\Storage;

$downloadUrl = Storage::disk('downloadable_videos')->url($video->id . '.mp4');
$streamUrl = Storage::disk('streamable_videos')->url($video->id . '.m3u8');
```
Trích dẫn nguồn:
[Github](https://github.com/pascalbaljetmedia/laravel-ffmpeg?ref=madewithlaravel.com)