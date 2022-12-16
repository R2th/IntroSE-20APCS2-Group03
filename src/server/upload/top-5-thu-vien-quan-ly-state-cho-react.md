Trong bài viết này mình sẽ đưa ra cho các bạn 5 thư viện quản lý State cho React, thứ tự mình đặt trong bài viết không hề mang tính chất xếp hạng nhé. Một số thư viện có thể rất quen tên với bạn, một số khác thì có thể sẽ khiến bạn bất ngờ. Bài viết của mình sẽ chỉ đưa ra một số mô tả ngắn gọn, hi vọng sẽ thu hút được sự quan tâm của các bạn để đi vào link docs gắn kèm.

Hãy bắt đầu thôi nào!

# 1. [Redux](https://redux.js.org/)

![image.png](https://images.viblo.asia/4b6ba326-0b30-4a3f-98ea-27d3a4dddcd0.png)

Redux chắc hẳn đã hiện lên trong tâm trí bạn ngay khi bạn đọc tiêu đề của bài viết này (tất nhiên là nếu như bạn đã từng làm quen với React :satisfied: ). Redux có thể coi là thư viện quản lý State đứng đầu từ khá lâu rồi. Điều này một phần là do Redux thường đựoc bundled cùng với React luôn tuy nhiên nó hoàn toàn độc lập với React và có thể sử dụng với bất kỳ thư viện UI hay framework nào khác.

Vì vậy, có thể coi Redux là "mặc định" khi nhắc đến thư viện quản lý State. Tuy nhiên nó đã bắt đầu bộc lộ một số "dấu hiệu của tuổi tác" và nếu không phải vậy thì đôi khi nó sẽ khiến cho một số không nhỏ các lập trình viên khó chịu. Đừng hiểu lầm ý của mình, Redux vẫn là một thư viện tuyệt vời, nhưng [kích thước của nó](https://bundlephobia.com/package/@reduxjs/toolkit@1.6.0), [learning curve](https://www.valamis.com/hub/steep-learning-curve#:~:text=A%20steep%20learning%20curve%20is,will%20be%20slow%20and%20arduous.&text=The%20curve%20would%20actually%20appear%20to%20be%20shallow%20and%20long.) một cách dốc đứng  và cách tiếp cận dài dòng với **action-reducer** để quản lý State có thể khiến một số người muốn thay đổi.

Tuy nhiên, Redux vẫn là thư viện phổ biến nhất trong lĩnh vực này, nó có một cộng đồng khổng lồ và một hệ sinh thái rộng lớn không kém, vì vậy Redux vẫn sẽ nằm ở top trong một khoảng thời gian kha khá nữa.

# 2. [Mobx](https://mobx.js.org/README.html)

![image.png](https://images.viblo.asia/c005134d-1d6b-4f67-8603-2610dbbeb343.png)

Lại là một cái tên quen thuộc đúng không, kém phổ biến hơn Redux một chút xíu, Mobx vẫn có cho mình lượng "fan" đông đảo. Tương tự như Redux, Mobx không chỉ hỗ trợ cho một mình React (dù React vẫn là đối tượng chính).

Hiện tại, Mobx chắc chắn không phải là [một thư viện nhỏ](https://bundlephobia.com/package/mobx@6.3.2) nhưng so sánh với Redux, một số người có thể thấy API và cách tiếp cận của nó có đôi phần dễ chịu hơn. Nó vẫn có một learning curve đánh chú ý đối với kiểu thư viện này nhưng sau tất cả, cảm nhận với Mobx thực sự tốt hơn đoi chút và ít lặp lại hơn so với Redux.

Điều này có lẽ chỉ là nhận định cá nhân của mình, nhưng để các bạn có thêm nhiều hướng nhìn, Mobx chắc chắn không dành cho những ai theo chủ nghĩa tối giản. API của nó rất tốt và có thể dẫn tới những đoạn code thực sự đẹp và sạch sẽ. Nhưng ẩn sâu trong nó là một thư viện nặng nề, tương đối khó để thành thạo đầy đủ. Và trên hết, cộng đồng và hệ sinh thái của Mobx cũng không thực sự lớn.

# 3. [Recoil](https://recoiljs.org/)

![image.png](https://images.viblo.asia/a7fe66f0-b9a5-4d71-ad81-1988ef430048.png)

Ok, từ giờ chúng ta sẽ bước đến những thư viện ít nổi tiếng hơn chút hoặc là hoàn toàn xa lạ, tuy nhiên nó chắc chắn sẽ chứa những điều thú vị bất ngờ.

Bạn có thể thấy quen thuộc với Recoil. Nó đã gây được sự chú ý nhất định khi "ra mắt" trong một giai đoạn không ổn định đầu năm 2020 và đang đứng đầu trong [danh sách](https://github.com/facebookexperimental?q=&type=&language=&sort=stargazers) các repo "Facebook experiment"  với số start vượt trội.

Dù hiện tại nó vẫn đang là dự án thử nghiệm nhưng nó đnag được phát triển bởi những lập trình viên của Facebook (nơi khai sinh ra React), điều này chắc chắn sẽ giúp tăng độ phổ biến của Recoil. Thậm chí có một số người đã sử dụng nó trong [những sản phẩm production](https://www.reddit.com/r/reactjs/comments/i3asfg/is_recoil_production_ready/?utm_source=share&utm_medium=web2x&context=3) ngay trong thời điểm hiện tại.

Nhưng điều đó không có nghĩa là Recoil có có điểm gì nổi bật. Thực ra là hoàn toàn ngược lại, Recoil cung cấp cách tiếp cận **atom-based** để quản lý State rất mới mẻ, hiện đại và **hook-centric API** là một điểm khá hấp dẫn nữa.

Tuy nhiên, thời điểm hiện tại, do Recoil vẫn đang trong giai đoạn thử nghiệm nên có lẽ bạn không nên sử dụng nó trong các dự án production. Hãy đặt nó qua một bên, sử dụng trong những dự án thử nghiệm và tiếp tục theo dõi sự phát triển của Recoil (thậm chí là [đóng góp](https://github.com/facebookexperimental/Recoil) vào sự phát triển của nó) để xem nó sẽ trở nên như thế nào.

# 4. [Akita](https://datorama.github.io/akita/)

![image.png](https://images.viblo.asia/96775792-1c1d-47ac-bedf-c4c674bd69c5.png)

Thư viện tiếp theo, Akita có vẻ ít được biết tới. Nó tương tự như Mobx, nhưng nó có thiên hướng về **Object-Oriented** (OO) **API** hơn là functional như Mobx.

Vì vậy, Akita tạo ra sự khác biệt thông qua cách tiếp cận bằng OO của nó. Đặc biệt dễ nhận thấy khi sử dụng nhiều **TypeScript** và **Decorator**. Hiện tại, khi TypeScript không còn dành riêng cho OOP nữa và được hỗ trợ rất nhiều (tất cả các thư viện tỏng bài viết này đều hỗ trợ TS). Ngaòi Akita, Mobx là thư viện duy nhất trong danh sách này hỗ trợ cả **TypeScript** và **Decorator**, tuy nhiên nó đã chuyển trọng tâm sang các cách tiếp cận khác kể từ v6.

Vì vậy, với cơn sốt về lập trình chức năng (Functional Programming - FP) và hook đang diễn ra ngay lúc này và **Decorator** - thực tế là một tính năng JS chưa thực sự ổn định, Akita có thể sẽ không phải là sự lựa chọn của số đông. Có thể đó là lý do tại sao Akita lại tập trung về Angular (nơi mà **Decorator** phổ biến hơn) hơn là React.

Nhưng sau tất cả, nếu bạn thích Akita và API của nó thì không có gì có thể năng cản bạn sử dụng nó với React. Nó có thể ghép nối rất tốt nếu bạn sử dụng components class-based, có bộ tài liệu tuyệt vời và cộng đồng với quy mô vừa đủ.

# 5. [Hookstate](https://hookstate.js.org/)

![image.png](https://images.viblo.asia/6ab745fa-413b-4708-8013-0acfba91c4f9.png)

Mình đã giữ lại cái "tốt nhất" để nói cuối cùng.

Hookstate đang là sự lựa chọn yêu thích của mình khi làm việc với React, mặc dù nó ít phổ biến nhất trong danh sách này. Nó nhỏ, tối giản, sạch sẽ, có khả năng mở rộng cao và nó sử dụng **hook-based API**.

Đây có thể là sự lựa chọn cho bạn nếu như bạn là người đam mê React hooks. Hookstate sử dụng chúng và một số kỹ thuật ấn tượng khác để mang lại trải nghiệm và hiệu suất tuyệt vời.

Không chỉ có thể sử dụng cho Global State mà còn có thể dụng thêm "useState()" cùng một số tính năng bổ sung nữa. Xử lý State lông nhau mà không làm ảnh hưởng hiệu suất và xử lý dữ liệu không đồng bộ một cách dễ dàng.

Tất cả điều đó cùng với [kích thước nhỏ](https://bundlephobia.com/package/@hookstate/core@3.0.8) và cấu trúc plugin đơn giản dễ sử dụng sẽ mang đến nhiều tính năng hơn nữa. 

Mình thực sự khuyến nghị bạn nên xem qua nó ít nhất một lần.

# 6. Đừng bỏ quên những điều cơ bản

Tại thời điểm này, khi chúng ta đã đi qua hết những thư viện tuyệt vời này, mình muốn nhắc các bạn một sự thật là bạn không nhất thiết phải dùng đến chúng.

Trái ngược với suy nghĩ của nhiều người, thư viện dùng để quản lý State không phải là một yêu cầu bắt buộc khi sử dụng React. Trong thực tế, React cũng cung cấp các công cụ riêng cho việc đó - State và Context APIs. Chắc chắn rằng nó sẽ không thuận tiênj để làm việc như khi sử dụng các thư viện trên nhưng hoàn toàn có thể sử dụng nó cho các dự án không quá phức tạp.

Do đó, hãy chỉ lựa chọn thư viện ngoài khi bạn chắc chắn rằng mình sẽ cần tới nó. Đó là một phần lý do mà mình yêu thích Hookstate vì nó cung cấp nhiều tính năng bổ sung với một API dễ chịu trong khi kích thước không hề lớn.

# 7 Tổng kết

Những đánh giá, nhận đinh của mình về các thư viện trên hầu hết đều mang tính chất cá nhân, nếu có góp ý hay các bạn còn biết thư viện nào tuyệt vời hơn nữa, hãy để lại comment cho mình  biết nhé.

[Source](https://areknawo.com/top-5-react-state-management-libraries-in-late-2020/?__cf_chl_managed_tk__=fef8c4ea8bfc2946652daf4c8ec6689180219c9f-1624698463-0-ATeSXeDe_JxWrwOli85oNxQNmhYQFLOrhHF7Le0cZQsSrTzcsISaFKcW38E1EQNIUs8aokmrYi-q28qAo59RFX5NHW9CQT28Lbdsh_lNx1s0S38mPa3CiMn3jCqGAiEImUh3628ZJc8O-kslqD1zI9UXsx0-EFdvHVeZlH0K_VtRAHVwUXsppEX2fuC9iogz-R0_H1jKsa8ypYF4s6ECw1tYEh9eV8-ZwkVOvVa2YICu71qz4biheVVLkdn52bLG5lJwNvA-WaGWcPejFparIVLfZ9rcLzHG6tJxhp7FNDX9qKIKSWf3oexrKqgOmt18ccjMroYGCe2HC_nQmbLF49hGDe2aDoyeBOAgXYNyhdLR2aAh13pH-yVjevyCnVwVqcktypUvI7uCqKYmQD3g9AazITMnlqgE-eGXL2yKnzw_wclCcefb59R-K3L_-61l9VmXKivo55UMrdcqpwhXzJrrh8PhhvK9zkWPrMEKVHMm2thIFBAmE2HNQCtpPptoIK8gNv_Gd5d052ZSzfkok8ysplYJCcqPLm3THHtZfx1NyzHR0qcraVivwWfeoBkEvYHkw7uOZYyYsmWZ6wEp7Esf31NvoCGXg9SbB6BfJoqQvyuu3fL5h8bJn7ISci5juOhA0n2C9_hb_d5kfLS4qq2Ci1_rG7DVxiaAxJlNY4PqLxopUHHrPRHUWv0SKbxcIQ)