![](https://images.viblo.asia/6d259bbc-0489-477c-a476-3bb6bddaa9c3.png)

Để làm rõ sự khác biệt giữa SSR (Server Side Rendering) và CSR (Client Side Rendering), hãy nhìn vào cách hoạt động của SSR và CSR qua 2 hình ảnh dưới đây:

![](https://images.viblo.asia/3928d98a-9012-4787-b25f-45098481f24f.png)

![](https://images.viblo.asia/023d45cf-8e48-40eb-8994-2326909806bc.png)

Điểm khác biệt chính ở đây là với SSR, server sẽ trả về cho browser file HTML của page đã được rendered, trong khi CSR sẽ trả về file HTML gần như empty cùng với links tới file JS. Trong cả 2 trường hợp, React sẽ đều cần được tải về và trải qua các tiến trình tương tự nhau để xây dựng Virtual DOM và gắn các events để khiến page có thể tương tác được - tuy nhiên với SSR, người dùng có thể bắt đầu nhìn thấy trang web ngay trong khi tất cả quá trình đó đang diễn ra. Đối với CSR, ta sẽ cần chờ tới khi tất cả các quá trình trên hoàn thành đến khi Virtual DOM được chuyển vào browser DOM để trang web có thể xem được.

Tuy nhiên cũng có một số điểm khác cần chú ý ở SSR:
- Khi trang web được render sớm hơn và người dùng có thể nhìn thấy trang web sớm hơn, họ không thể tương tác với nó cho đến khi react đã thực thi xong. Chẳng hạn nếu người đùng đủ nhanh để click vào 1 button lúc page vừa hiện ra, hành động đó sẽ không được thực hiện cho đến khi React thực thi xong.
- SSR TTFB(Time To First Byte) chậm hơn so với CSR, vì server sẽ phải dành thời gian để tạo nên file HTML cho trang web thay vì chỉ gửi đi một empty HTML như ở CSR.
- Băng thông SSR của server là ít hơn đáng kể so với băng thông của CSR. Đối với React thì lượng băng thông này còn có sự khác biệt đáng kể hơn. Ví dụ: ReactDOMServer.renderToString là một câu lệnh đồng bộ, server sẽ không thể xử lý các tiến trình khác cho tới khi ReactDOMServer.renderToString hoàn thành. Chẳng hạn nếu nó chiếm tới 500ms để render Page, thì server sẽ chỉ có thể thực hiện nhiều nhất 2 requests mỗi giây (***BIG CONSIDERATION***)

## Reference
https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8