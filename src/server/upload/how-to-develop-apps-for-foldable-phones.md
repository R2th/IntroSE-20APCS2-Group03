![](https://images.viblo.asia/4cce4eda-09e8-422c-a305-5cbc7a69adc7.jpg)
Have you ever considered carrying your tablet in your pocket? Sounds pretty uncomfortable, Right? Well, now you can.

On the off chance that you have been living under the stone and simply found out about it at this moment, then you need to check out this video from Samsung keynote –
[](https://youtu.be/MguV4zQc3L0)
But before Samsung announced anything about its foldable device, Google announced its support for foldable screens.

Google’s representative Dave Burke described the foldable experience as “Screen Continuity” where the application experience transfer between bigger and smaller screens seamlessly.

-----

## Samsung announces Samsung Galaxy Fold followed by Huawei Mate X
Samsung has unveiled it’s highly anticipated Galaxy Fold device. Normally, it’s a 4.6-inch screen which can easily fit in your pocket but it unfolds like a book into a 7.3-inch display.
![](https://images.viblo.asia/852e536c-f7c7-44d5-91e0-6ee1a5122bb0.jpg)
The screen of the device is made from a composite polymer rather than the traditional glass screens.

According to Samsung, it is an active-matrix light-emitting diode (AMOLED) screen that allows a higher definition display.

The device is perfect for those who like to multitask as you can open up to 3 active apps simultaneously.

The device also comes with a software system called app continuity which allows users to continue to their task while switching between the screens.

Huawei was not far behind to showcase its foldable offering by the name of Mate X.
![](https://images.viblo.asia/9f8c679b-5812-43d1-9218-d96b3d3e48c5.jpg)
It’s looking even more promising as it features a 6.6-inch screen compared to Samsung’s 4.6 inches and when unfolded it reveals an 8 inch OLED tablet screen.

We can expect many more foldable devices coming this year from different OEM manufacturers and it would be great to see the implementation process of the foldable screen.

-----

## How to develop apps for foldable phones?
The foldable devices will certainly require developers to develop apps which offer multiple screen sizes and configurations. The foldable devices will pose some real challenges for developers when it comes to screen sizes and UX of the application.

So to start the development of apps for Foldable devices, you need to first look into the design guide as the very first step.

### App continuity
Whenever you are folding or unfolding your device, it triggers configuration changes –

* smallestScreenSize
* screenSize
* screenLayout
Apps that do not support multi-window can resize itself when a device gets folded or unfolded. However, when any configuration change occurs, the default case destroys the whole activity and then recreates it.

So it becomes important for developers to store the previous state of the application. For this developers can use onSaveInstanceState() and ViewModel object.

Before the activity is destroyed, you can save its state using onSaveInstanceState() and restore it using onCreate() or onRestoreInstanceState().

### Multi-window
As you all may know, there are two types of multi-window –

* Split view
* Freeform window
In normal devices, the split view can hold two apps at the same time. Whereas, Samsung Galaxy Fold supports 3 split view.

The foldable devices also enhance the functionality of the freeform window. Thus it becomes important for developers to utilize multi-window to make the best use of the foldable screen.

### Multi-resume
In the earlier versions of Android, multi-window support only one app active at a time. The other app will be paused when it not active.

Android Pie offered the support of multi-resume functionality but it was up to the app developers and OEM’s (Original Equipment Manufacturer) whether to opt in or not.

So we can expect Android Q will offer multi-resume as a mandatory behavior.

To make you app multi-resume, you have to set the manifest flag so that it can keep the app in the resumed state.
```
<application>
 <meta-data
   android:name=”android.allow_multiple_resumed_activities”
   android:value=”true” />
 <activity … />
</application>
```
### Optimized layouts
As the app will be running on both the displays so it would be better to add a separate resource folder to show more rich content. Here is a link for better understanding – https://developer.android.com/guide/practices/screens_support

Testing your app in a foldable device
You can easily test your app in a foldable environment by running a foldable emulator provided by Samsung.

* Download the emulator from Samsung developers official site
* Install the emulator

Complete step by step guide available at - [Developing and testing apps for foldable devices](https://www.vtnetzwelt.com/mobile-application-development/how-to-develop-apps-for-foldable-devices/)