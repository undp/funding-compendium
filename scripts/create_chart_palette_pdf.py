from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "funding-compendium-chart-color-palette.pdf"

GROUPS = [
    ("Resource colors", [
        ("Regular resources", "#C3D51F"),
        ("Other resources", "#0069B3"),
    ]),
    ("Primary categorical colors", [
        ("Teal", "#3D9999"),
        ("Purple", "#8964BC"),
        ("Orange", "#E86B2E"),
        ("Gold", "#AD7F00"),
    ]),
    ("Extended categorical colors", [
        ("Light teal", "#6EB3B3"),
        ("Light purple", "#A58ACB"),
        ("Light orange", "#EE8C5B"),
        ("Light gold", "#C69E2D"),
        ("Dark teal", "#267878"),
        ("Dark purple", "#694596"),
        ("Dark orange", "#B94E1C"),
        ("Dark gold", "#805E00"),
    ]),
]

SEMANTIC = [
    ("Africa", "#C69E2D"), ("Asia and the Pacific", "#E86B2E"),
    ("Arab States", "#8964BC"), ("Latin America and Caribbean", "#3D9999"),
    ("Europe and Central Asia", "#C3D51F"), ("Global", "#0069B3"),
    ("IFI direct", "#E86B2E"), ("IFI indirect", "#3D9999"),
]


def draw_swatch(pdf, x, y, label, hex_code, width=224):
    pdf.setStrokeColor(HexColor("#C5CBD1"))
    pdf.setFillColor(HexColor(hex_code))
    pdf.roundRect(x, y - 25, 42, 25, 3, fill=1, stroke=1)
    pdf.setFillColor(HexColor("#232E3D"))
    pdf.setFont("Helvetica-Bold", 9.5)
    pdf.drawString(x + 52, y - 10, label)
    pdf.setFont("Helvetica", 9)
    pdf.setFillColor(HexColor("#59636E"))
    pdf.drawString(x + 52, y - 23, hex_code)
    return width


def create_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    page_w, page_h = landscape(letter)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=(page_w, page_h))
    pdf.setTitle("Funding Compendium Chart Color Palette")
    pdf.setAuthor("UNDP Funding Compendium")

    pdf.setFillColor(HexColor("#F4F9FC"))
    pdf.rect(0, 0, page_w, page_h, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#0069B3"))
    pdf.rect(0, page_h - 9, page_w, 9, fill=1, stroke=0)

    margin = 42
    pdf.setFillColor(HexColor("#232E3D"))
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(margin, page_h - 49, "Funding Compendium chart color palette")
    pdf.setFont("Helvetica", 9.5)
    pdf.setFillColor(HexColor("#59636E"))
    pdf.drawString(margin, page_h - 67, "Desktop chart reference - canonical colors from src/assets/js/charts/chartColors.js")

    card_top = page_h - 91
    card_h = 306
    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setStrokeColor(HexColor("#D8DDE3"))
    pdf.roundRect(margin, card_top - card_h, page_w - 2 * margin, card_h, 8, fill=1, stroke=1)

    x_positions = [margin + 20, margin + 252, margin + 484]
    for (title, colors), x in zip(GROUPS, x_positions):
        y = card_top - 28
        pdf.setFillColor(HexColor("#303944"))
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(x, y, title)
        y -= 20
        for label, code in colors:
            draw_swatch(pdf, x, y, label, code)
            y -= 32

    semantic_top = 174
    pdf.setFillColor(HexColor("#232E3D"))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(margin, semantic_top, "Semantic assignments")
    pdf.setFont("Helvetica", 8.5)
    pdf.setFillColor(HexColor("#59636E"))
    pdf.drawString(margin + 132, semantic_top, "Use these mappings consistently across regional and IFI comparison charts.")

    col_w = (page_w - 2 * margin) / 4
    for index, (label, code) in enumerate(SEMANTIC):
        col = index % 4
        row = index // 4
        x = margin + col * col_w
        y = semantic_top - 23 - row * 41
        pdf.setFillColor(HexColor(code))
        pdf.setStrokeColor(HexColor("#C5CBD1"))
        pdf.rect(x, y - 17, 30, 17, fill=1, stroke=1)
        pdf.setFillColor(HexColor("#303944"))
        pdf.setFont("Helvetica-Bold", 8.5)
        max_label_w = col_w - 42
        shown = label
        while stringWidth(shown, "Helvetica-Bold", 8.5) > max_label_w and len(shown) > 4:
            shown = shown[:-2]
        if shown != label:
            shown = shown.rstrip() + "..."
        pdf.drawString(x + 38, y - 7, shown)
        pdf.setFont("Helvetica", 8)
        pdf.setFillColor(HexColor("#59636E"))
        pdf.drawString(x + 38, y - 17, code)

    pdf.setFillColor(HexColor("#7A838F"))
    pdf.setFont("Helvetica", 7.5)
    pdf.drawRightString(page_w - margin, 24, "Funding Compendium - chart palette reference")
    pdf.save()


if __name__ == "__main__":
    create_pdf()
    print(OUTPUT)
