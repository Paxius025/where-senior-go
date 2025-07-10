from app.services.database_services import get_connection
import random
from seed.seeders import (
    seed_faculties_and_majors, seed_users, seed_companies, seed_fields,
    seed_positions, seed_reviews, seed_tags, seed_review_tags
)
import psycopg2
from psycopg2 import Error
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main_seeder():
    """
    Main function to run all seeders
    """
    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Run seeders in the order of table dependencies
        # Step 1: Seed Faculties and Majors first, as they are referenced by other tables
        faculty_ids_map = seed_faculties_and_majors(cursor)
        
        # Step 2: Seed Users (Majors and Faculties must exist first)
        # Create 15 users
        user_ids = seed_users(cursor, num_users=15) 
        
        # Step 3: Seed Companies (Users must exist first)
        # Create 8 companies
        company_ids = seed_companies(cursor, user_ids, num_companies=8) 
        
        # Step 4: Seed Fields (Job categories)
        field_ids = seed_fields(cursor) 
        
        # Step 5: Seed Positions (Companies and Fields must exist first)
        # Create 2-5 positions per company
        position_ids = seed_positions(cursor, company_ids, field_ids, num_positions_per_company=random.randint(2, 5)) 
        
        # Step 6: Seed Reviews (Users and Positions must exist first)
        # Create 1-3 reviews per position
        review_ids = seed_reviews(cursor, user_ids, position_ids, num_reviews_per_position=random.randint(1, 3)) 
        
        # Step 7: Seed Tags
        tag_ids = seed_tags(cursor) 
        
        # Step 8: Seed Review Tags (Reviews and Tags must exist first)
        seed_review_tags(cursor, review_ids, tag_ids) 

        conn.commit() # Commit all changes to the database
        logger.info("All seeding processes completed successfully!")

    except Error as e:
        logger.error(f"Database error during main seeding process: {e}")
        if conn:
            conn.rollback() # Rollback changes if an error occurs
    except Exception as e:
        logger.error(f"An unexpected error occurred during main seeding process: {e}")
    finally:
        if conn:
            cursor.close()
            conn.close()

# --- Run seeder when this script is executed directly ---
if __name__ == "__main__":
    main_seeder()
