# Introduction
Trong phần này, mình sẽ không đi vào chi tiết cài đặt Laravel excel nữa. Tuy nhiên ở đây mình xin lưu ý là mình sử  dụng Laravel excel version 2.1.0. Ở đây mình không dùng 3.0 vì mình thấy 3.0 chưa được support nhiều. Nếu m.n dùng 3.0 thì đừng quan tâm bài viết của mình làm gì, vì cú pháp nó khác nhau đấy, lỗi ngay.
# Import
## 1. Cách thường dùng khi import file
```
Excel::load('file.xls', function($reader) {
    // reader methods
});
```
## 2. Import 1 sheet bất kỳ của file
Sử dụng `selectSheetsByIndex($index)` với index là chỉ số sheet bạn muốn import
```
Excel::selectSheetsByIndex($sheetIndex)->load($path, function ($reader) {
       // reader methods
 })->get();
```
## 3. Import 1 file có dữ liệu quá lớn
Sử dụng filter('chunk') để import.
`chunk($size, $callback, $shouldQueue)`
- `$size` : số lượng row bạn muốn đọc được trong mỗi lần chunk
- `$callback` : closure xử lý kết quả của chunk
- `$shouldQueue` : thường thì tham số này không có, vì nó đã được config mặc định là true rồi (Laravel excel sẽ tự động queue mọi chunk). Để disable nó thì tham số thứ 3: `$shouldQueue = false`
Ví dụ:
```
Excel::filter('chunk')->load($path)->chunk(1000, function ($result) {
    // result process
}, false);
```
## 4. Một số support khi import file
* Đầu tiên,bạn muốn file được bắt đầu đọc từ hàng nào, điều này được cấu hình trong file config excel bởi startRow. Bạn có thể thay đổi giá trị của nó bằng cách
`config(['excel.import.startRow' => $startRow]);`
> Lưu ý nếu bạn làm như này thì mặc định heading sẽ là cột `startRow` bạn mới thay đổi này. 
> Nếu dùng `filter('chunk')` mà thay đổi heading như này sẽ rất nguy hiểm, dễ bị bỏ qua dữ liệu đầu lắm. Nên hạn chế đừng thay đổi `startRow` khi dùng `filter('chunk')`
* Bạn nên giới hạn số cột import nếu muốn
`$reader->limitColumns(finishColumn, startColumn);`
* Khi import mà có cột với định dạng ngày tháng bạn nên sử dụng
`$reader->formatDates(true);`
> 
> Nếu dùng `filter('chunk')` thì giá trị đọc được của ngày tháng sẽ là một chuỗi số strtotime, để convert giá trị này thành giá trị chuẩn từ file bạn có thể thực hiện như sau
```
$unixDate = ($items[$dateColumnHeading] - 25569) * 86400;
$dateColumn = date($formatDate, $unixDate); //ví dụ ở đây formatDate của mình là 'Y/m/d'
```
* Default của file excel thì giá trị `'heading' => 'slugged' ` như vậy ASCII sẽ được set là true. Nếu mà dùng ngôn ngữ khác không nằm trong ASCII thì cứ gọi là xác định đi. Để tránh điều naỳ chúng ta nên chuyển giá trị của `heading` thành `original`
* Khi import file có nhiều dòng trống không có giá trị mà vẫn được đọc điều này hơi dở rồi. Để giải quyết nó ta cần set lại giá trị của 'ignoreEmpty' trong phần config của file excel `'ignoreEmpty' => true`
# Export
## 1. Simple Excel Export
```
Excel::create('Filename', function($excel) {
    // Call writer methods here
});
```
**Export to Excel5 (xls)**
```
Excel::create('Filename', function($excel) {
})->export('xls');
// or
->download('xls');
```
**Export to Excel2007 (xlsx)**
```
->export('xlsx');
// or
->download('xlsx');
```
**Export to CSV**
```
->export('csv');
// or
->download('csv');
```
## 2. Export file và tạo sheet 
```
Excel::create('Filename', function($excel) {
    // Our first sheet
    $excel->sheet('First sheet', function($sheet) {
    });
    // Our second sheet
    $excel->sheet('Second sheet', function($sheet) {
    });
})->export('xls');
```
Nếu muốn sheet có chứa dữ liệu thì hãy sử dụng
`->fromArray($source, $nullValue, $startCell, $strictNullComparison, $headingGeneration)` bên trong sheet closure
```
Excel::create('Filename', function($excel) {
    $excel->sheet('Sheetname', function($sheet) {
        $sheet->fromArray(array(
            array('data1', 'data2'),
            array('data3', 'data4')
        ));
    });
})->export('xls');
```
## 3. Style sheet
Style sheet được đặt trong sheet closure
* Style font cơ bản:
```
$sheet->setStyle([
        'family' => 'Calibri',
        'size' => '11',
        'bold' => false,
        'text-align' => 'center',
 ]);
```
* Set độ rộng cho từng column
```
$sheet->setWidth(array(
    'A'     =>  5,
    'B'     =>  10
));
```
* Set giá trị cho một cell bất kỳ
```
$sheet->setCellValue('B1', 'some value');
//or
$sheet->cell('B1', function($cell) {
    $cell->setValue('some value');
});
```
* Thao tác với cell
```
$sheet->cell('A1', function($cell) {
    // manipulate the cell
    $cell->setValue('data1');
});
$sheet->cells('A1:A5', function($cells) {
    // manipulate the range of cells
    $cells->setBackground('#006fc0');
    $cells->setAlignment('center');
    $cells->setFontColor('#ffffff');
});
```
* Để thể hiện một cột dữ liêụ có định dạng nhất định bạn có thể sử dụng `->setColumnFormat($array)`
```
// Format column as percentage
$sheet->setColumnFormat(array(
    'C' => '0%'
));
// Format a range with e.g. leading zeros
$sheet->setColumnFormat(array(
    'A2:K2' => '0000'
));
// Set multiple column formats
$sheet->setColumnFormat(array(
    'B' => '0',
    'D' => '0.00',
    'F' => '@',
    'F' => 'yyyy-mm-dd',
));
```
* Để tạo một cell có định dạng dropdown bạn có thể xem qua ví dụ sau
```
$cellValidation = $sheet->getCell($cell)->getDataValidation();
$cellValidation->setType(\PHPExcel_Cell_DataValidation::TYPE_LIST);
$cellValidation->setAllowBlank(false);
$cellValidation->setShowErrorMessage(true);
$cellValidation->setShowDropDown(true);
$cellValidation->setErrorTitle('Input error');
$cellValidation->setError('Value is not in list.');
$cellValidation->setFormula1('Mr,Ms');
```
# Tài liệu tham khảo
https://laravel-excel.maatwebsite.nl/docs/2.1/getting-started/requirements
https://github.com/Maatwebsite/Laravel-Excel