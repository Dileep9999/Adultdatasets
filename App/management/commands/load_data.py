import csv
from django.core.management import BaseCommand
from App.models import AdultData

class Command(BaseCommand):
    help = 'Load a data csv file into the database'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        path = kwargs['path']
        with open(path, 'rt') as f:
            reader = csv.reader(f, dialect='excel',skipinitialspace=True,delimiter=',', quoting=csv.QUOTE_NONE)
            next(reader)
            for row in reader:
                try:
                    if row[9].strip():
                        question = AdultData.objects.create(
                        age=row[0].strip(),
                        work=row[1].strip(),
                        fnlwgt=row[2].strip(),
                        education=row[3].strip(),
                        education_num=row[4].strip(),
                        marital_status=row[5].strip(),
                        occupation=row[6].strip(),
                        relationship=row[7].strip(),
                        race=row[8].strip(),
                        sex=row[9].strip(),
                        capital_gain=row[10].strip(),
                        capital_loss=row[11].strip(),
                        hours_per_week=row[12].strip(),
                        native_country=row[13].strip(),
                        salary=row[14].strip(),
                    )
            
                except Exception as e:
                    print(e)
                    pass
            print('+++++++++++++++++')
            print('Data has been loaded..')
            print('+++++++++++++++++')