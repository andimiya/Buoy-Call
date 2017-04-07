#!/bin/bash

yearstart=2014
yearend=2017
buoyidstart=51208
buoyidend=51211

for buoy in $(seq $buoyidstart $buoyidend); do
  for year in $(seq $yearstart $yearend); do
    curl -o buoy${buoy}-${year} http://www.ndbc.noaa.gov/view_text_file.php\?filename=${buoy}h${year}.txt.gz\&dir=data/historical/stdmet/
    firstLine=$(head -n 1 buoy${buoy}-${year})
    if [ "$firstLine" = "Unable to access data file" ]
      then rm buoy${buoy}-${year};
    fi
  done
done
