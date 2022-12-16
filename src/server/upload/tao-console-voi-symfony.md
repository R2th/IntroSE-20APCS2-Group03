# Giới thiệu
Tương tự như command artisan Laravel trong Symfony chúng ta có thể tạo ra các command để thực hiện các nghiệp vụ mà chúng ta mong muốn, ví dụ như chúng ta cần update nhiều records hay export csv ... mà không cần đến request của client thay vào đó chúng ta sẽ run CLI (commant line).
Trong bài viết này mình sẽ tạo một command để thực hiện công ciệc như sau:
* Update tất cả các record trong bảng `categories` set cột `is_checked` = `true` có `create_date` là ngày hôm nay
* Thêm  argument `-f` để update hết  tất cả record của bảng `categories` set cột  `is_checked` = `true` 

# Nội dung
## Tạo command trong Symfony
Chúng ta sẽ tạo 1 file command  `src/Command/CheckCategoryCommand.php` như sau:
```
// src/Command/CheckCategoryCommand.php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckCategoryCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:check-category';

    protected function configure()
    {
        // ...
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // ... put here the code to create the user

        // this method must return an integer number with the "exit status code"
        // of the command. You can also use these constants to make code more readable

        // return this if there was no problem running the command
        // (it's equivalent to returning int(0))
        return Command::SUCCESS;

        // or return this if some error happened during the execution
        // (it's equivalent to returning int(1))
        // return Command::FAILURE;
    }
}
```
Trong file này  hiện tại chúng ta chỉ cần quan tâm đến 2 thứ đó là `$defaultName` và `execute()`:
1.  `$defaultName` : biến này có tác dụng khai báo tên của command, VD mình sẽ để là `app:check-category` thì khi chạy chúng ta chỉ cần gõ là `bin/console app:check-category`
2.  `execute()`: đây là nơi chúng ta sẽ viết code xử lý của command

## Thực hiện update bảng categories đơn giản
Với bài toán này chúng ta sẽ thực hiện update các record mà có `create_date` là hôm nay `is_checked` = true, trong hàm `execute()` chúng ta sẽ thực hiện như sau:
```
/**
     * Execute command.
     *
     * @param  InputInterface  $input
     * @param  OutputInterface  $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $numberOfUpdated = $this->normalCheck();
        $output->writeln("Number of category updated = $numberOfUpdated");
    }

    /**
     * Normal check category.
     *
     * @return int
     */
    private function normalCheck()
    {
        $queryStm = $this->entityManager->createQuery('UPDATE Entity\Category c SET c.is_checked = true WHERE c.create_date >= :start AND c.create_date <= :end');
        $queryStm->setParameters([
            'start' => Carbon::now()->startOfDay(),
            'end' => Carbon::now()->endOfDay()
        ]);

        return $queryStm->execute();
    }
```
Chúng ta tạo hàm `normalCheck()` để thực hiện update các `categories` `is_checked` có `create_date` là ngày hôm nay, chúng ta sẽ chạy thử bằng cách mở terminal và cd vào thư mục dự án rồi gõ:
`bin/console app:check-category`, kết qủa màn hình terminal sẽ hiển thị như sau:
```
Number of category updated = 12
```

## Thực hiện update bảng categories sử dụng argument
Để thực hiện thêm tham số cho command chúng ta sẽ override lại hàm `configure()` , bài toán của chúng ta là sẽ truyền vào tham số `-f` để update toàn bộ các categories đang có. Để trên vào tham số chúng ta sẽ sử dụng hàm `addOption()` như sau:
```
protected function configure()
    {
        $this->addOption('force', 'f', InputOption::VALUE_NONE);
    }
```

Có nghĩa là biến `force` sẽ là option được thêm vào câu lênh command như thế này `-f` hoặc `--force`. Để lấy được giá trị của biến `force` chúng ta sử dụng hàm `getOption()`:
```
$input->getOption('force');
```
Mình đã thêm vào hàm `forceCheck()` để thực hiện việc update tất cả các category như bên dưới. Code thực hiện cho trường hợp update tất cả và update theo ngày cho các category sẽ như sau:
```
/**
     * Execute command.
     *
     * @param  InputInterface  $input
     * @param  OutputInterface  $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $isForceUpdate = $input->getOption('force');
        $numberOfUpdated = $isForceUpdate ? $this->forceCheck() : $this->normalCheck();
        $output->writeln("Number of category updated = $numberOfUpdated");
    }
    
    /**
     * Force check category.
     *
     * @return int
     */
    private function forceCheck()
    {
        $queryStm = $this->entityManager->createQuery('UPDATE Entity\Category c SET c.is_checked = true');

        return $queryStm->execute();
    }
```
Bây giờ chúng ta sẽ thử chạy command này với tham số `-f` :
```
bin/console app:check-category -f
hoặc
bin/console app:check-category --force
```
Kết quả hiên thị trên màn hình sẽ như sau: 
```
Number of category updated = 5
```
# Tham khảo
* https://symfony.com/doc/current/console.html