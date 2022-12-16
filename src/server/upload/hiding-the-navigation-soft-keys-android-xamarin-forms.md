One might come across a case where it is needed to hide the on screen softkeys on android (The home, back and windows button) either for full screen display or space allocation to app. This is easily archeiveable by setting some ui options as demostrated below.


```
public void ImmersiveMode()
{
int uiOptions = (int)(Forms.Context as Activity).Window.DecorView.SystemUiVisibility;
uiOptions |= (int)SystemUiFlags.Fullscreen;
uiOptions |= (int)SystemUiFlags.HideNavigation;
uiOptions |= (int)SystemUiFlags.ImmersiveSticky;
(Forms.Context as Activity).Window.DecorView.SystemUiVisibility = (StatusBarVisibility)uiOptions;
}
```

The ImmersiveMode method can be called in the Mainactivity after the LoadApplication is called in the OnCreate method.

**MainActivity.cs**

```
 protected override void OnCreate(Bundle savedInstanceState)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;
            base.OnCreate(savedInstanceState);
            LoadApplication(new App());
            .....
            ImmersiveMode();
}
```

Thats it. You are all set.

**Before ImmersiveMode**

![](https://images.viblo.asia/d972f689-f575-4d88-ac88-3055720574ab.jpg)

**After ImmersiveMode**

![](https://images.viblo.asia/0b569f35-6914-4b71-99ff-792f12b67bca.jpg)