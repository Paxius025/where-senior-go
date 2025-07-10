import random
import hashlib
from faker import Faker

# --- Initialize Faker for generating fake data ---
fake = Faker('th_TH') # Use Thai locale for names and addresses

def get_random_id(cursor, table_name, id_column_name):
    """
    Get a random ID from the specified table
    Args:
        cursor: psycopg2 cursor object
        table_name (str): Table name
        id_column_name (str): ID column name of the table
    Returns:
        int: Random ID or None if not found
    """
    cursor.execute(f"SELECT {id_column_name} FROM {table_name} ORDER BY RANDOM() LIMIT 1;")
    result = cursor.fetchone()
    return result[0] if result else None

def hash_password(password: str) -> str:
    """
    Generate a hash of the password (for fake data)
    Args:
        password (str): Password
    Returns:
        str: Hashed password
    """
    return hashlib.sha256(password.encode()).hexdigest()

def generate_random_ku_year() -> int:
    """
    Generate a random enrollment year (assume from 4 years ago to present)
    Returns:
        int: Random enrollment year
    """
    current_year = 2023 
    return random.randint(current_year - 4, current_year)

def generate_fake_username() -> str:
    """Generate a fake username"""
    return fake.user_name() + str(random.randint(100, 999))

def generate_fake_email() -> str:
    """Generate a fake email"""
    return fake.email()

def generate_fake_phone_number() -> str:
    """Generate a fake phone number"""
    return fake.phone_number()

def generate_fake_image_url() -> str:
    """Generate a fake image URL"""
    return fake.image_url()

def generate_fake_company_name() -> str:
    """Generate a fake company name"""
    return fake.company() + " Corp."

def generate_fake_address() -> str:
    """Generate a fake address"""
    return fake.address()

def generate_fake_paragraph(sentences: int = 3) -> str:
    """Generate a fake paragraph"""
    return fake.paragraph(nb_sentences=sentences)

def generate_fake_job_title() -> str:
    """Generate a fake job title"""
    return fake.job()

def generate_fake_sentence(words: int = 10) -> str:
    """Generate a fake sentence"""
    return fake.sentence(nb_words=words)
