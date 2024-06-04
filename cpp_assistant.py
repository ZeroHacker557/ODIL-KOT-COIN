import telebot
import requests

# Telegram botni inicializatsiya qilish
bot = telebot.TeleBot("6352557624:AAH6aX14_vbfQHRqbI6WNT0fs7E0hEpas3k")

# Telegramdagi barcha foydalanuvchilarni olish uchun funksiya
def get_all_users():
    # Telegram API orqali foydalanuvchilarni olish
    token = "6352557624:AAH6aX14_vbfQHRqbI6WNT0fs7E0hEpas3k"
    response = requests.get(f"https://api.telegram.org/bot{token}/getUpdates")
    
    # Foydalanuvchilarni ro'yxatini qaytarish
    users = []
    for result in response.json()["result"]:
        if "message" in result and "chat" in result["message"] and "id" in result["message"]["chat"]:
            users.append(result["message"]["chat"]["id"])
    return users

# "start" kommandasi uchun qo'llanuvchi funksiya
@bot.message_handler(commands=['start'])
def send_vacuum_message(message):
    # Barcha foydalanuvchilarni olish
    users = get_all_users()
    
    # Telegramdagi barcha foydalanuvchilarga "VACUUM SILA" degan xabar yuborish
    for user_id in users:
        bot.send_message(user_id, "VACUUM SILA")

# Telegram bo'tini ishga tushirish
bot.polling()
