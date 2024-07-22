import pandas as pd
import random
from datetime import datetime, timedelta

start_date = datetime(2023, 11, 1)
end_date = datetime(2023, 12, 1)

current_date = start_date
while current_date < end_date:
    start_time = datetime(current_date.year, current_date.month, current_date.day, 10, 0, 0)
    end_time = datetime(current_date.year, current_date.month, current_date.day, 22, 0, 0)
    delta = timedelta(minutes=5)

    data = []
    current_time = start_time
    enter_exit = 0

    while current_time < end_time:
        method = random.choice(['ENTER', 'EXIT'])
        age = random.randint(7, 100)
        gender = random.choice(['male', 'female'])

        if method == 'ENTER':
            enter_exit = 1
        else:
            enter_exit = 0

        data.append({
            'datetime': current_time.strftime('%d-%m-%Y %H:%M:%S'),
            'method': method,
            'gender': gender,
            'age': age,
            'enter_exit': enter_exit
        })

        current_time += delta

    df = pd.DataFrame(data)

    filename = f"../../report/monthly/data_{current_date.strftime('%Y-%m-%d')}.csv"
    df.to_csv(filename, index=False)

    current_date += timedelta(days=1)

