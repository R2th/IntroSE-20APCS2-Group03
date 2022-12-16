# Introduction
In this tutorial iw ill show how to make a simple intor to your app. Intros can be useful when you want to show off what your app is capable of doing. It briefly shows the functionalities of the app and because this can be annoying to familiar users we will provide a skip option and only show this intro the first time the app is launched and never again. Let's begin!

Create a project IntroApp and enbale support for Kotlin if it is unchecked as the image below shows.

![](https://images.viblo.asia/c43578e1-9346-40bd-b927-f03fe9d92a5f.png)

Click next and finish. Next create a new Activity WelcomeActivity.kt
In this Activity we will add a ViewPager that will hold our intro layouts each with a different background color. Open the layout for this activity and add the ViewPager along with two buttons. One will be the next button to skip to the next intro and the other will be a skip button to skip the intro entirely.

**activity_welcome.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <android.support.v4.view.ViewPager
            android:id="@+id/view_pager"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>
    </FrameLayout>

    <LinearLayout
        android:id="@+id/layoutDots"
        android:layout_width="match_parent"
        android:layout_height="@dimen/dp_30"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="@dimen/dp_20"
        android:gravity="center"
        android:orientation="horizontal"/>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:layout_above="@id/layoutDots"
        android:alpha=".5"
        android:background="@color/white"/>

    <Button
        android:id="@+id/btn_next"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentEnd="true"
        android:background="@null"
        android:text="@string/next"
        android:textColor="@color/white"/>

    <Button
        android:id="@+id/btn_skip"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_alignParentStart="true"
        android:background="@null"
        android:text="@string/skip"
        android:textColor="@color/white"/>
</RelativeLayout>
```

Next lets add the values into dimens, colors and string.

**dimens.xml**

```
<resources>
    <!-- Default screen margins, per the Android Design guidelines. -->
    <dimen name="activity_horizontal_margin">16dp</dimen>
    <dimen name="activity_vertical_margin">16dp</dimen>
    <dimen name="dp_10">10dp</dimen>
    <dimen name="dp_80">80dp</dimen>
    <dimen name="sp_14">14sp</dimen>
    <dimen name="dp_50">50dp</dimen>
    <dimen name="sp_20">20sp</dimen>
    <dimen name="sp_10">10sp</dimen>
    <dimen name="sp_12">12sp</dimen>
    <dimen name="dp_100">100dp</dimen>
    <dimen name="dp_5">5dp</dimen>
    <dimen name="sp_16">16sp</dimen>
    <dimen name="dp_40">40dp</dimen>
    <dimen name="dp_150">150dp</dimen>
    <dimen name="dp_30">30dp</dimen>
    <dimen name="dp_20">20dp</dimen>
    <dimen name="nav_header_vertical_spacing">8dp</dimen>
    <dimen name="nav_header_height">176dp</dimen>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="dp_75">75dp</dimen>
    <dimen name="dp_60">60dp</dimen>
    <dimen name="dp_2">2dp</dimen>
    <dimen name="dp_120">120dp</dimen>
    <dimen name="dp_110">110dp</dimen>
    
</resources>
```

**color**

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#EC407A</color>
    <color name="colorPrimaryDark">#E91E63</color>
    <color name="colorAccent">#D81B60</color>
    <color name="transparent">#00000000</color>
    <color name="white">#FFFFFF</color>
    <color name="black">#000000</color>
    <color name="black_shade_one">#212121</color>
    <color name="black_shade_two">#424242</color>

    <!-- Intro swipe layout colors-->
    <color name="bg_screen1">#EC407A</color>
    <color name="bg_screen2">#AB47BC</color>
    <color name="bg_screen3">#F44336</color>
    <color name="bg_screen4">#D500F9</color>

    <!-- dots inactive colors -->
    <color name="dot_dark_screen1">#3700B3</color>
    <color name="dot_dark_screen2">#3700B3</color>
    <color name="dot_dark_screen3">#3700B3</color>
    <color name="dot_dark_screen4">#3700B3</color>

    <!-- dots active colors -->
    <color name="dot_light_screen1">#BB86FC</color>
    <color name="dot_light_screen2">#BB86FC</color>
    <color name="dot_light_screen3">#BB86FC</color>
    <color name="dot_light_screen4">#BB86FC</color>

    <array name="array_dot_active">
        <item>@color/dot_light_screen1</item>
        <item>@color/dot_light_screen2</item>
        <item>@color/dot_light_screen3</item>
        <item>@color/dot_light_screen4</item>
    </array>

    <array name="array_dot_inactive">
        <item>@color/dot_dark_screen1</item>
        <item>@color/dot_dark_screen2</item>
        <item>@color/dot_dark_screen3</item>
        <item>@color/dot_dark_screen4</item>
    </array>
</resources>
```

**string.xml**

```
<resources>
    <string name="app_name">IntroApp</string>
    <!--Swipe intro strings-->
    <string name="next">NEXT</string>
    <string name="skip">SKIP</string>
    <string name="start">GOT IT</string>
    <string name="slide_1_title">Here is Slider 1 Title</string>
    <string name="slide_1_desc">Here is slider 1 description</string>
    <string name="slide_2_title">Here is Slider 2 Title</string>
    <string name="slide_2_desc">Here is slider 2 description</string>
    <string name="slide_3_desc">Here is slider 3 description</string>
    <string name="slide_3_title">Here is Slider 3 Title</string>
    <string name="slide_4_title">Here is Slider 4 Title</string>
    <string name="slide_4_desc">Here is slider 4 description</string>
</resources>
```

Next we need to create four seperate intro layouts.

**intro_slide_1.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/bg_screen1">

    <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center_horizontal"
            android:orientation="vertical">

        <ImageView
                android:layout_width="match_parent"
                android:layout_height="250dp"
                android:src="@android:drawable/sym_action_email"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/slide_1_title"
                android:textAppearance="@style/TextAppearance.AppCompat.Headline"
                android:textColor="@android:color/white"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/dp_20"
                android:paddingLeft="@dimen/dp_40"
                android:paddingRight="@dimen/dp_40"
                android:text="@string/slide_1_desc"
                android:textAlignment="center"
                android:textAppearance="@style/TextAppearance.AppCompat.Subhead"
                android:textColor="@android:color/white"/>

    </LinearLayout>
</RelativeLayout>
```

**intro_slide_2.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/bg_screen2">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:gravity="center_horizontal"
        android:orientation="vertical">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="250dp"
            app:srcCompat="@android:drawable/btn_star_big_off"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/dp_20"
            android:text="@string/slide_2_title"
            android:textAlignment="center"
            android:textAppearance="@style/TextAppearance.AppCompat.Headline"
            android:textColor="@android:color/white"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:paddingLeft="@dimen/dp_10"
            android:paddingRight="@dimen/dp_10"
            android:text="@string/slide_2_desc"
            android:textAlignment="center"
            android:textAppearance="@style/TextAppearance.AppCompat.Subhead"
            android:textColor="@android:color/white"/>

    </LinearLayout>
</RelativeLayout>
```

**intro_slide_3.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/bg_screen3">

    <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center_horizontal"
            android:orientation="vertical">

        <ImageView
                android:layout_width="match_parent"
                android:layout_height="250dp"
                app:srcCompat="@android:drawable/ic_dialog_info"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/dp_20"
                android:text="@string/slide_3_title"
                android:textAlignment="center"
                android:textAppearance="@style/TextAppearance.AppCompat.Headline"
                android:textColor="@android:color/white"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="20dp"
                android:paddingLeft="@dimen/dp_10"
                android:paddingRight="@dimen/dp_10"
                android:text="@string/slide_3_desc"
                android:textAlignment="center"
                android:textAppearance="@style/TextAppearance.AppCompat.Subhead"
                android:textColor="@android:color/white"/>

    </LinearLayout>
</RelativeLayout>
```

**intro_slide_4.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/bg_screen4">

    <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center_horizontal"
            android:orientation="vertical">

        <ImageView
                android:layout_width="@dimen/dp_100"
                android:layout_height="@dimen/dp_100"
                android:src="@android:drawable/ic_menu_share"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="@dimen/dp_20"
                android:text="@string/slide_4_title"
                android:textAlignment="center"
                android:textAppearance="@style/TextAppearance.AppCompat.Headline"
                android:textColor="@android:color/white"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:paddingLeft="@dimen/dp_10"
                android:paddingRight="@dimen/dp_10"
                android:text="@string/slide_4_desc"
                android:textAlignment="center"
                android:textAppearance="@style/TextAppearance.AppCompat.Subhead"
                android:textColor="@android:color/white"/>

    </LinearLayout>
</RelativeLayout>
```

Next lets create the App class.

**App.kt**

```
import android.app.Application

class App : Application() {

    override fun onCreate() {
        super.onCreate()
        mSelf = this
    }

    companion object {
        private var mSelf: App? = null

        fun self(): App {
            return mSelf!!
        }
    }
}
```

Now open the manifiest file and add this line to the application tag.

```
<application
        android:name=".App"
        .....
```

Next lets create a constant class to hold our static keys and values.

**Constant.kt**

```
object Constants {
    val IS_FIRST_TIME = "is_first_time"
    val APPLICATION_PREFS = "app_preference"
}
```

Next lets create a SharedPreference class to save data.

**ApplicationPrefs**

```
import android.content.SharedPreferences

class ApplicationPrefs {

    private val mPreferences: SharedPreferences = App.self().getSharedPreferences(
        Constants.APPLICATION_PREFS, 0
    )

    fun isNotFirstTime(): Boolean {
        return mPreferences.getBoolean(Constants.IS_FIRST_TIME, false)
    }

    fun setNotFirstTime(b: Boolean) {
        val mEditor = mPreferences.edit()
        mEditor.putBoolean(Constants.IS_FIRST_TIME, b).apply()
    }
}
```

Now open the WelcomeActivity.kt (If your activity is in java you can simply convert it to kotlin by code >> Convert java file to kotlin).

**WelcomeActivity.kt**

```
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.support.v4.view.PagerAdapter
import android.support.v4.view.ViewPager
import android.support.v7.app.AppCompatActivity
import android.text.Html
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class WelcomeActivity : AppCompatActivity() {
    private var viewPager: ViewPager? = null
    private var myViewPagerAdapter: MyViewPagerAdapter? = null
    private var dotsLayout: LinearLayout? = null
    private var dots: Array<TextView?> = emptyArray()
    private var layouts: IntArray? = null
    private var btnSkip: Button? = null
    private var btnNext: Button? = null
    private lateinit var prefManager: ApplicationPrefs

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (Build.VERSION.SDK_INT >= 21) {
            window.decorView.systemUiVisibility =
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        }
        setContentView(R.layout.activity_welcome)
        init()
        changeStatusBarColor()
        setDots()
        setAdapter()
        setListeners()
    }

    private fun init() {
        prefManager = ApplicationPrefs()
        if (prefManager.isNotFirstTime()) {
            openMainScreen()
        }
        viewPager = findViewById(R.id.view_pager)
        dotsLayout = findViewById(R.id.layoutDots)
        btnSkip = findViewById(R.id.btn_skip)
        btnNext = findViewById(R.id.btn_next)
    }

    private var viewPagerPageChangeListener: ViewPager.OnPageChangeListener = object : ViewPager.OnPageChangeListener {
        override fun onPageSelected(position: Int) {
            addBottomDots(position)
            if (position == layouts!!.size - 1) {
                btnNext!!.text = getString(R.string.start)
                btnSkip!!.visibility = View.GONE
            } else {
                btnNext!!.text = getString(R.string.next)
                btnSkip!!.visibility = View.VISIBLE
            }
        }

        override fun onPageScrolled(arg0: Int, arg1: Float, arg2: Int) {}

        override fun onPageScrollStateChanged(arg0: Int) {}
    }

    private fun setDots() {
        layouts =
            intArrayOf(R.layout.intro_slide_1, R.layout.intro_slide_2, R.layout.intro_slide_3, R.layout.intro_slide_4)
        addBottomDots(0)
    }

    private fun setAdapter() {
        myViewPagerAdapter = MyViewPagerAdapter()
        viewPager!!.adapter = myViewPagerAdapter
        viewPager!!.addOnPageChangeListener(viewPagerPageChangeListener)
    }

    private fun setListeners() {
        btnSkip!!.setOnClickListener {
            launchHomeScreen()
        }
        btnNext!!.setOnClickListener {
            val current = getItem(+1)
            if (current < layouts!!.size) {
                viewPager!!.currentItem = current
            } else {
                launchHomeScreen()
            }
        }
    }

    private fun addBottomDots(currentPage: Int) {
        dots = arrayOfNulls(layouts!!.size)
        val colorsActive = resources.getIntArray(R.array.array_dot_active)
        val colorsInactive = resources.getIntArray(R.array.array_dot_inactive)
        dotsLayout!!.removeAllViews()
        for (i in dots.indices) {
            dots[i] = TextView(this)
            dots[i]!!.text = Html.fromHtml("&#8226;")
            dots[i]!!.textSize = 35f
            dots[i]!!.setTextColor(colorsInactive[currentPage])
            dotsLayout!!.addView(dots[i])
        }
        if (dots.isNotEmpty())
            dots[currentPage]!!.setTextColor(colorsActive[currentPage])
    }

    private fun getItem(i: Int): Int {
        return viewPager!!.currentItem + i
    }

    private fun launchHomeScreen() {
        prefManager.setNotFirstTime(true)
        openMainScreen()
    }

    private fun openMainScreen() {
        val intent = Intent(this@WelcomeActivity, MainActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun changeStatusBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val window = window
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.statusBarColor = Color.TRANSPARENT
        }
    }

    inner class MyViewPagerAdapter : PagerAdapter() {
        private var layoutInflater: LayoutInflater? = null

        override fun instantiateItem(container: ViewGroup, position: Int): Any {
            layoutInflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            val view = layoutInflater!!.inflate(layouts!![position], container, false)
            container.addView(view)
            return view
        }

        override fun getCount(): Int {
            return layouts!!.size
        }

        override fun isViewFromObject(view: View, obj: Any): Boolean {
            return view === obj
        }

        override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
            val view = `object` as View
            container.removeView(view)
        }
    }
}
```

Now lets open the manifest file and change the launcher to WelcomeActivity.

**Manifest.xml**

```
<application
            android:name=".App"
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:supportsRtl="true"
            android:theme="@style/AppTheme" tools:ignore="GoogleAppIndexingWarning">
        <activity android:name=".MainActivity"/>
        <activity android:name=".WelcomeActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
```

And that is it we are all set. Only thing left now is to change the styles files and change our action bar to NoActionBar for full screen view.

**styles.xml**

```
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

Run the app!

**Demo**

![](https://images.viblo.asia/fa20bed5-67b9-4675-8dbb-c9139c678085.gif)