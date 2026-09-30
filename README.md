# AI Music Studio → AI MV Studio

這個專案保留原有 AI Music Studio 的歌詞／曲風／語言／女聲／生成提示詞功能，同時逐步升級成完整的 AI MV Studio。

## 目前狀態

- 已保留原本可用的前端原型：HTML / CSS / JavaScript
- 已保留 GitHub Pages 的簡單部署方式
- 已保留 Cloudflare Worker API 架構
- 已新增 v1 MV Studio 架構與模組化目錄
- 先進行「可實際運作」的 v1 開發，而不是一次性重寫全部

## 已保留的功能

- 歌曲名稱與歌詞輸入
- 曲風選擇
- 語言設定（繁體中文／台語／混合）
- 女聲／聲線
- 情緒與歌曲長度設定
- 產生統一 Prompt
- 匯出 JSON 設定
- localStorage 儲存專案

## v1 MV Studio 新增目標

### 1. 音樂與人聲
- 歌詞編輯／作曲編曲
- 樂器比例
- 歌曲段落
- 重新生成某一段
- 人聲設定：女／男聲、聲線、台語／華語、音高、清晰度

### 2. AI 分鏡與 Storyboard
- AI 自動分析歌詞
- 分析主題：夜景、人像近景、城市大景、人物運鏡
- 5 秒／10 秒每格
- Storyboard 管理

### 3. 圖片與影片
- ComfyUI + FLUX / 本地模型
- Text-to-Image / Image-to-Image / Reference Image
- Character Consistency
- 9:16 / 16:9

### 4. 時間軸與輸出
- 伴奏軌 / 人聲軌 / 字幕軌 / 影片軌
- FFmpeg 最終輸出
- MP4 影片輸出

## 技術架構

### 前端
- 保持原生 HTML / CSS / JavaScript
- 若後續時間軸與剪輯越來越複雜，再升級為 React

### 雲端 API
- Cloudflare Worker
- 負責 API Gateway、任務派發、API Key 保護

### 本地 AI Worker
- Python
- Ollama / LLM
- ComfyUI
- FFmpeg
- 音樂模型
- 影片模型

## Providers 設計

- LLM provider：Ollama / OpenAI / Gemini / Claude
- Music provider：Local Music Model / ACE-Step / MusicGen / External API
- Image provider：ComfyUI / FLUX / Local service
- Video provider：Local shot generation / PixVerse（未來）
- Export provider：FFmpeg

## 《貓掌江湖》模式

新增 Preset / Canon Profile 設計，將視覺規則抽離，不寫死在前端邏輯中。

範例：
- `assets/presets/maozhang-jianghu.json`
- `assets/presets/miao-taiwan.json`
- `assets/presets/general-mv.json`

## 目錄

- `src/`：前端模組化邏輯
- `workers/cloudflare/`：Cloudflare Worker API mock
- `local-ai/`：Python 本地AI Worker 與 provider skeleton
- `assets/`：Preset、角色資料、示例專案
- `docs/`：架構文件與開發路線

## v1 開發順序

1. 專案設定
2. 歌詞編輯
3. 音樂設定
4. 人聲設定
5. AI 分鏡
6. Storyboard
7. 圖片生成
8. 圖片轉影片
9. 字幕
10. Timeline
11. FFmpeg 合成
12. 輸出 MP4

## 重要原則

- 保留現有功能，不破壞原有版本
- 先做「可運作的 v1 架構」
- 不在尚未穩定前做全功能重寫
- 角色一致性為重要優先功能
- 先使用 JSON + localStorage，之後再升級 PostgreSQL

## 相關文件

- `docs/architecture.md`
- `docs/ai-mv-studio-v1-roadmap.md`
- `docs/presets/maozhang-jianghu.md`

## 本機使用

直接開啟 `index.html` 即可。

但 v1 的新架構也支援更多模組化設計，後續可以再接 `Cloudflare Worker` 與 `local-ai`。

---

> 本版本仍是架構與骨架優先，目的是讓 AI Music Studio 能逐步升級為 AI MV Studio，而不是一次砍掉重做。
