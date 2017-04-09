#!/bin/bash

psql -d buoy --user=andrea -c "COPY buoydata FROM '/Users/Andrea/DevLeague/Final-Project/data/csvs/buoy51209-2015.csv' delimiter ',' csv header;"
