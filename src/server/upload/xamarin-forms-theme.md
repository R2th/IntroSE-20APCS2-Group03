Xamarin.Forms Themes được ra mắt tại sự kiện Evolve 2016 và đã được tung ra bản preview cho khách hàng dùng thử và feedback.

Theme được thêm vào Xamarin.Forms app bằng cách include Xamarin.Forms.Theme.Base Nuget package, có thể thêm cùng với package tuỳ chọn theme (Light, Dark...) hoặc custom theme được định nghĩa trong application.
Trong bài viết này, mình sẽ trình bày cách thêm theme (Light, Dark...) vào trong ứng dụng Xamarin.Forms.

## Giao diện điều khiển
Light và Dark theme đều định nghĩa  một hình ảnh trực quan cụ thể cho các control cơ bản. Khi bạn add theme vào resource dictionary của ứng dịng, giao diện của các control cơ bản sẽ bị thay đổi.

Ví dụ như các control dưới đây:
```
<StackLayout Padding="40">
    <Label Text="Regular label" />
    <Entry Placeholder="type here" />
    <Button Text="OK" />
    <BoxView Color="Yellow" />
    <Switch />
</StackLayout>
```
Screenshot dưới đây thể hiện các control:
* Không apply theme.
* Light theme (chỉ khác biệt một chút so với không apply theme).
* Dark theme.

![](https://images.viblo.asia/21b98b1f-30b1-4ebe-8b66-3944ea8b0fab.png)

## StyleClass
Thuộc tính StyleClass cho phép giao diện của view thay đổi theo theme được định nghĩa.
Light và Dark theme đều định nghãi 3 giao diện cho BoxView: HorizontalRule, Curcle và Rounded. Đoạn code dưới đây sẽ thể hiện BoxView với 3 style khác nhau:

```
<StackLayout Padding="40">
    <BoxView StyleClass="HorizontalRule" />
    <BoxView StyleClass="Circle" />
    <BoxView StyleClass="Rounded" />
</StackLayout>
```

![](https://images.viblo.asia/94f9ddd4-65dc-4259-b48f-fa3665939564.png)

## Built-in Class
Để style các control thông thường, Light và Dark theme hiện tại cũng support các class sau để apply vào StyleClass:

**BoxView**
* HorizonTalRule
* Circle
* Rounded

**Button**
* Default
* Primary
* Success
* Info
* Warning
* Danger
* Link
* Small
* Large

**Label**
* Header
* Subheader
* Body
* Link
* Inverse

## Xử lý sự cố
### Could not load file or assembly 'Xamarin.Forms.Theme.Light' or one of its dependencies
Trong bản preview, theme có thể không được load ở runtime. Thêm đoạn code sau để fix:

**iOS**
```
var x = typeof(Xamarin.Forms.Themes.DarkThemeResources);
x = typeof(Xamarin.Forms.Themes.LightThemeResources);
x = typeof(Xamarin.Forms.Themes.iOS.UnderlineEffect);
```

**Android**
Thêm đoạn code sau vào MainActivity.cs sau LoadApplication
```
var x = typeof(Xamarin.Forms.Themes.DarkThemeResources);
x = typeof(Xamarin.Forms.Themes.LightThemeResources);
x = typeof(Xamarin.Forms.Themes.Android.UnderlineEffect);
```

## Theme
Để sử dụng Theme:
1. Add Nuget packages:
* Xamarin.Forms.Theme.Base
* Xamarin.Forms.Theme.Light hoặc Xamarin.Forms.Theme.Dark
2. Add vào Resource Dictionary:
Trong App.xaml file thêm một custom **xlmns** và themes resouces phải merged với application resouce dictionary:

**Light Theme:**
```
<?xml version="1.0" encoding="utf-8"?>
<Application xmlns="http://xamarin.com/schemas/2014/forms" xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" x:Class="EvolveApp.App"
             xmlns:light="clr-namespace:Xamarin.Forms.Themes;assembly=Xamarin.Forms.Theme.Light">
    <Application.Resources>
        <ResourceDictionary MergedWith="light:LightThemeResources" />
    </Application.Resources>
</Application>
```

**Dark Theme:**
```
<?xml version="1.0" encoding="utf-8"?>
<Application xmlns="http://xamarin.com/schemas/2014/forms" xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" x:Class="EvolveApp.App"
             xmlns:dark="clr-namespace:Xamarin.Forms.Themes;assembly=Xamarin.Forms.Theme.Dark">
    <Application.Resources>
        <ResourceDictionary MergedWith="dark:DarkThemeResources" />
    </Application.Resources>
</Application>
```

3. Load theme class:
Tham khảo phần xử lý sự cố để thêm code iOS và Android vào project.

4. Sử dụng StyleClass:

**Light Theme:**

![](https://images.viblo.asia/5a6bfff7-d2d2-48b5-8019-f4af2994f82a.png)

```
<StackLayout Padding="20">
    <Button Text="Button Default" />
    <Button Text="Button Class Default" StyleClass="Default" />
    <Button Text="Button Class Primary" StyleClass="Primary" />
    <Button Text="Button Class Success" StyleClass="Success" />
    <Button Text="Button Class Info" StyleClass="Info" />
    <Button Text="Button Class Warning" StyleClass="Warning" />
    <Button Text="Button Class Danger" StyleClass="Danger" />
    <Button Text="Button Class Link" StyleClass="Link" />
    <Button Text="Button Class Default Small" StyleClass="Small" />
    <Button Text="Button Class Default Large" StyleClass="Large" />
</StackLayout>
```

**Dark Theme:**

![](https://images.viblo.asia/5204900d-c968-4d84-8882-d2f2c253e59e.png)

```
<StackLayout Padding="20">
    <Button Text="Button Default" />
    <Button Text="Button Class Default" StyleClass="Default" />
    <Button Text="Button Class Primary" StyleClass="Primary" />
    <Button Text="Button Class Success" StyleClass="Success" />
    <Button Text="Button Class Info" StyleClass="Info" />
    <Button Text="Button Class Warning" StyleClass="Warning" />
    <Button Text="Button Class Danger" StyleClass="Danger" />
    <Button Text="Button Class Link" StyleClass="Link" />

    <Button Text="Button Class Default Small" StyleClass="Small" />
    <Button Text="Button Class Default Large" StyleClass="Large" />
</StackLayout>
```

Bài viết của mình đến đây là hết. Cảm ơn các bạn đã đọc bài của mình :D