import os
import pandas as pd
import xml.etree.ElementTree as ET
import numpy as np
from django.core.management.base import BaseCommand
from poi.models import PointOfInterest

def read_csv(file_path):
    df = pd.read_csv(file_path, low_memory=False)

    ratings_index = df.columns.get_loc('poi_ratings')

    df = df.iloc[:, :ratings_index + 1]

    df.rename(columns={
        'poi_id': 'id',
        'poi_name': 'name',
        'poi_category': 'category',
        'poi_latitude': 'latitude',
        'poi_longitude': 'longitude',
        'poi_ratings': 'ratings'
    }, inplace=True)

    df['latitude'] = pd.to_numeric(df['latitude'], errors='coerce')
    df['longitude'] = pd.to_numeric(df['longitude'], errors='coerce')

    df['ratings'] = df['ratings'].apply(lambda x: x.split(',') if isinstance(x, str) else [])

    df.dropna(subset=['latitude', 'longitude'], inplace=True)

    return df


def read_json(file_path):
    df = pd.read_json(file_path)
    df['latitude'] = df['coordinates'].apply(lambda coord: coord['latitude'] if isinstance(coord, dict) else np.nan)
    df['longitude'] = df['coordinates'].apply(lambda coord: coord['longitude'] if isinstance(coord, dict) else np.nan)
    df['ratings'] = df['ratings'].apply(lambda x: x if isinstance(x, list) else [])
    df.drop('coordinates', axis=1, inplace=True)
    return df

def read_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    data = []
    for elem in root:
        data_record = {
            'id': elem.find('pid').text,
            'name': elem.find('pname').text,
            'category': elem.find('pcategory').text,
            'latitude': elem.find('platitude').text,
            'longitude': elem.find('plongitude').text,
            'ratings': elem.find('pratings').text.split(',')
        }
        try:
            data_record['latitude'] = float(data_record['latitude'])
            data_record['longitude'] = float(data_record['longitude'])
        except ValueError:
            data_record['latitude'] = np.nan
            data_record['longitude'] = np.nan

        data.append(data_record)

    df = pd.DataFrame(data)
    df.dropna(subset=['latitude', 'longitude'], inplace=True)
    return df

class Command(BaseCommand):
    help = 'Import Points of Interest from a file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='The path to the file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        _, file_extension = os.path.splitext(file_path)

        try:
            print("Reading File... ", end='', flush=True)
            if file_extension.lower() == '.csv':
                df = read_csv(file_path)
            elif file_extension.lower() == '.json':
                df = read_json(file_path)
            elif file_extension.lower() == '.xml':
                df = read_xml(file_path)
            else:
                self.stdout.write(self.style.ERROR('Unsupported file format.'))
                return
            print('Done')

            print("Executing File... ", end='', flush=True)
            pois = [PointOfInterest(**vals) for vals in df.to_dict('records')]
            PointOfInterest.objects.bulk_create(pois, ignore_conflicts=True)
            self.stdout.write(self.style.SUCCESS(f'Successfully imported {len(pois)} Points of Interest.'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f'File {file_path} not found.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
