plugins { id("com.android.application") }

android {
    namespace = "com.squirrelstudios.genesis"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.squirrelstudios.genesis"
        minSdk = 26
        targetSdk = 35
        versionCode = 6
        versionName = "0.5.0"
    }

    // Release builds use the same persistent signing identity.
    // Signing material is supplied via environment variables, never committed.
    val keystorePath = System.getenv("GENESIS_KEYSTORE_PATH")
    val keystorePassword = System.getenv("GENESIS_KEYSTORE_PASSWORD")
    val keyAlias = System.getenv("GENESIS_KEY_ALIAS")
    val keyPassword = System.getenv("GENESIS_KEY_PASSWORD")

    signingConfigs {
        if (listOf(keystorePath, keystorePassword, keyAlias, keyPassword).all { !it.isNullOrBlank() }) {
            create("genesisRelease") {
                storeFile = file(keystorePath!!)
                storePassword = keystorePassword
                this.keyAlias = keyAlias
                this.keyPassword = keyPassword
            }
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if (signingConfigs.findByName("genesisRelease") != null) {
                signingConfig = signingConfigs.getByName("genesisRelease")
            }
        }
    }
}
