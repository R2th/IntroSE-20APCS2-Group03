<div align="center">

# Lời nói đầu
</div>

- Xuất phát từ nhu cầu cần thực hiện chức năng biểu đồ thống kê cho trang admin của mình thì minh cũng có tìm hiểu về các thư viện hỗ trợ việc vẽ biểu đồ, trong đó có thể kể đến một số cái tên tiêu biểu như là [Chartjs](https://www.chartjs.org/) hay là [Chartist](https://gionkunz.github.io/chartist-js/). 
- Nhưng rồi mình được một người anh khai sáng cho một thư viện "mới" (đối với mình) và ấn tượng đầu tiên là nó khá là sặc sỡ, bắt mắt, và một điểm cộng nữa đó chính là có tích hợp sẵn cho ba library/framework javascript phổ biến hiện nay là **Angular/React/Vue**. Đó chính là [Apex Chart](https://apexcharts.com/).
- Vì vậy mình đã quyết định thử trải nghiệm thư viện nào và chia sẻ lại với các bạn trong bài viết này. Chúng ta cùng bắt đầu thôi nào!
 
<div align="center">

# Nội dung
</div>

<div align="center">

## Tìm hiểu về Apex chart 
</div>

- Ấn tượng đầu tiên của mình về về Apex là về thẩm mĩ, so với 2 cái tên mình nói ở trên là Chartjs và Chartist thì rõ ràng các bạn có thể thấy rằng Apex đẹp hơn rõ ràng. Và tùy vào dự án của bạn, **Vue/Angular/React/JS** thì Apex cũng có sẵn demo và code mẫu cho bạn tham khảo

![](https://images.viblo.asia/7714a30d-876b-4daf-93f7-42af416f4f28.png)

- Điều tiếp theo mà mọi người thường quan tâm khi sử dụng một thư viện là số lượt người sử dụng và số sao trên github. Tuy nhiên do thời điểm phát hành khác nhau nên những con số này không nói lên quá nhiều điều. Thay vì đó chúng ta sẽ quan tâm xem nó còn "sống" hay không, tức là có còn được tiếp tục phát triển nữa hay không? Cùng điểm qua thông tin repository của cả 3 thư viện trên github (tại thời điểm 05/05/2020) để so sánh nhé.

    - **Apex**: 
    
    ![](https://images.viblo.asia/2d23302f-4c23-4043-ac65-f3262d3d25c1.png)

    - **Chartjs**: 
    
    ![](https://images.viblo.asia/30b366dc-aeec-4497-84d5-7b39d7365c9f.png)

    - **Chartist**:  commit cuối cùng của chartist-js là từ tháng 11/2019, tức là đã hơn nửa năm repo này không được phát triển tiếp. Không rõ vì lí do gì mà chủ sở hữu repo vẫn comment trong các issue nhưng lại không merge các pull request cũng như giải quyết các issue đó. Nhưng dù sao thì nếu là mình mình cũng sẽ không lựa chọn sử dụng thư viện này.
    
    ![](https://images.viblo.asia/e43a253d-4724-4ad3-8460-236a08cc940f.png)

<div align="center">

## Một số chức năng tiêu biểu
</div>

- Bên trên là 2 lí do mà mình lựa chọn Apex, giờ chúng ta sẽ bắt tay vào cài đặt để có thể sử dụng được Apex nhé:
    - **Cách 1 (recommend):**  cài đặt thông qua **npm (Node package manager)** bằng câu lệnh 
        ```bash
        npm install apexcharts --save
        ```
        Và khi sử dụng thì chỉ cần import vào như sau:
        ```javascript
        import ApexCharts from 'apexcharts'
        ```
        
    - **Cách 2:** Đó là nhúng trực tiếp bằng thẻ <script> trong html. Nhiều người sẽ thấy cách này đơn giản, dễ ăn dễ trúng thưởng nhưng mình không khuyến khích sử dụng cách này nhé, vì nó sẽ làm tốc độ tải trang bị chậm hơn.
        ```html
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        ```

- Tiếp theo cùng nhau tìm hiểu một số thành phần chính tạo nên một biểu đồ hoàn chỉnh nhé:

    ### 1. Series: 
    - Thứ tối thiểu để tạo ra một biểu đồ đó chính là dữ liệu. Và một tập dữ liệu dùng cho biểu đồ được gọi là series. Và chúng ta có một số kiểu như là `single data series/multiple data series/...`
    #### 1.1. Single values: 
    - Đây là một loại định dạng dữ liệu đơn giản, thường dùng với các loại **biểu đồ cột** để so sánh dữ liệu giữa các categories với nhau. Ví dụ về single values thì thường `series` sẽ là `trục y` trong biểu đồ còn `categories` thì là trục x:
        ```javascript
        series: [{
          data: [23, 34, 12, ... , 43]
        }]
    
        xaxis: {
          categories: ["Jan", "Feb", "Mar", ... , "Dec"]
        }
        ```
    
    #### 1.2. Paired values:
    - Dữ liệu sẽ được khai báo thành từng cặp giá trị `{x, y}` trong series và bạn sẽ cần phải khai báo thêm kiểu dữ liệu của trục x, ví dụ như sau:
        ```javascript
        series: [{
            data: [{
                x: 20,
                y: 54
            }, {
                x: 30,
                y: 66
            }],
        }],
        
        //Ngoài ra có thể khai báo cặp giá trị theo kiểu mảng hai chiều như sau
        series: [{
          data: [[1, 34], [3, 54], [5, 23] , ... , [15, 43]]
        }], 
    
        //khai báo kiểu dữ liệu của trục x
        xaxis: {
          type: 'numeric'  //kiểu dữ liệu ở đây có thể là numeric hoặc là string
        }
        ```
    #### 1.3. Timeline series:
    - Trong một số biểu đồ, bạn sẽ cần theo dõi dữ liệu thay đổi theo thời gian (ví dụ như biểu đồ hiển thị reputation ở [trang viblo cá nhân](https://viblo.asia/u/vuongthai95/reputations)) thì việc xử lí với timestamps hay dữ liệu ngày cũng rất quan trọng.
        ```javascript
        series: [{
            data: [{ 
                x: '05/06/2014', 
                y: 54 
            }, { 
                x: '05/08/2014', 
                y: 17 
            }, { 
                x: '05/28/2014', 
                y: 26 
            }]
        }]
        ```
    - Để chắc chắn rằng dữ liệu DateTime string bạn truyền vào chính xác, hãy thử truyền vào function Date.parse() , nếu return `true` tức là đã chính xác.

    #### 1.4. Data for Pie/Donuts/RadialBars:
    - Đối với một số dạng biểu đồ đặc biệt như biếu đồ tròn (Pie), biểu đồ vòng (Donut), biểu đồ tròn đồng tâm (RadialBars) thì dữ liệu truyền vào cũng khác so với biểu đồ trục {x, y}. 
    - Khi đó, thay vì truyền về `xaxis` thì chúng ta sẽ phải truyền vào `labels`
        ```javascript
        series: [23, 11, 54, 72, 12],
        labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"]
        ```
    
    ### 2. Localization
    - Đa ngôn ngữ là một chức năng rất cần thiết đối với một trang web, khi mà giờ đây đối tượng truy cập một website có thể sử dụng rất nhiều ngôn ngữ khác nhau. Hiểu được điều đó, Apex cung cấp chức năng `Localization` để có thể tùy chỉnh định dạng ngày tháng hoặc các đoạn văn bản theo từng ngôn ngữ, khu vực.
    - Để sử dụng được chức năng này, ta sẽ có 2 lựa chọn:
        - Nhúng file json tương ứng vs ngôn ngữ/quốc gia mà bạn mong muốn.
            - Nếu như bạn cài đặt Apex thông qua npm thì bạn có thể tìm thấy file json này bên trong thư mục `/dist/locales`.
                ```javascript
                var fr = require("apexcharts/dist/locales/fr.json")
                {
                  chart: {
                   locales: [fr],
                   defaultLocale: 'fr',
                  }
                }
                ```
            - Nếu muốn sử dụng cdn thì bạn có thể vào đường dẫn https://cdn.jsdelivr.net/npm/apexcharts/dist/locales/ để tìm ngôn ngữ mà mình cần:
            ![](https://images.viblo.asia/eeb5d5bf-aa2b-4893-be48-420543775e56.png)

        - Nếu không muốn nhúng file json có sẵn thì bạn có thể tự tạo file locale của bản thân bạn (hiện tại chưa có tiếng Việt nên các bạn muốn tìm hiểu có thể thử làm theo cách này) theo template mẫu như sau:
            ```javascript
            var options = {
              chart: {
                locales: [{
                  "name": "vi",
                  "options": {
                    "months": ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                    "shortMonths": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
                    "days": ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"], //hãy nhớ rằng chủ nhật là ngày đầu tuần nhé
                    "shortDays": ["CN", "t2", "t3", "t4", "t5", "t6", "t7"],
                    "toolbar": { //tooltip hiển thị khi bạn hover vào các icon tương ứng
                        "exportToSVG": "Tải định dạng SVG",
                        "exportToPNG": "Tải định dạng PNG",
                        "zoomIn": "Phóng to",
                        "zoomOut": "Thu nhỏ",
                        "pan": "Panning", //cái này mình cũng ko biết dịch sao, đại loại là bạn sẽ click chọn 1 vùng thì sẽ phóng to vùng đấy lên 
                        "reset": "Cài đặt lại"
                    }
                  }
                }],
                defaultLocale: "vi"
              }
            }
            ```
    ### 3. Interactivity (tương tác với biểu đồ)
    - Đây là một chức năng mà mình thấy cũng khá là hay, giúp cho người dùng có thể tương tác thêm với biểu đồ thay vì chỉ có thể nhìn vào một biểu đồ tĩnh. Như bạn có thể thấy ở đây thì bạn có thể phóng to, thu nhỏ biểu đồ hay là download biểu đồ dưới định dạng SVG.
    
        ![](https://images.viblo.asia/2ba172da-fec8-45fb-bc5f-0c9c0d26cba1.png)

    - Để có thể tùy chỉnh những chức năng này, bạn có thể thay đổi config của toolbar như sau:
        ```javascript
        chart: {
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            autoSelected: 'zoom' //tự động sử dụng tools này khi load biểu đồ
          },
      }
        ```
    
    ### 4. Themes
    - Một chức năng nữa cũng rất tiện dụng nữa của Apex là nó đã cung cấp sẵn ~10 bộ màu để cho bạn lựa chọn, thay vì phải mất thời gian tự custom màu sắc mà kết quả có khi lại là thảm họa về thẩm mĩ :D 
    - Bộ màu và mã màu cụ thể của 10 palette: https://apexcharts.com/docs/options/theme/#palette
    ![](https://images.viblo.asia/add7153d-3397-4a8a-9427-8e0e8c99b30a.png)

    - Demo 10 palette: https://codesandbox.io/s/qzjkzmzxoj?from-embed
    
<div align="center">

# Tổng kết
</div>

- Bài viết này mình xin giới thiệu một vài tính năng nổi bất khiến mình lựa chọn Apex, mong rằng bài viết này có thể thuyết phục bạn và cung cấp thêm cho bạn một lựa chọn khi cần thực hiện chức năng vẽ biểu đồ thống kê. Nếu bạn tìm thấy thứ gì hay ho nữa thì đừng ngần ngại và chia sẻ cho mình cũng như mọi người nhé.
- Cảm ơn các bạn đã dành thời gian đọc bài viết của mình :heart_eyes::heart_eyes::heart_eyes::heart_eyes:    

<div align="center">

# Tài liệu tham khảo
</div>

- Trang chủ: https://apexcharts.com/
- Github: https://github.com/apexcharts/apexcharts.js