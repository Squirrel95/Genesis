# Genesis v0.8.1 / build 9

## Release checks

- Package must remain `com.squirrelstudios.genesis` and preserve the exact permanent signing certificate from v0.8.0.
- Signed release must have `versionCode=9`, `versionName=0.8.1`.
- The signed APK must install over v0.8.0 without uninstalling or losing saved project, task, note, and code data.
- Home > My Games and bottom navigation > My Games open the game hub.
- Game hub contains precisely 7D2D, GTA5, RDR2.
- Opening each game shows its named companion subfolders; search filters folders and back returns to game list.
- Each individual folder states live data is not yet connected. Do not represent empty companion folders as completed features.
- The approved custom metallic squirrel launcher icon is not yet bundled; it must not be described as done.
- Validate on an Android device before claiming successful installation.

## CI

The signed-release job runs `apksigner verify`, inspects APK package/version metadata, uploads the signed artifact and publishes the GitHub release. A CI pass is not a substitute for physical-device upgrade testing.
