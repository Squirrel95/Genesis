package com.squirrelstudios.genesis;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.webkit.ValueCallback;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  web = new WebView(this);
  web.setWebViewClient(new WebViewClient());
  WebSettings s = web.getSettings();
  s.setJavaScriptEnabled(true);
  s.setDomStorageEnabled(true);
  web.loadUrl("file:///android_asset/index.html");
  setContentView(web);
 }
 @Override public void onBackPressed() {
  web.evaluateJavascript("(window.genesisBack && window.genesisBack()) ? true : false", value -> { if (!"true".equals(value)) runOnUiThread(() -> { if (web.canGoBack()) web.goBack(); else finish(); }); });
 }
}