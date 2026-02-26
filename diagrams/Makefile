# Makefile for Diagrams (Located in diagrams/)

# Tools
PUML = plantuml
IMG_DIR = .

# List of source files
SOURCES = $(wildcard *.puml)

# Targets
OUTPUTS = $(patsubst %.puml, %.png, $(SOURCES))

.PHONY: all clean

all: $(OUTPUTS)

# Rule for PlantUML compilation
%.png: %.puml
	@echo "Compiling PlantUML: $< -> $@"
	$(PUML) -tpng $<

clean:
	rm -f *.png
