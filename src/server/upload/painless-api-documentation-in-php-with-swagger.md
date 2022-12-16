Good API documentation is critical for many projects, especially if your API is being used by multiple client applications.

But maintaining of documentation becomes very complicated with time. Changes to output structure, parameters configuration and many other things must be well documented and even with unit tests written sometimes it might be difficult to update docs frequently.

It would be great to have docs generated automatically, wouldn’t it? 😉

## Common ways of generating API docs
### Manual
Actually, any way requires manual work for updating some parts, but here we mean manually changing doc file. As it was mentioned before, this is one of the most complicated and requires careful work to be done.

### Annotations parsing
This is referred to PHPDoc (in our case), but also JSDoc or any other annotation syntax depending on the language.

In most cases it would look like this:
```
/**
 * @SWG\Info(title="My First API", version="0.1")
 */

/**
 * @SWG\Get(
 *     path="/api/resource.json",
 *     @SWG\Response(response="200", description="An example resource")
 * )
 */
```
**Example from swagger-php package**

Or like this:
```
/*
 * @rest\description SwaggerGen 2 Example API
 * @rest\title Example API
 * @rest\contact http://example.com Arthur D. Author
 * @rest\license MIT
 * @rest\security api_key apikey X-Api-Authentication header Authenticate using this fancy header
 * @rest\require api_key
 */
```
**Example from PHPSwaggerGen package**

This way is quite handy, if your code structure fits to providing such annotations in a correct way and you can split docs to comments over variety of methods and properties.

If you are using Doctrine, this might be a good way of documenting instances as Doctrine models require methods and properties set up on entities. But with Laravel, your annotation might simply look like this:

```
/**
 * @SWG\Post(
 *     path="/api/path",
 *     summary="Post to URL",
 *     @SWG\Parameter(
 *          name="body",
 *          in="body",
 *          required=true,
 *          @SWG\Schema(
 *              @SWG\Property(
 *                  property="name",
 *                  type="string",
 *                  maximum=64
 *              ),
 *              @SWG\Property(
 *                  property="description",
 *                  type="string"
 *              )
 *          )
 *     ),
 *     @SWG\Response(
 *          response=200,
 *          description="Example extended response",
 *          ref="$/responses/Json",
 *          @SWG\Schema(
 *              @SWG\Property(
 *                  property="data",
 *                  ref="#/definitions/Product"
 *              )
 *          )
 *     ),
 *     security={{"Bearer":{}}}
 * )
 */
```

🤮 this does not look better than raw YAML swagger definition, does it? 😂

In my opinion it is even better to maintain manually updated file, than using annotations. Because in most cases annotations are very much restricted in their extensibility. And if your API would have some complicated schema, it will be a lot of pain to create correct annotation.

### Code-based docs generation

This approach is based on coding docs in your application language. Swagger docs manipulation libraries are available for most languages. 

Usually your code would look like this:
```
$pet = Schema::create()
    ->addRequired('id')
    ->addRequired('name')

    ->setProperties(Properties::create()
        ->set('id', Schema::create()
            ->setType('integer')
            ->setFormat('int64')
        )
        ->set('name', Schema::create()
            ->setType('string')
        )
        ->set('tag', Schema::create()
            ->setType('string')
        )
    );
```
**Example from Strut package**

It also looks complicated and less readable than raw YAML syntax. However, this is code block, which means you can easily use any variables, loops, conditions and anything else you want.

So. Can we make automated generation of docs painless? Let’s try! 😃

## Integrating Swagger doc generation into Laravel application

[Swagger schema](https://swagger.io/specification/#schema-16) is very flexible and provides a lot of structure types, which you can use. But in order to understand it better, let’s build some kind of relation between that schema and Laravel structure.

We do this to determine, where we should integrate automated documentation.

* *OpenAPI Object*
Describes the whole application. Also contains *Info Object*. Here you need to provide your app basic descriptions.
* *Components Object*
Container, containing general setup for schemas, parameters etc.
* *Paths Object*
This is object fully describes your Router configuration with *PathItem Objects* as route definitions.
* *Operation Object*
This is your controller method, which contains single operation.
* *Parameter Object*
Is being used to describe headers, query, path and cookie parameters. Basically, everything contained in Request class alongside with *Request Body Object* for write requests.
* *Responses Object*
This object describes all possible responses for an operation. Usually it requires one for successful response and various error responses, which are similar across your application. Inside it contacts *Response Objects*, which can be best related to Responsable interface in new Laravel or, for example, transformers in packages like Fractal.
* *Schema Object*
And this one describes data structures which can be used for input or output data. This might be request body configuration for Request classes or output schema for responses.

### Setting up console command

First, let’s create a console command which would output our API documentation.
We are going to use *strut* package.

```
compose require calcinai/strut
php artisan make:command ApiDescribe —command=api:describe
```

The logic of command will follow this algorithm:
1. Create *OpenAPI Object* and fill in API info.
2. Get all route definitions from Router.
3. Create *Paths Object*
4. Iterate over all routes and create *Path Object* for each one. Fill object with data about operations.
5. Output result

Here is example of how we can do that
```php

use Calcinai\Strut\Definitions\Info;
use Calcinai\Strut\Definitions\PathItem;
use Calcinai\Strut\Definitions\Paths;
use Calcinai\Strut\Swagger;
use Illuminate\Console\Command;
use Illuminate\Routing\Route;
use Illuminate\Routing\Router;

class ApiDescribe extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'api:describe';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Router instance
     * @var Router
     */
    protected $router;

    /**
     * List of HTTP methods used in definitions.
     * @var array
     */
    protected $listedMethods = [
        'GET',
        'POST',
        'PUT',
        'DELETE',
    ];

    /**
     * Create a new command instance.
     *
     * @param Router $router
     * @return void
     */
    public function __construct(Router $router)
    {
        parent::__construct();
        $this->router = $router;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $name = config('app.name');
        $url = parse_url(config('app.url'));

        $swagger = Swagger::create()
            ->setHost($url['host'])
            ->setBasePath('api')
            ->setInfo(
                Info::create()
                    ->setTitle($name)
                    ->setVersion('1.0.0')
            )
            ->addScheme($url['scheme']);

        $paths = Paths::create();

        collect($this->router->getRoutes())->each(function (Route $route) use ($paths) {
            $uri = $route->uri();
            foreach (array_intersect($route->methods(), $this->listedMethods) as $method) {
                if ($paths->has($uri)) {
                    $item = $paths->get($uri);
                } else {
                    $item = PathItem::create();
                }
                // Fill path information
                $paths->set($uri, $item);
            }
        });

        $swagger->setPaths($paths);

        $this->getOutput()->write(json_encode($swagger->jsonSerialize(), JSON_PRETTY_PRINT));
    }
}
```

If we run the command now, we will get API definition with empty paths.

### Collecting operation data from controllers

In order to keep our docs distributed we will have operation logic in controllers themselves.

Let’s create a simple controller, which would display application status.

```
php artisan make:controller Status
```

```php
// routes/api.php
Route::get('/status', 'Status@index');
```

```php
class Status extends Controller
{
    public function index()
    {
        return ['status' => 'ok'];
    }
}
```

In order to collect operation data, we can accept following conventions:
1. For every `method`, controller must contain `methodOperation` method, which would return `Calcinai\Strut\Definitions\Operation` object.
2. `methodOperation` must be static

```
class Status extends Controller
{
    public function index()
    {
        return ['status' => 'ok'];
    }

    public static function indexOperation()
    {
		  $responses = Responses::create()
            ->set(200, Response::create()
                ->setDescription('Status description');
                //->setSchema($statusSchema)

        return Operation::create()
            ->setSummary('API status')
            ->setOperationId('getStatus')
            ->setResponses($responses);
    }
}
```

This code is going to work well. We will add schema definition later.

Now we update our command.

```php
collect($this->router->getRoutes())->each(function (Route $route) use ($paths) {
    $uri = $route->uri();
    list($controllerClass, $controllerMethod) = explode('@', $route->getAction('uses'));
    if (!method_exists($controllerClass, $controllerMethod.'Operation')) {
        $this->warn($controllerClass.'@'.$controllerMethod.' cannot be described.');
        return;
    }
    $operation = call_user_func([$controllerClass, $controllerMethod]);
    foreach (array_intersect($route->methods(), $this->listedMethods) as $method) {
    if ($paths->has($uri)) {
        $item = $paths->get($uri);
    } else {
        $item = PathItem::create();
    }
    call_user_func([$item, 'set'.ucfirst(strtolower($method))], $operation);
    $paths->set($uri, $item);
    }
});
```

### Setting up requests

As we have done with controllers, we can now create Request class and configure input parameters there.

```
php artisan make:request StatusGet
```

Now we can configure our request class to return array of query parameters.

```php
// Reuqests/StatusGet.php
    /**
     * @return QueryParametersCollection|null
     */
    public static function getQueryParameters()
    {
        return [
            QueryParameterSubSchema::create()
                ->setName('example')
                ->setType('string')
                ->setDescription('Example query parameter')
                ->setRequired(false)
        ];
    }
```

And our controller to use those parameters

```php
// Controllers/Status.php

    public function index(StatusGet $request)
    {
        return ['status' => 'ok'];
    }

    public static function indexOperation()
    {
		  $responses = Responses::create()
            ->set(200, Response::create()
                ->setDescription('Status description');
                //->setSchema($statusSchema)

        $operation = Operation::create()
            ->setSummary('API status')
            ->setOperationId('getStatus')
            ->setResponses($responses);

        foreach (StatusGet::getQueryParameters() as $p) {
            $operation->addParameter($p);
        }
        return $operation;
    }
```

### Setting up response definitions

In order to render responses we are going to use Fractal and spatie/laravel-fractal packages.

```
composer require spatie/laravel-fractal
```

Then follow [installation guid on GitHub](https://github.com/spatie/laravel-fractal#installation-in-laravel-55-and-up) 

Now we can create a transformer class.

```php
class StatusResponseTransformer extends TransformerAbstract
{
    public function transform(array $data) {
        return [
            'application' => array_get($data, 'application', 'fail'),
        ];
    }

    public static function getSchema()
    {
        return Schema::create()
            ->addRequired('application')
            ->setProperties(Properties::create()
                ->set('application', Schema::create()
                    ->setType('string')
                )
            )
        );
    }
}
```


And update our controller

```php
    public function index(StatusGet $request)
    {
        return fractal()
            ->item(['application' => 'ok'])
            ->transformWith(new StatusResponseTransformer());
    }

    public static function indexOperation()
    {
		  $responses = Responses::create()
            ->set(200, Response::create()
                ->setDescription('Status description')
                ->setSchema(
                    StatusResponseTransformer::getSchema()
                );

        $operation = Operation::create()
            ->setSummary('API status')
            ->setOperationId('getStatus')
            ->setResponses($responses);

        foreach (StatusGet::getQueryParameters() as $p) {
            $operation->addParameter($p);
        }
        return $operation;
    }

```