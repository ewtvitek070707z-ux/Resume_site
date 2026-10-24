"""Generate the explicitly labelled sample CV. Requires reportlab and Arial."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4

root = Path(__file__).resolve().parents[2]
output = root / 'frontend/public/files/nadezhda-resume-sample.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('Arial', 'C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', 'C:/Windows/Fonts/arialbd.ttf'))
doc = canvas.Canvas(str(output), pagesize=A4)
doc.setTitle('Надежда - образец резюме')
doc.setAuthor('Демонстрационный шаблон портфолио')
width, height = A4
ink = HexColor('#24251f')
muted = HexColor('#68685f')
accent = HexColor('#a44429')

def text(x, y, value, size=11, bold=False, color=ink):
    doc.setFillColor(color)
    doc.setFont('ArialBold' if bold else 'Arial', size)
    doc.drawString(x, y, value)

text(48, height - 55, 'ОБРАЗЕЦ / НЕЗАПОЛНЕННЫЙ ШАБЛОН', 10, True, accent)
text(48, height - 112, 'Надежда', 36, True)
text(48, height - 141, 'Графический дизайнер', 15)
text(48, height - 177, 'Документ создан для проверки скачивания резюме на сайте.', 10, color=muted)
text(48, height - 194, 'Он не содержит подтверждённых сведений об опыте или контактах.', 10, color=muted)

sections = [
    ('О СЕБЕ', ['Добавить краткое профессиональное представление.']),
    ('ОПЫТ РАБОТЫ', ['Компания / должность / период работы', 'Основные задачи и результаты: заполнить по настоящему резюме.']),
    ('ОБРАЗОВАНИЕ', ['Учебное заведение / направление / год: заполнить.']),
    ('НАВЫКИ', ['Профессиональные инструменты и направления: заполнить.']),
    ('КОНТАКТЫ И ПОРТФОЛИО', ['Электронная почта, телефон и ссылки: добавить после согласования.']),
]
y = height - 245
for heading, lines in sections:
    doc.setStrokeColor(HexColor('#cac9bf'))
    doc.line(48, y + 13, width - 48, y + 13)
    text(48, y - 10, heading, 10, True)
    for number, line in enumerate(lines):
        text(48, y - 35 - number * 17, line, 10, color=muted)
    y -= 91 if len(lines) > 1 else 78

text(48, 48, 'Перед публикацией заменить настоящим резюме Надежды.', 9, color=accent)
text(width - 55, 48, '1', 9, color=muted)
doc.save()
print('Sample CV PDF generated.')
