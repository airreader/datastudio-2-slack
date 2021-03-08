# これは何？
Google DataStudio(和名: データポータル)のスクリーンショットをSlackにポストするGoogle Apps Scriptです

# スクリプトのセットアップ
- chat:write, files:write 権限を持ったSlackのApp
  - botとして動作させると良いでしょう
  - ScriptProperty の "SLACK_TOKEN" に SlackAppのtokenを保存する
- spreadsheet.js の createConfigSpreadsheet() を実行する
  - これで設定用スプレッドシートが生成されるので、適切な範囲へ共有設定をしておく

# 連携設定
- 設定用スプレッドシートに設定を書き込む
- 作成したSlackAppを連携したいチャンネルにJoinさせる
- DataPortalの「共有」から「メール配信をスケジュール」にて配信を設定しておく
- Apps Scriptトリガーメニューにて、朝10時-11時にくらいに main() が発火するようなトリガーを仕込む
