import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import json
from flask import Flask, jsonify
from flask_cors import CORS,cross_origin

engine = create_engine("sqlite:///sports.db")
connection = engine.connect()

Base=automap_base()
Base.prepare(engine, reflect=True)
nba_data=Base.classes.nba_table

app=Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    return(
        f"""Welcome to my api! <br>
        Below are the available api routes!<br>
        /api/v1.0/nba"""
    )

@app.route("/api/v1.0/nba")
def nba_fetch():
    session=Session(engine)
    nba_info=session.query(nba_data.Arena, nba_data.Capacity, nba_data.Lat, nba_data.Lng, nba_data.team, nba_data.total_attendance).all()
    session.close()

    nba_table=pd.DataFrame(nba_info,columns=['Arena','Capacity','Lat','Lng','Team','Total_attendance'])
    nba_dict=nba_table.to_dict('records')
    
    return jsonify(nba_dict)


if __name__ == '__main__':
    app.run(debug=True)