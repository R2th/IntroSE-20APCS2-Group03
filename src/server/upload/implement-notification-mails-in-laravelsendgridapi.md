I will be creating a contact form with laravel and notify the contents to the email, so I will share what I learned there. (Via WebAPI)

# Get SendGrid APIKey
First, create a SendGrid account.

Issue an API key. The publishing page is difficult to understand, but it is located in Settings in the menu bar on the left side of My Page.

![](https://images.viblo.asia/81ef8725-df9a-440c-b9f2-d0ac036d916f.png)

Click “CreateAPIKey” and go to the following screen, name the API key. Here I named it "laravel". API Key Permissions is set to Restricted because it only sends emails.
![](https://images.viblo.asia/c530f3ed-ea20-4176-b788-a7e26635d432.png)

If you only want to send mail, Mail Send is all you need. Next up is Create & View.

![](https://images.viblo.asia/6c1c7d2c-5b5b-4490-afc1-c6320d2fc4a0.png)

APIKey should be displayed. Copy it and don't forget to backup it because it will only be displayed once.

![](https://images.viblo.asia/9b0ee886-074d-46e0-9997-8982fca3377f.png)

Describe the API key, mail driver (SendGrid in this case), from address, and from name in the `env` file.

By default, SendGrid cannot be specified as a driver, but some people have created a package, so install it using composer.

If there is a problem, delete the [driver](https://packagist.org/packages/s-ichikawa/laravel-sendgrid-driver).

```
MAIL_DRIVER=sendgrid
SENDGRID_API_KEY='copied APIKey'
MAIL_FROM_ADDRESS= sending address
MAIL_FROM_NAME= sending name
```

# Create Mailable
Finally the implementation part. Create Mailable class.

`php artisan make: mail SendGridSample`
A file called `App/Mail/SendGridSample` is created. Edit this

(Don't forget to write down the driver's use that I'm grateful for.)

Create a build method and write the process in it.

Since `from` is written in the `env` file, it does not need to be written here.

* SendGridSample.php
```
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Sichikawa\LaravelSendgridDriver\SendGrid;

class SendGridSample extends Mailable
{
    use SendGrid;

    /**
     * Create a new message instance.
     *
     * @return void
     */
     // Variable for data received in argument
     protected $contact;

    public function __construct($contact)
    {
        // Set the data received in the argument to a variable
        $this -> contact = $contact;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
        ->view('emails.email') //Specify the template to call
        ->subject('check the content of meetingお問い合わせ内容確認')
        ->with(['contact' => $this -> contact]) //Pass the data set by the with option to the template
        ]);
    }
}
```

Describe use of SENDGRID_API_KEY of env in service.php file.

* service.php

```
[  
    'sendgrid' => [
      'api_key' => env('SENDGRID_API_KEY')
   ]
];
```

# Create Mail Template
A simple one that returns your name, email address, and the content of your inquiry.

```
  <div class="row">
    <h1>We have received your inquiry.</h1>
  </div>

<br>
・Name<br>
Mr{{ $contact['name'] }}<br>
<br>
・Mail address<br>
{{ $contact['email'] }}<br>
<br>
・Inquiry Content<br>
{!! nl2br(e($contact['post'])) !!}<br>

  <div class="row">
    <p>Thank you for your inquiry。</p>
  </div>
```

# Edit ContactController
* ContactController.php
```
<?php

// Use the created mail class
use Illuminate\Support\Facades\Mail;
use Sichikawa\LaravelSendgridDriver\SendGrid;



    public function send(Request $request)
    {
        \Mail::to($request -> email)
        ->send(new SendGridSample($request));

    }

```

Now you can send the completion email of the inquiry.