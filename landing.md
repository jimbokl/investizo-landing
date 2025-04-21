# Technical Specification (TZ) for Claude 3.7: PropTrading Landing Page Development

**1. Project Goal:**
Develop a static, single-page landing page for "PropTrading" using HTML and CSS. The page must present the provided content clearly, follow a specific structure, and adhere to a professional, modern corporate style guide suitable for a proprietary trading firm.

**2. Target Audience:**
Aspiring and experienced traders (beginners, scaling traders, professionals) seeking funding opportunities to trade without risking personal capital. The design must convey trustworthiness, opportunity, and clear conditions.

**3. Corporate Style Guide:**
The landing page must strictly adhere to the following style guide:

* **Color Palette:**
    * *Primary:* Dark Blue (e.g., `#1C293A` or similar deep navy) - Used for headers, footers, primary buttons, backgrounds of certain sections, headlines.
    * *Accent (CTA):* Bright Green (e.g., `#00A65A` or similar vibrant green) - Used for main call-to-action buttons (like "Get Capital", "Start Challenge") and highlighting key elements.
    * *Secondary/Background:* White (`#FFFFFF`) and Light Gray (e.g., `#F4F7F6` or similar) - Used for main content backgrounds.
    * *Text:* Dark Gray/Near Black (e.g., `#333333`) for body text on light backgrounds; White (`#FFFFFF`) for text on dark backgrounds.
* **Typography:**
    * *Font Family:* Use a clean, modern sans-serif font family (e.g., 'Inter', 'Lato', 'Montserrat', or similar common sans-serif).
    * *Hierarchy:* Clear visual hierarchy with large, bold headlines, smaller sub-headlines, and standard body text size/weight. Use font weight variations effectively.
* **Logo:**
    * Use the text "PropTrading" styled as a logo in the header (top-left) and footer. If a graphical logo is intended, use a placeholder for "PropTrading Logo".
* **Buttons:**
    * Rounded corners (e.g., `border-radius: 4px` or `6px`).
    * Solid color fills (Primary Dark Blue or Accent Green).
    * White or contrast-colored text.
    * Subtle hover effect.
* **Iconography:**
    * Simple, flat-style icons relevant to finance, trading, security, and process steps. Should match the color palette.
* **Overall Feel:**
    * Professional, trustworthy, modern, clean, data-driven. Focus on clarity and ease of understanding complex information (like trading conditions).

**4. General Requirements:**
* **Technology:** HTML5, CSS3.
* **Structure:** Semantic HTML markup. Well-organized and commented CSS. No inline styles.
* **Responsiveness:** Fully responsive design adapting to desktop, tablet, and mobile screens. Use media queries.
* **Cross-Browser Compatibility:** Consistent rendering in latest Chrome, Firefox, Safari, Edge.

**5. Detailed Landing Page Description:**

The landing page will consist of the following sections, ordered vertically:

* **5.1. Header:**
    * *Layout:* Fixed or sticky at the top. Full-width.
    * *Content:*
        * Left: "PropTrading" logo/styled text.
        * Center/Right: Navigation links: "How it Works", "Who is it for", "Benefits", "FAQ".
        * Far Right: "Login" button (styled distinctively, e.g., outline or secondary color).
    * *Styling:* Dark Blue background, White text for navigation links. Button styled according to the corporate style.

* **5.2. Hero Section:**
    * *Layout:* Full-width section below header. Centered text and CTA button. Optional relevant background image/graphic placeholder.
    * *Content:*
        * Main Headline: "Trade without risks — earn up to 80% of the profit"
        * Sub-headline: "Prove your trading skills and get funding with transparent conditions"
        * Informational text below sub-headline: "Capital from $10,000 to $200,000 depending on evaluation results"
        * CTA Button: "Get Capital"
    * *Styling:* Use corporate colors. Headline large and impactful. Sub-headline smaller. CTA button in Accent Green. Ensure text readability if using a background image (overlay recommended).

* **5.3. Who is this suitable for Section:**
    * *Layout:* Full-width section. Section title followed by a 3-column grid (stacking on mobile).
    * *Content:*
        * Section Title: "Who is this suitable for"
        * Intro Text: "Our funding program is designed for traders of all levels"
        * Column 1 (Beginners):
            * Title: "Beginners without large capital"
            * Text: "Start trading in the market without needing to invest significant personal funds"
            * Icon: Placeholder for relevant icon (e.g., seedling, upward graph).
        * Column 2 (Experienced):
            * Title: "Experienced traders seeking scaling"
            * Text: "Increase your trading capital and scale proven strategies"
            * Icon: Placeholder for relevant icon (e.g., scaling bars, rocket).
        * Column 3 (Professionals):
            * Title: "Professional traders with a proven strategy"
            * Text: "Get access to large capital and the maximum profit share"
            * Icon: Placeholder for relevant icon (e.g., checkmark shield, trophy).
    * *Styling:* Light background. Use corporate colors for titles, text, and icons. Ensure clear visual separation between columns.

* **5.4. Our Advantages Section:**
    * *Layout:* Full-width section. Section title followed by a 4-column grid (or 2x2 grid, stacking on mobile).
    * *Content:*
        * Section Title: "Our Advantages"
        * Block 1 (Security): Icon + Title "Security" + Text "Trade without risking your own capital".
        * Block 2 (Quick Start): Icon + Title "Quick Start" + Text "Start earning today".
        * Block 3 (Favorable Conditions): Icon + Title "Favorable Conditions" + Text "Transparent profit split up to 80%".
        * Block 4 (Large Capital): Icon + Title "Large Capital" + Text "From $10,000 to $200,000 depending on results".
    * *Styling:* Light background. Use corporate colors. Icons should be prominent and relevant (e.g., shield, rocket, percentage sign, money bag).

* **5.5. We Solve Your Problems Section:**
    * *Layout:* Full-width section. Section title followed by a three-column layout (Problem, Consequences, Solution) that works well on all devices (potentially cards or distinct visual areas).
    * *Content:*
        * Section Title: "We Solve Your Problems"
        * Column 1 (Problem): Title "Problem" + Bullet points: "Difficult to grow capital independently", "Fear of risking personal money", "Hard to find reliable trading conditions".
        * Column 2 (Consequences): Title "Consequences" + Bullet points: "Missed opportunities to earn more due to lack of capital", "Constant pressure and risk of losing personal money", "Doubts and anxiety due to non-transparent broker conditions".
        * Column 3 (Solution): Title "Solution" + Bullet points: "Get funding on transparent terms", "Trade confidently without risking your own capital", "Withdraw profits regularly, earning up to 80% of the result".
    * *Styling:* Visually distinct columns/cards. Maybe use icons (e.g., cross mark for problem, warning for consequences, check mark for solution). Use corporate colors.

* **5.6. Success Stories Section:**
    * *Layout:* Full-width section. Section title followed by 3 testimonial cards (arranged horizontally on desktop, possibly slider or stacked on mobile).
    * *Content:*
        * Section Title: "Success Stories of Our Traders"
        * Card 1: Initials "AK", Name "Anton K.", Role "Trader since 2021", Quote: "Earned $12,500 in the first month without personal investment. The evaluation process was simple and clear." (Placeholder for photo/avatar)
        * Card 2: Initials "MS", Name "Maria S.", Role "Beginner Trader", Quote: "I never dared to trade with my own money. Thanks to the program, I could start a trading career without stress." (Placeholder for photo/avatar)
        * Card 3: Initials "DV", Name "Dmitry V.", Role "Professional Trader", Quote: "Scaled my strategy from $50,000 to $200,000. I withdraw profits weekly without delays." (Placeholder for photo/avatar)
    * *Styling:* Light background. Cards with clear separation (borders or shadow). Use corporate fonts and colors. Initials could be styled within a circle.

* **5.7. How to Start Section:**
    * *Layout:* Full-width section. Section title, intro text, followed by a 3-step horizontal process diagram (use columns, visually connected if possible, stacking on mobile). Ends with an urgency message and CTA button.
    * *Content:*
        * Section Title: "How to Start"
        * Intro Text: "Three steps towards successful trading with our capital"
        * Step 1: Number "1", Title "Step 1: Challenge", Description "Achieve 10% profit without exceeding 5% daily drawdown and maintaining Profit Stability not less than 60%.", Key Metrics: "Profit Target: 10%", "Max Drawdown: 5%", "Stability: ≥ 60%".
        * Step 2: Number "2", Title "Step 2: Verification", Description "Achieve 5% profit target, adhere to risk management rules, and maintain Profit Stability not less than 80%.", Key Metrics: "Profit Target: 5%", "Risk Management: Strict", "Stability: ≥ 80%".
        * Step 3: Number "3", Title "Step 3: Social Trader", Description "Trade with real funds and receive up to 80% profit share. Your trades can be copied by other traders.", Key Metrics: "Profit Share: up to 80%", "Account Type: Real", "Copy Trading: Available".
        * Urgency Text: "The number of funded traders is limited!"
        * CTA Button: "Start Challenge"
    * *Styling:* Visually guide the user through steps (numbers, lines, arrows). Highlight key metrics clearly. Urgency text should stand out. CTA button in Accent Green.

* **5.8. FAQ Section:**
    * *Layout:* Full-width section. Section title followed by an accordion-style list of questions and answers.
    * *Content:*
        * Section Title: "Frequently Asked Questions"
        * Q1: "Do I need to invest my own money?"
        * A1: "No, you do not need to risk your own capital. We provide funding after successful evaluation completion."
        * Q2: "How are profits withdrawn?"
        * A2: "Profit withdrawal occurs weekly. You receive up to 80% of the earned profit depending on your level and results."
        * Q3: "What if I incur losses?"
        * A3: "We cover all losses. You are not financially responsible for losses, but you must adhere to the risk management rules."
        * Q4: "What instruments are available for trading?"
        * A4: "Trading is available primarily in the Forex market, but with various instruments: currency pairs, cryptocurrencies, metals, and other assets available on Forex."
    * *Styling:* Light background. Clear visual distinction between questions and answers. Use icons (e.g., plus/minus) for accordion toggle.

* **5.9. Comparison Section:**
    * *Layout:* Full-width section. Section title followed by a comparison table.
    * *Content:*
        * Section Title: "Comparison with Other Prop Firms"
        * Table:
            * Header Row: "Features", "Our Company", "Other Prop Firms"
            * Row 1: "Trader's Profit Share", "Up to 80%", "50-70%"
            * Row 2: "Copy Trading", "Available", "Unavailable"
            * Row 3: "Maximum Capital", "$200,000", "$100,000"
            * Row 4: "Profit Withdrawal", "Weekly", "Monthly"
            * Row 5: "Support", "24/7", "Limited"
    * *Styling:* Clear table styling (borders, alternating row colors optional). Highlight "Our Company" column maybe with color or bolding. Use corporate fonts and colors.

* **5.10. Final CTA Section:**
    * *Layout:* Full-width section, often with a contrasting background (e.g., Primary Dark Blue). Centered text and button.
    * *Content:*
        * Headline: "Ready to start trading without risk?"
        * Urgency Text: "Applications for the Challenge are accepted until the end of the week!"
        * CTA Button: "Start Challenge"
    * *Styling:* Contrasting background (e.g., Dark Blue) with White text for better visibility. Large headline. Prominent Accent Green CTA button.

* **5.11. Footer:**
    * *Layout:* Full-width section at the bottom. Centered or simple left/right alignment.
    * *Content:*
        * Left/Center: "PropTrading" logo/styled text.
        * Center/Right: Copyright "© 2025 PropTrading. All rights reserved."
        * Right/Below: Links "Terms", "Privacy Policy".
    * *Styling:* Dark Blue background. White text for all elements.

**6. Assets Required:**
* "PropTrading" text logo styling (or logo placeholder).
* Placeholders for icons: Beginners, Experienced, Professional traders (Who is it for section).
* Placeholders for icons: Security, Quick Start, Favorable Conditions, Large Capital (Advantages section).
* Placeholders for icons: Problem, Consequences, Solution (Problem solving section).
* Placeholders for avatar/photo initials (AK, MS, DV) for Testimonials.
* Placeholders for icons or visual elements for the 3-step process (How to Start).
* Placeholders for icons for accordion toggle (FAQ).
* Placeholder for optional hero background image/graphic.

**7. Deliverables:**
* One `index.html` file with semantic structure.
* One or more `*.css` files (e.g., `style.css`) containing all styles, including responsiveness and adherence to the corporate style guide.
* Note on CSS organization/methodology if applicable.

**8. Final Instructions for Claude 3.7:**
* Implement the exact content provided (in English translation) for all sections.
* Structure the HTML semantically according to the described sections.
* Apply the Corporate Style Guide (Dark Blue primary, Green accent, modern sans-serif font) meticulously to all elements.
* Pay close attention to layout details (grids, columns, tables, steps) and ensure responsiveness.
* Use the specified text for buttons, titles, and navigation items.