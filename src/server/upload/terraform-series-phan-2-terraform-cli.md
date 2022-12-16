# Cài đặt Terraform

Hashicorp distribute Terraform như một binary package. Vì thế mình có thể cài đặt thông qua cách sử dụng các package manager, hoặc cài đặt manual. Mình sẽ giới thiệu một số cách cài đặt phổ biến.

## Homebrew trên MacOS

- Cài đặt HashiCorp tab package
    
    ```bash
    	brew tap hashicorp/tap
    ```
    
- Cài đặt Terraform CLI package
    
    ```bash
    brew install hashicorp/tap/terraform
    ```
    
- Update latest version Terraform
    
    ```bash
    brew update
    brew upgrade hashicorp/tap/terraform
    ```
    
- Kiểm tra cài đặt
    
    ```bash
    terraform -help
    ```
    

## Chocolatey trên Windows

- Cài đặt Terraform CLI package
    
    ```bash
    choco install terraform
    ```
    
- Kiểm tra cài đặt
    
    ```bash
    terraform -help
    ```
    

## Ubuntu/Debian

- Cập nhật hệ thống, và các packages liên quan để chuẩn bị cho phần cài đặt terraform
    
    ```bash
    sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
    ```
    
- Thêm HashiCorp [GPG key](https://apt.releases.hashicorp.com/gpg)
    
    ```bash
    curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
    ```
    
- Tải về HashiCorp Linux repository
    
    ```bash
    sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
    ```
    
- Cài đặt Terraform CLI package
    
    ```bash
    sudo apt-get update && sudo apt-get install terraform
    ```
    
- Kiểm tra cài đặt
    
    ```bash
    terraform -help
    ```
    

> Ngoài ra còn có các cách cài đặt thủ công khác. Xem chi tiết tại: [Terraform CLI Install](https://learn.hashicorp.com/tutorials/terraform/install-cli)

# Terraform CLI Commands

Để xem danh sách các commands có trong terraform có thể dùng cmd **terraform -help** . Kết quả sẽ như sau:

![](https://images.viblo.asia/0a987b85-fd3b-4f6a-927d-11c72016aedd.png)

## Terraform Init

- Đây là một lệnh bắt buộc cần thực hiện đầu tiên để khởi tạo một Terraform Project.
- Sau khi cài đặt Terraform CLI, mình tiến hành tạo thư mục Root cho project, tạo file main.tf và tiến hành thêm một số config vào. Mình chưa cần quan tâm nội dung chi tiết của file.
    
    ```bash
    //main.tf
    
    terraform {
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = "~> 3.0"
        }
      }
    }
    # Configure the AWS Provider
    provider "aws" {
      region = "us-east-1"
    }
    # Create a VPC
    resource "aws_vpc" "example" {
      cidr_block = "10.0.0.0/16"
    }
    ```
    
- Tiến hành run CMD
    
    ```bash
    terraform init
    ```
    
- Khi thực thi lệnh  Terraform sẽ tiến hành các bước sau:
    1. Đầu tiên, Terraform sẽ đọc configuration file (file **main**). Với những plugins được sử dụng sẽ tiến hành cài đặt (AWS 3.55 provider)
    2. Create log file để ghi lại version đã down của plugins
    3. Cuối cùng là tải xuống các external modules  để sử dụng trong Terraform template. Lúc này khi kiểm tra thư mục Root, mình sẽ thấy xuất hiện thêm file **.terraform.lock.hcl** và thư mục **.terraform.** Trong đó file lock dùng để ghi lại version  plugins như mình nói ở trên. Thư mục .**terraform** chưa các modules đã pull về.
![](https://images.viblo.asia/c0eeba88-7725-4b58-bbb9-ab796c18dcda.png)
![](https://images.viblo.asia/d94b6a77-e85c-4666-9b15-7d18478b3de0.png)

## Terraform Validate

- CMD
    
    ```bash
    terraform validate
    ```
    
- CMD validate sẽ tiến hành kiểm tra tất cả các Terraform configuration để đảm bảo rằng toàn bộ syntax đều chính xác. Thường sử dụng sau khi configuration files được sửa chữa để kiểm tra hợp lệ.
- Nếu toàn bộ các configs đều đúng syntax, sẽ nhận được log như sau:
    
![](https://images.viblo.asia/df6901e3-ed0d-42fe-a792-ff4ea349cba7.png)

    
- Trong trường hợp sai syntax, hệ thống sẽ báo lỗi và chỉ định chỗ lỗi cụ thể:
    
![](https://images.viblo.asia/3db0fe3a-abff-4da6-8f73-54d79f4af878.png)


## Terraform Plan

- CMD
    
    ```bash
    terraform plan
    ```
    
- CMD plan là một dry-run command, khi thực thi terraform sẽ cấp cho mình một execution plan, có highlight các thay đổi để mình có thể xác định được các thay đổi trong configuration.
- Execution Plan sẽ bao gồm 3 loại dữ liệu.
    1. Những gì ta đã chỉnh sửa trong Terraform templates
    2. Terraform state file hiện tại
    3. Những thay đổi thực tế trong infrastructure provider
- Ví dụ kết quả sau khi run plan cmd
    
![](https://images.viblo.asia/163c18b3-c232-43ac-8982-ffeaf0740e8c.png)

    

## Terraform Apply

- CMD
    
    ```bash
    terraform apply
    ```
    
- Trong trường hợp chưa run CMD plan trước khi run cmd apply. Terraform sẽ tự động rerun plan và mình cần xác nhận đồng ý với execution plan mới có thể tiến hành apply.
- Nếu mọi thứ đều hợp lệ và execution plan được approved,  Terraform sẽ không lưu lại trạng thái trước khi apply để có thể rollback mà sẽ tuân theo plan mà tiến hành apply. Nếu cần rollback lại trạng thái trước đó, mình cần sử dụng thêm các công cụ Source Control như Git để có thể convert lại trạng thái của các configuration files trước đó và tiến hành apply lại.
- Mặc định, apply CMD sẽ luôn yêu cầu confirm trước khi thực hiện apply để bảo đảm ta đã approve với execution plan. Mình có thể bypass step này bằng cách gắn thêm parameter “auto-approve” vào CMD
    
    ```bash
    terraform apply -auto-approve
    ```
    

## Terraform Destroy

- CMD
    
    ```bash
    terraform destroy
    ```
    
- Destroy CMD là lệnh dùng destroy các provided, vì vậy cần cẩn thận và hiểu rõ ý nghĩa những việc đang thực hiện khi sử lệnh này đặc biệt là trên môi trường production.
- Mặc định, tương tư như apply, destroy CMD  sẽ luôn yêu cầu confirm trước khi thực hiện để mình xác nhận lại lần nữa những việc đang làm. Mình có thể bypass step này bằng cách gắn thêm parameter “auto-approve” vào CMD
    
    ```bash
    terraform destroy -auto-approve
    ```
    

# Kết bài

Ở phần 2, mình tập trung giới thiệu cách cài đặt Terraform CLI, các command lines cơ bản để có thể hoàn thành được một flow Terraform hoàn chỉnh. Phần tiếp theo mình sẽ giới thiệu về syntax trong Terraform cũng như cách sử dụng cho từng syntax. Bài viết chủ yếu được tổng hợp lại từ những kiến thức mình góp nhặt được trong quá trình tự học Terraform và diễn đạt lại theo cách hiểu của mình. Mình nghĩ sẽ có nhiều chỗ sai sót hoặc mơ hồ. Mong nhận được sự phản hồi, góp ý từ mọi người. Xin cám ơn.