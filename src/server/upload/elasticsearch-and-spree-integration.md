### I. What is ElasticSearch? and Why do we need ElasticSearch ?

Elasticsearch is a open source full-text search and analysis engine. It allows us to store, search, and analyze large volumes of data very quickly and nearly real-time. It is often used to make a powers applications with complex search features and requirements. Elasticsearch provides a distributed system on top of Lucene StandardAnalyzer for automatic indexing and type guessing, and uses a JSON-based REST API to reference Lucene features.

It is easy to set up right out of the box as it comes with reasonable defaults and hides the complexity for beginners. It has a short learning curve to grasp the basics, so anyone with a little effort can become productive very quickly. It has no schema, uses some defaults to index the data.

For Spree Commerce store, it can help your application powerful, flexible, and reliable searching , especially when large amounts of data are involved. The easier and faster customers are able to find what they are looking for, the more likely they are to purchase something in your store.

**Speed**
It is able to execute complex queries extremely fast. It also caches almost all of the structured queries commonly used as a filter for the result set and executes them only once. For every other request which contains a cached filter, it checks the result from the cache. This saves the time parsing and executing the query improving the speed.

**Search options**
It implements a lot of features when it comes to search such as customized splitting text into words, customized stemming, faceted search, full-text search, auto-completion, and instant search. 

**Scalability**
As it has a distributed architecture it enables to scale up to thousands of servers and accommodate petabytes of data.

**Flexibility**
All data types are accepted as numbers, text, geo, structured, unstructured...

### How to integrate ElasticSearch with Spree
Now in Spree, it hase a gem call `spree_elasticsearch` that we use it in our app. Let's install it:
```
gem 'spree_elasticsearch', github: 'javereec/spree_elasticsearch', branch: '3-0-stable'
```
Run bundle and setup generator
```
bundle
touch config/elasticsearch.yml
bundle exec rails g spree_elasticsearch:install
```

Now you can see and edit file `config_elasticserach.rb`
```
 defaults: &defaults
    hosts: ["127.0.0.1:9200"]
    bootstrap: true
  development:
    <<: *defaults
    index: development
  test:
    <<: *defaults
    index: test
  production:
    <<: *defaults
    index: production
```
you can see class that use for searching was changed:
```
Spree.config do |config|
  config.searcher_class = Spree::Search::Elasticsearch
end
```
In `app/models/spree/product_decorator.rb` we need to add callbacks to the model
```
module Spree
  Product.class_eval do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
  end
end
```

and in `product_decorator.rb` you will see something like this:
```
module Spree
  Product.class_eval do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
    index_name Spree::ElasticsearchSettings.index
    document_type 'spree_product'
    mapping _all: {"index_analyzer" => "nGram_analyzer", "search_analyzer" => "whitespace_analyzer"} do
      indexes :name, type: 'multi_field' do
        indexes :name, type: 'string', analyzer: 'nGram_analyzer', boost: 100
        indexes :untouched, type: 'string', include_in_all: false, index: 'not_analyzed'
      end
      indexes :description, analyzer: 'snowball'
      indexes :available_on, type: 'date', format: 'dateOptionalTime', include_in_all: false
      indexes :price, type: 'double'
      indexes :sku, type: 'string', index: 'not_analyzed'
      indexes :taxon_ids, type: 'string', index: 'not_analyzed'
      indexes :properties, type: 'string', index: 'not_analyzed'
    end
    def as_indexed_json(options={})
      result = as_json({
        methods: [:price, :sku],
        only: [:available_on, :description, :name],
        include: {
          variants: {
            only: [:sku],
            include: {
              option_values: {
                only: [:name, :presentation]
              }
            }
          }
        }
      })
      result[:properties] = property_list unless property_list.empty?
      result[:taxon_ids] = taxons.map(&:self_and_ancestors).flatten.uniq.map(&:id) unless taxons.empty?
      result
    end
    def self.get(product_id)
      Elasticsearch::Model::Response::Result.new(__elasticsearch__.client.get index: index_name, type: document_type, id: product_id)
    end
    .
    .
    .
   end
  end
```

Now let's start to  make a query to Elasticsearch. We need to create a searcher like below:
```
@searcher = build_searcher(
   params.merge(
     taxon: taxon_ids,
     include_images: true,
     page: 1,
     per_page: per_page_size
   )
 )
```

and we can get the result by code below:
```
products = @searcher.retrieve_products
```

For create and recreate index, you can use this rake task:
```
bundle exec rake spree_elasticsearch:load_products
```

Source: https://github.com/javereec/spree_elasticsearch