
class Rest:

    def __init__(self,db, crud):
        self.db = db 
        self.crud = crud 

    def create(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.spawn_cursor()
            self.db.cur.execute(self.crud['create'], final_values)
            res = self.db.cur.lastrowid 
            self.db.close_cursor()
            return res
        except Exception as err:
            raise err

    def retrieve(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.spawn_cursor()
            self.db.cur.execute(self.crud['retrieve'],final_values)
            res = self.db.cur.fetchall()
            self.db.close_cursor()
            return res
        except Exception as err:
            raise err

    def update(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.spawn_cursor()
            self.db.cur.execute(self.crud['update'],final_values)
            res = self.db.cur.lastrowid 
            self.db.close_cursor()
            return res
        except Exception as err:
            raise err

    def delete(self, values,middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.spawn_cursor()
            self.db.cur.execute(self.crud['delete'],final_values)
            res =self.db.cur.lastrowid 
            self.db.close_cursor()
            return res
        except Exception as err:
            raise err

    def custom(self, sql, values=None, read_only=True):
        try:
            self.db.spawn_cursor()
            self.db.cur.execute(sql,values)
            if read_only:
                res = self.db.cur.fetchall()
            else:
                res = self.db.cur.lastrowid
            self.db.close_cursor()
            return res
        except Exception as err:
            raise err