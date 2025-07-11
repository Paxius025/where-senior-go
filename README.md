# เริ่มต้นใช้งานด้วย Docker

## ข้อกำหนดเบื้องต้น

- ติดตั้ง [Docker](https://www.docker.com/get-started)
- ติดตั้ง [Docker Compose](https://docs.docker.com/compose/install/)

## วิธีใช้งาน

1. เปิดเทอร์มินัลในโฟลเดอร์โปรเจกต์
2. สร้างและเริ่มต้นคอนเทนเนอร์ทั้งหมดด้วยคำสั่ง:
    
    ```bash
    docker pull python:3.10-slim
    docker pull node:20.12.2-alpine
    docker-compose --env-file .env up --build
    ```

    - รอจนระบบ build และ start เสร็จสมบูรณ์ (อาจใช้เวลาสักครู่)

3. เปิดเว็บเบราว์เซอร์เพื่อเข้าใช้งานแต่ละบริการ:

    - **Frontend:** [http://localhost:5176](http://localhost:5176)
    - **Backend API:** [http://localhost:8003](http://localhost:8003)
    - **pgAdmin:** [http://localhost:8083](http://localhost:8083)

## การหยุดและรีเซ็ตระบบ

- หยุดระบบ: กด `Ctrl+C` ในเทอร์มินัล หรือใช้คำสั่ง

  ```bash
  docker-compose down
  ```

- รีเซ็ตฐานข้อมูล (ลบข้อมูลทั้งหมด):

  ```bash
  docker-compose down -v
  ```
## จำลองฐานข้อมูล

``bash
docker exec -it internship-backend sh

PYTHONPATH=./app python -m app.seed.main_seeder
```
## หมายเหตุ

- ตัวเลือก `--build` จะบังคับให้ build ใหม่ทุกครั้งที่รัน
- หากเป็นการรันครั้งแรก อาจต้องรอโหลด image และติดตั้ง dependencies
