# Graphql là gì?
Được Facebook giới thiệu cùng với Relay tại React.js Conf 2015, GraphQL là một ngôn ngữ query cho API dùng để viết các câu API một cách uyển chuyển chính xác những gì cần có, trong các application hiện đại nhiều lớp với nhiều thành phần phụ thuộc được sử dụng ngày càng phổ biến hiện nay. Trên thực tế GraphQL đã được sử dụng từ vài năm trước trong ứng dụng trên mobile của Facebook.

Client truy vấn đến máy chủ GraphQL bằng các truy vấn với đặc điểm: format của dữ liệu trả về được mô tả trong câu truy vấn và được định nghĩa ở phía client thay vì ở server. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client mà chỉ cần dùng duy nhất 1 endpoint.


Để hiểu được vấn đề cụ thể của GraphQL thì ta phải nói tới REST.
# REST
Chắc hẳn mọi người đều đã làm việc với REST rồi.
Có rất nhiều thứ để nói về REST, mình sẽ tóm gọn lại một cách dễ hiểu.
REST hay Representational state transfer là tập hợp những quy tắc kiến trúc, qui định cách thức clients tương tác với server, giúp ứng dụng có thể quản lí tài nguyên.

REST URL đại diện cho resource. Khi bạn muốn lấy dữ liệu resource thì bạn dùng GET, khi muốn insert thì dùng POST, update thì dùng PUT..

Một số vấn đề khi phát triển ứng dụng với rest
* Số lượng API endpoint quá nhiều, đôi lúc sẽ phải cầm cái id này chạy tới endpoint này kết quả, sau đó cầm tập id được response chạy tới endpoint khác để lấy cái thật sự cần.
* Rất khó để define ra được một chuẩn chung của dữ liệu trả về, vì đôi lúc với một model, client có thể lúc thì cần fields này, lúc thì cần những fields khác.

# Lợi ích của Graphql
*  Bạn có thể lấy chính xác dữ liệu cần lấy một cách linh hoạt
*  Một cộng đồng phát triển nhanh chóng
*  graphql không chỉ dành cho các nhà phát triển phản ứng

# Cấu trúc của Graphql
GraphQL API được tạo ra từ 3 phần chính: schema, queries, và resolvers

## Types
Type trong GraphQL dùng để xác định từng loại field trong Query, type sẽ giúp chúng ta định dạng kiểu field của kết quả từ truy vấn, ví dụ kiểu  string, float

```php
class ArticlesType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Articles',
        'description' => 'A articles',
        'model' => Article::class,
    ];

    // Định nghĩa field của type
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the article'
            ],
            'title' => [
                'type' => Type::string(),
                'description' => 'The title of the article'
            ],
            'content' => [
                'type' => Type::string(),
                'description' => 'The content of the article'
            ],
            'short_content' => [
                'type' => Type::string(),
                'description' => 'The short content of the article'
            ],
            'meta_title' => [
                'type' => Type::string(),
                'description' => 'The meta title of the article'
            ],
            'meta_keyword' => [
                'type' => Type::string(),
                'description' => 'The meta keyword of the article'
            ],
            'meta_description' => [
                'type' => Type::string(),
                'description' => 'The meta description of the article'
            ],
            'expiration_date' => [
                'type' => Type::string(),
                'description' => 'The expiration date of the article'
            ],
            'is_available' => [
                'type' => Type::int(),
                'description' => 'The is available of the article'
            ],
            'locale_id' => [
                'type' => Type::int(),
                'description' => 'The locale id of the article'
            ]
        ];
    }    
}
```

## Queries
Query xác định những truy vấn bạn có thể chạy trên GraphQL API của bạn. tương tự như REST khi muôn get dữ liệu ta dùng GET.. graphql thì dùng query
```php
class ArticlesQuery extends Query
{
    protected $attributes = [
        'name' => 'Article Query',
        'description' => 'A query of Article'
    ];
    
    public function type()
    {
        // type config in config/graphql.php
        return Type::listOf(GraphQL::type('articles'));
    }

    // arguments to filter query
    public function args()
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int()
            ],
            'content' => [
                'name' => 'content',
                'type' => Type::string()
            ],
            'short_content' => [
                'type' => Type::string(),
                'name' => 'short_content'
            ],
            'meta_title' => [
                'type' => Type::string(),
                'name' => 'meta_title'
            ],
            'meta_keyword' => [
                'type' => Type::string(),
                'name' => 'meta_keyword'
            ],
            'meta_name' => [
                'type' => Type::string(),
                'name' => 'meta_name'
            ],
            'expiration_date' => [
                'type' => Type::string(),
                'name' => 'expiration_date'
            ],
            'is_available' => [
                'type' => Type::int(),
                'name' => 'is_available'
            ],
            'locale_id' => [
                'type' => Type::int(),
                'name' => 'locale_id'
            ]
        ];
    }

    public function resolve($root, $args, SelectFields $fields)
    {
        $where = function ($query) use ($args) {
            if (isset($args['id'])) {
                $query->where('id',$args['id']);
            }
        };

        $article = Article::with(array_keys($fields->getRelations()))
            ->where($where)
            ->select($fields->getSelect())
            ->paginate();

        return $article;
    }
}
```
Resolve function: Khi bạn viết một schema cho GraphQL, bạn phải viết resolve function cho nó

Resolver nói cho GraphQL biết nơi và cách thức để lấy data cần thiết cho field của query mà bạn yêu cầu

## Mutations

mutations có thể được xem như POST / PATCH / PUT / DELETE request 
```php
class CreateArticleMutation extends Mutation
{
    protected $attributes = [
        'name' => 'CreateArticleMutation',
        'description' => 'A mutation'
    ];

    public function type()
    {
        return Type::listOf('articles');
    }

    public function args()
    {
        return [
            'content' => [
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required']
            ],
            'title' => [
                'type' => Type::nonNull(Type::string()),
                'rules' => ['required']
            ],
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        $article = new Article();
        $article->fill($args);
        $article->save();

        return $article;
    }
}
```
# Tổng kết
Mình chỉ mới tìm hiểu nên bài viết hơi sơ sài, sau khi hiểu kĩ hơn mình sẽ update cho bạn đọc dễ hiểu.