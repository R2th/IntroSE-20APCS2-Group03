Sau đây là một số mẫu Github action cơ bản mà các bạn có thể sử dụng để tạo một flow hoàn chỉnh, phụ thuộc vào yêu cầu của từng dự án khác nhau.

Ở đây mình chỉ liệt kê một số mẫu cơ bản có những trường hợp các bạn có thể áp cho dự án của mình. các bạn có thể xem thêm ở [đây](https://docs.github.com/en/actions/guides/building-and-testing-nodejs), chọn ngôn ngữ của dự án và xem các mẫu có sẵn để có thể build một workflow trong nháy mắt.

* Cơ bản nhất là echo ra câu "Hello, world" thần thánh

```
jobs:
  # workflow này chứa một job tên là "build"
  build:
    # khai báo runner sẽ được chạy
    runs-on: ubuntu-latest

    # Các bước thể hiện một chuỗi các nhiệm vụ sẽ được thực hiện như một phần của công việc
    steps:
      # Kiểm tra kho lưu trữ của bạn dưới $ GITHUB_WORKSPACE, để công việc của bạn có thể truy cập nó
      - uses: actions/checkout@v2

      # Chạy một lệnh đơn bằng cách sử dụng trình bao của người chạy
      - name: Run a one-line script
        run: echo Hello, world!
```

* build một ứng dụng Nodejs  và push lên Azure Web App

```
env:
   # Khai báo một số biến để sử dụng
  AZURE_WEBAPP_NAME: your-app-name    # tên ứng dụng
  AZURE_WEBAPP_PACKAGE_PATH: '.'      # đường dẫn đến ứng dụng
  NODE_VERSION: '10.x'                # version sử dụng

jobs:
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ env.NODE_VERSION }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ env.NODE_VERSION }}
    - name: npm install, build, and test
      run: |
        # Build and test ứng dụng
        # deploy lên Azure Web App.
        npm install
        npm run build --if-present
        npm run test --if-present
    - name: 'Deploy to Azure WebApp'
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
```

* build and push một container image lên Amazon ECR
```
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment: production

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-2

    - name: Login to Amazon ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1

    - name: Build, tag, and push image to Amazon ECR
      id: build-image
      env:
        ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
        ECR_REPOSITORY: my-ecr-repo
        IMAGE_TAG: ${{ github.sha }}
      run: |
        # Build một docker container
        # đẩy nó lên ECR để nó có thể được triển khai tới ECS.
        docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
        docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
        echo "::set-output name=image::$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG"
    - name: Fill in the new image ID in the Amazon ECS task definition
      id: task-def
      uses: aws-actions/amazon-ecs-render-task-definition@v1
      with:
        task-definition: task-definition.json
        container-name: sample-app
        image: ${{ steps.build-image.outputs.image }}

    - name: Deploy Amazon ECS task definition
      uses: aws-actions/amazon-ecs-deploy-task-definition@v1
      with:
        task-definition: ${{ steps.task-def.outputs.task-definition }}
        service: sample-app-service
        cluster: default
        wait-for-service-stability: true
```

* tải một Ruby version, cài đặt cái gói phụ thuộc và run tests với Rake

```
jobs:
  test:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        ruby-version: ['2.6', '2.7', '3.0']

    steps:
    - uses: actions/checkout@v2
    - name: Set up Ruby
    # Để tự động nhận các bản sửa lỗi và các phiên bản Ruby mới cho ruby/setup-ruby,
    # thay đổi thành (see https://github.com/ruby/setup-ruby#versioning):
    # sử dụng: ruby/setup-ruby@v1
      uses: ruby/setup-ruby@473e4d8fe5dd94ee328fdfca9f8c9c7afc9dae5e
      with:
        ruby-version: ${{ matrix.ruby-version }}
        bundler-cache: true # runs 'bundle install' and caches installed gems automatically
    - name: Run tests
      run: bundle exec rake
```

* Building and testing .NET

```
jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        dotnet-version: ['3.0', '3.1.x', '5.0.x' ]

    steps:
      - uses: actions/checkout@v2
      - name: Setup .NET Core SDK ${{ matrix.dotnet-version }}
        uses: actions/setup-dotnet@v1.7.2
        with:
          dotnet-version: ${{ matrix.dotnet-version }}
      - name: Install dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --configuration Release --no-restore
      - name: Test
        run: dotnet test --no-restore --verbosity normal
```

* Building and testing Python

```
jobs:
  build:

    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [2.7, 3.5, 3.6, 3.7, 3.8]

    steps:
      - uses: actions/checkout@v2
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v2
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install flake8 pytest
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Lint with flake8
        run: |
          # dừng quá trình build nếu có lỗi cú pháp Python hoặc tên không xác định
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          # exit-zero coi tất cả các lỗi là cảnh báo. Trình chỉnh sửa GitHub rộng 127 ký tự
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
      - name: Test with pytest
        run: |
          pytest
```

nguồn than khảo: https://github.com/khanhvu94/my-app/actions/new