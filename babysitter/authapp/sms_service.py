import requests

def send_sms(phone, text):
    result = requests.get(f"https://smsc.kz/sys/send.php?login=bkzts&psw=9usUWfGv93Hs3Eu&phones={phone}&mes={text}")
    print(result.text, phone, text)
