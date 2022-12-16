Chào ae Viblo, để chạy bất cứ ứng dụng web nào trong môi trường Docker, chúng ta đều cần phải tạo Docker Image. Trong bài viết này, mình sẽ chia sẻ về cách đóng gói Rust application thành Docker image mà mình đã áp dụng. Hãy cùng tham khảo cách mình thực hiện nhé.

## Tổng quan

Mình sẽ thực hiện build Docker image cho ứng dụng web được viết bằng Rust. Quá trình đóng gói được mình chia làm 2 giai đoạn:
- Build: Quá trình compiile Rust app thành file binary.
- Final: Tạo web-server để chạy Rust app

Cấu trúc các file Dockerfile sẽ được bố trí như sau:

```bash
├── dockerfiles
│   ├── web-server
│   │   └── Dockerfile
│   └── rust-app
│       └── Dockerfile
```

## Build rust app

### Setup rust.Dockerfile

Về cơ bản, để build rust app, chúng ta sẽ thường chạy lệnh `cargo build`, rust sẽ tự động cài dependencies rồi sau đó compile application thành file binary. Dockerfile của chúng ta sẽ có dạng như sau:
```bash:./dockerfiles/rust-app/Dockerfile
FROM rust:1.61-buster

WORKDIR /app

COPY . ./
RUN cargo build --release
```

Với image trên, trong container sẽ có các file binary được build ra thư mục `/app/target/release`. Tuy nhiên, sau khi build xong image lần 1, bạn tiếp tục lặp lại lần 2. Quá trình build image lần 2 lại chạy lại từ đầu, mỗi lần build cũng sẽ mất khoảng cả chục phút. Trường hợp bạn muốn hotfix ứng dụng thì deploy sao kịp =)).

### Optimize rust.Dockerfile

Quá trình build với image trên luôn lâu bởi chúng ta đang không tận dụng được Docker Layer Caching của Docker. Dòng `COPY . .` với context là copy mọi thứ, và lệnh `cargo build` sẽ luôn phải chạy lại. Chúng ta sẽ có một xử lý nhỏ để tách lệnh `COPY` và `RUN cargo build` thành những lệnh nhỏ hơn giúp tạo ra các layer cache.

```
FROM rust:1.61-buster

WORKDIR /app

# Chỉ copy 2 files này để cài dependencies trước:
COPY Cargo.lock Cargo.toml ./

# Chỉ cài download dependencies:
RUN cargo fetch

# Mẹo: tạo file main.rs trống rồi chạy cargo build để chỉ compile dependencies:
# Do app chúng mình ở trong folder src nên phải tạo một thư mục src trống trước để có thể tạo file main.rs:
RUN mkdir src && echo 'fn main() {}' > src/main.rs
RUN cargo build --release

# Giờ mình xóa cái thư mục src mình vừa tạo ở trên:
RUN rm -rf src

# Giờ copy source code thực sự và build app,
# Lúc này thì do dependencies đã được compile ở bước trên, nên rust chỉ cần compile mỗi app của bạn.
# Điều này sẽ giúp giảm thời gian build docker image khi các layer bên trên đều được cache.
COPY . .
RUN cargo build --release
```

Tựu chung lại là có một vài điểm cải tiến của mình giúp áp dụng Docker Layer Caching:
- Copy riêng hai file `Cargo.lock` và `Cargo.toml` rồi dùng `cargo fetch` để chỉ download dependencies -> sẽ áp dụng được layer cache
- Tạo file `main.rs` trống để chỉ compile dependencies, lúc này chỉ compile dependencies, context vẫn chưa thay đổi nên sẽ có layer cache (khi build, rust sẽ compile source code của dependencies rồi mới compile source code app của bạn).
- Sau khi compile dependecies trước rồi, thì mình mới copy source code thực sự và compile app. 

**Kết quả:**
```
Step 1/10 : FROM rust:1.61-buster
 ---> a83ae50442bf
Step 2/10 : WORKDIR /app
 ---> Using cache
 ---> 8867d53e23ae
Step 3/10 : COPY Cargo.lock Cargo.toml ./
 ---> Using cache
 ---> a259a78bd700
Step 4/10 : RUN cargo fetch
 ---> Using cache
 ---> 31ba0a2ace17
Step 5/10 : RUN mkdir src && echo 'fn main() {}' > src/main.rs
 ---> Using cache
 ---> a4afaa18fc0c
Step 6/10 : RUN cargo build --release
 ---> Using cache
 ---> ee3db41a9100
Step 7/10 : RUN rm -rf src
 ---> Using cache
 ---> 1efc0e3a0c1d
Step 8/10 : COPY . ./
 ---> d0ad9b1356c1
Step 9/10 : RUN cargo build --release
 ---> Running in cad6297a53ec
     Compiling hello-world v0.1.0 (/app)
```

Bạn thấy đó, logic trong Dockerfile thì vẫn như vậy nhưng chỉ một vài thay đổi nhỏ chúng ta đã cache được 7/10 step để tạo ra sự khác biệt rồi :D

## Build web-server

```
# rust app
ARG REGISTRY_PATH=viblo.asia/docker-rust-helloworld
ARG TAG=latest

FROM ${REGISTRY_PATH}/rust-app:${TAG} as rust-app

# final stage
FROM debian:buster as web-server

# libpq-dev: is required for diesel-rs with postgres
RUN apt update && apt install curl tzdata libpq-dev -y

# Tạo user thường mới chứ không chạy với root nhé ae
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid 10001 \
    deployer

# switch sang dùng user vừa tạo thay vì root
USER deployer:deployer

WORKDIR /srv

ENV TZ=Asia/Ho_Chi_Minh \
    RUST_LOG=info \
    APP_HOST=0.0.0.0 \
    APP_PORT=8080 \
    APP_WORKERS=4

# Copy lại file binary ở image rust-app,
# Set lại owner cũng như file permissions:
COPY --from=rust-app --chown=deployer:deployer /app/target/release/helloworld ./
RUN chmod 550 helloworld

EXPOSE 8080

ENTRYPOINT [ "/srv/helloworld" ]
```

Một số điểm lưu ý trong phần này:
- Sử dụng multi-stage với image rust-app được build ở phần trước, giúp bạn build lại riêng image web-server một cách nhanh chóng mà không cần phải build rust-app
- Luôn tạo user mới không có quyền root để sử dụng, và thực thi file binary của bạn với user đó thay vì root

## Tổng kết

Trên đây là phần chia sẻ của mình về cách tạo Docker image cho rust app. Cũng như một tip, lưu ý mình note lại trong quá trình build image. Hy vọng sẽ hữu ích với mọi người! Hãy upvote và share bài viết tới bạn bè của bạn nhé.

Comment xuống dưới về topic bạn muốn mình viết thêm hoặc bổ sung thêm nội dung cho bài viết này đầy đủ hơn. 

☕️☕️ Nếu thấy bài viết này hay và bổ ích, hãy mời mình một tách cà phê nha: https://kimyvgy.webee.asia