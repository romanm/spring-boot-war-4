#!/bin/bash
ROOT=.
#ROOT=/tmp/test
HTTP="/"
OUTPUT="dir-index.html" 

echo "<div>" > $OUTPUT
for filepath in `find "."`; do
	fp=`expr substr $filepath 2 111`
	echo "<div><a href=\""$fp"\">"$fp"</a></div>" >> $OUTPUT
done
echo "</div>" >> $OUTPUT

