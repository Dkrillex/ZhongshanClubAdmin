import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDailyReport = async (
  bookings: any[],
  revenue: number,
  newMembers: number
): Promise<string> => {
  if (!apiKey) {
    return "API Key未配置。请在环境变量中设置API_KEY以使用AI分析功能。";
  }

  try {
    const prompt = `
      作为一个高尔夫球场的高级运营经理，请根据以下今天的运营数据生成一份简短的日报总结和改进建议（不超过300字）。
      
      数据：
      - 今日预订数：${bookings.length} 组
      - 今日营收估算：¥${revenue}
      - 新增会员：${newMembers} 人
      - 场地使用情况：主要集中在上午8-10点
      
      请包含：
      1. 运营亮点
      2. 潜在问题
      3. 明日的建议
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "无法生成报告。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成报告时发生错误，请稍后重试。";
  }
};
