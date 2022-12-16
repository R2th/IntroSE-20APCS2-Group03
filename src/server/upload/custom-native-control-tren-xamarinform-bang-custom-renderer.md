# 1. Custom Renderer là gì?
Custom Renderer là custom lại các Control có sẵn trong Xamarin.Form và thêm các tính năng mới mà bạn mong muốn. Nhưng Xamarin.Form sẽ không trực tiếp thực hiện điều này mà nhờ có Custom Renderer bạn có thể thực hiện tại Native platform. Cụ thể là tại Xamarin.Form bạn chỉ tạo các đại diện cho Control muốn Custom, còn việc **implement** sẽ được thực hiện ở phía Native. 

![](https://images.viblo.asia/c184ffc9-c938-4ec9-bb28-5d594129a620.png)
# 2. Tại sao cần Custom Renderer?
Khi nói đến **Xamarin** thì có lẽ mọi người đều nhắc đến **Cross Platform**, với việc chỉ cần code 1 lần là có thể build được ra cả Android và iOS. Nghe thật là hấp dẫn nhưng mọi thứ không phải lúc nào như vậy. Nơi code 1 lần build được cả 2 mà mình đang nhắc tới đó là Xamarin.Form, mà Xamarin.Form chỉ hỗ trợ 1 lượng tính năng nhất định của Android và iOS, không thể hỗ trợ toàn bộ. Vì vậy Xamarin đã cung cấp thêm tính năng Custom Renderer để có thể khắc phục điều này.

# 3. Cách sử dụng Custom Renderer

> Để cho dễ hiểu mình sẽ làm ví dụ với việc Custom lại StackLayout của Xamarin.Form có thể bo tròn 4 cạnh. Vì hiện StackLayout trong Xamarin.Form chưa có thuộc tính này.

### Tạo Class Custom ở Xamarin.Form

Class này sẽ định nghĩa các API từ phía Xamarin.Form để gọi tới các nên tảng: Android và iOS. Để có thể điều khiển các thuộc tính của Control như màu sắc, hình dáng, các sự kiện(Click, LongClick, ...), ...

> Lưu ý: 
> - Class này sẽ nằm ở **Xamarin.Form**.

```
namespace Sample
{
    public class RoundedView : StackLayout
    {
        public static readonly BindableProperty RoundedCornerRadiusProperty = BindableProperty.Create<RoundedCornerStackView, double> (v => v.RoundedCornerRadius, 0);  
        public double RoundedCornerRadius {  
            get {  
                return (double) GetValue(RoundedCornerRadiusProperty);  
            }  
            set {  
                SetValue(RoundedCornerRadiusProperty, value);  
            }  
        }

        public static readonly BindableProperty BottomLeftProperty = BindableProperty.Create<RoundedCornerStackView, bool> (v => v.BottomLeft, true);  
        public bool BottomLeft
        {
            get
            {
                return (bool)GetValue(BottomLeftProperty);
            }
            set
            {
                SetValue(BottomLeftProperty, value);
            }
        }

        public static readonly BindableProperty TopLeftProperty = BindableProperty.Create<RoundedCornerStackView, bool>(v => v.TopLeft, true);
        public bool TopLeft
        {
            get
            {
                return (bool)GetValue(TopLeftProperty);
            }
            set
            {
                SetValue(TopLeftProperty, value);
            }
        }

        public static readonly BindableProperty TopRightProperty = BindableProperty.Create<RoundedCornerStackView, bool>(v => v.TopRight, true);
        public bool TopRight
        {
            get
            {
                return (bool)GetValue(TopRightProperty);
            }
            set
            {
                SetValue(TopRightProperty, value);
            }
        }

        public static readonly BindableProperty BottomRightProperty = BindableProperty.Create<RoundedCornerStackView, bool>(v => v.BottomRight, true);
        public bool BottomRight
        {
            get
            {
                return (bool)GetValue(BottomRightProperty);
            }
            set
            {
                SetValue(BottomRightProperty, value);
            }
        }
    }
}
```

### Android Custom Renderer

Bây giờ chúng ta sẽ tạo ra Custom Renderer cho nền tảng Android. Để thực hiện chúng ta cần tạo 1 Class Custom tại Xamarin.Android.

> Lưu ý:
> - Chúng ta cần có thuộc tính **ExportRenderer** nằm trên cùng của class để đăng ký đây là class renderer cho control nào của Xamarin.Form.
> - Class này sẽ nằm ở **Xamarin.Android**. 

```
[assembly: ExportRenderer(typeof(RoundedView), typeof(RoundedView_Android))] 
namespace Sample.Droid.Custom
{
    public class RoundedView_Android : VisualElementRenderer<RoundedView>
    {
        protected override void OnDraw(Canvas canvas)
        {
            base.OnDraw(canvas);
            if (Element == null || !Element.BottomLeft && !Element.TopLeft && !Element.TopRight && !Element.BottomRight)
                return;
            var density = Forms.Context.Resources.DisplayMetrics.Density;
            var color = Element.BackgroundColor.ToAndroid();
            SetBackgroundColor(Android.Graphics.Color.Transparent);
            var rect = new RectF(0.0f, 0.0f, Width, Height);
            var paint = new Paint(PaintFlags.AntiAlias);
            paint.Color = color;
            float radius = (float)Element.RoundedCornerRadius * density;
            canvas.DrawRoundRect(rect, radius, radius, paint);
            if (!Element.TopLeft)
            {
                var rectTopLeft = new RectF(0.0f, 0.0f, radius, radius);
                canvas.DrawRect(rectTopLeft, paint);
            } 
            if (!Element.BottomLeft) 
            {
                var rectBottomLeft = new RectF(0.0f, Height - radius, radius, Height);
                canvas.DrawRect(rectBottomLeft, paint);
            }
            if (!Element.TopRight)
            {
                var rectTopRight = new RectF(Width - radius, 0.0f, Width, radius);
                canvas.DrawRect(rectTopRight, paint);
            }
            if (!Element.BottomRight)
            {
                var rectBottomRight = new RectF(Width - radius, Height - radius, Width, Height);
                canvas.DrawRect(rectBottomRight, paint);
            }
        }
    }
}
```

### iOS Custom Renderer

Cũng tương tự như Android chúng ta có:
> Lưu ý:
> - Class này sẽ nằm ở **Xamarin.iOS**. 

```
[assembly: ExportRenderer(typeof(RoundedView), typeof(RoundedView_iOS))] 
namespace Sample.iOS.Custom
{
    public class RoundedView_iOS : VisualElementRenderer<RoundedView>
    {
        public override void LayoutSubviews()
        {
            base.LayoutSubviews();
            if (Element == null || !Element.BottomLeft && !Element.TopLeft && !Element.TopRight && !Element.BottomRight) 
                return;
            UIRectCorner uiRectCorner = 0;
            if (Element.BottomLeft) 
                uiRectCorner |= UIRectCorner.BottomLeft;
            if (Element.TopLeft)
                uiRectCorner |= UIRectCorner.TopLeft;
            if (Element.TopRight)
                uiRectCorner |= UIRectCorner.TopRight;
            if (Element.BottomRight)
                uiRectCorner |= UIRectCorner.BottomRight;

            nfloat radius = (nfloat)Element.RoundedCornerRadius;
            var maskingShapeLayer = new CAShapeLayer
            {
                Path = UIBezierPath.FromRoundedRect(Bounds, uiRectCorner, new CGSize(radius, radius)).CGPath
            };
            Layer.Mask = maskingShapeLayer;
        }
    }
}
```

### Sử dụng ở Xamarin.Form:

Với 4 thuộc tính **BottomRight, TopRight, TopLeft, BottomLeft** thì chúng ta đã có thể điều chỉnh các góc muốn bo tròn tùy ý rồi. Và thuộc tính **RoundedCornerRadius** chúng ta sẽ điều chỉnh độ bo tròn của Control.

```
MainPage = new ContentPage {  
              Content = new StackLayout {  
                    Children = {  
                         new RoundedView
                            {
                                VerticalOptions = LayoutOptions.CenterAndExpand,  
                                HorizontalOptions = LayoutOptions.CenterAndExpand,
                                HeightRequest = 100,
                                WidthRequest = 100,
                                BackgroundColor = Color.Red,
                                RoundedCornerRadius = 5,
                                BottomRight = true,
                                TopRight = true,
                                TopLeft = true,
                                BottomLeft = true
                            };
                        }  
                    }  
                }  
            }; 
```
# 4. Phần kết
Mình xin kết thúc tại đây. Cảm ơn các bạn đã đọc bài viết. Chúc các bạn thực hiện thành công.

Link tham khảo:
- https://xamarinhelp.com/basics-xamarin-forms-custom-renderers/