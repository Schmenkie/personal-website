# Outreach kit — local-services web work

Everything here assumes the lead came out of `lead-finder.mjs`, so it keys off the
two lead tiers that script produces: **`none`** (no website at all) and **`weak`**
(has a site, but it's broken, dated, or not mobile-friendly). The pitch is different
for each, so the templates are split that way.

The whole game: **lead with a specific problem they already have, not with "want a
website?"** Generic pitches get ignored. "Your site doesn't work on phones and here's
a screenshot" gets replies.

---

## 1. Positioning (say this the same way every time)

> I build fast, modern websites for local businesses — the kind that load instantly,
> look right on a phone, and actually bring in calls. Send me what you've got (or
> don't have), and we'll scope it in a quick conversation.

Keep it to that. No rate card. Informal scope-in-conversation is the offer.

---

## 2. Cold email — tier `none` (no website)

**Subject:** `{Business} — quick question about your website`

> Hi {name / "there"},
>
> I was looking for {category, e.g. "plumbers"} in {city} and found {Business} on
> Google — great reviews ({rating}★). One thing I noticed: there's no website linked,
> so anyone who wants to check you out before calling ends up on a competitor's site
> instead.
>
> I build simple, fast websites for local businesses — one page that shows what you
> do, your reviews, and a clear "call now" button. I could put together a quick mockup
> of what yours could look like, no cost, and you decide from there.
>
> Worth a 10-minute call this week?
>
> — Spencer
> spencercurnow.com

---

## 3. Cold email — tier `weak` (has a bad site)

**Subject:** `{Business} — your site on mobile`

> Hi {name / "there"},
>
> Found {Business} while looking for {category} in {city}. I pulled up your site on my
> phone and noticed {the actual reason from the CSV — e.g. "it doesn't resize for
> mobile" / "it's loading over an insecure connection" / "it wouldn't load"}. On
> phones that usually means people bounce before they call.
>
> Fixing that is straightforward — I rebuild sites like this to be fast and phone-first.
> Happy to send a before/after mockup of your homepage so you can see the difference,
> free, and you decide if it's worth doing.
>
> Open to a quick look?
>
> — Spencer
> spencercurnow.com

> **Tip:** paste the exact `reason` column from the CSV into that blank. Specificity is
> the whole pitch — it proves you actually looked.

---

## 4. Follow-ups (most replies come from these, not the first email)

Space them out. Stop after #3 — three touches, then move on.

- **+3 days** — reply to your own thread:
  > Just floating this back up — still happy to put together that free mockup if you
  > want to see it before deciding anything.
- **+7 days** — short, new angle:
  > Last note from me on this — if the timing's off, no worries. If you'd rather I just
  > send the mockup and you look whenever, reply "send it" and I'll get it over.
- **+14 days** — break-up:
  > I'll close this out on my end. If a new site ever moves up the list, I'm at
  > spencercurnow.com. Good luck this season.

---

## 5. Phone / walk-in / DM script

For local services, calling or walking in often beats email. Same structure:

1. **Who:** "Hi, I'm Spencer — I build websites for local businesses here in {city}."
2. **Problem:** "I noticed {Business} doesn't have a site / your site doesn't work
   well on phones."
3. **Low-commitment offer:** "I'm not selling anything on this call — I just make free
   mockups so owners can see what's possible. Want me to make one for you?"
4. **Close:** "What's the best email to send it to?"

The free mockup is the hook. It costs you an hour and it flips the conversation from
"should I hire someone" to "do I like *this*."

---

## 6. Objection handling

| They say | You say |
|---|---|
| "I don't need one / word of mouth is fine" | "Totally — this is just so people who Google you land on *you* instead of a competitor. Even a one-pager with your number does that." |
| "How much?" | "Depends what you want — most local sites land in a range I'll quote once I see what you need. The mockup's free either way, so let's start there." |
| "I already have someone / my nephew did it" | "No problem. If it's working, keep it. If it ever needs to be faster or fixed on mobile, I'm around." |
| "I don't have time" | "That's the point of the free mockup — you don't do anything, I send it, you glance at it. Two minutes." |

---

## 7. Money mechanics (informal, but non-negotiable)

- **Deposit up front.** 50% to start, 50% on launch. This filters tire-kickers and is
  standard — don't skip it.
- **Scope in conversation, price per project.** No public rate card (matches how you
  already work). Get on a call, hear what they want, quote a single number.
- **Simple contract.** One page: what you'll build, the price, the two payments, and
  what "done" means. A signed email counts if you keep it light.

---

## 8. Lead tracker

The CSV from `lead-finder.mjs` already has name / phone / website / tier / reason.
Add these columns and work top-down (tier `none` first, then `weak`):

| new column | values |
|---|---|
| `contacted` | date of first touch |
| `channel` | email / call / walk-in / DM |
| `status` | new → contacted → replied → mockup-sent → call-booked → won / dead |
| `followups` | count (stop at 3) |
| `notes` | anything they said |

Import the CSV into Google Sheets, add those five columns, sort by `tier`. That's your
whole CRM until volume justifies more.
