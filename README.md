# これは何？
Google DataStudio(和名: データポータル)のスクリーンショットをSlackにポストするGoogle Apps Scriptです

# セットアップ
- https://github.com/google/clasp が必要です
  - `clasp clone "1qlKpBulo1Qwv2Ko7D6Oq6TCB1wxqxiZDQm51c3fa-W3sREPsU-BMNL7I"` を実行してください
  - `.clasp.json` の `scriptId` を自分で作成したAppsScriptのIDに書き換えてください
  - `clasp push` で自分のAppsScriptのコードを書き換える
- BotScopeの `chat:write`, `files:write` 権限を持ったSlackのApp を用意します
  - ScriptProperty の `SLACK_TOKEN` に SlackAppの `Bot User OAuth Token` を保存する
  - Botの作り方は各自検索するといいと思います
- `spreadsheet.js` の `createConfigSpreadsheet()` を実行する
  - スクリプト実行時に、権限が求められるので承認する
  - これで設定用スプレッドシートが生成されるので、このスクリプトを利用する適切な範囲へ共有設定をしておく

# 連携設定
- 設定用スプレッドシートに設定を書き込む
  - `channels` 投稿するチャンネルを指定します `#hoge`等
  - `ownerEmailAddress` 連携設定をするユーザーのメールアドレスを指定します。設定には複数のユーザーの設定が含まれるので、トリガーを実行したメールアドレスと設定のメールアドレスを突き合わて動作しています。
  - `dataStudioReportTitle` DataStudioから配信されたメールのタイトルをこれで検索します
  - `dataStudioReportURL` 連携投稿のはじめにテキストリンクが表示されます。そのリンク先です。
  - `initialComment` 連携投稿のはじめにテキストリンクが表示されます。そのテキストです。`詳細をダッシュボードで見る` などが無難です。
- 作成したSlackAppを連携したいチャンネルにJoinさせる
- DataPortalの「共有」から「メール配信をスケジュール」にて配信を設定しておく
- Apps Scriptトリガーメニューにて、朝10時-11時にくらいに main() が発火するようなトリガーを設定する
