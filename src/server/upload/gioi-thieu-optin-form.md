# GIỚI THIỆU
Gần đây mình vừa có cơ hội tìm hiểu về  **Optin Form**. Nên hôm nay mình sẽ giới thiệu nó lại với mọi người, và sẽ hướng dẫn mọi người xây dựng một **Optin Form** hoàn chỉnh.

# Optin Form
Giả sử bạn đang kinh doanh một dịch vụ, hay sản phẩm nào đó nào đó. Bạn muốn có thật nhiều khách hàng sử dụng dịch vụ, sản phẩm của mình nên bạn đã thực hiện quảng cáo dịch vụ, sản phẩm đó ở nhiều website. Thông thường thì trong quảng cáo sẽ để lại các thông tin như số điện thoại, địa chỉ, website... của mình để khách hàng có thể liên hệ đến bạn. 
![](https://images.viblo.asia/30f17ae6-e8e4-49e9-9710-26d254216bae.jpg)

Một nhược điểm lớn của hình thức quảng cáo này tâm lý lười liên hệ của khách hàng, mặc dù họ quan tâm đến dịch vụ, sản phẩm của bạn. **Optin Form** sẽ giúp bạn giải quyết nhược điểm
này.

**Optin form** là biểu mẫu điền thông tin đăng ký của website hay dịch vụ, là công cụ giúp bạn lấy được thông tin của khách hàng như: Tên / Tuổi / Email / Công ty / Điện thoại / Ngành nghề kinh doanh... Tóm lại là những thông tin mà bạn cần thu thập từ khách hàng . Tức là bạn sẽ kèm vào quảng cáo một cái Biểu mẫu để lấy thông tin của khách hàng và đặt quảng cáo này lên các website khác để mọi người biết đến.

Bạn cần phải soạn một nội dung quảng cáo ngắn gọn bao gồm các thông tin sau:

1. Nội dung cho đi một thông tin hữu ích (coupon / phiếu giảm giá/ thông tin khuyến mãi/ thông tin hữu ích/ dùng thử ….).
2. Các điều kiện để nhận quà tặng.
3. Kêu gọi hành động để khách hàng điền toàn bộ thông tin của họ vào Optin form.

Từ đó bạn có đủ thông tin, bạn sẽ là người chủ động liên hệ đến khách hàng để  tiến hành các bước bán hàng / chăm sóc khách hàng tiếp theo.
# Triển khai

## Xây dựng Optin Form
Bây giờ mình sẽ hướng dẫn các bạn làm thế nào để từ website của mình có thể tạo ra một cái ra một cái biểu mẫu như bên dưới để nhúng vào website khác.
![](https://images.viblo.asia/20f9e60c-74d5-4076-96d3-0386951fdace.png)

Bạn thiết kế cơ sở dữ liệu như sau:
![](https://images.viblo.asia/b90e9200-fb72-4d41-87e3-6bc2284d5a6d.png)
1. Bảng optin_forms để lưu lại các biểu mẫu
2. Bảng items để lưu lại các trường thông tin trên một cái biểu mẫu

Tiếp đến từ cơ sở dữ liệu trên bạn xây dựng 1 trang như thế này để tạo optin_forms
![](https://images.viblo.asia/950622d1-a7e7-4797-8cce-1e8b81124fb2.png)

## Sử dụng Optin Form

Sau khi có optin_form bạn sẽ sinh ra 1 một đoạn mã như sau:

```
    <div id='optin-form-iframe-${uid của optin-form}'></div>
    <script type='text/javascript'>
      (function() {
        var r = window.location.origin;
        var f = document.createElement('iframe');
        f.setAttribute('src', '${url đến optin-form}?origin=' + r);
        f.style.width = '100%';
        f.style.height = '100%';
        f.setAttribute('frameborder','0');
        var s = document.getElementById('optin-form-iframe-${uid của optin-form}');
        s.appendChild(f);
      })();
    </script>
```
Tiếp đến bạn liên hệ đến các website mà bạn đang gắn quảng cáo, nhờ họ chèn đoạn mã trên vào chỗ quảng cáo.
## Kết quả
![](https://images.viblo.asia/cd72f351-d083-4487-83c1-83857e43f6ea.png)
Khi người dùng gửi thông tin thì bạn gửi dữ liệu thì bạn lưu thông tin vào cở sở dữ liệu và hiển thị lên website của mình để xem
# Kết luận
Trên đây mình vừa giới thiệu với các bạn về  **Optin Form**.  Một tính năng khá thực tế và thông dụng hiện nay, khi nhu cầu quảng cáo ngày càng tăng cao.
#  Tham khảm
https://www.getfly.vn/tinh-nang/maketing/thu-thap-thong-tin-tu-website-f15.html