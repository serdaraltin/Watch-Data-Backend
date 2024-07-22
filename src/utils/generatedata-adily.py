import pandas as pd
import random
from datetime import datetime, timedelta

start_time = datetime(2023, 12, 6, 10, 0, 0)
end_time = datetime(2023, 12, 6, 22, 0, 0)
delta = timedelta(minutes=8)  

data = []
current_time = start_time
total_enter_exit = 0

for i in range(11000):
    method = random.choice(['ENTER', 'EXIT'])
    age = random.randint(7, 100)
    gender = random.choice(['male', 'female'])

    if method == 'ENTER':
        total_enter_exit = 1
    else:
        total_enter_exit = 0

    data.append({
        'datetime': current_time.strftime('%d-%m-%Y %H:%M:%S'),
        'method': method,
        'gender': gender,
        'age': age,
        'total': total_enter_exit
    })

    current_time += delta

df = pd.DataFrame(data)
print(df)
df.to_csv('../../report/files/example_data-7.csv') # Veriyi csv olarak kaydeder.
