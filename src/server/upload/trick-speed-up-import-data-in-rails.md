Using ActiveRecord to insert data into the database is very frequently and too familiar to our programmers. The problem is that we already have a big data that needs to be regularly import into our  application, but the logic of ActiveRecord to  save and create logs is too slow. So how do we improve this speed? Ruby has provided us with a gem activerecord-importand it is available in ruby gem, which has become a standard and extremely useful for mass-importing data with ActiveRecord effectively.

### A simple example

Example we table Car in database and we  import 100,000 car with schema as follows:

```
create_table :cars do |t|
  t.column :name, :string, null: false
  t.column :description, :string
end
```
```
class Car < ActiveRecord::Base
end
```

Suppose `convert_csv_car_attributesis` a method to convert CSV into an array containing the properties of the Car model.

```
convert_csv_car_attributesis.each do |attrs|
  Car.create!(attrs)
end
```
The code is extremely simple, but it takes up to 80 to 90 seconds to finish importing into the database. It maybe take too long a time for importing.
### ActiveRecord is slow?
Each time you create a record with ActiveRecord, a query statement INSERT is created and sent to the database.

That means we have sent 100,000 separate query statements to the database and the database will have to analyze 100,000 statements separately, open and close the table cars 100,000 times to write data, add / update index 100,000 times . That's a lot of things that the database will have to do and it takes a lot of time to do that.

Let's make a little change to speed this up

### Using Gem activerecord-import
You can install activerecord-importwith RubyGems:
```
gem 'activerecord-import'
```
### Improving by importing models with validations
Instead of using `create!`, build the instances of Car memory and pass them to `Car.import` the library method `activerecord-import`:
```
cars = convert_csv_car_attributes.map do |attrs|
  Car.new(attrs)
end

Car.import cars
```
It only takes ~ 5 seconds to do this. Wow - we increased its speed 19 times.

By default, the method `import` will continue to enforce validations and it will find a way to organize all Car instances into one of the most efficient SQL statements.

### Improving by importing models without validations
Whenever preparing a large amount of data that has been previously molded, we can trust that it is valid, we may not need to run ActiveRecord validations while importing data.

To get more performance, we can turn off validations while processing import:
```
cars = convert_csv_car_attributes.map do |attrs|
  Car.new(attrs)
end

Car.import cars, validate: false
```

It only takes  5 seconds to perform import of 100,000 car, 21 times faster.

Here, we set `validate: false` to say that `Car.import` ignore the validations. `validate` The option also accepts the value `true` to execute validations, but it is the default value so we can ignore it when we want to keep the validations.

### Improving by importing columns and values with validations
Sometimes we have the data in an array containing values and all we need to do is match the columns we need to import. If you want to skip building Car instances in memory, you can pass an array of columns and an array of values into the import method as follows:
```
columns = [:name, :description]

array_of_car_attrs = convert_csv_car_attributes

Car.import columns, array_of_car_attrs, validate: true
```
It takes ~ 7 seconds to complete the import. It is also a big improvement over the initial time of 90 seconds.

### Improving by importing columns and values without validations
When we don't need to build Car instances in memory or run validations, we can do the following to achieve that:
```
columns = [:name, :description]

array_of_car_attrs = convert_csv_to_car_attributes

Car.import columns, array_of_car_attrs, validate: false
```
It only takes ~ 2.5 seconds to finish importing. Wow, this is the most effective improvement - increasing the speed up to 38 times.