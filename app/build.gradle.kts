plugins { id("com.android.application") }

val releaseStorePath = System.getenv("GENESIS_SIGNING_STORE_FILE")
val releaseStorePassword = System.getenv("GENESIS_SIGNING_STORE_PASSWORD")
val releaseKeyAlias = System.getenv("GENESIS_SIGNING_KEY_ALIAS")
val releaseKeyPassword = System.getenv("GENESIS_SIGNING_KEY_PASSWORD")
val releaseSigningReady = listOf(releaseStorePath, releaseStorePassword, releaseKeyAlias, releaseKeyPassword).all { !it.isNullOrBlank() }

android {
    namespace = "com.squirrelstudios.genesis"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.squirrelstudios.genesis"
        minSdk = 26
        targetSdk = 35
        versionCode = 5
        versionName = "0.5.0"
    }

    signingConfigs {
        create("genesisRelease") {
            if (releaseSigningReady) {
                storeFile = file(releaseStorePath!!)
                storePassword = releaseStorePassword
                keyAlias = releaseKeyAlias
                keyPassword = releaseKeyPassword
            }
        }
    }

    buildTypes {
        getByName("release") {
            if (releaseSigningReady) signingConfig = signingConfigs.getByName("genesisRelease")
        }
    }
}

// A production APK must never silently fall back to an ephemeral debug key.
tasks.matching { it.name == "preReleaseBuild" }.configureEach {
    doFirst {
        check(releaseSigningReady) { "Genesis release signing credentials are missing. Refusing unsigned or mismatched release." }
        check(file(releaseStorePath!!).isFile) { "Genesis permanent signing keystore is missing." }
    }
}
