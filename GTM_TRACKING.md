# GTM Tracking Implementation Guide

This document outlines all the GTM (Google Tag Manager) tracking IDs and data attributes implemented across the application for comprehensive analytics tracking.

## Overview

The application uses both **Google Analytics (GA4)** and **Google Tag Manager (GTM)** with custom tracking attributes for key user interactions.

### Analytics Configuration

- **Google Analytics ID**: `G-P6E7Q30JBT`
- **Google Tag Manager ID**: `GTM-MV9BWR29`

## Tracking Implementation

### 1. Form Tracking (Contact Page)

#### Form Element
- **ID**: `gtm-contact-form`
- **Data Attribute**: `data-gtm-form="contact"`
- **Location**: `/contact`

#### Form Fields
All form fields have the `data-gtm-field` attribute:
- `data-gtm-field="pic_name"` - Person in Charge Name
- `data-gtm-field="company_name"` - Company Name
- `data-gtm-field="expected_price"` - Expected Budget

#### Submit Button
- **ID**: `gtm-submit-contact-form`
- **Data Attribute**: `data-gtm-button="submit_contact"`

#### Form States
- Success state: `data-gtm-state="success"`
- Error state: `data-gtm-error="form_error"`

### 2. DataLayer Events (Contact Form)

The following custom events are pushed to the dataLayer:

#### Form Submission Attempt
```javascript
{
  event: 'form_submission_attempt',
  form_name: 'contact_form',
  company_name: '<company_name>'
}
```

#### Form Submission Success
```javascript
{
  event: 'form_submission_success',
  form_name: 'contact_form',
  company_name: '<company_name>',
  expected_price: '<expected_price>'
}
```

#### Form Submission Error
```javascript
{
  event: 'form_submission_error',
  form_name: 'contact_form',
  error_message: '<error_message>'
}
```

### 3. Navigation Tracking

#### Home Page Navigation Cards
Each navigation card on the home page has tracking:
- **ID Pattern**: `gtm-nav-{page_name}` (e.g., `gtm-nav-about`, `gtm-nav-teams`)
- **Data Attribute Pattern**: `data-gtm-nav="nav_{page_name}"`

**Available Navigation Cards:**
- `gtm-nav-about` → About page
- `gtm-nav-services` → Services page
- `gtm-nav-contact` → Contact page
- `gtm-nav-teams` → Teams page (SSR)
- `gtm-nav-players` → Players page (SSR)

#### Back to Home Buttons
Each page has a back button with unique tracking:
- From About: `gtm-about-back-home` (`data-gtm-nav="back_to_home_from_about"`)
- From Services: `gtm-services-back-home` (`data-gtm-nav="back_to_home_from_services"`)
- From Contact: `gtm-contact-back-home` (`data-gtm-nav="back_to_home_from_contact"`)
- From Teams: `gtm-teams-back-home` (`data-gtm-nav="back_to_home_from_teams"`)
- From Players: `gtm-back-home` (`data-gtm-nav="back_to_home"`)

#### Back to Teams Button
- **ID**: `gtm-back-teams`
- **Data Attribute**: `data-gtm-nav="back_to_teams"`
- **Location**: `/players/[team]`

### 4. Team Cards Tracking (Teams Page)

Each team card has dynamic tracking based on team name:
- **ID Pattern**: `gtm-team-{team_name}` (e.g., `gtm-team-inter-miami`)
- **Data Attribute**: `data-gtm-team="{Team Name}"`

**Example Teams:**
- `gtm-team-inter-miami` → Inter Miami
- `gtm-team-al-nassr` → Al Nassr
- `gtm-team-al-hilal` → Al Hilal
- `gtm-team-manchester-city` → Manchester City
- `gtm-team-liverpool` → Liverpool

### 5. Player Cards Tracking (Players Page)

Each player card includes:
- **ID Pattern**: `gtm-player-{player_id}` (e.g., `gtm-player-1`)
- **Data Attributes**:
  - `data-gtm-player="{Player Name}"`
  - `data-gtm-player-team="{Team Name}"`

**Example:**
```html
<div 
  id="gtm-player-1" 
  data-gtm-player="Lionel Messi" 
  data-gtm-player-team="Inter Miami"
>
```

### 6. Call-to-Action (CTA) Buttons

#### Services Page - Plan Selection
Each pricing plan has a CTA button:
- **ID Pattern**: `gtm-plan-{index}` (e.g., `gtm-plan-0`, `gtm-plan-1`, `gtm-plan-2`)
- **Data Attribute Pattern**: `data-gtm-cta="choose_plan_{service_title}"`

**Available CTAs:**
- `gtm-plan-0` → Web Development
- `gtm-plan-1` → Mobile Apps
- `gtm-plan-2` → Cloud Solutions

#### About Page - Get Started
- **ID**: `gtm-get-started-about`
- **Data Attribute**: `data-gtm-cta="get_started_about"`

## GTM Configuration Recommendations

### Triggers to Set Up in GTM

1. **Form Submission Tracking**
   - Trigger Type: Custom Event
   - Event Name: `form_submission_success`
   - Use this to track conversions

2. **Navigation Clicks**
   - Trigger Type: Click - All Elements
   - Condition: Click Element matches CSS selector starting with `#gtm-nav-`

3. **Team Selection**
   - Trigger Type: Click - All Elements
   - Condition: Click Element matches CSS selector starting with `#gtm-team-`

4. **Player Card Views**
   - Trigger Type: Element Visibility
   - Condition: Element matches CSS selector `[data-gtm-player]`

5. **CTA Clicks**
   - Trigger Type: Click - All Elements
   - Condition: Click Element matches CSS selector `[data-gtm-cta]`

### Variables to Create in GTM

1. **Form Data Variables**
   - Company Name: `{{dataLayer.company_name}}`
   - Expected Price: `{{dataLayer.expected_price}}`

2. **Click Attributes**
   - GTM Button: `{{Click Element}}.getAttribute('data-gtm-button')`
   - GTM Nav: `{{Click Element}}.getAttribute('data-gtm-nav')`
   - GTM Team: `{{Click Element}}.getAttribute('data-gtm-team')`
   - GTM Player: `{{Click Element}}.getAttribute('data-gtm-player')`

### Tags to Create in GTM

1. **GA4 Event - Form Submission**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `form_submit`
   - Parameters:
     - `form_name`: contact_form
     - `company_name`: `{{dataLayer.company_name}}`
     - `value`: `{{dataLayer.expected_price}}`

2. **GA4 Event - Team Selection**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `select_team`
   - Parameters:
     - `team_name`: `{{GTM Team}}`

3. **GA4 Event - Navigation Click**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: `navigation_click`
   - Parameters:
     - `nav_destination`: `{{GTM Nav}}`

## Database Integration

Form submissions are stored in Supabase:

**Table**: `form_submissions`

**Schema**:
```sql
- id: bigint (auto-increment, primary key)
- pic_name: text (required)
- company_name: text (required)
- expected_price: numeric(12,2) (required)
- created_at: timestamp (default: now())
```

## Testing Checklist

- [ ] Verify GTM container loads on all pages
- [ ] Test form submission tracking (attempt, success, error)
- [ ] Test navigation clicks from home page
- [ ] Test team card clicks
- [ ] Test player card visibility
- [ ] Test CTA button clicks
- [ ] Verify dataLayer events in browser console
- [ ] Test form data storage in Supabase
- [ ] Verify GA4 events in debug mode

## Browser Console Testing

To test dataLayer events, open browser console and run:
```javascript
// View all dataLayer events
console.log(window.dataLayer);

// Monitor new events
window.dataLayer.push = new Proxy(window.dataLayer.push, {
  apply: function(target, thisArg, args) {
    console.log('DataLayer Event:', args[0]);
    return target.apply(thisArg, args);
  }
});
```

## Notes

- All tracking IDs are prefixed with `gtm-` for easy identification
- Data attributes use kebab-case for consistency
- Dynamic IDs are generated based on content (team names, player IDs)
- Form tracking includes client-side validation and error handling
- Success/error states are tracked separately for detailed analytics

---

**Last Updated**: October 16, 2025  
**Version**: 1.0  
**Maintainer**: GTM Project Team

