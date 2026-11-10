# Genesis / ARK Survival Ascended / Ragnarok — evidence catalogue v1

Date researched: 2026-11-10
Target: ARK: Survival Ascended, **Ragnarok** map. Do not substitute ARK: Survival Evolved coordinates or boss requirements.

## Implementation
- Source file: app/src/main/assets/ragnarok-data.js (17 searchable entries).
- UI: My Games -> ARK: Survival Ascended -> Ragnarok. Also accessible from Maps & Caves.
- User notes: existing genesis.gameNotes.v1 localStorage, per-folder key ASA::Ragnarok. Full CRUD works and separate JSON backup continues to include notes.
- Filtering: Overview, Regions, Creatures, Bosses, Resources, Caves, Artifacts; search locally, offline.
- Evidence labels: Publisher documented (official Studio Wildcard statement); Community documented — needs current ASA check (community wiki).
- "Publisher documented" is **not** the same as "verified against current game files". No currently catalogued entry is described as having been extracted from ASA files.

## Evidence sources
1. Studio Wildcard, June 20 2025, Ragnarok Ascended launch: https://survivetheark.com/index.php?/forums/topic/772489-ragnarok-ascended-and-lost-colony-expansion-pass-are-now-live/
   - Map announced as 144 km²; four new landmasses Scotland Isles, Alpines, Redwoods Expansion, Desert Isles.
   - Bison, Nunatak Ice Wyvern boss, Tek Sword/Shield/Light, new resources, hot springs, returning iconic landmarks.
2. Studio Wildcard v67 patch notes, June 2025: https://survivetheark.com/index.php?/forums/topic/708761-asa-pc-patch-notes-client-v947-updated-09302026/
   - Bison added; Griffin breeding supported; Nunatak boss introduced.
3. ARK Official Community Wiki, Ragnarok map: https://ark.wiki.gg/wiki/Ragnarok
   - Cave overhauls, old-vs-new boss change, beached Basilosaurus claims. Community-sourced, subject to ASA verification.
4. ARK Official Community Wiki, Life's Labyrinth: https://ark.wiki.gg/wiki/LifesLabyrinth
5. ARK Official Community Wiki, Caves (Ragnarok): https://ark.wiki.gg/wiki/Caves_(Ragnarok)
6. ARK Official Community Wiki, Artifacts: https://ark.wiki.gg/wiki/Artefacts
   - Brute artifact listed as absent on ASA Ragnarok; others listed, but current tribute requirements are not imported without verification.

## Excluded from proven dataset
- Exact artifact and cave coordinates: legacy maps and current ASA map can differ.
- Boss tribute costs, level requirements, fight time limits, loot rates, creature spawn probabilities.
- Taming food quantities, tame times, breeding times, stat multipliers, event variants.
- Anything dependent on server settings, game version, DLC entitlement, or mods unless tagged with the exact scope.
- Fantasy tames tied to paid passes should not be mislabeled as free Ragnarok content.

## QA performed
- Parsed JavaScript in the main app and the external reference catalog.
- Tested 17 records, source labels, HTTPS source URLs, Ragnarok navigation, text searching and category filtering, and local note persistence.
- Did NOT test Android installation, in-game coordinates, or gameplay.

## Next data acquisition
Verify exact Ragnarok cave/artifact locations with recorded latitude, longitude, coordinate-system mode, ASA build, settings, screenshots, and the result of repeat visits. Preserve original community reference as an unverified comparison until matched. Add structured facts only as evidence supports them.
