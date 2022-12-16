In Ruby On Rails provides many ways for helping us  working  on database easily. But sometime, we will need to insert large amounts of data to database. For the simple way,  if we insert each records will take a lot of time to finish and it is not good for performance.  In this article, i will introduce about how to use the gem `activerecord-import` to speed up the inserting  large of data by using only one INSERT statement.

### Activerecord
Now we have a table call `Company` as below:
```
create_table :companies do |t|
  t.column :name, :string
  t.column :description, :text
  t.column :address, :string
end
```
We want to insert 200 000 companies and code below we use ActiveRecord to insert data:
```
200_000.times do |n|
   Company.create name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"
end
```

As code above, you can see everytime you create a record with ActiveRecord an INSERT statement is generated and sent to the database. if you have 200 000 records as above, it will be generated 200 000 INSERT statements need to be created, and you need call 200 000 times to db. This way makes your functionality time consuming and reduces the performance of the application as it takes many instructions SQL to write data.

Now we learn how to use  gem "activerecord-import" for better way to insert data.

### Gem ActiveRecord import

Gem `activerecord-import`  is library used to insert a large number of records into the use database ActiveRecord. By using this gem,  it allows us to use one statement insert with alot of data. And this ways can help you to improve the performance in your application.

Add Gem ActiveRecord import into your `Gemfile` :
```
gem "activerecord-import", "1.0.4"
```
Add code as below to file `application.rb`
```
require "activerecord-import/base"
ActiveRecord::Import.require_adapter("mysql2")
```
If you use postgres code wil be like below:
```
require "activerecord-import/base"
ActiveRecord::Import.require_adapter("postgres")
```
Now we can use  gem `activerecord-import` to import data and we still need to insert  200 000 companies as above.

**Insert data and validate model**

For function `import`, we can use an array of model objects for insert data.
```
companies = []
200_000.times do |n|
  companies << Company.new name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"
end

# with validations
Comppany.import companies, validate: true
```
If you want your insert data more faster, you can insert without validation.
```
companies = []
200_000.times do |n|
  companies << Company.new name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"
end

# without validations
Comppany.import companies, validate: false
```

**Insert data with column and model**

We can also use an array of model objects with function `import`. Column names are used to specify the fields to be imported into the database.
```
companies = []
columns = [:name, :description, :address]
200_000.times do |n|
  companies << Company.new name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"
end

Comppany.import columns, companies
```

**Insert data with Hash**

The method `import` can using with array of hash objects and data will be inserted to database by key to specific field in db.
```
companies = []
200_000.times do |n|
  companies << {name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"}
end

Comppany.import companies
```
**Insert data with columns and array data**

With function `import`, we  can insert an array of column names and an array of other arrays. Each sub array represents a record and lists values in the same order as the specified columns.
```
columns = [:name, :description, :address]
companies = []
200_000.times do |n|
  companies << ["#company_#{n}", "description_#{n}", "address_#{n}"]
end

Comppany.import columns, companies
```
**Insert data with columns and Hash data**

We can also using with an array of column names and an array of hash objects. Column names are used to specify the fields to be imported into the database.
```
columns = [:name, :description, :address]
companies = []
200_000.times do |n|
  companies << {name: "#company_#{n}", description: "description_#{n}", address: "address_#{n}"}
end

Comppany.import columns, companies
```

### Conclusion
it isn't a good solution for insert many data to database by loop and create for each records one by one because it takes time and make application become bad performace.
Insteat of this, you can use gem `activerecord-import` optimizes speed and performance, and provides validate  `validate` options.
Reference source: https://github.com/zdennis/activerecord-import