const $ = (id) => document.getElementById(id);

const demoLyrics = `月落琉璃映孤城，
風過長夜問前程。
一扇清光開劍境，
半生霜雪化星辰。`;

$("demoLyrics").addEventListener("click", () => {
  $("title").value = "月下琉璃";
  $("lyrics").value = demoLyrics;
});

$("clearLyrics").addEventListener("click", () => {
  $("title").value = "";
  $("lyrics").value = "";
});

function buildTask() {
  const title = $("title").value.trim() || "未命名歌曲";
  const lyrics = $("lyrics").value.trim();
  const style = $("style").value;
  const language = $("language").value;
  const voice = $("voice").value;
  const mood = $("mood").value;
  const duration = Number($("duration").value);

  if (!lyrics) throw new Error("請先輸入歌詞。");

  const languageLabel = {
    "zh-tw": "繁體中文",
    "nan-tw": "台語",
    "mix": "中文＋台語混合"
  }[language];

  return {
    title,
    style,
    language: languageLabel,
    voice,
    mood,
    duration_seconds: duration,
    lyrics,
    generation_prompt:
      `歌曲：${title}\n曲風：${style}\n語言：${languageLabel}\n聲線：${voice}\n情緒：${mood}\n長度：約 ${duration} 秒\n要求：保留清楚主歌、副歌層次，旋律有記憶點，適合短影音剪輯。\n\n歌詞：\n${lyrics}`
  };
}

$("generate").addEventListener("click", () => {
  try {
    const task = buildTask();
    window.currentTask = task;
    $("resultText").textContent = task.generation_prompt;
    $("result").classList.remove("hidden");
    $("status").textContent = "已建立歌曲生成任務；目前尚未送到外部音樂 API。";
    $("result").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    $("status").textContent = err.message;
  }
});

$("copyPrompt").addEventListener("click", async () => {
  if (!window.currentTask) return;
  await navigator.clipboard.writeText(window.currentTask.generation_prompt);
  $("copyPrompt").textContent = "已複製";
  setTimeout(() => $("copyPrompt").textContent = "複製生成提示", 1200);
});

$("downloadTask").addEventListener("click", () => {
  if (!window.currentTask) return;
  const blob = new Blob([JSON.stringify(window.currentTask, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "music-task.json";
  a.click();
  URL.revokeObjectURL(url);
});
