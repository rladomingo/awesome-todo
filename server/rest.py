
class Rest:

    def __init__(self,db, crud):
        self.db = db 
        self.crud = crud 

    def create(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.cur.execute(self.crud['create'], final_values)
            return True
        except Exception as err:
            raise err

    def retrieve(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.cur.execute(self.crud['retrieve'],final_values)
            return self.db.cur.fetchall()
        except Exception as err:
            raise err

    def update(self, values, middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.cur.execute(self.crud['update'],final_values)
            return True
        except Exception as err:
            raise err

    def delete(self, values,middleware=None):
        try:
            final_values = values if not middleware else middleware(values)
            self.db.cur.execute(self.crud['delete'],final_values)
            return True
        except Exception as err:
            raise err