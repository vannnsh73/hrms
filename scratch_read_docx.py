import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(docx_path):
    # docx is a zip file, we can read word/document.xml
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        
    root = ET.fromstring(xml_content)
    
    # namespaces in docx
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    paragraphs = []
    # Find all paragraph elements
    for para in root.findall('.//w:p', ns):
        # For each paragraph, extract text from all run elements
        texts = []
        for run in para.findall('.//w:t', ns):
            if run.text:
                texts.append(run.text)
        if texts:
            paragraphs.append("".join(texts))
        else:
            paragraphs.append("")
            
    return paragraphs

if __name__ == '__main__':
    docx_path = r"d:\jecrc assesment\Global-HRMS-Product-Specification.docx"
    if os.path.exists(docx_path):
        paras = read_docx(docx_path)
        print(f"Total paragraphs: {len(paras)}")
        # Save to markdown text file in scratch
        out_path = r"d:\jecrc assesment\scratch_docx_content.md"
        with open(out_path, "w", encoding="utf-8") as f:
            for p in paras:
                f.write(p + "\n\n")
        print(f"Saved content to {out_path}")
    else:
        print("Docx not found")
