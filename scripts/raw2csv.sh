#!/bin/bash

# get the file
# open in text editor?

filename=buoy51208-2014
sed 's/ \{1,\}/,/g' $filename
#
# yearstart=2014
# yearend=2017
# buoyidstart=51208
# buoyidend=51211
#
# for buoy in $(seq $buoyidstart $buoyidend); do
#   for year in $(seq $yearstart $yearend); do
#   filename=buoy${buoy}-${year}
#
#   done
# done
