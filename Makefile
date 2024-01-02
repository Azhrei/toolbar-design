include Makefile.inc

.PHONY: HTML_Files

all: HTML_Files
	#$(MAKE) -C Mine HTML_Files
	#rsync Mersian* ~/public_html/dnd/Campaigns/OrderVsChaos/

upload: all
	#ppp-update

clean:
	rm -rf $(ADOC:.adoc=.html) $(MD:.md=.html) *.svg *.txt *.pdf
