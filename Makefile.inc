ADOC = $(wildcard *.adoc)
ADOC_OPTS = $(A) -b html5 -a PLANTUML
MD = $(wildcard *.md)
MD_OPTS = $(M)

HTML_Files: $(ADOC:.adoc=.html) $(MD:.md=.html)

%.html: %.adoc
	asciidoc $(ADOC_OPTS) '$^'

%.html: %.md
	pandoc --template=html5 $(MD_OPTS) -o '${^:.md=.html}' '$^'
