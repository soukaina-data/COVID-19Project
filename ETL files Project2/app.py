from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData, func, Table, Column, Integer
from flask import Flask, jsonify
import psycopg2

pg_connection_string = "postgresql://postgres:lol123lol@localhost:5432/COVID"
engine = create_engine(pg_connection_string)
session = Session(engine)
m = MetaData()

Base = automap_base(bind=engine, metadata=m)
Base.prepare(engine, reflect=True)

print(Base.classes.keys())
covid = Base.classes.covid
confirmed_by_date = Table("confirmed_by_date", m, autoload=True)


app = Flask(__name__)

@app.route('/api/v1.0/confirmed_by_date')
def confirmed_by_date_old():
    conn = psycopg2.connect(pg_connection_string)
    cur = conn.cursor()
    cur.execute('SELECT * FROM confirmed_by_date')
    records = cur.fetchall()
    cur.close()
    return jsonify(records)

@app.route('/api/v1.0/values_for_date')
def values_for_date():
    # Data (recovered, confirmed, deaths, date, country)
    results = session.query(func.min(covid.date), 
        func.sum(covid.recovered), 
        func.sum(covid.deaths), 
        func.sum(covid.confirmed)).group_by(covid.date).all()
    print(results)
    #covid = {station:name for station, name in results}
    return jsonify(results)

@app.route('/api/v1.0/latlong')
def latlong():
    # Data (recovered, confirmed, deaths, date, country)
    results = session.query(covid.country, covid.lat, covid.long).all()
    return jsonify(results)

@app.route('/api/v1.0/all_data')
def all_data():
    results = session.query(covid.date, covid.city, covid.country, covid.confirmed, covid.deaths, covid.recovered, covid.lat, covid.long).all()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)

# http://localhost:5000/api/v1.0/values_for_date
# D3.json('http://localhost:5000/api/v1.0/values_for_date')
# D3.json('values_for_date.json')