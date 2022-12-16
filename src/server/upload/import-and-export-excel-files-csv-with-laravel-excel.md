In this article, I will give a brief overview of the Laravel-Excel package . Perhaps there is no need to explain much about its purpose, the title says everything. Basically, Laravel Excel has the power of PHPExcel , it includes features like: importing Excel, CSV to collection, exporting models, array's or views to Excel, importing multiple files, etc.

![](https://images.viblo.asia/45e8831b-0ce0-42aa-8322-e0217270213a.jpg)

# Some outstanding features of Laravel Excel

* Import excel file, csv into Laravel Collections
* Export Blade views to Excel and CSV with CSS styling
* Import multiple files
* Support caching
* Support chunk and queues importer
* Fix Excel file, csv
* Many optional configuration settings in the config file
* And many other features

# Use Laravel Excel
## 1 - Installation

* Install with composer

```
composer require maatwebsite/excel
```

* After installation is complete, open the file config / app.php and add the following code.

```
'providers' => [
	....
	Maatwebsite\Excel\ExcelServiceProvider::class,
],

'aliases' => [
	....
	'Excel' => Maatwebsite\Excel\Facades\Excel::class,
],
```
* Public configuration settings:
```
php artisan vendor:publish
```
The above settings will add excel.php file to the config message.


## 2 - Import

Laravel Excel can import multiple files, xls, xlsx, CSV files, worksheets into Laravel collections.

* Importing a file
```
Excel::load('file.xls', function($reader) {
    // reader methods
});
```

* Import a folder
```
Excel::batch('folder', function($rows, $file) {

    // Explain the reader how it should interpret each row,
    // for every file inside the batch
    $rows->each(function($row) {

        // Example: dump the firstname
        dd($row->firstname);

    });

});
```

* Import multiple files
```
$files = [
    'file1.xls',
    'file2.xls'
];

Excel::batch($files, function($rows, $file) {

});
```

* Edit File Contents
```
Excel::load('file.csv', function($file) {
    // modify

})->export('csv');
```

* Convert file
```
Excel::load('file.csv', function($file) {
    // modify stuff

})->convert('xls');
```

## 3 - Export

Laravel Excel can create Excel or CSV files from Eloquent models and PHP array.
* Export to Excel5 (xls)

```
Excel::create('Filename', function($excel) {

})->export('xls');

// or
->download('xls');
```

* Export to Excel2007 (xlsx)
```
->export('xlsx');

// or
->download('xlsx');
```

* Export to CSV
```
->export('csv');

// or
->download('csv');
```

* Store on server
```
Excel::create('fileName', function($excel) {

    // Set sheets

})->store('xls');
```

* Creating a sheet
```
Excel::create('Filename', function($excel) {

    $excel->sheet('Sheetname', function($sheet) {

        // Sheet manipulation

    });

})->export('xls');
```

## 4 - @Blade to Excel
You can use Laravel's Blade to export the excel file, share a view, load a view to the sheet or create an html table inside the view.

* Load a view to a sheet you use -> loadView ().
```
Excel::create('New file', function($excel) {

    $excel->sheet('New sheet', function($sheet) {

        $sheet->loadView('folder.view');

    });

});
```

* Use different views for different sheets
```
Excel::create('New file', function($excel) {

    $excel->sheet('First sheet', function($sheet) {

        $sheet->loadView('view_first');
    });

    $excel->sheet('Second sheet', function($sheet) {

        $sheet->loadView('view_second');
    });

});
```

* Share the view for all sheets

```
Excel::shareView('folder.view')->create();
```

* Transmission into view

```
$sheet->loadView('view', ['key' => 'value']);
```

or

```
// Using normal with()
$sheet->loadView('view')
    ->with('key', 'value');

// using dynamic with()
$sheet->loadView('view')
    ->withKey('value');
```

Here are some basic features of Larave Excel. Hopefully this article will help you get to know a part about Laravel Excel.

Refer:
* http://www.maatwebsite.nl/laravel-excel/docs