from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData
from flask import Flask, jsonify
pg_connection_string = "postgresql://myuser:mypwd@localhost:5432/mydb"
engine = create_engine(pg_connection_string)
session = Session(engine)
m = MetaData()
Base = automap_base(bind=engine, metadata=m)
Base.prepare(engine, reflect=True)
mytable = Base.classes.mytable
app = Flask(__name__)
@app.route('/')
def home():
    """
    Home page of Corona API.
    """
    return render_template('index.html')
@app.route('/api/v1.0/values_for_date')
def values_for_date():
    # Data (recovered, confirmed, deaths, date, country)
    results = session.query(func.sum(Data.date), 
        func.sum(Data.recovered), 
        func.sum(Data.deaths), 
        func.sum(Data.confirmed))
        .group_by(Data.date)
        .all()
    data = {station:name for station, name in results}
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)
