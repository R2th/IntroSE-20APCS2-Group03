Có hai loại người - những người học bằng cách trải qua những hậu quả của việc phạm sai lầm và những người học bằng cách lấy lời khuyên của ai đó. 
Dưới đây là một số điều tôi đã học được theo cách mà tôi muốn chia sẻ với bạn:
1. Suy nghĩ kỹ trước khi thêm bất kỳ thư viện của bên thứ ba nào, đó là một sự ràng buộc thực sự nghiêm túc;
2. Nếu người dùng không nhìn thấy nó, [đừng vẽ nó](http://riggaroo.co.za/optimizing-layouts-in-android-reducing-overdraw/) !;
3. Không sử dụng cơ sở dữ liệu trừ khi bạn thực sự cần;
4. Đạt mức 65k method sẽ đến rất nhanh chóng, ý tôi là rất nhanh! Và [multidexing](https://medium.com/@rotxed/dex-skys-the-limit-no-65k-methods-is-28e6cb40cf71) có thể cứu bạn;
5. [RxJava](https://github.com/ReactiveX/RxJava) là giải pháp thay thế tốt nhất cho AsyncTask và nhiều hơn thế nữa;
6. [Retrofit](http://square.github.io/retrofit/) là thư viện networking tốt nhất;
7. Rút ngắn mã của bạn với [Retrolambda](https://android.jlelse.eu/retrolambda-on-android-191cc8151f85);
8. Kết hợp[ RxJava với Retrofit và Retrolambda](https://medium.com/swlh/party-tricks-with-rxjava-rxandroid-retrolambda-1b06ed7cd29c) tạo nên sự tuyệt vời hơn !;
9. Tôi sử dụng [EventBus](https://github.com/greenrobot/EventBus) và nó rất tuyệt, nhưng tôi không sử dụng nó quá nhiều vì codebase sẽ thực sự lộn xộn
10. [Package theo tính năng, không phải lớp](https://medium.com/the-engineering-team/package-by-features-not-layers-2d076df1964d)
11. Di chuyển mọi thứ ra khỏi application thread
12. [lint](https://developer.android.com/studio/write/lint) views của bạn để giúp bạn tối ưu hóa các bố trí và bố trí hệ thống phân cấp để bạn có thể xác định views dư thừa có thể được gỡ bỏ;
13. Nếu bạn đang sử dụng gradle, bạn có thể [tăng tốc độ](https://medium.com/the-engineering-team/speeding-up-gradle-builds-619c442113cb);
14. Kiểm tra  [profile reports](https://android.jlelse.eu/speeding-up-gradle-builds-619c442113cb) về các bản build của bạn để xem cái gì mất bao nhiêu thời gian build.
15. Sử dụng một [kiến trúc nổi tiếng](https://fernandocejas.com/2015/07/18/architecting-android-the-evolution/);
16. [Quá trình kiểm thử cần có thời gian nhưng nhanh hơn và mạnh mẽ hơn mã hóa mà không cần kiểm tra khi bạn đã bị treo;](https://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort/67500#67500)
17. Sử dụng tính năng [dependency injection ](https://fernandocejas.com/2015/04/11/tasting-dagger-2-on-android/) để làm cho ứng dụng của bạn thêm mô đun và do đó dễ kiểm  hơn;
18. Tham khảo trang [fragmentedpodcast](https://fragmentedpodcast.com/) sẽ rất tuyệt vời cho bạn;
19. [Không bao giờ sử dụng email cá nhân của bạn cho tài khoản publisher trên Playstore ](https://www.reddit.com/r/Android/comments/2hywu9/google_play_only_one_strike_is_needed_to_ruin_you/);
20. Luôn sử dụng các loại [input keyboard](https://developer.android.com/training/keyboard-input/style) thích hợp;
21. Sử dụng analytics để tìm các usage patterns và cách ly các lỗi;
22. Luôn luôn cập nhật các [thư viện mới](http://android-arsenal.com/) (sử dụng [dryrun](https://github.com/cesarferreira/dryrun) để kiểm tra chúng ra nhanh hơn);
23. Các services của bạn nên làm những gì nó cần làm và **hủy** chúng càng nhanh càng tốt;
24. Sử dụng [Account Manager](http://developer.android.com/reference/android/accounts/AccountManager.html) để đề xuất tên người dùng và địa chỉ email đăng nhập;
25. Sử dụng CI (Continuous Integration) để xây dựng và phân phối bản beta và sản xuất của bạn .apk’s;
26. Không chạy máy chủ CI của riêng bạn, bởi vì việc disk space/security issues/updating máy chủ để bảo vệ khỏi các cuộc tấn công SSL, v.v. Sử dụng circleci, travis hoặc shippable, chúng rẻ và ít hơn lo lắng về những thứ khác;
27. [Tự động hóa các triển khai của bạn đến playstore;](https://github.com/Triple-T/gradle-play-publisher)
28. Nếu một thư viện lớn và bạn chỉ sử dụng một tập nhỏ các hàm của nó, bạn nên tìm một tùy chọn nhỏ hơn thay thế (dựa vào [proguard](https://developer.android.com/studio/build/shrink-code) chẳng hạn);
29. Không sử dụng nhiều mô-đun hơn bạn thực sự cần. Nếu các mô-đun đó không được sửa đổi liên tục, điều quan trọng là phải cân nhắc rằng thời gian cần thiết để compile chúng từ đầu (xây dựng CI là một ví dụ tốt), hoặc thậm chí để kiểm tra xem việc xây dựng mô-đun cá nhân trước đó có được cập nhật hay không lên đến gần gấp 4 lần so với việc đơn giản là tải dependency đó dưới dạng tệp .jar / .aar nhị phân.
30. [Bắt đầu suy nghĩ về việc thay  các PNG cho SVG;](http://developer.android.com/tools/help/vector-asset-studio.html)
31. Tạo library abstraction classes, sẽ dễ dàng chuyển sang thư viện mới nếu bạn chỉ cần chuyển đổi ở một nơi (ví dụ: AppLogger.d (“message”) có thể chứa Log.d (TAG, message) và sau đó nhận ra rằng [Timber.d (message)](https://github.com/JakeWharton/timber) là một lựa chọn tốt hơn);
32. Theo dõi power source và battery (có thể follow theo trường hợp như cập nhật dữ liệu nhiều hơn trong khi sạc, tạm dừng cập nhật khi pin yếu);
33. Giao diện người dùng thật nực cười. Nếu bạn phải giải thích nó về việc nó phải dùng như thế nào, nó có nghĩa là giao diện của bạn không tốt;
34. Các cách thử nghiệm rất tốt cho performance: Viết từ từ thôi (nhưng chính xác), sau đó tìm cách tối ưu hóa không làm hỏng bất kỳ điều gì với các bài test;

Bài viết được dịch theo nguồn: https://medium.com/@cesarmcferreira/building-android-apps-30-things-that-experience-made-me-learn-the-hard-way-313680430bf9
Người dịch: Nguyễn Khuyến.