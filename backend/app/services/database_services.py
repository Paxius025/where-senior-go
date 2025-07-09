import os
import psycopg2
import time
from psycopg2 import OperationalError
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_connection(retries=5, delay=5):
    for attempt in range(retries):
        try:
            print(f"database port: {os.getenv('DATABASE_PORT')}")
            return psycopg2.connect(
                host=os.getenv("DATABASE_HOST"),
                port=int(os.getenv("DATABASE_PORT")),
                user=os.getenv("DATABASE_USER"),
                password=os.getenv("DATABASE_PASSWORD"),
                database=os.getenv("DATABASE_NAME"),
            )
        except OperationalError as e:
            logger.error(f"Database connection failed: {e}")
            if attempt < retries - 1:
                time.sleep(delay)
            else:
                raise e
