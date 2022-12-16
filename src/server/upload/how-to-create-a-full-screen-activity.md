**AndroidManifest.xml**
```
    <activity ...
              android:theme="@style/FullScreenTheme"
        >
    </activity>
```
## I. Your main app theme is *Theme.AppCompat.Light.DarkActionBar*
**For hide ActionBar / StatusBar**  
*style.xml*

```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    ...
</style>

<style name="FullScreenTheme" parent="AppTheme">
    <item name="windowNoTitle">true</item> // this property will help hide ActionBar
    <item name="windowActionBar">false</item> // currently, I don't know why we need this property since use windowNoTitle only already help hide actionbar. I use it because it is used inside Theme.AppCompat.Light.NoActionBar (you can check Theme.AppCompat.Light.NoActionBar code). I think there are some missing case that I don't know 

    <item name="android:windowFullscreen">true</item> // this property is use for hide StatusBar
</style>
```


**For hide system navigation bar**
```
    public class MainActivity extends AppCompatActivity {
    
        protected void onCreate(Bundle savedInstanceState) {
            getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
            setContentView(R.layout.activity_main)
            ...
        }
     }
```
## II. Your main app theme is *Theme.AppCompat.Light.NoActionBar*
**For hide ActionBar / StatusBar**  
*style.xml*
```
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        ...
    </style>
    
    <style name="FullScreenTheme" parent="AppTheme">
        // don't need any config for hide ActionBar because our apptheme is NoActionBar
    
        <item name="android:windowFullscreen">true</item> // this property is use for hide StatusBar
    </style>
```
**For hide system navigation bar**

**Similar** like `Theme.AppCompat.Light.DarkActionBar`. 

[Demo](https://github.com/PhanVanLinh/AndroidFullscreenActivity)