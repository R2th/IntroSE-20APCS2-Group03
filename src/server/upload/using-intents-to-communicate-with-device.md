Somtimes as a developer we simply want to use some predefined or functionalities already provided by the device. Take for example we want the user to be able to make a phone call or send an sms, we dont need to develop our own custome dialer interface. We can simplu use the device's dialer to archieve this. Intents can handle various type of functionality and below are some example of Implicit Intents.

**Opening Dialer**

```
Intent intent = new Intent(Intent.ACTION_DIAL);
intent.setData(Uri.parse("tel:0123456789"));
startActivity(intent);
``` 

![](https://images.viblo.asia/dcb0307f-cfd7-4460-8a2d-84fa0dba675b.jpg)
By passing the Intent.ACTION_DIAL we are teling the device to use any app that supports this feature of dialing a phone number. Could be your default dialer or skype and such. Also we can pass the contact value (here we use 0123456789) and it will be displayed on the screen.


**Opening Message**

```
Intent smsIntent = new Intent(Intent.ACTION_VIEW);
smsIntent.setType("vnd.android-dir/mms-sms");
smsIntent.putExtra("address", "12125551212");
smsIntent.putExtra("sms_body","Body of Message");
startActivity(smsIntent);
``` 

![](https://images.viblo.asia/246175a4-1fe9-459f-bb32-00f429108f4d.jpg)
By passing the Intent.ACTION_VIEW and setting Type =  "vnd.android-dir/mms-sms" we are teling the device to use any app that supports mesaging feature of dialing a phone number. Could be your typical sms, mms dialer and such. This includes the body of the sms and the address.

**Opening Webview**

```
String url = "http://www.google.com";
Intent i = new Intent(Intent.ACTION_VIEW);
i.setData(Uri.parse(url));
startActivity(i);
``` 

![](https://images.viblo.asia/1eaed0e6-9953-47e8-ad95-588cac1986cd.jpg)
This will pass the entered url to the intent which is then oppended in the native browser of the device.


**Opening Picture Camera**
```
Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
startActivityForResult(intent, 0);
```

![](https://images.viblo.asia/7b966ba8-d878-4fca-97d7-87e0b23f8d96.jpg)

This method allows you to open the native camera interface to capture a picture. After capture one can simple get the uri of the image by calling the onActivityResult as shown below...

```
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (resultCode == Activity.RESULT_OK && requestCode == 0) {
    String result = data.toURI();
    // ...
  }
}
```

**Opening Text Supporting Apps**
// Create the text message with a string
```
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, textMessage);
sendIntent.setType("text/plain");
```

// Verify that the intent will resolve to an activity
```
if (sendIntent.resolveActivity(getPackageManager()) != null) {
    startActivity(sendIntent);
}
```

![](https://images.viblo.asia/97f7f1cd-5b06-4eb7-a8da-d124835dd150.jpg)

This will show a popup with supported Apps that allows texts such as Messenger, Sms, Twitter and so on.

**Opening GoogleMaps passing Lat and Lng**
```
double lat = 28.43242324;
double lng = 77.8977673;
String uri = String.format(Locale.ENGLISH, "http://maps.google.com/maps?q=loc:%f,%f", lat, lng);
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
startActivity(intent);
```

![](https://images.viblo.asia/ba3805be-fb15-42de-a03c-f8b692a97b2b.jpg)


Passing the lat and lng will open the Map application on the android device with the predefined location.

There are many more intents so feel free to explore [here](https://developer.android.com/guide/components/intents-filters).... Happy Coding!!!