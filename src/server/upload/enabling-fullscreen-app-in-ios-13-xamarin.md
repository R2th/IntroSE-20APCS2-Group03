During the WWDC 2019 Apple recently introduced the card presentation as the new default presentation. On iOS 13 and above this will be the new behaviour for modal view controller when being presented. So if you want to insist on the fullscreen modal there are ways to archeive this. One is using renderers as i will demostrate below.

**Solution**

We can easily archeive this by implementing a custom navigation renderer for the app. Start by creating the renderer class **NavigationPageRenderer**. Here we will declare the **ModalPresentationStyle** (Respopnsible for specifying what type of layout the app will use).

```
using System;
using UIKit;
using Xamarin.Forms;
using Xamarin.Forms.Platform.iOS;

[assembly: ExportRenderer(typeof(NavigationPage), typeof(NavigationPageRenderer))]
namespace app.iOS.CustomRenderer
{
    public class NavigationPageRenderer : NavigationRenderer
    {
        public override void WillMoveToParentViewController(UIViewController parent)
        {
            try
            {
                if (parent != null)
                {
                    if (UIDevice.CurrentDevice.CheckSystemVersion(13, 0))
                    {
                        // Change Navigation Style to Fullscreen (iOS 13 and above)
                        parent.ModalPresentationStyle = UIModalPresentationStyle.OverFullScreen;
                    }
                }

                base.WillMoveToParentViewController(parent);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
            }
        }
    }
}
```

This can also be archeived by adding below lines in the xaml file. 

```
<ContentPage ...
             xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core"
             ios:Page.ModalPresentationStyle="Fullscreen">
    ...
</ContentPage>
```

So to make your screen views appear in the good old fullscreen simply change the PresentationView to Fullscreen.

**Before Changing ModalPresentationStyle**
![](https://images.viblo.asia/c9f561bf-68a1-47be-80ff-b1bbfc21f0b0.png)

**After**

![](https://images.viblo.asia/71bafc31-e727-4c23-ae61-fc3732737c12.png)

Of course you can always apply UIModalPresentationStyle to each view per say but using renderer that extends NavigationRenderer will apply to all your screens. Happy Coding!!!