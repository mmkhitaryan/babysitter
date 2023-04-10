import secrets
import json
from datetime import datetime
from datetime import timedelta, timezone
from jose import jwe
from django.conf import settings
from .models import CustomUser

def create_sms_challenge(phone):
    random_sms_code = "".join([str(secrets.randbelow(9)) for digit in range(6)])
    # istead of using sms provider just print
    exipery_date = (datetime.now(timezone.utc) + timedelta(seconds=60 * 5)).timestamp()
    print(random_sms_code)

    return jwe.encrypt(json.dumps({
        "sms_code": random_sms_code,
        "sms_auth_id": secrets.token_hex(16),
        "phone": phone,
        "exipery_date": int(exipery_date)
    }), settings.SECRET_KEY, algorithm='dir', encryption='A128GCM')

def validate_challenge_and_return_user(challenge_token, sms):
    decrypted_chal = jwe.decrypt(challenge_token, settings.SECRET_KEY)
    json_loaded = json.loads(decrypted_chal)

    datetime_expiry_date = datetime.fromtimestamp(json_loaded['exipery_date'], tz=timezone.utc)
    datetime_now = datetime.now(timezone.utc)

    if not datetime_expiry_date<datetime_now:
        if json_loaded['sms_code']==sms:
            return CustomUser.objects.get_or_create(
                phone=json_loaded["phone"]
            )[0]

