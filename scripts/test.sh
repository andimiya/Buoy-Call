#!/bin/bash
declare -a arr="
41001 
41002 
41003 
41004 
41005 
"


for i in $arr; do
  SOURCE=$(curl -L http://www.ndbc.noaa.gov/station_page.php?station=${i})
  ID=$(echo "$SOURCE" | sed 's/;//' | sed "s/'//g" | grep 'var currentstnid' | awk '{print $4}')
  LAT=$(echo "$SOURCE" | sed 's/;//' | grep 'var currentstnlat' | awk '{print $4}')
  LNG=$(echo "$SOURCE" | sed 's/;//' |  grep 'var currentstnlng' | awk '{print $4}')

  echo -n $ID >> coordinates.html 
  echo -n ,$LAT >> coordinates.html
  echo ,$LNG >> coordinates.html
done
