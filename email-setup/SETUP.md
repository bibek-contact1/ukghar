# Send website enquiries to Gmail (free)

This connects the enquiry form on the website to your Gmail using a free
Google Apps Script. It runs inside your own Google account, so no password
is ever put on the website.

## 1. Create the script (5 minutes, one time)

1. Sign in to Google as **bibek.contact1@gmail.com** and open https://script.google.com
2. Click **New project**. Rename it (top left) to `UKGhar Enquiries`.
3. Delete everything in the editor, then paste in all of `email-setup/Code.gs`. Press **Ctrl + S**.

## 2. Allow it to send email

1. In the toolbar's function menu, choose **sendTestEmail**, then click **Run**.
2. Google asks for permission. Click **Review permissions** and choose your account.
3. You'll see **"Google hasn't verified this app"**. This is normal for your own script.
   Click **Advanced → Go to UKGhar Enquiries (unsafe) → Allow**.
4. Check your Gmail for the email **"UKGhar enquiry setup works"**.

## 3. Publish it and get your link

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**. ("Anyone" only lets the website send
   enquiries to you. Nobody can read your email.)
4. Click **Deploy**, then copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy...long code.../exec`

## 4. Put the link on the website

Paste it into `js/data.js`:

```js
formEndpoint: "https://script.google.com/macros/s/AKfy.../exec",
```

Then publish the site (`git push`). Or send the link to Claude and it will do this for you.

## If you change the script later

Use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**.
That keeps the same link, so the website doesn't need changing.

## Limits

Free Gmail accounts can send about 100 emails a day through scripts. That's plenty for enquiries.
