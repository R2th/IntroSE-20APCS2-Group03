## Tại sao cần tạo 1 thứ gì đó để quản lý file.
Khi làm trang web nhỏ và file upload không nhiều, thì để quản lý dữ liệu liên quan đến file chúng ta thường chỉ dùng 1 trường trong bảng đó để lưu path của file, ví dụ như avatar trong bảng users. Và file thì được lưu trực tiếp trên cùng web server của trang web.

Nhưng khi bạn có nhiều file, và lưu file ở nhiều nơi khác nhau, hay bạn muốn tạo các logic validation, upload khác nhau cho từng loại file, thì bạn cần 1 công cụ để quản lý file, ở đây mình sẽ gọi nó là File Manager

## Ý tưởng
Khi Upload file, File Manager xử lí việc validate, crop, resize, tạo thumbnail với ảnh,  video... và upload lên storage bạn chỉ định và lưu thông tin file vào database, lúc bạn cần lấy đường dẫn đến file thì chỉ cần gọi hàm tạo mà bạn không cần quan tâm nó đang được lưu trên storage nào.

Chúng ta sẽ xây dựng 1 package theo mô hình driver-based, hay manager design pattern để giải quyết trường hợp này.

ToDo
- tạo 3 driver doc, image, video cho filemanager
- ghi đè driver s3, local của storage, và thêm google cloud storage
## Thực hiện
### 1. Tạo manager và các driver
Đầu tiên chúng ta sẽ tạo 1 manager và đặt tên là FileManager
```
<?php

namespace PlumpBoy\FileManager;

use Illuminate\Support\Manager;

class FileManager extends Manager
{
    /**
     * Call a custom chatapp handler.
     *
     * @param  string|null $driver
     * @return mixed
     */
    public function handle($driver = null)
    {
        return $this->driver($driver);
    }
    /**
     * {@inheritdoc}
     */
    public function getDefaultDriver()
    {
        return 'image';
    }
}
```
và các driver, ex: image
```
<?php

namespace PlumpBoy\FileManager\Handlers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\File as LaravelFile;
use App\Libraries\FileManager\FileHandlerContract;
use App\Models\File;
use App\Repositories\FileRepositoryInterface;
use Intervention\Image\Facades\Image as ImageEditor;
use DB;

class Image extends FileHandlerContract
{
    protected $rules = 'mimes:jpeg,jpg,png,gif|required';
    protected $type = 'image';

    /**
     * resize data.
     *
     * @var string
     */
    protected $resize = [];

    protected function put($file, $path, $options)
    {
        $this->setUploadData($file, $path);

        $storeImage = $file;

        if ($this->resize != [] && count($this->resize) === 2) {
            $image = ImageEditor::make($file->getRealPath());

            $image->resize($this->resize[0], $this->resize[1], function ($constraint) {
                $constraint->aspectRatio();
            })->save();

            $storeImage = new LaravelFile($image->dirname . '/' . $image->basename);
        }

        if ($this->driver()->putFileAs($path, $storeImage, $this->data['id'], $options)) {
            return File::create($this->data);
        }

        return false;
    }

    public function resize($width, $height)
    {
        $this->resize = [$width, $height];

        return $this;
    }
 }
```
### 2. Tạo provider
```
<?php

namespace PlumpBoy\FileManager;

use Closure;
use Illuminate\Support\Arr;
use InvalidArgumentException;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;

use League\Flysystem\Filesystem;
use League\Flysystem\AdapterInterface;
use League\Flysystem\FilesystemInterface;
use League\Flysystem\Cached\CachedAdapter;
use League\Flysystem\Cached\Storage\Memory as MemoryStore;

use Aws\S3\S3Client;
use Aws\CloudFront\CloudFrontClient;
use Google\Cloud\Storage\StorageClient;

use PlumpBoy\FileManager\Adapter\AwsS3Adapter;
use PlumpBoy\FileManager\Adapter\LocalAdapter;
use PlumpBoy\FileManager\Adapter\GoogleStorageAdapter;

class FileManagerServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // Override drivers of filesystems (supported only)
        foreach ($app['config']['filesystems.disks'] as $key => $config) {
            if ($config['driver'] == 'gcs') {
                Storage::extend($key, function($app, $config) {
                    $keyFile = array_get($config, 'key_file');
                    if (is_string($keyFile)) {
                        $client = new StorageClient([
                            'projectId' => $config['project_id'],
                            'keyFilePath' => $keyFile,
                        ]);
                    }

                    if (! is_array($keyFile)) {
                        $keyFile = [];
                    }

                    $client = new StorageClient([
                        'projectId' => $config['project_id'],
                        'keyFile' => array_merge(["project_id" => $config['project_id']], $keyFile)
                    ]);

                    $bucket = $storageClient->bucket($config['bucket']);
                    $pathPrefix = array_get($config, 'path_prefix');
                    $storageApiUri = array_get($config, 'storage_api_uri');

                    return $this->adapt($this->createFlysystem(
                        new GoogleStorageAdapter($client, $config['bucket'], $pathPrefix, $storageApiUri), $config
                    ));
                });
            }

            if ($config['driver'] == 's3') {
                Storage::extend($key, function($app, $config) {
                    $config += ['version' => 'latest'];

                    if ($config['key'] && $config['secret']) {
                        $config['credentials'] = Arr::only($config, ['key', 'secret', 'token']);
                    }

                    $root = $config['root'] ?? null;

                    $options = $config['options'] ?? [];

                    return $this->adapt($this->createFlysystem(
                        new AwsS3Adapter(new S3Client($config), $config['bucket'], $root, $options), $config
                    ));
                });
            }

            if ($config['driver'] == 'local') {
                Storage::extend($key, function($app) {
                    $config = $app['config']['filesystems.disk.local'];
                    $permissions = $config['permissions'] ?? [];

                    $links = ($config['links'] ?? null) === 'skip'
                        ? LocalAdapter::SKIP_LINKS
                        : LocalAdapter::DISALLOW_LINKS;

                    return $this->adapt($this->createFlysystem(new LocalAdapter(
                        $config['root'], $config['lock'] ?? LOCK_EX, $links, $permissions
                    ), $config));
                });
            }
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerManager();
    }

    /**
     * Register the chatapp manager.
     *
     * @return void
     */
    protected function registerManager()
    {
        $this->app->singleton('filemanager', function ($app) {
            return tap(new FileManager($app), function ($manager) {
                $this->registerHandlers($manager);
            });
        });
    }

    /**
     * Register chatapp handlers.
     *
     * @param  \App\ChatAppNotification\ChatAppManager $manager
     * @return void
     */
    protected function registerHandlers($manager)
    {
        foreach ([
            [
                'image',
                Handlers\Image::class,
            ],
            [
                'doc',
                Handlers\Doc::class,
            ],
            [
                'video',
                Handlers\Video::class,
            ],
        ] as $driver) {
            $manager->extend($driver[0], function ($app) use ($driver) {
                return $this->app->make($driver[1]);
            });
        }
    }

    /**
     * Create a Flysystem instance with the given adapter.
     *
     * @param  \League\Flysystem\AdapterInterface  $adapter
     * @param  array  $config
     * @return \League\Flysystem\FilesystemInterface
     */
    protected function createFlysystem(AdapterInterface $adapter, array $config)
    {
        $cache = Arr::pull($config, 'cache');

        $config = Arr::only($config, ['visibility', 'disable_asserts', 'url']);

        if ($cache) {
            $adapter = new CachedAdapter($adapter, $this->createCacheStore($cache));
        }

        return new Flysystem($adapter, count($config) > 0 ? $config : null);
    }

    /**
     * Create a cache store instance.
     *
     * @param  mixed  $config
     * @return \League\Flysystem\Cached\CacheInterface
     *
     * @throws \InvalidArgumentException
     */
    protected function createCacheStore($config)
    {
        if ($config === true) {
            return new MemoryStore;
        }

        return new Cache(
            $this->app['cache']->store($config['store']),
            $config['prefix'] ?? 'flysystem',
            $config['expire'] ?? null
        );
    }

    /**
     * Adapt the filesystem implementation.
     *
     * @param  \League\Flysystem\FilesystemInterface  $filesystem
     * @return \Illuminate\Contracts\Filesystem\Filesystem
     */
    protected function adapt(FilesystemInterface $filesystem)
    {
        return new FilesystemAdapter($filesystem);
    }
}
``` 
ở phần này mình resolve tất cả driver của FileManager, bạn có thể thêm hàm trong manager để chỉ resolve driver khi được gọi để tránh app bị phình. Và ghi đè lại driver trong Storage của laravel, vì laravel dùng league filesystems mà cái này lại chưa hỗ trợ cdn cho các cloud storage nên chúng ta cần wrap các driver này lại và ghi đè để có thể mở rộng với các chức năng khác nữa, ví dụ như tạo cdn signed url ...
```
public function getCdnSignedUrl($path, $expires)
{
    // Create a CloudFront Client
    $client = new CloudFrontClient([
        'version' => 'latest',
        'region' => env('AWS_DEFAULT_REGION'),
        'debug' => env('APP_DEBUG'),
    ]);

    $resourceUrl = env('AWS_CLOUDFRONT_METHOD') . '://' . env('AWS_CLOUDFRONT_DOMAIN') . $path;

    // Create a signed URL for the resource using the canned policy
    $signedUrlCannedPolicy = $client->getSignedUrl([
        'url' => $resourceUrl,
        'expires' => $expires,
        'private_key' => env('AWS_CLOUDFRONT_PRIVATE_KEY_PATH'),
        'key_pair_id' => env('AWS_CLOUDFRONT_KEY_PAIR_ID'),
    ]);

    return $signedUrlCannedPolicy;
}
```
### 3. FileHandlerContract
đây là file ta sẽ wrap lại laravel filesystem adapter, và thêm logic kết hợp với database.
```
<?php

namespace PlumpBoy\FileManager;

use Illuminate\Validation\ValidationException;
use Aws\CloudFront\CloudFrontClient;
use Aws\Exception\AwsException;
use PlumpBoy\FileManager\File;
use Validator;
use DB;

abstract class FileHandlerContract
{
    abstract function put($file, $path, $options);

    /**
     * Storage instance.
     *
     * @var string
     */
    protected $storage;

    /**
     * Storage driver name.
     *
     * @var string
     */
    protected $driver;

    /**
     * file data.
     *
     * @var string
     */
    protected $data = [];

    /**
     * Constructor.
     *
     * @param $apiKey
     * @param string $method
     */
    public function __construct()
    {
        $this->storage = resolve('filesystem');
        $this->driver = $this->getDefaultDriver();
        $this->data['type'] = $this->type;
    }

    public function getCdnSignedUrl($file, int $time = 300)
    {
        throw new RuntimeException('This driver does not support retrieving URLs via cdn.');
    }

    public function upload($uploadFile, $path = '/', $options = [])
    {
        $this->validate($uploadFile);
        $path = $this->setPath($path);

        if (is_array($uploadFile)) {
            foreach ($uploadFile as $file) {
                $this->put($file, $path, $options);
            }
        } else {
            $this->put($uploadFile, $path, $options);
        }
    }

    public function download($file, $name = null, $headers = [])
    {
        if (![$file, $path] = $this->getFileInfo($file)) {
            return false;
        }

        if ($name == null) {
            $name = $file->name;
        }

        return $this->driver()->download($path, $name, $headers);
    }
    ...
    /**
     * Get the default driver name.
     *
     * @return string
     */
    public function getDefaultDriver()
    {
        return config('filesystems.default');
    }

    protected function driver()
    {
        return $this->storage->disk($this->driver);
    }

    /**
     * Dynamically call the default driver instance.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        return $this->storage->disk($this->driver)->$method(...$parameters);
    }
}
```
vì nó hơi dài nên mình đã cắt bớt
### 4. model
```
<?php

namespace PlumpBoy\FileManager;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [
        'id', // real name
        'name', // display name and file download name
        'type',
        'path',
        'bucket', // cloud bucket
        'disk', // disk driver
        'extension',
        'user_id', // ower can modify
        'role_id', // if set who has the role can access
        'permission_id', // if set who has the permission can access
        'visible', // public or private
    ];
}
```
Trên đây là các thành phần chính của FileManager ở phần sau mình sẽ giới thiệu với các bạn các sử dụng package này ( khi mình hoàn thành nó =)) )