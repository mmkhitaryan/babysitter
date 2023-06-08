import requests

SWITCH = True

def send_sms(phone, text):
    if SWITCH:
        result = requests.get(f"https://smsc.kz/sys/send.php?login=bkzts&psw=9usUWfGv93Hs3Eu&phones={phone}&mes={text} BabySitterApp")
        print(result.text, phone, text)
    else:
        print(phone, text)
