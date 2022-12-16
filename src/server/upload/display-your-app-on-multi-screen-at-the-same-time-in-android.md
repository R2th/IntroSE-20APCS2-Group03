![](https://images.viblo.asia/bfefeb97-cddc-40a5-bd0f-1795999c5d18.png)

*Display your app on multi-screen at the same time by using multi-display in Android.*

## Overview
Android 10 or higher version supported to display other activities on many external screens, and they are named [multi-display](https://developer.android.com/guide/topics/ui/foldables?#multi-display) which are used for foldable phones as well as a secondary screen is connected with your device. 

Today, I will introduce with you about how to display an activity on another screen, and the [SDK's LG for the LG V50](http://mobile.developer.lge.com/develop/sdks/lg-dual-screen-sdk/) to tracking event for this foldable phone with its cover secondary screen.

## Display your activity on another screen
### Declare your secondary activity in the manifest
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.android.multiplescreens">
    <application
        <!-- See about the taskAffinity attribute at http://bit.ly/34RKvzC -->
        <activity
            android:name=".SecondActivity"
            android:launchMode="singleTask"
            android:taskAffinity="cover.container" />
    </application>
</manifest>
```
`launchMode` is `singleTask` which combine between `FLAG_ACTIVITY_CLEAR_TOP` and `FLAG_ACTIVITY_NEW_TASK` set in your intent when you start an activity. Cause for using these flags is to run your activity on the new task.

Besides, I have an attribute that is  `taskAffinity`. If your activity just use the `FLAG_ACTIVITY_NEW_TASK` flag that `taskAffinity` isn't set, it start on the same task with other activities. However, if you set `taskAffinity` for your activity, it would run on the new task and activities have a same `taskAffinity` will run together. 

### Start your activity
Firstly, you need a [`DisplayManager`](https://developer.android.com/reference/android/hardware/display/DisplayManager) which manages the properties of attached displays. 
```kotlin
val displayManager = getSystemService(Context.DISPLAY_SERVICE) as DisplayManager
```
Next, you use it to take all display connected with the device. 
```kotlin
val displays = displayManager.displays
```
Ensure that your device has than more two-display then create activity options by the `ActivityOptions` class to indicate the display ID that you would like to show your activity.
```kotlin 
if (displays.size > 1) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                // Activity options are used to select the display screen.
                val options = ActivityOptions.makeBasic()
                // Select the display screen that you want to show the second activity
                options.launchDisplayId = displays[1].displayId
                // To display on the second screen that your intent must be set flag to make
                // single task (combine FLAG_ACTIVITY_CLEAR_TOP and FLAG_ACTIVITY_NEW_TASK)
                // or you also set it in the manifest (see more at the manifest file)
                startActivity(
                    Intent(this@MainActivity, SecondActivity::class.java),
                    options.toBundle()
                )
            }
        }
```

Now, you can run your activity on another screen. 

## LG Dual Screen SDK
### What's the LG Dual Screen?
The LG Dual Screen is a mobile handset with two screens. Independent applications can be run on the screens at the same time.
![](https://images.viblo.asia/f792125b-4952-44ba-8f74-8d07c98506f8.png)

It has an SDK to support for tracking folding events.

### Callbacks
This SDK have two major callbacks:
* `CoverDisplayCallback`: Handle events related to states such as cover is enabled, disabled or dismounted.
```kotlin
private inner class MainCoverDisplayCallback : DisplayManagerHelper.CoverDisplayCallback() {
        override fun onCoverDisplayEnabledChangedCallback(state: Int) {
            displayManagerHelper?.coverDisplayState?.let {
                Log.i(TAG, "Current DualScreen Callback state: ${coverDisplayStateToString(it)}")
            }
            if (prevDualScreenState != state) {
                when (state) {
                    DisplayManagerHelper.STATE_UNMOUNT -> {
                        Log.i(TAG, "Changed DualScreen State to STATE_UNMOUNT")
                    }
                    DisplayManagerHelper.STATE_DISABLED -> {
                        Log.i(TAG, "Changed DualScreen State to  STATE_DISABLED")
                    }
                    DisplayManagerHelper.STATE_ENABLED -> {
                        toSecondScreen()
                        Log.i(TAG, "Changed DualScreen State to  STATE_ENABLED")
                    }
                }
                prevDualScreenState = state
            }
        }
    }
```
* `SmartCoverCallback`: This callback help indicate when your cover is opened, closed or flip over. 
```kotlin
private inner class MainSmartCoverCallback : DisplayManagerHelper.SmartCoverCallback() {
        override fun onTypeChanged(type: Int) {
            Log.i(TAG, "SmartCoverCallback type: ${displayManagerHelper?.coverType}")
        }

        override fun onStateChanged(state: Int) {
            displayManagerHelper?.coverState?.let {
                Log.i(TAG, "Current SmartCoverCallback state: ${smartCoverStateToString(it)}")
            }
            when (state) {
                DisplayManagerHelper.STATE_COVER_OPENED -> {
                    Log.i(TAG, "Received SmartCoverCallback is STATE_COVER_OPENED")
                }
                DisplayManagerHelper.STATE_COVER_CLOSED -> {
                    Log.i(TAG, "Received SmartCoverCallback is STATE_COVER_CLOSED")
                }
                DisplayManagerHelper.STATE_COVER_FLIPPED_OVER -> {
                    Log.i(TAG, "Received SmartCoverCallback is STATE_COVER_FLIPPED_OVER")
                }
            }
        }
    }
```

### `DisplayManagerHelper`
`DisplayManagerHelper` is provided by SDK used to register above callbacks as well as determine your device is an LG dual screen or not. 

You can construct this class with the current context. If it's successful, your activity isn't the LG dual screen device. Otherwise, you can register your callbacks through two-function are `registerCoverDisplayEnabledCallback(key: String, callback: CoverDisplayCallback)` and `registerSmartCoverCallback(callback: SmartCoverCallback)` 

```kotlin
 try {
            // Try to construct the DisplayMangerHelper.
            // If it isn't successful, this device isn't LG dual screens
            displayManagerHelper = DisplayManagerHelper(applicationContext)
            coverDisplayCallback = MainCoverDisplayCallback()
            smartCoverCallback = MainSmartCoverCallback()

            // Register the callbacks for covers
            displayManagerHelper?.registerCoverDisplayEnabledCallback(
                applicationContext.packageName,
                coverDisplayCallback
            )
            displayManagerHelper?.registerSmartCoverCallback(smartCoverCallback)
            isLGDualScreen = true
        } catch (e: Exception) {
            isLGDualScreen = false
            Log.e(TAG, "This device isn't LG dual screens", e)
        }
```
Finally, you should remove all callbacks when your activity or fragment is destroyed to certain that isn't occur a memory leak.
```kotlin
override fun onDestroy() {
        // Remove all callbacks when this activity is destroyed
        displayManagerHelper?.unregisterCoverDisplayEnabledCallback(applicationContext.packageName)
        displayManagerHelper?.unregisterSmartCoverCallback(smartCoverCallback)
        super.onDestroy()
    }
```

## Demo 
You can see my multi-screen demo on [GitHub](https://github.com/huuphuoc1396/MultipleScreens). If it's helpful with you, lets a star for me. 
![alt](https://media2.giphy.com/media/4N1wOi78ZGzSB6H7vK/giphy.gif?cid=5a38a5a28f0d64b77b69c2268bb87ad39e6b409b47ec8cf0&rid=giphy.gif)

## References 
1. https://developer.android.com/guide/topics/ui/foldables?#multi-display
2. https://developer.android.com/reference/android/hardware/display/DisplayManager
3. http://mobile.developer.lge.com/develop/sdks/lg-dual-screen-sdk/