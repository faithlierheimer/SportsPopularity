import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import json
from flask import Flask, jsonify

engine = create_engine("sqlite:///Resources/nba_data.sqlite")
connection = engine.connect()

Base=automap_base()
Base.prepare(engine, reflect=True)
nba_data=Base.classes.nba_table

app=Flask(__name__)

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
    
    nba_results=[]
    for a,c,la,ln,te,to in nba_info:
        nba_dict={}
        nba_dict["Arena"]=a
        nba_dict["Team"]=te
        nba_dict["Total_attendance"]=to
        nba_dict["Capacity"]=c
        nba_dict["Lat"]=la
        nba_dict["Lng"]=ln
        nba_results.append(nba_dict)
    return jsonify(nba_results)


if __name__ == '__main__':
    app.run(debug=True)