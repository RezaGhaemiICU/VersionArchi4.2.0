#!/bin/bash
# generate-diagrams.sh
# این اسکریپت همه فایل‌های .mmd رو از مسیر mermaid/ می‌گیره و به SVG و PNG تبدیل می‌کنه
# خروجی‌ها در mermaid/output ذخیره می‌شن

INPUT_DIR="./mermaid"
OUTPUT_DIR="$INPUT_DIR/output"

mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.mmd; do
  filename=$(basename -- "$file")
  name="${filename%.*}"

  echo " در حال تبدیل فایل: $filename"

  npx @mermaid-js/mermaid-cli -i "$file" -o "$OUTPUT_DIR/$name.svg"
  npx @mermaid-js/mermaid-cli -i "$file" -o "$OUTPUT_DIR/$name.png"

done

echo "همه دیاگرام‌ها ساخته شدن! → $OUTPUT_DIR"
