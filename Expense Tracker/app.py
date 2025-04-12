from flask import Flask, request, jsonify, render_template
from datetime import datetime

app = Flask(__name__)
expenses = []  # In-memory list instead of file

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_expense():
    data = request.json
    try:
        amount = float(data['amount'])
        if amount <= 0:
            return jsonify({'error': 'Amount must be positive'}), 400

        expense = {
            "amount": amount,
            "category": data['category'],
            "description": data['description'],
            "date": datetime.now().strftime("%Y-%m-%d")
        }

        expenses.append(expense)
        return jsonify({'message': 'Expense added successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/expenses', methods=['GET'])
def view_expenses():
    return jsonify(expenses)

@app.route('/summary/monthly', methods=['GET'])
def monthly_summary():
    summary = {}
    for expense in expenses:
        month = expense['date'][:7]
        summary[month] = summary.get(month, 0) + expense['amount']
    return jsonify(summary)

@app.route('/summary/category', methods=['GET'])
def category_summary():
    summary = {}
    for expense in expenses:
        category = expense['category']
        summary[category] = summary.get(category, 0) + expense['amount']
    return jsonify(summary)

if __name__ == "__main__":
    app.run(debug=True)
