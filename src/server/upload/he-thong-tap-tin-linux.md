# Hệ thống tập tin Linux
Hãy nghĩ về một tủ lạnh có nhiều kệ có thể được sử dụng để lưu trữ các mặt hàng khác nhau. Những kệ này giúp bạn sắp xếp các mặt hàng tạp hóa theo hình dạng, kích thước, loại, v.v ... Khái niệm tương tự áp dụng cho một hệ thống tập tin, là hiện thân của phương pháp lưu trữ và sắp xếp các bộ sưu tập dữ liệu tùy ý ở dạng con người có thể sử dụng được.

Các loại hệ thống tập tin khác nhau được Linux hỗ trợ:
Hệ thống tập tin đĩa thông thường (Conventional disk filesystems) ext2, ext3, ext4, XFS, Btrfs, JFS, NTFS, etc.
Hệ thống tập tin lưu trữ flash (Flash storage filesystems) ubifs, JFFS2, YAFFS, etc.
Hệ thống tập tin cơ sở dữ liệu.
Các hệ thống tập tin mục đích đặc biệt (Special purpose filesystems) : Procfs, sysfs, tmpfs, debugfs, v.v.

## 1.1 Phân vùng và hệ thống tập tin 

Phân vùng là một phần logic của đĩa, trong khi đó hệ thống tệp là phương pháp lưu trữ / tìm tệp trên đĩa cứng (thường là trong phân vùng). Theo cách tương tự, bạn có thể nghĩ các hệ thống tập tin giống như các cây gia đình thể hiện con cháu và các mối quan hệ của chúng, trong khi các phân vùng giống như các họ khác nhau (mỗi nhóm có một cây riêng).

Một so sánh giữa các hệ thống tập tin trong Windows và Linux được đưa ra trong bảng sau:
![](https://images.viblo.asia/6a9f8e31-bbaf-48f6-a38b-6a88075effcd.png)

## 1.2 Tiêu chuẩn phân cấp hệ thống tập tin 
Các hệ thống Linux lưu trữ các tệp quan trọng của chúng theo bố cục tiêu chuẩn được gọi là Tiêu chuẩn phân cấp hệ thống tệp (  Filesystem Hierarchy Standard FHS), được duy trì từ lâu bởi Quỹ Linux.

![](https://images.viblo.asia/bff347c9-22d9-4987-926b-c7e9f3272fb3.png)

Tất cả các tên hệ thống tập tin Linux đều phân biệt chữ hoa chữ thường, vì vậy / boot, / Boot và / BOOT đại diện cho ba thư mục (hoặc thư mục) khác nhau.

## Nguồn tham khảo
https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS101x+1T2017/courseware/6cee72d455c847e9b462efb4e2dbd2a7/20f2fad2820e474b8d5589cfd2357e6a/3?activate_block_id=block-v1%3ALinuxFoundationX%2BLFS101x%2B1T2017%2Btype%40vertical%2Bblock%405a5307da4f4f4c569357dadbb10605e8