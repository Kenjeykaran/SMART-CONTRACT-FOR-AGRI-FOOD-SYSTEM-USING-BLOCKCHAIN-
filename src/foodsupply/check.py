import sqlite3 as sq

mydb = sq.connect("food.db")
mycursor = mydb.cursor()
tx="drop table transaction"
mycursor.execute(tx)
mydb.commit()
mydb.close()
