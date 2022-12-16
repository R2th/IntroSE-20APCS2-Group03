## Giới thiệu
Hôm nay mình sẽ giới thiệu cho các bạn 1 cách tăng tốc độ chạy test bằng cách sử dụng gem parallel_tests.
"Rails: 2 CPUs = 2x Testing Speed for RSpec, Test::Unit and Cucumber" là câu giới thiệu trên github của parallel_tests , và đúng như vậy, CPUs các bạn càng nhiều thì test chạy càng nhanh.

## Cài đặt
### Gemfile:
```
gem 'parallel_tests', group: [:development, :test]
```
### Add to config/database.yml
ParallelTests uses 1 database per test-process.


| Process number | 1 | 2 | 3 |
| -------- | -------- | -------- | -------- |
| ENV['TEST_ENV_NUMBER'] | "" | "2" | "3" |
```
test:
  database: yourproject_test<%= ENV['TEST_ENV_NUMBER'] %>
```
### Tạo cơ sở dữ liệu test
```
rake parallel:create
```
### Copy development schema (lặp lại sau mỗi lần migrations)
```
rake parallel:prepare
```
### Thiết lập môi trường từ scratch (Tạo db và loads schema, hữu ích cho CI)
```
rake parallel:setup
```
### Run!
```
rake parallel:test          # Test::Unit
rake parallel:spec          # RSpec
rake parallel:features      # Cucumber
rake parallel:features-spinach       # Spinach

rake parallel:test[1] --> force 1 CPU --> 86 seconds
rake parallel:test    --> got 2 CPUs? --> 47 seconds
rake parallel:test    --> got 4 CPUs? --> 26 seconds
```

Trên đây mình đã hướng dẫn sơ qua về gem parallel_tests, chi tiết các bạn có thể tìm hiểu thêm trên github của nó https://github.com/grosser/parallel_tests