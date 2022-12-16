# Giới Thiệu SkiaSharp 
Nói ngắn gọn SkiaSharp là mã nguồn mở để giúp các nhà phát triển vẽ các **hình ảnh 2D, bitmap và text**. Nôm na là chúng ta có thể **CustomView** tuỳ thích ở Cross-Platform. Và được **Xamarin Inc. sở hữu** nên chúng ta có thể thoải mái dùng mà không lo vấn đề giấy phép.
# Hướng dẫn sử dụng
Để có thể sử dụng được SkiaSharp chúng ta phải thêm **NuGet Package** vào mục **Package** cho **Xamarin.Form, Xamarin.Droid, Xamarion.iOS** nếu bạn muốn chạy đầy đủ cả 2 nền tàng **iOS** và **Android**:

![](https://images.viblo.asia/fa6e96b3-f949-4aa5-bfbd-7d19c7c68af0.png)

- **Xamarin.Form** thêm **2** NuGet Package: **SkiaSharp, SkiaSharp.Views.Forms**.
- **Xamarin.Droid**, **Xamarion.iOS** thêm **3** NuGet Package: **SkiaSharp, SkiaSharp.Views.Forms, SkiaSharp.Views**.

*Chú ý: Đối với iOS thì cần **Deployment Target** phải > 8.0*

Sau khi đã thêm SkiaSharp vào project chúng ta sẽ bắt đầu code thôi.

Ví dụ:

```
using System;
using SkiaSharp;
using SkiaSharp.Views.Forms;
using Xamarin.Forms;

namespace SkiaSharpDemo
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            StackLayout content = new StackLayout()
            {
                VerticalOptions = LayoutOptions.FillAndExpand,
                HorizontalOptions = LayoutOptions.FillAndExpand,
                BackgroundColor = Color.White
            };

            SKCanvasView canvasView = new SKCanvasView(){
                VerticalOptions = LayoutOptions.CenterAndExpand,
                HorizontalOptions = LayoutOptions.CenterAndExpand,
                WidthRequest = 200,
                HeightRequest = 200
            };
            canvasView.PaintSurface += OnPaintSample;

            content.Children.Add(canvasView);
            Content = content;
        }

        private void OnPaintSample(object sender, SKPaintSurfaceEventArgs e)
        {
            int surfaceWidth = e.Info.Width;
            int surfaceHeight = e.Info.Height;
            SKCanvas canvas = e.Surface.Canvas;
            float side = Math.Min(surfaceHeight, surfaceWidth);

            using (SKPaint paint = new SKPaint())
            {
                canvas.Clear(Color.White.ToSKColor());
                paint.IsAntialias = true; 

                SKRect r1 = new SKRect(0, 0, side, side);
                paint.Color = Color.Blue.ToSKColor();
                canvas.DrawOval(r1, paint);
            }
        }
    }
}
```

Kết quả:

![](https://images.viblo.asia/ca04104e-e3b0-4c63-a702-c8f065956ff9.png)

![](https://images.viblo.asia/c0a92b9a-f201-4e91-add7-f5d500ea4529.png)

# Phần Kết
Đó các bạn thấy đấy với SkiaSharp chúng ta đã có 1 CustomView đơn giản mà có thể sử dụng được cả Android và iOS.

**Cảm Ơn Bạn Đã Dành Thời Gian Để Đọc Bài Viết Này.**