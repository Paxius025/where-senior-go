from app.services.database_services import get_connection
from seed.seed_data import FACULTY_MAJOR_DATA, FIELD_NAMES, TAG_NAMES
from seed.helpers import (
    hash_password, generate_random_ku_year, generate_fake_username,
    generate_fake_email, generate_fake_phone_number, generate_fake_image_url,
    generate_fake_company_name, generate_fake_address, generate_fake_paragraph,
    generate_fake_job_title, generate_fake_sentence
)
import random

def seed_faculties_and_majors(cursor):
    """
    Seeding ข้อมูลคณะและสาขา
    Args:
        cursor: psycopg2 cursor object
    Returns:
        dict: map ของ faculty_name -> faculty_id
    """
    print("--- Seeding Faculties and Majors ---")
    faculty_ids_map = {}

    for faculty_data in FACULTY_MAJOR_DATA:
        faculty_name = faculty_data["faculty_name"]
        
        cursor.execute(
            "INSERT INTO faculties (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING faculty_id;",
            (faculty_name,)
        )
        faculty_id = cursor.fetchone()
        if faculty_id:
            faculty_id = faculty_id[0]
            print(f"  Inserted faculty: {faculty_name} (ID: {faculty_id})")
        else:
            cursor.execute("SELECT faculty_id FROM faculties WHERE name = %s;", (faculty_name,))
            faculty_id = cursor.fetchone()[0]
            print(f"  Faculty '{faculty_name}' already exists (ID: {faculty_id}).")
        
        faculty_ids_map[faculty_name] = faculty_id

        for major_name in faculty_data["majors"]:
            cursor.execute(
                "INSERT INTO majors (faculty_id, name) VALUES (%s, %s) ON CONFLICT (name) DO NOTHING;",
                (faculty_id, major_name)
            )
            if cursor.rowcount > 0:
                print(f"    Inserted major: {major_name}")
            else:
                print(f"    Major '{major_name}' already exists.")
    print("--- Faculties and Majors Seeding Complete ---\n")
    return faculty_ids_map


def seed_users(cursor, num_users: int = 10):
    """
    Seeding ข้อมูลผู้ใช้
    Args:
        cursor: psycopg2 cursor object
        num_users (int): จำนวนผู้ใช้ที่ต้องการสร้าง
    Returns:
        list: รายชื่อ user_id ที่ถูกเพิ่ม
    """
    print(f"--- Seeding {num_users} Users ---")
    inserted_user_ids = []
    major_ids = []
    faculty_ids = []

    cursor.execute("SELECT major_id FROM majors;")
    major_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT faculty_id FROM faculties;")
    faculty_ids = [row[0] for row in cursor.fetchall()]

    if not major_ids or not faculty_ids:
        print("  Warning: No majors or faculties found. Skipping user seeding.")
        return []

    for _ in range(num_users):
        username = generate_fake_username()
        email = generate_fake_email()
        ku_year = generate_random_ku_year()
        
        random_major_id = random.choice(major_ids)
        # Assuming major_id implies faculty_id, let's fetch it
        cursor.execute("SELECT faculty_id FROM majors WHERE major_id = %s;", (random_major_id,))
        associated_faculty_id = cursor.fetchone()[0]

        contact = generate_fake_phone_number()
        password_hash = hash_password("password123")
        profile_image_url = generate_fake_image_url()

        try:
            cursor.execute(
                """
                INSERT INTO users (username, ku_year, major_id, faculty_id, contact, email, password_hash, profile_image_url)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (email) DO NOTHING RETURNING user_id;
                """,
                (username, ku_year, random_major_id, associated_faculty_id, contact, email, password_hash, profile_image_url)
            )
            user_id = cursor.fetchone()
            if user_id:
                inserted_user_ids.append(user_id[0])
                print(f"  Inserted user: {username} (ID: {user_id[0]})")
            else:
                print(f"  User with email '{email}' already exists. Skipping insert.")
        except Exception as e:
            print(f"  Error inserting user '{username}': {e}")
    print(f"--- Users Seeding Complete ({len(inserted_user_ids)} inserted) ---\n")
    return inserted_user_ids


def seed_companies(cursor, user_ids: list, num_companies: int = 5):
    """
    Seeding ข้อมูลบริษัท
    Args:
        cursor: psycopg2 cursor object
        user_ids (list): รายชื่อ user_id ที่มีอยู่
        num_companies (int): จำนวนบริษัทที่ต้องการสร้าง
    Returns:
        list: รายชื่อ company_id ที่ถูกเพิ่ม
    """
    print(f"--- Seeding {num_companies} Companies ---")
    inserted_company_ids = []
    if not user_ids:
        print("  Warning: No users available to create companies. Skipping company seeding.")
        return []

    for _ in range(num_companies):
        company_name = generate_fake_company_name()
        address = generate_fake_address()
        description = generate_fake_paragraph(3)
        contact = generate_fake_phone_number()
        image_url = generate_fake_image_url()
        created_by = random.choice(user_ids)

        try:
            cursor.execute(
                """
                INSERT INTO companies (name, address, description, contact, image_url, created_by)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (name) DO NOTHING RETURNING company_id;
                """,
                (company_name, address, description, contact, image_url, created_by)
            )
            company_id = cursor.fetchone()
            if company_id:
                inserted_company_ids.append(company_id[0])
                print(f"  Inserted company: {company_name} (ID: {company_id[0]})")
            else:
                print(f"  Company '{company_name}' already exists. Skipping insert.")
        except Exception as e:
            print(f"  Error inserting company '{company_name}': {e}")
    print(f"--- Companies Seeding Complete ({len(inserted_company_ids)} inserted) ---\n")
    return inserted_company_ids


def seed_fields(cursor):
    """
    Seeding ข้อมูลหมวดหมู่งาน
    Args:
        cursor: psycopg2 cursor object
    Returns:
        list: รายชื่อ field_id ที่ถูกเพิ่ม
    """
    print("--- Seeding Fields ---")
    inserted_field_ids = []
    for field_name in FIELD_NAMES:
        cursor.execute(
            "INSERT INTO fields (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING field_id;",
            (field_name,)
        )
        field_id = cursor.fetchone()
        if field_id:
            inserted_field_ids.append(field_id[0])
            print(f"  Inserted field: {field_name} (ID: {field_id[0]})")
        else:
            print(f"  Field '{field_name}' already exists. Skipping insert.")
    print(f"--- Fields Seeding Complete ({len(inserted_field_ids)} inserted) ---\n")
    return inserted_field_ids


def seed_positions(cursor, company_ids: list, field_ids: list, num_positions_per_company: int = 3):
    """
    Seeding ข้อมูลตำแหน่งงาน
    Args:
        cursor: psycopg2 cursor object
        company_ids (list): รายชื่อ company_id ที่มีอยู่
        field_ids (list): รายชื่อ field_id ที่มีอยู่
        num_positions_per_company (int): จำนวนตำแหน่งที่ต้องการสร้างต่อบริษัท
    Returns:
        list: รายชื่อ position_id ที่ถูกเพิ่ม
    """
    print(f"--- Seeding Positions ---")
    inserted_position_ids = []
    if not company_ids or not field_ids:
        print("  Warning: No companies or fields available. Skipping position seeding.")
        return []

    for company_id in company_ids:
        for _ in range(num_positions_per_company):
            title = generate_fake_job_title()
            description = generate_fake_paragraph(4)
            field_id = random.choice(field_ids)

            try:
                cursor.execute(
                    """
                    INSERT INTO positions (company_id, title, description, field_id)
                    VALUES (%s, %s, %s, %s) RETURNING position_id;
                    """,
                    (company_id, title, description, field_id)
                )
                position_id = cursor.fetchone()[0]
                inserted_position_ids.append(position_id)
                print(f"  Inserted position: '{title}' for Company ID {company_id} (ID: {position_id})")
            except Exception as e:
                print(f"  Error inserting position for Company ID {company_id}: {e}")
    print(f"--- Positions Seeding Complete ({len(inserted_position_ids)} inserted) ---\n")
    return inserted_position_ids


def seed_reviews(cursor, user_ids: list, position_ids: list, num_reviews_per_position: int = 2):
    """
    Seeding ข้อมูลรีวิว
    Args:
        cursor: psycopg2 cursor object
        user_ids (list): รายชื่อ user_id ที่มีอยู่
        position_ids (list): รายชื่อ position_id ที่มีอยู่
        num_reviews_per_position (int): จำนวนรีวิวที่ต้องการสร้างต่อตำแหน่ง
    Returns:
        list: รายชื่อ review_id ที่ถูกเพิ่ม
    """
    print(f"--- Seeding Reviews ---")
    inserted_review_ids = []
    if not user_ids or not position_ids:
        print("  Warning: No users or positions available. Skipping review seeding.")
        return []

    for position_id in position_ids:
        for _ in range(num_reviews_per_position):
            user_id = random.choice(user_ids)
            rating = random.randint(1, 5)
            summary = generate_fake_sentence(10)
            detail = generate_fake_paragraph(5)
            strength = generate_fake_sentence(7)
            advice = generate_fake_sentence(7)

            try:
                cursor.execute(
                    """
                    INSERT INTO reviews (user_id, position_id, rating, summary, detail, strength, advice)
                    VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING review_id;
                    """,
                    (user_id, position_id, rating, summary, detail, strength, advice)
                )
                review_id = cursor.fetchone()[0]
                inserted_review_ids.append(review_id)
                print(f"  Inserted review (ID: {review_id}) for Position ID {position_id} by User ID {user_id}")
            except Exception as e:
                print(f"  Error inserting review for Position ID {position_id}: {e}")
    print(f"--- Reviews Seeding Complete ({len(inserted_review_ids)} inserted) ---\n")
    return inserted_review_ids


def seed_tags(cursor):
    """
    Seeding ข้อมูลแท็ก
    Args:
        cursor: psycopg2 cursor object
    Returns:
        list: รายชื่อ tag_id ที่ถูกเพิ่ม
    """
    print("--- Seeding Tags ---")
    inserted_tag_ids = []
    for tag_name in TAG_NAMES:
        cursor.execute(
            "INSERT INTO tags (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING tag_id;",
            (tag_name,)
        )
        tag_id = cursor.fetchone()
        if tag_id:
            inserted_tag_ids.append(tag_id[0])
            print(f"  Inserted tag: {tag_name} (ID: {tag_id[0]})")
        else:
            print(f"  Tag '{tag_name}' already exists. Skipping insert.")
    print(f"--- Tags Seeding Complete ({len(inserted_tag_ids)} inserted) ---\n")
    return inserted_tag_ids


def seed_review_tags(cursor, review_ids: list, tag_ids: list, max_tags_per_review: int = 3):
    """
    Seeding ข้อมูล Review Tags
    Args:
        cursor: psycopg2 cursor object
        review_ids (list): รายชื่อ review_id ที่มีอยู่
        tag_ids (list): รายชื่อ tag_id ที่มีอยู่
        max_tags_per_review (int): จำนวนแท็กสูงสุดที่จะเพิ่มต่อรีวิว
    """
    print(f"--- Seeding Review Tags ---")
    if not review_ids or not tag_ids:
        print("  Warning: No reviews or tags available. Skipping review_tags seeding.")
        return

    for review_id in review_ids:
        num_tags_to_add = random.randint(1, min(max_tags_per_review, len(tag_ids)))
        selected_tag_ids = random.sample(tag_ids, num_tags_to_add)

        for tag_id in selected_tag_ids:
            try:
                cursor.execute(
                    "INSERT INTO review_tags (review_id, tag_id) VALUES (%s, %s) ON CONFLICT (review_id, tag_id) DO NOTHING;",
                    (review_id, tag_id)
                )
                if cursor.rowcount > 0:
                    print(f"  Added tag ID {tag_id} to review ID {review_id}")
                # else: # Uncomment if you want to see skipped messages for existing review_tags
                #     print(f"  Tag ID {tag_id} already associated with review ID {review_id}. Skipping.")
            except Exception as e:
                print(f"  Error adding tag {tag_id} to review {review_id}: {e}")
    print("--- Review Tags Seeding Complete ---\n")
