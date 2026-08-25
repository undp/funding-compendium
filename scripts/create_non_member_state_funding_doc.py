from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


OUTPUT = Path("Non-Member-State-Funding-2025.docx")
BLUE = "006EB5"
DARK_BLUE = "003B66"
LIGHT_BLUE = "EDF5FA"
PALE_TEAL = "EDF7F7"
WHITE = "FFFFFF"
INK = "232E3D"
MUTED = "526D7D"
GRID = "C5D3DC"
TOTAL_WIDTH = 9360
COL_WIDTHS = [4680, 1560, 1560, 1560]

ROWS = [
    ("European Union", "—", "$312,784,472", "—"),
    ("Financial Institutionsᵃ", "—", "$98,363,895", "—"),
    ("Other Multilaterals", "—", "$11,019,073", "—"),
    ("Private companies", "—", "$39,816,444", "—"),
    ("Foundations", "—", "$28,967,314", "—"),
    ("NGOs", "—", "$19,918,648", "—"),
    ("Academic, training and research institutions", "—", "$728,344", "—"),
    ("UN Agencies", "—", "$69,396,342", "—"),
    ("UN pooled funds", "—", "$233,741,124", "—"),
    ("Vertical Funds", "—", "$825,262,999", "—"),
    ("Others", "—", "$377,220", "—"),
]


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        tc_pr.append(shd)
    shd.set(qn("w:fill"), fill)


def set_cell_width(cell, width):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_w = tc_pr.find(qn("w:tcW"))
    if tc_w is None:
        tc_w = OxmlElement("w:tcW")
        tc_pr.append(tc_w)
    tc_w.set(qn("w:w"), str(width))
    tc_w.set(qn("w:type"), "dxa")


def set_cell_margins(cell, top=100, start=120, bottom=100, end=120):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{margin}"))
        if node is None:
            node = OxmlElement(f"w:{margin}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_table_geometry(table):
    table.alignment = WD_TABLE_ALIGNMENT.LEFT
    table.autofit = False
    tbl_pr = table._tbl.tblPr
    tbl_w = tbl_pr.find(qn("w:tblW"))
    tbl_w.set(qn("w:w"), str(TOTAL_WIDTH))
    tbl_w.set(qn("w:type"), "dxa")
    tbl_ind = OxmlElement("w:tblInd")
    tbl_ind.set(qn("w:w"), "120")
    tbl_ind.set(qn("w:type"), "dxa")
    tbl_pr.append(tbl_ind)
    layout = tbl_pr.find(qn("w:tblLayout"))
    if layout is None:
        layout = OxmlElement("w:tblLayout")
        tbl_pr.append(layout)
    layout.set(qn("w:type"), "fixed")
    grid = table._tbl.tblGrid
    for child in list(grid):
        grid.remove(child)
    for width in COL_WIDTHS:
        col = OxmlElement("w:gridCol")
        col.set(qn("w:w"), str(width))
        grid.append(col)
    for row in table.rows:
        cant_split = OxmlElement("w:cantSplit")
        row._tr.get_or_add_trPr().append(cant_split)
        for cell, width in zip(row.cells, COL_WIDTHS):
            set_cell_width(cell, width)
            set_cell_margins(cell)
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER


def set_run(run, size=10.5, bold=False, color=INK, italic=False):
    run.font.name = "Arial"
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), "Arial")
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), "Arial")
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = RGBColor.from_string(color)


def add_page_field(paragraph):
    paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = paragraph.add_run("Page ")
    set_run(run, size=9, color=MUTED)
    fld = OxmlElement("w:fldSimple")
    fld.set(qn("w:instr"), "PAGE")
    paragraph._p.append(fld)


doc = Document()
section = doc.sections[0]
section.page_width = Inches(8.5)
section.page_height = Inches(11)
section.top_margin = Inches(1)
section.right_margin = Inches(1)
section.bottom_margin = Inches(1)
section.left_margin = Inches(1)
section.header_distance = Inches(0.492)
section.footer_distance = Inches(0.492)

normal = doc.styles["Normal"]
normal.font.name = "Arial"
normal._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
normal.font.size = Pt(10.5)
normal.font.color.rgb = RGBColor.from_string(INK)
normal.paragraph_format.space_after = Pt(6)
normal.paragraph_format.line_spacing = 1.1

for style_name, size, before, after in (("Heading 1", 16, 16, 8), ("Heading 2", 13, 12, 6)):
    style = doc.styles[style_name]
    style.font.name = "Arial"
    style._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    style._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    style.font.size = Pt(size)
    style.font.bold = True
    style.font.color.rgb = RGBColor.from_string(BLUE)
    style.paragraph_format.space_before = Pt(before)
    style.paragraph_format.space_after = Pt(after)
    style.paragraph_format.keep_with_next = True

header = section.header.paragraphs[0]
header.alignment = WD_ALIGN_PARAGRAPH.LEFT
header.paragraph_format.space_after = Pt(0)
set_run(header.add_run("UNDP Funding Compendium 2025"), size=9, bold=True, color=MUTED)
add_page_field(section.footer.paragraphs[0])

kicker = doc.add_paragraph()
kicker.paragraph_format.space_after = Pt(8)
set_run(kicker.add_run("FUNDING REFERENCE"), size=9, bold=True, color=BLUE)

title = doc.add_paragraph()
title.paragraph_format.space_after = Pt(5)
title.paragraph_format.keep_with_next = True
set_run(title.add_run("Contributions to UNDP from\nnon-Member State partner groups"), size=24, bold=True, color=DARK_BLUE)

subtitle = doc.add_paragraph()
subtitle.paragraph_format.space_after = Pt(14)
subtitle.paragraph_format.keep_with_next = True
set_run(subtitle.add_run("Annual contributions, 2025 · United States dollars"), size=11.5, bold=True, color=MUTED)

rule = doc.add_paragraph()
rule.paragraph_format.space_after = Pt(14)
p_pr = rule._p.get_or_add_pPr()
p_bdr = OxmlElement("w:pBdr")
bottom = OxmlElement("w:bottom")
bottom.set(qn("w:val"), "single")
bottom.set(qn("w:sz"), "18")
bottom.set(qn("w:space"), "1")
bottom.set(qn("w:color"), BLUE)
p_bdr.append(bottom)
p_pr.append(p_bdr)

lead = doc.add_paragraph()
lead.paragraph_format.space_after = Pt(14)
set_run(lead.add_run("Non-Member State partner groups contributed "), size=11)
set_run(lead.add_run("$1.64 billion"), size=11, bold=True, color=DARK_BLUE)
set_run(lead.add_run(" to UNDP in 2025. The table below presents contributions by partner group and resource type."), size=11)

table = doc.add_table(rows=1, cols=4)
table.style = "Table Grid"
table.rows[0]._tr.get_or_add_trPr().append(OxmlElement("w:tblHeader"))
headers = ["Non-Member State partner group", "Regular", "Other", "Total"]
for idx, (cell, text) in enumerate(zip(table.rows[0].cells, headers)):
    set_cell_shading(cell, BLUE)
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT if idx == 0 else WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    set_run(p.add_run(text), size=9.5, bold=True, color=WHITE)

for row_idx, values in enumerate(ROWS):
    cells = table.add_row().cells
    if row_idx % 2:
        for cell in cells:
            set_cell_shading(cell, LIGHT_BLUE)
    for idx, (cell, value) in enumerate(zip(cells, values)):
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT if idx == 0 else WD_ALIGN_PARAGRAPH.RIGHT
        p.paragraph_format.space_after = Pt(0)
        set_run(p.add_run(value), size=9.5)

subtotal = table.add_row().cells
for cell in subtotal:
    set_cell_shading(cell, PALE_TEAL)
for idx, value in enumerate(("Total non-Member State partner groups", "—", "$1,640,375,875", "—")):
    p = subtotal[idx].paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT if idx == 0 else WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    set_run(p.add_run(value), size=9.5, bold=True, color=DARK_BLUE)

grand = table.add_row().cells
for cell in grand:
    set_cell_shading(cell, DARK_BLUE)
for idx, value in enumerate(("2025 contributions totalᵇ", "$442M", "$4,598M", "$5,040M")):
    p = grand[idx].paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT if idx == 0 else WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    set_run(p.add_run(value), size=9.5, bold=True, color=WHITE)

set_table_geometry(table)

notes_heading = doc.add_paragraph(style="Heading 2")
notes_heading.paragraph_format.keep_with_next = True
notes_heading.add_run("Notes")

notes = [
    ("a", "Reflects direct grants received by UNDP; excludes loans extended to programme country governments and received by UNDP as government financing, and grants received from the German Development Bank (KfW), which are reported under Germany."),
    ("b", "Amounts are rounded to the nearest million. Includes core contributions for 2024 received in 2025 and core contributions for 2026 received in 2025."),
]
for marker, text in notes:
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.22)
    p.paragraph_format.first_line_indent = Inches(-0.22)
    p.paragraph_format.space_after = Pt(5)
    set_run(p.add_run(f"{marker}. "), size=9.5, bold=True, color=BLUE)
    set_run(p.add_run(text), size=9.5, color=MUTED)

source = doc.add_paragraph()
source.paragraph_format.space_before = Pt(4)
source.paragraph_format.space_after = Pt(0)
set_run(source.add_run("Source: "), size=9, bold=True, color=MUTED)
set_run(source.add_run("UNDP Funding Compendium 2025."), size=9, italic=True, color=MUTED)

doc.core_properties.title = "Contributions to UNDP from non-Member State partner groups, 2025"
doc.core_properties.subject = "UNDP Funding Compendium 2025"
doc.core_properties.author = "United Nations Development Programme"
doc.core_properties.keywords = "UNDP, funding, contributions, non-Member State partners, 2025"
doc.save(OUTPUT)
print(OUTPUT.resolve())
