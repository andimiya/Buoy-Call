#!/bin/bash

cat /Users/Andrea/Downloads/sharkdata.csv | psql -h localhost -p 5439 -U buoydbuser -d buoydb -c "COPY sharkdata (shark_id,name,\"tagIdNumber\",species,gender,\"stageOfLife\",length,weight,\"tagDate\",\"tagLocation\",description,active,tagid,datetime,latitude,longitude
) FROM STDIN DELIMITER ',' csv header;"
