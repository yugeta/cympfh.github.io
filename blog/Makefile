ACH='/tmp/achieve'
REC='/tmp/recent'

all : index.html

index.html : achieve recent
	echo '<!DOCTYPE html>' > $@
	echo '<head>' >> $@
	echo '<style>' >> $@
	echo 'code{border-left:10px black solid;margin-left:10px;padding:0 7px;display:block}' >> $@
	echo '</style>' >> $@
	echo '<body>' >> $@
	echo '<pre>' >> $@
	echo 'Recent:' >> $@
	cat /tmp/recent >> $@
	echo 'All:' >> $@
	cat /tmp/achieve >> $@
	date >> $@

achieve: 
	echo '<pre>' > ${ACH}
	ls -BGgth *.txt | sed 's/[^ ]*$$/<a href="&">&<\/a>/' >> ${ACH}

recent:
	ls -1t *.txt | head -n3 | xargs -n1 -i bash -c "echo '<a href={}>{}</a><code>'; head -n3 {}; echo '</code>'" > ${REC}

