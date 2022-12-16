### What is Spree commerce?
Spree is most popular Platform on Ruby that is a easy to use and elegantly designed software. It ensures greater flexibility in managing your store and is a visual treat. It includes a wide variety of features including mail marketing and CRM tools.

Spree has become one of the most popular open-source eCommerce platforms built with Ruby on Rails. It is aimed at building large online stores and a wide variety of features. Spree is known for being lightweight when compared to platforms like Magento or Shopify due to its minimal approach to code design.

Any way Spree is also a fully-featured e-commerce solution that can be easily integrated into a Rails application. If you need to turn a Rails app into a store that sells products then Spree is one of the quickest ways to do this. In this episode we’ll set up Spree in a new Rails application and customize some of its functionality so that you can get an idea as to how it works and see if it fits the needs of your application.

Spree consists of several different gems (modules) which allows full customization (e.g. Spree can be used in API-only mode to create a custom storefront or use spree_frontend module that will give you a default customizable Spree storefront). 

### Spree advantages

* Personalization: personalize the user experience with product recommendations, wishlists
* Payment methods: with Spree it is possible to pay with credit or debit cards, use country-specific payments or installments
* Social-media integrations: ability to log in through social media accounts, share products
* 3rd party integration flexibility: freely integrate with HotJar, ApplePay, HubSpot, MailChimp and others
* Marketing opportunities: SEO integration, A/B testing, campaign management
* Community support via Slack, e-mail or GitHub
* Scalability: ability to expand resources when your business is growing
* Mobile-friendly approach: the UI ensures intuitiveness with responsive design

### Integrate

Now let's me introduce all of you to set up Spree with ruby on rails: for the set up step, it is very easy we just add `gem spree` in `Gemfile` as below:
```
gem 'spree', '~> 3.7.0'
gem 'spree_auth_devise', '~> 3.5'
gem 'spree_gateway', '~> 3.4'
```
and then run `bundle install` next step we need install generators to set up Spree as below:

```
bundle exec rails g spree:install --user_class=Spree::User
bundle exec rails g spree:auth:install
bundle exec rails g spree_gateway:install
```

If you want generate the sample data of Spree you can run commend line as below:
```
bundle exec rake railties:install:migrations
bundle exec rails db:migrate
bundle exec rails db:seed
bundle exec rake spree_sample:load
bundle exec rails g spree:frontend:copy_storefront
```

Now we can run server and we wiil Spree storrfont:

![](https://images.viblo.asia/52ea6009-9c2b-4770-aeb6-e79609a0381f.png)

![](https://images.viblo.asia/861765fc-2d56-4a78-8266-077e3a9a3cf4.png)

More than this Spree also provide us additional features not present in the Core system:

* spree_analytics_trackers: Adds support for Analytics Trackers (Google Analytics & Segment)
* spree_avatax_official: Improve your Spree store's sales tax decision automation with Avalara AvaTax
* spree_auth_devise: Provides authentication services for Spree, using the Devise gem.
* better_spree_paypal_express: This is the official Paypal Express extension for Spree.
* spree_braintree_vzero: Official Spree Braintree v.zero + PayPal extension
* spree_contact_us: Adds Contact Us form
* spree_digital: A Spree extension to enable downloadable products
* spree_gateway: Payment Gateways (Stripe, Apple Pay, Braintree, Authorize.net and many others)
* spree_editor: Rich text editor for Spree with Image and File uploading in-place
* spree_globalize: Adds support for model translations (multi-language stores)
* spree_i18n: I18n translation files for Spree Commerce
* spree-mollie-gateway: Official Mollie payment gateway for Spree Commerce.
* spree-multi-domain: Multiple Spree stores on different domains - single unified backed for processing orders
* spree_multi_vendor: Spree Multi Vendor Marketplace extension
* spree-product-assembly: Product Bundles
* spree_recently_viewed: Recently viewed products in Spree
* spree_related_products: Related products extension for Spree
* spree_social: Building block for spree social networking features (provides authentication and account linkage)
* spree_sitemap: Sitemap Generator for Spree
* spree_shared: Multi-tenancy for Spree using Apartment (per tenant databases)
* spree_static_content: Manage static pages for Spree
* spree_volume_pricing: It determines the price for a particular product variant with predefined ranges of quantities
* spree_wishlist: Wishlist extension for Spree

Resoure:
- https://spreecommerce.org/
- https://github.com/spree/spree