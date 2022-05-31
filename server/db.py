from distutils.log import error
import mariadb
import sys

class Database:

    def __init__(self,username,password,database,port):
        self.connect_to_db(username,password,database,port)

    def connect_to_db(self,username,password,database,port):
        """Connect to database"""

        try:
            conn = mariadb.connect(
                user=username,
                password=password,
                host="localhost",
                port=int(port),
                database=database,
                autocommit=True
            )
            print('Connected to database!')
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        # Set conn and cur
        self.conn = conn
        self.cur = conn.cursor(dictionary=True)

    def close_connection(self):
        """ Safely close the db connection """

        self.conn.close()
