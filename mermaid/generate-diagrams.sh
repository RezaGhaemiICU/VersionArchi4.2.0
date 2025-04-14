#!/bin/bash
# generate-diagrams.sh
# diese skript mach .mmd zu svg oder png
# es wird alles in output gespeichert

INPUT_DIR="./mermaid"
OUTPUT_DIR="$INPUT_DIR/output"

mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.mmd; do
  filename=$(basename -- "$file")
  name="${filename%.*}"

  echo "in bearbeitung : $filename"

  npx @mermaid-js/mermaid-cli -i "$file" -o "$OUTPUT_DIR/$name.svg"
  npx @mermaid-js/mermaid-cli -i "$file" -o "$OUTPUT_DIR/$name.png"

done

echo "Alles generieret! → $OUTPUT_DIR"
