Dự án càng ngày càng phát triển và dĩ nhiên UnitTests cũng sẽ phình to theo. Hôm nay mình sẽ giới thiệu các bạn gem parallel_tests để phân luồng test rspec trên ứng dụng Rails.
# Setup for Rails
## Installation
Thêm gem vào gemfile
```
gem 'parallel_tests', group: [:development, :test]
```
```
bundle install
```
## Config
```
# config/database.yml
test:
  database: yourproject_test<%= ENV['TEST_ENV_NUMBER'] %>
```
ParallelTests sử dụng 1 database để tạo 1 test process

| Process number | 1 | 2 | 3 |
| -------- | -------- | -------- | -------- |
| ENV['TEST_ENV_NUMBER']     | '' | '2' | '3' |

Notice: Số process có thể sử dụng dựa trên số core trên CPU của bạn. Ví dụ CPU 2 core thì cần 2x2core  = **4 processes**

Tạo database:
```
rake parallel:create
```

Copy schema:
```
rake parallel:prepare
```

Migrate cho các database test:
```
rake parallel:migrate
```

Thiết lập môi trường from scratch phù hợp với CI:
```
rake parallel:setup
```

Drop tất cả database test:
```
rake parallel:drop
```

# Using
## Run
Các lệnh chạy:
```
rake parallel:test          # Test::Unit
rake parallel:spec          # RSpec
rake parallel:features      # Cucumber
rake parallel:features-spinach       # Spinach

rake parallel:test[1] --> force 1 CPU --> 86 seconds
rake parallel:test    --> got 2 CPUs? --> 47 seconds
rake parallel:test    --> got 4 CPUs? --> 26 seconds
```

Ngoài ra có thể sử dụng regex nếu có subfolder
```
rake parallel:test[^test/unit] # every test file in test/unit folder
rake parallel:test[user]  # run users_controller + user_helper + user tests
rake parallel:test['user|product']  # run user and product related tests
rake parallel:spec['spec\/(?!features)'] # run RSpec tests except the tests in spec/features
```

Sample output:
```
2 processes for 210 specs, ~ 105 specs per process
... test output ...

843 examples, 0 failures, 1 pending

Took 29.925333 seconds
```

Run task với parallel:
```
RAILS_ENV=test parallel_test -e "rake my:custom:task"
# or
rake parallel:rake[my:custom:task]
# limited parallelism
rake parallel:rake[my:custom:task,2]
```

## Even test group run-times
Các nhóm test thường không cân bằng và sẽ chạy trong những khoảng thời gian khác nhau, khiến mọi thứ phải chờ nhóm chậm nhất. Sử dụng các trình ghi nhật ký (loggers) để ghi lại thời gian chạy thử nghiệm và sau đó sử dụng thời gian chạy đã ghi để cân bằng các nhóm thử nghiệm đồng đều hơn.

Thêm vào .rspec_parallel (hoặc .rspec) :
```
--format progress
--format ParallelTests::RSpec::RuntimeLogger --out tmp/parallel_runtime_rspec.log
```

# Loggers
Log lại các output mà không có các process khác nhau ghi đè lên nhau.
Thêm vào .rspec_parallel (hoặc .rspec) :
```
--format progress
--format ParallelTests::RSpec::SummaryLogger --out tmp/spec_summary.log
```

Ref: https://github.com/grosser/parallel_tests