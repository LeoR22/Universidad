import smtplib
from email.mime.text import MIMEText
from envs import APP_PASSWORD, EMAIL  # Import email and app password from envs.py

# Email details
subject = 'Test Email'
body = 'This is a test message.'
sender = EMAIL  # Use the email from envs.py
recipients = ['DESTINO_@gmail.com']  # Replace with recipient's email

def send_email(subject, body, sender, recipients):
    try:
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = ', '.join(recipients)

        # Debugging: Print email details
        print(f"Preparing to send email from {sender} to {recipients}...")

        with smtplib.SMTP('smtp.gmail.com', 587) as smtp_server:
            print("Connecting to SMTP server...")
            smtp_server.starttls()  # Upgrade the connection to secure (TLS)
            print(f"Attempting to login with email: {sender}")
            try:
                smtp_server.login(sender, APP_PASSWORD)
                smtp_server.sendmail(EMAIL, recipients, "Subject: Test\n\nThis is a test email.")
                print("Login successful!")
            except smtplib.SMTPAuthenticationError as auth_error:
                print(f"SMTP Authentication Error: {auth_error}")
                print("Check your email/password or App Password.")
                return  # Exit early since login failed
            except Exception as login_error:
                print(f"Unexpected error during login: {login_error}")
                return  # Exit early since login failed

            smtp_server.sendmail(sender, recipients, msg.as_string())
            print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")

# Call the function
send_email(subject, body, sender, recipients)
