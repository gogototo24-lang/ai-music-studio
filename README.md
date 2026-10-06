# AI 音樂生成工作室 v1.0

這個 repository 是目前的 **v1.0 前端版本**，以 GitHub Pages 提供瀏覽器介面。真正的後端、語音、音樂、混音與 MV 生成能力已移到 `ai-music-studio-v2`。

## v1.0 已有
- 角色／主題選擇
- 歌曲模式：登場、武戲、抒情、最終決戰
- 自動歌名與歌詞
- 繁體中文／台語／混合語言
- 女聲聲線、情緒、速度與歌曲長度設定
- 標準化歌曲提示詞
- 專案儲存
- Cloudflare Worker 連線測試
- 音訊播放與下載介面

## 專案定位
- `ai-music-studio`：前端／GitHub Pages
- `ai-music-studio-v2`：FastAPI 後端、語音、音樂、混音、MV
- `threads-scheduler`：喵台灣／貓掌江湖內容排程與 AI 草稿工作流
- `codexskills/video-prompt-builder`：影片提示詞標準化

## 下一階段
新功能原則上不要再堆進這個 v1.0 repo；優先加到 `ai-music-studio-v2` 或 `threads-scheduler`，前端只保留 UI 與 API 呼叫。

## GitHub Pages
部署由 `.github/workflows/pages.yml` 處理。首頁版本以 `index.html` 顯示的 `v1.0` 為準。

## 安全
API 金鑰、Threads token、Higgsfield／PixVerse／OpenAI 憑證都只能放在伺服器端環境變數或 Secret，不能寫進 `index.html`、`app.js` 或任何公開 repository。


## Storyboard 工作台

公開入口：`storyboard.html`

功能：
- 《貓掌江湖》／《喵台灣》模式
- PixVerse／Higgsfield Seedance／Flow 提示詞
- 角色一致性鎖定
- 首幀提示詞
- 多鏡頭 Storyboard
- JSON 專案匯出
- AI Music Studio v2 `/health` 連線檢查

技術說明：`docs/STORYBOARD_STUDIO.md`
