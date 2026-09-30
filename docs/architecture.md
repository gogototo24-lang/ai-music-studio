# AI MV Studio v1 架構說明

## 1. 混合部署架構

這個專案目前使用的是 hybrid 架構：

- GitHub Pages：前端展示與互動
- Cloudflare Worker：API Gateway / 任務派發 / 金鑰保護
- 本機電腦：Python Local AI Worker（Ollama / ComfyUI / FFmpeg）

這讓 AI 計算從雲端轉移到本地 GPU 或工作站，較符合成本與穩定性需求。

## 2. 分層設計

### 前端層
- 保持原生 HTML / CSS / JavaScript
- 逐步加上模組化 JS
- localStorage 用於 v1 的專案與設定持久化

### API Gateway 層
- Cloudflare Worker 接收前端請求
- 例如：/generate, /health, /tasks
- 留出 provider adapter 的抽象接口

### Local AI Worker
- LLM：Ollama
- Image：ComfyUI / FLUX
- Video：本地 shot generation
- FFmpeg：合成與輸出

## 3. Provider Adapter

所有 AI 能力都透過 Provider interface 抽象化：

- LLM provider
- Music provider
- Image provider
- Video provider
- Export provider

這樣未來即可替換為：
- Ollama / OpenAI / Gemini / Claude
- MusicGen / ACE-Step / 外部 API
- FFmpeg / alternative exporter

## 4. v1 功能節奏

v1 不會一開始直接做完整 AI MV Studio，而是先序列化成這幾個步驟：

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

## 5. 角色一致性

此功能不應寫死在單一畫面邏輯裡，而應放置在 preset / canon profile 中，例如：

- general-mv
- maozhang-jianghu
- miao-taiwan

這些 preset 可控制：

- 9:16 / 16:9
- 顏色與角色風格
- 服裝、武器設定
- Prompt 前綴
- Negative Prompt
- Character Reference

## 6. Data Model

v1 先用 JSON + localStorage，後續再慢慢升級到 PostgreSQL。

核心欄位：

- projectId
- title
- lyrics
- style
- language
- voice
- music
- storyboard
- video
- timeline

## 7. 警示事項

- 不要一開始就重寫整套前端
- 不要把 API Key 寫在前端
- 不要把所有規則分散寫死在 app.js
- 先有 model + provider abstraction，再補功能
