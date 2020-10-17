#Import flask
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

#Import dependencies for queries to include in endpoints
############################
from matplotlib import style
style.use('seaborn')
import matplotlib.pyplot as plt   
import numpy as np                          
import pandas as pd
import datetime as dt
import pprint as pp
from datetime import timedelta

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

##########################
#Set up connection to sqlite database
## Create engine
engine = create_engine('sqlite:///sports.db')

## Declare a base
Base = automap_base()

## Use a base class to reflect NFL db tables
Base.prepare(engine, reflect = True)

## Double check connection brought in right tables 
Tables = Base.classes.keys()

#Save nfl table ref to its own variable
nfl = Base.classes.nfl
mlb3 = Base.classes.mlb3

#Create a session to manage transactions to sqlite db
session = Session(engine)

##Get nfl data in so it can be jsonified?
nfl_att = session.query(nfl.team, nfl.total_attendance, nfl.lat, nfl.long)
nfl_att_df = pd.DataFrame(nfl_att, columns=['team', 'attendance', 'lat', 'long'])
nfl_dict = nfl_att_df.to_dict('records')

##Get mlb data 
mlb_att = session.query(mlb3.Team_Names, mlb3.Home_attendance, mlb3.Per_Game, mlb3.Lat, mlb3.Long)
mlb_att_df = pd.DataFrame(mlb_att, columns = ['team', 'attendance', 'per_game', 'lat', 'long'])
mlb_dict = mlb_att_df.to_dict('records')
# print(nfl_dict)

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    print("Server received request for homepage.")
    return """Available routes: 
            FILL IN AVAILABLE ROUTES LATER"""

@app.route("/api/v1.0/nfl")
def nfl_attendance():
    print("Server received request for NFL map page")
    nfl_json = jsonify(nfl_dict)
    return nfl_json
@app.route("/api/v1.0/mlb")
def mlb_attendance():
    print("Its baseball")
    mlb_json = jsonify(mlb_dict)
    return mlb_json
if __name__ == "__main__":
    app.run(debug=True)