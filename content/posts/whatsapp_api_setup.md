---
title: WhatsApp Business Cloud API Setup Guide
date: '2024-01-15'
author: TechBlog Team
tags: ['api', 'whatsapp', 'business', 'integration']
---

# WhatsApp Business Cloud API Setup Guide

## 1. Prerequisites
Before touching code, you need to have these ready:

- Meta Business Account (created via Meta Business Manager)
- WhatsApp Business Account (WABA) connected to your Meta Business
- Phone Number ID (the number you will send messages from)
- WABA ID
- System User Access Token (Permanent token, not temporary from Graph API Explorer)
- Approved Message Templates in WhatsApp Manager

## 2. Get Your Credentials
From Meta for Developers → WhatsApp App → API Setup tab:

- Phone Number ID → Example: `732302253296595`
- WABA ID → Example: `1279587157043525`
- Permanent Access Token → Generate in Business Settings → System Users → Assign WhatsApp access → Generate token.

## 3. Routes Overview
WhatsApp Business Cloud API is a REST API with the base URL:

```
https://graph.facebook.com/v21.0
```
Here are the key routes you’ll use:

### 3.1 Get All Approved Templates
```
GET /{WABA_ID}/message_templates
```
**Example:**
```
GET https://graph.facebook.com/v21.0/1279587157043525/message_templates?access_token=YOUR_ACCESS_TOKEN
```
Returns JSON list of all templates (names, categories, components).

### 3.2 Send a Template Message
```
POST /{PHONE_NUMBER_ID}/messages
```
**Example:**
```
POST https://graph.facebook.com/v21.0/732302253296595/messages
```
**JSON body:**
```json
{
  "messaging_product": "whatsapp",
  "to": "PHONE_NUMBER",
  "type": "template",
  "template": {
    "name": "template_name",
    "language": {
      "code": "en_US"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Parameter 1" },
          { "type": "text", "text": "Parameter 2" }
        ]
      }
    ]
  }
}
```

### 3.3 Batch Sending Flow
WhatsApp doesn’t have a bulk endpoint — you loop over your number list and call `/messages` for each.

**Rules:**
- 1 request per recipient
- Rate limit: ~80 messages/second for standard accounts
- Recommended: Use async queue or batching logic in your code

### 3.4 Create a Template (Optional if not made yet)
```
POST /{WABA_ID}/message_templates
```
**Example body:**
```json
{
  "name": "new_template",
  "language": "en_US",
  "category": "TRANSACTIONAL",
  "components": [
    {
      "type": "BODY",
      "text": "Hello {{1}}, your order {{2}} is confirmed."
    }
  ]
}
```
Templates must be approved before sending.

## 4. Setup Steps in Order
1. Create Meta App and enable WhatsApp API.
2. Add a Phone Number to WhatsApp Business Account.
3. Generate Permanent Access Token for a System User.
4. Note down Phone Number ID & WABA ID.
5. Create Message Templates in WhatsApp Manager.
6. Get Templates via `/message_templates` route to confirm availability.
7. Build UI with a dropdown listing all templates from `/message_templates`.
8. Allow user to input multiple numbers (comma-separated or file upload).
9. Loop send requests to `/messages` for each number with the chosen template.
10. Monitor Delivery Status (optional) via webhooks:
    - Webhook endpoint will receive status updates (sent, delivered, read).
    - Set in App Dashboard → Webhooks → Subscribe to `messages` field.

## 5. WhatsApp Delivery Flow
```
Your System → POST /messages → WhatsApp Cloud API → WhatsApp Servers → Recipient
```
**Statuses come back via:**
```
WhatsApp Servers → Webhook Endpoint (you host)
```

## 6. Important Notes
- Numbers must be in international format (e.g., +923001234567 → without + in API).
- Templates must be approved — you can’t send free-form messages unless the user messaged you first.
- 24-hour rule: Outside the 24-hour customer session, you can only send approved templates.
- Language codes in templates must match exactly (`en_US`, `ur_PK`, etc.`).
