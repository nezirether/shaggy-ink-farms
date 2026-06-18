# Tier 1 Source Verification Report

Tier 1 scope is limited to the 25 highest-priority crops for Anderson, California family food production in a USDA Zone 9 small-homestead context.

## Verification Standard

- Allowed sources only: `UC ANR`, `UC Master Gardeners`, `USDA`, `University Extension`, `Johnny's Selected Seeds`
- Crop records updated in `data/crops.ts` with:
  - `spacingSource`
  - `yieldSource`
  - `successionSource`
  - `sourceQuality`
  - `lastVerifiedAt`
- UI was not changed.
- New features were not added.

## Important Notes

- The current planner data model stores source links, but not separate planting-date source fields or harvest-window source fields.
- Anderson planting windows below are normalized field notes for Zone 9 homestead use based on the approved crop guides plus the planner’s warm-climate context.
- Several yield values remain planner-normalized estimates because many approved sources publish crop performance as harvest timing, row-foot guidance, or variety-dependent production rather than a single universal per-plant number.
- Because of that, all 25 crops are marked `tier-1-reviewed` rather than overstating `tier-1-verified`.

## Tier 1 Crop Set

| Crop | Spacing / Sq Ft | Yield | Succession | Anderson Planting Window | Expected Harvest Window | Approved Sources | Verification Note |
|---|---:|---:|---:|---|---|---|---|
| Tomato | 24 in / 4 sq ft | 12 lbs/plant | 1 | Start indoors Jan-Feb; transplant Mar-Apr | Jun-Oct | Johnny's tomato guide; UMN tomatoes | Strong spacing and timing support; yield remains a planning estimate. |
| Bell Pepper | 18 in / 2 sq ft | 4 lbs/plant | 1 | Start indoors Jan-Feb; transplant Apr-May | Jul-Oct | Johnny's pepper guide; UMN peppers | Timing and spacing are directly supported; yield is normalized. |
| Okra | 18 in / 2 sq ft | 4 lbs/plant | 2 | Direct sow or transplant Apr-May | Jun-Sep | Johnny's okra guide | Warm-climate succession retained and source-backed. |
| Cucumber | 18 in / 3 sq ft | 8 lbs/plant | 2 | Sow or transplant Mar-Jul | May-Sep | UMN cucumbers | Succession-friendly summer crop; yield stays estimated. |
| Zucchini | 36 in / 6 sq ft | 12 lbs/plant | 2 | Sow or transplant Apr-Jul | Jun-Sep | Johnny's zucchini guide | Second planting retained for pest and mildew replacement. |
| Lettuce | 12 in / 1 sq ft | 0.75 heads/plant | 4 | Sow Sep-Apr | Oct-May | Johnny's lettuce guide | Best fit is cool-season Anderson scheduling, not peak summer. |
| Carrot | 2 in / 0.06 sq ft | 0.2 lbs/plant | 3 | Sow Feb-Apr and Aug-Oct | Apr-Jun and Oct-Dec | Johnny's carrot guide | Succession remains every few weeks for steady roots. |
| Onion | 4 in / 0.11 sq ft | 1 bulb/plant | 1 | Plant sets/transplants Oct-Jan | May-Jul | UMN onions | Bulb-per-plant model retained and source-backed. |
| Garlic | 6 in / 0.25 sq ft | 1 bulb/plant | 1 | Plant cloves Oct-Nov | Jun-Jul | Johnny's garlic guide | Fall planting is the correct Anderson pattern. |
| Potato | 12 in / 1.5 sq ft | 5 lbs/plant | 1 | Plant seed pieces Feb-Mar | May-Jul | UMN potatoes | Strong spacing/timing support; yield stays planner-normalized. |
| Sweet Potato | 18 in / 3 sq ft | 3 lbs/plant | 1 | Plant slips Apr-May | Sep-Oct | Johnny's sweet potato guide | Warm-season staple with one main planting. |
| Kale | 18 in / 2 sq ft | 2 lbs/plant | 2 | Sow/transplant Sep-Mar | Oct-May | Johnny's kale guide | Long cool-season harvest retained. |
| Broccoli | 18 in / 2.25 sq ft | 1.5 lbs/plant | 2 | Transplant Jan-Feb or Aug-Sep | Apr-Jun and Oct-Dec | Johnny's broccoli guide | Spring/fall pattern is a better Anderson fit than summer. |
| Cabbage | 18 in / 2.25 sq ft | 3 heads/plant | 2 | Transplant Jan-Feb or Aug-Sep | Apr-Jun and Oct-Dec | Johnny's cabbage guide | Current planner yield is still a rough planning number. |
| Pea | 4 in / 0.11 sq ft | 0.25 lbs/plant | 2 | Sow Feb-Mar and Oct-Nov | Apr-May and Dec-Mar | Johnny's peas guide | Cool-season trellis crop; two windows fit Anderson well. |
| Bush Bean | 4 in / 0.25 sq ft | 0.5 lbs/plant | 4 | Sow Apr-Aug every 2-3 weeks | Jun-Oct | UMN beans | One of the clearest succession crops in the library. |
| Pole Bean | 6 in / 0.5 sq ft | 1.2 lbs/plant | 2 | Sow Apr-Jun | Jul-Oct | UMN beans | Fewer successions than bush beans remains appropriate. |
| Sweet Corn | 8-12 in / 1 sq ft | 1 ear/plant | 3 | Sow Apr-Jul in blocks | Jul-Oct | UMN sweet corn | Block planting and repeated sowing are directly supported. |
| Watermelon | 60 in / 24 sq ft | 15 lbs/plant | 1 | Sow or transplant Apr-May | Jul-Sep | Johnny's watermelon guide | Large-space crop with one main warm-season planting. |
| Cantaloupe | 48 in / 12 sq ft | 8 lbs/plant | 1 | Sow or transplant Apr-May | Jul-Sep | Johnny's melon guide | Best as a single heat-season crop. |
| Basil | 4-8 in / 1 sq ft | 0.4 bunches/plant | 2 | Start or transplant Mar-Jun | May-Oct | Johnny's basil guide | Successive sowing retained for clean summer flushes. |
| Parsley | 10 in / 1 sq ft | 0.4 bunches/plant | 2 | Sow/transplant Sep-Apr | Nov-Jun | Johnny's parsley guide | Long-harvest herb that suits Anderson shoulder seasons. |
| Rosemary | 24 in / 4 sq ft | 1 bunch/plant | 1 | Plant in spring or fall | Year-round after establishment | Johnny's rosemary guide | Perennial herb; yield is strongly variety and pruning dependent. |
| Thyme | 10 in / 1 sq ft | 0.3 bunches/plant | 1 | Plant in spring or fall | Year-round after establishment | Johnny's thyme guide | Dry-climate perennial herb with steady harvest potential. |
| Mint | 12 in / 1 sq ft | 0.75 bunches/plant | 1 | Plant in spring or fall | Spring-Fall after establishment | Johnny's mint guide | Best contained; highly vigorous spreader. |

## Files Updated

- `types/garden-planner.ts`
- `data/crops.ts`

## Next Tier Recommendation

After this Tier 1 set, the next verification wave should prioritize:

- `strawberry`
- `blackberry`
- `raspberry`
- `fig`
- `blueberry`
- `onion-family alternates`
- `storage crops`
- `winter greens`

That would extend the planner from core annual family production into perennial fruit reliability for Anderson.
