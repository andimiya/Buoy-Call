#!/bin/bash

# get the file
# open in text editor?
#
filename=../data/buoy51208-2016
# sed 's/ \{1,\}/,/g' $filename | awk 'NR != 2' | cut -d "#" -f 2| head
# sed 's/'mm'/month/g' $filename |  awk 'NR != 2' | cut -d "#" -f 2| head


yearstart=2015
yearend=2016
buoyidstart=51208
buoyidend=51209

for buoy in $(seq $buoyidstart $buoyidend); do
  for year in $(seq $yearstart $yearend); do
    filename=../data/buoy${buoy}-${year}
    # echo $filename
    csv=../data/csvs/buoy${buoy}-${year}.csv

    cat $filename | sed 's/ \{1,\}/,/g' | sed 's/'mm'/month/g' | awk 'NR != 2' | cut -d "#" -f 2 > $csv
  done
done
