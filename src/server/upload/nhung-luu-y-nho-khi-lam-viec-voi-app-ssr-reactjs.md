![](https://images.viblo.asia/84aa84fa-2e64-40d9-9ec5-91baf8505193.gif)
Chắc rằng tất cả mọi người cũng không xa lạ gì với khái niệm SSR và CSR rùi nhỉ! Nếu ai còn chưa rõ hãy google để hiểu thêm nhé! Nếu được thì mọi người hãy đọc trước về SPA trước để có thể hiểu rõ bản chất của nó nhé! Thôi không luyên thuyên nữa thì hôm nay mình sẽ nêu một số lưu ý nhỏ khi làm việc với SSR trong ReactJS!

## 1. Phân biệt giữa CSR và SSR
   Thì tại sao chúng ta cần phân biệt hai khái niệm này! Hầu hết khi nói tới ReactJS thì chúng ta chả quan tâm nó là CSR hay là SSR, cứ bay vào và code thui ^.^. Và sau này nếu gặp một vấn đề về liên quan đến hai khái niệm này thì lại không hiểu rõ để đưa đến quyết định đưa ra giải pháp phù hợp để giải quyết vấn đề.

   Trên mạng internet hiện nay có rất nhiều bài chia sẻ về việc phân biệt giữa SSR và CSR, mọi người có thể tìm đọc. Ở đây mình chỉ nêu về một số điểm khác nhau nổi bật và có liên quan những lưu ý mình sắp nói ở phần tới.
   
Sau đây là những khác biệt nổi bật:

+ Một là việc code của chúng ta sẽ được thư thi khi nào và ở đâu. Đối với CSR thì khi có một request từ browser đế server(ở đây là server chưa source đã dc build đầy đủ nhé) thì thay vì như những webapp truyền thống là browser sẽ nhận được một page HTML và hiển thị trên browser thì đối với CSR thì server sẽ trả về cho browser một trang HTML thô cùng với một link đến file JS, file JS sẽ được dowload về và execute để fill content vào page HTML. Đối với SSR thì công việc đó sẽ được làm ở server và server sẽ trả về cho browser một trang HTML đã được render.
+ Hai là vấn đề về SEO. Khi làm việc với app CSR thì việc SEO là rất khó và gần như không thể. Với SSR  thì SEO là mặc định.

Thì hai điều trên theo mình là những khác nhau nổi bật để tách biệt và giúp chúng ta hướng đến việc sử dụng CSR hay là SSR vào app của mình.

## 2. Một số lưu ý nhỏ khi làm việc với SSR ReactJS
Hầu hết code chúng ta quen làm việc với CSR ReactJS hơn vì nó dễ làm hơn và chúng ta chỉ cần cover những trường hợp ở client thui. Nhưng khi chuyển sang làm SSR thì sẽ có nhiều vấn đề cần cover hơn. Thì sau đây là một số lưu ý của mình hy vọng sẽ giúp chúng ta ít găp bug hơn :v: 

+ Khi tạo base source thì nếu đã có tích lũy trước đó và có kinh nghiệm làm việc với SSR thì hãy dùng nó và cải thiện thêm trong quá trình làm việc. Trong trường hợp còn lại nếu không có base source rõ ràng thì hãy research và sử dụng một boilerplate và theo dõi những thay đổi để linh hoạt cải thiện source. Và nếu có boilerplate thì chúng ta sẽ tiết kiệm đươc rất nhiều thời gian. Nhưng bù lại có những trường hợp chúng ta phải tự bóp méo code của boilerplate và sẽ phải testing để cover những trường hợp có thể xảy ra bug và boiler là theo một khuôn nên muốn thay đổi thì sẽ khó khăn và mất thời gian. Mình recommend [NextJS](https://nextjs.org/) nhé! Sẽ phải đọc tài liệu nhiều nhưng rất hữu dụng :v Một lưu ý nhỏ nữa khi sử dụng NextJS thì hãy custom một node server riêng nhé,  sẽ rất có ích về sau.
+ Như ở phần một thì chúng ta có phân biệt giữa CSR và SSR thì khi chuyển từ CSR ReactJS sang làm SSR ReactJS thì hay chú ý cover cho cả hai trường hợp khi ở server(Sử dụng cho first load và SEO) và khi ở client. Nếu mình nhớ không nhầm thì trong NextJS có một sơ chế cho phép chúng ta nhận biết được là code đang được thực thi ở server hay client. Các bạn có thể tìm đọc thêm nhé!

Trên đây mình đã trình bày về hai lưu ý nhỏ thui. Ngoài ra tùy vào app của mọi người làm về lĩnh vực gì nữa cơ. Từ đó sẽ còn phát sinh nhiều vấn đề nhức óc nữa và còn nhiều thứ chúng ta cần chú ý nữa. Nhưng chung quy hãy cân nhắc về hai lưu ý của mình ở trên nhé!

Thì bài viết của mình đến đây là hết rùi! Mong là sẽ giúp ích được cho mọi người. Xin cảm ơn mọi người đã đọc bài viết này! Hẹn gặp lại trong những bài chia sẻ tiếp theo.
![](https://images.viblo.asia/949b1eb5-22b2-4a23-b7ff-44a67be29458.jpg)