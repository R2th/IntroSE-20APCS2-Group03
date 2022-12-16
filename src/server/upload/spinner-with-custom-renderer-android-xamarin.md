Simple way to creat a piscker or Spinner iFirst create your Picker class. Can add to shared folders.

**SimplePickerView**

```
 public class SimplePickerView : Xamarin.Forms.View
    {
        public static readonly BindableProperty ItemsSourceProperty = BindableProperty.Create(
            propertyName: nameof(ItemsSource),
            returnType: typeof(List<string>),
            declaringType: typeof(List<string>),
            defaultValue: null);

        public List<string> ItemsSource
        {
            get { return (List<string>)GetValue(ItemsSourceProperty); }
            set { SetValue(ItemsSourceProperty, value); }
        }

        public static readonly BindableProperty SelectedIndexProperty = BindableProperty.Create(
            propertyName: nameof(SelectedIndex),
            returnType: typeof(int),
            declaringType: typeof(int),
            defaultValue: -1);

        public int SelectedIndex
        {
            get { return (int)GetValue(SelectedIndexProperty); }
            set { SetValue(SelectedIndexProperty, value); }
        }

        public event EventHandler<ItemSelectedEventArgs> ItemSelected;

        public void OnItemSelected(int pos)
        {
            ItemSelected?.Invoke(this, new ItemSelectedEventArgs() { SelectedIndex = pos });
        }
    }

    public class ItemSelectedEventArgs : EventArgs
    {
        public int SelectedIndex { get; set; }
    }
```

Create an item layout.

**layout_custom_picker**

```
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/text1"
    style="?android:attr/spinnerDropDownItemStyle"
    android:singleLine="true"
    android:textAlignment="center"
    android:padding="10dp"
    android:gravity="center"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:ellipsize="marquee"/>
```

Create a class DropdownRenderer.

**DropdownRenderer**

```
using System.ComponentModel;

using Android.Content;
using Android.Widget;
using KaguyaMobile.Common.Utility;
using KaguyaMobile.Droid.CustomRenderer;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;
//Registers your renderer
[assembly: ExportRenderer(typeof(SimplePickerView), typeof(DropdownRenderer))]
namespace MyNameSpace.Droid.CustomRenderer
{
    public class DropdownRenderer : ViewRenderer<SimplePickerView, Spinner>
    {
        Spinner spinner;
        public DropdownRenderer(Context context) : base(context)
        {

        }

        private void SetUpSpinner()
        {
            LayoutParams layout = new LayoutParams(LayoutParams.MatchParent, LayoutParams.WrapContent);
            spinner.LayoutParameters = layout;
            var metrics = Resources.DisplayMetrics;
            spinner.DropDownWidth = metrics.WidthPixels;
            spinner.DropDownVerticalOffset = 100;
            try
            {
                Java.Lang.Reflect.Field popup = spinner.Class.GetDeclaredField("mPopup");
                popup.Accessible = true;
                var popupWindow = (ListPopupWindow)popup.Get(spinner);
                popupWindow.Height = 700;
            }
            catch (Java.Lang.Exception)
            {
                // Failed...
            }
        }

        protected override void OnElementChanged(ElementChangedEventArgs<SimplePickerView> e)
        {
            base.OnElementChanged(e);

            if (Control == null)
            {
                spinner = new Spinner(Context);
                SetUpSpinner();
                SetNativeControl(spinner);
            }

            if (e.OldElement != null)
            {
                Control.ItemSelected -= OnItemSelected;
            }
            if (e.NewElement != null)
            {
                var view = e.NewElement;

                ArrayAdapter adapter = new ArrayAdapter(
                context: Context,
                resource: Resource.Layout.select_dialog_item_material,
                objects: Element.ItemsSource);
                adapter.SetDropDownViewResource(Resource.Layout.layout_custom_picker);

                Control.Adapter = adapter;

                if (view.SelectedIndex != -1)
                {
                    Control.SetSelection(view.SelectedIndex);
                }

                Control.ItemSelected += OnItemSelected;
            }
        }

        protected override void OnElementPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            var view = Element;
            if (e.PropertyName == SimplePickerView.ItemsSourceProperty.PropertyName)
            {
                ArrayAdapter adapter = new ArrayAdapter(Context, Resource.Layout.layout_custom_picker, view.ItemsSource);
                Control.Adapter = adapter;
            }
            if (e.PropertyName == SimplePickerView.SelectedIndexProperty.PropertyName)
            {
                Control.SetSelection(view.SelectedIndex);
            }
            base.OnElementPropertyChanged(sender, e);
        }

        private void OnItemSelected(object sender, AdapterView.ItemSelectedEventArgs e)
        {
            var view = Element;
            if (view != null)
            {
                view.SelectedIndex = e.Position;
                view.OnItemSelected(e.Position);
            }
        }
    }
}
```

Next Add to your xaml file.

**Layout xaml file**
```
<utility:SimplePickerView HorizontalOptions="FillAndExpand" HeightRequest="30" VerticalOptions="Center" BackgroundColor="White" x:Name="dropdownDemo" IsVisible="{x:OnPlatform Android=True, iOS=False}"/>
```

Note: utility being my namespace tag.

**Your .cs Class**
//variables
```
        List<string> Items1 = new List<string>();  
        List<string> Items2 = new List<string>();  
        bool IsItem1 = true;  
```

Next open your main class and add the below code below your InitializeComponent();.

```
createFakeData();
```

Method to fake items;

**createFakeData**

```
createFakeData() {
for (int i = 0; i < 4; i++)  
            {  
                Items1.Add(i.ToString());  
            }  
  
            for (int i = 0; i < 10; i++)  
            {  
                Items2.Add(i.ToString());  
            }  
  
            dropdown.ItemsSource = Items1;  
            dropdown.SelectedIndex = 1;  
            dropdown.ItemSelected += OnDropdownSelected;  
}
```

**OnDropdownSelected**-

```
private void OnDropdownSelected(object sender, ItemSelectedEventArgs e)
{
    string value = IsItem1 ? Items1[e.SelectedIndex] : Items2[e.SelectedIndex]; 
}
```

Thats it you nowe have your spinner like dropdown list. Simple change your data source to customize. Happy Coding!!!