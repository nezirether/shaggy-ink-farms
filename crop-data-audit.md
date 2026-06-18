# Crop Data Audit Report

This audit reviews every crop entry in `data/crops.ts` and scores the current record based on what is documented inside the file today.

## What The Score Means

- `Verified`: strong record with explicit source citation present in the crop entry.
- `Mostly Verified`: good agronomic structure and some inline source language, but not a formal citation.
- `Needs Review`: usable data structure, but missing formal source support or containing estimated assumptions that should be checked.
- `Unverified`: missing source support and still dependent on uncited or weakly documented assumptions.

## Current Result

- Total crops audited: `93`
- Verified: `0`
- Mostly Verified: `3`
- Needs Review: `7`
- Unverified: `83`

## Important Note

The current crop model does **not** store structured source metadata. Because of that, this audit is primarily measuring how well each crop entry documents itself inside `crops.ts`, not whether the number is horticulturally true in the real world.

## Deliverables

- Full audit table (CSV): [crop-data-audit.csv](/D:/Users/jerry/JB%20Ventures/Shaggy%20Ink%20Farms/Website/crop-data-audit.csv)
- Full audit data (JSON): [crop-data-audit.json](/D:/Users/jerry/JB%20Ventures/Shaggy%20Ink%20Farms/Website/crop-data-audit.json)

## Recommended Next Step

Add structured source fields to each crop entry, such as:

- `spacingSource`
- `yieldSource`
- `successionSource`
- `climateSource`
- `sourceQuality`
- `lastVerifiedAt`

Without that, most of the library will continue to grade as `Needs Review` or `Unverified` even when some values may be reasonable.
