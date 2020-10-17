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
mlb = Base.classes.mlb

print(Tables)