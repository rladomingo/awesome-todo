import mariadb
import sys

class Database:



    def __init__(self,username,password,database):
        self.connect_to_db(username,password,database)

    def connect_to_db(self,username,password,database):
        """Connect to database"""

        try:
            # Connect to database
            conn = mariadb.connect(
                user=username,
                password=password,
                host="localhost",
                port=3306,
                database=database
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        # Set conn and cur
        self.conn = conn
        self.cur = conn.cursor()

    def close_connection(self):
        """ Safely close the db connection """

        self.conn.close()

    def sql_query(self,sql,args,commit=False):
        """ Do a safe SQL query. 
        Turn commit to True for INSERT, UPDATE, and DELETE. """
        
        self.cur.execute(sql,args)
        if commit: 
            self.conn.commit()
            return self.cur.lastrowid
        return self.cur.fetchall()
