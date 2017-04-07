#!/bin/bash

yearstart=2000
yearend=2017
buoyidstart=51208
buoyidend=51211
url=http://www.ndbc.noaa.gov/view_text_file.php\?filename=$buoyidstart h2016.txt.gz\&dir=data/historical/stdmet/

for buoy in $(seq $buoyidstart $buoyidend); do
  for year in $(seq $yearstart $yearend); do
    echo "hello-${buoy}-${year}-world"
  done
done

test=

curl -o buoydata $test
