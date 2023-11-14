#!/usr/bin/env python

import sys
import csv
from stemming.porter2 import stem

for line in sys.stdin:
    row = next(csv.reader([line]))
    url = row[0]
    title = row[1]
    subtitles = row[2]
    text = row[3]

    words = [stem(word) for field in [title, subtitles, text] for word in field.split()]
    for word in words:
        print(f"{word}\t1")
