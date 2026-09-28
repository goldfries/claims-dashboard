Expense Claim Auditor

Problem: Finance teams check staff expense claims by hand. Duplicates, split receipts that dodge approval limits, and over-policy claims slip through.

Build: Upload a claims CSV. The app flags duplicates, over-limit items, weekend or public-holiday claims, and splitting (several claims just under the limit on the same day). Each flag comes with a reason.

Demo: A 30-row CSV with 4 planted violations. Upload it, see the flagged table, and export an audit report.

BOB's role is straightforward, follow the prompt and execute accordingly, including final checks to confirm it works.

## Quality checks before you finish
- Handle bad input gracefully: missing columns, non-numeric amounts or invalid dates should show a clear error message rather than crash.
- Verify that the built-in sample produces exactly the planted flags and no others.
- Output the complete index.html in one code block.
