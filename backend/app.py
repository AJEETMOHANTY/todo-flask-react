from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    port=3306,
    database="todo_db"
)

cursor = db.cursor(dictionary=True)

@app.route("/tasks", methods=["GET"])
def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return jsonify(cursor.fetchall())

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    cursor.execute(
        "INSERT INTO tasks (title) VALUES (%s)",
        (data["title"],)
    )
    db.commit()
    return jsonify({"message": "Task added"})

@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    cursor.execute(
        "UPDATE tasks SET completed = NOT completed WHERE id = %s",
        (id,)
    )
    db.commit()
    return jsonify({"message": "Task updated"})

@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    cursor.execute("DELETE FROM tasks WHERE id = %s", (id,))
    db.commit()
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
