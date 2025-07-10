from app.services.database_services import get_connection
import psycopg2
from psycopg2 import Error

"""Seeding command
    PYTHONPATH=./app python -m app.seed.majors_faculty_seeder
"""
FACULTY_MAJOR_DATA = [
    {
        "faculty_name": "คณะทรัพยากรธรรมชาติและอุตสาหกรรมเกษตร",
        "majors": [
            "สาขาวิชาพืชศาสตร์",
            "สาขาวิชาทรัพยากรเกษตรและการจัดการการผลิต",
            "สาขาวิชาสัตวศาสตร์",
            "สาขาวิชาประมง",
            "สาขาวิชาเทคโนโลยีการอาหาร",
            "สาขาวิชาอาหารปลอดภัยและโภชนาการ"
        ]
    },
    {
        "faculty_name": "คณะวิทยาศาสตร์และวิศวกรรมศาสตร์",
        "majors": [
            "สาขาวิชาวิศวกรรมไฟฟ้า",
            "สาขาวิชาวิศวกรรมคอมพิวเตอร์",
            "สาขาวิชาวิศวกรรมโยธา",
            "สาขาวิชาวิศวกรรมเครื่องกลและการผลิต",
            "สาขาวิชาวิศวกรรมอุตสาหการ",
            "สาขาวิชาวิทยาการคอมพิวเตอร์",
            "สาขาวิชาเทคโนโลยีสารสนเทศ",
            "สาขาวิชาเคมีประยุกต์",
            "สาขาวิชาคณิตศาสตร์ประยุกต์"
        ]
    },
    {
        "faculty_name": "คณะศิลปศาสตร์และวิทยาการจัดการ",
        "majors": [
            "สาขาวิชาการบัญชี",
            "สาขาวิชาการจัดการ",
            "สาขาวิชาการตลาด",
            "สาขาวิชาการจัดการโรงแรมและท่องเที่ยว",
            "สาขาวิชาการเงิน",
            "สาขาวิชาภาษาอังกฤษ",
            "สาขาวิชานิติศาสตร์",
            "สาขาวิชารัฐประศาสนศาสตร์"
        ]
    },
    {
        "faculty_name": "คณะสาธารณสุขศาสตร์",
        "majors": [
            "สาขาวิชาสาธารณสุขศาสตร์",
            "สาขาอนามัยสิ่งแวดล้อม",
            "สาขาอาชีวอนามัยและความปลอดภัย"
        ]
    }
]

def seed_faculties_and_majors():
    """
    ฟังก์ชันหลักสำหรับทำการ Seeding ข้อมูลคณะและสาขาลงในฐานข้อมูล
    """
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        for faculty_data in FACULTY_MAJOR_DATA:
            faculty_name = faculty_data["faculty_name"]
            
            # 1. Insert Faculty
            # ON CONFLICT (name) DO NOTHING: ถ้าชื่อคณะซ้ำ ไม่ต้องทำอะไร
            # RETURNING faculty_id: ดึง faculty_id กลับมาใช้
            cursor.execute(
                "INSERT INTO faculties (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING faculty_id;",
                (faculty_name,)
            )
            
            faculty_id = cursor.fetchone()
            if faculty_id: # ถ้ามีการ insert ใหม่ (ไม่ซ้ำ)
                faculty_id = faculty_id[0]
                print(f"Inserted faculty: {faculty_name} (ID: {faculty_id})")
            else: # ถ้ามีอยู่แล้ว ให้ไปดึง ID ของคณะนั้นมา
                cursor.execute(
                    "SELECT faculty_id FROM faculties WHERE name = %s;",
                    (faculty_name,)
                )
                faculty_id = cursor.fetchone()[0]
                print(f"Faculty '{faculty_name}' already exists (ID: {faculty_id}). Skipping insert.")

            # 2. Insert Majors for this Faculty
            for major_name in faculty_data["majors"]:
                # ON CONFLICT (name) DO NOTHING: ถ้าชื่อสาขาซ้ำ ไม่ต้องทำอะไร
                cursor.execute(
                    "INSERT INTO majors (faculty_id, name) VALUES (%s, %s) ON CONFLICT (name) DO NOTHING;",
                    (faculty_id, major_name)
                )
                if cursor.rowcount > 0: # ตรวจสอบว่ามีการ insert ใหม่หรือไม่
                    print(f"  Inserted major: {major_name}")
                else:
                    print(f"  Major '{major_name}' already exists. Skipping insert.")
        
        conn.commit()
        print("\nSeeding completed successfully!")

    except Error as e:
        print(f"Database error during seeding: {e}")
        if conn:
            conn.rollback() # Rollback changes if an error occurs
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if conn:
            cursor.close()
            conn.close()

# --- รัน Seeder เมื่อเรียกใช้สคริปต์นี้โดยตรง ---
if __name__ == "__main__":
    seed_faculties_and_majors()