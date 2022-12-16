### Scroll vô hạn bởi  Josh & Eliza, WWDC 2011
Thông thường, khi ta quẹt trái trên một scroll view, ta sẽ cảm thấy rằng màn hình đang di chuyển về hướng trái. Tuy nhiên, Apple chỉ đưa cho chúng ta thấy cảm giác đó bằng việc di chuyển khung xem (view port) đến hướng ngược lại. Như ví dụ dưới đây, chỉ phần màu xanh lá của scroll view hiển thị và khi ta quẹt sang trái thì scroll view sẽ hiển thị màu vàng. Toàn bộ scroll view không thay đổi mà chỉ phần khung xem di chuyển sang phải để chỉ ta thấy phần màu vàng.<br>
![](https://images.viblo.asia/89a9ce98-1591-4cbe-847b-96435c463258.png) <br>
Với phản ứng cuộn thông thường thì ta sẽ bị dừng lại tại rìa của ContentView.<br>
![](https://images.viblo.asia/27472696-c1f3-48d5-bca5-d050092939c7.png) <br>
Ý tưởng của kỹ thuật được giới thiệu bởi Josh và Eliza là thực hiện những việc sau trong hàm UIScrollViewDelegate.scrollViewDidScroll(...):<br>
+ Di chuyển Content View theo hướng quẹt và giữ viewport luôn luôn nằm ở chính giữa của ContentView.<br>
+ Thêm những nội dung mới vào khoảng trống của Content View

![](https://images.viblo.asia/f789fc0a-e648-444f-a6b0-911333dff215.png) <br>
Với kỹ thuật này thì chúng ta sẽ không bị dừng/ kẹt tại rìa của Content View bởi vì viewport luôn nằm chính giữa. Miễn là app chúng ta cứ cung cấp nội dung mới vào khoảng trống mở, thì chúng ta sẽ scroll mãi mãi.<br>
UIScrollViewDelegate.scrollViewDidScroll(...) là một trong những nơi tốt nhất để mô tả sự chuyển động của scroll view, bởi vì hàm đó được gọi mỗi khi viewport di chuyển và trước layout/ rendering diễn ra.
### Scroll with paging
### Vấn đề đặt ra
Kỹ thuật trên rất dễ để cài đặt và rất hiệu quả. Ngoại trừ khi chúng ta cần phân trang.
UIScrollView có một thuộc tính là isPagingEnabled. Bằng việc cho nó bằng true, scroll sẽ chuyển qua từng nội dung theo kiểu phân trang như ví dụ dưới đây.<br>
![](https://images.viblo.asia/e479bc43-3634-4f0d-93dd-d82f96adf92a.gif)<br>
Nếu chúng ta cài đặt phương thức của Josh và Eliza vào app trên thì nó sẽ làm hỏng chức năng phân trang của UIScrollView. Nhớ lại ý tưởng chính của kỹ thuật Josh và Eliza là giữ viewport ở chính giữa Content View. Với ý tưởng đó khi áp dụng cho paging thì kết quả là việc chuyển trang không đúng.
### Giải pháp
Josh và Elisa thay đổi viewport mỗi khi scrollViewDidScroll() gọi. Nhưng thật ra chỉ có 2 thời điểm ta cần. Khi viewport di chuyển sang phải, nội dung trang kế tiếp chiếm phần chính của viewport. Ta cần kéo nó về bên trái để nó không bị mắc kẹt ở rìa phải và ngược lại.<br>
![](https://images.viblo.asia/9d21a906-592d-4dec-85a2-674eb6270da2.png)<br>
![](https://images.viblo.asia/3fd3dc0f-70d3-4f0e-b83b-70e937b7d417.png)<br>
Chúng ta chỉ cần điều chỉnh viewport theo kích thước của một trang và chuẩn bị nội dung tiếp theo.
### Code
Trong ví dụ này, ta có một UIImageView và một UIImage cho mỗi trang trong scroll view, một mảng gồm 3 UIImageView và tái sử dụng chúng. Mỗi khi điều chỉnh vị trí của các trang, ta điều chỉnh khung của các UIImageView này và gán ảnh mới vào các UIImageView.
```
private func layoutImages() {
    let w = scrollView.frame.size.width
    let h = scrollView.frame.size.height
imageViews.enumerated().forEach { (index: Int, imageView: UIImageView) in
       imageView.image = images[index]
       imageView.frame = CGRect(x: w * CGFloat(index),
                                y: 0,
                                width: w,
                                height: h)
    }
}
```

```
func scrollViewDidScroll(_ scrollView: UIScrollView) {
    let offsetX = scrollView.contentOffset.x
        
    if (offsetX > scrollView.frame.size.width * 1.5) {
        // 1. Update the model. Remove (n-1)th and add (n+2)th.
        let newImage = fetcher.fetchRandomImage()
        images.remove(at: 0)
        images.append(newImage)
        // 2. Shown later. Configure frames for n ~ n+2 pages.
        layoutImages()
        // 3. Adjust the view port
        scrollView.contentOffset.x -= scrollViewSize.width
    }
if (offsetX < scrollView.frame.size.width * 0.5) {
        // 1. Update the model. Remove (n+1)th and add (n-2)th.                 
        let newImage = fetcher.fetchRandomImage()
        images.removeLast()
        images.insert(newImage, at: 0)
        // 2. Shown later. Configure frames for n-2 ~ n pages.
        layoutImages()
        // 3. Adjust the view port
        scrollView.contentOffset.x += scrollViewSize.width
    }
}
```

### Kết luận
Khi muốn cài đặt một infinite scrollview sử dụng UIScrollView, ta điều chỉnh contentOffset và khung của content view đó.<br>
Khi muốn phân trang, ta có thể sử dụng khái niệm giảm thời điểm của việc điều chỉnh.<br>



Bài viết tham khảo và dịch từ https://medium.com/@yfujiki/infinite-scroll-using-uiscrollview-with-paging-50f00748b2b