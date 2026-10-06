# AI MV Storyboard Studio

## 正式入口

GitHub Pages：

`/ai-music-studio/storyboard.html`

## 本次整合

這個工作台是從 `mv-storyboard-v1` 分支的有效概念重新移植，而不是直接 merge 整條分支。

保留：
- Storyboard
- Canon / character continuity
- 首幀提示詞
- 影片提示詞
- Provider 適配思路
- JSON 匯出
- AI Music Studio v2 /health 檢查

修正：
- 舊 canonical builder 呼叫未定義的 `analyzeLyricsToShots()`
- 月扇影喵舊資料錯誤加入 blade，正式版改回固定黑色折扇
- 歲璃喵固定刀鞘，不可變成刀
- 白帝喵尊固定無實體武器
- 不再建立重複 Cloudflare Worker；沿用現有 `ai-music-studio-v2` 與 `threads-scheduler`

## 使用步驟

1. 選擇宇宙與角色。
2. 選 PixVerse / Higgsfield Seedance / Flow。
3. 設定總秒數與鏡頭數。
4. 輸入核心劇情。
5. 按「生成 Storyboard」。
6. 每鏡複製「首幀提示詞」與「影片提示詞」到對應平台。
7. 需要保存時匯出 JSON。
8. 影片完成後交由 AI Music Studio v2 做口白、BGM、混音與 MV。
9. 最終內容交給 threads-scheduler 審核與排程。

## 安全與穩定

- API keys 不放前端。
- 公共事務先核實資料。
- 幻想武戲保持非血腥。
- 角色 canon 不允許模型自行變更。
