# Performance Comparison
Fast JSONAPI is aimed at providing all the major functionality that Active Model Serializer (AMS) provides, along with an emphasis on speed and performance by meeting a benchmark requirement of being 25 times faster than AMS. The gem also enforces performance testing as a discipline. Right after you finish setting up your API Rails project, you only have to add the serializer gem to your Gemfile, gem "fast_jsonapi", and then run bundle install. 

![](https://images.viblo.asia/5d86d30d-8c0c-4ceb-9482-aa6660eb8753.png)

![](https://images.viblo.asia/f3ae88e4-05f1-43c4-bb24-d931245a8d04.png)

Benchmark: Performance tests indicate a 25–40x speed gain over AMS, essentially making serialization time negligible on even fairly complex models. Performance gain is significant when the number of serialized records increases.
# Serialization with fast_jsonapi

Lets create a rails project with Movie, Category, Review model by using the following command

```
 rails new my_api --api 
 
 rails generate scaffold Category name
 
 rails generate scaffold Movie name description:text duration:integer category:references
 
 rails generate scaffold Review content:text movie:references
```

Copy and paste the following code in the seed.rb file to create some seed data. 

```ruby
category = Category.create(name: "Category 1")

2.times do |t|
  Movie.create(name: "Movie #{t}", category_id: category.id)
end

2.times do |t|
  Review.create(content: "Review Caontent #{t}", movie_id: Movie.last.id)
end   

```

Create the serializer for Movie by following command

```
rails g serializer Movie
```
It will create the file **app/serializers/movie_serializer.rb**

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :created_at
end
```
In the movies controller call the serializer and render the response

```ruby
render json: MovieSerializer.new(Movie.all).serializable_hash
```

When you send request from a client to the route employee's index http://localhost:3000/movies , than you can see the response like as follows: 
```ruby
{
    "data": [
        {
            "id": "1",
            "type": "movie",
            "attributes": {
                "name": "Movie 0",
                "description": null,
                "created_at": "2019-01-23T07:12:06.063Z"
            }
        },
        {
            "id": "2",
            "type": "movie",
            "attributes": {
                "name": "Movie 1",
                "description": null,
                "created_at": "2019-01-23T07:12:06.129Z"
            }
        }
    ]
}
```

# Customize the response
In the real application, it is common to customize the response with your own needs. For example we would like to overite the `name` attribute out 

```ruby
  attribute :name do |object|
    "#{object.name} (#{object.length})"
  end
```

Attributes can also use a different name by passing the original method or accessor with a proc shortcut:

```ruby
  attribute :updated, &:updated_at
```

Add associated data on movie response

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer
  has_many :reviews
  belongs_to :category
  
  attributes :name, :description, :created_at 

  attribute :name do |object|
    "#{object.name} (#{object.duration})"
  end
  attribute :updated, &:updated_at
end
```

Now you can see the output includes the category and review data

```ruby
{
    "data": [
        {
            "id": "1",
            "type": "movie",
            "attributes": {
                "name": "Movie 0 ()",
                "description": null,
                "created_at": "2019-01-23T07:12:06.063Z",
                "updated": "2019-01-23T07:12:06.063Z"
            },
            "relationships": {
                "reviews": {
                    "data": []
                },
                "category": {
                    "data": {
                        "id": "3",
                        "type": "category"
                    }
                }
            }
        }
    ]
} 
```

Reference: 
[Fast API Gem](https://rubygems.org/gems/fastapi)