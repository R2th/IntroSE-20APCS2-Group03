As I show all of you in the Part I about Salesforce and We also know Salesforce which is a Customer Relationship Management (CRM) platform and provides us cloud-based applications for Service & Marketing . And now for this Part, I will introduce you about implement the Salesforce API and how you can sync data between Salesforce and your Rails application. Fortunately, for Rails we have gem "restforce" that us easy to interact with SalesForce API. Before we start to implement we need register account development with SalesForce.

### Setup Developer edition account
For sign up account development SF, we can go with this link [SalesFoce](https://developer.salesforce.com/signup) . For using REST API SF with the application we to enable this feature first, We can find the “API Enabled” permission in Developer Edition account. As usual, this permission is enabled by default.
After we finsih Signup, then you can login to your account. You need create a APP and take some key for development as below:
```
SALESFORCE_USERNAME: “username”
SALESFORCE_PASSWORD: “password”
SALESFORCE_SECURITY_TOKEN: “security token”
SALESFORCE_CLIENT_ID: “client id”
SALESFORCE_CLIENT_SECRET: “client secret”
SALESFORCE_HOST: “host domain name”
SALESFORCE_API_VERSION=”46.0″
```
###  RESTFORCE
Now we to implement SalesForce API with gem "restforce" :
Add this line to your application's Gemfile and run `bundle install`.
```
gem 'restforce', '~> 3.1.0'
```
You can also set the username, password, security token, client ID, client secret and API version in environment variables:
```
export SALESFORCE_USERNAME="username"
export SALESFORCE_PASSWORD="password"
export SALESFORCE_SECURITY_TOKEN="security token"
export SALESFORCE_CLIENT_ID="client id"
export SALESFORCE_CLIENT_SECRET="client secret"
export SALESFORCE_API_VERSION="41.0"
```
Now we can the connect with SalesForce API by:
```
@client = Restforce.new(
  api_version: ENV["SALESFORCE_API_VERSION"],
  client_id: ENV["SALESFORCE_CLIENT_ID"],
  client_secret: ENV["SALESFORCE_CLIENT_SECRET"],
  host: ENV["SALESFORCE_HOST"],
  password: ENV["SALESFORCE_PASSWORD"],
  timeout: 10,
  username: ENV["SALESFORCE_USERNAME"])
```
### Query in Salesforce
In SF have multiple objects like Account, Lead, Contact ... To interact with these objects,  we can need to follow queries as below:
* query
* query_all
* select
* search
* create
* find
* update
* destroy

I will show some example relate to SF queries above:
 - Create Lead:
```
 @client.create!("lead",
  Company: "company name",
  LastName: "user name")
```
When Lead created successfully, SF will return us a lead_id that we can save lead_id in our DB.
- Create Account:
```
 @client.create!("Account",
  Name: "user name")
```
When Account created successfully, SF will return us a account_id that we can save account_id in our DB.
 - Update Lead:
```
 @client.update!("lead",
  Id: "lead_id",
  Company: "new company name",
  LastName: "newuser name")
```

- Update Account:
```
 @client.update!("Account",
  Id: "account_id",
  Name: "new user name")
```