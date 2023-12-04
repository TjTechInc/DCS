from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    """
    A signal handler that gets called every time a User instance is saved.
    """
    if created:
        # This block will be executed only when a new user is created
        send_welcome_email(instance.email)
        print(f"Welcome email sent to {instance.email}")


def send_welcome_email(email):
    """
    A function to send a welcome email to the newly registered user.
    This is just an example; you should implement your actual email sending logic.
    """
    subject = 'Welcome to Your Website'
    message = 'Thank you for registering on Your Website. We hope you enjoy your experience!'
    from_email = 'your@example.com'
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)
