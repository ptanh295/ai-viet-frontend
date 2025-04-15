import { useState } from "react";
import axios from "axios";

export default function PromptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/generate-content`, {
        prompt
      });
      setResult(res.data);
    } catch (err) {
      alert("Lỗi khi gọi API: " + err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">🎯 Tạo nội dung AI văn hoá</h2>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded mb-4"
        placeholder="Ví dụ: Lễ hội đền Hùng giữa rừng Phú Thọ"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generate}
        disabled={loading || !prompt}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Đang tạo..." : "Tạo nội dung"}
      </button>

      {result && (
        <div className="mt-6 text-center">
          <img src={result.image_url} alt="Kết quả AI" className="rounded-xl mb-4 mx-auto" />
          <p className="text-gray-700 text-left whitespace-pre-line">{result.text}</p>
        </div>
      )}
    </div>
  );
}
