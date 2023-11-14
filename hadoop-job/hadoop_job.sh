#!/bin/bash

# Docker container name or ID
HADOOP_CONTAINER=wikipediacrawler-main-resourcemanager-1

# Path to Hadoop home within the container
HADOOP_HOME=/opt/hadoop

# Local input directory
LOCAL_INPUT_DIR=../web-crawler/output_pages

# Clean up Hadoop input directory
docker exec -it $HADOOP_CONTAINER rm -rf /home/input_dir/*

# Copy all files from local input directory to Hadoop container
docker cp $LOCAL_INPUT_DIR/. $HADOOP_CONTAINER:/home/input_dir

# Copy necessary files to Hadoop container
docker cp mapper.py $HADOOP_CONTAINER:$HADOOP_HOME
docker cp reducer.py $HADOOP_CONTAINER:$HADOOP_HOME
docker cp process_and_insert.py $HADOOP_CONTAINER:$HADOOP_HOME

# Hadoop Streaming command to run the MapReduce job
docker exec -it $HADOOP_CONTAINER \
  $HADOOP_HOME/bin/hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-3.3.6.jar \
  -files $HADOOP_HOME/mapper.py,$HADOOP_HOME/reducer.py -mapper mapper.py -reducer reducer.py \
  -input /home/input_dir/* -output /home/output_dir

# Process the output and insert into MariaDB
docker exec -it $HADOOP_CONTAINER \
  $HADOOP_HOME/bin/hadoop fs -cat /home/part* | python $HADOOP_HOME/process_and_insert.py

# Clean up Hadoop output directory
docker exec -it $HADOOP_CONTAINER \
  $HADOOP_HOME/bin/hadoop fs -rm -r /home/output_dir
