>Hi! I am Brian Kent Repuesto, a Laravel Developer from Sun* Inc. Philippines. I have been using Stripe with Laravel for almost a year.  In this Article, I will be sharing on how to Integrate Laravel with Stripe.


# Stripe
Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously designed APIs and unmatched functionality help you create the best possible product for your users. Millions of the world’s most innovative technology companies are scaling faster and more efficiently by building their businesses on Stripe.
Moreover, Stripe is ever improving that it gains new features every month!


-----


## Create A Stripe Account
Firstly, we need to have a **Stripe Account**. Go to [Stripe](https://stripe.com/), register your account, and let's get started!



-----


## Getting your Stripe Keys
After registering, we need to gather all the needed information, in this case, our **API keys**.

In your Account Dashboard, go to the Left Side of the screen where you can see a sidebar.
Then go to **Developers >> API Keys** 

![](https://images.viblo.asia/a2a55e2c-4772-4974-a6b7-936334d9b8b2.png)

![](https://images.viblo.asia/22300408-41b3-4d46-8e7b-4050ddfa8c2a.png)

These will be needed to connect to Stripe API. We will use them later. So keep it saved!



-----


## Install Stripe via Composer
To make things more simple, We will just need to install Stripe via Composer.

Run this command to your Laravel Project directory.

```composer require stripe/stripe-php```

After the command is executed and the installation gets done. We will now add some variables to our ```.env```  file.

Input the keys that we gathered earlier.

```
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxx123123123
STRIPE_SECRET_KEY=sk_test_xxxxxxx123123123
```



-----


## Create Stripe Controller

In our Laravel Project. Let's create a controller for stripe . Name it anything you would want to or depending on how you structure your project. In my case, I will name it ```StripeController``` .
Here we will write our codes that will communicate to stripe!

After creating, We will use Stripe in our controller and set our stripe API key.

* **Using Stripe in our Controller**
    * So that we can use **Stripe Functions**.

* **Setting Stripe API Keys**
    * So that our Laravel App would be able to communicate to Stripe.



-----



In my case, I set my stripe API key in my  ```__construct``` function. So that you would not need to repeatedly set the API key every time you write a Stripe Function inside that controller.

![](https://images.viblo.asia/7055b13a-380c-4771-9a6c-6d8404dfb562.png)



-----


Now you are ready to connect to Stripe!

For further knowledge on about **Stripe Functions**, click [here](https://stripe.com/docs/api).


-----


Simple right? I hope you will be able to Integrate Laravel with Stripe after this one. Thank you for reading!