import pymysql
import os
from dotenv import load_dotenv
load_dotenv(override=True)

conn = None

def get_connection():
    global conn
    if conn is None or not conn.open:
        conn = pymysql.connect(
            charset=os.getenv("CHARSET",""),
            cursorclass=pymysql.cursors.DictCursor,
            host=os.getenv("HOST",""),
            connect_timeout=int(os.getenv("CONNECT_TIMEOUT", "10")),
            db=os.getenv("DB", ""),
            password=os.getenv("PASSWORD", ""),
            read_timeout=int(os.getenv("READ_TIMEOUT", "10")),
            port=int(os.getenv("PORT", "0")),
            user=os.getenv("USER", ""),
            write_timeout=int(os.getenv("WRITE_TIMEOUT", "10")),
        )
    return conn