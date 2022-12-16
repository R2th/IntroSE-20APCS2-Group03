###  What is Magento?
Magento is an open source PHP built-in help programmer can create ecommerce websites. Magento was released on March 31, 2008 by Varien and it was developed on the basis of the Zend Framework.

### Why use magento?

Magento offers all the features and tools to build and install a fast ecommerce website.
Main function in Magento:
* Product Management: With multiple images, optional product reviews, product reviews, inventory, inventory.
* Category management: easy to find and select products by category
* Inventory management: product management left in stock, import, export ...
* Client account: account status, transaction history, favorites, address, shopping cart ...
* Customer service: enhanced features, customer contact form; Comprehensive follow-up, email service.
* Order Management
* Payment: Many payment methods like credit card, PayPal, Authorize.net , Google Checkout, support for external payment modules like CyberSource, ePay, eWAY and more.
* Search technology: fast, friendly, support search on Google SiteMap
* International support: multi-lingual and monetary
* Promotion and marketing tools: coupons, promotions and more.
* Analytics and reporting: integrates with the Google Analytics service and provides multiple reports.
* The technical foundation of magento
* Magento is coded by the PHP language and uses the MySQL database.
* The database is based on the entity-attribute-value (EAV) model.
* Magento is based on modular architecture (all functions are modular).

###  Architecture in magento
First of all, we need to know Magento is a great combination of Zend Framework with MVC (Model - View - Controller) architecture. With the use of magento, we can enumerate the advantages of the two models in developing applications on the basis of magento:

Inherit from Zend: With the inheritance from Zend, we can easily extend the application's classes to build, easily embed, and link to libraries. <! -
Inherit from the MVC model: It allows us to separate applications that need to evolve into three different components: Model, View, and Controller. Each component has a separate task and is independent of the other components. From there we can easily build and maintain the application as easily as possible.

**Directory structure in magento**

To develop the application on magento most easily, we first need to clearly understand each directory in Magento Framwork.
The following are the main magento directories that we need to understand during application development:
* 404 - Magento's 404 template and skin directory
* app - contains all the code (modules), template, configuration file, language. At the same time cure the theme, the default installation of the system
* downloader - Used to install and upgrade magento without using SSH
* js-contains the javascrip code
* lib - contains libraries of developers
* media - contains files uploaded to the system such as product images, documents ...
* pkginfo - contains information about the magento installation packages
* report - contains the reports that the system uses to report an error
* skin - contains css, image, javascrip files used to design themes, packages, templates
* var - where the files are stored. file cache, session, import, export data

**Module structure**

One module in magento has two main sections: "code" and "template".
* Code: Define the actions that the module will interact with the database.
* Template: The interface layout of the module based on code.
The template code consists of the following elements:
* Block: A place to load data, adjust data from the database before displaying data to the template.
* Controller: Obtaining a request from the user from http will then pass the request to the processing class.
* Etc: includes the xml file used to configure the module. Depending on the module, there are different xml files.
* Helper: We're going to put in the helper classes here. The functions we define in the helper can be called anywhere. So the helper is the place to hold "tools" to make your programming process easier in a certain way.
* Model: Place queries directly to the database.
* Sql: Include sql statements to create tables, interactively change data ...

### Steps to install magento

**Download Magento**

You can choose the package and download via Magento Community Edition 2.0 download.

![](https://images.viblo.asia/fd6ce907-ebe3-4df9-95e6-b4343490c4eb.png)

**Create DataBase**

Open PHPmyadmin, then create Database for Magento 2.0

![](https://images.viblo.asia/4e7b4c92-8277-4860-af1c-75f71c11e40b.jpg)

**Agree and Setup**

The Magento Downloader welcome page appears.

![](https://images.viblo.asia/7700f803-46b7-4e18-973d-dfcff334bd78.png)

**Verify System requirements**

To validate your server environment, click the Continue button. If error warnings appear, you must correct the errors and validate your environment again.

![](https://images.viblo.asia/dc9752aa-217c-4279-930e-3fb00caf3a68.png)

**Setup the database**

![](https://images.viblo.asia/f15af11e-82df-4817-9a35-31ff61ebb6b5.png)

* Database Server Host: localhost
* Database Server Username
* Database Server Password
* Database Name: input the database name you have just created at section Create Database
* Table prefix: this field could left blank

**Web Configuration**

![](https://images.viblo.asia/d6bfa1e4-c472-4edc-975f-795229f1f805.png)

* Your Store Address: enter the base URL for your store
* Magento Admin Access: Enter the base URL for the store’s Admin Panel. The default value is admin

**Configure Language, Time Zone and Currency**

![](https://images.viblo.asia/dbb627fd-cdad-49a8-af27-215be400a643.png)

**Create Admin Account**

![](https://images.viblo.asia/83f43aad-0341-4203-9134-5059a6aeadc1.png)

* New Username: enter the Admin account of the owner of your store
* New Email: enter the Email of the owner of your store
* New Username: enter the Password of the owner of your store
* New Email: Confirm the password

**Install & Finish**

![](https://images.viblo.asia/efb3d4e3-2e0d-404b-9b29-e878df52f836.png)