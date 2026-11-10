# ARK: Survival Ascended – Ragnarok three major information updates
Verified source review: 2026-11-10
Build target: Genesis 0.8.4 / versionCode 12

## Scope
The Ragnarok offline reference library now includes 96 cited entries:
- 17 older foundation entries (ragnarok-data.js)
- 24 Update 1 world/exploration/cave entries (ragnarok-update-1-explore.js)
- 27 Update 2 creature/taming/breeding entries (ragnarok-update-2-taming.js)
- 28 Update 3 boss/tribute/Element/loot/resource entries (ragnarok-update-3-progression.js)

These are static reference statements with evidence hyperlinks, not dynamic live in-game data. Publisher statements are marked `publisher`, community wiki items `community`, and NO records are marked "game-file verified".

## Update 1: World, regions, caves
Map identifier Ragnarok_WP; launch, Viking Bay, Highlands, Scotland Isles, Alpines, Redwoods Expansion, Desert Isles, Murder Murder Snow, jungle/highlands spawn choices, environmental dangers, Life's Labyrinth, Wyvern Cave, Iceworm Queen and Lava Elemental dungeons, map/explorer marker types. No exact GPS is asserted to be verified for ASA.

## Update 2: Creatures and taming
Bison (knockout, kibble, crops, herd buff, stances, milk, saddle and resource utility), Griffin (knockout, Extraordinary Kibble/raw mutton, saddle-free two-seat riding, breeding in ASA and dive ability), Wyverns (Ice Wyvern, eggs, milk, spawn fixes), Dire Polar Bear, Cat, Deinosuchus, and DLC entitlement distinction for Drakelings. Taming numbers vary by game/server multipliers; descriptions do not promise exact timers.

## Update 3: Bosses and resources
Nunatak tiers and tribute requirements, 10 boss artifacts, selected Beta/Alpha trophy quantities, Element payouts (wiki: 100/275/550 for Gamma/Beta/Alpha), Tek unlock reference, Lava Elemental, Iceworm Queen and Spirit encounters, introduced resources, carcass harvesting, beaver dams and official community map links.

## Primary sources
1. Studio Wildcard Ragnarok Ascended launch announcement:
https://survivetheark.com/index.php?/forums/topic/772489-ragnarok-ascended-and-lost-colony-expansion-pass-are-now-live/
2. Studio Wildcard patch history including Ragnarok v67 and later fixes:
https://survivetheark.com/index.php?/forums/topic/708761-asa-pc-patch-notes-client-v947-updated-09302026/
3. Ragnarok community wiki:
https://ark.wiki.gg/wiki/Ragnarok
4. Bison:
https://ark.wiki.gg/wiki/Bison
5. Griffin:
https://ark.wiki.gg/wiki/Griffin
6. Nunatak:
https://ark.wiki.gg/wiki/Nunatak
7. Element boss reward table:
https://ark.wiki.gg/wiki/Element
8. Wyvern Milk:
https://ark.wiki.gg/wiki/Wyvern_Milk
9. Life's Labyrinth:
https://ark.wiki.gg/wiki/LifesLabyrinth
10. Ragnarok exploration map:
https://ark.wiki.gg/wiki/Explorer_Map/Ragnarok
11. Ragnarok resource map:
https://ark.wiki.gg/wiki/Resource_Map/Ragnarok

## UX and persistence
Three selectable packs and optional All (all 96), full-text search, category selection and 12-at-a-time pagination. Existing personal notes remain separate under `genesis.gameNotes.v1` keyed by `ASA::Ragnarok`. No storage key, signing identity, package ID or existing note was migrated.

## Code-level QA
Verified 13 test assertions on generated JavaScript: all data loaded, full 96 count, per-pack counts, source HTTPS, source-label display, search, category and UI refresh, pagination, All switch, and persistence of Ragnarok personal notes. No emulator/device installation or actual game-file verification was performed.

## Evidence limitations
Do not automatically trust old Ragnarok Evolved GPS or boss requirements for Ascended. User/community coordinates, Element payouts, creature stats or tribute lists require version/server/multiplier checks to earn "game-file verified" status. The official community wiki is curated community information, not executable proof of current asset data.
