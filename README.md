# Nhóm 2: Phát triển hệ thống Dashboard xử lý Video

## Công nghệ sử dụng

-   Front-End: ReactJS
-   Back-End: Nodejs, ExpressJs, Creatomate
-   Database: MongoDB
-   Storage: Cloudinary

## Các thành viên

1. Nguyễn Minh Đức - MSSV: 2011461
2. Vũ Thanh Sang - MSSV: 20110555
## Giao diện và cách sử dụng 
-    Trang Media: Đây là nơi lưu trữ các video, audio có sẵn của hệ thống, video mà người dùng lưu trữ,...
-    Chức năng chọn video hoặc audio:
Khi nhấn chọn video hoặc audio
  
  ➢ Video hoặc audio sẽ được thêm vô video player và đồng thời thêm vào thanh trượt video.
  
  ![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529553/Picture1_m3mkhu.png)
  
Sau khi chọn xong

  ![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529553/Picture4_hbk3uf.png)
  
-        Chức năng thêm media

Bước 1: Chọn nút add media, một dialog hiện lên

Bước 2: Chọn video cần add và nhấn nút open

Video được thêm vô video player và đồng thời thêm vô thanh trượt video.

![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529553/Picture3_peyy6d.png)

-        Trang audio: Đây là nơi lưu trữ audio mà người dùng đã tải lên

![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529553/Picture5_mkr9hm.png)

-        Chức năng thêm audio
Bước 1: Chọn nút add audio, một dialog hiện lên

Bước 2: Chọn audio cần add và nhấn nút open

        ➢ Audio được thêm vô video player, thanh trượt video và danh sách audio tại trang Audio

![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529553/Picture6_ztufmw.png)

sau khi chọn xong

![alt text](https://res.cloudinary.com/dgfsdhshs/image/upload/v1687529554/Picture7_hgonav.png)
## Cách deploy project

-   **Bước 1:** Cài đặt git.
-   **Bước 2:** Cài đặt docker.
-   **Bước 3:** Clone repo: https://github.com/ducdevday/Video-Editor.git

```
    git clone https://github.com/ducdevday/Video-Editor.git
```

-   **Bước 4:** Di chuyển vào thư mục chứa dự án và file docker-compose.yml:

```
    cd Video-Editor/
```

-   **Bước 5:** Chạy docker container:

```
    docker-compose up
```

-   **Bước 6:** Mở docker desktop
-   **Bước 7:** Chọn port của client để chạy ứng dụng
