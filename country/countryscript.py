#! /usr/bin/env python

wr = open('hacky.txt', 'w')
with open('countries.geojson', 'r') as f:
    for line in f:
        c = line.split(':')[1].strip().replace('"','')
        wr.write('<option value="'+c+'"> '+c+' </option>\n')
wr.close()
