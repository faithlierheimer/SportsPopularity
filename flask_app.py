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
engine = create_engine('sqlite:///sports.db')

## Declare a base
Base = automap_base()

## Use a base class to reflect NFL db tables
Base.prepare(engine, reflect = True)

## Double check connection brought in right tables 
Tables = Base.classes.keys()

#Save nfl table ref to its own variable
Nfl_prices = Base.classes.nfl_prices
Nba_prices = Base.classes.nba_prices
Mlb_prices = Base.classes.mlb_prices
Nhl_prices = Base.classes.nhl_prices

#Create a session to manage transactions to sqlite db
session = Session(engine)

##Get nfl data in so it can be jsonified?
# nfl_tickets = session.query(Nfl_prices.team, Nfl_prices.price, Nfl_prices.lat, Nfl_prices.long)
# nfl_tickets_df = pd.DataFrame(nfl_tickets, columns=['team', 'tic_price', 'lat', 'long'])
# nfl_tickets_dict = nfl_tickets_df.to_dict('records')
# nfl_tickets_dict.pop()

# ##Get mlb data 
# mlb_tickets_df = pd.DataFrame(mlb_tickets, columns=['team', 'tic_price', 'lat', 'long'])
# mlb_tickets = session.query(mlb_prices.team, mlb_prices.price, mlb_prices.lat, mlb_prices.long)
# mlb_tickets_dict = mlb_tickets_df.to_dict('records')
# mlb_tickets_dict.pop()

# # ##Get nba data 
# nba_tickets_df = pd.DataFrame(nba_tickets, columns=['team', 'tic_price', 'lat', 'long'])
# nba_tickets = session.query(Nba_prices.team, Nba_prices.price, Nba_prices.lat, Nba_prices.long)
# nba_tickets_dict = nba_tickets_df.to_dict('records')
# nba_tickets_dict.pop()

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    print("Sports Rule and Sports Drool.")
    return "Sports Rule and Sports Drool."
    
    # <a ref="/api/v1.0/nfl">nfl</a>
    # <a href="/api/v1.0/nba">nba</a>
    # <a href="/api/v1.0/mlb">mlb</a>
    # <a href="/api/v1.0/nhl">nhl</a>
    # return 

@app.route("/api/v1.0/nfl")
def nfl_tickets():
    nfl_tickets = session.query(Nfl_prices.team, Nfl_prices.price, Nfl_prices.lat, Nfl_prices.long)
    nfl_tickets_df = pd.DataFrame(nfl_tickets, columns=['team', 'tic_price', 'lat', 'long'])
    nfl_tickets_dict = nfl_tickets_df.to_dict('records')
    nfl_tickets_dict.pop()
    session.close()
    print("NFL Ticket Prices")
    nfl_json = jsonify(nfl_tickets_dict)
    return nfl_json

@app.route("/api/v1.0/nba")
def nba_tickets():
    nba_tickets = session.query(Nba_prices.team, Nba_prices.price, Nba_prices.lat, Nba_prices.long)
    nba_tickets_df = pd.DataFrame(nba_tickets, columns=['team', 'tic_price', 'lat', 'long'])
    nba_tickets_dict = nba_tickets_df.to_dict('records')
    nba_tickets_dict.pop()
    session.close()
    print("NBA Ticket Prices")
    nba_json = jsonify(nba_tickets_dict)
    return nba_json

@app.route("/api/v1.0/mlb")
def mlb_tickets():
    mlb_tickets = session.query(Mlb_prices.team, Mlb_prices.price, Mlb_prices.lat, Mlb_prices.long)
    mlb_tickets_df = pd.DataFrame(mlb_tickets, columns=['team', 'tic_price', 'lat', 'long'])
    mlb_tickets_dict = mlb_tickets_df.to_dict('records')
    mlb_tickets_dict.pop()
    session.close()
    print("mlb Ticket Prices")
    mlb_json = jsonify(mlb_tickets_dict)
    return mlb_json

@app.route("/api/v1.0/nhl")
def nhl_tickets():
    nhl_tickets = session.query(Nhl_prices.team, Nhl_prices.price, Nhl_prices.lat, Nhl_prices.long)
    nhl_tickets_df = pd.DataFrame(nhl_tickets, columns=['team', 'tic_price', 'lat', 'long'])
    nhl_tickets_dict = nhl_tickets_df.to_dict('records')
    nhl_tickets_dict.pop()
    session.close()
    print("nhl Ticket Prices")
    nhl_json = jsonify(nhl_tickets_dict)
    return nhl_json

if __name__ == "__main__":
    app.run(debug=True)