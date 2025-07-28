from flask import Flask, request, render_template, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# RDS Connection
conn = pymysql.connect(
    host='localhost',
    user='admin',
    password='admin@123',
    db='student_db',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    marks = data['marks']
    with conn.cursor() as cursor:
        sql = "INSERT INTO students (name, email, marks) VALUES (%s, %s, %s)"
        cursor.execute(sql, (name, email, marks))
        conn.commit()
    return jsonify({"message": "Student Registered"}), 201

@app.route('/students', methods=['GET'])
def get_students():
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM students")
        rows = cursor.fetchall()
    return jsonify(rows), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
