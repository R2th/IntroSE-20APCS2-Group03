# Mở đầu
Hiện nay chúng ta có một vài cách để có thể deploy một ứng dụng lên trên máy chủ, chúng ta có để copy code trực tiếp lên server rồi cài các thành phần dependency khác để chạy code, hoặc có một cách được sử dụng phổ biến trong thời đại hiện nay đó là đóng gói code vào thành 1 container image rồi chạy nó trên server có hỗ trợ chạy container là được. Để đóng gói được image này thường ta sẽ sử dụng Docker và viết Dockerfile mô tả những gì ta cần cài, Runtime ta muốn code chạy trên, các dependencies,... Việc viết Dockfile này có thể sẽ khá nhàm chán đối với một số anh em dev hoặc có thể là lười học cách viết. Vậy hôm nay ở đây mình sẽ giới thiệu các bạn một công cụ khác thay thế cho Dockerfile này đó chính là **BUILDPACK**

![image.png](https://images.viblo.asia/89bdf094-9735-4a66-b56a-0df5ab5f85a7.png)
# Buildpack là gì?
BuildPack là công cụ giúp chúng ta đóng gói ứng dụng từ source code thành container Image, từ đó ứng dụng có thể chạy ở trên nhiều nền tảng khác nhau: VM, Cloud, K8s,.. chỉ cần có hỗ trợ chạy container.

![](https://images.viblo.asia/6fdfbf60-8e31-469e-92d7-81a36bdab5fa.png)

 
Công cụ này sẽ giúp chúng ta loại bỏ đi việc phải viết các file thủ tục như Dockerfile để build image cho từng ứng dụng một. Đối với các ứng dụng có cấu trúc như nhau và không phức tạp, buildpack có thể dễ dàng áp dụng cho tất cả.

# Các khái niệm trong BuildPack
Chúng ta sẽ đi qua các khái niệm (Concepts) được sử dụng trong buildpack, các khái niệm này tương ứng là các thành phần có trong 1 image khi chúng được build ra.  Ví dụ image sau khi được build ra là một cái hambergur như hình

![](https://images.viblo.asia/76ecbb00-4fb2-44e5-9e7b-48ca3f682bcf.png)

## BuildPacks (Phần nhân)
Buildpacks là thành phần giúp phát hiện ngôn ngữ, các thư viện, Runtime cần thiết để ứng dụng của bạn có thể chạy.

Một image được build ra có thể dựa trên nhiều buildpacks khác nhau cũng giống như các lớp trong 1 chiếc humburger (Layers). 

Ví dụ:

Khi bạn muốn build image cho 1 ứng dụng python sẽ có các buildpacks được thêm vào như

![image-1656471152811.png](https://images.viblo.asia/039e1cfc-644f-4f0e-afe3-5e05dc0b8915.png)
 
* pip
* Procfile
* Cpython
* ...

Buildpacks sẽ phân tích source code của bạn, ví dụ nếu code có chứa file **Procfile** => khớp điều kiện của buildpack => cài Buildpack Procfile hỗ trợ việc run ứng dụng.

Tương tự khi detect được các file **requirements.txt** => **cài buildpack pip**  để cài dependency

Buildpack sẽ gồm 2 quá trình là **Detect** và **Build** 

- Như đã giải thích ở trên Detect sẽ như việc xác định xem bạn muốn ăn gì trong chiếc humburger (nhiều thịt ít rau hay nhiều rau ít thịt) để thêm vào cho phù hợp

- Quá trình Build là quá trình thực hiện làm ra chiếc burger từ những gì đã được xác định ở quá trình Detect bên trên. Thực tế đây sẽ là quá trình install các dependency như **pip install -r requirements.txt** .

Ở phần sau khi thực hiện quá trình build từ **source ra image** ta sẽ thấy rõ hơn quá trình này
Tham khảo thêm: https://buildpacks.io/docs/concepts/components/buildpack/

## Stack (Phần bánh)
Nếu ví buildpacks như phần nhân thì Stack sẽ là phần bánh để kẹp ở bên ngoài. Stack sẽ có 2 thành phần chính là **Build Image** và **Run Image**. 

Đúng như cái tên của nó:

- **Build image** là môi trường dùng để build lên image ứng dụng

- **Run Image** là môi trường ta sẽ chạy ứng dụng đó

Cũng như chọn vỏ bánh, ta có thể chọn vỏ bánh dày (image đầy đủ thư viện) hoặc vỏ bánh mỏng (image với thư viện tối thiểu) mục đích để giảm dung lượng image.
 
Tham khảo thêm: https://buildpacks.io/docs/concepts/components/stack/

## Builders (Cái burger)
Cuối cùng builder không gì khác chính là cả cái burger **bao gồm cả Stack và Buildpacks**. Builder là thành phần cuối cùng đã được đóng gói để bạn có thể chạy source code trên nó.

Builder gồm có:

* List các BuildPacks
* Stack
* CNB Lifecycle
Builder cũng như burger, có size nhỏ, vừa ,to để phù hợp cho nhu cầu từng người.

Tài liệu để tự build một chiếc burger của riêng bạn: https://buildpacks.io/docs/operator-guide/create-a-builder/

# Thử nghiệm
**Công cụ cần phải có:**

- [Docker](https://www.docker.com/)

- [Pack](https://buildpacks.io/docs/tools/pack/)

Ta sẽ sử dụng builder có sẵn của **paketo.io** để thực hiện build image cho ứng dụng Python, ở đây mình sẽ chọn builder với tag **base** là bản có dung lượng trung bình, ngoài ra còn 2 bản khác là **tiny** và **full**. Sau khi đã cài đặt 2 công cụ trên ta truy cập vào folder chứa source code và chạy câu lệnh sau để build image.
 
Repo Source code: https://github.com/MMA17/Up-Download-Files-Auth-with-JWT-Token

```
pack build python-app --builder paketobuildpacks/builder:base
```

```
base: Pulling from paketobuildpacks/builder
Digest: sha256:13e72e425779b45c126941e0c5a9bc9edfd5d5c6ded064d3a00ef1706d7d7259
Status: Image is up to date for paketobuildpacks/builder:base
base-cnb: Pulling from paketobuildpacks/run
Digest: sha256:ef018536d42417d74d9e8532058d755492922e251949a918e7be371c9f4a5191
Status: Image is up to date for paketobuildpacks/run:base-cnb
Restoring data for SBOM from previous image
===> DETECTING
6 of 9 buildpacks participating
paketo-buildpacks/ca-certificates 3.2.4
paketo-buildpacks/cpython         1.0.1
paketo-buildpacks/pip             0.11.1
paketo-buildpacks/pip-install     0.4.2
paketo-buildpacks/python-start    0.10.0
paketo-buildpacks/procfile        5.1.2
===> RESTORING
Restoring metadata for "paketo-buildpacks/ca-certificates:helper" from app image
Restoring metadata for "paketo-buildpacks/cpython:cpython" from app image
Restoring metadata for "paketo-buildpacks/pip:pip" from cache
Restoring metadata for "paketo-buildpacks/pip-install:packages" from app image
Restoring metadata for "paketo-buildpacks/pip-install:cache" from cache
Restoring data for "paketo-buildpacks/cpython:cpython" from cache
Restoring data for "paketo-buildpacks/pip:pip" from cache
Restoring data for "paketo-buildpacks/pip-install:cache" from cache
Restoring data for "paketo-buildpacks/pip-install:packages" from cache
Restoring data for SBOM from cache
===> BUILDING

Paketo CA Certificates Buildpack 3.2.4
  https://github.com/paketo-buildpacks/ca-certificates
  Launch Helper: Reusing cached layer
Paketo CPython Buildpack 1.0.1
  Resolving CPython version
    Candidate version sources (in priority order):
                -> ""
      <unknown> -> ""

    Selected CPython version (using ): 3.9.13

  Reusing cached layer /layers/paketo-buildpacks_cpython/cpython

Paketo Pip Buildpack 0.11.1
  Resolving Pip version
    Candidate version sources (in priority order):
      <unknown> -> ""

    Selected Pip version (using <unknown>): 22.1.2

  Reusing cached layer /layers/paketo-buildpacks_pip/pip
Paketo Pip Install Buildpack 0.4.2
  Executing build process
    Running 'pip install --requirement requirements.txt --exists-action=w --cache-dir=/layers/paketo-buildpacks_pip-install/cache --compile --user --disable-pip-version-check'
      Completed in 2.624s

  Generating SBOM for /layers/paketo-buildpacks_pip-install/packages
      Completed in 41ms

  Configuring build environment
    PYTHONPATH -> "/layers/paketo-buildpacks_pip-install/packages/lib/python3.9/site-packages:$PYTHONPATH"

  Configuring launch environment
    PYTHONPATH -> "/layers/paketo-buildpacks_pip-install/packages/lib/python3.9/site-packages:$PYTHONPATH"

Paketo Python Start Buildpack 0.10.0
  Assigning launch processes:
    web (default): python


Paketo Procfile Buildpack 5.1.2
  https://github.com/paketo-buildpacks/procfile
  Process types:
    web: python main.py
===> EXPORTING
Reusing layer 'paketo-buildpacks/ca-certificates:helper'
Adding layer 'paketo-buildpacks/cpython:cpython'
Reusing layer 'paketo-buildpacks/pip-install:packages'
Adding layer 'launch.sbom'
Reusing 1/1 app layer(s)
Reusing layer 'launcher'
Reusing layer 'config'
Reusing layer 'process-types'
Adding label 'io.buildpacks.lifecycle.metadata'
Adding label 'io.buildpacks.build.metadata'
Adding label 'io.buildpacks.project.metadata'
Setting default process type 'web'
Saving python-app...
*** Images (ddab9631519a):
      python-app
Adding cache layer 'paketo-buildpacks/cpython:cpython'
Adding cache layer 'paketo-buildpacks/pip:pip'
Reusing cache layer 'paketo-buildpacks/pip-install:cache'
Reusing cache layer 'paketo-buildpacks/pip-install:packages'
Adding cache layer 'cache.sbom'
Successfully built image python-app
```

Ta thấy các **buildpacks** được cài là:
 
* paketo-buildpacks/ca-certificates 3.2.4
* paketo-buildpacks/cpython 1.0.1
* paketo-buildpacks/pip 0.11.1
* paketo-buildpacks/pip-install 0.4.2
* paketo-buildpacks/python-start 0.10.0
* paketo-buildpacks/procfile 5.1.2

Các buildpack này được cài đặt bởi source code của chúng ta match những điều kiện của những buildpack này.
Để có thể thêm buildpack khác từ bên ngoài ta có thể thêm --buildpack khi chạy

```
pack build my-app --buildpack paketo-buildpacks/python \
  --builder paketobuildpacks/builder:base
```

Gõ **docker images** ta sẽ thấy có image **python-app**, sử dụng docker run để khởi chạy ứng dụng với port 5000 ta sẽ thấy ứng dụng chạy thành công.
![image.png](https://images.viblo.asia/00b246ce-61ce-42b9-81c8-fbb413ad9913.png)
# Ưu và nhược điểm
## Ưu điểm:

* Sử dụng nhanh chóng
* Dễ dàng áp dụng cho các ứng dụng có cấu trúc chuẩn
* ...
 ## Nhược điểm:

* Chỉ áp dụng được với ứng dụng dùng 1 ngôn ngữ
* Yêu cầu phải define 1 số file nhất định tùy thuộc ngôn ngữ
* Dung lượng image khi được build ra lớn hơn nhiều so với Dockerfile
* ...

# Kết
Có lẽ lý do khiến cho BuildPack chưa được sử dụng phổ biến vì nó chưa thực sự linh hoạt cho những case có yêu cầu phức tạp và dung lượng image khá nặng so với Dockerfile. Hy vọng bài viết này giúp bạn có thêm một phương pháp để giải quyết vấn đề trong công việc.

**[*Buy me a Coffee](https://www.buymeacoffee.com/hoangviet)**