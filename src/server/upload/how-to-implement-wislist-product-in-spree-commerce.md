In my previous article, I already introduce to all of about Spree commerce about feature, extention and how to setup it with Ruby on Rails. For this article, i will show to all of you to implementing wishlist product in spree commerce.
### I. What is Wishlist mean in commerce ?
Wishlist is very import feature in commerce website. It allows shoppers to create personalized collections of products they want to buy and save them in their user account for future reference. Wishlists signify a customer’s interest in a product without an immediate intent to purchase.

**Why are Wishlists Important to commerce ?**
Not only important to customers to creates an opportunity to save items “for later” if they can’t commit to a purchase at that moment and find them quickly whenever they return to the store, but it is also very important to online retailers about customer’s shopping experience and  strategic value. Shopping experience can give you best value such as:
* Wishlists create a snapshot of your customers’ way of thinking. 
* Wishlists provide a glimpse into your customer’s’ world.
* Wishlists can drive a lot of traffic.
* Wishlists can help you deal with out of stock items.
* Wishlists are a great way to alert customers about a sale.

Wishlists are important to many people for many different reasons. Sometime, customer think about Wishlist such as:
* Wishlists are reminders.  
* Wishlists can educate customers.
* Wishlists are for sharing.

### II. Wishlist in Spree commerce
The Spree Wishlist extension enables multiple wishlists per user, as well as managing those as public (sharable) and private. It also includes the ability to notify a friend via email of a recommended product.
After installation `gem spree`, now let's go to setup `gem spree_wishlist`
Add the following to your Gemfile and Run:

```
gem 'spree_wishlist'
```

```
bundle install
bundle exec rails g spree_wishlist:install
```

after setup the `spree_wishlist` in the model association `User` will have many `Wishlist`. User can input wishlist name, set as default wishlist and set as private and public wishlist.

```
Spree::Wishlist(id: integer, user_id: integer, name: string, access_hash: string, is_private: boolean, is_default: boolean, created_at: datetime, updated_at: datetime) 
```
For product and wishlist have association `has_many` to eachother through` Spree::WishedProduct` .

```
Spree::WishedProduct(id: integer, variant_id: integer, wishlist_id: integer, remark: text, created_at: datetime, updated_at: datetime, quantity: integer) 
```

Now i will show to add product to wishlists:

![](https://images.viblo.asia/bcf72f09-1be8-48dc-8f4b-75771b4a86ea.png)


In my view, on bottom on each product, i add clickable Heart button for user can click on it to add that product to their wishlist.
```
<% cache(cache_key_for_products) do %>
      <% @products.each do |product| %>
        <% url = spree.product_path(product, taxon_id: @taxon.try(:id)) %>
        <div class="product-wrap">
          <div class="product product-slideup-content text-center">
            <figure class="product-media">
              <%= link_to url do %>
                <%= product_image(product, itemprop: "image", style: 'width:220;height:245') %>
              <% end %>
            </figure>
            <div class="product-details">
              <h3 class="product-name">
                <%= link_to url, itemprop: "url" do %>
                  <%= content_tag(:span, truncate(product.name, length: 50),
                    class: 'info', itemprop: "name", title: product.name) %>
                <% end %>
              </h3>
              <div class="product-price">
                <ins class="new-price"><%= display_price(product) %> </ins>
                <del class="old-price"><%= display_price(product) %></del>
              </div>
            </div>
            <div class="product-hide-details">
              <div class="ratings-container">
                <!-- <div class="ratings-full">
              </div>
              <div class="product-action">
                <% if spree_current_user.present? %>
                  <%= link_to wished_products_path(wished_product: {variant_id: product.master.id}),
                    method: :post, class: "btn-product-icon btn-wishlist #{'added' if is_wished_product?(spree_current_user, product.master)}",
                    title: "Add to wishlist",
                    remote: true do %>
                    <i class=<%= is_wished_product?(spree_current_user, product.master) ? "d-icon-heart-full" : "d-icon-heart" %>></i>
                  <% end %>
                <% else %>
                  <%= link_to spree.login_path, class: "btn-product-icon btn-wishlist login",
                    title: "Add to wishlist" do %>
                    <i class="d-icon-heart"></i>
                  <% end %>
                <% end %>
                <a href="#" class="btn-product btn-cart" data-toggle="modal"
                  data-target="#addCartModal" title="Add to cart">add to cart</a>
                <a href="#" class="btn-product-icon btn-quickview" title="Quick View"><i
                    class="d-icon-search"></i></a>
              </div>
            </div>
          </div>
        </div>
      <% end %>
    <% end %>
```
```
<%= link_to wished_products_path(wished_product: {variant_id: product.master.id}),
    method: :post, class: "btn-product-icon btn-wishlist #{'added' if is_wished_product?(spree_current_user, product.master)}",
    title: "Add to wishlist",
    remote: true do %>
    <i class=<%= is_wished_product?(spree_current_user, product.master) ? "d-icon-heart-full" : "d-icon-heart" %>></i>
  <% end %>
```
When user click on Heart button, spree_wishist will be added the product to user wishlist. In case we don't assiged to specific wishlish, spree_wishist will added that product to default wishlist.
![](https://images.viblo.asia/fa6efa7c-405b-44dc-a3ab-80bcbca97af5.png)

Resource:
- https://github.com/spree/spree
- https://github.com/spree-contrib/spree_wishlist