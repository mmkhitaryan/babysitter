import secrets
import json
from jose import jwe
from django.conf import settings
from .models import CustomUser

def create_sms_challenge(phone):
    random_sms_code = "".join([str(secrets.randbelow(9)) for digit in range(6)])
    # istead of using sms provider just print
    print(random_sms_code)

    return jwe.encrypt(json.dumps({
        "sms_code": random_sms_code,
        "sms_auth_id": secrets.token_hex(16),
        "phone": phone
    }), settings.SECRET_KEY, algorithm='dir', encryption='A128GCM')

def validate_challenge_and_return_user(challenge_token, sms):
    decrypted_chal = jwe.decrypt(challenge_token, settings.SECRET_KEY)
    json_loaded = json.loads(decrypted_chal)

    if json_loaded['sms_code']==sms:
        return CustomUser.objects.get_or_create(
            phone=json_loaded["phone"]
        )[0]

