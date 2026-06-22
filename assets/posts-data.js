/* =========================================================
   Next Door Investing — Blog Post Registry
   ---------------------------------------------------------
   This is the ONE place that lists every published post.
   To publish a new post:
     1. Create the post's HTML file in /blog/posts/
        (copy /blog/posts/_template.html to start)
     2. Add one entry to the POSTS array below
     3. Done — it now appears on the blog listing page
        and is filterable by category automatically.

   Fields:
     slug      - filename without .html, must match the
                 file you created in /blog/posts/
     cat       - one of: Investing, Buying, Selling,
                 Renovation, Market Updates
     title     - shown on the card + used as page <title>
     excerpt   - 1-2 sentence teaser shown on the card
     date      - "Month YYYY", shown on the card
     readMins  - estimated read time shown on the card
   ========================================================= */

const POSTS = [
  {
    slug: "house-hacking-101",
    cat: "Investing",
    title: "What Is House Hacking and Is It Right for You?",
    excerpt: "Live in one unit, rent the rest, and let tenants pay your mortgage. Here's how it actually works in Central Oregon — and who it fits.",
    date: "June 2026",
    readMins: 6
  },
  { cat:"Investing", title:"How to Analyze a Rental Property in Central Oregon", excerpt:"The exact framework I use on my own deals: cash flow, cash-on-cash return, and the local assumptions that make or break the math.", date:"May 2026", readMins:7, slug:"analyze-rental-property-central-oregon" },
  { cat:"Investing", title:"Duplex vs. Single Family: Which Investment Makes More Sense?", excerpt:"Better cash flow or better appreciation? A practical comparison for Bend and Redmond investors.", date:"May 2026", readMins:5, slug:"duplex-vs-single-family" },
  { cat:"Investing", title:"Understanding Cap Rate, Cash-on-Cash, and ROI (Plain English)", excerpt:"Three numbers investors throw around constantly — explained without the jargon, with Central Oregon examples.", date:"April 2026", readMins:6, slug:"cap-rate-cash-on-cash-roi-explained" },
  { cat:"Buying", title:"First-Time Buyer's Guide to Central Oregon Real Estate", excerpt:"From pre-approval to keys in hand: what to expect, what it costs, and the mistakes I see first-time buyers make.", date:"April 2026", readMins:8, slug:"first-time-buyers-guide-central-oregon" },
  { cat:"Buying", title:"How to Write a Competitive Offer Without Overpaying", excerpt:"Winning isn't just about price. Terms, timelines, and strategy matter — here's how to compete intelligently.", date:"March 2026", readMins:5, slug:"competitive-offer-without-overpaying" },
  { cat:"Buying", title:"What to Look for in a Fixer-Upper (From Someone Who's Renovated)", excerpt:"The difference between cosmetic ugly and expensive ugly — and how to tell before you write the offer.", date:"March 2026", readMins:6, slug:"what-to-look-for-in-a-fixer-upper" },
  { cat:"Selling", title:"How to Price Your Central Oregon Home to Maximize Net", excerpt:"Why the highest list price rarely produces the highest net — and how strategic pricing actually works.", date:"February 2026", readMins:5, slug:"price-your-home-to-maximize-net" },
  { cat:"Selling", title:"The Renovation ROI Question: What's Worth Doing Before You List?", excerpt:"A room-by-room look at which pre-listing projects pay for themselves and which ones just burn time and money.", date:"February 2026", readMins:7, slug:"renovation-roi-before-you-list" },
  { cat:"Market Updates", title:"Central Oregon Real Estate Market Update — Q2 2026", excerpt:"Inventory, pricing trends, and what buyers and sellers should know about the Central Oregon market right now.", date:"June 2026", readMins:4, slug:"market-update-q2-2026" },
  { cat:"Market Updates", title:"Bend vs. Redmond: Where Are Buyers Heading in 2026?", excerpt:"Price gaps, growth patterns, and what the migration between these two markets means for your strategy.", date:"January 2026", readMins:5, slug:"bend-vs-redmond-2026" },
  { cat:"Renovation", title:"Sweat Equity 101: How to Build Wealth Through Smart Renovations", excerpt:"How doing the right work — not just any work — converts your time and effort into real equity.", date:"January 2026", readMins:6, slug:"sweat-equity-101" },
  { cat:"Renovation", title:"What to Renovate vs. Leave Alone Before Buying an Investment Property", excerpt:"Tenant-proof finishes, rentable layouts, and the upgrades that actually raise rent — from someone who's done the work.", date:"December 2025", readMins:6, slug:"what-to-renovate-vs-leave-alone" }
];

// Helper so other pages (home, related posts) can reuse this list
if (typeof module !== 'undefined') module.exports = POSTS;
