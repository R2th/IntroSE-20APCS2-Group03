Hôm trước trong buổi cafe, ông anh mình có nhờ tìm cách để thống kê tất cả dữ liệu khách hàng đang được lưu dải rác trên `google sheet` tương ứng với mỗi bạn nhân viên trong công ty.

Vấn đề doanh nghiệp gặp phải là từ những dữ liệu trên `google sheet`, họ không thể thống kê các con số từ những dữ liệu đó. Họ mong muốn có một giải pháp có thể tập trung hóa dữ liệu tại một chỗ cũng như thống kê được từ những dữ liệu đó.

Ví dụ như không thể thống kê được bao nhiêu KH đã mua hàng từ bên doanh nghiệp, số lượng KH tập trung chủ yếu ở miền Nam hay miền Bắc hay là tìm kiếm dữ liệu 1 khách hàng nhanh chóng từ 1 mớ các `google sheet`.

Từ vấn đề người dùng gặp phải với lưu dữ liệu trên `google sheet` và cách mình xử lí đống dữ liệu đó. Hôm nay mình xin phép viết bài chia sẻ cách mình đã biến các dữ liệu khách hàng từ excel thành một hệ thống `Customer Relationship Management`  nho nhỏ.
    ![](https://images.viblo.asia/5fecae6d-b8e9-4903-bacc-118d27bb4e83.png)


# 1. CRM là gì ?

> CRM(Customer Relationship Management ) là một phần mềm quản lý quan hệ khách hàng, một chiến lược kinh doanh mà doanh nghiệp sử dụng để giảm chi phí và tăng lợi nhuận bằng cách củng cố sự hài lòng của khách hàng, lòng trung thành. 

Sự thật là CRM tập hợp thông tin từ tất cả các nguồn dữ liệu trong một tổ chức (và có khi thích hợp từ bên ngoài tổ chức) để cung cấp cho các nhà quản trị (CEO) một cái nhìn mới mẻ và định hướng mới dựa trên các dữ liệu phân tích.

Điều này cho phép khách hàng phải đối mặt với nhân viên trong các lĩnh vực như bán hàng, hỗ trợ khách hàng và tiếp thị để đưa ra quyết định nhanh chóng và được thông báo về tất cả mọi thứ từ mô hình "Cross-selling and upselling" cơ hội để nhắm mục tiêu chiến lược tiếp thị mục đích tạo chiến thuật định vị cạnh tranh.


Một số các lợi điểm của CRM với doanh nghiệp mà dễ dàng nhận thấy là 

* Quản lý và sở hữu toàn bộ thông tin, dữ liệu làm việc với khách hàng
* Giữ kết nối với tất cả khách hàng của bạn
* Quản lý đội ngũ bán hàng hiệu quả, hỗ trợ nhân viên bán hàng tốt hơn
* Báo cáo đầy đủ, chính xác, cập nhật tức thì trên hệ thống
* Tổ chức các chiến dịch chăm sóc và marketing hiệu quả
* Làm được nhiều việc hơn trong thời gian ngắn hơn

# 2. Xử lí dữ liệu từ google sheet
Xuất phát từ những nhược điểm từ `google sheet` mà @bunny.pi.green đã gặp phải khi lưu dữ liệu. Mình đã nghĩ ra ý tưởng xây dựng CRM nhanh chóng như sau.

1. Việc thêm, xóa, sửa dữ liệu KH các file `google sheet` sẽ được giữ nguyên. Tức là mỗi bạn nhân viên trong công ty vẫn sẽ quản lí một file `google sheet` và thêm, xóa, sửa, trên file đó.
2. Tiến hành động bộ tất cả dữ liệu từ `google sheet` về 1 hệ cơ sơ dữ liệu. Ở đây để đơn giản nhất mình chọn `mysql`.
3.  Đồng bộ bằng cách nào ? Mình sử dụng Laravel tạo ra 1 `cron job` đồng bộ dữ liệu vào cuối ngày về `mysql`. Từ đây xây dựng màn hình thống kê dựa trên dữ liệu đã đồng bộ về.
4. Với phát sinh ngay lập tức phải đồng bộ dữ liệu về `mysql` để phân tích thống kê thì sao ? Mình tạo thêm 1 nút bấm cho người dùng khi cần thiết có thể sử dụng để đồng bộ dữ liệu về chứ k cần chờ `cron job` vào cuối ngày.

## 2.1 Đặt cron job 
Cho những bạn chưa biết.

Cron job là chức năng dùng để thực thi định kì lệnh nào đó trong một khoảng thời gian được xác định trước bởi admin website nào đấy. Ví dụ như tự động thống kê đơn hàng có được trong ngày vào lúc 23h59.

Ở đây mình xây dựng một cron job đồng bộ dữ liệu sau một ngày nhân viên tìm kiếm dữ liệu khách hàng. Trong laravel, rất dễ dàng để tạo ra một cron job với cú pháp `php artisan make:command --ten_comand`. Chi tiết tìm hiểu thêm tại [Task Scheduling](https://laravel.com/docs/5.8/scheduling)
## 2.2 Lấy dữ liệu từ google sheet
Việc tiếp theo là phải connect tới `google api` để `fetch` toàn bộ dữ liệu `thô` từ `google sheet` xử lí thành dữ liệu `tinh` và lưu vào trong `mysql`.

Tại sao ở đây mình lại phân biệt giữa dữ liệu `thô` và `tinh` ? Hãy tưởng tượng vấn đề như sau.

Thông tin KH của bạn gồm: Tên, tuổi, địa chỉ, tình trạng, đang thuộc về nhân viên nào kiểm soát. Nếu chúng ta `fetch` được dữ liệu và lưu luôn dữ liệu `thô` vào DB thì trong `mysql` dữ liệu sẽ có cấu trúc như sau.



| Name | City | District | Contact |User | Status |
| -------- | -------- | -------- | -------- | -------- | -------- |
| Nguyễn Văn A     | Hà Nội     | Ba Vì     | 098xxxxxx     | Nhân viên kinh doanh A     | Tiềm năng     |
| Nguyễn Văn B    | Hà Nội     | Cầu Giấy     | 098xxxxxx     | Nhân viên kinh doanh A     | Tiếp cận     |
| Nguyễn Văn C     | Hà Nội     | Hà Đông | 098xxxxxx     | Nhân viên kinh doanh D    | Từ chối     |
| Nguyễn Văn D     | Hà Nội     | Ba Vì     | 098xxxxxx     | Nhân viên kinh doanh B     | Đang hợp tác     |
| Nguyễn Văn E     | Hà Nội     |Long Biên    | 098xxxxxx     | Nhân viên kinh doanh C     | Tiềm năng     |
| Nguyễn Văn F     | Hà Nội     | Nam Từ Liêm   | 098xxxxxx     | Nhân viên kinh doanh C     | Từ chối     |
| Nguyễn Văn G     | Hà Nội     | Ba Vì     | 098xxxxxx     | Nhân viên kinh doanh A     | Tiềm năng     |
| ...    | ...     | ...    | ...     | ...    | ...    |

Bây giờ là quản trị doanh nghiệp, tôi cần thống kê những KH đang ở tình trạng `tiềm năng` để đưa ra chiến lược kinh doanh hợp lí. Mình có 1 `select` chọn `Tiềm năng` rồi gửi request lên server. Với `mysql`, tôi có câu lệnh như sau. 
```
select * from `customers` where status = 'Tiềm năng';
```
Thật tiếc là câu lệnh này sẽ không lấy được dữ liệu do điều kiện `where` không support tiếng Việt. Có lẽ khả thi hơn trong trường hợp này là dùng where like nhưng mình đã không dùng mà thực hiện việc tách bảng.

![](https://images.viblo.asia/6d7e6311-c154-4626-910e-859478754f6e.png)

Như trên sơ đồ có vẻ các bạn đã thấy mình tách các bảng có quan hệ 1-n với nhau. Mục đích là sẽ lưu id của các trường như: `city`, `district`, `statuses` ... để khi truy vấn sẽ dễ dàng hơn.

Vậy làm sao để convert được các data dạng thô là các chữ tiếng Việt thành các id dạng số. Vâng chính vì vậy nên mình đã coi dữ liệu trên google sheet là dữ liệu thô và cần tiền xử lí trước khi insert vào `database mysql`.

Quay lại bài toán ban đầu, làm sao để lấy được dữ liệu từ `google sheet` để lưu vào `database`. Thật may, google có cung cấp cho chúng ta `Google Sheets API`. Với laravel thật dễ dàng để `fetch` dữ liệu về. Ở đây mình không hướng dẫn chi tiết cách `fetch` về vì đã có 1 bài rất chi tiết mọi người xem qua tại đây [Laravel và google sheet api](https://viblo.asia/p/laravel-va-google-sheet-api-07LKXmLpZV4)

## 2.3 Xử lí dữ liệu thô
Như mình nói ở phần trên, việc tiếp theo cuả chúng ta là xử lí dữ liệu thô thành dữ liệu tinh. 

```php
    public function handle()
    {
        Customer::truncate();
		$client = $this->getGoogleClient();
		$service = new Google_Service_Sheets($client);
        $listSheetId = config('common.google_sheet_id');
        $masterDataUser = User::where('role', 'staff')->get();
        $masterDataCity = City::all();
        $masterDataDist = District::all();
        $masterDataStatus = Status::all();
        foreach ($listSheetId as $spreadsheetId) {
            $range = 'A2:Q';
            $response = $service->spreadsheets_values->get($spreadsheetId, $range);
            $datacustomers = $response->getValues();
            foreach ($datacustomers as $key => $data) {
                if(!isset($data[0])) {
                    continue;
                }
                $custommer = [];
                $custommer['user_id'] = $this->findUserID($data[0], $masterDataUser);
                if(isset($data[2])) {
                    $custommer['city_id'] = $this->findCityID($data[2], $masterDataCity);
                } else {
                    $custommer['city_id'] = 0;
                }
                if(isset($data[3])) {
                    $custommer['district_id'] = $this->findDistrictID($data[3], $masterDataDist);
                } else {
                    $custommer['district_id'] = 0;
                }
                if(isset($data[8])) {
                    $custommer['status_id'] = $this->findStatusID($data[8], $masterDataStatus);
                } else {
                    $custommer['status_id'] = 0;
                }

                $totaldata[] = $custommer;
            }
            Customer::insert($totaldata);
        }
    }
```
Đây là logic mình xử lí việc convert dữ liệu thô thành tinh. Bạn có thể thấy có 4 hàm mình dùng: `findUserID`, `findCityID`, `findDistrictID`, `findStatusID`.

Ví dụ để xử lí dữ liệu thô `status` từ google sheet về có các trạng thái: `Tiềm năng`,  `Tiếp cận`, `Hủy bỏ`, `Đối tác`.
Mình tạo 1 master data trong bảng `statuses` lưu lần lượt các trường này.


| id| name |slug |
| -------- | -------- | -------- |
| 1     | Tiềm năng     | tiem-nang     |
| 2     | Tiếp cận     | tiep-can     |
| 3     | Hủy bỏ     | huy-bo     |
| 4     | Đối tác     | doi-tac     |

```php
    private function findStatusID($status, $masterDataStatus)
    {
        foreach ($masterDataStatus as $masterStatus) {
            if(Str::slug($status) == $masterStatus->slug) {
                return $masterStatus->id;
            }
        }

        return 0;
    }
```

Với tham số status là trạng thái của khách hàng lấy được từ `google sheet`. Mình so sánh `status` sau khi đã được [`slug()`](https://laravel.com/docs/5.8/helpers#method-str-slug) với lần lượt cách trạng thái trong `database` đã được lấy sẵn từ hàm `handle`.
Nếu trùng sẽ lấy ra id của status đó.

Với tư tưởng tương tự, mình lần lượt lấy ra được id của `city`, `district`, `user` và coi nó là dữ liệu tinh được `push` vào một mảng. Sau đó `insert` vào `database`. 
Vậy là hoàn thành việc lấy dữ liệu và lưu chúng vào mysql để dễ dàng cho việc thống kê. Việc cuối cùng là setup `cron job` cuối ngày fetch thông tin từ `google sheet` về để tiện trong quá trình thống kê theo ngày từ class `app/Console/Kernel.php`
```php
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('FetchDataGoogleSheet')->dailyAt('23:00');
    }
```


Sau khi có dữ liệu rồi, chúng ta có thể dễ dàng thống kê, phân tích dựa trên số liệu đã có hay dễ dàng tìm kiếm hơn nhờ sự trợ giúp của các câu lệnh `mysql`. Đưa ra những con số `biết nói` cho doanh nghiệp dễ dàng triển khai các chương trình khuyến mại phù với tập khách hàng.

# 3. Ưu nhược điểm
 
## 3.1 Ưu điểm
* Phù hợp với doanh nghiệp đang sử dụng `google sheet`  :D
* Tiết kiệm chi phí cho doanh nghiệp: Chắc chắn rồi, chỉ cần bỏ ra một số tiền rất nhỏ đã có thể sở hữu những con số biết nói.
* Tiết kiệm thời gian triển khai. Gần như toàn bộ phần thêm, xóa, sửa dữ liệu mình phó mặc cho `google sheet` xử lí. Tận dụng tối đa UI/UX dễ dùng của `google sheet` để nhân viên thao tác nhanh hơn.

## 3.2 Nhược điểm
* Thời gian fetch dữ liệu rất lâu: Ở đây mình phải xử lí trên 100 file `google sheet`. Việc connect đến từng file rồi lấy dữ liệu về khá tốn thời gian. Thêm nữa mỗi lần chạy cron job mình phải `truncate()` bảng để tránh `duplicate()` dữ liệu nên mỗi lần `insert` cả chục nghìn dữ liệu tốn khá nhiều thời gian.
* Dữ liệu chưa được validate chặt chẽ: Vì thao tác thêm xóa sửa trên google sheet nên khả năng `validate` dữ liệu cũng bị hạn chế nhiều
* Cấu trúc hàng cột trên `google sheet` phải chuẩn để có thể lấy ra thật chuẩn xác khi fetch về.
# 4. Tổng kết
Như vậy là mình vừa giới thiệu cho các bạn cách mình đã triển khai việc xây dựng một CRM nho nhỏ từ dữ liệu `google sheet`. Ở đây mình nói nhiều về cách triển khai hơn là từng bước làm để phù hợp với hoàn cảnh bài viết.

Thực ra đây chỉ là cách làm ăn xổi so với việc xây dựng 1 CRM nhưng cũng có thể đáp ứng mong muốn của người dùng. Họ mong muốn có những có số thống kê trong thời gian ngắn nhất và mình đáp ứng nhu cầu của họ.

Cảm ơn các bạn đã theo dõi bài viết, nếu có bất kì ý tưởng gì thêm cho việc xây dựng hay tối ưu cho hệ thống `CRM` thì có thể để lại bình luận phía dưới.

**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**

Lời kết: 

>**Chúng tôi - những người lập trình viên sinh ra để giải quyết những vấn đề của xã hội. Không phải là những công nhân code**.