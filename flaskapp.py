#Import flask
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

#Import dependencies for queries to include in endpoints
############################
# from matplotlib import style
# style.use('seaborn')
# import matplotlib.pyplot as plt   
# import numpy as np                          
import pandas as pd
# import datetime as dt
# import pprint as pp
# from datetime import timedelta

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

##########################
#Set up connection to sqlite database
## Create engine
###THIS WILL ONLY WORK IF SUBSEQUENT DATA HAS GONE THRU THE "ADD A PRIMARY KEY" PROCESS THAT KEVIN WALKED US THROUGH.
engine = create_engine('sqlite:///sports.db')

## Declare a base
Base = automap_base()

## Use a base class to reflect NFL db tables
Base.prepare(engine, reflect = True)

## Double check connection brought in right tables 
Tables = Base.classes.keys()

#Save nfl table ref to its own variable
####USE THIS FORMAT TO SAVE TABLE REFS TO OWN VARIABLES FOR NHL, NBA, AND TICKET DATA. 
nfl = Base.classes.nfl
mlb3 = Base.classes.mlb3
nba_data=Base.classes.nba_table

#Create a session to manage transactions to sqlite db
session = Session(engine)

##Get nfl data in so it can be jsonified
nfl_att = session.query(nfl.team, nfl.total_attendance, nfl.lat, nfl.long)
##these column names below are custom---i made them slightly different than what is in the
## actual df in jupyter notebook for ease of referencing in the logic.js. 
nfl_att_df = pd.DataFrame(nfl_att, columns=['team', 'attendance', 'lat', 'long'])
nfl_dict = nfl_att_df.to_dict('records')

##Get mlb data  in via session.query so the dictionary can eventually be jsonified. 
mlb_att = session.query(mlb3.Team_Names, mlb3.Home_attendance, mlb3.Per_Game, mlb3.Lat, mlb3.Long)
## See above notes in line 47 re: column names 
mlb_att_df = pd.DataFrame(mlb_att, columns = ['team', 'attendance', 'per_game', 'lat', 'long'])
mlb_dict = mlb_att_df.to_dict('records')

##NBA DATA TO DICTIONARY USING RECORDS METHOD TO EVENTUALLY BE JSONIFIED## 
nba_info=session.query(nba_data.Arena, nba_data.Capacity, nba_data.Lat, nba_data.Lng, nba_data.team, nba_data.total_attendance).all()
nba_table=pd.DataFrame(nba_info,columns=['Arena','Capacity','Lat','Lng','Team','Total_attendance'])
nba_dict=nba_table.to_dict('records')

##NHL DATA TO DICTIONARY USING RECORDS METHOD TO EVENTUALLY BE JSONIFIED## 

##TICKET DATA TO DICTIONARY USING RECORDS METHOD TO EVENTUALLY BE JSONIFIED##

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
###lol can someone else fill in the available routes & maybe make them clickable?
##look for sqlalchemy hw, i'm pretty sure there's an example there
    print("Server received request for homepage.")
    return """Available routes: 
            FILL IN AVAILABLE ROUTES LATER"""

@app.route("/api/v1.0/sports_attendance")
def nfl_mlb_attendance():
    print("Server received request for NFL map page")
    ## In order to return multiple JSONs in one API endpoint, we have to 
    ## put each dictionary of data into a bigger dictionary like below, and then 
    ##the json will be labeled appropriately and we can grab it how we figured out
    ## in class the other day. 
    sport = {
        "nfl": nfl_dict,
        "mlb": mlb_dict,
        "nba": nba_dict
    }
    sports = jsonify(sport)
    return sports
if __name__ == "__main__":
    app.run(debug=True)