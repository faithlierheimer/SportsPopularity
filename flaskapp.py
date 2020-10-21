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
###THIS WILL ONLY WORK IF SUBSEQUENT DATA HAS GONE THRU THE "ADD A PRIMARY KEY" PROCESS THAT KEVIN WALKED US THROUGH.
engine = create_engine('sqlite:///sports.db')
engine2 = create_engine('sqlite:///sports_nfl.db')
engine3 = create_engine('sqlite:///sports_tickets.db')
engine4 = create_engine('sqlite:///sports_nhl.db')
## Declare a base
Base = automap_base()
Base2 = automap_base()
Base3 = automap_base()
Base4 = automap_base()
## Use a base class to reflect NFL db tables
Base.prepare(engine, reflect = True)
Base2.prepare(engine2, reflect = True)
Base3.prepare(engine3, reflect = True)
Base4.prepare(engine4, reflect = True)
## Double check connection brought in right tables 
Tables = Base.classes.keys()
Tables2 = Base2.classes.keys()
Tables3 = Base3.classes.keys()
Tables4 = Base4.classes.keys()

#Save nfl table ref to its own variable
####USE THIS FORMAT TO SAVE TABLE REFS TO OWN VARIABLES FOR NHL, NBA, AND TICKET DATA. 
nfl = Base2.classes.nfl
mlb3 = Base.classes.mlb3
nba_data=Base.classes.nba_table
Nfl_prices = Base3.classes.nfl_prices
Nba_prices = Base3.classes.nba_prices
Mlb_prices = Base3.classes.mlb_prices
Nhl_prices = Base3.classes.nhl_prices
nhl_data = Base4.classes.nhl3
#Create a session to manage transactions to sqlite db
session = Session(engine)
session2 = Session(engine2)
session3 = Session(engine3)
session4 = Session(engine4)
##Get nfl data in so it can be jsonified
nfl_att = session2.query(nfl.team, nfl.total_attendance, nfl.lat, nfl.long)
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
#nhl ticket data 
nhl = session4.query(nhl_data.team, nhl_data.attendance, nhl_data.Lat, nhl_data.Lng)
nhl_df = pd.DataFrame(nhl, columns=['team', 'attendance', 'lat', 'long'])
nhl_dict = nhl_df.to_dict('records')
##TICKET DATA TO DICTIONARY USING RECORDS METHOD TO EVENTUALLY BE JSONIFIED##

#nfl ticket data
nfl_tickets = session3.query(Nfl_prices.team, Nfl_prices.price, Nfl_prices.lat, Nfl_prices.long)
nfl_tickets_df = pd.DataFrame(nfl_tickets, columns=['team', 'tic_price', 'lat', 'long'])
nfl_tickets_dict = nfl_tickets_df.to_dict('records')

#Mlb ticket data
mlb_tickets = session3.query(Mlb_prices.team, Mlb_prices.price, Mlb_prices.lat, Mlb_prices.long)
mlb_tickets_df = pd.DataFrame(mlb_tickets, columns=['team', 'tic_price', 'lat', 'long'])
mlb_tickets_dict = mlb_tickets_df.to_dict('records')

#nba ticket data 
nba_tickets = session3.query(Nba_prices.team, Nba_prices.price, Nba_prices.lat, Nba_prices.long)
nba_tickets_df = pd.DataFrame(nba_tickets, columns=['team', 'tic_price', 'lat', 'long'])
nba_tickets_dict = nba_tickets_df.to_dict('records')



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
        "nba": nba_dict,
        "nhl": nhl_dict,
        "nfl_tickets": nfl_tickets_dict,
        "nba_tickets": nba_tickets_dict,
        "mlb_tickets": mlb_tickets_dict
    }
    sports = jsonify(sport)
    return sports
if __name__ == "__main__":
    app.run(debug=True)