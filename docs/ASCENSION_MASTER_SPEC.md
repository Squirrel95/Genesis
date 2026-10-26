# Genesis Ascension — Engineering Baseline

Status: planned architecture; current v0.3 is an incremental WebView preview, NOT a completed native AAA shell.

## Product principles
- Serious engineering functions beneath AAA-quality interface.
- No fake progress, AI actions, diagnostics, deployment, or test claims.
- Preserve the approved Squirrel Studios squirrel icon; current placeholder mark is NOT approved.
- Offline-first; low-end T704V performance and reduced motion are acceptance requirements.
- Maintain working prior releases and data migration paths.

## Expansion contract (proposed)
Each module declares id, semantic version, minimum host API version, navigation route, requested capabilities, storage schema/migrations, lifecycle hooks, diagnostics and uninstall behavior.
A host registry validates compatibility and permissions before activation. A disabled module must not corrupt unrelated projects.
Third-party module code must never be loaded with unrestricted app permissions.

## Divisions
Headquarters, Operations, Forge, Sentinel, Network, Launch Control, NEXUS.

## NEXUS intelligence station (future)
Agent task states: proposed, awaiting_approval, queued, running, validating, completed, blocked, failed, cancelled.
All tool operations require scoped permissions, execution logs, resource limits, cancellation, and evidence.
Model adapters must be replaceable; Claude and Atlas are collaborators, not automatically connected agents.
Discovery engine identifies missing essentials, improvements, creative opportunities and future modules, with human approval.

## v0.3 preview acceptance
- Existing projects/tasks/notes preserved via unchanged genesis.v2 storage keys.
- Responsive command core, division overview, honest NEXUS unavailable state.
- No crashes, regression in CRUD, or loss of local data.
- GitHub Actions debug build green and install tested on target device before claiming device compatibility.

## Next native milestone
Create separate Kotlin/Compose shell branch; native navigation, Room persistence with explicit migration, accessibility, branded launcher and splash from approved source artwork, performance profiling, and verified APK.
