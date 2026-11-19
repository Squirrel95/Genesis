# ARK: Survival Ascended — independent verification audit

As of **2026-11-19**. No claims about in-game testing; validation was offline data checks plus targeted current web cross-checks.

Original: **693 rows, 36 datasets**. New: **703 rows, 38 datasets**. Confirmed rows: **51**. Recorded field-level corrections: **22**. All original rows preserved in archive original; original missing companion stays missing.

## Significant findings

- **Critical: Island Guardian rewards** — Broodmother, Megapithecus, Dragon Element numbers were legacy/incorrect for ASA; 9 rows replaced with 24/68/178, 48/132/264 and 96/264/528. Source: https://ark.wiki.gg/wiki/Element
- **Critical: Manticore rewards** — Original 40/110/220 replaced with ASA 68/244/514. Source: https://ark.wiki.gg/wiki/Manticore
- **Critical: Building HP** — Thatch wall 125->1600; wood wall 2000->10000; Vault 25000->50000. Raid cost calculations using old HP would fail. Source: https://ark.wiki.gg/wiki/Structures
- **Critical: Mutation probability** — Original target-stat chances used numbers for ANY mutation; replaced with conditional probability formula and any-mutation sample (22/31/40/52). Source: https://ark.wiki.gg/wiki/Mutations
- **Critical: Legacy roster** — 12 creature rows belong to maps/creatures not released in unmodded ASA by 2026-11-19; disable those timers while preserving reference data. Source: https://hypernatrema.com/ark/creatures
- **Critical: Special births** — Rhyniognatha and Reaper Queen/King are host-based impregnation; original generic gestation table should not power the calculator. Legacy times retained in separate fields. Source: https://ark.wiki.gg/wiki/Breeding
- **Moderate: Gigantoraptor feather** — Original female-only statement replaced; Wildcard Aberration-era patch notes allow two different-stat feathers on both parents. Source: https://survivetheark.com/index.php?/forums/topic/708761-asa-pc-patch-notes-client-v989-updated-11192026/
- **Moderate: Source badges** — Original pack lacked a confidence field for many rows, yet README implied all rows had one. Every row now gets an auditable status; original grade is retained.
- **Moderate: Granularity of bosses** — Astraeos, Center and Lost Colony sometimes collapse Gamma/Beta/Alpha to one row and leave tribute/Element unspecified. Boss checklist must hide unknown tiers instead of inventing them. Source: https://ark.wiki.gg/wiki/Boss_Arenas
- **Moderate: Breeding timing** — 131 sourced species rows were not each independently checked; averages/rounded to minute and event rate or server multiplier can shift timers. Source: https://ark.wiki.gg/wiki/Table_of_Incubation_Breeding
- **Moderate: Raid calculator** — Use per-layer ceiling of HP/damage for each actual structure, not simply ceil(total HP*layers/damage) when tiers vary; account for explosives splash/resistance and server multipliers. Source: https://wikily.gg/ark-survival-ascended/tools/damage-calculator/
- **Moderate: Tranq calculator** — Base per-shot torpor is sourced, but knockout shots depend on weapon quality, creature torpor drain, torpor-over-time stacking and rate; show estimate not guaranteed count. Source: https://ark.wiki.gg/wiki/Tranquilizer_Comparison_Table
- **Moderate: Compiled against ASE+ASA wiki** — Several wiki pages contain both games; do not interpret a wiki link as ASA-specific proof without selecting ASA game rows. Source: https://ark.wiki.gg/wiki/Element
- **Open: Map coordinates** — 30 sourced approximate positions from a community site; no independent validation of each coordinate; validate per map / server patch before pinning.
- **Open: Server configuration** — Most of 97 original INI keys were linked to pages but not re-tested one by one on a live server; preserve in Reference, not Certified. Source: https://ark.wiki.gg/wiki/Server_configuration
- **Open: Creature companion file** — ARK_Database_ALL.json (164-creature database mentioned by README) was not included. Cannot join taming data without it.
- **Open: Custom/other mods** — Modding steps and settings may be version-dependent, and cross-platform approvals can change. Check DevKit before deployment. Source: https://devkit.studiowildcard.com/home
- **Open: Wiki licensing** — Original breeding tables cite the official community wiki. Retain source attribution and review ark.wiki.gg CC BY-NC-SA terms before distributing raw wiki-derived tables commercially. Source: https://ark.wiki.gg/wiki/ARK_Wiki:Copyrights

## Status counts

| Status | Rows |
|---|---:|
| Source-linked; not checked individually | 612 |
| Confirmed against source | 51 |
| No row-level source; needs review | 23 |
| Legacy/future creature / not current ASA | 12 |
| Provisional / game-patch-sensitive | 3 |
| Special case / generic timer disabled | 2 |

## Evidence limitation

A wiki URL present in the original ZIP is not a full independent row-level fact check. The audit validated schema/computations for all data, then corrected and confirmed claims where accessible independent current sources supported them. Remaining source-linked rows **are not promoted to verified status**. The 164-species companion pack is absent.

## Historical patch date caveat

The Gigantoraptor dual-feather note appears in the **historical Aberration launch section** of Wildcard’s long-running patch notes. The page was updated in November 2026, but that mechanic was not newly introduced on November 19, 2026.