Parsing aguments từ command line  dễ ẹc.

```
#!/urs/bin/env python 3

from argparse import ArgumentParser

def runner(testsuite):
    print ('OK OK! Minh Se Chay Test Suite {} Cho Ban'.format(testsuite))

def main():
    argparser = ArgumentParser('test_manager.py -ts test_suite')
    argparser.add_argument('-ts', '--test_suite', default=None, help='Ban nho nhap ten test_suite ')
    args = argparser.parse_args()
    test_suite_name = args.test_suite
    runner(test_suite_name)

if __name__ == "__main__":
    main()
```

Sau khi chạy command line, output:
```
>test_manager.py -ts "SANITY_SUITE"
OK OK! Minh Se Chay Test Suite SANITY_SUITE Cho Ban

>test_manager.py -ts "REGRESSION_SUITE"
OK OK! Minh Se Chay Test Suite REGRESSION_SUITE Cho Ban
```

Chạy sai thì nó nhắc lệnh, khỏi lo:
```
>test_manager.py -abc
usage: test_manager.py -ts test_suite [-h] [-ts TEST_SUITE]
test_manager.py -ts test_suite: error: unrecognized arguments: -abc

>test_manager.py -h
usage: test_manager.py -ts test_suite [-h] [-ts TEST_SUITE]

optional arguments:
  -h, --help            show this help message and exit
  -ts TEST_SUITE, --test_suite TEST_SUITE
                        Ban nho nhap ten test_suite
```


Chúc các bạn thành công !